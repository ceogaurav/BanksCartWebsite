import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// FIX APPLIED: Changed path from '../components/common/ApplyButton' to '../../components/common/ApplyButton'
import ApplyButton from '../../components/common/ApplyButton'; 
import { useNavigate } from 'react-router-dom';
import {
  Shield, DollarSign, FileText, Zap, CheckCircle, Clock, Users, Smile, Globe,
  ArrowRight, CreditCard, Award, Verified, Quote, UserCircle2, Headphones, Smartphone, Briefcase,
  ChevronDown, Plus, Minus, Home, User, TrendingUp, Handshake, ClipboardList,
  CalendarCheck, LifeBuoy, Wallet, PiggyBank, CircleCheck, Info,
  Star, Search, Building2, Scale, ClipboardCopy, MessageSquare, IndianRupee, CheckCircle2,
  Percent, TrendingDown, Brain, Activity, Lightbulb, MapPin, Download, Newspaper, Trophy,
  Ruler, CreditCard as CreditCardIcon, BookOpen, UserCheck, Banknote, History, BarChart2
} from 'lucide-react';

// --- Reusable Motion Variants (Replicated from original file) ---
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
      stiffness: 100,
      damping: 10
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: {
      duration: 0.3
    }
  }
};

// --- Subcomponents for structure replication ---

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-gray-200"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <button
        className="flex justify-between items-center w-full py-4 text-left font-semibold text-lg text-gray-800 hover:text-indigo-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="pb-4 text-gray-600"
          >
            <p className="pl-4 border-l-4 border-indigo-500">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


const LoanEligibilityPage: React.FC = () => {
  const navigate = useNavigate();
  const [openApplyModal, setOpenApplyModal] = useState(false); // Placeholder state

  const eligibilityTricks = [
    {
      icon: Percent,
      title: "The CUR Stealth Payoff",
      description: "Banks care about your Credit Utilization Ratio (CUR). Pay your credit card bill *before* the statement generation date, not just the due date, to report a lower balance to the bureaus. Target <10% utilization."
    },
    {
      icon: Shield,
      title: "Hard Inquiry Avoidance",
      description: "Multiple hard inquiries signal desperation and drop your score. Use online pre-qualification tools (soft inquiries) before submitting a full application. Apply only to the most suitable lender."
    },
    {
      icon: Search,
      title: "Audit Your Credit Report",
      description: "Up to 30% of credit reports have errors. A bank-reported mistake (like a loan you paid off still showing open) can crush your eligibility. Check it 6 months prior and dispute errors immediately."
    },
    {
      icon: BarChart2,
      title: "The Income Declaration Trick",
      description: "Lenders look at your Debt-to-Income (DTI) ratio. Don't just show your salary. Include documented rental income, freelance earnings, or secondary bonuses. A higher income denominator lowers your DTI ratio."
    },
    {
      icon: History,
      title: "Don't Close Old Cards",
      description: "The length of your credit history (age of accounts) is a major factor. Closing an old, unused card drastically shortens your average credit age. Keep it open, and use it once every 6 months for a small purchase."
    },
    {
      icon: Handshake,
      title: "Strategic Credit Mix",
      description: "Lenders prefer borrowers who can handle a mix of debt. A secured loan (like a small FD-backed loan) can signal responsibility and boost your score, especially if you only have credit cards."
    },
    {
      icon: Clock,
      title: "Tenure-to-DTI Optimization",
      description: "When applying, opting for a longer repayment tenure results in a lower monthly EMI. A lower EMI immediately improves your Fixed Obligation to Income Ratio (FOIR), making you a safer bet for approval."
    }
  ];

  const loanEligibilityFAQs = [
    {
      question: "What is the single most important factor for loan eligibility?",
      answer: "While many factors count, your **Credit Score (CIBIL/FICO)** combined with your **Debt-to-Income (DTI) Ratio** are the most critical. A score above 750 and a DTI below 40% will drastically improve your chances."
    },
    {
      question: "How long does it take to see an improvement in my eligibility score?",
      answer: "Minor improvements (like correcting credit card utilization) can show up in 1-2 billing cycles (30-60 days). Major changes, like recovering from a missed payment or increasing your credit age, can take 6 months to over a year."
    },
    {
      question: "Should I close my unused credit cards to look 'less risky'?",
      answer: "No. Closing old accounts shortens your average credit history, which can lower your score. It's better to keep them open, use them occasionally, and maintain a zero or low balance."
    },
    {
      question: "Is applying for multiple loans bad, even if I get approved?",
      answer: "Yes. Every formal application results in a 'hard inquiry' on your credit report. Too many hard inquiries in a short period (e.g., 6 months) makes you look desperate for credit and can negatively impact your score."
    }
  ];

  const handleScrollToGuide = () => {
    document.getElementById('step-by-step-guide')?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        className="relative pt-24 pb-12 md:pt-32 md:pb-20 bg-indigo-700 text-white overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4"
            variants={itemVariants}
          >
            Unlock Your Financial Power
          </motion.h1>
          <motion.h2
            className="text-xl sm:text-2xl font-light mb-6 opacity-80"
            variants={itemVariants}
          >
            How to Improve Loan Eligibility: <span className="font-semibold">Tricks Banks Don’t Tell You</span>
          </motion.h2>
          <motion.p
            className="max-w-2xl text-lg mb-8"
            variants={itemVariants}
          >
            Stop getting rejected. Discover the 7 hidden, strategic moves that can instantly boost your credit profile, lower your risk factors, and qualify you for the best interest rates on any loan.
          </motion.p>
          <motion.button
            onClick={handleScrollToGuide}
            className="bg-yellow-400 text-indigo-900 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-50 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            <BookOpen className="w-5 h-5" />
            Read the 7 Hidden Secrets
          </motion.button>
        </div>
        {/* Background Overlay Effect */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
        {/* Abstract Background Element (Replicating style) */}
        <motion.div
          className="absolute right-0 bottom-0 w-64 h-64 bg-indigo-500 rounded-full opacity-10 transform translate-x-1/2 translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </motion.section>

      {/* Eligibility Analyzer Section (Replaces Premium Calculator) */}
      <motion.section
        id="eligibility-analyzer"
        className="py-16 md:py-24 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h3
            className="text-sm font-semibold uppercase text-indigo-600 mb-2"
            variants={itemVariants}
          >
            The Borrower's Scorecard
          </motion.h3>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12"
            variants={itemVariants}
          >
            What Lenders *Really* Analyze: Your Eligibility Breakdown
          </motion.h2>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100"
              variants={cardVariants}
              whileHover="hover"
            >
              <BarChart2 className="w-10 h-10 text-indigo-500 mb-3 mx-auto" />
              <h4 className="text-xl font-semibold mb-2 text-gray-700">Credit Score (35%)</h4>
              <p className="text-gray-600 text-sm">Target: 750+. Built primarily on payment history and amounts owed (CUR).</p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100"
              variants={cardVariants}
              whileHover="hover"
            >
              <Ruler className="w-10 h-10 text-indigo-500 mb-3 mx-auto" />
              <h4 className="text-xl font-semibold mb-2 text-gray-700">DTI Ratio (30%)</h4>
              <p className="text-gray-600 text-sm">Target: &lt;40%. Monthly Debt Payments / Gross Monthly Income. The lower, the better.</p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100"
              variants={cardVariants}
              whileHover="hover"
            >
              <CreditCardIcon className="w-10 h-10 text-indigo-500 mb-3 mx-auto" />
              <h4 className="text-xl font-semibold mb-2 text-gray-700">Credit Mix & Age (25%)</h4>
              <p className="text-gray-600 text-sm">Blend of secured/unsecured loans and a long history shows maturity and stability.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Core Benefits/Features Section (The 7 Hidden Tricks) */}
      <motion.section
        className="py-16 md:py-24"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <motion.h3
            className="text-sm font-semibold uppercase text-center text-indigo-600 mb-2"
            variants={itemVariants}
          >
            Insider Secrets
          </motion.h3>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-16"
            variants={itemVariants}
          >
            The 7 Tricks Banks Hope You Never Discover
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {eligibilityTricks.map((trick, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-xl border-t-4 border-indigo-500 transform hover:shadow-2xl transition duration-300"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="flex items-center mb-4">
                  <trick.icon className="w-8 h-8 text-indigo-600 mr-4" />
                  <h4 className="text-xl font-bold text-gray-800">{trick.title}</h4>
                </div>
                <p className="text-gray-600">{trick.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Educational/Guide Section (Step-by-Step Blueprint) */}
      <motion.section
        id="step-by-step-guide"
        className="py-16 md:py-24 bg-indigo-50"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12"
            variants={itemVariants}
          >
            Your 4-Step Loan Eligibility Blueprint
          </motion.h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: 1,
                title: "Pre-Flight Check: Audit Your Report",
                content: "Pull your full credit report 6 months before you need a loan. Dispute any errors (e.g., missed payments you made, closed loans that are open). This correction can instantly raise your score by 20-50 points.",
                icon: ClipboardList
              },
              {
                step: 2,
                title: "The CUR Window Trick",
                content: "For 2 months leading up to the application, pay off your credit card balance *a few days before* the statement closing date. This ensures the credit bureau reports a near-zero balance, maximizing your Credit Utilization Ratio (CUR) benefit.",
                icon: CalendarCheck
              },
              {
                step: 3,
                title: "DTI Optimization and Documentation",
                content: "Aggressively pay down your highest-interest, unsecured debts (credit cards, personal loans). Gather official documentation (tax returns, rental agreements) for *all* sources of income to maximize the denominator in your DTI calculation.",
                icon: Wallet
              },
              {
                step: 4,
                title: "The Single Application Strike",
                content: "Research thoroughly (using soft-inquiry tools) and choose the single best lender. Submit only one formal, hard-inquiry application to avoid the 'credit hungry' flag that can result from multiple rejections/inquiries.",
                icon: Award
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="flex items-start bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-600 text-white rounded-full font-bold text-xl mr-4">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <step.icon className="w-5 h-5 text-indigo-400" />
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section (Success Stories) */}
      <motion.section
        className="py-16 md:py-24"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h3
            className="text-sm font-semibold uppercase text-indigo-600 mb-2"
            variants={itemVariants}
          >
            Real Results
          </motion.h3>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12"
            variants={itemVariants}
          >
            Stories of Eligibility Transformed
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
              variants={cardVariants}
              whileHover="hover"
            >
              <Quote className="w-8 h-8 text-indigo-500 mb-4" />
              <p className="italic text-gray-700 mb-4">"I used the 'CUR Stealth Payoff' trick and my credit score jumped by 40 points in a month. I got approved for a lower home loan rate than I thought possible."</p>
              <div className="flex items-center justify-center">
                <UserCircle2 className="w-8 h-8 text-gray-400 mr-3" />
                <span className="font-semibold text-gray-800">— R. Sharma, Bangalore</span>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
              variants={cardVariants}
              whileHover="hover"
            >
              <Quote className="w-8 h-8 text-indigo-500 mb-4" />
              <p className="italic text-gray-700 mb-4">"Checking my report revealed a paid-off car loan still marked as open. The dispute process was easy, and two months later, my DTI looked great. Approved!"</p>
              <div className="flex items-center justify-center">
                <UserCircle2 className="w-8 h-8 text-gray-400 mr-3" />
                <span className="font-semibold text-gray-800">— S. Khan, Mumbai</span>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
              variants={cardVariants}
              whileHover="hover"
            >
              <Quote className="w-8 h-8 text-indigo-500 mb-4" />
              <p className="italic text-gray-700 mb-4">"The guidance on declaring my freelance income completely changed my DTI ratio. I moved from high-risk to prime borrower status, securing a personal loan."</p>
              <div className="flex items-center justify-center">
                <UserCircle2 className="w-8 h-8 text-gray-400 mr-3" />
                <span className="font-semibold text-gray-800">— A. Pillai, Chennai</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="py-16 md:py-24 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h3
            className="text-sm font-semibold uppercase text-center text-indigo-600 mb-2"
            variants={itemVariants}
          >
            Questions Answered
          </motion.h3>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12"
            variants={itemVariants}
          >
            Common Loan Eligibility FAQs
          </motion.h2>

          <div className="space-y-2">
            {loanEligibilityFAQs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="py-16 md:py-20 bg-indigo-800 text-white"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Secure Your Best Loan Rate?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Don't leave approval to chance. Download our comprehensive pre-application checklist and ensure every factor is optimized before you talk to a bank.
            </p>
            <motion.button
              onClick={() => console.log('Download Checklist clicked')} // Placeholder action
              className="bg-teal-400 text-indigo-900 font-bold py-3 px-10 rounded-full text-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-300 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5 inline mr-2" />
              Download Free Eligibility Checklist
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Floating Action Button for Quick Application (Replicated) */}
      {/* Assuming the original ApplyButton and state logic should be maintained for structural consistency */}
      {openApplyModal ? (
        <ApplyButton
          loanType="Loan Eligibility - Quick Check"
          openApplyModal={openApplyModal}
          className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg bg-gradient-to-r from-teal-500 to-indigo-500 text-white transition duration-300 ease-in-out transform hover:scale-110 z-50 flex items-center gap-2"
        >
          <Verified className="w-6 h-6" />
          <span className="font-semibold hidden sm:inline">Apply Now</span>
        </ApplyButton>
      ) : (
        <button
          onClick={() => document.getElementById('eligibility-analyzer')?.scrollIntoView({ behavior: 'smooth' })}
          className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg bg-gradient-to-r from-teal-500 to-indigo-500 text-white transition duration-300 ease-in-out transform hover:scale-110 z-50 flex items-center gap-2"
        >
          <Verified className="w-6 h-6" />
          <span className="font-semibold hidden sm:inline">Check Eligibility</span>
        </button>
      )}
    </div>
  );
};

export default LoanEligibilityPage;
