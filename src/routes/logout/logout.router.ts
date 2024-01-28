import express from "express";
import { logoutUser } from "./logout.controller.js";

const logoutRouter = express.Router();

logoutRouter.get("/logout", logoutUser);

export default logoutRouter;
