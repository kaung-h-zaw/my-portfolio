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
        className="w-full box-border bg-white/40 border border-black/10 backdrop-blur-md hover:border-black/15 relative transition-all !p-0 overflow-hidden cursor-pointer group rounded-2xl flex flex-col"
        onClick={togglePlay}
      >
        <div className="p-3 xl:p-3.5 2xl:p-4 bg-black/90 text-white flex justify-between items-center">
          <div className="flex gap-2 items-center w-full overflow-hidden">
            <div className="bg-[#ff6b6b] p-1 2xl:p-1.5 rounded-lg shrink-0">
              <Music className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" strokeWidth={2} />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[7px] xl:text-[8px] 2xl:text-[9px] font-medium uppercase opacity-40 tracking-widest">
                Spotify
              </span>
              <span className="font-bold text-[10px] xl:text-xs 2xl:text-sm truncate w-full text-white/80">
                Lofi Study Beats
              </span>
            </div>
          </div>

          {/* Animated Bars */}
          <div className="flex gap-0.5 xl:gap-1 shrink-0 ml-2">
            <div
              className={`w-0.5 xl:w-1 bg-[#ff6b6b] rounded-full ${isPlaying ? "h-2 xl:h-3 animate-pulse" : "h-1"}`}
            ></div>
            <div
              className={`w-0.5 xl:w-1 bg-white/60 rounded-full ${isPlaying ? "h-3 xl:h-4 animate-pulse delay-75" : "h-2"}`}
            ></div>
            <div
              className={`w-0.5 xl:w-1 bg-white rounded-full ${isPlaying ? "h-2 xl:h-3 animate-pulse delay-150" : "h-1"}`}
            ></div>
          </div>
        </div>

        <div className="bg-white/30 p-2.5 xl:p-3 flex justify-between items-center border-t border-black/10">
          <div className="w-full h-1 xl:h-1.5 bg-black/10 rounded-full mr-3 overflow-hidden">
            <div
              className="h-full bg-black/60 transition-none rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex gap-1.5">
            <button
              className="hover:bg-black/5 p-1 rounded-lg transition-colors"
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
            <button className="hover:bg-black/5 p-1 rounded-lg opacity-30 cursor-not-allowed">
              <SkipForward className="w-3 h-3 xl:w-3.5 xl:h-3.5" fill="black" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={togglePlay}
      className="w-full box-border bg-white/40 backdrop-blur-md border border-black/10 p-3 md:p-4 rounded-2xl flex flex-col h-full relative active:scale-[0.99] transition-all cursor-pointer hover:border-black/15"
    >
      <div className="flex justify-between items-center border-b border-black/10 pb-2 md:pb-3 mb-2 md:mb-3">
        <div className="bg-black/90 p-1 md:p-1.5 rounded-lg">
          <Music
            className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] text-white"
            strokeWidth={2}
          />
        </div>

        <div className="flex gap-1 md:gap-1.5 items-end h-4 md:h-5">
          <div
            className={`w-1 md:w-1.5 bg-black/60 rounded-full ${isPlaying ? "h-3 md:h-4 animate-pulse" : "h-1.5"}`}
          ></div>
          <div
            className={`w-1 md:w-1.5 bg-black/60 rounded-full ${isPlaying ? "h-4 md:h-5 animate-pulse delay-75" : "h-2.5"}`}
          ></div>
          <div
            className={`w-1 md:w-1.5 bg-black/60 rounded-full ${isPlaying ? "h-2 md:h-3 animate-pulse delay-150" : "h-1.5"}`}
          ></div>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full flex-grow justify-end">
        <div className="flex justify-between items-end">
          <div className="flex flex-col overflow-hidden pr-2">
            <span className="text-[12px] md:text-[15px] font-black truncate block w-full leading-tight text-black/80">
              Lofi Beats
            </span>
            <span className="text-[9px] md:text-[10px] text-black/40 font-medium truncate block w-full uppercase tracking-widest mt-0.5">
              Spotify
            </span>
          </div>
          <div className="text-black/60 mb-0.5">
            {isPlaying ? (
              <Pause
                className="w-[16px] h-[16px] md:w-[20px] md:h-[20px]"
                fill="currentColor"
              />
            ) : (
              <Play
                className="w-[16px] h-[16px] md:w-[20px] md:h-[20px]"
                fill="currentColor"
              />
            )}
          </div>
        </div>

        <div className="w-full h-1.5 md:h-2 bg-black/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-black/60 transition-none rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
