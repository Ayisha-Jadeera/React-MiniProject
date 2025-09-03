import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "../firebase";


function Login({ setUser }) {
  const [method, setMethod] = useState("email"); // "email" or "otp"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [location, setLocation] = useState(null);

  const navigate = useNavigate();

  // Get current location
  const getLocation = (callback) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(loc);
          callback(loc);
        },
        () => callback(null)
      );
    } else callback(null);
  };

  // Email login
  const handleEmailLogin = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) return setError("All fields are required");
    
    getLocation((loc) => {
      const userData = { email, location: loc };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      navigate("/menu");
    });
  };

  // OTP login (mock for frontend-only)
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone) return setError("Phone is required");
    setConfirmationResult(true); // simulate OTP sent
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp) return setError("Enter OTP");
    getLocation((loc) => {
      const userData = { phone, location: loc };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      navigate("/menu");
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-3">Welcome Back</h3>
        <div className="d-flex justify-content-around mb-3">
          <button
            className={`btn ${method === "email" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setMethod("email")}
          >
            Email Login
          </button>
          <button
            className={`btn ${method === "otp" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setMethod("otp")}
          >
            OTP Login
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {method === "email" ? (
          <form onSubmit={handleEmailLogin}>
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
        ) : (
          <form onSubmit={confirmationResult ? handleVerifyOtp : handleSendOtp}>
            <input
              type="tel"
              className="form-control mb-2"
              placeholder="+91 1234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              disabled={!!confirmationResult}
            />
            {confirmationResult && (
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            )}
            <button type="submit" className="btn btn-primary w-100">
              {confirmationResult ? "Verify & Login" : "Send OTP"}
            </button>
          </form>
        )}

        <p className="text-center mt-3">
          New user? <Link to="/signup" className="fw-bold text-primary">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;











