import React, { useState } from "react";

const faqs = [
  {
    q: "What is the maximum tenure for a personal loan?",
    a: "Most banks and NBFCs offer personal loans with a tenure of up to 60 months (5 years). The maximum loan tenure may vary depending on the lender, your credit profile, and the type of personal loan. Choosing a longer tenure can help reduce your EMI amount, making your monthly payments more affordable. Always check the loan agreement for tenure details before applying for a personal loan online.",
  },
  {
    q: "How is the interest rate for a personal loan decided?",
    a: "Interest rates for personal loans are determined by several factors, including your credit score, monthly income, employer category, loan amount, and the lender's internal policies. A higher credit score (750+) can help you secure a lower interest rate. It's recommended to compare personal loan interest rates from multiple banks and NBFCs to find the best offer. Use our online comparison tool to get the lowest personal loan rates instantly.",
  },
  {
    q: "What is the minimum salary required for a personal loan?",
    a: "Most lenders require a minimum monthly salary of ₹15,000 for salaried applicants to be eligible for a personal loan. However, the minimum income criteria may differ based on the city, employer, and the lender's risk assessment. Meeting the minimum salary requirement increases your chances of personal loan approval and helps you access higher loan amounts at better interest rates.",
  },
  {
    q: "What documents are required for a personal loan?",
    a: "To apply for a personal loan, you need to submit KYC documents such as proof of identity (Aadhaar, PAN), proof of address, income proof (salary slips, bank statements), and recent passport-size photographs. Some lenders may also ask for employment proof or Form 16. Having all required documents ready ensures a faster and smoother personal loan approval process.",
  },
  {
    q: "What happens if I miss an EMI payment?",
    a: "Missing an EMI (Equated Monthly Instalment) payment can result in penalty charges, late fees, and a negative impact on your credit score. Consistent EMI defaults may lead to legal action and difficulty in getting future loans or credit cards. Always set reminders or use auto-debit facilities to pay your personal loan EMIs on time and maintain a healthy credit history.",
  },
  {
    q: "How do I apply for a personal loan online?",
    a: "To apply for a personal loan online, visit the lender's website or use our online loan application platform. Fill in your personal and financial details, upload the required documents, and submit your application. The process is quick, secure, and paperless. You can check your eligibility, compare offers, and get instant approval for a personal loan from top banks and NBFCs in India.",
  },
];

const FaqSection = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="my-12 rounded-xl bg-gradient-to-br from-blue-50 via-white to-teal-50 shadow-lg px-4 py-10 md:px-10 lg:px-20">
      <div className="flex flex-col items-center mb-8">
        <span className="inline-flex items-center gap-2 mb-1">
          <svg className="w-7 h-7 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Frequently Asked Questions</h2>
        </span>
        <span className="block w-24 h-1 bg-gradient-to-r from-blue-300 via-teal-300 to-yellow-200 rounded-full mb-2" />
      </div>
      <div className="space-y-5">
        {faqs.map((faq, i) => (
          <div key={faq.q} className={`border rounded-2xl bg-white/90 shadow-md transition-all duration-200 ${open === i ? 'ring-2 ring-teal-300' : ''}`}>
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-300 rounded-2xl"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              aria-controls={`faq-${i}`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                {faq.q}
              </span>
              <svg className={`w-5 h-5 ml-2 transform transition-transform ${open === i ? "rotate-180 text-teal-600" : "rotate-0 text-gray-400"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
            </button>
            {open === i && (
              <div id={`faq-${i}`} className="px-6 pb-5 text-gray-700 text-base border-t animate-fade-in">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
