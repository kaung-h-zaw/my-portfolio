import React, { useState } from "react";
// Make sure this path matches where your modal file is located!
import LinkConfirmationModal from "./LinkConfirmationModal";

export default function StatusBar({
  openWindows,
  activeWindowId,
  onFocusWindow,
  onMinimizeWindow,
  isTablet = false, // ADDED: New prop to check if we are on tablet
}) {
  // Static sizes for desktop
  const containerPadding = "px-3 py-3 gap-3";
  const buttonSize = "h-12 w-12";
  const iconSize = "w-9 h-9";
  const socialIconImageSize = "w-7 h-7";
  const dividerHeight = "h-6";

  const wrapperClass =
    "fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-end select-none w-max max-w-[95vw]";

  // State to hold the data for the modal. If null, the modal stays hidden.
  const [activeLinkData, setActiveLinkData] = useState(null);

  return (
    <>
      <LinkConfirmationModal
        linkData={activeLinkData}
        onClose={() => setActiveLinkData(null)}
      />

      <div className={wrapperClass}>
        <div
          className={`flex items-center bg-[#fdfbf7] border-[2px] border-black rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] overflow-x-auto no-scrollbar ${containerPadding}`}
        >
          {/* 1. OPEN APPS */}
          {openWindows.length === 0 ? (
            <div className="w-8 h-8 flex items-center justify-center opacity-20">
              <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
            </div>
          ) : (
            openWindows.map((win) => {
              const isActive = win.id === activeWindowId;
              return (
                <button
                  key={win.id}
                  onClick={() =>
                    isActive ? onMinimizeWindow(win.id) : onFocusWindow(win.id)
                  }
                  className={`
                    shrink-0 ${buttonSize} flex items-center justify-center rounded-lg border-2 transition-all duration-150
                    ${
                      isActive
                        ? "bg-[#A3C9C7] border-black -translate-y-0.5 shadow-[2px_2px_0px_black]"
                        : "bg-white border-transparent hover:border-black hover:bg-gray-50"
                    }
                  `}
                >
                  <img
                    src={win.icon}
                    alt={win.title}
                    className={`${iconSize} object-contain ${isActive ? "grayscale-0" : "grayscale opacity-70 hover:grayscale-0 hover:opacity-100"}`}
                  />
                </button>
              );
            })
          )}

          {/* DIVIDER */}
          <div
            className={`${dividerHeight} w-[2px] bg-gray-500 mx-1 shrink-0`}
          ></div>

          {/* 2. SOCIALS */}
          <div className="flex gap-2 shrink-0">
            {/* ONLY RENDER GITHUB AND LINKEDIN IF NOT ON TABLET */}
            {!isTablet && (
              <>
                {/* GITHUB */}
                <button
                  onClick={() =>
                    setActiveLinkData({
                      title: "GitHub",
                      href: "https://github.com/kaung-h-zaw",
                      icon: "/app-icons/github.png",
                    })
                  }
                  className={`${buttonSize} bg-white flex items-center justify-center rounded-lg border-2 border-transparent hover:border-black hover:bg-gray-100 transition-all group`}
                >
                  <img
                    src="/app-icons/github.png"
                    alt="GitHub"
                    className={`${socialIconImageSize} object-contain opacity-80 group-hover:opacity-100 transition-all group-hover:scale-110`}
                  />
                </button>

                {/* LINKEDIN */}
                <button
                  onClick={() =>
                    setActiveLinkData({
                      title: "LinkedIn",
                      href: "https://linkedin.com/in/kaung-h-zaw",
                      icon: "/app-icons/linkedin.png",
                    })
                  }
                  className={`${buttonSize} bg-white flex items-center justify-center rounded-lg border-2 border-transparent hover:border-black hover:bg-blue-50 transition-all group`}
                >
                  <img
                    src="/app-icons/linkedin.png"
                    alt="LinkedIn"
                    className={`${socialIconImageSize} object-contain opacity-80 group-hover:opacity-100 transition-all group-hover:scale-110`}
                  />
                </button>
              </>
            )}

            {/* INSTAGRAM (Always renders) */}
            <button
              onClick={() =>
                setActiveLinkData({
                  title: "Instagram",
                  href: "https://www.instagram.com/kaung.h.zaw/",
                  icon: "/app-icons/insta.png",
                })
              }
              className={`${buttonSize} bg-white flex items-center justify-center rounded-lg border-2 border-transparent hover:border-black hover:bg-pink-50 transition-all group`}
            >
              <img
                src="/app-icons/insta.png"
                alt="Instagram"
                className={`${socialIconImageSize} object-contain opacity-80 group-hover:opacity-100 transition-all group-hover:scale-110`}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
