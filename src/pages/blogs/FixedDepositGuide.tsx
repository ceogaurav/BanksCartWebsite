import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Banknote, Calendar, Shield, Zap, Search, PieChart, Info } from "lucide-react";
import { Link } from "react-router-dom";

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "Fixed Deposit Interest Rates 2025: Your Ultimate Guide to the Best FD Plans in India";
const ARTICLE_SUBTITLE =
  "Navigate the complex landscape of 2025 Fixed Deposit schemes. Discover where to find the highest interest rates, understand the tax implications, and learn advanced strategies for maximizing your returns across banks, NBFCs, and Small Finance Banks.";
const BACK_LINK = "/blogs/banking-guides";
const AUTHOR = "Advanced Financial Analytics Team";
const DATE = "Nov 19, 2025";
const READ_TIME = "150 min read"; // Placeholder for the desired length
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
      type: "spring",
      stiffness: 70,
      damping: 14,
    },
  },
};

// Reusable components
const SectionHeader: React.FC<{ title: string; icon: React.ElementType }> = ({ title, icon: Icon }) => (
  <motion.h2
    className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-12 mb-6 pt-4 border-t-2 border-green-100 flex items-center"
    variants={itemVariants}
  >
    <Icon className="w-8 h-8 mr-3 text-green-700" />
    {title}
  </motion.h2>
);

const SubHeader: React.FC<{ title: string }> = ({ title }) => (
  <motion.h3
    className="text-2xl font-bold text-gray-800 mt-8 mb-4 border-l-4 border-lime-400 pl-3"
    variants={itemVariants}
  >
    {title}
  </motion.h3>
);

const BulletPoint: React.FC<{ text: string }> = ({ text }) => (
  <motion.li
    className="flex items-start mb-2 text-gray-700 leading-relaxed"
    variants={itemVariants}
  >
    <Info className="w-5 h-5 mr-3 mt-1 text-teal-500 flex-shrink-0" />
    <span>{text}</span>
  </motion.li>
);

// --- MAIN COMPONENT ---
const FixedDepositGuidePage: React.FC = () => (
  <motion.div
    className="min-h-screen bg-gradient-to-br from-white/60 to-green-50/80 py-12 px-4 md:px-12 font-inter"
    variants={pageVariants}
    initial="hidden"
    animate="visible"
  >
    <div className="max-w-5xl mx-auto">
      {/* Back Link */}
      <motion.div variants={itemVariants} className="mb-8">
        <Link
          to={BACK_LINK}
          className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Expert Banking Guides
        </Link>
      </motion.div>

      {/* Article Header (SEO H1) */}
      <motion.header variants={itemVariants} className="mb-10 pb-6 border-b border-green-300">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-4 drop-shadow-sm bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-700 leading-tight">
          {ARTICLE_TITLE}
        </h1>
        <p className="text-xl text-gray-700 leading-relaxed italic mt-4">
          {ARTICLE_SUBTITLE}
        </p>
        <div className="flex text-sm text-gray-500 mt-6 space-x-6">
          <span>By <strong>{AUTHOR}</strong></span>
          <span>•</span>
          <span>{DATE}</span>
          <span>•</span>
          <span>{READ_TIME}</span>
        </div>
      </motion.header>

      {/* Article Content */}
      <article className="text-gray-800 leading-relaxed space-y-8">

        <motion.p variants={itemVariants} className="text-xl font-semibold p-4 bg-lime-50 rounded-lg border-l-4 border-green-600">
          In 2025, Fixed Deposits (FDs) remain the bedrock of **risk-averse Indian investment**, offering guaranteed returns and capital safety. As interest rates fluctuate based on RBI policy (Repo Rate) and market liquidity, choosing the **right FD plan**—from the right institution and the optimal tenure—is crucial. This comprehensive guide will equip you with the advanced knowledge to capture the **highest possible FD returns** while ensuring compliance and security.
        </motion.p>

        {/* SECTION 1: FD Fundamentals and Market Context */}
        <SectionHeader title="1. Understanding the 2025 FD Market Landscape" icon={Banknote} />
        
        <SubHeader title="1.1. How RBI Policy (Repo Rate) Dictates FD Rates" />
        <motion.p variants={itemVariants}>
          Fixed Deposit rates are intrinsically linked to the **Reserve Bank of India's (RBI) Monetary Policy**, specifically the **Repo Rate**. When the RBI raises the Repo Rate to curb inflation, banks raise their lending and borrowing rates, leading to higher FD returns. Conversely, rate cuts decrease FD returns. The 2025 outlook suggests a stabilization phase, making specific, high-rate schemes highly valuable for locking in returns. 
        </motion.p>

        <SubHeader title="1.2. The Importance of DICGC Insurance" />
        <motion.p variants={itemVariants}>
          The **Deposit Insurance and Credit Guarantee Corporation (DICGC)**, a subsidiary of the RBI, provides a crucial layer of safety. This insurance guarantees the return of your capital up to **₹5 Lakh** (including both principal and interest) per bank, per person, in the event of a bank failure. For high net worth individuals, understanding this limit is key to smart diversification.
        </motion.p>
        <ul className="list-none space-y-3">
          <BulletPoint text="**Safety Net:** DICGC cover is the primary reason FDs are considered safer than mutual funds or equities." />
          <BulletPoint text="**Diversification Strategy:** For deposits exceeding ₹5 Lakh, spread the amount across multiple, separate banks to ensure 100% DICGC coverage on the entire principal." />
        </ul>
        
        {/* SECTION 2: Top FD Interest Rate Schemes in 2025 */}
        <SectionHeader title="2. Maximizing Returns: Best FD Plans by Institution Type" icon={TrendingUp} />

        <SubHeader title="2.1. Small Finance Banks (SFBs): The High-Rate Champions" />
        <motion.p variants={itemVariants}>
          SFBs consistently offer the highest FD interest rates, often exceeding 8.5% for specific tenures, due to their mandate to serve niche banking sectors. While they are fully covered by DICGC, their higher risk appetite translates to better returns. **Key SFBs to watch in 2025:**
        </motion.p>
        <ul className="list-disc ml-6 space-y-2">
            <li>**Suryoday SFB:** Known for offering peak rates on 999-day and 2-year tenures.</li>
            <li>**Unity SFB:** Often provides competitive returns on short-to-medium term FDs (1 to 3 years).</li>
            <li>**Jana SFB:** Highly aggressive rates for senior citizen deposits, targeting 9%+ returns.</li>
        </ul>

        <SubHeader title="2.2. Public Sector (PSU) and Private Banks: Safety and Stability" />
        <motion.p variants={itemVariants}>
          While their rates are typically lower (ranging from 6.0% to 7.5%), they are chosen for their **massive scale and perceived safety** beyond the DICGC limit.
        </motion.p>
        <motion.div className="overflow-x-auto" variants={itemVariants}>
          <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
            <thead className="bg-green-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Top Private Bank (Example)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Top PSU Bank (Example)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Best Tenure for 2025</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <motion.tr variants={itemVariants}>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">Max Retail Rate (General)</td>
                <td className="px-6 py-4 whitespace-nowrap">HDFC Bank (~7.30%)</td>
                <td className="px-6 py-4 whitespace-nowrap">SBI (~7.00%)</td>
                <td className="px-6 py-4">400 days to 18 months</td>
              </motion.tr>
              <motion.tr variants={itemVariants}>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">Senior Citizen Peak Rate</td>
                <td className="px-6 py-4 whitespace-nowrap">ICICI Bank (+0.50% over general)</td>
                <td className="px-6 py-4 whitespace-nowrap">Bank of Baroda (+0.50% over general)</td>
                <td className="px-6 py-4">5 years (for tax benefit schemes)</td>
              </motion.tr>
            </tbody>
          </table>
        </motion.div>

        <SubHeader title="2.3. NBFC and Corporate FD Schemes" />
        <motion.p variants={itemVariants}>
          NBFCs (Non-Banking Financial Companies) like Bajaj Finance offer competitive rates, but they are **not covered by DICGC**. Their safety relies entirely on the company's credit rating (e.g., AAA, AA+). Only invest in NBFC FDs from companies with the highest possible **AAA rating** from agencies like CRISIL or ICRA.
        </motion.p>
        <motion.blockquote variants={itemVariants} className="p-3 bg-red-50 border-l-4 border-red-500 italic text-gray-700">
            **Caution:** Higher rates from NBFCs come with higher risk. Prioritize DICGC-insured bank FDs unless you fully understand the credit risk associated with the NBFC.
        </motion.blockquote>
        
        {/* SECTION 3: Advanced FD Investment Strategies */}
        <SectionHeader title="3. Tenure, Strategy, and Return Calculation" icon={Calendar} />

        <SubHeader title="3.1. The Critical Role of Tenure Selection" />
        <motion.p variants={itemVariants}>
          The best FD rate is highly tenure-specific. Most banks offer a **'Sweet Spot'**—a particular tenure (often 12-18 months or 390-500 days) that yields the highest return. Investors should avoid blindly choosing 5 years unless a tax deduction is the goal.
        </motion.p>
        <ul className="list-disc ml-6 space-y-2">
            <BulletPoint text="**Short Term (1-12 Months):** Useful for liquidity needs, but rates are typically lower." />
            <BulletPoint text="**Medium Term (1-3 Years):** Often the peak rate period, ideal for locking in high returns if rates are expected to fall." />
            <BulletPoint text="**Long Term (5+ Years):** Rates often taper off, but essential for **Tax-Saving FDs** under Section 80C." />
        </ul>

        <SubHeader title="3.2. The Power of FD Laddering (Staggering Maturity)" />
        <motion.p variants={itemVariants}>
          FD Laddering is a technique to mitigate **interest rate risk** and ensure **liquidity**. Instead of placing all ₹10 Lakh in a single 5-year FD, an investor splits the amount into five equal FDs (₹2 Lakh each) with staggered tenures (1, 2, 3, 4, and 5 years).
        </motion.p>
        <motion.div variants={itemVariants} className="p-4 bg-gray-100 rounded-lg">
            **Outcome:** Every year, one FD matures, giving you the flexibility to re-invest at the **current prevailing market rate** (mitigating interest rate risk) while ensuring annual cash flow (liquidity). 
        </motion.div>

        <SubHeader title="3.3. Compound Interest Calculation and Frequency" />
        <motion.p variants={itemVariants}>
          The true return is determined by the compounding frequency (quarterly, half-yearly, or annual). The formula for the maturity value (Maturity Value $= P (1 + r/n)^{(nt)}$) demonstrates that the more frequently interest is compounded, the higher the final return. Always choose an FD with **quarterly compounding** for maximum yield, even if the stated annual rate is marginally lower than a scheme offering annual compounding.
          <br/>
          $$Maturity\ Value = P \left(1 + \frac{r}{n}\right)^{(nt)}$$
          <br/>
          Where: $P$ = Principal, $r$ = Annual Interest Rate, $n$ = Compounding Frequency per year, $t$ = Tenure in years.
        </motion.p>

        {/* SECTION 4: Tax Implications and Compliance (TDS, 80C) */}
        <SectionHeader title="4. Tax Compliance and Optimization (TDS & Section 80C)" icon={Shield} />

        <SubHeader title="4.1. Understanding TDS (Tax Deducted at Source)" />
        <motion.p variants={itemVariants}>
          Banks are mandated to deduct TDS if the total interest earned across all your FDs with that specific bank exceeds **₹40,000 in a financial year** (₹50,000 for Senior Citizens). The standard TDS rate is **10%** if PAN is provided, and 20% if PAN is not linked.
        </motion.p>
        <ul className="list-none space-y-3">
          <BulletPoint text="**Form 15G/15H:** If your total annual income (including FD interest) is below the taxable threshold (₹2.5 Lakh for general, ₹3 Lakh/₹5 Lakh for Senior/Super Senior Citizens), you must submit **Form 15G** (under 60 years) or **Form 15H** (60 years and above) to the bank to prevent TDS deduction." />
          <BulletPoint text="**TDS is Not Final Tax:** TDS is merely an advance tax. The final interest income is added to your total income and taxed at your **slab rate** during IT return filing." />
        </ul>

        <SubHeader title="4.2. Tax-Saving FDs under Section 80C" />
        <motion.p variants={itemVariants}>
          A **Tax-Saving FD** is a specific scheme that qualifies for a deduction of up to **₹1.5 Lakh** under Section 80C of the Income Tax Act.
        </motion.p>
        <ul className="list-disc ml-6 space-y-2">
            <li>**Mandatory Lock-in:** The compulsory lock-in period is **5 years**. Premature withdrawal is not allowed under any circumstances.</li>
            <li>**Interest is Taxable:** While the principal investment is deductible, the interest earned remains fully taxable as per your slab rate, unlike some other 80C investments (like PPF).</li>
        </ul>

        {/* SECTION 5: Practical Comparison and Decision Making */}
        <SectionHeader title="5. Final Comparison and Choosing the Right FD" icon={PieChart} />

        <SubHeader title="5.1. Comparison of Best FD Rates (2025 Snapshot)" />
        <motion.p variants={itemVariants}>
          (This section would contain a large, dynamic table in a live application, constantly updated with the top 5 rates from SFBs, Private Banks, and NBFCs for the most popular tenures, e.g., 1 year and 3 years).
        </motion.p>
        
        <SubHeader title="5.2. Decision Matrix: Safety vs. Return" />
        <motion.p variants={itemVariants}>
          Use the following matrix to determine the optimal FD institution based on your risk profile and investment size:
        </motion.p>
        <ul className="list-none space-y-3">
          <BulletPoint text="**High Safety (Investment ≤ ₹5 Lakh):** Choose the SFB offering the highest rate, as the entire amount is DICGC-insured." />
          <BulletPoint text="**Moderate Safety (Investment > ₹5 Lakh):** Diversify the amount across multiple SFBs/Private Banks (keeping $\le$ ₹5 Lakh in each) or choose a large PSU/Private bank with a strong track record, accepting a slightly lower rate." />
          <BulletPoint text="**Low Risk Appetite, High Value:** Stick exclusively to India's largest Private and PSU banks (SBI, HDFC, ICICI), prioritizing institutional stability over the few extra basis points offered by smaller banks." />
        </ul>

        {/* CONCLUSION */}
        <motion.section variants={itemVariants} className="mt-12 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
          <h4 className="text-xl font-bold text-gray-900 mb-3">Final Verdict on FD Strategy for 2025</h4>
          <p>
            Fixed Deposits are indispensable for capital preservation. The key to maximizing your returns in 2025 lies in proactive research: tracking the best **'sweet spot' tenures** offered by SFBs, implementing the **laddering strategy** for liquidity, and meticulously ensuring **DICGC insurance coverage** for every rupee. Discipline in tax compliance through Forms 15G/15H will ensure you retain the maximum post-tax yield.
          </p>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="text-center mt-16 p-8 bg-gradient-to-r from-green-600 to-teal-700 rounded-2xl shadow-xl"
          variants={pageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Get Live FD Rate Comparisons
          </motion.h2>
          <motion.p
            className="text-lg text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Access a real-time, personalized comparison tool showing the best FD rates across 50+ financial institutions in India.
          </motion.p>
          <motion.div variants={itemVariants}>
            <button
              onClick={() => alert("Live Rate Comparison Tool Launched!")}
              className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
            >
              Compare Rates Now
            </button>
          </motion.div>
        </motion.section>

      </article>
    </div>
  </motion.div>
);

export default FixedDepositGuidePage;
