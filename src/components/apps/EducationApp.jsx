import React from "react";
import { GraduationCap, Award, BookOpen, ExternalLink } from "lucide-react";

export default function EducationApp({ theme }) {
  // Theme Logic
  const isDark = theme === "dark";

  // Colors
  const bgMain = isDark
    ? "bg-zinc-950 text-cyan-400"
    : "bg-slate-100 text-slate-800";
  const bgPanel = isDark ? "bg-zinc-900" : "bg-slate-50";
  const borderColor = isDark ? "border-cyan-900/50" : "border-slate-300";
  const textMuted = isDark ? "text-cyan-700" : "text-slate-500";
  const textPrimary = isDark ? "text-cyan-300" : "text-slate-900";
  const cardBg = isDark
    ? "bg-black border-cyan-900/50 hover:border-cyan-500"
    : "bg-white border-slate-200 hover:border-slate-300";
  const dotColor = isDark
    ? "bg-zinc-950 border-cyan-600 group-hover:bg-cyan-600"
    : "bg-white border-slate-400 group-hover:bg-slate-600";
  const gpaTag = isDark
    ? "bg-black border-cyan-900 text-cyan-500"
    : "bg-white border-slate-300 text-slate-700";

  const education = [
    {
      degree: "Bachelor of IT (Computer Science)",
      school: "Queensland University of Technology",
      location: "Brisbane, Australia",
      date: "Jul 2023 - Dec 2024",
      desc: "Specialized in Software Engineering and Data Structures. Completed capstone project with The Guinea Group.",
      gpa: "GPA: 5.5/7.0",
    },
    {
      degree: "Higher National Diploma (Computing)",
      school: "GUSTO College",
      location: "Yangon, Myanmar",
      date: "Nov 2019 - Feb 2023",
      desc: "Focus on System Analysis, Networking, and Web Development. Graduated with Distinction.",
      gpa: "Distinction",
    },
  ];

  const certs = [
    {
      name: "Meta Front-End Developer Professional Certificate",
      issuer: "Coursera",
      date: "Oct 2024",
      link: "https://coursera.org/verify/professional-cert/NQPRLMXDWBTB",
    },
    {
      name: "English for Academic Purposes (Advanced)",
      issuer: "QUT College",
      date: "Jun 2023",
      link: null,
    },
  ];

  return (
    <div
      className={`h-full w-full ${bgMain} font-mono overflow-y-auto custom-scrollbar flex flex-col md:flex-row transition-colors duration-300`}
    >
      {/* 1. LEFT / TOP PANEL: Academic History */}
      <div
        className={`flex-1 p-4 md:p-8 border-b md:border-b-0 md:border-r ${borderColor}`}
      >
        <div
          className={`flex items-center gap-3 mb-6 md:mb-8 border-b pb-4 ${borderColor}`}
        >
          <GraduationCap
            size={28}
            className={isDark ? "text-cyan-600" : "text-slate-700"}
            strokeWidth={1.5}
          />
          <h2
            className={`text-xl md:text-3xl font-black uppercase tracking-tighter ${textPrimary}`}
          >
            Academic_Records
          </h2>
        </div>

        {/* Timeline */}
        <div
          className={`space-y-10 md:space-y-12 relative pl-6 md:pl-8 border-l border-dashed ml-2 md:ml-2 ${borderColor}`}
        >
          {education.map((edu, i) => (
            <div key={i} className="relative group">
              {/* Timeline Dot */}
              <div
                className={`absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 md:w-5 md:h-5 border-2 transition-colors rounded-full ${dotColor}`}
              />

              <div
                className={`mb-2 text-[10px] md:text-xs font-bold uppercase tracking-widest ${textMuted}`}
              >
                {edu.date}
              </div>

              <h3
                className={`text-base md:text-xl font-bold uppercase mt-1 leading-tight ${textPrimary}`}
              >
                {edu.degree}
              </h3>

              <div
                className={`text-xs md:text-sm font-bold mb-3 uppercase mt-1 ${textMuted}`}
              >
                {edu.school} • {edu.location}
              </div>

              <p
                className={`text-sm leading-relaxed mb-4 max-w-xl ${isDark ? "text-cyan-600" : "text-slate-600"}`}
              >
                {edu.desc}
              </p>

              {/* Tag */}
              <div
                className={`inline-block border px-3 py-1 text-[10px] md:text-xs font-bold uppercase shadow-sm rounded-sm ${gpaTag}`}
              >
                {edu.gpa}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. RIGHT / BOTTOM PANEL: Certifications */}
      <div
        className={`w-full md:w-80 p-6 md:p-8 border-t md:border-t-0 md:border-l-0 flex flex-col gap-6 md:h-full md:overflow-y-auto shrink-0 ${bgPanel} ${borderColor}`}
      >
        {/* Certificates Header */}
        <div
          className={`flex items-center gap-2 mb-2 ${isDark ? "text-cyan-600" : "text-slate-700"}`}
        >
          <Award size={20} />
          <h3 className="text-lg md:text-xl font-black uppercase">
            Certificates
          </h3>
        </div>

        <div className="space-y-4">
          {certs.map((cert, i) => (
            <div
              key={i}
              className={`border p-4 transition-all rounded-sm ${cardBg}`}
            >
              <h4
                className={`font-bold text-xs md:text-sm uppercase mb-2 leading-snug ${textPrimary}`}
              >
                {cert.name}
              </h4>
              <div
                className={`text-[10px] md:text-xs uppercase flex justify-between items-center border-t pt-2 ${textMuted} ${isDark ? "border-cyan-900/30" : "border-slate-100"}`}
              >
                <span>{cert.issuer}</span>
                <span>{cert.date}</span>
              </div>

              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-3 flex items-center gap-1 text-[10px] font-bold uppercase transition-colors ${isDark ? "text-cyan-600 hover:text-cyan-400" : "text-slate-600 hover:text-blue-600"}`}
                >
                  Verify Credential <ExternalLink size={10} />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Language Skills */}
        <div
          className={`mt-6 md:mt-auto pt-6 border-t ${isDark ? "border-cyan-900/30" : "border-slate-200"}`}
        >
          <div
            className={`flex items-center gap-2 mb-4 ${isDark ? "text-cyan-600" : "text-slate-700"}`}
          >
            <BookOpen size={18} />
            <h3 className="text-base md:text-lg font-black uppercase">
              Languages
            </h3>
          </div>
          <div
            className={`space-y-3 text-xs md:text-sm font-bold uppercase ${isDark ? "text-cyan-500" : "text-slate-600"}`}
          >
            <div
              className={`flex justify-between border-b pb-1 ${isDark ? "border-cyan-900/30" : "border-slate-200"}`}
            >
              <span>Burmese</span>
              <span className={textMuted}>Native</span>
            </div>
            <div
              className={`flex justify-between border-b pb-1 ${isDark ? "border-cyan-900/30" : "border-slate-200"}`}
            >
              <span>English</span>
              <span className={textMuted}>Upper Int. (B2)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
