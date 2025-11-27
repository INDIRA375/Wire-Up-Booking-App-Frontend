"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, User } from "lucide-react";
import { motion, HTMLMotionProps } from "framer-motion";

const MotionDiv: React.FC<HTMLMotionProps<"div">> = motion.div;

const RIGHT_IMAGES: string[] = [
  "/images/right1.jpg",
  "/images/right2.webp",
  "/images/right3.avif",
];

// Rotating placeholder suggestions
const SEARCH_SUGGESTIONS: string[] = [
  "Fan repair",
  "Switch installation",
  "Light setup",
  "Wiring service",
  "Inverter setup",
];

export default function LandingPage() {
  const [open, setOpen] = useState<boolean>(false);
  const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);
  const [placeholderText, setPlaceholderText] = useState<string>(
    SEARCH_SUGGESTIONS[0]
  );

  useEffect(() => {
    setPlaceholderText(SEARCH_SUGGESTIONS[placeholderIndex]);
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_SUGGESTIONS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [placeholderIndex]);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false); // Close mobile menu if open
  };

  // Pastel gradients for service cards
  const pastelGradients: string[] = [
    "bg-gradient-to-br from-pink-100 to-pink-200",
    "bg-gradient-to-br from-blue-100 to-blue-200",
    "bg-gradient-to-br from-yellow-100 to-yellow-200",
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* NAVBAR */}
      <nav className="w-full fixed top-0 z-50 bg-white border-b border-gray-200 shadow-sm h-20 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-tight">WIRE-UP</h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 text-gray-700 font-medium items-center">
            <button
              onClick={() => scrollToSection("hero")}
              className="hover:text-black transition"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="hover:text-black transition"
            >
              Services
            </button>
            <Link href="/login">
              <div className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer">
                <User size={22} className="text-gray-700" />
              </div>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 border rounded-lg hover:bg-gray-50"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {open && (
          <div className="absolute top-20 left-0 w-full bg-white border-t px-6 py-6 space-y-4 shadow-lg">
            <button
              className="block text-lg font-medium text-left w-full"
              onClick={() => scrollToSection("hero")}
            >
              Home
            </button>
            <button
              className="block text-lg font-medium text-left w-full"
              onClick={() => scrollToSection("services")}
            >
              Services
            </button>
            <Link
              href="/book"
              className="block text-lg font-medium text-blue-600"
              onClick={() => setOpen(false)}
            >
              Book Now
            </Link>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <header id="hero" className="pt-28 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
              Home services at your doorstep
            </h2> <br></br>

            {/* Search Box */}
            <div className="mt-8 relative max-w-md">
              <input
                type="text"
                placeholder={placeholderText}
                className="w-full py-4 px-6 pr-12 rounded-2xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue transition-all text-black placeholder-1000"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
                <Search className="text-black-600" size={20} />
              </button>
            </div>
          </div>

          {/* RIGHT IMAGES */}
          <div className="grid grid-cols-2 gap-4">
            {RIGHT_IMAGES.map((img: string, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className={`rounded-2xl overflow-hidden shadow-lg bg-gray-200 ${
                  i === 0 ? "col-span-2 h-72 md:h-80" : "h-40 md:h-48"
                }`}
              >
                <img
                  src={img}
                  alt="Service"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </header>

      {/* SERVICES SECTION */}
      <section id="services" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-3xl md:text-4xl font-bold">Our Services</h3>
            <p className="text-gray-600 mt-3 text-lg">
              Fast, reliable and affordable electrical services.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { title: "Fan Repair", price: "₹199", icon: "💨" },
              { title: "Switch Repair", price: "₹149", icon: "🔌" },
              { title: "Light Installation", price: "₹199", icon: "💡" },
            ].map((s, i) => (
              <MotionDiv
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all ${pastelGradients[i % pastelGradients.length]}`}
              >
                <div className="text-5xl mb-4">{s.icon}</div>
                <h4 className="font-bold text-xl mb-2">{s.title}</h4>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-lg font-bold text-gray-900">{s.price}</p>
                  <Link
                    href="/book"
                    className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
                  >
                    Book Now
                  </Link>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-12 border-t border-gray-200">
        <div className="text-center">
          <h4 className="text-2xl font-black">WIRE-UP</h4>
          <p className="text-gray-600 mt-2">Professional electrician services.</p>
          <p className="text-sm text-gray-400 mt-6">
            © {new Date().getFullYear()} WIRE-UP. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
