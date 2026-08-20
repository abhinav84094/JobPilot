import express from "express";
import {
    googleLogin,
    getCurrentUser,
    logout
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import {apiLimiter, authLimiter} from "../middleware/Ratelimiters.js"


const router = express.Router();

router.post("/google", authLimiter, googleLogin);

router.get("/me", authMiddleware, getCurrentUser);

router.post("/logout", authMiddleware, logout);

export default router;