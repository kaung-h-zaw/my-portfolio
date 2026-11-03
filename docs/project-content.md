# Project content and evidence

Project cards and their detail views use `src/data/content.js`. Keep each `id` stable so Back can restore focus to the right card.

Optional fields `contribution` (an array), `challenge`, and `learning` appear only when populated. The owner has deferred the personal sections for SendBook until they share their work. Add personal experience only after the owner confirms it. Missing sections and unavailable demo/repository actions are omitted from the UI.

Current evidence:

- Guinea Group Capstone: existing QUT/Guinea Group capstone description and contribution bullets in `src/components/apps/ExperienceApp.jsx`. No public demo or repository URL has been supplied.
- TubeParty: local `dc bot/tube-party-bot` and `dc bot/tubeparty-web` READMEs, package manifests, backend `index.js`, and `lib/recommendations.js`. The backend Git remote supplies the repository URL. No public demo URL or screenshot has been supplied.
- Linkfolio: local `linkfolio/README.md`, client/server package manifests, editor components, session helper, and public portfolio routes. No Git remote, public demo URL, or screenshot has been supplied.
- SendBook: https://github.com/kaung-h-zaw/SendBook. Its repository homepage matches the user-provided https://send-book.vercel.app/ demo. `package.json`, `public/index.html`, `app/api/upload/route.ts`, and `app/api/join/route.ts` support the current name, stack, transfer workflow, and validation details. The old SENDO repository returned 404.
- IMKAUNG: this repository and the live portfolio. The preview uses the current About window.

`sendbook-preview.jpg` and `imkaung-preview.jpg` are real browser captures. No capstone screenshot has been supplied, so that project has no invented preview.

The existing project dates are retained. TubeParty and Linkfolio omit dates until the owner supplies them. Confirm dates and personal contribution/challenge/learning text with the owner before changing them.
