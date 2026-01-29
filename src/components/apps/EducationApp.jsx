import React from "react";
import { GraduationCap, Award, BookOpen, ExternalLink } from "lucide-react";

export default function EducationApp() {
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
    <div className="h-full w-full bg-white font-mono overflow-y-auto custom-scrollbar flex flex-col md:flex-row">
      {/* 1. LEFT / TOP PANEL: Academic History */}
      <div className="flex-1 p-4 md:p-8 border-b-2 md:border-b-0 md:border-r-2 border-black">
        <div className="flex items-center gap-3 mb-6 md:mb-8 border-b-4 border-black pb-2">
          <GraduationCap size={24} md:size={32} strokeWidth={2} />
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter">
            Academic_Records
          </h2>
        </div>

        <div className="space-y-8 md:space-y-10 relative pl-4 md:pl-6 border-l-2 border-black border-dashed ml-2 md:ml-0">
          {education.map((edu, i) => (
            <div key={i} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[25px] md:-left-[33px] top-1 w-4 h-4 md:w-5 md:h-5 bg-white border-4 border-black group-hover:bg-black transition-colors" />

              <div className="mb-1 text-[10px] md:text-xs font-bold uppercase tracking-widest bg-black text-white inline-block px-2 py-1">
                {edu.date}
              </div>

              <h3 className="text-base md:text-xl font-black uppercase mt-2 leading-tight">
                {edu.degree}
              </h3>

              <div className="text-xs md:text-sm font-bold text-gray-600 mb-2 md:mb-3 uppercase">
                {edu.school} • {edu.location}
              </div>

              <p className="text-xs md:text-sm leading-relaxed mb-3 text-gray-800">
                {edu.desc}
              </p>

              <div className="inline-block border-2 border-black px-2 py-1 text-[10px] md:text-xs font-bold uppercase shadow-[2px_2px_0_0_black]">
                {edu.gpa}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. RIGHT / BOTTOM PANEL: Certifications */}
      <div className="w-full md:w-80 bg-gray-50 p-6 md:p-6 border-t-2 md:border-t-0 md:border-l-0 border-black flex flex-col gap-6 md:h-full md:overflow-y-auto shrink-0">
        {/* Certificates Header */}
        <div className="flex items-center gap-2 mb-2">
          <Award size={20} />
          <h3 className="text-lg md:text-xl font-black uppercase">
            Certificates
          </h3>
        </div>

        <div className="space-y-4">
          {certs.map((cert, i) => (
            <div
              key={i}
              className="bg-white border-2 border-black p-4 hover:shadow-[4px_4px_0_0_black] transition-shadow"
            >
              <h4 className="font-bold text-xs md:text-sm uppercase mb-1 leading-snug">
                {cert.name}
              </h4>
              <div className="text-[10px] md:text-xs text-gray-500 uppercase flex justify-between items-center">
                <span>{cert.issuer}</span>
                <span>{cert.date}</span>
              </div>

              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-1 text-[10px] font-bold uppercase hover:underline"
                >
                  Verify Credential <ExternalLink size={10} />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Language Skills */}
        <div className="mt-6 md:mt-auto pt-6 border-t-2 border-black">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={18} />
            <h3 className="text-base md:text-lg font-black uppercase">
              Languages
            </h3>
          </div>
          <div className="space-y-2 text-xs md:text-sm font-bold uppercase">
            <div className="flex justify-between border-b border-gray-300 pb-1">
              <span>Burmese</span>
              <span>Native</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-1">
              <span>English</span>
              <span>Upper Intermediate (B2)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
