import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  DollarSign, // Used for EMI Concept
  Calculator, // Used for Calculation
  TrendingUp, // Used for Reducing Balance
  Clock, // Used for Tenure/Time
  BarChart, // Used for Amortization/Components
  Users, // Used for Lender/Borrower
  Maximize, // Used for Pre-payment
  Zap, // Used for CTA
  CheckSquare, // Added: Used in BulletPoint
} from "lucide-react";
import { Link } from "react-router-dom"; 

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "What Is EMI? How It Works, Calculation, and The Reducing Balance Advantage";
const ARTICLE_SUBTITLE =
  "The essential financial guide for Indian borrowers: Deciphering the Equal Monthly Installment (EMI), understanding the amortization table, and the powerful benefit of the Reducing Balance method.";
const BACK_LINK = "/blogs/finance-strategy"; 
const AUTHOR = "Financial Education Analyst";
const DATE = "Nov 19, 2025";
const READ_TIME = "18 min read (The Foundation Manual)"; 
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
  // FIX: Removed duplicate 'opacity' key. Set to opacity: 0 for a true 'hidden' state.
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
    {/* CheckSquare is now correctly imported */}
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
      <span className="font-extrabold mr-2">💡 Key Concept:</span>
      {children}
    </p>
  </motion.div>
);

// ====================================================================
// MAIN COMPONENT
// ====================================================================

const EMIExplained: React.FC = () => {
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

          {/* Section 1: Defining EMI */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="1. Understanding the Core: What Exactly is EMI?" icon={DollarSign} />
            <Paragraph>
              The **Equal Monthly Installment (EMI)** is arguably the most common term in modern personal finance, especially in India. It represents a fixed payment amount that a borrower pays to a lender at a specified date each calendar month. This allows you to service a large loan (like a home, car, or personal loan) over a defined period (the tenure) in manageable, predictable chunks.
            </Paragraph>
            <SubHeader title="The Two Core Components of Every EMI" id="emi-components" />
            <Paragraph>
              Every EMI you pay is a combination of two elements that are inextricably linked, yet fluctuate dramatically over the loan tenure:
              <ul className="list-disc ml-6 mt-3 space-y-2">
                <BulletPoint><strong>Principal Repayment:</strong> This is the portion of your EMI that goes towards paying off the original loan amount you borrowed (the principal).</BulletPoint>
                <BulletPoint><strong>Interest Payment:</strong> This is the cost of borrowing the money, calculated by the lender based on the outstanding principal balance and the agreed-upon interest rate.</BulletPoint>
              </ul>
            </Paragraph>
            <KeyTakeaway>
              In the initial years of a long-term loan (like a 20-year home loan), the **Interest Component is significantly higher** than the Principal Component. Conversely, in the final years, the Interest Component shrinks, and the Principal Repayment dominates the EMI. This shift is clearly seen in the Amortization Schedule.
            </KeyTakeaway>
          </motion.section>

          {/* Section 2: The EMI Calculation Formula */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="2. Demystifying the Math: The EMI Calculation Formula" icon={Calculator} />
            <Paragraph>
              While banks use sophisticated software, the underlying mathematical formula for calculating a fixed EMI is based on the principles of annuities and compound interest. Understanding the formula is key to negotiating the rate and tenure, as it highlights the variables that impact your monthly outflow.
            </Paragraph>
            <SubHeader title="The Official EMI Formula" id="emi-formula" />
            <Paragraph>
              The standard formula for calculating EMI is:
            </Paragraph>
            <motion.div 
                className="mt-6 mb-6 p-5 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner overflow-x-auto"
                variants={itemVariants}
            >
                <p className="font-mono text-xl text-gray-900 dark:text-white leading-loose">
                    {`$$ \\text{EMI} = P \\times \\frac{r \\times (1+r)^n}{(1+r)^n - 1} $$`}
                </p>
            </motion.div>
            <Paragraph>
              Where:
              <ul className="list-disc ml-6 mt-3 space-y-2">
                <BulletPoint><strong>P:</strong> Principal Loan Amount (The total amount you borrowed).</BulletPoint>
                <BulletPoint><strong>r:</strong> Monthly Interest Rate (Annual Rate / 12).</BulletPoint>
                <BulletPoint><strong>n:</strong> Number of Monthly Installments (Loan Tenure in Years $\times$ 12).</BulletPoint>
              </ul>
            </Paragraph>
            <SubHeader title="An Example Calculation" id="example-calculation" />
            <Paragraph>
              Imagine you take a Personal Loan of **₹1,00,000** at an annual interest rate of **12%** for **2 years (24 months)**.
              <ul className="list-disc ml-6 mt-3 space-y-2">
                <BulletPoint>P = ₹1,00,000</BulletPoint>
                <BulletPoint>r = 12% / 12 = 0.01 (or 1%)</BulletPoint>
                <BulletPoint>n = 2 $\times$ 12 = 24</BulletPoint>
              </ul>
              Plugging these values in gives an EMI of approximately **₹4,707**. Over 24 months, the total repayment is ₹1,12,968, meaning the total interest paid is ₹12,968.
            </Paragraph>
          </motion.section>

          {/* Section 3: The Reducing Balance Method Explained (The Indian Standard) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="3. The Reducing Balance Method: Why It's Crucial" icon={TrendingUp} />
            <Paragraph>
              Almost all retail loans in India (home loans, car loans, personal loans) use the **Reducing Balance Method** (also known as the diminishing balance method). This is the most borrower-friendly method and is mandatory for transparent lending.
            </Paragraph>
            <SubHeader title="How Interest is Calculated Daily/Monthly" id="reducing-balance" />
            <Paragraph>
              Under the Reducing Balance Method, the interest component of your EMI is calculated only on the **outstanding principal balance** *after* your previous EMI payment has been processed.
            </Paragraph>
            <Paragraph>
              Contrast this with the **Flat Rate Method** (often used in hire purchase or some NBFC schemes), where the interest is calculated on the **original principal amount** for the entire tenure, meaning the interest paid remains constant even as you pay off the principal. The Reducing Balance Method ensures that as your loan balance decreases, the interest you pay each month also decreases, freeing up more of your fixed EMI to cover the principal.
            </Paragraph>
            <KeyTakeaway>
              Always confirm that your loan uses the **Daily/Monthly Reducing Balance Method**. In Indian home loans, interest is compounded monthly and calculated on the daily outstanding principal, maximizing the benefit of prepayments.
            </KeyTakeaway>
          </motion.section>

          {/* Section 4: The Amortization Schedule (Your Loan Roadmap) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="4. The Amortization Schedule: Your Loan Roadmap" icon={BarChart} />
            <Paragraph>
              The amortization schedule is a table that provides a complete breakup of every EMI payment over the entire life of the loan. It is the clearest illustration of the Reducing Balance method in action. 
            </Paragraph>
            <SubHeader title="The See-Saw Effect" id="see-saw-effect" />
            <Paragraph>
              The schedule perfectly illustrates the **"See-Saw Effect"**—the dynamic shift in the EMI components:
              <ul className="list-disc ml-6 mt-3 space-y-2">
                <BulletPoint><strong>Beginning of Tenure:</strong> EMI is heavily weighted towards **Interest**. For example, in the first year of a 20-year home loan, 85-90% of your EMI might be interest.</BulletPoint>
                <BulletPoint><strong>Mid-Tenure:</strong> The principal and interest components reach a near 50:50 balance.</BulletPoint>
                <BulletPoint><strong>End of Tenure:</strong> The EMI is almost entirely **Principal**, with the interest component dropping to a minimal amount.</BulletPoint>
              </ul>
            </Paragraph>
            <SubHeader title="Why Tracking Amortization Matters" id="tracking-amortization" />
            <Paragraph>
              Tracking this schedule helps you:
              <ul className="list-disc ml-6 mt-3 space-y-2">
                <BulletPoint>Plan **pre-payments** strategically to maximize principal reduction.</BulletPoint>
                <BulletPoint>Understand the tax benefit: The principal and interest portions have different tax treatments (especially in home loans).</BulletPoint>
                <BulletPoint>Assess the true cost of the loan (the total interest paid).</BulletPoint>
              </ul>
            </Paragraph>
          </motion.section>

          {/* Section 5: Strategies to Optimize Your EMI */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="5. Strategies to Optimize Your EMI and Save Thousands" icon={Maximize} />
            <Paragraph>
              While the EMI is fixed, you have control over the total interest you pay. Using the Reducing Balance structure strategically can save you years of repayment and thousands of Rupees in interest.
            </Paragraph>
            <SubHeader title="The Power of Pre-Payment (The Principal Killer)" id="pre-payment" />
            <Paragraph>
              Any extra lump sum payment you make is applied directly to the outstanding principal. Because the interest for the *next* month is calculated on the *new, lower principal*, pre-payment results in an immediate and compounding reduction in your total interest burden.
            </Paragraph>
            <KeyTakeaway>
              **The Pre-Payment Golden Rule:** The earlier you pre-pay, the greater the interest savings. A ₹1,00,000 pre-payment in year 1 of a home loan might save 5 times the interest of the same pre-payment in year 10. Maximize pre-payments during the **initial, high-interest phase** of the loan.
            </KeyTakeaway>
            <SubHeader title="The Short vs. Long Tenure Trade-off" id="tenure-trade-off" />
            <Paragraph>
              A **longer tenure (n)** reduces your EMI but drastically increases the total interest paid (because the principal is exposed to interest for a longer time). A **shorter tenure** increases your EMI (making it a bigger monthly financial commitment) but minimizes the total interest paid. Choose the shortest tenure whose EMI is still comfortably within your Fixed Obligation to Income Ratio (FOIR).
            </Paragraph>
            <SubHeader title="Refinancing and Balance Transfers" id="refinancing" />
            <Paragraph>
              If interest rates drop, or if your credit profile improves, you can transfer your outstanding loan balance to a new lender offering a lower interest rate. This is called a **Balance Transfer**. This essentially restructures your loan at a lower *r* (the monthly interest rate), which is one of the most powerful ways to immediately reduce your EMI (if you keep the same tenure) or drastically reduce total interest (if you shorten the tenure).
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
              <span>Calculate Your Optimal EMI Now</span>
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Use our interactive EMI calculator to model different loan amounts, rates, and tenures, and see the immediate impact on your interest savings using the Reducing Balance Method.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                // IMPORTANT: Changed alert to use a console log instead of the problematic alert() call.
                onClick={() => console.log("EMI Calculator Launched!")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Go to EMI Calculator
              </button>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
};

export default EMIExplained;
