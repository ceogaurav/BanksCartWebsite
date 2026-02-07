import React from "react";

const loanTypes = [
  { name: "Wedding Loan", desc: "For marriage expenses and ceremonies." },
  { name: "Medical Loan", desc: "For medical emergencies and treatments." },
  { name: "Travel Loan", desc: "For vacations and travel plans." },
  { name: "Home Renovation Loan", desc: "For home improvement and repairs." },
  { name: "Education Loan", desc: "For higher studies and skill development." },
  { name: "Debt Consolidation", desc: "To combine multiple debts into one." },
  { name: "Personal Use", desc: "For any other personal financial need." },
];

const benefits = [
  { icon: <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /></svg>, text: "Collateral-free loan" },
  { icon: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0V4m0 16v-4" /></svg>, text: "No end-use restriction" },
  { icon: <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 9V7a5 5 0 0 0-10 0v2" /><rect x="5" y="9" width="14" height="10" rx="2" /></svg>, text: "Loan amount up to ₹5 cr" },
  { icon: <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg>, text: "Repayment tenure up to 60 months" },
  { icon: <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>, text: "Top-up loan availability" },
  { icon: <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /></svg>, text: "Minimal documentation" },
  { icon: <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" /></svg>, text: "Quick disbursals" },
];

const LoanTypesBenefits = () => (
  <section className="my-12 rounded-xl bg-gradient-to-br from-blue-50 via-white to-teal-50 shadow-lg px-4 py-10 md:px-10 lg:px-20">
    <h2 className="text-3xl font-extrabold mb-6 text-gray-900 flex items-center gap-3">
      <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" /></svg>
      Types & Benefits of Personal Loan
    </h2>
    <div className="mb-8">
      <div className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-lg">
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /></svg>
        Personal Loan Types
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700 text-base">
        {loanTypes.map(type => (
          <li key={type.name} className="bg-white/80 hover:bg-blue-100 transition rounded-xl px-5 py-4 flex flex-col shadow group border border-blue-100">
            <span className="font-semibold text-blue-700 group-hover:text-teal-700 text-lg mb-1">{type.name}</span>
            <span className="text-xs text-gray-500">{type.desc}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="flex items-center gap-3 my-8">
      <span className="flex-1 h-px bg-gradient-to-r from-blue-200 via-gray-300 to-teal-200" />
      <span className="text-gray-400 font-semibold text-sm tracking-widest">BENEFITS</span>
      <span className="flex-1 h-px bg-gradient-to-l from-blue-200 via-gray-300 to-teal-200" />
    </div>
    <div className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-lg">
      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
      Key Benefits
    </div>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {benefits.map((b, i) => (
        <li key={b.text} className="flex items-center gap-4 bg-white/90 rounded-xl shadow-md p-4 border border-teal-100 hover:scale-[1.03] hover:shadow-lg transition">
          <span className="shrink-0">{b.icon}</span>
          <span className="text-gray-700 font-semibold text-base">{b.text}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default LoanTypesBenefits;
