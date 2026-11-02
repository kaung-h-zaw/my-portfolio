import { SkillsIcon } from "../os/AppIcons";
import React from "react";
import { Cpu, PanelsTopLeft, Server, Database, Wrench, Users } from "lucide-react";
import {
  SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiTailwindcss,
  SiHtml5, SiNodedotjs, SiExpress, SiFirebase, SiMongodb,
  SiPostgresql, SiMysql, SiSqlite, SiGit, SiGithub, SiFigma,
} from "react-icons/si";
import { AppHeader, AppFooter } from "./AppLayout";
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
    <div className="app-page">
      <AppHeader icon={SkillsIcon} file="skills.exe" title="Tech Stack" badge={`${total} skills & tools · ${categories.length} areas`} />

      <p className="font-sans text-base leading-relaxed text-zinc-200 max-w-2xl">
        The tools I use to build interfaces, APIs, and applications that work with data.
      </p>

      <div className="app-grid-two app-skills-grid">
        {categories.map(([category, skills]) => {
          const { icon: CategoryIcon, description } = CATEGORIES[category];
          const headingId = `skills-${category.toLowerCase()}`;

          return (
            <section key={category} aria-labelledby={headingId}
              className="app-panel">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3">
                  <CategoryIcon size={18} className="mt-0.5 shrink-0 text-zinc-300" aria-hidden="true" />
                  <div>
                    <h2 id={headingId} className="text-sm font-bold uppercase tracking-wider mb-1">{category}</h2>
                    <p className="font-sans text-sm leading-relaxed text-zinc-300">{description}</p>
                  </div>
                </div>
                <span className="shrink-0 text-xs tabular-nums text-zinc-400">{String(skills.length).padStart(2, "0")}</span>
              </div>

              <ul className="app-skill-list grid gap-2">
                {skills.map((skill) => {
                  const SkillIcon = ICONS[skill.name] || Cpu;
                  return (
                    <li key={skill.name} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 transition-colors hover:border-white/10 hover:bg-white/5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                        <SkillIcon className="h-5 w-5 text-zinc-200" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-bold leading-snug text-zinc-100">{skill.name}</p>
                        <p className="font-sans text-xs leading-relaxed text-zinc-300 mt-0.5">{skill.type}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <AppFooter file="skills.exe">{categories.length} categories · {total} entries</AppFooter>
    </div>
  );
}
