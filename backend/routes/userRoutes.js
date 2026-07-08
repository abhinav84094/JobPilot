import express from "express";
import upload from "../middleware/multer.js";
import { uploadResume, getResume } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/upload-resume",
    authMiddleware,
    upload.single("resume"),
    uploadResume
);

router.get(
    "/resume",
    authMiddleware,
    getResume
)

export default router;