import React from "react";

const metrics = [
  {
    title: "15+ Partner Lenders",
    desc: "Direct integrations with India's top scheduled commercial banks and RBI-registered NBFCs.",
    badge: "RBI Compliant",
  },
  {
    title: "256-Bit SSL Security",
    desc: "Bank-grade encryption ensures your personal, financial, and KYC data remains strictly confidential.",
    badge: "ISO 27001 Aligned",
  },
  {
    title: "Zero Hidden Charges",
    desc: "100% transparent APR disclosures, processing fee schedules, and KFS breakdown upfront.",
    badge: "Fair Practices",
  },
  {
    title: "Over 500,000 Users",
    desc: "Trusted by loan applicants nationwide to compare rates, estimate EMIs, and apply with ease.",
    badge: "Verified Platform",
  },
];

const TrustIndicators = () => (
  <section className="my-14 bg-gradient-to-br from-slate-50 to-teal-50/40 rounded-3xl p-6 sm:p-10 border border-teal-100">
    <div className="text-center max-w-3xl mx-auto mb-10">
      <span className="inline-block bg-teal-100/70 text-teal-800 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
        Institutional Standards
      </span>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
        India's Trusted Digital Lending Marketplace
      </h2>
      <p className="text-gray-600 text-sm sm:text-base mt-2">
        We adhere strictly to Reserve Bank of India (RBI) Digital Lending Directions to safeguard consumer rights and data privacy.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((m) => (
        <div
          key={m.title}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between"
        >
          <div>
            <span className="inline-block bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-3">
              {m.badge}
            </span>
            <h3 className="font-bold text-gray-900 text-base mb-2">
              {m.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {m.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TrustIndicators;
