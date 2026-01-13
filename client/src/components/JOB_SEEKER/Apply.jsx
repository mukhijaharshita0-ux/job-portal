import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Apply = () => {
  const { jobId } = useParams();

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
      const res = await fetch(`http://localhost:4000/apply/${jobId}`, {
        method: "POST",
        body: formData,
      });

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

  return (
    <>
      <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-7"
              alt="Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              JobPortal
            </span>
          </a>

          {/* Right Buttons */}
          <div className="flex items-center gap-3 md:order-2">
            <button
              type="button"
              className="text-blue bg-brand hover:bg-brand-strong font-medium rounded-base text-sm px-3 py-2"
            >
              Logout
            </button>

            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center md:hidden"
            >
              ☰
            </button>
          </div>

          {/* Menu */}
          <div className="hidden md:flex md:order-1">
            <ul className="flex gap-8 font-medium">
              <li><a href="/" className="text-blue">Home</a></li>
              <li><a href="/jobs" className="hover:text-blue">Jobs</a></li>
            </ul>
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

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Submit Application
          </button>
        </form>
      </div>
    </>
  );
};

export default Apply;
