import React, { useState } from "react";
import { GraduationCap, Award, BookOpen, ExternalLink, MapPin } from "lucide-react";
import LinkConfirmationModal from "../os/LinkConfirmationModal";
import { AppHeader, AppFooter, PanelTitle, Tags } from "./AppLayout";

export default function EducationApp() {
  const [activeLinkData, setActiveLinkData] = useState(null);
  const education = [
    {
      degree: "Bachelor of IT (Computer Science)",
      school: "Queensland University of Technology",
      location: "Brisbane, Australia",
      period: "Jul 2023 - Dec 2024",
      description:
        "Specialized in Software Engineering and Data Structures. Completed intensive Capstone project delivering a real-world enterprise solution.",
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

  const certifications = [
    {
      name: "Meta Front-End Developer Professional Certificate",
      issuer: "Coursera",
      date: "Oct 2024",
      link: "https://coursera.org/verify/professional-cert/NQPRLMXDWBTB",
    },
    {
      name: "English for Academic Purposes (Advanced)",
      issuer: "QUT College",
      date: "Jun 2023",
      link: null,
    },
  ];

  const languages = [
    { name: "Burmese", level: "Native" },
    { name: "English", level: "Upper Int. (B2)" },
  ];

  return (
    <>
      <LinkConfirmationModal linkData={activeLinkData} onClose={() => setActiveLinkData(null)} />
      <div className="app-page">
        <AppHeader icon={GraduationCap} file="education.log" title="Academic History" badge={`${education.length} qualifications`} />
        <p className="app-body">Education, certifications, and languages.</p>
        <div className="app-split">
          <div className="space-y-4 sm:space-y-5">
            {education.map((item) => (
              <article key={item.degree} className="app-panel">
                <span className="app-badge inline-block mb-4">{item.period}</span>
                <h2 className="text-lg sm:text-xl font-bold leading-snug mb-2">{item.degree}</h2>
                <p className="font-sans text-base font-semibold text-black/75 mb-2">{item.school}</p>
                <p className="flex items-center gap-2 font-sans text-sm text-black/65 mb-4"><MapPin size={14} aria-hidden="true" />{item.location}</p>
                <p className="app-body mb-5">{item.description}</p>
                <Tags items={item.skills} label={`${item.degree} areas of study`} />
              </article>
            ))}
          </div>
          <div className="space-y-4 sm:space-y-5">
            <section className="app-panel">
              <PanelTitle icon={Award}>Certifications</PanelTitle>
              <div className="space-y-3">
                {certifications.map((certificate) => (
                  <article key={certificate.name} className="app-tile">
                    <h3 className="text-sm font-bold leading-relaxed mb-3">{certificate.name}</h3>
                    <p className="font-sans text-sm text-black/65">{certificate.issuer} · {certificate.date}</p>
                    {certificate.link && (
                      <button type="button" onClick={() => setActiveLinkData({ title: certificate.name, href: certificate.link, icon: Award })}
                        aria-label={`Verify ${certificate.name}`} className="app-action-secondary mt-3">
                        Verify certificate <ExternalLink size={14} aria-hidden="true" />
                      </button>
                    )}
                  </article>
                ))}
              </div>
            </section>
            <section className="app-panel">
              <PanelTitle icon={BookOpen}>Languages</PanelTitle>
              <dl className="space-y-2">
                {languages.map((language) => (
                  <div key={language.name} className="app-tile flex flex-wrap items-center justify-between gap-2">
                    <dt className="text-sm font-bold">{language.name}</dt>
                    <dd className="font-sans text-sm text-black/65">{language.level}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
        <AppFooter file="education.log">Myanmar · Australia</AppFooter>
      </div>
    </>
  );
}
