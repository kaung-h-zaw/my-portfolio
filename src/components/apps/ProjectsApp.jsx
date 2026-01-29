import React from "react";
import { Folder, ExternalLink, Github, Image as ImageIcon } from "lucide-react";

export default function ProjectsApp({ theme }) {
  // Theme logic
  const isDark = theme === "dark";

  // Colors
  const bgMain = isDark
    ? "bg-zinc-950 text-cyan-400"
    : "bg-slate-100 text-slate-800";
  const bgHeader = isDark
    ? "bg-zinc-900 border-cyan-900/50"
    : "bg-slate-50 border-slate-300";
  const bgRowHeader = isDark
    ? "bg-zinc-900 text-cyan-700 border-cyan-900/50"
    : "bg-slate-200 text-slate-500 border-slate-300";
  const rowItem = isDark
    ? "bg-zinc-950 border-cyan-900/30 hover:bg-cyan-900/10"
    : "bg-white border-slate-200 hover:bg-slate-50";
  const textTitle = isDark ? "text-cyan-300" : "text-slate-800";
  const textDesc = isDark ? "text-cyan-600" : "text-slate-600";
  const imgBorder = isDark
    ? "border-cyan-900/50 bg-black"
    : "border-slate-300 bg-slate-100";
  const tagStyle = isDark
    ? "border-cyan-900/50 bg-black text-cyan-600"
    : "border-slate-200 bg-slate-50 text-slate-500";
  const btnStyle = isDark
    ? "border-cyan-900/50 bg-zinc-900 hover:bg-cyan-900/30 hover:border-cyan-500 text-cyan-500 hover:text-cyan-300"
    : "border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 text-slate-600 hover:text-blue-600";

  const projects = [
    {
      name: "Sendo",
      description:
        "Lightweight file handoff via QR pairing. Optimized for Kobo/Kindle.",
      image: "./Sendo.png",
      tech: ["Next.js", "WebRTC"],
      live: "https://sendo.vercel.app",
      repo: "https://github.com/kaung-h-zaw/sendo",
    },
    {
      name: "Kaung-Space",
      description:
        "Personal portfolio built with React & Tailwind. OS-like interface.",
      image: "https://placehold.co/600x400/000000/FFF?text=PORTFOLIO",
      tech: ["React", "Vite"],
      live: "https://kaung-space.vercel.app",
      repo: "https://github.com/kaung-h-zaw/kaung-space",
    },
  ];

  return (
    <div
      className={`flex flex-col h-full font-mono transition-colors duration-300 ${bgMain}`}
    >
      {/* TOOLBAR */}
      <div
        className={`flex items-center gap-4 p-2 border-b shrink-0 select-none ${bgHeader}`}
      >
        <div className="flex gap-2">
          <button
            className={`p-1 border border-transparent transition-colors rounded-sm ${isDark ? "text-cyan-600 hover:bg-cyan-900/30 hover:text-cyan-400 hover:border-cyan-800" : "text-slate-500 hover:bg-slate-200 hover:text-slate-900 hover:border-slate-300"}`}
          >
            <Folder size={18} />
          </button>
        </div>
        <div
          className={`text-xs md:text-sm font-bold uppercase tracking-widest flex-1 truncate ${isDark ? "text-cyan-500" : "text-slate-600"}`}
        >
          C:\USER\KAUNG\PROJECTS\
        </div>
        <div
          className={`hidden md:flex gap-4 text-[10px] font-bold uppercase mr-2 ${isDark ? "text-cyan-800" : "text-slate-400"}`}
        >
          <span>Size</span>
          <span>Date Modified</span>
        </div>
      </div>

      {/* HEADER ROW (Desktop Only) */}
      <div
        className={`hidden md:grid grid-cols-[180px_1.5fr_2fr_1fr] gap-6 px-4 py-2 border-b text-xs font-bold uppercase select-none ${bgRowHeader}`}
      >
        <span>Preview</span>
        <span>Project Name</span>
        <span>Description</span>
        <span className="text-right">Links</span>
      </div>

      {/* PROJECT LIST */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`group flex flex-col md:grid md:grid-cols-[180px_1.5fr_2fr_1fr] gap-6 p-4 border-b transition-colors cursor-default items-center ${rowItem}`}
          >
            {/* 1. IMAGE THUMBNAIL */}
            <div
              className={`w-full aspect-video md:w-44 md:h-28 border overflow-hidden shrink-0 shadow-sm relative rounded-sm ${imgBorder}`}
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center ${isDark ? "text-cyan-900" : "text-slate-300"}`}
                >
                  <ImageIcon size={32} />
                </div>
              )}
            </div>

            {/* 2. NAME & TECH */}
            <div className="flex flex-col justify-center w-full">
              <div
                className={`font-black uppercase text-lg md:text-2xl mb-3 md:mb-2 ${textTitle}`}
              >
                {project.name}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className={`text-[10px] font-bold border px-2 py-1 rounded-sm ${tagStyle}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. DESCRIPTION */}
            <div
              className={`text-sm leading-relaxed flex items-center w-full md:pr-4 ${textDesc}`}
            >
              {project.description}
            </div>

            {/* 4. LINKS */}
            <div className="flex items-center justify-start md:justify-end gap-3 mt-4 md:mt-0 w-full">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-xs font-bold uppercase transition-all rounded-sm px-3 py-2 ${btnStyle}`}
              >
                <ExternalLink size={14} /> Live
              </a>
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-xs font-bold uppercase transition-all rounded-sm px-3 py-2 ${btnStyle}`}
              >
                <Github size={14} /> Code
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
