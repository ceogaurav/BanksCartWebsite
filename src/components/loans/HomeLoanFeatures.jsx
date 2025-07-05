import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, Clock, Smile } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure & Trusted",
    desc: "Your data and transactions are protected with top-tier security."
  },
  {
    icon: TrendingUp,
    title: "Competitive Rates",
    desc: "Enjoy some of the lowest interest rates in the market."
  },
  {
    icon: Clock,
    title: "Quick Processing",
    desc: "Fast approvals and disbursals to help you move in sooner."
  },
  {
    icon: Smile,
    title: "Expert Support",
    desc: "Our team guides you at every step of your home loan journey."
  }
];

const HomeLoanFeatures = () => (
  <section className="mt-16 max-w-5xl mx-auto">
    <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Our Home Loan?</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
          viewport={{ once: true }}
          className="flex flex-col items-center bg-white/80 rounded-2xl shadow-lg p-6"
        >
          <div className="bg-gradient-to-tr from-primary-600 to-secondary-600 p-4 rounded-full mb-4 shadow">
            <f.icon className="h-10 w-10 text-white" />
          </div>
          <div className="font-bold text-lg text-primary-700 mb-2 text-center">{f.title}</div>
          <div className="text-gray-700 text-center text-sm">{f.desc}</div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default HomeLoanFeatures;
