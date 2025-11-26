"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [errors, setErrors] = useState({});

  // ✅ HANDLE REGISTER (NOW CONNECTED TO BACKEND)
  const handleRegister = async () => {
    const newErrors = {};

    // --- Validation ---
    if (!name.trim()) newErrors.name = "Full name is required";
    if (!mobile.trim()) newErrors.mobile = "Mobile number is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    if (!confirmPass.trim())
      newErrors.confirmPass = "Please re-enter your password";

    if (password && confirmPass && password !== confirmPass) {
      newErrors.confirmPass = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // --- Connect to Backend ---
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          mobile,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        router.push("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      alert("Server Error: " + error.message);
    }
  };

  // Dynamic styling for error handling
  const inputClass = (err) =>
    `w-full mt-1 px-4 py-3 rounded-xl bg-white/70 border ${
      err ? "border-red-500" : "border-gray-300"
    } focus:ring-2 ${
      err ? "focus:ring-red-400" : "focus:ring-purple-400"
    } outline-none`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-white/50 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-8"
      >
        <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-4 tracking-wide">
          Create Account
        </h1>

        <p className="text-center text-gray-600 mb-8 text-sm">
          Join WIRE-UP and start booking services
        </p>

        <div className="space-y-4">
          {/* FULL NAME */}
          <div>
            <label className="font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass(errors.name)}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* MOBILE */}
          <div>
            <label className="font-medium text-gray-700">Mobile Number</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className={inputClass(errors.mobile)}
              placeholder="Enter your mobile number"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass(errors.email)}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass(errors.password)}
              placeholder="Create password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="font-medium text-gray-700">
              Re-enter Password
            </label>
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className={inputClass(errors.confirmPass)}
              placeholder="Re-enter password"
            />
            {errors.confirmPass && (
              <p className="text-red-500 text-sm">{errors.confirmPass}</p>
            )}
          </div>

          {/* REGISTER BUTTON */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleRegister}
            className="w-full mt-6 py-3 rounded-xl bg-purple-600 text-white font-semibold shadow-lg hover:bg-purple-700 transition"
          >
            Register
          </motion.button>
        </div>

        <p className="text-center mt-6 text-sm text-gray-700">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-purple-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
