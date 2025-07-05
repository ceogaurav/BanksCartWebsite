import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { loanRates } from '../../data/mockData';
import { banks } from '../../data/banks';

const CurrentRatesTable: React.FC = () => {
  const [selectedLoanType, setSelectedLoanType] = useState('personal');

  const loanTypes = [
    { id: 'personal', name: 'Personal Loan' },
    { id: 'home', name: 'Home Loan' },
    { id: 'business', name: 'Business Loan' },
  ];

  const filteredRates = loanRates
    .filter(rate => rate.loanType === selectedLoanType)
    .map(rate => ({
      ...rate,
      bank: banks.find(bank => bank.id === rate.bankId)!
    }))
    .sort((a, b) => a.minRate - b.minRate);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Current Interest Rates
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Live rates updated daily from top banks across India
          </p>
        </div>

        {/* Loan Type Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-lg">
            {loanTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedLoanType(type.id)}
                className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${
                  selectedLoanType === type.id
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Rates Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interest Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Processing Fee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Max Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRates.map((rate, index) => (
                  <tr key={rate.bankId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">{rate.bank.logo}</div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {rate.bank.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Rating: {rate.bank.rating}/5
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary-600">
                          {rate.minRate}% - {rate.maxRate}%
                        </span>
                        {index === 0 && (
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                            Best Rate
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Updated: {new Date(rate.lastUpdated).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {rate.processingFee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {rate.maxAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Link
                        to={`/bank/${rate.bankId}`}
                        className="text-primary-600 hover:text-primary-900 inline-flex items-center space-x-1"
                      >
                        <span>View Details</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            to="/loan-rates"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold"
          >
            <span>View Complete Rate Comparison</span>
            <TrendingUp className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CurrentRatesTable;