import React, { useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, FolderOpen } from "lucide-react";
import { AppHeader, AppFooter, PanelTitle, Tags } from "./AppLayout";
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
    <div ref={rootRef} className="app-page">
      {selected ? (
        <article className="w-full max-w-5xl mx-auto">
          <button type="button" onClick={() => setSelectedId(null)}
            className="inline-flex min-h-11 items-center gap-2 rounded border border-black/20 px-3 py-2 text-xs font-bold hover:bg-black/5 mb-5">
            <ArrowLeft size={15} aria-hidden="true" /> Back to projects
          </button>
          <div className="app-panel mb-5">
            <AppHeader icon={FolderOpen} file={`projects.dir / ${selected.category}`} title={selected.title} badge={selected.date} focusable />
            <p className="app-body mt-4 max-w-3xl">{selected.desc}</p>
            <div className="lg:hidden mt-4"><ProjectLinks project={selected} /></div>
          </div>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_240px]">
            <div className="space-y-6">
              <section className="app-panel" aria-labelledby="project-purpose">
                <SectionTitle id="project-purpose">The project</SectionTitle>
                <p className="font-sans text-base leading-relaxed text-black/80">{selected.purpose}</p>
              </section>
              <section className="app-panel" aria-labelledby="project-features">
                <SectionTitle id="project-features">Main features</SectionTitle>
                <ul className="list-disc pl-5 space-y-2 font-sans text-base leading-relaxed text-black/80">
                  {selected.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
              </section>
              {selected.image && (
                <figure className="app-panel">
                  <img src={selected.image} alt={`${selected.title} application screenshot`}
                    width="1440" height="900" className="w-full rounded-lg border border-black/15 bg-white/20" />
                  <figcaption className="text-xs text-black/65 mt-2">{selected.title} · application preview</figcaption>
                </figure>
              )}
              {selected.contribution?.length > 0 && (
                <section className="app-panel" aria-labelledby="project-contribution">
                  <SectionTitle id="project-contribution">My contribution</SectionTitle>
                  <ul className="list-disc pl-5 space-y-2 font-sans text-base leading-relaxed text-black/80">
                    {selected.contribution.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </section>
              )}
              {selected.decisions?.length > 0 && (
                <section className="app-panel" aria-labelledby="project-decisions">
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
                <section className="app-panel" aria-labelledby="project-challenge">
                  <SectionTitle id="project-challenge">A challenge I solved</SectionTitle>
                  <p className="font-sans text-base leading-relaxed text-black/80">{selected.challenge}</p>
                </section>
              )}
              {selected.learning && (
                <section className="app-panel" aria-labelledby="project-learning">
                  <SectionTitle id="project-learning">What I learned</SectionTitle>
                  <p className="font-sans text-base leading-relaxed text-black/80">{selected.learning}</p>
                </section>
              )}
            </div>
            <aside className="app-panel space-y-5 self-start lg:sticky lg:top-0">
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
          <AppHeader icon={FolderOpen} file="projects.dir" title="Project Archive" badge={`${PROJECTS_DATA.length} projects`} />
          <p className="app-body max-w-2xl">Explore the apps, their features, and the technical decisions behind them.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            {PROJECTS_DATA.map((project) => (
              <article key={project.id} aria-labelledby={`project-${project.id}`}
                className={`app-panel flex flex-col ${project.featured ? "border-black/30 bg-white/30" : ""}`}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className={project.featured ? "rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white" : "app-badge"}>
                    {project.featured ? "Featured · " : ""}{project.category}
                  </span>
                  <span className="text-xs text-black/65">{project.date}</span>
                </div>
                <h2 id={`project-${project.id}`} className="text-xl font-bold leading-snug mb-3">{project.title}</h2>
                <div className={`grid gap-4 mb-4 ${project.image ? "sm:grid-cols-[minmax(0,1fr)_160px]" : ""}`}>
                  <p className="app-body">{project.desc}</p>
                  {project.image && <img src={project.image} alt={`${project.title} application screenshot`} loading="lazy" width="1440" height="900"
                    className="order-first sm:order-last w-full aspect-[16/10] object-cover object-top rounded-lg border border-black/15 bg-white/20" />}
                </div>
                {project.team && <p className="text-xs text-black/65 mb-4">{project.team}</p>}
                <ul className="list-disc pl-5 space-y-1 font-sans text-sm leading-relaxed text-black/75 mb-4">
                  {project.features.slice(0, 3).map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                {project.contribution?.length > 0 && <div className="app-tile mb-4">
                  <h3 className="app-eyebrow font-bold mb-2">My contribution</h3>
                  <p className="font-sans text-sm leading-relaxed text-black/80">{project.contribution[0]}</p>
                </div>}
                <div className="mt-auto mb-4"><TechList project={project} /></div>
                <div className="border-t border-black/10 pt-4 space-y-2">
                  <button type="button" data-project-id={project.id} onClick={() => openDetails(project.id)} aria-label={`View ${project.title} case study`} className="app-action w-full">
                    View Details <ArrowUpRight size={16} aria-hidden="true" />
                  </button>
                  <ProjectLinks project={project} secondary />
                </div>
              </article>
            ))}
          </div>
        </>
      )}
      <AppFooter file="projects.dir">{selected ? selected.title : `${PROJECTS_DATA.length} projects · EOF`}</AppFooter>
    </div>
  );
}

function SectionTitle({ id, children }) {
  return <PanelTitle id={id}>{children}</PanelTitle>;
}

function TechList({ project }) {
  return <Tags items={project.tags} label={`${project.title} technologies`} />;
}

function ProjectLinks({ project, secondary = false }) {
  if (!project.link && !project.code) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer"
        aria-label={`View ${project.title} live demo (opens in a new tab)`}
        className={`${secondary ? "app-action-secondary" : "app-action"} flex-1 text-xs`}>
        <ExternalLink size={15} aria-hidden="true" /> Live Demo
      </a>}
      {project.code && <a href={project.code} target="_blank" rel="noopener noreferrer"
        aria-label={`View ${project.title} GitHub repository (opens in a new tab)`}
        className="app-action-secondary flex-1 text-xs">
        <Github size={15} aria-hidden="true" /> GitHub
      </a>}
    </div>
  );
}
