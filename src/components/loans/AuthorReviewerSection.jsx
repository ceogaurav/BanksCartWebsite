import React from "react";
import { CheckCircle2, ShieldCheck, UserCheck, Calendar } from "lucide-react";

const author = {
  name: "Amit Sharma",
  designation: "Senior Finance Advisor & Banking Analyst",
  experience: "10+ years in retail lending and banking research",
  photo: "/images/avatar1.jpg",
  bio: "Specializes in unsecured retail lending, benchmark interest rate analysis, and consumer debt planning.",
};

const reviewer = {
  name: "Priya Mishra",
  designation: "Certified Credit Counselor & Financial Risk Analyst",
  experience: "12+ years in credit risk assessment and regulatory compliance",
  photo: "/images/avatar3.jpg",
  bio: "Audits consumer credit products, RBI fair practice compliance, and borrower affordability standards.",
};

const AuthorReviewerSection = () => {
  return (
    <section className="my-14 font-ibm">
      {/* What is a Personal Loan informational card */}
      <div className="bg-white rounded-xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-200 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border border-slate-200">
            Financial Fundamentals
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight mb-4">
            What is an Unsecured Personal Loan?
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
            A personal loan is a multi-purpose, collateral-free credit facility provided by scheduled commercial banks and RBI-registered NBFCs. Unlike home or auto loans where the asset is hypothecated or mortgaged, personal loans require no security or guarantor for eligible salaried and self-employed applicants.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs sm:text-sm">
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0 mt-0.5 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-slate-900 block font-semibold">No Collateral Required</strong>
                <span className="text-slate-600">Borrow against your income and credit profile.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0 mt-0.5 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-slate-900 block font-semibold">Flexible End-Use</strong>
                <span className="text-slate-600">Funds can be used for medical, travel, wedding, or renovation.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0 mt-0.5 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-slate-900 block font-semibold">Fast Digital Disbursal</strong>
                <span className="text-slate-600">Instant approval and disbursal within 24 to 48 hours.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Attribution Card */}
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>BanksCart Editorial Standards &amp; Fact-Checking Policy</span>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Last Updated: Monthly Benchmark Cycle 2026</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex items-start gap-3.5">
            <img
              src={author.photo}
              alt={author.name}
              className="w-12 h-12 rounded-full object-cover border border-slate-300 shrink-0"
              loading="lazy"
            />
            <div>
              <div className="text-xs text-slate-500 font-medium">Written &amp; Analyzed By</div>
              <div className="font-bold text-slate-900 text-sm">{author.name}</div>
              <div className="text-xs text-slate-600 mt-0.5">{author.designation}</div>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{author.bio}</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <img
              src={reviewer.photo}
              alt={reviewer.name}
              className="w-12 h-12 rounded-full object-cover border border-slate-300 shrink-0"
              loading="lazy"
            />
            <div>
              <div className="text-xs text-slate-500 font-medium">Reviewed &amp; Compliance Checked By</div>
              <div className="font-bold text-slate-900 text-sm">{reviewer.name}</div>
              <div className="text-xs text-slate-600 mt-0.5">{reviewer.designation}</div>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{reviewer.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorReviewerSection;
