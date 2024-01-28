import { decryption } from "./decryption.js";
import { createToken } from "./token.js";

interface IloginEncryptionTokenProps {
	data: {
		email: string;
		password: string;
		id: string;
		paintings: string[];
	};
	res: { cookie: (arg0: string, arg1: string) => void };
}

export const loginEncryptionToken = (
	data: { [x: string]: string },
	res: any
) => {
	const decryptedPassword = decryption(data.password);
	const token = createToken({ email: data.email, id: data.id });
	res.cookie("jwt", token);
	data.password = decryptedPassword;
	return { decryptedPassword, data, token };
};
