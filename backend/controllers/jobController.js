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

        const recommendations =
            await recommendJobs(resume);

        return res.status(200).json({

            success: true,

            total: recommendations.length,

            jobs: recommendations,

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