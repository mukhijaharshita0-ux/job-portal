import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmailModel from "./EmailModel";
import ProfileModal from "./ProfileModal";

function Dashboard() {
    const navigate = useNavigate();
const [menuOpen, setMenuOpen] = useState(false);

    const [candidates, setCandidates] = useState([]);
    const [isEmailOpen, setIsEmailOpen] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    // ✅ FETCH APPLICANTS
    const fetchCandidates = () => {
        fetch("http://localhost:4000/api/applicants")
            .then(res => res.json())
            .then(data => {
                const formatted = data.map(item => ({
                    id: item._id,
                    name: item.fullName,
                    email: item.email,
                    resume: item.resume,
                    status: "Pending"
                }));
                setCandidates(formatted);
            })
            .catch(err => console.log(err));
    };

    // ✅ LOAD + AUTO REFRESH AFTER APPLY
    useEffect(() => {
        fetchCandidates();

        const refresh = () => fetchCandidates();
        window.addEventListener("applicant-added", refresh);

        return () => {
            window.removeEventListener("applicant-added", refresh);
        };
    }, []);

    //  UPDATE STATUS (FRONTEND ONLY)
    const updateStatus = (id, newStatus) => {
        setCandidates(prev =>
            prev.map(c =>
                c.id === id ? { ...c, status: newStatus } : c
            )
        );
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };
    return (
        <>
           <nav className="bg-neutral-primary w-full border-b border-default">
             <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 relative">
           
               {/* LOGO */}
               <Link
                 to="/single"
                 className="flex items-center text-[#000080] hover:text-[#1a1a99] 
                            text-2xl sm:text-3xl font-semibold transition"
                 style={{ fontFamily: "'Limelight', cursive" }}
               >
                 Jobsy
               </Link>
           
               {/* RIGHT ACTIONS */}
               <div className="flex items-center gap-4 md:order-2">
           
                 {/* PROFILE */}
                 <div
                   className="relative text-[#000080] cursor-pointer font-medium hidden sm:block"
                   onMouseEnter={() => setShowProfile(true)}
                   onMouseLeave={() => setShowProfile(false)}
                 >
                   Profile
                   <ProfileModal show={showProfile} />
                 </div>
           
                 {/* LOGOUT */}
                 <button
                   onClick={handleLogout}
                   className="hidden sm:block text-[#000080] font-medium text-sm px-3 py-2 transition"
                 >
                   Logout
                 </button>
           
                 {/* HAMBURGER */}
                 <button
                   type="button"
                   onClick={() => setMenuOpen(!menuOpen)}
                   className="text-[#000080] inline-flex items-center p-2 w-10 h-10 justify-center md:hidden"
                 >
                   ☰
                 </button>
               </div>
           
               {/* MENU */}
               <div
                 className={`
                   text-[#000080]
                   absolute md:static
                   top-full left-0
                   w-full md:w-auto
                   bg-white md:bg-transparent
                   shadow-md md:shadow-none
                   ${menuOpen ? "block" : "hidden"}
                   md:flex md:order-1
                 `}
               >
                 <ul className="flex flex-col md:flex-row gap-4 md:gap-8 font-medium p-4 md:p-0">
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
           
                   {/* MOBILE ONLY */}
                   <li className="sm:hidden">
                     <button onClick={handleLogout}>Logout</button>
                   </li>
                 </ul>
               </div>
           
             </div>
           </nav>

           <div className="min-h-screen bg-gray-100 px-2 sm:px-4 pt-24 sm:pt-36">

                <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">

                    <h1 className="text-2xl font-bold text-gray-800 mb-6">
                        Candidate Dashboard
                    </h1>

                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3 text-left text-sm font-semibold">Name</th>
                                    <th className="p-3 text-left text-sm font-semibold">Email Address</th>
                                    <th className="p-3 text-left text-sm font-semibold">Status</th>
                                    <th className="p-3 text-center text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {candidates.map(candidate => (
                                    <tr key={candidate.id} className="border-t">
                                        <td className="p-3">{candidate.name}</td>
                                        <td className="p-3">{candidate.email}</td>

                                        <td className="p-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium
                          ${candidate.status === "Selected"
                                                        ? "bg-green-100 text-green-700"
                                                        : candidate.status === "Rejected"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {candidate.status}
                                            </span>
                                        </td>

                                        <td className="p-3 flex flex-wrap gap-2 justify-center">
                                            <button
                                                onClick={() => navigate(`/resume/${candidate.id}`)}
                                                className="text-blue-600 text-sm underline"
                                            >
                                                View Resume
                                            </button>

                                            <button
                                                onClick={() => updateStatus(candidate.id, "Selected")}
                                                className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
                                            >
                                                Select
                                            </button>

                                            <button
                                                onClick={() => updateStatus(candidate.id, "Rejected")}
                                                className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
                                            >
                                                Reject
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setSelectedCandidate(candidate);
                                                    setIsEmailOpen(true);
                                                }}
                                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
                                            >
                                                Send Email
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <EmailModel
                    isOpen={isEmailOpen}
                    candidate={selectedCandidate}
                    onClose={() => setIsEmailOpen(false)}
                />
            </div>
        </>
    );
}

export default Dashboard;
