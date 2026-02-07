import React from 'react';
import { ArrowRight, Phone, MessageCircle, Calculator } from 'lucide-react';

interface CTAProps {
  openApplyModal?: (loanType?: string) => void;
}

const CTA: React.FC<CTAProps> = ({ openApplyModal }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-600 via-yellow-500 to-orange-500 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Ready to Get Your Gold Loan?
          </h2>
          <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
            Join over 1 million satisfied customers who trust BanksCart for their gold loan needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">₹500Cr+</div>
            <div className="text-sm opacity-90">Loans Disbursed</div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">1M+</div>
            <div className="text-sm opacity-90">Happy Customers</div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">8.5%</div>
            <div className="text-sm opacity-90">Starting Interest</div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">30 Min</div>
            <div className="text-sm opacity-90">Quick Approval</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {openApplyModal && (
            <button
              onClick={() => openApplyModal('Gold Loan - CTA Calculator')}
              className="bg-white text-orange-600 px-6 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
              <Calculator className="w-5 h-5" />
              <span>Calculate Loan</span>
            </button>
          )}
          <a href="tel:+919686859296" className="bg-white text-orange-600 px-6 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>Call Expert</span>
          </a>
          {openApplyModal && (
            <button
              onClick={() => openApplyModal('Gold Loan - CTA Apply Now')}
              className="bg-gradient-to-r from-orange-700 to-yellow-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-orange-800 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
              <span>Apply Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm opacity-75">
            *Interest rates subject to change. Terms and conditions apply.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;