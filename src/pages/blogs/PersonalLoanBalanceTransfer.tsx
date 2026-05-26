import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Zap, // Used for CTA
  RefreshCw, // Used for Main Transfer Concept
  DollarSign, // Used for Benefits (Lower Interest)
  ListOrdered, // Used for Step-by-Step Guide
  Shield, // Used for Eligibility
  TrendingDown, // Used for Reducing EMI/Debt
  Scale, // Used for Comparison/Lender choice
  Clock, // Used for Timing/Cooling period
  CheckSquare, // Used for Documentation & Errors
} from "lucide-react";
import { Link } from "react-router-dom";

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "Personal Loan Balance Transfer Explained: Benefits & Step-by-Step Guide";
const ARTICLE_SUBTITLE =
  "The comprehensive guide for Indian borrowers: Unlocking lower EMIs, the secret to consolidating high-interest debt, and a 7-step process for a seamless transfer.";
const BACK_LINK = "/blogs/finance-strategy";
const AUTHOR = "Insider Banking Analyst";
const DATE = "Nov 20, 2025";
const READ_TIME = "15 min read (The Consolidation Manual)";
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
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.03,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Component for Section Headers
interface SectionHeaderProps {
  title: string;
  icon: React.ElementType;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon: Icon }) => (
  <motion.div
    className="flex items-center space-x-4 mb-6 pt-4 border-t border-gray-200/50"
    variants={itemVariants}
  >
    <Icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
      {title}
    </h2>
  </motion.div>
);

// Component for Sub Headers
interface SubHeaderProps {
  title: string;
  id?: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({ title, id }) => (
  <motion.h3
    id={id}
    className="text-2xl font-bold mt-10 mb-4 text-indigo-700 dark:text-indigo-300"
    variants={itemVariants}
  >
    {title}
  </motion.h3>
);

// Component for Standard Paragraphs (with motion)
const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.p
    className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
    variants={itemVariants}
  >
    {children}
  </motion.p>
);

// Component for Bullet Points
interface BulletPointProps {
  children: React.ReactNode;
}

const BulletPoint: React.FC<BulletPointProps> = ({ children }) => (
  <motion.li
    className="flex items-start mb-3 text-lg text-gray-700 dark:text-gray-300"
    variants={itemVariants}
  >
    <CheckSquare className="w-5 h-5 mt-1 mr-3 text-green-500 flex-shrink-0" />
    <span>{children}</span>
  </motion.li>
);

// Component for Key Takeaways/Tips
interface KeyTakeawayProps {
  children: React.ReactNode;
}

const KeyTakeaway: React.FC<KeyTakeawayProps> = ({ children }) => (
  <motion.div
    className="mt-6 mb-6 p-5 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-lg shadow-md"
    variants={itemVariants}
  >
    <p className="font-semibold text-yellow-800 dark:text-yellow-200">
      <span className="font-extrabold mr-2">💡 Strategic Move:</span>
      {children}
    </p>
  </motion.div>
);

// Component for Guide Steps
interface GuideStepProps {
  step: number;
  title: string;
  children: React.ReactNode;
}

const GuideStep: React.FC<GuideStepProps> = ({ step, title, children }) => (
  <motion.div
    className="flex items-start space-x-4 mb-8 p-4 border border-gray-100 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700/50 shadow-sm"
    variants={itemVariants}
  >
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-400 flex items-center justify-center text-white font-extrabold text-lg">
      {step}
    </div>
    <div>
      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h4>
      <Paragraph>{children}</Paragraph>
    </div>
  </motion.div>
);

// ====================================================================
// MAIN COMPONENT
// ====================================================================

const PersonalLoanBalanceTransfer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-12 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Back Link */}
        <Link to={BACK_LINK} className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to all Finance Guides
        </Link>

        {/* Hero Section */}
        <motion.header
          className="text-center mb-16 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl"
          variants={pageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h1
            className="text-5xl sm:text-7xl font-extrabold tracking-tight"
            variants={itemVariants}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-300">
              {ARTICLE_TITLE}
            </span>
          </motion.h1>
          <motion.p
            className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            {ARTICLE_SUBTITLE}
          </motion.p>
          <motion.div
            className="mt-6 flex justify-center space-x-6 text-sm font-medium text-gray-500 dark:text-gray-400"
            variants={itemVariants}
          >
            <span>{AUTHOR}</span>
            <span>•</span>
            <span>{DATE}</span>
            <span>•</span>
            <span>{READ_TIME}</span>
          </motion.div>
        </motion.header>

        {/* Main Content Sections */}
        <motion.article
          className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-xl shadow-2xl space-y-12"
          variants={pageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >

          {/* Section 1: What is a Personal Loan Balance Transfer? */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="1. Understanding the Balance Transfer Mechanism" icon={RefreshCw} />
            <Paragraph>
              A **Personal Loan Balance Transfer (BT)** is a strategic financial move where you shift your existing, high-interest personal loan from your current lender to a new lender that offers a lower interest rate. It is essentially a new loan taken out specifically to pay off the outstanding principal of the old loan.
            </Paragraph>
            <Paragraph>
              Unlike consolidating multiple smaller debts, a Personal Loan BT focuses on one large loan. The primary goal is to **reduce the total interest outflow** and make your Equated Monthly Installment (EMI) more affordable over the remaining tenure, providing significant relief to your monthly budget.
            </Paragraph>
            <SubHeader title="The Core Goal: Lowering the Rate or Extending the Tenure" id="core-goal" />
            <Paragraph>
              The new loan from the fresh lender pays off the old loan, and you begin repaying the new loan at a favorable rate. This is particularly effective if your credit profile (CIBIL score, income) has improved significantly since you first took out the original loan, qualifying you for better terms now.
            </Paragraph>
            <KeyTakeaway>
              Before initiating a transfer, ensure the interest rate differential between your current loan and the potential new loan is substantial (at least 2-3 percentage points) to offset the processing fees and other charges associated with the transfer.
            </KeyTakeaway>
          </motion.section>

          {/* Section 2: The Core Benefits of a Balance Transfer */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="2. Maximizing Your Savings: The Key Benefits" icon={DollarSign} />
            <Paragraph>
              The benefits of a Personal Loan Balance Transfer go beyond just reducing the immediate EMI. They are long-term financial levers.
            </Paragraph>
            <SubHeader title="i. Significant Interest Cost Reduction" id="interest-reduction" />
            <Paragraph>
              This is the most compelling reason. Since personal loans typically have high interest rates (often 10% to 24%), moving from, say, 16% to 13% can save you tens of thousands of rupees over the remaining tenure, especially on a large principal amount. This difference directly impacts your total cost of borrowing.
            </Paragraph>
            <SubHeader title="ii. Lowering Your Monthly EMI" id="emi-reduction" />
            <Paragraph>
              A lower interest rate automatically reduces the EMI. Furthermore, the new lender allows you to choose a new loan tenure. By opting for a slightly **longer tenure** (within reasonable limits), you can dramatically decrease your monthly outflow, freeing up cash flow for other obligations or investments.
            </Paragraph>
            <SubHeader title="iii. Improved Financial Management" id="management-improvement" />
            <Paragraph>
              If you used a personal loan to consolidate other high-interest debts (like credit card outstanding) and now want a better rate, the BT helps you simplify your repayment schedule to a single, lower EMI with one lender, making financial tracking easier and reducing the risk of missed payments.
            </Paragraph>
            <ul className="list-disc ml-6 mt-4 space-y-2">
              <BulletPoint> **Top-Up Option:** Many banks offer a **Top-Up loan** facility during the balance transfer, allowing you to borrow an additional amount on top of the principal being transferred, subject to your eligibility. This provides extra liquidity for other financial needs.</BulletPoint>
              <BulletPoint> **Flexible Repayment:** You get to set a new, tailored repayment schedule and tenure that aligns better with your current income stability and future goals.</BulletPoint>
            </ul>
          </motion.section>

          {/* Section 3: Eligibility & Prerequisite Checklist */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="3. Eligibility Check: Are You Ready for a Transfer?" icon={Shield} />
            <Paragraph>
              Not all personal loans or borrowers qualify for a balance transfer. Banks assess your risk profile rigorously before agreeing to take on another bank's debt.
            </Paragraph>
            <SubHeader title="Lender Checklist for the New Loan" id="lender-checklist" />
            <Paragraph>
              The new lender will evaluate your profile based on the following key metrics:
            </Paragraph>
            <ul className="list-disc ml-6 mt-4 space-y-2">
              <BulletPoint> **Credit Score (CIBIL):** A CIBIL score of **750 and above** is crucial. If your score has improved since the original loan, this is your leverage for a better rate.</BulletPoint>
              <BulletPoint> **Repayment History:** The original loan must have a **pristine repayment record** (DPD of '000'). Any recent defaults or late payments on the existing loan will lead to outright rejection.</BulletPoint>
              <BulletPoint> **Employment/Income Stability:** You must meet the new lender's minimum income and employment stability requirements (typically 1-2 years of steady employment/business operation).</BulletPoint>
              <BulletPoint> **Remaining Tenure:** Most lenders only allow a BT if the outstanding loan has a **minimum remaining tenure** (e.g., 12-18 months left), as the savings diminish if the loan is nearing its end.</BulletPoint>
            </ul>
            <KeyTakeaway>
              Avoid applying for the balance transfer within the first 6-12 months of the original loan. Banks prefer to see a stable repayment history before entertaining a transfer application. A longer, stable history minimizes their risk.
            </KeyTakeaway>
          </motion.section>

          {/* Section 4: The 7-Step Step-by-Step Balance Transfer Guide */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="4. Seamless Execution: Your 7-Step Transfer Blueprint" icon={ListOrdered} />
            <Paragraph>
              Executing a balance transfer requires coordination between three parties: you, the old lender, and the new lender. Follow this blueprint for a smooth transition.
            </Paragraph>

            <GuideStep step={1} title="Assess Savings and Cost">
              Calculate the total projected savings (interest differential) versus the total projected cost (foreclosure charges from the old bank, processing fees from the new bank). The transfer is only worthwhile if the savings significantly outweigh the costs.
            </GuideStep>

            <GuideStep step={2} title="Compare & Shortlist New Lenders">
              Use online aggregators and soft inquiries to compare the interest rates and processing fees of 3-4 top banks/NBFCs. Choose the lender that offers the lowest net Annual Percentage Rate (APR), which includes all fees.
            </GuideStep>

            <GuideStep step={3} title="Obtain Foreclosure Details (Old Bank)">
              Contact your current lender and obtain a **Foreclosure Statement** or **Statement of Outstanding Balance**. This document confirms the exact principal amount required to close the loan today, which is the amount the new bank will sanction.
            </GuideStep>

            <GuideStep step={4} title="Formal Application & Documentation">
              Submit a formal application to the new lender, along with the Foreclosure Statement, KYC, income proof (salary slips/ITR), and bank statements. Clearly state the purpose of the application is 'Personal Loan Balance Transfer.'
            </GuideStep>

            <GuideStep step={5} title="Verification and Sanction">
              The new lender will verify your CIBIL score, documents, and income. Upon approval, they will issue a **Sanction Letter** detailing the new loan amount, interest rate, and tenure.
            </GuideStep>

            <GuideStep step={6} title="Disbursement to Old Bank">
              The new lender will **directly disburse the sanctioned amount** to your old lender. You typically do not handle this fund yourself. Once the old lender receives the full amount, the original loan is officially closed.
            </GuideStep>

            <GuideStep step={7} title="Obtain No Objection Certificate (NOC)">
              **This is the critical final step.** Within a few days of the final settlement, ensure you obtain the **No Objection Certificate (NOC)** or a **Loan Closure Letter** from your original lender. Keep this document safe for future reference and check your CIBIL report after 30 days to ensure the old loan status is reported as 'Closed' or 'Settled'.
            </GuideStep>
          </motion.section>

          {/* Section 5: Pitfalls and Hidden Charges to Watch Out For */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="5. Pitfalls: Hidden Costs and Mistakes to Avoid" icon={TrendingDown} />
            <Paragraph>
              While highly beneficial, a balance transfer is not free. Being aware of the costs is vital for calculating the *true* savings.
            </Paragraph>
            <SubHeader title="i. Foreclosure / Prepayment Charges" id="prepayment-charges" />
            <Paragraph>
              Your old lender may levy a penalty for closing the loan early. This is typically 2% to 5% of the outstanding principal. Ensure you factor this into your savings calculation (Step 1). Some private banks waive this charge after a certain number of EMIs have been paid.
            </Paragraph>
            <SubHeader title="ii. New Lender's Processing Fee" id="new-processing-fee" />
            <Paragraph>
              The new bank will charge a processing fee (usually 0.5% to 2% of the new loan amount). This cost is immediately added to your total cost and should be negotiated fiercely before acceptance (referencing the negotiation tactics from our previous guide!).
            </Paragraph>
            <SubHeader title="iii. The Long-Term Interest Trap" id="interest-trap" />
            <Paragraph>
              If you opt for a **significantly longer tenure** to achieve a very low EMI, you might end up paying *more* interest in total, even with the lower rate. Use an online EMI calculator to compare the **Total Interest Payable** for both the original and the new loan structure before committing. Lowering the EMI should not come at the expense of maximized total interest.
            </Paragraph>
          </motion.section>


          {/* CTA Section */}
          <motion.section
            className="text-center mt-16 p-8 bg-gradient-to-r from-indigo-600 to-blue-700 rounded-2xl shadow-xl"
            variants={pageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg flex items-center justify-center space-x-3"
              variants={itemVariants}
            >
              <Zap className="w-8 h-8 text-yellow-300" />
              <span>Calculate Your Potential Balance Transfer Savings</span>
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Ready to cut your interest cost? Use our free tool to instantly calculate the true savings of a balance transfer, factoring in all hidden costs and fees.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => alert("Balance Transfer Savings Calculator Launched!")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Start Saving Today
              </button>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
};

export default PersonalLoanBalanceTransfer;
