/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function ErrorScreen() {
  const { error } = useSelector((state) => state.weather);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-5 py-10"
    >
      <motion.div
        animate={{
          x: [-5, 5, -5],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <DotLottieReact
          src="https://lottie.host/19888683-b7f5-4d2f-9b6a-b5b8c3af7c49/TYRIpw0iwP.lottie"
          loop
          autoplay
          style={{ width: 150, height: 150 }}
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-medium text-red-300 drop-shadow-md text-center px-4"
      >
        {error || "Something went wrong. Please try again."}
      </motion.p>
    </motion.div>
  );
}
