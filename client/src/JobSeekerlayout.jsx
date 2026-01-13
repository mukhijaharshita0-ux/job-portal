import { Outlet, Navigate } from "react-router-dom";
import Nav from "./components/JOB_SEEKER/Nav";

function JobSeekerLayout({ auth }) {
  if (!auth) return <Navigate to="/login" />;

  if (auth.role !== "job_seeker") {
    return <Navigate to="/users" />;
  }

  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default JobSeekerLayout;
