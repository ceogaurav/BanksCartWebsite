import React from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "What is a home loan?",
    a: "A home loan is a secured loan to help you purchase, construct, or renovate a residential property."
  },
  {
    q: "What is the maximum tenure?",
    a: "Up to 30 years, depending on eligibility and lender policy."
  },
  {
    q: "Can I prepay my home loan?",
    a: "Yes, you can prepay with minimal charges."
  },
  {
    q: "What documents are required?",
    a: "Identity proof, address proof, income proof, property documents, bank statements, and photographs."
  },
  {
    q: "Is a co-applicant allowed?",
    a: "Yes, a co-applicant can help enhance your eligibility."
  },
];

const LoanFAQ = () => (
  <section className="mt-12 max-w-2xl mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <motion.div
          key={faq.q}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          viewport={{ once: true }}
          className="bg-white/70 rounded-xl shadow p-5"
        >
          <div className="font-semibold text-primary-700 mb-1">Q: {faq.q}</div>
          <div className="text-gray-700">A: {faq.a}</div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default LoanFAQ;
