// src/components/ProductShowcase/ModelLoader.jsx
import React from "react";
import { motion } from "framer-motion";

const ModelLoader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#F9DBBD]/50 backdrop-blur-sm">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-16 h-16 border-4 border-[#DA627D] border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.p
          className="mt-4 text-[#DA627D] font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Loading 3D Model...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ModelLoader;
