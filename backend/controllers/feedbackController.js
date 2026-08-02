import Feedback from "../models/Feedback.js";

const REQUIRED_FIELDS = [
  "rating",
  "issues",
  "solvesRealProblem",
  "useAgain",
  "npsScore",
  "mostUsedPlatform",
  "wouldPayPremium",
  "additionalFeedback",
];

// POST /api/feedback
// Creates a new feedback survey submission from the logged-in user
export const createFeedback = async (req, res) => {
  try {
    const {
      rating,
      likedMost,
      improvements,
      issues,
      solvesRealProblem,
      missingFeature,
      weeklyUseReason,
      recommendationImprovement,
      useAgain,
      npsScore,
      mostUsedPlatform,
      wouldPayPremium,
      additionalFeedback,
    } = req.body;

    const missing = REQUIRED_FIELDS.filter((field) => {
      const value = req.body[field];
      if (Array.isArray(value)) return value.length === 0;
      return value === undefined || value === null || value === "";
    });

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required field(s): ${missing.join(", ")}`,
      });
    }

    const feedback = await Feedback.create({
      user: req.user.id,
      rating,
      likedMost,
      improvements,
      issues,
      solvesRealProblem,
      missingFeature,
      weeklyUseReason,
      recommendationImprovement,
      useAgain,
      npsScore,
      mostUsedPlatform,
      wouldPayPremium,
      additionalFeedback,
    });

    res.status(201).json({
      success: true,
      feedback,
    });
  } catch (err) {
    console.error("createFeedback error:", err);

    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(err.errors)
          .map((e) => e.message)
          .join(" "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to submit feedback.",
    });
  }
};
