import React, { useState } from "react";
import LinkConfirmationModal from "./LinkConfirmationModal";
import { GitHubIcon, LinkedInIcon } from "./AppIcons";

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
  const dockIconSize = isTablet ? 44 : 50;
  const [activeLinkData, setActiveLinkData] = useState(null);
  const openWindowIds = new Set(openWindows.map((win) => win.id));

  return (
    <>
      <LinkConfirmationModal
        linkData={activeLinkData}
        onClose={() => setActiveLinkData(null)}
      />

      <div role="navigation" aria-label="App dock" style={isTablet ? { bottom: "calc(var(--os-safe-bottom) + 12px)" } : undefined} className={`${isTablet ? "tablet-dock" : "desktop-dock"} fixed bottom-2 left-1/2 -translate-x-1/2 z-[9999] flex items-end select-none w-max max-w-[95vw]`}>
        <div className="flex items-center gap-1.5 overflow-x-auto rounded-2xl border border-white/10 bg-[#18181b]/75 px-3 py-2.5 shadow-[0_8px_32px_rgba(20,36,43,0.16),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
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
                className={`group relative shrink-0 w-12 h-12 flex items-center justify-center rounded-xl border transition-colors ${
                  isActive
                    ? "border-white/10 bg-white/5 shadow-sm"
                    : "border-transparent bg-transparent hover:border-white/10 hover:bg-white/5"
                }`}
              >
                {isLucideIcon ? (
                  <Icon
                    size={dockIconSize}
                    strokeWidth={2}
                    className={`transition-all ${
                      isActive
                        ? "text-zinc-200"
                        : isOpen
                          ? "text-zinc-400"
                          : "text-zinc-400 group-hover:text-zinc-400"
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
                      isActive ? "w-3 h-0.5 bg-zinc-300" : "w-2.5 h-0.5 bg-zinc-400"
                    }`}
                  />
                )}

              </button>
            );
          })}

          {appOrder.length > 0 && <div className="mx-2 h-7 w-px shrink-0 bg-white/5" aria-hidden="true" />}
          <div role="group" aria-label="Professional profiles" className="flex shrink-0 gap-1 rounded-xl bg-white/[0.03] p-1">
            {[
              { title: "GitHub", href: "https://github.com/kaung-h-zaw", icon: GitHubIcon },
              { title: "LinkedIn", href: "https://linkedin.com/in/kaung-h-zaw", icon: LinkedInIcon },
            ].map((profile) => (
              <button key={profile.title} type="button" onClick={(event) => setActiveLinkData({ ...profile, returnFocus: event.currentTarget })}
                aria-label={`Open ${profile.title} profile`} title={`${profile.title} · opens in a new tab`}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-transparent text-zinc-300 transition-colors hover:border-white/10 hover:bg-white/10 hover:text-zinc-100">
                <profile.icon size={dockIconSize} strokeWidth={1.8} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
