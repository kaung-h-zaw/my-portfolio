import React from "react";
import { Github, Linkedin } from "lucide-react";

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

export function GitHubIcon(props) {
  return <IconFrame {...props}><rect x="6" y="6" width="36" height="36" rx="8" fill="#d6d1c5" /><path d="M7 14h34" strokeOpacity=".35" /><Github x="13" y="15" width="22" height="22" strokeWidth="1.7" /><path d="M13 10h3m4 0h3" strokeOpacity=".5" /></IconFrame>;
}
export function LinkedInIcon(props) {
  return <IconFrame {...props}><rect x="6" y="6" width="36" height="36" rx="8" fill="#bdcdd2" /><path d="M7 14h34" strokeOpacity=".35" /><Linkedin x="14" y="17" width="20" height="20" strokeWidth="1.7" /><path d="M13 10h3m4 0h3" strokeOpacity=".5" /></IconFrame>;
}
