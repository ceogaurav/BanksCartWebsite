import React, { useState } from 'react';
import { CreditCard, Download, Eye, Edit, Phone, Mail, MapPin, Shield, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const AadharCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('download');

  const services = [
    {
      id: 'download',
      name: 'Download Aadhaar',
      icon: Download,
      description: 'Download your Aadhaar card online',
    },
    {
      id: 'update',
      name: 'Update Aadhaar',
      icon: Edit,
      description: 'Update your personal details',
    },
    {
      id: 'verify',
      name: 'Verify Aadhaar',
      icon: Shield,
      description: 'Verify Aadhaar number authenticity',
    },
    {
      id: 'status',
      name: 'Check Status',
      icon: Eye,
      description: 'Check application status',
    },
  ];

  const steps = [
    { step: 1, title: 'Enter Aadhaar Number', description: 'Provide your 12-digit Aadhaar number' },
    { step: 2, title: 'OTP Verification', description: 'Verify with OTP sent to registered mobile' },
    { step: 3, title: 'Download', description: 'Download your Aadhaar card PDF' },
  ];

  const updateTypes = [
    { name: 'Name', fee: 'Free', documents: 'Marriage Certificate, Gazette' },
    { name: 'Address', fee: 'Free', documents: 'Utility Bill, Bank Statement' },
    { name: 'Mobile Number', fee: 'Free', documents: 'Mobile Number Verification' },
    { name: 'Email ID', fee: 'Free', documents: 'Email Verification' },
    { name: 'Date of Birth', fee: '₹25', documents: 'Birth Certificate, School Certificate' },
    { name: 'Gender', fee: '₹25', documents: 'Medical Certificate' },
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
            Aadhaar Card Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete Aadhaar card services - Download, Update, Verify and Check Status online
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

        {/* Download Aadhaar */}
        {activeTab === 'download' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Download Aadhaar Card</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhaar Number *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 12-digit Aadhaar number"
                    maxLength={12}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name as per Aadhaar"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit PIN code"
                    maxLength={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="terms" className="rounded" />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the terms and conditions
                  </label>
                </div>

                <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                  Send OTP
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">How to Download</h3>
                <div className="space-y-4">
                  {steps.map((step) => (
                    <div key={step.step} className="flex items-start space-x-3">
                      <div className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{step.title}</p>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Important Notes</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Download is free of cost</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Valid for all government purposes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Digitally signed by UIDAI</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span>Keep your Aadhaar details confidential</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Update Aadhaar */}
        {activeTab === 'update' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Update Aadhaar Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {updateTypes.map((update, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{update.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">Fee: <span className="font-semibold text-green-600">{update.fee}</span></p>
                    <p className="text-sm text-gray-600 mb-4">Required: {update.documents}</p>
                    <button className="w-full bg-primary-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">
                      Update Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Update Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Online Update</h4>
                  <ol className="space-y-2 text-sm text-gray-700">
                    <li>1. Visit UIDAI self-service portal</li>
                    <li>2. Enter Aadhaar number and captcha</li>
                    <li>3. Verify with OTP</li>
                    <li>4. Upload required documents</li>
                    <li>5. Pay fees (if applicable)</li>
                    <li>6. Submit application</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Offline Update</h4>
                  <ol className="space-y-2 text-sm text-gray-700">
                    <li>1. Visit nearest Aadhaar center</li>
                    <li>2. Fill update form</li>
                    <li>3. Provide biometric verification</li>
                    <li>4. Submit required documents</li>
                    <li>5. Pay fees (if applicable)</li>
                    <li>6. Collect acknowledgment slip</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Verify Aadhaar */}
        {activeTab === 'verify' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Verify Aadhaar Number</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhaar Number *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 12-digit Aadhaar number"
                    maxLength={12}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Captcha *
                  </label>
                  <div className="flex space-x-3">
                    <div className="bg-gray-100 px-4 py-3 rounded-lg border text-lg font-mono">
                      ABC123
                    </div>
                    <input
                      type="text"
                      placeholder="Enter captcha"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                  Verify Aadhaar
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Verification Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Authenticity Check</p>
                    <p className="text-sm text-gray-600">Verify if Aadhaar number is genuine</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Status Verification</p>
                    <p className="text-sm text-gray-600">Check if Aadhaar is active or deactivated</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Eye className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Basic Details</p>
                    <p className="text-sm text-gray-600">View age range and gender (masked)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Check Status */}
        {activeTab === 'status' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Check Application Status</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enrollment/Update Request Number *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 14-digit URN/EID"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Captcha *
                  </label>
                  <div className="flex space-x-3">
                    <div className="bg-gray-100 px-4 py-3 rounded-lg border text-lg font-mono">
                      XYZ789
                    </div>
                    <input
                      type="text"
                      placeholder="Enter captcha"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                  Check Status
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Status Types</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-semibold text-green-800">Generated</p>
                    <p className="text-sm text-green-600">Aadhaar has been generated successfully</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-semibold text-yellow-800">Under Process</p>
                    <p className="text-sm text-yellow-600">Application is being processed</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-semibold text-red-800">Rejected</p>
                    <p className="text-sm text-red-600">Application has been rejected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AadharCard;