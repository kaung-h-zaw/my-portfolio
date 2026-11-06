import { EducationIcon } from "../os/AppIcons";
import React, { useState } from "react";
import { Award, BadgeCheck, MapPin, Languages, GraduationCap } from "lucide-react";
import LinkConfirmationModal from "../os/LinkConfirmationModal";
import { AppHeader, AppFooter, Tags } from "./AppLayout";
import { CERTIFICATIONS_DATA } from "../../data/content";

const CERTIFICATE_EMBLEMS = {
  "Full-Stack Engineer": "</>",
  "Back-End Engineer": "{ }",
  "Front-End Engineer": "<>",
};

export default function EducationApp() {
  const [activeLinkData, setActiveLinkData] = useState(null);
  const education = [
    {
      degree: "Information Technology (Computer Science)",
      school: "Queensland University of Technology",
      location: "Brisbane, Australia",
      period: "Jul 2023 - Dec 2024",
      description:
        "Computer Science coursework in software development, web computing, programming paradigms, and IT project management.",
      skills: ["Mobile App Dev", "Data Structures", "Full-Stack", "Agile"],
    },
    {
      degree: "Higher National Diploma (Computing)",
      school: "GUSTO College",
      location: "Yangon, Myanmar",
      period: "Nov 2019 - Feb 2023",
      description:
        "Focus on System Analysis, Networking, and Web Development. Graduated with Distinction.",
      skills: ["System Analysis", "Web Dev", "Networking", "Database Design"],
    },
  ];

  const languages = [
    { name: "Burmese", level: "Native" },
    { name: "English", level: "B2 · Upper intermediate" },
  ];

  return (
    <>
      <LinkConfirmationModal linkData={activeLinkData} onClose={() => setActiveLinkData(null)} />
      <div className="app-page">
        <AppHeader icon={EducationIcon} file="education.log" title="Academic History" badge={`${education.length} education entries`} />
        <p className="app-body">Education, certifications, and languages.</p>
        <section aria-label="Education history" className="app-grid-two">
            {education.map((item) => (
              <article key={item.degree} className="app-panel">
                <span className="app-badge inline-block mb-4">{item.period}</span>
                <h2 className="text-lg sm:text-xl font-bold leading-snug mb-2">{item.degree}</h2>
                <p className="font-sans text-base font-semibold text-zinc-200 mb-2">{item.school}</p>
                {item.status && <p className="font-sans text-sm text-zinc-300 mb-3">{item.status}</p>}
                <p className="flex items-center gap-2 font-sans text-sm text-zinc-300 mb-4"><MapPin size={14} aria-hidden="true" />{item.location}</p>
                <p className="app-body mb-5">{item.description}</p>
                <Tags items={item.skills} label={`${item.degree} areas of study`} />
              </article>
            ))}
        </section>
        <section aria-labelledby="education-certifications">
          <div className="education-section-heading">
            <h2 id="education-certifications" className="education-section-title"><Award size={18} aria-hidden="true" />Certifications</h2>
            <span className="education-section-count">{CERTIFICATIONS_DATA.length} credentials</span>
          </div>
          <div className="education-credential-gallery">
            {CERTIFICATIONS_DATA.map((certificate, index) => (
              <article key={certificate.name} aria-labelledby={`credential-title-${index}`} className="education-gallery-item">
                <span className="education-gallery-emblem" aria-hidden="true">
                  {CERTIFICATE_EMBLEMS[certificate.name] || (certificate.issuer === "QUT College" ? <GraduationCap size={20} strokeWidth={1.5} /> : <Award size={20} strokeWidth={1.5} />)}
                </span>
                <div className="education-gallery-copy">
                  <h3 id={`credential-title-${index}`} className="education-gallery-title">{certificate.name}</h3>
                  <p className="education-gallery-meta">{certificate.issuer}</p>
                  {certificate.date && <p className="education-gallery-meta">{certificate.date}</p>}
                  {certificate.credentialId && <p className="education-gallery-meta break-words">Credential ID: {certificate.credentialId}</p>}
                </div>
                <div className="education-gallery-actions">
                  {certificate.link ? (
                    <button type="button" onClick={(event) => setActiveLinkData({ title: certificate.name, href: certificate.link, icon: Award, returnFocus: event.currentTarget })}
                      aria-label={`Credentials for ${certificate.name}`} className="app-action-secondary education-gallery-credential">
                      <BadgeCheck size={16} strokeWidth={1.6} aria-hidden="true" />Credentials
                    </button>
                  ) : <span className="education-gallery-note">Certificate</span>}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section aria-labelledby="education-languages" className="education-language-strip">
          <h2 id="education-languages" className="education-section-title"><Languages size={18} aria-hidden="true" />Languages</h2>
          <dl className="education-language-list">
            {languages.map((language) => (
              <div key={language.name}>
                <dt>{language.name}</dt>
                <dd>{language.level}</dd>
              </div>
            ))}
          </dl>
        </section>
        <AppFooter file="education.log">Myanmar · Australia</AppFooter>
      </div>
    </>
  );
}
