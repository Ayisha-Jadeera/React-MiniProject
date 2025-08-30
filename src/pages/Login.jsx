import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate

export default function AuthForm() {
  const navigate = useNavigate(); // <-- initialize navigate
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      if (!formData.email || !formData.password) {
        setMessage("❌ Please enter email and password.");
        return;
      }
      setMessage("✅ Login successful!");

      // Redirect to menu after 1 second
      setTimeout(() => {
        navigate("/menu");
      }, 1000);
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setMessage("❌ Please fill all fields to sign up.");
        return;
      }
      setMessage("✅ Account created successfully!");

      // Redirect to menu after 1 second
      setTimeout(() => {
        navigate("/menu");
      }, 1000);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: "url('/images/bglogin.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div
        className="card shadow p-4"
        style={{
          color: "black",
          width: "380px",
          borderRadius: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
        }}
      >
        <h2 className="text-center mb-4">
          {isLogin ? "Customer Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {message && <p className="text-center mt-3">{message}</p>}

        <p className="text-center mt-3">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            className="btn btn-link p-0"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
