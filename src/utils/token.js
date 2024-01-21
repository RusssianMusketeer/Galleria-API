import jwt from "jsonwebtoken";
import "dotenv/config";

export function createToken(email,id) {
	return jwt.sign(
		{
			email,
            id
		},
		process.env.JWT_SEC,
		{ expiresIn: "24h" }
	);
}
