import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { gsap } from 'gsap';
import Particles from 'react-tsparticles';

interface HeroSectionProps {
  openApplyModal?: (loanType?: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ openApplyModal }) => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    AOS.init({ once: true, duration: 1000 });
    if (headlineRef.current) {
      gsap.from(headlineRef.current, { opacity: 0, y: 40, duration: 1, ease: 'power3.out' });
    }
  }, []);
  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-tr from-[#1E40AF] to-[#3B82F6] text-white overflow-hidden">
      {/* Animated background with particles.js */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-60">
        <Particles
          options={{
            background: { color: { value: 'transparent' } },
            particles: {
              number: { value: 60 },
              color: { value: '#fff' },
              shape: { type: 'circle' },
              opacity: { value: 0.2 },
              size: { value: 3 },
              move: { enable: true, speed: 1, direction: 'none', outModes: { default: 'out' } },
              links: { enable: true, color: '#fff', opacity: 0.1 }
            },
            fullScreen: { enable: false },
          }}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-6 py-16">
        <h1 ref={headlineRef} className="text-4xl md:text-5xl lg:text-6xl font-bold text-center drop-shadow-lg" data-aos="fade-up">
          Grow Your Wealth with Smart Mutual Fund Investments
        </h1>
        <p className="text-xl md:text-2xl font-medium text-center max-w-2xl" data-aos="fade-up" data-aos-delay="200">
          Start your investment journey with India's most trusted mutual fund platform. Invest in 2000+ funds with zero commission.
        </p>
        <div className="flex flex-col md:flex-row gap-3 items-center mt-4" data-aos="fade-up" data-aos-delay="400">
          <span className="bg-white/20 rounded-full px-5 py-2 text-lg font-semibold border border-white/30">₹10,000 Cr+ Assets Under Management</span>
          <span className="bg-white/20 rounded-full px-5 py-2 text-lg font-semibold border border-white/30">5 Lakh+ Happy Investors</span>
          <span className="bg-white/20 rounded-full px-5 py-2 text-lg font-semibold border border-white/30">2000+ Mutual Funds</span>
          <span className="bg-white/20 rounded-full px-5 py-2 text-lg font-semibold border border-white/30">0% Commission</span>
        </div>
        <div className="flex gap-4 mt-6" data-aos="fade-up" data-aos-delay="600">
          <button
            className="bg-gradient-to-r from-[#059669] to-[#10B981] text-white font-poppins text-lg px-8 py-3 rounded-xl font-bold shadow-lg transform transition hover:scale-105 hover:shadow-2xl animate-pulse"
            onClick={() => openApplyModal && openApplyModal('Mutual Fund')}
          >
            Start Investing
          </button>
          <button
            className="bg-white text-[#1E40AF] font-poppins text-lg px-8 py-3 rounded-xl font-bold shadow-lg border-2 border-[#1E40AF] hover:bg-blue-50 hover:scale-105 transition"
            onClick={() => openApplyModal && openApplyModal('Mutual Fund - Explore')}
          >
            Explore Funds
          </button>
        </div>
        {/* Hero Illustration Placeholder */}
        <div className="mt-8 w-full flex justify-center" data-aos="fade-up" data-aos-delay="800">
          {/* TODO: Add modern investment illustration here */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
