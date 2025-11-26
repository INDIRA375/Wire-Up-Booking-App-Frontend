"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center relative">

      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600">WIRE-UP</h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <Link href="/book" className="hover:text-blue-600">Book Now</Link>
        <Link href="/electricians" className="hover:text-blue-600">Electricians</Link>

        {/* USER ICON → LOGIN PAGE */}
        <Link href="/login" className="hover:text-blue-600">
          <User size={26} className="text-gray-700 hover:text-blue-600" />
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <button
        className="md:hidden text-gray-700"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg px-6 py-4 flex flex-col space-y-4 md:hidden">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/book" onClick={() => setOpen(false)}>Book Now</Link>
          <Link href="/electricians" onClick={() => setOpen(false)}>Electricians</Link>

          {/* USER ICON → LOGIN */}
          <Link href="/login" onClick={() => setOpen(false)} className="flex items-center gap-2">
            <User size={22} /> Login
          </Link>
        </div>
      )}
    </nav>
  );
}