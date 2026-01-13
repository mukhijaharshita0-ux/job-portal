import mongoose from 'mongoose'
const applicantSchema = mongoose.Schema({
  fullName: String,
  email: String,
  resume: String,
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
});



export default mongoose.model('applicant', applicantSchema)
// export default mongoose.model("Applicant", applicantSchema);

