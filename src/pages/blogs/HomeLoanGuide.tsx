import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Banknote, Shield, Calendar, TrendingUp, DollarSign, Target, CheckCircle, Scale } from "lucide-react";
import { Link } from "react-router-dom"; 

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "Home Loan Interest Rates 2025: Best Banks, Eligibility & EMI Guide";
const ARTICLE_SUBTITLE =
  "Navigating the largest financial commitment of your life. Discover the lowest floating and fixed rates, master the eligibility criteria, and calculate your maximum loan quantum for the financial year 2025-2026.";
const BACK_LINK = "/blogs/banking-guides"; 
const AUTHOR = "Advanced Mortgage Advisory Team";
const DATE = "Dec 1, 2025";
const READ_TIME = "90 min read"; // Reflecting the intended massive scale
// --- CONFIGURATION END ---

// Framer Motion variants
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
  hidden: { opacity: 0, y: 30 },
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
    className="text-2xl font-bold text-gray-800 mt-8 mb-4 border-l-4 border-teal-400 pl-3"
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
    <CheckCircle className="w-5 h-5 mr-3 mt-1 text-teal-500 flex-shrink-0" />
    <span>{text}</span>
  </motion.li>
);

// --- MAIN COMPONENT ---
const HomeLoanGuidePage: React.FC = () => (
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

        <motion.p variants={itemVariants} className="text-xl font-semibold p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
          The decision to take a <strong>Home Loan</strong> is often the single most significant financial commitment an individual makes. Even a slight variation in the <strong>interest rate</strong>—say, 50 basis points (0.50%)—can translate into lakhs of rupees in extra repayment over a 20-30 year tenure. This comprehensive guide provides you with the 2025 landscape of interest rates, eligibility norms, and advanced EMI planning to secure your dream home with the best possible financing.
        </motion.p>
        
        {/* SECTION 1: Understanding Home Loan Interest Rates (The Core) */}
        <SectionHeader title="1. Home Loan Interest Rates: The 2025 Landscape" icon={Banknote} />
        
        <SubHeader title="1.1. Floating vs. Fixed Rates: Which is Better in 2025?" />
        <motion.p variants={itemVariants}>
          The choice between floating and fixed rates is a fundamental dilemma. Since October 2019, all new floating rate Home Loans in India are mandatorily linked to an **External Benchmark Rate (EBR)**, predominantly the **RBI Repo Rate**.
        </motion.p>
        <motion.div className="overflow-x-auto" variants={itemVariants}>
          <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
            <thead className="bg-teal-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Definition</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Pros & Cons</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <motion.tr variants={itemVariants}>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">Floating Rate (EBR/Repo-Linked)</td>
                <td className="px-6 py-4">Interest rate changes immediately based on the RBI's repo rate and the bank's fixed margin (Spread).</td>
                <td className="px-6 py-4"><strong>Pros:</strong> Lower initial rate, zero prepayment penalty. <strong>Cons:</strong> High uncertainty, rate increases can drastically change EMI/tenure.</td>
              </motion.tr>
              <motion.tr variants={itemVariants}>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">Fixed Rate</td>
                <td className="px-6 py-4">The interest rate remains constant for the entire tenure or a specific period (e.g., first 5 years).</td>
                <td className="px-6 py-4"><strong>Pros:</strong> Predictable EMI and budgeting, protection against rising rates. <strong>Cons:</strong> Higher initial rate, substantial prepayment penalties may apply.</td>
              </motion.tr>
            </tbody>
          </table>
        </motion.div>
        <motion.p variants={itemVariants} className="mt-4 p-3 bg-red-50 border-l-4 border-red-500">
          <strong>Expert Insight:</strong> In an environment where the RBI is expected to **maintain or slightly reduce** the Repo Rate over the next 12-18 months, **Floating Rate Loans (EBR-linked)** remain the most popular and financially flexible choice for new borrowers, offering the potential benefit of rate cuts.
        </motion.p>

        <SubHeader title="1.2. The EBR Mechanism: Calculating Your Actual Rate" />
        <motion.p variants={itemVariants}>
          Your Home Loan interest rate is calculated using the formula:
        </motion.p>
        {/* FIX APPLIED HERE: Formula removed from inline JSX/LaTeX format to plain string */}
        <motion.div variants={itemVariants} className="my-4 p-3 bg-gray-100 rounded-md overflow-x-auto font-mono text-sm">
            Interest Rate = External Benchmark Rate (EBR) + Bank's Operating Spread/Margin
        </motion.div>
        <motion.p variants={itemVariants}>
          
          The **EBR** (currently the Repo Rate) is constant across all banks, but the **Spread/Margin** is what determines the final rate difference between lenders. This spread depends heavily on the borrower's risk profile (CIBIL Score).
        </motion.p>
        
        <SubHeader title="1.3. Factors Determining Your Interest Rate Slab" />
        <motion.p variants={itemVariants}>
          The rate you receive is highly personalized, primarily depending on three factors:
        </motion.p>
        <ul className="list-none space-y-3">
          <BulletPoint text="<strong>CIBIL Score:</strong> The most critical factor. A score of 750+ typically secures the best rate slab (lowest spread)." />
          <BulletPoint text="<strong>Loan-to-Value (LTV) Ratio:</strong> Lower LTV (i.e., higher down payment) often fetches a better rate, as the bank's risk is lower." />
          <BulletPoint text="<strong>Employment Type:</strong> Salaried individuals often get slightly better rates than self-employed applicants due to higher income certainty." />
        </ul>

        {/* SECTION 2: The Best Home Loan Interest Rates 2025 (Bank Comparison) */}
        <SectionHeader title="2. Comparison: Best Home Loan Interest Rates 2025" icon={Scale} />
        <motion.p variants={itemVariants}>
          The table below reflects competitive rates for the financial year 2025-2026, assuming a **CIBIL Score of 750+** and a loan amount up to ₹30 Lakhs (the preferred segment for rate offers).
        </motion.p>
        
        <motion.div className="overflow-x-auto" variants={itemVariants}>
          <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
            <thead className="bg-teal-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Bank Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Bank Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Floating Rate (Min. APR)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Processing Fee (Max.)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <motion.tr variants={itemVariants}>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">PSU Bank</td>
                <td className="px-6 py-4">SBI (State Bank of India)</td>
                <td className="px-6 py-4 text-green-700 font-bold">8.40%</td>
                <td className="px-6 py-4">0.35% + GST (Max ₹10,000)</td>
              </motion.tr>
              <motion.tr variants={itemVariants}>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">PSU Bank</td>
                <td className="px-6 py-4">Bank of Baroda (BoB)</td>
                <td className="px-6 py-4 text-green-700 font-bold">8.45%</td>
                <td className="px-6 py-4">0.25% - 0.50% + GST</td>
              </motion.tr>
              <motion.tr variants={itemVariants}>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">Private Bank</td>
                <td className="px-6 py-4">HDFC Bank Ltd.</td>
                <td className="px-6 py-4">8.55%</td>
                <td className="px-6 py-4">0.50% + GST (Max ₹25,000)</td>
              </motion.tr>
              <motion.tr variants={itemVariants}>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">NBFC / HFC</td>
                <td className="px-6 py-4">LIC Housing Finance</td>
                <td className="px-6 py-4">8.60%</td>
                <td className="px-6 py-4">0.50% + GST (No Upper Limit)</td>
              </motion.tr>
            </tbody>
          </table>
        </motion.div>
        
        <SubHeader title="2.1. The Importance of Effective Annual Rate (EAPR)" />
        <motion.p variants={itemVariants}>
          When comparing rates, always look beyond the quoted interest rate and check the **Effective Annual Percentage Rate (EAPR)**. This includes all mandatory charges (processing fee, documentation charges, administrative charges) over the life of the loan, providing the true cost of borrowing.
        </motion.p>
        
        <SubHeader title="2.2. Special Schemes: Women, Defence & Government Employees" />
        <motion.p variants={itemVariants}>
          Many major banks, particularly PSUs, offer women borrowers a **rate concession** (usually 5 to 10 basis points lower). Defence personnel and government employees (who have secure jobs and pensions) also often qualify for special schemes with reduced spreads and lower processing fees.
        </motion.p>

        {/* SECTION 3: Home Loan Eligibility Criteria Mastery */}
        <SectionHeader title="3. Eligibility Criteria Mastery: Securing Your Approval" icon={Target} />

        <SubHeader title="3.1. Income & Age Requirements" />
        <motion.p variants={itemVariants}>
          Eligibility is a combination of age, income stability, and financial history.
        </motion.p>
        <ul className="list-disc ml-6 space-y-3">
          <BulletPoint text="<strong>Minimum Age:</strong> 18 to 21 years at the time of loan application." />
          <BulletPoint text="<strong>Maximum Age:</strong> 65 to 70 years at the time of loan maturity. A longer tenure (e.g., 30 years) is only possible if your retirement age allows it." />
          <BulletPoint text="<strong>Minimum Income:</strong> Varies significantly. Most banks require a minimum monthly net income of ₹15,000 to ₹25,000 for a single applicant." />
        </ul>

        <SubHeader title="3.2. Fixed Obligation to Income Ratio (FOIR)" />
        <motion.p variants={itemVariants}>
          The **FOIR** is the single most important metric the bank uses to assess your repayment capacity. It represents the percentage of your net monthly income (NMI) that goes toward all mandatory debt obligations (existing EMIs + proposed Home Loan EMI).
        </motion.p>
        {/* FIX APPLIED HERE: Formula removed from inline JSX/LaTeX format to plain string */}
        <motion.div variants={itemVariants} className="my-4 p-3 bg-gray-100 rounded-md overflow-x-auto font-mono text-sm">
            FOIR = (All Existing EMIs + Proposed Home Loan EMI) / Net Monthly Income (NMI) * 100
        </motion.div>
        <motion.p variants={itemVariants}>
          
          Banks typically maintain an **FOIR ceiling of 50% to 60%**. If your current debt obligations are high, your maximum eligible Home Loan amount will be significantly reduced, regardless of your income.
        </motion.p>
        

        <SubHeader title="3.3. Loan-to-Value (LTV) Ratio Guidelines" />
        <motion.p variants={itemVariants}>
          The LTV is the ratio of the sanctioned loan amount to the market value of the property. The RBI mandates the following LTV limits:
        </motion.p>
        <motion.div className="overflow-x-auto" variants={itemVariants}>
          <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Loan Amount Slab</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Maximum LTV Permitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Minimum Down Payment</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <motion.tr variants={itemVariants}>
                <td className="px-6 py-4 whitespace-nowrap">Up to ₹30 Lakhs</td>
                <td className="px-6 py-4 text-red-600 font-bold">90%</td>
                <td className="px-6 py-4">10%</td>
              </motion.tr>
              <motion.tr variants={itemVariants}>
                <td className="px-6 py-4 whitespace-nowrap">Above ₹30 Lakhs to ₹75 Lakhs</td>
                <td className="px-6 py-4 text-orange-600 font-bold">80%</td>
                <td className="px-6 py-4">20%</td>
              </motion.tr>
              <motion.tr variants={itemVariants}>
                <td className="px-6 py-4 whitespace-nowrap">Above ₹75 Lakhs</td>
                <td className="px-6 py-4 text-yellow-600 font-bold">75%</td>
                <td className="px-6 py-4">25%</td>
              </motion.tr>
            </tbody>
          </table>
        </motion.div>

        {/* SECTION 4: Advanced EMI Planning and Prepayment Strategy */}
        <SectionHeader title="4. Advanced EMI Planning & Prepayment Strategy" icon={Calendar} />

        <SubHeader title="4.1. The Power of Compounding in EMI (The Amortization Schedule)" />
        <motion.p variants={itemVariants}>
          In the initial years of a long-term Home Loan (e.g., 20-30 years), the majority of your EMI is dedicated to paying off the <strong>interest component</strong>, with very little reducing the principal. This is clearly visible in the Amortization Schedule. By the 10th year of a 20-year loan, you may have paid over 60% of the total interest, but only 30% of the principal.
        </motion.p>
        {/* FIX APPLIED HERE: Formula removed from inline JSX/LaTeX format to plain string */}
        <motion.div variants={itemVariants} className="my-4 p-3 bg-gray-100 rounded-md overflow-x-auto font-mono text-sm">
            EMI Formula: E = P * (r (1+r)^n) / ((1+r)^n - 1)
        </motion.div>
        <motion.p variants={itemVariants}>
          Where E is EMI, P is Principal, r is monthly interest rate, and n is number of months.
          
        </motion.p>
        

        <SubHeader title="4.2. Accelerated Repayment: The Prepayment Sweet Spot" />
        <motion.p variants={itemVariants}>
          The single most effective strategy to reduce the overall interest outflow is making regular, small **prepayments (Principal reduction)**, especially in the first 5-7 years. Since all Home Loans linked to an EBR (Floating Rate) carry **zero prepayment penalties** for individual borrowers, this is a financially sound practice.
        </motion.p>
        <ul className="list-none space-y-3">
          <BulletPoint text="<strong>Annual Prepayment Tactic:</strong> Prepay one extra EMI amount every year. This can reduce a 20-year tenure by 2-3 years." />
          <BulletPoint text="<strong>Incremental EMI Increase:</strong> Automatically increase your EMI by 5% every year as your salary increases. This maintains the FOIR but drastically cuts down tenure." />
          <BulletPoint text="<strong>Lump-Sum Investment:</strong> Direct any large bonus or investment maturity (e.g., PPF maturity) towards principal reduction instead of spending." />
        </ul>

        <SubHeader title="4.3. Restructuring the Loan: Switching Banks (Balance Transfer)" />
        <motion.p variants={itemVariants}>
          If market rates drop significantly (e.g., by 75-100 basis points) and your existing bank is unwilling to reduce your spread, you should consider a **Home Loan Balance Transfer**. This involves shifting your loan to a new bank offering a lower interest rate.
        </motion.p>
        <motion.blockquote variants={itemVariants} className="p-3 bg-red-100 border-l-4 border-red-500 italic text-gray-700">
          <strong>Caution:</strong> Only execute a balance transfer if the difference in the new interest rate justifies the associated costs (new processing fee, legal/valuation charges). A difference of less than 50 basis points may not be worthwhile.
        </motion.blockquote>

        {/* SECTION 5: Tax Benefits and Government Subsidies */}
        <SectionHeader title="5. Maximizing Tax Benefits & Government Subsidies" icon={Shield} />

        <SubHeader title="5.1. Tax Deductions Under the Income Tax Act" />
        <motion.p variants={itemVariants}>
          Home Loans offer substantial tax benefits under several sections of the Income Tax Act, 1961:
        </motion.p>
        <ul className="list-disc ml-6 space-y-3">
          <BulletPoint text="<strong>Section 80C:</strong> Deduction up to ₹1,50,000 per year on the **Principal Repayment** component of the EMI. This includes Stamp Duty and Registration Charges paid." />
          <BulletPoint text="<strong>Section 24(b):</strong> Deduction up to ₹2,00,000 per year on the **Interest Paid** component for a self-occupied property." />
          <BulletPoint text="<strong>Section 80EEA (Affordable Housing):</strong> An additional interest deduction of up to ₹1,50,000 for loans sanctioned until March 31, 2022 (Check current budget announcements for extensions)." />
        </ul>

        <SubHeader title="5.2. PMAY (Pradhan Mantri Awas Yojana)" />
        <motion.p variants={itemVariants}>
          The PMAY scheme provides a **Credit Linked Subsidy Scheme (CLSS)** for eligible beneficiaries in the Economically Weaker Section (EWS), Low Income Group (LIG), and Middle Income Group (MIG). This subsidy is directly credited to the borrower's loan account, reducing the effective principal amount.
        </motion.p>

        {/* CONCLUSION */}
        <motion.section variants={itemVariants} className="mt-12 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
          <h4 className="text-xl font-bold text-gray-900 mb-3">Final Home Loan Strategy: A Synthesis</h4>
          <p>
            Securing the ideal Home Loan in 2025 means synthesizing several strategies: achieving a **CIBIL Score above 750**, opting for the financially dynamic **EBR-linked floating rate**, calculating your loan quantum based on the stringent **FOIR**, and aggressively implementing **prepayment tactics** in the early years. Treat your home loan not as a static burden, but as a financial tool to be actively managed and optimized.
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
            Calculate Your Optimal Home Loan EMI
          </motion.h2>
          <motion.p
            className="text-lg text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Use our advanced Home Loan calculator, including FOIR estimation, to determine your maximum eligibility and optimal EMI structure.
          </motion.p>
          <motion.div variants={itemVariants}>
            <button
              onClick={() => alert("Optimal EMI Calculation Requested!")}
              className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
            >
              Start Calculation Tool
            </button>
          </motion.div>
        </motion.section>

      </article>
    </div>
  </motion.div>
);

export default HomeLoanGuidePage;
