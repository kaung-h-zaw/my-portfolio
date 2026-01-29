import React, { useRef } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import { Terminal, Minus, Square, X } from "lucide-react";

export default function Window({
  id,
  title,
  defaultPos,
  zIndex,
  onClose,
  onFocus,
  children,
  isMobile,
  isMaximized = true,
  theme,
}) {
  const nodeRef = useRef(null);
  const isDark = theme === "dark";

  // Window Styles
  const windowBase = isDark
    ? "bg-zinc-950 border-2 border-cyan-900 shadow-[0_0_40px_rgba(0,0,0,0.6)]"
    : "bg-white border border-slate-300 shadow-2xl rounded-lg";

  const titleBarBase = isDark
    ? "bg-zinc-900 text-cyan-500 border-b border-cyan-900"
    : "bg-slate-100 text-slate-800 border-b border-slate-200 rounded-t-lg";

  const contentBg = isDark ? "bg-zinc-950" : "bg-white";

  // Button Styles
  const minBtn = isDark
    ? "bg-cyan-950 hover:bg-cyan-800 text-cyan-600"
    : "bg-slate-300 hover:bg-slate-400 text-slate-600";
  const maxBtn = isDark
    ? "bg-cyan-950 hover:bg-cyan-800 text-cyan-600"
    : "bg-slate-300 hover:bg-slate-400 text-slate-600";
  const closeBtn = isDark
    ? "bg-red-950 hover:bg-red-900 text-red-500"
    : "bg-red-400 hover:bg-red-500 text-red-900";

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".os-titlebar"
      bounds="parent"
      defaultPosition={isMobile ? { x: 0, y: 0 } : defaultPos}
      onStart={onFocus}
      onMouseDown={onFocus}
      disabled={isMobile || isMaximized}
    >
      <motion.div
        ref={nodeRef}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.15 }}
        style={{ zIndex }}
        className={`absolute flex flex-col ${isMobile ? "inset-0 border-0 z-50 h-full w-full" : isMaximized ? "inset-4 " + windowBase : "w-[92vw] max-w-[980px] h-[82vh] max-h-[680px] " + windowBase}`}
        onMouseDown={onFocus}
      >
        <div
          className={`os-titlebar h-10 md:h-10 flex items-center justify-between px-3 select-none md:cursor-move flex-shrink-0 ${titleBarBase}`}
        >
          <div
            className={`flex items-center gap-2 font-bold text-xs uppercase tracking-wider`}
          >
            <Terminal size={12} />
            <span className="truncate max-w-[150px] md:max-w-none">
              {title}
            </span>
          </div>
          <div className="flex gap-2" onMouseDown={(e) => e.stopPropagation()}>
            {!isMobile && (
              <>
                <button
                  className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${minBtn}`}
                >
                  <Minus size={10} strokeWidth={3} />
                </button>
                <button
                  className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${maxBtn}`}
                >
                  <Square size={8} strokeWidth={3} />
                </button>
              </>
            )}
            <button
              className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${closeBtn}`}
              onClick={onClose}
              title="Close"
            >
              <X size={10} strokeWidth={3} />
            </button>
          </div>
        </div>
        <div className={`flex-1 overflow-hidden relative ${contentBg}`}>
          <div className="absolute inset-0 overflow-y-auto custom-scrollbar">
            {children}
          </div>
        </div>
      </motion.div>
    </Draggable>
  );
}
