import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, XCircle, BookOpen, Lightbulb, TrendingUp, ArrowRight, ShieldCheck } from "lucide-react";

const tips = [
  {
    title: "Check Your Credit Score First",
    desc: "A CIBIL score of 720 or higher qualifies you for prime benchmark rates and expedited sanction.",
  },
  {
    title: "Avoid Multiple Concurrent Inquiries",
    desc: "Every hard inquiry temporarily reduces your score. Compare quotes on BanksCart with zero credit impact before applying.",
  },
  {
    title: "Keep FOIR Under 40% – 50%",
    desc: "Ensure your existing monthly loan EMIs plus proposed new EMI do not exceed half of your net monthly earnings.",
  },
  {
    title: "Verify Bank Statements Ahead of Time",
    desc: "Ensure regular salary credits reflect consistently in your primary operating bank account without recent un-cleared cheques.",
  },
];

const dosDonts = [
  {
    do: "Choose the shortest tenure you can comfortably afford to minimize total interest outflow over time.",
    dont: "Don’t borrow more than necessary simply because a higher pre-approved loan limit is offered by the bank.",
  },
  {
    do: "Read the Key Fact Statement (KFS) detailing the Annual Percentage Rate (APR) and processing fees.",
    dont: "Don’t ignore foreclosure, part-prepayment lock-in terms, or bounce penalties in the sanction letter.",
  },
  {
    do: "Set up auto-debit (e-NACH mandate) to ensure you never miss an EMI due date.",
    dont: "Don’t submit incomplete or expired KYC documents that trigger manual verification delays.",
  },
];

const glossary = [
  {
    term: "Annual Percentage Rate (APR)",
    def: "The comprehensive annualized cost of borrowing, comprising the nominal interest rate, processing fee, and mandatory administrative charges.",
  },
  {
    term: "Reducing-Balance Interest",
    def: "A method where interest is computed solely on the remaining unpaid principal at the end of each monthly billing cycle, reducing your total interest expense.",
  },
  {
    term: "Soft vs. Hard Credit Inquiry",
    def: "A soft inquiry checks your eligibility without affecting your credit rating. A hard inquiry is conducted upon formal loan underwriting and is recorded on your bureau report.",
  },
  {
    term: "Key Fact Statement (KFS)",
    def: "An RBI-mandated standardized document provided by lenders upfront, summarizing all fees, APR, repayment schedule, and grievance redressal channels.",
  },
];

const InfoSections = () => (
  <section className="my-14 space-y-10 font-ibm">
    {/* CIBIL Score Impact Section with Internal Links */}
    <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-800">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Credit Intelligence</span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">How Your CIBIL Score Determines Your Personal Loan Interest Rate</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Borrowers with scores of 750+ typically receive interest rate discounts up to 2.50% p.a. compared to applicants in the 650–700 bracket. Check your credit rating and download your full bureau analysis report free.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
          <Link
            to="/credit-score"
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold rounded-lg text-xs transition-colors text-center shadow-sm"
          >
            Check Free CIBIL Score
          </Link>
          <Link
            to="/credit-score/cibil-score-for-personal-loan"
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-lg text-xs transition-colors text-center"
          >
            Score for Personal Loan
          </Link>
        </div>
      </div>
    </div>

    {/* Tips for Approval Grid */}
    <div>
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
          Smart Borrowing
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
          How to Maximize Your Approval Chances at the Lowest Interest Rate
        </h3>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map((t, idx) => (
          <div key={t.title} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center font-bold text-sm mb-3">
                0{idx + 1}
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">{t.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Do's and Don'ts Table */}
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 bg-slate-50 border-b border-slate-200">
        <h3 className="font-bold text-slate-900 text-lg">Personal Loan Best Practices: Do&apos;s &amp; Don&apos;ts</h3>
        <p className="text-xs text-slate-600 mt-1">Key rules to protect your financial health and avoid costly debt traps.</p>
      </div>
      <div className="divide-y divide-slate-100">
        {dosDonts.map((item, idx) => (
          <div key={idx} className="grid sm:grid-cols-2 p-4 sm:p-6 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">Do</span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{item.do}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-red-800 uppercase tracking-wider block mb-1">Don&apos;t</span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{item.dont}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Financial Terms Glossary */}
    <div className="bg-slate-50 rounded-xl p-6 sm:p-8 border border-slate-200">
      <div className="mb-6">
        <h3 className="font-bold text-slate-900 text-lg">Personal Loan Glossary &amp; Essential Terms</h3>
        <p className="text-xs text-slate-600 mt-1">Key banking terminology explained in plain English per RBI regulatory definitions.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        {glossary.map((g) => (
          <div key={g.term} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">{g.term}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{g.def}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default InfoSections;
