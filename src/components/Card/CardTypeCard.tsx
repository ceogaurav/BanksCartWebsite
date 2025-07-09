import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Define props interface for CardTypeCard
interface CardTypeCardProps {
  title: string;
  description: string;
  icon: React.ElementType; // Lucide icon component
  to: string;
}

const CardTypeCard: React.FC<CardTypeCardProps> = ({ title, description, icon: Icon, to }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out
                 p-8 flex flex-col items-center text-center max-w-sm w-full border border-purple-100
                 transform hover:-translate-y-2 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link to={to} className="w-full flex flex-col items-center">
        <div className="mb-6 p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full shadow-lg text-white">
          <Icon className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-700 leading-relaxed mb-6">{description}</p>
        <button
          className="mt-auto bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-full
                     shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105
                     focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          Explore Cards
        </button>
      </Link>
    </motion.div>
  );
};

export default CardTypeCard;
