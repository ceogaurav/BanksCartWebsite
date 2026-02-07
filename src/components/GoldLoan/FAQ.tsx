import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQProps {
  openApplyModal?: (loanType?: string) => void;
}

const FAQ: React.FC<FAQProps> = ({ openApplyModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What documents are required for a gold loan?',
      answer: 'You need valid photo ID (Aadhaar/Passport/PAN), address proof, and the gold jewelry/coins you want to pledge. No income proof is required.'
    },
    {
      question: 'How much loan can I get against my gold?',
      answer: 'You can get up to 90% of the current market value of your gold. The exact amount depends on the purity and weight of your gold.'
    },
    {
      question: 'What is the minimum and maximum loan amount?',
      answer: 'Minimum loan amount is ₹5,000 and maximum depends on the value of your gold. Most banks offer loans up to ₹1 crore.'
    },
    {
      question: 'How is the gold valued?',
      answer: 'Gold is valued based on current market rates, purity (karat), and weight. We use certified electronic gold testing machines for accurate assessment.'
    },
    {
      question: 'Can I prepay my gold loan?',
      answer: 'Yes, you can prepay your gold loan at any time. Some banks may charge a prepayment penalty, while others offer zero prepayment charges.'
    },
    {
      question: 'What happens if I default on my loan?',
      answer: 'If you default, the lender will auction your gold after proper notice. Any excess amount after loan settlement will be returned to you.'
    },
    {
      question: 'Are gold coins eligible for loans?',
      answer: 'Yes, gold coins of recognized brands like MMTC, banks, and certified mints are eligible for gold loans.'
    },
    {
      question: 'How long does it take to get the loan amount?',
      answer: 'Once your application is approved and gold is verified, the loan amount is disbursed within 30 minutes to your bank account.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to commonly asked questions about gold loans and our services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-lg mb-6">Our experts are here to help you 24/7</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919686859296"
                className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
              >
                Call Us: 9686-859-296
              </a>
              <a
                href="https://wa.me/919686859296"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300"
              >
                Chat with Expert
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;