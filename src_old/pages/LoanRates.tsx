import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, TrendingUp, Star, ExternalLink } from 'lucide-react';
import { loanRates } from '../data/mockData';
import { banks } from '../data/banks';
import { loanTypes } from '../data/loanTypes';
import Button from '../components/common/Button';

const LoanRates: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedLoanType, setSelectedLoanType] = useState(searchParams.get('type') || 'personal');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rate');

  const filteredAndSortedRates = useMemo(() => {
    let filtered = loanRates
      .filter(rate => rate.loanType === selectedLoanType)
      .map(rate => ({
        ...rate,
        bank: banks.find(bank => bank.id === rate.bankId)!
      }))
      .filter(rate => 
        rate.bank.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    switch (sortBy) {
      case 'rate':
        return filtered.sort((a, b) => a.minRate - b.minRate);
      case 'bank':
        return filtered.sort((a, b) => a.bank.name.localeCompare(b.bank.name));
      case 'amount':
        return filtered.sort((a, b) => {
          const aAmount = parseInt(a.maxAmount.replace(/[^0-9]/g, ''));
          const bAmount = parseInt(b.maxAmount.replace(/[^0-9]/g, ''));
          return bAmount - aAmount;
        });
      default:
        return filtered;
    }
  }, [selectedLoanType, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Compare Loan Interest Rates
          </h1>
          <p className="text-xl text-gray-600">
            Find the best loan rates from top banks in India
          </p>
        </div>

        {/* Loan Type Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {loanTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedLoanType(type.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedLoanType === type.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                <span className="mr-2">{type.icon}</span>
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search banks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="rate">Sort by Interest Rate</option>
              <option value="bank">Sort by Bank Name</option>
              <option value="amount">Sort by Max Amount</option>
            </select>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {filteredAndSortedRates.length} banks found
              </span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filteredAndSortedRates.map((rate, index) => (
            <div key={rate.bankId} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <div className="text-3xl">{rate.bank.logo}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xl font-bold text-gray-900">{rate.bank.name}</h3>
                        {index === 0 && (
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                            Best Rate
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600 ml-1">{rate.bank.rating}/5</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-600">
                          {rate.bank.branches.toLocaleString()} branches
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Interest Rate</p>
                      <p className="text-lg font-bold text-primary-600">
                        {rate.minRate}% - {rate.maxRate}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Processing Fee</p>
                      <p className="text-lg font-semibold text-gray-900">{rate.processingFee}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Max Amount</p>
                      <p className="text-lg font-semibold text-gray-900">{rate.maxAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Tenure</p>
                      <p className="text-lg font-semibold text-gray-900">{rate.tenure}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button variant="primary" className="flex-1">
                    Apply Now
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="ghost" icon={ExternalLink}>
                    Bank Website
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedRates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanRates;