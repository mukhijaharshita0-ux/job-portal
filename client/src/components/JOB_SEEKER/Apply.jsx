import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProfileModal from "../EMPLOYEE/ProfileModal";

const API = import.meta.env.VITE_API_URL;

const Apply = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload your resume");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("resume", resume);

    try {
      setLoading(true);

      const res = await fetch(`${API}/api/apply/${jobId}`, {
        method: "POST",
        body: formData,
      });

      // 🛡️ SAFETY CHECK — prevents JSON crash
      if (!res.ok) {
        const text = await res.text();
        console.error("Server error response:", text);
        alert("Application failed (server error)");
        return;
      }

      const data = await res.json();

      if (data.success) {
        alert("Application submitted successfully");

        window.dispatchEvent(new Event("applicant-added"));

        setFullName("");
        setEmail("");
        setResume(null);
      } else {
        alert("Application failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <nav className="w-full bg-white border-b fixed top-0 z-20">
              <div className="max-w-screen-xl mx-auto flex items-center p-4 relative text-[#000080]">
      
                {/* LEFT: LOGO */}
                <Link
                  to="/"
                  className="text-2xl sm:text-3xl font-semibold"
                  style={{ fontFamily: "'Limelight', cursive" }}
                >
                  Jobsy
                </Link>
      
                {/* CENTER: NAV ITEMS (DESKTOP ONLY) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8 font-medium">
                  <Link to="/" className="hover:text-[#1a1a99]">Home</Link>
                  <Link to="/jobs" className="hover:text-[#1a1a99]">Jobs</Link>
                </div>
      
                {/* RIGHT: PROFILE + LOGOUT (DESKTOP ONLY) */}
                <div className="hidden md:flex ml-auto items-center gap-6 font-medium">
                  <div
                    className="cursor-pointer hover:text-[#1a1a99] relative"
                    onMouseEnter={() => setShowProfile(true)}
                    onMouseLeave={() => setShowProfile(false)}
                  >
                    Profile
                    {showProfile && <ProfileModal show />}
                  </div>
      
                  <button onClick={handleLogout} className="hover:text-[#1a1a99]">
                    Logout
                  </button>
                </div>
      
                {/* HAMBURGER (MOBILE ONLY) */}
                <button
                  className="ml-auto md:hidden text-2xl"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Open menu"
                >
                  ☰
                </button>
              </div>
      
              {/* MOBILE MENU */}
              {menuOpen && (
                <div className="md:hidden bg-white border-t shadow-lg">
                  <ul className="flex flex-col gap-4 px-4 py-4 font-medium text-[#000080]">
      
                    <li>
                      <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    </li>
      
                    <li>
                      <Link to="/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link>
                    </li>
      
                    <li>
                      <button
                        onClick={() => {
                          setShowProfile(true);
                          setMenuOpen(false);
                        }}
                        className="text-left w-full"
                      >
                        Profile
                      </button>
                    </li>
      
                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-left w-full"
                      >
                        Logout
                      </button>
                    </li>
      
                  </ul>
                </div>
              )}
            </nav>

      {/* ================= APPLY FORM ================= */}
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow w-96 space-y-4"
        >
          <h2 className="text-xl font-bold text-center">Apply for Job</h2>

          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full border p-2 rounded"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="file"
            required
            className="w-full"
            onChange={(e) => setResume(e.target.files[0])}
          />

          <button
            disabled={loading}
            className="w-full bg-[#000080] text-white py-2 rounded disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Apply;
