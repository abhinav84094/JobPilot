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

    education: [
      {
        degree: String,
        institution: String,
        location: String,
        startDate: String,
        endDate: String,
        gpaOrPercentage: String,
      },
    ],

    experience: [
      {
        title: String,
        company: String,
        location: String,
        startDate: String,
        endDate: String,
        description: [String],
      },
    ],

    projects: [
      {
        title: String,
        technologies: [String],
        description: [String],
        startDate: String,
        endDate: String,
        link: String,
      },
    ],

    strengths: [
      {
        type: String,
      },
    ],

    missingSkills: [
      {
        type: String,
      },
    ],

    preferredRoles: [
      {
        type: String,
      },
    ],

    atsScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    suggestions: [
      {
        type: String,
      },
    ],

    rawAnalysis: {
      type: Object,
      default: {},
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },

    nextUploadAt: {
      type: Date,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Resume", resumeSchema);