import React from 'react';

const TaxBenefitsSection: React.FC = () => (
  <section id="fd-tax-benefits" className="w-full bg-white py-16 px-2 md:px-0 flex flex-col items-center">
    <div className="max-w-5xl w-full flex flex-col gap-8 animate-fadeInUp">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1E40AF] mb-2 font-inter">Tax-Smart Investing Made Easy</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Tax Benefits */}
        <div className="bg-[#F0F9FF] rounded-2xl p-8 shadow flex flex-col gap-3">
          <h3 className="text-xl font-bold text-[#059669] mb-2">Tax Benefits</h3>
          <ul className="text-base text-gray-700 font-poppins flex flex-col gap-2">
            <li>Section 80C deductions up to ₹1.5 Lakhs</li>
            <li>TDS compliance and certificates</li>
            <li>Form 15G/15H for senior citizens</li>
            <li>Automatic tax calculations</li>
          </ul>
        </div>
        {/* Right: Regulatory Compliance */}
        <div className="bg-[#F0F9FF] rounded-2xl p-8 shadow flex flex-col gap-3">
          <h3 className="text-xl font-bold text-[#1E40AF] mb-2">Regulatory Compliance</h3>
          <ul className="text-base text-gray-700 font-poppins flex flex-col gap-2">
            <li>FDIC insured deposits</li>
            <li>Reserve Bank guidelines compliant</li>
            <li>Transparent fee structure</li>
            <li>Regular audit reports</li>
          </ul>
        </div>
      </div>
      {/* Tax Calculator Widget Placeholder */}
      <div className="w-full mt-8 flex flex-col items-center">
        <div className="w-full max-w-md bg-gradient-to-r from-[#F0F9FF] to-[#D1FAE5] rounded-2xl p-6 shadow flex flex-col gap-3 items-center">
          <div className="text-lg font-bold text-[#059669] mb-2">Tax Savings Calculator (Coming Soon)</div>
          <input type="number" placeholder="Enter annual income" className="w-full px-4 py-2 rounded-lg border border-gray-200 text-lg font-poppins text-right focus:ring-2 focus:ring-[#059669]" disabled />
          <button className="bg-gradient-to-r from-[#059669] to-[#10B981] text-white font-poppins text-lg px-8 py-2 rounded-xl font-bold shadow-lg mt-2 opacity-60 cursor-not-allowed" disabled>Show Tax Savings</button>
        </div>
      </div>
    </div>
  </section>
);

export default TaxBenefitsSection;
