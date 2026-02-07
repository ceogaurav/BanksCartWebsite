import React from "react";
import { motion } from "framer-motion";
import ApplyButton from "../common/ApplyButton";

const LoanApplyCTA = ({ openApplyModal }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="mt-12 max-w-2xl mx-auto bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl shadow-xl p-8 flex flex-col items-center text-white text-center"
  >
    <h2 className="text-2xl font-bold mb-2">Ready to Apply for a Home Loan?</h2>
    <p className="mb-4 text-lg">Get instant approval, minimal paperwork, and expert support. Start your journey to your dream home today!</p>
    {openApplyModal && (
      <ApplyButton
        loanType="Home Loan"
        openApplyModal={openApplyModal}
        className="bg-white text-primary-700 font-semibold px-8 py-3 rounded-lg shadow hover:bg-primary-50 hover:text-primary-900 transition-all text-lg mt-2"
      >
        Apply Now
      </ApplyButton>
    )}
  </motion.section>
);

export default LoanApplyCTA;
