import React from "react";

// Static atmospheric light: no moving layers or image downloads during boot.
export default function BackgroundLayers() {
  return (
    <div className="os-wallpaper absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="os-wallpaper-glow" />
      <div className="os-wallpaper-orbit" />
      <div className="os-wallpaper-grain" />
    </div>
  );
}
