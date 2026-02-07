import React from 'react';
// FIX 1: Changed the import path. The deep import 'framer-motion/dist/framer-motion' 
// often fails in bundlers like Vite/Rollup, resulting in the "Missing specifier" error.
// We use the standard package import instead.
import { motion } from 'framer-motion';

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  // FIX 2: Resolved the "Duplicate key 'opacity'" warning/error.
  // The original code had { opacity: 0, y: 30, opacity: 0.5 }.
  // I removed the redundant and conflicting second 'opacity'.
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    }
  },
};

// Mock data for the list
const tasks = [
  "Apply fixes to all affected blog files",
  "Standardize Framer Motion import path",
  "Resolve duplicate 'opacity' key in variants",
  "Check build status after deploying changes",
  "Continue developing BanksCart features"
];

// Main App Component
const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Task List Animator (Corrected)
        </h1>

        {/* Use motion.ul as the container with its variants */}
        <motion.ul
          className="bg-white shadow-xl rounded-xl p-6 space-y-4"
          variants={containerVariants}
          initial="hidden"
          // We use whileInView for scroll animations in a real app, 
          // but for this example, we keep 'animate="visible"'
          animate="visible" 
        >
          {tasks.map((task, index) => (
            <motion.li
              key={index}
              className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-lg font-medium text-gray-800 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
              variants={itemVariants}
            >
              <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {task}
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>This demonstrates the corrected Framer Motion implementation.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
