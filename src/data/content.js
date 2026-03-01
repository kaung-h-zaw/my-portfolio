import { FileText, Cpu, Folder, Mail } from "lucide-react";

export const DESKTOP_ICONS = [
  { id: "about", title: "About_Me", icon: FileText, type: "txt" },
  { id: "skills", title: "Skills_v2", icon: Cpu, type: "exe" },
  { id: "projects", title: "Projects", icon: Folder, type: "dir" },
  { id: "contact", title: "Contact", icon: Mail, type: "msg" },
];

export const PROJECTS_DATA = [
  {
    title: "Sendo",
    desc: "Lightweight file handoff via QR pairing. Optimized for Kobo/Kindle.",
    image: "/Sendo.webp",
    tags: ["Node.js", "Express", "ES5"],
    link: "https://sendo-ebook.vercel.app/",
    code: "https://github.com/kaung-h-zaw/SENDO/",
    date: "Oct 2024",
  },
  {
    title: "Kaung-Space",
    desc: "Personal portfolio built with React & Tailwind.",
    image: "/kaungspace.webp",
    tags: ["React", "Tailwind"],
    link: "https://kaung-space.vercel.app/",
    code: "https://github.com/kaung-h-zaw/my-portfolio",
    date: "Jan 2026",
  },
  {
    title: "FREE API NEXUS",
    date: "WIP 2026",
    desc: "A curated, open-source collection of free public APIs for developers.",
    tags: ["REACT", "TAILWIND", "PUBLIC APIs"],
    image: null,
    link: "#",
    code: "#",
  },
];

export const SKILLS_DATA = {
  Frontend: [
    { name: "React", size: "LIB" },
    { name: "JavaScript", size: "ES6" },
    { name: "Tailwind", size: "CSS" },
    { name: "HTML5", size: "XML" },
    { name: "Figma", size: "APP" },
  ],
  Backend: [
    { name: "Node.js", size: "ENV" },
    { name: "Express", size: "FW" },
    { name: "MongoDB", size: "DB" },
    { name: "Firebase", size: "BAAS" },
  ],
  Tools: [
    { name: "Git", size: "VCS" },
    { name: "GitHub", size: "HUB" },
    { name: "Agile", size: "METH" },
  ],
};
