import { Routes, Route } from "react-router-dom";

/* ===== JOB SEEKER ===== */
import Jobs from "./components/JOB_SEEKER/Jobs";
import Apply from "./components/JOB_SEEKER/Apply";
import Login from "./components/JOB_SEEKER/Login";
import Register from "./components/JOB_SEEKER/Register";
import Nav from "./components/JOB_SEEKER/Nav";

/* ===== EMPLOYEE ===== */
import Dashboard from "./components/EMPLOYEE/Dashboard";
import Posts from "./components/EMPLOYEE/Posts";
import Myjobs from "./components/EMPLOYEE/Myjobs";
import Contact from "./components/EMPLOYEE/Contact";
import Single from "./components/EMPLOYEE/Single";
import Resume from "./components/EMPLOYEE/Resume";
import EmployeeJobs from "./components/EMPLOYEE/EmployeeJobs";
import Resumes from "./components/EMPLOYEE/Resumes";
/* ===== ROUTE GUARDS ===== */
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import RoleRoute from "./components/ProtectedRoute/RoleRoute";

/* ===== ROLE SELECTION ===== */
import Users from "./components/role/Users";

function App() {
  return (
    <Routes>

      {/* ===== AUTH ===== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ===== ROLE SELECTION ===== */}
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />

      {/* ===== JOB SEEKER ROUTES ===== */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="jobseeker">
              <Nav />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="jobseeker">
              <Jobs />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/apply/:jobId"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="jobseeker">
              <Apply />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* ===== EMPLOYEE ROUTES ===== */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="employee">
              <Dashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/resumes"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="employee">
              <Resumes />
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="employee">
              <EmployeeJobs />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/posts"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="employee">
              <Posts />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/myjobs"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="employee">
              <Myjobs />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/single"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="employee">
              <Single />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="employee">
              <Contact />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume/:id"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="employee">
              <Resume />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
