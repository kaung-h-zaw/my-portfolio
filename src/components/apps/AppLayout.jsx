import React from "react";

export function AppHeader({ icon: Icon, file, title, badge, focusable = false }) {
  return (
    <header className="app-header flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <Icon size={22} aria-hidden="true" />
        </div>
        <div>
          <p className="app-eyebrow">› {file}</p>
          <h1 tabIndex={focusable ? -1 : undefined} className="outline-none text-xl sm:text-2xl font-bold tracking-tight">{title}</h1>
        </div>
      </div>
      {badge && <span className="app-badge">{badge}</span>}
    </header>
  );
}

export function PanelTitle({ icon: Icon, children, id }) {
  return (
    <h2 id={id} className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-4">
      {Icon && <Icon size={17} className="shrink-0 text-slate-300" aria-hidden="true" />}
      {children}
    </h2>
  );
}

export function Tags({ items, label }) {
  return <ul aria-label={label} className="flex flex-wrap gap-2">{items.map((item) => <li key={item} className="app-tag">{item}</li>)}</ul>;
}

export function AppFooter({ file, children }) {
  return <footer className="mt-auto border-t border-white/10 pt-4 flex flex-wrap justify-between gap-2 text-xs uppercase tracking-widest text-slate-400"><span>{file}</span><span>{children}</span></footer>;
}
