import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDetailsForm({ user, onSubmit }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Get current geolocation
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setMessage("Geolocation not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation(`Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`);
        setMessage("✅ Current location captured!");
      },
      (err) => {
        console.error(err);
        setMessage("❌ Unable to retrieve location.");
      }
    );
  };

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !location) {
      setMessage("❌ Please fill all fields or use current location.");
      return;
    }

    // Safely parse localStorage
    let userDetails = [];
    const stored = localStorage.getItem("userDetails");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        userDetails = Array.isArray(parsed) ? parsed : [];
      } catch {
        userDetails = [];
      }
    }

    // Check if user already exists
    const existingIndex = userDetails.findIndex(u => u.phone === user.phone);
    const newUser = { phone: user.phone, name, location };

    if (existingIndex !== -1) {
      userDetails[existingIndex] = newUser; // update existing
    } else {
      userDetails.push(newUser); // add new
    }

    // Save to localStorage
    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    // Update parent App state
    onSubmit(newUser);

    // Navigate to Menu
    navigate("/menu");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ minWidth: "320px" }}>
        <h2 className="mb-3">Your Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter location or use current"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-sm btn-outline-primary mt-2"
              onClick={handleUseCurrentLocation}
            >
              Use Current Location
            </button>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Continue to Menu
          </button>
        </form>
        {message && <p className="text-center mt-3">{message}</p>}
      </div>
    </div>
  );
}


