import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { label: "Overview", key: "overview" },
  { label: "Eligibility", key: "eligibility" },
  { label: "Interest Rates", key: "rates" },
  { label: "Documents", key: "documents" },
  { label: "FAQs", key: "faqs" },
];

const tabContent = {
  overview: (
    <div>
      <h2 className="text-xl font-bold mb-2">What is a Home Loan?</h2>
      <p className="mb-4">A home loan is a secured loan that helps you purchase, construct, or renovate a residential property. Shriram Finance offers flexible EMIs, competitive rates, and fast approval for your dream home.</p>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        <li>Loan amount: Up to 90% of property value</li>
        <li>Flexible tenure: Up to 30 years</li>
        <li>Attractive interest rates</li>
        <li>Quick processing & minimal paperwork</li>
      </ul>
    </div>
  ),
  eligibility: (
    <div>
      <h2 className="text-xl font-bold mb-2">Eligibility Criteria</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        <li>Age: 21-65 years</li>
        <li>Stable income source (salaried/self-employed)</li>
        <li>Good credit history</li>
        <li>Property in approved locations</li>
      </ul>
    </div>
  ),
  rates: (
    <div>
      <h2 className="text-xl font-bold mb-2">Interest Rates & Charges</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        <li>Interest rate: 8.5% p.a. onwards*</li>
        <li>Processing fee: Up to 1% of loan amount</li>
        <li>No hidden charges</li>
      </ul>
      <div className="text-xs text-gray-400 mt-2">*Rates are indicative and may vary.</div>
    </div>
  ),
  documents: (
    <div>
      <h2 className="text-xl font-bold mb-2">Documents Required</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        <li>Identity & address proof</li>
        <li>Income proof (salary slips/ITR)</li>
        <li>Property documents</li>
        <li>Bank statements</li>
        <li>Photographs</li>
      </ul>
    </div>
  ),
  faqs: (
    <div>
      <h2 className="text-xl font-bold mb-2">Frequently Asked Questions</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        <li>What is the maximum loan tenure? <span className="font-semibold">Up to 30 years.</span></li>
        <li>Can I prepay my home loan? <span className="font-semibold">Yes, with minimal charges.</span></li>
        <li>Is a co-applicant allowed? <span className="font-semibold">Yes, to enhance eligibility.</span></li>
      </ul>
    </div>
  ),
};

const LoanTabs = () => {
  const [active, setActive] = useState("overview");
  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <div className="flex bg-white/60 rounded-xl shadow overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`flex-1 px-4 py-3 font-semibold text-sm transition-all focus:outline-none ${
              active === tab.key
                ? "bg-primary-600 text-white shadow"
                : "text-primary-700 hover:bg-primary-50"
            }`}
            onClick={() => setActive(tab.key)}
            tabIndex={0}
            aria-selected={active === tab.key}
            aria-controls={`tabpanel-${tab.key}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="relative bg-white/80 rounded-b-xl shadow p-6 min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            id={`tabpanel-${active}`}
            role="tabpanel"
          >
            {tabContent[active]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoanTabs;
