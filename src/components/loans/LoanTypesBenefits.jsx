import React from "react";
import { CheckCircle2, Sparkles, Layers, ShieldCheck } from "lucide-react";

const loanTypes = [
  {
    title: "Debt Consolidation",
    desc: "Merge high-cost credit cards and multiple smaller loans into one single lower-interest EMI.",
    tag: "High Savings",
  },
  {
    title: "Medical & Healthcare",
    desc: "Immediate funds for unexpected medical emergencies, hospital bills, or elective procedures.",
    tag: "Instant Disbursal",
  },
  {
    title: "Home Renovation",
    desc: "Finance home repairs, interior furnishing, painting, or solar rooftop installations without mortgaging property.",
    tag: "No Collateral",
  },
  {
    title: "Wedding & Celebrations",
    desc: "Cover banquet venue bookings, catering, jewelry, and ceremony costs stress-free.",
    tag: "Flexible Repayment",
  },
  {
    title: "Travel & Vacations",
    desc: "Fund domestic or international holiday trips, flight bookings, and holiday packages.",
    tag: "Fast Approval",
  },
  {
    title: "Higher Education & Skill Upgrade",
    desc: "Pay upfront certification, executive courses, coding bootcamps, or relocation fees.",
    tag: "Career Boost",
  },
];

const benefits = [
  {
    title: "100% Collateral-Free",
    desc: "No need to pledge fixed deposits, gold, or property deeds as security.",
  },
  {
    title: "No End-Use Restrictions",
    desc: "Use the sanctioned funds for any legitimate personal, family, or emergency expense.",
  },
  {
    title: "High Loan Cap Up to ₹50 Lakhs",
    desc: "Substantial borrowing limits tailored to your income level and credit track record.",
  },
  {
    title: "Tenure Flexibility up to 72 Months",
    desc: "Choose monthly repayment schedules from 1 to 6 years matching your cash flow.",
  },
  {
    title: "Transparent Reducing-Balance Rates",
    desc: "Clear reducing-balance interest calculations with zero hidden maintenance overheads.",
  },
  {
    title: "Fast Paperless Disbursals",
    desc: "Pre-approved applicants can receive direct bank transfers in as little as a few hours.",
  },
];

const LoanTypesBenefits = () => (
  <section className="my-14 font-ibm">
    {/* Common Purposes */}
    <div className="text-center max-w-3xl mx-auto mb-10">
      <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
        Versatile Financing
      </span>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
        Popular Purposes for Personal Loans in India
      </h2>
      <p className="text-slate-600 text-sm sm:text-base mt-2">
        Personal loans offer unconditional end-use flexibility, making them suitable for planned milestones and unforeseen emergencies.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
      {loanTypes.map((t) => (
        <div
          key={t.title}
          className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                {t.tag}
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              {t.title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.desc}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* Key Benefits Grid */}
    <div className="bg-slate-50 rounded-2xl p-6 sm:p-10 border border-slate-200">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
          Core Advantages of Borrowing via BanksCart
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Enjoy streamlined banking with zero brokerage, unbiased comparisons, and bank-grade data encryption.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((b) => (
          <div key={b.title} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200 font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">{b.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LoanTypesBenefits;
