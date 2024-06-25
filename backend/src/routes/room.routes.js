import { Router } from "express";
import { createRoom, getRooms } from '../controllers/room.controller.js';
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/create").post(verifyJWT,  createRoom)
router.route("/get").get(getRooms)

export default router;
