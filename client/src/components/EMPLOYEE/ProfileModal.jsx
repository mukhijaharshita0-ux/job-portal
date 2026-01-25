import { useEffect, useState } from "react";
import axios from "axios";

function ProfileModal({ show }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");



  useEffect(() => {
    if (!show) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated");
      return;
    }

    axios
      .get("http://localhost:4000/api/profile/data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProfile(res.data.user);
        setError("");
      })
      .catch((err) => {
        console.error(
          "Profile fetch error:",
          err.response?.data || err.message
        );
        setError("Failed to load profile");
      });
  }, [show]);

  if (!show) return null;

  return (
    <div className="absolute top-10 right-0 z-50 w-64 bg-white rounded-xl shadow-xl border p-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {profile && (
        <>
          <div className="border-b pb-2 mb-3">
            <h3 className="font-semibold text-lg">{profile.name}</h3>
          </div>

          <div className="space-y-2 text-sm">
            <p><b>Email:</b> {profile.email}</p>
            <p><b>City:</b> {profile.city || "Not provided"}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileModal;
