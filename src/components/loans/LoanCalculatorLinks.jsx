import React from "react";
import { motion } from "framer-motion";

const calculators = [
  { name: "Home Loan Calculator", url: "https://www.shriramfinance.in/home-loan-calculator" },
  { name: "Home Loan Eligibility Calculator", url: "https://www.shriramfinance.in/home-loan-eligibility-calculator" },
  { name: "Home Loan Part Pre Payment Calculator", url: "https://www.shriramfinance.in/home-loan-part-pre-payment-calculator" },
  { name: "Home Loan Tax Benefit Calculator", url: "https://www.shriramfinance.in/home-loan-tax-benefit-calculator" },
  { name: "Home Construction Loan Calculator", url: "https://www.shriramfinance.in/home-construction-loan-calculator" },
  { name: "Home Extension Loan Calculator", url: "https://www.shriramfinance.in/home-extension-loan-calculator" },
  { name: "Home Loan Balance Transfer Calculator", url: "https://www.shriramfinance.in/home-loan-balance-transfer-calculator" },
  { name: "Home Loan Affordability Calculator", url: "https://www.shriramfinance.in/home-loan-affordability-calculator" },
];

const LoanCalculatorLinks = () => (
  <section className="mt-12 max-w-2xl mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-center">Home Loan Calculators</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {calculators.map((calc, i) => (
        <motion.a
          key={calc.name}
          href={calc.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)" }}
          whileTap={{ scale: 0.98 }}
          className="block bg-white/70 rounded-xl shadow p-4 font-semibold text-primary-700 hover:bg-primary-50 transition-all text-center"
        >
          {calc.name}
        </motion.a>
      ))}
    </div>
  </section>
);

export default LoanCalculatorLinks;
