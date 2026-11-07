import React from 'react';
import { Search, ShieldCheck, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  openEligibilityModal?: (loanType?: string) => void;
}

export default function HowItWorksSection({ openEligibilityModal }: HowItWorksSectionProps) {
  const steps = [
    {
      step: '01',
      title: 'Compare Live Rates',
      description: 'Select your loan requirement and evaluate pre-vetted rates, APRs, and fees across 30+ top Indian banks.',
      icon: Search,
    },
    {
      step: '02',
      title: 'Soft Eligibility Check',
      description: 'Complete our 60-second digital check to view approved borrowing limits with zero penalty to your CIBIL score.',
      icon: ShieldCheck,
    },
    {
      step: '03',
      title: 'Digital Paperless KYC',
      description: 'Submit your Aadhaar, PAN, and salary documentation securely via our 256-bit bank-grade encryption channel.',
      icon: FileText,
    },
    {
      step: '04',
      title: 'Direct Bank Disbursal',
      description: 'Receive sanction terms and have approved funds deposited directly into your bank account in 24 to 48 hours.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 font-ibm border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 rounded text-xs font-bold text-blue-900 uppercase tracking-wider mb-3">
            <span>Seamless 4-Step Process</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How BanksCart Works for Borrowers
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            From initial multi-bank rate comparison to final disbursal in 4 transparent, fully digital steps.
          </p>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-200 relative group"
              >
                <div>
                  {/* Step Number & Icon Row */}
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                    <span className="text-2xl font-black text-slate-300 group-hover:text-blue-900 transition-colors tabular-nums">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-50 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <span>100% Free &amp; Digital</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => openEligibilityModal ? openEligibilityModal('Personal Loan') : null}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer text-sm sm:text-base"
          >
            <span>Start Your Loan Search Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
