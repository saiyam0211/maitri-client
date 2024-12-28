import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Battery, Heart, Sun, Moon, Shield } from "lucide-react";
import "../styles/MovingCards.css";

const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    setStart(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-20 max-w-screen overflow-hidden mask-gradient"
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full shrink-0 gap-8 py-8 w-max flex-nowrap ${
          start ? "animate-scroll" : ""
        } ${pauseOnHover ? "hover:pause-animation" : ""}`}
      >
        {items.map((item, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center w-[350px] h-[200px]"
            style={{
              background: `linear-gradient(to bottom, ${item.gradientStart} 0%, ${item.gradientEnd} 100%)`,
              padding: "1px",
            }}
          >
            <div className="w-full h-full rounded-xl bg-white p-4 flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-[#DA627D] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

const benefits = [
  {
    icon: <Battery className="w-8 h-8 text-[#DA627D]" />,
    title: "Enhanced Energy",
    description:
      "Natural, sustained energy throughout the day without crashes or jitters.",
    proof: "92% reported increased energy levels",
  },
  {
    icon: <Heart className="w-8 h-8 text-[#DA627D]" />,
    title: "Hormonal Balance",
    description: "Support for natural hormonal cycles and overall wellness.",
    proof: "89% experienced better hormonal balance",
  },
  {
    icon: <Shield className="w-8 h-8 text-[#DA627D]" />,
    title: "Immune Support",
    description: "Strengthened immune system and natural defense mechanisms.",
    proof: "94% showed improved immune response",
  },
  {
    icon: <Sun className="w-8 h-8 text-[#DA627D]" />,
    title: "Radiant Skin",
    description: "Nourish your skin from within for a natural, healthy glow.",
    proof: "87% noticed improved skin health",
  },
  {
    icon: <Moon className="w-8 h-8 text-[#DA627D]" />,
    title: "Better Sleep",
    description: "Improved sleep quality for better rest and recovery.",
    proof: "88% experienced better sleep quality",
  },
  {
    icon: <Battery className="w-8 h-8 text-[#DA627D]" />,
    title: "Enhanced Energy",
    description:
      "Natural, sustained energy throughout the day without crashes or jitters.",
    proof: "92% reported increased energy levels",
  },
  {
    icon: <Heart className="w-8 h-8 text-[#DA627D]" />,
    title: "Hormonal Balance",
    description: "Support for natural hormonal cycles and overall wellness.",
    proof: "89% experienced better hormonal balance",
  },
  {
    icon: <Shield className="w-8 h-8 text-[#DA627D]" />,
    title: "Immune Support",
    description: "Strengthened immune system and natural defense mechanisms.",
    proof: "94% showed improved immune response",
  },
  {
    icon: <Sun className="w-8 h-8 text-[#DA627D]" />,
    title: "Radiant Skin",
    description: "Nourish your skin from within for a natural, healthy glow.",
    proof: "87% noticed improved skin health",
  },
  {
    icon: <Moon className="w-8 h-8 text-[#DA627D]" />,
    title: "Better Sleep",
    description: "Improved sleep quality for better rest and recovery.",
    proof: "88% experienced better sleep quality",
  },
  {
    icon: <Battery className="w-8 h-8 text-[#DA627D]" />,
    title: "Enhanced Energy",
    description:
      "Natural, sustained energy throughout the day without crashes or jitters.",
    proof: "92% reported increased energy levels",
  },
  {
    icon: <Heart className="w-8 h-8 text-[#DA627D]" />,
    title: "Hormonal Balance",
    description: "Support for natural hormonal cycles and overall wellness.",
    proof: "89% experienced better hormonal balance",
  },
  {
    icon: <Shield className="w-8 h-8 text-[#DA627D]" />,
    title: "Immune Support",
    description: "Strengthened immune system and natural defense mechanisms.",
    proof: "94% showed improved immune response",
  },
  {
    icon: <Sun className="w-8 h-8 text-[#DA627D]" />,
    title: "Radiant Skin",
    description: "Nourish your skin from within for a natural, healthy glow.",
    proof: "87% noticed improved skin health",
  },
  {
    icon: <Moon className="w-8 h-8 text-[#DA627D]" />,
    title: "Better Sleep",
    description: "Improved sleep quality for better rest and recovery.",
    proof: "88% experienced better sleep quality",
  },
  {
    icon: <Battery className="w-8 h-8 text-[#DA627D]" />,
    title: "Enhanced Energy",
    description:
      "Natural, sustained energy throughout the day without crashes or jitters.",
    proof: "92% reported increased energy levels",
  },
  {
    icon: <Heart className="w-8 h-8 text-[#DA627D]" />,
    title: "Hormonal Balance",
    description: "Support for natural hormonal cycles and overall wellness.",
    proof: "89% experienced better hormonal balance",
  },
  {
    icon: <Shield className="w-8 h-8 text-[#DA627D]" />,
    title: "Immune Support",
    description: "Strengthened immune system and natural defense mechanisms.",
    proof: "94% showed improved immune response",
  },
  {
    icon: <Sun className="w-8 h-8 text-[#DA627D]" />,
    title: "Radiant Skin",
    description: "Nourish your skin from within for a natural, healthy glow.",
    proof: "87% noticed improved skin health",
  },
  {
    icon: <Moon className="w-8 h-8 text-[#DA627D]" />,
    title: "Better Sleep",
    description: "Improved sleep quality for better rest and recovery.",
    proof: "88% experienced better sleep quality",
  },
  {
    icon: <Battery className="w-8 h-8 text-[#DA627D]" />,
    title: "Enhanced Energy",
    description:
      "Natural, sustained energy throughout the day without crashes or jitters.",
    proof: "92% reported increased energy levels",
  },
  {
    icon: <Heart className="w-8 h-8 text-[#DA627D]" />,
    title: "Hormonal Balance",
    description: "Support for natural hormonal cycles and overall wellness.",
    proof: "89% experienced better hormonal balance",
  },
  {
    icon: <Shield className="w-8 h-8 text-[#DA627D]" />,
    title: "Immune Support",
    description: "Strengthened immune system and natural defense mechanisms.",
    proof: "94% showed improved immune response",
  },
  {
    icon: <Sun className="w-8 h-8 text-[#DA627D]" />,
    title: "Radiant Skin",
    description: "Nourish your skin from within for a natural, healthy glow.",
    proof: "87% noticed improved skin health",
  },
  {
    icon: <Moon className="w-8 h-8 text-[#DA627D]" />,
    title: "Better Sleep",
    description: "Improved sleep quality for better rest and recovery.",
    proof: "88% experienced better sleep quality",
  },
];

const WhyChooseUs = () => {
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
    {
      title: "Women-Focused",
      desc: "Specially designed for women s unique needs",
      gradientStart: "#FFA5AB",
      gradientEnd: "#DA627D",
    },
    {
      title: "Quality Tested",
      desc: "Third-party tested for purity and potency",
      gradientStart: "#DA627D",
      gradientEnd: "#FFA5AB",
    },
    {
      title: "Natural Formula",
      desc: "No artificial additives or preservatives",
      gradientStart: "#FFA5AB",
      gradientEnd: "#DA627D",
    },
  ];

  return (
    <div className="bg-[#f9dbbd00] py-20" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-4xl font-bold text-center text-[#000] mb-4">
          Why Choose Us
        </h2>
        <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto">
          Discover what sets our supplements apart and why thousands of women
          trust us for their wellness journey
        </p>
      </div>

      <InfiniteMovingCards
        items={items}
        direction="left"
        speed="normal"
        pauseOnHover={true}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-[#D4F6EC] p-8 rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-[#A53860] mb-6">
            Backed by Science
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-[#A53860] mb-4">
                Clinical Studies
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#A53860]" />
                  <span className="text-gray-700">
                    6-month double-blind study with 1,000+ participants
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#A53860]" />
                  <span className="text-gray-700">
                    Peer-reviewed research in leading journals
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#A53860]" />
                  <span className="text-gray-700">
                    Regular third-party testing for quality
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#A53860] mb-4">
                Quality Assurance
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#A53860]" />
                  <span className="text-gray-700">FDA registered facility</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#A53860]" />
                  <span className="text-gray-700">
                    GMP certified manufacturing
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#A53860]" />
                  <span className="text-gray-700">
                    Rigorous quality control
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            * Based on our 6-month clinical study results
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
