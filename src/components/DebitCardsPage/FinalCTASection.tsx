import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Zap, ShieldCheck, Award, ArrowRight } from 'lucide-react'; // Importing relevant Lucide icons

const FinalCTA = () => {
  // Framer Motion variants for the main section entry
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.15 // Stagger animation for child elements
      }
    }
  };

  // Framer Motion variants for individual text/button items
  const itemVariants = {
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
    // Main CTA section container with responsive padding, dark background, and font
    <motion.section
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white font-inter overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }} // Animate when 40% of component is in view
    >
      {/* Background abstract shapes for visual interest */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow animation-delay-2000"></div>
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
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main CTA Headline */}
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg"
          variants={itemVariants}
        >
          Ready to Experience{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Banking Freedom?
          </span>
        </motion.h2>

        {/* Subtitle/Description */}
        <motion.p
          className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Join thousands of satisfied users and unlock a world of secure, convenient, and rewarding transactions with a BanksCart Debit Card.
        </motion.p>

        {/* Key Benefits/Reasons to Act */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-12"
          variants={sectionVariants} // Use section variants for staggering these items
        >
          <motion.div className="flex items-center gap-3 bg-gray-800/40 backdrop-blur-sm rounded-full py-3 px-6 border border-gray-700 shadow-md text-lg text-gray-200" variants={itemVariants}>
            <Zap className="text-yellow-400 w-6 h-6" /> Instant Activation
          </motion.div>
          <motion.div className="flex items-center gap-3 bg-gray-800/40 backdrop-blur-sm rounded-full py-3 px-6 border border-gray-700 shadow-md text-lg text-gray-200" variants={itemVariants}>
            <ShieldCheck className="text-green-400 w-6 h-6" /> Secure Transactions
          </motion.div>
          <motion.div className="flex items-center gap-3 bg-gray-800/40 backdrop-blur-sm rounded-full py-3 px-6 border border-gray-700 shadow-md text-lg text-gray-200" variants={itemVariants}>
            <Award className="text-orange-400 w-6 h-6" /> Rewarding Experience
          </motion.div>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-6"
          variants={itemVariants}
        >
          <motion.button
            className="px-10 py-5 rounded-full font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg
                       hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                       focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CreditCard className="w-7 h-7" /> Get Your BanksCart Debit Card
            <ArrowRight className="w-6 h-6 ml-2" />
          </motion.button>
          <motion.button
            className="px-10 py-5 rounded-full font-bold text-xl bg-transparent border-2 border-gray-500 text-gray-300
                       hover:bg-gray-700 hover:border-gray-700 hover:text-white transition-all duration-300 ease-in-out transform hover:-translate-y-1
                       focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Card Features
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FinalCTA;
