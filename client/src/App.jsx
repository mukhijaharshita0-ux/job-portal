import { Routes, Route, Navigate } from "react-router-dom";

// JOB SEEKER
import Nav from "./components/JOB_SEEKER/Nav";
import Apply from "./components/JOB_SEEKER/Apply";
import Jobs from "./components/JOB_SEEKER/Jobs";

// EMPLOYEE
import EmployeeJobs from "./components/EMPLOYEE/EmployeeJobs";
import Posts from "./components/EMPLOYEE/Posts";
import Single from "./components/EMPLOYEE/Single";
import Contact from "./components/EMPLOYEE/Contact";
import Resume from "./components/EMPLOYEE/Resume";
import Dashboard from "./components/EMPLOYEE/Dashboard";
import Myjobs from "./components/EMPLOYEE/Myjobs";

// AUTH
import Login from "./components/JOB_SEEKER/Login";
import Register from "./components/JOB_SEEKER/Register";

function App() {
  const userId = localStorage.getItem("userId"); // 🔑 ONLY CHECK

  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route
        path="/login"
        element={!userId ? <Login /> : <Navigate to="/" replace />}
      />
      <Route
        path="/register"
        element={!userId ? <Register /> : <Navigate to="/" replace />}
      />

      {/* 🔒 PROTECTED ROUTES */}
      <Route
        path="/"
        element={userId ? <Nav /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/jobs"
        element={userId ? <Jobs /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/apply/:jobId"
        element={userId ? <Apply /> : <Navigate to="/login" replace />}
      />

      {/* EMPLOYEE */}
      <Route
        path="/employee"
        element={userId ? <EmployeeJobs /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/posts"
        element={userId ? <Posts /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/single"
        element={userId ? <Single /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/myjobs"
        element={userId ? <Myjobs /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/dashboard"
        element={userId ? <Dashboard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/contact"
        element={userId ? <Contact /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/resume/:jobId"
        element={userId ? <Resume /> : <Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default App;
