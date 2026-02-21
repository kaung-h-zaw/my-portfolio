import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TopBar from "../TopBar";
import Window from "../Window";

// --- IMPORT YOUR SEPARATED COMPONENTS ---
import WeatherWidget from "../widgets/WeatherWidget";
import MusicWidget from "../widgets/MusicWidget";
import LinkConfirmationModal from "../LinkConfirmationModal";
import IntroductionWidget from "../widgets/IntroductionWidget";

// --- APP ICON ---
const MobileAppIcon = ({ app, onClick }) => (
  <button
    onClick={() => {
      if (navigator.vibrate) navigator.vibrate(50);
      onClick();
    }}
    className="flex flex-col items-center gap-2 active:scale-95 transition-transform duration-100 w-full group"
  >
    <div className="w-16 h-16 bg-[#F9F6EE]/80 rounded-2xl border-2 border-black shadow-[3px_3px_0px_black] flex items-center justify-center p-2 group-active:shadow-[1px_1px_0px_black] group-active:translate-y-[2px] transition-all">
      <img
        src={app.mobileIcon || app.icon}
        alt={app.title}
        className="w-full h-full object-contain drop-shadow-sm"
      />
    </div>
    <span className="font-bold font-mono text-[10px] text-black uppercase tracking-tight px-1 text-center">
      {app.title}
    </span>
  </button>
);

// --- LINK ICON ---
const MobileLinkIcon = ({ title, icon, onClick }) => {
  const isImageString = typeof icon === "string";
  return (
    <button
      onClick={() => {
        if (navigator.vibrate) navigator.vibrate(50);
        onClick();
      }}
      className="flex flex-col items-center gap-2 active:scale-95 transition-transform duration-100 w-full group"
    >
      <div className="w-16 h-16 bg-[#fdfbf7] rounded-2xl border-2 border-black shadow-[3px_3px_0px_black] flex items-center justify-center p-2 group-active:shadow-[1px_1px_0px_black] group-active:translate-y-[2px] transition-all text-gray-700 group-hover:text-black">
        {isImageString ? (
          <img
            src={icon}
            alt={title}
            className="w-full h-full object-contain drop-shadow-sm"
          />
        ) : (
          React.createElement(icon, { size: 34, strokeWidth: 1.5 })
        )}
      </div>
      <span className="font-bold font-mono text-[10px] text-black uppercase tracking-tight px-1 text-center">
        {title}
      </span>
    </button>
  );
};

// --- MAIN LAYOUT ---
export default function PhoneLayout({
  apps,
  openWindows,
  openWindow,
  closeWindow,
}) {
  const activeApp =
    openWindows.length > 0 ? openWindows[openWindows.length - 1] : null;
  const [pendingLink, setPendingLink] = useState(null);

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
    {
      title: "Instagram",
      icon: "/app-icons/insta.png",
      href: "https://www.instagram.com/kaung.h.zaw/",
    },
  ];

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#EFE5D9] overscroll-none touch-none">
      {/* 1. BACKGROUND WALLPAPER */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #b9d6d5 0%, #EFE5D9 25%, #EFE5D9 100%)",
        }}
      />

      {/* 2. TOP BAR */}
      <div className="absolute top-0 left-0 right-0 h-[50px] pt-[env(safe-area-inset-top)] z-50 bg-transparent border-b-2 border-black/10 backdrop-blur-md">
        <TopBar />
      </div>

      {/* 3. HOME SCREEN CONTENT */}
      {!activeApp && (
        <div className="absolute top-[50px] left-0 right-0 bottom-0 z-10 overflow-y-auto pb-[calc(env(safe-area-inset-bottom)+2rem)] pt-0 custom-scrollbar">
          {/* --- ALIGNED WIDGET BLOCK --- */}
          <div className="w-full px-5 mt-2 mb-6 max-w-[360px] mx-auto flex flex-col gap-3">
            {/* The Intro Widget */}
            <div className="w-full">
              <IntroductionWidget onOpenAbout={() => openWindow("about")} />
            </div>

            {/* The Weather & Music grid */}
            {/* I removed the w-full here because grid handles its own width automatically inside the parent */}
            <div className="grid grid-cols-2 gap-3">
              <WeatherWidget />
              <MusicWidget />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-4 gap-y-4 px-6 w-full max-w-[400px] mx-auto mt-2">
            {Object.values(apps).map((app) => (
              <div key={app.id} className="flex justify-center w-full">
                <MobileAppIcon app={app} onClick={() => openWindow(app.id)} />
              </div>
            ))}

            {externalLinks.map((link) => (
              <div key={link.title} className="flex justify-center w-full">
                <MobileLinkIcon
                  title={link.title}
                  icon={link.icon}
                  onClick={() => setPendingLink(link)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. APP WINDOW */}
      <AnimatePresence>
        {activeApp && (
          <Window
            id={activeApp.id}
            title={activeApp.title}
            zIndex={50}
            onClose={() => closeWindow(activeApp.id)}
            isMobile={true}
            onFocus={() => {}}
            onMinimize={() => closeWindow(activeApp.id)}
          >
            {React.createElement(apps[activeApp.id].component)}
          </Window>
        )}
      </AnimatePresence>

      {/* 6. LINK CONFIRMATION MODAL */}
      <AnimatePresence>
        {pendingLink && (
          <LinkConfirmationModal
            linkData={pendingLink}
            onClose={() => setPendingLink(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
