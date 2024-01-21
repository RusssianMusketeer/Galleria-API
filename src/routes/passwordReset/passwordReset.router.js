import express from "express";
import {
	checkTokenController,
	resetPasswordController,
	updatePasswordController,
} from "./resetPassword.controller.js";

const resetPasswordRouter = express.Router();

resetPasswordRouter.post("/reset", resetPasswordController);

resetPasswordRouter.get("/reset/:token", checkTokenController);

resetPasswordRouter.put("/reset", updatePasswordController);

export default resetPasswordRouter;
