import React from "react";
import { AnimatePresence } from "framer-motion";
import TopBar from "../TopBar";
import StatusBar from "../StatusBar";
import Widgets from "../Widgets";
import Window from "../Window";

const DesktopIcon = ({ title, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-3 active:scale-95 transition-transform group w-28"
  >
    {/* Icon Container */}
    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/40 backdrop-blur-md rounded-[22px] border border-black/20 flex items-center justify-center p-3 group-hover:bg-white/50 group-hover:border-black/15 group-hover:-translate-y-1 group-active:translate-y-0 transition-all">
      <Icon
        size={36}
        strokeWidth={2}
        className="text-black/70 group-hover:text-black/90 transition-all"
      />
    </div>

    {/* Label */}
    <span className="font-mono font-medium text-[11px] md:text-xs text-black/70 tracking-widest uppercase text-center leading-tight bg-white/40 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-black/10 group-hover:border-black/15 group-hover:text-black/90 transition-all">
      {title}
    </span>
  </button>
);

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
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* 1. DESKTOP BACKGROUND s*/}
      <div
        className="absolute z-0 pointer-events-none"
        style={{
          top: "-100px",
          bottom: "-100px",
          left: "-100px",
          right: "-100px",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #cccccc 0%, #dcdcdc 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `
        linear-gradient(to right, rgba(90,90,90,0.3) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(90,90,90,0.3) 1px, transparent 1px)
      `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

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
    </div>
  );
}
