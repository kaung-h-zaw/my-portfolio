# Adding certificate credentials

Edit `CERTIFICATIONS_DATA` in `src/data/content.js`. Each entry appears in Education → Certifications.

Certificates use the selected credential gallery style: centered emblem tiles on desktop and compact rows on phones. All credentials appear together; dark “Credentials” buttons with badge icons open their public verification links. Syllabus actions are omitted. Languages remain a compact row underneath.

- `name`: the certificate title.
- `type`: optional category, such as `Career Path`.
- `issuer`: the organization that issued the certificate.
- `date`: the actual completion month and year.
- `credentialId`: the credential ID exactly as shown by the provider, if available.
- `link`: the public certificate verification URL, or a PDF path such as `/certificates/back-end-engineer.pdf` for a file placed in `public/certificates/`.

Copy the certificate's public sharing or verification URL from your learning provider. Open it while signed out to check that visitors can access it. Use the individual certificate URL, rather than your private dashboard URL. A credential ID is optional; a public verification link lets visitors check the credential.

The three Codecademy career paths include public verification links and completion months. Add a separate credential ID only if the provider supplies one; the public link already lets visitors verify the certificate. Empty fields and unavailable links stay hidden.
