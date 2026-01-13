import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../design/jobs.css";

function Myjobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // FETCH MY JOBS
  useEffect(() => {
    const fetchMyJobs = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:4000/api/jobs/myjobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setJobs(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(
          "Error fetching my jobs:",
          err.response?.data || err.message
        );
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, [navigate]);

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading my jobs...</h3>;
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-20 bg-white border-b">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
          <a href="/" className="flex items-center gap-3">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-7"
              alt="logo"
            />
            <span className="text-xl font-semibold">JobPortal</span>
          </a>

          <div className="flex gap-6 font-medium">
            <a href="/dashboard" className="text-blue-600">Dashboard</a>
            <a href="/myjobs">My Jobs</a>
            <a href="/posts">Post a Job</a>
            <a href="/contact">Contact</a>
          </div>

          <button
            onClick={handleLogout}
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="mt-[200px]">
        {jobs.length === 0 ? (
          <p className="text-center text-3xl text-gray-600">
            You haven’t posted any jobs yet
          </p>
        ) : (
          <div className="jobs-container">
            {jobs.map((job) => (
              <div className="job-card" key={job._id}>
                <h3>{job.title}</h3>
                <p>{job.company}</p>
                <p>{job.city}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Myjobs;
