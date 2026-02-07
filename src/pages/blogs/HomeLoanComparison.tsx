import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Scale, // Used for the overall comparison
  Banknote, // Used for Fees and Waivers
  TrendingUp, // Used for SBI's scale
  Landmark, // Used for HDFC's legacy/Premier
  Zap, // Used for CTA / Digital
  GanttChart, // Used for the Comparative Table
  Shield, // Used for Axis/Other Benefits
  Percent, // Used for Interest Rate focus
} from "lucide-react";
import { Link } from "react-router-dom";

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "Home Loan Interest Rates Comparison 2025 – SBI vs HDFC vs ICICI vs AXIS";
const ARTICLE_SUBTITLE =
  "The definitive 2025 breakdown: Comparing floating rates, processing fees, CIBIL concessions, and hidden product features from India's four financial giants for the optimal home loan.";
const BACK_LINK = "/blogs/finance-strategy";
const AUTHOR = "Real Estate Finance Expert";
const DATE = "Nov 19, 2025";
const READ_TIME = "22 min read (Comparative Analysis)";
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
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Reusable Components
const SectionHeader: React.FC<{ icon: React.ReactNode; text: string }> = ({
  icon,
  text,
}) => (
  <motion.h2
    className="text-3xl sm:text-4xl font-extrabold text-indigo-100 mt-12 mb-6 border-b-2 border-indigo-400/30 pb-3 drop-shadow-md flex items-center space-x-3"
    variants={itemVariants}
  >
    {icon}
    <span>{text}</span>
  </motion.h2>
);

const SubHeader: React.FC<{ text: string }> = ({ text }) => (
  <motion.h3
    className="text-xl sm:text-2xl font-bold text-yellow-300 mt-8 mb-4 drop-shadow"
    variants={itemVariants}
  >
    {text}
  </motion.h3>
);

const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.p
    className="text-lg text-white mb-6 leading-relaxed"
    variants={itemVariants}
  >
    {children}
  </motion.p>
);

const KeyTakeaway: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    className="bg-indigo-600/70 p-4 sm:p-6 rounded-lg shadow-xl border-l-4 border-yellow-400 my-6"
    variants={itemVariants}
  >
    <p className="font-bold text-yellow-200 text-lg">Key Takeaway:</p>
    <p className="text-white mt-1 italic">{children}</p>
  </motion.div>
);

const BulletPoint: React.FC<{ text: string }> = ({ text }) => (
  <motion.li
    className="flex items-start mb-3 text-white text-lg"
    variants={itemVariants}
  >
    <Percent className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1 mr-3" />
    <span>{text}</span>
  </motion.li>
);

// Custom Table Component for the Comparison
const ComparisonTable: React.FC = () => (
  <motion.div variants={itemVariants} className="overflow-x-auto my-8">
    <table className="min-w-full bg-indigo-900 border border-indigo-700 rounded-lg shadow-2xl">
      <thead>
        <tr className="bg-indigo-700 text-yellow-300">
          <th className="py-3 px-4 text-left font-bold border-b border-indigo-700">
            Category
          </th>
          <th className="py-3 px-4 text-left font-bold border-b border-indigo-700">
            SBI
          </th>
          <th className="py-3 px-4 text-left font-bold border-b border-indigo-700">
            HDFC Bank
          </th>
          <th className="py-3 px-4 text-left font-bold border-b border-indigo-700">
            ICICI Bank
          </th>
          <th className="py-3 px-4 text-left font-bold border-b border-indigo-700">
            Axis Bank
          </th>
        </tr>
      </thead>
      <tbody>
        {/* Row 1: Starting Rate */}
        <tr className="border-b border-indigo-700 hover:bg-indigo-800 transition-colors duration-200">
          <td className="py-3 px-4 font-semibold text-white">Starting Rate (p.a.)</td>
          <td className="py-3 px-4 text-green-300 font-bold">~7.50%</td>
          <td className="py-3 px-4 text-white">~7.90%</td>
          <td className="py-3 px-4 text-white">~8.75%</td>
          <td className="py-3 px-4 text-white">~8.35%</td>
        </tr>
        {/* Row 2: Rate Linkage */}
        <tr className="border-b border-indigo-700 hover:bg-indigo-800 transition-colors duration-200">
          <td className="py-3 px-4 font-semibold text-white">Rate Linkage</td>
          <td className="py-3 px-4 text-white">EBLR (Repo Rate)</td>
          <td className="py-3 px-4 text-white">Repo Rate</td>
          <td className="py-3 px-4 text-white">Repo Rate/MCLR</td>
          <td className="py-3 px-4 text-white">Repo Rate/MCLR</td>
        </tr>
        {/* Row 3: Processing Fee (Min-Max) */}
        <tr className="border-b border-indigo-700 hover:bg-indigo-800 transition-colors duration-200">
          <td className="py-3 px-4 font-semibold text-white">Processing Fee</td>
          <td className="py-3 px-4 text-green-300">0.35% (Max ₹10k)</td>
          <td className="py-3 px-4 text-white">Up to 0.50%</td>
          <td className="py-3 px-4 text-red-300">Up to 2.00%</td>
          <td className="py-3 px-4 text-white">Up to 1.00%</td>
        </tr>
        {/* Row 4: Max Tenure */}
        <tr className="border-b border-indigo-700 hover:bg-indigo-800 transition-colors duration-200">
          <td className="py-3 px-4 font-semibold text-white">Max Tenure</td>
          <td className="py-3 px-4 text-white">30 Years</td>
          <td className="py-3 px-4 text-white">30 Years</td>
          <td className="py-3 px-4 text-white">30 Years</td>
          <td className="py-3 px-4 text-white">30 Years</td>
        </tr>
        {/* Row 5: Special Feature */}
        <tr className="hover:bg-indigo-800 transition-colors duration-200">
          <td className="py-3 px-4 font-semibold text-white">Unique Benefit</td>
          <td className="py-3 px-4 text-white">Low fees & Women concession</td>
          <td className="py-3 px-4 text-white">TruFixed option</td>
          <td className="py-3 px-4 text-white">Instant Pre-Approved Loans</td>
          <td className="py-3 px-4 text-white">EMI Waivers (Fast Forward)</td>
        </tr>
      </tbody>
    </table>
  </motion.div>
);

// ====================================================================
// MAIN PAGE COMPONENT (The new blog content)
// ====================================================================

const HomeLoanComparison: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Back Link and Header Section */}
        <motion.header
          className="text-white pb-8 border-b border-indigo-500/50"
          initial="hidden"
          animate="visible"
          variants={pageVariants}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <Link
              to={BACK_LINK}
              className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200 flex items-center text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Finance Strategy Blogs
            </Link>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight"
            variants={itemVariants}
          >
            {ARTICLE_TITLE}
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl text-indigo-300 italic mb-6"
            variants={itemVariants}
          >
            {ARTICLE_SUBTITLE}
          </motion.p>

          <motion.div
            className="flex flex-wrap text-sm text-indigo-400 font-mono space-x-4"
            variants={itemVariants}
          >
            <span>
              By: **{AUTHOR}**
            </span>
            <span>
              | Date: **{DATE}**
            </span>
            <span>
              | Read Time: **{READ_TIME}**
            </span>
          </motion.div>
        </motion.header>

        {/* Main Article Content */}
        <motion.article
          className="mt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={pageVariants}
        >
          {/* Section 1: Introduction */}
          <motion.section variants={itemVariants}>
            <SectionHeader
              icon={<Scale className="w-6 h-6 text-yellow-300" />}
              text="1. The 2025 Home Loan Landscape: Finding the Best Deal"
            />
            <Paragraph>
              The 2025 home loan market in India is fiercely competitive, driven by a stable **Repo Rate-linked Lending Rate (RLLR/EBLR)** regime. While interest rates remain closely linked across the top four lenders—**SBI, HDFC Bank, ICICI Bank, and Axis Bank**—the true value lies in the subtle differences: **CIBIL-based concessions, variable processing fees, and unique loan products.** This analysis cuts through the marketing noise to reveal who offers the best deal for different borrower profiles.
            </Paragraph>
            <KeyTakeaway>
              All four banks peg their floating rates to the RBI's benchmark (Repo Rate). Therefore, the actual lowest effective rate is determined by your **credit score (750+ is key)** and whether you qualify for concessions.
            </KeyTakeaway>
          </motion.section>
          
          <div className="border-t border-indigo-700/50 my-8"></div>

          {/* Section 2: SBI - The Volume Leader and Lowest Base Rate */}
          <motion.section
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader
              icon={<TrendingUp className="w-6 h-6 text-yellow-300" />}
              text="2. State Bank of India (SBI): The Lowest Entry Point"
            />
            <Paragraph>
              As India's largest lender, **SBI** consistently targets the lowest base rate, often starting at **~7.50% p.a. onwards** for the best CIBIL scores. Its massive scale allows it to minimize processing fees, making its upfront cost the most attractive.
            </Paragraph>
            <SubHeader text="Key Features of SBI Home Loans" />
            <ul className="list-none space-y-3 pl-0">
              <BulletPoint text="Lowest Starting Rate: Often 0.10% to 0.50% lower than its private bank competitors for high-CIBIL borrowers." />
              <BulletPoint text="Processing Fee Cap: SBI's fee (0.35% of loan amount) is capped at a low **₹10,000**, offering huge savings on loans over ₹30 Lakhs." />
              <BulletPoint text="Women Borrower Concession: Offers a standard **0.05% interest rate concession** for women applicants." />
              <BulletPoint text="No Prepayment Penalty: True for all floating rate loans, a standard but crucial feature." />
            </ul>
          </motion.section>

          <div className="border-t border-indigo-700/50 my-8"></div>

          {/* Section 3: HDFC Bank - The Premier Private Player */}
          <motion.section
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader
              icon={<Landmark className="w-6 h-6 text-yellow-300" />}
              text="3. HDFC Bank: Trust, Speed, and Hybrid Rates"
            />
            <Paragraph>
              **HDFC Bank** (post-merger) commands a significant market share and is renowned for its quick, transparent processing. Its floating rates start competitively at **~7.90% p.a.** but its distinct advantage lies in its product flexibility, particularly the **TruFixed Loan** option.
            </Paragraph>
            <SubHeader text="HDFC's Product Edge" />
            <ul className="list-none space-y-3 pl-0">
              <BulletPoint text="TruFixed Loan: Offers a fixed rate for the first 2-3 years, converting to a floating rate thereafter. Ideal for those who fear short-term rate volatility." />
              <BulletPoint text="Competitive Processing Fees: Up to 0.50% of the loan amount, with a low minimum of around ₹3,300." />
              <BulletPoint text="High LTV Ratio: Offers high Loan-to-Value (LTV) ratios, financing up to 90% of the property cost for loans up to ₹30 Lakhs." />
            </ul>
            <KeyTakeaway>
              Choose HDFC Bank if you value a blend of **fixed-rate security** for the initial tenure and require a fast, high-LTV loan processing experience.
            </KeyTakeaway>
          </motion.section>

          <div className="border-t border-indigo-700/50 my-8"></div>

          {/* Section 4: ICICI Bank - The Digital Frontrunner */}
          <motion.section
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader
              icon={<Zap className="w-6 h-6 text-yellow-300" />}
              text="4. ICICI Bank: Digital Speed and Top-Up Flexibility"
            />
            <Paragraph>
              **ICICI Bank** has a higher starting rate (around **~8.75% p.a.** for top CIBIL scores) but excels in digital integration and product ecosystems. They are the market leaders in offering instant, pre-approved loan sanctions to existing customers via their digital channels.
            </Paragraph>
            <SubHeader text="ICICI's Cost Consideration" />
            <ul className="list-none space-y-3 pl-0">
              <BulletPoint text="Instant Sanctions: Their pre-approved home loan facility provides immediate sanction letters, simplifying the property purchase negotiation." />
              <BulletPoint text="Top-Up Loans: Offers highly flexible and quick Top-Up Home Loans with a longer tenure (up to 20 years), ideal for renovation or other financial needs." />
              <BulletPoint text="High Processing Fees: Be cautious of the processing fee, which can be **up to 2.00%** of the loan amount. This can significantly increase the total upfront cost compared to SBI." />
            </ul>
          </motion.section>

          <div className="border-t border-indigo-700/50 my-8"></div>

          {/* Section 5: Axis Bank - The Scheme Specialist */}
          <motion.section
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader
              icon={<Shield className="w-6 h-6 text-yellow-300" />}
              text="5. Axis Bank: EMI Waivers and Product Innovation"
            />
            <Paragraph>
              **Axis Bank** starts at a competitive **~8.35% p.a.** and positions itself as the innovation-focused private bank. While their rate is slightly higher than SBI and HDFC's entry points, they offer unique loan schemes designed to reward timely repayment.
            </Paragraph>
            <SubHeader text="The 'Fast Forward' Advantage" />
            <ul className="list-none space-y-3 pl-0">
              <BulletPoint text="EMI Waivers: The **Fast Forward Home Loan** scheme offers a waiver of up to 12 EMIs upon regular repayment, leading to substantial long-term savings." />
              <BulletPoint text="Shubh Aarambh Home Loan: A specialized scheme with a lower interest rate for customers who maintain a minimum balance or meet other banking relationship criteria." />
              <BulletPoint text="Floating Rate Tenure: Maximum tenure of 30 years for floating rates, but only 20 years for fixed-rate options." />
            </ul>
          </motion.section>

          <div className="border-t border-indigo-700/50 my-8"></div>

          {/* Section 6: Side-by-Side Comparison Table */}
          <motion.section
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader
              icon={<GanttChart className="w-6 h-6 text-yellow-300" />}
              text="6. The Ultimate Rate Showdown: Comparison Table 2025"
            />
            <Paragraph>
              A snapshot comparison of the key financial metrics for a prime borrower (CIBIL 750+). Note that the lowest rate shown is for the most creditworthy customer, and actual rates depend on your loan amount and risk profile.
            </Paragraph>

            <ComparisonTable />
          </motion.section>

          <div className="border-t border-indigo-700/50 my-8"></div>

          {/* Section 7: Final Verdict and Strategy */}
          <motion.section
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader
              icon={<Scale className="w-6 h-6 text-yellow-300" />}
              text="7. Final Verdict: Which Bank is Right for You?"
            />
            <Paragraph>
              The "best" bank depends entirely on your priority:
            </Paragraph>

            <SubHeader text="For the Cost-Conscious Borrower (Best CIBIL Score)" />
            <Paragraph>
              **SBI** is the uncontested winner due to the combination of the lowest base rate (~7.50% p.a.) and the lowest capped processing fee (max ₹10,000). Every ₹1 saved on processing fees is a direct saving.
            </Paragraph>

            <SubHeader text="For Stability and Flexibility" />
            <Paragraph>
              **HDFC Bank** is the strong choice for those who want a **fixed-rate buffer** (TruFixed loan) in the early years or require seamless digital service with high LTV financing.
            </Paragraph>

            <SubHeader text="For Loyalty and Unique Benefits" />
            <Paragraph>
              **Axis Bank's** EMI waiver schemes offer the best long-term value for reliable borrowers. If you plan to hold the loan for 15+ years and have excellent repayment history, the waived EMIs can easily offset a slightly higher starting rate.
            </Paragraph>
            
            <SubHeader text="For Speed and Existing ICICI Customers" />
            <Paragraph>
              **ICICI Bank** is best if you are an existing customer who can secure an instant pre-approved loan, or if you anticipate needing an easy top-up loan in the future. However, be prepared to negotiate the potentially higher processing fee.
            </Paragraph>
          </motion.section>

          <div className="border-t border-indigo-700/50 my-8"></div>

          {/* Call to Action (Replicating the structure and style of the original CTA) */}
          <motion.section
            className="text-center bg-indigo-700/50 p-10 rounded-xl shadow-2xl mt-12 mb-10"
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
              <span>Implement the Strategy: Get Your Personalized Rate Quote</span>
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Don't guess which bank offers the lowest rate. Use a soft inquiry to compare all four offers based on your exact CIBIL score and financial profile—in under 5 minutes, without affecting your credit history.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => alert("Personalized Home Loan Quote Comparison Initiated!")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Start My Free Rate Comparison Now
              </button>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
};

export default HomeLoanComparison;
