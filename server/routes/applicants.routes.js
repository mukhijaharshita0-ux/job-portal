import express from "express";
import Applicant from "../models/applicant.model.js";
import { sendMail } from "../utils/mailer.js";
import auth  from "../middleware/authMiddleware.js";
const router = express.Router();

/* ============================
   GET ALL APPLICANTS
   ============================ */
router.get("/", async (req, res) => {
  try {
    const applicants = await Applicant.find().sort({ createdAt: -1 });
    res.status(200).json(applicants);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ message: "Failed to fetch applicants" });
  }
});

router.get("/resumes", auth, async (req, res) => {
  const resumes = await Applicant.find(
    {},
    { fullName: 1, email: 1, resume: 1 }
  );
  res.json(resumes);
});


/* ============================
   SEND EMAIL TO APPLICANT
   ============================ */
router.post("/send-email", async (req, res) => {
  try {
    const { email, name, subject, message } = req.body;

    if (!email || !name) {
      return res.status(400).json({ message: "Email and name are required" });
    }

    await sendMail({
      to: email,
      subject: "Application Update",
      html: `
        <h3>Hello ${name},</h3>
        <p>${message || "Your application status has been updated."}</p>
        <br/>
        <p>Regards,<br/><b>Job Portal Team</b></p>
      `,
    });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

export default router;
