import React from 'react';

const features = [
  { label: 'Interest Rates', bankscart: '7.75% p.a. ✓', banks: '6.50% p.a.', nbfc: '7.00% p.a.' },
  { label: 'Digital Process', bankscart: '100% Online ✓', banks: 'Branch Required', nbfc: 'Partial Online' },
  { label: 'Minimum Amount', bankscart: '₹10,000 ✓', banks: '₹25,000', nbfc: '₹50,000' },
  { label: 'Loan Against FD', bankscart: 'Up to 90% ✓', banks: 'Up to 75%', nbfc: 'Up to 80%' },
  { label: 'Premature Withdrawal', bankscart: 'Low Penalty ✓', banks: 'High Penalty', nbfc: 'Medium Penalty' },
  { label: 'Customer Support', bankscart: '24/7 Online ✓', banks: 'Branch Hours', nbfc: 'Limited Hours' },
];

const ComparisonSection: React.FC = () => (
  <section id="fd-comparison" className="w-full bg-white py-16 px-2 md:px-0 flex flex-col items-center">
    <div className="max-w-5xl w-full flex flex-col gap-8 animate-fadeInUp">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1E40AF] mb-2 font-inter">See How We Stack Up Against Others</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-lg font-poppins rounded-xl overflow-hidden shadow-md">
          <thead>
            <tr className="bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white">
              <th className="px-6 py-3 text-left">Feature</th>
              <th className="px-6 py-3 text-left">BanksCart</th>
              <th className="px-6 py-3 text-left">Traditional Banks</th>
              <th className="px-6 py-3 text-left">Other NBFCs</th>
            </tr>
          </thead>
          <tbody>
            {features.map((row, i) => (
              <tr key={row.label} className="hover:bg-blue-50 transition-all">
                <td className="px-6 py-4 font-semibold">{row.label}</td>
                <td className="px-6 py-4 font-bold text-[#059669] text-xl animate-bounce">{row.bankscart}</td>
                <td className="px-6 py-4">{row.banks}</td>
                <td className="px-6 py-4">{row.nbfc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-8">
        <button className="bg-gradient-to-r from-[#059669] to-[#10B981] text-white font-poppins text-lg px-8 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition">Choose the Best Option</button>
      </div>
    </div>
  </section>
);

export default ComparisonSection;
