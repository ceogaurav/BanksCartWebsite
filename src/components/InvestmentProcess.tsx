import React from 'react';

const steps = [
  {
    title: 'Choose Your Plan',
    desc: 'Select amount and tenure. Pick interest payout option. Compare different rates.',
    icon: '📝',
    time: '30 seconds',
    animation: 'selection',
  },
  {
    title: 'Complete KYC',
    desc: 'Upload documents online. Instant verification. Digital signature.',
    icon: '📄',
    time: '2 minutes',
    animation: 'kyc',
  },
  {
    title: 'Fund & Activate',
    desc: 'Transfer funds securely. Get FD receipt instantly. Start earning immediately.',
    icon: '💸',
    time: 'Instant',
    animation: 'fund',
  },
];

const InvestmentProcess: React.FC = () => {
  return (
    <section id="fd-process" className="w-full bg-[#F0F9FF] py-16 px-2 md:px-0 flex flex-col items-center">
      <div className="max-w-5xl w-full flex flex-col gap-8 animate-fadeInUp">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E40AF] mb-2 font-inter">Start Investing in Just 3 Simple Steps</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center mt-8">
          {steps.map((step, idx) => (
            <div key={step.title} className="flex flex-col items-center relative w-full md:w-1/3">
              <div className="flex flex-col items-center">
                <div className="text-5xl mb-2 animate-float">{step.icon}</div>
                <div className="text-xl font-bold text-[#1E40AF] font-inter mb-1">{step.title}</div>
                <div className="text-base text-gray-600 text-center mb-2">{step.desc}</div>
                <div className="text-xs text-[#059669] font-semibold bg-white/80 px-3 py-1 rounded-full shadow">{step.time}</div>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full w-24 h-2 bg-gradient-to-r from-[#1E40AF] to-[#10B981] rounded-full animate-progress" />
              )}
            </div>
          ))}
        </div>
        {/* Progress indicator and help tooltips placeholder */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-3 h-3 rounded-full bg-[#059669] animate-pulse"></span> Progress indicator
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-3 h-3 rounded-full bg-[#1E40AF] animate-bounce"></span> Time estimates for each step
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-3 h-3 rounded-full bg-[#D97706] animate-float"></span> Help tooltips
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button className="bg-gradient-to-r from-[#059669] to-[#10B981] text-white font-poppins text-lg px-8 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition">Resume Later</button>
        </div>
      </div>
    </section>
  );
};

export default InvestmentProcess;
