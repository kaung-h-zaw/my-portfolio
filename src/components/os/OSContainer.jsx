import React, { useState, useEffect, useMemo, lazy } from "react";
import DesktopLayout from "./layouts/DesktopLayout";
import TabletLayout from "./layouts/TabletLayout";
import PhoneLayout from "./layouts/PhoneLayout";
const AboutApp = lazy(() => import("../apps/AboutApp"));
const SkillsApp = lazy(() => import("../apps/SkillsApp"));
const ProjectsApp = lazy(() => import("../apps/ProjectsApp"));
const ContactApp = lazy(() => import("../apps/ContactApp"));
const ExperienceApp = lazy(() => import("../apps/ExperienceApp"));
const EducationApp = lazy(() => import("../apps/EducationApp"));

import {
  User,
  Code2,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Mail,
} from "lucide-react";

export default function OSContainer() {
  const [deviceType, setDeviceType] = useState("desktop");
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [zTop, setZTop] = useState(20);
  const [navDirection, setNavDirection] = useState(0);
  const [navigationMode, setNavigationMode] = useState("open");
  const appOrder = [
    "about",
    "projects",
    "experience",
    "skills",
    "education",
    "contact",
  ];

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isLandscape = width > height;

      if (width < 640) {
        setDeviceType("phone");
      } else if (width <= 1024 && !isLandscape) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const apps = useMemo(
    () => ({
      about: {
        id: "about",
        title: "About_Me",
        icon: User,
        mobileIcon: User,
        component: AboutApp,
      },
      skills: {
        id: "skills",
        title: "Skills",
        icon: Code2,
        mobileIcon: Code2,
        component: SkillsApp,
      },
      projects: {
        id: "projects",
        title: "Projects",
        icon: FolderGit2,
        mobileIcon: FolderGit2,
        component: ProjectsApp,
      },
      experience: {
        id: "experience",
        title: "Experience",
        icon: Briefcase,
        mobileIcon: Briefcase,
        component: ExperienceApp,
      },
      education: {
        id: "education",
        title: "Education",
        icon: GraduationCap,
        mobileIcon: GraduationCap,
        component: EducationApp,
      },
      contact: {
        id: "contact",
        title: "Contact",
        icon: Mail,
        mobileIcon: Mail,
        component: ContactApp,
      },
    }),
    [],
  );

  const openWindow = (id, options = {}) => {
    const { source = "open" } = options;
    const currentWindowId = openWindows[0]?.id || activeWindowId;
    const currentIndex = appOrder.indexOf(currentWindowId);
    const nextIndex = appOrder.indexOf(id);

    if (
      source === "arrow" &&
      currentIndex >= 0 &&
      nextIndex >= 0 &&
      currentIndex !== nextIndex
    ) {
      setNavDirection(nextIndex > currentIndex ? 1 : -1);
      setNavigationMode("swap");
    } else {
      setNavDirection(0);
      setNavigationMode("open");
    }

    if (openWindows.find((w) => w.id === id)) {
      focusWindow(id);
      return;
    }

    const app = apps[id];
    const offset = openWindows.length * 24;
    const maxX = Math.max(0, window.innerWidth - 680);
    const maxY = Math.max(0, window.innerHeight - 520);
    const defaultPos = {
      x: Math.min(60 + offset, maxX),
      y: Math.min(50 + offset, maxY),
    };

    setZTop((z) => {
      const nextZ = z + 1;
      setOpenWindows([
        {
          id,
          title: app.title,
          icon: app.icon,
          zIndex: nextZ,
          defaultPos,
          minimized: false,
        },
      ]);
      return nextZ;
    });
    setActiveWindowId(id);
  };

  const closeWindow = (id) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const focusWindow = (id) => {
    setZTop((z) => {
      const nextZ = z + 1;
      setOpenWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, zIndex: nextZ, minimized: false } : w,
        ),
      );
      return nextZ;
    });
    setActiveWindowId(id);
  };

  const minimizeWindow = (id) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
    );
    setActiveWindowId(null);
  };

  const layoutProps = {
    apps,
    appOrder,
    navDirection,
    navigationMode,
    openWindows,
    activeWindowId,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden font-mono text-slate-900 selection:bg-black selection:text-white">
      {deviceType === "desktop" && <DesktopLayout {...layoutProps} />}
      {deviceType === "tablet" && <TabletLayout {...layoutProps} />}
      {deviceType === "phone" && <PhoneLayout {...layoutProps} />}
    </div>
  );
}
