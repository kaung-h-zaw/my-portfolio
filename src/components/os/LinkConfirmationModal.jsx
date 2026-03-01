import React from "react";
import { motion } from "framer-motion";

export default function LinkConfirmationModal({ linkData, onClose }) {
  if (!linkData) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 pointer-events-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-[320px] bg-gray-300/60 backdrop-blur-md border border-black/10 rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,0.06)] overflow-hidden"
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

          <h2 className="text-xl font-black text-black/80 mb-2 leading-tight uppercase tracking-tight">
            Open {linkData.title}?
          </h2>
          <p className="text-xs text-black/60 font-mono mb-6 leading-relaxed">
            This will open a new tab to:
            <br />
            <span className="text-black/50 truncate block mt-1 px-2">
              {linkData.href}
            </span>
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-white/60 backdrop-blur-sm border border-black/10 rounded-lg font-bold text-sm uppercase tracking-wider text-black/80 shadow-[2px_2px_0px_rgba(0,0,0,0.06)] hover:bg-white/80 hover:border-black/20 active:translate-y-[1px] active:shadow-none transition-all"
            >
              Cancel
            </button>
            <a
              href={linkData.href}
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className="flex-1 py-3 bg-black/80 border border-black/10 rounded-lg font-bold text-sm uppercase tracking-wider text-white shadow-[2px_2px_0px_rgba(0,0,0,0.06)] hover:bg-black active:translate-y-[1px] active:shadow-none transition-all text-center block"
            >
              Continue
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
