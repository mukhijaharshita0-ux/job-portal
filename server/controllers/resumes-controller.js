import Applicant from "../models/applicant.model.js";

export const getAllResumes = async (req, res) => {
  try {
    const applicants = await Applicant.find(
      { resume: { $exists: true, $ne: "" } },
      { fullName: 1, email: 1, resume: 1 }
    ).sort({ createdAt: -1 });

    res.status(200).json(
      applicants.map(app => ({
        _id: app._id,
        name: app.fullName,          // ✅ consistent
        email: app.email,
        resumeUrl: app.resume,       // ✅ correct path
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch resumes" });
  }
};

/**
 * JOB SEEKER: Upload resume (PDF)
 */
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No resume file uploaded" });
    }

    const applicantId = req.user.id; // auth middleware

    const applicant = await Applicant.findById(applicantId);
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    applicant.resume = `/uploads/${req.file.filename}`;
    await applicant.save();

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resumeUrl: applicant.resume,
    });
  } catch (error) {
    console.error("Upload resume error:", error);
    res.status(500).json({ message: "Resume upload failed" });
  }
};
