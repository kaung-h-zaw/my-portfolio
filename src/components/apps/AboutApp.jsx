import React, { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  FolderGit2,
  Download,
  Check,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";

const STACK = [
  "React",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "MongoDB",
];

export default function AboutApp({ onOpenApp }) {
  const [copied, setCopied] = useState(false);
  const email = "kaunghtetzaw.inbox@gmail.com";

  const copyTimer = useRef(null);
  const [copyError, setCopyError] = useState(false);
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
    <>
      <div className="font-mono text-black min-h-full flex flex-col gap-4 sm:gap-5 xl:gap-6 p-3 sm:p-4 lg:p-4 xl:p-6 overflow-y-auto overflow-x-hidden">
        {/* HEADER */}
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-4 lg:gap-5 xl:gap-6">
            <div className="shrink-0 relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 xl:w-28 xl:h-28 rounded-lg overflow-hidden border border-black/10 bg-white/30">
                <picture>
                  <source srcSet="/me-nb.webp" type="image/webp" />
                  <img
                    src="/me-nb.png"
                    alt="Kaung Htet Zaw Profile Photo"
                    loading="eager"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </picture>
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-gray-300/60" />
            </div>

            {/* Name & Role */}
            <div className="flex-1 min-w-0 flex flex-col justify-center h-full pt-1">
              <p className="text-xs lg:text-[13px] xl:text-sm uppercase tracking-widest text-black/60 mb-1 lg:mb-1.5 xl:mb-2">
                › profile.exe
              </p>
              <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-4xl font-black uppercase tracking-tight leading-none text-black/90">
                Kaung Htet Zaw
              </h1>
              <div className="mt-2 lg:mt-2.5 xl:mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="inline-block text-xs sm:text-sm lg:text-sm xl:text-base font-bold uppercase tracking-widest bg-black/80 text-white px-2.5 py-1 sm:px-3 lg:px-3 xl:px-4 lg:py-1.5 rounded-md">
                  Junior Full-Stack Developer
                </span>
              </div>
            </div>
          </div>

          {copyError && <p role="status" className="text-sm">Copy unavailable. Email: <a href={`mailto:${email}`} className="underline">{email}</a></p>}
          {/* Email */}
          <div className="flex items-center mt-1 -ml-1">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm md:text-base text-black/70 hover:text-black transition-colors group cursor-pointer"
              title="Click to copy email"
              aria-label={copied ? "Email copied" : "Copy email address"}
            >
              <div className="p-1.5 bg-black/5 rounded-md group-hover:bg-black/10 transition-colors shrink-0">
                {copied ? (
                  <Check
                    size={14}
                    strokeWidth={2.5}
                    className="text-green-600"
                  />
                ) : (
                  <Mail size={14} strokeWidth={1.5} />
                )}
              </div>
              <span className="font-normal tracking-wide border-b border-dashed border-black/30 group-hover:border-black/60 pb-0.5 transition-colors truncate">
                {email}
              </span>
              <span
                className={`text-xs uppercase tracking-widest px-2 py-0.5 rounded transition-all duration-300 shrink-0 ${
                  copied
                    ? "bg-green-100 text-green-700 opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2 hidden sm:inline-block"
                }`}
              >
                Copied!
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3">
          <p className="min-[400px]:col-span-2 font-sans text-sm leading-relaxed text-black/80">
            React · JavaScript · Tailwind CSS · Node.js · Express · MongoDB
          </p>
          <button type="button" onClick={() => onOpenApp?.("projects")}
            className="min-h-11 flex items-center justify-center gap-2 rounded bg-black px-5 py-3 text-sm font-bold text-white hover:bg-black/80">
            <FolderGit2 size={18} /> View Projects
          </button>
            {/* Resume */}
            <a href="/resume.pdf" download="Kaung-Htet-Zaw-CV.pdf"
              className="flex items-center justify-between gap-4 px-4 py-3 bg-black/5 border border-black/20 rounded hover:bg-black/10 transition-colors">
              <div>
                <div className="text-sm lg:text-[15px] xl:text-base font-bold uppercase tracking-wider text-black/90">
                  Download CV
                </div>
                <div className="text-xs text-black/65 mt-1 uppercase tracking-widest">
                  PDF résumé
                </div>
              </div>
              <Download
                size={18}
                strokeWidth={1.5}
                className="text-black/65 group-hover:text-black transition-colors"
              />
            </a>

            {/* Socials */}
            <div className="min-[400px]:col-span-2">
              <div className="flex flex-wrap gap-3">
                <a href="https://github.com/kaung-h-zaw" target="_blank" rel="noopener noreferrer"
                  className="flex flex-[1_1_120px] items-center gap-2 p-2 border border-black/10 rounded hover:border-black/30 hover:bg-black/5 transition-all group min-w-0"
                >
                  <div className="p-1.5 bg-black/5 rounded group-hover:bg-[#0077b5]/10 transition-colors shrink-0">
                    <Github
                      size={16}
                      strokeWidth={1.5}
                      className="text-black/80 group-hover:text-black"
                    />
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p className="text-sm font-medium whitespace-nowrap text-black/75 mb-0.5">
                      GitHub
                    </p>
                    <p className="hidden sm:block text-sm text-black/80 truncate font-medium">
                      @kaung-h-zaw
                    </p>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="hidden sm:block text-black/30 group-hover:text-black/70 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all shrink-0"
                  />
                </a>

                <a href="https://linkedin.com/in/kaung-h-zaw" target="_blank" rel="noopener noreferrer"
                  className="flex flex-[1_1_120px] items-center gap-2 p-2 border border-black/10 rounded hover:border-black/30 hover:bg-black/5 transition-all group min-w-0"
                >
                  <div className="p-1.5 bg-black/5 rounded group-hover:bg-[#0077b5]/10 transition-colors shrink-0">
                    <Linkedin
                      size={16}
                      strokeWidth={1.5}
                      className="text-black/80 group-hover:text-[#0077b5]"
                    />
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p className="text-sm font-medium whitespace-nowrap text-black/75 mb-0.5">
                      LinkedIn
                    </p>
                    <p className="hidden sm:block text-sm text-black/80 truncate font-medium">
                      @kaung-h-zaw
                    </p>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="hidden sm:block text-black/30 group-hover:text-black/70 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all shrink-0"
                  />
                </a>
              </div>
            </div>
        </div>
        <div className="border-t border-black/10" />

        {/* MAIN GRID */}
        <div className="flex flex-wrap gap-5 lg:gap-6 xl:gap-8 flex-1">
          {/* LEFT */}
          <div className="flex flex-col gap-5 lg:gap-6 xl:gap-8 min-w-0 flex-[1_1_280px] xl:flex-[1_1_350px]">
            {/* Bio text */}
            <div>
              <Label>Introduction</Label>
              <p className="font-sans text-base leading-relaxed text-black/80">
                Junior Full-Stack Developer with hands-on experience building
                responsive web apps in React, JavaScript, and Tailwind, with
                additional work in Express, databases, and full-stack project
                delivery through both capstone and personal projects.
              </p>
            </div>

            {/* Experience Section */}
            <div>
              <Label>Recent Experience</Label>
              <div className="space-y-4">
                <div className="group">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm lg:text-[15px] xl:text-base font-bold text-black/90">
                      Full-Stack Developer
                    </h3>
                    <span className="text-xs lg:text-[13px] xl:text-sm text-black/65 whitespace-nowrap mt-0.5">
                      2024
                    </span>
                  </div>
                  <p className="text-xs lg:text-[13px] xl:text-sm font-medium text-black/60 mb-2 uppercase tracking-wide">
                    QUT Capstone Project · Guinea Group
                  </p>
                  <p className="font-sans text-base leading-relaxed text-black/80">
                    Worked in a four-person capstone team to build a video and
                    survey platform for research, contributing across React and
                    Tailwind frontend work, plus Express and MySQL features for
                    data handling and reporting.
                  </p>
                </div>

                <div className="border-t border-black/5 pt-4 group">
                  <h3 className="text-sm lg:text-[15px] xl:text-base font-bold text-black/90 mb-2">
                    Current Focus
                  </h3>
                  <p className="font-sans text-base leading-relaxed text-black/80">
                    Building stronger full-stack projects, improving frontend
                    polish and UX quality, and getting more confident with
                    backend development, APIs, and real-world product workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-5 lg:gap-6 xl:gap-8 min-w-0 flex-[1_1_280px] xl:flex-[1_1_350px]">
            {/* Stack */}
            <div>
              <Label>Core Stack</Label>
              <div className="grid grid-cols-2 gap-y-2.5 md:gap-y-3 gap-x-3 md:gap-x-4">
                {STACK.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 lg:gap-2.5 xl:gap-3 text-sm lg:text-[15px] xl:text-base text-black/80"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-black/40 shrink-0" />
                    {tech}
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-black/10 pt-4 mt-auto flex justify-between items-center text-xs md:text-sm uppercase tracking-widest text-black/60">
          <span>© 2026 Kaung Htet Zaw</span>
          <span>v2.0</span>
        </div>
      </div>
    </>
  );
}

function Label({ children }) {
  return (
    <p className="text-sm md:text-base uppercase tracking-widest text-black/65 mb-3 md:mb-4 border-b border-black/10 pb-2">
      {children}
    </p>
  );
}
