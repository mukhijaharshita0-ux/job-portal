import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

const API = import.meta.env.VITE_API_URL;
function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("Sending...");

    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          to: phone,
          message: message,
        }),
      });


      const data = await res.json();
      console.log("Response:", data);

      if (res.ok) {
        setStatus("✅ SMS sent successfully!");
        setName("");
        setPhone("");
        setMessage("");
      } else {
        setStatus("❌ Failed to send SMS");
      }
    } catch (error) {
      console.error(error);
      setStatus(" Server error");
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


      <div className="min-h-screen flex items-start justify-center bg-gray-100 px-4 pt-24 sm:pt-25">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">

          {/* Header */}
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
            Send SMS
          </h2>
          <p className="text-sm text-center text-gray-500 mb-6">
            Contact us via text message
          </p>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#000080]-500 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91 9876543210"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#000080]-500 outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Type your SMS message..."
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#000080]-500 outline-none resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#000080] hover:bg-[#1a1a99] text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send SMS"}
            </button>
          </form>

          {/* Status Message */}
          {status && (
            <p className="text-center text-sm mt-4 text-gray-600">
              {status}
            </p>
          )}

          {/* Footer */}
          <p className="text-xs text-gray-500 text-center mt-5">
            We respect your privacy. No spam.
          </p>
        </div>
      </div>
    </>
  );
}

export default Contact;
