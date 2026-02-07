import React from 'react';
import { motion } from 'framer-motion';
import ApplyButton from '../common/ApplyButton';
import {
  // Importing all necessary Lucide icons for a rich visual experience
  DollarSign, Globe, TrendingUp, Shield, Headphones, Users, CreditCard,
  PiggyBank, Briefcase, Car, Award, Zap, CheckCircle, XCircle, Plane
} from 'lucide-react';

const ComparisonTable = ({ openApplyModal }) => {
  // Define the features and their values for each card type
  // Each value now includes an 'icon' (optional), 'value' (string or React element), and 'highlight' boolean
  const features = [
    {
      feature: "Monthly Fee",
      icon: <DollarSign className="w-5 h-5 text-gray-400" />,
      essential: { value: "$0", highlight: true },
      premium: { value: "$9.99", highlight: false },
      business: { value: "$15.99", highlight: false }
    },
    {
      feature: "ATM Withdrawals",
      icon: <CreditCard className="w-5 h-5 text-gray-400" />,
      essential: { value: "Free worldwide", highlight: true },
      premium: { value: "Free worldwide + priority", highlight: true },
      business: { value: "Free worldwide + higher limits", highlight: true }
    },
    {
      feature: "Cashback Rate",
      icon: <PiggyBank className="w-5 h-5 text-gray-400" />,
      essential: { value: "0.5% on all purchases", highlight: false },
      premium: { value: "Up to 2% on categories", highlight: true },
      business: { value: "1% on business expenses", highlight: false }
    },
    {
      feature: "Foreign Transaction Fees",
      icon: <Globe className="w-5 h-5 text-gray-400" />,
      essential: { value: "1.5%", highlight: false },
      premium: { value: "0%", highlight: true },
      business: { value: "0%", highlight: true }
    },
    {
      feature: "Daily Spending Limit",
      icon: <Zap className="w-5 h-5 text-gray-400" />,
      essential: { value: "$2,500", highlight: false },
      premium: { value: "$5,000", highlight: false },
      business: { value: "$25,000", highlight: true }
    },
    {
      feature: "Purchase Protection",
      icon: <Shield className="w-5 h-5 text-gray-400" />,
      essential: { value: "Up to $500", highlight: false },
      premium: { value: "Up to $2,000", highlight: true },
      business: { value: "Up to $10,000", highlight: true }
    },
    {
      feature: "Customer Support",
      icon: <Headphones className="w-5 h-5 text-gray-400" />,
      essential: { value: "24/7 chat & phone", highlight: false },
      premium: { value: "Priority 24/7 + dedicated line", highlight: true },
      business: { value: "Dedicated business support team", highlight: true }
    },
    {
      feature: "Employee Cards",
      icon: <Users className="w-5 h-5 text-gray-400" />,
      essential: { value: <XCircle className="w-6 h-6 text-red-500" />, isIcon: true, highlight: false }, // Using icon for 'Not available'
      premium: { value: "2 additional cards", highlight: false },
      business: { value: "Unlimited employee cards", highlight: true }
    },
    {
      feature: "Travel Insurance",
      icon: <Car className="w-5 h-5 text-gray-400" />,
      essential: { value: <XCircle className="w-6 h-6 text-red-500" />, isIcon: true, highlight: false },
      premium: { value: <CheckCircle className="w-6 h-6 text-green-500" />, isIcon: true, highlight: true },
      business: { value: <CheckCircle className="w-6 h-6 text-green-500" />, isIcon: true, highlight: true }
    },
    {
      feature: "Airport Lounge Access",
      icon: <Plane className="w-5 h-5 text-gray-400" />,
      essential: { value: <XCircle className="w-6 h-6 text-red-500" />, isIcon: true, highlight: false },
      premium: { value: <CheckCircle className="w-6 h-6 text-green-500" />, isIcon: true, highlight: true },
      business: { value: <XCircle className="w-6 h-6 text-red-500" />, isIcon: true, highlight: false }
    }
  ];

  // Framer Motion variants for the main table container
  const tableContainerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.05 // Stagger children (rows) animation
      }
    }
  };

  // Framer Motion variants for individual table rows
  const tableRowVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  return (
    // Main section container with responsive padding, dark background, and font
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white font-inter overflow-hidden">
      {/* Background abstract shapes for visual interest */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow animation-delay-2000"></div>
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
            Compare{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              BanksCart Cards
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Find the perfect debit card that aligns with your financial goals and lifestyle.
          </p>
        </div>

        {/* Comparison Table Container */}
        <motion.div
          className="overflow-x-auto rounded-2xl shadow-2xl border border-gray-700 bg-gray-800/50 backdrop-blur-md"
          variants={tableContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Animate when 30% of component is in view
        >
          {/* Table Header */}
          <div className="grid grid-cols-4 min-w-[768px] lg:min-w-0 bg-gray-700 rounded-t-2xl font-semibold text-lg text-gray-200 border-b border-gray-600">
            <div className="p-6 text-left">Features</div>
            {/* Card Column Headers */}
            <div className="relative p-6 text-center border-l border-gray-600">
              <h3 className="text-xl font-bold text-blue-300 mb-1">Essential</h3>
              <p className="text-sm text-gray-400">Perfect for everyday use</p>
            </div>
            <div className="relative p-6 text-center bg-gradient-to-br from-indigo-700 to-purple-800 rounded-tr-2xl border-l border-gray-600">
              <h3 className="text-xl font-bold text-white mb-1">Premium</h3>
              <p className="text-sm text-indigo-200">Best for rewards seekers</p>
              {/* Most Popular Badge */}
              <div className="absolute top-0 right-0 -mt-3 -mr-3 px-4 py-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full shadow-lg transform rotate-6">
                Most Popular
              </div>
            </div>
            <div className="relative p-6 text-center border-l border-gray-600">
              <h3 className="text-xl font-bold text-green-300 mb-1">Business</h3>
              <p className="text-sm text-gray-400">Built for businesses</p>
            </div>
          </div>

          {/* Table Body */}
          <div className="min-w-[768px] lg:min-w-0">
            {features.map((row, index) => (
              <motion.div
                key={index}
                className="grid grid-cols-4 py-4 px-6 border-b border-gray-700 last:border-b-0 hover:bg-gray-700/30 transition-colors duration-200 items-center"
                variants={tableRowVariants}
              >
                {/* Feature Cell */}
                <div className="flex items-center gap-3 text-lg font-medium text-gray-300">
                  {row.icon}
                  {row.feature}
                </div>
                {/* Value Cells */}
                <div className={`text-center text-lg ${row.essential.highlight ? 'text-green-400 font-semibold' : 'text-gray-100'}`}>
                  {row.essential.value}
                </div>
                <div className={`text-center text-lg ${row.premium.highlight ? 'text-green-400 font-semibold' : 'text-gray-100'}`}>
                  {row.premium.value}
                </div>
                <div className={`text-center text-lg ${row.business.highlight ? 'text-green-400 font-semibold' : 'text-gray-100'}`}>
                  {row.business.value}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Table Footer with CTA Buttons */}
          <div className="grid grid-cols-4 min-w-[768px] lg:min-w-0 bg-gray-800/70 rounded-b-2xl pt-6 pb-4 px-6 border-t border-gray-700">
            <div className="col-span-1"></div> {/* Empty cell for feature column */}
            {/* CTA Buttons */}
            {openApplyModal && (
              <>
                <div className="flex justify-center items-center">
                  <ApplyButton
                    loanType="Debit Card - Essential"
                    openApplyModal={openApplyModal}
                    variant="primary"
                    size="md"
                    className="px-6 py-3 rounded-full font-bold text-base bg-transparent border-2 border-blue-500 text-blue-300 hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Get Essential
                  </ApplyButton>
                </div>
                <div className="flex justify-center items-center">
                  <ApplyButton
                    loanType="Debit Card - Premium"
                    openApplyModal={openApplyModal}
                    variant="primary"
                    size="md"
                    className="px-6 py-3 rounded-full font-bold text-base bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
                  >
                    Get Premium
                  </ApplyButton>
                </div>
                <div className="flex justify-center items-center">
                  <ApplyButton
                    loanType="Debit Card - Business"
                    openApplyModal={openApplyModal}
                    variant="primary"
                    size="md"
                    className="px-6 py-3 rounded-full font-bold text-base bg-transparent border-2 border-green-500 text-green-300 hover:bg-green-500 hover:text-white transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    Get Business
                  </ApplyButton>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;
