// import express from "express";
// const router = express.Router()
// import Applicant from '../models/applicant.model.js';
// import multer from 'multer'
// import path from 'path'

// //this is upload a file
// const storage = multer.diskStorage({
//         destination: (req, file, cb) => {
//                 cb(null, './upload')
//         },
//         filename: (req, file, cb) => {

//                 const newfileName = Date.now() + path.extname(file.originalname)
//                 cb(null, newfileName)
//         }
// })

// // FILE FILTER (PDF only)
// const fileFilter = (req, file, cb) => {
//   const allowed = [
//     "application/pdf",
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//   ];

//   if (allowed.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only PDF/DOC/DOCX files allowed"), false);
//   }
// };




// // ERROR HANDLER
// router.use((error, req, res, next) => {
//         if (error instanceof multer.MulterError) {
//                 return res.status(400).send(`Multer error: ${error.message}`)
//         } else if (error) {
//                 return res.status(500).send(`Something went wrong: ${error.message}`)
//         }
//         next()
// })



// // MULTER INSTANCE
// const upload = multer({
//         storage: storage,
//         limits: {
//                 fileSize: 1024 * 1024 * 3
//         },
//         fileFilter
// })

// router.post("/apply", upload.single("resume"), async (req, res) => {
//   const { fullName, email, jobId } = req.body;

//   const application = await Application.create({
//     fullName,
//     email,
//     jobId,
//     resume: req.file.filename,
//   });

//   res.json({
//     success: true,
//     applicationId: application._id,
//   });
// });
// //for view applicants
// router.get("/resume/:id", async (req, res) => {
//   const application = await Application.findById(req.params.id);
//   res.json(application);
// });


// module.exports = router;

// import express from "express";
// import multer from "multer";
// import Applicant from "../models/applicant.model.js";


// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// router.post("/apply/:jobId", upload.single("resume"), async (req, res) => {
//   try {
//     const applicant = new Applicant({
//       jobId: req.params.jobId,
//       fullName: req.body.fullName,
//       email: req.body.email,
//       resume: req.file.filename,
//     });

//     await applicant.save();
//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ success: false });
//   }
// });

// router.get("/:jobId", async (req, res) => {
//   const applicants = await Applicant.find({ jobId: req.params.jobId });
//   res.json(applicants);
// });


// export default router;   
import express from "express";
import multer from "multer";
import Applicant from "../models/applicant.model.js";

const router = express.Router();

/* ================= MULTER CONFIG ================= */

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

/* ================= APPLY FOR JOB ================= */

router.post("/apply/:jobId", upload.single("resume"), async (req, res) => {
  try {
    const applicant = new Applicant({
      jobId: req.params.jobId,
      fullName: req.body.fullName,
      email: req.body.email,
      resume: req.file.filename,
    });

    await applicant.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

/* ============ GET SINGLE APPLICANT BY ID ============ */

router.get("/applicant/:id", async (req, res) => {
  const { id } = req.params;

  // ✅ BLOCK invalid IDs
  if (!id || id === "undefined") {
    return res.status(400).json({ message: "Invalid applicant ID" });
  }

  try {
    const applicant = await Applicant.findById(id);

    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.json(applicant);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ============ GET APPLICANTS BY JOB ID ============ */

router.get("/:jobId", async (req, res) => {
  try {
    const applicants = await Applicant.find({
      jobId: req.params.jobId,
    });

    res.json(applicants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
