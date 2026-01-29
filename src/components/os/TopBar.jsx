import React, { useState, useEffect } from "react";
import { Home, Zap, Moon } from "lucide-react";

export default function TopBar({
  theme,
  setTheme,
  onCloseAll,
  isMobile,
  hasOpenWindows,
}) {
  const [time, setTime] = useState(new Date());
  const isDark = theme === "dark";

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Theme Styles
  const bgStyle = isDark
    ? "bg-zinc-900 border-b border-cyan-900/50 text-cyan-400"
    : "bg-slate-800 text-slate-100 shadow-md";
  const btnHover = isDark
    ? "hover:bg-cyan-900/30 text-cyan-500"
    : "hover:bg-slate-700 text-slate-200";
  const logoStyle = isDark
    ? "bg-cyan-950 text-cyan-400 border border-cyan-800"
    : "bg-slate-100 text-slate-900";
  const menuText = isDark
    ? "text-cyan-700 hover:text-cyan-400"
    : "text-slate-400 hover:text-white";
  const toggleBtn = isDark
    ? "border-cyan-700 text-cyan-500 hover:bg-cyan-900/30 hover:border-cyan-500"
    : "border-slate-600 text-slate-400 hover:text-white hover:border-slate-400";

  return (
    <div
      className={`h-12 md:h-12 flex items-center justify-between px-3 md:px-4 select-none z-[9999] transition-colors duration-300 shrink-0 ${bgStyle}`}
    >
      <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
        {isMobile && hasOpenWindows && (
          <button
            onClick={onCloseAll}
            className={`p-1.5 rounded transition-colors shrink-0 ${btnHover}`}
          >
            <Home size={20} />
          </button>
        )}

        {/* Logo / Brand */}
        <span
          className={`px-2 py-0.5 text-xs md:text-sm font-bold tracking-widest uppercase rounded-sm whitespace-nowrap ${logoStyle}`}
        >
          KAUNG-SPACE
        </span>

        {/* HIDE MENU ON MOBILE */}
        <div
          className={`hidden md:flex gap-2 md:gap-4 text-[10px] md:text-sm font-bold tracking-widest uppercase ml-2 md:ml-4`}
        >
          <span className={`cursor-pointer transition-colors ${menuText}`}>
            FILE
          </span>
          <span className={`cursor-pointer transition-colors ${menuText}`}>
            VIEW
          </span>
          <span className={`cursor-pointer transition-colors ${menuText}`}>
            HELP
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        {/* THEME TOGGLE */}
        <button
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          className={`flex items-center justify-center w-8 h-8 md:w-auto md:h-auto md:px-2 md:py-1 gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-sm border transition-all ${toggleBtn}`}
        >
          {isDark ? <Zap size={14} /> : <Moon size={14} />}
          <span className="hidden md:inline">{isDark ? "LIGHT" : "CYBER"}</span>
        </button>

        <div
          className={`text-[10px] md:text-xs tracking-widest ${isDark ? "text-cyan-600" : "text-slate-400"}`}
        >
          {time.toLocaleTimeString([], { hour12: false })}
        </div>
      </div>
    </div>
  );
}
