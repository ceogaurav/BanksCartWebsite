import React from 'react';
import { Shield, Clock, Calculator, ArrowRight } from 'lucide-react';

interface HeroProps {
  openApplyModal?: (loanType?: string) => void;
  openEligibilityModal?: (loanType?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ openApplyModal, openEligibilityModal }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-600 text-white">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Get Instant 
                <span className="bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
                  {' '}Gold Loans
                </span>
              </h1>
              <p className="text-xl lg:text-2xl opacity-90">
                Up to 90% of gold value • Interest rates starting from 8.5% • 
                Instant approval in minutes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
                <Shield className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-90">Secure Process</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">5 Min</div>
                <div className="text-sm opacity-90">Quick Approval</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
                <Calculator className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">8.5%</div>
                <div className="text-sm opacity-90">Starting Rate</div>
              </div>
            </div>

            {(openApplyModal || openEligibilityModal) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {openApplyModal && (
                  <button
                    onClick={() => openApplyModal('Gold Loan - Hero Apply')}
                    className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <span>Apply for Gold Loan</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
                {openEligibilityModal && (
                  <button
                    onClick={() => openEligibilityModal('Gold Loan - Hero Eligibility')}
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300"
                  >
                    Check Eligibility
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl p-8 border border-white border-opacity-30">
              <h3 className="text-2xl font-bold mb-6 text-center">Quick Loan Calculator</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Gold Weight (grams)</label>
                  <input type="number" className="w-full bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg px-4 py-3 text-white placeholder-white placeholder-opacity-70" placeholder="Enter weight" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Gold Purity</label>
                  <select className="w-full bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg px-4 py-3 text-white">
                    <option>22 Karat</option>
                    <option>24 Karat</option>
                    <option>18 Karat</option>
                  </select>
                </div>
                {openApplyModal && (
                  <button
                    onClick={() => openApplyModal('Gold Loan - Hero Calculator')}
                    className="w-full bg-white text-orange-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300">
                    Calculate Loan Amount
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;