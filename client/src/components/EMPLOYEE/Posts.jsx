import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

const API_URL = import.meta.env.VITE_API_URL;

const Posts = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    minimum: "",
    maximum: "",
    city: "",
    salary: "",
    location: "",
    date: "",
    experience: "",
    skills: "",
    employment: "",
    describe: "",
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  //  AUTH GUARD (MOST IMPORTANT FIX)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
    }
  }, [navigate]);

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // LOGO PREVIEW (UI ONLY)
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired. Login again.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        minimum: Number(formData.minimum),
        maximum: Number(formData.maximum),
      };
      const res = await axios.post(`${API_URL}/api/jobs/posts`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Job Posted Successfully!");
      console.log("Job Saved:", res.data);

      setFormData({
        title: "",
        company: "",
        minimum: "",
        maximum: "",
        city: "",
        salary: "",
        location: "",
        date: "",
        experience: "",
        skills: "",
        employment: "",
        describe: "",
      });
      setPreview(null);

    } catch (err) {
      console.error("POST ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Unauthorized");
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.clear();
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
      {/* FORM */}
      <div className="min-h-screen pt-28 bg-gray-50 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl bg-white rounded-2xl p-8 border-2 border-[#000080] hover:border-[#1a1a99] transition shadow-lg"

        >
          <h1 className="text-3xl font-bold text-center mb-6 text-[#000080]">
            Post a Job
          </h1>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              ["title", "Job Title"],
              ["company", "Company Name"],
              ["minimum", "Minimum Salary"],
              ["maximum", "Maximum Salary"],
              ["city", "City"],
              ["salary", "Salary Type"],
              ["location", "Job Location"],
              ["experience", "Experience Level"],
              ["skills", "Required Skills"],
              ["employment", "Employment Type"],
            ].map(([name, placeholder]) => (
              <input
                key={name}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                className="input-style"
                required
              />
            ))}

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input-style"
              required
            />

            <label className="flex items-center gap-4 border-2 border-dashed border-[#000080] rounded-xl p-3 cursor-pointer">

              <div className="w-14 h-14 rounded-full border flex items-center justify-center overflow-hidden">
                {preview ? (
                  <img src={preview} alt="logo" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs">Logo</span>
                )}
              </div>
              <input type="file" accept="image/*" onChange={handleLogoChange} hidden />
            </label>
          </div>

          <textarea
            name="describe"
            rows="4"
            placeholder="Job Description"
            value={formData.describe}
            onChange={handleChange}
            className="input-style mt-5"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3 text-lg font-semibold border-2 border-[#000080] text-[#000080] rounded-lg hover:bg-blue-600 hover:text-white"
          >
            {loading ? "Posting..." : "Submit Job"}
          </button>
        </form>
      </div>

      <style>{`
        .input-style {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 12px;
        }
      `}</style>
    </>
  );
};

export default Posts;
