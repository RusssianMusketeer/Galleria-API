import { register } from "../../database.js";

export function registerUser(req: Express.Request, res: Express.Response) {
	register(req, res);
}
