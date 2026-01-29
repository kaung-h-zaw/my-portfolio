import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  FileText,
  Cpu,
  Folder,
  Mail,
  Briefcase,
  GraduationCap,
} from "lucide-react";

// Import your Apps
import AboutApp from "../apps/AboutApp";
import SkillsApp from "../apps/SkillsApp";
import ProjectsApp from "../apps/ProjectsApp";
import ContactApp from "../apps/ContactApp";
import ExperienceApp from "../apps/ExperienceApp";
import EducationApp from "../apps/EducationApp";

// Import your OS Components (The separate files you just updated)
import TopBar from "./TopBar";
import StatusBar from "./StatusBar";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";

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
  const [initialized, setInitialized] = useState(false);

  // THEME STATE WITH PERSISTENCE
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("os-theme");
      return savedTheme ? savedTheme : "light";
    }
    return "light";
  });

  const isDark = theme === "dark";

  // Save theme changes
  useEffect(() => {
    localStorage.setItem("os-theme", theme);
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  // Define Icons
  const desktopIcons = useMemo(
    () => [
      { id: "about", title: "ABOUT_ME", type: "TXT FILE", icon: FileText },
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
      { id: "contact", title: "CONTACT", type: "MSG FILE", icon: Mail },
    ],
    [],
  );

  // Define Window Content
  const windowRegistry = useMemo(
    () => ({
      about: { title: "C:\\USER\\KAUNG\\ABOUT.TXT", component: AboutApp },
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
      contact: { title: "MAIL_CLIENT_V1.0", component: ContactApp },
    }),
    [],
  );

  // Initialize (Open About on Desktop)
  useEffect(() => {
    if (!initialized) {
      const mobileCheck = window.innerWidth < 1024;
      if (!mobileCheck) {
        setOpenWindows([{ id: "about", z: 21, defaultPos: { x: 0, y: 0 } }]);
        setZTop(21);
      } else {
        setOpenWindows([]);
      }
      setInitialized(true);
    }
  }, [initialized]);

  // Window Management
  function openWindow(id) {
    if (isMobile) {
      setOpenWindows([{ id, z: 100, defaultPos: { x: 0, y: 0 } }]);
      return;
    }
    const exists = openWindows.find((w) => w.id === id);
    if (exists) {
      focusWindow(id);
      return;
    }
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

  // Styles
  const mainBg = isDark
    ? "bg-zinc-950 selection:bg-cyan-500 selection:text-black"
    : "bg-slate-200 selection:bg-slate-700 selection:text-white";
  const textColor = isDark ? "text-cyan-400" : "text-slate-800";
  const sidebarBg = isDark
    ? "border-cyan-900/30 bg-black/40"
    : "border-slate-300 bg-slate-100/50";
  const mobileLauncherBorder = isDark ? "border-cyan-900" : "border-slate-400";
  const mobileLauncherText = isDark ? "text-cyan-500" : "text-slate-800";

  return (
    <div
      className={`h-screen w-screen ${mainBg} ${textColor} font-mono overflow-hidden flex flex-col transition-colors duration-300`}
    >
      {/* 1. Top Bar */}
      <TopBar
        theme={theme}
        setTheme={setTheme}
        isMobile={isMobile}
        hasOpenWindows={openWindows.length > 0}
        onCloseAll={closeAll}
      />

      {/* 2. Main Desktop Area */}
      <div
        className={`flex-1 relative overflow-hidden transition-colors duration-300 ${mainBg}`}
      >
        {/* Mobile Launcher (Only visible when no windows open) */}
        {isMobile && openWindows.length === 0 && (
          <div className="absolute inset-0 overflow-y-auto flex flex-col items-center pt-8 pb-10">
            <div className="w-full max-w-md px-6">
              <div className={`mb-6 border-b pb-2 ${mobileLauncherBorder}`}>
                <div
                  className={`text-sm font-bold uppercase ${mobileLauncherText}`}
                >
                  Launcher
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {desktopIcons.map((file) => (
                  <DesktopIcon
                    key={file.id}
                    file={file}
                    isActive={false}
                    onOpen={() => openWindow(file.id)}
                    isMobile={true}
                    theme={theme} // Pass theme down
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Sidebar (Only visible on Desktop) */}
        {!isMobile && (
          <div
            className={`absolute left-0 top-0 bottom-0 w-[260px] border-r backdrop-blur-sm p-6 flex flex-col gap-4 overflow-y-auto z-10 transition-colors duration-300 ${sidebarBg}`}
          >
            {desktopIcons.map((file) => {
              const isActive = openWindows.some((w) => w.id === file.id);
              return (
                <DesktopIcon
                  key={file.id}
                  file={file}
                  isActive={isActive}
                  onOpen={() => openWindow(file.id)}
                  isMobile={false}
                  theme={theme} // Pass theme down
                />
              );
            })}
          </div>
        )}

        {/* Windows Container */}
        <div
          className={`absolute inset-0 ${!isMobile ? "left-[260px]" : ""} pointer-events-none`}
        >
          <AnimatePresence>
            {openWindows.map((w) => {
              const entry = windowRegistry[w.id];
              if (!entry) return null;
              return (
                <div key={w.id} className="pointer-events-auto h-full">
                  <Window
                    id={w.id}
                    title={entry.title}
                    defaultPos={w.defaultPos}
                    zIndex={w.z}
                    onClose={() => closeWindow(w.id)}
                    onFocus={() => focusWindow(w.id)}
                    isMobile={isMobile}
                    isMaximized={true}
                    theme={theme} // Pass theme down
                  >
                    {/* Render the App Component with Theme Prop */}
                    <entry.component theme={theme} />
                  </Window>
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* 3. Status Bar */}
      <StatusBar
        theme={theme}
        isMobile={isMobile}
        hasOpenWindows={openWindows.length > 0}
        onCloseAll={closeAll}
      />
    </div>
  );
}
