import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, PiggyBank, Heart, Star, Award, ShieldCheck, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ARTICLE_TITLE = "Sukanya Samriddhi Yojana (SSY) 2026: Complete Rules, Benefits, and Calculator Guide";
const ARTICLE_SUBTITLE = "The ultimate handbook on the Government's premier scheme for the girl child: Unraveling the 8.2% interest rate, Triple Tax Exemption (EEE), and withdrawal hacks.";
const BACK_LINK = "/blogs";

export default function SukanyaSamriddhiYojanaGuide() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white to-rose-50 py-12 px-4 md:px-12 font-inter pt-24"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto">
        <Link to={BACK_LINK} className="inline-flex items-center text-rose-600 hover:text-rose-800 font-semibold mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Banking Guides
        </Link>

        <header className="mb-10 pb-6 border-b border-rose-200">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-700">
            {ARTICLE_TITLE}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed italic">
            {ARTICLE_SUBTITLE}
          </p>
        </header>

        <article className="text-gray-800 leading-relaxed space-y-8 text-lg">
          <p className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-600 font-medium">
            Building a secure financial foundation for your daughter's future requires smart planning and high-yielding saving instruments. The <strong>Sukanya Samriddhi Yojana (SSY)</strong> stands out as one of the best government-backed savings options in India, offering unmatched tax benefits, high interest rates, and sovereign safety.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 flex items-center">
            <Heart className="w-6 h-6 mr-3 text-rose-500" /> What is the Sukanya Samriddhi Yojana?
          </h2>
          <p>
            Launched as part of the 'Beti Bachao Beti Padhao' campaign, the SSY scheme encourages parents to save for their daughter's future milestones. By offering a high interest rate currently fixed at <strong>8.2% per annum</strong>, it beats almost every conventional fixed deposit or recurring deposit plan.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 flex items-center">
            <Award className="w-6 h-6 mr-3 text-rose-500" /> Key Features of SSY 2026
          </h2>
          <ul className="list-disc ml-6 space-y-3">
            <li><strong>Age Criteria:</strong> The account can be opened in the name of a girl child from her birth until she reaches the age of 10.</li>
            <li><strong>Deposit Limits:</strong> Minimum deposit required is just ₹250 per year, and the maximum limit is ₹1.5 Lakhs per financial year.</li>
            <li><strong>Payment Period:</strong> Parents are only required to make deposits for the first 15 years, while the account continues to earn interest until maturity at 21 years.</li>
            <li><strong>Sovereign Guarantee:</strong> Being backed by the Government of India, there is absolutely zero risk of loss.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 flex items-center">
            <ShieldCheck className="w-6 h-6 mr-3 text-rose-500" /> EEE Tax Exemption: Keep 100% of Your Returns
          </h2>
          <p>
            SSY enjoys the highly coveted <strong>EEE (Exempt-Exempt-Exempt)</strong> tax category:
          </p>
          <ul className="list-decimal ml-6 space-y-2">
            <li><strong>Exempt on Investment:</strong> Deposits qualify for deductions up to ₹1.5 Lakh per year under Section 80C.</li>
            <li><strong>Exempt on Interest:</strong> The interest accrued every year is fully tax-free.</li>
            <li><strong>Exempt on Maturity:</strong> The final withdrawal amount at maturity is entirely exempt from income tax.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 flex items-center">
            <HelpCircle className="w-6 h-6 mr-3 text-rose-500" /> Rules for Withdrawal and Premature Closure
          </h2>
          <p>
            The scheme mandates a lock-in period of 21 years to ensure compound interest achieves maximum potential. However, partial withdrawals up to 50% are permitted once the girl child turns 18 for her higher education expenses. Premature closure is also allowed in specific circumstances such as the marriage of the girl child (after turning 18) or compassionate medical grounds.
          </p>

          <div className="p-6 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl shadow-lg text-center mt-12">
            <h3 className="text-2xl font-bold mb-3">Estimate Your daughter's SSY Maturity Fund</h3>
            <p className="mb-6 opacity-90">Calculate how a regular yearly saving of ₹50,000 can compound into a massive tax-free fund for her higher studies.</p>
            <Link to="/ssy-calculator" className="bg-white text-rose-600 px-8 py-3 rounded-full font-bold inline-block hover:bg-gray-100 transition-colors">
              Launch SSY Calculator
            </Link>
          </div>
        </article>
      </div>
    </motion.div>
  );
}
