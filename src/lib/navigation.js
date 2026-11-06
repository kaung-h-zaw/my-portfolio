import { useSyncExternalStore } from "react";

const APP_IDS = ["about", "projects", "experience", "skills", "education", "contact", "home"];
const NAVIGATE_EVENT = "portfolio:navigate";

export function readRoute(hash = window.location.hash) {
  const [appId, ...segments] = hash.replace(/^#\/?/, "").split("/");
  if (!APP_IDS.includes(appId)) return { appId: null, projectId: null };
  let projectId = segments.join("/");
  try { projectId = decodeURIComponent(projectId); } catch { /* Show an unknown project without breaking navigation. */ }
  return { appId, projectId: appId === "projects" ? projectId || null : null };
}

function subscribe(callback) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  window.addEventListener(NAVIGATE_EVENT, callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
    window.removeEventListener(NAVIGATE_EVENT, callback);
  };
}

const getSnapshot = () => window.location.hash;

export function usePortfolioRoute() {
  return readRoute(useSyncExternalStore(subscribe, getSnapshot));
}

export function navigateTo(appId, projectId = null) {
  if (!APP_IDS.includes(appId)) return;
  const hash = `#/${appId}${appId === "projects" && projectId ? `/${encodeURIComponent(projectId)}` : ""}`;
  if (window.location.hash === hash) return;
  window.history.pushState(null, "", `${window.location.pathname}${window.location.search}${hash}`);
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
}

export function getProjectUrl(projectId) {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = `/projects/${encodeURIComponent(projectId)}`;
  return url.href;
}
