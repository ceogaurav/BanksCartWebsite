import React, { useState } from 'react';
import { Search, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';

const Status: React.FC = () => {
  const [applicationId, setApplicationId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (applicationId && mobileNumber) {
      setShowResults(true);
    }
  };

  const sampleApplication = {
    id: 'APP123456',
    bankName: 'HDFC Bank',
    loanType: 'Personal Loan',
    amount: 500000,
    status: 'under-review',
    appliedDate: '2024-01-10',
    timeline: [
      { date: '2024-01-10', status: 'Application Submitted', completed: true },
      { date: '2024-01-12', status: 'Document Verification', completed: true },
      { date: '2024-01-15', status: 'Credit Assessment', completed: false },
      { date: '', status: 'Approval Decision', completed: false },
      { date: '', status: 'Loan Disbursement', completed: false },
    ],
    documents: [
      { name: 'PAN Card', status: 'verified' },
      { name: 'Aadhaar Card', status: 'verified' },
      { name: 'Salary Slips', status: 'submitted' },
      { name: 'Bank Statements', status: 'pending' },
    ],
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'submitted':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
      default:
        return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Check Application Status
          </h1>
          <p className="text-xl text-gray-600">
            Track your loan application status and get real-time updates
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application ID *
              </label>
              <input
                type="text"
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
                placeholder="Enter your application ID"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registered Mobile Number *
              </label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter your mobile number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Search className="h-4 w-4" />
            <span>Check Status</span>
          </button>
        </div>

        {/* Results */}
        {showResults && (
          <div className="space-y-6">
            {/* Application Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Application Overview</h2>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Under Review
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Application ID</p>
                  <p className="font-semibold text-gray-900">{sampleApplication.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Bank</p>
                  <p className="font-semibold text-gray-900">{sampleApplication.bankName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Loan Type</p>
                  <p className="font-semibold text-gray-900">{sampleApplication.loanType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Loan Amount</p>
                  <p className="font-semibold text-gray-900">₹{sampleApplication.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Applied Date</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(sampleApplication.appliedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Application Timeline</h3>
              
              <div className="space-y-4">
                {sampleApplication.timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`mt-1 p-1 rounded-full ${
                      event.completed 
                        ? 'bg-green-100 text-green-600' 
                        : index === 2 
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {event.completed ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : index === 2 ? (
                        <Clock className="h-4 w-4" />
                      ) : (
                        <div className="h-4 w-4 border-2 border-current rounded-full" />
                      )}
                    </div>
                    <div>
                      <p className={`font-semibold ${
                        event.completed ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {event.status}
                      </p>
                      {event.date && (
                        <p className="text-sm text-gray-600">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Document Status</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sampleApplication.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(doc.status)}
                      <span className="font-medium text-gray-900">{doc.name}</span>
                    </div>
                    <span className={`text-sm font-semibold capitalize ${
                      doc.status === 'verified' ? 'text-green-600' : 
                      doc.status === 'submitted' ? 'text-yellow-600' : 
                      'text-gray-500'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Next Steps</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  • Please submit your bank statements to complete the documentation process
                </p>
                <p className="text-gray-700">
                  • Our team will contact you within 24 hours for any additional requirements
                </p>
                <p className="text-gray-700">
                  • You can expect a decision on your application within 3-5 business days
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;