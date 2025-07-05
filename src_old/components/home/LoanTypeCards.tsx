import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { loanTypes } from '../../data/loanTypes';

const LoanTypeCards: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Loan Type
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From personal expenses to dream homes, we have the right loan solution for every need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loanTypes.map((loan) => (
            <Link
              key={loan.id}
              to={`/loan-rates?type=${loan.id}`}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-4xl">{loan.icon}</div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {loan.name}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {loan.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Amount Range</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {loan.minAmount} - {loan.maxAmount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Tenure</span>
                    <span className="text-sm font-semibold text-gray-900">{loan.tenure}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {loan.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <span className="text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                    Compare Rates →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoanTypeCards;