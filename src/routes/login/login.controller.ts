import { login } from "../../database.js";

export function loginUser(req: Express.Request, res: Express.Response) {
	login(req, res);
}
