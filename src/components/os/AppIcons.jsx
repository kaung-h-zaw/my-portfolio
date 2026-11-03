import React from "react";
import { ContactRound, FolderCode, BriefcaseBusiness, Cpu, BookOpen, Mail, Github, Linkedin } from "lucide-react";

function AppGlyph({ glyph: Glyph, size = 24, className, strokeWidth = 1.5, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true" {...props}>
    <rect x="1" y="1" width="46" height="46" rx="11" fill="#242424" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
    <Glyph x="10" y="10" width="28" height="28" color="#b8b8b8" strokeWidth={Math.min(strokeWidth, 1.5)} />
  </svg>;
}

export function ProfileIcon(props) { return <AppGlyph {...props} glyph={ContactRound} />; }
export function ProjectsIcon(props) { return <AppGlyph {...props} glyph={FolderCode} />; }
export function ExperienceIcon(props) { return <AppGlyph {...props} glyph={BriefcaseBusiness} />; }
export function SkillsIcon(props) { return <AppGlyph {...props} glyph={Cpu} />; }
export function EducationIcon(props) { return <AppGlyph {...props} glyph={BookOpen} />; }
export function ContactIcon(props) { return <AppGlyph {...props} glyph={Mail} />; }
export function GitHubIcon(props) { return <AppGlyph {...props} glyph={Github} />; }
export function LinkedInIcon(props) { return <AppGlyph {...props} glyph={Linkedin} />; }
