// Chart component for FD Calculator (Money Growth & Principal vs Interest)
import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

export interface FDChartProps {
  principal: number;
  rate: number; // annual rate in %
  tenure: number; // in years (can be float)
  compounding: 'yearly' | 'quarterly' | 'monthly';
}

// Helper to calculate FD growth over time
function getFDGrowthData(principal: number, rate: number, tenure: number, compounding: 'yearly' | 'quarterly' | 'monthly') {
  const freq = compounding === 'yearly' ? 1 : compounding === 'quarterly' ? 4 : 12;
  const n = Math.ceil(tenure * freq);
  const dt = 1 / freq;
  const r = rate / 100;
  let data: number[] = [];
  let labels: string[] = [];
  let amount = principal;
  for (let i = 0; i <= n; i++) {
    data.push(amount);
    labels.push(`${(i * dt).toFixed(2)}y`);
    amount = principal * Math.pow(1 + r / freq, i);
  }
  return { labels, data };
}

const FDLiveCharts: React.FC<FDChartProps> = ({ principal, rate, tenure, compounding }) => {
  const { labels, data } = getFDGrowthData(principal, rate, tenure, compounding);
  const maturity = data[data.length - 1];
  const interest = maturity - principal;

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full items-center justify-center mt-6 animate-fade-in">
      {/* Line Chart: Money Growth */}
      <div className="w-full md:w-2/3 bg-white rounded-xl shadow-lg p-4">
        <h4 className="font-bold text-lg mb-2 text-blue-900">FD Growth Over Time</h4>
        <Line
          data={{
            labels,
            datasets: [
              {
                label: 'Total Value',
                data,
                fill: true,
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderColor: '#2563EB',
                pointRadius: 2,
                tension: 0.35,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: { mode: 'index', intersect: false },
            },
            animation: {
              duration: 1200,
              easing: 'easeOutQuart',
            },
            scales: {
              x: { grid: { display: false } },
              y: { beginAtZero: true, grid: { color: '#E0E7EF' } },
            },
          }}
        />
      </div>
      {/* Doughnut Chart: Principal vs Interest */}
      <div className="w-full md:w-1/3 bg-white rounded-xl shadow-lg p-4 flex flex-col items-center">
        <h4 className="font-bold text-lg mb-2 text-blue-900">Principal vs Interest</h4>
        <Doughnut
          data={{
            labels: ['Principal', 'Interest Earned'],
            datasets: [
              {
                data: [principal, interest],
                backgroundColor: ['#3B82F6', '#F59E42'],
                borderWidth: 0,
              },
            ],
          }}
          options={{
            cutout: '70%',
            plugins: {
              legend: { display: true, position: 'bottom' },
              tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ₹${ctx.parsed.toLocaleString()}` } },
            },
            animation: {
              animateRotate: true,
              duration: 1200,
              easing: 'easeOutQuart',
            },
          }}
        />
        <div className="mt-4 text-center">
          <div className="text-2xl font-bold text-green-700">₹{maturity.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Maturity Value</div>
        </div>
      </div>
    </div>
  );
};

export default FDLiveCharts;
