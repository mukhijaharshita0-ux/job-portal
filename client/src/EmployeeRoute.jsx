import { Navigate } from "react-router-dom";

const EmployeeRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) return <Navigate to="/login" replace />;
  if (user.role !== "employee") return <Navigate to="/" replace />;

  return children;
};

export default EmployeeRoute;
