import React from "react";

function ProfileDropdown({ show }) {
  if (!show) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg p-4 z-50">
      <h4 className="text-sm font-semibold mb-3">Sign in</h4>

      <input
        type="email"
        placeholder="Email"
        className="w-full border rounded px-3 py-2 text-sm mb-2"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border rounded px-3 py-2 text-sm mb-3"
      />

      <button className="w-full bg-blue-600 text-white text-sm py-2 rounded">
        Login
      </button>
    </div>
  );
}

export default ProfileDropdown;
