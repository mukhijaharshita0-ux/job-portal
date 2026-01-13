// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
// dotenv.config()
// export const connectDB=()=>{
//     mongoose.connect(process.env.MONGO_URL)
//     .then(()=> console.log('Database connected'))
// }

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
