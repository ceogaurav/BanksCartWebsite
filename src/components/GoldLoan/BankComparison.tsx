import React, { useState } from 'react';
import { TrendingUp, Star, Award, CheckCircle } from 'lucide-react';

interface BankComparisonProps {
  openApplyModal?: (loanType?: string) => void;
}

const BankComparison: React.FC<BankComparisonProps> = ({ openApplyModal }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const banks = [
    {
      name: 'HDFC Bank',
      logo: 'HD',
      rate: '8.5%',
      processing: '0.5%',
      ltv: '90%',
      tenure: '36 months',
      features: ['Instant approval', 'No income proof', 'Flexible EMI'],
      category: 'Private',
      rating: 4.8,
      specialOffer: 'Zero processing fee for first-time customers'
    },
    {
      name: 'SBI',
      logo: 'SB',
      rate: '9.0%',
      processing: '1.0%',
      ltv: '85%',
      tenure: '36 months',
      features: ['Trusted brand', 'Wide network', 'Government backing'],
      category: 'Public',
      rating: 4.6,
      specialOffer: 'Special rates for salary account holders'
    },
    {
      name: 'ICICI Bank',
      logo: 'IC',
      rate: '8.75%',
      processing: '0.75%',
      ltv: '90%',
      tenure: '48 months',
      features: ['Quick disbursal', 'Online application', 'Doorstep service'],
      category: 'Private',
      rating: 4.7,
      specialOffer: 'Free gold testing and valuation'
    },
    {
      name: 'Axis Bank',
      logo: 'AX',
      rate: '9.25%',
      processing: '1.0%',
      ltv: '85%',
      tenure: '36 months',
      features: ['Digital process', 'Instant approval', 'Competitive rates'],
      category: 'Private',
      rating: 4.5,
      specialOffer: 'Up to 2% cashback on processing fee'
    },
    {
      name: 'Kotak Mahindra',
      logo: 'KM',
      rate: '8.99%',
      processing: '0.5%',
      ltv: '90%',
      tenure: '42 months',
      features: ['Premium service', 'Quick approval', 'Flexible terms'],
      category: 'Private',
      rating: 4.6,
      specialOffer: 'Free insurance on gold jewelry'
    },
    {
      name: 'Muthoot Finance',
      logo: 'MF',
      rate: '12.0%',
      processing: '2.0%',
      ltv: '75%',
      tenure: '24 months',
      features: ['Specialist in gold loans', 'Wide network', 'Quick process'],
      category: 'NBFC',
      rating: 4.3,
      specialOffer: 'No pre-payment penalty'
    }
  ];

  const categories = ['All', 'Private', 'Public', 'NBFC'];

  const filteredBanks = selectedCategory === 'All' 
    ? banks 
    : banks.filter(bank => bank.category === selectedCategory);

  return (
    <section id="compare" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Compare Gold Loan Rates
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the best gold loan rates from top banks and financial institutions
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-orange-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6">
          {filteredBanks.map((bank, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-orange-500"
            >
              <div className="grid lg:grid-cols-6 gap-6 items-center">
                <div className="lg:col-span-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                      {bank.logo}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{bank.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{bank.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{bank.rate}</div>
                      <div className="text-xs text-gray-500">Interest Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-800">{bank.processing}</div>
                      <div className="text-xs text-gray-500">Processing Fee</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-800">{bank.ltv}</div>
                      <div className="text-xs text-gray-500">LTV Ratio</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-800">{bank.tenure}</div>
                      <div className="text-xs text-gray-500">Max Tenure</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  {openApplyModal && (
                    <button
                      onClick={() => openApplyModal(`Gold Loan - Compare - ${bank.name}`)}
                      className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2 mb-3">
                  {bank.features.map((feature, idx) => (
                    <span key={idx} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="bg-green-50 text-green-800 text-sm p-2 rounded-lg flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  <span className="font-medium">Special Offer:</span>
                  <span className="ml-1">{bank.specialOffer}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BankComparison;