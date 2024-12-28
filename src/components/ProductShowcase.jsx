import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/ProductShowcase.css";
import Menstrual from "../media/menstrual.gif";
import Postpartum from "../media/postpartum.gif";

const ProductShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  const products = [
    {
      id: 1,
      name: "Maitri Menstruation",
      description:
        "A daily supplement to ease menstrual discomfort, reduce mood swings, and replenish essential minerals lost during periods.",
      image: Menstrual,
      price: 599,
    },
    {
      id: 2,
      name: "Maitri Postpartum",
      description:
        "A recovery supplement to support postpartum health, reduce fatigue, and promote overall well-being.",
      image: Postpartum,
      price: 599,
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const getCenterProduct = () => products[currentIndex];
  const getNextProduct = () => products[(currentIndex + 1) % products.length];

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

  const centerVariants = {
    enter: { x: "100%", opacity: 0 },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      x: "-50%",
      opacity: 0.5,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const sideVariants = {
    enter: {
      x: "50%",
      opacity: 0.5,
      scale: 0.8,
    },
    animate: {
      x: "-20%",
      opacity: 0.5,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="relative h-screen bg-[#f9dbbd00] overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Side Product */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 cursor-pointer md:block hidden"
          onClick={handleNext}
          initial="enter"
          animate="animate"
          exit="exit"
          variants={sideVariants}
        >
          <div className="w-56 max-w-md mx-auto">
            <img
              src={getNextProduct().image}
              alt={getNextProduct().name}
              className="w-full h-auto object-contain opacity-50"
            />
          </div>
        </motion.div>

        {/* Center Product */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="relative w-full md:w-1/2 max-w-xl mx-auto px-4 md:px-0"
            variants={centerVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <div className="w-full md:w-72">
              <img
                src={getCenterProduct().image}
                alt={getCenterProduct().name}
                className="w-full md:mr-10 h-auto object-contain"
              />
            </div>

            {/* Product Info */}
            <motion.div
              className="mt-8 md:mt-0 md:absolute md:bottom-28 left-1/2 -translate-x-1/2 text-center w-full"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#000] mb-2">
                {getCenterProduct().name}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-2 w-full md:w-78 px-4 md:px-0">
                {getCenterProduct().description}
              </p>
              <motion.button
                onClick={handleLearnMore}
                className="mt-6 bg-[#BCF8F8] text-black px-8 py-3 rounded-full hover:bg-[#FFA5AB] transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Buy now
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Background Elements */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              "radial-gradient(circle at 30% 50%, rgba(218, 98, 125, 0.1), transparent 70%)",
              "radial-gradient(circle at 70% 50%, rgba(218, 98, 125, 0.1), transparent 70%)",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {products.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-[#DA627D]" : "bg-[#FFA5AB]"
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductShowcase;
