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
    : "bg-slate-200 text-slate-600";
  const tableHeaderBg = isDark
    ? "bg-zinc-900/50 text-cyan-700"
    : "bg-slate-50 text-slate-700";
  const rowHover = isDark
    ? "hover:bg-cyan-900/10 border-cyan-900/20"
    : "hover:bg-white border-slate-200";

  const textMuted = isDark ? "text-cyan-700" : "text-slate-500";
  const textMeta = isDark ? "text-cyan-500" : "text-slate-700";
  const textPrimary = isDark ? "text-cyan-300" : "text-slate-900";
  const textBody = isDark ? "text-cyan-600" : "text-slate-700";

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
      className={`h-full w-full ${bgMain} font-mono text-sm md:text-[14px] overflow-y-auto custom-scrollbar flex flex-col transition-colors duration-300`}
    >
      {/* 1. STATUS BAR */}
      <div
        className={`${statusBarBg} ${borderBase} border-b p-2.5 px-5 flex justify-between items-center shrink-0 select-none sticky top-0 z-20`}
      >
        <div className="flex gap-5 font-bold uppercase tracking-wider text-xs md:text-sm">
          <span className="flex items-center gap-2">
            <Server size={16} />{" "}
            <span className="hidden sm:inline">sys_logs</span>
          </span>
          <span className="flex items-center gap-2">
            <Database size={16} />{" "}
            <span className="hidden sm:inline">connection: stable</span>
          </span>
        </div>
        <div className={`text-xs md:text-sm ${textMuted}`}>
          /var/log/experience.log
        </div>
      </div>

      {/* 2. TABLE HEADER (Desktop) */}
      <div
        className={`hidden md:grid md:grid-cols-[170px_190px_1fr] lg:grid-cols-[190px_230px_1fr] gap-6 p-4 border-b font-bold uppercase tracking-wider shrink-0 text-xs md:text-sm ${tableHeaderBg} ${borderBase}`}
      >
        <div>Timestamp</div>
        <div>Process / Source</div>
        <div>Message payload</div>
      </div>

      {/* 3. LOG ENTRIES */}
      <div className="flex-1 p-3 md:p-0">
        {logs.map((log) => (
          <div
            key={log.id}
            className={`flex flex-col md:border-b mb-5 md:mb-0 rounded-sm md:rounded-none border md:border-0 p-4 md:p-0 transition-colors group ${isDark ? "bg-zinc-900/30 md:bg-transparent border-cyan-900/30" : "bg-white md:bg-transparent border-slate-200"} ${rowHover}`}
          >
            {/* MAIN ROW GRID  */}
            <div className="flex flex-col md:grid md:grid-cols-[170px_190px_1fr] lg:grid-cols-[190px_230px_1fr] gap-5 md:gap-8 md:p-6 items-baseline">
              {/* COL 1: TIMESTAMP */}
              <div className="w-full flex justify-between md:contents">
                <div
                  className={`font-bold text-xs md:text-sm ${textMeta} flex flex-row md:flex-col gap-2 md:gap-1.5 items-center md:items-start`}
                >
                  <span className="whitespace-normal md:whitespace-nowrap leading-tight">
                    {log.timestamp}
                  </span>

                  <span
                    className={`px-2 py-0.5 rounded-sm text-[10px] border md:hidden ${log.status === "ACTIVE" ? (isDark ? "bg-cyan-900 text-cyan-400 border-cyan-700" : "bg-emerald-100 text-emerald-700 border-emerald-200") : isDark ? "bg-zinc-800 text-cyan-700 border-cyan-900" : "bg-slate-100 text-slate-600 border-slate-200"}`}
                  >
                    {log.status}
                  </span>
                  <div
                    className={`hidden md:block mt-1.5 text-[10px] opacity-70 ${textMuted}`}
                  >
                    ID: {log.id}
                  </div>
                </div>
              </div>

              {/* COL 2: TYPE / SOURCE / LOCATION */}
              <div className="hidden md:block col-span-1 min-w-0">
                <div
                  className={`inline-block px-2 py-0.5 rounded-sm text-[10px] font-bold border mb-1.5 
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
                {/* Title adjusted to text-base (readable but not huge) */}
                <div
                  className={`font-bold uppercase truncate text-base ${textPrimary}`}
                  title={log.type}
                >
                  {log.type}
                </div>

                <div
                  className={`text-xs md:text-sm font-semibold uppercase truncate ${textMeta} mt-1`}
                  title={log.source}
                >
                  @ {log.source}
                </div>

                <div
                  className={`text-xs md:text-sm font-medium truncate ${textMeta} flex items-center gap-1.5 mt-1.5`}
                  title={log.location}
                >
                  <MapPin size={13} />
                  {log.location}
                </div>
              </div>

              {/* COL 3: DETAILS & MESSAGE */}
              <div className="col-span-2 md:col-span-1 pl-0 md:pl-0 w-full min-w-0">
                {/* Mobile Header */}
                <div className="md:hidden mb-3 pb-3 border-b border-dashed border-opacity-30 border-current">
                  <div
                    className={`font-bold uppercase text-base ${textPrimary}`}
                  >
                    {log.type}
                  </div>
                  <div
                    className={`text-xs md:text-sm font-semibold uppercase ${textMeta} mt-1`}
                  >
                    @ {log.source}
                  </div>
                  <div
                    className={`text-xs md:text-sm font-medium ${textMeta} flex items-center gap-1 mt-1`}
                  >
                    <MapPin size={13} />
                    {log.location}
                  </div>
                </div>

                {/* Main Message - Adjusted to text-lg (Clear hierarchy) */}
                <div
                  className={`font-bold mb-4 text-lg leading-snug ${textPrimary}`}
                >
                  <span
                    className={`${textMuted} mr-2 hidden md:inline opacity-60`}
                  >
                    {">"}
                  </span>
                  {log.message}
                </div>

                {/* Detailed Lines - Adjusted to text-[15px] (Sweet spot) */}
                <div className="space-y-2.5 mb-5">
                  {log.details.map((line, i) => (
                    <div
                      key={i}
                      className={`flex gap-3 leading-relaxed text-[15px] ${textBody}`}
                    >
                      <span
                        className={`${isDark ? "text-cyan-800" : "text-slate-400"} select-none flex-shrink-0 mt-0.5`}
                      >
                        |
                      </span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2.5 mt-auto">
                  {log.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-1 border text-[10px] md:text-xs font-bold uppercase rounded-sm flex items-center gap-1.5 ${tagBg}`}
                    >
                      <Cpu size={13} /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
