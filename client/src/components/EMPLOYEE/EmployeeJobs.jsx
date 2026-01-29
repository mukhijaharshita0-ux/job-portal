import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ProfileModal from "./ProfileModal";
import "../design/jobs.css"

function EmployeeJobs() {
  const [showProfile, setShowProfile] = useState(false);
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

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
      <nav className="bg-neutral-primary w-full border-b border-default relative z-50">
        <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between relative">

          {/* LOGO */}
          <Link
            to="/single"
            className="text-[#000080] hover:text-[#1a1a99] 
                 text-2xl sm:text-3xl font-semibold transition"
            style={{ fontFamily: "'Limelight', cursive" }}
          >
            Jobsy
          </Link>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4 md:order-2">

            {/* PROFILE (Desktop only) */}
            <div
              className="relative text-[#000080] cursor-pointer font-medium hidden sm:block"
              onMouseEnter={() => setShowProfile(true)}
              onMouseLeave={() => setShowProfile(false)}
            >
              Profile
              {showProfile && <ProfileModal show={showProfile} />}
            </div>

            {/* LOGOUT (Desktop only) */}
            <button
              onClick={handleLogout}
              className="hidden sm:block text-[#000080] font-medium text-sm px-3 py-2"
            >
              Logout
            </button>

            {/* HAMBURGER (Mobile only) */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-[#000080] inline-flex items-center justify-center w-10 h-10 text-2xl"
            >
              ☰
            </button>
          </div>

          {/* MOBILE + DESKTOP MENU */}
          <div
            className={`
        absolute md:static
        top-full left-0
        w-full md:w-auto
        bg-white md:bg-transparent
        shadow-md md:shadow-none
        z-50
        transition-all duration-300
        ${menuOpen ? "block" : "hidden"}
        md:flex md:order-1
      `}
          >
            <ul className="flex flex-col md:flex-row gap-4 md:gap-8 font-medium p-4 md:p-0 text-[#000080]">

              <li>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
              </li>

              <li>
                <Link to="/myjobs" onClick={() => setMenuOpen(false)}>
                  My Jobs
                </Link>
              </li>

              <li>
                <Link to="/posts" onClick={() => setMenuOpen(false)}>
                  Post a Job
                </Link>
              </li>

              <li>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </Link>
              </li>

              {/* MOBILE ONLY LOGOUT */}
              <li className="sm:hidden">
                <button
                  onClick={handleLogout}
                  className="text-left w-full"
                >
                  Logout
                </button>
              </li>

            </ul>
          </div>

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
