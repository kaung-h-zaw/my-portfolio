import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import { X, Minus, Square, Maximize2 } from "lucide-react";

export default function Window({
  id,
  title,
  defaultPos = { x: 50, y: 50 },
  zIndex,
  onClose,
  onFocus,
  onMinimize,
  children,
  isMobile,
}) {
  const nodeRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(true);
  const [position, setPosition] = useState(defaultPos);
  const [isLoading, setIsLoading] = useState(true);

  const restoredWidth = isMobile ? window.innerWidth * 0.9 : 600;
  const restoredHeight = isMobile ? window.innerHeight * 0.6 : 450;

  useEffect(() => {
    if (isMobile) {
      setIsMaximized(true);
      setPosition({ x: 0, y: 0 });
    }

    if (!isMobile) {
      const centerX = (window.innerWidth - 600) / 2;
      const centerY = (window.innerHeight - 450) / 2;
      setPosition({ x: Math.max(0, centerX), y: Math.max(0, centerY) });
    }
  }, [isMobile]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const bounds = {
    top: 40,
    left: 0,
    right: Math.max(0, window.innerWidth - restoredWidth),
    bottom: Math.max(0, window.innerHeight - restoredHeight - 100),
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
    onFocus();

    if (isMaximized) {
      const centerX = (window.innerWidth - restoredWidth) / 2;
      const centerY = (window.innerHeight - restoredHeight) / 2;
      setPosition({ x: Math.max(0, centerX), y: Math.max(0, centerY) });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  let positionClass = "";
  if (isMaximized) {
    if (isMobile) {
      positionClass =
        "fixed top-[50px] left-1 right-2 bottom-[calc(env(safe-area-inset-bottom)+8px)] z-50 !transform-none border border-black/20 rounded-2xl bg-gray-300/80 backdrop-blur-md";
    } else {
      positionClass =
        "fixed top-11 left-1 right-1 bottom-20 z-50 rounded-2xl !transform-none border border-black/20 bg-gray-300/80 backdrop-blur-md";
    }
  } else {
    positionClass =
      "absolute w-[90vw] md:w-[600px] h-[60vh] md:h-[450px] rounded-2xl border border-black/20 shadow-[6px_6px_0px_rgba(0,0,0,0.06)] bg-gray-300/80 backdrop-blur-md";
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
        style={{ zIndex }}
        className={`bg-gray-300/40 flex flex-col overflow-hidden ${positionClass} pointer-events-auto`}
        onMouseDown={onFocus}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{
            scale: 0.95,
            y: 10,
            opacity: 0,
            transition: { duration: 0.15, ease: "easeOut" },
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            mass: 1,
          }}
          className="flex flex-col h-full rounded-2xl"
        >
          {/* TITLE BAR */}
          <div
            className={`os-titlebar shrink-0 flex items-center justify-between select-none border-b border-black/10 bg-white/40 backdrop-blur-md ${
              isMobile ? "h-12 px-4" : "h-10 px-3"
            } cursor-grab active:cursor-grabbing`}
            onDoubleClick={toggleMaximize}
          >
            <div className="flex items-center gap-2 pointer-events-none">
              {!isMobile && (
                <div className="w-2 h-2 bg-black/30 rounded-full animate-pulse" />
              )}
              <span className="font-medium text-xs tracking-wider uppercase truncate max-w-[200px] md:max-w-md text-black/60">
                {title}
              </span>
            </div>

            <div className="flex gap-1.5 no-drag">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize();
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  onMinimize();
                }}
                className="w-6 h-6 border border-black/10 bg-transparent hover:bg-black/5 flex items-center justify-center transition-colors rounded-lg cursor-pointer"
              >
                <Minus
                  size={12}
                  strokeWidth={2}
                  className="text-black/50 hover:text-black/60"
                />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isMobile) toggleMaximize();
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  if (!isMobile) toggleMaximize();
                }}
                className={`w-6 h-6 border border-black/10 bg-transparent flex items-center justify-center transition-colors rounded-lg cursor-pointer ${
                  isMobile
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-black/5"
                }`}
              >
                {isMaximized ? (
                  <Maximize2
                    size={11}
                    strokeWidth={2}
                    className="text-black/50 hover:text-black/60"
                  />
                ) : (
                  <Square
                    size={10}
                    strokeWidth={2}
                    className="text-black/50 hover:text-black/60"
                  />
                )}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-6 h-6 border border-black/10 bg-[#ff6b6b]/80 hover:bg-[#ff6b6b] text-white flex items-center justify-center transition-colors rounded-lg cursor-pointer"
              >
                <X size={13} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className="@container flex-1 overflow-auto bg-gray-300/60 backdrop-blur-sm p-4 relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Draggable>
  );
}
