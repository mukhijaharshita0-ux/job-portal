import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../design/login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [error, setError] = useState("");

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ UPDATED LOGIN HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/api/login", {
        name: formData.name,
        password: formData.password,
      });

      // ✅ STORE TOKEN, ROLE & USER ID
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId);

      // ✅ ROLE BASED REDIRECT
      if (res.data.role === "employee") {
        navigate("/dashboard");
      } else if (res.data.role === "jobseeker") {
        navigate("/jobs");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-purple-200 font-['Inter']">
      <form
        onSubmit={handleSubmit}
        className="
          max-w-sm w-full
          bg-white/25 backdrop-blur-xl
          border border-white/40
          p-6 rounded-2xl
          shadow-xl shadow-blue-300/20
          transition-all duration-300
          hover:scale-[1.02]
        "
      >
        <h2 className="text-2xl font-bold text-center mb-2 text-blue-900">
          Job Portal
        </h2>

        <p className="text-sm text-center mb-6 text-blue-700/80">
          Login to continue
        </p>

        {/* Username */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-blue-900">
            Username
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter username"
            required
            className="
              w-full px-3 py-2.5
              rounded-lg
              bg-white/30
              border border-white/40
              text-sm text-blue-900
              focus:ring-2 focus:ring-blue-400
            "
          />
        </div>

        {/* Password */}
        <div className="mb-5 relative">
          <label className="block mb-2 text-sm font-semibold text-blue-900">
            Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="
              w-full px-3 py-2.5 pr-12
              rounded-lg
              bg-white/30
              border border-white/40
              text-sm text-blue-900
              focus:ring-2 focus:ring-blue-400
            "
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="
              absolute right-3 top-10
              text-xs font-semibold
              text-blue-700 hover:text-blue-900
            "
          >
            {showPassword ? "HIDE" : "SHOW"}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-2.5 rounded-lg
            bg-blue-600/80 hover:bg-blue-700
            text-white font-semibold text-sm
            focus:ring-4 focus:ring-blue-300/50
            transition
            disabled:opacity-60
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <div className="text-center mt-4 text-sm text-blue-900">
          Don’t have an account?
          <Link
            to="/register"
            className="text-blue-700 hover:underline ml-1"
          >
            Register
          </Link>
        </div>

        {/* Error */}
        {error && (
          <p className="mt-4 text-sm text-red-600 text-center font-medium">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
