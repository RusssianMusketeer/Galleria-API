import express from "express";
import { loginUser } from "./login.controller.js";
import { checkCacheMiddleware } from "../../caching/caching.js";

const loginRouter = express.Router();

loginRouter.post("/login", checkCacheMiddleware, loginUser);

export default loginRouter;
