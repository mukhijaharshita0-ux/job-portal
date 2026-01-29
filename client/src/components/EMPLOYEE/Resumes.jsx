import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

const API_URL = import.meta.env.VITE_API_URL;

function Resumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/api/resumes`, {
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

      {/* CONTENT */}
      <div className="min-h-screen bg-gray-100 p-8 mt-24">
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
                              `${API_URL}${path}`
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
