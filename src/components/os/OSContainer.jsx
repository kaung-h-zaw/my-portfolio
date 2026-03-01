import React, { useState, useEffect, useMemo } from "react";
import DesktopLayout from "./layouts/DesktopLayout";
import TabletLayout from "./layouts/TabletLayout";
import PhoneLayout from "./layouts/PhoneLayout";
import AboutApp from "../apps/AboutApp";
import SkillsApp from "../apps/SkillsApp";
import ProjectsApp from "../apps/ProjectsApp";
import ContactApp from "../apps/ContactApp";
import ExperienceApp from "../apps/ExperienceApp";
import EducationApp from "../apps/EducationApp";

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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
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

  const openWindow = (id) => {
    if (openWindows.find((w) => w.id === id)) {
      focusWindow(id);
      return;
    }

    const app = apps[id];
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
    <div className="fixed inset-0 w-screen h-screen overflow-hidden font-mono text-slate-900 selection:bg-black selection:text-white">
      {deviceType === "desktop" && <DesktopLayout {...layoutProps} />}
      {deviceType === "tablet" && <TabletLayout {...layoutProps} />}
      {deviceType === "phone" && <PhoneLayout {...layoutProps} />}
    </div>
  );
}
