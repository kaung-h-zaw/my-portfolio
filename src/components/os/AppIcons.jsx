import React from "react";
import { UserRound, FolderCode, BriefcaseBusiness, Cpu, BookOpen, Mail, Github, Linkedin } from "lucide-react";

function AppGlyph({ glyph: Glyph, size = 24, className, strokeWidth = 1.8, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true" {...props}>
    <rect x="1" y="1" width="46" height="46" rx="13" fill="#1c1c1f" />
    <rect x="1.5" y="1.5" width="45" height="45" rx="12.5" stroke="white" strokeOpacity=".09" />
    <Glyph x="12" y="12" width="24" height="24" color="#d4d4d8" strokeWidth={Math.min(strokeWidth, 1.6)} />
  </svg>;
}

export function ProfileIcon(props) { return <AppGlyph {...props} glyph={UserRound} />; }
export function ProjectsIcon(props) { return <AppGlyph {...props} glyph={FolderCode} />; }
export function ExperienceIcon(props) { return <AppGlyph {...props} glyph={BriefcaseBusiness} />; }
export function SkillsIcon(props) { return <AppGlyph {...props} glyph={Cpu} />; }
export function EducationIcon(props) { return <AppGlyph {...props} glyph={BookOpen} />; }
export function ContactIcon(props) { return <AppGlyph {...props} glyph={Mail} />; }
export function GitHubIcon(props) { return <AppGlyph {...props} glyph={Github} />; }
export function LinkedInIcon(props) { return <AppGlyph {...props} glyph={Linkedin} />; }
