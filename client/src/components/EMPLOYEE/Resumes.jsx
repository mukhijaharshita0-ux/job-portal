import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

function Resumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");


    fetch("http://localhost:4000/api/resumes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setResumes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading resumes...</p>;
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (

    <>
      <nav className="bg-neutral-primary w-full border-b border-default">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

          <Link
            to="/single"
            className="flex items-center text-[#000080] hover:text-[#1a1a99] text-3xl font-semibold transition"

            style={{ fontFamily: "'Limelight', cursive" }}
          >
            Jobsy
          </Link>





          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4 md:order-2 relative">

            {/* PROFILE HOVER */}
            <div
              className="relative text-[#000080] cursor-pointer font-medium nav-item profile-item"
              onMouseEnter={() => setShowProfile(true)}
              onMouseLeave={() => setShowProfile(false)}
            >
              Profile
              <ProfileModal show={showProfile} />
            </div>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="text-blue bg-brand text-[#000080] hover:bg-brand-strong font-medium rounded-base text-sm px-3 py-2 transition"
            >
              Logout
            </button>

            {/* MOBILE MENU ICON */}
            <button
              type="button"
              className="text-[#000080] inline-flex items-center p-2 w-10 h-10 justify-center md:hidden"
            >
              ☰
            </button>
          </div>

          {/* MENU */}
          <div className="text-[#000080] hidden md:flex md:order-1">
            <ul className="flex gap-8 font-medium">
              <li>
                <Link to="/dashboard" className="text-blue">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/myjobs" className="hover:text-blue">
                  My Jobs
                </Link>
              </li>
              <li>
                <Link to="/posts" className="hover:text-blue">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </nav>
      <div className="min-h-screen bg-gray-100 p-8  mt-24">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Applicants Resumes
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Resume</th>
                </tr>
              </thead>

              <tbody>
                {resumes.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.email}</td>
                    <td className="p-3">
                      {item.resumeUrl ? (
                        <button
                          onClick={() => {
                            const path = item.resumeUrl.startsWith("/uploads")
                              ? item.resumeUrl
                              : `/uploads/${item.resumeUrl}`;

                            window.location.href = encodeURI(
                              `http://localhost:4000${path}`
                            );
                          }}
                          className="text-green-600 underline font-medium"
                        >
                          Download Resume
                        </button>
                      ) : (
                        <span className="text-gray-400">No resume</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {resumes.length === 0 && (
              <p className="text-center text-gray-500 mt-6">
                No resumes found
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Resumes;
