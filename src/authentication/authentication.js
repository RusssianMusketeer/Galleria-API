import "dotenv/config";
import jwt from "jsonwebtoken";
import { getUser } from "../database.js";

export async function authMiddleware(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.sendStatus(401);
	}

	const data = jwt.verify(
		authHeader,
		process.env.JWT_SEC,
		function (error, decoded) {
			if (error) {
				console.log("hi");
				return res.sendStatus(401);
			}
			return decoded;
		}
	);

	const [user] = (await getUser(data.id)).flat();

	if (!user) {
		return res.sendStatus(401);
	}

	req.user = user;
	next();
}
