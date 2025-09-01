/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";
import SearchHistory from "./SearchHistory";
import earth from "../assets/earth-1.mp4";
import WeatherDisplay from "./WeatherDisplay";
import WeatherForecast from "./WeatherForecast";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import { useSelector, useDispatch } from "react-redux";
import { fetchForecast, fetchWeather } from "../features/weather/weatherSlice";

export default function WeatherContainer() {
  const dispatch = useDispatch();
  const { weatherData, loading, error } = useSelector((state) => state.weather);
  const videoRef = useRef(null);

  useEffect(() => {
    if (weatherData?.lat && weatherData?.lon) {
      dispatch(fetchForecast({ lat: weatherData.lat, lon: weatherData.lon }));
    }
  }, [weatherData, dispatch]);

  // Lazy load video for mobile
  useEffect(() => {
    const video = videoRef.current;
    if (video && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play();
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(video);
      return () => observer.unobserve(video);
    }
  }, []);

  useEffect(() => {
    const lastSearch = localStorage
      .getItem("weatherSearchHistory")
      ?.replaceAll('"', "")
      .split(",")[0];

    if (lastSearch) {
      dispatch(fetchWeather(lastSearch));
    }
  }, [dispatch]);

  return (
    <div className="w-full flex items-center justify-center min-h-screen relative ">
      <motion.video
        ref={videoRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1.5 }}
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={earth} type="video/mp4" />
      </motion.video>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="p-4 md:p-6 rounded-2xl shadow-2xl shadow-black w-[95%] max-w-4xl bg-black/30 backdrop-blur-sm flex flex-col items-center border border-white/10 ring-1 ring-white/10 text-white drop-shadow-lg relative z-20 my-4"
      >
        <SearchBar />
        <SearchHistory />

        <AnimatePresence mode="wait">
          {error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <ErrorScreen />
            </motion.div>
          ) : loading || !weatherData ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <LoadingScreen />
            </motion.div>
          ) : (
            <motion.div
              key="weather"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="w-full"
            >
              <WeatherDisplay />
              <WeatherForecast />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
