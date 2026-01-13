import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Resume() {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/resume/${jobId}`)

      .then(res => res.json())
      .then(data => setApplicants(data))
      .catch(err => console.log(err));
  }, [jobId]);

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
    <div className="min-h-screen bg-gray-100 p-10">
      <h2 className="text-2xl font-bold mb-4">Applied Candidates</h2>

      {applicants.length === 0 && <p>No applicants yet</p>}

      {applicants.map(app => (
        <div key={app._id} className="bg-white p-4 mb-3 rounded shadow">
          <p><b>Name:</b> {app.fullName}</p>
          <p><b>Email:</b> {app.email}</p>

          <a
            href={`http://localhost:4000/uploads/${app.resume}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            View Resume
          </a>
        </div>
      ))}
    </div>
    </>
  );
}

export default Resume;




// 66c1a8a2e9f1b123456789ab