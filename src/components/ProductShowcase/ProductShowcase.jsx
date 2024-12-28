// src/components/ProductShowcase/ProductShowcase.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProductModel from "./ProductModel";

// Add this to the top of ProductShowcase.jsx
const PRODUCTS = [
  {
    id: 1,
    name: "Daily Wellness",
    description: "Complete daily nutrition support",
    modelPath: "/models/medicinebottle.glb", // Updated path
    price: 1000,
  },
  {
    id: 2,
    name: "Beauty Boost",
    description: "Radiant skin & hair formula",
    modelPath: "/models/medicinebottle.glb", // Updated path
    price: 1000,
  },
  {
    id: 3,
    name: "Energy Plus",
    description: "Natural energy enhancement",
    modelPath: "/models/medicinebottle.glb", // Updated path
    price: 1000,
  },
];

const ProductShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % PRODUCTS.length);
  };

  const getCenterProduct = () => PRODUCTS[currentIndex];
  const getNextProduct = () => PRODUCTS[(currentIndex + 1) % PRODUCTS.length];

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
    <div className="relative h-screen bg-[#f9dbbd00] overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Side Product */}
        <motion.div
          className="absolute left-0 top-1/2  w-1/3 h-[400px] cursor-pointer"
          onClick={handleNext}
          initial={{ x: "50%", opacity: 0.5, scale: 0.8 }}
          animate={{
            x: "-20%",
            opacity: 0.5,
            scale: 0.8,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <ProductModel
            modelPath={getNextProduct().modelPath}
            isCentered={false}
          />
        </motion.div>

        {/* Center Product */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="relative w-1/2 h-[600px]"
            initial={{ x: "100%", opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { type: "spring", stiffness: 300, damping: 30 },
            }}
            exit={{
              x: "-50%",
              opacity: 0.5,
              scale: 0.8,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
          >
            <ProductModel
              modelPath={getCenterProduct().modelPath}
              isCentered={true}
            />

            {/* Product Info */}
            <motion.div
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-center w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-[#DA627D] mb-2">
                {getCenterProduct().name}
              </h2>
              <p className="text-xl text-[#FFA5AB] mb-4">
                {getCenterProduct().description}
              </p>
              <p className="text-2xl font-bold text-[#DA627D] mb-4">
                ₹{getCenterProduct().price.toLocaleString()}
              </p>
              <motion.button
                onClick={handleLearnMore}
                className="mt-6 bg-[#DA627D] text-white px-8 py-3 rounded-full hover:bg-[#FFA5AB] transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
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
        {PRODUCTS.map((_, index) => (
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
