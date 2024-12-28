import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, Instagram, Facebook, Twitter } from "lucide-react";
import Logo from "../media/logo.png";

const Footer = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const footerLinks = [
    {
      title: "",
      items: [
        { item: "", url: "/products" },
        { item: "", url: "/best-sellers" },
        { item: "", url: "/new-arrivals" },
        { item: "", url: "/offers" },
      ],
    },
    {
      title: "Information",
      items: [
        { item: "About Us", url: "/about" },
        { item: "Privacy Policy", url: "/privacy" },
        { item: "Shipping Policy", url: "/shipping" },
        { item: "Returns", url: "/returns" },
      ],
    },
    {
      title: "Contact",
      items: [
        { item: "support@maitir.com", url: "mailto:support@maitri.com" },
        { item: "+1 (888) 123-4567", url: "tel:+18881234567" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Instagram className="w-6 h-6" />, url: "#" },
    { icon: <Facebook className="w-6 h-6" />, url: "#" },
    { icon: <Twitter className="w-6 h-6" />, url: "#" },
  ];

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <footer
      ref={ref}
      className="bg-[#DA627D] text-black pt-16 pb-8 px-4 md:px-8 lg:px-16 rounded-t-[30px] mt-20"
    >
      <div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Logo Section */}
        <motion.div variants={itemVariants} className="space-y-4">
          <motion.div className="flex items-center space-x-2">
            <img src={Logo} height={40} width={200} />
          </motion.div>
          <p className="text-sm">
            Empowering women's wellness through premium, science-backed
            supplements
          </p>
        </motion.div>

        {/* Links Sections */}
        {footerLinks.map((column, index) => (
          <motion.div key={index} variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold">{column.title}</h3>
            <ul className="space-y-2">
              {column.items.map((item, itemIndex) => (
                <motion.li
                  key={itemIndex}
                  variants={itemVariants}
                  className="hover:translate-x-1 transition-transform duration-200"
                >
                  <a href={item.url} className="text-sm hover:underline">
                    {item.item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Bottom Section */}
      <div
        className="mt-16 pt-8 border-t border-black"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <motion.div variants={itemVariants} className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                className="transition-transform duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>

          <div variants={itemVariants} className="text-sm">
            © 2024 Maitri. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
