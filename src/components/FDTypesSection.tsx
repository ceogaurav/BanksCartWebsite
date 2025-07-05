import React from 'react';

const fdTypes = [
  {
    title: 'Traditional Fixed Deposit',
    icon: '🏦',
    features: [
      'Guaranteed returns',
      'Flexible tenure options',
      'Premature withdrawal facility',
      'Loan against FD available',
    ],
    cta: 'Open Traditional FD',
    color: 'from-[#1E40AF] to-[#3B82F6]'
  },
  {
    title: 'Tax Saver Fixed Deposit',
    icon: '🛡️',
    features: [
      'Section 80C tax benefits',
      '5-year lock-in period',
      'Higher interest rates',
      'No premature withdrawal',
    ],
    cta: 'Save Tax with FD',
    color: 'from-[#D97706] to-[#F59E0B]'
  },
  {
    title: 'Cumulative Fixed Deposit',
    icon: '📈',
    features: [
      'Quarterly compounding',
      'Maximum wealth creation',
      'Single maturity payout',
      'Reinvestment options',
    ],
    cta: 'Maximize Returns',
    color: 'from-[#059669] to-[#10B981]'
  },
];

const FDTypesSection: React.FC = () => {
  return (
    <section id="fd-types" className="w-full bg-[#F0F9FF] py-16 px-2 md:px-0 flex flex-col items-center">
      <div className="max-w-5xl w-full flex flex-col gap-8 animate-fadeInUp">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E40AF] mb-2 font-inter">Choose Your Perfect Fixed Deposit</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fdTypes.map((type, idx) => (
            <div key={type.title} className={`bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center gap-4 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fadeInUp`}
              style={{ animationDelay: `${idx * 0.1 + 0.2}s` }}>
              <div className={`text-5xl mb-2 animate-float`}>{type.icon}</div>
              <h3 className="text-xl font-bold text-[#1E40AF] font-inter mb-2">{type.title}</h3>
              <ul className="text-gray-700 text-base font-poppins flex flex-col gap-1 mb-4">
                {type.features.map(f => <li key={f}>• {f}</li>)}
              </ul>
              <button className={`bg-gradient-to-r ${type.color} text-white font-poppins px-6 py-2 rounded-xl font-bold shadow-lg hover:scale-105 transition`}>{type.cta}</button>
            </div>
          ))}
        </div>
        {/* Special Highlight Box: Digital FD */}
        <div className="mt-10 flex flex-col items-center">
          <div className="bg-gradient-to-r from-[#3B82F6] to-[#059669] text-white px-8 py-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-6 animate-fadeInUp">
            <div className="text-3xl md:text-4xl font-bold font-poppins">Digital FD</div>
            <ul className="text-lg font-poppins flex flex-col gap-1">
              <li>100% paperless process</li>
              <li>Instant account opening</li>
              <li>Higher interest rates</li>
              <li>24/7 online management</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FDTypesSection;
