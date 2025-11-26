"use client";

import { motion } from "framer-motion";
import { Wrench, Lightbulb, Plug, Cable } from "lucide-react";

const categories = [
  { icon: <Lightbulb size={32} />, name: "Lighting Setup", color: "from-yellow-200 to-yellow-400" },
  { icon: <Plug size={32} />, name: "Switch & Socket", color: "from-blue-200 to-blue-400" },
  { icon: <Cable size={32} />, name: "Wiring Work", color: "from-red-200 to-red-400" },
  { icon: <Wrench size={32} />, name: "Appliance Repair", color: "from-green-200 to-green-400" }
];

export default function Categories() {
  return (
    <div className="py-16 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Services We Offer
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-10">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`p-8 rounded-2xl bg-gradient-to-br ${cat.color} shadow-lg text-center`}
          >
            <div className="flex justify-center mb 4">{cat.icon}</div>
            <h3 className="text-xl font-semibold">{cat.name}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
