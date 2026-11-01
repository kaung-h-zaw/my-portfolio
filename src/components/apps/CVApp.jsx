import React, { useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { Download, ExternalLink, ChevronLeft, ChevronRight, Minus, Plus, LoaderCircle } from "lucide-react";
import { CVIcon } from "../os/AppIcons";
import { AppHeader } from "./AppLayout";

GlobalWorkerOptions.workerSrc = workerUrl;

export default function CVApp() {
  const [pdf, setPdf] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState(0);
  const [status, setStatus] = useState("loading");
  const [pageText, setPageText] = useState("");
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const task = getDocument({ url: "/resume.pdf" });
    let active = true;
    task.promise.then((document) => { if (active) setPdf(document); })
      .catch(() => { if (active) setStatus("error"); });
    return () => { active = false; void task.destroy(); };
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!pdf || !width) return undefined;
    let active = true;
    let renderTask;
    async function renderPage() {
      setStatus("loading");
      setPageText("");
      try {
        const page = await pdf.getPage(pageNumber);
        if (!active) return;
        const viewport = page.getViewport({ scale: width / page.getViewport({ scale: 1 }).width * zoom });
        const canvas = canvasRef.current;
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        renderTask = page.render({ canvasContext: canvas.getContext("2d"), viewport,
          transform: pixelRatio === 1 ? null : [pixelRatio, 0, 0, pixelRatio, 0, 0] });
        await renderTask.promise;
        const text = await page.getTextContent();
        if (active) {
          setPageText(text.items.map((item) => `${item.str}${item.hasEOL ? "\n" : " "}`).join(""));
          setStatus("ready");
        }
      } catch (error) {
        if (active && error.name !== "RenderingCancelledException") setStatus("error");
      }
    }
    void renderPage();
    return () => { active = false; renderTask?.cancel(); };
  }, [pdf, pageNumber, width, zoom]);

  return (
    <div className="app-page">
      <AppHeader icon={CVIcon} file="resume.pdf" title="View CV" />
      <div className="cv-toolbar sticky top-0 z-10 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-black/15 bg-[#eeede9] p-2 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <a href="/resume.pdf" download="Kaung-Htet-Zaw-CV.pdf" className="app-action"><Download size={16} aria-hidden="true" />Download PDF</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open PDF in a new tab" className="app-action-secondary px-3"><ExternalLink size={16} aria-hidden="true" /><span className="hidden sm:inline">Open PDF</span><span className="sm:hidden">PDF</span></a>
        </div>
        <div className="flex flex-wrap items-center gap-1" aria-label="CV preview controls">
          {pdf?.numPages > 1 ? <>
          <button type="button" aria-label="Previous CV page" disabled={!pdf || pageNumber === 1} onClick={() => setPageNumber((n) => n - 1)} className="cv-control"><ChevronLeft size={17} /></button>
          <span className="px-1 text-xs tabular-nums" role="status">Page {pageNumber} of {pdf?.numPages ?? "…"}</span>
          <button type="button" aria-label="Next CV page" disabled={!pdf || pageNumber === pdf.numPages} onClick={() => setPageNumber((n) => n + 1)} className="cv-control"><ChevronRight size={17} /></button>
          </> : <span className="hidden sm:inline px-2 text-xs tabular-nums" role="status">{pdf ? "1 page" : "Loading…"}</span>}
          <span className="hidden sm:block mx-1 h-5 border-l border-black/15" aria-hidden="true" />
          <button type="button" aria-label="Zoom out CV" disabled={zoom <= 1} onClick={() => setZoom((z) => Math.max(1, z - 0.25))} className="cv-control"><Minus size={17} /></button>
          <button type="button" onClick={() => setZoom(1)} className="cv-control px-2 text-xs">{zoom === 1 ? "Fit width" : `${Math.round(zoom * 100)}%`}</button>
          <button type="button" aria-label="Zoom in CV" disabled={zoom >= 2} onClick={() => setZoom((z) => Math.min(2, z + 0.25))} className="cv-control"><Plus size={17} /></button>
        </div>
      </div>
      <p className="font-sans text-sm text-black/65">Preview the CV below, or download a copy as a PDF.</p>
      <div ref={containerRef} className="w-full max-w-[850px] mx-auto">
        {status === "loading" && <p role="status" className="flex items-center gap-2 text-sm py-3"><LoaderCircle size={16} className="animate-spin" />Loading CV preview…</p>}
        {status === "error" && <p role="alert" className="app-tile font-sans text-sm">The preview could not load. Use Open PDF or Download PDF above to view the CV.</p>}
        <div className="overflow-auto rounded-lg border border-black/15 bg-white shadow-sm" aria-label="CV document preview" aria-busy={status === "loading"}>
          <canvas ref={canvasRef} role="img" aria-label={`CV preview, page ${pageNumber}`} className={status === "ready" ? "block" : "hidden"} />
        </div>
        {pageText && <details className="app-panel mt-4"><summary className="cursor-pointer text-sm font-bold">Read this page as text</summary><p className="mt-4 whitespace-pre-line font-sans text-sm leading-relaxed">{pageText}</p></details>}
      </div>
    </div>
  );
}
