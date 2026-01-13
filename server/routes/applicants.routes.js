import express from "express";
import Applicant from "../models/applicant.model.js";
import { sendMail } from "../utils/mailer.js";

const router = express.Router();

// GET all applicants (Dashboard uses this)
router.get("/applicants", async (req, res) => {
  try {
    const applicants = await Applicant.find();
    res.json(applicants);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/send-email", async (req, res) => {
  const { email, name } = req.body;

  await sendMail({
    to: email,
    subject: "Application Update",
    html: `
      <h3>Hello ${name}</h3>
      <p>Your application status has been updated.</p>
      <p>Regards,<br/>Job Portal</p>
    `,
  });

  res.json({ success: true });
});
export default router;
