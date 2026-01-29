import React, { useEffect, useMemo, useRef, useState } from "react";
import Draggable from "react-draggable";
import { motion, AnimatePresence } from "framer-motion"; // IMPORT THIS
import {
  FileText,
  Cpu,
  Folder,
  Mail,
  Briefcase,
  GraduationCap,
  Terminal,
  Minus,
  Square,
  X,
  Home,
  FileUser,
  MessageCircle,
  Globe,
  Radio,
  Github,
  Linkedin,
} from "lucide-react";

import AboutApp from "../apps/AboutApp";
import SkillsApp from "../apps/SkillsApp";
import ProjectsApp from "../apps/ProjectsApp";
import ContactApp from "../apps/ContactApp";
import ExperienceApp from "../apps/ExperienceApp";
import EducationApp from "../apps/EducationApp";
import ResumeApp from "../apps/ResumeApp";
import NewsApp from "../apps/NewsApp";

function useIsMobileOrTablet() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 1024);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);
  return isMobile;
}

export default function Desktop() {
  const isMobile = useIsMobileOrTablet();
  const [openWindows, setOpenWindows] = useState([]);
  const [zTop, setZTop] = useState(20);
  const [time, setTime] = useState(new Date());

  const desktopIcons = useMemo(
    () => [
      { id: "about", title: "ABOUT_ME", type: "TXT FILE", icon: FileText },
      { id: "resume", title: "RESUME", type: "PDF FILE", icon: FileUser },
      { id: "skills", title: "SKILLS_V2", type: "EXE FILE", icon: Cpu },
      { id: "projects", title: "PROJECTS", type: "DIR FILE", icon: Folder },
      {
        id: "experience",
        title: "EXPERIENCE",
        type: "LOG FILE",
        icon: Briefcase,
      },
      {
        id: "education",
        title: "EDUCATION",
        type: "DB FILE",
        icon: GraduationCap,
      },
      { id: "news", title: "NEWS.FEED", type: "RSS FILE", icon: Radio },
      { id: "contact", title: "CONTACT", type: "MSG FILE", icon: Mail },
    ],
    [],
  );

  const windowRegistry = useMemo(
    () => ({
      about: { title: "C:\\USER\\KAUNG\\ABOUT.TXT", component: AboutApp },
      resume: {
        title: "C:\\USER\\KAUNG\\DOCUMENTS\\RESUME.PDF",
        component: ResumeApp,
      },
      skills: { title: "C:\\KAUNG-SPACE\\SKILLS.EXE", component: SkillsApp },
      projects: {
        title: "C:\\USER\\KAUNG\\PROJECTS\\",
        component: ProjectsApp,
      },
      experience: {
        title: "C:\\SYSTEM\\LOGS\\EXPERIENCE.LOG",
        component: ExperienceApp,
      },
      education: {
        title: "C:\\SYSTEM\\DB\\EDUCATION.DB",
        component: EducationApp,
      },
      news: { title: "HACKER_NEWS_CLIENT", component: NewsApp },
      contact: { title: "MAIL_CLIENT_V1.0", component: ContactApp },
    }),
    [],
  );

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setOpenWindows((prev) => {
        if (prev.some((w) => w.id === "about")) return prev;
        return [...prev, { id: "about", z: 21, defaultPos: { x: 0, y: 0 } }];
      });
      setZTop(21);
    }
  }, [isMobile]);

  function openWindow(id) {
    if (isMobile) {
      setOpenWindows([{ id, z: 100, defaultPos: { x: 0, y: 0 } }]);
      return;
    }
    const exists = openWindows.find((w) => w.id === id);
    if (exists) {
      // Just focus if already open
      focusWindow(id);
      return;
    }
    // REPLACE old windows with new one (Single Window Mode)
    setZTop((z) => z + 1);
    setOpenWindows([{ id, z: zTop + 1, defaultPos: { x: 0, y: 0 } }]);
  }

  function closeWindow(id) {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
  }
  function closeAll() {
    setOpenWindows([]);
  }
  function focusWindow(id) {
    setZTop((z) => z + 1);
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, z: zTop + 1 } : w)),
    );
  }

  return (
    <div className="h-screen w-screen bg-white text-black font-mono overflow-hidden flex flex-col selection:bg-black selection:text-white">
      {/* TOP BAR */}
      <div className="h-12 md:h-10 bg-black text-white flex items-center justify-between px-4 border-b-2 border-black select-none z-[9999]">
        <div className="flex items-center gap-3">
          {isMobile && openWindows.length > 0 && (
            <button
              onClick={closeAll}
              className="p-1 border border-white active:bg-white active:text-black transition-colors"
            >
              <Home size={18} />
            </button>
          )}
          <span className="bg-white text-black px-2 text-sm font-bold tracking-widest uppercase">
            KAUNG-SPACE
          </span>
          <div className="flex gap-2 md:gap-4 text-[10px] md:text-sm font-bold tracking-widest uppercase ml-2 md:ml-4">
            <span className="cursor-pointer hover:underline">FILE</span>
            <span className="cursor-pointer hover:underline">VIEW</span>
            <span className="cursor-pointer hover:underline">HELP</span>
          </div>
        </div>
        <div className="text-[10px] md:text-xs tracking-widest">
          {time.toLocaleTimeString([], { hour12: false })}
        </div>
      </div>

      {/* MAIN SURFACE */}
      <div className="flex-1 relative overflow-hidden bg-white">
        {isMobile && openWindows.length === 0 && (
          <div className="absolute inset-0 overflow-y-auto bg-white flex flex-col items-center pt-8 pb-10">
            <div className="w-full max-w-md px-6">
              <div className="mb-6 border-b-2 border-black pb-2">
                <div className="text-sm font-bold uppercase">Launcher</div>
                <div className="text-[10px] text-gray-500 uppercase mt-1">
                  Tap an app to open
                </div>
              </div>

              {/* GRID LAUNCHER */}
              <div className="grid grid-cols-2 gap-4">
                {desktopIcons.map((file) => {
                  const Icon = file.icon;
                  // CHECK IF ACTIVE
                  const isActive = openWindows.some((w) => w.id === file.id);
                  return (
                    <button
                      key={file.id}
                      onClick={() => openWindow(file.id)}
                      // Add ACTIVE styling: "bg-black text-white" if active
                      className={`
                        flex flex-col items-start justify-center p-4 border-2 border-black 
                        shadow-[6px_6px_0_0_black] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_black] transition-all text-left w-full h-24
                        ${isActive ? "bg-black text-white" : "bg-white text-black"}
                      `}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-8 h-8 border-2 flex items-center justify-center shrink-0 ${isActive ? "border-white bg-black" : "border-black bg-gray-50"}`}
                        >
                          <Icon size={16} strokeWidth={2} />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase">
                          {file.title}
                        </div>
                        <div
                          className={`text-[9px] uppercase ${isActive ? "text-gray-300" : "text-gray-500"}`}
                        >
                          {file.type}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className="absolute left-0 top-0 bottom-0 w-[260px] border-r-2 border-black bg-white p-6 flex flex-col gap-6 overflow-y-auto z-10">
            {desktopIcons.map((file) => {
              const isActive = openWindows.some((w) => w.id === file.id);
              return (
                <DesktopIcon
                  key={file.id}
                  file={file}
                  isActive={isActive}
                  onOpen={() => openWindow(file.id)}
                />
              );
            })}
          </div>
        )}

        <div
          className={`absolute inset-0 ${!isMobile ? "left-[260px]" : ""} pointer-events-none`}
        >
          {!isMobile && (
            <div className="absolute left-0 right-0 top-0 h-10 border-b border-black/10 pointer-events-none" />
          )}

          {/* ANIMATE PRESENCE WRAPPER */}
          <AnimatePresence>
            {openWindows.map((w) => {
              const entry = windowRegistry[w.id];
              if (!entry) return null;
              return (
                <div key={w.id} className="pointer-events-auto">
                  <DraggableOSWindow
                    id={w.id}
                    title={entry.title}
                    defaultPos={w.defaultPos}
                    zIndex={w.z}
                    onClose={() => closeWindow(w.id)}
                    onFocus={() => focusWindow(w.id)}
                    isMobile={isMobile}
                    isMaximized={true}
                  >
                    <entry.component />
                  </DraggableOSWindow>
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* STATUS BAR (remains same) */}
      <div className="h-10 md:h-10 border-t-2 border-black flex items-center justify-between px-4 text-[10px] md:text-xs font-bold bg-white select-none z-[9999]">
        <div className="flex gap-4">
          <span>READY</span>
          <span className="hidden md:inline">MEM: 640K OK</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/kaung-h-zaw"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-500 transition-colors p-1"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/kaung-h-zaw/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-600 transition-colors p-1"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://wa.me/66639473379"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-600 transition-colors p-1"
          >
            <MessageCircle size={20} />
          </a>
          <a
            href="https://kaung-space.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="hover:text-purple-600 transition-colors p-1"
          >
            <Globe size={20} />
          </a>
        </div>
        <div className="uppercase hidden sm:block">USER: KAUNG</div>
      </div>
    </div>
  );
}

// Updated DesktopIcon to accept "isActive"
function DesktopIcon({ file, onOpen, isActive }) {
  const Icon = file.icon;
  return (
    <button
      onClick={onOpen}
      className="group flex items-center gap-4 text-left w-full focus:outline-none"
    >
      <div
        className={`w-12 h-12 border-2 border-black flex items-center justify-center transition-all ${isActive ? "bg-black text-white shadow-[2px_2px_0_0_black] translate-x-[2px] translate-y-[2px]" : "bg-white text-black shadow-[4px_4px_0_0_black] group-hover:shadow-[6px_6px_0_0_black]"}`}
      >
        <Icon size={24} strokeWidth={2} />
      </div>
      <div>
        <div
          className={`font-black text-sm uppercase tracking-wide group-hover:underline ${isActive ? "underline" : ""}`}
        >
          {file.title}
        </div>
        <div className="text-[10px] text-neutral-500 uppercase">
          {file.type}
        </div>
      </div>
    </button>
  );
}

// Updated DraggableOSWindow with Framer Motion
function DraggableOSWindow({
  id,
  title,
  defaultPos,
  zIndex,
  onClose,
  onFocus,
  children,
  isMobile,
  isMaximized,
}) {
  const nodeRef = useRef(null);
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
        // ANIMATION PROPS
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.15 }} // Fast, snappy animation
        style={{ zIndex }}
        className={`absolute flex flex-col bg-white border-2 border-black ${isMobile ? "inset-0 border-0 border-t-0 shadow-none z-50" : isMaximized ? "inset-4 shadow-[8px_8px_0_0_black]" : "w-[92vw] max-w-[980px] h-[82vh] max-h-[680px] shadow-[12px_12px_0_0_black]"}`}
        onMouseDown={onFocus}
      >
        <div className="os-titlebar h-10 bg-black text-white border-b-2 border-black flex items-center justify-between px-2 select-none md:cursor-move flex-shrink-0">
          <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider overflow-hidden">
            <Terminal size={14} className="shrink-0" />
            <span className="truncate">{title}</span>
          </div>
          <div className="flex gap-2" onMouseDown={(e) => e.stopPropagation()}>
            {!isMobile && (
              <>
                <button className="w-7 h-7 border border-white grid place-items-center hover:bg-white hover:text-black transition-colors">
                  <Minus size={14} />
                </button>
                <button className="w-7 h-7 border border-white grid place-items-center hover:bg-white hover:text-black transition-colors">
                  <Square size={12} />
                </button>
              </>
            )}
            <button
              className="w-7 h-7 border border-white grid place-items-center hover:bg-white hover:text-black transition-colors"
              onClick={onClose}
            >
              <X size={14} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden relative bg-white">
          <div className="absolute inset-0 overflow-y-auto custom-scrollbar">
            {children}
          </div>
        </div>
      </motion.div>
    </Draggable>
  );
}
