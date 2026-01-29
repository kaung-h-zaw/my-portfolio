import React from "react";
import { Folder, ExternalLink, Github, Image as ImageIcon } from "lucide-react";

export default function ProjectsApp() {
  const projects = [
    {
      name: "Sendo",
      description:
        "Lightweight file handoff via QR pairing. Optimized for Kobo/Kindle.",
      image: "./Sendo.png", // Use higher res image
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
    <div className="flex flex-col h-full font-mono bg-white text-black">
      {/* TOOLBAR */}
      <div className="flex items-center gap-4 p-2 border-b-2 border-black bg-gray-50 shrink-0 select-none">
        <div className="flex gap-2">
          <button className="p-1 hover:bg-black hover:text-white border border-transparent hover:border-black transition-colors">
            <Folder size={18} />
          </button>
        </div>
        <div className="text-xs md:text-sm font-bold uppercase tracking-widest flex-1 truncate">
          C:\USER\KAUNG\PROJECTS\
        </div>
        <div className="hidden md:flex gap-4 text-[10px] font-bold uppercase mr-2">
          <span>Size</span>
          <span>Date Modified</span>
        </div>
      </div>

      {/* HEADER ROW (Desktop Only) */}
      <div className="hidden md:grid grid-cols-[180px_1.5fr_2fr_1fr] gap-6 px-4 py-2 border-b border-black text-xs font-bold uppercase bg-gray-100 select-none">
        <span>Preview</span>
        <span>Project Name</span>
        <span>Description</span>
        <span className="text-right">Links</span>
      </div>

      {/* PROJECT LIST */}
      <div className="flex-1 overflow-y-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group flex flex-col md:grid md:grid-cols-[180px_1.5fr_2fr_1fr] gap-6 p-4 border-b border-gray-200 hover:bg-black hover:text-white transition-colors cursor-default items-center"
          >
            {/* 1. IMAGE THUMBNAIL (Larger on Desktop) */}
            <div className="w-full aspect-video md:w-44 md:h-28 border-2 border-black bg-gray-200 overflow-hidden shrink-0 group-hover:border-white shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] group-hover:shadow-none transition-all relative">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={32} />
                </div>
              )}
            </div>

            {/* 2. NAME & TECH */}
            <div className="flex flex-col justify-center w-full">
              <div className="font-black uppercase text-lg md:text-2xl mb-3 md:mb-2">
                {project.name}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-bold border border-black px-2 py-1 group-hover:border-white group-hover:bg-white group-hover:text-black"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. DESCRIPTION */}
            <div className="text-sm leading-relaxed flex items-center w-full md:pr-4">
              {project.description}
            </div>

            {/* 4. LINKS */}
            <div className="flex items-center justify-start md:justify-end gap-3 mt-4 md:mt-0 w-full">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold uppercase hover:underline border-2 border-transparent px-3 py-2 group-hover:border-white hover:bg-white hover:text-black transition-all"
              >
                <ExternalLink size={14} /> Live
              </a>
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold uppercase hover:underline border-2 border-transparent px-3 py-2 group-hover:border-white hover:bg-white hover:text-black transition-all"
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
