/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Lottie from "lottie-react";
import loadingJson from "../assets/loading.json";

export default function LoadingScreen() {
  const { error } = useSelector((state) => state.weather);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-5 py-10"
    >
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 4, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, repeatType: "reverse" },
        }}
      >
        <Lottie
          animationData={loadingJson}
          loop
          autoplay
          style={{ width: 150 }}
        />
      </motion.div>
      <motion.p
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-xl font-medium text-blue-200 drop-shadow-md"
      >
        Loading Weather Data...
      </motion.p>
      {error && (
        <p className="text-red-300 text-sm font-semibold text-center mt-2">
          {error}
        </p>
      )}
    </motion.div>
  );
}
