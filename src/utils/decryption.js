import CryptoJS from "crypto-js";
import "dotenv/config";

export function decryption(password) {
	const decryptedPassword = CryptoJS.AES.decrypt(
		password,
		process.env.ENCRYPTION_KEY
	).toString(CryptoJS.enc.Utf8);
	return decryptedPassword;
}
