import { putPaintings, registerPaintingsUser } from "../../database.js";
import { getPaintings } from "../../database.js";

export function registerPaintings(req: Express.Request, res: Express.Response) {
	registerPaintingsUser(req, res);
}

export function getPainting(req: { user: any }, res: any) {
	getPaintings(req.user, res);
}

export function puPainting(req: Express.Request, res: Express.Response) {
	putPaintings(req, res);
}
