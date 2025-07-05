import React from 'react';
import { motion } from 'framer-motion';
import {
  // Importing all necessary Lucide icons for a rich visual experience
  Star, Verified, Quote, UserCircle2, Globe, Headphones, Smartphone,
  ShieldCheck, Zap, CreditCard, PiggyBank, Award, Wallet, DollarSign, TrendingUp, Briefcase,
  Utensils, ShoppingCart, Fuel, Handshake, Landmark, Car, LifeBuoy, HeartPulse
} from 'lucide-react';

const CustomerTestimonials = () => {
  // Updated testimonials data, focusing specifically on debit card services and using Lucide icons for avatars
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      testimonial: "BanksCart's debit card has truly simplified my daily spending. The instant notifications keep me on top of my finances, and the rewards add up quickly!",
      rating: 5,
      verified: true,
      date: "2 weeks ago",
      avatarIcon: <UserCircle2 className="w-full h-full text-blue-400" /> // Lucide icon for avatar
    },
    {
      id: 2,
      name: "Rahul Singh",
      testimonial: "Traveling abroad is a breeze with my BanksCart debit card. No foreign transaction fees is a huge relief, and it's accepted everywhere I go!",
      rating: 5,
      verified: true,
      date: "1 month ago",
      avatarIcon: <Globe className="w-full h-full text-green-400" />
    },
    {
      id: 3,
      name: "Anjali Devi",
      testimonial: "I had a question about a transaction, and BanksCart's customer support was incredibly helpful and efficient. Top-notch service for my debit card needs!",
      rating: 4,
      verified: true,
      date: "3 days ago",
      avatarIcon: <Headphones className="w-full h-full text-purple-400" />
    },
    {
      id: 4,
      name: "Amit Kumar",
      testimonial: "The BanksCart mobile app makes managing my debit card effortless. I can freeze it instantly if needed, and the spending insights are a bonus.",
      rating: 5,
      verified: true,
      date: "2 months ago",
      avatarIcon: <Smartphone className="w-full h-full text-yellow-400" />
    },
    {
      id: 5,
      name: "Neha Gupta",
      testimonial: "I feel completely secure using my BanksCart debit card online. The enhanced security features give me peace of mind with every purchase.",
      rating: 5,
      verified: true,
      date: "1 week ago",
      avatarIcon: <ShieldCheck className="w-full h-full text-red-400" />
    },
    {
      id: 6,
      name: "Vikram Patel",
      testimonial: "The process to get my virtual debit card was incredibly fast and easy. I was able to start using it immediately for online payments. Highly impressed!",
      rating: 5,
      verified: true,
      date: "5 days ago",
      avatarIcon: <Zap className="w-full h-full text-orange-400" />
    },
    {
      id: 7,
      name: "Deepa Mehta",
      testimonial: "The cashback rewards on my Premium BanksCart debit card are fantastic! It's great to earn back on everyday spending without any hassle.",
      rating: 5,
      verified: true,
      date: "3 weeks ago",
      avatarIcon: <Wallet className="w-full h-full text-teal-400" />
    },
    {
      id: 8,
      name: "Sanjay Rao",
      testimonial: "BanksCart Business Debit Card is perfect for our startup. The employee card feature and expense tracking have streamlined our operations significantly.",
      rating: 5,
      verified: true,
      date: "2 months ago",
      avatarIcon: <Briefcase className="w-full h-full text-cyan-400" />
    }
  ];

  // Framer Motion variants for the section entry animation
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1 // Stagger animation for individual testimonials
      }
    }
  };

  // Framer Motion variants for individual testimonial cards
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
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
      key="customer-testimonials-section" // Added a key to ensure proper re-rendering if component is remounted
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white font-inter overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Animate when 30% of component is in view
    >
      {/* Background abstract shapes for visual interest */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow animation-delay-2000"></div>
      </div>

      {/* Tailwind CSS for keyframe animations (reused from previous sections) */}
      {/* Removed the 'jsx' prop from the style tag to fix the warning */}
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
            What Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
              Customers Say
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Hear directly from individuals and businesses who trust BanksCart for their debit card needs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-gray-800/50 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-gray-700 backdrop-blur-md
                         transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-blue-500"
              variants={cardVariants}
            >
              {/* Avatar Icon */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mb-6 shadow-inner border-2 border-gray-600">
                {testimonial.avatarIcon}
              </div>

              {/* Testimonial Text */}
              <p className="text-lg font-semibold text-gray-100 mb-4 italic relative">
                <Quote className="absolute -top-2 -left-4 w-6 h-6 text-gray-500 opacity-60 transform -rotate-12" />
                "{testimonial.testimonial}"
                <Quote className="absolute -bottom-2 -right-4 w-6 h-6 text-gray-500 opacity-60 transform rotate-180" />
              </p>

              {/* Star Rating */}
              <div className="flex items-center mb-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                  />
                ))}
              </div>

              {/* Customer Name and Date */}
              <p className="text-xl font-bold text-gray-100 mb-1">{testimonial.name}</p>
              <p className="text-sm text-gray-400">{testimonial.date}</p>

              {/* Verified Badge */}
              {testimonial.verified && (
                <span className="flex items-center text-green-400 text-sm font-semibold mt-3 bg-gray-700/40 px-3 py-1 rounded-full border border-green-600">
                  <Verified className="w-4 h-4 mr-1" />
                  Verified Customer
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default CustomerTestimonials;
