import React, { useEffect, useRef, useState } from "react";
import HerSection from "../components/HerSection";
import InfiniteMovingCards from "../components/WhyChooseUs";
import { motion } from "framer-motion";
// import ProductShowcase from "../components/ProductShowcase/ProductShowcase";
import ProductShowcase from "../components/ProductShowcase";
import Header from "../components/Header/Header";


import FloatingBox from "../components/FloatingBox";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

const items = [
  {
    title: "Premium Ingredients",
    desc: "Ethically sourced, high-quality natural ingredients",
    gradientStart: "#FFA5AB",
    gradientEnd: "#DA627D",
  },
  {
    title: "Science-Backed",
    desc: "Formulated by experts, proven by research",
    gradientStart: "#DA627D",
    gradientEnd: "#FFA5AB",
  },
  // ... more items
];

const SectionWrapper = ({ id, children, className = "" }) => {
  return (
    <motion.section
      id={id}
      className={` relative ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.section>
  );
};

const Home = () => {
  const [backgroundColor, setBackgroundColor] = useState("#F9DBBD");
  const containerRef = useRef(null);

  // Updated color palette with purples and blues
  const colors = ["#F9DBBD", "#f2ccff", "#afe5a4"];

  useEffect(() => {
    const options = {
      threshold: Array.from({ length: 100 }, (_, i) => i / 100), // Create 100 thresholds for super smooth transitions
    };

    const calculateColor = (scrollPos) => {
      // Find which color pair we're between based on scroll position
      const colorIndex = Math.floor(scrollPos * (colors.length - 1));
      const nextColorIndex = Math.min(colorIndex + 1, colors.length - 1);

      // Calculate how far between these colors we are (0-1)
      const progress = (scrollPos * (colors.length - 1)) % 1;

      // Convert hex to RGB to interpolate
      const color1 = hexToRGB(colors[colorIndex]);
      const color2 = hexToRGB(colors[nextColorIndex]);

      // Interpolate between the colors
      const r = Math.round(color1.r + (color2.r - color1.r) * progress);
      const g = Math.round(color1.g + (color2.g - color1.g) * progress);
      const b = Math.round(color1.b + (color2.b - color1.b) * progress);

      return `rgb(${r}, ${g}, ${b})`;
    };

    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPos = window.scrollY / scrollHeight;
      const newColor = calculateColor(scrollPos);
      setBackgroundColor(newColor);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial color

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper function to convert hex to RGB
  const hexToRGB = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col transition-colors duration-300 ease-in-out"
      style={{
        backgroundColor,
        transition: "background-color 0.5s ease-in-out",
      }}
    >
      <div className="relative z-10">
        <Header />

        <HerSection />
        <InfiniteMovingCards
          items={items}
          speed="normal" // can be "slow", "normal", or "fast"
          pauseOnHover={true}
        />
        <SectionWrapper id="products">
          <div className="py-20">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center text-[#000]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Products
            </motion.h2>
            <ProductShowcase />
          </div>
        </SectionWrapper>
        <div className="w-full h-[700px] md:-mb-40 relative overflow-hidden">
          <FloatingBox />
        </div>
        <Testimonials />
        <FAQ />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
