import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Shield, FileText, Clock, CheckCircle, DollarSign, PiggyBank, Users, AlertTriangle } from 'lucide-react';
import HeroSection from '../components/IncomeTaxPage/HeroSection';
import TaxBrackets from '../components/IncomeTaxPage/TaxBrackets';
import DeductionsSection from '../components/IncomeTaxPage/DeductionsSection';
import PPFCalculator from '../components/IncomeTaxPage/PPFCalculator';
import FilingProcess from '../components/IncomeTaxPage/FilingProcess';
import ImportantDates from '../components/IncomeTaxPage/ImportantDates';
import FAQSection from '../components/IncomeTaxPage/FAQSection';

interface IncomeTaxPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const IncomeTaxPage: React.FC<IncomeTaxPageProps> = ({ openApplyModal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <main className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <HeroSection openApplyModal={openApplyModal} />
        
        {/* What is Income Tax Section */}
        <section id="tax-basics" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Understanding Income Tax</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A comprehensive guide to income tax in India - everything you need to know about taxation, filing, and optimization strategies.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-2xl shadow-xl">
                  <h3 className="text-2xl font-bold mb-4">What is Income Tax?</h3>
                  <p className="text-lg opacity-90">
                    Income tax is a direct tax levied by the government on the income earned by individuals, businesses, and other entities. In India, it's governed by the Income Tax Act, 1961, and administered by the Central Board of Direct Taxes (CBDT).
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <Shield className="h-8 w-8 text-blue-600 mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Direct Tax</h4>
                    <p className="text-sm text-gray-600">
                      Paid directly to the government by the taxpayer
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <TrendingUp className="h-8 w-8 text-green-600 mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Progressive Tax</h4>
                    <p className="text-sm text-gray-600">
                      Higher income attracts higher tax rates
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white p-8 rounded-2xl shadow-xl">
                  <h3 className="text-2xl font-bold mb-4">Types of Income</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5" />
                      <span>Salary Income</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5" />
                      <span>Business/Professional Income</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5" />
                      <span>Capital Gains</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5" />
                      <span>House Property Income</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5" />
                      <span>Other Sources</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TaxBrackets openApplyModal={openApplyModal} />
        <DeductionsSection openApplyModal={openApplyModal} />
        <PPFCalculator openApplyModal={openApplyModal} />
        <FilingProcess openApplyModal={openApplyModal} />
        <ImportantDates />
        <FAQSection openApplyModal={openApplyModal} />

        {/* Key Statistics Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Income Tax Statistics</h2>
              <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                Key facts and figures about income tax in India
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 p-8 rounded-2xl backdrop-blur-sm">
                  <Users className="h-12 w-12 text-white mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">7.4 Crore</div>
                  <div className="text-indigo-100">Total Taxpayers</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 p-8 rounded-2xl backdrop-blur-sm">
                  <DollarSign className="h-12 w-12 text-white mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">₹2.5 Lakh</div>
                  <div className="text-indigo-100">Basic Exemption Limit</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 p-8 rounded-2xl backdrop-blur-sm">
                  <Calculator className="h-12 w-12 text-white mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">30%</div>
                  <div className="text-indigo-100">Highest Tax Rate</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 p-8 rounded-2xl backdrop-blur-sm">
                  <FileText className="h-12 w-12 text-white mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">Jul 31</div>
                  <div className="text-indigo-100">Filing Deadline</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default IncomeTaxPage;