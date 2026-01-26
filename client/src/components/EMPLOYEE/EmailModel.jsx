import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function EmailModel({ isOpen, onClose, candidate }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen || !candidate) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: candidate.email,
          name: candidate.name,
          subject,
          message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Email sent successfully");
        onClose();
        setSubject("");
        setMessage("");
      } else {
        alert("Failed to send email");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Send Email to {candidate.name}
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            value={candidate.email}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />

          <textarea
            rows="4"
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="border px-4 py-2">
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmailModel;
