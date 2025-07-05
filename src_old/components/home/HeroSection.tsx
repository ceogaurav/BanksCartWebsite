import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Clock, CheckCircle } from 'lucide-react';
import Button from '../common/Button';

const HeroSection: React.FC = () => {
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
              <Link to="/loan-rates">
                <Button variant="primary" size="lg" className="animate-bounce-gentle">
                  Compare Loan Rates
                </Button>
              </Link>
              <Link to="/eligibility">
                <Button variant="outline" size="lg">
                  Check Eligibility
                </Button>
              </Link>
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
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="text"
                        placeholder="5,00,000"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Interest Rate
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="12.5"
                          className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tenure
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="5"
                          className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">years</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Monthly EMI</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                        ₹11,122
                      </p>
                    </div>
                  </div>
                  
                  <Link to="/calculators" className="block">
                    <Button variant="primary" fullWidth>
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