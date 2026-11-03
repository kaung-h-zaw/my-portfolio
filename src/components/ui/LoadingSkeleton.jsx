export function Skeleton({ className = "" }) {
  return <span aria-hidden="true" className={`skeleton block rounded-lg ${className}`} />;
}

export function AppSkeleton({ label = "section", section }) {
  const projects = section === "projects";
  return (
    <div role="status" aria-label={`Loading ${label}`} aria-busy="true" className="app-page">
      <span className="sr-only">Loading {label}</span>
      <div aria-hidden="true" className="flex items-center gap-3 border-b border-white/10 pb-5">
        <Skeleton className="h-12 w-12 shrink-0" />
        <div className="flex-1 space-y-2"><Skeleton className="h-3 w-24" /><Skeleton className="h-6 w-3/5 max-w-64" /></div>
      </div>
      <div aria-hidden="true" className="space-y-2"><Skeleton className="h-4 w-full max-w-xl" /><Skeleton className="h-4 w-2/3 max-w-sm" /></div>
      <div aria-hidden="true" className={projects ? "app-grid-two" : "app-split"}>
        {[0, 1].map((item) => (
          <div key={item} className="app-panel space-y-4">
            <Skeleton className="h-5 w-2/5" />
            {projects && <Skeleton className="aspect-[16/10] w-full" />}
            <Skeleton className="h-5 w-3/4" />
            <div className="space-y-3"><Skeleton className="h-3 w-full" /><Skeleton className="h-3 w-11/12" /><Skeleton className="h-3 w-4/5" /></div>
            <div className="flex gap-2"><Skeleton className="h-6 w-16" /><Skeleton className="h-6 w-20" /><Skeleton className="h-6 w-14" /></div>
            <Skeleton className="h-11 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function WeatherSkeleton({ variant }) {
  const compact = variant === "compact";
  const shape = compact ? "native-widget h-full min-h-[112px] p-3.5" : `rounded-2xl border border-white/10 bg-[#1c1c1c] p-3 xl:p-4 ${variant === "desktop" ? "aspect-[2/1]" : "aspect-[4/3]"}`;
  return (
    <div role="status" aria-label="Loading weather" aria-busy="true" className={`flex w-full flex-col justify-between gap-3 ${shape}`}>
      <span className="sr-only">Loading Bangkok weather</span>
      <Skeleton className="h-3 w-16" />
      <div aria-hidden="true" className="flex items-end justify-between gap-3"><Skeleton className="h-8 w-16" /><Skeleton className="h-7 w-7" /></div>
      <Skeleton className="h-2.5 w-20" />
    </div>
  );
}
