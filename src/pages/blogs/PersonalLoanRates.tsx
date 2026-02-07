import React from "react";
import { motion, Variants } from "framer-motion";
import {
  ArrowLeft,
  Banknote, // Used for Rates
  ClipboardList, // Used for Comparison
  Shield, // Used for Eligibility
  Star, // Used for Top Banks
  DollarSign, // Used for Hidden Costs
  Zap, // Used for CTA
  Briefcase, // Used for Salaried/Self-Employed
} from "lucide-react";
import { Link } from "react-router-dom";

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "Top Banks Offering Lowest Personal Loan Interest Rates in 2025";
const ARTICLE_SUBTITLE =
  "A detailed analysis of Public and Private sector banks competing for the 9.00% benchmark: How to qualify for the absolute best rates this year.";
const BACK_LINK = "/blogs/finance-strategy";
const AUTHOR = "Insider Banking Analyst";
const DATE = "Nov 20, 2025";
const READ_TIME = "18 min read (The Competitive Edge)";
// --- CONFIGURATION END ---

// ====================================================================
// FRAMEWORK COMPONENTS (Replicating the modular structure)
// ====================================================================

// Framer Motion variants (Reused for consistent, smooth interaction)
const pageVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 20,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

// Reusable Section Header Component
const SectionHeader: React.FC<{ children: React.ReactNode; icon: React.ElementType }> = ({ children, icon: Icon }) => (
  <motion.h2
    className="text-4xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-lg flex items-center space-x-4 border-b-2 border-indigo-500/50 pb-3"
    variants={itemVariants}
  >
    <Icon className="w-10 h-10 text-yellow-300" />
    <span>{children}</span>
  </motion.h2>
);

// Reusable Sub Header Component
const SubHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.h3
    className="text-2xl sm:text-3xl font-semibold text-indigo-300 mt-10 mb-5 border-l-4 border-yellow-400 pl-4"
    variants={itemVariants}
  >
    {children}
  </motion.h3>
);

// Reusable Paragraph Component
const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.p className="text-lg text-blue-100 mb-6 leading-relaxed" variants={itemVariants}>
    {children}
  </motion.p>
);

// Reusable Key Takeaway Component
const KeyTakeaway: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    className="p-4 bg-indigo-700/50 border-l-4 border-yellow-400 rounded-lg shadow-xl mb-6 italic text-yellow-100 text-base"
    variants={itemVariants}
  >
    **Key Takeaway:** {children}
  </motion.div>
);

// Reusable Bullet Point List Item Component
const BulletPoint: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.li
    className="text-lg text-blue-100 mb-3 flex items-start space-x-3"
    variants={itemVariants}
  >
    <span className="text-yellow-400 mt-1">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
      </svg>
    </span>
    <span>{children}</span>
  </motion.li>
);

// ====================================================================
// MAIN PAGE COMPONENT
// ====================================================================

const PersonalLoanRatesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.article
          initial="hidden"
          animate="visible"
          variants={pageVariants}
          className="bg-gray-800 p-8 sm:p-12 rounded-xl shadow-2xl"
        >
          {/* Article Header & Meta */}
          <motion.header className="mb-12" variants={itemVariants}>
            <Link to={BACK_LINK} className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200 flex items-center mb-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Finance Strategy
            </Link>
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-4">{ARTICLE_TITLE}</h1>
            <p className="text-xl text-indigo-300 font-light mb-6">{ARTICLE_SUBTITLE}</p>
            <div className="flex flex-wrap text-sm text-gray-400 space-x-4">
              <span>By {AUTHOR}</span>
              <span>•</span>
              <span>{DATE}</span>
              <span>•</span>
              <span>{READ_TIME}</span>
            </div>
          </motion.header>

          {/* Section 1: Introduction - The 2025 Rate Landscape */}
          <motion.section
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={pageVariants}
          >
            <SectionHeader icon={Banknote}>The 2025 Rate Benchmark: The Race to 9%</SectionHeader>
            <Paragraph>
              As the Indian financial market matures, personal loans—unsecured by definition—are becoming highly competitive. 2025 marks a pivotal year where the best rates have stabilized below the 10% psychological barrier, forcing major institutions to fight for premium borrowers. However, the advertised 'starting rate' is merely the entry point. Your personal rate is determined by a complex matrix of risk factors.
            </Paragraph>
            <Paragraph>
              This long-form analysis cuts through the marketing noise to reveal the actual top players and, more importantly, the strategy required to secure the absolute lowest interest rate that your profile can command.
            </Paragraph>
            <KeyTakeaway>
              The difference between a 9.99% and an 11.5% rate on a ₹10 Lakh loan over 5 years is over ₹48,000 in interest. Understanding this comparison is non-negotiable for smart borrowing.
            </KeyTakeaway>
          </motion.section>

          {/* Section 2: The Lowest Rate Leaders (Comparison) */}
          <motion.section
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={pageVariants}
          >
            <SectionHeader icon={ClipboardList}>2025 Top Banks by Starting Interest Rate</SectionHeader>

            <Paragraph>
              The table below highlights the banks offering the most competitive minimum interest rates. Note the clear split: Public Sector Banks (PSBs) like Bank of Maharashtra lead on the lowest starting rate, while Private Banks like HDFC and Kotak offer faster digital processes, often at a slightly higher initial benchmark.
            </Paragraph>

            {/* Comparison Table */}
            <motion.div className="overflow-x-auto my-8" variants={itemVariants}>
              <table className="min-w-full divide-y divide-indigo-500 rounded-xl overflow-hidden shadow-lg">
                <thead className="bg-indigo-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Bank Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Starting Rate (p.a.)*</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Rate Range (Approx.)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Processing Fee (P.F.)</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-700 divide-y divide-gray-600">
                  <tr className="hover:bg-gray-600 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-yellow-300">Bank of Maharashtra</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-400 text-lg">9.00%</td>
                    <td className="px-6 py-4 whitespace-nowrap">9.00% - 13.80%</td>
                    <td className="px-6 py-4 whitespace-nowrap">Up to 1.0% (Max ₹10,000)</td>
                  </tr>
                  <tr className="hover:bg-gray-600 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-yellow-300">Punjab & Sind Bank</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-400 text-lg">9.85%</td>
                    <td className="px-6 py-4 whitespace-nowrap">9.85% - 12.90%</td>
                    <td className="px-6 py-4 whitespace-nowrap">0.50% - 1.0%</td>
                  </tr>
                  <tr className="hover:bg-gray-600 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">Canara Bank</td>
                    <td className="px-6 py-4 whitespace-nowrap">9.95%</td>
                    <td className="px-6 py-4 whitespace-nowrap">9.95% - 15.40%</td>
                    <td className="px-6 py-4 whitespace-nowrap">Up to 0.25% (Max ₹2,500) - **Lowest P.F.**</td>
                  </tr>
                  <tr className="hover:bg-gray-600 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">Kotak Mahindra Bank</td>
                    <td className="px-6 py-4 whitespace-nowrap">9.98%</td>
                    <td className="px-6 py-4 whitespace-nowrap">9.98% - 17.20%</td>
                    <td className="px-6 py-4 whitespace-nowrap">Up to 5.0% (Varies)</td>
                  </tr>
                  <tr className="hover:bg-gray-600 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">HDFC Bank</td>
                    <td className="px-6 py-4 whitespace-nowrap">9.99%</td>
                    <td className="px-6 py-4 whitespace-nowrap">9.99% - 24.00%</td>
                    <td className="px-6 py-4 whitespace-nowrap">Up to ₹6,500 (Fixed/High)</td>
                  </tr>
                  <tr className="hover:bg-gray-600 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">State Bank of India (SBI)</td>
                    <td className="px-6 py-4 whitespace-nowrap">10.05%</td>
                    <td className="px-6 py-4 whitespace-nowrap">10.05% - 15.05%</td>
                    <td className="px-6 py-4 whitespace-nowrap">Up to 1.5% (Max ₹15,000)</td>
                  </tr>
                </tbody>
              </table>
              <Paragraph>
                *Rates are indicative starting rates for premium customers (CIBIL 780+ and high salaried income) as of November 2025 and are subject to change.
              </Paragraph>
            </motion.div>

            <SubHeader>Deep Dive: Why Bank of Maharashtra (BoM) Leads</SubHeader>
            <BulletPoint>
              **The Public Sector Edge:** BoM and other PSBs like P&SB often anchor the lowest possible rate (the 'base rate') because their cost of funds is often slightly lower, and they target a specific, low-risk demographic, such as government employees or long-term existing customers.
            </BulletPoint>
            <BulletPoint>
              **Canara Bank's Fee Advantage:** While their starting rate is 9.95%, Canara Bank's exceptionally low processing fee (up to 0.25% with a cap of ₹2,500) can make the **Total Cost of Credit** lower than a 9.85% loan with a higher fee. **Always factor in the Processing Fee (P.F.).**
            </BulletPoint>
            <BulletPoint>
              **Private Bank Speed (HDFC/Kotak):** These banks start just below 10% and focus heavily on technology and instant approvals for pre-qualified customers. Their rates climb steeply for higher-risk profiles, hence the wide 9.99% to 24% range.
            </BulletPoint>
          </motion.section>

          {/* Section 3: The True Cost of Borrowing - Hidden Fees */}
          <motion.section
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={pageVariants}
          >
            <SectionHeader icon={DollarSign}>Beyond the Rate: Hidden Fees & Prepayment Strategy</SectionHeader>
            <Paragraph>
              A low interest rate is pointless if hidden charges erode the savings. The true cost of your loan is the **Annual Percentage Rate (APR)**, which includes the interest rate plus all non-refundable fees.
            </Paragraph>

            <SubHeader>The Impact of Processing Fees (P.F.)</SubHeader>
            <Paragraph>
              While most P.F. is a percentage (1-2%), some private banks charge a high fixed amount (e.g., HDFC's ₹6,500). If you are taking a small loan (e.g., ₹2 Lakh), a flat ₹6,500 fee is a massive 3.25% of the principal, instantly increasing your effective cost.
            </Paragraph>

            <SubHeader>Prepayment and Foreclosure Charges</SubHeader>
            <motion.ul variants={pageVariants}>
              <BulletPoint>
                **ICICI Bank:** Often offers 0% prepayment charges after 12 successful EMIs have been paid. This is a critical factor for borrowers planning to close the loan early or consolidate debt.
              </BulletPoint>
              <BulletPoint>
                **Kotak Mahindra Bank/HDFC Bank:** Typically charge 2% to 4% on the outstanding principal for prepayment, a significant penalty if you receive a bonus or windfall.
              </BulletPoint>
              <BulletPoint>
                **Strategy:** If you anticipate an early closure, a slightly higher interest rate from a bank with a low/zero prepayment clause (post-lock-in) may save you more in the long run than the 'lowest' rate from a bank that penalizes early payment.
              </BulletPoint>
            </motion.ul>
          </motion.section>

          {/* Section 4: Eligibility for the Lowest Rate (The Borrower's Work) */}
          <motion.section
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={pageVariants}
          >
            <SectionHeader icon={Shield}>Qualifying for the 9% Club: Your Financial Profile</SectionHeader>
            <Paragraph>
              The low starting rates are reserved for the "Prime" borrower. If your profile falls short, your rate will quickly jump into the 12-16% bracket. The three non-negotiable criteria are:
            </Paragraph>

            <SubHeader>CIBIL Score: The Gatekeeper (750+ Required)</SubHeader>
            <motion.ul variants={pageVariants}>
              <BulletPoint>
                A **CIBIL Score of 780 or higher** is the standard requirement to unlock the best-advertised rates (9.00% to 10.50%). Anything below 750 will almost certainly result in a higher risk premium being added to the base rate.
              </BulletPoint>
              <BulletPoint>
                Focus on keeping your **Credit Utilisation Ratio (CUR) below 30%** in the months before application—this is the single most effective short-term CIBIL booster.
              </BulletPoint>
            </motion.ul>

            <SubHeader>Income Stability & Debt-to-Income (DTI)</SubHeader>
            <motion.ul variants={pageVariants}>
              <BulletPoint>
                **Employment Type:** Salaried employees in listed MNCs or government jobs are considered lower risk than self-employed professionals, immediately qualifying them for rate discounts (up to 0.50% lower in some cases).
              </BulletPoint>
              <BulletPoint>
                **FOIR/DTI:** Lenders want your total monthly fixed obligations (existing EMIs + proposed EMI) to be under **50% of your net monthly income**. A lower DTI (ideally 35-40%) gives you significant leverage for rate negotiation.
              </BulletPoint>
            </motion.ul>
            <KeyTakeaway>
              Before applying, calculate your estimated EMI and DTI. If the proposed loan pushes your DTI over 50%, the lender may approve the loan but at a substantially higher risk rate (14%+) or reject it outright.
            </KeyTakeaway>
          </motion.section>


          {/* Section 5: Final Strategy and Negotiation */}
          <motion.section
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={pageVariants}
          >
            <SectionHeader icon={Star}>The Final Strategy for the Best Deal</SectionHeader>
            <Paragraph>
              Securing the best loan in 2025 is a strategic process, not a lottery. Use these three final steps to guarantee you access the bottom of the rate chart:
            </Paragraph>

            <SubHeader>1. Leverage Existing Banking Relationships</SubHeader>
            <BulletPoint>
              Your primary bank (where your salary is credited) has deep insight into your financial stability. They are the first stop for a loan and can offer a **Relationship Discount** (often 0.10% to 0.25% lower) and a faster, paperless disbursal process.
            </BulletPoint>

            <SubHeader>2. Use a Soft Inquiry to Compare Apples-to-Apples</SubHeader>
            <BulletPoint>
              Avoid applying directly to multiple banks, as each **Hard Inquiry** will temporarily damage your CIBIL score. Instead, use an online marketplace or aggregator to initiate a **Soft Inquiry** check. This gives you firm, personalised rate quotes from multiple lenders without harming your score.
            </BulletPoint>

            <SubHeader>3. Negotiate the Best Offer</SubHeader>
            <BulletPoint>
              If Bank A pre-approves you at 10.15% and Bank B pre-approves you at 10.35%, approach Bank B with the 10.15% quote and ask them to match or beat it. This competitive tactic works because the bank has already approved your profile and is now fighting for your business.
            </BulletPoint>
          </motion.section>


          {/* CTA Section */}
          <motion.section
            className="text-center bg-indigo-800 p-10 rounded-xl mt-12 shadow-inner"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg flex items-center justify-center space-x-3"
              variants={itemVariants}
            >
              <Zap className="w-8 h-8 text-yellow-300" />
              <span>Implement the Strategy: Get Your Personalized Rate Report</span>
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Use the soft inquiry trick to receive a personalized, eligibility-optimized lender match and a detailed rate estimate in under 5 minutes, without hurting your CIBIL score.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => console.log("Personalized Loan Eligibility Check Initiated!")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get My Free Personalized Rate Check
              </button>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
};

export default PersonalLoanRatesPage;
