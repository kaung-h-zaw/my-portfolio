import React from "react";
import {
  GraduationCap,
  Award,
  BookOpen,
  ExternalLink,
  Hash,
} from "lucide-react";

export default function EducationApp({ theme }) {
  const isDark = theme === "dark";

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
  const skillTag = isDark
    ? "bg-black border-cyan-900 text-cyan-500"
    : "bg-white border-slate-300 text-slate-600";

  const education = [
    {
      degree: "Bachelor of IT (Computer Science)",
      school: "Queensland University of Technology",
      location: "Brisbane, Australia",
      date: "Jul 2023 - Dec 2024",
      desc: "Specialized in Software Engineering and Data Structures. Completed intensive Capstone project delivering a real-world enterprise solution.",
      skills: [
        "Mobile App Development",
        "Data Structures",
        "Full-Stack Dev",
        "Agile",
      ],
    },
    {
      degree: "Higher National Diploma (Computing)",
      school: "GUSTO College",
      location: "Yangon, Myanmar",
      date: "Nov 2019 - Feb 2023",
      desc: "Focus on System Analysis, Networking, and Web Development. Graduated with Distinction.",
      skills: [
        "System Analysis",
        "Web Development",
        "Networking",
        "Database Design",
      ],
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
      className={`h-full w-full ${bgMain} font-mono overflow-y-auto custom-scrollbar flex flex-col md:flex-row transition-colors duration-300 text-sm md:text-base`}
    >
      <div
        className={`flex-1 p-6 md:p-10 border-b md:border-b-0 md:border-r ${borderColor}`}
      >
        <div
          className={`flex items-center gap-4 mb-10 border-b pb-5 ${borderColor}`}
        >
          <GraduationCap
            size={32}
            className={isDark ? "text-cyan-600" : "text-slate-700"}
            strokeWidth={1.5}
          />
          <h2
            className={`text-2xl md:text-3xl font-black uppercase tracking-tighter ${textPrimary}`}
          >
            Academic_Records
          </h2>
        </div>

        {/* Timeline Container */}
        <div
          className={`relative pl-8 md:pl-12 ml-2 border-l border-dashed ${borderColor} space-y-14`}
        >
          {education.map((edu, i) => (
            <div key={i} className="relative group">
              <div
                className={`absolute -left-[41px] md:-left-[59px] top-1.5 w-4 h-4 md:w-5 md:h-5 border-2 rounded-full transition-colors z-10 ${dotColor}`}
              />

              {/* INCREASED FONT SIZE: Date */}
              <div
                className={`mb-2 text-xs md:text-sm font-bold uppercase tracking-widest ${textMuted}`}
              >
                {edu.date}
              </div>

              {/* INCREASED FONT SIZE: Degree */}
              <h3
                className={`text-lg md:text-2xl font-bold uppercase mt-1 leading-tight ${textPrimary}`}
              >
                {edu.degree}
              </h3>

              {/* INCREASED FONT SIZE: School/Loc */}
              <div
                className={`text-sm md:text-base font-bold mb-4 uppercase mt-2 ${textMuted}`}
              >
                {edu.school} • {edu.location}
              </div>

              {/* INCREASED FONT SIZE: Description */}
              <p
                className={`text-sm md:text-[15px] leading-relaxed mb-5 max-w-2xl ${isDark ? "text-cyan-600" : "text-slate-600"}`}
              >
                {edu.desc}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2.5">
                {edu.skills.map((skill, index) => (
                  <div
                    key={index}
                    className={`inline-flex items-center gap-1.5 border px-2.5 py-1.5 text-[10px] md:text-xs font-bold uppercase shadow-sm rounded-sm ${skillTag}`}
                  >
                    <Hash size={10} className="opacity-50" /> {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`w-full md:w-80 p-5 md:p-6 border-t md:border-t-0 md:border-l-0 flex flex-col gap-6 md:h-full shrink-0 ${bgPanel} ${borderColor}`}
      >
        {/* Certificates Header */}
        <div
          className={`flex items-center gap-2 mb-1 ${isDark ? "text-cyan-600" : "text-slate-700"}`}
        >
          <Award size={20} />
          <h3 className="text-sm md:text-base font-black uppercase">
            Certificates
          </h3>
        </div>

        <div className="space-y-4 flex-1">
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
                className={`text-[10px] md:text-xs uppercase flex justify-between items-center border-t pt-3 ${textMuted} ${isDark ? "border-cyan-900/30" : "border-slate-100"}`}
              >
                <span>{cert.issuer}</span>
                <span>{cert.date}</span>
              </div>

              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-3 flex items-center gap-1 text-[10px] md:text-xs font-bold uppercase transition-colors ${isDark ? "text-cyan-600 hover:text-cyan-400" : "text-slate-600 hover:text-blue-600"}`}
                >
                  Verify <ExternalLink size={10} />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Language Skills */}
        <div
          className={`mt-auto pt-6 border-t ${isDark ? "border-cyan-900/30" : "border-slate-200"}`}
        >
          <div
            className={`flex items-center gap-2 mb-4 ${isDark ? "text-cyan-600" : "text-slate-700"}`}
          >
            <BookOpen size={18} />
            <h3 className="text-sm md:text-base font-black uppercase">
              Languages
            </h3>
          </div>
          <div
            className={`space-y-3 text-xs md:text-sm font-bold uppercase ${isDark ? "text-cyan-500" : "text-slate-600"}`}
          >
            <div
              className={`flex justify-between border-b pb-2 ${isDark ? "border-cyan-900/30" : "border-slate-200"}`}
            >
              <span>Burmese</span>
              <span className={textMuted}>Native</span>
            </div>
            <div
              className={`flex justify-between border-b pb-2 ${isDark ? "border-cyan-900/30" : "border-slate-200"}`}
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
