/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchWeather,
  fetchForecast,
  clearSearchHistory,
} from "../features/weather/weatherSlice";

export default function SearchHistory() {
  const { searchHistory } = useSelector((state) => state.weather);
  const dispatch = useDispatch();

  const handleClick = (city) => {
    dispatch(fetchWeather(city)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        const { lat, lon } = res.payload;
        dispatch(fetchForecast({ lat, lon }));
      }
    });
  };

  if (searchHistory.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="w-full mb-4 overflow-hidden bg-white/10 backdrop-blur-lg rounded-3xl border border-white/10 shadow-md px-4 py-3"
    >
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm md:text-base text-white/80 font-semibold mr-3">
            Recent:
          </span>
          {searchHistory.map((city, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(city)}
              className="bg-gradient-to-b from-blue-700/50 to-indigo-800/60 text-white/80 text-xs md:text-sm font-medium px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:from-blue-600/60 hover:to-indigo-700/60 transition-all cursor-pointer shadow-md"
            >
              {city}
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => dispatch(clearSearchHistory())}
          className="group text-xs text-white/70  rounded-full bg-red-800 p-1 cursor-pointer hover:bg-red-500 transition-colors duration-200"
        >
          <ClearIcon className="text-sm group-hover:text-black transition-colors duration-200" />
        </motion.button>
      </div>
    </motion.div>
  );
}
