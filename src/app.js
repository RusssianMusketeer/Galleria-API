import express from "express";
import registerRouter from "./routes/register/register.router.js";
import loginRouter from "./routes/login/login.router.js";
import paintingsRouter from "./routes/paintings/paintings.router.js";
import logoutRouter from "./routes/logout/logout.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import resetPasswordRouter from "./routes/passwordReset/passwordReset.router.js";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use([
	registerRouter,
	loginRouter,
	paintingsRouter,
	logoutRouter,
	resetPasswordRouter,
]);

app.get("/", (req, res) => {
	return res.json("this is the backend");
});

export default app;
