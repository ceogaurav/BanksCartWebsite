import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Target, // Used for Strategic Use and Goals
  Shield, // Used for Security and Protection
  Activity, // Used for Transaction Tracking and Cash Flow
  TrendingDown, // Used for Debt and Risk Management
  Briefcase, // Placeholder (Not used in this article, but maintained from original imports)
  Users, // Placeholder (Not used in this article, but maintained from original imports)
  Feather, // Used for Rewards and Perks
  CheckSquare, // Used for Final Summary/Foundation
  Gavel, // Placeholder (Not used in this article, but maintained from original imports)
  Zap, // Used for CTA
} from "lucide-react";
import { Link } from "react-router-dom"; 

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "Debit Card vs Credit Card: The Ultimate Showdown for Modern Money Management";
const ARTICLE_SUBTITLE =
  "Beyond the swipe: Uncovering hidden protections, CIBIL influence, strategic rewards, and the true cost of convenience.";
const BACK_LINK = "/blogs/finance-strategy"; 
const AUTHOR = "Insider Banking Analyst";
const DATE = "Nov 20, 2025";
const READ_TIME = "25 min read (The Money Manager's Guide)"; 
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
      <span className="font-extrabold mr-2">💡 Strategic Insight:</span>
      {children}
    </p>
  </motion.div>
);

// ====================================================================
// MAIN COMPONENT
// ====================================================================

const CardShowdown: React.FC = () => {
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

          {/* Section 1: The Core Difference: Money's Origin */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="1. The Origin of Funds: Your Cash vs. The Bank's Loan" icon={Activity} />
            <Paragraph>
              The fundamental difference between a debit and a credit card is simple yet profound: **where the money comes from.** A debit card uses *your* money instantly available in your savings or current account. A credit card uses the bank’s money—a short-term, unsecured loan that you promise to repay later. This distinction impacts everything from risk to rewards to your long-term financial health.
            </Paragraph>
            <SubHeader title="Debit Card: The Cash-Flow Disciplinarian" id="debit-card-core" />
            <Paragraph>
              Debit cards enforce spending discipline by default. If the money isn't in your account, the transaction is declined. They are the ideal tool for managing a strict budget and avoiding debt. While they offer convenience, they provide minimal financial leverage or safety net.
            </Paragraph>
            <SubHeader title="Credit Card: The Financial Leverage Tool" id="credit-card-core" />
            <Paragraph>
              Credit cards grant you **float**—the ability to use funds for 45-60 days before payment is due. When used correctly (paying the bill in full every month), this float is free leverage. When used incorrectly (carrying a balance), the high-interest rates (often 36-48% APR) make it one of the most expensive forms of credit available.
            </Paragraph>
            <KeyTakeaway>
              **Rule Zero:** Never use a credit card to purchase something you couldn't afford with the cash currently in your bank account. The card is a tool for *earning rewards and building credit*, not a mechanism for supplementing a cash deficit.
            </KeyTakeaway>
          </motion.section>

          {/* Section 2: Security, Fraud, and Purchase Protection */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="2. The Security & Fraud Paradox: Where is your money safer?" icon={Shield} />
            <Paragraph>
              Many users feel safer with a debit card because it's their money. Ironically, credit cards offer a far superior safety net and consumer protection, a fact banks often don't emphasize as it shifts the risk from you to them.
            </Paragraph>
            <SubHeader title="The Credit Card Shield: Zero Liability and Chargebacks" id="credit-card-shield" />
            <Paragraph>
              Credit cards are protected by **Zero Liability** policies. If a fraudulent transaction occurs, you are typically not liable for the charges. The bank investigates and the money never leaves *your* account. Additionally, the **Chargeback** mechanism is powerful: if a purchased item is faulty, not delivered, or the vendor goes bankrupt, you can dispute the charge with the bank, and they fight to retrieve the funds.
            </Paragraph>
            <SubHeader title="The Debit Card Vulnerability: Direct Account Drain" id="debit-card-vulnerability" />
            <Paragraph>
              With a debit card, a fraudulent transaction immediately drains your savings. While banks will eventually reverse the funds, the process can take days or weeks. During this time, you may face bounced cheques or inability to pay essential bills, as the *burden of proof and recovery* begins with your account already compromised.
            </Paragraph>
            <BulletPoint>**Pro-Tip:** Never link your primary savings account's debit card to unfamiliar websites or recurring subscription services. Use a credit card for these volatile transactions.</BulletPoint>
            <KeyTakeaway>
              For all online purchases and international transactions, a credit card is the superior choice. Its inherent distance from your core savings provides an invaluable layer of transactional security that debit cards simply cannot match.
            </KeyTakeaway>
          </motion.section>

          {/* Section 3: The CIBIL Score & Eligibility Multiplier */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="3. The CIBIL Multiplier: Building Eligibility with Plastic" icon={Target} />
            <Paragraph>
              A debit card has absolutely no impact on your credit score (CIBIL or otherwise). A credit card, when managed strategically, is the single fastest and most effective tool for building a prime credit history, which is crucial for future low-rate loans (home, auto).
            </Paragraph>
            <SubHeader title="The Credit Card's Unwritten Mandate" id="unwritten-mandate" />
            <Paragraph>
              A credit card's purpose is not just spending; it is to generate a verifiable, positive history of debt management. Consistent, full, and on-time payments are reported to credit bureaus, creating a positive repayment track record. This process, known as **Credit Age** and **Payment History**, forms the foundation of a high CIBIL score.
            </Paragraph>
            <BulletPoint>Debit Card: No history, no score, no leverage for future low-rate borrowing.</BulletPoint>
            <BulletPoint>Credit Card: Creates a score, opens doors to prime lending rates, and acts as a financial resume.</BulletPoint>
            <SubHeader title="The Hidden Trap: Missed Payments" id="missed-payments-trap" />
            <Paragraph>
              The power of a credit card is also its danger. One missed or late payment can instantly drop your CIBIL score by 50-100 points, negating months of positive behavior. Interest compounds daily, and the penalty fees are punitive. This risk must be managed by setting up mandatory auto-debit for the **Full Outstanding Amount**.
            </Paragraph>
          </motion.section>

          {/* Section 4: Rewards, Perks, and Financial Value */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="4. Rewards & Value Extraction: Earning from Your Spending" icon={Feather} />
            <Paragraph>
              The transactional value proposition of the two cards is vastly different. While a debit card primarily offers transaction convenience, a credit card is designed to extract value from every purchase through rewards, airport access, and insurance.
            </Paragraph>
            <SubHeader title="Credit Card: A Mini Benefits Package" id="credit-card-benefits" />
            <Paragraph>
              Top-tier credit cards offer rewards that can significantly offset annual fees and provide real-world value:
              <ul className="list-disc ml-6 mt-3 space-y-2">
                <BulletPoint>Cashback (1% to 5%) or Reward Points on spending.</BulletPoint>
                <BulletPoint>Complimentary airport lounge access (domestic and international).</BulletPoint>
                <BulletPoint>Insurance (travel, purchase protection, accidental death cover).</BulletPoint>
                <BulletPoint>Waiver of annual fees upon reaching a spending milestone.</BulletPoint>
              </ul>
              This means a responsible user *earns* money back on necessary spending, making the credit card a net financial gain.
            </Paragraph>
            <SubHeader title="Debit Card: Minimalist Perks" id="debit-card-perks" />
            <Paragraph>
              Debit cards generally offer negligible rewards (usually 0.1% or less). Any perks offered, such as discounted movie tickets or fuel surcharge waivers, are usually introductory or tied to premium bank accounts with high minimum balance requirements. Their primary utility remains immediate, penalty-free access to your cash.
            </Paragraph>
          </motion.section>

          {/* Section 5: The Danger Zone - Debt and Discipline */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="5. The Debt Barrier: Assessing Your Financial Self-Discipline" icon={TrendingDown} />
            <Paragraph>
              Ultimately, the choice hinges on your personal finance personality. Credit cards are mathematically superior for the disciplined user, but financially ruinous for the impulsive spender. This section provides an honest self-assessment guide.
            </Paragraph>
            <SubHeader title="Self-Assessment: When to Stick to Debit" id="stick-to-debit" />
            <Paragraph>
              If you answer 'Yes' to any of the following, the risk of a credit card outweighs the rewards, and you should stick to a debit card until your financial foundation is stronger:
            </Paragraph>
            <BulletPoint>Do you often run out of cash before your next salary deposit?</BulletPoint>
            <BulletPoint>Do you find yourself making impulse purchases because funds are 'available'?</BulletPoint>
            <BulletPoint>Do you struggle to save 10% of your monthly income?</BulletPoint>
            <Paragraph>
              For these users, the **TrendingDown** icon represents the rapid accrual of high-interest debt that can quickly spiral out of control. Use the debit card as training wheels for financial maturity.
            </Paragraph>
            <SubHeader title="The Optimal Strategy: Dual Card Management" id="dual-card-management" />
            <Paragraph>
              The most sophisticated financial users don't choose one; they use both strategically: **Debit cards** are reserved for ATM withdrawals, small local vendors, and emergency cash access. **Credit cards** are used for all online purchases, bills, travel, and high-value transactions to maximize rewards and security protection.
            </Paragraph>
            <KeyTakeaway>
              **The Final Verdict:** Use the **Debit Card** for cash discipline and to manage expenses for which you *must* feel the pain of withdrawal. Use the **Credit Card** for all high-security transactions, rewards maximization, and the critical goal of building an impeccable credit score.
            </KeyTakeaway>
          </motion.section>

          {/* Section 6: Long-Term Foundation (Summary) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="6. Long-Term Foundation: The Path to Financial Mastery" icon={CheckSquare} />
            <Paragraph>
              Financial mastery is not about avoiding tools; it is about knowing how to wield them responsibly. Treat the credit card as a high-powered financial instrument that requires respect and strict adherence to the rules.
            </Paragraph>
            <BulletPoint>Prioritize a high CIBIL score (750+) over any credit card reward points.</BulletPoint>
            <BulletPoint>Never pay only the Minimum Amount Due. Always pay the full statement balance to avoid interest.</BulletPoint>
            <BulletPoint>Review your bank and credit card statements monthly to catch unauthorized charges and track spending.</BulletPoint>
            <Paragraph>
              By utilizing the credit card as a debt-free transaction tool and keeping the debit card as a strict budget monitor, you harness the best of both worlds, setting a clear, sustainable path toward wealth creation and eligibility for prime loans.
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
              <span>Implement the Strategy: Find Your First Prime Credit Card</span>
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Ready to build your CIBIL score? Compare the top credit cards for first-time users, zero-liability protection, and cashback rewards—all based on your current banking profile.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => alert("Personalized Credit Card Comparison Initiated!")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Find My Best Card Match Now
              </button>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
};

export default CardShowdown;
