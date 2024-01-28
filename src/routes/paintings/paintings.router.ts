import express from "express";
import { puPainting, registerPaintings } from "./paintings.controller.js";
import { getPainting } from "./paintings.controller.js";
import { authMiddleware } from "../../authentication/authentication.js";

const paintingsRouter = express.Router();

paintingsRouter.post("/paintings", registerPaintings);

paintingsRouter.get("/paintings", authMiddleware, getPainting);

paintingsRouter.put("/paintings", authMiddleware, puPainting);

export default paintingsRouter;
