import fs from "fs";
import { createRequire } from "module";
import Resume from "../models/Resume.js";
import { analyzeResume } from "../services/geminiService.js";

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
        const buffer = fs.readFileSync(req.file.path);

        // Extract text from PDF
        const data = await pdf(buffer);

        // Analyze resume using Gemini
        const analysis = await analyzeResume(data.text);

        console.log(JSON.stringify(analysis, null, 2));

        // Save or update resume
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
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error("Failed to delete uploaded file:", err);
                }
            });
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