import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loanTypes } from '../data/loanTypes';

const LoanRates: React.FC = () => {
  // Always default to 'personal' and ensure tab works
  const [selectedLoanType, setSelectedLoanType] = useState('personal');

  // Only show personal loan sections if selectedLoanType is 'personal'
  const showPersonalLoanSections = selectedLoanType === 'personal';

  const personalLoanSections = (
    <AnimatePresence>
      <motion.div
        key="personal-loan-extra"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.5 }}
        className="space-y-8 mt-10"
      >
        {/* 1. Animated Interest Rate Table */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h2 className="text-2xl font-bold mb-4 text-primary-700">Current Interest Rate on Personal Loans</h2>
          <div className="overflow-x-auto">
            <motion.table className="min-w-full bg-white rounded-lg shadow-md" initial="hidden" animate="visible">
              <thead>
                <tr className="bg-primary-100">
                  <th className="px-4 py-2 text-left">Bank</th>
                  <th className="px-4 py-2 text-left">Interest Rate (p.a.)</th>
                  <th className="px-4 py-2 text-left">Processing Fee</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { bank: 'HSBC Bank', rate: '10.15% - 16.00%', fee: 'Up to 2%' },
                  { bank: 'HDFC Bank', rate: '10.90% - 24.00%', fee: 'Rs.6,500 + GST' },
                  { bank: 'IndusInd Bank', rate: '10.49% onwards', fee: 'Up to 3.5% onwards' },
                  { bank: 'ICICI Bank', rate: '10.85% - 16.65%', fee: 'Up to 2%' },
                  { bank: 'Yes Bank', rate: '11.25% - 21%', fee: 'Up to 2.5%' },
                  { bank: 'Kotak Mahindra Bank', rate: '10.99% and above', fee: 'Up to 5%' },
                  { bank: 'Axis Bank', rate: '11.25% - 22%', fee: 'Up to 2%' },
                  { bank: 'SBI', rate: '10.30% - 15.30%', fee: 'Up to 1.50%' },
                  { bank: 'IDFC First Bank', rate: '10.70% onwards', fee: 'Up to 2%' },
                  { bank: 'Tata Capital', rate: '11.99% - 29.99%', fee: 'Up to 4%' },
                  { bank: 'Home Credit', rate: '19.2% onwards', fee: 'Up to 5%' },
                  { bank: 'Aditya Birla Capital', rate: '19.45% - 20.45%', fee: 'Up to 4%' },
                  { bank: 'Karnataka Bank', rate: '12% onwards', fee: 'At discretion' },
                  { bank: 'Bank of Baroda', rate: '11.40% - 18.30%', fee: 'Up to 2%' },
                  { bank: 'Federal Bank', rate: '11.49% - 14.49%', fee: 'Up to 2%' },
                  { bank: 'IIFL', rate: '12.75% - 44%', fee: '2% - 9% + GST' },
                  { bank: 'Bank of India', rate: '12.20% onwards', fee: '1% of loan amount' },
                  { bank: 'IDBI Bank', rate: '11% - 15.50%', fee: '1%' },
                  { bank: 'Karur Vysya Bank', rate: '11.15% - 14.15%', fee: '3% onwards' },
                  { bank: 'South Indian Bank', rate: '10.50% - 22.31%', fee: '1% (above 25L)' },
                  { bank: 'Indian Overseas Bank', rate: '10.50% - 13.90%', fee: 'Up to 0.50%' },
                  { bank: 'RBL Bank', rate: '18%', fee: 'Up to 2%' },
                  { bank: 'PNB', rate: '12.00% - 17.55%', fee: '0.35%' },
                  { bank: 'Bank of Maharashtra', rate: '9.50%', fee: 'Up to 1%' },
                  { bank: 'Central Bank of India', rate: '11.65% - 12.40%', fee: 'Up to 1%' },
                  { bank: 'City Union Bank', rate: '11% - 14.95%', fee: '1.25% (min Rs.750)' },
                ].map((row, i) => (
                  <motion.tr
                    key={row.bank}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.03 }}
                    className={i % 2 === 0 ? 'bg-gray-50' : ''}
                  >
                    <td className="px-4 py-2 font-semibold">{row.bank}</td>
                    <td className="px-4 py-2">{row.rate}</td>
                    <td className="px-4 py-2">{row.fee}</td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </div>
          <p className="text-xs text-gray-500 mt-2">* GST extra on processing fee</p>
        </motion.section>

        {/* 2. Tips to Get the Lowest Interest Rate */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h2 className="text-xl font-bold mb-2 text-primary-700">How to Get the Lowest Interest Rate on a Personal Loan?</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              'Improve Your Credit Score',
              'Avoid Missing Repayments',
              'Keep an Eye Out for Offers',
              'Compare Interest Rates',
              'Negotiate with the Lender',
            ].map((tip, i) => (
              <motion.li
                key={tip}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded shadow"
              >
                {tip}
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* 3. Credit Score Table */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <h2 className="text-xl font-bold mb-2 text-primary-700">Credit Score & Impact</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-primary-100">
                  <th className="px-4 py-2">Credit Score</th>
                  <th className="px-4 py-2">Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-red-50">
                  <td className="px-4 py-2">Poor (&lt;600)</td>
                  <td className="px-4 py-2">You may not qualify for a personal loan</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="px-4 py-2">Average (600-750)</td>
                  <td className="px-4 py-2">Loan may be approved, but at a high interest rate</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-4 py-2">Good (&gt;750)</td>
                  <td className="px-4 py-2">Loan is likely to be approved with a lower interest rate</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-4 py-2">Excellent (800-900)</td>
                  <td className="px-4 py-2">Loan with a low interest rate, faster approval, larger loan amount</td>
                </tr>
              </tbody>
            </table>
          </div>
          <a href="https://www.bankbazaar.com/credit-score.html" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-primary-600 underline">Check Free Credit Score Now</a>
        </motion.section>

        {/* 4. Factors Affecting Interest Rates */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <h2 className="text-xl font-bold mb-2 text-primary-700">Factors that Affect Personal Loan Interest Rates</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Income</li>
            <li>Employer Details</li>
            <li>Nature of Employment</li>
            <li>Age</li>
            <li>Relationship with the Loan Provider</li>
          </ul>
        </motion.section>

        {/* 5. Fixed vs Floating Interest Rate Comparison */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <h2 className="text-xl font-bold mb-2 text-primary-700">Fixed vs Floating Interest Rates</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-primary-100">
                  <th className="px-4 py-2">Fixed</th>
                  <th className="px-4 py-2">Floating</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">Interest rates remain constant</td>
                  <td className="px-4 py-2">Interest rate can change depending on the market</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">EMI remains the same</td>
                  <td className="px-4 py-2">EMI may change</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Prepayment charge likely</td>
                  <td className="px-4 py-2">Prepayment charge may not apply</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Not linked to MCLR</td>
                  <td className="px-4 py-2">Linked to MCLR</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* 6. Reducing Interest Rate Explanation */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <h2 className="text-xl font-bold mb-2 text-primary-700">Reducing Interest Rate in Personal Loans Explained</h2>
          <p className="mb-2">In a reducing balance rate structure, interest is calculated only on the outstanding loan amount. As you repay, the interest for the remaining tenure is calculated on the reduced balance, saving you money over time.</p>
        </motion.section>

        {/* 7. EMI Calculation Formula & Example */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <h2 className="text-xl font-bold mb-2 text-primary-700">How to Calculate EMI on Your Personal Loan?</h2>
          <div className="bg-primary-50 p-4 rounded mb-2">
            <span className="font-semibold">EMI Formula: </span>
            <span>EMI = [P × R × (1+R)<sup>N</sup>] / [(1+R)<sup>N</sup> - 1]</span>
          </div>
          <p className="mb-2">Where P = loan amount, R = interest rate per month, N = number of monthly installments.</p>
          <div className="bg-gray-50 p-4 rounded">
            <span className="font-semibold">Example:</span> For a loan of ₹10 lakh at 14% p.a. for 36 months, EMI = ₹34,178/month. Total interest = ₹2,30,395. Total payable = ₹12,30,395.
          </div>
          <a href="https://www.bankbazaar.com/personal-loan/emi-calculator.html" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-primary-600 underline">Personal Loan EMI Calculator</a>
        </motion.section>

        {/* 8. Additional Charges */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          <h2 className="text-xl font-bold mb-2 text-primary-700">Additional Charges You Should Know</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Processing charges</li>
            <li>Verification charges</li>
            <li>Government taxes (e.g., GST)</li>
            <li>Late payment fees</li>
            <li>Prepayment/Foreclosure fees</li>
          </ul>
        </motion.section>

        {/* 9. Prepayment Charges Explanation */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
          <h2 className="text-xl font-bold mb-2 text-primary-700">How Lenders Calculate Prepayment Charges</h2>
          <p>Prepayment fee is usually calculated as a percentage of the amount you want to prepay or as a percentage of the principal outstanding at the time of prepayment. Some lenders may charge a fixed fee.</p>
        </motion.section>

        {/* 10. FAQs (Animated Expand/Collapse) */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
          <h2 className="text-xl font-bold mb-2 text-primary-700">FAQs on Personal Loan Interest Rates</h2>
          <FAQSection />
        </motion.section>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Compare Loan Interest Rates
          </h1>
          <p className="text-xl text-gray-600">
            Find the best loan rates from top banks in India
          </p>
        </div>

        {/* Loan Type Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {loanTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedLoanType(String(type.id))}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedLoanType === String(type.id)
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
                disabled={selectedLoanType === String(type.id)}
              >
                <span className="mr-2">{type.icon}</span>
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Show personal loan sections if selected */}
        {showPersonalLoanSections && personalLoanSections}
      </div>
    </div>
  );
};

export default LoanRates;

// FAQSection component
const faqs = [
  {
    q: 'What is the lowest interest rate available on personal loans?',
    a: 'PNB offers personal loans at attractive rates starting from 8.75% p.a. However, the rate may vary depending on your credit profile and relationship with the bank.'
  },
  {
    q: 'How does my income determine my interest rate?',
    a: 'A higher income shows better repayment capacity, so lenders may offer you a lower interest rate.'
  },
  {
    q: 'How does my credit score impact the cost of my loan?',
    a: 'A good credit score (750+) usually means you get preferential rates.'
  },
  {
    q: 'How does my current debt level determine my interest rate?',
    a: 'If you have high existing debt, lenders may charge a higher rate or reject your application.'
  },
  {
    q: 'How can I get a good interest rate?',
    a: 'Maintain a high credit score, negotiate with your lender, and have a good credit profile.'
  },
  {
    q: 'Can I get an interest rate lower than what is advertised by the lender?',
    a: 'Yes, negotiation and a strong profile can help you get a better rate.'
  },
  {
    q: 'Can I get a low rate of interest even if my credit score is bad?',
    a: 'You may get a better rate with a co-applicant or guarantor with good credit.'
  },
  {
    q: 'If I offer collateral, will it help me get a good interest rate?',
    a: 'Yes, collateral reduces your risk and can help you get a lower rate.'
  },
  {
    q: 'Will I get a lower rate of interest if I take a loan from my existing lender?',
    a: 'A good relationship with your bank can help you get better terms.'
  },
  {
    q: 'Should I always choose the lowest available interest rate?',
    a: 'Lowest rate is important, but also check other charges and terms.'
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <motion.div key={faq.q} layout initial={{ borderRadius: 8 }}>
          <button
            className="w-full text-left px-4 py-3 bg-primary-50 rounded-lg font-semibold focus:outline-none flex justify-between items-center"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            {faq.q}
            <span>{openIndex === i ? '-' : '+'}</span>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden px-4 pb-3 text-gray-700"
              >
                {faq.a}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};