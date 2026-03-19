import React from "react";
import { AnimatePresence } from "framer-motion";
import TopBar from "../TopBar";
import StatusBar from "../StatusBar";
import Widgets from "../Widgets";
import Window from "../Window";
import BackgroundLayers from "../BackgroundLayers";

const formatDesktopTitle = (title = "") => title.replace(/_/g, " ");

const DesktopIcon = ({ title, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-2 active:scale-95 transition-transform group w-16 lg:w-[4.5rem] xl:w-20"
  >
    {/* Icon Container */}
    <div className="w-14 h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-white/40 backdrop-blur-md rounded-[18px] lg:rounded-[20px] xl:rounded-[22px] border border-black/20 flex items-center justify-center p-2 lg:p-2.5 group-hover:bg-white/50 group-hover:border-black/15 group-hover:-translate-y-1 group-active:translate-y-0 transition-all">
      <Icon
        size={30}
        strokeWidth={2}
        className="text-black/70 group-hover:text-black/90 transition-all w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10"
      />
    </div>

    {/* Label */}
    <span className="w-full font-mono font-medium text-[9px] lg:text-[10px] text-black/70 tracking-[0.08em] lg:tracking-[0.1em] uppercase text-center leading-tight bg-white/40 backdrop-blur-md px-2 py-0.5 rounded-md border border-black/10 group-hover:border-black/15 group-hover:text-black/90 transition-all whitespace-nowrap overflow-hidden text-ellipsis">
      {formatDesktopTitle(title)}
    </span>
  </button>
);

export default function DesktopLayout({
  apps,
  appOrder,
  navDirection,
  navigationMode,
  openWindows,
  activeWindowId,
  openWindow,
  closeWindow,
  focusWindow,
  minimizeWindow,
}) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* 1. BACKGROUND */}
      <div
        className="absolute z-0 pointer-events-none"
        style={{
          top: "-100px",
          bottom: "-100px",
          left: "-100px",
          right: "-100px",
        }}
      >
        <BackgroundLayers
          gradient="linear-gradient(160deg, #d6d2cc 0%, #e2deda 50%, #d8d4cf 100%)"
          showGrain={true}
        />
      </div>

      {/* 2. TOP BAR */}
      <TopBar />

      {/* 3. LEFT ICONS AREA — fixed from top bar to above dock */}
      <div className="absolute z-10 top-14 lg:top-16 xl:top-16 left-8 grid grid-flow-col grid-rows-4 content-start gap-4 lg:gap-6 pointer-events-none px-4 pb-4 transition-transform duration-300">
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


      {/* 4. RIGHT WIDGETS AREA */}
      <div className="absolute z-10 top-14 lg:top-16 xl:top-16 right-3 lg:right-5 xl:right-8 pointer-events-auto">
        <Widgets onOpenAbout={() => openWindow("about")} />
      </div>

      {/* 5. FOOTER BRANDING */}
      <div className="absolute bottom-20 xl:bottom-8 right-4 lg:right-6 xl:right-10 z-0 text-right opacity-50 mix-blend-multiply pointer-events-none select-none hidden md:block origin-bottom-right">
        <div className="text-2xl lg:text-3xl xl:text-4xl font-black tracking-tighter text-black leading-none drop-shadow-sm">
          KAUNG_OS
        </div>
        <div className="text-[9px] lg:text-[10px] xl:text-xs font-bold tracking-[0.3em] uppercase mt-1 text-gray-800">
          v2.0 • SYSTEM READY
        </div>
      </div>

      {/* 6. WINDOWS LAYER */}
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
                  apps={apps}
                  currentAppId={win.id}
                  appOrder={appOrder}
                  navDirection={navDirection}
                  navigationMode={navigationMode}
                  onNavigate={openWindow}
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

      {/* 7. BOTTOM DOCK */}
      <StatusBar
        apps={apps}
        appOrder={appOrder}
        openWindows={openWindows}
        activeWindowId={activeWindowId}
        onOpenApp={openWindow}
        onFocusWindow={focusWindow}
        onMinimizeWindow={minimizeWindow}
      />
    </div>
  );
}
