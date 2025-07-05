import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const fundData = [
  {
    name: 'SBI BlueChip Fund',
    category: 'Large Cap',
    returns: [18.2, 15.1, 13.7],
    risk: 'Moderate',
    stars: 5,
    minInvestment: '₹5,000',
    color: 'from-blue-200 to-blue-400',
  },
  {
    name: 'HDFC Mid-Cap Opportunities',
    category: 'Mid Cap',
    returns: [22.5, 18.3, 16.2],
    risk: 'High',
    stars: 4,
    minInvestment: '₹5,000',
    color: 'from-green-200 to-green-400',
  },
  {
    name: 'Axis Small Cap Fund',
    category: 'Small Cap',
    returns: [28.1, 20.7, 17.5],
    risk: 'High',
    stars: 4,
    minInvestment: '₹5,000',
    color: 'from-yellow-200 to-yellow-400',
  },
  {
    name: 'ICICI Prudential Balanced Advantage',
    category: 'Hybrid',
    returns: [14.2, 12.5, 11.1],
    risk: 'Moderate',
    stars: 5,
    minInvestment: '₹1,000',
    color: 'from-purple-200 to-purple-400',
  },
  {
    name: 'Aditya Birla Sun Life Tax Relief 96',
    category: 'ELSS',
    returns: [20.3, 16.8, 14.9],
    risk: 'Moderate',
    stars: 4,
    minInvestment: '₹500',
    color: 'from-pink-200 to-pink-400',
  },
  {
    name: 'UTI Liquid Fund',
    category: 'Liquid',
    returns: [6.1, 5.8, 5.6],
    risk: 'Low',
    stars: 5,
    minInvestment: '₹500',
    color: 'from-gray-200 to-gray-400',
  },
];

const FeaturedProducts: React.FC = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });

    // Cleanup chart on component unmount
    return () => {
      // Chart.js will automatically clean up when the component unmounts
    };
  }, []);
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-900" data-aos="fade-up">Top Performing Mutual Funds</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {fundData.map((fund, idx) => (
            <div
              key={fund.name}
              className={`bg-white/80 rounded-2xl shadow-xl p-6 flex flex-col gap-4 glassmorphism hover:scale-105 hover:shadow-2xl transition-transform duration-300`}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg text-blue-800">{fund.name}</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{fund.category}</span>
              </div>
              {/* Animated chart */}
              <div className={`h-20 bg-gradient-to-r ${fund.color} rounded-lg`}>
                <Bar
                  data={{
                    labels: ['1Y', '3Y', '5Y'],
                    datasets: [
                      {
                        label: 'Returns (%)',
                        data: fund.returns,
                        backgroundColor: ['#1E40AF', '#059669', '#F59E0B'],
                        borderRadius: 8,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: {
                      x: { display: false },
                      y: { display: false, min: 0 },
                    },
                    animation: { duration: 1200 },
                  }}
                  height={60}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">{'★'.repeat(fund.stars)}{'☆'.repeat(5 - fund.stars)}</span>
                <span className="text-xs text-gray-500">Risk: {fund.risk}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Min Investment: {fund.minInvestment}</span>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition">Invest Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
