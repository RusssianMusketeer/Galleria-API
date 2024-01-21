import { decryption } from "./decryption.js";
import { createToken } from "./token.js";

export const loginEncryptionToken = (data, res) => {
	const decryptedPassword = decryption(data.password);
	const token = createToken(data.email, data.id);
	res.cookie("jwt", token);
	data.password = decryptedPassword;
	return { decryptedPassword, data, token };
};
