import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Amit S.",
    text: "The home loan process was smooth and transparent. I got my dream home with minimal paperwork and quick approval!",
    location: "Delhi"
  },
  {
    name: "Priya R.",
    text: "Excellent customer support and competitive rates. Highly recommend for anyone looking for a home loan!",
    location: "Bangalore"
  },
  {
    name: "Ravi K.",
    text: "The online application was easy and the team guided me at every step. Thank you for making my home buying journey stress-free!",
    location: "Hyderabad"
  }
];

const LoanTestimonials = () => (
  <section className="mt-12 max-w-3xl mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-center">What Our Customers Say</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          viewport={{ once: true }}
          className="bg-white/80 rounded-xl shadow-lg p-6 flex flex-col items-center"
        >
          <div className="text-primary-700 font-semibold mb-2">{t.name}</div>
          <div className="text-gray-700 italic mb-2">"{t.text}"</div>
          <div className="text-xs text-gray-500">{t.location}</div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default LoanTestimonials;
