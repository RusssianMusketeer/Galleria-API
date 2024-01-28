import jwt from "jsonwebtoken";
import "dotenv/config";

interface ItokenProps {
	email: string;
	id: string;
}

export function createToken({ email, id }: ItokenProps) {
	return jwt.sign(
		{
			email,
			id,
		},
		process.env.JWT_SEC,
		{ expiresIn: "24h" }
	);
}
