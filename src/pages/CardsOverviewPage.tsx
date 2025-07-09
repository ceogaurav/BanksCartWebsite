import React from "react";
import CardTypeCard from "../components/Card/CardTypeCard";
import { motion } from 'framer-motion';
import { CreditCard, Wallet, IndianRupee, ShieldCheck, Briefcase } from "lucide-react"; // Importing Lucide icons

// Define the types of cards offered
const cardTypes = [
  {
    title: "Credit Cards",
    description: "Unlock rewards, build credit, and manage expenses with our wide range of credit card options. Find the perfect card for your lifestyle.",
    icon: CreditCard, // Lucide CreditCard icon
    to: "/cards/credit",
  },
  {
    title: "Debit Cards",
    description: "Enjoy secure and convenient access to your funds. Manage daily transactions, withdraw cash, and shop online with ease.",
    icon: Wallet, // Lucide Wallet icon
    to: "/cards/debit",
  },
  {
    title: "Prepaid Cards",
    description: "Budget effectively and control spending with reloadable prepaid cards. Great for travel or managing specific expenses.",
    icon: IndianRupee, // Using IndianRupee as a generic currency/value icon
    to: "/cards/prepaid", // Assuming you might add a prepaid cards page later
  },
  {
    title: "Commercial Cards",
    description: "Streamline business expenses, manage corporate spending, and gain valuable insights with our commercial card solutions.",
    icon: Briefcase, // Lucide Briefcase icon (assuming it's imported from lucide-react)
    to: "/cards/commercial", // Assuming you might add a commercial cards page later
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

const CardsOverviewPage: React.FC = () => (
  <motion.div
    className="min-h-screen bg-gradient-to-br from-white/60 to-purple-50/80 py-12 px-4 md:px-12 font-inter"
    variants={pageVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.h1
      className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-12 text-center drop-shadow-lg
                 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-700"
      variants={itemVariants}
    >
      Explore Our Range of Cards
    </motion.h1>

    <motion.p
      className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto text-center mb-12 leading-relaxed"
      variants={itemVariants}
    >
      Discover the perfect card for your financial needs, whether it's for daily spending, rewards, or business management.
    </motion.p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      {cardTypes.map((card, index) => (
        <motion.div key={card.title} variants={itemVariants}>
          <CardTypeCard {...card} />
        </motion.div>
      ))}
    </div>

    <motion.section
      className="text-center mt-16 p-8 bg-gradient-to-r from-purple-600 to-pink-700 rounded-2xl shadow-xl"
      variants={pageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
        variants={itemVariants}
      >
        Need Help Choosing the Right Card?
      </motion.h2>
      <motion.p
        className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed"
        variants={itemVariants}
      >
        Our financial experts can guide you through the options and help you select the card that best suits your lifestyle and financial goals.
      </motion.p>
      <motion.div variants={itemVariants}>
        {/* Assuming openApplyModal is passed down from App.tsx if needed, or you can remove it */}
        <button
          onClick={() => alert("Connect with a cards expert!")} // Replace with actual modal/contact logic
          className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                     hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                     focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
        >
          Talk to a Cards Advisor
        </button>
      </motion.div>
    </motion.section>
  </motion.div>
);

export default CardsOverviewPage;
