import React from "react";

const HeroSection = () => (
  <section className="bg-gradient-to-br from-white to-blue-50 py-10 px-4 md:px-12 text-center shadow rounded-b-lg">
    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Personal Loan - Compare & Apply Instant Personal Loan Online</h1>
    <div className="text-lg md:text-xl font-medium mb-2 text-gray-700">Get a personal loan of up to Rs 5 Cr. with interest rates starting at 9.99% p.a.</div>
    <div className="mb-4 text-gray-600">Explore pre-approved offers from our partner lenders, featuring end-to-end digital processing and instant disbursals</div>
    <div className="flex items-center justify-center gap-2 mb-2">
      <span className="inline-flex items-center bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-semibold">
        <svg className="w-5 h-5 mr-1 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7c0 6 8 10 8 10z" /></svg>
        We are India's Most Trusted Platform
      </span>
    </div>
    <div className="text-xs text-gray-400">Last updated: {new Date().toLocaleDateString()}</div>
  </section>
);

export default HeroSection;
