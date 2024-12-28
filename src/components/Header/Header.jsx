// src/components/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navigation from './Navigation';
import './Header.css';
import Logo from "../../media/logo.png";

const Header = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 750) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  const wrapClass = isHomePage && !hasScrolled ? 'wrap' : 'wrap-after';

  const slideDownAnimation = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5, ease: 'easeOut' }
  };

  return (
    <div className="main-header ">
      <motion.nav
        className="header"
        initial="initial"
        animate="animate"
        variants={slideDownAnimation}
      >
        <div className={wrapClass}>
          <Link to="/" className="logo-link">
            <img src={Logo} height={40} width={80}/>
          </Link>
          <Navigation user={user} />
        </div>
      </motion.nav>
    </div>
  );
};

export default Header;