import React, { useState, useEffect } from "react";
import WeatherWidget from "./widgets/WeatherWidget";
import MusicWidget from "./widgets/MusicWidget";
import IntroductionWidget from "./widgets/IntroductionWidget";

export default function Widgets({ onOpenAbout }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-3 xl:gap-4 2xl:gap-5 pointer-events-auto items-end w-[240px] xl:w-[280px] 2xl:w-[320px] transition-all duration-300">
      <IntroductionWidget onOpenAbout={onOpenAbout} />
      <WeatherWidget variant="desktop" />
      <MusicWidget variant="desktop" />
    </div>
  );
}
