import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import GoalCard from '../components/investmentPlans/GoalCard';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface InvestmentPlan {
  title: string;
  description: string;
  features: string[];
  bestFor: string;
  icon: string;
  color: string;
}

interface Goal {
  title: string;
  icon: string;
  timeline: string;
  suggestedAmount: string;
  strategy: string;
  color: string;
}

const InvestmentPlansPage: React.FC = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const investmentPlans: InvestmentPlan[] = [
    {
      title: 'SIP (Systematic Investment Plan)',
      description: 'Invest small amounts regularly and build wealth over time',
      features: [
        'Start with ₹500/month',
        'Flexible tenure',
        'Auto-debit facility'
      ],
      bestFor: 'Regular income earners, beginners',
      icon: '📈',
      color: 'from-blue-200 to-blue-400'
    },
    {
      title: 'Lump Sum Investment',
      description: 'Invest a large amount at once for potentially higher returns',
      features: [
        'Minimum ₹5,000',
        'Immediate market exposure',
        'Suitable for windfall gains'
      ],
      bestFor: 'Large cash holders, market timers',
      icon: '💰',
      color: 'from-green-200 to-green-400'
    },
    {
      title: 'Goal-Based Investment',
      description: 'Invest strategically for specific life goals',
      features: [
        'Customized portfolios',
        'Goal tracking',
        'Time-bound planning'
      ],
      bestFor: 'House purchase, child education, retirement',
      icon: '🎯',
      color: 'from-purple-200 to-purple-400'
    },
    {
      title: 'Retirement Planning',
      description: 'Secure your future with comprehensive retirement solutions',
      features: [
        'Long-term wealth creation',
        'Tax benefits',
        'Pension planning'
      ],
      bestFor: 'Long-term financial security',
      icon: '👴',
      color: 'from-yellow-200 to-yellow-400'
    },
    {
      title: 'Tax-Saving Plans (ELSS)',
      description: 'Save taxes while building wealth',
      features: [
        'Section 80C benefits',
        '3-year lock-in',
        'Equity exposure'
      ],
      bestFor: 'Tax-conscious investors',
      icon: '📊',
      color: 'from-pink-200 to-pink-400'
    }
  ];

  const goals: Goal[] = [
    {
      title: "Child's Education",
      icon: "🎓",
      timeline: "10-18 years",
      suggestedAmount: "₹25-50 Lakhs",
      strategy: "Aggressive to Moderate portfolio",
      color: "from-blue-200 to-blue-400"
    },
    {
      title: "Dream Home",
      icon: "🏠",
      timeline: "5-15 years",
      suggestedAmount: "₹50 Lakhs - 2 Crores",
      strategy: "Balanced portfolio with debt allocation",
      color: "from-green-200 to-green-400"
    },
    {
      title: "Retirement Planning",
      icon: "👴",
      timeline: "20-40 years",
      suggestedAmount: "₹2-5 Crores",
      strategy: "Long-term equity-heavy portfolio",
      color: "from-purple-200 to-purple-400"
    },
    {
      title: "Emergency Fund",
      icon: "🛡️",
      timeline: "6-12 months",
      suggestedAmount: "₹3-6 Lakhs",
      strategy: "Liquid funds and debt instruments",
      color: "from-yellow-200 to-yellow-400"
    },
    {
      title: "Travel & Lifestyle",
      icon: "✈️",
      timeline: "2-5 years",
      suggestedAmount: "₹2-10 Lakhs",
      strategy: "Moderate risk portfolio",
      color: "from-pink-200 to-pink-400"
    },
    {
      title: "Business Expansion",
      icon: "💼",
      timeline: "3-7 years",
      suggestedAmount: "₹1-5 Crores",
      strategy: "Growth-oriented portfolio",
      color: "from-orange-200 to-orange-400"
    }
  ];

  return (
    <div className="font-inter bg-[#F8FAFC] dark:bg-[#1F2937] transition-colors duration-500">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Smart Investment Plans
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Choose the perfect investment strategy for your financial goals
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                Start Investing
              </button>
              <button className="bg-blue-50 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Investment Solutions
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Discover our carefully crafted investment plans designed to help you achieve your financial goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {investmentPlans.map((plan: InvestmentPlan, index: number) => (
              <div 
                key={plan.title}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-6">
                  <span className="text-3xl font-bold text-blue-600">{plan.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {plan.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {plan.description}
                </p>
                <div className="space-y-2">
                  {plan.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                      <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Best for: {plan.bestFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Investing?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Take the first step towards financial freedom today
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Investment Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">
            Plan Your Investment Journey
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            {/* Calculator Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Investment Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Type
                    </label>
                    <select className="w-full p-2 border rounded-md">
                      <option>SIP</option>
                      <option>Lump Sum</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Duration (years)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Expected Returns</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-2">Projected Returns</h4>
                    <p className="text-2xl font-bold text-blue-600">₹1,50,000</p>
                    <p className="text-sm text-gray-500">Based on 12% annual returns</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-2">Monthly Returns</h4>
                    <p className="text-xl font-bold text-green-600">₹1,250</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Investment Solutions */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50 to-transparent opacity-30 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up" data-aos-delay="100">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Our Investment Solutions
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              Discover our tailored investment strategies designed to help you achieve your financial goals with confidence.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-12 w-full">
            {goals.map((goal, idx) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <GoalCard goal={goal} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestmentPlansPage;
