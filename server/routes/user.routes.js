import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.models.js";

const router = express.Router();
router.post("/login", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { name, password } = req.body;

    const user = await User.findOne({ name });
    console.log("USER:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials (user)" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials (password)" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, role: user.role, userId: user._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
