import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import ProfileModal from "../EMPLOYEE/ProfileModal";
const API = import.meta.env.VITE_API_URL;
const Apply = () => {
  const { jobId } = useParams();
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("resume", resume);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/apply/${jobId}`,
        {
          method: "POST",
          body: formData,
        }
      );


      const data = await res.json();

      if (data.success) {
        alert("Application submitted successfully");

        // 🔔 Notify Resume & Dashboard to refresh
        window.dispatchEvent(new Event("applicant-added"));

        // optional: clear form
        setFullName("");
        setEmail("");
        setResume(null);
      } else {
        alert("Application failed");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
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

          <button className="w-full bg-[#000080] text-white py-2 rounded">
            Submit Application
          </button>
        </form>
      </div>
    </>
  );
};

export default Apply;
