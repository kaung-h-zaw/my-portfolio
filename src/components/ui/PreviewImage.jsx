import { useState } from "react";
import { Skeleton } from "./LoadingSkeleton";

export default function PreviewImage({ src, alt, loading = "eager", className = "" }) {
  const [state, setState] = useState("loading");
  return (
    <div className={`relative overflow-hidden rounded-lg border border-white/10 bg-white/5 ${className}`}>
      {state === "loading" && <div role="status" aria-busy="true" aria-label={`Loading ${alt}`} className="absolute inset-0"><Skeleton className="h-full w-full" /></div>}
      {state === "error" ? <div className="flex aspect-[16/10] items-center justify-center text-sm text-zinc-400">Preview unavailable</div> : (
        <img src={src} alt={alt} loading={loading} width="1440" height="900"
          onLoad={() => setState("ready")} onError={() => setState("error")}
          className={`block aspect-[16/10] w-full object-cover object-top ${state === "ready" ? "opacity-100" : "opacity-0"}`} />
      )}
    </div>
  );
}
