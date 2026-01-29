import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

const API_URL = import.meta.env.VITE_API_URL;

function Resume() {
  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
