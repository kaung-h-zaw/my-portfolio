import React from "react";

export default function DesktopIcon({ file, onClick }) {
  const Icon = file.icon;
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-4 text-left w-48 focus:outline-none"
    >
      <div className="w-12 h-12 border-2 border-black bg-white flex items-center justify-center shadow-[4px_4px_0_0_black] group-hover:shadow-[6px_6px_0_0_black] group-active:translate-x-[2px] group-active:translate-y-[2px] group-active:shadow-[2px_2px_0_0_black] transition-all">
        <Icon size={24} strokeWidth={2} />
      </div>
      <div>
        <div className="font-bold text-sm uppercase group-hover:underline">
          {file.title}
        </div>
        <div className="text-[10px] text-gray-500 uppercase">
          {file.type} FILE
        </div>
      </div>
    </button>
  );
}
