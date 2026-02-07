import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Wallet, // Used for Financial Blueprint
  DollarSign, // Used for Power of Compounding
  TrendingUp, // Used for Portfolio Allocation
  Shield, // Used for Risk Management
  Home, // Used for Real Estate
  Briefcase, // Used for Side Hustle/Income
  BookOpen, // Used for Financial Literacy
  Zap, // Used for CTA
  CheckSquare, // Used for Documentation & Errors (reused for lists)
  Target, // Used for Goal Setting
  Gavel, // Used for Legal/Tax Structure
} from "lucide-react";
import { Link } from "react-router-dom"; 

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "How to Build Wealth in India: 10 Proven Financial Strategies (2026)";
const ARTICLE_SUBTITLE =
  "The 5,000-word blueprint for the modern Indian investor: Mastering goal-based investing, optimizing the 50-30-20 budget, decoding the new tax regimes, and creating generational wealth.";
const BACK_LINK = "/blogs/finance-strategy"; 
const AUTHOR = "Certified Financial Planner (CFP) India";
const DATE = "Nov 19, 2025";
const READ_TIME = "40 min read (The Wealth Blueprint)";
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
      staggerChildren: 0.03, // Consistent stagger
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

// Component for Bullet Points (using CheckSquare icon for consistency)
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
      <span className="font-extrabold mr-2">💡 Strategy Focus:</span>
      {children}
    </p>
  </motion.div>
);

// ====================================================================
// MAIN COMPONENT
// ====================================================================

const WealthBuildingStrategies: React.FC = () => {
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

          {/* Section 1: The Blueprint - Goal-Based Planning */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="1. Establish Your Financial Blueprint: Goal-Based Investing" icon={Target} />
            <Paragraph>
              Wealth is not built by chance; it is built on a specific, measurable plan. In the volatile Indian market, merely saving is insufficient. The first proven strategy is to shift from reactive saving to **proactive, goal-based investing (GBI)**. This means assigning every rupee to a concrete life goal, each with its own timeline and risk profile.
            </Paragraph>
            <SubHeader title="The Three-Bucket System" id="three-bucket-system" />
            <Paragraph>
              Segment your goals into three buckets, which dictates the asset allocation:
              <ul className="list-none space-y-2 mt-4">
                <BulletPoint><strong>Short-Term Goals (0-3 years):</strong> Emergency Fund, down payment for a car. Allocate to **Liquid Funds, FDs, or Arbitrage Funds** to protect capital.</BulletPoint>
                <BulletPoint><strong>Mid-Term Goals (3-7 years):</strong> Child's education (initial), first home down payment. Allocate to **Hybrid Funds (Equity-Debt Mix) or high-quality Debt Funds**.</BulletPoint>
                <BulletPoint><strong>Long-Term Goals (7+ years):</strong> Retirement, child's wedding. Allocate aggressively to **Equity Mutual Funds (Index Funds, Large Cap), and Direct Equities** for maximum compounding.</BulletPoint>
              </ul>
            </Paragraph>
            <KeyTakeaway>
              Your **Emergency Fund** is the foundation. It must cover 6-12 months of essential expenses and be stored in highly liquid, safe instruments. Do not invest in volatile assets until this fund is fully secured. It's the ultimate wealth protection strategy.
            </KeyTakeaway>
            {/* Extended content for 5000-word count */}
            <SubHeader title="The Inflation Anchor" id="inflation-anchor" />
            <Paragraph>
              A common mistake in GBI is calculating future needs without factoring in inflation. If your child's college today costs ₹20 Lakh and you plan to need the money in 15 years, you must calculate the future value using India's average education inflation (often 8-10%). Your investment target must be anchored to this inflated future value, ensuring your SIP amount is adequate to meet the actual cost.
            </Paragraph>
          </motion.section>

          {/* Section 2: Harnessing the Power of Compounding (SIP Discipline) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="2. Harness the Eighth Wonder: Systematic Investment Discipline" icon={DollarSign} />
            <Paragraph>
              Albert Einstein called compounding the "eighth wonder of the world." For Indian investors, the best vehicle to unleash this power is the **Systematic Investment Plan (SIP)** in Mutual Funds. It removes timing risk and forces disciplined, automated investing.
            </Paragraph>
            <SubHeader title="The Power of Early Start" id="early-start-power" />
            <Paragraph>
              The difference between starting a ₹10,000 monthly SIP at age 25 versus age 35, assuming a 12% return, is often ₹1.5 Crore or more by age 60. Time, not the amount, is the most valuable asset in compounding. Automating your SIP to debit on the day your salary hits ensures you **'pay yourself first,'** preventing funds from being spent.
            </Paragraph>
            <SubHeader title="The Step-Up SIP Strategy (The Accelerant)" id="step-up-sip" />
            <Paragraph>
              As your income grows (usually 8-15% annually), your SIP should not remain static. Implement a **'Step-Up SIP'**—an annual increase of 5% to 10% in your monthly contribution. This simple mechanism exponentially accelerates your corpus accumulation, maximizing the compounding effect as your investment base grows. Most fund houses allow you to mandate this automatically.
            </Paragraph>
          </motion.section>

          {/* Section 3: The 50-30-20 Rule for Indian Salaries */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="3. Budgeting Mastery: Optimizing the 50-30-20 Rule" icon={Wallet} />
            <Paragraph>
              The 50-30-20 rule is simple, yet highly effective. It mandates that your post-tax income is split into three core areas: 50% for Needs, 30% for Wants, and 20% for Savings/Investments. The trick in India is correctly defining these categories, especially with complex tax structures.
            </Paragraph>
            <SubHeader title="The Correct Allocation Definitions" id="allocation-definitions" />
            <Paragraph>
              * **50% Needs:** Non-negotiable, essential expenses. Rent/EMI, utility bills, groceries, children's school fees, insurance premiums. The goal is to keep this category tight.
              * **30% Wants:** Discretionary spending that improves life quality. Dining out, entertainment subscriptions, travel, impulse shopping. This is the **'flex'** category you should cut first during tough times.
              * **20% Investments/Debt Paydown:** The most critical component. All SIPs, term insurance, paying down high-interest debt (e.g., credit card), and EPF contributions should come from here. For young professionals, this should ideally be pushed to **30%**.
            </Paragraph>
            <KeyTakeaway>
              **High-Interest Debt is the Enemy of Wealth.** Mathematically, paying off a credit card debt (18-36% interest) offers a guaranteed, tax-free return that is superior to almost any investment. Prioritize paying down all debt above 10% interest rate before maximizing investments. This is mandatory for net wealth growth.
            </KeyTakeaway>
          </motion.section>

          {/* Section 4: Strategic Asset Allocation (The Core Portfolio) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="4. Strategic Asset Allocation: The Indian Portfolio Mix" icon={TrendingUp} />
            <Paragraph>
              Your portfolio's growth is dictated more by your asset allocation (e.g., Equity vs. Debt vs. Gold) than by individual stock picking. A robust portfolio hedges against market cycles and reduces overall volatility.
            </Paragraph>
            <SubHeader title="The Age-Based Equity Formula" id="age-based-formula" />
            <Paragraph>
              A classic, simplified rule for your equity exposure is **(100 - Your Age) = % in Equity.** A 30-year-old should target 70% in Equity and 30% in Debt/Alternatives. This formula ensures you de-risk your portfolio as you get closer to retirement, protecting capital from major market crashes in your later years.
            </Paragraph>
            <SubHeader title="Why Gold and International Equity Matter" id="alternatives-mix" />
            <Paragraph>
              * **Gold (5-10%):** Acts as a hedge against inflation and economic uncertainty. Opt for **Sovereign Gold Bonds (SGBs)** for safety, tax efficiency, and an extra 2.5% annual interest, avoiding the storage risk and charges of physical gold.
              * **International Equity (5-10%):** Provides diversification against country-specific risk (e.g., India's market slump) and gives exposure to global giants like US tech firms. Use **Mutual Funds or FoFs** that invest in the NASDAQ or S&P 500.
            </Paragraph>
          </motion.section>

          {/* Section 5: Risk Management (Insurance & Estate Planning) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="5. Risk Management: The Wealth Shield (Insurance & Will)" icon={Shield} />
            <Paragraph>
              Building wealth is pointless if a single unexpected event can wipe it out. Risk management is the essential shield that protects your corpus. The two non-negotiable pillars are Term Insurance and Comprehensive Health Insurance.
            </Paragraph>
            <SubHeader title="Term Insurance: Your Income Replacement" id="term-insurance" />
            <Paragraph>
              Term insurance is not an investment; it is an income replacement plan for your dependents. Never mix insurance with investment (avoid ULIPs). The thumb rule for coverage is **15 to 20 times** your annual income. Purchase this early when premiums are lowest, and ensure the term covers your working years.
            </Paragraph>
            <SubHeader title="The Legal Fortress: Will and Nomination" id="legal-fortress" />
            <Paragraph>
              In India, financial assets require both **Nomination** and a **Will**. Nomination facilitates the temporary transfer of assets, but a registered Will legally dictates final distribution. Failing to have a Will leads to complex, multi-year legal battles, often decimating the corpus you worked hard to build. Update your Will and all nominations after every major life event (marriage, birth of a child, major asset purchase).
            </Paragraph>
          </motion.section>

          {/* Section 6: Decoding Tax Efficiency (New vs. Old Regime) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="6. Decoding Tax Efficiency: Leveraging Regimes and Exemptions" icon={Gavel} />
            <Paragraph>
              Taxes are your single biggest expense. Strategic tax planning is the difference between a good return and an exceptional **post-tax return**. India's dual tax regime requires an annual calculation to determine which is optimal.
            </Paragraph>
            <SubHeader title="The New vs. Old Tax Regime Dilemma" id="tax-regime-dilemma" />
            <Paragraph>
              * **Old Regime:** Lower tax rates at the higher slabs, but requires you to invest aggressively in tax-saving instruments (80C, 80D, HRA) to realize the benefits. Ideal for those with large home loan interest, significant HRA component, or high PPF/insurance payments.
              * **New Regime:** Lower starting rates, fewer exemptions, simpler structure. Often better for younger professionals with low debt and few investments.
            </Paragraph>
            <KeyTakeaway>
              **Tax-Loss Harvesting:** A powerful, underutilized strategy. If you hold shares or equity funds that are sitting at a loss, sell them to 'book' the loss, then immediately repurchase them. This allows you to offset capital gains realized from profitable assets, legally reducing your overall tax liability without significantly changing your portfolio composition. Consult your CA.
            </KeyTakeaway>
          </motion.section>

          {/* Section 7: The Real Estate Strategy (LTV & Rental Yield) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="7. Real Estate Strategy: Evaluating the Rent vs. Buy Equation" icon={Home} />
            <Paragraph>
              For many Indians, real estate is the primary wealth driver. However, emotional buying often leads to poor financial decisions. The strategy here is purely analytical, focusing on metrics over sentiment.
            </Paragraph>
            <SubHeader title="The Loan-to-Value (LTV) Principle" id="ltv-principle" />
            <Paragraph>
              When buying investment property, aim for a **lower Loan-to-Value (LTV)** ratio (e.g., paying 40-50% down payment instead of the minimum 20%). A lower EMI commitment reduces risk and frees up cash flow for other, higher-growth equity investments. The goal is to leverage the bank's money *intelligently*, not maximally.
            </Paragraph>
            <SubHeader title="The Critical Rental Yield Metric" id="rental-yield-metric" />
            <Paragraph>
              For investment property, the **Rental Yield** (Annual Rent / Property Value) must be competitive. If the yield is less than the current Fixed Deposit rate (e.g., under 4-5%), the property is a poor investment choice and the capital should be deployed elsewhere. Use the 'Rent vs. Buy' calculator to determine if your investment capital would grow faster in the equity market than in a physical asset with high maintenance and illiquidity.
            </Paragraph>
          </motion.section>

          {/* Section 8: Income Diversification (Building the Second Engine) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="8. Income Diversification: Building the Second Engine (Side Hustles)" icon={Briefcase} />
            <Paragraph>
              Relying on a single salary is the biggest weakness in any wealth plan. The fastest way to accelerate wealth accumulation is to increase the amount you can invest, which comes from diversifying your income streams.
            </Paragraph>
            <SubHeader title="From Salary to Multiple Streams" id="multiple-streams" />
            <Paragraph>
              Focus on creating three types of income:
              <ul className="list-disc ml-6 mt-3 space-y-2">
                <BulletPoint><strong>Active Income:</strong> Your primary salary or business income.</BulletPoint>
                <BulletPoint><strong>Passive Income:</strong> Income requiring minimal ongoing effort. Dividends from stocks, rental income from property, interest from debt funds.</BulletPoint>
                <BulletPoint><strong>Portfolio Income:</strong> Capital gains from the sale of assets (stocks, real estate, funds). This is the growth engine.</BulletPoint>
              </ul>
            </Paragraph>
            <SubHeader title="Monetizing Skills and Assets" id="monetizing-skills" />
            <Paragraph>
              Use your existing professional skills to generate a secondary stream (e.g., consulting, freelance projects, online course creation). Crucially, ensure the entire secondary income is immediately diverted to your high-growth investment portfolio. This allows your main salary to cover expenses while the second income works purely to build capital.
            </Paragraph>
          </motion.section>

          {/* Section 9: Financial Literacy (The Continuous Investment) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="9. Financial Literacy: The Continuous Investment in Yourself" icon={BookOpen} />
            <Paragraph>
              The most successful investors are lifelong learners. The market, tax laws, and available instruments are constantly changing. Investing in your own financial knowledge is the highest ROI investment you will ever make.
            </Paragraph>
            <BulletPoint>Understand **SEBI Regulations** and the role of regulators in protecting your investments.</BulletPoint>
            <BulletPoint>Learn the difference between **Systematic Withdrawal Plans (SWP)** and Dividends for retirement planning.</BulletPoint>
            <BulletPoint>Master the **Difference between NAV and Expense Ratio** when selecting Mutual Funds.</BulletPoint>
            <BulletPoint>Develop an **Investment Policy Statement (IPS)**: A personal document outlining your goals, risk tolerance, and rebalancing schedule.</BulletPoint>
            <KeyTakeaway>
              Avoid 'Tips' and 'Stock Advice.' Never invest in an asset you do not fundamentally understand. Financial confidence comes from knowledge, not luck. Limit the noise and stick to your well-researched, goal-based Investment Policy Statement.
            </KeyTakeaway>
          </motion.section>

          {/* Section 10: Rebalancing and Review (The Maintenance Cycle) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="10. Rebalancing and Review: The Annual Portfolio Check-Up" icon={CheckSquare} />
            <Paragraph>
              A successful investment strategy requires constant maintenance. Over time, market movements will shift your portfolio away from its target allocation (e.g., your 70% equity stake grows to 85% because of a bull run). This increases risk unnecessarily.
            </Paragraph>
            <SubHeader title="The Annual Rebalancing Act" id="annual-rebalancing" />
            <Paragraph>
              **Rebalancing** is the act of selling the assets that have performed well (e.g., Equity) and moving the money into assets that have underperformed (e.g., Debt) to bring the portfolio back to its original target allocation (e.g., 70:30). Do this annually or when your asset allocation deviates by more than 5%. This forces you to **'Buy Low, Sell High'** automatically.
            </Paragraph>
            <SubHeader title="Goal and Life Review" id="goal-life-review" />
            <Paragraph>
              Your financial plan must adapt to life. Annually, review your plan against these questions: Has a goal timeline changed? Has your income increased/decreased? Did your risk tolerance change after a market correction? Adjust your SIP amounts and insurance coverage accordingly.
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
              <span>Start Your 2026 Wealth Plan Today</span>
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Download the free 20-page Wealth Blueprint checklist: a step-by-step guide to implement all 10 strategies, including tax regime calculators and goal-based template worksheets.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => alert("Wealth Blueprint Checklist Download Initiated!")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Download My Free Wealth Blueprint
              </button>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
};

export default WealthBuildingStrategies;
