import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

const API_URL = import.meta.env.VITE_API_URL;

const Posts = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

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
