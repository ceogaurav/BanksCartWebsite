import React from "react";

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
    <section className="my-14">
      {/* What is a Personal Loan informational card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-gray-200 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            Financial Fundamentals
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
            What is an Unsecured Personal Loan?
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
            A personal loan is a multi-purpose, collateral-free credit facility provided by scheduled commercial banks and RBI-registered NBFCs. Unlike home or auto loans where the asset is hypothecated or mortgaged, personal loans require no security or guarantor for eligible salaried and self-employed applicants.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-xs sm:text-sm">
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0 mt-0.5">✓</div>
              <div>
                <strong className="text-gray-900 block">No Collateral Required</strong>
                <span className="text-gray-600">Borrow against your income and credit profile.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0 mt-0.5">✓</div>
              <div>
                <strong className="text-gray-900 block">Flexible End-Use</strong>
                <span className="text-gray-600">Funds can be used for medical, travel, wedding, or renovation.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0 mt-0.5">✓</div>
              <div>
                <strong className="text-gray-900 block">Fast Digital Disbursal</strong>
                <span className="text-gray-600">Instant approval and disbursal within 24 to 48 hours.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Attribution Card */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl p-6 sm:p-8 border border-blue-100/80">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Editorial Integrity & Expert Review
            </h3>
            <p className="text-xs text-gray-500">
              Content verified against latest RBI master directions and official bank schedules • Last Updated: October 2026
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Fact-Checked
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Author */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-start gap-4">
            <img
              src={author.photo}
              alt={author.name}
              width="56"
              height="56"
              style={{ aspectRatio: "1/1" }}
              loading="lazy"
              className="w-14 h-14 rounded-full object-cover border-2 border-teal-500 shrink-0"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <div className="font-bold text-gray-900 text-base">{author.name}</div>
                <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded uppercase">Author</span>
              </div>
              <div className="text-xs text-teal-800 font-medium mb-1">{author.designation}</div>
              <div className="text-xs text-gray-500 leading-relaxed mb-2">{author.bio}</div>
              <div className="text-[11px] text-gray-400 font-medium">{author.experience}</div>
            </div>
          </div>

          {/* Reviewer */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-start gap-4">
            <img
              src={reviewer.photo}
              alt={reviewer.name}
              width="56"
              height="56"
              style={{ aspectRatio: "1/1" }}
              loading="lazy"
              className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 shrink-0"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80";
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <div className="font-bold text-gray-900 text-base">{reviewer.name}</div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase">Reviewer</span>
              </div>
              <div className="text-xs text-blue-800 font-medium mb-1">{reviewer.designation}</div>
              <div className="text-xs text-gray-500 leading-relaxed mb-2">{reviewer.bio}</div>
              <div className="text-[11px] text-gray-400 font-medium">{reviewer.experience}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorReviewerSection;
