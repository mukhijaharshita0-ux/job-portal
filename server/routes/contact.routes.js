import express from "express";
import twilio from "twilio";

const router = express.Router();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

router.post("/contact", async (req, res) => {
  const { username, to, message } = req.body;

  if (!username || !to || !message) {
    return res.status(400).json({
      error: "All fields are required"
    });
  }

  try {
    const result = await client.messages.create({
      body: `${username}: ${message}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to
    });

    res.json({
      sid: result.sid,
      message: "SMS sent successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

export default router;
