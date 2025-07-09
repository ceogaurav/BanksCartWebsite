import React from "react";
import InsuranceCard from "../components/insurance/InsuranceCard";
import { motion } from 'framer-motion';
import { HeartPulse, Car, Shield, LifeBuoy, Home, Briefcase, Plane } from "lucide-react"; // Importing Lucide icons

// Define the types of insurance offered
const insuranceTypes = [
  {
    title: "Health Insurance",
    description: "Comprehensive coverage for medical expenses, hospitalizations, and critical illnesses. Secure your health and finances.",
    icon: HeartPulse, // Lucide HeartPulse icon
    to: "/insurance/health",
  },
  {
    title: "Car Insurance",
    description: "Protect your vehicle against accidents, theft, and natural calamities. Get hassle-free claims and roadside assistance.",
    icon: Car, // Lucide Car icon
    to: "/insurance/car",
  },
  {
    title: "Term Life Insurance",
    description: "Ensure financial security for your loved ones in your absence. Affordable premiums and high coverage.",
    icon: Shield, // Lucide Shield icon
    to: "/insurance/term-life",
  },
  {
    title: "Travel Insurance",
    description: "Travel with peace of mind. Coverage for medical emergencies, trip cancellations, lost luggage, and more.",
    icon: Plane, // Lucide Plane icon
    to: "/insurance/travel", // Assuming you might add a travel insurance page later
  },
  {
    title: "Home Insurance",
    description: "Protect your home and its contents from unforeseen events like fire, theft, and natural disasters.",
    icon: Home, // Lucide Home icon
    to: "/insurance/home", // Assuming you might add a home insurance page later
  },
  {
    title: "Business Insurance",
    description: "Safeguard your business from operational risks, property damage, and liability claims.",
    icon: Briefcase, // Lucide Briefcase icon
    to: "/insurance/business", // Assuming you might add a business insurance page later
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

const InsuranceOverviewPage: React.FC = () => (
  <motion.div
    className="min-h-screen bg-gradient-to-br from-white/60 to-blue-50/80 py-12 px-4 md:px-12 font-inter"
    variants={pageVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.h1
      className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-12 text-center drop-shadow-lg
                 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700"
      variants={itemVariants}
    >
      Comprehensive Insurance Solutions
    </motion.h1>

    <motion.p
      className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto text-center mb-12 leading-relaxed"
      variants={itemVariants}
    >
      Protect what matters most with BanksCart's wide range of insurance products.
      From health to home, we've got you covered with expert advice and seamless processes.
    </motion.p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      {insuranceTypes.map((insurance, index) => (
        <motion.div key={insurance.title} variants={itemVariants}>
          <InsuranceCard {...insurance} />
        </motion.div>
      ))}
    </div>

    <motion.section
      className="text-center mt-16 p-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl"
      variants={pageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
        variants={itemVariants}
      >
        Need Personalized Insurance Advice?
      </motion.h2>
      <motion.p
        className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
        variants={itemVariants}
      >
        Our insurance experts can help you understand your needs and find the perfect plan.
      </motion.p>
      <motion.div variants={itemVariants}>
        {/* Assuming openApplyModal is passed down from App.tsx if needed, or you can remove it */}
        {/* For now, I'll keep it as a placeholder, but you might need to adjust based on your Header/Footer structure */}
        <button
          onClick={() => alert("Connect with an insurance expert!")} // Replace with actual modal/contact logic
          className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                     hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                     focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
        >
          Talk to an Insurance Advisor
        </button>
      </motion.div>
    </motion.section>
  </motion.div>
);

export default InsuranceOverviewPage;
