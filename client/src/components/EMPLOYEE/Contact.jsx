import React, { useState, useEffect } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Optional: check backend route
  useEffect(() => {
    fetch("http://localhost:4000/contact")
      .then(res => res.json())
      .then(data => console.log("API:", data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("Sending...");

    try {
      const res = await fetch("http://localhost:4000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,     // ✅ ADD THIS
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

  return (
      <>
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
            <a href="/myjobs" className="hover:text-blue-600">My Jobs</a>
            <a href="/posts" className="hover:text-blue-600">Post a Job</a>
            <a href="/contact" className="hover:text-blue-600">Contact</a>
          </div>

          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition">
            Logout
          </button>
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
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
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
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
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
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50"
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
