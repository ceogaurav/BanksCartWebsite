import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Zap, Truck, CheckCircle, Clock, Users, Smile, Globe,
  ArrowRight, CreditCard // Ensure all necessary icons are imported
} from 'lucide-react';

const HowItWorks = () => {
  // Define the steps for getting a debit card, now consistently using Lucide icons
  const steps = [
    {
      stepNumber: "01",
      title: "Apply Online",
      description: "Complete our secure 3-minute application with basic information. No credit check required for debit cards.",
      estimatedTime: "3 minutes",
      icon: <FileText className="w-12 h-12 text-blue-400" /> // Replaced emoji with Lucide icon
    },
    {
      stepNumber: "02",
      title: "Instant Approval",
      description: "Get approved instantly and receive your virtual card immediately for online purchases and digital wallet use.",
      estimatedTime: "Instant",
      icon: <Zap className="w-12 h-12 text-green-400" /> // Replaced emoji with Lucide icon
    },
    {
      stepNumber: "03",
      title: "Physical Card Delivery",
      description: "Your personalized card ships within 24 hours with free express delivery. Track your package in real-time.",
      estimatedTime: "2-3 business days",
      icon: <Truck className="w-12 h-12 text-purple-400" /> // Replaced emoji with Lucide icon
    },
    {
      stepNumber: "04",
      title: "Activate & Start Spending",
      description: "Activate your card with a simple tap in our mobile app and start enjoying all the benefits immediately.",
      estimatedTime: "30 seconds",
      icon: <CheckCircle className="w-12 h-12 text-orange-400" /> // Replaced emoji with Lucide icon
    }
  ];

  // Quick stats data
  const quickStats = [
    {
      value: "Under 60 seconds",
      label: "Average Approval Time",
      icon: <Clock className="w-8 h-8 text-cyan-400" />
    },
    {
      value: "5,000+",
      label: "Cards Issued Daily",
      icon: <CreditCard className="w-8 h-8 text-lime-400" />
    },
    {
      value: "98.7%",
      label: "Customer Satisfaction",
      icon: <Smile className="w-8 h-8 text-yellow-400" />
    },
    {
      value: "200+",
      label: "Countries Supported",
      icon: <Globe className="w-8 h-8 text-pink-400" />
    }
  ];

  // Framer Motion variants for the main section entry
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1 // Stagger animation for child elements
      }
    }
  };

  // Framer Motion variants for individual step cards
  const stepCardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  // Framer Motion variants for quick stat items
  const statItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <>
     
      {/* Main section container with responsive padding, dark background, and font */}
      <motion.section
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white font-inter overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Animate when 30% of component is in view
      >
        {/* Background abstract shapes for visual interest */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow animation-delay-2000"></div>
        </div>

        {/* Tailwind CSS for keyframe animations (reused from previous sections) */}
        <style>{`
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
              Get Your BanksCart Debit Card{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">
                in Minutes
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Simple, fast, and completely digital - no paperwork required.
            </p>
          </div>

          {/* How It Works Steps Container */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative bg-gray-800/50 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-gray-700 backdrop-blur-md
                           transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-indigo-500"
                variants={stepCardVariants}
              >
                {/* Step Number */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white
                            w-12 h-12 flex items-center justify-center rounded-full font-bold text-xl shadow-lg border-2 border-gray-700">
                  {step.stepNumber}
                </div>

                {/* Step Icon */}
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-700/40 border border-gray-600 mb-6 mt-6">
                  {step.icon}
                </div>

                {/* Step Title */}
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                {/* Step Description */}
                <p className="text-gray-300 text-base mb-4 leading-relaxed">{step.description}</p>
                {/* Estimated Time */}
                <div className="text-sm font-semibold text-gray-400 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {step.estimatedTime}
                </div>

                {/* Connector Line and Arrow (for desktop/larger screens) */}
                {index < steps.length - 1 && (
                  <>
                    {/* Horizontal Connector for Desktop */}
                    <div className="hidden lg:block absolute top-1/2 left-[calc(100%+0.5rem)] w-16 h-1 bg-gray-700 transform -translate-y-1/2"></div>
                    <div className="hidden lg:block absolute top-1/2 left-[calc(100%+4.5rem)] transform -translate-y-1/2 -translate-x-1/2">
                      <ArrowRight className="w-8 h-8 text-gray-500" />
                    </div>
                    {/* Vertical Connector for Tablet/Mobile */}
                    <div className="block lg:hidden absolute bottom-0 left-1/2 h-8 w-1 bg-gray-700 transform translate-y-full -translate-x-1/2"></div>
                    <div className="block lg:hidden absolute bottom-0 left-1/2 transform translate-y-[calc(100%+2rem)] -translate-x-1/2">
                      <ArrowRight className="w-8 h-8 text-gray-500 rotate-90" />
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          {/* Quick Stats Section */}
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-8 drop-shadow-lg">
              Our{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
                Commitment to You
              </span>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-700 backdrop-blur-md
                           transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:border-teal-500"
                variants={statItemVariants}
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-700/40 border border-gray-600 mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default HowItWorks;
