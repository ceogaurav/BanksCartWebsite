import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, Handshake, ShieldCheck, BookOpen, Users, DollarSign, TrendingUp,
  Wallet, PiggyBank, CreditCard, Clock, Award, UserCheck, Phone, Mail, FileText, GitFork,
  BarChart, HeartPulse, Home, Car, Landmark, Percent, CalendarCheck
} from 'lucide-react';
import ApplyButton from '../components/common/ApplyButton';

// --- Framer Motion Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1 // Stagger animation for direct children
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15
    }
  }
};

// --- FAQ Item Component ---
const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void }> = ({ question, answer, isOpen, onClick }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg border border-gray-200 mb-4 overflow-hidden"
      initial={false}
      animate={{
        backgroundColor: isOpen ? '#F3F4F6' : '#FFFFFF',
        borderColor: isOpen ? '#6366F1' : '#E5E7EB'
      }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
        onClick={onClick}
      >
        <div className="flex items-center">
          <Info className="w-6 h-6 mr-4 text-blue-500 flex-shrink-0" />
          <h3 className="text-xl font-semibold text-gray-800 pr-4">{question}</h3>
        </div>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="px-6 pb-6 pt-2"
          >
            <p className="text-gray-700 leading-relaxed text-lg border-t border-gray-200 pt-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Main Expert Advice Page Component ---
interface ExpertAdvicePageProps {
  openApplyModal?: (loanType?: string) => void;
}

const ExpertAdvicePage: React.FC<ExpertAdvicePageProps> = ({ openApplyModal }) => {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  const adviceAreas = [
    {
      icon: <DollarSign className="w-12 h-12 text-green-500 mb-4" />,
      title: "Loan & Debt Management",
      description: "Get personalized strategies for home loans, personal loans, business loans, and effective debt consolidation. Understand EMIs, interest rates, and repayment plans."
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-purple-500 mb-4" />,
      title: "Investment Planning",
      description: "Navigate mutual funds, fixed deposits, stocks, and other investment avenues. Build a diversified portfolio aligned with your risk tolerance and financial goals."
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-blue-500 mb-4" />,
      title: "Insurance Guidance",
      description: "Secure your future with expert advice on health insurance, term life insurance, car insurance, and more. Find the right coverage at the best rates."
    },
    {
      icon: <Clock className="w-12 h-12 text-orange-500 mb-4" />,
      title: "Retirement Planning",
      description: "Plan for a comfortable retirement. Understand pensions, annuities, and create a robust retirement corpus that accounts for inflation and future needs."
    },
    {
      icon: <FileText className="w-12 h-12 text-red-500 mb-4" />,
      title: "Tax Optimization",
      description: "Maximize your savings and ensure compliance with expert guidance on income tax, capital gains tax, and other tax-related matters. Stay updated with regulations."
    },
    {
      icon: <Wallet className="w-12 h-12 text-teal-500 mb-4" />,
      title: "Wealth Management",
      description: "Holistic financial planning to grow and preserve your wealth. From budgeting and expense management to estate planning, we cover it all."
    }
  ];

  const whyChooseUs = [
    {
      icon: <Award className="w-16 h-16 text-yellow-500 mb-4" />,
      title: "Certified Financial Experts",
      description: "Our advisors are highly qualified and experienced professionals with deep knowledge of the financial landscape."
    },
    {
      icon: <Users className="w-16 h-16 text-indigo-500 mb-4" />,
      title: "Personalized Strategies",
      description: "We understand your unique financial situation and tailor advice to meet your specific goals and risk profile."
    },
    {
      icon: <Handshake className="w-16 h-16 text-green-500 mb-4" />,
      title: "Unbiased & Transparent Advice",
      description: "Our recommendations are always in your best interest, with full transparency on all options and potential outcomes."
    },
    {
      icon: <Scale className="w-16 h-16 text-purple-500 mb-4" />,
      title: "Holistic Financial Approach",
      description: "We look at your entire financial picture, ensuring all aspects of your financial life are aligned for success."
    }
  ];

  const advisoryProcess = [
    {
      step: "1. Discovery Call",
      description: "A free initial consultation to understand your financial goals, current situation, and challenges. This helps us identify how we can best assist you.",
      icon: <Phone className="w-8 h-8 text-blue-500" />
    },
    {
      step: "2. In-Depth Analysis",
      description: "Our experts conduct a thorough analysis of your financial data, including income, expenses, assets, liabilities, and existing investments.",
      icon: <BarChart className="w-8 h-8 text-green-500" />
    },
    {
      step: "3. Personalized Plan Creation",
      description: "We develop a customized financial plan with actionable strategies tailored to your unique needs and aspirations.",
      icon: <BookOpen className="w-8 h-8 text-purple-500" />
    },
    {
      step: "4. Implementation Support",
      description: "Our team assists you in executing the recommended strategies, from loan applications to investment portfolio setup.",
      icon: <Handshake className="w-8 h-8 text-orange-500" />
    },
    {
      step: "5. Ongoing Review & Adjustment",
      description: "Financial situations evolve. We provide regular reviews and make necessary adjustments to your plan to keep you on track.",
      icon: <CalendarCheck className="w-8 h-8 text-teal-500" />
    }
  ];

  const faqs = [
    {
      question: "Who can benefit from financial expert advice?",
      answer: "Anyone looking to improve their financial health can benefit. Whether you're planning for retirement, buying a home, managing debt, or investing, our experts can provide clarity and guidance tailored to your specific situation."
    },
    {
      question: "What types of financial advice do you offer?",
      answer: "We offer comprehensive advice across various domains including personal loans, home loans, business loans, debt consolidation, investment planning (mutual funds, FDs, stocks), insurance (health, life, car), retirement planning, tax optimization, and overall wealth management."
    },
    {
      question: "How much does expert financial advice cost?",
      answer: "Your initial discovery call with our experts is absolutely free. During this call, we'll discuss your needs and outline potential service options and associated costs, if any, transparently."
    },
    {
      question: "Is the advice personalized to my situation?",
      answer: "Absolutely. We believe in a personalized approach. Our experts take the time to understand your unique financial goals, risk tolerance, and current circumstances before providing any recommendations."
    },
    {
      question: "How do I get started with an expert advisor?",
      answer: "It's simple! You can click on any 'Connect with an Expert' button on this page, fill out a brief form, and one of our advisors will reach out to schedule your free discovery call at your convenience."
    },
    {
      question: "What qualifications do your financial experts hold?",
      answer: "Our team comprises certified financial planners, investment analysts, and loan specialists with extensive industry experience and relevant certifications to ensure you receive top-tier advice."
    },
    {
      question: "Can you help me with tax planning specifically?",
      answer: "Yes, our experts can guide you through various tax-saving strategies, help you understand capital gains tax implications, and ensure you are compliant with the latest tax regulations to optimize your financial outcomes."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Unlock Your Financial Potential with{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              BanksCart Expert Advice.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Navigate the complexities of personal finance with personalized strategies from certified professionals.
            Your financial clarity starts here.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Expert Financial Advice Inquiry"
                openApplyModal={openApplyModal}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Connect with an Expert Today
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* What We Offer Section */}
        <motion.section
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-gray-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 drop-shadow-md">
            <Lightbulb className="inline-block w-9 h-9 mr-3 text-blue-500" /> Our Areas of Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adviceAreas.map((area, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 transform hover:scale-105 transition-transform duration-300"
                variants={cardVariants}
              >
                {area.icon}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{area.title}</h3>
                <p className="text-gray-700">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Why Choose Our Experts Section */}
        <motion.section
          className="bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-3xl shadow-2xl p-6 md:p-10 w-full mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center drop-shadow-md">
            <Users className="inline-block w-9 h-9 mr-3 text-white" /> Why Choose BanksCart's Financial Experts?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((reason, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 transform hover:bg-opacity-20 transition-all duration-300"
                variants={cardVariants}
              >
                {reason.icon}
                <h3 className="text-xl font-bold text-white mb-2">{reason.title}</h3>
                <p className="text-teal-100">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Our Advisory Process Section */}
        <motion.section
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-gray-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 drop-shadow-md">
            <GitFork className="inline-block w-9 h-9 mr-3 text-pink-500" /> Our Personalized Advisory Process
          </h2>
          <div className="relative flex flex-col md:flex-row justify-between items-center md:items-stretch space-y-8 md:space-y-0 md:space-x-8">
            {advisoryProcess.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow-md border border-gray-100 flex-1 min-w-[200px]"
                variants={itemVariants}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600 mb-4 shadow-md">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.step}</h3>
                <p className="text-gray-700 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Common Financial Challenges Section */}
        <motion.section
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-3xl shadow-2xl p-6 md:p-10 w-full mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center drop-shadow-md">
            <MessageSquare className="inline-block w-9 h-9 mr-3 text-white" /> Addressing Your Financial Challenges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl border border-white border-opacity-20">
              <h3 className="text-2xl font-bold mb-3 flex items-center"><DollarSign className="w-7 h-7 mr-2 text-yellow-300" /> Debt Overload?</h3>
              <p className="text-purple-100 leading-relaxed">Struggling with multiple loans or high-interest debts? Our experts can help you create a debt consolidation plan, negotiate better terms, and set up a realistic repayment strategy to regain control of your finances.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl border border-white border-opacity-20">
              <h3 className="text-2xl font-bold mb-3 flex items-center"><PiggyBank className="w-7 h-7 mr-2 text-yellow-300" /> Unclear Investment Path?</h3>
              <p className="text-purple-100 leading-relaxed">Confused about where to invest your hard-earned money? We provide clarity on investment options, help assess your risk appetite, and build a portfolio designed for long-term growth and wealth creation.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl border border-white border-opacity-20">
              <h3 className="text-2xl font-bold mb-3 flex items-center"><Home className="w-7 h-7 mr-2 text-yellow-300" /> Homeownership Dreams?</h3>
              <p className="text-purple-100 leading-relaxed">From understanding mortgage options to navigating property taxes and home affordability, our advisors guide you through every step of your homeownership journey, making it stress-free.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl border border-white border-opacity-20">
              <h3 className="text-2xl font-bold mb-3 flex items-center"><HeartPulse className="w-7 h-7 mr-2 text-yellow-300" /> Insurance Confusion?</h3>
              <p className="text-purple-100 leading-relaxed">Choosing the right insurance can be overwhelming. Our experts demystify policies, help you understand coverage needs, and find plans that truly protect you and your loved ones without overspending.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Dynamic FAQ Section */}
        <motion.section id="faq-section" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
            <Info className="w-8 h-8 mr-3 text-blue-500" /> Frequently Asked Questions (FAQs)
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQIndex === index}
                onClick={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </motion.section>

        {/* Final Call to Action */}
        <motion.section
          className="text-center mt-12 p-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Ready for Personalized Financial Guidance?
          </motion.h2>
          <motion.p
            className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Don't leave your financial future to chance. Connect with BanksCart's certified experts
            and take the first step towards achieving your financial goals.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal ? (
              <ApplyButton
                loanType="Expert Financial Advice Consultation"
                openApplyModal={openApplyModal}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Schedule Your Free Consultation
              </ApplyButton>
            ) : (
              <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Schedule Your Free Consultation</button>
            )}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default ExpertAdvicePage;
