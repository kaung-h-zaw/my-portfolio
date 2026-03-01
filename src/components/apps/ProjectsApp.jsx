import React from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  FolderOpen,
  Image as ImageIcon,
  Lock,
} from "lucide-react";
import { PROJECTS_DATA } from "../../data/content";

export default function ProjectsApp() {
  const allProjects = [...PROJECTS_DATA];

  return (
    <div className="font-mono text-black min-h-full flex flex-col p-3 sm:p-4 md:p-6 overflow-y-auto overflow-x-hidden">
      {/* ── HEADER ── */}
      <div className="flex flex-col gap-3 sm:gap-4 mb-5 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="p-1.5 bg-black/5 rounded-md">
            <FolderOpen
              size={14}
              strokeWidth={2}
              className="text-black/70 sm:w-4 sm:h-4"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest text-black/60">
              › projects.dir
            </p>
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black uppercase tracking-tight leading-none text-black/90 mt-0.5 sm:mt-1">
              Project Archive
            </h1>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 mb-5 sm:mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 sm:gap-5 md:gap-6 flex-1 w-full items-start pb-4">
        {allProjects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: idx * 0.1,
              duration: 0.5,
              ease: "easeOut",
            }}
            className={`flex flex-col h-full p-3.5 sm:p-4 md:p-5 rounded-lg border border-black/10 transition-colors group
              ${
                project.isLocked
                  ? "bg-black/[0.02] border-dashed opacity-70"
                  : "bg-black/5 hover:border-black/30 hover:bg-black/10"
              }
            `}
          >
            {/* Project Image Banner - Smaller on mobile */}
            <div className="w-full aspect-video sm:aspect-video rounded border border-black/10 overflow-hidden bg-black/5 relative mb-3 sm:mb-4 shrink-0">
              {project.image ? (
                <picture>
                  {/* Modern browsers will use WebP */}
                  <source
                    srcSet={project.image.replace(".png", ".webp")}
                    type="image/webp"
                  />
                  {/* Fallback for older browsers */}
                  <img
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    loading="lazy"
                    className="w-full h-full object-contain p-1.5 sm:p-2 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500 grayscale"
                  />
                </picture>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-black/30">
                  {project.isLocked ? (
                    <Lock
                      size={24}
                      strokeWidth={1.5}
                      className="text-black/20 sm:w-7 sm:h-7"
                    />
                  ) : (
                    <ImageIcon
                      size={28}
                      strokeWidth={1.5}
                      className="sm:w-8 sm:h-8"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Project Details */}
            <div className="flex flex-col flex-1">
              {/* Title & Date Row */}
              <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                <h3 className="text-sm sm:text-base md:text-lg font-black uppercase tracking-tight text-black/90 truncate">
                  {project.title}
                </h3>
                <span
                  className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border shrink-0 mt-0.5
                  ${
                    project.isLocked
                      ? "bg-black/10 text-black border-black/10"
                      : "bg-black/5 text-black/50 border-black/5"
                  }
                `}
                >
                  {project.date}
                </span>
              </div>

              {/* Description */}
              <p className="text-[11px] sm:text-xs leading-relaxed text-black/70 mb-4 sm:mb-5 line-clamp-3">
                {project.desc}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 mt-auto mb-4 sm:mb-6">
                {project.tags.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[8px] sm:text-[9px] font-bold uppercase px-1.5 py-0.5 bg-black/5 text-black/60 rounded border border-black/5 group-hover:border-black/20 group-hover:text-black/80 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-auto shrink-0">
                {project.isLocked ? (
                  <div className="flex-1 py-2 sm:py-2.5 bg-black/5 border border-black/10 text-black/40 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded text-center cursor-not-allowed">
                    AWAITING DEPLOYMENT
                  </div>
                ) : (
                  <>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex justify-center items-center py-2 sm:py-2.5 bg-black text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded hover:bg-black/80 transition-colors"
                    >
                      <ExternalLink
                        size={12}
                        className="mr-1.5"
                        strokeWidth={2.5}
                      />{" "}
                      Demo
                    </a>
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex justify-center items-center py-2 sm:py-2.5 bg-transparent border border-black/20 text-black/80 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded hover:bg-black/5 hover:border-black/50 hover:text-black transition-colors"
                    >
                      <Github size={12} className="mr-1.5" strokeWidth={2.5} />{" "}
                      Code
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="border-t border-black/10 pt-3 sm:pt-4 mt-auto text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest text-black/40 flex justify-between items-center">
        <span>projects.dir</span>
        <span>{allProjects.length} projects · EOF</span>
      </div>
    </div>
  );
}
