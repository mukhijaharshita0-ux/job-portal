import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Users() {
  const navigate = useNavigate();

  // Block page if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleRoleSelect = (role) => {
    const storedUser = localStorage.getItem("user");
    let user = {};

    if (storedUser && storedUser !== "undefined") {
      try {
        user = JSON.parse(storedUser);
      } catch {
        user = {};
      }
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, role })
    );

    role === "employee"
      ? navigate("/single", { replace: true })
      : navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm text-center">

        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Welcome 👋
        </h2>

        <p className="text-gray-500 mb-6">
          Tell us who you are
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleRoleSelect("jobseeker")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg
                       hover:bg-blue-700 transition"
          >
            Job Seeker
          </button>

          <button
            onClick={() => handleRoleSelect("employee")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg
                       hover:bg-blue-700 transition"
          >
            Employee
          </button>
        </div>

      </div>
    </div>
  );
}

export default Users;
