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
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  if (variant === "compact") {
    return <button type="button" onClick={togglePlay} aria-label={isPlaying ? "Pause music" : "Play music"} aria-pressed={isPlaying}
      className="native-widget flex h-full min-h-[112px] flex-col justify-between p-3.5 text-left transition-colors hover:bg-[#242424]">
      <span className="flex w-full items-center justify-between"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#353539] text-zinc-100"><Music size={15} aria-hidden="true" /></span>{isPlaying ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}</span>
      <span><span className="block font-sans text-xs font-bold text-zinc-100">Lofi beats</span><span className="block font-sans text-[10px] text-zinc-300">{isPlaying ? "Now playing" : "Tap to play"}</span></span>
      <span className="block h-1 w-full overflow-hidden rounded-full bg-white/5"><span className="block h-full rounded-full bg-[#c4c4ca]" style={{ width: `${progress}%` }} /></span>
    </button>;
  }

  if (variant === "desktop") {
    return (
      <div
        onClick={togglePlay}
        className="w-full box-border bg-[#1c1c1c] border border-white/10 hover:border-white/10 relative transition-all !p-0 overflow-hidden cursor-pointer group rounded-2xl flex flex-col"
      >
        <div className="p-3 xl:p-3.5 2xl:p-4 bg-black/90 text-white flex justify-between items-center">
          <div className="flex gap-2 items-center w-full overflow-hidden">
            <div className="bg-[#71717a] p-1 2xl:p-1.5 rounded-lg shrink-0">
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
              className={`w-0.5 xl:w-1 bg-[#71717a] rounded-full ${isPlaying ? "h-2 xl:h-3 animate-pulse" : "h-1"}`}
            ></div>
            <div
              className={`w-0.5 xl:w-1 bg-[#1c1c1c] rounded-full ${isPlaying ? "h-3 xl:h-4 animate-pulse delay-75" : "h-2"}`}
            ></div>
            <div
              className={`w-0.5 xl:w-1 bg-white rounded-full ${isPlaying ? "h-2 xl:h-3 animate-pulse delay-150" : "h-1"}`}
            ></div>
          </div>
        </div>

        <div className="bg-white/5 p-2.5 xl:p-3 flex justify-between items-center border-t border-white/10">
          <div className="w-full h-1 xl:h-1.5 bg-white/5 rounded-full mr-3 overflow-hidden">
            <div
              className="h-full bg-zinc-300 transition-none rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex gap-1.5">
            <button
              aria-label={isPlaying ? "Pause music" : "Play music"}
              className="min-h-11 min-w-11 flex items-center justify-center hover:bg-white/5 p-1 rounded-lg transition-colors"
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
            <button disabled aria-label="Next track unavailable" className="min-h-11 min-w-11 flex items-center justify-center p-1 rounded-lg opacity-30 cursor-not-allowed">
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
      role="button"
      tabIndex={0}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      aria-pressed={isPlaying}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          togglePlay();
        }
      }}
      className="w-full box-border bg-[#1c1c1c] border border-white/10 p-3 md:p-4 rounded-2xl flex flex-col h-full relative active:scale-[0.99] transition-all cursor-pointer hover:border-white/10"
    >
      <div className="flex justify-between items-center border-b border-white/10 pb-2 md:pb-3 mb-2 md:mb-3">
        <div className="bg-black/90 p-1 md:p-1.5 rounded-lg">
          <Music
            className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] text-white"
            strokeWidth={2}
          />
        </div>

        <div className="flex gap-1 md:gap-1.5 items-end h-4 md:h-5">
          <div
            className={`w-1 md:w-1.5 bg-zinc-300 rounded-full ${isPlaying ? "h-3 md:h-4 animate-pulse" : "h-1.5"}`}
          ></div>
          <div
            className={`w-1 md:w-1.5 bg-zinc-300 rounded-full ${isPlaying ? "h-4 md:h-5 animate-pulse delay-75" : "h-2.5"}`}
          ></div>
          <div
            className={`w-1 md:w-1.5 bg-zinc-300 rounded-full ${isPlaying ? "h-2 md:h-3 animate-pulse delay-150" : "h-1.5"}`}
          ></div>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full flex-grow justify-end">
        <div className="flex justify-between items-end">
          <div className="flex flex-col overflow-hidden pr-2">
            <span className="text-[12px] md:text-[15px] font-black truncate block w-full leading-tight text-zinc-200">
              Lofi Beats
            </span>
            <span className="text-[9px] md:text-[10px] text-zinc-400 font-medium truncate block w-full uppercase tracking-widest mt-0.5">
              Spotify
            </span>
          </div>
          <div className="text-zinc-400 mb-0.5">
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

        <div className="w-full h-1.5 md:h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-zinc-300 transition-none rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
