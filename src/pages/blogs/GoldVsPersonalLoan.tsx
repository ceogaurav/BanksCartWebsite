import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Target, // Used for Strategic Target
  Zap, // Used for Speed/Access
  Shield, // Used for Security/Risk
  TrendingDown, // Used for Interest Rates
  Activity, // Used for Flexibility
  Gavel, // Used for Default Consequences
  Users, // Used for Eligibility/Credit Score
  Briefcase, // Used for Loan Purpose
  CheckSquare, // Used for Documentation & Errors
} from "lucide-react";
import { Link } from "react-router-dom"; 

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "Gold Loan vs Personal Loan: Which Is Better in 2025?";
const ARTICLE_SUBTITLE =
  "The Definitive Guide for Indian Borrowers: Comparing Rates, Speed, Eligibility, and Risk to Choose Your Best Funding Option This Year.";
const BACK_LINK = "/blogs/finance-strategy"; 
const AUTHOR = "Financial Strategy Analyst";
const DATE = "Nov 19, 2025";
const READ_TIME = "20 min read (Definitive Guide)"; 
// --- CONFIGURATION END ---

// ====================================================================
// FRAMEWORK COMPONENTS (Replicated from LoanEligibilityTricks)
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
      <span className="font-extrabold mr-2">💡 Key Comparison:</span>
      {children}
    </p>
  </motion.div>
);

// Component for Comparison Table (New component for structured data)
interface ComparisonTableProps {
    data: { [key: string]: [string, string] }; // { Criterion: [Gold Loan Value, Personal Loan Value] }
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ data }) => (
    <motion.div variants={itemVariants} className="my-8 overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600">
            <thead className="bg-indigo-50 dark:bg-indigo-900/50">
                <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider rounded-tl-xl">Criterion</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-indigo-600 dark:text-indigo-300 uppercase tracking-wider">Gold Loan</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-pink-600 dark:text-pink-300 uppercase tracking-wider rounded-tr-xl">Personal Loan</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {Object.entries(data).map(([criterion, [goldValue, personalValue]], index) => (
                    <motion.tr key={criterion} variants={itemVariants} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/80'}>
                        <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 dark:text-white">{criterion}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg text-indigo-700 dark:text-indigo-400 font-semibold">{goldValue}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg text-pink-700 dark:text-pink-400 font-semibold">{personalValue}</td>
                    </motion.tr>
                ))}
            </tbody>
        </table>
    </motion.div>
);


// ====================================================================
// MAIN COMPONENT
// ====================================================================

const GoldVsPersonalLoan: React.FC = () => {
  
    const comparisonData = {
        'Interest Rate (APR)': ['7% - 15% (Lower)', '10.5% - 25% (Higher)'],
        'Collateral Required': ['Yes (Gold Jewelry)', 'No (Unsecured)'],
        'Processing Time': ['Hours to 1 Day (Faster)', '2-7 Days (Slower)'],
        'Loan Amount': ['Max 75% of Gold Value (LTV)', 'Based on Income/CIBIL'],
        'Eligibility Factor': ['Asset Value', 'Credit Score (CIBIL > 750) & Income'],
        'Consequence of Default': ['Loss of Gold', 'Severe CIBIL Damage'],
    };

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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 dark:from-indigo-400 dark:to-pink-300">
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

          {/* Section 1: The Core Difference - Secured vs. Unsecured */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="1. The Core Difference: Security and Risk Profile" icon={Shield} />
            <Paragraph>
              The fundamental difference between a Gold Loan and a Personal Loan lies in its **security structure**. A Personal Loan is **unsecured**, relying entirely on your creditworthiness and income. A Gold Loan is **secured**, using your gold jewelry as collateral. This difference dictates everything—from interest rates to eligibility and repayment risk.
            </Paragraph>
            <SubHeader title="The Lender's View: Assessing Risk" id="risk-assessment" />
            <Paragraph>
              Since a Gold Loan provides the bank with collateral (an asset easily liquidated), the risk to the lender is inherently lower. A Personal Loan offers no such protection, meaning the lender must charge a higher premium (interest rate) to compensate for the greater risk of default. This is why a Gold Loan is almost always cheaper.
            </Paragraph>
            <KeyTakeaway>
              If you have idle gold, a Gold Loan is a **low-risk, low-cost** option for the bank, which translates directly into a **lower interest rate** for you. A Personal Loan is a **high-risk, high-cost** option, suitable only when speed and lack of collateral are non-negotiable.
            </KeyTakeaway>
          </motion.section>

          {/* Section 2: Interest Rate Showdown (The Cost of Borrowing) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="2. Interest Rate Showdown: Why Gold Beats Personal (Usually)" icon={TrendingDown} />
            <Paragraph>
              Interest rates are the most crucial factor for long-term loan costs. As a rule, **Gold Loan rates (7%–15%)** are significantly lower than **Personal Loan rates (10.5%–25%)**. This variance is due to the collateral.
            </Paragraph>
            <SubHeader title="Rate Determinants: Asset vs. CIBIL" id="rate-determinants" />
            <Paragraph>
              For a Gold Loan, your rate is primarily determined by the **Loan-to-Value (LTV)** ratio (the percentage of the gold's value the bank lends). For a Personal Loan, your rate is determined by your **CIBIL Score**, Debt-to-Income (DTI) ratio, and your relationship with the bank. A low CIBIL score (below 750) can push your Personal Loan rate into the 18-25% bracket, making it punitive.
            </Paragraph>
            <Paragraph>
              For high-net-worth individuals (HNIs) with CIBIL scores above 800, the Personal Loan rate might approach the Gold Loan rate, but the Personal Loan will rarely be cheaper due to the unsecured nature.
            </Paragraph>
          </motion.section>

          {/* Section 3: Eligibility & Access (The CIBIL Gatekeeper) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="3. Eligibility & Access: Bypassing the CIBIL Gatekeeper" icon={Users} />
            <Paragraph>
              Eligibility is where the Gold Loan shines for borrowers with weak credit histories or limited documented income.
            </Paragraph>
            <SubHeader title="Gold Loan: Asset is King" id="gold-eligibility" />
            <Paragraph>
              To get a Gold Loan, you simply need to own the gold and prove your identity. Banks are more flexible with income proof and CIBIL scores. Even a slightly lower score might not disqualify you, though it could affect the rate offered. The gold itself is the primary security.
            </Paragraph>
            <SubHeader title="Personal Loan: CIBIL is Judge" id="personal-eligibility" />
            <Paragraph>
              A Personal Loan is a strict test of your credit history. A CIBIL score below 750 (or even 700 at NBFCs) makes approval difficult or expensive. You must also have verifiable income (salary slips, ITRs) that supports your Debt-to-Income Ratio (DTI). This loan is inaccessible to individuals with new jobs, low scores, or fluctuating income.
            </Paragraph>
            <KeyTakeaway>
              If your **CIBIL is poor or non-existent**, a Gold Loan is your only viable path to cheap credit. Using a Gold Loan and repaying it diligently is an excellent, low-risk way to **build or repair your CIBIL score** for future unsecured loans.
            </KeyTakeaway>
          </motion.section>
          
          {/* Section 4: Speed and Disbursal (The Quick Cash Requirement) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="4. Speed and Disbursal: When Time is Money" icon={Zap} />
            <Paragraph>
              In financial emergencies, speed is critical. Gold Loans are designed for rapid disbursal; Personal Loans, less so.
            </Paragraph>
            <SubHeader title="Gold Loan: Same-Day Money" id="gold-disbursal" />
            <Paragraph>
              A Gold Loan typically involves a quick in-branch assessment of the gold's purity, valuation, document submission (ID/Address proof), and immediate approval. Funds can often be disbursed within a few **hours or the same business day**. The collateral assessment is the only prerequisite.
            </Paragraph>
            <SubHeader title="Personal Loan: Verification Bottleneck" id="personal-disbursal" />
            <Paragraph>
              A Personal Loan requires comprehensive underwriting: CIBIL check, employment verification, income authentication, and DTI calculation. This process usually takes **2 to 7 days**, even with digital KYC. For high-value loans, physical document verification can extend this time further.
            </Paragraph>
          </motion.section>
          
          {/* Section 5: Flexibility and Repayment Structure */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="5. Flexibility: Repayment Structures and Tenure" icon={Activity} />
            <Paragraph>
              Gold Loans often offer unique and highly flexible repayment options that a standard Personal Loan cannot match.
            </Paragraph>
            <SubHeader title="Gold Loan: The Bullet Repayment Option" id="bullet-repayment" />
            <Paragraph>
              Gold Loans frequently offer **Bullet Repayment** (or a single repayment scheme). This allows the borrower to pay the interest monthly/periodically, and repay the entire principal amount at the end of the loan tenure. This is perfect for short-term needs (3-12 months) where you anticipate a lump-sum income/payment soon.
            </Paragraph>
            <SubHeader title="Personal Loan: The Strict EMI Structure" id="emi-structure" />
            <Paragraph>
              Personal Loans almost universally demand a fixed, monthly EMI (Equated Monthly Installment) covering both principal and interest over a tenure of 1 to 5 years. While predictable, this offers less flexibility if your cash flow is volatile. Pre-closure often incurs a penalty (prepayment charges).
            </Paragraph>
          </motion.section>
          
          {/* Section 6: Consequences of Default (The Ultimate Risk) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="6. Consequences of Default: Loss of Asset vs. Loss of Credit Score" icon={Gavel} />
            <Paragraph>
              Defaulting on any loan has severe repercussions, but the nature of the consequence differs significantly.
            </Paragraph>
            <SubHeader title="Gold Loan Default: Losing Your Asset" id="gold-default" />
            <Paragraph>
              If you fail to repay a Gold Loan, the bank is legally entitled to auction your gold collateral to recover its dues. Your credit score will take a hit, but the immediate and painful loss is the physical asset. However, once the bank sells the gold, the debt is typically cleared, and you don't face aggressive debt collection efforts.
            </Paragraph>
            <SubHeader title="Personal Loan Default: CIBIL Destruction" id="personal-default" />
            <Paragraph>
              Defaulting on a Personal Loan results in the **severe destruction of your CIBIL score**, which can make accessing any form of credit (home loans, credit cards) nearly impossible for 7-10 years. It also leads to potentially aggressive recovery procedures and even legal action by the bank, as there is no asset for them to recover.
            </Paragraph>
          </motion.section>

          {/* Section 7: Final Comparison Table */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="7. Summary: Head-to-Head Comparison (Gold vs. Personal)" icon={Target} />
            <Paragraph>
              Below is a summary of the critical deciding factors to help you make an informed choice based on your specific financial situation in 2025.
            </Paragraph>
            
            <ComparisonTable data={comparisonData} />

          </motion.section>

          {/* Section 8: The Strategic Choice in 2025 */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="8. The Strategic Choice: When to Pick Which Loan" icon={Briefcase} />
            
            <SubHeader title="🏆 Choose the Gold Loan if..." id="choose-gold" />
            <ul className="list-none space-y-3">
                <BulletPoint>You need **urgent, large capital** (e.g., medical emergency, short-term business need).</BulletPoint>
                <BulletPoint>Your **CIBIL score is low** (below 750) or you have minimal income documentation.</BulletPoint>
                <BulletPoint>You require **maximum repayment flexibility** (e.g., Bullet Repayment scheme).</BulletPoint>
                <BulletPoint>You seek the **lowest possible interest rate** to minimize borrowing costs.</BulletPoint>
            </ul>
            
            <SubHeader title="🚀 Choose the Personal Loan if..." id="choose-personal" />
            <ul className="list-none space-y-3">
                <BulletPoint>You **do not own gold** or cannot part with your jewelry.</BulletPoint>
                <BulletPoint>Your **CIBIL score is excellent** (780+) and you have stable, verifiable income.</BulletPoint>
                <BulletPoint>You need funds for a **long-term commitment** (e.g., wedding, debt consolidation).</BulletPoint>
                <BulletPoint>The loan purpose requires an **unsecured** facility (e.g., funding a venture where gold collateral is inappropriate).</BulletPoint>
            </ul>
          </motion.section>


          {/* CTA Section */}
          <motion.section
            className="text-center mt-16 p-8 bg-gradient-to-r from-indigo-600 to-pink-700 rounded-2xl shadow-xl"
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
              <span>Which Loan is Right for Your Goal?</span>
            </motion.h2>
            <motion.p
              className="text-lg text-pink-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Get a personalized interest rate quote for both a Gold Loan and a Personal Loan to compare the actual cost and eligibility based on your unique profile today.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => alert("Personalized Loan Comparison Initiated!")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Compare My Loan Rates Now
              </button>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
};

export default GoldVsPersonalLoan;
