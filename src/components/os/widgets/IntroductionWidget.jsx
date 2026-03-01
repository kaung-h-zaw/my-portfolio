import React, { useState, useEffect } from "react";

const GREETINGS = [
  "HELLO",
  "สวัสดี",
  "မင်္ဂလာပါ",
  "HOLA",
  "BONJOUR",
  "こんにちは",
];

export default function IntroductionWidget({ onOpenAbout }) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const i = loopNum % GREETINGS.length;
    const fullText = GREETINGS[i];

    const handleTyping = () => {
      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(40);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(120);
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return (
    <div className="w-full box-border flex flex-col select-none pointer-events-auto bg-white/40 backdrop-blur-md border border-black/10 rounded-2xl p-4 hover:border-black/15 transition-all duration-300">
      {/* TOP SECTION */}
      <div className="flex justify-between items-start mb-3">
        <div className="overflow-hidden flex-1">
          <span className="block text-[8px] xl:text-[9px] font-mono font-medium tracking-widest text-black/50 uppercase mb-1.5">
            Greeting.exe
          </span>

          {/* Greeting text */}
          <h1 className="font-black tracking-tight text-black/80 uppercase leading-none text-2xl xl:text-3xl 2xl:text-4xl h-7 xl:h-9 flex items-center whitespace-nowrap">
            {text}
            <span className="w-1.5 h-[0.75em] xl:w-2 bg-black/60 animate-pulse ml-1.5 block shrink-0"></span>
          </h1>
        </div>

        <div className="w-2 h-2 xl:w-2.5 xl:h-2.5 rounded-full bg-black/30 border border-black/10 animate-pulse shrink-0"></div>
      </div>

      {/* DIVIDER */}
      <div className="w-full h-[1px] bg-black/10 mb-1"></div>

      {/* BOTTOM SECTION */}
      <button
        onClick={onOpenAbout}
        className="group text-left w-full relative transition-all active:scale-[0.99] flex flex-col items-start"
      >
        <span className="block text-[8px] xl:text-[9px] font-mono font-medium tracking-widest text-black/50 mb-1.5 uppercase group-hover:text-black/70 transition-colors">
          User // Profile
        </span>

        {/* Name */}
        <h2 className="font-black text-black/80 tracking-tight leading-none text-lg xl:text-xl 2xl:text-2xl uppercase mb-2 md:mb-1 group-hover:underline decoration-2 underline-offset-4 truncate w-full">
          Kaung Htet Zaw
        </h2>

        <div className="w-full flex justify-between items-center">
          <div className="inline-block bg-black/80 text-white px-2 py-1 font-mono font-medium tracking-wider text-[8px] xl:text-[9px] uppercase group-hover:bg-black/90 transition-all rounded-md">
            Junior Developer
          </div>

          <span className="text-[9px] font-medium uppercase opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-black/50 shrink-0">
            Open <span className="text-[10px] leading-none">↗</span>
          </span>
        </div>
      </button>
    </div>
  );
}
