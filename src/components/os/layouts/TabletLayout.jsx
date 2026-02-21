import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Window from "../Window";

// --- IMPORT THE CORRECT BARS ---
import TopBar from "../TopBar"; // The Apple-style menu at the top
import StatusBar from "../StatusBar"; // The Desktop dock at the bottom

// --- IMPORT WIDGETS ---
import IntroductionWidget from "../widgets/IntroductionWidget";
import WeatherWidget from "../widgets/WeatherWidget";
import MusicWidget from "../widgets/MusicWidget";
import LinkConfirmationModal from "../LinkConfirmationModal"; // Needed for Social Links

// --- TABLET APP ICON (SCALED UP) ---
const TabletIcon = ({ title, icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-3 active:scale-95 transition-transform group w-full"
  >
    {/* Increased from w-20/h-20 to w-24/h-24 for bigger icons */}
    <div className="w-24 h-24 bg-[#F9F6EE]/80 rounded-[28px] border-[2.5px] border-black shadow-[5px_5px_0px_black] flex items-center justify-center p-4 group-active:shadow-[1px_1px_0px_black] group-active:translate-y-[4px] transition-all">
      <img
        src={icon}
        alt={title}
        className="w-full h-full object-contain drop-shadow-sm"
      />
    </div>
    {/* Slightly larger text to match */}
    <span className="font-mono font-bold text-xs text-black tracking-widest uppercase text-center leading-tight bg-white/50 px-3 py-1 rounded-md backdrop-blur-sm border border-black/5">
      {title}
    </span>
  </button>
);

// --- MAIN LAYOUT ---
export default function TabletLayout({
  apps,
  openWindows,
  openWindow,
  closeWindow,
  focusWindow,
  minimizeWindow,
}) {
  const [pendingLink, setPendingLink] = useState(null);

  // Re-added external links to go in the grid
  const externalLinks = [
    {
      title: "GitHub",
      icon: "/app-icons/github.png",
      href: "https://github.com/kaung-h-zaw",
    },
    {
      title: "LinkedIn",
      icon: "/app-icons/linkedin.png",
      href: "https://linkedin.com/in/kaung-h-zaw",
    },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden text-black select-none bg-[#EFE5D9]">
      {/* 1. BACKGROUND */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #A3C9C7 0%, #EFE5D9 40%, #EFE5D9 100%)",
        }}
      />

      {/* 2. TOP MENU BAR (Apple Style) */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <TopBar />
      </div>

      {/* 3. MAIN DASHBOARD CONTENT */}
      <div className="absolute inset-0 z-10 pt-20 pb-32 px-8 flex justify-center overflow-y-auto custom-scrollbar">
        {/* Centered Column - Increased max-width from 520px to 680px to fit 4 larger columns */}
        <div className="w-full max-w-[680px] flex flex-col gap-8">
          {/* TOP: Intro Widget (Automatically scales up because container is wider) */}
          {/* TOP: Intro Widget */}
          <div className="w-full">
            <IntroductionWidget onOpenAbout={() => openWindow("about")} />
          </div>

          {/* MIDDLE: 50/50 Weather & Music */}
          <div className="grid grid-cols-2 gap-6 w-full mt-0">
            <WeatherWidget />
            <MusicWidget />
          </div>

          {/* BOTTOM: Main App Grid - Changed to grid-cols-4 and increased gap */}
          <div className="grid grid-cols-4 gap-x-6 gap-y-10 w-full mt-5 px-2">
            {/* Render internal apps */}
            {Object.values(apps).map((app) => (
              <div key={app.id} className="flex justify-center w-full">
                <TabletIcon
                  title={app.title}
                  icon={app.mobileIcon || app.icon}
                  onClick={() => openWindow(app.id)}
                />
              </div>
            ))}

            {/* Render Github & LinkedIn */}
            {externalLinks.map((link) => (
              <div key={link.title} className="flex justify-center w-full">
                <TabletIcon
                  title={link.title}
                  icon={link.icon}
                  onClick={() => setPendingLink(link)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. DESKTOP BOTTOM DOCK (StatusBar.jsx) */}
      <div className="absolute bottom-0 left-0 right-0">
        <StatusBar
          apps={apps}
          openWindows={openWindows}
          activeWindowId={
            openWindows.length > 0
              ? openWindows[openWindows.length - 1].id
              : null
          }
          onFocusWindow={focusWindow}
          onMinimizeWindow={minimizeWindow}
          isTablet={true}
        />
      </div>

      {/* 5. WINDOWS LAYER */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        <AnimatePresence>
          {openWindows.map((win) => {
            if (win.minimized) return null;
            const AppComp = apps[win.id].component;
            return (
              <div key={win.id} className="pointer-events-auto relative">
                <Window
                  id={win.id}
                  title={win.title}
                  defaultPos={{ x: 0, y: 0 }}
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

      {/* 6. LINK CONFIRMATION MODAL FOR SOCIALS */}
      <AnimatePresence>
        {pendingLink && (
          <div className="pointer-events-auto relative z-[99999]">
            <LinkConfirmationModal
              linkData={pendingLink}
              onClose={() => setPendingLink(null)}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
