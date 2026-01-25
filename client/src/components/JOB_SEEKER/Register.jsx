import "../design/register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/users", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      await axios.post(`${API}/api/jobs/register`, data);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-purple-200 font-['Inter']">
      <div className="max-w-2xl w-full bg-white/25 backdrop-blur-xl border border-white/40 p-8 rounded-2xl shadow-xl shadow-blue-300/20">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">
          Create Account
        </h2>
        <p className="text-sm text-center text-blue-700/80 mb-8">
          Join the Job Portal today
        </p>

        {error && (
          <p className="mb-6 text-sm text-red-600 text-center font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">
            <FloatingInput label="Full Name" name="name" type="text" />
            <FloatingInput label="Email Address" name="email" type="email" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <SelectInput
              name="education"
              label="Education Level"
              options={[
                "Undergraduate",
                "Graduate",
                "Postgraduate",
                "Diploma",
              ]}
            />

            <div className="relative z-0 w-full group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder=" "
                required
                className="block py-2.5 px-0 w-full text-sm text-blue-900 bg-transparent border-0 border-b-2 border-blue-300 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              />
              <label className="floating-label">Password</label>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-3 text-xs font-semibold text-blue-700"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FloatingInput label="Age" name="age" type="number" />
            <FloatingInput label="Phone Number" name="phone" type="tel" />
          </div>

          <FloatingInput label="City" name="city" type="text" />

          <button
            type="submit"
            className="w-full mt-4 text-white bg-blue-600/80 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300/50 shadow-md shadow-blue-300/30 font-semibold rounded-lg text-sm px-4 py-2.5 transition-all"
          >
            Register
          </button>

          <div className="text-center text-sm text-blue-900 mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700 underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

/* Floating Input */
function FloatingInput({ label, name, type }) {
  return (
    <div className="relative z-0 w-full group">
      <input
        type={type}
        name={name}
        placeholder=" "
        required
        className="block py-2.5 px-0 w-full text-sm text-blue-900 bg-transparent border-0 border-b-2 border-blue-300 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
      />
      <label className="floating-label">{label}</label>
    </div>
  );
}

/* Select Input */
function SelectInput({ name, label, options }) {
  return (
    <div className="relative z-0 w-full group">
      <select
        name={name}
        required
        className="block py-2.5 px-0 w-full text-sm text-blue-900 bg-transparent border-0 border-b-2 border-blue-300 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
      >
        <option value="" />
        {options.map((opt, i) => (
          <option key={i} value={opt.toLowerCase()}>
            {opt}
          </option>
        ))}
      </select>
      <label className="floating-label">{label}</label>
    </div>
  );
}

export default Register;
