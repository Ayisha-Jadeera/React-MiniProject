// src/pages/LoginOTP.jsx
import React, { useState, useEffect } from "react";
import { auth } from "../firebase"; // Your firebase.js
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginOtp = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  // Auto redirect if already logged in
  useEffect(() => {
    const savedPhone = localStorage.getItem("userPhone");
    if (savedPhone) navigate("/menu");
  }, [navigate]);

  // Timer countdown for resend
  useEffect(() => {
    let interval;
    if (timer > 0) interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Setup invisible reCAPTCHA
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container", // container ID
        { size: "invisible" },
        auth
      );
      window.recaptchaVerifier.render().then(widgetId => {
        window.recaptchaWidgetId = widgetId;
      });
    }
    return window.recaptchaVerifier;
  };

  // Send OTP
  const handleSendOtp = async () => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }

    const appVerifier = setupRecaptcha();

    try {
      const result = await signInWithPhoneNumber(auth, `+91${phone}`, appVerifier);
      setConfirmationResult(result);
      setTimer(30); // 30-second cooldown for resend
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Failed to send OTP:", error);
      alert("Failed to send OTP. Check console for details.");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!confirmationResult) return;

    try {
      await confirmationResult.confirm(otp);
      localStorage.setItem("userPhone", phone);
      navigate("/menu");
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>📱 Customer Login</h2>

      {/* Phone input */}
      <input
        type="text"
        placeholder="Enter mobile number"
        className="form-control mb-3"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      {/* Send OTP button */}
      <button
        className="btn btn-primary mb-3"
        onClick={handleSendOtp}
        disabled={timer > 0}
      >
        {timer > 0 ? `Resend OTP in ${timer}s` : "Get OTP"}
      </button>

      <div id="recaptcha-container"></div>

      {/* OTP input*/} 
      {confirmationResult && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            className="form-control mb-3"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleVerifyOtp}>
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
};

export default LoginOtp;


