"use client";

import { useState, useEffect, forwardRef } from "react";
import Link from "next/link";
import { Menu, X, Search, User } from "lucide-react";
import { motion, MotionProps } from "framer-motion";

// Typed MotionDiv: merges native div props with motion props
type MotionDivProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;
const MotionDiv = motion(
  forwardRef<HTMLDivElement, MotionDivProps>(function MotionDiv(props, ref) {
    return <div ref={ref} {...props} />;
  })
);

const RIGHT_IMAGES = [
  "/images/right1.jpg",
  "/images/right2.webp",
  "/images/right3.avif",
];

const SEARCH_SUGGESTIONS = [
  "Fan repair",
  "Switch installation",
  "Light setup",
  "Wiring service",
  "Inverter setup",
];

export default function LandingPage() {
  const [open, setOpen] = useState(false);

  // Placeholder rotation
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderText, setPlaceholderText] = useState(SEARCH_SUGGESTIONS[0]);

  useEffect(() => {
    setPlaceholderText(SEARCH_SUGGESTIONS[placeholderIndex]);
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_SUGGESTIONS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [placeholderIndex]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* NAVBAR */}
      {/* ... your nav code ... */}

      {/* HERO SECTION */}
      <header className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT TEXT */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Home services at your <span className="text-black">doorstep</span>
            </h2>

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
              <MotionDiv
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className={`rounded-2xl overflow-hidden shadow ${
                  i === 0 ? "col-span-2 h-64" : "h-48"
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </MotionDiv>
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
            <MotionDiv
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
            </MotionDiv>
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