import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Landmark, // Used for Regime Choice (The Foundation)
  DollarSign, // Used for Section 80C (Core Investments)
  TrendingUp, // Used for NPS (The Additional Rs. 50k)
  HeartPulse, // Used for Section 80D (Health)
  Home, // Used for Home Loan Strategies
  GraduationCap, // Used for Education Loan (80E)
  Briefcase, // Used for Salaried/New Regime Strategy
  Gavel, // Used for Advanced Tax Moves (HUF/Donations)
  Zap, // Used for CTA
} from "lucide-react";
import { Link } from "react-router-dom";

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "Best Ways to Save Tax in India (2026 Updated Guide)";
const ARTICLE_SUBTITLE =
  "FY 2025-26 (AY 2026-27): Your Comprehensive Guide to Maximizing Deductions Under Both Old and New Tax Regimes, including the new ₹12 Lakh tax-free limit.";
const BACK_LINK = "/blogs/tax-planning-strategy";
const AUTHOR = "Financial Planning Expert";
const DATE = "Nov 19, 2025";
const READ_TIME = "25 min read (The Complete Tax Manual)";
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
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Reusable animated components
const SectionHeader: React.FC<{ title: string; icon: React.ReactNode }> = ({
  title,
  icon,
}) => (
  <motion.h2
    className="text-3xl sm:text-4xl font-extrabold text-white mt-12 mb-4 pt-6 flex items-center space-x-3 border-b-2 border-indigo-700 pb-2"
    variants={itemVariants}
  >
    {icon}
    <span>{title}</span>
  </motion.h2>
);

const SubHeader: React.FC<{ title: string }> = ({ title }) => (
  <motion.h3
    className="text-xl sm:text-2xl font-bold text-indigo-300 mt-8 mb-4"
    variants={itemVariants}
  >
    {title}
  </motion.h3>
);

const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.p
    className="text-base text-gray-200 mb-4 leading-relaxed"
    variants={itemVariants}
  >
    {children}
  </motion.p>
);

const BulletPoint: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.li
    className="text-base text-gray-200 mb-2 ml-5 list-disc"
    variants={itemVariants}
  >
    {children}
  </motion.li>
);

const KeyTakeaway: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    className="p-5 my-6 bg-yellow-900 border-l-4 border-yellow-500 rounded-lg shadow-xl"
    variants={itemVariants}
  >
    <p className="font-bold text-yellow-300 text-lg">Key Takeaway:</p>
    <p className="text-sm text-yellow-100 italic">{children}</p>
  </motion.div>
);

// ====================================================================
// MAIN PAGE COMPONENT
// ====================================================================

const TaxSavingGuide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        {/* Header Section */}
        <header className="py-6 border-b border-indigo-700">
          <Link to={BACK_LINK} className="text-indigo-400 hover:text-indigo-200 flex items-center transition duration-300">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Finance Strategy
          </Link>
          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold mt-4 drop-shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {ARTICLE_TITLE}
          </motion.h1>
          <motion.p
            className="text-xl text-indigo-400 mt-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {ARTICLE_SUBTITLE}
          </motion.p>
          <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
            <span>By: {AUTHOR}</span>
            <span>Published: {DATE}</span>
            <span>{READ_TIME}</span>
          </div>
        </header>

        {/* Article Body */}
        <motion.article
          className="mt-8"
          initial="hidden"
          animate="visible"
          variants={pageVariants}
        >
          {/* Section 1: The Critical Choice: Old vs. New Regime */}
          <motion.section variants={itemVariants}>
            <SectionHeader
              title="1. Master the Regime Choice: The Foundation of Your Tax Plan"
              icon={<Landmark className="w-6 h-6 text-yellow-400" />}
            />
            <Paragraph>
              The first and most critical step for tax saving in India is choosing between the Old Tax Regime (with deductions) and the New Tax Regime (simplified, lower rates, few exemptions). For FY 2025-26, the New Regime has become the default, but the Old Regime remains beneficial for those who maximize deductions.
            </Paragraph>
            <SubHeader title="The Key Decision Factors for FY 2025-26" />
            <ul className="space-y-2 mb-4">
              <BulletPoint>
                <span className="font-semibold text-white">Old Regime (The Investor's Choice):</span> Best if your deductions (80C, 80D, HRA, Home Loan Interest) exceed ₹2.5 Lakh. It rewards disciplined savings.
              </BulletPoint>
              <BulletPoint>
                <span className="font-semibold text-white">New Regime (The Simplifier's Choice):</span> Best if you prefer lower tax rates without the hassle of investment proof. The rebate has been enhanced, making income up to ₹12 Lakh effectively tax-free for salaried individuals.
              </BulletPoint>
            </ul>
            <KeyTakeaway>
              Calculate your exact tax liability under both regimes. Do not blindly stick to the Old Regime; the new system's lower slabs and increased rebate (₹60,000 u/s 87A) make it highly competitive, especially for income up to ₹12 Lakh.
            </KeyTakeaway>
          </motion.section>

          {/* Section 2: Maximize Section 80C: The Core ₹1.5 Lakh Basket */}
          <motion.section variants={itemVariants}>
            <SectionHeader
              title="2. Exhaust the ₹1.5 Lakh 80C Limit (Old Regime Only)"
              icon={<DollarSign className="w-6 h-6 text-green-400" />}
            />
            <Paragraph>
              Section 80C is the bedrock of tax planning under the Old Regime, allowing a maximum deduction of ₹1,50,000. It covers a diverse range of instruments, allowing you to align your savings with your financial goals (retirement, child's education, guaranteed returns).
            </Paragraph>
            <SubHeader title="Top 80C Instruments for 2026" />
            <ul className="space-y-2 mb-4">
              <BulletPoint>
                <span className="font-semibold text-white">Public Provident Fund (PPF):</span> EEE status (Exempt, Exempt, Exempt). A low-risk, 15-year maturity option offering guaranteed, tax-free returns.
              </BulletPoint>
              <BulletPoint>
                <span className="font-semibold text-white">Equity-Linked Savings Scheme (ELSS):</span> The only mutual fund to offer 80C benefits. It has the shortest lock-in (3 years) but involves market risk and capital gains tax (LTCG above ₹1 Lakh).
              </BulletPoint>
              <BulletPoint>
                <span className="font-semibold text-white">Tax-Saving Fixed Deposit (FD):</span> 5-year lock-in with guaranteed returns. Best for extremely conservative investors, though the interest earned is fully taxable.
              </BulletPoint>
              <BulletPoint>
                <span className="font-semibold text-white">Tuition Fees & Home Loan Principal:</span> Expenses like tuition fees for up to two children and the principal repayment component of a home loan EMI are deductible under this section.
              </BulletPoint>
            </ul>
            <KeyTakeaway>
              Prioritize ELSS for growth and liquidity (3-year lock-in) and PPF for guaranteed, long-term, tax-free corpus building. Always utilize the entire ₹1.5 Lakh limit first if you are in the Old Regime.
            </KeyTakeaway>
          </motion.section>

          {/* Section 3: The NPS Supercharger: Additional ₹50,000 */}
          <motion.section variants={itemVariants}>
            <SectionHeader
              title="3. Claim ₹50,000 Over-and-Above 80C with NPS (80CCD(1B))"
              icon={<TrendingUp className="w-6 h-6 text-teal-400" />}
            />
            <Paragraph>
              The National Pension System (NPS) Tier I account provides a unique tax benefit: an exclusive deduction of up to ₹50,000 under Section 80CCD(1B). This is over and above the ₹1.5 Lakh limit under 80C/CCE, potentially raising your total deduction to ₹2 Lakh.
            </Paragraph>
            <SubHeader title="The Triple Advantage of NPS" />
            <ul className="space-y-2 mb-4">
              <BulletPoint>
                <span className="font-semibold text-white">Tier I Contribution (Self):</span> Eligible for the ₹50,000 deduction u/s 80CCD(1B).
              </BulletPoint>
              <BulletPoint>
                <span className="font-semibold text-white">Employer Contribution (80CCD(2)):</span> Salaried employees can claim a deduction on their employer's contribution (up to 10% of Basic + DA or 14% for Central Govt. employees). This deduction is <span className="text-yellow-300">available under BOTH the Old and the New Tax Regimes.</span>
              </BulletPoint>
              <BulletPoint>
                <span className="font-semibold text-white">Tax-Free Withdrawal:</span> Up to 60% of the corpus withdrawn at retirement is tax-exempt.
              </BulletPoint>
            </ul>
            <KeyTakeaway>
              For tax planning, the NPS ₹50,000 deduction is mandatory if you are in the Old Regime and haven't utilized your entire tax-saving potential. It is the cheapest way to buy an extra slab of deduction.
            </KeyTakeaway>
          </motion.section>

          {/* Section 4: Secure Your Health, Reduce Your Tax (Section 80D) */}
          <motion.section variants={itemVariants}>
            <SectionHeader
              title="4. Secure Your Health, Reduce Your Tax (Section 80D)"
              icon={<HeartPulse className="w-6 h-6 text-red-400" />}
            />
            <Paragraph>
              Deductions under Section 80D cover health insurance premiums and medical expenses, and are available *over and above* the 80C limit in the Old Regime. The limits are structured around age.
            </Paragraph>
            <SubHeader title="Maximum Limits for FY 2025-26" />
            <ul className="space-y-2 mb-4">
              <BulletPoint>
                <span className="font-semibold text-white">Self, Spouse, & Children (Below 60):</span> Up to ₹25,000 deduction on premium.
              </BulletPoint>
              <BulletPoint>
                <span className="font-semibold text-white">Self, Spouse, & Children (Senior Citizen):</span> Up to ₹50,000 deduction on premium/medical expenses.
              </BulletPoint>
              <BulletPoint>
                <span className="font-semibold text-white">Parents (Below 60):</span> An additional deduction of up to ₹25,000.
              </BulletPoint>
              <BulletPoint>
                <span className="font-semibold text-white">Parents (Senior Citizen):</span> An additional deduction of up to ₹50,000.
              </BulletPoint>
              <BulletPoint>
                <span className="font-semibold text-white">Preventive Health Check-up:</span> Up to ₹5,000 can be claimed (within the overall limit) and can be paid in cash.
              </BulletPoint>
            </ul>
            <KeyTakeaway>
              If both you (or your spouse) and your parents are senior citizens (60+), your total 80D deduction can reach an impressive <span className="text-red-400 font-bold">₹1,00,000</span>. Always pay premiums digitally, as cash payments are not allowed for the insurance deduction.
            </KeyTakeaway>
          </motion.section>

          {/* Section 5: Leveraging Home Loans Beyond 80C */}
          <motion.section variants={itemVariants}>
            <SectionHeader
              title="5. Leveraging Home Loans Beyond 80C: Interest & Principle"
              icon={<Home className="w-6 h-6 text-sky-400" />}
            />
            <Paragraph>
              A home loan offers one of the most substantial tax benefits, splitting the EMI into two deductible components:
            </Paragraph>
            <SubHeader title="Tax Benefits on Home Loan" />
            <ul className="space-y-2 mb-4">
              <BulletPoint>
                <span className="font-semibold text-white">Principal Repayment (Section 80C):</span> Covered under the ₹1.5 Lakh limit.
              </BulletPoint>
              <BulletPoint>
                <span className="font-semibold text-white">Interest Paid (Section 24B):</span> Allows a deduction of up to ₹2,00,000 for a self-occupied property. This is a crucial deduction *outside* the ₹1.5 Lakh 80C limit.
              </BulletPoint>
              <BulletPoint>
                <span className="font-semibold text-white">Additional Interest (Section 80EE/EEA):</span> While specific sections like 80EE (₹50,000) have expired, interest on let-out property has no limit and is treated under the head 'Income from House Property'.
              </BulletPoint>
            </ul>
            <KeyTakeaway>
              For a self-occupied property, you can potentially claim ₹1.5 Lakh (Principal u/s 80C) + ₹2 Lakh (Interest u/s 24B) for a total deduction of ₹3.5 Lakh, dramatically reducing your taxable income in the Old Regime.
            </KeyTakeaway>
          </motion.section>

          {/* Section 6: Education Loan Interest (Section 80E) */}
          <motion.section variants={itemVariants}>
            <SectionHeader
              title="6. The Unlimited Deduction: Interest on Education Loan (80E)"
              icon={<GraduationCap className="w-6 h-6 text-purple-400" />}
            />
            <Paragraph>
              Section 80E is arguably the best education-related tax benefit. It allows you to claim 100% of the interest paid on a loan taken for higher education (for self, spouse, or children) without any monetary cap.
            </Paragraph>
            <SubHeader title="Key Provisions of Section 80E" />
            <ul className="space-y-2 mb-4">
              <BulletPoint>
                <span className="font-semibold text-white">No Monetary Limit:</span> If you pay ₹4 Lakh in interest, you claim ₹4 Lakh in deduction.
              </BulletPoint>
              <BulletPoint>
                <span className="font-semibold text-white">Higher Education Focus:</span> Must be for full-time higher education (post-class XII) in India or abroad.
              </BulletPoint>
              <BulletPoint>
                <span className="font-semibold text-white">Time Limit:</span> The deduction can be claimed for a maximum of 8 consecutive assessment years, starting from the year you begin paying the interest.
              </BulletPoint>
            </ul>
            <KeyTakeaway>
              This deduction is only for the <span className="font-bold text-purple-300">interest component</span>, not the principal. Always get an annual interest certificate from your lender for smooth filing.
            </KeyTakeaway>
          </motion.section>

          {/* Section 7: Strategic Allocations for Salaried Employees */}
          <motion.section variants={itemVariants}>
            <SectionHeader
              title="7. Strategic Allocations for Salaried Employees (HRA, Standard)"
              icon={<Briefcase className="w-6 h-6 text-orange-400" />}
            />
            <Paragraph>
              Salaried individuals have unique deductions built into their structure, even in the New Regime.
            </Paragraph>
            <SubHeader title="Mandatory & Elective Employee Deductions" />
            <ul className="space-y-2 mb-4">
              <BulletPoint>
                <span className="font-semibold text-white">Standard Deduction:</span> A flat deduction of <span className="font-bold text-white">₹50,000</span> for transport and other expenses is now available under both the Old and New Tax Regimes.
              </BulletPoint>
              <BulletPoint>
                <span className="font-semibold text-white">House Rent Allowance (HRA):</span> This is a partial or full exemption available only under the Old Regime, based on a formula involving salary, rent paid, and city location.
              </BulletPoint>
              <BulletPoint>
                <span className="font-semibold text-white">Leave Travel Allowance (LTA):</span> An exemption for travel expenses incurred during leave, available twice in a block of four calendar years (Old Regime only).
              </BulletPoint>
              <BulletPoint>
                <span className="font-semibold text-white">NPS Employer Contribution (80CCD(2)):</span> As mentioned in Section 3, this is a powerful deduction available in <span className="text-yellow-300">both regimes</span> and helps lower your taxable salary.
              </BulletPoint>
            </ul>
            <KeyTakeaway>
              The Standard Deduction is a baseline benefit. For high-rent payers, the HRA exemption often makes the Old Regime significantly more beneficial than the New Regime, even if other deductions are minimal.
            </KeyTakeaway>
          </motion.section>

          {/* Section 8: The New Regime's Zero-Tax Threshold for 2026 */}
          <motion.section variants={itemVariants}>
            <SectionHeader
              title="8. The New Regime's Zero-Tax Threshold for 2026 (Up to ₹12 Lakh)"
              icon={<Zap className="w-6 h-6 text-yellow-300" />}
            />
            <Paragraph>
              A major change for FY 2025-26 makes the New Tax Regime highly appealing for middle-income earners who don't utilize many deductions.
            </Paragraph>
            <SubHeader title="How to Make ₹12 Lakh Tax-Free" />
            <ul className="space-y-2 mb-4">
              <BulletPoint>
                The new tax-free income limit is ₹4 Lakh (up from ₹3 Lakh).
              </BulletPoint>
              <BulletPoint>
                The Section 87A Rebate has been increased to ₹60,000 (up from ₹25,000).
              </BulletPoint>
              <BulletPoint>
                <span className="font-bold text-green-400">Calculation:</span> Due to the enhanced rebate, the entire tax liability on a taxable income of up to ₹12 Lakh becomes NIL under the New Regime.
              </BulletPoint>
              <BulletPoint>
                <span className="font-bold text-green-400">Salaried Bonus:</span> With the Standard Deduction of ₹50,000, a salaried person can earn up to <span className="font-bold text-white">₹12.5 Lakh (Gross Salary)</span> and pay zero tax.
              </BulletPoint>
            </ul>
            <KeyTakeaway>
              If your investments/expenses do not easily cross the ₹2.5 Lakh deduction mark, the New Regime is likely the superior choice for simplicity and zero tax up to ₹12 Lakh.
            </KeyTakeaway>
          </motion.section>

          {/* Section 9: Advanced Moves and Legal Exemptions */}
          <motion.section variants={itemVariants}>
            <SectionHeader
              title="9. Advanced Moves and Legal Exemptions (80G, HUF, Agriculture)"
              icon={<Gavel className="w-6 h-6 text-gray-400" />}
            />
            <Paragraph>
              These are sophisticated methods to reduce your Gross Total Income, available primarily under the Old Regime:
            </Paragraph>
            <SubHeader title="Tax Reduction Strategies" />
            <ul className="space-y-2 mb-4">
              <BulletPoint>
                <span className="font-semibold text-white">Donations (Section 80G):</span> Donations to eligible charitable institutions or relief funds can fetch a deduction of 50% or 100% of the donated amount. Always use a digital payment and retain the stamped receipt.
              </BulletPoint>
              <BulletPoint>
                <span className="font-semibold text-white">Interest on Savings Account (80TTA/TTB):</span> Individuals (below 60) can claim up to ₹10,000 deduction on savings account interest (80TTA). For senior citizens, this limit is enhanced to ₹50,000 (80TTB) and covers FD/RD interest as well.
              </BulletPoint>
              <BulletPoint>
                <span className="font-semibold text-white">Hindu Undivided Family (HUF):</span> An HUF is a separate taxable entity. Contributions made by the Karta (head) can be claimed as deductions for the HUF, effectively allowing a second set of exemptions (requires proper legal formation).
              </BulletPoint>
              <BulletPoint>
                <span className="font-semibold text-white">Agricultural Income:</span> Income derived from agricultural operations in India is completely exempt from tax under Section 10(1).
              </BulletPoint>
            </ul>
            <KeyTakeaway>
              The most common "beyond 80C" deductions are 80D (Health) and 80E (Education Loan Interest). Strategic use of these, combined with 80TTA/TTB and a calculated regime choice, defines advanced tax planning.
            </KeyTakeaway>
          </motion.section>

          {/* Final Call to Action Section (Replicating Original CTA Styling) */}
          <motion.section
            className="text-center mt-16 p-10 bg-indigo-600 rounded-xl shadow-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg flex items-center justify-center space-x-3"
              variants={itemVariants}
            >
              <Zap className="w-8 h-8 text-yellow-300" />
              <span>Ready to Optimize Your Tax Return?</span>
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Use a personalized tax calculator tool to determine the exact tax you will save under the Old Regime versus the New Regime for FY 2025-26. Plan your investments and file with confidence.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => alert("Tax Planning Tool Launched!")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Start My Free Tax Optimization Check
              </button>
            </motion.div>
          </motion.section>
        </motion.article>
      </div>
    </div>
  );
};

export default TaxSavingGuide;
