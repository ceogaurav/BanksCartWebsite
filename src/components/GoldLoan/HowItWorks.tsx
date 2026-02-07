import React from 'react';
import { FileText, Search, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  openApplyModal?: (loanType?: string) => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ openApplyModal }) => {
  const steps = [
    {
      icon: FileText,
      title: 'Apply Online',
      description: 'Fill out our simple online application form with basic details',
      time: '2 minutes'
    },
    {
      icon: Search,
      title: 'Gold Valuation',
      description: 'Our certified experts will evaluate your gold jewelry or coins',
      time: '10 minutes'
    },
    {
      icon: DollarSign,
      title: 'Loan Approval',
      description: 'Get instant approval and choose your preferred loan amount',
      time: '5 minutes'
    },
    {
      icon: CheckCircle,
      title: 'Amount Disbursed',
      description: 'Receive the loan amount directly in your bank account',
      time: '15 minutes'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get your gold loan in just 4 simple steps. Our streamlined process ensures quick and hassle-free experience
          </p>
        </div>

        <div className="relative">
          {/* Desktop Flow */}
          <div className="hidden lg:block">
            <div className="flex justify-between items-center mb-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm font-medium text-orange-600 mb-1">{step.time}</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm max-w-xs">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-8 h-8 text-orange-500 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Flow */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-orange-600 mb-1">{step.time}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Total Process Time: 30 Minutes</h3>
            <p className="text-lg mb-6">From application to disbursement, everything happens in just 30 minutes</p>
            {openApplyModal && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => openApplyModal('Gold Loan - How It Works Calculator')}
                  className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
                >
                  Calculate Loan Amount
                </button>
                <button
                  onClick={() => openApplyModal('Gold Loan - How It Works Apply')}
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300"
                >
                  Start Application
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;