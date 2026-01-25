import Applicant from "../models/applicant.model.js";

export const getApplicantsResumes = async (req, res) => {
  try {
    const applicants = await Applicant.find(
      {},
      {
        fullName: 1,
        email: 1,
        resume: 1,
      }
    ).sort({ createdAt: -1 });

    res.status(200).json(applicants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch resumes" });
  }
};
