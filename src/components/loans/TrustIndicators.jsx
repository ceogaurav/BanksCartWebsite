import React from "react";
import { ShieldCheck, Lock, CheckCircle2, Users } from "lucide-react";

const metrics = [
  {
    title: "30+ Partner Lenders",
    desc: "Direct partnerships with India's top scheduled commercial banks and RBI-registered NBFCs.",
    badge: "RBI Compliant",
    icon: ShieldCheck,
  },
  {
    title: "256-Bit SSL Security",
    desc: "Bank-grade TLS encryption ensures your personal, financial, and KYC data remains strictly confidential.",
    badge: "ISO 27001 Aligned",
    icon: Lock,
  },
  {
    title: "Zero Hidden Charges",
    desc: "100% transparent APR disclosures, processing fee schedules, and Key Fact Statements (KFS) upfront.",
    badge: "Fair Practices",
    icon: CheckCircle2,
  },
  {
    title: "Over 500,000 Borrowers",
    desc: "Trusted by loan applicants nationwide to compare rates, estimate EMIs, and apply with confidence.",
    badge: "Verified Platform",
    icon: Users,
  },
];

const TrustIndicators = () => (
  <section className="my-14 bg-slate-900 text-white rounded-2xl p-6 sm:p-10 border border-slate-800 font-ibm">
    <div className="text-center max-w-3xl mx-auto mb-10">
      <span className="inline-block bg-slate-800 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-700">
        Institutional Standards
      </span>
      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
        India&apos;s Independent Digital Lending Marketplace
      </h2>
      <p className="text-slate-300 text-sm sm:text-base mt-2">
        We adhere strictly to Reserve Bank of India (RBI) Digital Lending Directions to safeguard consumer rights, interest transparency, and data privacy.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((m) => {
        const IconComponent = m.icon;
        return (
          <div
            key={m.title}
            className="bg-slate-800/80 rounded-xl p-6 border border-slate-700/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-block bg-slate-700 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {m.badge}
                </span>
                <IconComponent className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="font-bold text-white text-base mb-2">
                {m.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {m.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

export default TrustIndicators;
