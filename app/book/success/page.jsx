"use client";

import { motion } from "framer-motion";
import { CheckCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BookingSuccess() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-10 rounded-3xl shadow-xl border max-w-md w-full text-center"
      >
        <CheckCircle className="text-green-500 mx-auto mb-4" size={70} />

        <h1 className="text-3xl font-bold text-gray-700 mb-2">
          Booking Confirmed! 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for booking with us.  
          You will receive a confirmation call shortly.
        </p>

        {/* Book Now Button (Navigates to Success Page) */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => router.push("/book/success")}
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 transition rounded-xl text-white font-semibold text-lg shadow-md mb-4"
        >
          Book Now
        </motion.button>

        {/* Go Home */}
        <motion.div whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-xl shadow-md text-lg"
          >
            Go to Home
            <ChevronRight size={20} />
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
}
