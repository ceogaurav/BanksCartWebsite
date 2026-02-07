import React, { useState } from 'react';
import ApplyButton from './common/ApplyButton';

const faqData = [
  {
    category: 'Getting Started',
    questions: [
      { q: 'What is the minimum amount to start an FD?', a: 'You can start an FD with as little as ₹10,000 at BanksCart.' },
      { q: 'How do I open an FD account online?', a: 'Simply click “Start Investing Today”, complete KYC, and fund your account.' },
      { q: 'What documents are required?', a: 'Basic KYC documents: PAN, Aadhaar, and address proof.' },
      { q: 'Can NRIs invest in FDs?', a: 'Yes, NRIs can invest in NRE/NRO FDs as per RBI guidelines.' },
    ]
  },
  {
    category: 'Interest & Returns',
    questions: [
      { q: 'How is FD interest calculated?', a: 'Interest is compounded quarterly for cumulative FDs and paid monthly for payout FDs.' },
      { q: 'What is compound interest in FDs?', a: 'Interest earned is added to the principal, so you earn interest on interest.' },
      { q: 'When is interest paid out?', a: 'At maturity for cumulative FDs, monthly for payout FDs.' },
      { q: 'Are returns guaranteed?', a: 'Yes, FD returns are fixed and guaranteed.' },
    ]
  },
  {
    category: 'Withdrawal & Premature Closure',
    questions: [
      { q: 'Can I withdraw FD before maturity?', a: 'Yes, with a nominal penalty as per policy.' },
      { q: 'What are the penalty charges?', a: 'Usually 0.5% to 1% lower interest for the withdrawn amount.' },
      { q: 'How to close FD online?', a: 'Login to your account, select the FD, and choose “Close FD”.' },
      { q: 'Partial withdrawal facility?', a: 'Available for select FDs. Check product terms.' },
    ]
  },
  {
    category: 'Loans & Additional Services',
    questions: [
      { q: 'How to get loan against FD?', a: 'Apply online, get up to 90% of FD value as loan.' },
      { q: 'What is the loan-to-value ratio?', a: 'Up to 90% of FD value.' },
      { q: 'Interest rates for FD loans?', a: 'Usually 1-2% above FD rate.' },
      { q: 'Automatic renewal options?', a: 'Yes, you can opt for auto-renewal at maturity.' },
    ]
  },
];

interface FAQSectionProps {
  openApplyModal?: (loanType?: string) => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({ openApplyModal }) => {
  const [open, setOpen] = useState<{cat: number, q: number} | null>(null);
  const [search, setSearch] = useState('');

  // Filtered questions by search
  const filtered = faqData.map((cat) => ({
    ...cat,
    questions: cat.questions.filter(q =>
      q.q.toLowerCase().includes(search.toLowerCase()) ||
      q.a.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <section id="fd-faq" className="w-full bg-[#F0F9FF] py-16 px-2 md:px-0 flex flex-col items-center">
      <div className="max-w-4xl w-full flex flex-col gap-8 animate-fadeInUp">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E40AF] mb-2 font-inter">Everything You Need to Know About Fixed Deposits</h2>
        </div>
        <input
          type="text"
          placeholder="Search FAQs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 text-lg font-poppins mb-6 focus:ring-2 focus:ring-[#059669]"
        />
        <div className="flex flex-col gap-6">
          {filtered.map((cat, catIdx) => (
            <div key={cat.category}>
              <div className="text-xl font-bold text-[#059669] mb-2">{cat.category}</div>
              <div className="flex flex-col gap-2">
                {cat.questions.map((q, qIdx) => (
                  <div key={q.q} className="bg-white rounded-xl shadow p-4">
                    <button
                      className="w-full text-left flex justify-between items-center font-semibold text-[#1E40AF] text-lg focus:outline-none"
                      onClick={() => setOpen(open && open.cat === catIdx && open.q === qIdx ? null : {cat: catIdx, q: qIdx})}
                      aria-expanded={(open && open.cat === catIdx && open.q === qIdx) ? 'true' : 'false'}
                    >
                      {q.q}
                      <span className={`ml-2 transition-transform ${open && open.cat === catIdx && open.q === qIdx ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {open && open.cat === catIdx && open.q === qIdx && (
                      <div className="mt-2 text-gray-700 text-base animate-fadeIn">
                        {q.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          {openApplyModal && (
            <ApplyButton
              loanType="Fixed Deposit - FAQ"
              openApplyModal={openApplyModal}
              className="bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white font-poppins text-lg px-8 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition"
            >
              Still have questions? Talk to an expert
            </ApplyButton>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
