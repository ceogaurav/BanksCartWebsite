import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, MapPin, Phone, Mail, Star, TrendingUp, CheckCircle, Building2 } from 'lucide-react';
import { banks } from '../data/banks';
import { loanRates } from '../data/mockData';
import { formatCurrency } from '../utils/calculations';

const BankDetails: React.FC = () => {
  const { bankId } = useParams<{ bankId: string }>();
  const bank = banks.find(b => b.id === bankId);
  
  if (!bank) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Bank Not Found</h1>
          <Link to="/loan-rates" className="text-primary-600 hover:text-primary-700">
            Back to Loan Rates
          </Link>
        </div>
      </div>
    );
  }

  const bankLoanRates = loanRates.filter(rate => rate.bankId === bankId);

  const loanTypeNames = {
    personal: 'Personal Loan',
    home: 'Home Loan',
    business: 'Business Loan',
    car: 'Car Loan',
    education: 'Education Loan',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <div className="text-6xl">{bank.logo}</div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{bank.name}</h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{bank.rating}/5</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Building2 className="h-4 w-4" />
                    <span>Est. {bank.establishedYear}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{bank.headquarters}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={bank.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Visit Website</span>
              </a>
              <Link
                to="/eligibility"
                className="flex items-center justify-center space-x-2 border border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                <span>Check Eligibility</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Bank */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About {bank.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600 mb-1">
                    {bank.branches.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Branches</div>
                </div>
                <div className="text-center p-4 bg-secondary-50 rounded-lg">
                  <div className="text-2xl font-bold text-secondary-600 mb-1">
                    {bank.establishedYear}
                  </div>
                  <div className="text-sm text-gray-600">Established</div>
                </div>
                <div className="text-center p-4 bg-accent-50 rounded-lg">
                  <div className="text-2xl font-bold text-accent-600 mb-1">
                    {bank.rating}/5
                  </div>
                  <div className="text-sm text-gray-600">Customer Rating</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bank.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Loan Rates */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2" />
                Current Interest Rates
              </h2>
              
              <div className="space-y-4">
                {bankLoanRates.map((rate, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="mb-4 lg:mb-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {loanTypeNames[rate.loanType as keyof typeof loanTypeNames]}
                        </h3>
                        <div className="text-sm text-gray-600">
                          Last updated: {new Date(rate.lastUpdated).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Interest Rate</p>
                          <p className="text-lg font-bold text-primary-600">
                            {rate.minRate}% - {rate.maxRate}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Processing Fee</p>
                          <p className="text-sm font-semibold text-gray-900">{rate.processingFee}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Max Amount</p>
                          <p className="text-sm font-semibold text-gray-900">{rate.maxAmount}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Tenure</p>
                          <p className="text-sm font-semibold text-gray-900">{rate.tenure}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                        Apply for {loanTypeNames[rate.loanType as keyof typeof loanTypeNames]}
                      </button>
                      <Link
                        to={`/${rate.loanType}-loan-emi-calculator`}
                        className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
                      >
                        Calculate EMI
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Customer Care</p>
                    <p className="text-sm text-gray-600">{bank.customerCare}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Website</p>
                    <a 
                      href={bank.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      {bank.website.replace('https://', '')}
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Headquarters</p>
                    <p className="text-sm text-gray-600">{bank.headquarters}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/eligibility"
                  className="block w-full bg-primary-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Check Eligibility
                </Link>
                <Link
                  to="/calculators"
                  className="block w-full border border-primary-600 text-primary-600 text-center py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                >
                  EMI Calculator
                </Link>
                <Link
                  to="/ifsc-finder"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Find IFSC Code
                </Link>
              </div>
            </div>

            {/* Bank Rating */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Customer Rating</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">{bank.rating}/5</div>
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= bank.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">Based on customer reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;