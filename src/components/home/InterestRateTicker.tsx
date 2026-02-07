import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface RateTicker {
  bankName: string;
  loanType: string;
  rate: number;
  change: number;
  logo: string;
}

const InterestRateTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const rates: RateTicker[] = [
    { bankName: 'HDFC Bank', loanType: 'Personal', rate: 10.5, change: -0.25, logo: '🏛️' },
    { bankName: 'SBI', loanType: 'Home', rate: 8.5, change: 0.15, logo: '🏦' },
    { bankName: 'ICICI', loanType: 'Business', rate: 11.25, change: -0.1, logo: '🏢' },
    { bankName: 'Axis Bank', loanType: 'Car', rate: 9.8, change: 0.0, logo: '🏪' },
    { bankName: 'Kotak', loanType: 'Education', rate: 12.0, change: -0.5, logo: '🏦' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rates.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [rates.length]);

  return (
    <div className="bg-white border-t border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary-600 p-1 rounded">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">Live Rates</span>
          </div>
          
          <div className="flex-1 overflow-hidden mx-8">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {rates.map((rate, index) => (
                <div key={index} className="flex-shrink-0 w-full flex items-center justify-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{rate.logo}</span>
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        {rate.bankName} {rate.loanType}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary-600">
                          {rate.rate}%
                        </span>
                        <div className={`flex items-center space-x-1 ${
                          rate.change > 0 ? 'text-red-500' : rate.change < 0 ? 'text-green-500' : 'text-gray-500'
                        }`}>
                          {rate.change !== 0 && (
                            rate.change > 0 ? 
                              <TrendingUp className="h-3 w-3" /> : 
                              <TrendingDown className="h-3 w-3" />
                          )}
                          <span className="text-xs font-medium">
                            {rate.change > 0 ? '+' : ''}{rate.change}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-gray-500">
            Updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestRateTicker;