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
        className="w-full max-w-[320px] bg-[#fdfbf7] border-[3px] border-black rounded-2xl shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="bg-black text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse border border-black/50"></div>
            <span className="font-bold font-mono uppercase text-xs tracking-wider">
              Leaving OS
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-gray-100 border-2 border-black rounded-xl shadow-[2px_2px_0px_black] mb-4 flex items-center justify-center overflow-hidden p-2">
            {typeof linkData.icon === "string" ? (
              <img
                src={linkData.icon}
                alt={linkData.title}
                className="w-full h-full object-contain"
              />
            ) : (
              React.createElement(linkData.icon, { size: 32, strokeWidth: 2 })
            )}
          </div>

          <h2 className="text-xl font-black text-black mb-2 leading-tight uppercase tracking-tight">
            Open {linkData.title}?
          </h2>
          <p className="text-xs text-gray-600 font-mono mb-6 leading-relaxed">
            This will open a new tab to:
            <br />
            <span className="text-blue-600 truncate block mt-1 px-2">
              {linkData.href}
            </span>
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-white border-2 border-black rounded-lg font-bold text-sm uppercase tracking-wider shadow-[2px_2px_0px_black] active:translate-y-[2px] active:shadow-none transition-all"
            >
              Cancel
            </button>
            <a
              href={linkData.href}
              target="_blank"
              rel="noreferrer"
              onClick={onClose} // Close the modal after clicking
              className="flex-1 py-3 bg-[#A3C9C7] border-2 border-black rounded-lg font-bold text-sm uppercase tracking-wider shadow-[2px_2px_0px_black] active:translate-y-[2px] active:shadow-none transition-all text-center block"
            >
              Continue
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
