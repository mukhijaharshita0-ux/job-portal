import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../design/jobs.css"

function EmployeeJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch("/api/jobs") // backend API
      .then(res => res.json())
      .then(data => {
        setJobs(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return <p className="text-center mt-5">Loading jobs...</p>
  }

  return (
    <div className="bg-light min-vh-100">
      {/* NAVBAR */}
      <nav className="navbar navbar-inverse job-navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <span className="navbar-brand job-brand">JobPortal</span>
          </div>

          <ul className="nav navbar-nav">
            <li className="active"><span onClick={() => navigate("/")}>Start a search</span></li>
            <li><span onClick={() => navigate("/jobs")}>MyJobs</span></li>
            <li><span onClick={() => navigate("/salary")}>Salary estimate</span></li>
          </ul>

          <ul className="nav navbar-nav navbar-right">
            <span onClick={() => navigate("/logout")} className="logout-link">
              Logout
            </span>
          </ul>
        </div>
      </nav>

      {/* JOB CARDS */}
      <div className="container my-4">
        <div className="row g-3">

          {jobs.length > 0 ? (
            jobs.map(job => (
              job.title && job.skills && job.city && (
                <div
                  className="col-xl-4 col-lg-6 col-md-6 col-sm-12"
                  key={job._id}
                >
                  <div className="card job-card h-100">

                    <div className="card-body d-flex gap-3">
                      <img
                        src={job.logo || "/default-logo.png"}
                        className="job-logo"
                        alt="Company Logo"
                      />

                      <div className="job-content">
                        <h6 className="fw-bold mb-2">{job.title}</h6>

                        <ul className="list-unstyled small mb-2">
                          <li><strong>Company:</strong> {job.company}</li>
                          <li><strong>Min Salary:</strong> ₹{job.minimum}</li>
                          <li><strong>Max Salary:</strong> ₹{job.maximum}</li>
                          <li><strong>City:</strong> {job.city}</li>
                          <li><strong>Experience:</strong> {job.experience}</li>
                          <li><strong>Employment:</strong> {job.employment}</li>
                          <li><strong>Skills:</strong> {job.skills}</li>
                          <li><strong>Email:</strong> {job.email}</li>
                          <li>{job.describe}</li>
                        </ul>
                      </div>
                    </div>

                    <div className="card-footer bg-white border-0 text-end">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => navigate("/apply")}
                      >
                        Apply
                      </button>
                    </div>

                  </div>
                </div>
              )
            ))
          ) : (
            <p className="text-center">No jobs available</p>
          )}

        </div>
      </div>
    </div>
  )
}

export default EmployeeJobs
