import React, { useState } from "react";
import ProfileModal from "./ProfileModal";
import resume from "../images/premium_photo-1661328090120-a6ef40841abe.avif";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../design/single.css";


function Single() {
    const [showProfile, setShowProfile] = useState(false);
    const { jobId } = useParams();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");   // remove login token
        navigate("/login");                 // redirect to login
    };
    return (
        <>
            {/* NAVBAR */}
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
                    <div className="flex items-center gap-3 md:order-2 no-bullet">
                        <li
                            className="nav-item profile-item"
                            onMouseEnter={() => setShowProfile(true)}
                            onMouseLeave={() => setShowProfile(false)}
                        >
                            Profile
                            <ProfileModal show={showProfile} />
                        </li>
                        <button
                            type="button"
                            onClick={handleLogout}
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
                            <li><a href="/dashboard" className="text-blue">Dashboard</a></li>
                            <li><a href="/myjobs" className="hover:text-blue">My Jobs</a></li>
                            <li><a href="/posts" className="hover:text-blue">Post a Job</a></li>
                            <li><a href="/contact" className="hover:text-blue">Contact</a></li>

                        </ul>
                    </div>

                </div>
            </nav>
            <div className="mt-[120px] w-full">
                <figure className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
                    <img
                        src={resume}
                        alt="Cat background"
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay text */}

                    <figcaption
                        className="absolute inset-0 flex items-center justify-center bg-black/30"
                    >

                        <Link
                            to={`/resume/${jobId}`}

                            className="block text-white text-xl md:text-2xl font-semibold text-center px-6 capitalize resume-link"
                        >
                            Click here to view resume of candidates
                        </Link>

                    </figcaption>

                </figure>


            </div>

        </>
    );
}

export default Single;
