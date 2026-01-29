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
  const centerText = isDark ? "text-cyan-800" : "text-slate-500";

  return (
    <div
      className={`h-16 md:h-10 flex items-center justify-between px-4 text-[10px] md:text-xs font-bold transition-colors duration-300 select-none z-[9999] shrink-0 ${bgStyle}`}
    >
      {/* Left Side: Status Dot + READY text */}
      <div className="flex gap-4 items-center flex-1">
        <span className={`${readyText} flex items-center gap-2`}>
          <div
            className={`w-3 h-3 rounded-full animate-pulse ${readyDot}`}
          ></div>
          <span>READY</span>
        </span>
        <span className="hidden md:inline">MEM: 640K OK</span>
      </div>

      {/* Center (Mobile Only): Home Button */}
      {isMobile && (
        <button
          onClick={onCloseAll}
          className={`absolute left-1/2 -translate-x-1/2 p-3 rounded-full transition-all active:scale-95 ${homeBtn} ${!hasOpenWindows ? "opacity-50 pointer-events-none" : "opacity-100"}`}
        >
          <Home size={20} />
        </button>
      )}

      {/* Center (Desktop Only) */}
      {!isMobile && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 tracking-widest uppercase ${centerText}`}
        >
          © 2026 KAUNG HTET ZAW
        </div>
      )}

      {/* Right Side: Social Icons */}
      <div className={`flex items-center gap-1 md:gap-3`}>
        <a
          href="https://github.com/kaung-h-zaw"
          className={`transition-colors p-1 md:p-2 ${iconColor} `}
          target="_blank"
          rel="noreferrer"
        >
          <Github size={18} />{" "}
          {/* Slightly larger icon for mobile/desktop parity */}
        </a>
        <a
          href="https://linkedin.com/in/kaung-h-zaw"
          className={`transition-colors p-1 md:p-2  ${iconColor} `}
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin size={18} />
        </a>
        <a
          href="https://wa.me/66639473379"
          className={`transition-colors p-1 md:p-2 ${iconColor} `}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={18} />
        </a>
      </div>
    </div>
  );
}
