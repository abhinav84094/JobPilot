import Resume from "../models/Resume.js";
import { recommendJobs } from "../services/recommendationService.js";

export const getRecommendations = async (req, res) => {

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

        const page = Math.max(parseInt(req.query.page) || 1, 1);

        // Cap limit at 100 to prevent an abusive/huge query from one request
        const limit = Math.min(Math.max(parseInt(req.query.limit) || 25, 1), 100);

        const { jobs, totalJobs } =
            await recommendJobs(resume, { page, limit });

        const totalPages = Math.max(Math.ceil(totalJobs / limit), 1);

        return res.status(200).json({

            success: true,

            jobs,

            page,

            limit,

            totalJobs,

            totalPages,

            hasNextPage: page < totalPages,

            hasPreviousPage: page > 1,

        });

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,

            message: "Failed to fetch recommendations.",

        });

    }

};