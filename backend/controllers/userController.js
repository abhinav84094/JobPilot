import fs from "fs";
import { createRequire } from "module";
import Resume from "../models/Resume.js";
import { analyzeResume } from "../services/geminiService.js";
import { promises as fsPromises } from "fs";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse/lib/pdf-parse");





export const uploadResume = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a resume."
            });
        }

        const existingResume = await Resume.findOne({
            user: req.user._id,
        });

        if (
            existingResume &&
            existingResume.nextUploadAt &&
            existingResume.nextUploadAt > new Date()
        ) {
            return res.status(429).json({
                success: false,
                message: "You can upload another resume after 1 hour.",
                nextUploadAt: existingResume.nextUploadAt,
            });
        }
        

        // Read uploaded PDF
        console.log("req.file:", req.file);
        console.log("File path:", req.file.path);
        console.log("File exists:", fs.existsSync(req.file.path));

        // Extract text from PDF
        console.log("Parsing PDF...");
        const data = await pdf(buffer);

        // Analyze resume using Gemini
        console.log("Calling Gemini...");
        const analysis = await analyzeResume(data.text);

        console.log(JSON.stringify(analysis, null, 2));

        // Save or update resume
        console.log("Saving to MongoDB...");
        const resume = await Resume.findOneAndUpdate(
            {
                user: req.user._id,
            },
            {
                user: req.user._id,
                fileName: req.file.originalname,
                rawText: data.text,

                skills: analysis.skills || [],
                education: analysis.education || [],
                experience: analysis.experience || [],
                projects: analysis.projects || [],
                strengths: analysis.strengths || [],
                missingSkills: analysis.missingSkills || [],
                preferredRoles: analysis.preferredRoles || [],
                atsScore: analysis.atsScore || 0,
                suggestions: analysis.suggestions || [],

                uploadedAt: new Date(),

                nextUploadAt : new Date(
                    Date.now() + 60 * 60 * 1000
                )
            },
            {
                upsert: true,
                returnDocument: "after",
            }
        );

        // Link resume to user
        req.user.resume = resume._id;
        await req.user.save();

        res.status(200).json({
            success: true,
            message: "Resume analyzed successfully.",
            resume,
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Resume upload failed.",
        });

    } finally {

        // Always delete uploaded file

    if (req.file) {
        try {
            console.log("Deleting:", req.file.path);
            await fsPromises.unlink(req.file.path);
            console.log("Deleted successfully");
        } catch (err) {
            console.error("Delete failed:", err);
        }
    }
}

};


export const getResume = async (req, res) => {
    try {

        const resume = await Resume.findOne({
            user: req.user._id,
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Resume fetched successfully.",
            resume,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};