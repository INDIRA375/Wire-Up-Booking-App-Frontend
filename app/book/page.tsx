"use client";

import React, { useEffect, useState } from "react";
import API_URL from "@/utils/api";
import { motion, MotionProps } from "framer-motion";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import {
  MapPin,
  Search,
  User,
  Phone,
  Calendar,
  Clock,
  LocateFixed,
  CheckCircle,
  Mail,
} from "lucide-react";


type MotionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & MotionProps;

const MotionButton = motion(
  forwardRef<HTMLButtonElement, MotionButtonProps>(function MotionButton(
    props,
    ref
  ) {
    return <button ref={ref} {...props} />;
  })
);


export default function BookingPage() {
  const router = useRouter();

  // form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Fan Repair");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // validation errors
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    date?: string;
    time?: string;
    address?: string;
  }>({});

  // services (you add URLs here)
  const serviceImages: Record<string, string> = {
    "Fan Repair": "",
    "AC Repair": "",
    "Switch Repair": "",
    "Light Installation": "",
  };

  const priceList: Record<string, number> = {
    "Fan Repair": 499,
    "AC Repair": 1299,
    "Switch Repair": 299,
    "Light Installation": 399,
  };

  const services = Object.keys(serviceImages);

  const filteredServices = services.filter((s) =>
    s.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentPrice = priceList[service] ?? 0;

  useEffect(() => {
    const today = new Date();
    setDate(today.toISOString().split("T")[0]);
    setTime(today.toTimeString().slice(0, 5));
  }, []);

  const validateAll = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone.trim()))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (!date) newErrors.date = "Date is required";
    if (!time) newErrors.time = "Time is required";
    if (!address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: keyof typeof errors) => {
    const newErrors = { ...errors };
    switch (field) {
      case "name":
        if (!name.trim()) newErrors.name = "Name is required";
        else delete newErrors.name;
        break;
      case "phone":
        if (!phone.trim()) newErrors.phone = "Phone number is required";
        else if (!/^\d{10}$/.test(phone.trim()))
          newErrors.phone = "Enter a valid 10-digit phone number";
        else delete newErrors.phone;
        break;
      case "date":
        if (!date) newErrors.date = "Date is required";
        else delete newErrors.date;
        break;
      case "time":
        if (!time) newErrors.time = "Time is required";
        else delete newErrors.time;
        break;
      case "address":
        if (!address.trim()) newErrors.address = "Address is required";
        else delete newErrors.address;
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const detectAddress = () => {
    if (!navigator.geolocation) {
      alert("Location not supported on this device.");
      return;
    }
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
          );
          const data = await res.json();
          setAddress(data.display_name || "");
          setErrors((e) => {
            const copy = { ...e };
            delete copy.address;
            return copy;
          });
        } catch {
          alert("Could not detect address from coordinates.");
        } finally {
          setDetecting(false);
        }
      },
      (err) => {
        let msg = "Enable location permission and try again.";
        if (err.code === err.PERMISSION_DENIED) msg = "Please allow location access.";
        if (err.code === err.POSITION_UNAVAILABLE) msg = "Position unavailable. Turn on GPS.";
        if (err.code === err.TIMEOUT) msg = "Location timed out. Try again.";
        alert(msg);
        setDetecting(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const submitBooking = async () => {
    if (!validateAll()) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/bookings/create`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, service, date, time, address }),
      });

      if (res.ok) {
        setSuccess(true);
        setName("");
        setPhone("");
        setAddress("");
        setTimeout(() => router.push("/"), 5000);
      } else {
        const text = await res.text();
        alert("Booking failed: " + text);
      }
    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 shadow-xl text-center max-w-sm mx-4">
            <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Booking Successful!</h3>
            <p className="mt-2 text-sm text-gray-600">Redirecting to home...</p>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <header className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div
              className="text-2xl font-extrabold text-black-600 cursor-pointer"
              onClick={() => router.push("/")}
            >
              WIRE-UP
            </div>

            <div className="flex-1 flex justify-center px-4">
              <div className="hidden md:flex items-center w-full max-w-lg bg-gray-100 rounded-lg px-3 py-2">
                <Search size={18} className="text-gray-500 mr-2" />
                <input
                  className="bg-transparent outline-none w-full text-sm"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setMobileSearchOpen((s) => !s)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <Search size={18} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  document.getElementById("contact-section")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-md  text-black text-sm"
              >
                <Mail size={16} />
                Contact Us
              </button>

              {/* <div className="rounded-full bg-gray-100 w-9 h-9 flex items-center justify-center text-gray-700">
                <User size={18} />
              </div> */}
            </div>
          </div>

          {mobileSearchOpen && (
            <div className="md:hidden mt-3 pb-3">
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <Search size={18} className="text-gray-500 mr-2" />
                <input
                  autoFocus
                  className="bg-transparent outline-none w-full text-sm"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  className="ml-2 text-sm text-gray-600"
                  onClick={() => {
                    setMobileSearchOpen(false);
                    setSearchTerm("");
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT: Services */}
<aside className="lg:col-span-3">
  <div className="bg-white rounded-xl p-5 shadow-sm sticky top-20">
    <h3 className="text-sm text-gray-700 font-medium mb-4">Select a service</h3>

    <div className="grid grid-cols-2 gap-4">
      {filteredServices.length === 0 ? (
        <div className="col-span-2 text-sm text-gray-500">No services found</div>
      ) : (
        filteredServices.map((s) => (
          <button
            key={s}
            onClick={() => setService(s)}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg transition border text-left ${
              service === s
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:shadow-md bg-white"
            }`}
          >
            <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-3xl">
              {s === "Fan Repair" && "💨"}
              {s === "AC Repair" && "❄️"}
              {s === "Switch Repair" && "🔌"}
              {s === "Light Installation" && "💡"}
            </div>

            <div className="text-xs text-gray-700 leading-snug text-center">{s}</div>
          </button>
        ))
      )}
    </div>
  </div>
</aside>


        {/* MIDDLE: Form */}
        <section className="lg:col-span-6">
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h2 className="text-2xl font-extrabold mb-4"><center>Book a Professional</center></h2>

            <div className="space-y-4">

              <div>
                <label className="text-xs text-gray-600">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 text-gray-400" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={`w-full pl-12 pr-3 py-3 rounded-lg border ${
                      errors.name ? "border-red-400" : "border-gray-200"
                    } bg-gray-50 outline-none`}
                    placeholder="Full Name"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-xs text-gray-600">
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-3 text-gray-400" />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => handleBlur("phone")}
                    className={`w-full pl-12 pr-3 py-3 rounded-lg border ${
                      errors.phone ? "border-red-400" : "border-gray-200"
                    } bg-gray-50 outline-none`}
                    placeholder="10-digit phone number"
                    inputMode="numeric"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="text-xs text-gray-600">
                  Date <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    onBlur={() => handleBlur("date")}
                    className={`w-full pl-12 pr-3 py-3 rounded-lg border ${
                      errors.date ? "border-red-400" : "border-gray-200"
                    } bg-gray-50 outline-none`}
                  />
                </div>
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>

              <div>
                <label className="text-xs text-gray-600">
                  Time <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <Clock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    onBlur={() => handleBlur("time")}
                    className={`w-full pl-12 pr-3 py-3 rounded-lg border ${
                      errors.time ? "border-red-400" : "border-gray-200"
                    } bg-gray-50 outline-none`}
                  />
                </div>
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
              </div>

              <div>
                <label className="text-xs text-gray-600">
                  Address <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-3 text-gray-400" />
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onBlur={() => handleBlur("address")}
                    className={`w-full pl-12 pr-3 py-3 rounded-lg border ${
                      errors.address ? "border-red-400" : "border-gray-200"
                    } bg-gray-50 outline-none h-28 resize-none`}
                    placeholder="Your address"
                  />
                </div>
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}

                <div className="mt-3">
                  <button
                    type="button"
                    onClick={detectAddress}
                    disabled={detecting}
                    className="inline-flex items-center gap-2 text-blue-600"
                  >
                    <LocateFixed size={16} />
                    {detecting ? "Detecting..." : "Detect My Location"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div>
                  <div className="text-sm text-gray-600">Estimated price</div>
                  <div className="font-semibold text-gray-800">₹{currentPrice}</div>
                </div>

                <MotionButton
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={submitBooking}
                  disabled={loading}
                  className={`px-6 py-3 rounded-lg text-white font-semibold ${
                  loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                    {loading ? "Booking..." : "Book Now"}
                </MotionButton>

              </div>

            </div>
          </div>
        </section>

        {/* RIGHT: Summary */}
        <aside className="lg:col-span-3">
          <div className="bg-white rounded-lg p-4 shadow-sm sticky top-20">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Your booking summary</h3>
            <div className="text-sm text-gray-600">Name: <span className="font-medium">{name}</span></div>
            <div className="text-sm text-gray-600">Service: <span className="font-medium">{service}</span></div>
            <div className="text-sm text-gray-600">Date: <span className="font-medium">{date}</span></div>
            <div className="text-sm text-gray-600">Time: <span className="font-medium">{time}</span></div>
            <div className="text-sm text-gray-600">Price: <span className="font-medium">₹{currentPrice}</span></div>
          </div>
        </aside>

      </main>

      {/* CONTACT */}
      <footer id="contact-section" className="bg-white mt-12 py-10 border-t">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold text-blue-600">Need Help?</h3>
          <p className="text-gray-600 mt-2">Our support team is available 24/7 for your assistance.</p>

          <div className="flex flex-col md:flex-row justify-center gap-6 items-center mt-6 text-gray-700">
            <div className="flex items-center gap-2">
              <Phone /> <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail /> <span>support@wireup.com</span>
            </div>
          </div>

          <p className="text-gray-500 text-sm mt-6">© 2025 Wire-Up Services. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 