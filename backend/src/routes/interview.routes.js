import { Router } from "express";
import { createInterview, getInterview } from '../controllers/interview.controller.js';
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/create").post(verifyJWT,  createInterview)
router.route("/get").get(getInterview)

export default router;
