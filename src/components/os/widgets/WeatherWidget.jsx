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
    const fetchWeather = async () => {
      try {
        const apiUrl = "https://api.open-meteo.com/v1/forecast";
        const lat = "13.754";
        const lon = "100.5014";

        const res = await fetch(
          `${apiUrl}?latitude=${lat}&longitude=${lon}&current_weather=true`,
        );
        if (!res.ok) throw new Error("Weather request failed");
        const data = await res.json();
        if (!data?.current_weather) throw new Error("Missing weather data");
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
        console.error("Weather fetch error:", error);
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

  if (variant === "compact") {
    return <section aria-label="Bangkok weather" className="native-widget flex h-full min-h-[112px] flex-col justify-between p-3.5">
      <p className="font-sans text-xs font-semibold text-zinc-300">Bangkok</p>
      <div className="flex items-center justify-between gap-1"><span className="font-sans text-[32px] font-semibold leading-none tracking-tight text-zinc-100">{weather.temp}°</span><WeatherIcon size={26} strokeWidth={1.6} className="shrink-0 text-zinc-300" aria-hidden="true" /></div>
      <p className="font-sans text-[10px] leading-tight text-zinc-300">{weather.description}</p>
    </section>;
  }

  if (variant === "desktop") {
    return (
      <div className="w-full box-border bg-[#19191c]/85 backdrop-blur-md border border-white/10 p-3 xl:p-4 rounded-2xl flex flex-col justify-between aspect-[2/1] relative hover:border-white/10 transition-all">
        {/* TOP ROW */}
        <div className="flex justify-between items-start w-full">
          <span className="font-medium text-[9px] xl:text-[10px] 2xl:text-xs uppercase tracking-widest text-zinc-400 mt-1 shrink-0">
            Bangkok
          </span>
          <div className="bg-black/90 text-white px-2 py-0.5 xl:px-2.5 xl:py-1 rounded-lg text-[8px] xl:text-[9px] 2xl:text-[10px] font-mono font-medium tracking-wider whitespace-nowrap">
            {currentDate}
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="flex justify-between items-end w-full">
          <div className="flex flex-col overflow-hidden pr-2">
            <div className="flex items-baseline gap-1">
              <span className="font-black text-3xl xl:text-4xl 2xl:text-5xl tracking-tighter leading-none text-zinc-200">
                {weather.temp}
              </span>
              <span className="font-bold text-lg xl:text-xl text-zinc-300">
                °C
              </span>
            </div>
            <div className="flex items-center gap-1.5 ">
              <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full shrink-0"></div>
              <span className="text-[8px] xl:text-[9px] 2xl:text-[10px] font-medium uppercase tracking-wide truncate text-zinc-400">
                {weather.description}
              </span>
            </div>
          </div>

          <div className="border border-white/10 p-2 xl:p-2.5 rounded-xl bg-white/5 shrink-0">
            <WeatherIcon
              className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 text-zinc-400"
              strokeWidth={2}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#19191c]/85 backdrop-blur-md border border-white/10 p-3 md:p-4 rounded-2xl flex flex-col aspect-[4/3] relative hover:border-white/10 transition-all">
      <div className="flex justify-between items-center border-b border-white/10 pb-2 md:pb-3 mb-2 md:mb-3">
        <div className="bg-black/90 text-white px-2 py-0.5 md:px-2 md:py-1 rounded-lg text-[8px] md:text-[9px] font-mono font-medium tracking-widest whitespace-nowrap">
          {currentDate}
        </div>
      </div>

      <div className="flex justify-between items-end flex-grow">
        <div className="flex flex-col h-full justify-between">
          <span className="font-medium text-[9px] md:text-[10px] uppercase tracking-widest text-zinc-400">
            Bangkok
          </span>
          <div>
            <span className="font-black text-4xl md:text-5xl leading-none mt-1 block text-zinc-200">
              {weather.temp}°
            </span>
            <span className="text-[9px] md:text-[10px] font-medium uppercase tracking-wide mt-1 md:mt-2 block truncate max-w-[80px] md:max-w-[100px] text-zinc-400">
              {weather.description}
            </span>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-2 md:p-2.5 rounded-xl mb-1">
          <div className="w-[22px] h-[22px] md:w-[28px] md:h-[28px]">
            <WeatherIcon
              className="w-full h-full text-zinc-400"
              strokeWidth={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
