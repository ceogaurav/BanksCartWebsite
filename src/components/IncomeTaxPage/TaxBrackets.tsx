import React from 'react';
import { Calendar, Clock, AlertTriangle, Bell } from 'lucide-react';

const ImportantDates = () => {
  const deadlines = [
    {
      date: 'July 31, 2024',
      event: 'ITR Filing Deadline',
      description: 'Last date to file income tax returns for FY 2023-24 (individuals)',
      status: 'critical',
      icon: <AlertTriangle className="h-5 w-5" />
    },
    {
      date: 'October 31, 2024',
      event: 'Audit Cases Filing',
      description: 'ITR filing deadline for cases requiring tax audit',
      status: 'important',
      icon: <Bell className="h-5 w-5" />
    },
    {
      date: 'March 31, 2025',
      event: 'Financial Year End',
      description: 'Last date for tax-saving investments and expenses',
      status: 'upcoming',
      icon: <Calendar className="h-5 w-5" />
    },
    {
      date: 'June 30, 2025',
      event: 'First Quarter TDS',
      description: 'TDS payment deadline for Q1 FY 2025-26',
      status: 'upcoming',
      icon: <Clock className="h-5 w-5" />
    }
  ];

  const taxCalendar = [
    {
      quarter: 'Q1 (Apr-Jun)',
      advance: 'June 15',
      tds: 'July 7',
      description: 'First installment of advance tax (15% of total tax)'
    },
    {
      quarter: 'Q2 (Jul-Sep)',
      advance: 'September 15',
      tds: 'October 7',
      description: 'Second installment of advance tax (45% of total tax)'
    },
    {
      quarter: 'Q3 (Oct-Dec)',
      advance: 'December 15',
      tds: 'January 7',
      description: 'Third installment of advance tax (75% of total tax)'
    },
    {
      quarter: 'Q4 (Jan-Mar)',
      advance: 'March 15',
      tds: 'April 7',
      description: 'Fourth installment of advance tax (100% of total tax)'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'important':
        return 'bg-orange-50 border-orange-200';
      case 'upcoming':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'text-red-600';
      case 'important':
        return 'text-orange-600';
      case 'upcoming':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <section id="important-dates" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Important Tax Dates</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Keep track of crucial deadlines to avoid penalties and stay compliant
          </p>
        </div>

        {/* Key Deadlines */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Key Deadlines</h3>
          
          <div className="grid gap-6">
            {deadlines.map((deadline, index) => (
              <div key={index} className={`border-2 rounded-xl p-6 ${getStatusColor(deadline.status)}`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full ${getStatusColor(deadline.status)} ${getStatusTextColor(deadline.status)}`}>
                    {deadline.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-gray-900">{deadline.event}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusTextColor(deadline.status)} bg-white`}>
                        {deadline.date}
                      </span>
                    </div>
                    <p className="text-gray-700">{deadline.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tax Calendar */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Quarterly Tax Calendar</h3>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
              <h4 className="text-xl font-bold">Advance Tax & TDS Payment Schedule</h4>
              <p className="text-indigo-100 mt-2">
                Plan your tax payments throughout the year to avoid interest and penalties
              </p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {taxCalendar.map((period, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-indigo-100 p-3 rounded-full">
                        <Calendar className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h5 className="text-lg font-semibold text-gray-900">{period.quarter}</h5>
                        <p className="text-sm text-gray-600">{period.description}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Advance Tax:</span>
                          <span className="font-semibold text-gray-900">{period.advance}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">TDS Return:</span>
                          <span className="font-semibold text-gray-900">{period.tds}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Penalty Information */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Penalty & Interest Rates</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Late Filing Penalties
                </h4>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Up to ₹5,000 for late filing</li>
                  <li>• ₹1,000 if income ≤ ₹5 lakhs</li>
                  <li>• Interest @1% per month on tax due</li>
                  <li>• Additional penalties for concealment</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Advance Tax Interest
                </h4>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• 1% per month for shortfall</li>
                  <li>• Calculated from due date</li>
                  <li>• Simple interest (not compound)</li>
                  <li>• No interest if shortfall ≤ ₹10,000</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportantDates;