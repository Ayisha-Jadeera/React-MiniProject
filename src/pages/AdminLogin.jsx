// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin({ theme = "light" }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  // Hardcoded admin credentials
  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.username === ADMIN_CREDENTIALS.username &&
      formData.password === ADMIN_CREDENTIALS.password
    ) {
      // ✅ Store admin login flag in sessionStorage
      sessionStorage.setItem("adminLoggedIn", "true");

      setMessage("✅ Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/admin"); // Redirect to admin page
      }, 500);
    } else {
      setMessage("❌ Invalid credentials!");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: theme === "dark" ? "#1c1c1c" : "#f8f9fa",
        transition: "background-color 0.3s",
      }}
    >
      <div className="card shadow p-4" style={{ width: "350px", borderRadius: "15px" }}>
        <h2 className="text-center mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter admin username"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter admin password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        {message && <p className="text-center mt-3">{message}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;

