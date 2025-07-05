import React, { useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Portfolio Value',
      data: [200000, 210000, 220000, 230000, 240000, 250000],
      borderColor: '#059669',
      backgroundColor: 'rgba(16,185,129,0.1)',
      tension: 0.4,
      fill: true,
      pointRadius: 0,
    },
  ],
};

const pieData = {
  labels: ['Equity', 'Debt', 'Gold'],
  datasets: [
    {
      data: [60, 30, 10],
      backgroundColor: ['#1E40AF', '#059669', '#F59E0B'],
      borderWidth: 0,
    },
  ],
};

const PerformanceDashboard: React.FC = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-900" data-aos="fade-up">Real-time Portfolio Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Portfolio Value Graph */}
          <div className="bg-white/80 rounded-2xl shadow-xl p-6 flex flex-col gap-4 glassmorphism" data-aos="fade-right">
            <span className="font-bold text-lg text-blue-800">Portfolio Value</span>
            <div className="h-32 bg-gradient-to-r from-green-100 to-green-300 rounded-lg flex items-center justify-center">
              <Line
                data={lineData}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { display: false },
                    y: { display: false, min: 0 },
                  },
                  animation: { duration: 1200 },
                }}
                height={80}
              />
            </div>
          </div>
          {/* Asset Allocation Pie Chart */}
          <div className="bg-white/80 rounded-2xl shadow-xl p-6 flex flex-col gap-4 glassmorphism" data-aos="fade-left">
            <span className="font-bold text-lg text-blue-800">Asset Allocation</span>
            <div className="h-32 bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg flex items-center justify-center">
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                  animation: { duration: 1200 },
                }}
                height={80}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row gap-8">
          {/* Recent Transactions */}
          <div className="bg-white/80 rounded-2xl shadow-xl p-6 flex-1 glassmorphism" data-aos="fade-up" data-aos-delay="200">
            <span className="font-bold text-lg text-blue-800">Recent Transactions</span>
            <ul className="mt-2 text-gray-700 text-sm">
              <li>+ ₹10,000 SIP - SBI BlueChip Fund</li>
              <li>+ ₹5,000 Lumpsum - Axis Small Cap Fund</li>
              <li>- ₹2,000 Redemption - UTI Liquid Fund</li>
            </ul>
          </div>
          {/* Market Overview */}
          <div className="bg-white/80 rounded-2xl shadow-xl p-6 flex-1 glassmorphism" data-aos="fade-up" data-aos-delay="400">
            <span className="font-bold text-lg text-blue-800">Market Overview</span>
            <ul className="mt-2 text-gray-700 text-sm">
              <li>Nifty 50: <span className="text-green-600">+0.85%</span></li>
              <li>SENSEX: <span className="text-green-600">+0.72%</span></li>
              <li>Gold: <span className="text-red-600">-0.15%</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button className="bg-blue-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition">View Full Dashboard</button>
        </div>
      </div>
    </section>
  );
};

export default PerformanceDashboard;
