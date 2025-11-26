"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, User } from "lucide-react";
import { motion } from "framer-motion";

const RIGHT_IMAGES = [
  "/images/right1.jpg",
  "/images/right2.webp",
  "/images/right3.avif",
];

// Rotating placeholder suggestions
const SEARCH_SUGGESTIONS = [
  "Fan repair",
  "Switch installation",
  "Light setup",
  "Wiring service",
  "Inverter setup",
];

export default function LandingPage() {
  const [open, setOpen] = useState(false);

  // Placeholder Rotation Logic
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderText, setPlaceholderText] = useState(SEARCH_SUGGESTIONS[0]);

  useEffect(() => {
    // Update placeholder text with animation trigger
    setPlaceholderText(SEARCH_SUGGESTIONS[placeholderIndex]);

    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_SUGGESTIONS.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [placeholderIndex]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* NAVBAR */}
      <nav className="w-full fixed top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold">WIRE-UP</h1>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 text-gray-700 font-medium items-center">
            <Link href="/">Home</Link>
               <Link href="#services-section">Services</Link>
            {/* <Link href="/electricians">Electricians</Link> */}
            {/* <Link href="/book">Book Now</Link> */}

            {/* User Icon */}
            <Link href="/login">
            <User size={22} className="text-gray-700 cursor-pointer" />
             </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 border rounded-lg"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {open && (
          <div className="md:hidden bg-white border-t px-6 py-4 space-y-3 shadow">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link><br></br>
            <Link href="/services" onClick={() => setOpen(false)}>Services</Link><br></br>
            <Link href="/book" onClick={() => setOpen(false)}>Book Now</Link>

            {/* User Icon for mobile */}
            <User size={22} className="text-gray-700 mt-3" />
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <header className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* LEFT TEXT */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Home services at your{" "}
              <span className="text-black">doorstep</span>
            </h2><br></br>

            {/* Search with rotating placeholder */}
            <div className="mt-6 relative">
              <input
                  type="text"
                  placeholder={placeholderText}
                  className="w-full py-4 px-5 rounded-xl border border-gray-300 shadow placeholder-animate"
              />

              <Search
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
                size={22}
              />
            </div>
          </div>

          {/* IMAGES */}
          <div className="grid grid-cols-2 gap-4">
            {RIGHT_IMAGES.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className={`rounded-2xl overflow-hidden shadow ${
                  i === 0 ? "col-span-2 h-64" : "h-48"
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </header>

      {/* SERVICES */}
      <section id="services-section" className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold text-center">Our Services</h3>
        <p className="text-center text-gray-600 mt-2">
          Fast, reliable and affordable electrical services
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
          {[ 
            { title: "Fan Repair", price: "₹199", icon: "💨" },
            { title: "Switch Repair", price: "₹149", icon: "🔌" },
            { title: "Light Installation", price: "₹199", icon: "💡" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-gray-100 border rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="text-4xl">{s.icon}</div>
              <h4 className="font-semibold mt-3 text-xl">{s.title}</h4>
              <p className="mt-1 font-bold">{s.price}</p>
              <Link
                href="/book"
                className="inline-block mt-4 bg-gray-900 text-white px-4 py-2 rounded-full"
              >
                Book Now
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 py-10 border-t">
        <div className="text-center">
          <h4 className="text-xl font-bold">WIRE-UP</h4>
          <p className="text-gray-700 mt-2">Professional electrician services</p>
          <p className="text-sm text-gray-500 mt-4">
            © {new Date().getFullYear()} WIRE-UP. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}