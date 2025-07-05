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

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    experience: '',
    currentIncome: ''
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const partnerData: LoanPartner = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        experience: formData.experience,
        current_income: formData.currentIncome
      };

      const { data, error } = await supabase
        .from('loan_partners')
        .insert([partnerData])
        .select();

      if (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus('error');
        
        // Check if it's a duplicate email error
        if (error.code === '23505') {
          alert('This email is already registered. Please use a different email address.');
        } else {
          alert('There was an error submitting your application. Please try again.');
        }
      } else {
        console.log('Form submitted successfully:', data);
        setSubmitStatus('success');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          city: '',
          experience: '',
          currentIncome: ''
        });
        
        // Show success message and close form after delay
        alert('🎉 Congratulations! Your application has been submitted successfully. Our team will contact you within 24 hours to get you started on your earning journey!');
        
        setTimeout(() => {
          setIsFormOpen(false);
          setSubmitStatus('idle');
        }, 2000);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setSubmitStatus('error');
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                onClick={() => setIsFormOpen(true)}
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
                <div className="flex items-center mb-4">
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
            onClick={() => setIsFormOpen(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Start Earning Today - Free Registration
          </button>
        </div>
      </div>

      {/* Popup Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform animate-scale-up">
            <div className="relative p-6">
              <button 
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                disabled={isSubmitting}
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Join BanksCart Today!</h3>
                <p className="text-gray-600">Start earning up to ₹2 Lakh per month</p>
              </div>

              {/* Countdown Timer */}
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-lg mb-6">
                <div className="text-center">
                  <p className="text-sm font-semibold mb-2">LIMITED TIME OFFER!</p>
                  <div className="flex justify-center space-x-4 text-lg font-bold">
                    <div className="text-center">
                      <div className="bg-white/20 rounded px-2 py-1">
                        {String(timeLeft.hours).padStart(2, '0')}
                      </div>
                      <div className="text-xs mt-1">Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-white/20 rounded px-2 py-1">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </div>
                      <div className="text-xs mt-1">Minutes</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-white/20 rounded px-2 py-1">
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </div>
                      <div className="text-xs mt-1">Seconds</div>
                    </div>
                  </div>
                  <p className="text-sm mt-2">Register now and get ₹5,000 joining bonus!</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="city"
                    placeholder="City *"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50"
                  />
                </div>
                <div>
                  <select
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50"
                  >
                    <option value="">Select Experience *</option>
                    <option value="fresher">Fresher (0-1 years)</option>
                    <option value="intermediate">Intermediate (1-3 years)</option>
                    <option value="experienced">Experienced (3+ years)</option>
                  </select>
                </div>
                <div>
                  <select
                    name="currentIncome"
                    required
                    value={formData.currentIncome}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50"
                  >
                    <option value="">Current Monthly Income *</option>
                    <option value="0-25000">₹0 - ₹25,000</option>
                    <option value="25000-50000">₹25,000 - ₹50,000</option>
                    <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                    <option value="100000+">₹1,00,000+</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    'Register Now - Start Earning Today!'
                  )}
                </button>
              </form>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                <p>By registering, you agree to our Terms & Conditions</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;