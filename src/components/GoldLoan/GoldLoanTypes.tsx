import React from 'react';
import { Coins, Home, Building, Briefcase, Users, Crown } from 'lucide-react';
import ApplyButton from '../common/ApplyButton';

interface GoldLoanTypesProps {
  openApplyModal?: (loanType?: string) => void;
}

const GoldLoanTypes: React.FC<GoldLoanTypesProps> = ({ openApplyModal }) => {
    const loanTypes = [
    {
      icon: Coins,
      title: 'Personal Gold Loan',
      description: 'Quick personal loans against gold jewelry for immediate financial needs',
      features: ['Up to 90% of gold value', 'Flexible repayment', 'No income proof required'],
      rate: '8.5% - 12%'
    },
    {
      icon: Home,
      title: 'Home Renovation Loan',
      description: 'Special gold loans for home improvement and renovation projects',
      features: ['Higher loan amounts', 'Longer tenure', 'Competitive rates'],
      rate: '9% - 13%'
    },
    {
      icon: Building,
      title: 'Business Gold Loan',
      description: 'Fund your business expansion with gold as collateral',
      features: ['Quick disbursement', 'Flexible terms', 'No business proof needed'],
      rate: '10% - 15%'
    },
    {
      icon: Briefcase,
      title: 'Professional Loan',
      description: 'Loans for professionals and self-employed individuals',
      features: ['Minimal documentation', 'Quick approval', 'Competitive rates'],
      rate: '8.5% - 14%'
    },
    {
      icon: Users,
      title: 'Agricultural Gold Loan',
      description: 'Special loans for farmers and agricultural activities',
      features: ['Lower interest rates', 'Seasonal repayment', 'Government schemes'],
      rate: '7% - 11%'
    },
    {
      icon: Crown,
      title: 'Premium Gold Loan',
      description: 'High-value loans for premium gold ornaments and coins',
      features: ['Higher LTV ratio', 'Premium rates', 'Dedicated service'],
      rate: '8% - 12%'
    }
  ];

  return (
    <section id="loans" className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Types of Gold Loans
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of gold loan products designed to meet your specific financial needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loanTypes.map((loan, index) => (
            <div
              key={loan.title}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-orange-500"
            >
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-3 rounded-lg">
                  <loan.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-800">{loan.title}</h3>
                  <div className="text-sm text-green-600 font-medium">Rate: {loan.rate}</div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{loan.description}</p>
              
              <ul className="space-y-2 mb-4">
                {loan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              {openApplyModal && (
                <ApplyButton
                  loanType={`Gold Loan - ${loan.title}`}
                  openApplyModal={openApplyModal}
                  variant="primary"
                  size="md"
                  fullWidth={true}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105"
                >
                  Apply Now
                </ApplyButton>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoldLoanTypes;