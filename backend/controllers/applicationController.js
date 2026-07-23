import Application from "../models/Application.js";

// GET /api/applications
// Returns all applications belonging to the logged-in user, newest first
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, applications });
  } catch (err) {
    console.error("getApplications error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch applications." });
  }
};

// POST /api/applications
// Creates a new application record — call this when a user applies to a job
// from the Recommendations page
export const createApplication = async (req, res) => {
  try {
    const {
      resume,
      jobId,
      company,
      jobTitle,
      location,
      platform,
      jobUrl,
      fitScore,
      appliedAutomatically,
      aiReason,
      status
    } = req.body;

    if ( !jobId || !company || !jobTitle || !platform || !jobUrl) {
      return res.status(400).json({
        success: false,
        message:
          " jobId, company, jobTitle, platform, and jobUrl are required.",
      });
    }

    // Check if the user already has an application for this job
    const existingApplication = await Application.findOne({
      user: req.user.id,
      platform,
      jobId,
    });

    if (existingApplication) {
      return res.status(200).json({
        success: true,
        application: existingApplication,
        message: "Application already exists.",
      });
    }

    const application = await Application.create({
      user: req.user.id,
      resume,
      jobId,
      company,
      jobTitle,
      location,
      platform,
      jobUrl,
      fitScore,
      appliedAutomatically,
      aiReason,
      status : "Applied",
      statusHistory: [
        {
          status : "Applied",
          note: "Application created",
        },
      ],
    });

    res.status(201).json({
      success: true,
      application,
    });
  } catch (err) {
    console.error("createApplication error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create application.",
    });
  }
};


// DELETE /api/applications/:id
export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    res.status(200).json({ success: true, message: "Application deleted." });
  } catch (err) {
    console.error("deleteApplication error:", err);
    res.status(500).json({ success: false, message: "Failed to delete application." });
  }
};