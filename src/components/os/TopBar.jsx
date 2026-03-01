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

  return (
    <div className="h-10 bg-white/40 backdrop-blur-md border-b border-black/20 flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-[9999] select-none">
      {/* LEFT */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 font-black text-base tracking-tight cursor-pointer hover:scale-105 transition-transform text-black/70">
          <picture>
            <source srcSet="/me2.webp" type="image/webp" />
            <img
              src="/me2.png"
              alt="Logo"
              loading="eager"
              className="w-7 h-7 rounded-full border-2 border-black/20"
            />
          </picture>

          <span>KAUNG_SPACE</span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          <button className="px-2.5 py-1 text-xs font-medium hover:bg-black/5 rounded-md transition-colors cursor-pointer uppercase tracking-wider text-black/50 hover:text-black/80">
            File
          </button>
          <button className="px-2.5 py-1 text-xs font-medium hover:bg-black/5 rounded-md transition-colors cursor-pointer uppercase tracking-wider text-black/50 hover:text-black/80">
            Edit
          </button>
          <button className="px-2.5 py-1 text-xs font-medium hover:bg-black/5 rounded-md transition-colors cursor-pointer uppercase tracking-wider text-black/50 hover:text-black/80">
            View
          </button>
          <button className="px-2.5 py-1 text-xs font-medium hover:bg-black/5 rounded-md transition-colors cursor-pointer uppercase tracking-wider text-black/50 hover:text-black/80">
            Go
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3 text-black/30">
          <Search
            size={16}
            strokeWidth={2}
            className="hover:text-black/60 cursor-pointer transition-colors"
          />
          <Volume2
            size={16}
            strokeWidth={2}
            className="hover:text-black/60 cursor-pointer transition-colors"
          />
          <Wifi
            size={16}
            strokeWidth={2}
            className="hover:text-black/60 cursor-pointer transition-colors"
          />
          <BatteryFull
            size={18}
            strokeWidth={2}
            className="hover:text-black/60 cursor-pointer transition-colors"
          />
        </div>

        <span className="font-medium text-xs tracking-wider text-black/60">
          {formatTime(time)}
        </span>
      </div>
    </div>
  );
}
