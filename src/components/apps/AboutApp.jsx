import React from "react";
import { ArrowUpRight, Terminal, Hash, Download } from "lucide-react";

export default function AboutApp({ theme }) {
  // Theme logic
  const isDark = theme === "dark";

  // Dynamic classes based on theme
  const bgBase = isDark
    ? "bg-zinc-950 text-cyan-400"
    : "bg-slate-100 text-slate-800";
  const borderBase = isDark ? "border-cyan-900/30" : "border-slate-300";
  const textMuted = isDark ? "text-cyan-700" : "text-slate-500";
  const textHeading = isDark ? "text-cyan-400" : "text-slate-900";
  const cardBg = isDark
    ? "bg-zinc-900/50 border-cyan-900/50"
    : "bg-white border-slate-200";

  return (
    <div
      className={`h-full w-full ${bgBase} font-mono overflow-y-auto custom-scrollbar p-8 md:p-12 flex flex-col selection:bg-cyan-500 selection:text-black transition-colors duration-300`}
    >
      {/* 1. HEADER SECTION */}
      <div
        className={`flex flex-col-reverse md:flex-row items-start justify-between gap-8 mb-12 border-b pb-8 ${borderBase}`}
      >
        {/* Left: Name & Title */}
        <div className="flex flex-col justify-end h-full">
          <div
            className={`flex items-center gap-2 mb-2 font-bold text-xs uppercase tracking-wider ${textMuted}`}
          >
            <Terminal size={14} />
            <span>Developer Profile</span>
          </div>

          <h1
            className={`text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 ${textHeading}`}
          >
            Kaung Htet Zaw
          </h1>

          <p
            className={`text-sm font-bold uppercase tracking-widest mb-6 ${textMuted}`}
          >
            Full-Stack Developer • Bangkok
          </p>

          <div
            className={`text-sm md:text-base font-medium max-w-lg leading-relaxed ${isDark ? "text-cyan-600" : "text-slate-700"}`}
          >
            Engineering clarity from chaos. I build pixel-perfect,
            high-performance web applications with a focus on clean
            architecture.
          </div>
        </div>

        {/* Right: Photo */}
        <div className="relative shrink-0 group">
          <div
            className={`w-28 h-28 md:w-36 md:h-36 rounded-full border-2 overflow-hidden shadow-sm transition-colors ${isDark ? "border-cyan-600 bg-zinc-900" : "border-slate-300 bg-white group-hover:border-slate-500"}`}
          >
            <img
              src="/me-nb.png"
              alt="Profile"
              className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML = `
                  <div class="w-full h-full flex flex-col items-center justify-center ${isDark ? "bg-zinc-900 text-cyan-800" : "bg-slate-50 text-slate-300"}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"></circle><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path></svg>
                  </div>
                `;
              }}
            />
          </div>
          {/* Status Dot */}
          <div
            className={`absolute bottom-1 right-1 md:bottom-2 md:right-2 w-4 h-4 border-2 rounded-full ${isDark ? "bg-cyan-500 border-zinc-950" : "bg-emerald-500 border-white"}`}
          ></div>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Col: Narrative */}
        <div className="md:col-span-7 space-y-10">
          <section>
            <h2
              className={`text-xs font-black uppercase mb-4 flex items-center gap-2 ${textMuted}`}
            >
              <Hash size={12} /> Introduction
            </h2>
            <p
              className={`text-sm leading-loose text-justify font-medium ${isDark ? "text-cyan-600" : "text-slate-600"}`}
            >
              I don't just write code; I architect systems. My work sits at the
              intersection of rigorous logic and bold aesthetics. Whether it's
              optimizing a React render cycle or designing a CLI-inspired
              interface, I bring intensity and focus to every layer of the
              stack.
            </p>
          </section>

          <section>
            <h2
              className={`text-xs font-black uppercase mb-4 flex items-center gap-2 ${textMuted}`}
            >
              <Hash size={12} /> Focus
            </h2>
            <p
              className={`text-sm leading-loose text-justify font-medium ${isDark ? "text-cyan-600" : "text-slate-600"}`}
            >
              Currently scaling high-performance React applications and
              exploring the edges of neo-brutalist web design. I value speed,
              simplicity, and type safety above all else.
            </p>
          </section>
        </div>

        {/* Right Col: Lists */}
        <div className="md:col-span-5 flex flex-col gap-10">
          {/* Stack List */}
          <div
            className={`p-6 shadow-sm rounded-sm relative overflow-hidden border ${cardBg}`}
          >
            {isDark ? (
              <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-900/20 rounded-bl-full -z-0"></div>
            ) : (
              <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-full -z-0"></div>
            )}

            <div
              className={`border-b pb-2 mb-4 flex justify-between items-end relative z-10 ${isDark ? "border-cyan-900/50" : "border-slate-100"}`}
            >
              <span className={`text-xs font-black uppercase ${textHeading}`}>
                Core Stack
              </span>
              <span className={`text-[10px] font-bold ${textMuted}`}>01</span>
            </div>
            <div
              className={`grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-bold uppercase relative z-10 ${isDark ? "text-cyan-600" : "text-slate-500"}`}
            >
              <span
                className={`transition-colors cursor-default ${isDark ? "hover:text-cyan-400" : "hover:text-slate-900"}`}
              >
                React / Next.js
              </span>
              <span
                className={`transition-colors cursor-default ${isDark ? "hover:text-cyan-400" : "hover:text-slate-900"}`}
              >
                TypeScript
              </span>
              <span
                className={`transition-colors cursor-default ${isDark ? "hover:text-cyan-400" : "hover:text-slate-900"}`}
              >
                Node.js
              </span>
              <span
                className={`transition-colors cursor-default ${isDark ? "hover:text-cyan-400" : "hover:text-slate-900"}`}
              >
                PostgreSQL
              </span>
              <span
                className={`transition-colors cursor-default ${isDark ? "hover:text-cyan-400" : "hover:text-slate-900"}`}
              >
                Tailwind
              </span>
              <span
                className={`transition-colors cursor-default ${isDark ? "hover:text-cyan-400" : "hover:text-slate-900"}`}
              >
                Java / JavaFX
              </span>
            </div>
          </div>

          {/* Resume Download */}
          <a
            href="/resume.pdf"
            target="_blank"
            className={`p-4 shadow-sm rounded-sm flex items-center justify-between group transition-all cursor-pointer border
              ${
                isDark
                  ? "bg-zinc-900 border-cyan-900/50 hover:border-cyan-500 hover:bg-zinc-800"
                  : "bg-slate-200 border-slate-300 hover:bg-slate-300"
              }`}
          >
            <div className="flex flex-col">
              <span
                className={`text-xs font-black uppercase mb-1 ${isDark ? "text-cyan-400" : "text-slate-800"}`}
              >
                Download Resume
              </span>
              <span className={`text-[10px] font-bold uppercase ${textMuted}`}>
                PDF • 1.2 MB
              </span>
            </div>
            <div
              className={`p-2 rounded-sm transition-colors ${isDark ? "bg-cyan-950 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black" : "bg-white text-slate-800 group-hover:bg-slate-800 group-hover:text-white"}`}
            >
              <Download size={16} />
            </div>
          </a>

          {/* Connect List */}
          <div>
            <div
              className={`border-b pb-1 mb-3 flex justify-between items-end ${borderBase}`}
            >
              <span className={`text-xs font-black uppercase ${textHeading}`}>
                Connect
              </span>
              <span className={`text-[10px] font-bold ${textMuted}`}>02</span>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/kaung-h-zaw"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-between group px-3 py-2 -mx-3 rounded transition-colors cursor-pointer 
                  ${isDark ? "hover:bg-cyan-900/20 text-cyan-600 hover:text-cyan-400" : "hover:bg-slate-200 text-slate-600 hover:text-black"}`}
              >
                <span className="text-xs font-bold uppercase">GitHub</span>
                <ArrowUpRight
                  size={14}
                  className={`${isDark ? "text-cyan-800 group-hover:text-cyan-400" : "text-slate-400 group-hover:text-black"}`}
                />
              </a>

              <a
                href="https://linkedin.com/in/kaung-h-zaw"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-between group px-3 py-2 -mx-3 rounded transition-colors cursor-pointer 
                  ${isDark ? "hover:bg-cyan-900/20 text-cyan-600 hover:text-cyan-400" : "hover:bg-slate-200 text-slate-600 hover:text-black"}`}
              >
                <span className="text-xs font-bold uppercase">LinkedIn</span>
                <ArrowUpRight
                  size={14}
                  className={`${isDark ? "text-cyan-800 group-hover:text-cyan-400" : "text-slate-400 group-hover:text-black"}`}
                />
              </a>

              <a
                href="mailto:kaunghtetzaw.inbox@gmail.com"
                className={`flex items-center justify-between group px-3 py-2 -mx-3 rounded transition-colors cursor-pointer 
                   ${isDark ? "hover:bg-cyan-900/20 text-cyan-600 hover:text-cyan-400" : "hover:bg-slate-200 text-slate-600 hover:text-black"}`}
              >
                <span className="text-xs font-bold uppercase">Email</span>
                <ArrowUpRight
                  size={14}
                  className={`${isDark ? "text-cyan-800 group-hover:text-cyan-400" : "text-slate-400 group-hover:text-black"}`}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FOOTER */}
      <div
        className={`mt-auto pt-16 flex justify-between items-end text-[10px] uppercase font-bold border-t mt-8 pt-4 ${isDark ? "border-cyan-900/30 text-cyan-800" : "border-slate-200 text-slate-400"}`}
      >
        <span>© 2026 Kaung Htet Zaw</span>
        <span>Bangkok, TH</span>
      </div>
    </div>
  );
}
