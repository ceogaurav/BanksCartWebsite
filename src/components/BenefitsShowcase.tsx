import React from 'react';
import ApplyButton from './common/ApplyButton';

const benefits = [
  {
    title: 'Guaranteed Returns',
    icon: '🛡️',
    text: '100% principal safety with assured interest rates. No market risks.',
    color: 'from-[#059669] to-[#10B981]'
  },
  {
    title: 'Flexible Tenure',
    icon: '📅',
    text: 'Choose from 7 days to 10 years based on your financial goals.',
    color: 'from-[#1E40AF] to-[#3B82F6]'
  },
  {
    title: 'Competitive Rates',
    icon: '📈',
    text: 'Industry-leading interest rates starting from 7.25% p.a.',
    color: 'from-[#D97706] to-[#F59E0B]'
  },
  {
    title: 'Easy Liquidity',
    icon: '💧',
    text: 'Premature withdrawal facility with minimal penalty charges.',
    color: 'from-[#38bdf8] to-[#059669]'
  },
  {
    title: 'Digital First',
    icon: '📱',
    text: 'Open FD instantly online. Manage everything from your phone.',
    color: 'from-[#3B82F6] to-[#1E40AF]'
  },
  {
    title: 'Loan Facility',
    icon: '🤝',
    text: 'Get loan up to 90% of your FD amount at attractive rates.',
    color: 'from-[#D97706] to-[#059669]'
  },
];

interface BenefitsShowcaseProps {
  openApplyModal?: (loanType?: string) => void;
}

const BenefitsShowcase: React.FC<BenefitsShowcaseProps> = ({ openApplyModal }) => {
  return (
    <section id="fd-benefits" className="w-full bg-white py-16 px-2 md:px-0 flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col gap-8 animate-fadeInUp">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E40AF] mb-2 font-inter">Why Choose BanksCart Fixed Deposits?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, idx) => (
            <div key={b.title} className={`bg-gradient-to-r ${b.color} text-white rounded-3xl shadow-xl p-8 flex flex-col items-center gap-4 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fadeInUp`}
              style={{ animationDelay: `${idx * 0.1 + 0.2}s` }}>
              <div className="text-5xl mb-2 animate-float">{b.icon}</div>
              <h3 className="text-xl font-bold font-inter mb-2">{b.title}</h3>
              <p className="text-base font-poppins text-center">{b.text}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          {openApplyModal && (
            <ApplyButton
              loanType="Fixed Deposit"
              openApplyModal={openApplyModal}
              className="bg-gradient-to-r from-[#059669] to-[#10B981] text-white font-poppins text-lg px-8 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition"
            >
              Start Investing Now
            </ApplyButton>
          )}
        </div>
      </div>
    </section>
  );
};

export default BenefitsShowcase;
