import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";

import jobRoute from "./routes/jobs.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import applyRoutes from "./routes/apply.routes.js";
import applicantRoutes from "./routes/applicants.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectDB from "./config/database.js";
const app = express();
connectDB();

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend.onrender.com"
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static("uploads"));

app.use("/api/jobs", jobRoute);

app.use("/", contactRoutes);
app.use("/resume", applyRoutes);
app.use("/", applicantRoutes);
app.use("/api", userRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
