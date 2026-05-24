import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calendar, Calculator, TrendingUp,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  PiggyBank, Clock, Coins
} from 'lucide-react';
import ApplyButton from '../../components/common/ApplyButton';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatNumberWithCommas = (value: number | string): string => {
  if (typeof value === 'number') {
    return value.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }
  return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function SSYCalculatorPage({ openApplyModal }: { openApplyModal?: (loanType?: string) => void }) {
  const [yearlyContribution, setYearlyContribution] = useState<number>(100000);
  const [girlAge, setGirlAge] = useState<number>(5);
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const calculations = useMemo(() => {
    const P = yearlyContribution;
    const rate = 0.082; // 8.2% current interest rate
    let totalInvested = 0;
    let balance = 0;
    
    // SSY Compounds for 21 years
    // Contributions are made for the first 15 years
    for (let year = 1; year <= 21; year++) {
      if (year <= 15) {
        balance += P;
        totalInvested += P;
      }
      const interest = balance * rate;
      balance += interest;
    }

    return {
      totalInvested,
      maturityAmount: Math.round(balance),
      interestEarned: Math.round(balance - totalInvested),
      maturityYear: new Date().getFullYear() + 21
    };
  }, [yearlyContribution]);

  const faqs = [
    {
      question: "What is Sukanya Samriddhi Yojana (SSY)?",
      answer: "Sukanya Samriddhi Yojana is a government-backed savings scheme launched under the 'Beti Bachao Beti Padhao' initiative. It is designed to help parents build a dedicated fund for their girl child's higher education and marriage."
    },
    {
      question: "What are the investment limits for an SSY account?",
      answer: "Parents can start an SSY account with a minimum deposit of ₹250 per year. The maximum deposit limit is ₹1,50,000 per financial year. Deposits can be made in lump sums or in multiple installments."
    },
    {
      question: "What is the current interest rate for SSY in 2026?",
      answer: "The government has set the SSY interest rate at a highly competitive 8.2% per annum, compounded annually. This rate is higher than standard bank Fixed Deposits and Public Provident Fund (PPF) rates."
    },
    {
      question: "What are the tax benefits of Sukanya Samriddhi Yojana?",
      answer: "SSY carries the coveted EEE (Exempt-Exempt-Exempt) tax status. Contributions qualify for deduction up to ₹1.5 Lakh under Section 80C, the interest accrued is completely tax-free, and the maturity withdrawal is also 100% exempt from tax."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 py-8 font-inter text-gray-800 pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-rose-500 to-pink-600 text-white p-8 rounded-3xl shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Sukanya Samriddhi Yojana (SSY) Calculator
          </h1>
          <p className="text-lg text-rose-100 max-w-3xl mx-auto mb-6">
            Secure your daughter's future. Calculate maturity amounts, interest earned, and plan her higher studies and marriage with our high-precision SSY calculator.
          </p>
        </motion.div>

        {/* CALCULATOR PANEL */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-rose-100 mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Inputs */}
          <div className="space-y-8 p-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <PiggyBank className="w-6 h-6 mr-2 text-rose-500" /> Scheme Inputs
            </h3>

            {/* Yearly Contribution */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Yearly Contribution: <span className="text-rose-600">{formatCurrency(yearlyContribution)}</span>
              </label>
              <input
                type="range"
                min="250"
                max="150000"
                step="250"
                value={yearlyContribution}
                onChange={(e) => setYearlyContribution(Number(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-rose-300 to-rose-500 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <input
                type="text"
                value={formatNumberWithCommas(yearlyContribution)}
                onChange={(e) => setYearlyContribution(Number(e.target.value.replace(/,/g, '')))}
                className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-rose-500 focus:border-rose-500"
              />
            </div>

            {/* Girl Child Age */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Girl Child's Age: <span className="text-teal-600">{girlAge} Years</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={girlAge}
                onChange={(e) => setGirlAge(Number(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1 Year</span>
                <span>10 Years</span>
              </div>
            </div>

            {/* Fixed Government Rate Display */}
            <div className="p-4 bg-rose-50 rounded-xl border border-rose-100 flex justify-between items-center">
              <span className="font-semibold text-rose-800">Current SSY Interest Rate</span>
              <span className="font-bold text-xl text-rose-600">8.2% p.a.</span>
            </div>
          </div>

          {/* Outputs */}
          <div className="p-6 bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-bold mb-4">Maturity Value Estimator</h3>
            <div className="text-5xl font-extrabold mb-6 text-yellow-300 drop-shadow-md">
              {formatCurrency(calculations.maturityAmount)}
            </div>
            <p className="text-lg text-rose-100 mb-8">Estimated Amount in Year {calculations.maturityYear}</p>

            <div className="w-full space-y-4 text-base">
              <div className="flex justify-between items-center bg-rose-700/30 p-3 rounded-lg">
                <span className="font-medium flex items-center gap-2"><IndianRupee className="w-4 h-4" /> Total Principal Invested</span>
                <span className="font-bold">{formatCurrency(calculations.totalInvested)}</span>
              </div>
              <div className="flex justify-between items-center bg-rose-700/30 p-3 rounded-lg">
                <span className="font-medium flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Total Interest Earned</span>
                <span className="font-bold">{formatCurrency(calculations.interestEarned)}</span>
              </div>
              <div className="flex justify-between items-center bg-rose-700/30 p-3 rounded-lg">
                <span className="font-medium flex items-center gap-2"><Clock className="w-4 h-4" /> Scheme Maturity Period</span>
                <span className="font-bold">21 Years (Pays for 15)</span>
              </div>
            </div>

            {/* Premium Interactive Doughnut Chart */}
            <div className="w-48 h-48 mt-8 bg-white/10 p-4 rounded-3xl border border-white/20 flex items-center justify-center">
              <Doughnut
                data={{
                  labels: ['Principal Invested', 'Interest Accumulated'],
                  datasets: [
                    {
                      data: [calculations.totalInvested, calculations.interestEarned],
                      backgroundColor: ['#FFFFFF', '#FCD34D'],
                      borderWidth: 0,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return ` ${context.label}: ${formatCurrency(context.raw as number)}`;
                        }
                      }
                    }
                  },
                  maintainAspectRatio: false,
                }}
              />
            </div>

          </div>
        </div>

        {/* INFO SECTION */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg mt-6 space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-6 h-6 mr-3 text-yellow-500" /> Understanding Sukanya Samriddhi Yojana
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              SSY is currently one of the highest-earning fixed-income saving instruments in India. Backed by the Central Government, it provides a safe, sovereign-guaranteed investment option. Parents can open an account for up to two girl children (three in case of triplets/twins first) before the child turns 10. To read a detailed guide on registration, rules, and withdrawal procedures, check out our comprehensive <a href="/blogs/Sukanya-Samriddhi-Yojana-Guide" className="text-rose-600 font-bold hover:underline">Sukanya Samriddhi Yojana Guide</a>.
            </p>
          </section>
          
          {/* FAQ dropdown list */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Info className="w-6 h-6 mr-3 text-blue-500" /> Frequently Asked Questions (FAQs)
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <button
                    className="flex justify-between items-center w-full py-2 text-left font-semibold text-lg text-gray-800 hover:text-rose-600"
                    onClick={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <span>{openFAQIndex === index ? '−' : '+'}</span>
                  </button>
                  {openFAQIndex === index && (
                    <p className="mt-2 text-gray-600 text-base leading-relaxed pl-4 border-l-2 border-rose-500">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
