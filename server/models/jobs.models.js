import mongoose from 'mongoose'
const jobSchema = mongoose.Schema({
    title: {
        type: String
    },
    company: {
        type: String
    },
    minimum: {
        type: Number
    },
    maximum: {
        type: Number
    },
    city: {
        type: String
    },
    salary: {
        type: String
    },
    location: {
        type: String
    },
    date: {
        type: String
    },
     experience: {
        type: String
    },
    skills: {
        type: String
    },
    logo: {
        type: String
    },
    employment: {
        type: String
    },
    describe: {
        type: String
    },
    email: {
        type: String
    },
})
const jobs=mongoose.model("jobs",jobSchema)
export default  jobs




