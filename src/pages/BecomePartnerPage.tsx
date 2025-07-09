import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Shield, 
  Clock, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  DollarSign,
  Target,
  Award,
  Zap,
  X,
  Calendar,
  CreditCard,
  HandHeart,
  Briefcase,
  TrendingDown,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Loader2
} from 'lucide-react';
import { supabase, type LoanPartner } from './lib/supabase';
interface BecomePartnerPageProps {
  openPartnerModal: () => void;
}

const BecomePartnerPage: React.FC<BecomePartnerPageProps> = ({ openPartnerModal }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8 text-green-500" />,
      title: "High Commission Structure",
      description: "Earn up to 2-5% commission on every loan processed through your referrals"
    },
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: "No Target Pressure",
      description: "Work at your own pace without any monthly targets or pressure"
    },
    {
      icon: <Award className="w-8 h-8 text-purple-500" />,
      title: "Performance Bonuses",
      description: "Additional bonuses for top performers and milestone achievements"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Instant Payouts",
      description: "Get your commissions processed within 24-48 hours of loan approval"
    },
    {
      icon: <Shield className="w-8 h-8 text-red-500" />,
      title: "Complete Support",
      description: "24/7 technical and sales support to help you succeed"
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-500" />,
      title: "Growing Network",
      description: "Join thousands of successful partners across India"
    }
  ];

  const loanTypes = [
    { name: "Personal Loans", commission: "2-3%", processing: "24-48 hours" },
    { name: "Home Loans", commission: "0.5-1%", processing: "7-15 days" },
    { name: "Business Loans", commission: "1-2%", processing: "3-7 days" },
    { name: "Car Loans", commission: "1-1.5%", processing: "24-48 hours" },
    { name: "Education Loans", commission: "1-2%", processing: "5-10 days" },
    { name: "Gold Loans", commission: "3-5%", processing: "2-4 hours" }
  ];

  const faqs = [
    {
      question: "How much can I earn as a loan partner?",
      answer: "Your earning potential depends on your network and effort. Our top partners earn ₹50,000 to ₹2,00,000 per month. Even part-time partners typically earn ₹10,000 to ₹30,000 monthly."
    },
    {
      question: "What are the requirements to become a partner?",
      answer: "You need to be 21+ years old, have a smartphone/laptop, basic understanding of loans, and willingness to learn. No prior experience required as we provide complete training."
    },
    {
      question: "How do I get paid?",
      answer: "Commissions are paid directly to your bank account within 24-48 hours after loan approval. We use secure payment gateways and provide detailed payment reports."
    },
    {
      question: "Is there any joining fee?",
      answer: "No, joining is completely free. We don't charge any registration fees, security deposits, or hidden charges. You start earning from day one."
    },
    {
      question: "What support do you provide?",
      answer: "We provide comprehensive training, marketing materials, lead generation support, technical assistance, and a dedicated relationship manager for ongoing support."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Become a <span className="text-yellow-400">Loan Partner</span> with BanksCart
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Join India's #1 loan marketplace and earn up to ₹2 Lakh per month
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Zero Investment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>High Commissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Complete Training</span>
                </div>
              </div>
              <button 
                onClick={openPartnerModal}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Join Now - Free Registration
              </button>
            </div>
            <div className="lg:text-right">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">Earning Potential</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Part-time (2-3 hours/day)</span>
                    <span className="font-bold text-green-400">₹10,000 - ₹30,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Full-time (6-8 hours/day)</span>
                    <span className="font-bold text-green-400">₹50,000 - ₹1,00,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Top Performers</span>
                    <span className="font-bold text-green-400">₹1,50,000 - ₹2,00,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose BanksCart?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of successful loan partners who have transformed their financial future
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="group p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div claSSssName="flex items-center mb-4">
                  {benefit.icon}
                  <h3 className="text-xl font-semibold text-gray-900 ml-3">{benefit.title}</h3>
                </div>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loan Types & Commission */}
      <div className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Loan Products & Commission Structure</h2>
            <p className="text-xl text-gray-600">Diversify your income with multiple loan products</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loanTypes.map((loan, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-8 h-8 text-blue-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">{loan.name}</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Commission:</span>
                    <span className="font-bold text-green-600">{loan.commission}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing:</span>
                    <span className="font-medium text-blue-600">{loan.processing}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple 4-step process to start earning</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Register Free", description: "Sign up and complete your profile verification", icon: <HandHeart className="w-8 h-8" /> },
              { step: "2", title: "Get Training", description: "Complete our comprehensive training program", icon: <Briefcase className="w-8 h-8" /> },
              { step: "3", title: "Find Customers", description: "Use our leads or find customers through your network", icon: <Users className="w-8 h-8" /> },
              { step: "4", title: "Earn Commission", description: "Get paid for every successful loan disbursement", icon: <DollarSign className="w-8 h-8" /> }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white mx-auto group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-20 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Real partners, real earnings</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rajesh Kumar", location: "Mumbai", earning: "₹85,000/month", image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2" },
              { name: "Priya Sharma", location: "Delhi", earning: "₹65,000/month", image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2" },
              { name: "Amit Patel", location: "Ahmedabad", earning: "₹1,20,000/month", image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2" }
            ].map((story, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <img src={story.image} alt={story.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{story.name}</h3>
                    <p className="text-gray-600">{story.location}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-green-600 font-bold">{story.earning}</span>
                </div>
                <p className="text-gray-600 mt-2">"BanksCart changed my life. I'm now earning more than my previous job!"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about becoming a loan partner</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 py-4 bg-white border-t border-gray-200">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">Join thousands of successful loan partners and transform your financial future</p>
          <button 
            onClick={openPartnerModal}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Start Earning Today - Free Registration
          </button>
        </div>
      </div>
    </div>
  );
}

export default BecomePartnerPage;