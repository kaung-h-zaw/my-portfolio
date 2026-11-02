import React, { useState, useEffect, useRef } from "react";
import { Wifi, BatteryFull, Volume2, Search, Menu, X } from "lucide-react";

export default function TopBar({ onOpenApp, isPhone = false, isTablet = false, appActive = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const dismiss = (event) => {
      if (!menuRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const escape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("pointerdown", dismiss);
    window.addEventListener("keydown", escape);
    return () => {
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("keydown", escape);
    };
  }, [menuOpen]);

  const openApp = (id) => {
    setMenuOpen(false);
    onOpenApp?.(id);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (isPhone || isTablet) {
    return (
      <div className={`native-status fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between px-5 select-none ${appActive ? "bg-[#d1d9d4] text-[#293d3f]" : "bg-transparent text-white/90"}`}
        style={{ height: "calc(var(--os-safe-top) + 32px)", paddingTop: "var(--os-safe-top)" }}>
        <span className="text-xs font-semibold tabular-nums">
          {time.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: false })}
        </span>
        <div className="flex items-center gap-2" aria-label={isTablet ? "Tablet status" : "Phone status"}>
          <Wifi size={14} aria-hidden="true" />
          <BatteryFull size={18} aria-hidden="true" />
        </div>
      </div>
    );
  }

  return (
    <div ref={menuRef} className="h-10 os-panel border-b flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-[9999] select-none">
      {/* LEFT */}
      <div className="flex items-center gap-3 xl:gap-6 min-w-0">
        <div className="flex items-center gap-2 font-black text-sm xl:text-base tracking-tight cursor-pointer hover:scale-105 transition-transform text-black/70 min-w-0">
          <picture>
            <source srcSet="/me2.webp" type="image/webp" />
            <img
              src="/me2.png"
              alt="Logo"
              loading="eager"
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full border-2 border-black/20"
            />
          </picture>

          <span className="truncate">IMKAUNG</span>
        </div>

        <nav id="portfolio-menu" aria-label="Portfolio shortcuts"
          className={`${menuOpen ? "flex" : "hidden"} absolute top-12 left-3 right-3 flex-col gap-1 rounded-xl border border-black/15 bg-[#f1efea] p-2 shadow-lg lg:static lg:flex lg:flex-row lg:items-center lg:gap-1 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}>
          {[
            { id: "about", title: "About" },
            { id: "projects", title: "Projects" },
            { id: "contact", title: "Contact" },
          ].map((item) => (
            <button key={item.id} type="button" onClick={() => openApp(item.id)}
              className="min-h-11 px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-black/70 hover:bg-black/5 hover:text-black rounded-md transition-colors lg:min-h-0 lg:px-2.5 lg:py-1">
              {item.title}
            </button>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
            className="min-h-11 px-3 py-2 text-xs font-medium uppercase tracking-wider text-black/70 hover:bg-black/5 hover:text-black rounded-md transition-colors lg:min-h-0 lg:px-2.5 lg:py-1">
            View CV
          </a>
        </nav>
      </div>

      {/* RIGHT */}
      <div className="flex shrink-0 items-center gap-2.5 sm:gap-5">
        <button ref={menuButtonRef} type="button" aria-label={menuOpen ? "Close portfolio menu" : "Open portfolio menu"}
          aria-expanded={menuOpen} aria-controls="portfolio-menu" onClick={() => setMenuOpen((open) => !open)}
          className="lg:hidden flex h-8 w-8 items-center justify-center rounded-md text-black/70 hover:bg-black/5">
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <div className="hidden sm:flex items-center gap-2 sm:gap-3 text-black/30">
          <button
            type="button"
            aria-label="Search"
            className="hover:text-black/60 transition-colors"
          >
            <Search size={14} strokeWidth={2} className="sm:w-4 sm:h-4" />
          </button>
          <button
            type="button"
            aria-label="Volume"
            className="hover:text-black/60 transition-colors"
          >
            <Volume2 size={14} strokeWidth={2} className="sm:w-4 sm:h-4" />
          </button>
          <button
            type="button"
            aria-label="Wi-Fi"
            className="hover:text-black/60 transition-colors"
          >
            <Wifi size={14} strokeWidth={2} className="sm:w-4 sm:h-4" />
          </button>
          <button
            type="button"
            aria-label="Battery"
            className="hover:text-black/60 transition-colors"
          >
            <BatteryFull
              size={16}
              strokeWidth={2}
              className="sm:w-[18px] sm:h-[18px]"
            />
          </button>
        </div>

        <span className="font-medium text-[10px] sm:text-xs tracking-wider text-black/60">
          {formatTime(time)}
        </span>
      </div>
    </div>
  );
}
