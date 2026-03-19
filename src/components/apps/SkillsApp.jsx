import React from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu } from "lucide-react";
import { SKILLS_DATA } from "../../data/content";

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
  SiGithub,
  SiJira,
} from "react-icons/si";

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
  GitHub: SiGithub,
  Agile: SiJira,
};

const SYMBOL_MAP = {
  JavaScript: "JS",
  Tailwind: "TW",
  MongoDB: "MD",
  Firebase: "FB",
  Agile: "AG",
  GitHub: "GH",
  Git: "G",
};

export default function SkillsApp() {
  const categories = Object.keys(SKILLS_DATA);

  return (
    <div className="font-mono text-black min-h-full flex flex-col p-3 md:p-4 lg:p-4 xl:p-6 overflow-y-auto overflow-x-hidden">
      {/* HEADER */}
      <div className="flex flex-col gap-4 mb-5 md:mb-6 lg:mb-6 xl:mb-8 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-black/5 rounded-md">
            <Cpu size={18} strokeWidth={2} className="text-black/80" />
          </div>

          <div className="flex flex-col">
            <p className="text-[10px] md:text-[11px] lg:text-[11px] xl:text-xs uppercase tracking-widest text-black/50 font-bold">
              › skills.exe --view=table
            </p>
            <h1 className="text-lg md:text-xl lg:text-xl xl:text-2xl font-black uppercase tracking-tight leading-none text-black/90 mt-1">
              Tech_Stack
            </h1>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 mb-5 md:mb-6 lg:mb-6 xl:mb-8 shrink-0" />

      {/* SKILLS */}
      <div className="flex-1 overflow-x-hidden pb-4">
        <div className="flex flex-col gap-5 md:gap-6 lg:gap-6 xl:gap-10">
          {categories.map((category, catIdx) => (
            <div
              key={category}
              className="flex items-stretch gap-2 md:gap-3 lg:gap-3 xl:gap-4 w-full"
            >
              {/* Category */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: catIdx * 0.2,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="w-8 md:w-9 lg:w-9 xl:w-10 flex flex-col items-center justify-center py-3 md:py-4 lg:py-4 bg-black/5 border border-black/10 rounded-lg shrink-0"
              >
                <span
                  className="text-[9px] md:text-[10px] lg:text-[10px] xl:text-xs font-black uppercase tracking-widest text-black/40 rotate-180"
                  style={{ writingMode: "vertical-rl" }}
                >
                  {category}
                </span>
              </motion.div>

              {/* Elements Grid */}
              <div className="flex flex-wrap gap-2 md:gap-2.5 lg:gap-2.5 xl:gap-3 flex-1">
                {SKILLS_DATA[category]?.map((skill, idx) => {
                  const IconComponent = ICON_MAP[skill.name] || Terminal;
                  const atomicWeight = (skill.name.length * 3.14).toFixed(2);
                  const symbol =
                    SYMBOL_MAP[skill.name] ||
                    skill.name
                      .substring(0, skill.name.length > 5 ? 2 : 1)
                      .toUpperCase();
                  const globalIndex =
                    categories
                      .slice(0, catIdx)
                      .reduce((sum, cat) => sum + SKILLS_DATA[cat].length, 0) +
                    idx;

                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: globalIndex * 0.05,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                      className="w-[78px] h-[94px] md:w-[92px] md:h-[106px] lg:w-[82px] lg:h-[98px] xl:w-24 xl:h-28 shrink-0 flex flex-col justify-between p-2 md:p-2 lg:p-2 xl:p-2.5 bg-black/[0.02] border border-black/10 rounded-md hover:border-black/30 hover:bg-black/5 hover:shadow-sm transition-all duration-300 group cursor-default relative overflow-hidden"
                    >
                      {/* Top Row */}
                      <div className="flex justify-between w-full text-[7px] md:text-[8px] lg:text-[7px] xl:text-[8px] font-mono text-black/40 group-hover:text-black/60 transition-colors z-10">
                        <span>
                          {catIdx + 1}
                          {idx + 1}
                        </span>
                        <span className="hidden sm:block">{atomicWeight}</span>
                      </div>

                      {/* FRONT FACE */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-100 group-hover:opacity-0 group-hover:scale-90 transition-all duration-300 pointer-events-none">
                        <IconComponent className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-black/50" />
                        <span className="text-xl md:text-2xl lg:text-xl xl:text-2xl font-black leading-none text-black/80">
                          {symbol}
                        </span>
                      </div>

                      {/* BACK FACE */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 md:gap-2 opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-110 transition-all duration-300 pointer-events-none px-1">
                        <span className="text-[9px] md:text-[10px] lg:text-[10px] xl:text-xs font-black uppercase text-black/90 text-center leading-tight">
                          {skill.name}
                        </span>
                        <span className="text-[8px] md:text-[9px] lg:text-[8px] xl:text-[9px] font-mono font-bold text-black/60 bg-black/5 px-1.5 py-0.5 rounded border border-black/10">
                          {skill.size}
                        </span>
                      </div>

                      {/* Bottom Row */}
                      <div className="text-center text-[7px] md:text-[8px] lg:text-[8px] xl:text-[10px] font-bold uppercase tracking-tight truncate w-full text-black/50 group-hover:opacity-0 transition-opacity duration-300 z-10 mt-auto">
                        {skill.name}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t border-black/10 pt-4 mt-6 md:mt-8 lg:mt-8 xl:mt-12 text-[10px] md:text-[11px] lg:text-[11px] xl:text-xs uppercase tracking-widest text-black/40 flex justify-between items-center shrink-0">
        <span>skills.exe</span>
        <span>EOF</span>
      </div>
    </div>
  );
}
