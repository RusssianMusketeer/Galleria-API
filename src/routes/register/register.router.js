import express from "express";
import { registerUser } from "./register.controller.js";
import { checkCacheMiddleware } from "../../caching/caching.js";

const registerRouter = express.Router();

registerRouter.post("/register", checkCacheMiddleware, registerUser);

export default registerRouter;
