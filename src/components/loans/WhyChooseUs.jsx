import React from "react";

const features = [
  {
    icon: (
      <svg
        className="w-8 h-8 text-teal-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0V4m0 16v-4m8-4h-4m-8 0H4" />
      </svg>
    ),
    title: "Compare & Choose the Best Offer",
    desc: "Easily compare offers from top banks and NBFCs to find the best deal for your needs.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    title: "Pre-approved Offers with Instant Disbursals",
    desc: "Get access to pre-approved personal loan offers and enjoy quick, hassle-free disbursals.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-orange-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    title: "Know Your Chances of Approval",
    desc: "Check your eligibility instantly and improve your chances of loan approval.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M16 3v4M8 3v4" />
      </svg>
    ),
    title: "End-to-End Digital Process",
    desc: "Experience a seamless, paperless application process from start to finish.",
  },
];

const WhyChooseUs = () => (
  <section className="my-12 bg-gradient-to-br from-blue-50 via-white to-teal-50 rounded-2xl shadow-xl border border-blue-100 p-6 md:p-12">
    <h2 className="text-3xl font-extrabold mb-10 text-gray-900 text-center tracking-tight drop-shadow-sm">
      Why Choose Bankscart?
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {features.map((f, idx) => (
        <div
          key={f.title}
          className="flex flex-col items-center text-center bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-2xl hover:-translate-y-1.5 hover:border-teal-300 transition-all duration-300 animate-fadeIn"
          style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'backwards' }}
        >
          <div className="mb-4 flex items-center justify-center">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-100 via-blue-50 to-white shadow-inner mb-2">
              {f.icon}
            </span>
          </div>
          <div className="font-bold text-lg mb-2 text-gray-800 tracking-wide">
            {f.title}
          </div>
          <div className="text-gray-600 text-base leading-relaxed">{f.desc}</div>
        </div>
      ))}
    </div>
    <style>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: none; }
      }
      .animate-fadeIn {
        animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1) both;
      }
    `}</style>
  </section>
);

export default WhyChooseUs;
