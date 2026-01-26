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
  const navigate = useNavigate();

  // // Optional: check backend route
  // useEffect(() => {
  //   fetch("http://localhost:4000/contact")
  //     .then(res => res.json())
  //     .then(data => console.log("API:", data))
  //     .catch(err => console.log(err));
  // }, []);

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
      <nav className="bg-neutral-primary fixed w-full z-20 top-0 border-b border-default">
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
