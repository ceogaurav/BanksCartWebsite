import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, FileText, Search, CreditCard, TrendingUp, Shield } from 'lucide-react';

const QuickTools: React.FC = () => {
  const tools = [
    {
      name: 'EMI Calculator',
      description: 'Calculate your monthly EMI instantly',
      icon: Calculator,
      href: '/calculators',
      color: 'bg-blue-500',
    },
    {
      name: 'Eligibility Check',
      description: 'Check loan eligibility in seconds',
      icon: FileText,
      href: '/eligibility',
      color: 'bg-green-500',
    },
    {
      name: 'IFSC Finder',
      description: 'Find bank branch IFSC codes',
      icon: Search,
      href: '/ifsc-finder',
      color: 'bg-purple-500',
    },
    {
      name: 'Credit Score',
      description: 'Check your credit score for free',
      icon: CreditCard,
      href: '/credit-score',
      color: 'bg-orange-500',
    },
    {
      name: 'Rate Comparison',
      description: 'Compare interest rates across banks',
      icon: TrendingUp,
      href: '/loan-rates',
      color: 'bg-teal-500',
    },
    {
      name: 'Loan Protection',
      description: 'Secure your loan with insurance',
      icon: Shield,
      href: '/insurance',
      color: 'bg-indigo-500',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Quick Financial Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access powerful tools to make informed financial decisions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.name}
                to={tool.href}
                className="group bg-gray-50 hover:bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-gray-200"
              >
                <div className="flex items-start space-x-4">
                  <div className={`${tool.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickTools;