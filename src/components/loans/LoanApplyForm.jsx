import React, { useState } from "react";
import { motion } from "framer-motion";

const initial = { name: "", email: "", phone: "", amount: "" };

const LoanApplyForm = () => {
  const [form, setForm] = useState(initial);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setForm(initial), 2000);
  };

  return (
    <motion.section
      id="apply-form"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mt-8 max-w-xl mx-auto bg-white/80 backdrop-blur rounded-2xl shadow-xl p-8"
    >
      <h2 className="text-xl font-bold mb-4 text-primary-700">Quick Apply for Home Loan</h2>
      {submitted ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-green-600 font-semibold text-lg text-center"
        >
          Thank you! Your application has been submitted.
        </motion.div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Loan Amount</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-primary-700 transition-all"
          >
            Submit Application
          </button>
        </form>
      )}
    </motion.section>
  );
};

export default LoanApplyForm;
