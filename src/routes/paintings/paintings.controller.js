import { putPaintings, registerPaintingsUser } from "../../database.js";
import { getPaintings } from "../../database.js";

export function registerPaintings(req, res) {
	registerPaintingsUser(req, res);
}

export function getPainting(req, res) {
	getPaintings(req.user, res);
}

export function puPainting(req, res) {
	putPaintings(req, res);
}
