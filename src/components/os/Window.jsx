import { AppSkeleton } from "../ui/LoadingSkeleton";
import ErrorBoundary from "../ui/ErrorBoundary";
import React, { useState, useRef, useEffect, Suspense } from "react";
import Draggable from "react-draggable";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  House,
  Monitor,
  Minus,
  Square,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Search,
  ChevronDown,
} from "lucide-react";

const APP_SHORT_LABELS = {
  about: "ABT",
  experience: "EXP",
  projects: "PRJ",
  skills: "SKL",
  education: "EDU",
  contact: "CNT",
};

export default function Window({
  apps = {},
  currentAppId,
  appOrder = [],
  onNavigate,
  title,
  zIndex,
  onClose,
  onFocus,
  onMinimize,
  children,
  isMobile,
  isTablet = false,
}) {
  const nodeRef = useRef(null);
  const pickerRef = useRef(null);
  const searchInputRef = useRef(null);
  const [windowMode, setWindowMode] = useState("restored");
  const [position, setPosition] = useState(() => {
    const wide = window.innerWidth >= 1600;
    const width = Math.min(wide ? 1400 : 1060, window.innerWidth - 64);
    const height = Math.min(wide ? 900 : 680, window.innerHeight - 132);
    return { x: (window.innerWidth - width) / 2, y: Math.max(44, window.innerHeight - 80 - height) };
  });
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  const currentIndex = appOrder.indexOf(currentAppId);
  const previousAppId = currentIndex > 0 ? appOrder[currentIndex - 1] : null;
  const nextAppId =
    currentIndex >= 0 && currentIndex < appOrder.length - 1
      ? appOrder[currentIndex + 1]
      : null;
  const previousApp = previousAppId ? apps[previousAppId] : null;
  const currentApp = currentAppId ? apps[currentAppId] : null;
  const nextApp = nextAppId ? apps[nextAppId] : null;
  const currentLabel = currentApp?.title || title;
  const isCompactHeader = isMobile || isTablet;
  const isSmallScreen = viewportWidth <= 1024;
  const isPhoneHeader = isMobile;
  const isTabletViewport = !isMobile && viewportWidth < 1180;
  const filteredApps = appOrder
    .map((appId) => apps[appId])
    .filter(Boolean)
    .filter((app) => {
      const query = searchQuery.trim().toLowerCase();
      if (!query) return true;

      return (
        app.title.toLowerCase().includes(query) ||
        (APP_SHORT_LABELS[app.id] || "").toLowerCase().includes(query)
      );
    });

  const isWideScreen = viewportWidth >= 1600;
  const isMaximized = isMobile || isTablet || windowMode === "maximized";
  const restoredWidth = Math.min(isWideScreen ? 1400 : 1060, viewportWidth - 64);
  const [viewportHeight, setViewportHeight] = useState(() => window.innerHeight);
  const restoredHeight = Math.min(isWideScreen ? 900 : 680, viewportHeight - 132);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setPosition({ x: 0, y: 0 });
    }

    if (!isMobile) {
      const centerX = (viewportWidth - restoredWidth) / 2;
      const centerY = Math.max(44, viewportHeight - 80 - restoredHeight);
      setPosition({ x: Math.max(0, centerX), y: Math.max(0, centerY) });
    }
  }, [isMobile, restoredWidth, restoredHeight, viewportWidth, viewportHeight]);

  useEffect(() => {
    setIsPickerOpen(false);
    setSearchQuery("");
  }, [currentAppId]);

  useEffect(() => {
    if (!isPickerOpen) return undefined;

    const handlePointerDown = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsPickerOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsPickerOpen(false);
        pickerRef.current?.querySelector("button")?.focus();
      }
    };
    window.addEventListener("keydown", handleEscape);
    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isPickerOpen]);

  useEffect(() => {
    if (isPickerOpen && !isMobile) {
      searchInputRef.current?.focus();
      searchInputRef.current?.select();
    }
  }, [isPickerOpen, isMobile]);

  useEffect(() => {
    nodeRef.current?.focus({ preventScroll: true });
  }, [currentAppId]);

  const bounds = {
    top: 44,
    left: 0,
    right: Math.max(0, viewportWidth - restoredWidth),
    bottom: Math.max(44, viewportHeight - restoredHeight - 80),
  };

  const toggleMaximize = () => {
    setWindowMode(isMaximized ? "restored" : "maximized");
    onFocus();

    if (isMaximized) {
      const centerX = (viewportWidth - restoredWidth) / 2;
      const centerY = Math.max(44, viewportHeight - 80 - restoredHeight);
      setPosition({ x: Math.max(0, centerX), y: Math.max(0, centerY) });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const renderPicker = (mode = "desktop") => {
    if (!currentApp) return null;

    const isCompact = mode !== "desktop";
    const isCompactMobile = isCompact && isCompactHeader;
    const arrowButtonClass = isCompact
      ? "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#292929] text-zinc-200 transition-colors hover:bg-white/10 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-30"
      : `flex ${isSmallScreen ? "h-7 w-7" : "h-8 w-8"} items-center justify-center rounded-lg border border-white/10 bg-white/10 text-zinc-200 transition-colors hover:bg-white/10 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-30`;
    const pickerBaseClass = isCompact
      ? `relative ${isPhoneHeader ? "min-w-0 flex-1" : "min-w-[240px] max-w-[340px] flex-1"}`
      : "relative";
    const desktopPickerWidthClass = isTabletViewport
      ? "min-w-[240px]"
      : "min-w-[300px]";
    const closedButtonClass = isCompact
      ? `flex items-center justify-between rounded-xl border border-white/10 bg-white/5 h-10 px-3 text-sm text-zinc-200 transition-colors hover:bg-[#303030] ${isPhoneHeader ? "w-full min-w-0" : "min-w-[240px]"}`
      : `flex ${desktopPickerWidthClass} items-center justify-between rounded-xl border border-white/10 bg-[#292929] px-3 ${isSmallScreen ? "py-1" : "py-1.5"} text-[11px] text-zinc-200 transition-colors hover:bg-[#303030]`;
    const openShellClass = isCompact
      ? `relative z-20 flex items-center justify-between rounded-t-xl rounded-b-md border border-white/10 border-b-transparent bg-white/5 h-10 px-3 text-sm text-zinc-200 ${isPhoneHeader ? "w-full min-w-0" : "min-w-[240px]"}`
      : `relative z-20 flex ${desktopPickerWidthClass} items-center justify-between rounded-t-xl rounded-b-md border border-white/10 border-b-transparent bg-[#292929] px-3 ${isSmallScreen ? "py-1" : "py-1.5"} text-[11px] text-zinc-200 `;
    const pickerItems = isCompactMobile
      ? appOrder.map((id) => apps[id]).filter(Boolean)
      : filteredApps;

    return (
      <div className="flex items-center gap-2">
        {!isCompactHeader && <>
        <button
          type="button"
          disabled={!previousApp}
          onClick={(e) => {
            e.stopPropagation();
            previousApp && onNavigate?.(previousApp.id, { source: "arrow" });
          }}
          aria-label="Open previous app"
          className={arrowButtonClass}
        >
          <ChevronLeft size={14} strokeWidth={2.6} />
        </button>

        <button
          type="button"
          disabled={!nextApp}
          onClick={(e) => {
            e.stopPropagation();
            nextApp && onNavigate?.(nextApp.id, { source: "arrow" });
          }}
          aria-label="Open next app"
          className={arrowButtonClass}
        >
          <ChevronRight size={14} strokeWidth={2.6} />
        </button>

        </>}
        <div className={pickerBaseClass}>
          {isPickerOpen ? (
            <div className={openShellClass}>
              {isCompactMobile ? (
                <span className="w-full truncate text-[13px] font-medium text-zinc-200">
                  {isCompactHeader ? currentLabel.replace(/_/g, " ") : currentLabel}
                </span>
              ) : (
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <Search
                    size={13}
                    strokeWidth={2.35}
                    className="shrink-0 text-zinc-300"
                  />
                  <input
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setIsPickerOpen(false);
                      if (e.key === "Enter" && filteredApps[0]) {
                        onNavigate?.(filteredApps[0].id, { source: "open" });
                      }
                    }}
                    aria-label="Search portfolio sections"
                    placeholder={isCompactHeader ? currentLabel.replace(/_/g, " ") : currentLabel}
                    className="w-full min-w-0 bg-transparent text-[12px] font-medium text-zinc-100 outline-none placeholder:text-zinc-400"
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => setIsPickerOpen(false)}
                className="ml-2 flex h-6 w-6 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200"
                aria-label="Close app search"
              >
                <ChevronDown
                  size={13}
                  strokeWidth={2.2}
                  className="rotate-180"
                />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPickerOpen(true);
              }}
              aria-expanded={isPickerOpen}
              aria-label={`Choose section, current: ${currentLabel.replace(/_/g, " ")}`}
              className={closedButtonClass}
            >
              <span className="flex min-w-0 items-center gap-2 truncate">
                {!isCompactMobile && (
                  <Search
                    size={13}
                    strokeWidth={2.35}
                    className="shrink-0 text-zinc-300"
                  />
                )}
                <span className="truncate text-[13px]">{isCompactHeader ? currentLabel.replace(/_/g, " ") : currentLabel}</span>
              </span>
              <ChevronDown
                size={13}
                strokeWidth={2.35}
                className="shrink-0 text-zinc-400"
              />
            </button>
          )}

          <AnimatePresence>
            {isPickerOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.14, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full z-30 -mt-px overflow-hidden rounded-b-2xl rounded-t-md border border-white/10 bg-[#242424] "
            >
              <div className="max-h-[min(24rem,55dvh)] overflow-y-auto p-1.5">
                {pickerItems.length > 0 ? (
                  pickerItems.map((app) => {
                    const isCurrent = app.id === currentAppId;
                    const isSingleMatch = pickerItems.length === 1;

                    return (
                      <button
                          key={app.id}
                          type="button"
                          onClick={() => {
                            setIsPickerOpen(false);
                            onNavigate?.(app.id, { source: "open" });
                          }}
                        className={`flex w-full items-center ${
                          isCompactMobile ? "justify-start" : "justify-between"
                        } min-h-11 rounded-xl px-3 py-2 text-left transition-colors ${
                          isCurrent
                            ? "bg-zinc-500/25 text-zinc-100"
                            : isSingleMatch
                                ? "bg-white/5 text-zinc-100"
                                : "text-zinc-300 hover:bg-white/5 hover:text-zinc-100"
                          }`}
                        >
                        <span className="text-[11px] font-medium truncate">
                          {app.title}
                        </span>
                        {!isCompactMobile && (
                          <span
                            className={`text-[9px] font-bold uppercase tracking-[0.18em] ${
                              isCurrent ? "text-white/70" : "text-zinc-400"
                            }`}
                          >
                            {APP_SHORT_LABELS[app.id] || app.title.slice(0, 3)}
                          </span>
                        )}
                      </button>
                    );
                  })
                  ) : (
                    <div className="px-3 py-4 text-[11px] text-zinc-400">
                      No matching apps
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    );
  };

  let positionClass = "";
  if (isMaximized) {
    if (isMobile) {
      positionClass =
        "os-phone-window fixed z-50 !transform-none bg-[#181818]";
    } else if (isTablet) {
      positionClass = "fixed top-[calc(var(--os-safe-top)+8px)] left-3 right-3 bottom-[calc(var(--os-safe-bottom)+100px)] z-50 rounded-[24px] !transform-none border border-white/20 bg-[#181818] ";
    } else {
      positionClass =
        "fixed inset-0 z-50 !transform-none bg-[#181818] ";
    }
  } else {
    positionClass =
      "absolute rounded-2xl border border-white/10 bg-[#181818] ";
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".os-titlebar"
      cancel=".no-drag"
      position={isMaximized ? { x: 0, y: 0 } : position}
      onDrag={(e, ui) => setPosition({ x: ui.x, y: ui.y })}
      onStart={onFocus}
      onMouseDown={onFocus}
      disabled={isMaximized}
      bounds={isMaximized ? undefined : bounds}
    >
      <div
        ref={nodeRef}
        role="region"
        aria-label={`${title.replace(/_/g, " ")} window`}
        data-desktop-maximized={!isCompactHeader && isMaximized ? "true" : undefined}
        tabIndex={-1}
        style={{
          zIndex,
          ...(isMaximized
            ? {}
            : { width: restoredWidth, height: restoredHeight }),
        }}
        className={`os-window ${!isMaximized || isCompactHeader ? "os-window-raised" : ""} outline-none bg-[#181818] flex flex-col overflow-hidden ${positionClass} pointer-events-auto`}
        onMouseDown={onFocus}
      >
        <div className={`flex flex-col h-full ${isMobile ? "" : "rounded-2xl"}`}>
          {/* TITLE BAR */}
          <div
            className={`os-titlebar relative z-20 shrink-0 select-none bg-[#202020] ${
              isCompactHeader ? "h-12 px-3 flex items-center" : isSmallScreen ? "h-9 px-3" : "h-10 px-3"
            } ${isCompactHeader ? "cursor-default" : "cursor-grab active:cursor-grabbing"}`}
          >
            {isCompactHeader ? (
              <div className="no-drag flex w-full items-center gap-2">
                <button type="button" onClick={onMinimize}
                  aria-label={isMobile ? "Go to home screen" : "Show desktop"} title="Return to all apps"
                  className="flex h-10 shrink-0 items-center gap-1 rounded-xl px-1 font-sans text-sm font-semibold text-zinc-100 hover:bg-white/5">
                  <House size={18} aria-hidden="true" /> Home
                </button>
                {currentApp && (
                  <div ref={pickerRef} className="min-w-0 flex-1">
                    {renderPicker("compact")}
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  type="button"
                  aria-label="Close window"
                  title={isMobile ? "Close app and go home" : "Close window and show desktop"}
                  className="h-10 w-10 shrink-0 text-zinc-100 flex items-center justify-center transition-colors rounded-xl cursor-pointer hover:bg-white/5"
                >
                  <X size={14} strokeWidth={2.4} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3 min-w-0 h-full">
                <button type="button" onClick={onMinimize}
                  aria-label="Show desktop" title="Minimize this window and explore the desktop"
                  className="no-drag flex h-7 shrink-0 items-center gap-1.5 rounded-md px-1.5 text-xs font-medium text-zinc-200 hover:bg-white/5">
                  <Monitor size={13} aria-hidden="true" /> Desktop
                </button>

                {currentApp && (
                  <div
                    ref={pickerRef}
                    className="no-drag absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 items-center"
                  >
                    {renderPicker("desktop")}
                  </div>
                )}

                <div className="flex gap-1.5 no-drag shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMinimize();
                    }}
                    type="button"
                    aria-label="Minimize window"
                    title="Minimize to the dock"
                    className="w-6 h-6 border border-white/10 bg-transparent hover:bg-white/5 flex items-center justify-center transition-colors rounded-lg cursor-pointer"
                  >
                    <Minus
                      size={12}
                      strokeWidth={2}
                      className="text-zinc-400 hover:text-zinc-400"
                    />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMaximize();
                    }}
                    type="button"
                    aria-label={isMaximized ? "Restore window" : "Maximize window"}
                    title={isMaximized ? "Make this window smaller" : "Expand window"}
                    className="w-6 h-6 border border-white/10 bg-transparent flex items-center justify-center transition-colors rounded-lg cursor-pointer hover:bg-white/5"
                  >
                    {isMaximized ? (
                      <Maximize2
                        size={11}
                        strokeWidth={2}
                        className="text-zinc-400 hover:text-zinc-400"
                      />
                    ) : (
                      <Square
                        size={10}
                        strokeWidth={2}
                        className="text-zinc-400 hover:text-zinc-400"
                      />
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
                    type="button"
                    aria-label="Close window"
                  title={isMobile ? "Close app and go home" : "Close window and show desktop"}
                    className="w-6 h-6 border border-white/10 bg-[#71717a] hover:bg-[#71717a] text-white flex items-center justify-center transition-colors rounded-lg cursor-pointer"
                  >
                    <X size={13} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div style={isCompactHeader ? { paddingBottom: isMobile ? "calc(var(--os-safe-bottom) + 32px)" : 32, scrollPaddingBottom: isMobile ? "calc(var(--os-safe-bottom) + 32px)" : 32 } : undefined} className="os-content relative z-0 min-h-0 flex-1 overflow-auto border-t border-white/10 bg-[#181818] p-1 sm:p-3">
            <div key={currentAppId || title} className={isCompactHeader ? "min-h-full" : "h-full"}>
              <ErrorBoundary key={currentAppId || title} section={currentLabel}>
              <Suspense
                fallback={
                  <AppSkeleton label={currentLabel.replace(/_/g, " ")} section={currentAppId} />
                }
              >
                {children}
              </Suspense>
              </ErrorBoundary>
            </div>
          </div>
          {!isCompactHeader && <footer className="flex h-6 shrink-0 items-center justify-between gap-2 border-t border-white/10 bg-white/5 px-3 text-[10px] text-zinc-300">
            <span className="whitespace-nowrap font-medium">KAUNG OS · v2.0</span>
            <span className="truncate">{isMobile ? "Home shows all apps" : "Choose a section above to switch apps"}</span>
          </footer>}
        </div>
      </div>
    </Draggable>
  );
}
