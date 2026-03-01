import React, { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Download,
  Check,
  Mail,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";

const TYPING_SEQUENCE = ["Kaung Htet Zaw", "Alias: Kaung!"];
const STACK = [
  "React",
  "TypeScript",
  "Node.js",
  "SQL",
  "Tailwind CSS",
  "JavaFX",
];

export default function AboutApp() {
  const [copied, setCopied] = useState(false);
  const email = "kaunghtetzaw.inbox@gmail.com";

  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const i = loopNum % TYPING_SEQUENCE.length;
    const fullText = TYPING_SEQUENCE[i];

    const tick = () => {
      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(30);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(80);
      }
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum((n) => n + 1);
        setTypingSpeed(300);
      }
    };

    const timer = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="font-mono text-black min-h-full flex flex-col gap-4 sm:gap-6 p-3 sm:p-4 md:p-6 overflow-y-auto overflow-x-hidden">
      {/* HEADER */}
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-4 md:gap-6">
          {/* Photo */}
          {/* Photo - Smaller on mobile */}
          <div className="shrink-0 relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-lg overflow-hidden border border-black/10 bg-white/30">
              <picture>
                <source srcSet="/me-nb.webp" type="image/webp" />
                <img
                  src="/me-nb.png"
                  alt="Kaung Htet Zaw Profile Photo"
                  loading="eager"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </picture>
            </div>
            {/* Online dot */}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-gray-300/60" />
          </div>

          {/* Name & Role */}
          <div className="flex-1 min-w-0 flex flex-col justify-center h-full pt-1">
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-black/60 mb-1 md:mb-2">
              › profile.exe
            </p>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black uppercase tracking-tight leading-none text-black/90">
              {text}
              <span className="inline-block w-[2px] h-[1em] bg-black/60 ml-1 align-middle animate-pulse" />
            </h1>
            <div className="mt-2 md:mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="inline-block text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest bg-black/80 text-white px-2.5 py-1 sm:px-3 md:px-4 md:py-1.5 rounded-md">
                Junior Developer
              </span>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center mt-1 -ml-1">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm md:text-base text-black/70 hover:text-black transition-colors group cursor-pointer"
            title="Click to copy email"
          >
            <div className="p-1.5 bg-black/5 rounded-md group-hover:bg-black/10 transition-colors shrink-0">
              {copied ? (
                <Check size={14} strokeWidth={2.5} className="text-green-600" />
              ) : (
                <Mail size={14} strokeWidth={1.5} />
              )}
            </div>
            <span className="font-normal tracking-wide border-b border-dashed border-black/30 group-hover:border-black/60 pb-0.5 transition-colors truncate">
              {email}
            </span>
            <span
              className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded transition-all duration-300 shrink-0 ${
                copied
                  ? "bg-green-100 text-green-700 opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-2 hidden sm:inline-block"
              }`}
            >
              Copied!
            </span>
          </button>
        </div>
      </div>

      <div className="border-t border-black/10" />

      {/* MAIN GRID */}
      <div className="flex flex-wrap gap-6 md:gap-8 flex-1">
        {/* LEFT */}
        <div className="flex flex-col gap-6 md:gap-8 flex-[1_1_350px]">
          {/* Bio text */}
          <div>
            <Label>Introduction</Label>
            <p className="text-sm md:text-base leading-relaxed text-black/80">
              I don't just write code; I architect systems. My work sits at the
              intersection of rigorous logic and bold aesthetics — from
              optimizing React render cycles to designing CLI-inspired
              interfaces.
            </p>
          </div>

          {/* Experience Section */}
          <div>
            <Label>Recent Experience</Label>
            <div className="space-y-4">
              <div className="group">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm md:text-base font-bold text-black/90">
                    Frontend Developer
                  </h3>
                  <span className="text-xs md:text-sm text-black/50 whitespace-nowrap mt-0.5">
                    2024
                  </span>
                </div>
                <p className="text-xs md:text-sm font-medium text-black/60 mb-2 uppercase tracking-wide">
                  QUT Capstone Project · Guinea Group
                </p>
                <p className="text-sm md:text-base leading-relaxed text-black/80">
                  Led frontend development in a 4-person team for a client
                  consulting project hosted by Queensland University of
                  Technology. Collaborated with the Guinea Group to deliver a
                  production-ready web application, focusing on React
                  architecture, responsive design, and team coordination.
                </p>
              </div>

              <div className="border-t border-black/5 pt-4 group">
                <h3 className="text-sm md:text-base font-bold text-black/90 mb-2">
                  Current Focus
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-black/80">
                  Building full-stack MERN applications, exploring modern React
                  patterns, and creating portfolio projects that showcase
                  scalable architecture and clean design principles.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6 md:gap-8 flex-[1_1_350px]">
          {/* Stack */}
          <div>
            <Label>Core Stack</Label>
            <div className="grid grid-cols-2 gap-y-2.5 md:gap-y-3 gap-x-3 md:gap-x-4">
              {STACK.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-black/80"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-black/40 shrink-0" />
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Resume */}
          <a
            href="/resume.pdf"
            target="_blank"
            className="flex items-center justify-between px-4 md:px-5 py-3 md:py-4 bg-black/5 border border-black/10 rounded hover:bg-black/10 hover:border-black/20 transition-all group"
          >
            <div>
              <div className="text-sm md:text-base font-bold uppercase tracking-wider text-black/90">
                Download CV
              </div>
              <div className="text-xs text-black/50 mt-1 uppercase tracking-widest">
                PDF · Updated 2026
              </div>
            </div>
            <Download
              size={18}
              strokeWidth={1.5}
              className="text-black/50 group-hover:text-black transition-colors"
            />
          </a>

          {/* Socials */}
          <div>
            <Label>Network</Label>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/kaung-h-zaw"
                target="_blank"
                rel="noreferrer"
                className="flex flex-[1_1_200px] items-center gap-3 p-3 border border-black/10 rounded hover:border-black/30 hover:bg-black/5 transition-all group min-w-0"
              >
                <div className="p-1.5 bg-black/5 rounded group-hover:bg-[#0077b5]/10 transition-colors shrink-0">
                  <Github
                    size={16}
                    strokeWidth={1.5}
                    className="text-black/80 group-hover:text-black"
                  />
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <p className="text-xs uppercase tracking-widest text-black/50 mb-0.5">
                    Github
                  </p>
                  <p className="text-sm text-black/80 truncate font-medium">
                    @kaung-h-zaw
                  </p>
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-black/30 group-hover:text-black/70 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all shrink-0"
                />
              </a>

              <a
                href="https://linkedin.com/in/kaung-h-zaw"
                target="_blank"
                rel="noreferrer"
                className="flex flex-[1_1_200px] items-center gap-3 p-3 border border-black/10 rounded hover:border-black/30 hover:bg-black/5 transition-all group min-w-0"
              >
                <div className="p-1.5 bg-black/5 rounded group-hover:bg-[#0077b5]/10 transition-colors shrink-0">
                  <Linkedin
                    size={16}
                    strokeWidth={1.5}
                    className="text-black/80 group-hover:text-[#0077b5]"
                  />
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <p className="text-xs uppercase tracking-widest text-black/50 mb-0.5">
                    LinkedIn
                  </p>
                  <p className="text-sm text-black/80 truncate font-medium">
                    @kaung-h-zaw
                  </p>
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-black/30 group-hover:text-black/70 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all shrink-0"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t border-black/10 pt-4 mt-auto flex justify-between items-center text-[10px] md:text-xs uppercase tracking-widest text-black/40">
        <span>© 2026 Kaung Htet Zaw</span>
        <span>v2.0</span>
      </div>
    </div>
  );
}

function Label({ children }) {
  return (
    <p className="text-xs md:text-sm uppercase tracking-widest text-black/50 mb-3 md:mb-4 border-b border-black/10 pb-2">
      {children}
    </p>
  );
}
