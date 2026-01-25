import { Navigate } from "react-router-dom";

function RoleRoute({ allowedRole, children }) {
  let user = null;

  try {
    const raw = localStorage.getItem("user");
    if (raw && raw !== "undefined") {
      user = JSON.parse(raw);
    }
  } catch (err) {
    console.error("Invalid user data in localStorage", err);
    localStorage.removeItem("user");
  }

  if (!user || user.role !== allowedRole) {
    return <Navigate to="/users" replace />;
  }

  return children;
}

export default RoleRoute;
