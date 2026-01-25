// import jwt from "jsonwebtoken";
// import User from "../models/user.models.js";

// const auth = async (req, res, next) => {
//   try {
//     //  LOG AUTH HEADER
//     console.log("AUTH HEADER ", req.headers.authorization);

//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       console.log(" NO OR INVALID AUTH HEADER");
//       return res.status(401).json({ message: "No token provided" });
//     }

//     //  EXTRACT TOKEN
//     const token = authHeader.split(" ")[1];
//     console.log("TOKEN ", token);

//     // VERIFY TOKEN
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("DECODED ", decoded);

//     // FIND USER
//     const user = await User.findById(decoded.userId).select("-password");
//     console.log("USER ", user);

//     if (!user) {
//       console.log(" USER NOT FOUND");
//       return res.status(401).json({ message: "User not found" });
//     }

//     //  ATTACH USER
//     req.user = user;

//     next();
//   } catch (error) {
//     console.log("AUTH ERROR ", error.message);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// export default auth;
// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = decoded; // MUST contain id
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// export default authMiddleware;


import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;


