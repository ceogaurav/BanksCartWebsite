import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Target, // Used for Eligibility Focus
  Shield, // Used for CIBIL Score Defense
  Activity, // Used for DTI/FOIR Ratio
  TrendingDown, // Used for LTV & Depreciation
  Briefcase, // Used for The Dealer Game
  Users, // Used for Relationship Equity
  Feather, // Used for Negotiation Tactics
  CheckSquare, // Used for Documentation & Errors
  Gavel, // Used for Loan Structure
  Zap, // Used for CTA
} from "lucide-react";
import { Link } from "react-router-dom";

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "How to Secure 100% Car Loan Finance: The Zero Down Payment Blueprint";
const ARTICLE_SUBTITLE =
  "The comprehensive guide to securing full car value financing, minimizing out-of-pocket costs, navigating LTV ratios, and winning the dealer financing game.";
const BACK_LINK = "/blogs/finance-strategy";
const AUTHOR = "Automotive Finance Expert";
const DATE = "Dec 15, 2025";
const READ_TIME = "25 min read (The Automotive Manual)";
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
      staggerChildren: 0.03, // Consistent stagger for dense content
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
      <span className="font-extrabold mr-2">🚗 Insider Key:</span>
      {children}
    </p>
  </motion.div>
);

// ====================================================================
// MAIN COMPONENT
// ====================================================================

const CarLoan100PercentFinance: React.FC = () => {
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

          {/* Section 1: The LTV Limit (Loan-to-Value) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="1. Understanding the LTV Barrier: The 90% Myth" icon={TrendingDown} />
            <Paragraph>
              Standard car loans are approved at a Loan-to-Value (LTV) ratio of 80% to 90% of the ex-showroom price. The remaining 10% to 20% (plus road tax, registration, and insurance) is your mandated down payment. Securing 100% financing requires overcoming this institutional LTV barrier. Banks are hesitant because a car's value depreciates immediately upon driving off the lot, making 100% financing an immediate high-risk scenario.
            </Paragraph>
            <SubHeader title="The 'On-Road Price' vs. 'Ex-Showroom Price' Distinction" id="price-distinction" />
            <Paragraph>
              A crucial distinction: LTV is typically calculated on the **Ex-Showroom Price**. The **On-Road Price** includes mandatory charges (RTO, road tax, insurance, essential accessories), which often account for an additional 10-20%. To get 100% of the *On-Road Price* financed, you are aiming for roughly 110-120% LTV on the Ex-Showroom value, which is nearly impossible.
            </Paragraph>
            <KeyTakeaway>
              To achieve "100% Finance" without a down payment, you must strategically include the insurance, registration, and RTO charges into the loan amount. This requires convincing the lender to approve a loan that covers the **full On-Road Price**, not just the Ex-Showroom Price.
            </KeyTakeaway>
            <SubHeader title="The Depreciation Risk Assessment" id="depreciation-risk" />
            <Paragraph>
              Lenders internally factor in first-year depreciation (often 15-20%). They want the loan amount to be less than the collateral's resale value at any point. A 100% loan means they immediately have negative equity. The only way to counter this risk perception is through an impeccable credit profile and a very stable income stream.
            </Paragraph>
          </motion.section>

          {/* Section 2: Building the Perfect Borrower Profile (CIBIL 780+ Requirement) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="2. The Impeccable Profile: Your CIBIL & DTI Accelerator" icon={Shield} />
            <Paragraph>
              A 100% loan is an **exception**, not a rule. Only premium borrowers with zero risk are considered. Your credit score and income stability must exceed the standard requirement.
            </Paragraph>
            <SubHeader title="CIBIL Score as the Discount Card" id="cibil-score-premium" />
            <Paragraph>
              While a score of 750 might get you a loan, a score of **780 and above** places you in the 'Prime Borrower' category. This high score is the single strongest argument a Relationship Manager can present to the bank's underwriting team to justify a 100% LTV exception. Use the CIBIL Statement Date Trick (pay card balance *before* the statement date) to optimize your score before applying.
            </Paragraph>
            <SubHeader title="The DTI/FOIR Sweet Spot" id="dtifoir-sweet-spot" />
            <Paragraph>
              Your Debt-to-Income (DTI) or Fixed Obligation to Income Ratio (FOIR) is crucial. While 40% is the usual cap, for a high-risk 100% loan, banks prefer to see your existing debt obligations (including the new car EMI) consume **no more than 25% to 30%** of your net monthly income. Pay off small existing loans completely to clear your DTI before you apply.
            </Paragraph>
            <BulletPoint>Maintain an extensive, well-managed credit history (at least 3-5 years) with a mix of secured and unsecured debt.</BulletPoint>
            <BulletPoint>Ensure all utility and rent payments are consistent, as new age scoring models are beginning to factor these into overall stability.</BulletPoint>
          </motion.section>

          {/* Section 3: Strategic Vehicle Selection (The Brand Play) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="3. Strategic Vehicle Selection: The Low-Risk Car Play" icon={Target} />
            <Paragraph>
              Lenders are more likely to finance a high LTV on a vehicle that retains its value well. The car itself is the collateral, and its resale value mitigates the bank's risk.
            </Paragraph>
            <SubHeader title="Choosing the 'Bankable' Brands" id="bankable-brands" />
            <Paragraph>
              New cars from manufacturers with high market share, proven reliability (e.g., Maruti, Hyundai, Tata, specific Japanese/European models), and high resale value are inherently lower risk for the bank. These models have a deep, liquid secondary market. Banks are **less likely** to approve 100% finance on luxury, high-depreciation, or niche imports where the resale market is small.
            </Paragraph>
            <SubHeader title="Targeting Corporate Tie-Ups and Bulk Deals" id="corporate-tie-ups" />
            <Paragraph>
              Some manufacturers or large dealer groups have specific tie-ups with banks (or captive finance arms) to push sales, often during festive seasons. These campaigns sometimes include promotional 100% financing offers on specific, higher-volume models. These are the rare windows where the LTV is waived as a marketing cost, not a risk calculation.
            </Paragraph>
            <KeyTakeaway>
              Avoid heavily customized or modified vehicles. The bank values a car as a standard asset. Any modification is often considered a non-financeable expense that must be paid upfront, reducing your chances of 100% financing on the total cost.
            </KeyTakeaway>
          </motion.section>

          {/* Section 4: The Dealer vs. Direct Lending Game */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="4. The Dealer vs. Direct Lending: Who Gives 100%?" icon={Briefcase} />
            <Paragraph>
              You have two primary options for car finance, and one is significantly more likely to offer 100% LTV, often disguised with a slightly higher interest rate.
            </Paragraph>
            <SubHeader title="Dealer Financing: The Path to Zero Down" id="dealer-zero-down" />
            <Paragraph>
              Dealers often work with finance companies (captive finance or NBFCs) that offer schemes like '100% funding' or 'Zero Down Payment.' They can do this because: (a) the bank/NBFC builds a higher interest rate into the loan to cover the higher risk, or (b) the dealer subsides a portion of the risk to close the sale. **Always negotiate the final car price first** before discussing the finance scheme.
            </Paragraph>
            <SubHeader title="Direct Bank Loans: Lower Rate, Lower LTV" id="direct-bank-lower-ltv" />
            <Paragraph>
              If you go to your personal bank directly, you will likely get a lower interest rate, but they will be rigid on the 85-90% LTV rule. If you must use your bank, the only way to get 100% is to ask them to structure the **mandatory registration and insurance costs** into a **Personal Loan** component (or a top-up loan) linked to the car loan, effectively covering the gap.
            </Paragraph>
            <BulletPoint>Dealer finance is convenient for 100% funding but check the final interest rate and all hidden costs.</BulletPoint>
            <BulletPoint>Direct bank finance is cheaper but requires you to finance the 10-15% LTV gap and RTO/Insurance out of pocket.</BulletPoint>
          </motion.section>

          {/* Section 5: The Collateral Enhancement Trick (Top-Up/Hypothecation) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="5. Collateral Enhancement: The Existing Asset Play" icon={Gavel} />
            <Paragraph>
              Lenders are willing to waive the LTV restriction if you can offer secondary, easily liquidateable collateral. This is a common insider strategy to get high-value, full funding.
            </Paragraph>
            <SubHeader title="The 'Loan Against Securities' Strategy" id="las-strategy" />
            <Paragraph>
              If you have investments in Mutual Funds (MFs), Fixed Deposits (FDs), or certain shares, you can get a **Loan Against Securities (LAS)** or **Loan Against Property (LAP)**. You can leverage these low-interest funds to cover the 10-20% gap and RTO/Insurance, keeping your main Car Loan at the bank's standard LTV (and a lower rate), but achieving a net 'Zero Down' from your cash flow perspective. This is financially smarter than a high-interest 100% car loan.
            </Paragraph>
            <SubHeader title="Hypothecation of Existing Assets" id="existing-asset-hypothecation" />
            <Paragraph>
              For long-term, high-value customers, a bank may agree to take an existing asset (like an FD) and hypothecate it (place a lien on it) for the duration of the car loan. This is a security blanket for the bank, justifying the waiver of the down payment, as the money is already with them. Once the car loan is paid off, the FD is released.
            </Paragraph>
          </motion.section>

          {/* Section 6: Leveraging Relationship Equity (The Banker's Psychology) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="6. Leveraging Relationship Equity: The Banker's Mandate" icon={Users} />
            <Paragraph>
              Just like in home loans, your relationship with your primary bank (Total Relationship Value or TRV) is the grease that allows exceptions like 100% financing to move through.
            </Paragraph>
            <SubHeader title="The 'Anchor Customer' Argument" id="anchor-customer" />
            <Paragraph>
              Consolidate your salary account, savings, investments (FD/MF), and even a potential existing home loan with one bank. Present your total relationship value. The Relationship Manager (RM) has a mandate to retain high-TRV customers and can often get internal approvals for higher LTVs as a 'customer loyalty' concession, even when the policy dictates a down payment. The loyalty is more valuable than the risk of the extra 10%.
            </Paragraph>
            <SubHeader title="The Insurance Package Deal" id="insurance-package" />
            <Paragraph>
              Offer to purchase the mandatory car insurance (and potentially a life insurance policy) directly through the same bank (or their subsidiary). This generates extra revenue for the bank, making the 100% finance offer more palatable to their profitability model. Use the phrase: *“I am happy to purchase the insurance package from your bank if you can facilitate 100% financing on the car.”*
            </Paragraph>
          </motion.section>

          {/* Section 7: Negotiation Tactics: Squeezing the Extra 10% */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="7. The Negotiation Blueprint: Squeezing the Last 10% of Funding" icon={Feather} />
            <Paragraph>
              Once you meet all the eligibility criteria, the final hurdle is negotiation, treating the 100% LTV as a premium feature you are asking for.
            </Paragraph>
            <SubHeader title="The 'Final Rate' Trade-Off" id="final-rate-tradeoff" />
            <Paragraph>
              Acknowledge that 100% funding is a risk for the bank. Offer a small concession on the interest rate you are willing to accept. For example, if you qualify for 8.5%, say you are willing to take 8.75% *if* they approve the full 100% LTV, covering RTO and insurance. This demonstrates you understand the value of the request and are negotiating in good faith.
            </Paragraph>
            <SubHeader title="The Processing Fee Waiver Trade" id="processing-fee-waiver" />
            <Paragraph>
              If the bank is firm on the 90% LTV but is willing to waive the processing fee (typically 0.5% - 1.0%), take the waiver. This saved fee can then be used to cover a portion of your down payment, minimizing your out-of-pocket cash outflow, which is the ultimate goal of "100% finance."
            </Paragraph>
            <KeyTakeaway>
              **Choose a Shorter Tenure:** Banks are more amenable to 100% finance if the loan tenure is shorter (e.g., 3-5 years instead of 7 years). A shorter tenure reduces the overall interest risk and ensures the bank's exposure drops faster than the car's depreciation.
            </KeyTakeaway>
          </motion.section>

          {/* Section 8: The Documentation Lock-In */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="8. The Documentation Lock-In: Proof of Stability" icon={Activity} />
            <Paragraph>
              For 100% LTV, your documentation needs to be impeccable, demonstrating absolute stability and income continuity.
            </Paragraph>
            <BulletPoint>Salaried: Consistent employment history of 3+ years with the same company, and salary routed through the same bank you apply to.</BulletPoint>
            <BulletPoint>Self-Employed: Clear, audited financials for 3+ years showing rising profitability, clear bank statements, and perfect GST compliance.</BulletPoint>
            <BulletPoint>Bank Statements: Show no bounced checks (ECS/NACH mandates) or sudden, unexplained large cash withdrawals in the last 12 months. Any instability here will veto a high-LTV loan.</BulletPoint>
            <Paragraph>
              Every document must be perfectly aligned with your CIBIL profile and application form. Any mismatch will be used by the underwriting team to reject the higher LTV request.
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
              <span>Drive Off with Zero Down: Start Your Pre-Approval</span>
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Get a personalized LTV analysis and connect with lenders known for 100% financing options for prime borrowers.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => alert("Personalized Car Loan Eligibility Check Initiated!")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Check My Zero Down Eligibility
              </button>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
};

export default CarLoan100PercentFinance;
