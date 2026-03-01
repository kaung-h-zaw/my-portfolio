import React from "react";
import { GraduationCap, Award, BookOpen, ExternalLink } from "lucide-react";

export default function EducationApp() {
  const education = [
    {
      degree: "Bachelor of IT (Computer Science)",
      school: "Queensland University of Technology",
      location: "Brisbane, Australia",
      period: "Jul 2023 - Dec 2024",
      description:
        "Specialized in Software Engineering and Data Structures. Completed intensive Capstone project delivering a real-world enterprise solution.",
      skills: ["Mobile App Dev", "Data Structures", "Full-Stack", "Agile"],
    },
    {
      degree: "Higher National Diploma (Computing)",
      school: "GUSTO College",
      location: "Yangon, Myanmar",
      period: "Nov 2019 - Feb 2023",
      description:
        "Focus on System Analysis, Networking, and Web Development. Graduated with Distinction.",
      skills: ["System Analysis", "Web Dev", "Networking", "Database Design"],
    },
  ];

  const certifications = [
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

  const languages = [
    { name: "Burmese", level: "Native" },
    { name: "English", level: "Upper Int. (B2)" },
  ];

  return (
    <div className="font-mono text-black min-h-full flex flex-col gap-6 p-4 md:p-6 overflow-y-auto overflow-x-hidden">
      {/* HEADER */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-black/5 rounded-md">
            <GraduationCap
              size={16}
              strokeWidth={2}
              className="text-black/70"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-black/60">
              › education.log
            </p>
            <h1 className="text-lg md:text-xl font-black uppercase tracking-tight leading-none text-black/90 mt-1">
              Academic History
            </h1>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10" />

      {/* MAIN GRID */}
      <div className="flex flex-wrap gap-6 md:gap-8 flex-1">
        {/* LEFT */}
        <div className="flex flex-col gap-8 flex-[2_1_400px]">
          {education.map((edu, idx) => (
            <div key={idx} className="relative pl-6 group">
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-black/40 border-2 border-white/50 group-hover:bg-black/80 transition-colors" />

              {/* Vertical line (not on last item) */}
              {idx < education.length - 1 && (
                <div className="absolute left-[4px] top-5 bottom-[-20px] w-[1px] border-l-2 border-dashed border-black/10" />
              )}

              {/* Content */}
              <div className="flex flex-col gap-2">
                {/* Period */}
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest px-2.5 py-1 bg-black/80 text-white rounded w-fit">
                  {edu.period}
                </span>

                {/* Degree */}
                <h3 className="text-base md:text-lg font-black uppercase tracking-tight leading-tight text-black/90 mt-1">
                  {edu.degree}
                </h3>

                {/* School & Location */}
                <p className="text-xs md:text-sm text-black/60 font-semibold uppercase tracking-wide">
                  {edu.school} <span className="text-black/30 mx-1">·</span>{" "}
                  {edu.location}
                </p>

                {/* Description */}
                <p className="text-sm md:text-base leading-relaxed text-black/80 mt-1.5">
                  {edu.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {edu.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] md:text-xs font-bold uppercase tracking-wide px-2 py-1 bg-black/5 text-black/70 rounded border border-black/5 hover:bg-black/10 hover:text-black/90 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6 md:gap-8 flex-[1_1_250px]">
          {/* Certifications */}
          <div>
            <Label icon={<Award size={14} strokeWidth={2} />}>
              Certifications
            </Label>

            <div className="flex flex-col gap-3">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-black/5 rounded border border-black/10 hover:border-black/30 hover:bg-black/10 transition-all group relative overflow-hidden"
                >
                  <h4 className="text-xs md:text-sm font-bold uppercase leading-snug mb-2 text-black/90 pr-6">
                    {cert.name}
                  </h4>

                  <div className="flex justify-between items-center text-[10px] md:text-xs font-medium uppercase tracking-widest text-black/60 border-t border-black/10 pt-2.5">
                    <span>{cert.issuer}</span>
                    <span>{cert.date}</span>
                  </div>

                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3.5 right-3.5 text-black/30 hover:text-black/80 transition-colors"
                      title="Verify Certificate"
                    >
                      <ExternalLink size={14} strokeWidth={2} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <Label icon={<BookOpen size={14} strokeWidth={2} />}>
              Languages
            </Label>

            <div className="flex flex-col gap-2.5">
              {languages.map((lang, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center px-3.5 py-3 bg-black/5 rounded border border-black/10 hover:border-black/30 hover:bg-black/10 transition-all"
                >
                  <span className="text-xs md:text-sm font-bold uppercase text-black/90">
                    {lang.name}
                  </span>
                  <span className="text-[10px] md:text-xs text-black/60 font-bold uppercase tracking-widest bg-white/50 px-2 py-0.5 rounded">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t border-black/10 pt-4 mt-auto text-[10px] md:text-xs uppercase tracking-widest text-black/40 flex justify-between items-center">
        <span>education.log</span>
        <span>EOF</span>
      </div>
    </div>
  );
}

function Label({ children, icon }) {
  return (
    <div className="flex items-center gap-2 mb-3 md:mb-4 border-b border-black/10 pb-2">
      {icon && <span className="text-black/60">{icon}</span>}
      <p className="text-xs md:text-sm uppercase tracking-widest text-black/50 font-medium">
        {children}
      </p>
    </div>
  );
}
