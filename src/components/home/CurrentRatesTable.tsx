import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ExternalLink } from 'lucide-react';

const banks = [
  {
    id: 1,
    name: 'HDFC Bank',
    rate: '8.40%',
    link: '/resources/loan-rates',
  },
  {
    id: 2,
    name: 'ICICI Bank',
    rate: '8.60%',
    link: '/resources/loan-rates',
  },
  {
    id: 3,
    name: 'SBI',
    rate: '8.20%',
    link: '/resources/loan-rates',
  },
  {
    id: 4,
    name: 'Axis Bank',
    rate: '8.50%',
    link: '/resources/loan-rates',
  },
];

const CurrentRatesTable = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-primary-600" />
          <span>Current Loan Interest Rates</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-primary-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Bank</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Rate</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {banks.map((bank) => (
                <tr key={bank.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {bank.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {bank.rate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link
                      to={bank.link}
                      className="inline-flex items-center text-primary-600 hover:underline"
                    >
                      View <ExternalLink className="ml-1 h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CurrentRatesTable;
