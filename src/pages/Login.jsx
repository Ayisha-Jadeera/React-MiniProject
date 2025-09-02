import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState(null);
  const [step, setStep] = useState(1); // 1=phone, 2=OTP
  const [message, setMessage] = useState("");

  const handleSendOtp = () => {
    if (!phone.match(/^\d{10}$/)) {
      setMessage("❌ Enter a valid 10-digit mobile number.");
      return;
    }

    // Generate OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000);
    setSentOtp(generatedOtp);
    console.log("Generated OTP:", generatedOtp); // show in console for testing
    setStep(2);
    setMessage(`✅ OTP sent to ${phone}`);
  };

  const handleVerifyOtp = () => {
    if (parseInt(otp) === sentOtp) {
      const userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
      const existingUser = userDetails.find(u => u.phone === phone);

      const user = { phone };
      onLoginSuccess(user);
      localStorage.setItem("user", JSON.stringify(user));

      if (existingUser) {
        // Existing customer → go directly to Menu
        navigate("/menu");
      } else {
        // New customer → redirect to signup/details page
        navigate("/user-details");
      }
    } else {
      setMessage("❌ Invalid OTP. Try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ minWidth: "300px" }}>
        <h2 className="mb-3">Customer Login</h2>

        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Enter mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control mb-3"
            />
            <button className="btn btn-primary w-100" onClick={handleSendOtp}>
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-center">OTP sent to {phone}</p>
            <input
              type="text"
              placeholder={`Enter OTP (for testing: ${sentOtp})`}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="form-control mb-3"
            />
            <button className="btn btn-success w-100" onClick={handleVerifyOtp}>
              Verify OTP
            </button>
            <button className="btn btn-link mt-2" onClick={() => setStep(1)}>
              Resend OTP
            </button>
          </>
        )}

        {message && <p className="text-center mt-2">{message}</p>}
      </div>
    </div>
  );
}

