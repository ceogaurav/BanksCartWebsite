import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { gsap } from 'gsap';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);
  return (
    <footer className="w-full bg-[#1E40AF] text-white py-10 mt-8">
      <div ref={footerRef} className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8" data-aos="fade-up">
        <div>
          <span className="text-2xl font-extrabold tracking-tight">BanksCart</span>
          <p className="mt-2 text-sm">Empowering your financial future.</p>
          <p className="mt-2 text-xs">Contact: support@bankscart.com</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Mutual Funds</a></li>
            <li><a href="#" className="hover:underline">Tools & Calculators</a></li>
            <li><a href="#" className="hover:underline">Support</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Investment Categories</h4>
          <ul className="space-y-1 text-sm">
            <li>Equity Funds</li>
            <li>Debt Funds</li>
            <li>Hybrid Funds</li>
            <li>Tax Saving Funds</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Newsletter</h4>
          <form className="flex flex-col gap-2">
            <input type="email" placeholder="Your email" className="px-3 py-2 rounded text-black" />
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Subscribe</button>
          </form>
          <div className="flex gap-3 mt-4">
            <a href="#" className="hover:text-green-400 transition">FB</a>
            <a href="#" className="hover:text-green-400 transition">TW</a>
            <a href="#" className="hover:text-green-400 transition">IN</a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-blue-100">
        © {new Date().getFullYear()} BanksCart. All rights reserved. Mutual fund investments are subject to market risks. Read all scheme related documents carefully.
      </div>
    </footer>
  );
};

export default Footer;
