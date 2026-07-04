import { searchJobs } from "../services/jobService.js";
import Resume from "../models/Resume.js";
import { recommendJobs } from "../services/recommendationService.js";

export const getJobs = async (req, res) => {

    const { query } = req.query;

    const jobs = await searchJobs(query);

    const resume = await Resume.findOne({
        user: req.user._id
    });

    if (!resume) {
        return res.status(400).json({
            success: false,
            message: "Please upload your resume first."
        });
    }

    const recommendations =
        recommendJobs(
            resume,
            jobs
        );

    res.json({

        success: true,

        jobs: recommendations

    });

};