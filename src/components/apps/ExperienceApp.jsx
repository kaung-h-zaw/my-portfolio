import { ExperienceIcon } from "../os/AppIcons";
import React from "react";
import { MapPin, Calendar } from "lucide-react";
import { AppHeader, AppFooter, Tags } from "./AppLayout";

export default function ExperienceApp() {
  const experiences = [
    {
      id: "EXP_001",
      role: "Full Stack Developer",
      company: "The Guinea Group & QUT",
      location: "Brisbane, AU",
      period: "Feb 2024 - Nov 2024",
      status: "completed",
      description:
        "Delivered a two-semester capstone platform for pressure-based decision-making research, working in a four-person team across frontend development, backend features, and multimodal data workflows.",
      highlights: [
        "Built and refined core product flows in JavaScript, React, and Tailwind, including authentication, survey selection, embedded video playback, and response interfaces",
        "Contributed to Express and MySQL features for participant data, survey management, reporting, and export functionality",
        "Worked with Docker and Python-based services to support audio emotion analysis, camera-based emotion capture, and eye-tracking workflows",
        "Delivered the project using Agile planning, with weekly client discussions and fortnightly reviews with the QUT capstone supervisor",
        "Collaborated closely within a four-person team to complete the platform across the full two-semester delivery period",
      ],
      stack: ["JavaScript", "React", "Tailwind", "Express", "MySQL", "Python", "Docker", "AWS"],
    },
  ];

  return (
    <div className="app-page">
      <AppHeader icon={ExperienceIcon} file="experience.sys" title="Work History" badge={`${experiences.length} role`} />
      <p className="app-body max-w-2xl">Full-stack development through a two-semester QUT capstone project with The Guinea Group.</p>
      <div className="space-y-4 sm:space-y-5">
        {experiences.map((experience) => (
          <article key={experience.id} className="app-panel">
            <div className="app-experience-grid">
              <div className="app-tile self-start">
                <span className="app-badge inline-block mb-4">Completed · Capstone</span>
                <h2 className="text-lg font-bold leading-tight mb-2">{experience.role}</h2>
                <p className="font-sans text-base text-zinc-300 mb-4">{experience.company}</p>
                <div className="space-y-2 border-t border-white/10 pt-3 font-sans text-sm text-zinc-300">
                  <p className="flex items-start gap-2"><Calendar size={15} className="shrink-0 mt-0.5" aria-hidden="true" />{experience.period}</p>
                  <p className="flex items-start gap-2"><MapPin size={15} className="shrink-0 mt-0.5" aria-hidden="true" />{experience.location}</p>
                </div>
              </div>
              <div>
                <p className="app-body mb-5">{experience.description}</p>
                <h3 className="app-eyebrow font-bold mb-3">Key contributions</h3>
                <ul className="list-disc pl-5 space-y-2 font-sans text-base leading-relaxed text-zinc-200 mb-5">
                  {experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
                <Tags items={experience.stack} label={`${experience.company} technologies`} />
              </div>
            </div>
          </article>
        ))}
      </div>
      <AppFooter file="experience.sys">2024 · Brisbane, Australia</AppFooter>
    </div>
  );
}
