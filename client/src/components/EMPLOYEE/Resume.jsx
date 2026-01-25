import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

function Resume() {
  const { id } = useParams(); // applicant id
  const [applicant, setApplicant] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
 const [showProfile, setShowProfile] = useState(false);
  useEffect(() => {
  if (!id) return;

  fetch(`http://localhost:4000/resume/applicant/${id}`)
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
            href={`http://localhost:4000/uploads/${applicant.resume}`}
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




// 66c1a8a2e9f1b123456789ab