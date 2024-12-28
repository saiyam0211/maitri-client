// src/components/Header/Navigation.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Navigation = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Why Choose Us", path: "#why-choose-us" },
    { name: "Products", path: "#products" },
    // { name: "Benefits", path: "#benefits" },
    { name: "Testimonials", path: "#testimonials" },
    { name: "FAQs", path: "#faqs" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 750) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuItemClick = (path) => {
    setIsMenuOpen(false);
    if (path.startsWith("#")) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Get the menu button styles based on scroll position
  const getMenuButtonStyles = () => {
    return {
      backgroundColor: hasScrolled
      ? "rgba(249, 219, 189, 0.9)"
      : "rgba(249, 219, 189, 0.2)",
      color: "black",
      padding: "8px 16px",
      borderRadius: "9999px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.3s ease",
    };
  };

  // Get menu background styles
  const getMenuStyles = () => {
    return {
      backgroundColor: hasScrolled
        ? "rgba(249, 219, 189, 0.9)"
        : "rgba(249, 219, 189, 0.2)",
      backdropFilter: "blur(8px)",
      transition: "all 0.3s ease",
    };
  };

  return (
    <nav className="nav flex items-center">
      <div className="relative">
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={getMenuButtonStyles()}
          className="hover:bg-[#DA627D] transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="font-medium">Menu</span>
          <motion.div
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={getMenuStyles()}
              className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg py-2 z-50"
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => handleMenuItemClick(item.path)}
                    className="w-full text-left px-4 py-2 text-black hover:bg-white/10 transition-colors"
                  >
                    {item.name}
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Auth Section */}
      {/* <div className="ml-4">
        {user ? (
          <Link
            to="/account"
            className="bg-[#DA627D]/80 px-4 py-2 rounded-full font-bold text-white hover:bg-[#DA627D] transition-colors"
          >
            {user.name?.charAt(0)}
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-[#DA627D] text-white px-6 py-2 rounded-full hover:bg-[#FFA5AB] transition-colors font-medium"
          >
            Login
          </Link>
        )}
      </div> */}
    </nav>
  );
};

export default Navigation;
