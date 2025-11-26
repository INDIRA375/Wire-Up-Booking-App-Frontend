"use client";

import { motion } from "framer-motion";
import { ChevronLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BookingSummary() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("booking");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  if (!data) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex justify-center items-center px-4">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white w-full max-w-md p-7 rounded-3xl shadow-xl"
      >
        <CheckCircle className="text-green-500 mx-auto mb-3" size={70} />

        <h1 className="text-3xl font-bold text-center text-gray-700 mb-3">
          Booking Summary
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Review your booking details
        </p>

        <div className="space-y-3">
          <SummaryItem label="Name" value={data.name} />
          <SummaryItem label="Phone" value={data.phone} />
          <SummaryItem label="Service" value={data.service} />
          <SummaryItem label="Date" value={data.date} />
          <SummaryItem label="Time" value={data.time} />
          <SummaryItem label="Address" value={data.address} />
        </div>

        <Link
          href="/"
          className="mt-8 w-full flex justify-center items-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-lg"
        >
          <ChevronLeft size={20} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

function SummaryItem({ label, value }: any) {
  return (
    <div className="border p-3 rounded-xl bg-gray-50">
      
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold text-gray-700">{value}</p>
    </div>
  );
}
