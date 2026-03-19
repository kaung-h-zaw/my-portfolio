import React, { useState } from "react";
import LinkConfirmationModal from "./LinkConfirmationModal";
import { Github, Linkedin, Instagram } from "lucide-react";

export default function StatusBar({
  apps = {},
  appOrder = [],
  openWindows,
  activeWindowId,
  onOpenApp,
  onFocusWindow,
  onMinimizeWindow,
  isTablet = false,
}) {
  const [activeLinkData, setActiveLinkData] = useState(null);
  const openWindowIds = new Set(openWindows.map((win) => win.id));

  return (
    <>
      <LinkConfirmationModal
        linkData={activeLinkData}
        onClose={() => setActiveLinkData(null)}
      />

      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[9999] flex items-end select-none w-max max-w-[95vw]">
        <div className="flex items-center os-panel rounded-2xl overflow-x-auto no-scrollbar px-4 py-3 gap-2">
          {/* 1. APPS */}
          {appOrder.map((appId) => {
            const app = apps[appId];
            if (!app) return null;

            const isActive = appId === activeWindowId;
            const isOpen = openWindowIds.has(appId);
            const Icon = app.icon;
            const isLucideIcon = typeof Icon !== "string";

            return (
              <button
                key={app.id}
                onClick={() => {
                  if (isActive) {
                    onMinimizeWindow(app.id);
                    return;
                  }

                  if (isOpen) {
                    onFocusWindow(app.id);
                    return;
                  }

                  onOpenApp?.(app.id);
                }}
                type="button"
                aria-label={
                  isActive
                    ? `Minimize ${app.title} window`
                    : isOpen
                      ? `Focus ${app.title} window`
                      : `Open ${app.title} window`
                }
                title={app.title}
                className={`relative shrink-0 w-12 h-12 flex items-center justify-center rounded-xl transition-all ${
                  isActive
                    ? "bg-black/5 scale-105"
                    : "bg-transparent hover:bg-black/5 hover:scale-105"
                }`}
              >
                {isLucideIcon ? (
                  <Icon
                    size={24}
                    strokeWidth={2}
                    className={`transition-all ${
                      isActive
                        ? "text-black/80"
                        : isOpen
                          ? "text-black/55"
                          : "text-black/30 group-hover:text-black/60"
                    }`}
                  />
                ) : (
                  <img
                    src={Icon}
                    alt={app.title}
                    className={`w-6 h-6 object-contain transition-all ${
                      isActive
                        ? "opacity-80"
                      : isOpen
                          ? "opacity-55"
                          : "opacity-30 hover:opacity-60"
                    }`}
                  />
                )}

                {isOpen && (
                  <span
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full ${
                      isActive ? "w-3 h-0.5 bg-black/60" : "w-2.5 h-0.5 bg-black/40"
                    }`}
                  />
                )}

              </button>
            );
          })}

          {/* DIVIDER */}
          {appOrder.length > 0 && (
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
                  type="button"
                  aria-label="Open GitHub profile"
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
                  type="button"
                  aria-label="Open LinkedIn profile"
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
              type="button"
              aria-label="Open Instagram profile"
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
