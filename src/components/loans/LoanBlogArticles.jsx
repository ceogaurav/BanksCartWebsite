import React from "react";
import { motion } from "framer-motion";

const articles = [
  {
    title: "5 Tips to Get the Best Home Loan Rates",
    summary: "Learn how to secure the lowest interest rates and save on your home loan.",
    url: "#"
  },
  {
    title: "Home Loan Eligibility Explained",
    summary: "Understand the key factors that affect your eligibility for a home loan.",
    url: "#"
  },
  {
    title: "How to Improve Your CIBIL Score for Loans",
    summary: "Boost your credit score and increase your chances of loan approval.",
    url: "#"
  }
];

const LoanBlogArticles = () => (
  <section className="mt-12 max-w-4xl mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-center">Latest Articles & Tips</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {articles.map((a, i) => (
        <motion.a
          key={a.title}
          href={a.url}
          whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)" }}
          className="block bg-white/80 rounded-xl shadow-lg p-6 hover:bg-primary-50 transition-all"
          tabIndex={0}
          aria-label={a.title}
        >
          <div className="font-semibold text-primary-700 mb-2">{a.title}</div>
          <div className="text-gray-700 text-sm mb-2">{a.summary}</div>
          <span className="text-primary-600 font-bold text-xs">Read More &rarr;</span>
        </motion.a>
      ))}
    </div>
  </section>
);

export default LoanBlogArticles;
