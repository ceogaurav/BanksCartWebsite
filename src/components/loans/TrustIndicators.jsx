import React from "react";

const awards = [
  {
    icon: (
      <svg
        className="w-10 h-10 text-yellow-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="8" r="6" />
        <path d="M5.5 21l1.5-4 2 2 2-2 2 2 2-2 1.5 4" />
      </svg>
    ),
    title: "10+ Years of Excellence",
    desc: "Awarded for a decade of trusted service in digital lending.",
  },
  {
    icon: (
      <svg
        className="w-10 h-10 text-teal-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M16 3v4M8 3v4" />
      </svg>
    ),
    title: "Certified Secure Platform",
    desc: "SSL encryption and data privacy certified.",
  },
  {
    icon: (
      <svg
        className="w-10 h-10 text-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 22s8-4 8-10V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "India’s Most Trusted Platform",
    desc: "Recognized by leading financial institutions.",
  },
  {
    icon: (
      <svg
        className="w-10 h-10 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: "Verified Customer Reviews",
    desc: "Thousands of 5-star ratings from real users.",
  },
];

const TrustIndicators = () => (
  <section className="my-12 rounded-xl bg-gradient-to-br from-blue-50 via-white to-teal-50 shadow-lg px-4 py-12 md:px-10 lg:px-24">
    <div className="flex flex-col items-center mb-8">
      <span className="inline-flex items-center gap-2 mb-2">
        <svg className="w-8 h-8 text-yellow-400 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="6" /><path d="M5.5 21l1.5-4 2 2 2-2 2 2 2-2 1.5 4" /></svg>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Trust Indicators</h2>
      </span>
      <span className="block w-24 h-1 bg-gradient-to-r from-yellow-300 via-blue-300 to-teal-300 rounded-full mb-2" />
      <p className="text-gray-500 text-center max-w-xl text-base">Our platform is recognized and trusted by thousands, backed by awards, certifications, and real customer reviews.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {awards.map((a, i) => (
        <div
          key={a.title}
          className="flex flex-col items-center text-center bg-white/90 rounded-2xl p-7 shadow-md border border-blue-100 hover:shadow-xl hover:border-teal-300 hover:scale-[1.04] transition-all duration-200 group relative overflow-hidden"
        >
          <div className="mb-4 group-hover:scale-110 transition-transform duration-200">{a.icon}</div>
          <div className="font-bold text-lg mb-1 text-gray-800 group-hover:text-teal-700 transition-colors duration-200">
            {a.title}
          </div>
          <div className="text-gray-600 text-sm leading-relaxed">{a.desc}</div>
          <span className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-200 to-teal-200 w-8 h-8 rounded-full opacity-20 blur-lg" />
        </div>
      ))}
    </div>
  </section>
);

export default TrustIndicators;
