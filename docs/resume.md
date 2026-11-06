# Resume source and verification

The portfolio's View CV action opens `public/resume.pdf`. `public/resume.txt` is a plain-text companion for application forms and editing. Both are built from `docs/resume-content.json`:

```sh
uv run scripts/build_resume.py
```

The script declares its Python dependencies inline, so it does not change the website's npm dependencies. It writes page renders and extracted text to the ignored `tmp/resume-qa/` directory. Review every rendered page after content or layout changes.

## Content choices

- Title: Full Stack Developer.
- Experience: the industry capstone is clearly labeled as a capstone role, emphasizing client work and full-stack development, separate from personal projects. Omit semester counts and numbered phase labels.
- Projects: TubeParty, Linkfolio, and SendBook. Missing project dates remain omitted. SendBook is described through its documented functionality without inventing personal contribution details.
- QUT: Education focuses on Computer Science studies and coursework. Put completed industry capstone responsibilities and client work under Professional Experience. Keep client screenshots, implementation links, and administrative details private.
- HND: the private award certificate confirms Distinction and a September 2022 award date.
- Certifications: the three Codecademy engineering career paths and Meta's Front-End Developer certificate. Certificate names in the PDF link to their existing public verification pages. The English course stays on the portfolio but is omitted from the technical resume to keep it focused.
- Contact links: use the portfolio's current canonical URL, complete LinkedIn URL, and GitHub profile.

## ATS formatting and practical limits

The PDF uses a single column, plain section headings, selectable text, and contact information in the document body. It has no photographs, icons, tables, text boxes, or document headers/footers. This follows the formatting concerns described in [Greenhouse's resume parsing guidance](https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse).

The generator checks extracted section order and key content with both PyMuPDF and pypdf. It also checks profile and certificate link targets, text boundaries, absence of image content, and a file size below 2.5 MB. These are local extraction and formatting checks, not a live test in an employer's ATS and not an ATS ranking score. Keywords should be tailored truthfully to each job description; use the file format requested by the employer.
