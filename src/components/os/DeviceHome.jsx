import React from "react";
import { ArrowUpRight } from "lucide-react";
import MultilingualGreeting from "./MultilingualGreeting";

export function HomeIcon({ title, label = title.replace(/_/g, " "), icon: Icon, onClick }) {
  return <button type="button" aria-label={title} onClick={onClick} className="native-home-icon group flex min-w-0 flex-col items-center gap-1.5 rounded-xl py-1 active:scale-95 transition-transform">
    <span className="native-icon-tile flex shrink-0 items-center justify-center rounded-[19px] border border-white/10 bg-[#202020] text-zinc-100 group-hover:bg-[#292929]">
      <Icon size={58} className="h-full w-full" strokeWidth={1.8} aria-hidden="true" />
    </span>
    <span className="w-full truncate text-center font-sans text-[11px] font-medium leading-4 text-white [text-shadow:0_1px_4px_rgba(10,30,35,0.75)]">{label}</span>
  </button>;
}

export function ProfileWidget({ onOpenAbout }) {
  return <button type="button" onClick={onOpenAbout} aria-label="Open Kaung's profile" className="native-widget native-profile flex h-full w-full items-center gap-3 p-4 text-left transition-colors hover:bg-[#242424]">
    <img src="/kaung-ink-avatar.webp" alt="" width="48" height="48" className="native-profile-avatar h-12 w-12 shrink-0 rounded-2xl border border-white/10 bg-[#e9e8e4] object-contain" />
    <span className="min-w-0 flex-1"><span className="native-profile-greeting flex h-7 items-center font-mono text-xl font-bold leading-relaxed text-zinc-100"><MultilingualGreeting /></span><span className="mt-1 block font-sans text-lg font-bold leading-tight tracking-tight text-zinc-100">Kaung Htet Zaw</span><span className="mt-1 block font-sans text-xs leading-snug text-zinc-300">Junior full-stack developer</span></span>
    <ArrowUpRight size={16} className="native-profile-arrow shrink-0 text-zinc-300" aria-hidden="true" />
  </button>;
}
