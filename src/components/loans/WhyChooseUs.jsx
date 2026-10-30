import React from "react";

const features = [
  {
    title: "Side-by-Side Comparison",
    desc: "Compare real APRs, processing charges, and tenure options across 15+ top scheduled banks and NBFCs transparently.",
    icon: (
      <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Zero Credit Impact Check",
    desc: "Check your loan eligibility and personalized loan quotes with soft credit checks that never hurt your CIBIL score.",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "100% Digital & Paperless",
    desc: "Experience end-to-end digital processing with Aadhaar DigiLocker e-KYC and electronic e-NACH mandate registration.",
    icon: (
      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Fast Disbursal Guarantee",
    desc: "Pre-approved applicants can get funds credited to their verified bank accounts in as fast as 4 to 24 hours.",
    icon: (
      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const WhyChooseUs = () => (
  <section className="my-14">
    <div className="text-center max-w-3xl mx-auto mb-10">
      <span className="inline-block bg-blue-50 text-blue-700 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
        Why Choose BanksCart
      </span>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
        Smarter Borrowing with Complete Confidence
      </h2>
      <p className="text-gray-600 text-sm sm:text-base mt-2">
        We empower borrowers across India with impartial rate comparisons, verified lending partners, and seamless digital onboarding.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((f) => (
        <div
          key={f.title}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:border-teal-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-gray-100 flex items-center justify-center mb-4">
              {f.icon}
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-2">
              {f.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {f.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default WhyChooseUs;
