import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, CreditCard, DollarSign, Award, Briefcase, Globe } from 'lucide-react'; // Importing icons from Lucide React

import ApplyButton from '../common/ApplyButton';

const CardTypesShowcase = ({ openApplyModal }) => {
  // State to keep track of the currently selected card index
  const [selectedCard, setSelectedCard] = useState(0);

  // Array of card data, each with detailed properties
  const cards = [
    {
      name: "BanksCart Essential",
      type: "Standard Debit Card",
      description: "Perfect for everyday banking with essential features and no monthly fees. Ideal for managing daily expenses efficiently.",
      // Using Tailwind-compatible gradient classes for dynamic backgrounds
      gradientClass: "from-gray-700 to-blue-900",
      features: [
        { icon: <Globe className="w-5 h-5" />, text: "Free ATM withdrawals worldwide" },
        { icon: <CreditCard className="w-5 h-5" />, text: "Contactless payments" },
        { icon: <CheckCircle className="w-5 h-5" />, text: "Mobile wallet integration" },
        { icon: <Award className="w-5 h-5" />, text: "24/7 fraud monitoring" },
        { icon: <DollarSign className="w-5 h-5" />, text: "Instant spending notifications" }
      ],
      monthlyFee: "$0",
      cashback: "0.5% on all purchases"
    },
    {
      name: "BanksCart Premium",
      type: "Rewards Debit Card",
      description: "Earn more with every purchase while enjoying premium benefits and exclusive perks. Designed for those who seek extra value.",
      gradientClass: "from-yellow-600 to-gray-800",
      features: [
        { icon: <DollarSign className="w-5 h-5" />, text: "2% cashback on dining & groceries" },
        { icon: <DollarSign className="w-5 h-5" />, text: "1.5% cashback on all other purchases" },
        { icon: <CheckCircle className="w-5 h-5" />, text: "Priority customer support" },
        { icon: <Award className="w-5 h-5" />, text: "Comprehensive travel insurance" },
        { icon: <Briefcase className="w-5 h-5" />, text: "Exclusive airport lounge access" },
        { icon: <Globe className="w-5 h-5" />, text: "No foreign transaction fees" }
      ],
      monthlyFee: "$9.99",
      cashback: "Up to 2% cashback"
    },
    {
      name: "BanksCart Business",
      type: "Business Debit Card",
      description: "Streamline your business expenses with powerful tracking tools and employee cards. Perfect for growing enterprises.",
      gradientClass: "from-blue-900 to-gray-700",
      features: [
        { icon: <Briefcase className="w-5 h-5" />, text: "Unlimited employee cards" },
        { icon: <CheckCircle className="w-5 h-5" />, text: "Real-time expense tracking" },
        { icon: <Award className="w-5 h-5" />, text: "Accounting software integration" },
        { icon: <DollarSign className="w-5 h-5" />, text: "Higher daily transaction limits" },
        { icon: <CreditCard className="w-5 h-5" />, text: "Bulk payment capabilities" },
        { icon: <Globe className="w-5 h-5" />, text: "Detailed transaction reporting" }
      ],
      monthlyFee: "$15.99",
      cashback: "1% on business expenses"
    }
  ];

  // Framer Motion variants for the main content transition (card info and visual)
  const contentVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.4, ease: "easeIn" } }
  };

  // Framer Motion variants for individual feature items
  const featureItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05, // Stagger delay for features
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    })
  };

  return (
    // Main section container with responsive padding, dark background, and font
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white font-inter overflow-hidden">
      {/* Background abstract shapes for visual interest */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow animation-delay-3000"></div>
      </div>

      {/* Tailwind CSS for keyframe animations (reused from HeroSection but slower) */}
      <style jsx>{`
        @keyframes blob-slow {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(40px, -60px) scale(1.05);
          }
          66% {
            transform: translate(-30px, 30px) scale(0.95);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob-slow {
          animation: blob-slow 10s infinite cubic-bezier(0.6, 0.01, 0.3, 0.9);
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }

        /* Custom 3D card rotation on hover for the showcase card */
        .showcase-card-container {
          perspective: 1200px; /* Defines the 3D space */
        }
        .showcase-card {
          transform-style: preserve-3d; /* Ensures child elements are positioned in 3D space */
          transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); /* Smooth transition for rotation */
        }
        .showcase-card-container:hover .showcase-card {
          transform: rotateY(10deg) rotateX(5deg) scale(1.02); /* Slight 3D rotation and scale on hover */
        }
        .card-front-showcase {
          backface-visibility: hidden; /* Hides the back of the card when rotated */
        }
      `}</style>

      {/* Main content wrapper, positioned above the background */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            Choose Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">
              Perfect Card
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Designed for every lifestyle, crafted for your success. Explore our range of debit cards tailored to your needs.
          </p>
        </div>

        {/* Cards Showcase Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          {/* Left Column: Card Navigation Buttons */}
          <div className="lg:col-span-1 flex flex-col gap-4 p-4 bg-gray-800/50 rounded-2xl shadow-xl border border-gray-700 backdrop-blur-md">
            {cards.map((card, index) => (
              <motion.button
                key={index}
                className={`relative flex flex-col items-start p-6 rounded-xl text-left transition-all duration-300 ease-in-out
                  ${selectedCard === index
                    ? 'bg-gradient-to-br from-purple-700 to-indigo-700 text-white shadow-lg scale-105'
                    : 'bg-gray-700/40 hover:bg-gray-600/50 text-gray-200 hover:text-white border border-gray-600'
                  }
                `}
                onClick={() => setSelectedCard(index)}
                whileHover={{ scale: selectedCard === index ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Active indicator bar */}
                {selectedCard === index && (
                  <motion.span
                    layoutId="selected-card-indicator"
                    className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-teal-400 to-cyan-400 rounded-l-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <span className="text-2xl font-bold mb-1">{card.name}</span>
                <span className="text-md text-gray-300">{card.type}</span>
              </motion.button>
            ))}
          </div>

          {/* Right Column: Card Display and Info */}
          <div className="lg:col-span-2 flex flex-col md:flex-row gap-10 bg-gray-800/50 rounded-2xl shadow-xl border border-gray-700 backdrop-blur-md p-8 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCard} // Key change triggers AnimatePresence
                className="flex flex-col md:flex-row gap-10 w-full"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {/* Card Visual (3D Mockup) */}
                <div className="flex-shrink-0 w-full md:w-2/5 flex items-center justify-center showcase-card-container">
                  <div className={`showcase-card w-full max-w-xs h-56 rounded-xl shadow-2xl p-6 flex flex-col justify-between border border-gray-700 bg-gradient-to-br ${cards[selectedCard].gradientClass}`}>
                    {/* Card internal gradient/pattern */}
                    <div className="absolute inset-0 rounded-xl opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%)' }}></div>
                    <div className="absolute inset-0 rounded-xl opacity-10" style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent)' }}></div>

                    {/* Card Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* BanksCart Logo */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-white font-extrabold text-2xl tracking-wider drop-shadow-md">
                          BanksCart
                        </div>
                        {/* Wi-Fi/NFC icon (inline SVG for simplicity) */}
                        <svg className="w-6 h-6 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v6h-2zm0 8h2v2h-2z"/>
                          <circle cx="12" cy="8" r="1.5"/>
                          <path d="M12 17.5c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5zm0-7c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/>
                          <path d="M12 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                          <path d="M12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm0-5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/>
                        </svg>
                      </div>

                      {/* Card Chip */}
                      <div className="w-10 h-6 bg-yellow-400 rounded-md shadow-inner mb-3"></div>

                      {/* Card Number */}
                      <div className="text-gray-300 text-xl font-mono tracking-widest mb-3 drop-shadow-sm">
                        •••• •••• •••• 1234
                      </div>

                      {/* Card Holder Name and Expiry */}
                      <div className="flex justify-between items-center text-gray-400 text-xs">
                        <div className="uppercase font-semibold tracking-wide">JOHN DOE</div>
                        <div className="font-mono">12/28</div>
                      </div>

                      {/* Card Network Logo (e.g., VISA) */}
                      <div className="self-end text-white font-bold text-3xl italic drop-shadow-md mt-auto">
                        VISA
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Information Details */}
                <div className="flex-1 text-left">
                  <h3 className="text-3xl font-bold mb-3 text-white">{cards[selectedCard].name}</h3>
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">{cards[selectedCard].description}</p>

                  {/* Pricing Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-700/40 p-4 rounded-lg flex flex-col items-start border border-gray-600 shadow-md">
                      <span className="text-gray-400 text-sm uppercase tracking-wider mb-1">Monthly Fee</span>
                      <span className="text-teal-300 text-2xl font-bold">{cards[selectedCard].monthlyFee}</span>
                    </div>
                    <div className="bg-gray-700/40 p-4 rounded-lg flex flex-col items-start border border-gray-600 shadow-md">
                      <span className="text-gray-400 text-sm uppercase tracking-wider mb-1">Cashback</span>
                      <span className="text-cyan-300 text-2xl font-bold">{cards[selectedCard].cashback}</span>
                    </div>
                  </div>

                  {/* Key Features List */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4 text-white">Key Features</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cards[selectedCard].features.map((feature, index) => (
                        <motion.li
                          key={index}
                          className="flex items-center gap-3 text-gray-200"
                          custom={index} // Pass index as custom prop for staggered animation
                          variants={featureItemVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <span className="text-green-400 flex-shrink-0">{feature.icon}</span>
                          {feature.text}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Apply Button */}
                  {openApplyModal && (
                    <ApplyButton
                      loanType={`Debit Card - ${cards[selectedCard].name}`}
                      openApplyModal={openApplyModal}
                      variant="primary"
                      size="lg"
                      className="w-full px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50"
                    >
                      Apply for {cards[selectedCard].name}
                    </ApplyButton>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardTypesShowcase;
