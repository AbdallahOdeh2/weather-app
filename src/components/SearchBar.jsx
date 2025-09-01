/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { fetchWeather, fetchForecast } from "../features/weather/weatherSlice";

export default function SearchBar() {
  const [city, setCity] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [shake, setShake] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (!city.trim()) {
      dispatch(fetchWeather(""));
      return;
    }

    dispatch(fetchWeather(city)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        const { lat, lon } = res.payload;
        dispatch(fetchForecast({ lat, lon }));
      }
    });

    setCity("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex items-center justify-center gap-3 mb-4"
    >
      <motion.input
        type="text"
        placeholder="Enter City Name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        animate={{
          scale: isFocused ? 1.01 : 1,
          x: shake ? [0, -10, 10, -10, 10, 0] : 0,
          boxShadow: isFocused
            ? "0px 0px 15px rgba(59, 130, 246, 0.5)"
            : "0px 0px 5px rgba(0, 0, 0, 0.2)",
        }}
        transition={{ type: "spring", stiffness: 300 }}
        className="h-12 md:h-14 w-full border-0 outline-0 rounded-full px-4 md:px-5 text-base backdrop-blur-md md:text-lg bg-white/20 shadow-inner placeholder:text-white/80 placeholder:font-medium focus:ring-2 focus:ring-blue-400 text-cyan-200 font-mono"
      />
      <motion.button
        type="button"
        onClick={handleSearch}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="group rounded-full bg-gradient-to-r from-blue-500/80 to-indigo-600/80 p-3 md:p-4 shadow-lg cursor-pointer transition-all duration-200"
      >
        <SearchIcon className="text-white text-[1.5rem] group-hover:text-black transition-colors duration-200" />
      </motion.button>
    </motion.div>
  );
}
