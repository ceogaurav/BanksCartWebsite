import React, { useState } from 'react';
import { CreditCard, Download, Edit, Eye, FileText, Upload, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const PanCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('apply');

  const services = [
    {
      id: 'apply',
      name: 'Apply for PAN',
      icon: FileText,
      description: 'Apply for new PAN card',
    },
    {
      id: 'reprint',
      name: 'Reprint PAN',
      icon: Download,
      description: 'Reprint lost or damaged PAN',
    },
    {
      id: 'correction',
      name: 'PAN Correction',
      icon: Edit,
      description: 'Correct details in PAN card',
    },
    {
      id: 'verify',
      name: 'Verify PAN',
      icon: Eye,
      description: 'Verify PAN card details',
    },
  ];

  const panTypes = [
    { code: '49A', category: 'Individual', description: 'For individual applicants' },
    { code: '49AA', category: 'HUF', description: 'Hindu Undivided Family' },
    { code: '49B', category: 'Company', description: 'Body Corporate/Company' },
    { code: '49BA', category: 'Body of Individuals', description: 'Body of Individuals/Association of Persons' },
  ];

  const requiredDocuments = [
    { category: 'Identity Proof', documents: ['Aadhaar Card', 'Voter ID', 'Passport', 'Driving License'] },
    { category: 'Address Proof', documents: ['Aadhaar Card', 'Utility Bill', 'Bank Statement', 'Rent Agreement'] },
    { category: 'Date of Birth Proof', documents: ['Birth Certificate', 'School Certificate', 'Passport'] },
  ];

  const correctionTypes = [
    { type: 'Name Correction', fee: '₹110', documents: 'Name change gazette, Marriage certificate' },
    { type: 'Father\'s Name', fee: '₹110', documents: 'Birth certificate, School certificate' },
    { type: 'Date of Birth', fee: '₹110', documents: 'Birth certificate, School certificate' },
    { type: 'Address Change', fee: '₹110', documents: 'Address proof documents' },
    { type: 'Signature Change', fee: '₹110', documents: 'Signature verification documents' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4 rounded-full">
              <CreditCard className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PAN Card Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete PAN card services - Apply, Reprint, Correction and Verification online
          </p>
        </div>

        {/* Service Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === service.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{service.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Apply for PAN */}
        {activeTab === 'apply' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply for New PAN Card</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Type *
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option value="">Select application type</option>
                      {panTypes.map((type) => (
                        <option key={type.code} value={type.code}>
                          {type.code} - {type.category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Father's Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                    Proceed to Document Upload
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Required Documents</h3>
                  {requiredDocuments.map((doc, index) => (
                    <div key={index} className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">{doc.category}</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {doc.documents.map((document, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span>{document}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Processing Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span><strong>Processing Time:</strong> 15-20 working days</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-blue-500" />
                      <span><strong>Application Fee:</strong> ₹110 (including taxes)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      <span><strong>Validity:</strong> Lifetime (no renewal required)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reprint PAN */}
        {activeTab === 'reprint' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Reprint PAN Card</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PAN Number *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 10-digit PAN number"
                    maxLength={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name as per PAN"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                  Apply for Reprint
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Reprint Information</h3>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">When to Apply for Reprint?</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• PAN card is lost or stolen</li>
                    <li>• PAN card is damaged</li>
                    <li>• PAN card is not received after application</li>
                    <li>• Need additional copies</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Reprint Features</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Same PAN number retained</li>
                    <li>• Updated security features</li>
                    <li>• Home delivery available</li>
                    <li>• Digital copy via email</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Processing Details</h4>
                  <div className="text-sm text-blue-700 space-y-2">
                    <p><strong>Fee:</strong> ₹110 (including taxes)</p>
                    <p><strong>Processing Time:</strong> 15-20 working days</p>
                    <p><strong>Delivery:</strong> By post to registered address</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAN Correction */}
        {activeTab === 'correction' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">PAN Card Correction</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {correctionTypes.map((correction, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{correction.type}</h3>
                    <p className="text-sm text-gray-600 mb-3">Fee: <span className="font-semibold text-green-600">{correction.fee}</span></p>
                    <p className="text-sm text-gray-600 mb-4">Required: {correction.documents}</p>
                    <button className="w-full bg-primary-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">
                      Apply Correction
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Correction Process</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <p className="font-semibold text-gray-900">Fill Application Form</p>
                      <p className="text-sm text-gray-600">Complete Form 49A with correct details</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <p className="font-semibold text-gray-900">Attach Documents</p>
                      <p className="text-sm text-gray-600">Submit supporting documents for correction</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <p className="font-semibold text-gray-900">Pay Fees</p>
                      <p className="text-sm text-gray-600">Pay correction fees online</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <p className="font-semibold text-gray-900">Submit Application</p>
                      <p className="text-sm text-gray-600">Submit online or at PAN center</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Important Notes</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Original PAN Required</p>
                      <p className="text-sm text-gray-600">Submit copy of existing PAN card</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Same PAN Number</p>
                      <p className="text-sm text-gray-600">PAN number remains unchanged</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Processing Time</p>
                      <p className="text-sm text-gray-600">15-20 working days for completion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Verify PAN */}
        {activeTab === 'verify' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Verify PAN Card</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PAN Number *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 10-digit PAN number"
                    maxLength={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name as per PAN"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth (Optional)
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                  Verify PAN
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Verification Results</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-semibold text-green-800">Valid PAN</span>
                  </div>
                  <p className="text-sm text-green-700">PAN number is valid and active</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">PAN Number:</span>
                    <span className="font-semibold">ABCDE1234F</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-semibold">JOHN DOE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-semibold text-green-600">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-semibold">15-Jan-2024</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Verification Uses</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Income tax filing</li>
                    <li>• Bank account opening</li>
                    <li>• Investment verification</li>
                    <li>• Loan applications</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PanCard;