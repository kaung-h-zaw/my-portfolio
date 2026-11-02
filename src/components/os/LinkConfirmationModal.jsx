import React, { useEffect, useId, useRef } from "react";
import { ExternalLink, X } from "lucide-react";
import { createPortal } from "react-dom";

export default function LinkConfirmationModal({ linkData, onClose }) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef(null);
  const cancelRef = useRef(null);
  const displayUrl = linkData?.href?.replace(/^https?:\/\//, "") ?? "";

  useEffect(() => {
    if (!linkData) return undefined;
    const previousFocus = linkData.returnFocus || document.activeElement;
    const root = document.getElementById("root");
    const wasInert = root?.inert;
    if (root) root.inert = true;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); }
      if (event.key === "Tab") {
        const focusables = [...dialogRef.current.querySelectorAll('button, a[href]')];
        const index = focusables.indexOf(document.activeElement);
        const next = (index + (event.shiftKey ? -1 : 1) + focusables.length) % focusables.length;
        focusables[next]?.focus();
        event.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    cancelRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (root) root.inert = wasInert;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [linkData, onClose]);

  if (!linkData) return null;
  const Icon = linkData.icon || ExternalLink;

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/30 p-4 font-mono text-zinc-100" onClick={onClose}>
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-[440px] max-h-[calc(100dvh-32px)] overflow-y-auto rounded-2xl border border-white/10 bg-[#1b1b1b] ">
        <div className="flex items-center justify-between border-b border-white/10 pl-5 pr-2 py-1">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-400"><ExternalLink size={13} aria-hidden="true" />External link</span>
          <button type="button" onClick={onClose} aria-label="Close link dialog" className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-white/5"><X size={17} /></button>
        </div>
        <div className="p-5 sm:p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/10">
            {typeof Icon === "string" ? <img src={Icon} alt="" className="h-7 w-7 object-contain" /> : <Icon size={25} strokeWidth={1.8} aria-hidden="true" />}
          </div>
          <h2 id={titleId} className="font-mono text-xl font-bold leading-snug tracking-tight break-words">Open {linkData.title}?</h2>
          <p id={descriptionId} className="mt-2 font-sans text-sm leading-relaxed text-zinc-300">This link opens in a new tab. Your portfolio stays open here.</p>
          <p className="mt-4 rounded-lg border border-white/10 bg-white/10 px-3 py-3 font-mono text-xs leading-relaxed break-all text-zinc-300">{displayUrl}</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button type="button" onClick={onClose} ref={cancelRef} className="app-action-secondary font-mono">Cancel</button>
            <a href={linkData.href} target="_blank" rel="noopener noreferrer" onClick={onClose} className="app-action font-mono">Open link<ExternalLink size={15} aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </div>, document.body,
  );
}
