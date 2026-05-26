import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  MinusCircle, // Used for EMI Reduction Goal
  Shield, // Used for Negotiation
  Activity, // Used for Balance Transfer
  Calendar, // Used for Tenor Extension
  Briefcase, // Used for Prepayment
  Users, // Used for Co-applicant/Guarantor
  Feather, // Used for Loan Insurance
  CheckSquare, // Used for Refinancing
  TrendingDown, // Used for Reducing Interest Rate
  Zap, // Used for CTA
  Home, // Used for Secured Loan
} from "lucide-react";
import { Link } from "react-router-dom"; 

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "10 Smart Ways to Reduce Your Personal Loan EMI Legally";
const ARTICLE_SUBTITLE =
  "The essential financial guide for Indian borrowers: Strategies for legal EMI reduction, mastering the balance transfer, strategic prepayment, and effective negotiation with your bank.";
const BACK_LINK = "/blogs/finance-strategy"; 
const AUTHOR = "Insider Banking Analyst";
const DATE = "Dec 1, 2025";
const READ_TIME = "25 min read (The Money Saver)"; 
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
      <span className="font-extrabold mr-2">💡 Financial Strategy:</span>
      {children}
    </p>
  </motion.div>
);

// ====================================================================
// MAIN COMPONENT
// ====================================================================

const LoanEligibilityTrick: React.FC = () => {
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

          {/* Section 1: Introduction and Goal Setting */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="1. Understanding EMI Mechanics and Your Goal" icon={MinusCircle} />
            <Paragraph>
              Your Personal Loan EMI (Equated Monthly Installment) is fixed, but the factors determining its size—principal, interest rate, and tenure—are not set in stone. The goal of reducing your EMI is to lower your monthly financial commitment, increasing your disposable income and improving your Debt-to-Income (DTI) ratio. Every legal strategy below manipulates one of these three variables.
            </Paragraph>
            <SubHeader title="The EMI vs. Total Cost Trade-off" id="emi-tradeoff" />
            <Paragraph>
              A lower EMI often means paying more interest over the long run. It's a critical trade-off. Strategies that reduce the interest rate (like refinancing) lower both EMI and total cost, while strategies that extend the tenure reduce EMI but increase total interest paid. Always assess which financial need is more urgent: immediate cash flow or long-term savings.
            </Paragraph>
            <KeyTakeaway>
              Before implementing any strategy, calculate your current outstanding principal, remaining tenure, and current interest rate. This baseline data is your negotiation leverage and allows you to accurately measure the savings of each trick.
            </KeyTakeaway>
          </motion.section>

          {/* Section 2: The Balance Transfer (The Competition Tool) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="2. The Strategic Balance Transfer to a New Lender" icon={Activity} />
            <Paragraph>
              This is the most effective way to lower your EMI and total interest cost simultaneously. A Balance Transfer involves moving your outstanding loan from your current bank to a new bank that offers a significantly lower interest rate. The new loan pays off the old one.
            </Paragraph>
            <SubHeader title="The 2% Rate Differential Rule" id="rate-differential" />
            <Paragraph>
              Only initiate a balance transfer if the new rate is at least **2% lower** than your current rate. This 2% differential is typically necessary to absorb the processing fees (usually 1-2% of the principal) and any pre-closure charges from your existing lender, making the transfer financially viable.
            </Paragraph>
            <BulletPoint>Check for Hidden Fees: Ensure the pre-closure penalty of the old bank and the processing fee of the new bank do not wipe out your interest savings.</BulletPoint>
            <BulletPoint>Credit Score Requirement: You must have maintained an excellent credit score (typically 750+) since taking the original loan to qualify for the best rates from the new bank.</BulletPoint>
            <Paragraph>
              A balance transfer is essentially a new loan application; your current credit profile must be strong to get a better deal than the one you already have.
            </Paragraph>
          </motion.section>

          {/* Section 3: Leveraging the Tenure Extension */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="3. Maximize the Loan Tenure (The Cash Flow Fix)" icon={Calendar} />
            <Paragraph>
              The most direct way to reduce EMI is to ask your current lender to extend the remaining loan tenure. Since the outstanding principal is now spread over a longer period, the installment amount drops immediately.
            </Paragraph>
            <SubHeader title="The Tenure Extension Trap" id="tenure-trap" />
            <Paragraph>
              While this provides immediate cash flow relief, it dramatically increases the total interest you pay. For example, extending a ₹5 Lakh loan (at 12%) from 3 years to 5 years might drop your EMI by ~₹3,300, but you will pay an additional ₹65,000 in interest over the life of the loan. Use this strategy only if you are facing a temporary cash flow crunch.
            </Paragraph>
            <KeyTakeaway>
              Negotiate for a temporary tenure extension (e.g., 1 year) with the agreement that you will revert to the original tenure or pre-pay aggressively once your income situation stabilizes. This shows commitment to the principal while securing needed relief.
            </KeyTakeaway>
          </motion.section>

          {/* Section 4: Proactive Partial Prepayment */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="4. Proactive Partial Prepayment and Recalculation" icon={Briefcase} />
            <Paragraph>
              When you make a lump-sum partial prepayment, your outstanding principal reduces. Most banks allow you to choose between two options: (a) keep the EMI same and reduce the tenure, or (b) keep the tenure same and **reduce the EMI**.
            </Paragraph>
            <SubHeader title="The Recalculation Request" id="recalculation-request" />
            <Paragraph>
              Always explicitly request the bank to **recalculate the EMI** after a partial prepayment. If you pay ₹1 Lakh extra on a ₹10 Lakh loan, the bank is legally obligated to adjust the EMI down based on the new, lower principal, provided you select this option and they permit it as per the loan agreement. Even small, annual prepayments can have a cascading effect.
            </Paragraph>
          </motion.section>

          {/* Section 5: The Co-Applicant Advantage */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="5. Introduce a Creditworthy Co-Applicant" icon={Users} />
            <Paragraph>
              If your current loan was secured based on a weak or average profile, you can approach the bank for a **rate reduction based on securing a stronger guarantor** or co-applicant (e.g., a spouse or parent with higher income and an excellent credit score).
            </Paragraph>
            <SubHeader title="Lowering the Risk-Based Pricing (RBP)" id="rbp-reduction" />
            <Paragraph>
              Personal loans are priced using Risk-Based Pricing (RBP). A new, financially strong co-applicant significantly lowers the bank's perceived risk on the loan. This gives the bank the internal justification needed to move you from a higher-risk interest slab (e.g., 16%) to a prime-customer slab (e.g., 13%). This is a negotiation, but the co-applicant is your solid leverage.
            </Paragraph>
          </motion.section>

          {/* Section 6: Direct Interest Rate Negotiation */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="6. Direct Interest Rate Negotiation with Your Current Bank" icon={Shield} />
            <Paragraph>
              Many borrowers don't realize their existing bank has a mechanism for internal rate reduction, especially if you have become a better customer since taking the loan.
            </Paragraph>
            <SubHeader title="The 'Threat' of Balance Transfer" id="threat-negotiation" />
            <Paragraph>
              Approach your Relationship Manager (RM) and inform them that you have received a pre-approved offer for a Balance Transfer at a significantly lower rate from a competitor. Provide documented proof if possible. The bank would often rather reduce your rate by 0.5% to 1.0% than lose your entire loan balance to a competitor. This move directly lowers the interest component of your EMI.
            </Paragraph>
            <BulletPoint>Highlight CIBIL Improvement: If your credit score has increased by 50+ points since sanction, use this as proof that you are now a lower-risk borrower deserving of a better rate.</BulletPoint>
            <BulletPoint>Show Increased TRV: Point out any new Fixed Deposits, Mutual Funds, or Insurance policies you have taken with the same bank (Total Relationship Value or TRV) as leverage.</BulletPoint>
          </motion.section>

          {/* Section 7: Loan Conversion to Secured Debt */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="7. Convert Unsecured Loan to Secured Debt (LAP/Gold)" icon={Home} />
            <Paragraph>
              Personal Loans are unsecured, carrying high interest rates (10%-20%+). A guaranteed way to drop your rate—and thus your EMI—is to convert the outstanding amount into a **Secured Loan** like a Loan Against Property (LAP) or Loan Against Gold.
            </Paragraph>
            <SubHeader title="The Collateral Effect" id="collateral-effect" />
            <Paragraph>
              Secured loans carry interest rates 4% to 8% lower than unsecured loans because the bank has collateral. If you have assets (property, gold, securities), applying for a secured loan to pay off the high-interest personal loan can provide the greatest EMI reduction and long-term interest savings possible. This is a form of powerful refinancing.
            </Paragraph>
          </motion.section>

          {/* Section 8: Utilizing Loan Insurance (Refinancing Tactic) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="8. Refinance an Existing Loan with a New Loan" icon={CheckSquare} />
            <Paragraph>
              If a Balance Transfer to another bank is too complex, you can simply take out a new personal loan from your existing bank (or a new one) at a lower current rate and use the entire proceeds to close your existing loan.
            </Paragraph>
            <SubHeader title="The Rate Drop Scenario" id="rate-drop-scenario" />
            <Paragraph>
              This tactic works best if interest rates in the market have fallen significantly since you took the original loan, or if your credit profile has improved to such an extent that you now qualify for a "Prime Rate" that was previously unavailable to you. This is an internal rate optimization.
            </Paragraph>
            <KeyTakeaway>
              Always factor in the processing fee for the new loan when calculating the savings. If the processing fee is high, the interest saved may not be worth the initial cost, making a direct negotiation (Section 6) a better starting point.
            </KeyTakeaway>
          </motion.section>

          {/* Section 9: The Impact of Payment Frequency */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="9. The Bi-Weekly Payment 'Trick' (The Phantom EMI Reducer)" icon={TrendingDown} />
            <Paragraph>
              While banks officially charge monthly EMI, a subtle trick is to convert your loan to a bi-weekly (every 14 days) payment schedule, if the lender permits. This slightly higher frequency of payment reduces the principal faster.
            </Paragraph>
            <SubHeader title="How Bi-Weekly Reduces Effective EMI" id="bi-weekly-reduction" />
            <Paragraph>
              In a typical year, you make 12 monthly payments. By paying half the monthly EMI every two weeks, you effectively make 26 half-payments, which equals 13 full monthly payments per year. This one extra payment goes entirely toward the principal, dramatically reducing the loan term and the total interest paid, which is the long-term, true reduction of the loan cost.
            </Paragraph>
          </motion.section>
          
          {/* Section 10: Legal Documentation and Verification */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="10. Meticulous Documentation and Legal Verification" icon={Feather} />
            <Paragraph>
              No matter which strategy you choose, the reduction is only legally valid when it is formally documented.
            </Paragraph>
            <BulletPoint>Obtain the Revised Sanction Letter: After a prepayment or rate negotiation, demand a revised loan sanction letter detailing the new principal, new interest rate, and the **new lower EMI**.</BulletPoint>
            <BulletPoint>Verify in Account Statement: Check your next loan statement to ensure the EMI deducted matches the new lower amount and the principal is correctly applied.</BulletPoint>
            <BulletPoint>Get a No-Objection Certificate (NOC): If executing a Balance Transfer, ensure the original lender issues a NOC and reports the loan status as 'Closed' or 'NIL Outstanding' to CIBIL.</BulletPoint>
            <Paragraph>
              By combining these strategies—from immediate cash flow fixes (tenure extension) to powerful long-term savings (secured conversion)—you can legally and effectively bring down your personal loan EMI and secure your financial future.
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
              <span>Take Control: Calculate Your Ideal EMI Reduction</span>
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Use our calculator to compare the cost of a Balance Transfer versus a Tenure Extension and find the strategy that saves you the most money this month.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => alert("EMI Reduction Calculator Initiated!")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Start My EMI Savings Analysis
              </button>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
};

export default LoanEligibilityTrick;
