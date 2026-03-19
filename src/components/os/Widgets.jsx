import React from "react";
import WeatherWidget from "./widgets/WeatherWidget";
import MusicWidget from "./widgets/MusicWidget";
import IntroductionWidget from "./widgets/IntroductionWidget";

export default function Widgets({ onOpenAbout }) {
  return (
    <div className="flex flex-col gap-3 lg:gap-4 2xl:gap-5 pointer-events-auto items-end w-[230px] lg:w-[280px] xl:w-[300px] 2xl:w-[320px] transition-all duration-300">
      <IntroductionWidget onOpenAbout={onOpenAbout} />
      <div className="hidden lg:block w-full">
        <WeatherWidget variant="desktop" />
      </div>
      <div className="hidden lg:block w-full">
        <MusicWidget variant="desktop" />
      </div>
    </div>
  );
}
