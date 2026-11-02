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

export function ProfileIcon(props) { return <AppGlyph {...props} glyph={UserRound} colors={["#354e91", "#1a2c59", "#c4d8ff"]} />; }
export function ProjectsIcon(props) { return <AppGlyph {...props} glyph={FolderCode} colors={["#365b84", "#183447", "#a5e0f5"]} />; }
export function ExperienceIcon(props) { return <AppGlyph {...props} glyph={BriefcaseBusiness} colors={["#644a85", "#342644", "#e4c8ff"]} />; }
export function SkillsIcon(props) { return <AppGlyph {...props} glyph={Cpu} colors={["#4c4998", "#282756", "#d5ceff"]} />; }
export function EducationIcon(props) { return <AppGlyph {...props} glyph={BookOpen} colors={["#366a69", "#1a3d44", "#a6eee3"]} />; }
export function ContactIcon(props) { return <AppGlyph {...props} glyph={Mail} colors={["#405ab1", "#26345e", "#d3dfff"]} />; }
export function GitHubIcon(props) { return <AppGlyph {...props} glyph={Github} colors={["#394356", "#1b2233", "#e2e8f0"]} />; }
export function LinkedInIcon(props) { return <AppGlyph {...props} glyph={Linkedin} colors={["#2a5d91", "#163455", "#c2e3ff"]} />; }
