import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Window from "../Window";

import TopBar from "../TopBar";
import StatusBar from "../StatusBar";
import IntroductionWidget from "../widgets/IntroductionWidget";
import WeatherWidget from "../widgets/WeatherWidget";
import MusicWidget from "../widgets/MusicWidget";
import LinkConfirmationModal from "../LinkConfirmationModal";
import { Github, Linkedin } from "lucide-react";

const TabletIcon = ({ title, icon, onClick }) => {
  const isLucideIcon = typeof icon !== "string";

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-3 active:scale-95 transition-transform group w-full"
    >
      <div className="w-24 h-24 bg-white/40 backdrop-blur-md rounded-[28px] border border-black/20 flex items-center justify-center p-4 group-hover:bg-white/50 group-hover:border-black/15 group-active:bg-white/50 group-active:border-black/15 transition-all">
        {isLucideIcon ? (
          React.createElement(icon, {
            size: 40,
            strokeWidth: 2,
            className: "text-black/70 group-hover:text-black/90 transition-all",
          })
        ) : (
          <img
            src={icon}
            alt={title}
            className="w-full h-full object-contain opacity-70 group-hover:opacity-90 transition-all"
          />
        )}
      </div>
      <span className="font-mono font-medium text-xs text-black/70 tracking-widest uppercase text-center leading-tight bg-white/40 backdrop-blur-md px-3 py-1 rounded-md border border-black/10">
        {title}
      </span>
    </button>
  );
};

export default function TabletLayout({
  apps,
  openWindows,
  openWindow,
  closeWindow,
  focusWindow,
  minimizeWindow,
}) {
  const [pendingLink, setPendingLink] = useState(null);

  const externalLinks = [
    {
      title: "GitHub",
      icon: Github,
      href: "https://github.com/kaung-h-zaw",
    },
    {
      title: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/kaung-h-zaw",
    },
  ];

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden text-black select-none bg-[#EFE5D9]">
      {/* 1. BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #dcdcdc 0%, #cccccc 100%)",
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

      {/* 2. TOP MENU BAR */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <TopBar />
      </div>

      {/* 3. MAIN DASHBOARD CONTENT */}
      <div className="flex-1 z-10 pt-20 pb-32 px-8 flex justify-center overflow-y-auto custom-scrollbar min-h-0">
        <div className="w-full max-w-[680px] flex flex-col gap-8">
          <div className="w-full">
            <IntroductionWidget onOpenAbout={() => openWindow("about")} />
          </div>

          <div className="grid grid-cols-2 gap-6 w-full mt-0">
            <WeatherWidget />
            <MusicWidget />
          </div>

          <div className="grid grid-cols-4 gap-x-6 gap-y-10 w-full mt-5 px-2">
            {Object.values(apps).map((app) => (
              <div key={app.id} className="flex justify-center w-full">
                <TabletIcon
                  title={app.title}
                  icon={app.mobileIcon || app.icon}
                  onClick={() => openWindow(app.id)}
                />
              </div>
            ))}

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

      {/* 4. DESKTOP BOTTOM DOCK */}
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

      {/* 6. LINK CONFIRMATION MODAL */}
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
