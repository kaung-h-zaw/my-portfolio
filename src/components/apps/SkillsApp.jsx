import React, { useState } from "react";
import { Folder } from "lucide-react";
import { SKILLS_DATA } from "../../data/content";

// 1. IMPORT ICONS
import {
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiFigma,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiGit,
  SiJira,
} from "react-icons/si";

// 2. CREATE A MAP
const ICON_MAP = {
  React: SiReact,
  JavaScript: SiJavascript,
  Tailwind: SiTailwindcss,
  HTML5: SiHtml5,
  Figma: SiFigma,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  Firebase: SiFirebase,
  Git: SiGit,
  Agile: SiJira,
};

export default function SkillsApp({ theme }) {
  const [activeDir, setActiveDir] = useState("Frontend");

  // Theme logic
  const isDark = theme === "dark";

  // Colors
  const bgMain = isDark
    ? "bg-zinc-950 text-cyan-400"
    : "bg-slate-100 text-slate-800";
  const bgSidebar = isDark
    ? "bg-zinc-900 border-cyan-900/50"
    : "bg-slate-50 border-slate-300";
  const bgContent = isDark ? "bg-zinc-950" : "bg-slate-100";
  const activeItem = isDark
    ? "bg-cyan-900/30 text-cyan-300 border-cyan-700 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]"
    : "bg-slate-200 text-slate-900 border-slate-300 shadow-inner";
  const inactiveItem = isDark
    ? "text-cyan-700 hover:bg-cyan-900/10 hover:text-cyan-500"
    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900";
  const cardHover = isDark
    ? "hover:bg-cyan-900/10 hover:border-cyan-700"
    : "hover:bg-slate-200/50 hover:border-slate-300";
  const iconColor = isDark
    ? "text-cyan-600 group-hover:text-cyan-300"
    : "text-slate-700 group-hover:text-slate-900";
  const textColor = isDark
    ? "text-cyan-600 group-hover:text-cyan-300"
    : "text-slate-700 group-hover:text-slate-900";
  const textSub = isDark
    ? "text-cyan-800 group-hover:text-cyan-600"
    : "text-slate-400 group-hover:text-slate-500";

  return (
    <div
      className={`flex h-full flex-col md:flex-row font-mono transition-colors duration-300 ${bgMain}`}
    >
      {/* SIDEBAR */}
      <div
        className={`w-full md:w-48 border-b md:border-b-0 md:border-r p-4 flex flex-col gap-2 shrink-0 ${bgSidebar}`}
      >
        <div
          className={`text-xs font-bold mb-2 uppercase tracking-wider ${isDark ? "text-cyan-800" : "text-slate-400"}`}
        >
          Directories
        </div>
        {Object.keys(SKILLS_DATA).map((dir) => (
          <button
            key={dir}
            onClick={() => setActiveDir(dir)}
            className={`
               flex items-center gap-2 px-3 py-2 text-xs font-bold border transition-all w-full text-left uppercase rounded-sm
               ${activeDir === dir ? activeItem : `bg-transparent border-transparent ${inactiveItem}`}
             `}
          >
            <Folder
              size={16}
              className={
                activeDir === dir
                  ? isDark
                    ? "text-cyan-400"
                    : "text-slate-800"
                  : isDark
                    ? "text-cyan-800"
                    : "text-slate-400"
              }
            />
            {dir}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div
        className={`flex-1 p-8 overflow-y-auto custom-scrollbar ${bgContent}`}
      >
        <div
          className={`text-xs mb-8 uppercase tracking-widest font-bold ${isDark ? "text-cyan-800" : "text-slate-400"}`}
        >
          C:/KAUNG/SKILLS/{activeDir.toUpperCase()}/
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {SKILLS_DATA[activeDir]?.map((file) => {
            const IconComponent = ICON_MAP[file.name] || Folder;
            return (
              <div
                key={file.name}
                className={`flex flex-col items-center gap-3 group cursor-pointer p-4 border border-transparent border-dashed transition-all rounded-sm ${cardHover}`}
              >
                <div
                  className={`group-hover:scale-110 transition-all duration-200 ${iconColor}`}
                >
                  <IconComponent size={32} />
                </div>
                <div className="text-center">
                  <div className={`font-bold text-xs uppercase ${textColor}`}>
                    {file.name}
                  </div>
                  <div
                    className={`text-[10px] uppercase font-bold mt-1 ${textSub}`}
                  >
                    {file.size}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
