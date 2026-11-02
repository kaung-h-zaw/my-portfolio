import React from "react";
import { ArrowUpRight } from "lucide-react";
import MultilingualGreeting from "../MultilingualGreeting";

export default function IntroductionWidget({ onOpenAbout }) {
  return (
    <div className="w-full box-border flex flex-col select-none pointer-events-auto bg-[#19191c]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 xl:p-4 hover:border-white/10 transition-all duration-300">
      {/* TOP SECTION */}
      <div className="flex justify-between items-start mb-3">
        <div className="overflow-hidden flex-1">
          <span className="block text-[8px] md:text-[9px] xl:text-[9px] font-mono font-medium tracking-widest text-zinc-400 uppercase mb-1.5">
            Greeting.exe
          </span>

          {/* Greeting text */}
          <h1 className="font-black tracking-tight text-zinc-200 uppercase leading-[1.4] text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl h-10 xl:h-11 2xl:h-[52px] flex items-center whitespace-nowrap">
            <MultilingualGreeting cursorClassName="bg-zinc-300" />
          </h1>
        </div>

        <div className="w-2 h-2 xl:w-2.5 xl:h-2.5 rounded-full bg-zinc-400 border border-white/10 animate-pulse shrink-0"></div>
      </div>

      {/* DIVIDER */}
      <div className="w-full h-[1px] bg-white/5 mb-1"></div>

      {/* BOTTOM SECTION */}
      <button
        onClick={onOpenAbout}
        className="group text-left w-full relative transition-all active:scale-[0.99] flex flex-col items-start"
      >
        <span className="block text-[8px] md:text-[9px] xl:text-[9px] font-mono font-medium tracking-widest text-zinc-400 mb-1.5 uppercase group-hover:text-zinc-300 transition-colors">
          User // Profile
        </span>

        {/* Name */}
        <h2 className="font-semibold font-sans text-zinc-100 tracking-tight leading-[1.4] text-2xl md:text-3xl lg:text-lg xl:text-xl 2xl:text-2xl mb-2 md:mb-1 group-hover:underline decoration-2 underline-offset-4 truncate w-full">
          Kaung Htet Zaw
        </h2>

        <div className="w-full flex justify-between items-center">
          <div className="inline-block bg-zinc-400/15 text-zinc-200 px-2 py-1 font-mono font-medium tracking-wider text-[8px] md:text-[9px] lg:text-[8px] xl:text-[9px] uppercase group-hover:bg-zinc-400/25 transition-all rounded-md">
            Junior Full-Stack Developer
          </div>

          <span className="text-[9px] font-medium uppercase opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-zinc-400 shrink-0">
            Open <ArrowUpRight size={12} className="text-zinc-400" />
          </span>
        </div>
      </button>
    </div>
  );
}
