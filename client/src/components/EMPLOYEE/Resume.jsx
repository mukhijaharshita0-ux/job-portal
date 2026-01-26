import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

const API_URL = import.meta.env.VITE_API_URL;

function Resume() {
  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/api/resumes/applicant/${id}`)
      .then(res => res.json())
      .then(data => {
        setApplicant(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="mt-24 text-center">Loading resume...</p>;
  }

  if (!applicant) {
    return <p className="mt-24 text-center">No resume found</p>;
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
            className="relative text-[#000080] cursor-pointer"
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
      <div className="min-h-screen bg-gray-100 p-10 mt-24">
        <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Candidate Resume</h2>

          <p className="mb-2">
            <b>Name:</b> {applicant.fullName}
          </p>

          <p className="mb-4">
            <b>Email:</b> {applicant.email}
          </p>

          <a
            href={`${API_URL}/uploads/${applicant.resume}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline font-medium"
          >
            View Resume (PDF)
          </a>
        </div>
      </div>
    </>
  );
}

export default Resume;
