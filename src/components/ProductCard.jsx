// src/components/ProductCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Default product data
  const productData = {
    id: 1,
    name: "Women's Daily Wellness Supplement",
    description: "Complete daily nutrition support designed specifically for women's health needs.",
    price: 1000,
    image: "/images/product-image.png" // You'll need to add this image
  };

  const handleLearnMore = () => {
    // Add to cart (you can store this in localStorage for now)
    const cartItem = {
      ...productData,
      quantity: 1
    };
    
    localStorage.setItem('cartItem', JSON.stringify(cartItem));

    if (!user) {
      // If user is not logged in, redirect to login with return URL
      navigate('/login', { 
        state: { 
          from: '/billing',
          product: productData
        }
      });
    } else {
      // If user is logged in, go directly to billing
      navigate('/billing', { state: { product: productData } });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden shadow-lg"
    >
      <div className="p-6">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 mb-4">
          <img
            src={productData.image}
            alt={productData.name}
            className="h-64 w-full object-cover object-center"
          />
        </div>
        
        <h3 className="text-xl font-semibold text-[#DA627D] mb-2">
          {productData.name}
        </h3>
        
        <p className="text-gray-600 mb-4">
          {productData.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">
            ₹{productData.price.toLocaleString()}
          </span>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLearnMore}
            className="bg-[#DA627D] text-white px-6 py-3 rounded-full hover:bg-[#FFA5AB] transition-colors duration-300"
          >
            Learn More
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;