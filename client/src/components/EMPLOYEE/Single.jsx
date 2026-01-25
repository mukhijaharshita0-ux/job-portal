import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import resume from "../images/premium_photo-1661328090120-a6ef40841abe.avif";
import "../design/single.css";


function Single() {
  const [showProfile, setShowProfile] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* NAVBAR */}
    <nav className="bg-neutral-primary w-full border-b border-default">

  <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 relative">

    {/* LOGO */}
    <Link
      to="/single"
      className="flex items-center text-[#000080] hover:text-[#1a1a99] 
                 text-2xl sm:text-3xl font-semibold transition"
      style={{ fontFamily: "'Limelight', cursive" }}
    >
      Jobsy
    </Link>

    {/* RIGHT ACTIONS */}
    <div className="flex items-center gap-4 md:order-2">

      {/* PROFILE */}
      <div
        className="relative text-[#000080] cursor-pointer font-medium hidden sm:block"
        onMouseEnter={() => setShowProfile(true)}
        onMouseLeave={() => setShowProfile(false)}
      >
        Profile
        <ProfileModal show={showProfile} />
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="hidden sm:block text-[#000080] font-medium text-sm px-3 py-2 transition"
      >
        Logout
      </button>

      {/* HAMBURGER */}
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-[#000080] inline-flex items-center p-2 w-10 h-10 justify-center md:hidden"
      >
        ☰
      </button>
    </div>

    {/* MENU */}
    <div
      className={`
        text-[#000080]
        absolute md:static
        top-full left-0
        w-full md:w-auto
        bg-white md:bg-transparent
        shadow-md md:shadow-none
        ${menuOpen ? "block" : "hidden"}
        md:flex md:order-1
      `}
    >
      <ul className="flex flex-col md:flex-row gap-4 md:gap-8 font-medium p-4 md:p-0">
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

        {/* MOBILE ONLY */}
        <li className="sm:hidden">
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>

  </div>
</nav>



      {/* PAGE CONTENT */}
      <div className="mt-[120px] w-full">
        <figure className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
          <img
            src={resume}
            alt="Resume background"
            className="w-full h-full object-cover"
          />

          {/* OVERLAY */}
          <figcaption className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Link
              to='/resumes'
              className="block text-white text-xl md:text-2xl font-semibold text-center px-6 capitalize resume-link"
            >
              Click here to view resume of candidates
            </Link>
          </figcaption>
        </figure>
      </div>
    </>
  );
}

export default Single;
