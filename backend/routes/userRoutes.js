import express from "express";
import upload from "../middleware/multer.js";
import { uploadResume } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/upload-resume",
    authMiddleware,
    upload.single("resume"),
    uploadResume
);

export default router;