import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Target, // Used for Eligibility Focus
  Shield, // Used for Guarantee/Risk
  Activity, // Used for Process/Steps
  TrendingDown, // Used for Cost/Rates
  Briefcase, // Used for MSME Focus
  Users, // Used for Lending Platform/Ecosystem
  Feather, // Used for Documentation & Paperwork
  CheckSquare, // Used for Eligibility Checklist
  Gavel, // Used for Legal/Policy (CGTMSE) 
  Zap, // Used for CTA
} from "lucide-react";
// Since this environment doesn't have a real router, Link should be a simple anchor tag/button.
// For demonstration purposes, I'll define a simple Link component.
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>{children}</a>
);

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "MSME Loan Without Collateral: The Ultimate Guide for Indian Businesses";
const ARTICLE_SUBTITLE =
  "Unlock Unsecured Business Funding: Full Eligibility Checklist, Step-by-Step Application Process, and Deep Dive into CGTMSE and Fintech Lending.";
const BACK_LINK = "#"; // Updated to a placeholder
const AUTHOR = "Insider Banking Analyst";
const DATE = "Nov 20, 2025";
const READ_TIME = "28 min read (The Funding Manual)"; 
// --- CONFIGURATION END ---

// ====================================================================
// FRAMEWORK COMPONENTS (Replicating the modular structure)
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
      staggerChildren: 0.03,
    },
  },
};

const itemVariants = {
  // FIX: Removed the duplicate 'opacity' key. Standard hidden state should have opacity 0.
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
// This interface definition now works correctly in the .tsx file
interface SectionHeaderProps {
  title: string;
  icon: React.ElementType;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon: Icon }) => (
  <motion.div 
    className="flex items-center space-x-4 mb-6 pt-4 border-t border-gray-200/50 dark:border-gray-700"
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
      <span className="font-extrabold mr-2">💡 Crucial Note:</span>
      {children}
    </p>
  </motion.div>
);

// Using a custom alert function to avoid window.alert()
const showInfoMessage = (message: string) => {
  // In a real application, this would trigger a modal or toast notification.
  console.log(`[INFO MESSAGE]: ${message}`);
  const messageBox = document.getElementById('info-message-box');
  if (messageBox) {
    messageBox.textContent = message;
    messageBox.classList.remove('hidden');
    messageBox.classList.add('block');
    setTimeout(() => {
      messageBox.classList.remove('block');
      messageBox.classList.add('hidden');
    }, 3000);
  }
};

// ====================================================================
// MAIN COMPONENT
// ====================================================================

const MSMELoanWithoutCollateral: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-12 pb-20 font-[Inter]">
      {/* Custom Info/Alert Box */}
      <div 
        id="info-message-box" 
        className="fixed top-5 right-5 z-50 p-4 bg-indigo-500 text-white rounded-lg shadow-xl hidden transition-opacity duration-300"
      >
        Message Content
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Back Link */}
        <Link to={BACK_LINK} className="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200 transition-colors duration-200 mb-8">
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

          {/* Section 1: Understanding Unsecured MSME Funding */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="1. The Unsecured Reality: Why Collateral is Optional" icon={Briefcase} />
            <Paragraph>
              For decades, MSMEs (Micro, Small, and Medium Enterprises) viewed collateral as a non-negotiable prerequisite for large loans. Today, a paradigm shift, driven by government policy and Fintech innovation, has made **unsecured business loans** a viable and often superior option. The key is understanding that lenders are now primarily evaluating **cash flow stability and business performance**, not just asset value.
            </Paragraph>
            <SubHeader title="The Primary Source: CGTMSE Scheme" id="cgtmse-intro" />
            <Paragraph>
              The most significant driver of unsecured lending is the **Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)**.  This government-backed scheme provides collateral-free term loans and working capital to MSMEs up to a limit of ₹5 crore (though most banks cap individual unsecured loans lower). Lenders are willing to forgo physical collateral because the CGTMSE trust guarantees a major portion (typically 75-85%) of the loan amount to the lender in case of default.
            </Paragraph>
            <KeyTakeaway>
              CGTMSE is the invisible collateral. If your business is eligible for the CGTMSE scheme, the bank's risk is minimized, significantly increasing your chances of approval for a collateral-free loan. Always confirm your lender is a Member Lending Institution (MLI) under the scheme.
            </KeyTakeaway>
            <SubHeader title="The Fintech Disruption: Data-Driven Lending" id="fintech-lending" />
            <Paragraph>
              Modern Non-Banking Financial Companies (NBFCs) and Fintech lenders rely on **digital trails** rather than deeds. They analyze bank account statements, GST returns, PoS transaction data, and e-commerce platform sales to create a highly accurate picture of your business's creditworthiness. This rapid, data-driven approach often leads to faster approvals and more flexible terms than traditional banks.
            </Paragraph>
          </motion.section>

          {/* Section 2: Core Eligibility Criteria Checklist */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="2. The Eligibility Mandate: What Lenders Really Look For" icon={Target} />
            <Paragraph>
              Since there is no asset to seize, lenders scrutinize your financial health with greater intensity. Meeting the minimum criteria is essential, but aiming for **benchmark performance** guarantees better rates and higher loan amounts.
            </Paragraph>
            <SubHeader title="Key Business and Financial Requirements" id="financial-requirements" />
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <BulletPoint>Business Vintage: Typically requires a minimum of **1 to 3 years** of continuous business operation. Longer vintage is preferred.</BulletPoint>
              <BulletPoint>Minimum Annual Turnover: Varies widely, but most lenders require a turnover between **₹15 Lakh to ₹1 Crore** to ensure repayment capacity.</BulletPoint>
              <BulletPoint>Profitability: The business must demonstrate **positive net profit** in the last 1-2 financial years (as per ITRs).</BulletPoint>
              <BulletPoint>GST Compliance: Mandatory and consistent filing of **GST returns (GSTR-3B/GSTR-1)** is crucial for revenue verification.</BulletPoint>
            </ul>
            <SubHeader title="The Credit Score Threshold" id="credit-score-threshold" />
            <Paragraph>
              For unsecured loans, the personal and business credit score is paramount. Lenders usually require:
              <ul className="list-disc ml-6 mt-3 space-y-2">
                <BulletPoint>Personal CIBIL Score: **750+** is considered excellent and necessary for competitive rates. </BulletPoint>
                <BulletPoint>Business CIBIL (or Experian/Equifax) Score: A high score here (usually 700+) indicates reliable payment history on existing business loans or working capital.</BulletPoint>
              </ul>
            </Paragraph>
            <KeyTakeaway>
              Lenders will often check the personal credit score of all major directors/partners, as they act as the corporate guarantor. Ensure all personal credit card and EMI payments are pristine for at least 12 months before applying.
            </KeyTakeaway>
          </motion.section>
          
          {/* Section 3: Step-by-Step Application Process */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="3. Full Process: From Preparation to Disbursement" icon={Activity} />
            <Paragraph>
              The digital age has streamlined the application, but preparation remains the most important step. Follow this structured process for the highest success rate.
            </Paragraph>
            <SubHeader title="Step 1: Document Gathering & Digital Audit" id="step1-document" />
            <Paragraph>
              Gather the required documents (listed in Section 4). Crucially, conduct a **digital audit**: ensure your bank statements are clean, your GST filings match your ITRs, and your company registration details are up-to-date. Any inconsistency here will lead to a swift rejection.
            </Paragraph>
            <SubHeader title="Step 2: Lender Selection & Rate Comparison" id="step2-lender" />
            <Paragraph>
              Identify the right lender:
              <ul className="list-disc ml-6 mt-3 space-y-2">
                <BulletPoint>For Lower Rates/Longer Tenure: Approach **Public Sector Banks (PSBs)** if your financial records are spotless and you are eligible for CGTMSE. Expect longer processing times.</BulletPoint>
                <BulletPoint>For Speed/Flexibility: Approach **NBFCs/Fintech Platforms** for faster approval (often 24-72 hours) based on transactional data. Rates may be slightly higher.</BulletPoint>
              </ul>
              Use a soft inquiry (pre-qualification) tool to compare rates before submitting a formal application.
            </Paragraph>
            <SubHeader title="Step 3: Digital Application and Verification" id="step3-verification" />
            <Paragraph>
              Submit the application online. Most modern applications involve a **digital KYC** process and an instant fetching of your GST/Bank Statement data through secure APIs. Be prepared for a physical verification (PV) visit to your business premises to confirm your operational status.
            </Paragraph>
            <SubHeader title="Step 4: Loan Sanction & Agreement Execution" id="step4-disbursement" />
            <Paragraph>
              Upon sanction, you will receive a sanction letter detailing the loan amount, interest rate, tenure, processing fee, and repayment schedule. Read the fine print carefully, especially regarding prepayment penalties. After signing the loan agreement, the funds are disbursed directly to your business bank account.
            </Paragraph>
          </motion.section>

          {/* Section 4: Mandatory Documentation Checklist */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="4. Documentation: The Non-Negotiable Paperwork" icon={Feather} />
            <Paragraph>
              A complete, accurate set of documents is the fastest way to loan approval. Never provide handwritten or incomplete statements.
            </Paragraph>
            <SubHeader title="Business and Identity Proof" id="identity-proof" />
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <BulletPoint>KYC Documents of Proprietor/Partners/Directors: PAN Card and Aadhaar Card.</BulletPoint>
              <BulletPoint>Proof of Business Existence: **Udyam Registration Certificate** (mandatory for MSME status), Shop & Establishment Certificate, or Gumasta/SSI Registration. </BulletPoint>
              <BulletPoint>Business PAN Card.</BulletPoint>
            </ul>
            <SubHeader title="Financial Documents" id="financial-docs" />
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <BulletPoint>Bank Statements: Last **6 to 12 months** of the primary business bank account.</BulletPoint>
              <BulletPoint>Income Tax Returns (ITR): Last **2 to 3 years** of ITR along with computation of income, profit and loss account, and balance sheet (audited by a CA).</BulletPoint>
              <BulletPoint>Goods and Services Tax (GST) Returns: Copies of GSTR-3B for the last 12 months.</BulletPoint>
              <BulletPoint>Loan Requirement Details: A detailed purpose of the loan, often in a simple proposal format (e.g., purchasing inventory, funding working capital, buying equipment).</BulletPoint>
            </ul>
          </motion.section>
          
          {/* Section 5: The Cost and Risk of Unsecured Lending */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="5. Understanding the Fine Print: Cost, Rate, and Guarantee Fee" icon={TrendingDown} />
            <Paragraph>
              While you save on collateral, unsecured loans carry a higher risk for the lender, which is reflected in the cost structure.
            </Paragraph>
            <SubHeader title="Interest Rates (R.O.I.)" id="interest-rates" />
            <Paragraph>
              Unsecured MSME loan interest rates are typically higher than secured loans. Expect rates to range from **12% to 24% p.a.**, depending on your business risk profile, CIBIL score, and the lender type (Banks offer the lowest; Fintech/NBFCs are higher). A strong DSCR (Debt Service Coverage Ratio) can be your best negotiation tool. 
            </Paragraph>
            <SubHeader title="The CGTMSE Guarantee Fee" id="guarantee-fee" />
            <Paragraph>
              If your loan is covered under CGTMSE, you will be required to pay an annual guarantee fee, usually a small percentage (e.g., 0.30% to 1.5%) of the guaranteed amount. While this fee is added to your cost, it is a minimal price to pay for obtaining a substantial collateral-free loan. The lender is responsible for registering the loan with CGTMSE, but the borrower bears the fee.
            </Paragraph>
            <KeyTakeaway>
              **Processing Fee Negotiation:** On large loans (over ₹50 Lakh), always negotiate the processing fee. While the bank is taking a higher risk, they want to close the deal. Push for a reduction from the standard 1-2% to 0.5% or less.
            </KeyTakeaway>
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
              <span>Instantly Check Your Unsecured Loan Eligibility</span>
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Upload your GST and bank statements to receive a free, personalized eligibility report and a comparison of the best unsecured MSME loan offers available from top lenders today.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => showInfoMessage("MSME Loan Eligibility Check Initiated!")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Start My Free Eligibility Check
              </button>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
};

export default MSMELoanWithoutCollateral;
