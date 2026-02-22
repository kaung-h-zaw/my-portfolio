import React, { useState, useEffect } from "react";
import { Wifi, BatteryFull, Volume2, Search, Command } from "lucide-react";

export default function TopBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const menuBtn =
    "px-3 py-1 text-sm font-bold hover:bg-black hover:text-white rounded-md transition-colors cursor-pointer uppercase tracking-wider";

  return (
    <div className="h-10 bg-[#fdfbf7]/90 backdrop-blur-sm border-b-2 border-black flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-[9999] select-none">
      {/* LEFT: System & Menus */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 font-black text-lg tracking-tighter cursor-pointer hover:scale-105 transition-transform">
          <Command size={20} />
          <span>KAUNG_OS</span>
        </div>

        <div className="hidden md:flex items-center gap-1 opacity-80">
          <button className={menuBtn}>File</button>
          <button className={menuBtn}>Edit</button>
          <button className={menuBtn}>View</button>
          <button className={menuBtn}>Go</button>
        </div>
      </div>

      {/* RIGHT: Status & Time */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 opacity-60">
          <Search size={18} className="hover:text-black cursor-pointer" />
          <Volume2 size={18} className="hover:text-black cursor-pointer" />
          <Wifi size={18} className="hover:text-black cursor-pointer" />
          <BatteryFull size={20} className="hover:text-black cursor-pointer" />
        </div>

        <span className="font-bold text-sm tracking-widest">
          {formatTime(time)}
        </span>
      </div>
    </div>
  );
}
