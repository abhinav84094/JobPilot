import { searchJobs } from "../services/jobService.js";

export const getJobs = async (req, res) => {

    try {

        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required.",
            });
        }

        const jobs = await searchJobs(query);

        return res.status(200).json({
            success: true,
            jobs,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch jobs.",
        });

    }

};