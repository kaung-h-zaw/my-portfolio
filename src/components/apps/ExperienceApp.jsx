import React from "react";
import { Activity, Server, Database, Code, Cpu, MapPin } from "lucide-react";

export default function ExperienceApp({ theme }) {
  const isDark = theme === "dark";

  const bgMain = isDark
    ? "bg-zinc-950 text-cyan-400"
    : "bg-slate-100 text-slate-800";
  const borderBase = isDark ? "border-cyan-900/30" : "border-slate-300";
  const statusBarBg = isDark
    ? "bg-zinc-900 text-cyan-600"
    : "bg-slate-200 text-slate-600"; // Made text darker here too
  const tableHeaderBg = isDark
    ? "bg-zinc-900/50 text-cyan-700"
    : "bg-slate-50 text-slate-700"; // Darker header text
  const rowHover = isDark
    ? "hover:bg-cyan-900/10 border-cyan-900/20"
    : "hover:bg-white border-slate-200";

  // CHANGED: textMuted is now darker/more visible
  const textMuted = isDark ? "text-cyan-700" : "text-slate-500";

  // NEW: Specifically for important metadata like Time/Location to make them pop
  const textMeta = isDark ? "text-cyan-500" : "text-slate-700";

  const textPrimary = isDark ? "text-cyan-300" : "text-slate-900";
  const textBody = isDark ? "text-cyan-600" : "text-slate-700"; // Darkened body text
  const tagBg = isDark
    ? "bg-black border-cyan-900 text-cyan-600"
    : "bg-slate-50 border-slate-200 text-slate-600";

  const logs = [
    {
      id: "LOG_001",
      timestamp: "02/2024 – 06/2024",
      type: "CAPSTONE_PROJECT",
      source: "The Guinea Group & QUT",
      status: "COMPLETED",
      location: "Brisbane, AU",
      message:
        "Engineered responsive survey platform for 'Leadership Under Pressure'.",
      details: [
        "Deployed scalable AWS infrastructure for high-traffic survey access.",
        "Implemented React/Tailwind design system for rapid UI development.",
        "Resolved 20% of data errors via rigorous Postman API debugging.",
        "Streamlined CI/CD and version control using GitHub and Slack integrations.",
      ],
      tags: ["AWS", "React", "Node", "Postman", "Tailwind"],
    },
    {
      id: "LOG_002",
      timestamp: "12/2024 - PRESENT",
      type: "FRONTEND_DEV",
      source: "Freelance",
      status: "ACTIVE",
      location: "Remote",
      message: "Delivering pixel-perfect web solutions for diverse clients.",
      details: [
        "Translated Figma prototypes into responsive, pixel-perfect React components.",
        "Optimized landing page performance ensuring cross-browser compatibility.",
        "Integrated complex animations using Framer Motion and ES6+ JavaScript.",
      ],
      tags: ["React", "Figma", "Tailwind", "Framer"],
    },
  ];

  return (
    <div
      className={`h-full w-full ${bgMain} font-mono text-xs md:text-sm overflow-y-auto custom-scrollbar flex flex-col transition-colors duration-300`}
    >
      {/* 1. STATUS BAR */}
      <div
        className={`${statusBarBg} ${borderBase} border-b p-2 px-4 flex justify-between items-center shrink-0 select-none sticky top-0 z-20`}
      >
        <div className="flex gap-4 font-bold uppercase tracking-wider text-[10px] md:text-xs">
          <span className="flex items-center gap-2">
            <Server size={14} />{" "}
            <span className="hidden sm:inline">sys_logs</span>
          </span>
          <span className="flex items-center gap-2">
            <Database size={14} />{" "}
            <span className="hidden sm:inline">connection: stable</span>
          </span>
        </div>
        <div className={textMuted}>/var/log/experience.log</div>
      </div>

      {/* 2. TABLE HEADER (Desktop) */}
      <div
        className={`hidden md:grid md:grid-cols-[140px_160px_1fr] lg:grid-cols-[160px_200px_1fr] gap-4 p-3 border-b font-bold uppercase tracking-wider shrink-0 ${tableHeaderBg} ${borderBase}`}
      >
        <div>Timestamp</div>
        <div>Process / Source</div>
        <div>Message payload</div>
      </div>

      {/* 3. LOG ENTRIES */}
      <div className="flex-1 p-2 md:p-0">
        {logs.map((log) => (
          <div
            key={log.id}
            className={`flex flex-col md:border-b mb-4 md:mb-0 rounded-sm md:rounded-none border md:border-0 p-3 md:p-0 transition-colors group ${isDark ? "bg-zinc-900/30 md:bg-transparent border-cyan-900/30" : "bg-white md:bg-transparent border-slate-200"} ${rowHover}`}
          >
            {/* MAIN ROW GRID  */}
            <div className="flex flex-col md:grid md:grid-cols-[140px_160px_1fr] lg:grid-cols-[160px_200px_1fr] gap-3 md:gap-4 md:p-4 items-baseline">
              {/* COL 1: TIMESTAMP */}
              <div className="w-full flex justify-between md:contents">
                <div
                  className={`font-bold text-[10px] md:text-xs ${textMeta} flex flex-row md:flex-col gap-2 md:gap-0 items-center md:items-start`}
                >
                  {/* Timestamp Display - Using textMeta for visibility */}
                  <span className="whitespace-normal md:whitespace-nowrap leading-tight">
                    {log.timestamp}
                  </span>

                  <span
                    className={`px-1.5 rounded-sm text-[9px] border md:hidden ${log.status === "ACTIVE" ? (isDark ? "bg-cyan-900 text-cyan-400 border-cyan-700" : "bg-emerald-100 text-emerald-700 border-emerald-200") : isDark ? "bg-zinc-800 text-cyan-700 border-cyan-900" : "bg-slate-100 text-slate-600 border-slate-200"}`}
                  >
                    {log.status}
                  </span>
                  <div
                    className={`hidden md:block mt-1 ${isDark ? "text-cyan-800" : "text-slate-400"}`}
                  >
                    {log.id}
                  </div>
                </div>
              </div>

              {/* COL 2: TYPE / SOURCE / LOCATION */}
              <div className="hidden md:block col-span-1 min-w-0">
                <div
                  className={`inline-block px-1.5 py-0.5 rounded-sm text-[10px] font-bold border mb-1 
                    ${
                      log.status === "ACTIVE"
                        ? isDark
                          ? "bg-cyan-900/30 text-cyan-400 border-cyan-800"
                          : "bg-emerald-100 text-emerald-700 border-emerald-200"
                        : isDark
                          ? "bg-zinc-900 text-cyan-700 border-cyan-900"
                          : "bg-slate-200 text-slate-700 border-slate-300"
                    }`}
                >
                  {log.status}
                </div>
                <div
                  className={`font-bold uppercase truncate ${textPrimary}`}
                  title={log.type}
                >
                  {log.type}
                </div>
                {/* Source/Company - Using textMeta for visibility */}
                <div
                  className={`text-[11px] font-semibold uppercase truncate ${textMeta} mt-0.5`}
                  title={log.source}
                >
                  @ {log.source}
                </div>
                {/* Location - Using textMeta for visibility */}
                <div
                  className={`text-[10px] font-medium truncate ${textMeta} flex items-center gap-1 mt-1`}
                  title={log.location}
                >
                  <MapPin size={10} />
                  {log.location}
                </div>
              </div>

              {/* COL 3: DETAILS & MESSAGE */}
              <div className="col-span-2 md:col-span-1 pl-0 md:pl-0 w-full min-w-0">
                {/* Mobile Header */}
                <div className="md:hidden mb-2 pb-2 border-b border-dashed border-opacity-30 border-current">
                  <div className={`font-bold uppercase text-xs ${textPrimary}`}>
                    {log.type}
                  </div>
                  <div
                    className={`text-[11px] font-semibold uppercase ${textMeta}`}
                  >
                    @ {log.source}
                  </div>
                  <div
                    className={`text-[10px] font-medium ${textMeta} flex items-center gap-1 mt-0.5`}
                  >
                    <MapPin size={10} />
                    {log.location}
                  </div>
                </div>

                {/* Main Message */}
                <div
                  className={`font-bold mb-3 text-sm leading-snug ${textPrimary}`}
                >
                  <span className={`${textMuted} mr-2 hidden md:inline`}>
                    {">"}
                  </span>
                  {log.message}
                </div>

                {/* Detailed Lines */}
                <div className="space-y-2 mb-4">
                  {log.details.map((line, i) => (
                    <div
                      key={i}
                      className={`flex gap-2 leading-relaxed text-xs md:text-sm ${textBody}`}
                    >
                      <span
                        className={`${isDark ? "text-cyan-800" : "text-slate-400"} select-none flex-shrink-0`}
                      >
                        |
                      </span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {log.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 border text-[10px] font-bold uppercase rounded-sm flex items-center gap-1 ${tagBg}`}
                    >
                      <Cpu size={10} /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* TERMINAL CURSOR ROW */}
        <div className={`p-4 flex gap-2 animate-pulse ${textMuted}`}>
          <span>_</span>
        </div>
      </div>
    </div>
  );
}
