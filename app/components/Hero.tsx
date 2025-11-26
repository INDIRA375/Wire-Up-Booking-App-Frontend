"use client";

import { motion } from "framer-motion";
import { Bolt, PhoneCall } from "lucide-react";

export default function Hero() {
  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-6xl font-extrabold mb-6">
          Fast & Reliable  
          <span className="text-yellow-300"> Electrician </span>  
          Services ⚡
        </h1>

        <p className="text-xl opacity-90 mb-8">
          Book certified electricians anytime — instant response, real-time tracking, safe & trusted.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/book"
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold text-lg hover:bg-yellow-300"
          >
            Book Now
          </a>

          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold text-lg hover:bg-gray-100"
          >
            <PhoneCall size={20} /> Call Support
          </a>
        </div>
      </motion.div>
    </div>
  );
}
