import express from "express";
import multer from "multer";
import upload from "../middleware/multer.js";
import { uploadResume, getResume } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Turns multer's fileFilter rejection / size-limit errors into a clean
// JSON response, instead of falling through to Express's default (HTML)
// error handler.
function handleResumeUpload(req, res, next) {
    upload.single("resume")(req, res, (err) => {
        if (!err) return next();

        if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                success: false,
                message: "That file is too large. Please upload a file under 5 MB.",
            });
        }

        if (err.message === "INVALID_FILE_TYPE") {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF file (.doc/.docx support is coming soon).",
            });
        }

        console.error("Upload middleware error:", err);
        return res.status(400).json({
            success: false,
            message: "Could not process that file. Please try again.",
        });
    });
}

router.post(
    "/upload-resume",
    authMiddleware,
    handleResumeUpload,
    uploadResume
);

router.get(
    "/resume",
    authMiddleware,
    getResume
)

export default router;