import React, { useId } from "react";
import { Github, Linkedin } from "lucide-react";

function IconFrame({ size = 24, className, children, strokeWidth = 1.4, ...props }) {
  const id = `silver-${useId().replace(/:/g, "")}`;
  return <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} strokeWidth={Math.min(strokeWidth, 1.4)} aria-hidden="true" {...props}>
    <defs>
      <linearGradient id={id} x1="12" y1="6" x2="35" y2="43" gradientUnits="userSpaceOnUse"><stop stopColor="#e4e4e7" /><stop offset="1" stopColor="#929298" /></linearGradient>
      <linearGradient id={`${id}-base`} x1="8" y1="1" x2="40" y2="47" gradientUnits="userSpaceOnUse"><stop stopColor="#242427" /><stop offset="1" stopColor="#151517" /></linearGradient>
    </defs>
    <rect x="1" y="1" width="46" height="46" rx="12" fill={`url(#${id}-base)`} />
    <rect x="1.5" y="1.5" width="45" height="45" rx="11.5" stroke="white" strokeOpacity=".065" />
    <g strokeLinecap="round" strokeLinejoin="round">{children(`url(#${id})`)}</g>
  </svg>;
}

export function ProfileIcon(props) {
  return <IconFrame {...props}>{(silver) => <>
    <rect x="10" y="6" width="28" height="36" rx="5" fill={silver} />
    <rect x="18" y="9" width="12" height="3" rx="1.5" fill="#414146" />
    <circle cx="24" cy="22" r="5" fill="#414146" />
    <path d="M15 36v-2a9 9 0 0 1 18 0v2Z" fill="#414146" />
    <path d="M13 16v-3m22 0v3" stroke="white" strokeOpacity=".5" />
  </>}</IconFrame>;
}
export function ProjectsIcon(props) {
  return <IconFrame {...props}>{(silver) => <>
    <path d="M5 15a4 4 0 0 1 4-4h10l5 5h15a4 4 0 0 1 4 4v17H5Z" fill="#77777f" />
    <path d="M7 19h34a3 3 0 0 1 3 3l-3 16a4 4 0 0 1-4 3H10a4 4 0 0 1-4-3L4 23a3 3 0 0 1 3-4Z" fill={silver} />
    <rect x="12" y="24" width="24" height="12" rx="3" fill="#37373c" />
    <path d="m20 27-3 3 3 3m8-6 3 3-3 3m-5 1 2-8" stroke="#e4e4e7" strokeWidth="1.5" />
    <path d="M9 21h29" stroke="white" strokeOpacity=".5" />
  </>}</IconFrame>;
}
export function ExperienceIcon(props) {
  return <IconFrame {...props}>{(silver) => <>
    <path d="M17 16v-5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v5" stroke="#b4b4bc" strokeWidth="3" />
    <rect x="6" y="15" width="36" height="26" rx="5" fill={silver} />
    <path d="M7 24a47 47 0 0 0 34 0v4a47 47 0 0 1-34 0Z" fill="#4c4c53" />
    <rect x="20" y="24" width="8" height="8" rx="2" fill="#343439" stroke="#d4d4d8" strokeWidth="1.4" />
    <path d="M10 36h6" stroke="white" strokeOpacity=".45" />
  </>}</IconFrame>;
}
export function SkillsIcon(props) {
  return <IconFrame {...props}>{(silver) => <>
    <path d="M16 5v6m8-6v6m8-6v6M16 37v6m8-6v6m8-6v6M5 16h6m-6 8h6m-6 8h6m26-16h6m-6 8h6m-6 8h6" stroke="#9999a1" strokeWidth="2.6" />
    <rect x="10" y="10" width="28" height="28" rx="5" fill={silver} />
    <rect x="16" y="16" width="16" height="16" rx="3" fill="#38383e" />
    <path d="M20 20h8v8h-8Z" stroke="#bcbcc5" strokeWidth="1.4" />
    <circle cx="13.5" cy="13.5" r="1" fill="white" />
  </>}</IconFrame>;
}
export function EducationIcon(props) {
  return <IconFrame {...props}>{(silver) => <>
    <path d="M5 12c7-3 13-3 19 1 6-4 12-4 19-1v28c-7-3-13-3-19 1-6-4-12-4-19-1Z" fill="#77777f" />
    <path d="M7 8c6-2 12-1 17 3 5-4 11-5 17-3v27c-6-2-12-1-17 3-5-4-11-5-17-3Z" fill={silver} />
    <path d="M24 12v25" stroke="#55555d" strokeWidth="1.7" />
    <path d="m11 15 8 1m-8 6 8 1m-8 6 8 1m10-14 8-1m-8 8 8-1m-8 8 8-1" stroke="#5e5e66" strokeWidth="1.5" />
  </>}</IconFrame>;
}
export function ContactIcon(props) {
  return <IconFrame {...props}>{(silver) => <>
    <rect x="11" y="7" width="26" height="26" rx="3" fill="#8c8c95" />
    <path d="M16 12h16m-16 5h11" stroke="#dedee3" strokeWidth="1.4" />
    <rect x="5" y="16" width="38" height="25" rx="5" fill={silver} />
    <path d="m7 38 12-11m22 11L29 27" stroke="#65656d" strokeWidth="1.2" />
    <path d="m6 18 15 12a5 5 0 0 0 6 0l15-12" fill="#cfcfd5" stroke="#65656d" strokeWidth="1.2" />
  </>}</IconFrame>;
}
export function GitHubIcon(props) {
  return <IconFrame {...props}>{(silver) => <>
    <circle cx="24" cy="24" r="17" fill={silver} />
    <Github x="11" y="11" width="26" height="26" color="#29292d" fill="#29292d" strokeWidth="1.5" />
  </>}</IconFrame>;
}
export function LinkedInIcon(props) {
  return <IconFrame {...props}>{(silver) => <>
    <rect x="7" y="7" width="34" height="34" rx="7" fill={silver} />
    <Linkedin x="13" y="13" width="22" height="22" color="#29292d" fill="#29292d" strokeWidth="1.4" />
  </>}</IconFrame>;
}
