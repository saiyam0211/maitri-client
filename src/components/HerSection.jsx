import React, { useState } from "react";
import { motion } from "framer-motion";
import Lady from "../media/hero.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Menstrual from '../media/menstrual.gif';

const HerSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();
  const getCenterProduct = () => products[currentIndex];

  const products = [
    {
      id: 1,
      name: "Maitri Menstruation",
      description: "A daily supplement to ease menstrual discomfort, reduce mood swings, and replenish essential minerals lost during periods.",
      image: Menstrual, // Using the imported GIF
      price: 599,
    },
  ];


  const handleLearnMore = () => {
    const selectedProduct = getCenterProduct();
    localStorage.setItem(
      "cartItem",
      JSON.stringify({
        ...selectedProduct,
        quantity: 1,
      })
    );

    if (!user) {
      navigate("/login", {
        state: {
          from: "/billing",
          product: selectedProduct,
        },
      });
    } else {
      navigate("/billing", { state: { product: selectedProduct } });
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#f9dbbd00] overflow-hidden font-sans">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-40">
        {/* Mobile Background */}
        <div
          className="absolute inset-0 bg-no-repeat bg-cover md:hidden"
          style={{ backgroundImage: "url(/media/mobile-hero.svg)" }}
        />
        {/* Desktop Background */}
        <img
          src="/media/final.svg"
          alt="Background Pattern"
          className="hidden md:block w-[80%] h-[160%] z-40"
        />
      </div>
      {/* Main Content */}
      <div className="flex h-full md:pl-16 relative z-50">
        {/* Left Content */}
        <div className="flex flex-col justify-center px-6 md:px-12 w-full md:w-1/2 pt-20 pb-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#000] text-4xl md:text-4xl font-bold leading-tight mb-4"
          >
            Supplements Designed &nbsp;
            {/* <br /> */}
            for Her!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#000] text-xl mb-8"
          >
            Natural Beauty Inside Out
          </motion.p>
          {/* Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-md rounded-xl p-5 md:p-8 w-full md:max-w-lg shadow-lg border border-[#FFA5AB]/20"
          >
            <h3 className="text-[#000] text-xl md:text-2xl font-semibold mb-4">
              Science-Backed Formulations
            </h3>
            <p className="text-gray-700">
              Premium quality supplements specifically formulated for women's
              unique nutritional needs. Made with natural ingredients and backed
              by scientific research.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleLearnMore}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-[#BCF8F8] text-black px-8 py-3 rounded-full hover:bg-[#FFA5AB] transition-colors duration-300"
            >
              Shop Now
            </motion.button>
          </motion.div>
        </div>
        {/* Right Content - Image Section */}
        <div className="hidden -z-10 md:block relative w-1/2">
          <motion.div
            className="absolute inset-0 transform"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.4,
            }}
          >
            <motion.img
              src={Lady}
              alt="Lady"
              className="object-cover h-[100%] w-[50%] negative-z-index absolute bottom-0 right-0"
              initial={{ scale: 0.1 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HerSection;
