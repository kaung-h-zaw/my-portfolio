import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, FolderOpen } from "lucide-react";
import { PROJECTS_DATA } from "../../data/content";

export default function ProjectsApp() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="font-mono text-black min-h-full flex flex-col gap-5 p-3 sm:p-4 xl:p-6">
      <header className="flex items-center gap-3 border-b border-black/10 pb-4">
        <FolderOpen size={22} aria-hidden="true" />
        <div>
          <p className="text-xs uppercase tracking-widest text-black/70">› projects.dir</p>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight">Project Archive</h1>
        </div>
      </header>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5 items-start">
        {PROJECTS_DATA.map((project, index) => (
          <motion.article
            key={project.title}
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0 : index * 0.06, duration: reducedMotion ? 0 : 0.25 }}
            aria-labelledby={`project-${index}`}
            className="flex flex-col h-full p-4 rounded-lg border border-black/15 bg-white/20 hover:border-black/30 transition-colors"
          >
            {project.image && (
              <img src={project.image} alt={`${project.title} project screenshot`}
                loading="lazy" width="640" height="360"
                className="w-full aspect-video object-contain p-2 rounded border border-black/10 bg-black/5 mb-4" />
            )}
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <h2 id={`project-${index}`} className="text-lg font-black uppercase tracking-tight">{project.title}</h2>
              <span className="text-xs text-black/70 rounded border border-black/10 px-2 py-1">{project.date}</span>
            </div>
            <p className="font-sans text-base leading-relaxed text-black/80 mb-4">{project.desc}</p>
            {project.features?.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-black/70 mb-2">Main features</h3>
                <ul className="list-disc pl-5 space-y-1 font-sans text-sm leading-relaxed text-black/80">
                  {project.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
              </div>
            )}
            {project.contribution && (
              <div className="mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-black/70 mb-2">My contribution</h3>
                <p className="font-sans text-sm leading-relaxed text-black/80">{project.contribution}</p>
              </div>
            )}
            <ul aria-label={`${project.title} technologies`} className="flex flex-wrap gap-2 mt-auto mb-5">
              {project.tags.map((tech) => (
                <li key={tech} className="text-xs px-2 py-1 rounded border border-black/10 bg-black/5 text-black/80">{tech}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer"
                aria-label={`View ${project.title} live demo (opens in a new tab)`}
                className="flex flex-1 items-center justify-center gap-2 min-h-11 px-3 py-3 rounded bg-black text-white text-xs font-bold hover:bg-black/80">
                <ExternalLink size={15} aria-hidden="true" /> Live Demo
              </a>}
              {project.code && <a href={project.code} target="_blank" rel="noopener noreferrer"
                aria-label={`View ${project.title} GitHub repository (opens in a new tab)`}
                className="flex flex-1 items-center justify-center gap-2 min-h-11 px-3 py-3 rounded border border-black/25 text-black/90 text-xs font-bold hover:bg-black/5">
                <Github size={15} aria-hidden="true" /> GitHub
              </a>}
            </div>
          </motion.article>
        ))}
      </div>
      <footer className="border-t border-black/10 pt-4 mt-auto text-xs uppercase tracking-widest text-black/70 flex flex-wrap justify-between gap-2">
        <span>projects.dir</span><span>{PROJECTS_DATA.length} projects · EOF</span>
      </footer>
    </div>
  );
}
