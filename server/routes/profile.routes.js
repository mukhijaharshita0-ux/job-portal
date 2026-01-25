import express from "express";
import { profilePage } from "../controllers/profile-controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/data", authMiddleware, profilePage);

export default router;
