import React, { useState, useEffect } from "react";
import { CloudSun, CloudRain, Sun, Cloud } from "lucide-react";

export default function WeatherWidget({ variant = "mobile" }) {
  const [weather, setWeather] = useState({
    temp: "--",
    description: "Loading",
    icon: CloudSun,
  });

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // ... same fetch logic ...
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=13.754&longitude=100.5014&current_weather=true",
        );
        const data = await res.json();
        const current = data.current_weather;
        let desc = "Clear";
        let Icon = Sun;
        if (current.weathercode >= 1 && current.weathercode <= 3) {
          desc = "Partly Cloudy";
          Icon = CloudSun;
        } else if (current.weathercode >= 51 && current.weathercode <= 67) {
          desc = "Rain";
          Icon = CloudRain;
        } else if (current.weathercode >= 45 && current.weathercode <= 48) {
          desc = "Fog/Haze";
          Icon = Cloud;
        }
        setWeather({
          temp: Math.round(current.temperature),
          description: desc,
          icon: Icon,
        });
      } catch (error) {
        setWeather({ temp: "32", description: "Hazy Sun", icon: CloudSun });
      }
    };
    fetchWeather();

    const today = new Date();
    const shortDay = today
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase();
    const dateStr = today
      .toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .toUpperCase();
    setCurrentDate(`${shortDay}, ${dateStr}`);
  }, []);

  const WeatherIcon = weather.icon;

  if (variant === "desktop") {
    return (
      // CHANGED: aspect-[3/2] -> aspect-[2/1] to make it shorter/smaller height
      <div className="w-full box-border bg-[#F9F6EE]/80 border-[2px] md:border-[3px] border-black p-3 xl:p-4 rounded-xl shadow-[4px_4px_0px_black] md:shadow-[5px_5px_0px_black] flex flex-col justify-between aspect-[2/1] relative active:translate-y-[2px] transition-all">
        {/* TOP ROW */}
        <div className="flex justify-between items-start w-full">
          <span className="font-bold text-[9px] xl:text-[10px] 2xl:text-xs uppercase tracking-widest text-gray-500 mt-1 shrink-0">
            Bangkok
          </span>
          <div className="bg-black text-white px-2 py-0.5 xl:px-2.5 xl:py-1 rounded-md text-[8px] xl:text-[9px] 2xl:text-[10px] font-mono font-bold tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,0.2)] whitespace-nowrap">
            {currentDate}
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="flex justify-between items-end w-full mt-1">
          <div className="flex flex-col overflow-hidden pr-2">
            <div className="flex items-baseline gap-1">
              <span className="font-black text-3xl xl:text-4xl 2xl:text-5xl tracking-tighter leading-none">
                {weather.temp}
              </span>
              <span className="font-bold text-lg xl:text-xl">°C</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full border border-black shadow-[1px_1px_0px_black] shrink-0"></div>
              <span className="text-[8px] xl:text-[9px] 2xl:text-[10px] font-bold uppercase tracking-wide truncate">
                {weather.description}
              </span>
            </div>
          </div>

          <div className="border-[2px] border-black p-1.5 xl:p-2 rounded-xl bg-[#A3C9C7] shadow-[2px_2px_0px_black] shrink-0">
            <WeatherIcon
              className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 text-black"
              strokeWidth={2.5}
            />
          </div>
        </div>
      </div>
    );
  }

  // --- MOBILE / TABLET STYLING ---
  return (
    <div className="bg-[#F9F6EE]/80 border-[2px] md:border-[3px] border-black p-3 md:p-4 rounded-xl shadow-[4px_4px_0px_black] md:shadow-[5px_5px_0px_black] flex flex-col aspect-[4/3] relative active:translate-y-[2px] transition-all">
      <div className="flex justify-between items-center border-b-2 border-black/10 pb-2 md:pb-3 mb-2 md:mb-3">
        <div className="bg-black text-white px-2 py-0.5 md:px-2 md:py-1 rounded text-[8px] md:text-[9px] font-mono font-bold tracking-widest whitespace-nowrap">
          {currentDate}
        </div>
      </div>

      <div className="flex justify-between items-end flex-grow">
        <div className="flex flex-col h-full justify-between">
          <span className="font-bold text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500">
            Bangkok
          </span>
          <div>
            <span className="font-black text-4xl md:text-5xl leading-none mt-1 block">
              {weather.temp}°
            </span>
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wide mt-1 md:mt-2 block truncate max-w-[80px] md:max-w-[100px]">
              {weather.description}
            </span>
          </div>
        </div>

        <div className="bg-[#A3C9C7] border-2 border-black p-1.5 md:p-2 rounded-lg mb-1">
          <div className="w-[22px] h-[22px] md:w-[28px] md:h-[28px]">
            <WeatherIcon
              className="w-full h-full text-black"
              strokeWidth={2.5}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
