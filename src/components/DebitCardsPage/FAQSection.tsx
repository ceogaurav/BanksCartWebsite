import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus, CreditCard, DollarSign, Lock, Globe, Smartphone, Award, HelpCircle } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <motion.div
      className="bg-gray-800/50 rounded-xl shadow-lg border border-gray-700 backdrop-blur-md mb-4 overflow-hidden"
      initial={false} // Disable initial animation as parent handles it
      animate={{
        backgroundColor: isOpen ? 'rgba(31, 41, 55, 0.7)' : 'rgba(31, 41, 55, 0.5)', // Darker when open
        borderColor: isOpen ? '#6366F1' : '#4B5563' // Highlight border when open
      }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
        onClick={onClick}
      >
        <div className="flex items-center">
          <HelpCircle className="w-6 h-6 mr-4 text-blue-400 flex-shrink-0" />
          <h3 className="text-xl font-semibold text-white pr-4">{question}</h3>
        </div>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
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
            <p className="text-gray-300 leading-relaxed text-lg border-t border-gray-700 pt-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CustomerFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null); // State to manage which FAQ item is open

  const faqs = [
    {
      question: "What is a BanksCart Debit Card and how does it work?",
      answer: "A BanksCart Debit Card allows you to spend money directly from your linked bank account. When you make a purchase, the funds are deducted in real-time, providing a clear overview of your balance. It works seamlessly for online, in-store, and ATM transactions worldwide."
    },
    {
      question: "How do I apply for a BanksCart Debit Card?",
      answer: "Applying is easy! You can apply directly through our BanksCart mobile app or by visiting our website. Simply fill out the online application form, provide the necessary identification documents, and your card will be processed and mailed to you. Virtual cards are often available instantly."
    },
    {
      question: "Are there any fees associated with BanksCart Debit Cards?",
      answer: "BanksCart offers various debit card options. Our Essential Debit Card has no monthly fees. Premium and Business cards may have small monthly fees, but they come with enhanced benefits like higher cashback rates, travel insurance, and dedicated support. Please refer to our comparison table for detailed fee information."
    },
    {
      question: "Can I use my BanksCart Debit Card internationally?",
      answer: "Yes, BanksCart Debit Cards are accepted globally wherever Visa or Mastercard are accepted. Our Premium and Business cards even offer 0% foreign transaction fees, making them ideal for international travel and online purchases from abroad."
    },
    {
      question: "What should I do if my BanksCart Debit Card is lost or stolen?",
      answer: "If your card is lost or stolen, immediately freeze it via the BanksCart mobile app or contact our 24/7 customer support hotline. We will block your card and help you arrange for a replacement to ensure your funds remain secure."
    },
    {
      question: "How can I track my spending and manage my card?",
      answer: "You can easily track all your transactions, set spending limits, and manage your card security settings through the intuitive BanksCart mobile app. Real-time notifications keep you informed of every transaction, giving you full control over your finances."
    },
    {
      question: "What security features does BanksCart Debit Card offer?",
      answer: "Your security is our priority. BanksCart Debit Cards come with advanced security features including EMV chip technology, biometric authentication for app access, instant transaction alerts, and 24/7 fraud monitoring to protect your account."
    }
  ];

  // Framer Motion variants for the main section entry
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1 // Stagger animation for each FAQ item
      }
    }
  };

  return (
    <motion.section
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white font-inter overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Animate when 30% of component is in view
    >
      {/* Background abstract shapes for visual interest */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow animation-delay-2000"></div>
      </div>

      {/* Tailwind CSS for keyframe animations (reused from previous sections) */}
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
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            Frequently Asked{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-400">
              Questions
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Find quick answers to common questions about BanksCart Debit Cards.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default CustomerFAQ;
