import React, { useState } from "react";
import { Folder } from "lucide-react";
import { SKILLS_DATA } from "../../data/content"; // Import your data

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

// 2. CREATE A MAP (Name string -> Component)
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

export default function SkillsApp() {
  const [activeDir, setActiveDir] = useState("Frontend");

  return (
    <div className="flex h-full flex-col md:flex-row font-mono text-black bg-white">
      {/* SIDEBAR */}
      <div className="w-full md:w-48 border-b-2 md:border-b-0 md:border-r-2 border-black bg-gray-50 p-4 flex flex-col gap-2">
        <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
          Directories
        </div>
        {Object.keys(SKILLS_DATA).map((dir) => (
          <button
            key={dir}
            onClick={() => setActiveDir(dir)}
            className={`
               flex items-center gap-2 px-3 py-2 text-xs font-bold border-2 transition-all w-full text-left uppercase
               ${activeDir === dir ? "bg-black text-white border-black" : "bg-white text-black border-transparent hover:border-black"}
             `}
          >
            <Folder size={16} /> {dir}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 bg-white overflow-y-auto custom-scrollbar">
        <div className="text-xs text-gray-400 mb-8 uppercase tracking-widest font-bold">
          C:/KAUNG/SKILLS/{activeDir.toUpperCase()}/
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {SKILLS_DATA[activeDir]?.map((file) => {
            const IconComponent = ICON_MAP[file.name] || Folder;
            return (
              <div
                key={file.name}
                className="flex flex-col items-center gap-3 group cursor-pointer hover:bg-gray-50 p-4 border border-transparent hover:border-black border-dashed transition-all"
              >
                <div className="text-black group-hover:scale-110 transition-transform duration-200">
                  <IconComponent size={32} />
                </div>
                <div className="text-center">
                  <div className="font-bold text-xs uppercase">{file.name}</div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold mt-1">
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
