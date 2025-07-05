import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const resources = [
  { title: 'Mutual Fund Basics for Beginners', desc: 'Understand the fundamentals of mutual funds and how they work.', icon: '📘', color: 'from-blue-100 to-blue-200' },
  { title: 'SIP vs Lump Sum: What\'s Better?', desc: 'Compare investment strategies for your goals.', icon: '⚖️', color: 'from-green-100 to-green-200' },
  { title: 'Tax-Saving Mutual Funds Guide', desc: 'Maximize your tax savings with ELSS funds.', icon: '💡', color: 'from-yellow-100 to-yellow-200' },
  { title: 'Market Analysis & Trends', desc: 'Stay updated with the latest market insights.', icon: '📈', color: 'from-purple-100 to-purple-200' },
  { title: 'Goal-Based Investment Planning', desc: 'Plan your investments for every life goal.', icon: '🎯', color: 'from-pink-100 to-pink-200' },
  { title: 'Risk Management Strategies', desc: 'Learn to manage and mitigate investment risks.', icon: '🛡️', color: 'from-gray-100 to-gray-200' },
];

const EducationalResources: React.FC = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);
  return (
    <section className="w-full bg-[#F0F9FF] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-900" data-aos="fade-up">Learn & Grow with Expert Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((res, idx) => (
            <div
              key={res.title}
              className={`bg-white/80 rounded-2xl shadow-xl p-6 flex flex-col gap-4 glassmorphism hover:scale-105 hover:shadow-2xl transition-transform duration-300`}
              data-aos="flip-up"
              data-aos-delay={idx * 100}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 bg-gradient-to-tr ${res.color}`}>{res.icon}</div>
              <span className="font-bold text-lg text-blue-800">{res.title}</span>
              <span className="text-gray-600">{res.desc}</span>
              <button className="bg-blue-700 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-800 transition">Read More</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationalResources;
