# Project content and evidence

Project cards and their detail views use `src/data/content.js`. Keep each `id` stable so Back can restore focus to the right card.

Each case study is directly accessible at `/#/projects/<id>`, for example `/#/projects/tubeparty`. The Copy project link button uses the current host, so local and deployed previews share the correct URL. Hash routing works with the existing static hosting. Browser Back/Forward restores the selected section and project; unknown project IDs show a recovery view. Project titles also update the browser tab.

The QUT case study includes a “What the platform supports” section based on the existing contribution and feature descriptions. These describe implemented capabilities; they do not claim production adoption, performance metrics, research results, or a grade. The owner confirmed that the company project is confidential. Keep the high-level portfolio overview shareable, but do not publish client screenshots, source code, or live demo links. `confidential: true` displays a privacy note and suppresses project access links.

Optional fields `contribution` (an array), `challenge`, and `learning` appear only when populated. The owner has deferred the personal sections for SendBook until they share their work. Add personal experience only after the owner confirms it. Missing sections and unavailable demo/repository actions are omitted from the UI.

Current evidence:

- Guinea Group Capstone: existing QUT/Guinea Group capstone description and contribution bullets in `src/components/apps/ExperienceApp.jsx`. No public demo or repository URL has been supplied.
- TubeParty: local `dc bot/tube-party-bot` and `dc bot/tubeparty-web` READMEs, package manifests, backend `index.js`, and `lib/recommendations.js`. The backend Git remote supplies the repository URL. No public demo URL has been supplied.
- Linkfolio: local `linkfolio/README.md`, client/server package manifests, editor components, session helper, and public portfolio routes. No Git remote or public demo URL has been supplied.
- SendBook: https://github.com/kaung-h-zaw/SendBook. Its repository homepage matches the user-provided https://send-book.vercel.app/ demo. `package.json`, `public/index.html`, `app/api/upload/route.ts`, and `app/api/join/route.ts` support the current name, stack, transfer workflow, and validation details. The old SENDO repository returned 404.

`sendbook-preview.jpg`, `tubeparty-preview.jpg`, and `linkfolio-preview.jpg` are real browser captures. TubeParty shows the guest-accessible YouTube search screen with Bruno Mars results and loaded video thumbnails from the local Next.js app; Linkfolio shows its local landing page and example resume. No playback actions or account changes were made during capture. The KAUNG self-portfolio entry was removed to keep the archive focused on four distinct projects. The confidential capstone intentionally has no screenshot.

Academic documents in the owner's private Degree folder confirm the HND distinction and the official English course title, “English for Academic Purposes 2 Extended.” The owner confirmed capstone completion and wants its hands-on industry experience presented in Experience: full-stack development in a four-person team, with client meetings and supervisor reviews. Keep Education focused on the Computer Science program and coursework. Describe the client work as an industry capstone, without assuming it was a formally titled internship. Omit semester counts, personal administrative details, and numbered phase labels. Only claim an awarded qualification or final grade when confirmed. Academic PDFs, student IDs, and scans remain outside the public portfolio.

The downloadable `public/resume.pdf` uses the same studies-focused wording and the Full Stack Developer title. It includes professional experience, three personal projects, technical certifications, and education in a single-column layout. The English course remains on the portfolio; the resume prioritizes technical certifications relevant to developer applications. Edit `docs/resume-content.json` and run `uv run scripts/build_resume.py` to update the PDF and its plain-text companion together; see `docs/resume.md`.

The existing project dates are retained. TubeParty and Linkfolio omit dates until the owner supplies them. Confirm dates and personal contribution/challenge/learning text with the owner before changing them.

TubeParty and Linkfolio include source-backed workflow steps rendered as “How it works”. These describe application behavior, not personal contribution or learning claims.
