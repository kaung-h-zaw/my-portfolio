import React, { useId } from "react";
import { UserRound, FolderCode, BriefcaseBusiness, Cpu, BookOpen, Mail, Github, Linkedin } from "lucide-react";

function AppGlyph({ glyph: Glyph, colors, size = 24, className, strokeWidth = 1.8, ...props }) {
  const gradient = `app-icon-${useId().replace(/:/g, "")}`;
  return <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true" {...props}>
    <defs><linearGradient id={gradient} x1="6" y1="2" x2="42" y2="48" gradientUnits="userSpaceOnUse"><stop stopColor={colors[0]} /><stop offset="1" stopColor={colors[1]} /></linearGradient></defs>
    <rect x="1" y="1" width="46" height="46" rx="13" fill={`url(#${gradient})`} />
    <rect x="1.5" y="1.5" width="45" height="45" rx="12.5" stroke="white" strokeOpacity=".16" />
    <Glyph x="11" y="11" width="26" height="26" color={colors[2]} strokeWidth={strokeWidth} />
  </svg>;
}

export function ProfileIcon(props) { return <AppGlyph {...props} glyph={UserRound} colors={["#353538", "#1b1b1e", "#e4e4e7"]} />; }
export function ProjectsIcon(props) { return <AppGlyph {...props} glyph={FolderCode} colors={["#353538", "#1b1b1e", "#e4e4e7"]} />; }
export function ExperienceIcon(props) { return <AppGlyph {...props} glyph={BriefcaseBusiness} colors={["#353538", "#1b1b1e", "#e4e4e7"]} />; }
export function SkillsIcon(props) { return <AppGlyph {...props} glyph={Cpu} colors={["#353538", "#1b1b1e", "#e4e4e7"]} />; }
export function EducationIcon(props) { return <AppGlyph {...props} glyph={BookOpen} colors={["#353538", "#1b1b1e", "#e4e4e7"]} />; }
export function ContactIcon(props) { return <AppGlyph {...props} glyph={Mail} colors={["#353538", "#1b1b1e", "#e4e4e7"]} />; }
export function GitHubIcon(props) { return <AppGlyph {...props} glyph={Github} colors={["#353538", "#1b1b1e", "#e4e4e7"]} />; }
export function LinkedInIcon(props) { return <AppGlyph {...props} glyph={Linkedin} colors={["#353538", "#1b1b1e", "#e4e4e7"]} />; }
