import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const steps = [
  {
    number: 1,
    title: 'Complete KYC',
    desc: 'Quick online verification in minutes',
    icon: '📝',
    color: 'from-blue-100 to-blue-200',
  },
  {
    number: 2,
    title: 'Choose Funds',
    desc: 'Browse and select from 2000+ mutual funds',
    icon: '📑',
    color: 'from-green-100 to-green-200',
  },
  {
    number: 3,
    title: 'Start Investing',
    desc: 'Begin with as low as ₹500',
    icon: '🚀',
    color: 'from-yellow-100 to-yellow-200',
  },
];

const HowItWorks: React.FC = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);
  return (
    <section className="w-full bg-[#F0F9FF] py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-900" data-aos="fade-up">Start Investing in 3 Simple Steps</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {steps.map((step, idx) => (
            <React.Fragment key={step.number}>
              <div
                className="flex flex-col items-center gap-2"
                data-aos="zoom-in"
                data-aos-delay={idx * 200}
              >
                <div className={`w-16 h-16 bg-gradient-to-tr ${step.color} rounded-full flex items-center justify-center text-2xl font-bold text-blue-700`}>{step.icon}</div>
                <span className="font-bold text-blue-800">{step.title}</span>
                <span className="text-gray-600 text-center">{step.desc}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden md:block w-16 h-1 bg-blue-200 rounded-full" data-aos="fade-right" data-aos-delay={idx * 200 + 100}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
