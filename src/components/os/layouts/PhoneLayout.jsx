import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import TopBar from "../TopBar";
import Window from "../Window";
import WeatherWidget from "../widgets/WeatherWidget";
import MusicWidget from "../widgets/MusicWidget";
import LinkConfirmationModal from "../LinkConfirmationModal";
import IntroductionWidget from "../widgets/IntroductionWidget";
import { Github, Linkedin, Instagram } from "lucide-react";
import BackgroundLayers from "../BackgroundLayers";

const MobileAppIcon = ({ app, onClick }) => {
  const Icon = app.mobileIcon || app.icon;
  const isLucideIcon = typeof Icon !== "string";

  return (
    <button
      onClick={() => {
        if (navigator.vibrate) navigator.vibrate(50);
        onClick();
      }}
      className="flex flex-col items-center gap-2 active:scale-95 transition-transform duration-100 w-full group"
    >
      <div className="w-16 h-16 bg-white/40 backdrop-blur-md rounded-2xl border border-black/20 flex items-center justify-center p-2 group-active:bg-white/50 group-active:border-black/15 transition-all">
        {isLucideIcon ? (
          <Icon
            size={32}
            strokeWidth={2}
            className="text-black/70 group-active:text-black/90 transition-all"
          />
        ) : (
          <img
            src={Icon}
            alt={app.title}
            className="w-full h-full object-contain opacity-70 group-active:opacity-90"
          />
        )}
      </div>
      <span className="font-medium font-mono text-[10px] text-black/70 uppercase tracking-tight px-1 text-center">
        {app.title}
      </span>
    </button>
  );
};

const MobileLinkIcon = ({ title, icon, onClick }) => {
  const isLucideIcon = typeof icon !== "string";

  return (
    <button
      onClick={() => {
        if (navigator.vibrate) navigator.vibrate(50);
        onClick();
      }}
      className="flex flex-col items-center gap-2 active:scale-95 transition-transform duration-100 w-full group"
    >
      <div className="w-16 h-16 bg-white/40 backdrop-blur-md rounded-2xl border border-black/10 flex items-center justify-center p-2 group-active:bg-white/50 group-active:border-black/15 transition-all">
        {isLucideIcon ? (
          React.createElement(icon, {
            size: 32,
            strokeWidth: 2,
            className:
              "text-black/70 group-active:text-black/90 transition-all",
          })
        ) : (
          <img
            src={icon}
            alt={title}
            className="w-full h-full object-contain opacity-70 group-active:opacity-90"
          />
        )}
      </div>
      <span className="font-medium font-mono text-[10px] text-black/70 uppercase tracking-tight px-1 text-center">
        {title}
      </span>
    </button>
  );
};

export default function PhoneLayout({
  apps,
  openWindows,
  openWindow,
  closeWindow,
}) {
  const activeApp =
    openWindows.length > 0 ? openWindows[openWindows.length - 1] : null;
  const [pendingLink, setPendingLink] = useState(null);
  const appOrder = [
    "about",
    "experience",
    "education",
    "skills",
    "projects",
    "contact",
  ];

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
    {
      title: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/kaung.h.zaw/",
    },
  ];

  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden overscroll-none"
      style={{
        background: "linear-gradient(180deg, #cccccc 0%, #dcdcdc 100%)",
      }}
    >
      {/* 1. BACKGROUND WALLPAPER - Extended to cover safe areas */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ top: "-100px", bottom: "-100px" }}
      >
        <BackgroundLayers gradient="linear-gradient(180deg, #cccccc 0%, #dcdcdc 100%)" />
      </div>

      {/* 2. TOP BAR */}
      <div
        className="absolute top-0 left-0 right-0 h-[50px] z-50 border-b-2 border-black/10 backdrop-blur-md"
        style={{
          paddingTop: "env(safe-area-inset-top)",
          background: "rgba(255, 255, 255, 0.4)",
        }}
      >
        <TopBar />
      </div>

      {/* 3. HOME SCREEN CONTENT */}
      {!activeApp && (
        <div
          className="absolute left-0 right-0 z-10 overflow-y-auto pt-0 custom-scrollbar"
          style={{
            top: "50px",
            bottom: "0",
            paddingBottom: "calc(env(safe-area-inset-bottom) + 2rem)",
          }}
        >
          <div className="w-full px-5 mt-2 mb-6 max-w-[360px] mx-auto flex flex-col gap-3">
            {/* The Intro Widget */}
            <div className="w-full">
              <IntroductionWidget onOpenAbout={() => openWindow("about")} />
            </div>

            {/* The Weather & Music grid */}
            <div className="grid grid-cols-2 gap-3">
              <WeatherWidget />
              <MusicWidget />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-4 gap-y-4 px-6 w-full max-w-[400px] mx-auto mt-2">
            {appOrder
              .map((id) => apps[id])
              .filter(Boolean)
              .map((app) => (
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
