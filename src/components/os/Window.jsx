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
  const [windowSize, setWindowSize] = useState({ width: 600, height: 450 });

  useEffect(() => {
    // Force maximize on mobile init
    if (isMobile) {
      setIsMaximized(true);
      setPosition({ x: 0, y: 0 });
    }

    // Measure window size
    if (nodeRef.current) {
      setWindowSize({
        width: nodeRef.current.offsetWidth || 600,
        height: nodeRef.current.offsetHeight || 450,
      });
    }

    // Center on desktop init
    if (!isMobile) {
      const centerX = (window.innerWidth - 600) / 2;
      const centerY = (window.innerHeight - 450) / 2;
      setPosition({ x: Math.max(0, centerX), y: Math.max(0, centerY) });
    }
  }, [isMobile]);

  // RESTORED BOUNDS LOGIC
  const bounds = {
    top: 48, // Clear top bar
    left: 0,
    // Ensure we don't go too far right (width of screen - width of window)
    right: Math.max(0, window.innerWidth - windowSize.width),
    // Ensure we don't go too far down (height of screen - height of window - dock space)
    bottom: Math.max(0, window.innerHeight - windowSize.height - 80),
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
    onFocus();

    if (isMaximized) {
      // Restore to center if minimizing
      const centerX =
        (window.innerWidth - (isMobile ? window.innerWidth * 0.9 : 600)) / 2;
      const centerY =
        (window.innerHeight - (isMobile ? window.innerHeight * 0.6 : 450)) / 2;
      setPosition({ x: Math.max(0, centerX), y: Math.max(0, centerY) });
    } else {
      // Reset to 0,0 if maximizing
      setPosition({ x: 0, y: 0 });
    }
  };

  const windowStyle = "bg-[#fdfbf7] flex flex-col overflow-hidden";
  const titleBarStyle = "border-b-[3px] border-black bg-[#fdfbf7]";

  let positionClass = "";
  if (isMaximized) {
    if (isMobile) {
      positionClass =
        "fixed top-[65px] left-3 right-3 bottom-[calc(env(safe-area-inset-bottom)+36px)] z-50 !transform-none border-[3px] border-black rounded-xl shadow-[4px_4px_0px_black] bg-[#fdfbf7]";
    } else {
      positionClass =
        "fixed top-14 left-4 right-4 bottom-28 z-50 rounded-xl !transform-none border-[3px] border-black shadow-none";
    }
  } else {
    positionClass =
      "absolute w-[90vw] md:w-[600px] h-[60vh] md:h-[450px] rounded-xl border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]";
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".os-titlebar"
      // FIX: Use "cancel" to make buttons interactable
      cancel=".no-drag"
      position={isMaximized ? { x: 0, y: 0 } : position}
      onDrag={(e, ui) => setPosition({ x: ui.x, y: ui.y })}
      onStart={onFocus}
      onMouseDown={onFocus}
      disabled={isMaximized}
      // RESTORED: Pass bounds to Draggable (only active when not maximized)
      bounds={isMaximized ? undefined : bounds}
    >
      <div
        ref={nodeRef}
        style={{ zIndex }}
        className={`${windowStyle} ${positionClass} pointer-events-auto`}
        onMouseDown={onFocus}
      >
        <motion.div
          // 1. Start slightly smaller, lower down, and transparent
          initial={{ scale: 0.85, y: 20, opacity: 0 }}
          // 2. Animate to full size, original position, fully visible
          animate={{ scale: 1, y: 0, opacity: 1 }}
          // 3. When closing, quickly shrink and fade
          exit={{
            scale: 0.9,
            y: 10,
            opacity: 0,
            transition: { duration: 0.15, ease: "easeOut" },
          }}
          // 4. THE MAGIC: Use spring physics for the opening animation
          transition={{
            type: "spring",
            stiffness: 400, // How fast it pops up (higher = faster)
            damping: 25, // How much it bounces (lower = more bounce, higher = less bounce)
            mass: 1, // The "weight" of the window
          }}
          className="flex flex-col w-full h-full shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] rounded-xl"
        >
          {/* TITLE BAR */}
          <div
            className={`os-titlebar shrink-0 flex items-center justify-between select-none ${titleBarStyle} ${
              isMobile ? "h-12 px-4" : "h-10 px-3"
            } cursor-grab active:cursor-grabbing`}
            onDoubleClick={toggleMaximize}
          >
            <div className="flex items-center gap-2 pointer-events-none">
              {!isMobile && (
                <div className="w-3 h-3 bg-black rounded-full animate-pulse" />
              )}
              <span className="font-bold text-sm tracking-widest uppercase truncate max-w-[200px] md:max-w-md">
                {title}
              </span>
            </div>

            {/* FIX: Class "no-drag" + stopPropagation for touch safety */}
            <div className="flex gap-2 no-drag">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize();
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  onMinimize();
                }}
                className="w-6 h-6 border-2 border-black bg-white hover:bg-black hover:text-white flex items-center justify-center transition-colors rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[2px] cursor-pointer"
              >
                <Minus size={12} strokeWidth={4} />
              </button>

              {/* HIDE on mobile, show on desktop */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isMobile) toggleMaximize();
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  if (!isMobile) toggleMaximize();
                }}
                // Add opacity and cursor change for mobile
                className={`w-6 h-6 border-2 border-black bg-white flex items-center justify-center transition-colors rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[2px] cursor-pointer 
    ${isMobile ? "opacity-50 cursor-not-allowed" : "hover:bg-black hover:text-white"}`}
              >
                {isMaximized ? (
                  <Maximize2 size={12} strokeWidth={4} />
                ) : (
                  <Square size={10} strokeWidth={4} />
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
                className="w-6 h-6 border-2 border-black bg-[#ff6b6b] hover:bg-red-600 hover:text-white text-black flex items-center justify-center transition-colors rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[2px] cursor-pointer"
              >
                <X size={14} strokeWidth={4} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-[#fdfbf7] p-4 relative">
            {children}
          </div>
        </motion.div>
      </div>
    </Draggable>
  );
}
