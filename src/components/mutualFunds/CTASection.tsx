import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { gsap } from 'gsap';

interface CTASectionProps {
  openApplyModal?: (loanType?: string) => void;
}

const CTASection: React.FC<CTASectionProps> = ({ openApplyModal }) => {
  const ctaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);
  return (
    <section className="w-full bg-gradient-to-tr from-[#1E40AF] via-[#059669] to-[#D97706] py-16 text-white">
      <div ref={ctaRef} className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-6" data-aos="zoom-in">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Ready to Start Your Investment Journey?</h2>
        <p className="text-xl text-center">Join millions of investors building wealth with BanksCart</p>
        <ul className="list-disc text-lg pl-6 text-left">
          <li>Zero commission on all mutual funds</li>
          <li>Expert-curated fund recommendations</li>
          <li>Real-time portfolio tracking</li>
        </ul>
        <button
          className="mt-6 bg-white text-[#1E40AF] font-poppins text-lg px-8 py-3 rounded-xl font-bold shadow-lg border-2 border-white hover:bg-blue-50 hover:scale-105 transition"
          onClick={() => openApplyModal && openApplyModal('Mutual Fund - Final CTA')}
        >
          Start Investing Today
        </button>
      </div>
    </section>
  );
};

export default CTASection;
