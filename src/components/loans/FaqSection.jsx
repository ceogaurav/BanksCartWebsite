import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "What is the maximum personal loan amount I can get in India?",
    a: "Most leading Indian banks and NBFCs sanction personal loans up to ₹40 Lakhs to ₹50 Lakhs for eligible salaried individuals. The exact approved amount is determined by your net monthly take-home salary, employer categorization, existing debt obligations (FOIR), and credit score.",
  },
  {
    q: "How are personal loan interest rates calculated?",
    a: "Scheduled commercial banks calculate interest on a monthly reducing-balance basis. Under this method, interest is charged only on the outstanding principal at the end of each monthly cycle, not on the original sanctioned loan amount. Rates typically range from 10.25% to 24.00% p.a. depending on your risk profile.",
  },
  {
    q: "What is the minimum CIBIL score required for a personal loan?",
    a: "A CIBIL score of 720 or higher is generally considered ideal by major banks to qualify for prime interest rates and fast digital approval. While applicants with scores between 650 and 719 can still secure approval from select NBFCs, they may be charged higher processing fees and risk-adjusted interest margins.",
  },
  {
    q: "Can I prepay or foreclose my personal loan before the tenure ends?",
    a: "Yes. Per Reserve Bank of India (RBI) regulations, banks and NBFCs cannot charge any foreclosure fees or prepayment penalties on floating-rate term loans sanctioned to individual borrowers. For fixed-rate personal loans, lenders may levy a nominal foreclosure charge (typically 2% to 4% + GST) after an initial lock-in period of 6 to 12 months.",
  },
  {
    q: "What documents are required to apply for a personal loan online?",
    a: "Online digital applications typically require your PAN card, Aadhaar card (for DigiLocker e-KYC), last 3 months' salary slips, and latest 6 months' bank statements in PDF format or verified through NetBanking Account Aggregator.",
  },
  {
    q: "How does applying through BanksCart affect my credit score?",
    a: "Checking your eligibility, comparing quotes, and calculating EMIs on BanksCart involves only a soft credit check, which has zero negative impact on your CIBIL score. A formal credit inquiry (hard pull) is only triggered when you formally select a lender and consent to proceed with final loan underwriting.",
  },
];

const FaqSection = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className="my-14 font-ibm">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
          Clear Answers
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
          FAQs on Personal Loan Applications, Prepayment &amp; Foreclosure
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Everything you need to know about personal loan eligibility, interest rates, charges, and repayments.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={faq.q}
              className={`border rounded-xl bg-white shadow-sm transition-all duration-200 overflow-hidden ${
                isOpen ? "border-slate-900 ring-1 ring-slate-900/10" : "border-slate-200"
              }`}
            >
              <button
                type="button"
                className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-slate-900 focus:outline-none cursor-pointer"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base pr-4">{faq.q}</span>
                <span className="shrink-0 text-slate-500">
                  {isOpen ? <ChevronUp className="w-5 h-5 text-slate-900" /> : <ChevronDown className="w-5 h-5" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-4 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqSection;
