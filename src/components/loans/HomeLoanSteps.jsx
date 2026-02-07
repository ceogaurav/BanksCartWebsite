import React from "react";
import { motion } from "framer-motion";
import { FileText, UserCheck, CheckCircle, BadgeCheck } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Apply Online",
    desc: "Fill out our simple online application form in just a few minutes."
  },
  {
    icon: UserCheck,
    title: "Get Pre-Approval",
    desc: "Receive instant eligibility check and pre-approval decision."
  },
  {
    icon: CheckCircle,
    title: "Submit Documents",
    desc: "Upload or share your documents securely for verification."
  },
  {
    icon: BadgeCheck,
    title: "Loan Disbursal",
    desc: "Get your loan amount credited quickly after approval."
  }
];

const HomeLoanSteps = () => (
  <section className="mt-16 max-w-5xl mx-auto">
    <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {steps.map((step, i) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
          viewport={{ once: true }}
          className="flex flex-col items-center bg-white/80 rounded-2xl shadow-lg p-6"
        >
          <div className="bg-gradient-to-tr from-primary-600 to-secondary-600 p-4 rounded-full mb-4 shadow">
            <step.icon className="h-10 w-10 text-white" />
          </div>
          <div className="font-bold text-lg text-primary-700 mb-2 text-center">{step.title}</div>
          <div className="text-gray-700 text-center text-sm">{step.desc}</div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default HomeLoanSteps;
