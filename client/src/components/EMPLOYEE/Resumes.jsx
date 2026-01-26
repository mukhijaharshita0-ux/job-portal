import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

const API_URL = import.meta.env.VITE_API_URL;

function Resumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
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
      {/* NAVBAR */}
      <nav className="bg-neutral-primary w-full border-b border-default">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <Link
            to="/single"
            className="text-[#000080] text-3xl font-semibold"
            style={{ fontFamily: "'Limelight', cursive" }}
          >
            Jobsy
          </Link>

          <div
            onMouseEnter={() => setShowProfile(true)}
            onMouseLeave={() => setShowProfile(false)}
            className="relative cursor-pointer text-[#000080]"
          >
            Profile
            <ProfileModal show={showProfile} />
          </div>

          <button onClick={handleLogout} className="text-[#000080]">
            Logout
          </button>
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
