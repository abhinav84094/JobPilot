import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Q1 — How would you rate your overall experience? (1-5 stars)
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    // Q2 — What did you like the most? (optional)
    likedMost: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    // Q3 — What can we improve? (optional)
    improvements: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    // Q4 — Did you face any issues? (multi-select, required, min 1)
    issues: {
      type: [String],
      enum: [
        "No issues",
        "Resume upload",
        "Resume analysis",
        "Job recommendations",
        "Dashboard/UI",
        "Performance",
        "Other",
      ],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "Select at least one option.",
      },
      required: true,
    },

    // Q5 — Does Matchora solve a real problem for you?
    solvesRealProblem: {
      type: String,
      enum: ["Yes", "Partially", "No"],
      required: true,
    },

    // Q6 — Which feature is missing? (optional)
    missingFeature: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    // Q7 — What would make you use Matchora every week? (optional)
    weeklyUseReason: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    // Q8 — How can we improve our job recommendations? (optional)
    recommendationImprovement: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    // Q9 — Would you use Matchora again?
    useAgain: {
      type: String,
      enum: ["Definitely", "Probably", "Maybe", "No"],
      required: true,
    },

    // Q10 — Would you recommend Matchora to a friend/colleague? (NPS, 0-10)
    npsScore: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },

    // Q11 — Which platform do you currently use the most for job searching?
    mostUsedPlatform: {
      type: String,
      enum: [
        "LinkedIn",
        "Naukri",
        "Foundit",
        "Indeed",
        "Internshala",
        "Unstop",
        "Other",
      ],
      required: true,
    },

    // Q12 — Would you consider paying for premium features?
    wouldPayPremium: {
      type: String,
      enum: ["Yes", "Maybe", "No"],
      required: true,
    },

    // Q13 — Any additional feedback?
    additionalFeedback: {
      type: String,
      trim: true,
      maxlength: 2000,
      required: true,
    },

    status: {
      type: String,
      enum: ["New", "Reviewed"],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Feedback", feedbackSchema);
