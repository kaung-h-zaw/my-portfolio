import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeScreen({ onComplete }) {
  const [bootLogs, setBootLogs] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const logs = [
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

  useEffect(() => {
    let currentLog = 0;
    const logInterval = setInterval(() => {
      if (currentLog < logs.length) {
        setBootLogs((prev) => [...prev, logs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(logInterval);
        setTimeout(() => setIsReady(true), 400);
      }
    }, 150);

    const completionTimer = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => {
      clearInterval(logInterval);
      clearTimeout(completionTimer);
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
          style={{
            background: "linear-gradient(180deg, #cccccc 0%, #dcdcdc 100%)",
          }}
        >
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(90,90,90,0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(90,90,90,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Terminal-style */}
          <div className="relative z-10 w-full max-w-[92vw] sm:max-w-2xl px-6 md:px-12 flex flex-col gap-2">
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
              <div className="flex flex-col gap-1.5">
                {bootLogs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`text-[10px] sm:text-xs font-mono tracking-wider ${
                      index === logs.length - 1 || index === logs.length - 2
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
