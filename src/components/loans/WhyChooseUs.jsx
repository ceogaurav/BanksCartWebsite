import React from "react";
import { Scale, ShieldCheck, Smartphone, Zap, Award, CheckCircle } from "lucide-react";

const features = [
  {
    title: "Side-by-Side Bank Comparison",
    desc: "Compare real APRs, processing charges, and tenure options across 30+ top scheduled banks and NBFCs with total transparency.",
    icon: Scale,
  },
  {
    title: "Zero Credit Score Impact",
    desc: "Check your pre-approved loan eligibility and personalized quotes using soft inquiries that never lower your CIBIL score.",
    icon: ShieldCheck,
  },
  {
    title: "100% Digital & Paperless",
    desc: "Experience frictionless digital onboarding with Aadhaar DigiLocker e-KYC and instantaneous e-NACH mandate setup.",
    icon: Smartphone,
  },
  {
    title: "Same-Day Disbursal Track",
    desc: "Eligible salaried applicants can receive sanctioned funds credited directly to their bank account in as little as 4 to 24 hours.",
    icon: Zap,
  },
];

const WhyChooseUs = () => (
  <section className="my-14 font-ibm">
    <div className="text-center max-w-3xl mx-auto mb-10">
      <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
        Why Choose BanksCart
      </span>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
        Smarter Borrowing with Complete Institutional Confidence
      </h2>
      <p className="text-slate-600 text-sm sm:text-base mt-2">
        We empower borrowers across India with impartial rate comparisons, verified lending partners, and seamless digital onboarding.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((f) => {
        const IconComponent = f.icon;
        return (
          <div
            key={f.title}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center mb-4 text-slate-900">
                <IconComponent className="w-6 h-6 text-slate-800" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">
                {f.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {f.desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Verified Guarantee</span>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

export default WhyChooseUs;
