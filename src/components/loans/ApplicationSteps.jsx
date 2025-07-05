import React from "react";

const steps = [
  {
    title: "Enter Mobile Number",
    desc: "Start your application by entering your mobile number for verification.",
    icon: (
      <svg
        className="w-8 h-8 text-teal-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="18" r="1" />
      </svg>
    ),
  },
  {
    title: "Provide Personal Details",
    desc: "Fill in your name, date of birth, and employment details.",
    icon: (
      <svg
        className="w-8 h-8 text-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a7.5 7.5 0 0 1 13 0" />
      </svg>
    ),
  },
  {
    title: "Enter OTP Verification",
    desc: "Verify your identity with a secure OTP sent to your mobile.",
    icon: (
      <svg
        className="w-8 h-8 text-orange-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Select Loan Purpose & Amount",
    desc: "Choose your loan amount and specify the purpose for faster approval.",
    icon: (
      <svg
        className="w-8 h-8 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0V4m0 16v-4" />
      </svg>
    ),
  },
  {
    title: "Compare Offers & Apply",
    desc: "View personalized offers, compare, and submit your application online.",
    icon: (
      <svg
        className="w-8 h-8 text-purple-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];

const ApplicationSteps = () => (
  <section className="my-16">
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 via-white to-teal-50 rounded-3xl shadow-2xl p-10 border border-blue-100">
      <h2 className="text-3xl font-extrabold mb-8 text-blue-900 text-center tracking-tight drop-shadow">
        How to Apply for a Personal Loan
      </h2>
      <div className="flex flex-col md:flex-row gap-10 items-center">
        {/* Banner illustration */}
        <div className="flex-1 flex justify-center mb-8 md:mb-0">
          <div className="w-56 h-56 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
            <svg
              className="w-40 h-40 text-blue-300 drop-shadow-lg"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 64 64"
            >
              <rect x="12" y="16" width="40" height="32" rx="6" />
              <path d="M32 28v8" />
              <circle cx="32" cy="40" r="2" />
            </svg>
          </div>
        </div>
        {/* Steps */}
        <ol className="flex-1 space-y-8 relative">
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 to-teal-200 rounded-full hidden md:block" style={{zIndex:0}}></div>
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="flex items-start gap-5 relative z-10 group"
            >
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-white shadow-lg border-2 border-blue-100 p-2 mb-1 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-200 to-teal-200 mx-auto hidden md:block"></div>
                )}
              </div>
              <div>
                <div className="font-bold text-blue-900 text-lg md:text-xl mb-1 flex items-center gap-2">
                  <span className="inline-block bg-blue-100 text-blue-700 rounded px-2 py-0.5 text-xs font-semibold shadow-sm">Step {i + 1}</span>
                  {step.title}
                </div>
                <div className="text-gray-700 text-base md:text-lg leading-relaxed">
                  {step.desc}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-10 text-xs text-blue-500 text-center italic">
        <span className="inline-flex items-center gap-1">
          <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
          The process is 100% digital and can be completed in minutes!
        </span>
      </div>
    </div>
  </section>
);

export default ApplicationSteps;
