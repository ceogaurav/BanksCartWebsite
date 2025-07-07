import React, { useState, useEffect } from 'react';
import { 
  Car, 
  Shield, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Calculator,
  Users,
  Award,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Play,
  MessageCircle,
  Heart,
  Zap,
  Globe,
  Lock,
  Target,
  Smartphone,
  CreditCard,
  FileText,
  Headphones
} from 'lucide-react';
import ApplyButton from '../components/common/ApplyButton'; // Add this line

interface CarInsurancePageProps {
  openApplyModal?: (loanType?: string) => void;
}

const CarInsurancePage: React.FC<CarInsurancePageProps> = ({ openApplyModal }) => {
  const [activeInsuranceType, setActiveInsuranceType] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[id^="section-"]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const insuranceTypes = [
    {
      title: "Third Party Liability",
      description: "Mandatory coverage that protects you against claims from third parties",
      features: ["Legal requirement", "Covers third-party damages", "Injury compensation", "Property damage coverage"],
      price: "Starting from ₹2,500/year",
      color: "bg-blue-500",
      icon: Shield
    },
    {
      title: "Comprehensive Coverage",
      description: "Complete protection for your vehicle and third parties",
      features: ["Own damage coverage", "Third-party liability", "Theft protection", "Natural disaster coverage"],
      price: "Starting from ₹8,500/year",
      color: "bg-green-500",
      icon: Car
    },
    {
      title: "Own Damage Coverage",
      description: "Covers damages to your own vehicle from accidents or disasters",
      features: ["Accident damage", "Fire coverage", "Theft protection", "Vandalism coverage"],
      price: "Starting from ₹5,500/year",
      color: "bg-purple-500",
      icon: Heart
    },
    {
      title: "Zero Depreciation",
      description: "Get full claim amount without depreciation deductions",
      features: ["No depreciation", "Full claim value", "New car protection", "Premium coverage"],
      price: "Starting from ₹12,000/year",
      color: "bg-orange-500",
      icon: Star
    }
  ];

  const insuranceCompanies = [
    {
      name: "ICICI Lombard",
      rating: 4.5,
      features: ["24/7 Claims", "Instant Policy", "Cashless Network"],
      price: "₹8,499",
      cashlessGarages: 4500,
      claimRatio: "89%",
      logo: "IL"
    },
    {
      name: "Bajaj Allianz",
      rating: 4.3,
      features: ["Quick Settlement", "Digital Claims", "Roadside Assistance"],
      price: "₹8,299",
      cashlessGarages: 4200,
      claimRatio: "87%",
      logo: "BA"
    },
    {
      name: "HDFC ERGO",
      rating: 4.4,
      features: ["Smart Claims", "AI Processing", "Mobile App"],
      price: "₹8,699",
      cashlessGarages: 4800,
      claimRatio: "91%",
      logo: "HE"
    },
    {
      name: "Tata AIG",
      rating: 4.2,
      features: ["Fast Track Claims", "Video Inspection", "E-Policy"],
      price: "₹8,199",
      cashlessGarages: 3900,
      claimRatio: "85%",
      logo: "TA"
    },
    {
      name: "New India Assurance",
      rating: 4.1,
      features: ["Government Backing", "Pan India Service", "Affordable Premium"],
      price: "₹7,999",
      cashlessGarages: 3500,
      claimRatio: "83%",
      logo: "NI"
    },
    {
      name: "Oriental Insurance",
      rating: 4.0,
      features: ["Reliable Service", "Wide Network", "Competitive Pricing"],
      price: "₹7,799",
      cashlessGarages: 3200,
      claimRatio: "81%",
      logo: "OI"
    }
  ];

  const faqs = [
    {
      question: "What is the difference between Third Party and Comprehensive insurance?",
      answer: "Third Party insurance covers only damages to others, while Comprehensive insurance covers both your vehicle and third-party damages. Comprehensive is more expensive but provides complete protection."
    },
    {
      question: "How is the premium calculated for car insurance?",
      answer: "Premium depends on factors like car model, age, location, driving history, coverage type, and add-ons. Newer cars and higher coverage typically cost more."
    },
    {
      question: "What is IDV (Insured Declared Value)?",
      answer: "IDV is the current market value of your vehicle. It's the maximum amount you'll receive if your car is stolen or completely damaged. It decreases as your car ages."
    },
    {
      question: "Can I transfer my NCB (No Claim Bonus) to a new car?",
      answer: "Yes, NCB is transferable to a new car within 90 days of policy expiry. It can provide discounts up to 50% on your premium."
    },
    {
      question: "What documents are required for car insurance?",
      answer: "You need RC (Registration Certificate), driving license, previous policy documents, PAN card, and address proof. For new cars, you'll need the invoice."
    },
    {
      question: "How long does claim settlement take?",
      answer: "For cashless claims, it's usually instant at network garages. For reimbursement claims, it typically takes 7-30 days depending on the complexity and documentation."
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Complete Protection",
      description: "Comprehensive coverage for all types of damages and liabilities"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer service and emergency assistance"
    },
    {
      icon: Calculator,
      title: "Instant Quotes",
      description: "Get personalized quotes in seconds with our smart calculator"
    },
    {
      icon: Smartphone,
      title: "Mobile Claims",
      description: "File and track claims easily through our mobile app"
    },
    {
      icon: Users,
      title: "Cashless Network",
      description: "Access to 4000+ authorized garages across India"
    },
    {
      icon: Award,
      title: "Trusted Partner",
      description: "Partnered with top-rated insurance companies"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-sm font-medium">India's Most Trusted Insurance Platform</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Comprehensive 
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent block">
                  Car Insurance
                </span>
                Made Simple
              </h1>
              
              <p className="text-xl text-blue-100 leading-relaxed">
                Compare quotes from top insurance companies, get instant coverage, and enjoy peace of mind with our comprehensive car insurance solutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {openApplyModal && (
                  <ApplyButton
                    loanType="Car Insurance"
                    openApplyModal={openApplyModal}
                    className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Calculator className="w-5 h-5" />
                      <span>Get Instant Quote</span>
                    </div>
                  </ApplyButton>
                )}
                <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all backdrop-blur-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>Watch Demo</span>
                  </div>
                </button>
              </div>
              
              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">10L+</div>
                  <div className="text-blue-200 text-sm">Policies Sold</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">4.8★</div>
                  <div className="text-blue-200 text-sm">Customer Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-blue-200 text-sm">Support</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Quick Quote Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Car Registration Number</label>
                    <input 
                      type="text" 
                      placeholder="Enter your car number"
                      className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Mobile Number</label>
                    <input 
                      type="text" 
                      placeholder="Enter mobile number"
                      className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  {openApplyModal && (
                    <ApplyButton
                      loanType="Car Insurance - Quick Quote"
                      openApplyModal={openApplyModal}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105"
                    >
                      Get Instant Quote
                    </ApplyButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Types Section */}
      <section id="section-insurance-types" className={`py-20 bg-gray-50 transition-all duration-1000 ${isVisible['section-insurance-types'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Types of Motor Insurance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the right coverage for your needs with our comprehensive insurance options
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {insuranceTypes.map((type, index) => (
              <div 
                key={index}
                className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-500/20 cursor-pointer ${
                  activeInsuranceType === index ? 'ring-2 ring-blue-500 shadow-xl' : ''
                }`}
                onClick={() => setActiveInsuranceType(index)}
              >
                <div className={`w-12 h-12 ${type.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <type.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{type.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{type.description}</p>
                
                <div className="space-y-2 mb-6">
                  {type.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="text-lg font-bold text-blue-600 mb-3">{type.price}</div>
                  {openApplyModal && (
                    <ApplyButton
                      loanType={`Car Insurance - ${type.title}`}
                      openApplyModal={openApplyModal}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                    >
                      Get Quote
                    </ApplyButton>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Companies Comparison */}
      <section id="section-companies" className={`py-20 bg-white transition-all duration-1000 ${isVisible['section-companies'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Compare Top Insurance Companies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the best deals from India's leading insurance providers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insuranceCompanies.map((company, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{company.logo}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{company.name}</h3>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-700">{company.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{company.cashlessGarages}</div>
                    <div className="text-xs text-blue-600">Cashless Garages</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{company.claimRatio}</div>
                    <div className="text-xs text-green-600">Claim Ratio</div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {company.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Starting from</span>
                    <span className="text-xl font-bold text-gray-900">{company.price}</span>
                  </div>
                  {openApplyModal && (
                    <ApplyButton
                      loanType={`Car Insurance - ${company.name}`}
                      openApplyModal={openApplyModal}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold"
                    >
                      Get Quote
                    </ApplyButton>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="section-benefits" className={`py-20 bg-gray-50 transition-all duration-1000 ${isVisible['section-benefits'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose BanksCart for Car Insurance?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with our comprehensive insurance solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get insured in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Enter Details",
                description: "Provide your car registration number and personal details",
                icon: FileText
              },
              {
                step: "02",
                title: "Compare Quotes",
                description: "Compare quotes from top insurance companies instantly",
                icon: Calculator
              },
              {
                step: "03",
                title: "Get Covered",
                description: "Choose your plan and get instant policy issuance",
                icon: Shield
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="section-faq" className={`py-20 bg-gray-50 transition-all duration-1000 ${isVisible['section-faq'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about car insurance
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  {activeFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {activeFaq === index && (
                  <div className="px-6 pb-4 border-t">
                    <p className="text-gray-600 leading-relaxed pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Protected?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join millions of satisfied customers who trust BanksCart for their car insurance needs
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {openApplyModal && (
              <ApplyButton
                loanType="Car Insurance"
                openApplyModal={openApplyModal}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all transform hover:scale-105"
              >
                Get Instant Quote
              </ApplyButton>
            )}
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all">
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Call Us Now</span>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CarInsurancePage;