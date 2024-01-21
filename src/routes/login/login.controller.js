import { login } from "../../database.js";

export function loginUser(req, res) {
	login(req, res);
}
