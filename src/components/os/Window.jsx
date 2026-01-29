import React from "react";
import { X, Minus, Square, Terminal } from "lucide-react";
import AboutApp from "../apps/AboutApp";
import SkillsApp from "../apps/SkillsApp";
import ProjectsApp from "../apps/ProjectsApp";
import ContactApp from "../apps/ContactApp";

const APP_COMPONENTS = {
  about: AboutApp,
  skills: SkillsApp,
  projects: ProjectsApp,
  contact: ContactApp,
};

const WINDOW_TITLES = {
  about: "C:\\USER\\KAUNG\\ABOUT.TXT",
  skills: "C:\\KAUNG-SPACE\\SKILLS.EXE",
  projects: "C:\\USER\\PROJECTS\\",
  contact: "MAIL_CLIENT_V1.0",
};

export default function Window({ id, isActive, onClose, onFocus }) {
  const ContentComponent = APP_COMPONENTS[id];
  const title = WINDOW_TITLES[id] || "UNKNOWN.EXE";

  return (
    <div
      className={`
        absolute top-10 left-4 md:left-[20%] w-[90%] md:w-[800px] h-[70%] md:h-[600px] bg-white border-2 border-black flex flex-col shadow-[12px_12px_0_0_black]
        ${isActive ? "z-50" : "z-10"}
      `}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`
        h-10 border-b-2 border-black flex justify-between items-center px-2 select-none
        ${isActive ? "bg-black text-white" : "bg-white text-black"}
      `}
      >
        <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
          <Terminal size={14} />
          <span>{title}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="w-6 h-6 border border-current flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          >
            <Minus size={12} />
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 border border-current flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          >
            <Square size={10} />
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 border border-current flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-white custom-scrollbar">
        {ContentComponent && <ContentComponent />}
      </div>
    </div>
  );
}
