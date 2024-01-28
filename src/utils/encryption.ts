import CryptoJS from "crypto-js";
import "dotenv/config";

export function encryption(password: string | CryptoJS.lib.WordArray) {
	const encryptedPassword = CryptoJS.AES.encrypt(
		password,
		process.env.ENCRYPTION_KEY
	).toString();
	return encryptedPassword;
}
