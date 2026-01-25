import hero from "../images/hero-image.png";
import cat from "../images/cat-bg.jpg";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileModal from "../EMPLOYEE/ProfileModal";

function Nav() {
  const navigate = useNavigate();
  const [openEmailModal, setOpenEmailModal] = useState(false);
const [showProfile, setShowProfile] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login", { replace: true });
    window.location.reload();
  };

  return (
    <>
      {/* NAVBAR */}
    <nav className="w-full bg-white border-b fixed top-0 z-20">
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

      {/* SECOND SECTION */}
      <div className="mt-[120px] w-full">
        <figure className="relative h-[300px] md:h-[400px]">
          <img src={cat} className="w-full h-full object-cover" alt="bg" />
          <figcaption className="absolute inset-0 flex items-center justify-center bg-black/40">
            <p
              onClick={() => navigate("/jobs")}
              className="text-white text-xl md:text-2xl font-semibold text-center cursor-pointer hover:underline px-6"
            >
              Do you want to get notified when new jobs are posted?
            </p>
          </figcaption>
        </figure>
      </div>

      {/* THIRD SECTION */}
      <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-10 px-6">

        {/* LEFT */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start md:ml-20">
          <p className="text-4xl font-semibold mb-5 text-gray-800">
            For any query, message us
          </p>

          <div
            onClick={() => setOpenEmailModal(true)}
            className="border-2 border-gray-300 rounded-xl px-6 py-3 cursor-pointer hover:bg-gray-100 transition"
          >
            Message here
          </div>
        </div>

        {/* RIGHT IMAGE (NOT REMOVED) */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            src={hero}
            alt="contact"
            className="w-full max-w-md rounded-lg"
          />
        </div>
      </div>

      {/* EMAIL MODAL */}
      {openEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 relative">
            
            <button
              onClick={() => setOpenEmailModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-center mb-2">
              Contact Us
            </h2>
            <p className="text-gray-500 text-center mb-5 text-sm">
              Send us your query via email
            </p>

            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

              <textarea
                placeholder="Your message"
                className="w-full border rounded-xl px-4 py-2 h-28 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;
