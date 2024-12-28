import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import "../styles/FAQ.scss";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const itemRef = useRef(null);
  const isItemInView = useInView(itemRef, {
    triggerOnce: false,
    threshold: 0.5,
  });

  return (
    <motion.div
      id="faqs"
      className="mb-4 mx-auto max-w-4xl border border-[#FFA5AB] rounded-3xl overflow-hidden"
      ref={itemRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isItemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center cursor-pointer p-4"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
      >
        <motion.h3
          className="text-xl font-medium text-[#000] flex-grow"
          initial={{ width: "100%" }}
          animate={{ width: isOpen ? "90%" : "100%" }}
          transition={{ duration: 0.3 }}
        >
          {question}
        </motion.h3>
        <span className="text-4xl text-[#000]">{isOpen ? "−" : "+"}</span>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="px-4 pb-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-600 text-lg leading-relaxed pl-6">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, {
    triggerOnce: false,
    threshold: 0.5,
  });

  const faqData = [
    {
      question: "What makes your supplements different?",
      answer:
        "Our supplements are specifically formulated for women's needs, using premium, natural ingredients. Each product is backed by scientific research and manufactured in FDA-registered facilities under strict quality control.",
    },
    {
      question: "How long until I see results?",
      answer:
        "While individual results may vary, most women report noticeable improvements within 4-6 weeks of consistent use. For optimal results, we recommend following the recommended dosage and maintaining a healthy lifestyle.",
    },
    {
      question: "Are your supplements safe?",
      answer:
        "Yes, all our supplements undergo rigorous third-party testing for purity and potency. We use only natural, clinically-proven ingredients and manufacture in GMP-certified facilities. However, we always recommend consulting with your healthcare provider before starting any new supplement regimen.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, you can return unopened products for a full refund within 30 days of purchase. Please contact our customer service team for return instructions.",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="text-center mb-20">
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-[#000] mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={
              isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.8 }}
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.div
            className="max-w-4xl mx-auto mb-16 p-8 border border-[#FFA5AB] rounded-3xl bg-white/10 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={
              isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-semibold text-[#000] mb-4 text-center">
              Why Choose Our Supplements
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed text-center">
              Our premium supplements are specifically formulated for women's
              unique needs, combining cutting-edge science with natural
              ingredients. We prioritize quality, transparency, and
              effectiveness, ensuring each product supports your journey to
              optimal health and wellness.
            </p>
          </motion.div>
        </div>

        <div className="space-y-6">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
