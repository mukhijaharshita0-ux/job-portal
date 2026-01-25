import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Users() {
  const navigate = useNavigate();

  //  Block page if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  //  Handle role selection safely
  const handleRoleSelect = (role) => {
    const storedUser = localStorage.getItem("user");

    let user = {};

    //  SAFE PARSING (NO CRASH EVER)
    if (storedUser && storedUser !== "undefined") {
      try {
        user = JSON.parse(storedUser);
      } catch (err) {
        console.error("Invalid user data. Resetting user.");
        user = {};
      }
    }

    //  Save role permanently until logout
    const updatedUser = {
      ...user,
      role,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    //  Redirect based on role
    if (role === "employee") {
      navigate("/single", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-[360px] text-center">
        <p className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome 👋
        </p>
        <p className="text-gray-500 mb-8">
          Tell us who you are
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleRoleSelect("jobseeker")}
            className="w-full py-3 rounded-xl text-white bg-indigo-600
                       hover:bg-indigo-700 hover:scale-105
                       transition-all duration-300"
          >
            Job Seeker
          </button>

          <button
            onClick={() => handleRoleSelect("employee")}
            className="w-full py-3 rounded-xl text-white bg-purple-600
                       hover:bg-purple-700 hover:scale-105
                       transition-all duration-300"
          >
            Employee
          </button>
        </div>
      </div>
    </div>
  );
}

export default Users;
