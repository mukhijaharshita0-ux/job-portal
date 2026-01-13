// import express from 'express'


// import Job from '../models/jobs.models.js'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import User from '../models/user.models.js'
// import { body, validationResult } from 'express-validator'
// import { createJob } from '../controllers/jobs-controller.js'
// import auth from "../middleware/authMiddleware.js";

// // for match register to login page
// const checkLogin = (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization

//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return res.status(401).json({ message: 'No token provided' })
//         }

//         const token = authHeader.split(' ')[1]

//         const decoded = jwt.verify(token, process.env.JWT_SECRET)

//         req.user = decoded   // { userId, username }
//         next()

//     } catch (error) {
//         return res.status(401).json({ message: 'Invalid or expired token' })
//     }
// }

// router.get('/', checkLogin, (req, res) => {
//         res.render('home', { user: req.session.user });
// });

// router.get('/login', (req, res) => {
//         if (req.session.user) {
//                 res.redirect('/')
//         } else {
//                 res.render('login', { error: null })
//         }

// })
// // Create route for react to know the user session end and which page to open
// router.get('/api/auth', (req, res) => {
//         if (req.session.user) {
//                 res.json({ loggedIn: true, user: req.session.user })
//         } else {
//                 res.json({ loggedIn: false })
//         }
// })

// var validationRegistration = [
//         body('name')
//                 .notEmpty().withMessage("Username is required.")
//                 .isLength({ min: 3 }).withMessage("Username must be atleast 3 characters long.")
//                 .trim()
//                 .isAlpha().withMessage("Username must only contain letters."),

//         body('email')
//                 .isEmail().withMessage("Please provide a valid email id")
//                 .normalizeEmail(),


//         body('password')
//                 .isLength({ min: 5, max: 10 }).withMessage("Password must be 5 to characters long")
//                 .isStrongPassword().withMessage("Password must be strong"),

//         body('age')
//                 .isNumeric().withMessage("age must be numeric")
//                 .isInt({ min: 18 }).withMessage("Age must be atleast 18 years old"),

//         body('phone')
//                 .isLength({ min: 10, max: 10 }).withMessage("Phone must be 10 digits")
//                 .isNumeric().withMessage("Phone must be numeric")


// ]
// router.post("/login", async (req, res) => {
//   const { name, password } = req.body;

//   const user = await User.findOne({ name });
//   if (!user) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   const token = jwt.sign(
//     {
//       userId: user._id,
//       role: user.role
//     },
//     process.env.JWT_SECRET,
//     { expiresIn: "1h" }
//   );

//   // ✅ SEND ROLE ALSO
//   res.json({
//     token,
//     role: user.role
//   });


// })



// router.get('/register', (req, res) => {
//         res.render('register', { errors: [] })
// })

// router.post("/register", validationRegistration, async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { name, email, role, password, age, phone, city } = req.body;

//   const hashedPassword = await bcrypt.hash(password, 10);

//   await User.create({
//     name,
//     email,
//     role,
//     password: hashedPassword,
//     age,
//     phone,
//     city
//   });

//   res.status(201).json({ message: "User registered successfully" });
// });




// router.post('/', checkLogin, async (req, res) => {
//         if (req.session.user) {
//                 const { name, password } = req.body
//                 const hashedPassword = await bcrypt.hash(password, 10)
//                 await User.create({
//                         name,
//                         password: hashedPassword
//                 })
//         } else {
//                 res.redirect('/users')
//         }
// })

// router.get('/api/jobs', checkLogin, async (req, res) => {
//     const jobs = await Job.find()
//     res.json(jobs)
// })

// router.get("/api/role/users", auth, (req, res) => {
//   res.json({
//     userId: req.user.userId,
//     role: req.user.role
//   });
// });



// //routes for employee

// router.get('/nav', checkLogin, (req, res) => {
//         if (req.session.user) {
//                 res.render('single')
//         }
//         else {
//                 res.send(`<h1>No username found in  session.</h1>`)
//         }
// })


// router.get('/employee', checkLogin, async (req, res) => {
//         try {
//                 const jobs = await Job.find()
//                 res.render('second/employee-jobs', { jobs, user: req.session.user || null })
//         } catch (error) {
//                 res.status(500).send('Server error')
//         }
// })

// // use destroy in logout
// router.get('/logout', checkLogin, (req, res) => {
//         req.session.destroy()
//         req.session.destroy((err) => {
//                 if (err) {
//                         return res.send('Logout Failed')
//                 }
//                 res.redirect('/login')
//         })
// })
// routes/jobs.routes.js
// router.post("/myjobs", auth, async (req, res) => {
//   try {
//     const job = new Job({
//       ...req.body,
//       createdBy: req.user.userId   // ✅ FIXED
//     });

//     await job.save();
//     res.status(201).json(job);
//   } catch {
//     res.status(500).json({ message: "Job creation failed" });
//   }
// });



// GET only employee's jobs
// router.get("/myjobs", async (req, res) => {
//   try {
//     const jobs = await Job.find({ createdBy: req.user.userId });
//     const jobs = {"message":"Failed to fetch jobs"};
//     res.json(jobs);
//   } catch {
//     res.status(500).json({ message: "Failed to fetch jobs" });
//   }
// });



// export default router


// let checkLogin = async(req, res, next) => {
//         if (req.session.user) {
//                 next()
//         } else {
//                 res.redirect('/login')
//         }
// }

import express from "express";
const router = express.Router();

import Job from "../models/jobs.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import auth from "../middleware/authMiddleware.js";

/* ---------------- LOGIN (TOKEN ONLY HERE) ---------------- */

router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      role: user.role,
      userId: user.id
    });

  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});



/* ---------------- REGISTER (NO TOKEN, NO SESSION) ---------------- */

router.post("/register", async (req, res) => {
  try {
    const { name, email, role, password, education, age, phone, city } = req.body;
    //                         
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      role,
      education,      
      password: hashedPassword,
      age,
      phone,
      city
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: user.id
    });

  } catch (error) {
    console.error("REGISTER ERROR 👉", error.message);
    res.status(500).json({ message: error.message });
  }
});



/* ---------------- PUBLIC ROUTES (NO TOKEN / NO SESSION) ---------------- */

// Home
// router.get("/", (req, res) => {
//   res.json({ message: "Home route" });
// });

// Jobs (public for now)
router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});


// Create job (no auth yet)


// MY JOBS (only logged-in user's jobs)
router.get("/myjobs", auth, async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.userId });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});




router.post("/posts", auth, async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      userId: req.user.userId
    });

    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: "Failed to post job" });
  }
});
export default router;
