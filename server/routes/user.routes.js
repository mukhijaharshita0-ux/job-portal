import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.models.js";

const router = express.Router();

// ✅ LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    // 1. Check user exists
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4. Send response
    res.json({
      token,
      role: user.role,
      userId: user._id,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
