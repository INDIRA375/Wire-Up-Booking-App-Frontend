"use client";


import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ColorChanger from "../components/ColorChanger";

export default function LoginPage() {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const inputClass = (err) =>
    `w-full px-4 py-3 bg-gray-50 border rounded-xl transition-all duration-300 
     outline-none text-black
     focus:ring-2 focus:ring-blue-600 focus:bg-white
     ${err ? "border-red-500" : "border-gray-300"}`;

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    const data = await res.json();

    if (data.success) {
      alert("OTP sent successfully!");
      router.push(`/otp?phone=${phone}`);
    } else {
      alert("Failed to send OTP");
    }
  } catch (err) {
    alert("Server error!");
    console.log(err);
  }
};

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 transition-all duration-700"
      style={{ background: bgColor }}
    >
      <ColorChanger onColorChange={setBgColor} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-lg bg-white shadow-xl border border-gray-100 rounded-3xl p-10"
      >
        {/* Close Button */}
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
        >
          <X size={26} />
        </button>

        {/* Branding */}
        <h1 className="text-4xl font-extrabold text-center mb-2 tracking-tight text-black">
          WIRE-UP
        </h1>
        <p className="text-center text-gray-600 mb-8 text-sm">
          Enter your details to continue
        </p>

        {/* FORM */}
        <div className="space-y-6">
          <div>
            <label className="text-sm text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass(errors.name)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass(errors.email)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass(errors.phone)}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleSubmit}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition"
          >
            Submit
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
