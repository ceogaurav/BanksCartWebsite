import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Target, // Used for Financial Goals & EMI Calculation
  Shield, // Used for Credit Score Defense
  Activity, // Used for Tenure/Timeline
  TrendingDown, // Used for Over-Borrowing
  Briefcase, // Used for Hidden Liabilities
  Users, // Used for Multiple Inquiries
  Feather, // Used for Non-Essential Use
  CheckSquare, // Used for Legal/Documentation Check
  Gavel, // Used for Default/Repayment Issues
  Zap, // Used for CTA
} from "lucide-react";
import { Link } from "react-router-dom";

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "Top 10 Mistakes to Avoid While Taking a Loan in India";
const ARTICLE_SUBTITLE =
  "The essential checklist for every Indian borrower: From comparing APRs and decoding the fine print to securing your credit score and avoiding the long-tenure debt trap.";
const BACK_LINK = "/blogs/finance-strategy";
const AUTHOR = "Insider Banking Analyst";
const DATE = "Nov 19, 2025";
const READ_TIME = "20 min read (Mistake-Proofing Manual)";
// --- CONFIGURATION END ---

// ====================================================================
// FRAMEWORK COMPONENTS (Replicating the modular structure)
// ====================================================================

// Framer Motion variants (Reused for consistent, smooth interaction)
const pageVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 20,
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Reusable components for consistent styling and animation
const SectionHeader: React.FC<{ children: React.ReactNode; icon: React.ReactElement }> = ({ children, icon }) => (
  <motion.div variants={itemVariants} className="flex items-center space-x-4 mb-4 mt-12">
    {React.cloneElement(icon, { className: "w-8 h-8 text-indigo-400" })}
    <h2 className="text-2xl font-bold text-indigo-100">{children}</h2>
  </motion.div>
);

const SubHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <motion.h3 variants={itemVariants} className={`text-xl font-semibold text-yellow-300 mt-6 mb-3 ${className}`}>
    {children}
  </motion.h3>
);

const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.p variants={itemVariants} className="text-gray-300 leading-relaxed mb-4">
    {children}
  </motion.p>
);

const KeyTakeaway: React.FC<{ children: React.ReactNode; icon: React.ReactElement }> = ({ children, icon }) => (
  <motion.div
    variants={itemVariants}
    className="bg-indigo-900/50 p-4 rounded-lg border-l-4 border-yellow-400 my-6 shadow-xl flex items-start space-x-3"
  >
    {React.cloneElement(icon, { className: "w-5 h-5 mt-1 text-yellow-400 flex-shrink-0" })}
    <p className="text-sm text-yellow-200 font-medium">
      <span className="font-bold">Key Takeaway:</span> {children}
    </p>
  </motion.div>
);

const BulletPoint: React.FC<{ children: React.ReactNode; icon: React.ReactElement }> = ({ children, icon }) => (
  <motion.li variants={itemVariants} className="text-gray-300 mb-2 flex items-start space-x-3">
    {React.cloneElement(icon, { className: "w-4 h-4 mt-1 text-teal-400 flex-shrink-0" })}
    <span>{children}</span>
  </motion.li>
);

// ====================================================================
// MAIN ARTICLE CONTENT
// ====================================================================

const LoanMistakesToAvoid: React.FC = () => {
  const checkIcon = <CheckSquare />;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <motion.article
          initial="hidden"
          animate="visible"
          variants={pageVariants}
          className="p-6 bg-gray-800 rounded-xl shadow-2xl"
        >
          {/* --- ARTICLE HEADER --- */}
          <motion.div variants={itemVariants} className="mb-10 border-b border-indigo-700 pb-6">
            <Link to={BACK_LINK} className="text-indigo-400 hover:text-indigo-300 flex items-center mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Finance Strategy
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-2">{ARTICLE_TITLE}</h1>
            <p className="text-lg text-gray-400 mb-4 italic">{ARTICLE_SUBTITLE}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>By: {AUTHOR}</span>
              <span>Published: {DATE}</span>
              <span className="font-semibold text-teal-400">{READ_TIME}</span>
            </div>
          </motion.div>

          {/* --- ARTICLE BODY --- */}
          <Paragraph>
            Taking a loan is one of the biggest financial decisions an individual or business in India can make. It can be a powerful tool for growth or a catastrophic source of stress. While much attention is given to *how* to get a loan, avoiding common pitfalls is equally crucial. A single mistake can lead to a higher **APR (Annual Percentage Rate)**, severe damage to your **CIBIL Score**, or even legal action.
          </Paragraph>

          <Paragraph>
            Based on an analysis of borrower behavior and banking rejection data, we have compiled the **Top 10 Mistakes** that Indian borrowers consistently make. Mastering this list is the key to minimizing the cost of borrowing and securing your financial future.
          </Paragraph>

          <motion.div variants={itemVariants} className="my-8 h-px bg-indigo-700" />


          {/* MISTAKE 1: BORROWING MORE THAN REQUIRED */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader icon={<TrendingDown />}>1. Borrowing More Than You Actually Need</SectionHeader>
            <Paragraph>
              The temptation to round up the loan amount "just in case" is pervasive. However, every extra rupee borrowed comes with an associated interest cost. This mistake dramatically increases your **total interest outgo** and unnecessarily inflates your monthly **EMI (Equated Monthly Instalment)**.
            </Paragraph>
            <SubHeader>The Debt-Burden Trap</SubHeader>
            <Paragraph>
              Lenders calculate your **Debt-to-Income (DTI)** or **Fixed Obligation to Income Ratio (FOIR)**. Borrowing more than necessary pushes this ratio higher, signaling increased risk to future lenders, potentially impacting your ability to get credit down the line—even if you've been timely on repayments.
            </Paragraph>
            <KeyTakeaway icon={<Zap />}>
              Calculate your exact requirement, add a maximum 10% buffer for contingencies, and stick to that number. Never borrow based on the maximum amount a lender offers you.
            </KeyTakeaway>
          </motion.section>

          {/* MISTAKE 2: IGNORING THE TRUE APR */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader icon={<Target />}>2. Focusing Only on the Interest Rate, Ignoring the APR</SectionHeader>
            <Paragraph>
              Many borrowers look only at the quoted **interest rate (e.g., 10% p.a.)**. The crucial mistake is ignoring the **Annual Percentage Rate (APR)**. The APR includes the interest rate *plus* all additional costs like processing fees, administrative charges, and mandatory insurance premiums, providing the true cost of the loan.
            </Paragraph>
            <SubHeader>The Hidden Costs of Flat Rate Loans</SubHeader>
            <Paragraph>
              Be especially cautious of "flat rate" interest loans (common in consumer durable loans) versus "reducing balance" loans (common in home loans and personal loans). A flat rate loan will almost always cost significantly more because the interest is calculated on the original principal amount for the entire tenure, even as you repay it.
            </Paragraph>
          </motion.section>
          
          {/* MISTAKE 3: SKIPPING THE FINE PRINT */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader icon={<CheckSquare />}>3. Failing to Read the Loan Agreement’s Fine Print</SectionHeader>
            <Paragraph>
              The loan document is a legal contract, not a suggestion. Ignoring the fine print can lead to painful financial surprises, particularly regarding pre-closure penalties and late payment charges.
            </Paragraph>
            <SubHeader>Key Clauses to Scrutinize:</SubHeader>
            <motion.ul variants={pageVariants} className="list-disc ml-6 space-y-2">
              <BulletPoint icon={checkIcon}>
                **Pre-payment/Pre-closure Charges:** Is there a penalty (e.g., 2-5% of the outstanding principal) if you want to pay off the loan early? RBI rules often exempt floating rate home loans, but personal loans and fixed-rate loans may apply charges.
              </BulletPoint>
              <BulletPoint icon={checkIcon}>
                **Missed EMI Penalty:** How high are the late payment fees? These can quickly compound.
              </BulletPoint>
              <BulletPoint icon={checkIcon}>
                **Bounce Charges:** What is the penalty for a failed ECS/NACH debit? (This also impacts your CIBIL score).
              </BulletPoint>
            </motion.ul>
            <KeyTakeaway icon={<Shield />}>
              Always ask your Relationship Manager for a clear, line-item breakdown of all fees and penalties before signing. No exceptions.
            </KeyTakeaway>
          </motion.section>

          {/* MISTAKE 4: NOT CHECKING CIBIL SCORE BEFORE APPLYING */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader icon={<Shield />}>4. Applying Without Reviewing Your Credit Score (CIBIL)</SectionHeader>
            <Paragraph>
              If your CIBIL score is low (typically under 750), applying for a loan will likely lead to a rejection. The mistake is not the low score itself, but applying *despite* it. A loan rejection is recorded on your credit report, which further lowers your score and makes the next application harder.
            </Paragraph>
            <SubHeader>Identifying and Correcting Errors</SubHeader>
            <Paragraph>
              Many reports contain errors—a loan shown as 'active' when it's closed, or a late payment reported incorrectly. Always obtain your full credit report, check it for discrepancies, and initiate a dispute resolution process *before* seeking a loan.
            </Paragraph>
          </motion.section>
          
          {/* MISTAKE 5: APPLYING TO TOO MANY LENDERS */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader icon={<Users />}>5. Applying to Multiple Lenders Simultaneously</SectionHeader>
            <Paragraph>
              Submitting applications to 3-4 banks in one week to compare offers is a significant red flag. Each application triggers a **'Hard Inquiry'** on your credit report. Multiple hard inquiries in a short period make you look **'credit-hungry'** or desperate for funds, leading most lenders to reject your application or offer a much higher interest rate.
            </Paragraph>
            <KeyTakeaway icon={<Target />}>
              Use a **'Soft Inquiry'** tool or a marketplace to check your eligibility and rate *pre-approvals* without impacting your score. Apply formally to only the single best offer.
            </KeyTakeaway>
          </motion.section>

          {/* MISTAKE 6: OPTING FOR A LONGER TENURE */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader icon={<Activity />}>6. Choosing a Longer Tenure for the Sake of Lower EMIs</SectionHeader>
            <Paragraph>
              A longer repayment tenure drastically lowers your monthly EMI, making the loan feel affordable. However, this is a financial mirage. The primary mistake is failing to calculate the **total interest paid** over the extended period, which can sometimes be double or triple the principal amount.
            </Paragraph>
            <SubHeader>The Power of Compounding Works Against You</SubHeader>
            <Paragraph>
              For example, a ₹20 lakh loan at 10% p.a. costs you ₹12.9 lakhs in interest over 10 years, but it costs over ₹25.1 lakhs in interest over 20 years. Always choose the **shortest tenure** that you can comfortably manage without straining your monthly budget.
            </Paragraph>
          </motion.section>

          {/* MISTAKE 7: DELAYING OR SKIPPING EMI PAYMENTS */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader icon={<Gavel />}>7. Treating EMI Repayments Casually (Delaying or Skipping)</SectionHeader>
            <Paragraph>
              This is perhaps the most damaging mistake. Every single day a payment is late is recorded by the credit bureau. Missing a payment by more than 30 days can instantly drop a high CIBIL score by **50 to 100 points**, making future borrowing extremely difficult and expensive.
            </Paragraph>
            <SubHeader>The Consequences</SubHeader>
            <motion.ul variants={pageVariants} className="list-disc ml-6 space-y-2">
              <BulletPoint icon={checkIcon}>
                **Penalties:** Late fees and additional interest charges accumulate quickly.
              </BulletPoint>
              <BulletPoint icon={checkIcon}>
                **NPA Status:** Missing payments for 90+ days classifies your loan as a Non-Performing Asset (NPA), triggering legal recovery procedures.
              </BulletPoint>
              <BulletPoint icon={checkIcon}>
                **Future Rejections:** The default history remains on your report for up to 7 years.
              </BulletPoint>
            </motion.ul>
            <KeyTakeaway icon={<Zap />}>
              Set up **Auto-Debit (ECS/NACH)** mandates from your primary bank account and ensure the account has a buffer amount 3 days before the due date.
            </KeyTakeaway>
          </motion.section>
          
          {/* MISTAKE 8: HIDING EXISTING LOANS OR LIABILITIES */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader icon={<Briefcase />}>8. Concealing Existing Financial Obligations</SectionHeader>
            <Paragraph>
              Some borrowers fail to disclose small loans, credit card debts, or existing personal loans, believing the lender won't find out. This is a futile mistake. Lenders perform a mandatory hard check on your credit report, which reveals **every single active loan and credit card** you possess.
            </Paragraph>
            <SubHeader>Result: Immediate Rejection</SubHeader>
            <Paragraph>
              Lying or omitting details on your application is viewed as an integrity issue, leading to an immediate and irreversible application rejection. Your stated FOIR will be recalculated against your actual liabilities, and the discrepancy will raise a massive red flag. Always be 100% transparent.
            </Paragraph>
          </motion.section>
          
          {/* MISTAKE 9: USING LOAN FUNDS FOR NON-ESSENTIALS */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader icon={<Feather />}>9. Using the Loan for Frivolous/Non-Essential Expenses</SectionHeader>
            <Paragraph>
              While personal loans don't strictly require end-use declaration, using borrowed money for luxury consumption (e.g., an expensive vacation, impulse shopping) is a recipe for financial distress. The loan should serve a **productive or necessary purpose**—like debt consolidation, medical emergencies, or funding education.
            </Paragraph>
            <KeyTakeaway icon={<Zap />}>
              Debt for **assets** (home, education, business) builds wealth. Debt for **liabilities** (fast-depreciating goods, fleeting experiences) destroys wealth.
            </KeyTakeaway>
          </motion.section>

          {/* MISTAKE 10: NOT DEDICATING TIME FOR COMPARISON */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader icon={<Activity />}>10. Rushing the Process and Not Comparing Options</SectionHeader>
            <Paragraph>
              In a rush to get funds, borrowers often accept the first loan offer from their primary bank or an NBFC. They fail to dedicate time to compare interest rates, processing fees, and customer service across different banks, NBFCs, and financial institutions.
            </Paragraph>
            <SubHeader>The Cost of Impatience</SubHeader>
            <Paragraph>
              A difference of just **0.5% in the interest rate** on a 15-year home loan of ₹50 lakhs can save you over **₹2.5 lakhs in total interest paid**. Impatience directly translates to higher long-term costs. Treat the loan search like shopping for a major appliance—take your time and demand the best deal.
            </Paragraph>
          </motion.section>


          {/* --- CALL TO ACTION SECTION (Replicated from original file) --- */}
          <motion.section
            className="text-center bg-indigo-800/70 p-10 rounded-xl mt-16 shadow-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg flex items-center justify-center space-x-3"
              variants={itemVariants}
            >
              <Zap className="w-8 h-8 text-yellow-300" />
              <span>Implement the Strategy: Get Your Pre-Approval Report</span>
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Start smart by using a soft inquiry trick to receive a personalized, eligibility-optimized lender match and a detailed rate estimate in under 5 minutes, without risking your CIBIL score.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => alert("Personalized Loan Eligibility Check Initiated!")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get My Free Eligibility Scorecard
              </button>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
};

export default LoanMistakesToAvoid;
