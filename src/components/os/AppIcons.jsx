import React from "react";

function IconFrame({ size = 24, className, children, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>{children}</svg>;
}

export function ProfileIcon(props) {
  return <IconFrame {...props}><rect x="7" y="7" width="34" height="35" rx="6" fill="#e8e4da" /><path d="M7 16h34" /><path d="M17 5v5m14-5v5" /><circle cx="24" cy="25" r="5" fill="#b6c5c9" /><path d="M15 38v-2a9 9 0 0 1 18 0v2" fill="#b6c5c9" /></IconFrame>;
}
export function ProjectsIcon(props) {
  return <IconFrame {...props}><path d="M5 15a4 4 0 0 1 4-4h10l4 5h16a4 4 0 0 1 4 4v17a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z" fill="#d6c39a" /><path d="M5 22h38v15a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z" fill="#e9ddc0" /><path d="m20 27-5 5 5 5m8-10 5 5-5 5" /></IconFrame>;
}
export function ExperienceIcon(props) {
  return <IconFrame {...props}><rect x="5" y="15" width="38" height="27" rx="5" fill="#c5bcb0" /><path d="M17 15V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v6" /><path d="M5 25a46 46 0 0 0 38 0" /><rect x="20" y="25" width="8" height="7" rx="2" fill="#f2eee4" /></IconFrame>;
}
export function SkillsIcon(props) {
  return <IconFrame {...props}><rect x="8" y="8" width="32" height="32" rx="6" fill="#c3c9bf" /><rect x="17" y="17" width="14" height="14" rx="2" fill="#efeee5" /><path d="M17 3v5m7-5v5m7-5v5M17 40v5m7-5v5m7-5v5M3 17h5m-5 7h5m-5 7h5m32-14h5m-5 7h5m-5 7h5" /></IconFrame>;
}
export function EducationIcon(props) {
  return <IconFrame {...props}><path d="M7 9h15a5 5 0 0 1 5 5v27H12a5 5 0 0 1-5-5Z" fill="#bdc9d0" /><path d="M41 9H27a5 5 0 0 0-5 5v27h14a5 5 0 0 0 5-5Z" fill="#e6e9e7" /><path d="M22 14v27M12 18h5m-5 7h5m11-7h7m-7 7h7m-7 7h5" /></IconFrame>;
}
export function ContactIcon(props) {
  return <IconFrame {...props}><rect x="5" y="9" width="38" height="31" rx="6" fill="#c4ceca" /><path d="m7 13 14 12a5 5 0 0 0 6 0l14-12M7 37l12-11m22 11L29 26" /><path d="M11 5h26" strokeOpacity=".4" /></IconFrame>;
}
export function CVIcon(props) {
  return <IconFrame {...props}><path d="M12 5h17l10 10v25a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z" fill="#eee9dc" /><path d="M29 5v10h10" fill="#d4c6ad" /><circle cx="20" cy="23" r="4" fill="#b6c5c9" /><path d="M14 33a6 6 0 0 1 12 0m4-11h3m-3 6h3M15 38h18" /></IconFrame>;
}
