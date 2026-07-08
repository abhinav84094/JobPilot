import express from "express";
import {getRecommendations} from "../controllers/jobController.js"
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/recommendations", authMiddleware, getRecommendations );

export default router;