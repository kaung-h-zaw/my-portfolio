import React, { useState } from "react";
import Window from "../Window";
import TopBar from "../TopBar";
import StatusBar from "../StatusBar";
import WeatherWidget from "../widgets/WeatherWidget";
import MusicWidget from "../widgets/MusicWidget";
import LinkConfirmationModal from "../LinkConfirmationModal";
import { GitHubIcon, LinkedInIcon } from "../AppIcons";
import { HomeIcon, ProfileWidget, HomeIndicator } from "../DeviceHome";
import BackgroundLayers from "../BackgroundLayers";

export default function TabletLayout({ apps, appOrder, openWindows, activeWindowId, openWindow, closeWindow, focusWindow, minimizeWindow }) {
  const activeApp = openWindows.find((win) => !win.minimized);
  const [pendingLink, setPendingLink] = useState(null);
  const links = [
    { title: "GitHub", icon: GitHubIcon, href: "https://github.com/kaung-h-zaw" },
    { title: "LinkedIn", icon: LinkedInIcon, href: "https://linkedin.com/in/kaung-h-zaw" },
  ];
  const goHome = () => { if (activeApp) minimizeWindow(activeApp.id); };

  return <div className="native-tablet fixed inset-0 overflow-hidden bg-[#657d7d]">
    <BackgroundLayers />
    <TopBar isTablet appActive={Boolean(activeApp)} />
    {!activeApp && <main className="native-tablet-home absolute inset-x-0 overflow-y-auto overscroll-contain px-7" style={{ top: "calc(env(safe-area-inset-top) + 48px)", bottom: "calc(env(safe-area-inset-bottom) + 132px)" }}>
      <div className="mx-auto w-full max-w-[960px] py-4">
        <header className="mb-6 flex items-end justify-between gap-4 text-white"><div><p className="font-sans text-xs text-white/65">Make yourself at home</p><h1 className="mt-1 font-sans text-[28px] font-semibold tracking-tight">Kaung OS</h1></div><p className="pb-1 font-sans text-xs text-white/75">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p></header>
        <section aria-label="Home widgets" className="native-tablet-widgets mb-8 grid grid-cols-[1.5fr_1fr_1fr] gap-3"><ProfileWidget onOpenAbout={() => openWindow("about")} /><WeatherWidget variant="compact" /><MusicWidget variant="compact" /></section>
        <nav aria-label="Home apps" className="native-tablet-apps mx-auto grid max-w-[800px] grid-cols-4 gap-x-6 gap-y-5">
          {appOrder.map((id) => apps[id]).map((app) => <HomeIcon key={app.id} title={app.title} label={app.id === "about" ? "About" : app.title} icon={app.mobileIcon || app.icon} onClick={() => openWindow(app.id)} />)}
          {links.map((link) => <HomeIcon key={link.title} {...link} onClick={() => setPendingLink(link)} />)}
        </nav>
      </div>
    </main>}
    <StatusBar apps={apps} appOrder={appOrder} openWindows={openWindows} activeWindowId={activeWindowId} onOpenApp={openWindow} onFocusWindow={focusWindow} onMinimizeWindow={minimizeWindow} isTablet />
    {activeApp && <Window key="active-window" title={activeApp.title} apps={apps} currentAppId={activeApp.id} appOrder={appOrder} onNavigate={openWindow} zIndex={activeApp.zIndex} onClose={() => closeWindow(activeApp.id)} onFocus={() => focusWindow(activeApp.id)} onMinimize={goHome} isMobile={false} isTablet>
      {React.createElement(apps[activeApp.id].component, { onOpenApp: openWindow })}
    </Window>}
    <HomeIndicator onClick={goHome} appActive={Boolean(activeApp)} />
    <LinkConfirmationModal linkData={pendingLink} onClose={() => setPendingLink(null)} />
  </div>;
}
