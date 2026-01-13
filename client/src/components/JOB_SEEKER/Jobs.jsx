import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../design/jobs.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/jobs")
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.log(err));
  }, []);

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

            {/* Mobile Menu Button */}
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
    <div className="mt-[200px] jobs-container pt-24 sm:pt-25">
      {jobs.map(job => (
        <div className="job-card" key={job._id}>
          <h3>{job.title}</h3>
          <p>{job.company}</p>

          <Link to={`/apply/${job._id}`}>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Apply
            </button>
          </Link>
        </div>
      ))}
    </div>
    </>
  );
}

export default Jobs;
