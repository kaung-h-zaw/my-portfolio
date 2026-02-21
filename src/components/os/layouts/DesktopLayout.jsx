import React from "react";
import { AnimatePresence } from "framer-motion";
import TopBar from "../TopBar";
import StatusBar from "../StatusBar";
import Widgets from "../Widgets";
import Window from "../Window";

// --- COMBINED & STYLED DESKTOP ICON (MEDIUM / GOLDILOCKS SIZE) ---
const DesktopIcon = ({ title, icon, onClick }) => (
  <button
    onClick={onClick}
    // w-28 gives the text just enough room so it doesn't wrap awkwardly
    className="flex flex-col items-center gap-3 active:scale-95 transition-transform group w-28"
  >
    {/* w-24 h-24 is the perfect middle ground (96px) */}
    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#F9F6EE]/80 rounded-[22px] border-[2px] border-black shadow-[5px_5px_0px_black] flex items-center justify-center p-2 group-hover:-translate-y-1 group-hover:shadow-[7px_7px_0px_black] group-active:shadow-[1px_1px_0px_black] group-active:translate-y-[4px] transition-all">
      <img
        src={icon}
        alt={title}
        className="w-full h-full object-contain drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]"
      />
    </div>

    <span className="font-mono font-bold text-[11px] md:text-xs text-black tracking-widest uppercase text-center leading-tight bg-white/50 px-2.5 py-0.5 rounded-md backdrop-blur-sm border border-transparent group-hover:border-black/20 transition-all">
      {title}
    </span>
  </button>
);

// --- MAIN DESKTOP LAYOUT ---
export default function DesktopLayout({
  apps,
  openWindows,
  activeWindowId,
  openWindow,
  closeWindow,
  focusWindow,
  minimizeWindow,
}) {
  return (
    <>
      {/* 1. DESKTOP BACKGROUND */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, #A3C9C7 0%, #A3C9C7 40%, #EFE5D9 40%, #EFE5D9 60%, #A3C9C7 60%, #A3C9C7 100%)",
        }}
      />

      <TopBar />

      {/* 2. LEFT ICONS AREA */}
      <div className="absolute z-10 top-18 left-8 bottom-24 flex flex-col flex-wrap content-start gap-4 lg:gap-6 pointer-events-none p-4 h-[calc(100vh-160px)] transition-transform duration-300">
        {Object.values(apps).map((app) => (
          <div key={app.id} className="pointer-events-auto">
            <DesktopIcon
              title={app.title}
              icon={app.icon}
              onClick={() => openWindow(app.id)}
            />
          </div>
        ))}
      </div>

      {/* 3. RIGHT WIDGETS AREA */}
      {/* Changed top-24 to top-20 to move it up and align with icons */}
      <div className="absolute z-10 top-20 right-8 pointer-events-auto transition-all duration-300">
        <Widgets />
      </div>

      {/* 4. FOOTER BRANDING */}
      <div className="absolute bottom-10 right-8 xl:bottom-6 xl:right-10 z-0 text-right opacity-50 mix-blend-multiply pointer-events-none select-none hidden md:block origin-bottom-right transform scale-100 transition-all duration-300">
        <div className="text-4xl font-black tracking-tighter text-black leading-none drop-shadow-sm">
          KAUNG_OS
        </div>
        <div className="text-xs font-bold tracking-[0.3em] uppercase mt-1 text-gray-800">
          v2.0 • SYSTEM READY
        </div>
      </div>

      {/* 5. WINDOWS LAYER */}
      <div className="absolute inset-0 z-20 pointer-events-none pb-20">
        <AnimatePresence>
          {openWindows.map((win) => {
            if (win.minimized) return null;
            const AppComp = apps[win.id].component;
            return (
              <div key={win.id} className="pointer-events-auto relative">
                <Window
                  id={win.id}
                  title={win.title}
                  defaultPos={win.defaultPos}
                  zIndex={win.zIndex}
                  onClose={() => closeWindow(win.id)}
                  onFocus={() => focusWindow(win.id)}
                  onMinimize={() => minimizeWindow(win.id)}
                  isMobile={false}
                >
                  <AppComp />
                </Window>
              </div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 6. BOTTOM DOCK */}
      <StatusBar
        openWindows={openWindows}
        activeWindowId={activeWindowId}
        onFocusWindow={focusWindow}
        onMinimizeWindow={minimizeWindow}
      />
    </>
  );
}
