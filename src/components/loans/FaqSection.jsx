import React, { useState } from "react";
import { Link } from "react-router-dom";

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
    <section className="my-14">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-block bg-teal-50 text-teal-700 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          Clear Answers
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mt-2">
          Everything you need to know about personal loan eligibility, interest rates, charges, and repayments.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={faq.q}
            className={`border rounded-2xl bg-white shadow-sm transition-all duration-200 overflow-hidden ${
              open === i ? "border-teal-500 ring-1 ring-teal-200" : "border-gray-200"
            }`}
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left font-bold text-gray-900 focus:outline-none"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="text-sm sm:text-base pr-4">{faq.q}</span>
              <svg
                className={`w-5 h-5 text-gray-400 shrink-0 transform transition-transform duration-200 ${
                  open === i ? "rotate-180 text-teal-600" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open === i && (
              <div className="px-6 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-xs text-gray-500">
        Still have questions? Check our comprehensive{" "}
        <Link to="/loans/personal/overview" className="text-blue-600 font-semibold hover:underline">
          Personal Loan Knowledge Base & Overview Guide
        </Link>
        .
      </div>
    </section>
  );
};

export default FaqSection;
