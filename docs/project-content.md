# Project content and evidence

Project cards and their detail views use `src/data/content.js`. Keep each `id` stable so Back can restore focus to the right card.

Optional fields `contribution` (an array), `challenge`, and `learning` appear only when populated. The owner has deferred the personal sections for JourneyHub and SendBook until they share their work. Add personal experience only after the owner confirms it. Missing sections and unavailable demo/repository actions are omitted from the UI.

Current evidence:

- Guinea Group Capstone: existing QUT/Guinea Group capstone description and contribution bullets in `src/components/apps/ExperienceApp.jsx`. No public demo or repository URL has been supplied.
- JourneyHub: https://github.com/kaung-h-zaw/JourneyHub, its README, `api/groq.js`, and `src/hooks/useTripGenerator.js`. These support the feature list and technical decisions. They do not establish the owner's personal learning or contribution scope.
- SendBook: https://github.com/kaung-h-zaw/SendBook. Its repository homepage matches the user-provided https://send-book.vercel.app/ demo. `package.json`, `public/index.html`, `app/api/upload/route.ts`, and `app/api/join/route.ts` support the current name, stack, transfer workflow, and validation details. The old SENDO repository returned 404.
- IMKAUNG: this repository and the live portfolio. The preview uses the current About window.

`journeyhub-preview.jpg`, `sendbook-preview.jpg`, and `imkaung-preview.jpg` are real browser captures. No capstone screenshot has been supplied, so that project has no invented preview.

The existing project dates are retained. Confirm dates and personal contribution/challenge/learning text with the owner before changing them.
