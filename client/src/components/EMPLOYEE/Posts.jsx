import React, { useState } from "react";
import axios from "axios";

const Posts = () => {
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
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      console.log("TOKEN:", token);

      const res = await axios.post(
        "http://localhost:4000/api/jobs/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job Posted Successfully!");
      console.log("Response:", res.data);

      // Reset form
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
      console.error(
        "Error posting job:",
        err.response?.data || err.message
      );
      alert("Unauthorized or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-20 bg-white border-b">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
          <a href="/" className="flex items-center gap-3">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-7"
              alt="logo"
            />
            <span className="text-xl font-semibold">JobPortal</span>
          </a>

          <div className="flex gap-6 font-medium">
            <a href="/dashboard" className="text-blue-600">Dashboard</a>
            <a href="/myjobs">My Jobs</a>
            <a href="/posts">Post a Job</a>
            <a href="/contact">Contact</a>
          </div>

          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white">
            Logout
          </button>
        </div>
      </nav>

      {/* FORM */}
      <div className="min-h-screen pt-28 bg-gray-50 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl bg-white rounded-2xl p-8 border-2 border-blue-600 shadow-lg"
        >
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
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

            {/* LOGO */}
            <label className="flex items-center gap-4 border-2 border-dashed border-blue-600 rounded-xl p-3 cursor-pointer">
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
            className="w-full mt-6 py-3 text-lg font-semibold border-2 border-blue-600 text-blue-700 rounded-lg hover:bg-blue-600 hover:text-white"
          >
            {loading ? "Posting..." : "Submit Job"}
          </button>
        </form>
      </div>

      <style>
        {`
          .input-style {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #d1d5db;
            border-radius: 12px;
          }
        `}
      </style>
    </>
  );
};

export default Posts;

