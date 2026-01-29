import React from "react";
import { Calendar, MapPin, Briefcase, Terminal } from "lucide-react";

export default function ExperienceApp() {
  const jobs = [
    {
      role: "Capstone Project",
      company: "The Guinea Group & QUT",
      date: "Feb 2024 - Jun 2024",
      location: "Brisbane, AU",
      details: [
        "Engineered a responsive survey platform on AWS, delivering scalable access for 'Leadership Under Pressure' training.",
        "Built reusable UI components with React.js and Tailwind CSS, establishing a design system that accelerated development.",
        "Debugged complex API integrations using Postman, resolving backend issues and reducing data errors by 20%.",
        "Optimized Agile workflows via Trello and Slack, ensuring clean version control and timely delivery with GitHub.",
      ],
      stack: ["AWS", "React", "Node.js", "Postman"],
    },
    {
      role: "Frontend Developer",
      company: "Freelance",
      date: "2023 - Present",
      location: "Remote",
      details: [
        "Transformed high-fidelity Figma designs into pixel-perfect, responsive React components.",
        "Built dynamic landing pages with Tailwind CSS, ensuring cross-browser compatibility and mobile responsiveness.",
        "Integrated interactive UI elements using modern JavaScript (ES6+) and Framer Motion.",
      ],
      stack: ["React", "Figma", "Tailwind", "Framer"],
    },
  ];

  return (
    <div className="p-4 md:p-8 font-mono max-w-4xl mx-auto space-y-12 pb-12">
      {/* EXPERIENCE SECTION */}
      <section>
        <div className="flex items-center gap-3 mb-8 border-b-4 border-black pb-2">
          <Briefcase size={28} strokeWidth={2.5} />
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
            System_Logs (Experience)
          </h2>
        </div>

        <div className="space-y-10 border-l-2 border-black border-dashed ml-3 pl-8 relative">
          {jobs.map((job, i) => (
            <div key={i} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-1 w-6 h-6 bg-white border-4 border-black group-hover:bg-black transition-colors" />

              <div className="bg-white border-2 border-black p-5 shadow-[6px_6px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_0_black] transition-all">
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-black uppercase leading-tight">
                      {job.role}
                    </h3>
                    <div className="font-bold text-gray-600 text-sm md:text-base mt-1">
                      @ {job.company}
                    </div>
                  </div>

                  {/* Date & Location Badges */}
                  <div className="flex flex-col items-start md:items-end text-[10px] md:text-xs font-bold uppercase gap-2 mt-2 md:mt-0">
                    <span className="bg-black text-white px-2 py-1 flex items-center gap-2 shadow-[2px_2px_0_0_gray]">
                      <Calendar size={12} /> {job.date}
                    </span>
                    <span className="bg-white border-2 border-black px-2 py-1 flex items-center gap-2">
                      <MapPin size={12} /> {job.location}
                    </span>
                  </div>
                </div>

                {/* DETAILED LIST */}
                <ul className="text-sm leading-relaxed border-l-4 border-gray-200 pl-4 mb-5 text-gray-800 space-y-2">
                  {job.details.map((point, idx) => (
                    <li key={idx} className="relative pl-2">
                      <span className="absolute left-[-10px] top-2 w-1.5 h-1.5 bg-black rounded-full" />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2">
                  {job.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-bold uppercase border border-black px-1.5 py-0.5 bg-gray-100 flex items-center gap-1"
                    >
                      <Terminal size={10} /> {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
