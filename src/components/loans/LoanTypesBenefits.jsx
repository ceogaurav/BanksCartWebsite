import React from "react";

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
    tag: "No Property Hypothecation",
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
    title: "Transparent Fixed / Floating Rates",
    desc: "Clear reducing-balance interest calculations with zero hidden maintenance overheads.",
  },
  {
    title: "Fast Paperless Disbursals",
    desc: "Pre-approved applicants can receive direct bank transfers in as little as a few hours.",
  },
];

const LoanTypesBenefits = () => (
  <section className="my-14">
    <div className="text-center max-w-3xl mx-auto mb-10">
      <span className="inline-block bg-teal-50 text-teal-700 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
        Versatility
      </span>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
        Personal Loan Types & Core Benefits
      </h2>
      <p className="text-gray-600 text-sm sm:text-base mt-2">
        Tailored financial solutions designed to support every milestone with complete peace of mind.
      </p>
    </div>

    {/* Loan Types Grid */}
    <div className="mb-12">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
        Popular Personal Loan Categories
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {loanTypes.map((type) => (
          <div
            key={type.title}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:border-teal-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="font-bold text-gray-900 text-base">
                  {type.title}
                </h4>
                <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full shrink-0">
                  {type.tag}
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {type.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Benefits Grid */}
    <div>
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
        Why Choose an Unsecured Personal Loan?
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-2xl p-5 border border-blue-100 flex items-start gap-3.5"
          >
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">{b.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LoanTypesBenefits;
