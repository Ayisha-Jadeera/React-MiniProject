import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth, createUserWithEmailAndPassword } from "../firebase";  // ✅ import Firebase auth

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Auto-fetch location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation(`${pos.coords.latitude},${pos.coords.longitude}`),
        () => console.warn("Location access denied")
      );
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // Basic checks
    if (!name || !email || !password || !phone) {
      return setError("All fields are required");
    }
    if (!location) return setError("Location is required");

    try {
      // ✅ Firebase signup
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Save extra info in localStorage (or Firestore later)
      const userData = { 
        uid: firebaseUser.uid,
        name, 
        email, 
        phone, 
        location 
      };

      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/menu");
    } catch (err) {
      console.error("Signup error:", err.message);
      if (err.code === "auth/email-already-in-use") {
        setError("Email is already registered");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <h3 className="text-center mb-3">Create Account</h3>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSignup}>
          {/* Name */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Name</label>
          </div>

          {/* Email */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>

          {/* Password */}
          <div className="form-floating mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y pe-3"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            <label>Password</label>
          </div>

          {/* Phone */}
          <div className="form-floating mb-3">
            <input
              type="tel"
              className="form-control"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <label>Mobile Number</label>
          </div>

          {/* Location */}
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              value={location}
              readOnly
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() =>
                navigator.geolocation.getCurrentPosition(
                  (pos) => setLocation(`${pos.coords.latitude},${pos.coords.longitude}`),
                  () => alert("Location access denied")
                )
              }
            >
              Auto Detect
            </button>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-2">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to="/login" className="fw-bold text-primary">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;








