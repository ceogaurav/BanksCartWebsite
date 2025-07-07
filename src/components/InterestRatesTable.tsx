import React, { useState } from 'react';
import ApplyButton from './common/ApplyButton';

const rateTable = [
  {
    category: 'Short Term (7 days - 1 year)',
    rates: [
      { label: '7-91 days', rate: 4.5 },
      { label: '92 days - 6 months', rate: 5.75 },
      { label: '6 months - 1 year', rate: 6.25 },
    ],
  },
  {
    category: 'Medium Term (1-3 years)',
    rates: [
      { label: '1-2 years', rate: 7.0 },
      { label: '2-3 years', rate: 7.25 },
    ],
  },
  {
    category: 'Long Term (3+ years)',
    rates: [
      { label: '3-5 years', rate: 7.5 },
      { label: '5-10 years', rate: 7.75 },
    ],
  },
];

const specialCategories = [
  { label: 'Senior Citizens', desc: 'Additional 0.50% on all rates', color: 'bg-yellow-100 text-yellow-800' },
  { label: 'Digital FD', desc: 'Extra 0.25% for online bookings', color: 'bg-blue-100 text-blue-800' },
  { label: 'High Value (₹1 Cr+)', desc: 'Negotiable rates up to 8.00%', color: 'bg-green-100 text-green-800' },
];

interface InterestRatesTableProps {
  openApplyModal?: (loanType?: string) => void;
}

const InterestRatesTable: React.FC<InterestRatesTableProps> = ({ openApplyModal }) => {
  const [activeCat, setActiveCat] = useState(0);

  return (
    <section id="fd-rates" className="w-full bg-white py-16 px-2 md:px-0 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-[#F0F9FF] rounded-3xl shadow-xl p-8 md:p-12 flex flex-col gap-8 animate-fadeInUp">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E40AF] mb-2 font-inter">Competitive Interest Rates Across All Tenures</h2>
        </div>
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {rateTable.map((cat, idx) => (
            <button
              key={cat.category}
              className={`px-6 py-2 rounded-full font-poppins font-bold border-2 transition-all text-lg ${activeCat === idx ? 'bg-gradient-to-r from-[#059669] to-[#10B981] text-white border-[#10B981] scale-105 shadow-lg' : 'bg-white text-[#1E40AF] border-[#1E40AF] hover:bg-blue-50'}`}
              onClick={() => setActiveCat(idx)}
            >
              {cat.category}
            </button>
          ))}
        </div>
        {/* Rate Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-lg font-poppins rounded-xl overflow-hidden shadow-md">
            <thead>
              <tr className="bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white">
                <th className="px-6 py-3 text-left">Tenure</th>
                <th className="px-6 py-3 text-left">Interest Rate</th>
              </tr>
            </thead>
            <tbody>
              {rateTable[activeCat].rates.map((row, i) => (
                <tr key={row.label} className="hover:bg-blue-50 transition-all">
                  <td className="px-6 py-4 font-semibold">{row.label}</td>
                  <td className="px-6 py-4 font-bold text-[#059669] text-xl animate-count">{row.rate}% p.a.</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Special Categories */}
        <div className="flex flex-wrap gap-4 mt-6 justify-center">
          {specialCategories.map((cat) => (
            <div key={cat.label} className={`px-5 py-3 rounded-xl font-poppins font-semibold shadow-md ${cat.color} flex flex-col items-center animate-fadeIn`}>
              <span className="text-lg">{cat.label}</span>
              <span className="text-sm font-normal">{cat.desc}</span>
            </div>
          ))}
        </div>
        {/* Placeholder for comparison slider, best rate highlighter, historical trends */}
        <div className="mt-8 w-full flex flex-col items-center">
          <div className="w-full bg-gradient-to-r from-[#F0F9FF] to-[#D1FAE5] rounded-2xl flex flex-col items-center justify-center text-gray-400 font-poppins p-6 gap-4">
            <h4 className="text-lg font-bold text-gray-700">Ready to lock in these rates?</h4>
            {openApplyModal && (
              <ApplyButton
                loanType="Fixed Deposit"
                openApplyModal={openApplyModal}
                className="bg-gradient-to-r from-[#059669] to-[#10B981] text-white font-poppins text-lg px-8 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition"
              >
                Invest Now
              </ApplyButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterestRatesTable;
