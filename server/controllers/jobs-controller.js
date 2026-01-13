// import Job from '../models/jobs.models.js'
// import mongoose from 'mongoose'

// export const getJobs= async (req,res)=>{
//     try{
//     const jobs= await Job.find()
//     res.render('jobs', { jobs })
//     }catch(error){
//         res.render('500', { message: error.message })

// }
// }
// export const getJobById=async(req,res)=>{
//     try{
//             if(!mongoose.Types.ObjectId.isValid(req.params.id)){
//     return res.render('404',{message:"Invalid Id"})
// }
//     const job = await Job.findById(req.params.id)

//     if (!job) {
//       return res.render('404', { message: "Page not found" })
//     }

//     res.render('job', { job })

//   } catch (error) {
//     res.render('500', { message: error.message })
//   }
// }
// // export const  createJob=async(req,res)=>{
// //     try{
// //         await Job.create(req.body)
// //         res.redirect('/jobs')
// //     }catch(error){
// //         res.render('500',{message:error.message})
// //     }
// // }
// export const updateJob=async(req,res)=>{
//     try{
//     if(!mongoose.Types.ObjectId.isValid(req.params.id)){
//         res.render('404',{message: 'Invalid Id'})
//     }
//     await Job.findByID(req.params.id, req.body)
//     res.redirect('/jobs')
// }catch(error){
//         res.render('500',{message: error.message})
// }
// }

// export const navPage=(req,res)=>res.render('nav')
// // export const salaryPage=(req,res)=>res.render('salary')
// export const singlePage = (req, res) => {
//         if (!req.session.user) {
//                 return res.redirect('/login');
//         }

//         res.render('second/single', {
//                 User: req.session.user
//         });
// };

// export const profilePage=(req,res)=>res.render('second/profile')
// export const postPage = (req, res) => {
//     res.render('second/posts')
// }

// export const createJob = async (req, res) => {
//     await Job.create(req.body)
//     res.redirect('/second/employee-jobs')
// }
import Job from '../models/jobs.models.js'
import mongoose from 'mongoose'
export const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      minimum,
      maximum,
      city,
      salary,
      location,
      date,
      experience,
      skills,
      employment,
      describe
    } = req.body

    if (!title || !company) {
      return res.status(400).json({
        success: false,
        message: "Title and Company are required"
      })
    }

    const job = await Job.create({
      title,
      company,
      minimum,
      maximum,
      city,
      salary,
      location,
      date,
      experience,
      skills,
      employment,
      describe
    })

    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Failed to create job"
    })
  }
}
