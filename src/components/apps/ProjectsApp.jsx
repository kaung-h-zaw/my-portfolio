import PreviewImage from "../ui/PreviewImage";
import { ProjectsIcon } from "../os/AppIcons";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, Copy, Check, LockKeyhole } from "lucide-react";
import { AppHeader, AppFooter, PanelTitle, Tags } from "./AppLayout";
import { PROJECTS_DATA } from "../../data/content";
import { getProjectUrl, navigateTo, usePortfolioRoute } from "../../lib/navigation";

export default function ProjectsApp() {
  const { projectId: selectedId } = usePortfolioRoute();
  const rootRef = useRef(null);
  const listScroll = useRef(0);
  const hasListScroll = useRef(false);
  const lastProject = useRef(selectedId);
  const selected = PROJECTS_DATA.find((project) => project.id === selectedId);

  useEffect(() => {
    const original = document.title;
    document.title = `${selected?.title || (selectedId ? "Project not found" : "Projects")} | KAUNG`;
    return () => { document.title = original; };
  }, [selected, selectedId]);

  useLayoutEffect(() => {
    const scroller = rootRef.current?.closest(".os-content");
    if (scroller) scroller.scrollTop = selectedId ? 0 : listScroll.current;
    if (selectedId) {
      rootRef.current?.querySelector("h1")?.focus({ preventScroll: true });
    } else if (lastProject.current) {
      const card = [...(rootRef.current?.querySelectorAll("[data-project-id]") || [])]
        .find((element) => element.dataset.projectId === lastProject.current);
      card?.focus({ preventScroll: true });
      if (!hasListScroll.current) card?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedId]);

  const openDetails = (id) => {
    listScroll.current = rootRef.current?.closest(".os-content")?.scrollTop || 0;
    hasListScroll.current = true;
    lastProject.current = id;
    navigateTo("projects", id);
  };

  return (
    <div ref={rootRef} className="app-page app-projects-page">
      {selectedId && !selected ? (
        <section className="app-panel">
          <h1 tabIndex={-1} className="text-xl font-bold mb-3">Project not found</h1>
          <p className="app-body mb-4">This project link is unavailable. Browse the archive to see my current work.</p>
          <button type="button" onClick={() => navigateTo("projects")} className="app-action">Back to projects</button>
        </section>
      ) : selected ? (
        <article className="app-project-detail w-full mx-auto">
          <button type="button" onClick={() => navigateTo("projects")}
            className="inline-flex min-h-11 items-center gap-2 rounded border border-white/10 px-3 py-2 text-xs font-bold hover:bg-white/5 mb-5">
            <ArrowLeft size={15} aria-hidden="true" /> Back to projects
          </button>
          <div className="app-panel mb-5">
            <AppHeader icon={ProjectsIcon} file={`projects.dir / ${selected.category}`} title={selected.title} badge={selected.date} focusable />
            <p className="app-body mt-4 max-w-3xl">{selected.desc}</p>
            {selected.confidential && <ConfidentialProjectNotice />}
            <ProjectShare key={selected.id} project={selected} />
            <div className="app-detail-mobile-links mt-4"><ProjectLinks project={selected} /></div>
          </div>
          <div className="app-detail-grid">
            <div className="space-y-6">
              {selected.outcomes?.length > 0 && (
                <section className="app-panel" aria-labelledby="project-outcomes">
                  <SectionTitle id="project-outcomes">What the platform supports</SectionTitle>
                  <div className="space-y-4">
                    {selected.outcomes.map((outcome) => (
                      <div key={outcome.title}>
                        <h3 className="text-sm font-bold mb-1">{outcome.title}</h3>
                        <p className="app-body">{outcome.detail}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              <section className="app-panel" aria-labelledby="project-purpose">
                <SectionTitle id="project-purpose">The project</SectionTitle>
                <p className="font-sans text-base leading-relaxed text-zinc-200">{selected.purpose}</p>
              </section>
              <section className="app-panel" aria-labelledby="project-features">
                <SectionTitle id="project-features">Main features</SectionTitle>
                <ul className="list-disc pl-5 space-y-2 font-sans text-base leading-relaxed text-zinc-200">
                  {selected.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
              </section>
              {selected.workflow?.length > 0 && (
                <section className="app-panel" aria-labelledby="project-workflow">
                  <SectionTitle id="project-workflow">How it works</SectionTitle>
                  <ol className="list-decimal pl-5 space-y-4 font-sans text-base leading-relaxed text-zinc-200">
                    {selected.workflow.map((step) => (
                      <li key={step.title}>
                        <h3 className="font-bold">{step.title}</h3>
                        <p>{step.detail}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              )}
              {selected.image && (
                <figure className="app-panel">
                  <PreviewImage src={selected.image} alt={`${selected.title} application screenshot`} />
                  <figcaption className="text-xs text-zinc-300 mt-2">{selected.imageCaption || `${selected.title} · application preview`}</figcaption>
                </figure>
              )}
              {selected.contribution?.length > 0 && (
                <section className="app-panel" aria-labelledby="project-contribution">
                  <SectionTitle id="project-contribution">My contribution</SectionTitle>
                  <ul className="list-disc pl-5 space-y-2 font-sans text-base leading-relaxed text-zinc-200">
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
                        <p className="font-sans text-base leading-relaxed text-zinc-200">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {selected.challenge && (
                <section className="app-panel" aria-labelledby="project-challenge">
                  <SectionTitle id="project-challenge">A challenge I solved</SectionTitle>
                  <p className="font-sans text-base leading-relaxed text-zinc-200">{selected.challenge}</p>
                </section>
              )}
              {selected.learning && (
                <section className="app-panel" aria-labelledby="project-learning">
                  <SectionTitle id="project-learning">What I learned</SectionTitle>
                  <p className="font-sans text-base leading-relaxed text-zinc-200">{selected.learning}</p>
                </section>
              )}
            </div>
            <aside className="app-panel app-detail-sidebar space-y-5 self-start">
              <dl className="space-y-4 text-sm">
                {[["Type", selected.category], ["Date", selected.date], ["Role", selected.role], ["Team", selected.team], ["Context", selected.context]].filter(([, value]) => value).map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs uppercase tracking-widest text-zinc-300 mb-1">{label}</dt>
                    <dd className="leading-relaxed text-zinc-200">{value}</dd>
                  </div>
                ))}
              </dl>
              <div>
                <SectionTitle>Technologies</SectionTitle>
                <TechList project={selected} />
              </div>
              <div className="app-detail-sidebar-links"><ProjectLinks project={selected} /></div>
            </aside>
          </div>
        </article>
      ) : (
        <>
          <AppHeader icon={ProjectsIcon} file="projects.dir" title="Project Archive" badge={`${PROJECTS_DATA.length} projects`} />
          <p className="app-body max-w-2xl">Explore the apps, their features, and the technical decisions behind them.</p>
          <div className="app-grid-two items-stretch">
            {PROJECTS_DATA.map((project) => (
              <article key={project.id} aria-labelledby={`project-${project.id}`}
                className={`app-panel app-project-card flex flex-col ${project.featured ? "border-white/10 bg-white/5" : ""}`}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className={project.featured ? "rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white" : "app-badge"}>
                    {project.featured ? "Featured · " : ""}{project.category}
                  </span>
                  <span className="text-xs text-zinc-300">{project.date}</span>
                </div>
                <h2 id={`project-${project.id}`} className="text-xl font-bold leading-snug mb-3">{project.title}</h2>
                <div className="grid gap-4 mb-4">
                  <p className="app-body">{project.desc}</p>
                  {project.image && <PreviewImage src={project.image} alt={`${project.title} application screenshot`} loading="lazy"
                    className="order-first app-project-image w-full" />}
                </div>
                {project.confidential && <div className="mb-4"><ConfidentialProjectNotice compact /></div>}
                {project.team && <p className="text-xs text-zinc-300 mb-4">{project.team}</p>}
                <ul className="list-disc pl-5 space-y-1 font-sans text-sm leading-relaxed text-zinc-200 mb-4">
                  {project.features.slice(0, 3).map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                {project.contribution?.length > 0 && <div className="app-tile mb-4">
                  <h3 className="app-eyebrow font-bold mb-2">My contribution</h3>
                  <p className="font-sans text-sm leading-relaxed text-zinc-200">{project.contribution[0]}</p>
                </div>}
                <div className="mt-auto mb-4"><TechList project={project} /></div>
                <div className="border-t border-white/10 pt-4 space-y-2">
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

function ProjectShare({ project }) {
  const [status, setStatus] = useState("");
  const timer = useRef(null);
  const url = getProjectUrl(project.id);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setStatus(""), 2000);
    } catch {
      setStatus("manual");
    }
  };

  return (
    <div className="mt-4">
      <button type="button" onClick={copy} className="app-action-secondary" aria-label={`Copy link to ${project.title}`}>
        {status === "copied" ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
        {status === "copied" ? "Link copied" : "Copy project link"}
      </button>
      <p role="status" className="text-sm text-zinc-300 mt-2">{status === "copied" ? "Project link copied." : status === "manual" ? "Copy this link to share the project:" : ""}</p>
      {status === "manual" && <input aria-label={`${project.title} share link`} readOnly value={url} onFocus={(event) => event.currentTarget.select()} className="app-field mt-2" />}
    </div>
  );
}

function SectionTitle({ id, children }) {
  return <PanelTitle id={id}>{children}</PanelTitle>;
}

function ConfidentialProjectNotice({ compact = false }) {
  return <p className={`flex items-start gap-2 text-sm leading-relaxed text-zinc-300 ${compact ? "" : "mt-4"}`}>
    <LockKeyhole size={15} className="shrink-0 mt-0.5" aria-hidden="true" />
    <span>{compact ? "Confidential client project" : "Confidential client project. Screenshots, source code, and live demo links are private."}</span>
  </p>;
}

function TechList({ project }) {
  return <Tags items={project.tags} label={`${project.title} technologies`} />;
}

function ProjectLinks({ project, secondary = false }) {
  if (project.confidential || (!project.link && !project.code)) return null;
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
