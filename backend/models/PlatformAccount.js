import mongoose from "mongoose";

const platformAccountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

    email: {
      type: String,
      required: true,
      trim: true,
    },

    encryptedPassword: {
      type: String,
      required: true,
    },

    cookies: {
      type: Object,
      default: {},
    },

    connected: {
      type: Boolean,
      default: true,
    },

    lastLogin: Date,

    lastSynced: Date,
  },
  {
    timestamps: true,
  }
);

platformAccountSchema.index(
  {
    user: 1,
    platform: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model(
  "PlatformAccount",
  platformAccountSchema
);