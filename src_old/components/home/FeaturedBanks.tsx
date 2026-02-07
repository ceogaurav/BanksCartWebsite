import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ExternalLink } from 'lucide-react';
import { banks } from '../../data/banks';

const FeaturedBanks: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Bank Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare rates and apply with India's most trusted banks
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {banks.map((bank) => (
            <div
              key={bank.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{bank.logo}</div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{bank.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{bank.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/bank/${bank.id}`}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </Link>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Established</span>
                    <span className="font-semibold text-gray-900">{bank.establishedYear}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Branches</span>
                    <span className="font-semibold text-gray-900">{bank.branches.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Headquarters</span>
                    <span className="font-semibold text-gray-900">{bank.headquarters}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-sm font-medium text-gray-700">Key Features</p>
                  {bank.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <Link
                    to={`/loan-rates?bank=${bank.id}`}
                    className="flex-1 bg-primary-600 text-white text-center py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-sm font-semibold"
                  >
                    View Rates
                  </Link>
                  <Link
                    to={`/bank/${bank.id}`}
                    className="flex-1 border border-primary-600 text-primary-600 text-center py-2 px-4 rounded-lg hover:bg-primary-50 transition-colors text-sm font-semibold"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/loan-rates"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <span>View All Banks</span>
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBanks;