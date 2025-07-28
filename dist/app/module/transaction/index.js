import express from "express";
import { verifyToken } from "../../middleware/auth.js";
import { List } from "./controller.js";
const router = express.Router();
router.route("/").get(verifyToken, List);
export default router;
