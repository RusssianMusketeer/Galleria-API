// @ts-nocheck
import { createClient } from "redis";
import "dotenv/config";
import { loginEncryptionToken } from "../utils/loginEncryptionToken.js";

export const client = createClient({
	password: process.env.REDIS_PASSWORD,
	socket: {
		host: "redis-19133.c267.us-east-1-4.ec2.cloud.redislabs.com",
		port: 19133,
		connectTimeout: 50000,
	},
});

await client.connect();

export async function checkCacheMiddleware(req: any, res: any, next: any) {
	const key: string = req.body.email;

	// Check if data is in cache
	const result = await client.hGetAll(key, (err: any, data: any) => {
		if (err) {
			throw err;
		}
		if (data) {
			// Data found in cache, use it

			return res.json(data);
		}
	});
	if (Object.keys(result).length !== 0) {
		const data = loginEncryptionToken(result, res);
		const user = data.data;
		const { token } = data;
		const { decryptedPassword } = data;
		return decryptedPassword === req.body.password
			? res.status(200).json({ user, token })
			: res.status(401).json("Wrong credentials, password");
	}

	next();
}
