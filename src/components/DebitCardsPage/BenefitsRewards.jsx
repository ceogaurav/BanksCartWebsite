import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign, Star, Gift, Plane, ShoppingBag, HeartPulse, CheckCircle,
  Utensils, ShoppingCart, Fuel, Handshake, CreditCard, Wallet, Landmark,
  Car, ShieldCheck, LifeBuoy, TrendingUp, Globe, Award // Ensure all necessary icons are imported
} from 'lucide-react';

const BenefitsRewards = () => {
  // State to manage the active tab: 'rewards' or 'lifestyle'
  const [activeTab, setActiveTab] = useState('rewards');

  // Data for the Rewards Program tab, now with Lucide icons
  const rewardsData = {
    earning: [
      { icon: <Utensils className="text-purple-400 w-5 h-5" />, text: "2x points on dining & entertainment" },
      { icon: <ShoppingCart className="text-indigo-400 w-5 h-5" />, text: "1.5x points on groceries & gas" },
      { icon: <CreditCard className="text-blue-400 w-5 h-5" />, text: "1x points on all other purchases" },
      { icon: <Handshake className="text-teal-400 w-5 h-5" />, text: "Bonus 10x points on BanksCart partner merchants" }
    ],
    redemption: [
      { icon: <Wallet className="text-green-400 w-5 h-5" />, text: "Cash back directly to your account" },
      { icon: <Gift className="text-yellow-400 w-5 h-5" />, text: "Gift cards from 500+ top retailers" },
      { icon: <Plane className="text-cyan-400 w-5 h-5" />, text: "Travel bookings with no blackout dates" },
      { icon: <Star className="text-orange-400 w-5 h-5" />, text: "Exclusive experiences & VIP events" },
      { icon: <Landmark className="text-red-400 w-5 h-5" />, text: "Charity donations with matched contributions" }
    ]
  };

  // Data for the Lifestyle Benefits tab, now with Lucide icons
  const lifestyleBenefits = [
    {
      category: "Travel Perks",
      icon: <Plane className="w-8 h-8 text-blue-400" />, // Changed from emoji to Lucide icon
      benefits: [
        { icon: <Globe className="w-5 h-5" />, text: "No foreign transaction fees" },
        { icon: <ShieldCheck className="w-5 h-5" />, text: "Travel insurance up to $100,000" },
        { icon: <LifeBuoy className="w-5 h-5" />, text: "Airport lounge access (Premium cards)" },
        { icon: <Car className="w-5 h-5" />, text: "Rental car insurance coverage" },
        { icon: <LifeBuoy className="w-5 h-5" />, text: "24/7 global travel assistance" }
      ]
    },
    {
      category: "Shopping Privileges",
      icon: <ShoppingBag className="w-8 h-8 text-purple-400" />, // Changed from emoji to Lucide icon
      benefits: [
        { icon: <ShieldCheck className="w-5 h-5" />, text: "Purchase protection up to $1,000" },
        { icon: <Award className="w-5 h-5" />, text: "Extended warranty on electronics" },
        { icon: <DollarSign className="w-5 h-5" />, text: "Price protection guarantee" },
        { icon: <TrendingUp className="w-5 h-5" />, text: "Exclusive discounts at partner stores" },
        { icon: <Star className="w-5 h-5" />, text: "Early access to sales & limited releases" }
      ]
    },
    {
      category: "Wellness & Lifestyle",
      icon: <HeartPulse className="w-8 h-8 text-green-400" />, // Changed from emoji to Lucide icon
      benefits: [
        { icon: <CheckCircle className="w-5 h-5" />, text: "Gym membership discounts" },
        { icon: <LifeBuoy className="w-5 h-5" />, text: "Telemedicine consultations" },
        { icon: <Star className="w-5 h-5" />, text: "Mental health app subscriptions" },
        { icon: <Award className="w-5 h-5" />, text: "Nutrition coaching sessions" },
        { icon: <DollarSign className="w-5 h-5" />, text: "Wellness reward challenges" }
      ]
    }
  ];

  // Framer Motion variants for tab content transitions
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.4, ease: "easeIn" } }
  };

  // Framer Motion variants for staggered list items
  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.08, // Stagger delay for each item
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    })
  };

  return (
    // Main section container with responsive padding, dark background, and font
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white font-inter overflow-hidden">
      {/* Background abstract shapes for visual interest */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow animation-delay-2000"></div>
      </div>

      {/* Tailwind CSS for keyframe animations (reused from previous sections) */}
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
          animation: blob-slow 12s infinite cubic-bezier(0.6, 0.01, 0.3, 0.9);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>

      {/* Main content wrapper, positioned above the background */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            More Than Just a Card - It's Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-400">
              Lifestyle Companion
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Unlock a world of exclusive benefits and rewarding experiences tailored to enhance your everyday life.
          </p>
        </div>

        {/* Benefits Tabs */}
        <div className="flex justify-center mb-12">
          <div className="relative flex p-1 bg-gray-800 rounded-full shadow-inner border border-gray-700">
            {/* Animated Tab Indicator */}
            <AnimatePresence>
              {activeTab === 'rewards' && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              {activeTab === 'lifestyle' && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>

            {/* Tab Buttons */}
            <motion.button
              className={`relative z-10 px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-300
                ${activeTab === 'rewards' ? 'text-white' : 'text-gray-300 hover:text-white'}
              `}
              onClick={() => setActiveTab('rewards')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Rewards Program
            </motion.button>
            <motion.button
              className={`relative z-10 px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-300
                ${activeTab === 'lifestyle' ? 'text-white' : 'text-gray-300 hover:text-white'}
              `}
              onClick={() => setActiveTab('lifestyle')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Lifestyle Benefits
            </motion.button>
          </div>
        </div>

        {/* Benefits Content Area */}
        <div className="relative min-h-[400px]"> {/* Min-height to prevent layout shift */}
          <AnimatePresence mode="wait">
            {activeTab === 'rewards' && (
              <motion.div
                key="rewards-content"
                className="absolute inset-0 p-6 sm:p-8 bg-gray-800/50 rounded-2xl shadow-xl border border-gray-700 backdrop-blur-md"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-2 text-white">BanksCart Rewards</h3>
                  <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Earn points on every purchase and redeem for cash back, travel, or exclusive experiences.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                  {/* How You Earn Card */}
                  <div className="bg-gray-700/40 p-6 rounded-xl shadow-lg border border-gray-600">
                    <h4 className="text-2xl font-semibold mb-5 text-white flex items-center gap-3">
                      <DollarSign className="text-green-400 w-7 h-7" /> How You Earn
                    </h4>
                    <ul className="space-y-3">
                      {rewardsData.earning.map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-center gap-3 text-lg text-gray-200"
                          custom={index}
                          variants={listItemVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <span className="flex-shrink-0">{item.icon}</span>
                          {item.text}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* How You Redeem Card */}
                  <div className="bg-gray-700/40 p-6 rounded-xl shadow-lg border border-gray-600">
                    <h4 className="text-2xl font-semibold mb-5 text-white flex items-center gap-3">
                      <Gift className="text-yellow-400 w-7 h-7" /> How You Redeem
                    </h4>
                    <ul className="space-y-3">
                      {rewardsData.redemption.map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-center gap-3 text-lg text-gray-200"
                          custom={index}
                          variants={listItemVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <span className="flex-shrink-0">{item.icon}</span>
                          {item.text}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Rewards Calculator Demo */}
                <div className="bg-gray-700/40 p-6 rounded-xl shadow-lg border border-gray-600 text-center">
                  <h4 className="text-2xl font-semibold mb-4 text-white flex items-center justify-center gap-3">
                    <TrendingUp className="text-cyan-400 w-7 h-7" /> Rewards Potential
                  </h4>
                  <p className="text-gray-300 mb-4">See how much you could earn annually:</p>
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-xl font-bold">
                    <div className="flex items-center gap-2 bg-gray-900/50 rounded-full px-5 py-2">
                      <span className="text-gray-400">Monthly Spending:</span>
                      <span className="text-white">$2,000</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full px-5 py-2 shadow-md">
                      <span className="text-white">Annual Rewards:</span>
                      <span className="text-white">$360</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mt-4">
                    *Estimates based on average spending patterns. Actual rewards may vary.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'lifestyle' && (
              <motion.div
                key="lifestyle-content"
                className="absolute inset-0 p-6 sm:p-8 bg-gray-800/50 rounded-2xl shadow-xl border border-gray-700 backdrop-blur-md"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-2 text-white">Exclusive Lifestyle Benefits</h3>
                  <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Beyond rewards, enjoy a suite of benefits designed to complement your lifestyle.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {lifestyleBenefits.map((category, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-700/40 p-6 rounded-xl shadow-lg border border-gray-600"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15, type: "spring", stiffness: 80, damping: 15 }}
                    >
                      <div className="flex items-center gap-4 mb-5">
                        <div className="p-3 rounded-full bg-gray-900/60 border border-gray-600">
                          {category.icon} {/* Directly render the icon component */}
                        </div>
                        <h4 className="text-2xl font-semibold text-white">{category.category}</h4>
                      </div>
                      <ul className="space-y-3">
                        {category.benefits.map((benefit, benefitIndex) => (
                          <motion.li
                            key={benefitIndex}
                            className="flex items-center gap-3 text-lg text-gray-200"
                            custom={benefitIndex}
                            variants={listItemVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <span className="flex-shrink-0 text-green-400">{benefit.icon}</span>
                            {benefit.text}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default BenefitsRewards;
