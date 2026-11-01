import React, { useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, FolderOpen } from "lucide-react";
import { PROJECTS_DATA } from "../../data/content";

export default function ProjectsApp() {
  const [selectedId, setSelectedId] = useState(null);
  const rootRef = useRef(null);
  const listScroll = useRef(0);
  const lastProject = useRef(null);
  const selected = PROJECTS_DATA.find((project) => project.id === selectedId);

  useLayoutEffect(() => {
    const scroller = rootRef.current?.closest(".os-content");
    if (scroller) scroller.scrollTop = selectedId ? 0 : listScroll.current;
    if (selectedId) {
      rootRef.current?.querySelector("h1")?.focus({ preventScroll: true });
    } else if (lastProject.current) {
      rootRef.current?.querySelector(`[data-project-id="${lastProject.current}"]`)?.focus({ preventScroll: true });
    }
  }, [selectedId]);

  const openDetails = (id) => {
    listScroll.current = rootRef.current?.closest(".os-content")?.scrollTop || 0;
    lastProject.current = id;
    setSelectedId(id);
  };

  return (
    <div ref={rootRef} className="font-mono text-black min-h-full flex flex-col gap-5 p-3 sm:p-4 xl:p-6">
      {selected ? (
        <article className="w-full max-w-5xl mx-auto">
          <button type="button" onClick={() => setSelectedId(null)}
            className="inline-flex min-h-11 items-center gap-2 rounded border border-black/20 px-3 py-2 text-xs font-bold hover:bg-black/5 mb-5">
            <ArrowLeft size={15} aria-hidden="true" /> Back to projects
          </button>
          <header className="border-b border-black/15 pb-5 mb-6">
            <p className="text-xs uppercase tracking-widest text-black/65 mb-2">projects.dir / {selected.category}</p>
            <h1 tabIndex={-1} className="outline-none text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3">{selected.title}</h1>
            <p className="font-sans text-base sm:text-lg leading-relaxed text-black/80 max-w-3xl">{selected.desc}</p>
            <div className="lg:hidden mt-4"><ProjectLinks project={selected} /></div>
          </header>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_240px]">
            <div className="space-y-6">
              <section aria-labelledby="project-purpose">
                <SectionTitle id="project-purpose">The project</SectionTitle>
                <p className="font-sans text-base leading-relaxed text-black/80">{selected.purpose}</p>
              </section>
              <section aria-labelledby="project-features">
                <SectionTitle id="project-features">Main features</SectionTitle>
                <ul className="list-disc pl-5 space-y-2 font-sans text-base leading-relaxed text-black/80">
                  {selected.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
              </section>
              {selected.image && (
                <figure>
                  <img src={selected.image} alt={`${selected.title} application screenshot`}
                    width="1440" height="900" className="w-full rounded-lg border border-black/15 bg-white/20" />
                  <figcaption className="text-xs text-black/65 mt-2">{selected.title} · application preview</figcaption>
                </figure>
              )}
              {selected.contribution?.length > 0 && (
                <section aria-labelledby="project-contribution">
                  <SectionTitle id="project-contribution">My contribution</SectionTitle>
                  <ul className="list-disc pl-5 space-y-2 font-sans text-base leading-relaxed text-black/80">
                    {selected.contribution.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </section>
              )}
              {selected.decisions?.length > 0 && (
                <section aria-labelledby="project-decisions">
                  <SectionTitle id="project-decisions">Technical decisions</SectionTitle>
                  <div className="space-y-4">
                    {selected.decisions.map((item) => (
                      <div key={item.title}>
                        <h3 className="text-sm font-bold mb-1">{item.title}</h3>
                        <p className="font-sans text-base leading-relaxed text-black/80">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {selected.challenge && (
                <section aria-labelledby="project-challenge">
                  <SectionTitle id="project-challenge">A challenge I solved</SectionTitle>
                  <p className="font-sans text-base leading-relaxed text-black/80">{selected.challenge}</p>
                </section>
              )}
              {selected.learning && (
                <section aria-labelledby="project-learning">
                  <SectionTitle id="project-learning">What I learned</SectionTitle>
                  <p className="font-sans text-base leading-relaxed text-black/80">{selected.learning}</p>
                </section>
              )}
            </div>
            <aside className="space-y-5 rounded-lg border border-black/15 bg-white/20 p-4 self-start lg:sticky lg:top-0">
              <dl className="space-y-4 text-sm">
                {[["Type", selected.category], ["Date", selected.date], ["Role", selected.role], ["Team", selected.team], ["Context", selected.context]].filter(([, value]) => value).map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs uppercase tracking-widest text-black/65 mb-1">{label}</dt>
                    <dd className="leading-relaxed text-black/85">{value}</dd>
                  </div>
                ))}
              </dl>
              <div>
                <SectionTitle>Technologies</SectionTitle>
                <TechList project={selected} />
              </div>
              <div className="hidden lg:block"><ProjectLinks project={selected} /></div>
            </aside>
          </div>
        </article>
      ) : (
        <>
          <header className="flex items-center gap-3 border-b border-black/10 pb-4">
            <FolderOpen size={22} aria-hidden="true" />
            <div>
              <p className="text-xs uppercase tracking-widest text-black/70">› projects.dir</p>
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight">Project Archive</h1>
            </div>
          </header>
          <p className="font-sans text-base leading-relaxed text-black/75">Explore the apps, their features, and the technical decisions behind them.</p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5 items-start">
            {PROJECTS_DATA.map((project) => (
              <article key={project.id} aria-labelledby={`project-${project.id}`}
                className={`flex flex-col h-full p-4 rounded-lg border transition-colors ${project.featured ? "border-black/30 bg-white/35" : "border-black/15 bg-white/20 hover:border-black/30"}`}>
                <p className="text-xs uppercase tracking-wide text-black/70 mb-3">{project.featured ? "Featured · " : ""}{project.category}</p>
                {project.image && (
                  <img src={project.image} alt={`${project.title} application screenshot`}
                    loading="lazy" width="1440" height="900"
                    className="w-full aspect-[16/10] object-cover object-top rounded border border-black/10 bg-black/5 mb-4" />
                )}
                <h2 id={`project-${project.id}`} className="text-lg font-black uppercase tracking-tight mb-2">{project.title}</h2>
                <p className="text-xs text-black/65 mb-3">{project.date}{project.team ? ` · ${project.team}` : ""}</p>
                <p className="font-sans text-base leading-relaxed text-black/80 mb-4">{project.desc}</p>
                <ul className="list-disc pl-5 space-y-1 font-sans text-sm leading-relaxed text-black/80 mb-4">
                  {project.features.slice(0, 3).map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                {project.contribution?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-black/70 mb-2">My contribution</h3>
                    <p className="font-sans text-sm leading-relaxed text-black/80">{project.contribution[0]}</p>
                  </div>
                )}
                <div className="mt-auto mb-4"><TechList project={project} /></div>
                <button type="button" data-project-id={project.id} onClick={() => openDetails(project.id)}
                  aria-label={`View ${project.title} case study`}
                  className="flex items-center justify-between gap-2 min-h-11 rounded border border-black/30 bg-white/25 px-3 py-3 text-sm font-bold hover:bg-white/50 mb-3">
                  View Details <ArrowUpRight size={17} aria-hidden="true" />
                </button>
                <ProjectLinks project={project} />
              </article>
            ))}
          </div>
        </>
      )}
      <footer className="border-t border-black/10 pt-4 mt-auto text-xs uppercase tracking-widest text-black/70 flex flex-wrap justify-between gap-2">
        <span>projects.dir</span><span>{selected ? selected.title : `${PROJECTS_DATA.length} projects · EOF`}</span>
      </footer>
    </div>
  );
}

function SectionTitle({ id, children }) {
  return <h2 id={id} className="text-xs font-bold uppercase tracking-widest text-black/70 mb-3">{children}</h2>;
}

function TechList({ project }) {
  return (
    <ul aria-label={`${project.title} technologies`} className="flex flex-wrap gap-2">
      {project.tags.map((tech) => <li key={tech} className="text-xs px-2 py-1 rounded border border-black/10 bg-black/5 text-black/80">{tech}</li>)}
    </ul>
  );
}

function ProjectLinks({ project }) {
  if (!project.link && !project.code) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer"
        aria-label={`View ${project.title} live demo (opens in a new tab)`}
        className="flex flex-1 items-center justify-center gap-2 min-h-11 px-3 py-3 rounded bg-black text-white text-xs font-bold hover:bg-black/80">
        <ExternalLink size={15} aria-hidden="true" /> Live Demo
      </a>}
      {project.code && <a href={project.code} target="_blank" rel="noopener noreferrer"
        aria-label={`View ${project.title} GitHub repository (opens in a new tab)`}
        className="flex flex-1 items-center justify-center gap-2 min-h-11 px-3 py-3 rounded border border-black/25 text-black/90 text-xs font-bold hover:bg-black/5">
        <Github size={15} aria-hidden="true" /> GitHub
      </a>}
    </div>
  );
}
