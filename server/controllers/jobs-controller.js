
import Job from "../models/jobs.models.js";

/* CREATE JOB */
export const createJob = async (req, res) => {
  try {
    console.log("REQ.USER ", req.user);

    const {
      title,
      company,
      minimum,
      maximum,
      city,
      salary,
      location,
      date,
      experience,
      skills,
      employment,
      describe
    } = req.body;

    const job = await Job.create({
      title,
      company,
      minimum,
      maximum,
      city,
      salary,
      location,
      date,
      experience,
      skills,
      employment,
      describe,
      postedBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* GET MY JOBS */
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs"
    });
  }
};
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({})
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs"
    });
  }
};
