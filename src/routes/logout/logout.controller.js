import { logout } from "../../database.js";

export function logoutUser(req, res) {
	logout(req, res);
}
