"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function OTPPage() {
  const [otp, setOtp] = useState("");
  const params = useSearchParams();
  const phone = params.get("phone");

  const verifyOtp = () => {
    alert("OTP Verified (demo) for " + phone);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Verify OTP</h2>
      <p>OTP sent to: {phone}</p>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOtp}>Verify</button>
    </div>
  );
}
