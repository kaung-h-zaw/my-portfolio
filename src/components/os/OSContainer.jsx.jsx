import React, { useState, useEffect, useMemo } from "react";

// Layout Imports
import DesktopLayout from "./layouts/DesktopLayout";
import TabletLayout from "./layouts/TabletLayout";
import PhoneLayout from "./layouts/PhoneLayout";

// App Imports
import AboutApp from "../apps/AboutApp";
import SkillsApp from "../apps/SkillsApp";
import ProjectsApp from "../apps/ProjectsApp";
import ContactApp from "../apps/ContactApp";
import ExperienceApp from "../apps/ExperienceApp";
import EducationApp from "../apps/EducationApp";

export default function OSContainer() {
  const [deviceType, setDeviceType] = useState("desktop"); // desktop | tablet | phone
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [zTop, setZTop] = useState(20);

  // 1. DEVICE DETECTION
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Phone: < 640px
      // Tablet: 640px - 1024px
      // Desktop: > 1024px
      if (width < 640) {
        setDeviceType("phone");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. APP CONFIG
  const apps = useMemo(
    () => ({
      about: {
        id: "about",
        title: "About_Me",
        icon: "/app-icons/about.png",
        mobileIcon: "/app-icons/about.png", // Replace with retro icons when ready
        component: AboutApp,
      },
      skills: {
        id: "skills",
        title: "Skills",
        icon: "/app-icons/skills.png",
        mobileIcon: "/app-icons/skills.png",
        component: SkillsApp,
      },
      projects: {
        id: "projects",
        title: "Projects",
        icon: "/app-icons/project.png",
        mobileIcon: "/app-icons/project.png",
        component: ProjectsApp,
      },
      experience: {
        id: "experience",
        title: "Experience",
        icon: "/app-icons/experience.png",
        mobileIcon: "/app-icons/experience.png",
        component: ExperienceApp,
      },
      education: {
        id: "education",
        title: "Education",
        icon: "/app-icons/education.png",
        mobileIcon: "/app-icons/education.png",
        component: EducationApp,
      },
      contact: {
        id: "contact",
        title: "Contact",
        icon: "/app-icons/mail.png",
        mobileIcon: "/app-icons/mail.png",
        component: ContactApp,
      },
    }),
    [],
  );

  // 3. WINDOW ACTIONS
  const openWindow = (id) => {
    if (openWindows.find((w) => w.id === id)) {
      focusWindow(id);
      return;
    }

    const app = apps[id];

    // Default position logic (center)
    // We calculate this dynamically so windows cascade slightly
    const offset = openWindows.length * 20;
    const defaultPos = { x: 50 + offset, y: 50 + offset };

    setZTop((z) => z + 1);
    setOpenWindows((prev) => [
      ...prev,
      {
        id,
        title: app.title,
        icon: app.icon,
        zIndex: zTop + 1,
        defaultPos,
        minimized: false,
      },
    ]);
    setActiveWindowId(id);
  };

  const closeWindow = (id) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const focusWindow = (id) => {
    setZTop((z) => z + 1);
    setOpenWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, zIndex: zTop + 1, minimized: false } : w,
      ),
    );
    setActiveWindowId(id);
  };

  const minimizeWindow = (id) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
    );
    setActiveWindowId(null);
  };

  // Props to pass down to layouts
  const layoutProps = {
    apps,
    openWindows,
    activeWindowId,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#EFE5D9] font-mono text-slate-900 selection:bg-black selection:text-white">
      {deviceType === "desktop" && <DesktopLayout {...layoutProps} />}
      {deviceType === "tablet" && <TabletLayout {...layoutProps} />}
      {deviceType === "phone" && <PhoneLayout {...layoutProps} />}
    </div>
  );
}
