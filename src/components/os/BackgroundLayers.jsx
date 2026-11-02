import React, { useId } from "react";

export default function BackgroundLayers() {
  const id = `wallpaper-${useId().replace(/:/g, "")}`;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg className="absolute h-full w-full" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id={`${id}-sky`} x1="200" y1="0" x2="1400" y2="1000" gradientUnits="userSpaceOnUse">
            <stop stopColor="#465d68" /><stop offset="0.55" stopColor="#7d908e" /><stop offset="1" stopColor="#a6ac9b" />
          </linearGradient>
          <radialGradient id={`${id}-light`} cx="0" cy="0" r="1" gradientTransform="translate(1170 170) rotate(112) scale(720 980)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#e2d6b8" stopOpacity="0.24" /><stop offset="1" stopColor="#e2d6b8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-ridge`} x1="0" y1="430" x2="1450" y2="1050" gradientUnits="userSpaceOnUse">
            <stop stopColor="#657d7d" /><stop offset="1" stopColor="#8a9a8b" />
          </linearGradient>
          <linearGradient id={`${id}-foreground`} x1="1400" y1="600" x2="350" y2="1060" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4e686b" /><stop offset="1" stopColor="#3e555f" />
          </linearGradient>
        </defs>
        <path fill={`url(#${id}-sky)`} d="M0 0h1600v1000H0z" />
        <path fill={`url(#${id}-light)`} d="M0 0h1600v1000H0z" />
        <path d="M-150 730C140 370 350 385 630 540S1160 750 1750 250V1100H-150Z" fill={`url(#${id}-ridge)`} />
        <path d="M-150 735C140 375 350 390 630 545S1160 755 1750 255" stroke="#d4d9c7" strokeOpacity="0.2" strokeWidth="1.5" />
        <path d="M-100 970C230 565 570 625 820 755S1300 900 1700 585V1100H-100Z" fill="#8d9c90" />
        <path d="M-100 978C230 573 570 633 820 763S1300 908 1700 593" stroke="#e3e1c9" strokeOpacity="0.16" strokeWidth="1.5" />
        <path d="M-100 1080C300 790 580 1070 955 900S1350 590 1700 700V1100H-100Z" fill={`url(#${id}-foreground)`} />
        <path d="M-100 1072C300 782 580 1062 955 892S1350 582 1700 692" stroke="#baccc0" strokeOpacity="0.16" strokeWidth="1.5" />
      </svg>
      <div className="absolute inset-0 opacity-[0.045] mix-blend-soft-light"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "180px 180px" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 38%, transparent 30%, rgba(20,36,43,0.16) 100%)" }} />
    </div>
  );
}
