import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundLayers from "./BackgroundLayers";

const BOOT_LOGS = [
  "INITIALIZING KAUNG_SPACE v2.0...",
  "LOADING MEMORY BANKS [OK]",
  "MOUNTING FILE SYSTEM [OK]",
  "CONNECTING TO API NEXUS...",
  "ESTABLISHING SECURE CONNECTION [OK]",
  "FETCHING SKILLS.EXE [OK]",
  "BYPASSING SECURITY PROTOCOLS...",
  "ACCESS GRANTED.",
  "WELCOME, GUEST.",
];

export default function WelcomeScreen({ onComplete }) {
  const [bootLogs, setBootLogs] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    let currentLog = 0;
    const logInterval = setInterval(() => {
      if (currentLog < BOOT_LOGS.length) {
        setBootLogs((prev) => [...prev, BOOT_LOGS[currentLog]]);
        currentLog++;
      } else {
        clearInterval(logInterval);
        setTimeout(() => setIsReady(true), 400);
      }
    }, 150);

    const completionTimer = setTimeout(() => {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onComplete();
      }
    }, 2200);

    const handleSkip = () => {
      if (hasCompletedRef.current) return;
      hasCompletedRef.current = true;
      clearInterval(logInterval);
      clearTimeout(completionTimer);
      onComplete();
    };

    window.addEventListener("keydown", handleSkip);
    window.addEventListener("pointerdown", handleSkip);

    return () => {
      clearInterval(logInterval);
      clearTimeout(completionTimer);
      window.removeEventListener("keydown", handleSkip);
      window.removeEventListener("pointerdown", handleSkip);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] font-mono flex items-center justify-center"
        >
          <BackgroundLayers
            gradient="linear-gradient(160deg, #d6d2cc 0%, #e2deda 50%, #d8d4cf 100%)"
            showGrain={true}
          />

          {/* Terminal-style */}
          <div className="relative z-10 w-full max-w-[92vw] sm:max-w-2xl px-6 md:px-12 flex flex-col gap-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="self-center text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-black/80 font-mono mb-2 bg-white/60 border border-black/20 px-3 py-1 rounded-md shadow-[2px_2px_0px_rgba(0,0,0,0.1)]"
            >
              press any key or click to skip
            </motion.p>
            {/* Brand Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-6"
            >
              <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-black/70 leading-none">
                KAUNG_SPACE
              </h1>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="h-1 w-8 bg-black/60 rounded-full" />
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.3em] uppercase text-gray-800">
                  v2.0
                </span>
                <div className="h-1 w-8 bg-black/60 rounded-full" />
              </div>
            </motion.div>

            {/* Terminal Log Container */}
            <div className="bg-white/30 backdrop-blur-sm border border-black/10 rounded-xl p-4 sm:p-6 shadow-[6px_6px_0px_rgba(0,0,0,0.06)]">
              <div
                className="flex flex-col gap-1.5"
                role="status"
                aria-live="polite"
              >
                {bootLogs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`text-[10px] sm:text-xs font-mono tracking-wider ${
                      index === BOOT_LOGS.length - 1 ||
                      index === BOOT_LOGS.length - 2
                        ? "text-black font-bold"
                        : "text-black/60"
                    }`}
                  >
                    › {log}
                  </motion.div>
                ))}

                {/* Blinking Cursor */}
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: "linear",
                  }}
                  className="w-1.5 sm:w-2 h-3 sm:h-4 bg-black/70 mt-1"
                />
              </div>
            </div>

            {/* Bottom Watermark */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mt-4"
            >
              <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.4em] font-bold text-gray-700">
                System Ready • 2026
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
