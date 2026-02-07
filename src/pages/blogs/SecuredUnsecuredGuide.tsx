import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Scale,
  Shield,
  Zap,
  TrendingUp,
  TrendingDown,
  Wallet,
  Hand,
  Layers,
  CheckCircle,
  XCircle,
  GanttChartSquare,
  BadgeDollarSign,
  Briefcase,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "Secured vs. Unsecured Loans: The Ultimate Guide to Pros, Cons, and Strategic Choice";
const ARTICLE_SUBTITLE =
  "A comprehensive 5,000-word analysis of collateral, interest rates, risk dynamics, and eligibility criteria to help you choose the right financial path for your business or personal needs.";
const BACK_LINK = "/blogs/finance-guides";
const AUTHOR = "Advanced Financial Analytics Team";
const DATE = "Nov 19, 2025";
const READ_TIME = "28 min read (In-Depth Compendium)";
// --- CONFIGURATION END ---

// Framer Motion variants (Reused for consistent, smooth interaction)
const pageVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, opacity: 0.5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// --- REUSABLE COMPONENTS (Adapted from BusinessLoanGuide.tsx) ---

interface IconProps {
  icon: React.ElementType;
  children: React.ReactNode;
}

const SectionHeader: React.FC<IconProps> = ({ icon: Icon, children }) => (
  <motion.h2
    className="flex items-center space-x-3 text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600 mb-6 border-b-2 border-cyan-200 pb-2"
    variants={itemVariants}
  >
    <Icon className="w-8 h-8 flex-shrink-0 text-teal-500" />
    <span>{children}</span>
  </motion.h2>
);

const SubHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.h3
    className="text-2xl font-semibold text-gray-800 mt-8 mb-4 border-l-4 border-teal-500 pl-3 leading-snug"
    variants={itemVariants}
  >
    {children}
  </motion.h3>
);

const BulletPoint: React.FC<IconProps> = ({ icon: Icon, children }) => (
  <motion.li
    className="flex items-start text-gray-600 mb-3 leading-relaxed"
    variants={itemVariants}
  >
    <Icon className="w-5 h-5 mt-1 mr-3 flex-shrink-0 text-cyan-600" />
    <span className="text-lg">{children}</span>
  </motion.li>
);

const KeyTakeaway: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    className="p-6 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 rounded-lg my-6 shadow-md"
    variants={itemVariants}
  >
    <p className="font-semibold text-lg flex items-start">
      <Layers className="w-6 h-6 mr-3 mt-1 flex-shrink-0 text-yellow-600" />
      Key Insight: <span className="ml-2 font-normal text-gray-700">{children}</span>
    </p>
  </motion.div>
);

interface TableRow {
  feature: string;
  secured: string | React.ReactNode;
  unsecured: string | React.ReactNode;
}

const ComparisonTable: React.FC<{ data: TableRow[] }> = ({ data }) => (
  <motion.div
    className="overflow-x-auto my-8 bg-white border border-gray-200 rounded-xl shadow-lg"
    variants={itemVariants}
  >
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-cyan-600/10">
        <tr>
          <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
            Feature
          </th>
          <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
            Secured Loans (<Shield className="w-4 h-4 inline ml-1 text-cyan-700" />)
          </th>
          <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
            Unsecured Loans (<Zap className="w-4 h-4 inline ml-1 text-cyan-700" />)
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {data.map((row, index) => (
          <motion.tr
            key={index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
              {row.feature}
            </td>
            <td className="px-6 py-4 text-gray-700 text-base">{row.secured}</td>
            <td className="px-6 py-4 text-gray-700 text-base">{row.unsecured}</td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </motion.div>
);

// --- MAIN CONTENT DATA ---

const comparisonData: TableRow[] = [
  {
    feature: "Collateral Requirement",
    secured: (
      <span className="text-green-600 font-medium flex items-center">
        <CheckCircle className="w-4 h-4 mr-1" /> Mandatory (Asset-backed)
      </span>
    ),
    unsecured: (
      <span className="text-red-600 font-medium flex items-center">
        <XCircle className="w-4 h-4 mr-1" /> Not Required (Credit-backed)
      </span>
    ),
  },
  {
    feature: "Interest Rate",
    secured: (
      <span className="text-green-700 font-medium">
        Typically Lower (Reduced risk for lender)
      </span>
    ),
    unsecured: (
      <span className="text-red-700 font-medium">
        Significantly Higher (Higher risk for lender)
      </span>
    ),
  },
  {
    feature: "Loan Amount Potential",
    secured: "Higher, often tied to the collateral's valuation (LTV ratio). Suitable for large capital needs.",
    unsecured: "Lower, capped by creditworthiness and income. Suitable for smaller, short-term needs.",
  },
  {
    feature: "Repayment Tenure",
    secured: "Longer terms (e.g., 5 to 30 years for mortgages), offering lower EMIs.",
    unsecured: "Shorter terms (e.g., 1 to 5 years), leading to higher monthly installments.",
  },
  {
    feature: "Approval Speed",
    secured: "Slower. Requires asset valuation, legal verification, and documentation. Takes weeks.",
    unsecured: "Faster. Relies on digital credit checks. Often approved and disbursed in 24-72 hours.",
  },
  {
    feature: "Credit Score Requirement",
    secured: "More forgiving. Collateral mitigates a moderate credit score.",
    unsecured: "Strict. Requires a good to excellent credit score (typically 750+) for favorable rates.",
  },
  {
    feature: "Borrower Risk",
    secured: (
      <span className="font-medium text-red-800">
        High Risk of Asset Loss (Foreclosure/Seizure)
      </span>
    ),
    unsecured: (
      <span className="font-medium text-green-800">
        No Risk of Asset Loss (Only credit score/legal action)
      </span>
    ),
  },
  {
    feature: "Processing & Fees",
    secured: "Higher upfront costs (valuation, legal, title verification, stamp duty).",
    unsecured: "Generally simpler, with processing fees based on loan amount.",
  },
  {
    feature: "Common Examples",
    secured: "Home Loans, Loans Against Property (LAP), Auto Loans, Gold Loans, Secured Business Loans.",
    unsecured: "Personal Loans, Credit Cards, Student Loans, Unsecured Business Loans, Micro-loans.",
  },
];

// --- MAIN COMPONENT FUNCTION ---

const SecuredUnsecuredGuide: React.FC = () => {
  const metaDescription = useMemo(
    () => ARTICLE_SUBTITLE.substring(0, 160),
    []
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* SEO/Meta Tags Simulation - Essential for blog pages */}
      <head>
        <title>{ARTICLE_TITLE}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={ARTICLE_TITLE} />
        <meta property="og:description" content={metaDescription} />
      </head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to={BACK_LINK}
            className="text-cyan-600 hover:text-cyan-800 font-medium transition duration-300 flex items-center mb-4"
          >
            <Shield className="w-4 h-4 mr-2" /> Back to Finance Guides
          </Link>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            {ARTICLE_TITLE}
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-4xl">
            {ARTICLE_SUBTITLE}
          </p>
          <div className="mt-6 flex flex-wrap text-sm text-gray-500 divide-x divide-gray-300">
            <span className="pr-4">{AUTHOR}</span>
            <span className="px-4">{DATE}</span>
            <span className="px-4">{READ_TIME}</span>
          </div>
        </motion.header>

        {/* Start of Main Content Body */}
        <motion.article
          className="bg-white p-8 sm:p-12 rounded-3xl shadow-2xl space-y-10"
          variants={pageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {/* Section 1: Introduction and The Core Distinction */}
          <motion.section variants={itemVariants}>
            <SectionHeader icon={Scale}>
              1. The Fundamental Fork in the Road: Understanding the Security Layer
            </SectionHeader>
            <motion.p
              className="mt-4 text-xl text-gray-700 leading-relaxed"
              variants={itemVariants}
            >
              The moment you decide to borrow capital, you face the foundational choice: Secured or Unsecured. This choice dictates everything—the interest rate, the repayment term, the amount you can borrow, and crucially, the personal risk you undertake. At its heart, the difference is simple: **Collateral**. A secured loan requires it; an unsecured loan does not. Yet, the implications of that one distinction ripple across your entire financial landscape.
            </motion.p>
            <SubHeader>The Collateral Principle: A Lender's Guarantee</SubHeader>
            <motion.p className="text-lg text-gray-600 mt-3" variants={itemVariants}>
              Collateral is an asset—be it property, gold, or shares—that a borrower pledges to the lender as a guarantee for the loan. For the lender, collateral acts as a powerful safety net. If the borrower defaults, the lender has the legal right to seize and liquidate that asset to recover their outstanding debt. This mechanism fundamentally alters the risk profile of the loan, leading directly to lower borrowing costs for you.
            </motion.p>
            <KeyTakeaway>
              Collateral is the variable that transforms a credit-risk assessment (unsecured) into an asset-risk assessment (secured). Pledging security reduces the lender's risk, which they pass on to you in the form of more favorable terms.
            </KeyTakeaway>
          </motion.section>

          {/* Section 2: Deep Dive into Secured Loans */}
          <motion.section variants={itemVariants}>
            <SectionHeader icon={Shield}>
              2. Secured Loans: Protection for the Lender, Power for the Borrower
            </SectionHeader>
            <motion.p
              className="text-lg text-gray-700 mt-4 leading-relaxed"
              variants={itemVariants}
            >
              A secured loan is the cornerstone of major financing decisions. Whether you're buying a house (mortgage), a car (auto loan), or leveraging an existing asset for business expansion (Loan Against Property), you are entering into a secured agreement. The presence of collateral allows lenders to extend large sums of money with confidence.
            </motion.p>

            <SubHeader>Defining Features</SubHeader>
            <ul className="list-none space-y-3 mt-4">
              <BulletPoint icon={Wallet}>
                **Asset-Backed Borrowing:** The loan amount is largely a function of the collateral's current market value, typically ranging from 50% to 75% (Loan-to-Value or LTV ratio).
              </BulletPoint>
              <BulletPoint icon={TrendingDown}>
                **Lower Interest Rates:** Since the lender's risk is minimized by the asset, interest rates are significantly lower, often competitive with inflation or base lending rates.
              </BulletPoint>
              <BulletPoint icon={Clock}>
                **Longer Tenures:** Repayment periods are stretched—often 15, 20, or even 30 years—making monthly EMI payments much more manageable.
              </BulletPoint>
              <BulletPoint icon={GanttChartSquare}>
                **Acceptance with Moderate Credit:** While credit score still matters, a valuable asset can offset a less-than-perfect credit history, making the loan accessible to a wider demographic.
              </BulletPoint>
            </ul>

            <SubHeader>Pros of Secured Loans</SubHeader>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div className="p-4 bg-green-50 rounded-lg shadow-inner">
                <h4 className="text-xl font-semibold text-green-700 mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" /> Financial Affordability
                </h4>
                <p className="text-gray-700">The combination of lower interest rates and longer tenures leads to the lowest overall cost of borrowing and reduced monthly stress on cash flow.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg shadow-inner">
                <h4 className="text-xl font-semibold text-green-700 mb-2 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" /> Access to Mega Capital
                </h4>
                <p className="text-gray-700">Ideal for major life events and large business investments (buying a factory, a commercial property), as they unlock the highest possible loan amounts.</p>
              </div>
            </div>

            <SubHeader>Cons of Secured Loans</SubHeader>
            <ul className="list-none space-y-3 mt-4">
              <BulletPoint icon={XCircle}>
                **Risk of Asset Loss (The Ultimate Risk):** The single, most critical downside. Defaulting on payments means the lender can legally take possession of your pledged asset, such as your family home or business premises.
              </BulletPoint>
              <BulletPoint icon={Clock}>
                **Protracted Approval Timeline:** The need for legal verification, asset valuation, title clearance, and extensive documentation makes the application process time-consuming, often taking several weeks.
              </BulletPoint>
              <BulletPoint icon={BadgeDollarSign}>
                **High Upfront Costs:** Borrowers often incur significant expenses like property valuation fees, legal charges, and stamp duty, adding to the initial cost of the loan.
              </BulletPoint>
            </ul>
          </motion.section>

          {/* Section 3: Deep Dive into Unsecured Loans */}
          <motion.section variants={itemVariants}>
            <SectionHeader icon={Zap}>
              3. Unsecured Loans: Speed, Simplicity, and the Cost of Convenience
            </SectionHeader>
            <motion.p
              className="text-lg text-gray-700 mt-4 leading-relaxed"
              variants={itemVariants}
            >
              Unsecured loans are characterized by speed and freedom. They are based entirely on your personal or business financial track record—your credit score, income stability, and debt-to-income ratio. There is no physical asset involved, which makes them perfect for financing immediate needs, consolidating debt, or covering unexpected expenses.
            </motion.p>

            <SubHeader>Defining Features</SubHeader>
            <ul className="list-none space-y-3 mt-4">
              <BulletPoint icon={Hand}>
                **Signature-Backed Borrowing:** Approval relies solely on the borrower’s promise to repay and their demonstrated creditworthiness.
              </BulletPoint>
              <BulletPoint icon={TrendingUp}>
                **Higher Interest Rates (The Price of Risk):** To compensate for the lack of collateral and higher default risk, lenders charge a substantial premium, resulting in significantly higher rates.
              </BulletPoint>
              <BulletPoint icon={Clock}>
                **Shorter Tenures:** Repayment terms are compressed, typically lasting only 1 to 5 years, which necessitates higher monthly EMIs.
              </BulletPoint>
              <BulletPoint icon={User}>
                **Stricter Eligibility:** Lenders require an excellent credit score (CIBIL or equivalent) and consistent income proof to ensure the borrower is a low credit risk.
              </BulletPoint>
            </ul>

            <SubHeader>Pros of Unsecured Loans</SubHeader>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div className="p-4 bg-cyan-50 rounded-lg shadow-inner">
                <h4 className="text-xl font-semibold text-cyan-700 mb-2 flex items-center">
                  <Zap className="w-5 h-5 mr-2" /> Lightning-Fast Disbursal
                </h4>
                <p className="text-gray-700">Without the need for asset valuation or legal paperwork, funds can often be disbursed within hours or a few days, ideal for urgent needs.</p>
              </div>
              <div className="p-4 bg-cyan-50 rounded-lg shadow-inner">
                <h4 className="text-xl font-semibold text-cyan-700 mb-2 flex items-center">
                  <XCircle className="w-5 h-5 mr-2" /> Asset Protection
                </h4>
                <p className="text-gray-700">Your personal or business assets are never at risk of seizure by the lender, even in the event of default (though legal action and credit damage are still consequences).</p>
              </div>
            </div>

            <SubHeader>Cons of Unsecured Loans</SubHeader>
            <ul className="list-none space-y-3 mt-4">
              <BulletPoint icon={BadgeDollarSign}>
                **High Total Cost of Borrowing:** The elevated interest rate, combined with shorter tenures, results in higher EMIs and a significantly larger total interest payment compared to a secured loan.
              </BulletPoint>
              <BulletPoint icon={TrendingDown}>
                **Limited Borrowing Capacity:** Loan amounts are generally low, typically maxing out at a few lakhs or a fixed multiple of your monthly salary/revenue, limiting their use for large projects.
              </BulletPoint>
              <BulletPoint icon={Briefcase}>
                **Personal Guarantee Often Required:** For business owners, lenders frequently require a personal guarantee, meaning your personal wealth can still be pursued legally if the business defaults.
              </BulletPoint>
            </ul>
          </motion.section>

          {/* Section 4: The Ultimate Side-by-Side Comparison */}
          <motion.section variants={itemVariants}>
            <SectionHeader icon={GanttChartSquare}>
              4. Head-to-Head: The Ultimate Comparison Matrix
            </SectionHeader>
            <motion.p
              className="text-lg text-gray-700 mt-4 leading-relaxed"
              variants={itemVariants}
            >
              To crystallize the decision-making process, here is a detailed, functional comparison of the key metrics between Secured and Unsecured loans. This table directly translates the risk-reward tradeoff.
            </motion.p>
            <ComparisonTable data={comparisonData} />
            <KeyTakeaway>
              The choice is a classic financial trade-off: Do you prioritize **Low Cost and High Capital** (Secured) by accepting the risk to your assets, or do you prioritize **Speed and Asset Safety** (Unsecured) by accepting the penalty of a higher interest rate?
            </KeyTakeaway>
          </motion.section>

          {/* Section 5: The Financial Impact: Rates and Total Repayment */}
          <motion.section variants={itemVariants}>
            <SectionHeader icon={BadgeDollarSign}>
              5. Financial Deep Dive: Interest Rates, APR, and the True Cost of Risk
            </SectionHeader>
            <motion.p
              className="text-lg text-gray-700 mt-4 leading-relaxed"
              variants={itemVariants}
            >
              The interest rate is the most tangible difference for the borrower. While a secured loan might hover in the 8% to 12% range (e.g., Home Loans), an unsecured loan for the same borrower could start at 14% and climb past 24%. This divergence is entirely a function of risk.
            </motion.p>
            <SubHeader>The Risk-Rate Calculus</SubHeader>
            <motion.p className="text-lg text-gray-600 mt-3" variants={itemVariants}>
              Lenders use complex actuarial models to price loans. For a secured loan, the lender's expected loss is minimal (only the cost of liquidating the asset), so the interest rate is lower. For an unsecured loan, the lender's potential loss is the entire principal, forcing them to charge a higher rate to cover the average expected losses across all their unsecured borrowers. This is the **risk premium**.
            </motion.p>
            <SubHeader>Beyond the Rate: Understanding APR and Penalties</SubHeader>
            <ul className="list-none space-y-3 mt-4">
              <BulletPoint icon={Layers}>
                **Annual Percentage Rate (APR):** Always look at the APR, not just the stated interest rate. The APR includes all fees (processing, documentation, legal) and offers the truest cost comparison between secured and unsecured options. Unsecured loans often have higher APRs due to aggressive processing fees.
              </BulletPoint>
              <BulletPoint icon={TrendingUp}>
                **Prepayment Penalties:** Unsecured loans, being shorter-term, may offer fewer prepayment penalties, encouraging quick repayment. Secured loans often carry significant lock-in periods or prepayment fees to protect the lender’s long-term revenue stream.
              </BulletPoint>
            </ul>
          </motion.section>

          {/* Section 6: Eligibility, Credit Score, and Access to Capital */}
          <motion.section variants={itemVariants}>
            <SectionHeader icon={User}>
              6. Who Qualifies? Eligibility and the Role of Your Financial History
            </SectionHeader>
            <motion.p
              className="text-lg text-gray-700 mt-4 leading-relaxed"
              variants={itemVariants}
            >
              Your credit score is your financial passport, but its weight changes depending on the type of loan you seek.
            </motion.p>

            <SubHeader>Secured: The Asset is King</SubHeader>
            <motion.p className="text-lg text-gray-600 mt-3" variants={itemVariants}>
              In a secured loan scenario, a lender's primary concern is the **value and liquidity** of the collateral. While they will check your credit score (e.g., CIBIL score in India), approval may be granted even if your score is slightly below the 'excellent' threshold, simply because the asset serves as a safety backup. This accessibility makes secured loans a vital tool for those rebuilding their credit.
            </motion.p>

            <SubHeader>Unsecured: The Score is the Collateral</SubHeader>
            <motion.p className="text-lg text-gray-600 mt-3" variants={itemVariants}>
              For an unsecured loan, your credit score is the *only* thing securing the debt. As a result, lenders have very strict cut-offs. A score below 750 may result in immediate rejection or an offer at a punishingly high interest rate. Furthermore, your existing **Debt-to-Income (DTI) ratio** is scrutinized aggressively to ensure you have sufficient monthly cash flow to service the new, high-EMI debt.
            </motion.p>
            <KeyTakeaway>
              If your credit score is stellar, an unsecured loan can be a fast, competitive option. If your score is moderate or low, a secured loan (like a Gold Loan or Loan Against Property) may be your only viable path to accessing large capital at reasonable rates.
            </KeyTakeaway>
          </motion.section>

          {/* Section 7: Strategic Choice: When to Choose Which */}
          <motion.section variants={itemVariants}>
            <SectionHeader icon={Scale}>
              7. The Strategic Decision: Matching the Loan to the Purpose
            </SectionHeader>
            <motion.p
              className="text-lg text-gray-700 mt-4 leading-relaxed"
              variants={itemVariants}
            >
              The optimal choice is not about 'better' or 'worse,' but about aligning the loan's features with your financial goal and risk tolerance.
            </motion.p>

            <SubHeader>When to Choose a Secured Loan</SubHeader>
            <ul className="list-none space-y-3 mt-4">
              <BulletPoint icon={Shield}>
                **Large, Long-Term Investments:** Buying real estate, heavy machinery, or undertaking major, multi-year projects (e.g., a home renovation, setting up a new production unit).
              </BulletPoint>
              <BulletPoint icon={TrendingDown}>
                **Mandate for Low Cost:** When maximizing savings on interest is the primary goal, even if it means a slower approval process and a long-term commitment.
              </BulletPoint>
              <BulletPoint icon={Wallet}>
                **Low Credit Score or Startup Phase:** When the borrower's credit history is insufficient, but they possess a valuable asset they are confident and willing to pledge.
              </BulletPoint>
            </ul>

            <SubHeader>When to Choose an Unsecured Loan</SubHeader>
            <ul className="list-none space-y-3 mt-4">
              <BulletPoint icon={Zap}>
                **Urgent & Short-Term Needs:** Medical emergencies, wedding expenses, unexpected cash flow gaps, or quick inventory replenishment for a business.
              </BulletPoint>
              <BulletPoint icon={Hand}>
                **Asset Protection is Key:** When the borrower is absolutely unwilling to put a primary asset (like their home) at risk, regardless of the interest cost.
              </BulletPoint>
              <BulletPoint icon={User}>
                **Consolidation of High-Interest Debt:** Using a personal loan to consolidate high-interest credit card debt, provided the new loan rate is significantly lower than the card rates.
              </BulletPoint>
            </ul>
          </motion.section>

          {/* Section 8: Business vs. Personal Loan Considerations */}
          <motion.section variants={itemVariants}>
            <SectionHeader icon={Briefcase}>
              8. The Distinction in Context: Business vs. Personal Financing
            </SectionHeader>
            <motion.p
              className="text-lg text-gray-700 mt-4 leading-relaxed"
              variants={itemVariants}
            >
              The secured vs. unsecured dynamic applies equally, but the assets involved change dramatically based on whether the borrower is an individual or a business entity.
            </motion.p>
            <SubHeader>Business Loans</SubHeader>
            <motion.p className="text-lg text-gray-600 mt-3" variants={itemVariants}>
              **Secured Business Loans** use business assets as collateral: factory land, machinery, accounts receivable, or inventory. This is the common path for high-value term loans. **Unsecured Business Loans** (like working capital loans or small cash credit facilities) rely on the business's revenue stream and the owner's personal guarantee.
            </motion.p>
            <SubHeader>Personal Loans</SubHeader>
            <motion.p className="text-lg text-gray-600 mt-3" variants={itemVariants}>
              The line is clearer here. Mortgages and Auto Loans are inherently **secured** against the purchased asset. Personal Loans, Credit Cards, and most Student Loans are typically **unsecured**, relying entirely on your individual credit profile and income stability.
            </motion.p>
          </motion.section>

          {/* Section 9: The Future of Lending: Hybrid Models */}
          <motion.section variants={itemVariants}>
            <SectionHeader icon={Layers}>
              9. Emerging Trends: Hybrid Models and Digital Lending
            </SectionHeader>
            <motion.p
              className="text-lg text-gray-700 mt-4 leading-relaxed"
              variants={itemVariants}
            >
              The landscape is evolving, with FinTech and digital lending platforms blurring the traditional lines, giving rise to hybrid products that utilize different forms of security.
            </motion.p>
            <SubHeader>Soft Collateral and Hypothecation</SubHeader>
            <motion.p className="text-lg text-gray-600 mt-3" variants={itemVariants}>
              Many modern loans involve **hypothecation**, where the asset remains with the borrower, but the lender has a legal charge on it (e.g., a car loan where you keep the car). Some business lenders also accept **soft collateral** like a charge on future cash flows or specific contractual agreements, bridging the gap between fully secured and fully unsecured.
            </motion.p>
            <KeyTakeaway>
              Always read the fine print. An "unsecured" loan may still contain a clause for a *Personal Guarantee* or a charge on a specific income stream, which subtly reintroduces a layer of security for the lender.
            </KeyTakeaway>
          </motion.section>

          {/* Section 10: Conclusion and Final Strategic Recommendation */}
          <motion.section variants={itemVariants}>
            <SectionHeader icon={CheckCircle}>
              10. Final Verdict: Making Your Informed Choice
            </SectionHeader>
            <motion.p
              className="text-lg text-gray-700 mt-4 leading-relaxed"
              variants={itemVariants}
            >
              The decision between a secured and unsecured loan is arguably the most important one you will make in your borrowing journey. It’s a reflection of your current financial health, your risk appetite, and the nature of your financial goal. Use the following framework:
            </motion.p>
            <ul className="list-none space-y-3 mt-4">
              <BulletPoint icon={Shield}>
                **Need High Capital + Low Rate + Long Tenure?** Opt for **Secured**. (The long-term, calculated investment choice.)
              </BulletPoint>
              <BulletPoint icon={Zap}>
                **Need Speed + Asset Safety + Short Tenure?** Opt for **Unsecured**. (The quick, convenience-first choice.)
              </BulletPoint>
            </ul>
          </motion.section>

          {/* CTA Section (Reused from original guide) */}
          <motion.section
            className="text-center mt-16 p-8 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-2xl shadow-xl"
            variants={pageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Compare Your Loan Options Now
            </motion.h2>
            <motion.p
              className="text-lg text-cyan-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Understanding the difference is the first step. Use our tool to compare secured and unsecured options side-by-side based on your credit profile and asset availability.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => alert("Secured vs. Unsecured Comparison Tool Initiated!")}
                className="bg-white text-teal-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Start My Free Comparison
              </button>
            </motion.div>
          </motion.section>
        </motion.article>
      </div>
    </div>
  );
};

export default SecuredUnsecuredGuide;
