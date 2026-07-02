import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    rawText: {
      type: String,
      required: true,
    },
    skills: [
      {
        type: String,
      },
    ],
    score: {
      type: Number,
      default: 0,
    },
    missingSkills: [
      {
        type: String,
      },
    ],
    suggestions: [
      {
        type: String,
      },
    ],
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);