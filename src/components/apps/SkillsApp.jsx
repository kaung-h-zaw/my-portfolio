import React from "react";
import { Cpu, PanelsTopLeft, Server, Database, Wrench, Users } from "lucide-react";
import {
  SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiTailwindcss,
  SiHtml5, SiNodedotjs, SiExpress, SiFirebase, SiMongodb,
  SiPostgresql, SiMysql, SiSqlite, SiGit, SiGithub, SiFigma,
} from "react-icons/si";
import { SKILLS_DATA } from "../../data/content";

const ICONS = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  HTML5: SiHtml5,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  Firebase: SiFirebase,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  SQLite: SiSqlite,
  Git: SiGit,
  GitHub: SiGithub,
  Figma: SiFigma,
  Agile: Users,
};

const CATEGORIES = {
  Frontend: { icon: PanelsTopLeft, description: "Interfaces, components, and responsive layouts." },
  Backend: { icon: Server, description: "Application services, APIs, and server-side logic." },
  Databases: { icon: Database, description: "Document, relational, and embedded data storage." },
  Tools: { icon: Wrench, description: "Design, version control, and collaboration." },
};

export default function SkillsApp() {
  const categories = Object.entries(SKILLS_DATA);
  const total = categories.reduce((count, [, skills]) => count + skills.length, 0);

  return (
    <div className="font-mono text-black min-h-full flex flex-col gap-5 p-3 sm:p-4 xl:p-6">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-black/15 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/15 bg-white/25">
            <Cpu size={22} aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-black/65">› skills.exe</p>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight">Tech Stack</h1>
          </div>
        </div>
        <span className="rounded-full border border-black/15 bg-white/20 px-3 py-1.5 text-xs text-black/70">
          {total} skills & tools · {categories.length} areas
        </span>
      </header>

      <p className="font-sans text-base leading-relaxed text-black/75 max-w-2xl">
        The tools I use to build interfaces, APIs, and applications that work with data.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {categories.map(([category, skills]) => {
          const { icon: CategoryIcon, description } = CATEGORIES[category];
          const headingId = `skills-${category.toLowerCase()}`;

          return (
            <section key={category} aria-labelledby={headingId}
              className="rounded-xl border border-black/15 bg-white/20 p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3">
                  <CategoryIcon size={18} className="mt-0.5 shrink-0 text-black/70" aria-hidden="true" />
                  <div>
                    <h2 id={headingId} className="text-sm font-bold uppercase tracking-wider mb-1">{category}</h2>
                    <p className="font-sans text-sm leading-relaxed text-black/65">{description}</p>
                  </div>
                </div>
                <span className="shrink-0 text-xs tabular-nums text-black/55">{String(skills.length).padStart(2, "0")}</span>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {skills.map((skill) => {
                  const SkillIcon = ICONS[skill.name] || Cpu;
                  return (
                    <li key={skill.name} className="flex items-center gap-3 rounded-lg border border-black/10 bg-white/20 p-3 transition-colors hover:border-black/25 hover:bg-white/35">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-white/25">
                        <SkillIcon className="h-5 w-5 text-black/75" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-bold leading-snug text-black/90">{skill.name}</p>
                        <p className="font-sans text-xs leading-relaxed text-black/65 mt-0.5">{skill.type}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <footer className="mt-auto border-t border-black/10 pt-4 flex flex-wrap justify-between gap-2 text-xs uppercase tracking-widest text-black/60">
        <span>skills.exe</span><span>{categories.length} categories · {total} entries</span>
      </footer>
    </div>
  );
}
