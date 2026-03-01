import React from "react";
import { MapPin, Calendar, Briefcase, ArrowRight } from "lucide-react";

export default function ExperienceApp() {
  const experiences = [
    {
      id: "EXP_001",
      role: "Capstone Developer",
      company: "The Guinea Group & QUT",
      location: "Brisbane, AU",
      period: "Feb 2024 - Jun 2024",
      status: "completed",
      description:
        "Engineered responsive survey platform for 'Leadership Under Pressure' research initiative with scalable AWS infrastructure.",
      highlights: [
        "Deployed scalable AWS infrastructure for high-traffic survey access",
        "Implemented React/Tailwind design system for rapid UI development",
        "Resolved 20% of data errors via rigorous Postman API debugging",
        "Streamlined CI/CD and version control using GitHub and Slack integrations",
      ],
      stack: ["AWS", "React", "Node.js", "Postman", "Tailwind"],
    },
    {
      id: "EXP_002",
      role: "Frontend Developer",
      company: "Freelance",
      location: "Remote",
      period: "Dec 2024 - Present",
      status: "active",
      description:
        "Delivering pixel-perfect web solutions for diverse clients, translating designs into production-ready React applications.",
      highlights: [
        "Translated Figma prototypes into responsive, pixel-perfect React components",
        "Optimized landing page performance ensuring cross-browser compatibility",
        "Integrated complex animations using Framer Motion and ES6+ JavaScript",
      ],
      stack: ["React", "Figma", "Tailwind CSS", "Framer Motion"],
    },
  ];

  return (
    <div className="font-mono text-black min-h-full flex flex-col gap-6 p-4 md:p-6 overflow-y-auto overflow-x-hidden">
      {/* HEADER */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-black/5 rounded-md">
            <Briefcase size={16} strokeWidth={2} className="text-black/70" />
          </div>
          <div className="flex flex-col">
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-black/60">
              › experience.sys
            </p>
            <h1 className="text-lg md:text-xl font-black uppercase tracking-tight leading-none text-black/90 mt-1">
              Work History
            </h1>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10" />

      {/* EXPERIENCE DOSSIER */}
      <div className="flex flex-col gap-8 md:gap-12 flex-1">
        {experiences.map((exp, idx) => (
          <div key={exp.id} className="group relative">
            <div className="flex flex-wrap gap-6 md:gap-8">
              {/* LEFT*/}
              <div className="flex flex-col gap-3 flex-[1_1_250px] shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] md:text-xs font-bold font-mono text-black/40">
                    [{exp.id}]
                  </span>
                  {/* Status Badge */}
                  <span
                    className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded ${
                      exp.status === "active"
                        ? "bg-black text-white"
                        : "bg-black/10 text-black/50"
                    }`}
                  >
                    {exp.status}
                  </span>
                </div>

                <div>
                  <h2 className="text-base md:text-xl font-black uppercase tracking-tight leading-tight text-black/90">
                    {exp.role}
                  </h2>
                  <p className="text-xs md:text-sm text-black/60 font-bold uppercase tracking-widest mt-1">
                    @ {exp.company}
                  </p>
                </div>

                {/* Location & Time */}
                <div className="flex flex-col gap-1.5 mt-2 pt-3 border-t border-black/10">
                  <div className="flex items-center gap-2 text-[10px] md:text-xs text-black/60 font-medium">
                    <Calendar size={13} strokeWidth={2} />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] md:text-xs text-black/60 font-medium">
                    <MapPin size={13} strokeWidth={2} />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col gap-4 flex-[2_1_400px]">
                <p className="text-sm md:text-base leading-relaxed text-black/80 font-medium bg-black/5 p-3.5 rounded-lg border border-black/10">
                  {exp.description}
                </p>

                <div className="flex flex-col gap-2">
                  <p className="text-[10px] md:text-xs uppercase tracking-widest text-black/50 font-bold mb-1">
                    Key Contributions
                  </p>
                  <ul className="space-y-2.5">
                    {exp.highlights.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs md:text-sm text-black/70 leading-relaxed"
                      >
                        <ArrowRight
                          size={14}
                          strokeWidth={2}
                          className="mt-0.5 text-black/30 shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] md:text-xs font-bold uppercase tracking-wide px-2.5 py-1 bg-black/5 text-black/60 rounded border border-black/5 group-hover:bg-black/10 group-hover:text-black/80 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {idx < experiences.length - 1 && (
              <div className="border-t border-black/10 mt-8 md:mt-12" />
            )}
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="border-t border-black/10 pt-4 mt-auto text-[10px] md:text-xs uppercase tracking-widest text-black/40 flex justify-between items-center">
        <span>2024 - Present</span>
        <span>Remote · AU</span>
      </div>
    </div>
  );
}
