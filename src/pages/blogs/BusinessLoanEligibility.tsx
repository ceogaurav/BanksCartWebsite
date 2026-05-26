import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  DollarSign, // Used for Cash Flow and Turnover
  Banknote, // Used for Collateral & Security
  Scale, // Used for DSCR and Financial Health
  Users, // Used for Banking Relationship
  Zap, // Used for Quick Fixes/CTA
  Shield, // Used for Personal Guarantee & CIBIL
  Calendar, // Used for Timing & History
  Briefcase, // Used for Industry/Business Focus
  CheckSquare, // Reused for Bullet Points
} from "lucide-react";
import { Link } from "react-router-dom"; 

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "How to Improve Business Loan Eligibility Fast: 8 Rapid-Fire Fixes";
const ARTICLE_SUBTITLE =
  "The SME Survival Manual: Quick strategies to stabilize your cash flow, optimize Debt Service Coverage Ratio (DSCR), secure lower rates, and unlock capital in under 90 days.";
const BACK_LINK = "/blogs/finance-strategy"; 
const AUTHOR = "SME Finance Specialist";
const DATE = "Dec 1, 2025";
const READ_TIME = "25 min read (The Rapid-Growth Guide)";
// --- CONFIGURATION END ---

// ====================================================================
// FRAMEWORK COMPONENTS (Replicated from LoanEligibilityTricks)
// ====================================================================

// Framer Motion variants
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
      <span className="font-extrabold mr-2">🚀 Rapid Fix:</span>
      {children}
    </p>
  </motion.div>
);

// ====================================================================
// MAIN COMPONENT
// ====================================================================

const BusinessLoanEligibility: React.FC = () => {
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

          {/* Section 1: The 90-Day Cash Flow Cleanup */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="1. The 90-Day Cash Flow Cleanup: Maximizing Bank Statement Health" icon={DollarSign} />
            <Paragraph>
              For MSMEs, the **last 90 to 180 days of bank statements** are often more critical than historical P&L statements. Lenders use these statements to assess liquidity and operational discipline. If your statements show frequent overdrafts, high bounce rates, or unpredictable cash flow, you will be flagged as high-risk, regardless of your annual turnover.
            </Paragraph>
            <SubHeader title="The 'No-Bounce' Discipline" id="no-bounce-rule" />
            <Paragraph>
              A single cheque or ECS return in the 6 months preceding your application can trigger an instant rejection. This signals poor financial management and an inability to meet basic obligations. For 90 days before applying, ensure every scheduled payment has a buffer. Consider moving all business collections and payments through a single primary bank account to present a complete, robust picture of cash flow.
            </Paragraph>
            <KeyTakeaway>
              **Clean up your current accounts.** For the three months immediately preceding your loan application, eliminate all unnecessary bank charges, minimize internal fund transfers (especially to personal accounts), and maintain a consistent minimum average balance significantly above the required limit. This presents stability.
            </KeyTakeaway>
            {/* Extended content */}
            <SubHeader title="Accelerating Accounts Receivable (AR)" id="accelerate-ar" />
            <Paragraph>
              Your books may show profit, but lenders care about cash. Aggressively follow up on all **Accounts Receivable (AR)** that are 30+ days overdue. Converting outstanding invoices into cash boosts your bank balance and demonstrates strong client management. If possible, use invoice discounting or factoring for immediate liquidity, making your bank statements look healthier right before the application.
            </Paragraph>
          </motion.section>

          {/* Section 2: DSCR Manipulation (The Cost Control Play) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="2. DSCR Manipulation: The Cost Control Play" icon={Scale} />
            <Paragraph>
              The Debt Service Coverage Ratio (DSCR) is calculated as Net Operating Income (NOI) divided by Total Debt Service. For quick eligibility improvement, you must increase the numerator (NOI) in the reporting period. Since increasing sales instantly is hard, the fastest lever is **cost reduction**.
            </Paragraph>
            <SubHeader title="Postpone Discretionary Expenses" id="postpone-expenses" />
            <Paragraph>
              Identify and postpone non-essential, discretionary operational expenses that are typically routed through the Profit & Loss statement. This includes major maintenance, new software subscriptions, non-critical marketing spends, or large office supply purchases. This isn't fraud; it's **strategic timing**. Temporarily suppressing these costs for 1-2 quarters immediately preceding the application will artificially (but legally) inflate your NOI, pushing your DSCR closer to the bank's desired 1.3x to 1.5x minimum.
            </Paragraph>
            <SubHeader title="The Non-Cash Expense Adjustment" id="non-cash-adjustment" />
            <Paragraph>
              When presenting financials, ensure your CA highlights non-cash expenses, primarily **depreciation**. Lenders often use a variant of NOI (EBITDA or Earnings Before Interest, Tax, Depreciation, and Amortization) which adds back depreciation, as it is not an actual cash outflow. A higher depreciation figure in your books might lower your taxable profit, but when correctly adjusted for the loan application, it can significantly boost the lending capacity.
            </Paragraph>
          </motion.section>

          {/* Section 3: Leveraging Relationship Equity (The Anchor Bank Strategy) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="3. Leveraging Relationship Equity: The Anchor Bank Strategy" icon={Users} />
            <Paragraph>
              Digital lending is fast, but traditional banking relationships yield better terms and higher approval chances. Banks prefer to lend to customers whose entire financial ecosystem they manage, as it provides a holistic view of risk.
            </Paragraph>
            <SubHeader title="Consolidate Banking Operations" id="consolidate-operations" />
            <Paragraph>
              Shift your business current account, fixed deposits (FDs), and any other existing credit facilities (like a small overdraft or working capital limit) to the bank from which you seek the main business loan. This creates a high **Total Relationship Value (TRV)**. Your Relationship Manager (RM) will see you as a 'sticky,' valuable customer and will have greater internal authority to push your file past minor red flags or negotiate a better rate.
            </Paragraph>
            <KeyTakeaway>
              **Use Your Existing Assets:** If you hold a Fixed Deposit (FD) or Mutual Fund (MF) with your target bank, use it as 'security' for a small, initial credit facility (e.g., a credit card or small OD limit). Successful repayment on this tiny loan immediately builds a positive credit history *within that bank's system*, making your RM's job easier for the main application.
            </KeyTakeaway>
            <SubHeader title="The Proactive Document Pre-Screen" id="document-pre-screen" />
            <Paragraph>
              2-4 weeks before formally applying, meet with your RM and hand over clean, perfectly organized copies of your last 3 years of audited financials, ITRs, and GST filings. Ask the RM to 'pre-screen' or informally review the documents. This allows them to catch missing signatures or minor errors that would cause delays or a technical rejection upon formal submission, streamlining the actual application process.
            </Paragraph>
          </motion.section>

          {/* Section 4: The Collateral Optimization Play */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="4. The Collateral Optimization Play: Maximizing LTV" icon={Banknote} />
            <Paragraph>
              If your business needs a large loan, securing it with collateral (like property, machinery, or gold) significantly increases eligibility and lowers the interest rate. The key is maximizing the **Loan-to-Value (LTV) ratio** in your favour.
            </Paragraph>
            <SubHeader title="Identify 'High-Liquidity' Collateral" id="high-liquidity-collateral" />
            <Paragraph>
              Banks prefer collateral that is easy to liquidate. Residential property often fetches a higher LTV (e.g., 60-70%) than specialized industrial machinery or rural land. If you have a choice, offer the collateral with the highest market demand and lowest legal complexity. Consider using **Gold Loans** for immediate, small-to-medium working capital needs, as they have the fastest approval time and offer LTVs up to 75%.
            </Paragraph>
            <BulletPoint>**Get a Fresh Valuation:** If the last property valuation was done over a year ago, commission a new, reputable valuation from a bank-approved valuer. Market prices may have increased, directly boosting your available loan amount.</BulletPoint>
            <BulletPoint>**Clear Encumbrances:** Ensure the collateral property title is perfectly clear, with no existing mortgages, litigation, or family disputes. Any encumbrance dramatically reduces the LTV offered or causes an outright rejection.</BulletPoint>
            <SubHeader title="The Hybrid Security Strategy" id="hybrid-security" />
            <Paragraph>
              For businesses, banks often ask for a mix of primary security (assets purchased with the loan) and collateral security (external assets like property). Offering an additional, small piece of **liquid collateral** (like a high-value FD) alongside the main property can de-risk the loan, encouraging the bank to offer a better rate or stretch the LTV on the main asset.
            </Paragraph>
          </motion.section>

          {/* Section 5: Mitigating the Personal CIBIL Risk */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="5. Mitigating the Personal CIBIL Risk: The Director's Shield" icon={Shield} />
            <Paragraph>
              For MSMEs (especially proprietorships, partnerships, and small private limited companies), the **Personal CIBIL score** of the directors/promoters is often the primary underwriting factor. A high business turnover cannot compensate for a director's poor personal credit history.
            </Paragraph>
            <SubHeader title="Prioritize Personal DTI/FOIR Reduction" id="personal-dti-reduction" />
            <Paragraph>
              A few months before the business loan application, aggressively pay down any high-interest **personal debt**, especially credit card balances and unsecured personal loans. This instantly reduces the Director's personal Debt-to-Income (DTI) or Fixed Obligation to Income Ratio (FOIR). Lenders calculate the business loan EMI as part of the director’s FOIR/DTI, so minimizing existing personal obligations creates maximum headroom for the new business loan.
            </Paragraph>
            <KeyTakeaway>
              If a director has a low personal CIBIL score (under 750), consider removing them as a personal guarantor or introducing a different director with a pristine CIBIL score (800+) as the primary guarantor. The strength of the guarantor is the **last line of defence** for the business loan.
            </KeyTakeaway>
          </motion.section>

          {/* Section 6: Industry and Vintage Vetting (The Risk Profile) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="6. Industry and Vintage Vetting: Matching Your Risk Profile" icon={Briefcase} />
            <Paragraph>
              Lenders categorize businesses by industry and 'vintage' (age). Eligibility and rates differ vastly based on this risk assessment.
            </Paragraph>
            <SubHeader title="The 'Sweet Spot' Vintage" id="sweet-spot-vintage" />
            <Paragraph>
              The minimum business vintage for most term loans is **3 years**. If your business is 1-2 years old, your eligibility is severely limited to small, high-interest loans (e.g., startup finance). If you are 3-5 years old, focus on presenting perfectly clean statutory compliance (GST, ITR). Once you cross 7-10 years, you are considered a 'stable' enterprise and qualify for preferential rates, provided all other metrics are strong. If you are under 3 years, wait and build history, or focus exclusively on secured loans (LAP).
            </Paragraph>
            <SubHeader title="Targeting Industry-Specific Lenders" id="industry-lenders" />
            <Paragraph>
              Don't apply to general-purpose banks if you are in a niche sector (e.g., healthcare, education, logistics). Many NBFCs and co-operative banks specialize in specific industry financing and understand its unique cash flow cycles and risks. They may approve a loan a large universal bank would reject due to internal industry restrictions. Research lenders who have a successful track record in your specific sector.
            </Paragraph>
          </motion.section>

          {/* Section 7: The Data Integrity Mandate */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="7. The Data Integrity Mandate: Perfect Financial Symmetry" icon={Calendar} />
            <Paragraph>
              Inconsistency across statutory documents is a silent killer of loan applications. Banks cross-verify ITRs, GST returns, and audited financials. Any major mismatch signals data fudging, leading to immediate rejection.
            </Paragraph>
            <BulletPoint>**ITR & P&L Alignment:** Ensure the turnover and profit figures reported in your Income Tax Returns (ITR) exactly match the figures in your Profit & Loss (P&L) statement. Discrepancies of even a small percentage raise red flags.</BulletPoint>
            <BulletPoint>**GST & Bank Turnover:** Your reported monthly or quarterly turnover in GST filings must be reflected in the total credits in your bank statements. This is the fastest way a bank verifies your actual sales.</BulletPoint>
            <BulletPoint>**Udyam Registration:** Ensure your business is registered under the Udyam portal and that the details (name, address, activity) match all other statutory documents perfectly. This is a basic, non-negotiable compliance requirement.</BulletPoint>
            <KeyTakeaway>
              Before submission, create a **Symmetry Check Sheet** where you list the Key Financial Indicators (Turnover, Net Profit, Debt, Directors' Income) from all three sources (ITR, GST, Audited P&L) side-by-side. If there are any significant variances, resolve them with your CA *before* the application goes to the bank.
            </KeyTakeaway>
          </motion.section>

          {/* Section 8: The Targeted Debt Paydown for Eligibility */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="8. The Targeted Debt Paydown for Eligibility" icon={TrendingDown} />
            <Paragraph>
              Similar to personal finance, reducing existing business obligations opens up borrowing capacity. However, the method is slightly different for business loans.
            </Paragraph>
            <SubHeader title="Eliminating Working Capital Overdrafts" id="eliminate-od" />
            <Paragraph>
              While an Overdraft (OD) facility is flexible, continuously running it at or near its limit for an extended period (months) makes the bank nervous. It signals perpetual cash strain. Fully or substantially pay down your OD limit 1-2 months before applying for a new Term Loan. This shows the existing facility is being managed responsibly and is not a permanent, maxed-out dependency.
            </Paragraph>
            <SubHeader title="Closing Small, Multiple Loans" id="closing-multiple-loans" />
            <Paragraph>
              If your business has 3-4 small, high-interest unsecured loans (e.g., equipment finance, short-term vendor loans), prioritize clearing them completely. The bank’s algorithm counts the *number of existing facilities* and the total *monthly EMI obligation*. Eliminating two small facilities entirely is better for eligibility than slightly reducing the balance on one large Term Loan. Fewer debts simplify your financial risk profile.
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
              <span>Implement the Strategy: Get Your Business Funding Assessment</span>
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Receive a customized 90-day action plan to optimize your financials, DSCR, and banking documents for maximum business loan approval chances and the lowest interest rates.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => alert("Business Funding Assessment Initiated!")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Start My 90-Day Optimization Plan
              </button>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
};

export default BusinessLoanEligibility;
