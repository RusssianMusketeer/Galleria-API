import "dotenv/config";
import jwt from "jsonwebtoken";
import { getUser } from "../database.js";

interface IjwtVeryfyResult {
	email: string;
	id: string;
}

export async function authMiddleware(req: any, res: any, next: any) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.sendStatus(401);
	}

	// @ts-ignore
	const data: IjwtVeryfyResult = jwt.verify(
		authHeader,
		process.env.JWT_SEC,
		function (error: any, decoded: IjwtVeryfyResult) {
			if (error) {
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
