"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

// Accent Colors
const accentColors = [
  "from-blue-500/10 to-blue-100",
  "from-purple-500/10 to-purple-100",
  "from-orange-500/10 to-orange-100",
  "from-emerald-500/10 to-emerald-100",
  "from-rose-500/10 to-rose-100",
  "from-indigo-500/10 to-indigo-100",
  "from-cyan-500/10 to-cyan-100",
];

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings from API
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/bookings/mybookings", {
        headers: {
          Authorization: token,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setBookings(data.bookings);
      } else {
        alert(data.error || "Failed to fetch bookings");
      }

      setLoading(false);
    } catch (error) {
      alert("Error fetching bookings: " + error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">
        My Bookings
      </h1>

      {loading ? <p>Loading...</p> : null}

      {bookings.length === 0 && !loading ? (
        <p className="text-gray-600 text-lg">No bookings found.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((bk) => {
            const randomAccent =
              accentColors[Math.floor(Math.random() * accentColors.length)];

            return (
              <motion.div
                key={bk._id}
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.25 }}
                className={`p-6 rounded-2xl shadow-lg border bg-gradient-to-br ${randomAccent} backdrop-blur-xl`}
              >
                {/* Service Name */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {bk.service}
                  </h2>

                  <span
                    className={`px-3 py-1 text-sm rounded-full font-semibold shadow-sm border 
                    ${
                      bk.status === "Upcoming"
                        ? "bg-blue-600 text-white border-blue-700"
                        : bk.status === "Completed"
                        ? "bg-green-600 text-white border-green-700"
                        : "bg-red-600 text-white border-red-700"
                    }
                  `}
                  >
                    {bk.status}
                  </span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-3 mt-4 text-gray-700">
                  <Calendar size={20} />
                  <span className="text-md">{bk.date}</span>
                </div>

                {/* Time */}
                <div className="flex items-center gap-3 mt-1 text-gray-700">
                  <Clock size={20} />
                  <span className="text-md">{bk.time}</span>
                </div>

                {/* Details Link */}
                <Link
                  href={`/bookings/${bk._id}`}
                  className="mt-5 inline-flex items-center gap-2 text-blue-700 font-semibold"
                >
                  View Details <ArrowRight size={18} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
