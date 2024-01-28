import { checkToken, resetPassword, updatePassword } from "../../database.js";

export function resetPasswordController(
	req: Express.Request,
	res: Express.Response
) {
	resetPassword(req, res);
}

export function checkTokenController(
	req: Express.Request,
	res: Express.Response
) {
	checkToken(req, res);
}

export function updatePasswordController(
	req: Express.Request,
	res: Express.Response
) {
	updatePassword(req, res);
}
