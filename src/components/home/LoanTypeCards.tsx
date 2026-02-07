import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const loanTypes = [
  {
    id: 1,
    name: 'Home Loan',
    description: 'Get affordable housing loans with the best rates.',
    link: '/home-loan-emi-calculator',
  },
  {
    id: 2,
    name: 'Personal Loan',
    description: 'Personal loans for any of your needs with quick disbursal.',
    link: '/personal-loan-emi-calculator',
  },
  {
    id: 3,
    name: 'Car Loan',
    description: 'Finance your car with competitive rates and flexible EMIs.',
    link: '/car-loan-emi-calculator',
  },
  {
    id: 4,
    name: 'Education Loan',
    description: 'Fund your studies with lower interest education loans.',
    link: '/education-loan-emi-calculator',
  },
];

const LoanTypeCards = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Popular Loan Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loanTypes.map((loan) => (
            <div
              key={loan.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{loan.name}</h3>
              <p className="text-gray-600 mb-4">{loan.description}</p>
              <Link
                to={loan.link}
                className="inline-flex items-center text-primary-600 hover:underline font-medium text-sm"
              >
                Learn More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoanTypeCards;
