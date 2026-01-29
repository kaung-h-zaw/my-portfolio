import React from "react";
import { Github, Linkedin, MessageCircle, Home } from "lucide-react";

export default function StatusBar({
  theme,
  isMobile,
  onCloseAll,
  hasOpenWindows,
}) {
  const isDark = theme === "dark";

  // Styles
  const bgStyle = isDark
    ? "bg-zinc-900 border-t border-cyan-900/50 text-cyan-600"
    : "bg-slate-300 border-t border-slate-400 text-slate-600";
  const readyText = isDark ? "text-cyan-500" : "text-emerald-700";
  const readyDot = isDark
    ? "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
    : "bg-emerald-500";
  const iconColor = isDark
    ? "text-cyan-700 hover:text-cyan-400"
    : "text-slate-500 hover:text-slate-900";
  const homeBtn = isDark
    ? "bg-cyan-950 text-cyan-400 border border-cyan-800 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
    : "bg-white text-slate-700 border border-slate-300 shadow-sm";

  return (
    <div
      className={`h-12 md:h-10 flex items-center justify-between px-4 text-[10px] md:text-xs font-bold transition-colors duration-300 select-none z-[9999] shrink-0 ${bgStyle}`}
    >
      {/* Left Side: Status Dot + READY text */}
      <div className="flex gap-4 items-center">
        <span className={`${readyText} flex items-center gap-2`}>
          <div
            className={`w-2 h-2 rounded-full animate-pulse ${readyDot}`}
          ></div>
          <span>READY</span>
        </span>
        <span className="hidden md:inline">MEM: 640K OK</span>
      </div>

      {/* Center (Mobile Only): Home Button */}
      {isMobile && (
        <button
          onClick={onCloseAll}
          className={`absolute left-1/2 -translate-x-1/2 p-2 rounded-full transition-all active:scale-95 ${homeBtn} ${!hasOpenWindows ? "opacity-50 pointer-events-none" : "opacity-100"}`}
        >
          <Home size={18} />
        </button>
      )}

      {/* Right Side: Social Icons */}
      <div className={`flex items-center gap-3 md:gap-4`}>
        <a href="#" className={`transition-colors p-2 ${iconColor}`}>
          <Github size={16} />
        </a>
        <a href="#" className={`transition-colors p-2 ${iconColor}`}>
          <Linkedin size={16} />
        </a>
        <a href="#" className={`transition-colors p-2 ${iconColor}`}>
          <MessageCircle size={16} />
        </a>
      </div>
    </div>
  );
}
