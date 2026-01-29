import React from "react";

export default function StatusBar() {
  return (
    <div className="h-8 border-t-2 border-black flex items-center justify-between px-4 text-xs font-bold bg-white select-none">
      <div className="flex gap-4">
        <span>READY</span>
        <span>MEM: 640K OK</span>
      </div>
      <div className="uppercase">User: Kaung Htet Zaw</div>
    </div>
  );
}
