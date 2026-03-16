import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

export default function LinkConfirmationModal({ linkData, onClose }) {
  const displayUrl = linkData?.href?.replace(/^https?:\/\//, "") ?? "";
  const cancelRef = useRef(null);
  const openRef = useRef(null);

  useEffect(() => {
    if (!linkData) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const focusables = [cancelRef.current, openRef.current].filter(Boolean);
        if (focusables.length === 0) return;
        const currentIndex = focusables.indexOf(document.activeElement);
        const nextIndex = event.shiftKey
          ? (currentIndex - 1 + focusables.length) % focusables.length
          : (currentIndex + 1) % focusables.length;
        focusables[nextIndex]?.focus();
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    cancelRef.current?.focus();
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [linkData, onClose]);

  if (!linkData) return null;

  const handleContinue = () => {
    window.open(linkData.href, "_blank", "noopener,noreferrer");
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/35 backdrop-blur-sm p-4 pointer-events-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="link-modal-title"
        aria-describedby="link-modal-desc"
        className="w-full max-w-[360px] bg-gray-300/70 backdrop-blur-md border border-black/10 rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,0.06)] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="bg-white/40 backdrop-blur-md text-black px-4 py-3 flex items-center justify-between border-b border-black/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-black/30 rounded-full animate-pulse"></div>
            <span className="font-bold font-mono uppercase text-xs tracking-wider text-black/80">
              Leaving OS
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white/40 backdrop-blur-sm border border-black/10 rounded-xl shadow-[2px_2px_0px_rgba(0,0,0,0.06)] mb-4 flex items-center justify-center overflow-hidden p-2">
            {typeof linkData.icon === "string" ? (
              <img
                src={linkData.icon}
                alt={linkData.title}
                className="w-full h-full object-contain"
              />
            ) : (
              React.createElement(linkData.icon, {
                size: 32,
                strokeWidth: 2,
                className: "text-black/60",
              })
            )}
          </div>

          <h2
            id="link-modal-title"
            className="text-xl font-black text-black/80 mb-2 leading-tight uppercase tracking-tight"
          >
            Open {linkData.title}?
          </h2>
          <p
            id="link-modal-desc"
            className="text-xs text-black/60 font-mono mb-6 leading-relaxed"
          >
            Open in a new tab
            <span className="text-black/50 break-all block mt-2 px-2">
              {displayUrl}
            </span>
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              ref={cancelRef}
              className="flex-1 py-3 bg-white/60 backdrop-blur-sm border border-black/10 rounded-lg font-bold text-sm uppercase tracking-wider text-black/80 shadow-[2px_2px_0px_rgba(0,0,0,0.06)] hover:bg-white/80 hover:border-black/20 active:translate-y-[1px] active:shadow-none transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleContinue}
              ref={openRef}
              className="flex-1 py-3 bg-black/80 border border-black/10 rounded-lg font-bold text-sm uppercase tracking-wider text-white shadow-[2px_2px_0px_rgba(0,0,0,0.06)] hover:bg-black active:translate-y-[1px] active:shadow-none transition-all text-center block"
            >
              Open
            </button>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
