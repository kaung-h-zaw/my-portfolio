import React from "react";
import { Download, ExternalLink, Printer } from "lucide-react";

export default function ResumeApp() {
  return (
    <div className="flex flex-col h-full w-full bg-neutral-100">
      {/* TOOLBAR */}
      <div className="h-10 border-b-2 border-black bg-white flex items-center justify-between px-3 shrink-0 select-none">
        <div className="text-xs font-black uppercase tracking-wider">
          PDF Viewer: Resume.pdf
        </div>
        <div className="flex gap-2">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase border border-transparent hover:border-black hover:bg-gray-100 transition-all"
            title="Open in New Tab"
          >
            <ExternalLink size={14} />{" "}
            <span className="hidden sm:inline">Open New Tab</span>
          </a>
          <a
            href="/resume.pdf"
            download="Kaung_Htet_Zaw_Resume.pdf"
            className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase bg-black text-white border border-black hover:bg-white hover:text-black transition-all"
            title="Download PDF"
          >
            <Download size={14} />{" "}
            <span className="hidden sm:inline">Download</span>
          </a>
        </div>
      </div>

      {/* PDF EMBED AREA */}
      <div className="flex-1 bg-neutral-700 relative overflow-hidden">
        {/* The PDF Iframe */}
        <iframe
          src="/resume.pdf#view=FitH"
          className="w-full h-full border-0 block"
          title="Resume PDF"
        />

        {/* MOBILE FALLBACK: 
            Some mobile browsers force-download PDFs instead of showing them in iframes.
            This overlay ensures mobile users can still access the file cleanly. 
        */}
        <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center bg-white p-6 text-center z-10">
          <div className="text-sm font-bold uppercase mb-2">
            PDF Preview Unavailable on Mobile
          </div>
          <p className="text-xs text-gray-500 mb-6 max-w-[200px]">
            Mobile browsers often block embedded PDFs. Please open the file
            directly.
          </p>
          <a
            href="/resume.pdf"
            target="_blank"
            className="bg-black text-white px-6 py-4 font-black uppercase text-xs border-2 border-black shadow-[4px_4px_0_0_black] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_black] transition-all"
          >
            Open Resume PDF
          </a>
        </div>
      </div>
    </div>
  );
}
