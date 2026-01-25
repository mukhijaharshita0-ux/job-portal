import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    resumeUrl: {
      type: String, // PDF file path
      required: true,
    },
  },
  { timestamps: true }
);

const Resumes = mongoose.model("Resumes", resumeSchema);
export default Resumes;
