import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const glassStyles =
  "backdrop-blur-md bg-white/40 border border-white/30 shadow-xl rounded-2xl p-8 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl";

const LoanCard = ({ title, description, icon: Icon, to, animate }) => {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
      transition={{ duration: 0.4, type: "spring" }}
      className={glassStyles + " w-80 min-h-[260px] cursor-pointer group"}
      tabIndex={0}
    >
      <div className="bg-gradient-to-tr from-primary-600 to-secondary-600 p-4 rounded-full mb-4 shadow-lg">
        <Icon className="h-10 w-10 text-white" />
      </div>
      <h2 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary-700 transition-colors">
        {title}
      </h2>
      <p className="text-gray-700 text-center mb-4">{description}</p>
    </motion.div>
  );
  if (to) {
    return (
      <Link to={to} tabIndex={0} aria-label={title} className="focus:outline-none focus:ring-2 focus:ring-primary-500">
        {card}
      </Link>
    );
  }
  return card;
};

export default LoanCard;
