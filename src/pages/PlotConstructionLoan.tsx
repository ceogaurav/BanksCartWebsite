import React, { useState } from 'react';
import { Home, Calculator, TrendingUp, MapPin, Building, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

const PlotConstructionLoan: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Home },
    { id: 'rates', name: 'Interest Rates', icon: TrendingUp },
    { id: 'eligibility', name: 'Eligibility', icon: CheckCircle },
    { id: 'process', name: 'Process', icon: Building },
  ];

  const bankRates = [
    { bank: 'SBI', logo: '🏦', rate: '8.50% - 9.25%', processingFee: '0.35%', maxAmount: '₹10 Cr', features: ['Government backing', 'Wide network'] },
    { bank: 'HDFC Bank', logo: '🏛️', rate: '8.75% - 9.50%', processingFee: '0.50%', maxAmount: '₹10 Cr', features: ['Quick processing', 'Digital services'] },
    { bank: 'ICICI Bank', logo: '🏢', rate: '8.70% - 9.45%', processingFee: '0.50%', maxAmount: '₹10 Cr', features: ['Online tracking', 'Fast approval'] },
    { bank: 'Axis Bank', logo: '🏪', rate: '8.80% - 9.60%', processingFee: '0.50%', maxAmount: '₹5 Cr', features: ['Flexible terms', 'Quick disbursal'] },
    { bank: 'Kotak Bank', logo: '🏦', rate: '8.60% - 9.40%', processingFee: '0.50%', maxAmount: '₹10 Cr', features: ['Premium service', 'Low rates'] },
  ];

  const loanStages = [
    {
      stage: 'Plot Purchase',
      percentage: '20-30%',
      description: 'Initial amount for plot purchase',
      documents: ['Sale deed', 'Title documents', 'NOC from authorities'],
    },
    {
      stage: 'Foundation',
      percentage: '15-20%',
      description: 'Foundation and basement work',
      documents: ['Approved building plan', 'Commencement certificate'],
    },
    {
      stage: 'Plinth Level',
      percentage: '20-25%',
      description: 'Ground floor slab completion',
      documents: ['Progress certificate', 'Engineer inspection'],
    },
    {
      stage: 'Roof Level',
      percentage: '20-25%',
      description: 'Roof slab completion',
      documents: ['Structural completion certificate'],
    },
    {
      stage: 'Completion',
      percentage: '15-20%',
      description: 'Final completion and handover',
      documents: ['Completion certificate', 'Occupancy certificate'],
    },
  ];

  const eligibilityCriteria = [
    { criteria: 'Age', requirement: '21-65 years at loan maturity' },
    { criteria: 'Income', requirement: 'Minimum ₹30,000 per month' },
    { criteria: 'Credit Score', requirement: '750+ for best rates' },
    { criteria: 'Employment', requirement: '3+ years work experience' },
    { criteria: 'Plot Ownership', requirement: 'Clear title and ownership documents' },
    { criteria: 'Approved Plan', requirement: 'Sanctioned building plan from local authority' },
  ];

  const requiredDocuments = [
    {
      category: 'Personal Documents',
      documents: ['PAN Card', 'Aadhaar Card', 'Passport size photos', 'Signature verification'],
    },
    {
      category: 'Income Documents',
      documents: ['Salary slips (3 months)', 'Bank statements (6 months)', 'Form 16', 'ITR (2 years)'],
    },
    {
      category: 'Property Documents',
      documents: ['Sale deed of plot', 'Title documents', 'Approved building plan', 'NOC from authorities'],
    },
    {
      category: 'Construction Documents',
      documents: ['Contractor agreement', 'Cost estimates', 'Construction timeline', 'Engineer certificates'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4 rounded-full">
              <Building className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Plot cum Construction Loan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Finance your plot purchase and construction with a single loan. Build your dream home with flexible disbursement options.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Features */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-primary-50 rounded-lg">
                  <MapPin className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Plot + Construction</h3>
                  <p className="text-sm text-gray-600">Single loan for both plot purchase and construction</p>
                </div>
                <div className="text-center p-6 bg-secondary-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-secondary-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Competitive Rates</h3>
                  <p className="text-sm text-gray-600">Starting from 8.50% per annum</p>
                </div>
                <div className="text-center p-6 bg-accent-50 rounded-lg">
                  <Building className="h-8 w-8 text-accent-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Stage-wise Disbursal</h3>
                  <p className="text-sm text-gray-600">Funds released as per construction progress</p>
                </div>
              </div>
            </div>

            {/* Loan Stages */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Disbursement Stages</h2>
              <div className="space-y-6">
                {loanStages.map((stage, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{stage.stage}</h3>
                        <p className="text-gray-600">{stage.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-primary-600">{stage.percentage}</span>
                        <p className="text-sm text-gray-500">of loan amount</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Required Documents:</p>
                      <div className="flex flex-wrap gap-2">
                        {stage.documents.map((doc, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Loan Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Tax Benefits</p>
                      <p className="text-sm text-gray-600">Deductions under Section 80C and 24B</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Flexible Tenure</p>
                      <p className="text-sm text-gray-600">Up to 30 years repayment period</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">High Funding</p>
                      <p className="text-sm text-gray-600">Up to 80% of total project cost</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">No Prepayment Penalty</p>
                      <p className="text-sm text-gray-600">After initial lock-in period</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Important Notes</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Construction Timeline</p>
                      <p className="text-sm text-gray-600">Must complete within agreed timeframe</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Interest During Construction</p>
                      <p className="text-sm text-gray-600">Simple interest on disbursed amount</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Building className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Approved Plans Required</p>
                      <p className="text-sm text-gray-600">Sanctioned building plan mandatory</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interest Rates Tab */}
        {activeTab === 'rates' && (
          <div className="space-y-6">
            {bankRates.map((bank, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <div className="text-3xl">{bank.logo}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{bank.bank}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {bank.features.map((feature, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Interest Rate</p>
                      <p className="text-lg font-bold text-primary-600">{bank.rate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Processing Fee</p>
                      <p className="text-lg font-semibold text-gray-900">{bank.processingFee}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Max Amount</p>
                      <p className="text-lg font-semibold text-gray-900">{bank.maxAmount}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                    Apply Now
                  </button>
                  <button className="flex-1 border border-primary-600 text-primary-600 py-2 px-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Eligibility Tab */}
        {activeTab === 'eligibility' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Eligibility Criteria</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {eligibilityCriteria.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">{item.criteria}</p>
                      <p className="text-sm text-gray-600">{item.requirement}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Required Documents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {requiredDocuments.map((category, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
                    <ul className="space-y-2">
                      {category.documents.map((doc, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                          <span className="text-sm text-gray-700">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Process Tab */}
        {activeTab === 'process' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Application Process</h2>
            
            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: 'Application Submission',
                  description: 'Submit loan application with required documents',
                  timeline: '1-2 days',
                },
                {
                  step: 2,
                  title: 'Document Verification',
                  description: 'Bank verifies all submitted documents',
                  timeline: '3-5 days',
                },
                {
                  step: 3,
                  title: 'Property Evaluation',
                  description: 'Technical and legal evaluation of plot and construction plan',
                  timeline: '7-10 days',
                },
                {
                  step: 4,
                  title: 'Credit Assessment',
                  description: 'Credit score check and income verification',
                  timeline: '2-3 days',
                },
                {
                  step: 5,
                  title: 'Loan Approval',
                  description: 'Final approval and sanction letter issuance',
                  timeline: '1-2 days',
                },
                {
                  step: 6,
                  title: 'Documentation',
                  description: 'Loan agreement signing and legal formalities',
                  timeline: '2-3 days',
                },
                {
                  step: 7,
                  title: 'First Disbursement',
                  description: 'Initial amount for plot purchase',
                  timeline: '1-2 days',
                },
              ].map((process, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                    {process.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{process.title}</h3>
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                        {process.timeline}
                      </span>
                    </div>
                    <p className="text-gray-600">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Total Processing Time</h3>
              <p className="text-gray-700">
                The entire process typically takes <strong>15-25 working days</strong> from application submission to first disbursement, 
                depending on document completeness and property verification.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlotConstructionLoan;