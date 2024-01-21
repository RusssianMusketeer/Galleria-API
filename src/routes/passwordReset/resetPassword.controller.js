import { checkToken, resetPassword, updatePassword } from "../../database.js";

export function resetPasswordController(req, res) {
	resetPassword(req, res);
}

export function checkTokenController(req, res) {
	checkToken(req, res);
}

export function updatePasswordController(req, res) {
	updatePassword(req, res);
}
