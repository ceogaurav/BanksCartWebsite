import React from "react";
import { motion } from "framer-motion";
import { Home, ArrowRight } from "lucide-react";


const HomeLoanHero = () => (
  <motion.section
    initial={{ opacity: 0, y: -40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 py-16 px-4 md:px-8 overflow-hidden"
    aria-label="Home Loan Hero Section"
  >
    {/* Animated background gradient blob */}
    <motion.div
      aria-hidden="true"
      className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-primary-200/60 via-secondary-200/40 to-white rounded-full blur-3xl opacity-70 z-0"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.1 }}
    />
    <div className="flex-1 flex flex-col items-start z-10">
      {/* Badge/tagline */}
      <motion.div
        className="mb-3 px-4 py-1 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 font-semibold text-sm shadow"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <span role="img" aria-label="star">⭐</span> Trusted by 10,000+ Happy Homeowners
      </motion.div>
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-primary-800 mb-5 drop-shadow-xl leading-tight relative"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        tabIndex={0}
      >
        Unlock Your <span className="bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-400 bg-clip-text text-transparent">Dream Home</span>
        <br />
        <span className="inline-block relative">
          with <span className="bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent">Easy Home Loans</span>
          <span className="absolute left-0 -bottom-2 w-full h-2 bg-gradient-to-r from-primary-300/60 to-secondary-300/60 rounded-full blur-sm opacity-80" />
        </span>
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        Get <span className="font-bold text-primary-600">instant approval</span>, flexible EMIs, and expert support. <br className="hidden md:block" />Start your home ownership journey today!
      </motion.p>
      <motion.a
        href="#apply-form"
        className="group bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-10 py-4 rounded-xl font-bold shadow-2xl hover:from-secondary-700 hover:to-primary-700 transition-all text-lg flex items-center gap-3 focus:outline-none focus:ring-4 focus:ring-primary-300/50"
        whileHover={{ scale: 1.07, boxShadow: "0 8px 32px 0 rgba(80, 80, 200, 0.18)" }}
        whileTap={{ scale: 0.97 }}
        tabIndex={0}
      >
        Apply Now
        <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
      </motion.a>
    </div>
    <motion.div
      className="flex-1 flex justify-center z-10"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.7 }}
    >
      <motion.div
        className="bg-gradient-to-tr from-primary-600 to-secondary-600 p-10 rounded-3xl shadow-2xl flex items-center justify-center relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary-400/30 to-secondary-400/20 blur-2xl opacity-70 z-0" />
        <Home className="h-28 w-28 text-white drop-shadow-2xl relative z-10" />
      </motion.div>
    </motion.div>
    {/* Decorative floating shapes */}
    <motion.div
      aria-hidden="true"
      className="absolute bottom-0 right-0 w-40 h-40 bg-secondary-100 rounded-full blur-2xl opacity-60 z-0"
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.1, delay: 0.3 }}
    />
  </motion.section>
);

export default HomeLoanHero;
