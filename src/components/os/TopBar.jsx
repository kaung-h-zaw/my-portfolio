import React, { useState, useEffect } from "react";

export default function TopBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-10 bg-black text-white flex items-center justify-between px-4 border-b-2 border-black z-50 select-none">
      <div className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase">
        <span className="bg-white text-black px-2">KAUNG-OS</span>
        <span className="cursor-pointer hover:underline">File</span>
        <span className="cursor-pointer hover:underline">View</span>
        <span className="cursor-pointer hover:underline">Help</span>
      </div>
      <div className="text-xs tracking-widest">
        {time.toLocaleTimeString([], { hour12: false })}
      </div>
    </div>
  );
}
