import express from "express";
import multer from "multer";
import auth from "../middleware/authMiddleware.js";
import {
  getAllResumes,
  uploadResume,
} from "../controllers/resumes-controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const safeName = file.originalname
      .replace(/\s+/g, "_")
      .replace(/[()]/g, "");
    cb(null, Date.now() + "-" + safeName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files allowed"), false);
    }
  },
});

/* EMPLOYEE: VIEW ALL RESUMES */
router.get("/", auth, getAllResumes);

/* JOB SEEKER: UPLOAD RESUME */
router.post("/", auth, upload.single("resume"), uploadResume);

export default router;
