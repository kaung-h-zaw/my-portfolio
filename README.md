# My Personal Portfolio

A modern, interactive personal portfolio website showcasing my projects, skills, and experience as a frontend web developer. Built to be responsive across all devices with smooth animations and a sleek user interface.

## Tech Stack

- Framework: React 18 + Vite
- Styling: Tailwind CSS
- Animations: Framer Motion
- UI Components: Lucide React & React Icons
- Contact Form: @emailjs/browser
- Interactive UI: React Draggable
- Markdown: React Markdown & Remark GFM

## Features

- Fully responsive design for mobile, tablet, and desktop viewing
- Interactive and draggable UI components
- Smooth page transitions and scroll-based animations
- Functional contact form integrated with EmailJS
- Project case studies with screenshots, features, technologies, and documented technical decisions
- Shareable case-study URLs such as `/#/projects/tubeparty`, with browser history, direct opening, and copy-link controls
- Featured QUT capstone with existing team contribution details

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Use Node.js 22.22.2, as pinned in `.node-version`. The project supports Node.js 22.12+ and 24.x.

### Installation

1. Clone the repository
```
git clone https://github.com/kaung-h-zaw/my-portfolio.git
```

2. Navigate into the directory
```
cd my-portfolio
```

3. Install dependencies
```
npm install
```


5. Start the development server
```
npm run dev
```

## Cloudflare Workers build

The connected Worker is `imkaung`. `wrangler.json` deploys the Vite `dist` folder as static assets with SPA fallback.

- Production branch: `main`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: repository root
- Node.js version: `22.22.2` (set in `.node-version`)

Use the Workers build settings above for the connected Worker. The Pages settings below apply only to a separate Pages project.

## Cloudflare Pages build

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: repository root
- Node.js version: `22.22.2` (set in `.node-version`)

If the dashboard defines `NODE_VERSION`, set it to `22.22.2` to match the repository.
Verify a clean build locally with `npm ci`, `npm run lint`, and `npm run build`.

## Browser regression checks

Run `npx playwright install chromium` once, then `npm run test:e2e`.
The suite builds the production app and checks wide monitor, desktop, short laptop, tablet, and touch phone layouts in Chromium, plus an iPhone viewport in WebKit. It covers boot branding, desktop About startup, and native home-first startup, a single visible window during delayed app loading, Desktop/Home navigation, closing and reopening, case-study keyboard focus, CV links opening the original PDF in a new tab without desktop or dock shortcuts, phone rotation, iPhone safe-area and scroll spacing, six-language greetings and reduced motion, native phone/tablet app shells and home grids, matching illustrated profile icons, redesigned page overflow, compact laptop spacing, centered wide-screen windows, maximize/restore, and restored-window columns, certificate and external-link dialogs, and mocked Contact form success/error feedback. No real email is sent by the tests.

`.github/workflows/ci.yml` runs lint and the browser checks on pushes and pull requests to `main`. Failures save browser screenshots and traces as workflow artifacts. Test output is ignored by Git.

Project content and source references: [docs/project-content.md](docs/project-content.md).
Resume source and rebuilding: [docs/resume.md](docs/resume.md).
Google account steps still required for indexing: [docs/search-console.md](docs/search-console.md).

## License

Copyright (c) 2026 Kaung Htet Zaw. All Rights Reserved.

This project is a personal portfolio. The source code, design, and content are proprietary and may not be copied, distributed, modified, or used without explicit written permission from the author. You are granted permission to view the code for the purpose of evaluating the author's skills.

## Contact

Kaung Htet Zaw - [LinkedIn](https://www.linkedin.com/in/kaung-h-zaw/)

Project Link: https://github.com/kaung-h-zaw/my-portfolio
