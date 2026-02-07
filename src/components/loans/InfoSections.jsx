import React from "react";

const tips = [
  "Maintain a good credit score (750+).",
  "Keep documents ready for quick processing.",
  "Apply for an amount you are eligible for.",
  "Avoid multiple loan applications at once.",
  "Ensure stable income and employment history."
];

const dosDonts = [
  { do: "Check your eligibility before applying", dont: "Don’t provide false information" },
  { do: "Compare offers from multiple lenders", dont: "Don’t ignore processing fees and charges" },
  { do: "Read all terms and conditions", dont: "Don’t miss EMI payments" },
];

const glossary = [
  { term: "APR", def: "Annual Percentage Rate – total yearly cost of the loan including fees." },
  { term: "Hard Inquiry", def: "A credit check that can impact your credit score." },
  { term: "Soft Inquiry", def: "A credit check that does not affect your credit score." },
  { term: "Processing Fee", def: "Fee charged by lender to process your loan application." },
  { term: "Foreclosure", def: "Repaying the loan before the end of tenure." },
];

const InfoSections = () => (
  <section className="my-12 rounded-xl bg-gradient-to-br from-blue-50 via-white to-teal-50 shadow-lg px-4 py-10 md:px-10 lg:px-20">
    <div className="flex flex-col items-center mb-8">
      <span className="inline-flex items-center gap-2 mb-1">
        <svg className="w-7 h-7 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Personal Loan Information & Tips</h2>
      </span>
      <span className="block w-24 h-1 bg-gradient-to-r from-blue-300 via-teal-300 to-yellow-200 rounded-full mb-2" />
    </div>
    {/* EMI Calculation */}
    <div className="mb-10">
      <div className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-lg">
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /></svg>
        How is EMI Calculated?
      </div>
      <div className="bg-white/90 rounded-xl p-5 text-gray-700 mb-2 shadow flex items-center gap-4">
        <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" /></svg>
        <span className="font-mono font-bold text-base">EMI = [P × r × (1 + r)<sup>n</sup>] / [(1 + r)<sup>n</sup> – 1]</span>
      </div>
      <span className="text-xs text-gray-500 ml-1">Where P = Principal, r = monthly interest rate, n = number of months</span>
      <div className="text-gray-600 text-sm mt-2">EMI depends on loan amount, interest rate, and tenure. Use our calculator above for instant results.</div>
    </div>
    <div className="border-b border-dashed border-blue-200 mb-10" />
    {/* Tips for Approval */}
    <div className="mb-10">
      <div className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-lg">
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
        Tips for Loan Approval
      </div>
      <ul className="list-disc pl-6 text-gray-700 text-base space-y-1">
        {tips.map(tip => <li key={tip}>{tip}</li>)}
      </ul>
    </div>
    <div className="border-b border-dashed border-blue-200 mb-10" />
    {/* Do's and Don'ts Table */}
    <div className="mb-10">
      <div className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-lg">
        <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" /></svg>
        Application Do's & Don'ts
      </div>
      <table className="min-w-full bg-white/90 rounded-xl shadow text-base border border-blue-100">
        <thead>
          <tr>
            <th className="px-4 py-3 bg-blue-50 text-left font-bold text-gray-700 rounded-tl-xl">Do's</th>
            <th className="px-4 py-3 bg-blue-50 text-left font-bold text-gray-700 rounded-tr-xl">Don'ts</th>
          </tr>
        </thead>
        <tbody>
          {dosDonts.map((row, i) => (
            <tr key={row.do} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-3 text-gray-700 font-medium">{row.do}</td>
              <td className="px-4 py-3 text-gray-700 font-medium">{row.dont}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="border-b border-dashed border-blue-200 mb-10" />
    {/* Foreclosure Procedure */}
    <div className="mb-10">
      <div className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-lg">
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /></svg>
        Loan Foreclosure Procedure
      </div>
      <ol className="list-decimal pl-6 text-gray-700 text-base space-y-1">
        <li>Contact your lender and request foreclosure.</li>
        <li>Submit required documents and pay foreclosure charges.</li>
        <li>Obtain a No Dues Certificate after payment.</li>
        <li>Collect all original documents from the lender.</li>
      </ol>
    </div>
    <div className="border-b border-dashed border-blue-200 mb-10" />
    {/* Glossary */}
    <div className="mb-4">
      <div className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-lg">
        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
        Common Terms Glossary
      </div>
      <ul className="text-gray-700 text-base space-y-1">
        {glossary.map(g => (
          <li key={g.term}><span className="font-semibold text-blue-700">{g.term}:</span> {g.def}</li>
        ))}
      </ul>
    </div>
  </section>
);

export default InfoSections;
