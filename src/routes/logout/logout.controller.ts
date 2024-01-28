import { logout } from "../../database.js";

export function logoutUser(req: Express.Request, res: Express.Response) {
	logout(req, res);
}
