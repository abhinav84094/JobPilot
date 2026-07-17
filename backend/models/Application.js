import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    jobId: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      default: "",
    },

    platform: {
      type: String,
      enum: [
        "linkedin",
        "naukri",
        "indeed",
        "internshala",
        "foundit",
      ],
      required: true,
    },

    jobUrl: {
      type: String,
      required: true,
    },

    fitScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    recruiterContacted: {
      type: Boolean,
      default: false,
    },

    appliedAutomatically: {
      type: Boolean,
      default: false,
    },

    aiReason: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Saved",
        "Applied",
        "Viewed",
        "Interview",
        "Offer",
        "Rejected",
      ],
      default: "Saved",
    },

    notes: {
      type: String,
      default: "",
    },
    statusHistory: [
      {
        status: String,
        updatedAt: {
          type: Date,
          default: Date.now,
        },
        note: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

applicationSchema.index(
  {
    user: 1,
    platform: 1,
    jobId: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model(
  "Application",
  applicationSchema
);