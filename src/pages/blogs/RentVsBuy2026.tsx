import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Scale, // Used for Main Header/Comparison
  IndianRupee, // Used for Financial & Tax Sections
  TrendingUp, // Used for Market Forecast
  Landmark, // Used for Buying Pros/Ownership
  Home, // Used for Renting Pros/Flexibility
  Users, // Used for Lifestyle/Community
  Wallet, // Used for Hidden Costs
  GanttChart, // Used for Decision Framework
  Zap, // Used for CTA
} from "lucide-react";
import { Link } from "react-router-dom"; 

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "Rent vs Buy: What Should You Choose in 2026?";
const ARTICLE_SUBTITLE =
  "The 15-minute 2026 forecast: Analyzing the shift in interest rates, property appreciation, hidden costs, and the ultimate financial decision for Indian professionals.";
const BACK_LINK = "/blogs/finance-strategy"; 
const AUTHOR = "Real Estate Economist";
const DATE = "Nov 19, 2025";
const READ_TIME = "15 min read (The 2026 Forecast)"; 
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
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

// --- Reusable Components ---

const SectionHeader: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
  <motion.div variants={itemVariants} className="flex items-center space-x-3 mb-6">
    <div className="p-3 bg-indigo-600 rounded-full text-white shadow-xl">
      {icon}
    </div>
    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
      {title}
    </h2>
  </motion.div>
);

const SubHeader: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
    <motion.h3
      className="text-2xl font-semibold text-indigo-700 mt-8 mb-4 flex items-center space-x-2"
      variants={itemVariants}
    >
      {icon}
      <span>{title}</span>
    </motion.h3>
);

const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.p
    className="text-lg text-gray-700 leading-relaxed mb-4"
    variants={itemVariants}
  >
    {children}
  </motion.p>
);

const KeyTakeaway: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    className="p-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 rounded-lg my-6 shadow-sm"
    variants={itemVariants}
  >
    <p className="font-semibold text-base flex items-start">
      <Zap className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-yellow-600" />
      <span className="leading-relaxed">Key Takeaway: {children}</span>
    </p>
  </motion.div>
);

const BulletPoint: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.li
    className="flex items-start mb-3 text-lg text-gray-700"
    variants={itemVariants}
  >
    <span className="text-indigo-600 font-bold mr-3 mt-1 flex-shrink-0">•</span>
    <span className="leading-relaxed">{children}</span>
  </motion.li>
);


// ====================================================================
// NEW BLOG PAGE CONTENT
// ====================================================================

const RentVsBuy2026: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* === HEADER & META === */}
        <motion.article 
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={pageVariants}
        >
          {/* Back Link */}
          <motion.div variants={itemVariants} className="mb-8">
            <Link 
              to={BACK_LINK} 
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out font-medium"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Finance Strategy
            </Link>
          </motion.div>

          {/* Title Block */}
          <motion.header variants={itemVariants} className="text-center mb-12">
            <motion.div 
              className="inline-flex items-center space-x-3 text-indigo-600 mb-3"
              variants={itemVariants}
            >
              <Scale className="w-10 h-10" />
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
                {ARTICLE_TITLE}
              </h1>
            </motion.div>
            <motion.p variants={itemVariants} className="mt-4 text-xl text-gray-500">
              {ARTICLE_SUBTITLE}
            </motion.p>
            <motion.div variants={itemVariants} className="mt-6 text-sm text-gray-500 space-x-4">
              <span>By: <span className="font-medium text-gray-700">{AUTHOR}</span></span>
              <span>|</span>
              <span>Published: {DATE}</span>
              <span>|</span>
              <span>{READ_TIME}</span>
            </motion.div>
          </motion.header>

          {/* === SECTION 1: THE 2026 MARKET OUTLOOK === */}
          <motion.section
            className="my-10 p-6 bg-white rounded-xl shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <SectionHeader title="The 2026 Market Outlook: Inflation & Rates" icon={<TrendingUp className="w-6 h-6" />} />
            
            <Paragraph>
              The decision to rent or buy in 2026 is uniquely complex, driven by two opposing forces: **rising property prices** and **potentially easing interest rates.** Our analysis of the Indian market suggests a crucial turning point.
            </Paragraph>

            <SubHeader title="Property Appreciation vs. Rental Inflation" icon={<TrendingUp className="w-5 h-5" />} />
            <ul className="list-none pl-0 space-y-2">
              <BulletPoint>
                **Buying:** Home prices are forecasted to accelerate, with an expected **7.0% average annual rise in 2026**. This momentum is led by the mid-income and premium housing segments, meaning entry-level housing is becoming harder to find.
              </BulletPoint>
              <BulletPoint>
                **Renting:** While rents saw a recent temporary dip, the underlying supply crunch in affordable housing suggests rent increases will stabilize back to the historical **5% to 8% annual growth** rate, pressuring long-term renters.
              </BulletPoint>
            </ul>

            <SubHeader title="The Interest Rate Prediction" icon={<IndianRupee className="w-5 h-5" />} />
            <Paragraph>
              A key factor for buyers is the cost of capital. Current home loan rates hover at 8–9%, but market projections anticipate the RBI will ease the repo rate in late 2025. This could drive mortgage rates down to **~5.9% by the end of 2026**, making home loans significantly more affordable and increasing buyer purchasing power.
            </Paragraph>

            <KeyTakeaway>
              Buying in 2026 becomes financially compelling if you can lock in a loan after the predicted rate cuts, benefiting from high property appreciation with lower EMIs.
            </KeyTakeaway>
          </motion.section>

          {/* === SECTION 2: THE CASE FOR OWNERSHIP (BUYING) === */}
          <motion.section
            className="my-10 p-6 bg-white rounded-xl shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <SectionHeader title="The Case for Ownership: Stability & Equity" icon={<Landmark className="w-6 h-6" />} />
            
            <SubHeader title="1. Wealth Creation Through Forced Savings" icon={<Landmark className="w-5 h-5" />} />
            <Paragraph>
              Every EMI payment contains a principal component that builds **equity**—a direct increase in your personal net worth. Unlike rent, which is a pure expense, your home loan acts as a forced, inflation-protected savings plan. If you stay in the home for 5+ years, this equity build-up usually outweighs the upfront costs.
            </Paragraph>

            <SubHeader title="2. Significant Tax Advantages (FY 2025-26)" icon={<IndianRupee className="w-5 h-5" />} />
            <Paragraph>
              The Indian tax code strongly favors the homeowner, allowing you to significantly reduce your taxable income:
            </Paragraph>
            <ul className="list-none pl-0 space-y-2">
              <BulletPoint>
                **Section 80C:** Claim up to **₹1.5 Lakh** deduction on the principal repayment of your home loan, plus stamp duty and registration charges (in the year paid).
              </BulletPoint>
              <BulletPoint>
                **Section 24(b):** Claim up to **₹2 Lakh** deduction on the interest paid for a self-occupied property. For co-borrowers, this benefit can be **doubled** (₹4 Lakh total).
              </BulletPoint>
              <BulletPoint>
                **PMAY Subsidies:** First-time buyers in eligible categories can still avail significant interest subsidies, lowering the effective loan cost by lakhs.
              </BulletPoint>
            </ul>

            <KeyTakeaway>
              Buying is a long-term hedge against inflation. The financial security of fixed EMIs and substantial tax savings are powerful advantages that renting cannot match.
            </KeyTakeaway>
          </motion.section>

          {/* === SECTION 3: THE HIDDEN COSTS OF OWNERSHIP === */}
          <motion.section
            className="my-10 p-6 bg-white rounded-xl shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <SectionHeader title="The Hidden Costs: Why Buying Can Be Misleading" icon={<Wallet className="w-6 h-6" />} />
            
            <Paragraph>
              A common mistake is comparing only rent to EMI. Ownership comes with significant one-time and recurring costs that must be budgeted for, often adding 10-20% to the initial property price.
            </Paragraph>

            <SubHeader title="Upfront Shocks" icon={<Wallet className="w-5 h-5" />} />
            <ul className="list-none pl-0 space-y-2">
              <BulletPoint>
                **Stamp Duty & Registration:** A mandatory, non-financeable cost, typically **4% to 10%** of the property value, depending on the state.
              </BulletPoint>
              <BulletPoint>
                **GST:** A **5%** Goods and Services Tax on the cost of **under-construction** property (resale is exempt).
              </BulletPoint>
              <BulletPoint>
                **Interiors & Furnishing:** New apartments are shells. Budget **5% to 15%** of the property cost for essential interiors like wardrobes, modular kitchens, and lighting.
              </BulletPoint>
            </ul>

            <SubHeader title="Recurring Surprises" icon={<Wallet className="w-5 h-5" />} />
            <ul className="list-none pl-0 space-y-2">
              <BulletPoint>
                **Annual Maintenance:** Society fees, Clubhouse charges, and maintenance deposits.
              </BulletPoint>
              <BulletPoint>
                **Property Tax & Insurance:** Annual municipal taxes and essential home insurance premiums.
              </BulletPoint>
              <BulletPoint>
                **Repairs:** Unlike renting, a leaking tap, broken appliance, or roof damage is 100% your financial responsibility.
              </BulletPoint>
            </ul>
          </motion.section>


          {/* === SECTION 4: THE ARGUMENT FOR RENTING === */}
          <motion.section
            className="my-10 p-6 bg-white rounded-xl shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <SectionHeader title="The Case for Renting: Flexibility & Opportunity" icon={<Home className="w-6 h-6" />} />
            
            <SubHeader title="1. Maximize Geographic & Career Flexibility" icon={<Home className="w-5 h-5" />} />
            <Paragraph>
              If your career requires mobility, or if you are unsure of your city/neighborhood for the next 5 years, renting provides an unmatched escape route. Breaking a 20-year home loan is a complex, expensive process. Breaking a 12-month lease is easy.
            </Paragraph>

            <SubHeader title="2. The 'Rent and Invest the Difference' Strategy" icon={<IndianRupee className="w-5 h-5" />} />
            <Paragraph>
              This is the strongest purely financial argument for renting. By investing the large sum saved from not paying a down payment, registration fees, and hidden costs into high-performing assets (e.g., SIPs in mutual funds), you can potentially outperform the net appreciation of the property.
            </Paragraph>
            <KeyTakeaway>
              **The Math:** If a property appreciates at 7% and a mutual fund SIP yields 12%, renting and investing the difference could generate a higher net worth over a 15-20 year period, even after accounting for rising rent.
            </KeyTakeaway>

            <SubHeader title="3. Predictable Living Costs & Minimal Risk" icon={<Users className="w-5 h-5" />} />
            <Paragraph>
              Renting means no surprise maintenance bills, no property tax worries, and predictable monthly expenses (rent + a modest maintenance fee). Your capital is liquid, not locked up in a single, illiquid asset.
            </Paragraph>
          </motion.section>

          {/* === SECTION 5: THE FINAL DECISION FRAMEWORK === */}
          <motion.section
            className="my-10 p-6 bg-white rounded-xl shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <SectionHeader title="Your 2026 Decision Framework" icon={<GanttChart className="w-6 h-6" />} />
            
            <Paragraph>
              The choice is never universal. Use this simple framework, tailored to the 2026 outlook, to align the decision with your personal and financial goals.
            </Paragraph>

            <SubHeader title="1. When to Strongly Consider Buying in 2026" icon={<Landmark className="w-5 h-5" />} />
            <ul className="list-none pl-0 space-y-2">
              <BulletPoint>
                **Time Horizon:** You plan to stay in the same city/home for **7 years or more**.
              </BulletPoint>
              <BulletPoint>
                **Financial Health:** You have a stable income and a down payment (plus 10% extra for hidden costs) ready.
              </BulletPoint>
              <BulletPoint>
                **Rate Strategy:** You are comfortable with a floating rate, anticipating the predicted drop to the ~5.9% range by late 2026.
              </BulletPoint>
            </ul>

            <SubHeader title="2. When to Stick with Renting in 2026" icon={<Home className="w-5 h-5" />} />
            <ul className="list-none pl-0 space-y-2">
              <BulletPoint>
                **Time Horizon:** You may move within the next **5 years** (e.g., career growth, relocation).
              </BulletPoint>
              <BulletPoint>
                **Investment Focus:** You can consistently invest the money saved from a down payment and hidden costs to achieve annual returns of 9% or more.
              </BulletPoint>
              <BulletPoint>
                **Stress & Risk:** You prefer a fixed, predictable monthly expense and want to eliminate the responsibility of maintenance, repairs, and property value risk.
              </BulletPoint>
            </ul>
          </motion.section>


          {/* === CALL TO ACTION (CTA) SECTION === */}
          <motion.section
            className="my-10 p-10 bg-indigo-700 rounded-xl shadow-2xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg flex items-center justify-center space-x-3"
              variants={itemVariants}
            >
              <Zap className="w-8 h-8 text-yellow-300" />
              <span>Make The Right Move: Calculate Your Breakeven Point</span>
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Don't guess. Use a Rent vs. Buy calculator to determine your specific financial breakeven point based on local rents, expected appreciation, and 2026 interest rate forecasts.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => alert("Rent vs. Buy Calculator Link/Page Launching...")}
                className="bg-white text-indigo-700 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Launch Calculator Tool
              </button>
            </motion.div>
          </motion.section>

        </motion.article>
      </div>
    </div>
  );
};

export default RentVsBuy2026;
