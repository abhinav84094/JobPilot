import Feedback from "../models/Feedback.js";

// POST /api/feedback
// Creates a new feedback submission from the logged-in user
export const createFeedback = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Feedback message is required.",
      });
    }

    const feedback = await Feedback.create({
      user: req.user.id,
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      feedback,
    });
  } catch (err) {
    console.error("createFeedback error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to submit feedback.",
    });
  }
};
