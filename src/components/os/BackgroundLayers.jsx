import React from "react";

export default function BackgroundLayers({
  gradient,
  showGrain = false,
  gridOpacity = 0.25,
  gridSize = "60px 60px",
  grainOpacity = 0.08,
  vignette = false,
  parallaxY = 0,
}) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: gradient,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${parallaxY}px)`,
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(to right, rgba(90,90,90,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(90,90,90,0.3) 1px, transparent 1px)
          `,
          backgroundSize: gridSize,
        }}
      />
      {showGrain && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: grainOpacity,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
      )}
      {vignette && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.18) 100%)",
          }}
        />
      )}
    </>
  );
}
