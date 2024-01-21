import { register } from "../../database.js";

export function registerUser(req, res) {
	register(req, res);
}
