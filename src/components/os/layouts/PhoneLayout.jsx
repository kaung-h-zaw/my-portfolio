import React, { useState } from "react";
import Window from "../Window";
import WeatherWidget from "../widgets/WeatherWidget";
import MusicWidget from "../widgets/MusicWidget";
import LinkConfirmationModal from "../LinkConfirmationModal";
import { GitHubIcon, LinkedInIcon } from "../AppIcons";
import { HomeIcon, ProfileWidget } from "../DeviceHome";
import BackgroundLayers from "../BackgroundLayers";

export default function PhoneLayout({ apps, appOrder, openWindows, openWindow, closeWindow, minimizeWindow }) {
  const activeApp = openWindows.find((win) => !win.minimized);
  const [pendingLink, setPendingLink] = useState(null);
  const links = [
    { title: "GitHub", icon: GitHubIcon, href: "https://github.com/kaung-h-zaw" },
    { title: "LinkedIn", icon: LinkedInIcon, href: "https://linkedin.com/in/kaung-h-zaw" },
  ];
  const goHome = () => { if (activeApp) minimizeWindow(activeApp.id); };

  return <div className="native-phone fixed inset-0 overflow-hidden bg-[#161616]">
    <BackgroundLayers />
    {!activeApp && <>
      <main className="native-phone-home absolute inset-x-0 overflow-y-auto overscroll-contain" style={{ top: "calc(var(--os-safe-top) + 16px)", bottom: "calc(var(--os-safe-bottom) + 100px)" }}>
        <div className="native-phone-home-content mx-auto flex min-h-full w-full max-w-[480px] flex-col px-4 pb-6 pt-3">
          <header className="mb-4 flex items-end justify-between text-white"><div><p className="font-sans text-[11px] text-white/70">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p><h1 className="mt-1 font-sans text-xl font-semibold tracking-tight">Kaung OS</h1></div><span className="pb-1 font-mono text-[9px] tracking-widest text-white/60">v2.0</span></header>
          <div className="native-phone-profile mb-3"><ProfileWidget onOpenAbout={() => openWindow("about")} /></div>
          <div className="native-phone-widgets mb-5 grid grid-cols-2 gap-3"><WeatherWidget variant="compact" /><MusicWidget variant="compact" /></div>
          <nav aria-label="Home apps" className="native-phone-apps grid flex-1 grid-cols-4 gap-x-2 gap-y-4">
            {appOrder.map((id) => apps[id]).map((app) => <HomeIcon key={app.id} title={app.title} label={app.id === "about" ? "About" : app.title} icon={app.mobileIcon || app.icon} onClick={() => openWindow(app.id)} />)}
            {links.map((link) => <HomeIcon key={link.title} {...link} onClick={(event) => setPendingLink({ ...link, returnFocus: event.currentTarget })} />)}
          </nav>
        </div>
      </main>
      <nav aria-label="Phone dock" className="native-phone-dock fixed bottom-[12px] left-1/2 z-20 flex w-[calc(100%-32px)] max-w-[400px] -translate-x-1/2 items-center justify-around rounded-[28px] border border-white/10 bg-[#1b1b1b] px-3 py-3 " style={{ marginBottom: "var(--os-safe-bottom)" }}>
        {["about", "projects", "skills", "contact"].map((id) => { const app = apps[id]; const Icon = app.mobileIcon || app.icon; return <button key={id} type="button" aria-label={`Open ${app.title} app`} onClick={() => openWindow(id)} className="flex h-12 w-12 items-center justify-center rounded-[17px] text-zinc-100 active:scale-95"><Icon size={48} strokeWidth={1.8} aria-hidden="true" /></button>; })}
      </nav>
    </>}
    {activeApp && <Window key="active-window" title={activeApp.title} apps={apps} currentAppId={activeApp.id} appOrder={appOrder} onNavigate={openWindow} zIndex={50} onClose={() => closeWindow(activeApp.id)} isMobile onFocus={() => {}} onMinimize={goHome}>
      {React.createElement(apps[activeApp.id].component, { onOpenApp: openWindow })}
    </Window>}
    <LinkConfirmationModal linkData={pendingLink} onClose={() => setPendingLink(null)} />
  </div>;
}
