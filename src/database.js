import mysql from "mysql2";
import { encryption } from "./utils/encryption.js";
import { decryption } from "./utils/decryption.js";
import { createToken } from "./utils/token.js";
import * as crypto from "crypto";
import nodemailer from "nodemailer";
import "dotenv/config";
import { client } from "./caching/caching.js";

// create the connection to database
const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	port: process.env.MYSQL_PORT,
});
pool.getConnection(function (err) {
	if (err) throw err;
	console.log("Connected!");
});

export function register(req, res) {
	const q = "INSERT INTO Users (`email`,`password`) VALUES (?, ?)";
	const encryptedPassword = encryption(req.body.password);
	const values = [req.body.email, encryptedPassword];

	pool.query(q, values, (error, data) => {
		if (error) return res.status(400).json(error);

		try {
			client.hSet(values[0], {
				email: values[0],
				password: values[1],
				id: data.insertId,
				paintings: JSON.stringify([]),
			});
		} catch (error) {
			return res.status(401).json(error);
		}
		return res.status(200).json(data);
	});
}

export function login(req, res) {
	const q = `SELECT * FROM Users WHERE email = ? `;

	pool.query(q, [req.body.email], (error, data) => {
		if (error) return res.json(error);

		if (!data.length > 0) {
			return res.status(401).json("Wrong credentials, email");
		}

		const [user] = data;
		const decryptedPassword = decryption(user.password);
		const token = createToken(user.email, user.id);
		res.cookie("jwt", token);
		user.password = decryptedPassword;
		return decryptedPassword === req.body.password
			? res.status(200).json({ user, token })
			: res.status(401).json("Wrong credentials, password");
	});
}

export function logout(req, res) {
	res.cookie("jwt", "", { maxAge: 1 });
	res.status(200).json({ status: "success" });
}

export function registerPaintingsUser(req, res) {
	const q =
		"INSERT INTO Paintings (`userId`,`paintings`) VALUES (?, JSON_ARRAY(?))";
	const values = [req.body.userId, req.body.paintings];

	pool.query(q, values, (error, data) => {
		if (error) return res.json(error);
		return res.json("Added painting successfully !");
	});
}

export function putPaintings(req, res) {
	const q = "UPDATE Paintings SET paintings = ? WHERE userId = ? ";
	const values = [JSON.stringify(req.body.paintings), req.body.userId];

	pool.query(q, values, (error, data) => {
		if (error) {
			return res.json(error);
		}
		client.hSet(req.body.email, {
			paintings: JSON.stringify(req.body.paintings),
		});
		return res.status(200);
	});
}

export function getUser(id) {
	const q = "SELECT * FROM `Users` WHERE `id` = ? ";
	let promise;
	promise = pool.promise().query(q, [id], (error, data) => {
		return data;
	});
	return promise;
}

//RESET PASSWORD LINK

export function resetPassword(req, res) {
	const q = `SELECT * FROM Users WHERE email = ? `;

	pool.query(q, [req.body.email], (error, data) => {
		if (error) return res.json(error);

		if (!data.length > 0) {
			return res.status(401).json("Wrong credentials, email");
		}
		const tokenPasswordReset = crypto.randomBytes(20).toString("hex");
		const values = [tokenPasswordReset, Date.now() + 3600000, data[0].id];
		const w =
			"UPDATE Users SET resetPasswordToken = ?, resetPasswordTokenExpires = ? WHERE id = ? ";

		pool.query(w, values, (error, data) => {
			if (error) {
				return res.json(error);
			}

			return res.status(200);
		});

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_ADDRESS,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		const mailOptions = {
			from: process.env.EMAIL_ADDRESS,
			to: req.body.email,
			subject: "Password reset",
			text:
				`Hello\n\n` +
				`You are receiving this because you (or someone else) have requested the reset of the password for your account.\n` +
				`Please click on the following link, or paste this into your browser to complete the process.\n` +
				`https://russsianmusketeer.github.io/Galleria-slideshow/password-reset-check/${tokenPasswordReset}\n` +
				`If you did not request this, please ignore this email and your password will remain unchanged.\n\n` +
				`Regards, Galleria`,
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log("Email sent: " + info.response);
				// do something useful
				res.status(200).json("recovery email sent");
			}
		});
	});
}

//CHECK TOKEN PASSWORD RESET VALIDITY

export function checkToken(req, res) {
	const q = "SELECT * FROM `Users` WHERE `resetPasswordToken` = ?";
	const value = [req.params.token];
	pool.query(q, value, (error, data) => {
		if (error) return res.json(error);

		if (!data.length > 0) {
			return res.status(401).json("Reset Token not found !");
		}

		if (data[0].resetPasswordTokenExpires <= Date.now()) {
			return res.status(401).json("Reset token expired !");
		}

		return res.status(200).json(data[0]);
	});
}

// UPDATE ACTUAL PASSWORD

export function updatePassword(req, res) {
	const q = "UPDATE Users SET password = ? WHERE id = ?";
	const encryptedPassword = encryption(req.body.password);
	const values = [encryptedPassword, req.body.id, req.body.email];

	pool.query(q, values, (error, data) => {
		if (error) return res.json(error);
		client.hSet(req.body.email, {
			password: encryptedPassword,
		});
		return res.status(200).json("Password has been updated!");
	});
}

export function getPaintings(user, res) {
	const q = "SELECT * FROM `Paintings` WHERE `userId` = ? ";
	const { id } = user;
	pool.query(q, [id], (error, data) => {
		if (error) return res.json(error);
		const [paintings] = data;
		return res.json({ paintings });
	});
}
