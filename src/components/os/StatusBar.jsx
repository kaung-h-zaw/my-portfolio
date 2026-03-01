import React, { useState } from "react";
import LinkConfirmationModal from "./LinkConfirmationModal";
import { Github, Linkedin, Instagram } from "lucide-react";

export default function StatusBar({
  openWindows,
  activeWindowId,
  onFocusWindow,
  onMinimizeWindow,
  isTablet = false,
}) {
  const [activeLinkData, setActiveLinkData] = useState(null);

  return (
    <>
      <LinkConfirmationModal
        linkData={activeLinkData}
        onClose={() => setActiveLinkData(null)}
      />

      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[9999] flex items-end select-none w-max max-w-[95vw]">
        <div className="flex items-center bg-white/40 backdrop-blur-md border border-black/20 rounded-2xl overflow-x-auto no-scrollbar px-4 py-3 gap-2">
          {/* 1. OPEN APPS */}
          {openWindows.length === 0 ? (
            <div className="w-10 h-10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-black/30 rounded-full animate-pulse"></div>
            </div>
          ) : (
            openWindows.map((win) => {
              const isActive = win.id === activeWindowId;
              const Icon = win.icon;
              const isLucideIcon = typeof Icon !== "string";

              return (
                <button
                  key={win.id}
                  onClick={() =>
                    isActive ? onMinimizeWindow(win.id) : onFocusWindow(win.id)
                  }
                  className={`
                    shrink-0 w-11 h-11 flex items-center justify-center rounded-xl transition-all
                    ${
                      isActive
                        ? "bg-black/5 scale-105"
                        : "bg-transparent hover:bg-black/5 hover:scale-105"
                    }
                  `}
                >
                  {isLucideIcon ? (
                    <Icon
                      size={28}
                      strokeWidth={2}
                      className={`transition-all ${
                        isActive
                          ? "text-black/80"
                          : "text-black/30 group-hover:text-black/60"
                      }`}
                    />
                  ) : (
                    <img
                      src={Icon}
                      alt={win.title}
                      className={`w-7 h-7 object-contain transition-all ${
                        isActive ? "opacity-80" : "opacity-30 hover:opacity-60"
                      }`}
                    />
                  )}
                </button>
              );
            })
          )}

          {/* DIVIDER */}
          {openWindows.length > 0 && (
            <div className="h-6 w-[1px] bg-black/10 mx-1 shrink-0"></div>
          )}

          {/* 2. SOCIALS */}
          <div className="flex gap-2 shrink-0">
            {!isTablet && (
              <>
                {/* GITHUB */}
                <button
                  onClick={() =>
                    setActiveLinkData({
                      title: "GitHub",
                      href: "https://github.com/kaung-h-zaw",
                      icon: Github,
                    })
                  }
                  className="w-11 h-11 bg-transparent flex items-center justify-center rounded-xl hover:bg-black/5 hover:scale-105 transition-all group"
                >
                  <Github
                    size={24}
                    strokeWidth={2}
                    className="text-black/30 group-hover:text-black/60 transition-all"
                  />
                </button>

                {/* LINKEDIN */}
                <button
                  onClick={() =>
                    setActiveLinkData({
                      title: "LinkedIn",
                      href: "https://linkedin.com/in/kaung-h-zaw",
                      icon: Linkedin,
                    })
                  }
                  className="w-11 h-11 bg-transparent flex items-center justify-center rounded-xl hover:bg-black/5 hover:scale-105 transition-all group"
                >
                  <Linkedin
                    size={24}
                    strokeWidth={2}
                    className="text-black/30 group-hover:text-black/60 transition-all"
                  />
                </button>
              </>
            )}

            {/* INSTAGRAM */}
            <button
              onClick={() =>
                setActiveLinkData({
                  title: "Instagram",
                  href: "https://www.instagram.com/kaung.h.zaw/",
                  icon: Instagram,
                })
              }
              className="w-11 h-11 bg-transparent flex items-center justify-center rounded-xl hover:bg-black/5 hover:scale-105 transition-all group"
            >
              <Instagram
                size={24}
                strokeWidth={2}
                className="text-black/30 group-hover:text-black/60 transition-all"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
