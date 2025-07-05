import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const tools = [
  { name: 'SIP Calculator', desc: 'Plan your monthly investments', color: 'from-blue-100 to-blue-200', icon: '📈' },
  { name: 'Goal Calculator', desc: 'Calculate funds needed for your dreams', color: 'from-green-100 to-green-200', icon: '🎯' },
  { name: 'Tax Calculator', desc: 'Optimize your tax savings', color: 'from-yellow-100 to-yellow-200', icon: '💸' },
  { name: 'Portfolio Analyzer', desc: 'Track and analyze your investments', color: 'from-purple-100 to-purple-200', icon: '📊' },
  { name: 'Risk Profiler', desc: 'Discover your risk tolerance', color: 'from-pink-100 to-pink-200', icon: '🧩' },
  { name: 'Retirement Planner', desc: 'Plan for your golden years', color: 'from-gray-100 to-gray-200', icon: '👴' },
];

const InvestmentTools: React.FC = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);
  return (
    <section className="w-full bg-[#F0F9FF] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-900" data-aos="fade-up">Smart Investment Tools & Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, idx) => (
            <div
              key={tool.name}
              className={`bg-white/80 rounded-2xl shadow-xl p-6 flex flex-col gap-4 glassmorphism hover:scale-105 hover:shadow-2xl transition-transform duration-300`}
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 bg-gradient-to-tr ${tool.color}`}>{tool.icon}</div>
              <span className="font-bold text-lg text-blue-800">{tool.name}</span>
              <span className="text-gray-600">{tool.desc}</span>
              <button className="bg-blue-700 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-800 transition">Try Now</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentTools;
