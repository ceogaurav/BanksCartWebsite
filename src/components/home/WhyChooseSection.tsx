import React from 'react';
import { Scale, ShieldCheck, HeartHandshake, Zap, CheckCircle2, XCircle } from 'lucide-react';

export default function WhyChooseSection() {
  const benefits = [
    {
      icon: Scale,
      title: 'Unbiased Multi-Bank Algorithm',
      description: 'We rank loan offers strictly by lowest Total Cost of Borrowing (reducing APR, processing fees, and foreclosure terms), never by broker commissions.',
    },
    {
      icon: Zap,
      title: '100% Free Consumer Platform',
      description: 'BanksCart services are completely free for all borrowers. We never charge processing retainers, consulting fees, or hidden markups.',
    },
    {
      icon: ShieldCheck,
      title: 'Bank-Grade Data Privacy',
      description: 'Your financial documents and identity are secured with 256-bit SSL encryption. We enforce a zero-spam policy and never sell borrower data.',
    },
    {
      icon: HeartHandshake,
      title: 'RBI-Regulated Lending Partners',
      description: 'All 30+ lenders in our ecosystem are Scheduled Commercial Banks or RBI-registered NBFCs adhering strictly to Digital Lending Guidelines.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white font-ibm border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
            <span>Verified Platform Advantages</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Why Indian Borrowers Choose BanksCart
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Institutional objectivity, zero fees, and transparent loan terms designed to save you money over the entire life of your loan.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="bg-slate-50 rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-200"
              >
                <div>
                  <div className="w-11 h-11 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-900 mb-4 shadow-2xs">
                    <Icon className="w-5 h-5 text-blue-900" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Side-by-Side Comparison Box */}
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white">
          <h3 className="text-lg sm:text-xl font-bold mb-6 text-center sm:text-left">
            Traditional Loan Shopping vs BanksCart Digital Comparison
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            {/* Traditional */}
            <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700/80 space-y-3">
              <span className="font-bold text-slate-400 uppercase tracking-wider block text-xs">
                Traditional Offline Process
              </span>
              <ul className="space-y-2.5 text-slate-300">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Multiple physical branch visits with repetitive physical paperwork</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Multiple hard credit inquiries that lower your CIBIL score</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Hidden charges, misleading flat rates vs reducing balance interest</span>
                </li>
              </ul>
            </div>

            {/* BanksCart */}
            <div className="bg-slate-800/80 rounded-xl p-5 border border-emerald-500/30 space-y-3">
              <span className="font-bold text-emerald-400 uppercase tracking-wider block text-xs">
                BanksCart Online Marketplace
              </span>
              <ul className="space-y-2.5 text-slate-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Single 100% digital interface with instantaneous multi-bank quotes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Soft inquiries that preserve your official CIBIL credit rating</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Complete transparency with reducing APR and processing fee disclosures</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
