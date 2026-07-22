import express from "express";
import {getRecommendations} from "../controllers/jobController.js"
import authMiddleware from "../middleware/authMiddleware.js";
import {getApplications, createApplication, updateApplicationStatus} from "../controllers/applicationController.js"

const router = express.Router();

router.get("/recommendations", authMiddleware, getRecommendations ); // job recommendations


 
router.get("/applications",authMiddleware, getApplications);   // applied jobs
router.post("/applications", authMiddleware, createApplication);  // apply jobs
router.patch("/applications/:id",authMiddleware, updateApplicationStatus);
// router.delete("/:id", deleteApplication);

export default router;