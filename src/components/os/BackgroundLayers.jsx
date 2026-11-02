import React from "react";

// Etched contour lines and paper grain add depth without reflective highlights.
export default function BackgroundLayers() {
  return <div className="os-wallpaper absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" fill="none">
      <path d="M-100 960C40 660 345 710 545 505S820 190 1105 220 1535 80 1740-80v1190H-100Z" fill="#1c1c1c" />
      <g stroke="#414141" strokeOpacity=".35" strokeWidth="1">
        <path d="M-100 960C40 660 345 710 545 505S820 190 1105 220 1535 80 1740-80" />
        <path d="M-80 1020C90 712 376 760 583 548S845 250 1124 272 1546 140 1750-15" />
        <path d="M-40 1080C130 772 416 816 624 596S878 310 1147 326 1574 200 1780 48" />
        <path d="M10 1130C185 828 458 874 668 648S915 374 1174 382 1595 264 1800 112" />
        <path d="M70 1180C240 884 505 932 716 704S957 440 1204 440 1620 330 1820 180" />
        <path d="M140 1240C300 945 554 992 767 762S1000 507 1238 500 1648 398 1840 250" />
        <path d="M220 1290C365 1002 610 1055 823 822S1050 575 1275 564 1680 468 1860 320" />
        <path d="M310 1340C430 1060 669 1115 882 884S1104 646 1316 631 1710 542 1880 392" />
      </g>
    </svg>
    <div className="os-wallpaper-grain absolute inset-0" />
  </div>;
}
