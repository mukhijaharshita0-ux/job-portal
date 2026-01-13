import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailModel from "./EmailModel";

function Dashboard() {
    const navigate = useNavigate();

    const [candidates, setCandidates] = useState([]);
    const [isEmailOpen, setIsEmailOpen] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    // ✅ FETCH APPLICANTS
    const fetchCandidates = () => {
        fetch("http://localhost:4000/applicants")
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

    // ✅ UPDATE STATUS (FRONTEND ONLY)
    const updateStatus = (id, newStatus) => {
        setCandidates(prev =>
            prev.map(c =>
                c.id === id ? { ...c, status: newStatus } : c
            )
        );
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

            <div className="min-h-screen flex items-start justify-center bg-gray-100 px-4 pt-24 sm:pt-40">
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
