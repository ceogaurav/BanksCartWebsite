import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // NEW: Import useNavigate
import { TrendingUp, Shield, Clock, CheckCircle } from 'lucide-react';
import Button from '../common/Button';
import ApplyButton from '../common/ApplyButton';

interface HeroSectionProps {
  openApplyModal: (loanType?: string) => void;
  // REMOVED: openEligibilityModal is no longer passed as a prop
}

// Updated component signature to remove openEligibilityModal and use useNavigate
const HeroSection: React.FC<HeroSectionProps> = ({ openApplyModal }) => {
  const navigate = useNavigate(); // NEW: Initialize useNavigate hook

  // State for calculator inputs
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);

  // State for calculated results
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Format numbers to Indian currency style
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  useEffect(() => {
    const calculateEmi = () => {
      const principal = amount;
      const annualRate = rate;
      const years = tenure;

      if (principal <= 0 || annualRate <= 0 || years <= 0) {
        setEmi(0);
        setTotalInterest(0);
        setTotalAmount(0);
        return;
      }

      const monthlyRate = annualRate / 12 / 100;
      const numberOfMonths = years * 12;
      const emiValue = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
      const totalAmountValue = emiValue * numberOfMonths;
      const totalInterestValue = totalAmountValue - principal;

      setEmi(isFinite(emiValue) ? emiValue : 0);
      setTotalInterest(isFinite(totalInterestValue) ? totalInterestValue : 0);
      setTotalAmount(isFinite(totalAmountValue) ? totalAmountValue : 0);
    };

    calculateEmi();
  }, [amount, rate, tenure]);

  const features = [
    { icon: TrendingUp, text: 'Compare rates from 50+ banks' },
    { icon: Shield, text: 'Secure & encrypted platform' },
    { icon: Clock, text: 'Instant eligibility check' },
    { icon: CheckCircle, text: '24-hour approval process' },
  ];

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent-200 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Find the{' '}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Best Loan
                </span>{' '}
                Rates in India
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Compare interest rates from top banks, check eligibility instantly,
                and apply for loans with the lowest rates. Your financial journey starts here.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {openApplyModal ? (
                <ApplyButton
                  loanType="Loan Application"
                  openApplyModal={openApplyModal}
                  variant="primary"
                  size="lg"
                  className="animate-bounce-gentle"
                >
                  Apply for a Loan
                </ApplyButton>
              ) : (
                <Link to="/home-loan-compare">
                  <Button variant="primary" size="lg" className="animate-bounce-gentle">
                    Compare Loan Rates
                  </Button>
                </Link>
              )}
              {/* MODIFIED: onClick now navigates to the Eligibility page */}
              <Button variant="outline" size="lg" onClick={() => navigate('/eligibility')}>
                Check Eligibility
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center space-x-3 group">
                    <div className="bg-primary-100 p-2 rounded-lg group-hover:bg-primary-200 transition-colors">
                      <Icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative animate-slide-up">
            <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-90">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Quick Loan Calculator
                  </h3>
                  <p className="text-gray-600">Calculate your EMI instantly</p>
                </div>

                <div className="space-y-6">
                  {/* Amount Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">Loan Amount</label>
                      <span className="px-3 py-1 text-sm font-semibold text-primary-700 bg-primary-100 rounded-md">{formatCurrency(amount)}</span>
                    </div>
                    <input
                      type="range"
                      min="100000"
                      max="10000000"
                      step="50000"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    />
                  </div>

                  {/* Rate and Tenure Sliders */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-700">Rate</label>
                        <span className="px-2 py-1 text-sm font-semibold text-secondary-700 bg-secondary-100 rounded-md">{rate.toFixed(2)} %</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="20"
                        step="0.05"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary-600"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-700">Tenure</label>
                        <span className="px-2 py-1 text-sm font-semibold text-accent-700 bg-accent-100 rounded-md">{tenure} Yrs</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="30"
                        step="1"
                        value={tenure}
                        onChange={(e) => setTenure(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-600"
                      />
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-lg space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Monthly EMI</p>
                      <p className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                        {formatCurrency(emi)}
                      </p>
                    </div>
                    <div className="flex justify-around items-center text-center pt-2">
                      <div className="w-24 h-24 relative">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                            className="text-primary-200"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          />
                          <path
                            className="text-secondary-500"
                            strokeDasharray={`${(totalInterest / totalAmount) * 100}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            transform="rotate(-90 18 18)"
                          />
                        </svg>
                      </div>
                      <div className="space-y-2 text-left">
                        <div className="flex items-center">
                          <span className="h-3 w-3 rounded-full bg-primary-200 mr-2"></span>
                          <div>
                            <p className="text-xs text-gray-500">Principal</p>
                            <p className="text-sm font-semibold text-gray-800">{formatCurrency(amount)}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="h-3 w-3 rounded-full bg-secondary-500 mr-2"></span>
                          <div>
                            <p className="text-xs text-gray-500">Total Interest</p>
                            <p className="text-sm font-semibold text-gray-800">{formatCurrency(totalInterest)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center border-t border-gray-200 pt-3">
                      <p className="text-xs text-gray-500">Total Payment</p>
                      <p className="text-lg font-bold text-gray-800">{formatCurrency(totalAmount)}</p>
                    </div>
                  </div>

                  <Link to="/calculators" className="block">
                    <Button variant="outline" fullWidth>
                      View Detailed Calculator
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
