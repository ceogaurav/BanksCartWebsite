import React from 'react';
import { Shield, Clock, Calculator, CreditCard, Users, Award, Smartphone, FileText } from 'lucide-react';

interface FeaturesProps {
  openApplyModal?: (loanType?: string) => void;
}

const Features: React.FC<FeaturesProps> = ({ openApplyModal }) => {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Your gold is stored in high-security vaults with insurance coverage',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Clock,
      title: 'Quick Processing',
      description: 'Get instant approval and disbursement within 30 minutes',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Calculator,
      title: 'Competitive Rates',
      description: 'Lowest interest rates starting from 8.5% per annum',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: CreditCard,
      title: 'Flexible Repayment',
      description: 'Choose from various EMI options that suit your budget',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Users,
      title: 'Expert Valuators',
      description: 'Certified gold valuators ensure accurate gold assessment',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Award,
      title: 'Trusted by Millions',
      description: 'Over 1 million satisfied customers across India',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Smartphone,
      title: 'Digital Experience',
      description: 'Complete loan process through our mobile app',
      color: 'from-teal-500 to-green-500'
    },
    {
      icon: FileText,
      title: 'Minimal Documentation',
      description: 'Just basic KYC documents required for loan approval',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Why Choose Our Gold Loans?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the best-in-class gold loan services with unmatched benefits and features
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300 transform hover:-translate-y-2 border border-white border-opacity-20"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          {openApplyModal && (
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 border border-white border-opacity-20">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Your Gold Loan?</h3>
              <p className="text-gray-300 mb-6">Join millions of satisfied customers who trust us with their gold loan needs</p>
              <button
                onClick={() => openApplyModal('Gold Loan - Features CTA')}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105">
                Start Your Application
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Features;