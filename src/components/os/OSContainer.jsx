import React, { useState, useEffect, useMemo, useRef, lazy } from "react";
import DesktopLayout from "./layouts/DesktopLayout";
import TabletLayout from "./layouts/TabletLayout";
import PhoneLayout from "./layouts/PhoneLayout";
const AboutApp = lazy(() => import("../apps/AboutApp"));
const SkillsApp = lazy(() => import("../apps/SkillsApp"));
const ProjectsApp = lazy(() => import("../apps/ProjectsApp"));
const ContactApp = lazy(() => import("../apps/ContactApp"));
const ExperienceApp = lazy(() => import("../apps/ExperienceApp"));
const EducationApp = lazy(() => import("../apps/EducationApp"));

import { ProfileIcon, SkillsIcon, ProjectsIcon, ExperienceIcon, EducationIcon, ContactIcon } from "./AppIcons";

function getDeviceType() {
  const width = window.innerWidth;
  const isLandscapePhone = width <= 1024 && window.innerHeight < 500 &&
    window.matchMedia("(pointer: coarse)").matches;

  if (width < 640 || isLandscapePhone) return "phone";
  return width <= 1024 ? "tablet" : "desktop";
}

export default function OSContainer() {
  const [deviceType, setDeviceType] = useState(getDeviceType);
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const zTop = useRef(21);
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
    const handleResize = () => setDeviceType(getDeviceType());

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const apps = useMemo(
    () => ({
      about: {
        id: "about",
        title: "About_Me",
        icon: ProfileIcon,
        mobileIcon: ProfileIcon,
        component: AboutApp,
      },
      skills: {
        id: "skills",
        title: "Skills",
        icon: SkillsIcon,
        mobileIcon: SkillsIcon,
        component: SkillsApp,
      },
      projects: {
        id: "projects",
        title: "Projects",
        icon: ProjectsIcon,
        mobileIcon: ProjectsIcon,
        component: ProjectsApp,
      },
      experience: {
        id: "experience",
        title: "Experience",
        icon: ExperienceIcon,
        mobileIcon: ExperienceIcon,
        component: ExperienceApp,
      },
      education: {
        id: "education",
        title: "Education",
        icon: EducationIcon,
        mobileIcon: EducationIcon,
        component: EducationApp,
      },
      contact: {
        id: "contact",
        title: "Contact",
        icon: ContactIcon,
        mobileIcon: ContactIcon,
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
    if (!app) return;
    const offset = openWindows.length * 24;
    const maxX = Math.max(0, window.innerWidth - 680);
    const maxY = Math.max(0, window.innerHeight - 520);
    const defaultPos = {
      x: Math.min(60 + offset, maxX),
      y: Math.min(50 + offset, maxY),
    };

    zTop.current += 1;
    setOpenWindows([{
      id, title: app.title, icon: app.icon,
      zIndex: zTop.current, defaultPos, minimized: false,
    }]);
    setActiveWindowId(id);
  };

  const closeWindow = (id) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const focusWindow = (id) => {
    zTop.current += 1;
    const nextZ = zTop.current;
    setOpenWindows((prev) => prev.map((w) =>
      w.id === id ? { ...w, zIndex: nextZ, minimized: false } : w,
    ));
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
    <div className="fixed inset-0 w-screen h-[100dvh] overflow-hidden font-sans text-slate-100 selection:bg-indigo-500/40 selection:text-white">
      {deviceType === "desktop" && <DesktopLayout {...layoutProps} />}
      {deviceType === "tablet" && <TabletLayout {...layoutProps} />}
      {deviceType === "phone" && <PhoneLayout {...layoutProps} />}
    </div>
  );
}
