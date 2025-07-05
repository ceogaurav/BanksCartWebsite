import React from 'react';
import { motion } from 'framer-motion';
import {
  Lock, Smartphone, Fingerprint, ShieldCheck, RefreshCw, CreditCard, // Lucide icons for features
  Shield, DollarSign // Lucide icons for guarantee section
} from 'lucide-react';

const SecurityFeatures = () => {
  const securityFeatures = [
    {
      icon: <Lock className="w-12 h-12 text-blue-400" />, // Replaced emoji with Lucide icon
      title: "EMV Chip Technology",
      description: "Advanced chip technology generates unique codes for every transaction, making your card virtually impossible to counterfeit."
    },
    {
      icon: <Smartphone className="w-12 h-12 text-green-400" />, // Replaced emoji with Lucide icon
      title: "Contactless Payments",
      description: "Tap-to-pay technology with encrypted data transmission ensures secure payments under $100 without PIN entry."
    },
    {
      icon: <Fingerprint className="w-12 h-12 text-purple-400" />, // Replaced emoji with Lucide icon
      title: "Biometric Authentication",
      description: "Fingerprint and facial recognition add an extra layer of security to your mobile banking experience."
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-red-400" />, // Replaced emoji with Lucide icon
      title: "Real-Time Fraud Monitoring",
      description: "AI-powered systems monitor transactions 24/7, instantly detecting and blocking suspicious activity."
    },
    {
      icon: <RefreshCw className="w-12 h-12 text-yellow-400" />, // Replaced emoji with Lucide icon
      title: "Instant Card Controls",
      description: "Lock/unlock your card instantly, set spending limits, and control where your card can be used through our mobile app."
    },
    {
      icon: <CreditCard className="w-12 h-12 text-cyan-400" />, // Replaced emoji with Lucide icon
      title: "Virtual Card Numbers",
      description: "Generate temporary virtual card numbers for online shopping, protecting your real card details from potential breaches."
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

  // Framer Motion variants for individual feature cards
  const featureCardVariants = {
    hidden: { opacity: 0, y: 30 },
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

  return (
    // Main section container with responsive padding, dark background, and font
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
            Bank-Level Security{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">
              You Can Trust
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Your financial safety is our top priority with military-grade protection.
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-gray-700 backdrop-blur-md
                         transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-indigo-500"
              variants={featureCardVariants}
            >
              {/* Security Icon */}
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-700/40 border border-gray-600 mb-6">
                {feature.icon}
              </div>
              {/* Security Title */}
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              {/* Security Description */}
              <p className="text-gray-300 text-base leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Security Guarantee Section */}
        <motion.div
          className="bg-gradient-to-br from-indigo-700 to-purple-800 rounded-2xl shadow-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-center gap-6 border border-gray-700"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Guarantee Icon */}
          <div className="flex-shrink-0 w-24 h-24 flex items-center justify-center rounded-full bg-white/10 border-2 border-white/20 text-white shadow-inner">
            <Shield className="w-14 h-14" /> {/* Replaced emoji with Lucide icon */}
          </div>
          {/* Guarantee Text */}
          <div className="text-center sm:text-left">
            <h3 className="text-3xl font-bold text-white mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">$0 Liability Protection</span>
            </h3>
            <p className="text-gray-200 text-lg max-w-2xl">
              You're never liable for fraudulent transactions when reported promptly. We'll refund unauthorized charges within 24 hours.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SecurityFeatures;
