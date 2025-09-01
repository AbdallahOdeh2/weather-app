/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useSelector } from "react-redux";
import { forecastIcon } from "./ForecastIcons";

export default function WeatherForecast() {
  const { forecastData } = useSelector((state) => state.weather);
  const controls = useAnimation();
  const scrollContainer = useRef(null);

  if (
    !forecastData ||
    !Array.isArray(forecastData) ||
    forecastData.length === 0
  ) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full flex flex-col items-center bg-white/10 p-4 rounded-2xl md:rounded-3xl backdrop-blur-sm shadow-lg border border-white/10 min-h-[180px]"
      >
        <motion.h2
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          className="text-xl font-bold text-white mb-4 text-center"
        >
          5-Day Forecast
        </motion.h2>
        <p className="text-white/80 text-center py-4">
          Forecast data not available
        </p>
      </motion.div>
    );
  }

  // Shared card classes
  const cardClasses =
    "bg-gradient-to-b from-blue-700/40 to-indigo-800/40 backdrop-blur-2xl p-3 rounded-xl text-white text-center flex flex-col items-center text-xs";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex flex-col items-center bg-white/10 p-4 rounded-2xl md:rounded-3xl shadow-lg border border-white/10 min-h-[200px]"
    >
      <motion.h2
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        className="text-lg md:text-xl font-semibold text-white mb-4 text-center"
      >
        5-Day Forecast
      </motion.h2>

      {/* Mobile Scrollable Forecast */}
      <div className="w-full md:hidden">
        <div
          ref={scrollContainer}
          className="flex gap-3 overflow-x-auto scroll-smooth pb-3 px-2 no-scrollbar md:overflow-x-visible md:flex-wrap"
        >
          {forecastData.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3, boxShadow: "0 6px 16px rgba(0,0,0,0.2)" }}
              className={`min-w-[110px] flex-shrink-0 ${cardClasses}`}
            >
              <p className="font-semibold mb-1 text-xs">{day.date}</p>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="text-2xl mb-1"
              >
                {forecastIcon[day.iconCode] || "🌤️"}
              </motion.div>
              <p className="capitalize mb-1 text-[10px] leading-tight">
                {day.weather}
              </p>
              <p className="text-[9px] text-blue-200">Temp</p>
              <p className="font-bold text-sm">{day.temp}°C</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop Grid Forecast */}
      <div className="hidden md:flex flex-wrap justify-center gap-4">
        {forecastData.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -3, boxShadow: "0 6px 16px rgba(0,0,0,0.2)" }}
            className={`w-[120px] ${cardClasses}`}
          >
            <p className="font-semibold mb-1 text-xs">{day.date}</p>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="text-2xl mb-1"
            >
              {forecastIcon[day.iconCode] || "🌤️"}
            </motion.div>
            <p className="capitalize mb-1 text-[10px] leading-tight">
              {day.weather}
            </p>
            <p className="text-[9px] text-blue-200">Temp</p>
            <p className="font-bold text-sm">{day.temp}°C</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
