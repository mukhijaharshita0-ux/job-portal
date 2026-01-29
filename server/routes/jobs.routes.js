
import express from "express";
const router = express.Router();

import { createJob, getMyJobs, getJobs, deleteJob } from "../controllers/jobs-controller.js";
import{profilePage} from "../controllers/profile-controller.js"
import Job from "../models/jobs.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import auth from "../middleware/authMiddleware.js";




router.post("/register", async (req, res) => {
  try {
    const { name, email,  password, education, age, phone, city } = req.body;
    //                         
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      education,      
      password: hashedPassword,
      age,
      phone,
      city
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: user.id
    });

  } catch (error) {
    console.error("REGISTER ERROR ", error.message);
    res.status(500).json({ message: error.message });
  }
});



// Jobs (public for now)
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});



// Create job (no auth yet)


// MY JOBS (only logged-in user's jobs)
router.get("/myjobs", auth, getMyJobs);

router.post("/posts", auth, createJob) 
router.delete("/:id", auth, deleteJob);


  router.get("/profile",auth, profilePage)
export default router;
