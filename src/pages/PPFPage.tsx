import React, { useState, useEffect } from 'react';
import { Calculator, Shield, TrendingUp, Calendar, IndianRupee, Users, FileText, CheckCircle, ArrowRight, Wallet, PiggyBank, Award, Clock } from 'lucide-react';
import ApplyButton from '../components/common/ApplyButton';

interface PPFPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const PPFPage: React.FC<PPFPageProps> = ({ openApplyModal }) => {
  const [ppfAmount, setPpfAmount] = useState(150000);
  const [ppfYears, setPpfYears] = useState(15);
  const [currentRate] = useState(7.1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const calculatePPF = () => {
    const annualContribution = ppfAmount;
    const years = ppfYears;
    const rate = currentRate / 100;
    
    let totalAmount = 0;
    let totalInvestment = 0;
    
    for (let i = 1; i <= years; i++) {
      totalAmount = (totalAmount + annualContribution) * (1 + rate);
      totalInvestment += annualContribution;
    }
    
    const interest = totalAmount - totalInvestment;
    
    return {
      totalAmount: Math.round(totalAmount),
      totalInvestment,
      interest: Math.round(interest)
    };
  };

  const ppfResult = calculatePPF();

  const features = [
    {
      icon: Shield,
      title: "Government Backed",
      description: "100% safe investment backed by Government of India",
      color: "bg-blue-500"
    },
    {
      icon: TrendingUp,
      title: "Tax Benefits",
      description: "Triple tax benefit under Section 80C",
      color: "bg-green-500"
    },
    {
      icon: Calendar,
      title: "15 Year Lock-in",
      description: "Long-term wealth creation with compound interest",
      color: "bg-purple-500"
    },
    {
      icon: IndianRupee,
      title: "Flexible Investment",
      description: "Invest ₹500 to ₹1.5 lakh annually",
      color: "bg-orange-500"
    }
  ];

  const benefits = [
    "Tax deduction up to ₹1.5 lakh under Section 80C",
    "Tax-free interest earnings",
    "Tax-free maturity amount",
    "Partial withdrawal after 7th year",
    "Loan facility against PPF balance",
    "Nomination facility available",
    "Can be continued for 5 years after maturity",
    "Transferable across India"
  ];

  const rules = [
    {
      title: "Minimum Investment",
      description: "₹500 per year (can be deposited in any month)"
    },
    {
      title: "Maximum Investment",
      description: "₹1.5 lakh per financial year"
    },
    {
      title: "Maturity Period",
      description: "15 years from the end of financial year of opening"
    },
    {
      title: "Partial Withdrawal",
      description: "50% of balance at end of 6th year or previous year balance"
    },
    {
      title: "Loan Facility",
      description: "From 3rd to 6th year against PPF balance"
    },
    {
      title: "Account Extension",
      description: "Can be extended for blocks of 5 years after maturity"
    }
  ];

  const faqs = [
    {
      question: "What is the current PPF interest rate?",
      answer: "The current PPF interest rate is 7.1% per annum, compounded annually. This rate is reviewed quarterly by the government."
    },
    {
      question: "Can I open multiple PPF accounts?",
      answer: "No, an individual can have only one PPF account. However, you can open a PPF account for your minor child."
    },
    {
      question: "What happens if I don't contribute for a year?",
      answer: "If you don't contribute the minimum ₹500 in a year, your account becomes dormant. You can reactivate it by paying ₹50 penalty plus the minimum contribution."
    },
    {
      question: "Can I close my PPF account before 15 years?",
      answer: "PPF accounts cannot be closed before 15 years except in exceptional circumstances like serious illness or higher education needs."
    },
    {
      question: "How is PPF interest calculated?",
      answer: "PPF interest is calculated on the lowest balance between the 5th and last day of each month and credited at the end of the financial year."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className={`relative py-20 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Public Provident Fund
            <span className="block text-blue-600">Complete Guide</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover everything about PPF - India's most trusted long-term investment option with guaranteed returns, tax benefits, and government backing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {openApplyModal && (
              <ApplyButton
                loanType="PPF Account"
                openApplyModal={openApplyModal}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Open PPF Account
              </ApplyButton>
            )}
            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300">
              Calculate Returns
            </button>
          </div>
        </div>
      </section>

      {/* What is PPF Section */}
      <section id="overview" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">What is Public Provident Fund?</h2>
              <p className="text-lg text-gray-600 mb-6">
                Public Provident Fund (PPF) is a long-term investment scheme backed by the Government of India. It offers attractive interest rates with complete tax benefits and guaranteed returns.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Launched in 1968, PPF is designed to encourage small savings and provide retirement benefits to individuals. With a 15-year lock-in period, it's perfect for long-term wealth creation.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  <span>Est. 1968</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>Millions of investors</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  <span>100% Safe</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PPF Calculator */}
      <section id="calculator" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">PPF Calculator</h2>
            <p className="text-blue-100 text-lg">Calculate your PPF returns and plan your investment</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Investment Amount
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={ppfAmount}
                      onChange={(e) => setPpfAmount(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="500"
                      max="150000"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Minimum: ₹500, Maximum: ₹1,50,000</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Period (Years)
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="50"
                    value={ppfYears}
                    onChange={(e) => setPpfYears(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>15 years</span>
                    <span className="font-medium text-blue-600">{ppfYears} years</span>
                    <span>50 years</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Interest Rate
                  </label>
                  <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">{currentRate}%</span>
                    <span className="text-sm text-gray-500">per annum</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Investment</span>
                    <span className="font-semibold text-lg">₹{ppfResult.totalInvestment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Interest Earned</span>
                    <span className="font-semibold text-lg text-green-600">₹{ppfResult.interest.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 font-medium">Maturity Amount</span>
                      <span className="font-bold text-2xl text-blue-600">₹{ppfResult.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tax Saved (30% bracket)</span>
                    <span className="font-semibold text-green-600">₹{Math.round(ppfAmount * 0.3).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">PPF Benefits</h2>
            <p className="text-xl text-gray-600">Why PPF is the best long-term investment option</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3 p-6 bg-gray-50 rounded-lg hover:bg-blue-50 transition-all duration-300">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules and Regulations */}
      <section id="rules" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">PPF Rules & Regulations</h2>
            <p className="text-xl text-gray-600">Important rules you need to know</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rules.map((rule, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="font-semibold text-gray-900 mb-3">{rule.title}</h3>
                <p className="text-gray-600">{rule.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Open PPF Account */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Open PPF Account</h2>
            <p className="text-xl text-gray-600">Simple steps to start your PPF journey</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Choose Your Bank/Post Office</h3>
                    <p className="text-gray-600">Visit any authorized bank or post office that offers PPF accounts</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Submit Required Documents</h3>
                    <p className="text-gray-600">PAN card, Aadhaar card, address proof, and passport size photos</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Fill Application Form</h3>
                    <p className="text-gray-600">Complete the PPF account opening form with nominee details</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Make Initial Deposit</h3>
                    <p className="text-gray-600">Deposit minimum ₹500 to activate your PPF account</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Required Documents</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">PAN Card (Mandatory)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Aadhaar Card</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Address Proof</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Passport Size Photos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Bank Account Details</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Pro Tip:</strong> You can also open PPF account online through net banking of most banks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Get answers to common PPF queries</p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your PPF Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">Join millions of smart investors who trust PPF for their long-term financial goals</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {openApplyModal && (
              <ApplyButton
                loanType="PPF Account"
                openApplyModal={openApplyModal}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Open PPF Account Now
              </ApplyButton>
            )}
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
              Compare PPF vs Other Investments
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PPFPage;