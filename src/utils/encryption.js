import CryptoJS from "crypto-js";
import "dotenv/config";

export function encryption(password) {
	const encryptedPassword = CryptoJS.AES.encrypt(
		password,
		process.env.ENCRYPTION_KEY
	).toString();
	return encryptedPassword;
}
