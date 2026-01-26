import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";

import connectDB from "./config/database.js";

import jobRoutes from "./routes/jobs.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import applyRoutes from "./routes/apply.routes.js";
import applicantRoutes from "./routes/applicants.routes.js";
import userRoutes from "./routes/user.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import resumesRoutes from "./routes/resumes.routes.js";

const app = express();

// 🔹 Connect Database
connectDB();

// 🔹 Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://job-portal-itjr.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));




app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/applicants", applicantRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/apply", applyRoutes);
app.use("/api/resumes", resumesRoutes);

app.get("/", (req, res) => {
  res.send("Job Portal Backend is running");
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
