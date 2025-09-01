/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import humidity from "../assets/humidity.png";
import pressure from "../assets/pressure-gauge.png";
import wind from "../assets/wind.png";
import { useSelector } from "react-redux";
import { icons } from "../components/WeatherIcons";

export default function WeatherDisplay() {
  const { weatherData } = useSelector((state) => state.weather);

  if (!weatherData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col md:flex-row items-center justify-between mb-4 md:mb-6 bg-white/10 p-4 rounded-2xl md:rounded-3xl backdrop-blur-md drop-shadow-lg border border-white/10"
    >
      {/* Location and Weather Icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center mb-4 md:mb-0 w-full md:w-auto"
      >
        <motion.h2
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          className="text-xl md:text-2xl font-bold text-sky-600 text-center mb-2"
        >
          {weatherData.location}, {weatherData.country}
        </motion.h2>

        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-24 h-24 md:w-32 md:h-32 mb-2"
        >
          {icons[weatherData.iconCode]}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base md:text-lg text-sky-400 font-medium capitalize text-center"
        >
          {weatherData.description}
        </motion.p>
      </motion.div>

      {/* Temperature Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center mb-4 md:mb-0 w-full md:w-auto"
      >
        <div className="flex items-end justify-center w-full">
          <motion.p
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="text-4xl md:text-5xl font-bold text-sky-500 mb-2 "
          >
            {weatherData.temperature}
          </motion.p>
          <span className="text-xl md:text-2xl text-sky-500 font-bold ml-1 mb-5 md:mb-6">
            °C
          </span>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-base md:text-xl text-sky-500 mt-2 text-center font-bold"
        >
          Feels like{" "}
          <span className="font-semibold">
            {weatherData.feelsLike}
            <sup className="text-xs align-middle ml-0.5 font-bold">°C</sup>
          </span>{" "}
        </motion.p>
      </motion.div>

      {/* Weather Metrics Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full md:w-auto grid grid-cols-2 md:flex md:flex-col gap-3 px-2 py-3"
      >
        <motion.div
          className="flex items-center gap-3 p-2 md:p-3 bg-gradient-to-b from-blue-700/40 to-indigo-800/40  rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          <img src={humidity} className="w-8 md:w-10" alt="Humidity" />
          <div>
            <p className="text-xs md:text-sm font-medium text-blue-200">
              Humidity
            </p>
            <p className="text-base md:text-xl font-bold text-white">
              {weatherData.humidity}%
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-3 p-2 md:p-3 bg-gradient-to-b from-blue-700/40 to-indigo-800/40  rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          <img src={wind} className="w-8 md:w-10" alt="Wind" />
          <div>
            <p className="text-xs md:text-sm font-medium text-blue-200">Wind</p>
            <p className="text-base md:text-xl font-bold text-white">
              {weatherData.windSpeed} km/h
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-3 p-2 md:p-3 bg-gradient-to-b from-blue-700/40 to-indigo-800/40 rounded-xl col-span-2 md:col-auto"
          whileHover={{ scale: 1.02 }}
        >
          <img src={pressure} className="w-8 md:w-10" alt="Pressure" />
          <div>
            <p className="text-xs md:text-sm font-medium text-blue-200">
              Pressure
            </p>
            <p className="text-base md:text-xl font-bold">
              {weatherData.pressure} hPa
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
