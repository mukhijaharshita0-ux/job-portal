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
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (!token || token === "undefined") {
      localStorage.clear();
      navigate("/login");
      return;
    }

    const fetchMyJobs = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/jobs/myjobs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setJobs(data?.jobs || []);
      } catch (error) {
        console.error("Error fetching my jobs:", error);

        if (error.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      }
    };

    fetchMyJobs();
  }, [navigate, token]);


  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-neutral-primary w-full border-b border-default">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 relative">

          {/* LOGO */}
          <Link
            to="/single"
            className="flex items-center text-[#000080] hover:text-[#1a1a99] 
                 text-2xl sm:text-3xl font-semibold transition"
            style={{ fontFamily: "'Limelight', cursive" }}
          >
            Jobsy
          </Link>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4 md:order-2">

            {/* PROFILE */}
            <div
              className="relative text-[#000080] cursor-pointer font-medium hidden sm:block"
              onMouseEnter={() => setShowProfile(true)}
              onMouseLeave={() => setShowProfile(false)}
            >
              Profile
              <ProfileModal show={showProfile} />
            </div>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="hidden sm:block text-[#000080] font-medium text-sm px-3 py-2 transition"
            >
              Logout
            </button>

            {/* HAMBURGER */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#000080] inline-flex items-center p-2 w-10 h-10 justify-center md:hidden"
            >
              ☰
            </button>
          </div>

          {/* MENU */}
          <div
            className={`
        text-[#000080]
        absolute md:static
        top-full left-0
        w-full md:w-auto
        bg-white md:bg-transparent
        shadow-md md:shadow-none
        ${menuOpen ? "block" : "hidden"}
        md:flex md:order-1
      `}
          >
            <ul className="flex flex-col md:flex-row gap-4 md:gap-8 font-medium p-4 md:p-0">
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

              {/* MOBILE ONLY */}
              <li className="sm:hidden">
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>

        </div>
      </nav>

      {/* PAGE CONTENT */}
      <div className="min-h-screen bg-gray-50 pt-28 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My Posted Jobs
        </h2>

        {jobs.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <Briefcase size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-lg">No jobs posted yet</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition"
              >
                {/* HEADER */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                    {job.company?.charAt(0)}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {job.title}
                    </h3>
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
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <IndianRupee size={16} />
                    <span>
                      ₹{job.minimum} – ₹{job.maximum} / month
                    </span>
                  </div>

                  <p>
                    <span className="font-medium">Experience:</span>{" "}
                    {job.experience} years
                  </p>

                  <p>
                    <span className="font-medium">Employment:</span>{" "}
                    {job.employment}
                  </p>

                  <p className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>
                      Posted on{" "}
                      {new Date(job.date).toLocaleDateString()}
                    </span>
                  </p>
                </div>

                {/* SKILLS */}
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Skills Required
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills?.split(",").map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
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

                  <span className="px-3 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                    Active
                  </span>
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
