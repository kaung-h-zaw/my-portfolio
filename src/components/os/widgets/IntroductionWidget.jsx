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
    <div className="w-full box-border flex flex-col select-none pointer-events-auto bg-[#F9F6EE]/80 backdrop-blur-sm border-[2px] md:border-[3px] border-black rounded-xl p-3 shadow-[4px_4px_0px_black] md:shadow-[5px_5px_0px_black] hover:-translate-y-0.5 transition-all duration-300">
      {/* TOP SECTION */}
      <div className="flex justify-between items-start mb-2">
        <div className="overflow-hidden">
          <span className="block text-[8px] xl:text-[9px] font-mono font-bold tracking-[0.2em] text-black/40 uppercase mb-1">
            Greeting.exe
          </span>
          {/* Scaled text: 2xl on laptop, 3xl on xl, 4xl on 2xl */}
          <h1 className="font-black tracking-tighter text-black/90 uppercase leading-none text-2xl xl:text-3xl 2xl:text-4xl h-6 xl:h-8 flex items-center whitespace-nowrap">
            {text}
            <span className="w-1.5 h-[0.75em] xl:w-2 bg-black/80 animate-pulse ml-1.5 block shrink-0"></span>
          </h1>
        </div>

        <div className="w-2 h-2 xl:w-3 xl:h-3 rounded-full bg-green-400 border-[1.5px] border-black animate-pulse mt-1 shadow-[1px_1px_0px_black] shrink-0"></div>
      </div>

      {/* DIVIDER */}
      <div className="w-full h-[1.5px] bg-black/50 my-2"></div>

      {/* BOTTOM SECTION */}
      <button
        onClick={onOpenAbout}
        className="group text-left w-full relative transition-transform active:translate-y-[1px] flex flex-col items-start"
      >
        <span className="block text-[8px] xl:text-[9px] font-mono font-bold tracking-[0.2em] text-black/40 mb-1 uppercase group-hover:text-black/70 transition-colors">
          User // Profile
        </span>

        {/* Scaled text: text-lg on laptop, xl on xl, 2xl on 2xl */}
        <h2 className="font-black text-black/90 tracking-tight leading-none text-lg xl:text-xl 2xl:text-2xl uppercase mb-2 group-hover:underline decoration-[2px] underline-offset-4 truncate w-full">
          Kaung Htet Zaw
        </h2>

        <div className="w-full flex justify-between items-center mt-1">
          <div className="inline-block bg-black/90 text-white px-1.5 py-0.5 font-mono font-bold tracking-[0.1em] text-[8px] xl:text-[9px] uppercase group-hover:bg-[#A3C9C7] group-hover:text-black border-2 border-transparent group-hover:border-black transition-all rounded-sm">
            Junior Developer
          </div>

          <span className="text-[8px] xl:text-[9px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-black/70 shrink-0">
            Open <span className="text-xs leading-none">↗</span>
          </span>
        </div>
      </button>
    </div>
  );
}
