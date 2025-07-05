import React from 'react';
import { FileText, CheckCircle, Clock, AlertTriangle, User, Upload, Send } from 'lucide-react';

const FilingProcess = () => {
  const steps = [
    {
      id: 1,
      title: 'Gather Documents',
      description: 'Collect all necessary documents including Form 16, investment proofs, and receipts',
      icon: <FileText className="h-6 w-6" />,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'bg-blue-100 text-blue-600',
      documents: ['Form 16/16A', 'Bank statements', 'Investment proofs', 'Rent receipts', 'Medical bills']
    },
    {
      id: 2,
      title: 'Choose ITR Form',
      description: 'Select the appropriate ITR form based on your income sources and amount',
      icon: <User className="h-6 w-6" />,
      color: 'bg-green-50 border-green-200',
      iconColor: 'bg-green-100 text-green-600',
      documents: ['ITR-1: Salary income', 'ITR-2: Capital gains', 'ITR-3: Business income', 'ITR-4: Presumptive income']
    },
    {
      id: 3,
      title: 'Fill & Upload',
      description: 'Fill the ITR form with accurate details and upload supporting documents',
      icon: <Upload className="h-6 w-6" />,
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'bg-purple-100 text-purple-600',
      documents: ['Online filing portal', 'Offline utility', 'Tax software', 'CA assistance']
    },
    {
      id: 4,
      title: 'Verify & Submit',
      description: 'Verify your return using Aadhaar OTP, Net Banking, or physical verification',
      icon: <Send className="h-6 w-6" />,
      color: 'bg-orange-50 border-orange-200',
      iconColor: 'bg-orange-100 text-orange-600',
      documents: ['Aadhaar OTP', 'Net Banking', 'Demat account', 'ITR-V posting']
    }
  ];

  const itrForms = [
    {
      form: 'ITR-1 (Sahaj)',
      eligibility: 'Salary, one house property, other sources',
      income: 'Up to ₹50 lakhs',
      complexity: 'Simple',
      color: 'bg-green-100 text-green-800'
    },
    {
      form: 'ITR-2',
      eligibility: 'No business income, capital gains',
      income: 'Any amount',
      complexity: 'Moderate',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      form: 'ITR-3',
      eligibility: 'Business/professional income',
      income: 'Any amount',
      complexity: 'Complex',
      color: 'bg-orange-100 text-orange-800'
    },
    {
      form: 'ITR-4 (Sugam)',
      eligibility: 'Presumptive business income',
      income: 'Up to ₹50 lakhs',
      complexity: 'Moderate',
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  return (
    <section id="filing-process" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Income Tax Filing Process</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Step-by-step guide to filing your income tax return in India
          </p>
        </div>

        {/* Filing Steps */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className={`border-2 rounded-2xl p-8 ${step.color} relative`}>
                <div className="flex items-start space-x-6">
                  <div className={`p-4 rounded-full ${step.iconColor} flex-shrink-0`}>
                    {step.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">
                        Step {step.id}: {step.title}
                      </h3>
                      <div className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-600">
                        {step.id}/4
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-6 text-lg">{step.description}</p>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {step.documents.map((doc, docIndex) => (
                        <div key={docIndex} className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-700">{doc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white p-2 rounded-full shadow-lg">
                      <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ITR Forms Guide */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Choose the Right ITR Form</h3>
            <p className="text-lg text-gray-600">
              Select the appropriate form based on your income sources and eligibility
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {itrForms.map((form, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-bold text-gray-900">{form.form}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${form.color}`}>
                    {form.complexity}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Eligibility</div>
                    <div className="text-gray-900 font-medium">{form.eligibility}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Income Limit</div>
                    <div className="text-gray-900 font-medium">{form.income}</div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span className="text-sm text-gray-700">
                      Consult a tax professional for complex scenarios
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filing Tips */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Pro Filing Tips</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Before Filing
                </h4>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Keep all documents organized</li>
                  <li>• Pre-fill utility for faster filing</li>
                  <li>• Verify bank account details</li>
                  <li>• Check previous year's return</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Common Mistakes to Avoid
                </h4>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Wrong ITR form selection</li>
                  <li>• Missing investment proofs</li>
                  <li>• Incorrect bank account details</li>
                  <li>• Not verifying the return</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilingProcess;