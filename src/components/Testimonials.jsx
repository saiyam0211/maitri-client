import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import '../styles/Testimonials.scss';

const testimonialData = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    image: 'S',
    text: "I've been using these supplements for 3 months now, and the difference in my energy levels is incredible. The quality is outstanding, and I love how they're specifically formulated for women's needs.",
  },
  {
    id: 2,
    name: 'Rachel Chen',
    image: 'R',
    text: 'Finally found supplements that understand women s health! The hormonal balance support has been a game-changer for me. Plus, their customer service is exceptional.',
  },
  {
    id: 3,
    name: 'Emma Davis',
    image: 'E',
    text: 'These supplements have become an essential part of my daily routine. I noticed improved sleep quality within weeks, and my skin has never looked better!',
  },
  {
    id: 4,
    name: 'Lisa Thompson',
    image: 'L',
    text: 'As a busy mom, I need supplements that actually work. These not only give me the energy I need but also support my overall wellbeing. The natural ingredients make all the difference.',
  },
  {
    id: 5,
    name: 'Maria Rodriguez',
    image: 'M',
    text: 'The quality of these supplements is unmatched. I appreciate how transparent they are about their ingredients, and the results speak for themselves.',
  }
];

const Testimonials = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const scrollHeight = scrollContainer.scrollHeight;
      let scrollTop = 0;

      const scroll = () => {
        scrollTop += 0.5;
        if (scrollTop >= scrollHeight / 2) {
          scrollTop = 0;
        }
        scrollContainer.style.transform = `translateY(-${scrollTop}px)`;
        requestAnimationFrame(scroll);
      };

      const animation = requestAnimationFrame(scroll);
      return () => cancelAnimationFrame(animation);
    }
  }, []);

  return (
    <div className="h-screen overflow-hidden relative " id='testimonials'>
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        className="backgroundText absolute top-[15%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[250px] font-unbounded text-[#000] whitespace-nowrap z-10
        md:text-[60px] md:top-[5%] sm:font-black"
      >
        TESTIMONIALS
      </motion.h1>

      <div className="h-full overflow-hidden relative pt-32">
        <div className="relative" ref={scrollRef}>
          {[...testimonialData, ...testimonialData].map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mx-auto my-5 w-[90%] max-w-md 
                        shadow-lg border border-white/10 text-black"
            >
              <div className="flex space-x-1 text-[#DA627D] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <p className="text-base leading-relaxed mb-5 relative pl-10 text-gray-600">
                <span className="absolute left-0 top-[-20px] text-6xl text-black">"</span>
                {item.text}
              </p>

              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#DA627D] mr-4">
                  <span className="text-black font-bold">{item.image}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black m-0">{item.name}</h3>
                  <p className="text-sm text-gray-900 m-0">Verified Customer</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

