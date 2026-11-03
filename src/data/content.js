import { FileText, Cpu, Folder, Mail } from "lucide-react";

export const DESKTOP_ICONS = [
  { id: "about", title: "About_Me", icon: FileText, type: "txt" },
  { id: "skills", title: "Skills_v2", icon: Cpu, type: "exe" },
  { id: "projects", title: "Projects", icon: Folder, type: "dir" },
  { id: "contact", title: "Contact", icon: Mail, type: "msg" },
];

export const PROJECTS_DATA = [
  {
    id: "qut-research-platform",
    title: "Guinea Group Capstone",
    category: "QUT capstone",
    featured: true,
    desc: "A video and survey platform for The Guinea Group, developed during QUT’s capstone program for pressure-based decision-making research.",
    purpose: "Support research participants through video and survey tasks, while giving researchers tools for participant data, survey management, reporting, and exports.",
    context: "The Guinea Group & Queensland University of Technology",
    team: "Four-person capstone team",
    role: "Full-Stack Developer",
    contribution: [
      "Built and refined authentication, survey selection, embedded video playback, and response interfaces with JavaScript, React, and Tailwind.",
      "Contributed to Express and MySQL features for participant data, survey management, reporting, and exports.",
      "Worked with Docker and Python-based services supporting audio emotion analysis, camera-based emotion capture, and eye-tracking workflows.",
      "Collaborated through Agile planning, weekly client discussions, and fortnightly supervisor reviews across two semesters.",
    ],
    features: ["Video and survey task flows", "Participant data management", "Reporting and exports", "Multimodal research workflows"],
    tags: ["React", "Tailwind CSS", "Express", "MySQL", "Python", "Docker", "AWS"],
    date: "Feb–Nov 2024",
  },
  {
    id: "tubeparty",
    title: "TubeParty",
    category: "Discord music bot & dashboard",
    desc: "A Discord music bot with a web dashboard for shared playback, queue management, favorites, and music discovery.",
    purpose: "Let Discord communities listen together and manage their server’s music through a browser dashboard connected to the bot.",
    features: ["Discord login and manageable server selection", "Play, pause, skip, and reorder the shared queue", "Favorites and artist discovery", "Recommendations based on listening history", "Live playback and dashboard updates", "Responsive desktop and mobile controls"],
    workflow: [
      { title: "Open a server", detail: "Sign in with Discord and choose a server you manage to open its music dashboard." },
      { title: "Build a shared queue", detail: "Search for music, add tracks, and manage playback together. Save favorites to return to songs later." },
      { title: "Discover the next track", detail: "Explore suggestions seeded by the current song, favorites, and server listening history, then add a pick directly to the queue." },
    ],
    image: "/tubeparty-preview.jpg",
    imageCaption: "TubeParty · international music search with video artwork",
    decisions: [
      { title: "Discord-aware access", detail: "NextAuth handles Discord login, and the dashboard lists servers where the user has Manage Server or Administrator permissions." },
      { title: "Separate playback and interface", detail: "A Next.js dashboard connects to an Express backend. Discord.js and Lavalink handle voice playback, while WebSockets deliver live updates." },
      { title: "Music discovery with fallbacks", detail: "Recommendations use the current song, favorites, and listening history. Cached radio results fall back to artist searches and saved tracks when discovery is unavailable." },
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Discord.js", "Lavalink", "WebSockets"],
    code: "https://github.com/kaung-h-zaw/tube-party-bot",
  },
  {
    id: "linkfolio",
    title: "Linkfolio",
    category: "Resume & portfolio builder",
    desc: "A resume and portfolio builder with editable templates, resume import, public portfolio pages, messaging, and analytics.",
    purpose: "Help people turn their professional experience into a resume and a shareable portfolio, using the same saved content for both.",
    features: ["Template-based resume editor with live preview", "PDF, Word, and text resume import", "Portfolio generation from saved resumes", "Custom public URLs and privacy controls", "Visitor messages and portfolio analytics", "Account limits, premium templates, and administration"],
    workflow: [
      { title: "Create or import a resume", detail: "Choose a template and enter professional details, or import an existing PDF, Word, or text resume and review the extracted content." },
      { title: "Edit and reuse your content", detail: "Adjust sections and design in the editor, then generate a portfolio from the saved resume without re-entering your professional history." },
      { title: "Publish and follow up", detail: "Choose a custom URL, make the portfolio public, and use the workspace to review visitor messages and analytics." },
    ],
    image: "/linkfolio-preview.jpg",
    imageCaption: "Linkfolio · landing page and example resume preview",
    decisions: [
      { title: "Shared professional content", detail: "Resume and portfolio views use the same saved document, so users can reuse their experience and education across both formats." },
      { title: "Relational storage across environments", detail: "The Express API stores accounts and professional content in SQLite locally, with PostgreSQL support for Supabase deployments." },
      { title: "Account and publishing boundaries", detail: "Server-side ownership checks protect saved documents. Cookie-based sessions authenticate users, while public portfolio routes expose published content, contact messages, and analytics events." },
    ],
    tags: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "SQLite", "PostgreSQL"],
  },
  {
    id: "sendbook",
    title: "SendBook",
    category: "E-reader file transfer",
    desc: "Temporary ebook transfer through QR pairing or a four-character code, designed for Kindle and Kobo workflows.",
    purpose: "Move an ebook from a sender to an e-reader through a short-lived browser session, without requiring an account.",
    features: ["QR or four-character pairing", "One-to-one ebook transfer", "No account required", "Automatic file cleanup", "EPUB, MOBI, AZW, AZW3, PDF, and TXT support"],
    decisions: [
      { title: "Separate sender and receiver flows", detail: "Receivers create a short-lived session. Senders join through a QR link or code to transfer one file at a time." },
      { title: "Temporary storage", detail: "The application uses Redis for session state and Vercel Blob for files, with cleanup after download, replacement, disconnect, or inactivity." },
      { title: "Upload validation", detail: "The upload route checks the session token, expiration, file extension, and size before accepting a file." },
    ],
    image: "/sendbook-preview.jpg",
    tags: ["Next.js", "TypeScript", "Redis", "Vercel Blob"],
    link: "https://send-book.vercel.app/",
    code: "https://github.com/kaung-h-zaw/SendBook",
    date: "Oct 2024",
  },

];

export const SKILLS_DATA = {
  Frontend: [
    { name: "React", type: "UI library" },
    { name: "Next.js", type: "React framework" },
    { name: "JavaScript", type: "Language" },
    { name: "TypeScript", type: "Language" },
    { name: "Tailwind CSS", type: "Styling" },
    { name: "HTML5", type: "Markup" },
  ],
  Backend: [
    { name: "Node.js", type: "Runtime" },
    { name: "Express", type: "API framework" },
    { name: "Firebase", type: "Backend service" },
  ],
  Databases: [
    { name: "MongoDB", type: "Document database" },
    { name: "PostgreSQL", type: "Relational database" },
    { name: "MySQL", type: "Relational database" },
    { name: "SQLite", type: "Embedded database" },
  ],
  Tools: [
    { name: "Git", type: "Version control" },
    { name: "GitHub", type: "Code collaboration" },
    { name: "Figma", type: "Interface design" },
    { name: "Agile", type: "Delivery method" },
  ],
};
