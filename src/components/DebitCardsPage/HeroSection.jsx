import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import Lucide React for icons (e.g., check-circle)
// Make sure to install: npm install lucide-react
import { CheckCircle } from 'lucide-react';

const HeroSection = () => {
  // State for the user count, animating it to show growth
  const [userCount, setUserCount] = useState(1950000);

  useEffect(() => {
    // Interval to increment user count every 2 seconds
    const interval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 2000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Framer Motion variants for the main container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger animation for child elements
        delayChildren: 0.2 // Delay before child animations start
      }
    }
  };

  // Framer Motion variants for individual text and button items
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring", // Spring animation for a smooth bounce effect
        stiffness: 80, // Stiffer spring for quicker animation
        damping: 20 // Damping to control the oscillation
      }
    }
  };

  // Framer Motion variants for feature items
  const featureItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 25
      }
    }
  };

  return (
    // Main hero section container with responsive padding, min-height, and background effects
    <div className="relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-950 font-inter">
      {/* Background gradient overlay for depth */}
      <div className="absolute inset-0 z-0 opacity-70">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900"></div>
        {/* Subtle radial gradient for a focal point */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-950 to-gray-950 opacity-50"></div>
        {/* Abstract shapes or particles for dynamic background (using pseudo-elements for simplicity) */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Tailwind CSS for keyframe animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.6, 0.01, 0.3, 0.9);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Custom 3D card rotation on hover */
        .card-3d-container {
          perspective: 1000px; /* Defines the 3D space */
        }
        .card-3d {
          transform-style: preserve-3d; /* Ensures child elements are positioned in 3D space */
          transition: transform 0.8s ease-in-out; /* Smooth transition for rotation */
        }
        .card-3d-container:hover .card-3d {
          transform: rotateY(15deg) rotateX(5deg); /* Slight 3D rotation on hover */
        }
        .card-front {
          backface-visibility: hidden; /* Hides the back of the card when rotated */
        }
      `}</style>

      {/* Main content container, positioned above the background */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left section: Hero content (title, subtitle, features, buttons) */}
        <motion.div
          className="text-center lg:text-left text-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Title */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg"
            variants={itemVariants}
          >
            Experience Banking Freedom with{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              BanksCart
            </span>{' '}
            Debit Cards
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p
            className="text-lg sm:text-xl mb-8 max-w-2xl lg:max-w-none mx-auto lg:mx-0 text-gray-300 leading-relaxed"
            variants={itemVariants}
          >
            Secure, convenient, and rewarding - your money, your way. Join over{' '}
            <span className="font-bold text-yellow-300 text-2xl">
              {userCount.toLocaleString()}
            </span>{' '}
            users who trust BanksCart for their everyday banking needs.
          </motion.p>

          {/* Key Features List */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-lg text-gray-200"
            variants={containerVariants} // Use container variants for staggering features
          >
            {[
              "Instant virtual card creation",
              "Global acceptance in 200+ countries",
              "Advanced security with biometric authentication",
              "Real-time transaction notifications"
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 bg-gray-800/30 backdrop-blur-sm rounded-full py-2 px-4 border border-gray-700 shadow-md"
                variants={featureItemVariants} // Use specific variants for features
              >
                <CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" /> {/* Lucide icon */}
                {feature}
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            variants={itemVariants}
          >
            <motion.button
              className="px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Your Card Today
            </motion.button>
            <motion.button
              className="px-8 py-4 rounded-full font-bold text-lg bg-transparent border-2 border-indigo-500 text-indigo-300 hover:bg-indigo-500 hover:text-white transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Compare Card Types
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right section: 3D Debit Card Mockup */}
        <motion.div
          className="relative w-full max-w-md h-64 mx-auto lg:mx-0 card-3d-container"
          initial={{ opacity: 0, rotateY: 180 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <div className="card-3d absolute inset-0">
            <div className="card-front absolute inset-0 rounded-xl shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 flex flex-col justify-between border border-gray-700 transform rotateY(0deg)">
              {/* Card internal gradient/pattern */}
              <div className="absolute inset-0 rounded-xl opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%)' }}></div>
              <div className="absolute inset-0 rounded-xl opacity-10" style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent)' }}></div>

              {/* Card Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* BanksCart Logo */}
                <div className="flex justify-between items-start mb-4">
                  <div className="text-white font-extrabold text-3xl tracking-wider drop-shadow-md">
                    BanksCart
                  </div>
                  {/* Wi-Fi/NFC icon (inline SVG for simplicity) */}
                  <svg className="w-8 h-8 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v6h-2zm0 8h2v2h-2z"/>
                    <circle cx="12" cy="8" r="1.5"/>
                    <path d="M12 17.5c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5zm0-7c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/>
                    <path d="M12 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                    <path d="M12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm0-5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/>
                  </svg>
                </div>

                {/* Card Chip */}
                <div className="w-12 h-8 bg-yellow-400 rounded-md shadow-inner mb-4"></div>

                {/* Card Number */}
                <div className="text-gray-300 text-2xl font-mono tracking-widest mb-4 drop-shadow-sm">
                  •••• •••• •••• 1234
                </div>

                {/* Card Holder Name and Expiry */}
                <div className="flex justify-between items-center text-gray-400 text-sm">
                  <div className="uppercase font-semibold tracking-wide">JOHN DOE</div>
                  <div className="font-mono">12/28</div>
                </div>

                {/* Card Network Logo (e.g., VISA) */}
                <div className="self-end text-white font-bold text-4xl italic drop-shadow-md mt-auto">
                  VISA
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
