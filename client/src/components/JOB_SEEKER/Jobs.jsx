import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ProfileModal from "../EMPLOYEE/ProfileModal";
import {
  MapPin,
  IndianRupee,
  Briefcase,
  Calendar,
  Building2,
} from "lucide-react";
import "../design/jobs.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

 useEffect(() => {
  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/jobs/jobs"
      );

      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs", error);
    }
  };

  fetchJobs();
}, []);

  return (
    <>
      {/* NAVBAR (same as Myjobs) */}
    <nav className="w-full bg-white border-b">

        <div className="max-w-screen-xl mx-auto flex items-center p-4 relative text-[#000080]">

          {/* LEFT: LOGO */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center text-[#000080] hover:text-[#1a1a99] text-3xl font-semibold transition"

              style={{ fontFamily: "'Limelight', cursive" }}
            >
              Jobsy
            </Link>
          </div>

          {/* CENTER: NAV ITEMS */}
          <div className="absolute left-1/2 -translate-x-1/2 flex gap-8 font-medium">
            <Link
              to="/"
              className="hover:text-[#1a1a99]"
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className="hover:text-[#1a1a99]"
            >
              Jobs
            </Link>
          </div>

          {/* RIGHT: PROFILE + LOGOUT */}
          <div className="ml-auto flex items-center gap-6 font-medium">
            <div
              className="cursor-pointer hover:text-[#1a1a99]"
              onMouseEnter={() => setShowProfile(true)}
              onMouseLeave={() => setShowProfile(false)}
            >
              Profile
              <ProfileModal show={showProfile} />
            </div>

            <button
              onClick={handleLogout}
              className="hover:text-[#1a1a99]"
            >
              Logout
            </button>
          </div>

        </div>
      </nav>

      {/* PAGE CONTENT */}
      <div className="min-h-screen bg-gray-50 pt-28 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Available Jobs
        </h2>

        {jobs.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <Briefcase size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-lg">No jobs available</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition duration-300"
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
                      <Building2 size={14} /> {job.company}
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

                  <p className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>
                      Posted on{" "}
                      {new Date(job.date).toLocaleDateString()}
                    </span>
                  </p>
                </div>

                {/* APPLY */}
                <Link
                  to={`/apply/${job._id}`}
                  className="block mt-5"
                >
                  <button className="w-full bg-[#000080] text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Apply
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Jobs;
