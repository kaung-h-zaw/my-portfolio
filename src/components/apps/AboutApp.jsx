import { ProfileIcon } from "../os/AppIcons";
import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, FolderGit2, FileText, Check, Mail, Github, Linkedin, Briefcase, Code2, Target } from "lucide-react";
import { AppHeader, AppFooter, PanelTitle, Tags } from "./AppLayout";

const STACK = ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB"];

export default function AboutApp({ onOpenApp }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyTimer = useRef(null);
  const email = "kaunghtetzaw.inbox@gmail.com";
  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setCopyError(false);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
    }
  };

  return (
    <div className="app-page app-about-page">
      <AppHeader icon={ProfileIcon} file="profile.exe" title="Kaung Htet Zaw" badge="Open to junior roles" />
      <div className="app-split app-about-grid">
        <div className="flex flex-col gap-3">
        <section className="app-panel">
          <div className="flex items-center gap-3 sm:gap-4 mb-5">
            <picture className="shrink-0">
              <source srcSet="/kaung-ink-avatar.webp" type="image/webp" />
              <img src="/kaung-ink-avatar.png" alt="Kaung Htet Zaw profile illustration" width="88" height="88"
                className="app-profile-image h-14 w-14 sm:h-24 sm:w-24 rounded-xl border border-white/10 bg-[#e9e8e4] object-contain" />
            </picture>
            <div>
              <p className="app-eyebrow mb-2 normal-case">Hello, I’m Kaung Htet Zaw, alias Kaung.</p>
              <h2 className="text-base sm:text-2xl font-bold leading-tight">Junior Full-Stack Developer</h2>
            </div>
          </div>
          <p className="app-body mb-5">
            Junior Full-Stack Developer with hands-on experience building responsive web apps in React,
            JavaScript, and Tailwind, with additional work in Express, databases, and full-stack project
            delivery through both capstone and personal projects.
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            <button type="button" onClick={() => onOpenApp?.("projects")} className="app-action">
              <FolderGit2 size={17} aria-hidden="true" /> View Projects
            </button>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="app-action-secondary">
              <FileText size={17} aria-hidden="true" /> View CV
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="https://github.com/kaung-h-zaw" target="_blank" rel="noopener noreferrer" className="app-action-secondary px-3 text-xs">
              <Github size={16} aria-hidden="true" /> GitHub
            </a>
            <a href="https://linkedin.com/in/kaung-h-zaw" target="_blank" rel="noopener noreferrer" className="app-action-secondary px-3 text-xs">
              <Linkedin size={16} aria-hidden="true" /> LinkedIn
            </a>
          </div>
        </section>
        <section className="app-panel">
          <PanelTitle icon={Briefcase}>Recent experience</PanelTitle>
          <div className="flex flex-wrap justify-between gap-2 mb-2">
            <h3 className="text-base font-bold">Full-Stack Developer</h3><span className="app-badge">2024</span>
          </div>
          <p className="text-xs uppercase tracking-wide text-zinc-300 mb-3">QUT Capstone Project · Guinea Group</p>
          <p className="app-body">Worked in a four-person capstone team to build a video and survey platform for research, contributing across React and Tailwind frontend work, plus Express and MySQL features for data handling and reporting.</p>
          <button type="button" onClick={() => onOpenApp?.("experience")} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium underline underline-offset-4">View experience <ArrowUpRight size={15} aria-hidden="true" /></button>
        </section>
        </div>
        <div className="flex flex-col gap-3">
          <section className="app-panel">
            <PanelTitle icon={Code2}>Core stack</PanelTitle>
            <Tags items={STACK} label="Core technologies" />
            <button type="button" onClick={() => onOpenApp?.("skills")} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium underline underline-offset-4">
              Explore all skills <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          </section>
          <section className="app-panel">
            <PanelTitle icon={Mail}>Let’s connect</PanelTitle>
            <a href={`mailto:${email}`} className="font-sans text-sm break-all underline underline-offset-4">{email}</a>
            <div className="flex flex-wrap gap-2 mt-4">
              <button type="button" onClick={handleCopy} aria-label={copied ? "Email copied" : "Copy email address"} className="app-action-secondary">
                {copied ? <Check size={15} aria-hidden="true" /> : <Mail size={15} aria-hidden="true" />}
                {copied ? "Copied" : "Copy email"}
              </button>
              <button type="button" onClick={() => onOpenApp?.("contact")} className="app-action-secondary">Contact</button>
            </div>
            <p role="status" className="font-sans text-sm text-zinc-300 mt-2">{copyError ? "Copy unavailable. You can use the email link above." : copied ? "Email address copied." : ""}</p>
          </section>
        <section className="app-panel">
          <PanelTitle icon={Target}>Current focus</PanelTitle>
          <p className="app-body">Building stronger full-stack projects, improving frontend polish and UX quality, and getting more confident with backend development, APIs, and real-world product workflows.</p>
        </section>
        </div>
      </div>
      <AppFooter file="profile.exe">© 2026 Kaung Htet Zaw</AppFooter>
    </div>
  );
}
