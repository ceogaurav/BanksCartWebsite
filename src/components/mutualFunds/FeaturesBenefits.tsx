import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const features = [
  { title: 'Zero Commission', desc: 'No hidden charges, 100% transparent pricing', icon: '💰', color: 'from-blue-100 to-blue-200' },
  { title: 'Expert Research', desc: 'AI-powered fund recommendations', icon: '🤖', color: 'from-green-100 to-green-200' },
  { title: 'Easy Portfolio Management', desc: 'Track all investments in one place', icon: '📊', color: 'from-purple-100 to-purple-200' },
  { title: 'Tax Optimization', desc: 'Automatic tax-loss harvesting', icon: '🧾', color: 'from-yellow-100 to-yellow-200' },
  { title: '24/7 Support', desc: 'Expert guidance whenever you need', icon: '🕑', color: 'from-pink-100 to-pink-200' },
  { title: 'Secure Transactions', desc: 'Bank-grade security for your investments', icon: '🔒', color: 'from-gray-100 to-gray-200' },
];

const FeaturesBenefits: React.FC = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-900" data-aos="fade-up">Why Choose BanksCart for Mutual Funds?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className={`bg-white/80 rounded-2xl shadow-xl p-6 flex flex-col gap-4 glassmorphism hover:scale-105 hover:shadow-2xl transition-transform duration-300`}
              data-aos="flip-left"
              data-aos-delay={idx * 100}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 bg-gradient-to-tr ${feature.color}`}>{feature.icon}</div>
              <span className="font-bold text-lg text-blue-800">{feature.title}</span>
              <span className="text-gray-600">{feature.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBenefits;
