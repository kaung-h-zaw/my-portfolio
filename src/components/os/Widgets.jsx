import React, { useState, useEffect } from "react";
// Import the shared components
import WeatherWidget from "./widgets/WeatherWidget"; // Adjust path if necessary
import MusicWidget from "./widgets/MusicWidget";
import IntroductionWidget from "./widgets/IntroductionWidget"; // Adjust path if necessary

export default function Widgets({ onOpenAbout }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    // Base width 240px (for laptops), up to 280px on xl, and 320px on 2xl.
    <div className="flex flex-col gap-3 xl:gap-4 2xl:gap-5 pointer-events-auto items-end w-[240px] xl:w-[280px] 2xl:w-[320px] transition-all duration-300">
      <IntroductionWidget onOpenAbout={onOpenAbout} />
      <WeatherWidget variant="desktop" />
      <MusicWidget variant="desktop" />
    </div>
  );
}
