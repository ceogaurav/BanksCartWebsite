import React from "react";
import InvestmentCard from "../components/investments/InvestmentCard";
import { motion } from 'framer-motion';
import { PiggyBank, TrendingUp, LineChart, Wallet, Briefcase, DollarSign, Home, Gem } from "lucide-react"; // Importing Lucide icons

// Define the types of investments offered
const investmentTypes = [
  {
    title: "Fixed Deposits (FD)",
    description: "Secure your savings with guaranteed returns. Explore competitive interest rates and flexible tenures.",
    icon: PiggyBank, // Lucide PiggyBank icon
    to: "/investment/fixed-deposit",
  },
  {
    title: "Mutual Funds",
    description: "Diversify your portfolio with professionally managed funds. Invest in equity, debt, or hybrid options.",
    icon: TrendingUp, // Lucide TrendingUp icon
    to: "/investment/mutual-funds",
  },
  {
    title: "Stocks & Equities",
    description: "Invest directly in companies and participate in market growth. Expert insights and trading platforms available.",
    icon: LineChart, // Lucide LineChart icon
    to: "/investment/stocks", // Assuming you might add a stocks page later
  },
  {
    title: "Bonds",
    description: "Generate stable income with government and corporate bonds. A lower-risk investment option for your portfolio.",
    icon: DollarSign, // Lucide DollarSign icon (representing value/income)
    to: "/investment/bonds", // Assuming you might add a bonds page later
  },
  {
    title: "Real Estate",
    description: "Explore opportunities in property investment for long-term appreciation and rental income.",
    icon: Home, // Lucide Home icon (assuming it's imported from lucide-react)
    to: "/investment/real-estate", // Assuming you might add a real estate page later
  },
  {
    title: "Gold & Precious Metals",
    description: "Invest in physical or digital gold for a hedge against inflation and market volatility.",
    icon: Gem, // Lucide Gem icon (assuming it's imported from lucide-react)
    to: "/investment/gold", // Assuming you might add a gold investment page later
  },
];

// Framer Motion variants for page entry animation
const pageVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

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

const InvestmentsOverviewPage: React.FC = () => (
  <motion.div
    className="min-h-screen bg-gradient-to-br from-white/60 to-green-50/80 py-12 px-4 md:px-12 font-inter"
    variants={pageVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.h1
      className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-12 text-center drop-shadow-lg
                 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-700"
      variants={itemVariants}
    >
      Grow Your Wealth with Smart Investments
    </motion.h1>

    <motion.p
      className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto text-center mb-12 leading-relaxed"
      variants={itemVariants}
    >
      Explore a diverse range of investment opportunities tailored to your financial goals and risk appetite.
    </motion.p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      {investmentTypes.map((investment, index) => (
        <motion.div key={investment.title} variants={itemVariants}>
          <InvestmentCard {...investment} />
        </motion.div>
      ))}
    </div>

    <motion.section
      className="text-center mt-16 p-8 bg-gradient-to-r from-green-600 to-teal-700 rounded-2xl shadow-xl"
      variants={pageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
        variants={itemVariants}
      >
        Ready to Build Your Investment Portfolio?
      </motion.h2>
      <motion.p
        className="text-lg text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed"
        variants={itemVariants}
      >
        Our investment experts can provide personalized strategies to help you achieve your financial aspirations.
      </motion.p>
      <motion.div variants={itemVariants}>
        {/* Assuming openApplyModal is passed down from App.tsx if needed, or you can remove it */}
        <button
          onClick={() => alert("Connect with an investment expert!")} // Replace with actual modal/contact logic
          className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                     hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                     focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
        >
          Talk to an Investment Advisor
        </button>
      </motion.div>
    </motion.section>
  </motion.div>
);

export default InvestmentsOverviewPage;
