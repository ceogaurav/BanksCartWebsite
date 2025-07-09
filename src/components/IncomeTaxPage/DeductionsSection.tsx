import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

interface FAQSectionProps {
  openApplyModal?: (loanType?: string) => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({ openApplyModal }) => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is the basic exemption limit for income tax?",
      answer: "For FY 2024-25, the basic exemption limit under the new tax regime is ₹3 lakh, while under the old regime it's ₹2.5 lakh. Senior citizens (60-80 years) have a higher exemption limit of ₹3 lakh under the old regime, and super senior citizens (above 80 years) have ₹5 lakh exemption."
    },
    {
      question: "Should I choose the old or new tax regime?",
      answer: "The choice depends on your deductions and investments. If you have significant deductions under sections 80C, 80D, 24(b), etc., the old regime might be beneficial. If you have minimal deductions, the new regime with higher basic exemption and lower rates might save more tax. Use tax calculators to compare both scenarios."
    },
    {
      question: "What happens if I miss the ITR filing deadline?",
      answer: "Missing the ITR filing deadline (July 31) attracts penalties up to ₹5,000 (₹1,000 if income ≤ ₹5 lakhs). You can still file a belated return by December 31 of the assessment year. However, you cannot carry forward losses and may face additional interest charges."
    },
    {
      question: "How is PPF different from other tax-saving investments?",
      answer: "PPF offers triple tax benefits: deduction under 80C, tax-free interest, and tax-free maturity. It has a 15-year lock-in period, currently offers 7.1% interest, and allows partial withdrawals after 7 years. Unlike ELSS or tax-saving FDs, PPF provides guaranteed returns and complete tax exemption."
    },
    {
      question: "Can I revise my ITR after filing?",
      answer: "Yes, you can file a revised return if you discover errors or omissions in your original return. The revised return must be filed before the end of the assessment year or completion of assessment, whichever is earlier. For FY 2023-24, you can file revised returns until March 31, 2025."
    },
    {
      question: "What is TDS and how does it work?",
      answer: "TDS (Tax Deducted at Source) is advance tax collection by the payer. TDS is deducted on salary, interest, rent, professional fees, etc. The deducted amount is deposited with the government and credited to your account. You can claim TDS credit while filing ITR and get a refund if excess tax is deducted."
    },
    {
      question: "Are NRI taxation rules different?",
      answer: "Yes, NRIs are taxed only on Indian income. They have the same tax slabs but different TDS rates. NRIs must obtain a Tax Residency Certificate (TRC) to claim treaty benefits. Income from foreign sources is not taxable in India for NRIs, but they must file ITR if total Indian income exceeds basic exemption limit."
    },
    {
      question: "What are the advance tax payment rules?",
      answer: "If your tax liability exceeds ₹10,000, you must pay advance tax in four installments: 15% by June 15, 45% by September 15, 75% by December 15, and 100% by March 15. Failure to pay advance tax attracts interest @1% per month. Senior citizens with no business income are exempt from advance tax."
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to common income tax questions and clarify your doubts
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <HelpCircle className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="text-gray-400">
                    {expandedFAQ === index ? 
                      <ChevronUp className="h-6 w-6" /> : 
                      <ChevronDown className="h-6 w-6" />
                    }
                  </div>
                </div>
              </button>
              
              {expandedFAQ === index && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-indigo-100 mb-6">
              Our tax experts are here to help you with personalized guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openApplyModal && openApplyModal('Tax Consultation')}
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
              >
                Book Consultation
              </button>
              <a
                href="https://wa.me/919686859296"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-5 w-5" /> Live Chat Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;