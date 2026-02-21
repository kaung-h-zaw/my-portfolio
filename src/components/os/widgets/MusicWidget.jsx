import React, { useState, useEffect, useRef } from "react";
import { Music, Play, Pause, SkipForward } from "lucide-react";

export default function MusicWidget({ variant = "mobile" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const PLAY_DURATION = 10000;

  useEffect(() => {
    audioRef.current = new Audio("/lofi.mp3");
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    } else {
      audioRef.current
        .play()
        .catch((e) => console.log("Audio play failed.", e));
      setIsPlaying(true);

      const startTime = Date.now();
      const startProgress = progress;
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = startProgress + (elapsed / PLAY_DURATION) * 100;
        if (newProgress >= 100) {
          setProgress(100);
          clearInterval(intervalRef.current);
        } else {
          setProgress(newProgress);
        }
      }, 50);

      const remainingTime =
        PLAY_DURATION - (startProgress / 100) * PLAY_DURATION;
      timeoutRef.current = setTimeout(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
        setProgress(0);
        clearInterval(intervalRef.current);
      }, remainingTime);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, []);

  if (variant === "desktop") {
    return (
      <div
        className="w-full box-border bg-[#F9F6EE] border-[2px] md:border-[3px] border-black shadow-[4px_4px_0px_black] md:shadow-[5px_5px_0px_black] relative transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_black] !p-0 overflow-hidden cursor-pointer group rounded-xl flex flex-col"
        onClick={togglePlay}
      >
        <div className="p-2.5 xl:p-3 2xl:p-4 bg-black text-white flex justify-between items-center">
          <div className="flex gap-2 items-center w-full overflow-hidden">
            <div className="bg-[#ff6b6b] p-1 2xl:p-1.5 rounded-sm border border-white/20 shrink-0">
              <Music className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[7px] xl:text-[8px] 2xl:text-[10px] font-bold uppercase opacity-50 tracking-widest">
                Spotify
              </span>
              <span className="font-bold text-[10px] xl:text-xs 2xl:text-sm truncate w-full text-[#A3C9C7]">
                Lofi Study Beats
              </span>
            </div>
          </div>
          {/* Animated Bars */}
          <div className="flex gap-0.5 xl:gap-1 shrink-0 ml-2">
            <div
              className={`w-0.5 xl:w-1 bg-[#ff6b6b] ${isPlaying ? "h-2 xl:h-3 animate-pulse" : "h-1"}`}
            ></div>
            <div
              className={`w-0.5 xl:w-1 bg-[#A3C9C7] ${isPlaying ? "h-3 xl:h-4 animate-pulse delay-75" : "h-2"}`}
            ></div>
            <div
              className={`w-0.5 xl:w-1 bg-white ${isPlaying ? "h-2 xl:h-3 animate-pulse delay-150" : "h-1"}`}
            ></div>
          </div>
        </div>

        <div className="bg-white p-2 xl:p-3 flex justify-between items-center border-t-[2px] md:border-t-[3px] border-black">
          <div className="w-full h-1 xl:h-1.5 bg-gray-200 rounded-full mr-3 overflow-hidden border border-black/10">
            <div
              className="h-full bg-black transition-none rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex gap-1">
            <button
              className="hover:bg-gray-100 p-1 rounded transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
            >
              {isPlaying ? (
                <Pause className="w-3 h-3 xl:w-3.5 xl:h-3.5" fill="black" />
              ) : (
                <Play className="w-3 h-3 xl:w-3.5 xl:h-3.5" fill="black" />
              )}
            </button>
            <button className="hover:bg-gray-100 p-1 rounded opacity-50 cursor-not-allowed">
              <SkipForward className="w-3 h-3 xl:w-3.5 xl:h-3.5" fill="black" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- MOBILE / TABLET STYLING (Dialed Back) ---
  return (
    <div
      onClick={togglePlay}
      className="w-full box-border bg-[#F9F6EE]/80 border-[2px] md:border-[3px] border-black p-3 md:p-4 rounded-xl shadow-[4px_4px_0px_black] md:shadow-[5px_5px_0px_black] flex flex-col h-full relative active:translate-y-[2px] transition-all cursor-pointer"
    >
      <div className="flex justify-between items-center border-b-[2px] border-black/10 pb-2 md:pb-3 mb-2 md:mb-3">
        <div className="bg-black p-1 md:p-1.5 rounded-md shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
          <Music className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] text-white" />
        </div>

        <div className="flex gap-1 md:gap-1.5 items-end h-4 md:h-5">
          <div
            className={`w-1 md:w-1.5 bg-black ${isPlaying ? "h-3 md:h-4 animate-pulse" : "h-1.5"}`}
          ></div>
          <div
            className={`w-1 md:w-1.5 bg-black ${isPlaying ? "h-4 md:h-5 animate-pulse delay-75" : "h-2.5"}`}
          ></div>
          <div
            className={`w-1 md:w-1.5 bg-black ${isPlaying ? "h-2 md:h-3 animate-pulse delay-150" : "h-1.5"}`}
          ></div>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full flex-grow justify-end">
        <div className="flex justify-between items-end">
          <div className="flex flex-col overflow-hidden pr-2">
            <span className="text-[12px] md:text-[15px] font-black truncate block w-full leading-tight">
              Lofi Beats
            </span>
            <span className="text-[9px] md:text-[10px] text-gray-500 font-bold truncate block w-full uppercase tracking-widest mt-0.5">
              Spotify
            </span>
          </div>
          <div className="text-black mb-0.5">
            {isPlaying ? (
              <Pause
                className="w-[16px] h-[16px] md:w-[20px] md:h-[20px]"
                fill="black"
              />
            ) : (
              <Play
                className="w-[16px] h-[16px] md:w-[20px] md:h-[20px]"
                fill="black"
              />
            )}
          </div>
        </div>

        <div className="w-full h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden border-[1px] border-black">
          <div
            className="h-full bg-black transition-none rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
