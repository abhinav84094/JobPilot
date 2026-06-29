import express from "express";
import upload from "../middleware/multer.js";
import { uploadResume } from "../controllers/userController.js";

const router = express.Router();

router.post(
    "/upload-resume",
    upload.single("resume"),
    uploadResume
);

export default router;