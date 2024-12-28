// src/components/ProductShowcase/Loading.jsx
import React from "react";
import { motion } from "framer-motion";

const Loading = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm">
    <motion.div
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
      className="w-12 h-12 border-4 border-[#DA627D] border-t-transparent rounded-full"
    />
  </div>
);

export default Loading;
