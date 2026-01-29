import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import {
  MapPin,
  IndianRupee,
  Briefcase,
  Calendar,
  Mail,
  Building2,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const Myjobs = () => {
  const [jobs, setJobs] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* FETCH MY JOBS */
  useEffect(() => {
    if (!token || token === "undefined") {
      localStorage.clear();
      navigate("/login");
      return;
    }

    const fetchMyJobs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/jobs/myjobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJobs(res.data?.jobs || []);
      } catch (error) {
        console.error(error);
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      }
    };

    fetchMyJobs();
  }, [navigate, token]);

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`${API_URL}/api/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // remove deleted job from UI instantly
      setJobs(prev => prev.filter(job => job._id !== jobId));

    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
    }
  };



  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-neutral-primary w-full border-b border-default relative z-50">
        <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
          <Link
            to="/single"
            className="text-[#000080] text-2xl sm:text-3xl font-semibold"
            style={{ fontFamily: "'Limelight', cursive" }}
          >
            Jobsy
          </Link>

          <div className="flex items-center gap-4">
            {/* Profile (desktop) */}
            <div
              className="relative hidden sm:block cursor-pointer text-[#000080]"
              onMouseEnter={() => setShowProfile(true)}
              onMouseLeave={() => setShowProfile(false)}
            >
              Profile
              {showProfile && <ProfileModal show={showProfile} />}
            </div>

            {/* Logout (desktop) */}
            <button
              onClick={handleLogout}
              className="hidden sm:block text-[#000080]"
            >
              Logout
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-2xl text-[#000080]"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="md:hidden bg-white shadow p-4 space-y-3 text-[#000080]">
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/myjobs">My Jobs</Link></li>
            <li><Link to="/posts">Post a Job</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li>
              <button onClick={handleLogout} className="w-full text-left">
                Logout
              </button>
            </li>
          </ul>
        )}
      </nav>

      {/* PAGE CONTENT */}
      <div className="min-h-screen bg-gray-50 pt-28 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My Posted Jobs
        </h2>

        {jobs.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <Briefcase size={48} className="mx-auto mb-4" />
            <p>No jobs posted yet</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition"
              >
                {/* HEADER */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                    {job.company?.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Building2 size={14} />
                      {job.company}
                    </p>
                    <p className="text-xs text-gray-400">{job.city}</p>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} /> {job.location}
                  </div>

                  <div className="flex items-center gap-2">
                    <IndianRupee size={16} />
                    ₹{job.minimum} – ₹{job.maximum} / month
                  </div>

                  <p><b>Experience:</b> {job.experience} years</p>
                  <p><b>Employment:</b> {job.employment}</p>

                  <p className="flex items-center gap-2">
                    <Calendar size={14} />
                    Posted on {new Date(job.date).toLocaleDateString()}
                  </p>
                </div>

                {/* SKILLS */}
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Skills Required</p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills?.split(",").map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-gray-100 rounded-full"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* DESCRIPTION */}
                <p className="mt-4 text-sm text-gray-600 line-clamp-3">
                  {job.describe}
                </p>

                {/* FOOTER */}
                <div className="mt-4 flex justify-between items-center border-t pt-3">
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Mail size={14} />
                    {job.email}
                  </span>

                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="px-3 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Myjobs;
