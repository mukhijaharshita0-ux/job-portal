import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
  jobId: String,
  fullName: String,
  email: String,
  resume: String,
});

export default mongoose.model("Applicant", applicantSchema);
