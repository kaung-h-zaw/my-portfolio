import React from "react";

export default function DesktopIcon({
  file,
  onOpen,
  isActive,
  isMobile,
  theme,
}) {
  const Icon = file.icon;
  const isDark = theme === "dark";

  if (isMobile) {
    return (
      <button
        onClick={onOpen}
        className={`
            flex flex-col items-start justify-center p-4 border 
            shadow-sm active:scale-95 transition-all text-left w-full h-24 rounded-md relative overflow-hidden
            ${
              isDark
                ? "bg-zinc-900/50 border-cyan-900/50 hover:border-cyan-700 text-cyan-500"
                : "bg-slate-50 text-slate-800 border-slate-300 hover:border-slate-400"
            }
          `}
      >
        <div className="flex items-center gap-3 mb-2 relative z-10">
          <div
            className={`w-8 h-8 flex items-center justify-center shrink-0 rounded-md 
                ${
                  isDark
                    ? "bg-cyan-950 text-cyan-400 border border-cyan-800"
                    : "bg-slate-200 text-slate-700"
                }`}
          >
            <Icon size={16} strokeWidth={2} />
          </div>
        </div>
        <div className="relative z-10">
          <div
            className={`text-xs font-bold uppercase ${isDark ? "text-cyan-400" : "text-slate-800"}`}
          >
            {file.title}
          </div>
          <div
            className={`text-[9px] uppercase font-bold ${isDark ? "text-cyan-700" : "text-slate-500"}`}
          >
            {file.type}
          </div>
        </div>
      </button>
    );
  }

  // DESKTOP
  const iconBox = isDark
    ? isActive
      ? "bg-cyan-950 border-cyan-500 translate-x-1 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
      : "bg-zinc-900 border-cyan-900 hover:border-cyan-600 text-cyan-600 hover:text-cyan-400"
    : isActive
      ? "bg-white border-slate-800 translate-x-1 shadow-sm"
      : "bg-white border-slate-300 hover:border-slate-400 hover:shadow-sm";

  const iconColor = isDark
    ? isActive
      ? "text-cyan-400"
      : "text-inherit"
    : isActive
      ? "text-slate-900"
      : "text-slate-600";

  const titleColor = isDark
    ? isActive
      ? "text-cyan-400"
      : "text-cyan-800 group-hover:text-cyan-500"
    : isActive
      ? "text-slate-900"
      : "text-slate-600 group-hover:text-slate-800";

  const typeColor = isDark
    ? "text-cyan-900"
    : "text-slate-400 group-hover:text-slate-500";
  const activeDot = isDark
    ? "bg-zinc-950 border-cyan-400"
    : "bg-emerald-500 border-white";

  return (
    <button
      onClick={onOpen}
      className="group flex items-center gap-4 text-left w-full focus:outline-none mb-2"
    >
      <div
        className={`w-12 h-12 relative flex items-center justify-center transition-all duration-200 rounded-lg border-2 ${iconBox}`}
      >
        <Icon
          size={22}
          strokeWidth={isDark ? 2 : 1.5}
          className={`transition-colors ${iconColor}`}
        />
        {isActive && (
          <div
            className={`absolute -right-1.5 -bottom-1.5 w-3.5 h-3.5 border-2 rounded-full z-20 shadow-sm ${activeDot}`}
          ></div>
        )}
      </div>

      <div className="flex flex-col">
        <div
          className={`font-bold text-sm uppercase tracking-wide transition-colors duration-200 ${titleColor}`}
        >
          {file.title}
        </div>
        <div
          className={`text-[9px] uppercase font-bold transition-colors ${typeColor}`}
        >
          {file.type}
        </div>
      </div>
    </button>
  );
}
