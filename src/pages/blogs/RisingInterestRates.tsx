import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  TrendingUp, // Used for Rising Rates
  DollarSign, // Used for EMIs and Cost
  BarChart2, // Used for Inflation and Economic Data
  Scale, // Used for Regulatory/Repo Rate
  Home, // Used for Home Loans
  CreditCard, // Used for Personal/Unsecured Loans
  Users, // Used for Borrower Strategy
  Feather, // Used for Negotiation Tactics
  Zap, // Used for CTA
} from "lucide-react";
import { Link } from "react-router-dom"; 

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "Rising Interest Rates 2026: How It Impacts Your Loans & EMIs";
const ARTICLE_SUBTITLE =
  "The essential guide for Indian borrowers: Decrypting the RBI's Repo Rate hike, understanding the impact on Home, Auto, and Personal Loans, and 9 strategies to recession-proof your EMIs.";
const BACK_LINK = "/blogs/finance-strategy"; 
const AUTHOR = "Insider Macro Analyst";
const DATE = "Dec 1, 2025";
const READ_TIME = "25 min read (The Stability Manual)"; 
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
  hidden: { opacity: 0, y: 30, opacity: 0.5 },
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
    <DollarSign className="w-5 h-5 mt-1 mr-3 text-green-500 flex-shrink-0" /> {/* Changed icon to DollarSign for financial relevance */}
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
      <span className="font-extrabold mr-2">💡 Strategy Alert:</span>
      {children}
    </p>
  </motion.div>
);

// ====================================================================
// MAIN COMPONENT
// ====================================================================

const RisingInterestRates: React.FC = () => {
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 dark:from-red-400 dark:to-orange-300">
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

          {/* Section 1: The Core Mechanism: Why Rates Rise */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="1. The Core Mechanism: Decrypting the RBI's Rate Hike" icon={Scale} />
            <Paragraph>
              Interest rates don't rise in a vacuum; they are a primary tool used by the **Reserve Bank of India (RBI)** to manage the economy, specifically to fight **inflation**. When consumer prices (CPI) rise too quickly, the RBI hikes the **Repo Rate**. This is the rate at which commercial banks borrow money from the RBI, and it is the single most important factor determining your loan's interest rate.
            </Paragraph>
            <SubHeader title="Inflation and the Repo Rate Relationship" id="repo-rate-inflation" />
            <Paragraph>
              A rate hike makes borrowing money more expensive for banks. Banks, in turn, pass this increased cost onto customers by raising their own lending rates—the **Marginal Cost of Funds based Lending Rate (MCLR)**, the **Repo Linked Lending Rate (RLLR)**, and others. The intended effect is to discourage spending, reduce demand, and ultimately cool down inflation. For the common borrower, this translates directly into higher EMIs.
            </Paragraph>
            <KeyTakeaway>
              Monitor the RBI's **Monetary Policy Committee (MPC)** meetings. Any upward revision to their inflation projection is a leading indicator that a Repo Rate hike is imminent. Pre-empting this allows you to accelerate loan paydowns or lock in fixed rates.
            </KeyTakeaway>
            <SubHeader title="The Global Factor: Tracking US Federal Reserve Decisions" id="global-factor" />
            <Paragraph>
              While the RBI sets domestic policy, global liquidity and capital flows matter. Decisions by major central banks, particularly the US Federal Reserve (the Fed), influence the rupee's stability and foreign investment into India. If the Fed raises rates aggressively, the RBI may feel pressured to follow suit to prevent capital flight, even if domestic inflation is manageable. This complex interplay means your EMI is indirectly linked to global financial policy.
            </Paragraph>
          </motion.section>

          {/* Section 2: Home Loans: The Pain Point of Floating Rates */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="2. Home Loans: The Primary Victim of Rising Rates" icon={Home} />
            <Paragraph>
              The impact of rising rates is most acute on **Home Loans** due to their long tenures (15-30 years) and the prevalence of **floating rate** structures, especially RLLR-linked loans. When the rate climbs, the bank typically has two options to manage your loan, and they almost always choose the one that hurts less immediately: increasing the tenure.
            </Paragraph>
            <SubHeader title="Tenure Extension vs. EMI Hike" id="tenure-vs-emi" />
            <Paragraph>
              For a 0.5% rate hike:
              <ul className="list-disc ml-6 mt-3 space-y-2">
                <BulletPoint>Most banks initially **extend the loan tenure** (e.g., from 20 years to 23 years) while keeping the EMI constant. This avoids immediate shock to your monthly budget but dramatically increases the total interest paid over the life of the loan.</BulletPoint>
                <BulletPoint>If the rate hikes are persistent, the interest component exceeds the fixed EMI, leading to **negative amortization** or the bank being forced to **hike the EMI** itself to ensure principal repayment continues.</BulletPoint>
              </ul>
              Borrowers must actively monitor their statement to see if the principal component is shrinking. If it isn't, action is needed.
            </Paragraph>
            <KeyTakeaway>
              **The 3-Year Review:** Review your home loan every 3-5 years. If the total rate hike has exceeded 1.5% to 2.0% since you took the loan, seriously consider **refinancing** (balance transfer) to a competitor who might offer a lower spread, or negotiate with your current bank to reduce their spread (the margin above the Repo Rate).
            </KeyTakeaway>
            <SubHeader title="The Floating-to-Fixed Rate Trap" id="floating-to-fixed" />
            <Paragraph>
              Switching a floating rate loan to a fixed rate loan when rates are already high is often a defensive move, but it has its cost. The **fixed rate** offered by banks is generally 1% to 2% higher than the current floating rate, as it builds in a premium for the bank's future risk. This is a trade-off: higher current EMI for protection against potential future hikes. Only consider this if you believe rates will rise by more than the fixed-rate premium over the next 5 years.
            </Paragraph>
          </motion.section>

          {/* Section 3: Impact on Unsecured Loans (Personal Loans & Credit Cards) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="3. Unsecured Loans: The Immediate Cost Increase" icon={CreditCard} />
            <Paragraph>
              Unsecured debt, like **Personal Loans** and **Credit Card revolving balances**, is inherently riskier for banks and typically carries much higher interest rates (12% to 40%). Unlike home loans, most personal loans are on a fixed-rate basis for the tenure, so existing loan EMIs are generally *not* affected by rate hikes. However, the impact is felt acutely by new borrowers and those with revolving credit.
            </Paragraph>
            <SubHeader title="Higher Cost for New Borrowing" id="new-borrowing-cost" />
            <Paragraph>
              If you plan to take out a new personal loan in 2026, the rate offered will be significantly higher than a year prior. A 1% Repo Rate hike can translate to a 1.5% to 2.0% jump in the final personal loan rate, making debt consolidation or major purchases much more expensive. This is the bank's way of reducing its risk exposure in a high-interest environment.
            </Paragraph>
            <SubHeader title="The Credit Card Minimum Payment Trap" id="minimum-payment-trap" />
            <Paragraph>
              Credit card Annual Percentage Rates (APRs) are often the first to adjust upwards. If you carry a revolving balance (not paying the full amount due), the interest charged on that balance will increase immediately. This raises your effective cost of borrowing and can quickly spiral into a debt trap. The trick is to treat your credit card like a deferred payment tool, not a loan, and always clear the total outstanding balance.
            </Paragraph>
            <BulletPoint>Focus on eliminating **unsecured debt** first in a rising rate environment, as this debt is the most expensive and carries the highest risk premium.</BulletPoint>
            <BulletPoint>Auto loans are often hybrid—fixed-rate for a short tenure (5-7 years). Their EMIs are fixed, but the cost of a *new* auto loan will be higher.</BulletPoint>
          </motion.section>

          {/* Section 4: Proactive Strategies for Recession-Proofing Your Debt */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="4. Proactive Strategies: Recession-Proofing Your Loan Portfolio" icon={Users} />
            <Paragraph>
              The best defense against rising rates is a solid pre-payment strategy that reduces your principal balance. By reducing the outstanding amount, every subsequent EMI goes towards a smaller debt, mitigating the impact of an interest rate rise.
            </Paragraph>
            <SubHeader title="The Principal Reduction Blitz" id="principal-reduction" />
            <Paragraph>
              Make one extra EMI payment annually, or make a small lump-sum payment whenever you receive a bonus or tax refund. Even a ₹50,000 lump sum on a ₹50-lakh, 20-year loan can cut years off the tenure and save lakhs in total interest. The earlier in the loan tenure you make the pre-payment, the greater the compounding savings.
            </Paragraph>
            <SubHeader title="The EMI Escalation Tactic" id="emi-escalation" />
            <Paragraph>
              Many salaried individuals see an annual income increase. Instead of increasing your standard of living with that raise, commit 50% of the raise to **voluntarily increasing your EMI**. This small, non-disruptive hike accelerates principal repayment significantly and acts as a buffer against future rate increases. If the rate rises by 0.5%, your voluntary increase may absorb the shock without requiring the bank to extend the tenure.
            </Paragraph>
            <KeyTakeaway>
              **The Waterfall Strategy:** If you have multiple loans, prioritize the one where the maximum interest is paid. In a rising rate cycle, this is often the loan with the largest principal balance and the longest remaining tenure (usually the Home Loan). Use surplus funds to tackle this debt first.
            </KeyTakeaway>
          </motion.section>

          {/* Section 5: Negotiation and Refinancing Tactics */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="5. Negotiation Blueprint: Squeezing a Lower Rate Post-Hike" icon={Feather} />
            <Paragraph>
              Your bank may silently increase your loan's **Spread** (the margin above the Repo Rate) without notifying you, especially if your loan is old. You are not locked into the current rate; you can and should negotiate.
            </Paragraph>
            <SubHeader title="The Competition Challenge (Balance Transfer Threat)" id="balance-transfer-threat" />
            <Paragraph>
              Get a competitive home loan offer from a rival bank. Approach your current Relationship Manager (RM) with this official offer and ask them to match it. Banks would rather lower their spread slightly than lose a good, stable customer and the outstanding principal. Use the phrase: *“I am planning a balance transfer to Bank Y which is offering me RLLR + 1.5%. Can you reduce my spread from 2.0% to 1.4% to retain my business?”*
            </Paragraph>
            <SubHeader title="Refinance Your Personal Loan" id="refinance-personal-loan" />
            <Paragraph>
              If your personal loan rate is approaching 18% or 20% due to market hikes, explore a **Loan Against Property (LAP)** or **Gold Loan** instead. Since these are secured loans, their rates are significantly lower (often 9% to 12%). Use the funds from the secured loan to pay off the high-interest unsecured debt, effectively cutting your interest burden by half and insulating that debt from future rate volatility.
            </Paragraph>
            <BulletPoint>Lock in FD Rates: Rising rates are a boon for fixed deposits. Lock in new FD rates for longer tenures (3-5 years) to maximize return on savings while minimizing borrowing costs.</BulletPoint>
            <BulletPoint>Increase Down Payment: If applying for a new loan, a larger down payment reduces the principal required. This lowers the absolute cost of borrowing, making the rising interest rate percentage less painful in rupee terms.</BulletPoint>
          </motion.section>
          
          {/* CTA Section */}
          <motion.section
            className="text-center mt-16 p-8 bg-gradient-to-r from-red-600 to-orange-700 rounded-2xl shadow-xl"
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
              <span>Calculate Your Increased EMI Burden Now</span>
            </motion.h2>
            <motion.p
              className="text-lg text-red-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Use our Rate Shock Calculator to see the real impact of a 1.0% hike on your specific loan tenure and interest paid, and instantly generate a proactive repayment plan.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => alert("EMI Impact Calculator Launched!")}
                className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Launch My Rate Shock Calculator
              </button>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
};

export default RisingInterestRates;
