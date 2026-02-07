import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Rocket, // Used for Introduction
  Shield, // Used for Government Schemes (Mudra, CGTMSE)
  Target, // Used for SISFS (Focused Funding)
  Landmark, // Used for Secured Bank Loans (Stability)
  Bolt, // Used for NBFC/Fintech (Speed)
  Activity, // Used for Working Capital / Invoice Factoring
  CheckSquare, // Used for Eligibility Checklist
  Feather, // Used for Negotiation Tactics
  Zap, // Used for CTA
} from "lucide-react";
import { Link } from "react-router-dom"; 

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "Best Small Business Loans in India for Startups (2026 Guide)";
const ARTICLE_SUBTITLE =
  "The definitive breakdown of startup funding in the 2026 financial landscape: Government schemes (Mudra 2.0, SISFS), NBFC speed vs. Bank stability, and the ultimate collateral-free checklist.";
const BACK_LINK = "/blogs/startup-finance"; 
const AUTHOR = "Startup Finance Expert";
const DATE = "Nov 19, 2025";
const READ_TIME = "22 min read (The Funding Compass)";
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
      delay: 0.3,
      duration: 0.8,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface SectionHeaderProps {
  children: React.ReactNode;
  Icon: React.ElementType;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ children, Icon }) => (
  <motion.h2
    className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg flex items-center space-x-3 border-b-2 border-indigo-500 pb-3"
    variants={itemVariants}
  >
    <Icon className="w-8 h-8 text-indigo-400" />
    <span>{children}</span>
  </motion.h2>
);

const SubHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.h3
    className="text-xl sm:text-2xl font-semibold text-indigo-300 mt-8 mb-3"
    variants={itemVariants}
  >
    {children}
  </motion.h3>
);

const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.p
    className="text-lg text-blue-100 mb-4 leading-relaxed"
    variants={itemVariants}
  >
    {children}
  </motion.p>
);

const KeyTakeaway: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    className="border border-yellow-400 bg-yellow-900/40 p-4 rounded-lg my-6 shadow-xl"
    variants={itemVariants}
  >
    <p className="font-bold text-yellow-300">
      💡 Key Takeaway: <span className="font-normal text-yellow-100">{children}</span>
    </p>
  </motion.div>
);

const BulletPoint: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.li
    className="text-lg text-blue-100 mb-2 list-disc list-inside ml-4"
    variants={itemVariants}
  >
    {children}
  </motion.li>
);

// ====================================================================
// NEW BLOG PAGE CONTENT
// ====================================================================

export default function StartupLoanGuide2026() {
  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-8 lg:p-12 text-white">
      <div className="max-w-6xl mx-auto">

        {/* Article Header & Metadata */}
        <motion.header
          className="pb-6 border-b border-indigo-700 mb-8"
          initial="hidden"
          animate="visible"
          variants={pageVariants}
        >
          <motion.div variants={itemVariants} className="mb-4">
            <Link to={BACK_LINK} className="text-indigo-400 hover:text-indigo-300 flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Startup Finance Blogs</span>
            </Link>
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-6xl font-extrabold text-white leading-tight drop-shadow-md"
            variants={itemVariants}
          >
            {ARTICLE_TITLE}
          </motion.h1>
          <motion.p 
            className="text-xl text-indigo-300 mt-3"
            variants={itemVariants}
          >
            {ARTICLE_SUBTITLE}
          </motion.p>

          <motion.div className="mt-6 flex flex-wrap text-sm text-gray-400 space-x-4" variants={itemVariants}>
            <span>By: {AUTHOR}</span>
            <span>|</span>
            <span>Published: {DATE}</span>
            <span>|</span>
            <span>{READ_TIME}</span>
          </motion.div>
        </motion.header>


        <motion.article
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={pageVariants}
          className="space-y-12"
        >

          {/* Section 1: Introduction to the 2026 Funding Landscape */}
          <motion.section variants={pageVariants}>
            <SectionHeader Icon={Rocket}>The 2026 Startup Funding Crossroads</SectionHeader>
            <Paragraph>
              The Indian startup ecosystem in 2026 is robust but discerning. Venture Capital remains competitive, forcing early-stage founders to look for non-dilutive capital. Debt funding—from government schemes to aggressive fintech NBFCs—has become the critical bridge for startups with a proven concept but lacking scale.
            </Paragraph>
            <Paragraph>
              Navigating this landscape means understanding the difference between a cheap, slow loan (like Mudra) and a fast, expensive one (like unsecured NBFC credit). Your choice depends entirely on your business stage, runway, and collateral position.
            </Paragraph>
          </motion.section>
          
          <hr className="border-indigo-700" />

          {/* Section 2: Pradhan Mantri Mudra Yojana (PMMY): The Grassroots Power */}
          <motion.section variants={pageVariants}>
            <SectionHeader Icon={Shield}>PMMY (Mudra) Loans: The Collateral-Free Government Shield</SectionHeader>
            <Paragraph>
              The **Pradhan Mantri Mudra Yojana (PMMY)** is the cornerstone of micro and small business financing, now extended up to a maximum of **₹20 Lakhs** under the **Tarun+** category. This is the best option for very early-stage startups and lifestyle businesses seeking low-interest, collateral-free term loans or working capital.
            </Paragraph>
            <SubHeader>The Four Categories:</SubHeader>
            <motion.ul variants={pageVariants} className="space-y-2">
              <BulletPoint>
                **Shishu:** Loans up to **₹50,000**. Ideal for firms just starting out. Often requires minimal documentation.
              </BulletPoint>
              <BulletPoint>
                **Kishore:** Loans from **₹50,001 to ₹5 Lakhs**. For businesses in their initial growth phase.
              </BulletPoint>
              <BulletPoint>
                **Tarun:** Loans from **₹5 Lakhs to ₹10 Lakhs**. For established small businesses looking for expansion.
              </BulletPoint>
              <BulletPoint>
                **Tarun+:** Loans from **₹10 Lakhs to ₹20 Lakhs**. Specifically for entrepreneurs who have successfully repaid previous Tarun loans and are ready for significant scale.
              </BulletPoint>
            </motion.ul>
            <KeyTakeaway>
              Mudra Loans are distributed by Public Sector Banks (PSBs) and NBFCs. Apply through the **Udyamimitra** or **JanSamarth** portals for streamlined digital processing. While rates are low, the approval process can be slower than private bank or NBFC options.
            </KeyTakeaway>
          </motion.section>

          <hr className="border-indigo-700" />

          {/* Section 3: Startup India Seed Fund Scheme (SISFS) */}
          <motion.section variants={pageVariants}>
            <SectionHeader Icon={Target}>Startup India Seed Fund Scheme (SISFS): Non-Dilutive Early Capital</SectionHeader>
            <Paragraph>
              Unlike traditional loans, **SISFS** is an innovative scheme providing financial assistance to eligible DPIIT-recognized startups specifically for Proof of Concept (PoC), prototype development, market entry, and commercialisation. The capital comes in two forms:
            </Paragraph>
            <SubHeader>Dual Funding Structure:</SubHeader>
            <motion.ul variants={pageVariants} className="space-y-2">
              <BulletPoint>
                **Grant:** Up to **₹20 Lakhs** for PoC, prototype development, or product trials. This is a non-repayable grant disbursed in milestone-based installments.
              </BulletPoint>
              <BulletPoint>
                **Debt/Investment:** Up to **₹50 Lakhs** through convertible debentures or debt-linked instruments for market entry and scaling.
              </BulletPoint>
            </motion.ul>
            <Paragraph>
              **The Catch:** You do not apply directly to the government. Funds are disbursed via registered incubators. Your team, technology novelty, and fund utilization plan are evaluated by the Incubator Seed Management Committee (ISMC).
            </Paragraph>
          </motion.section>

          <hr className="border-indigo-700" />

          {/* Section 4: Secured Loans: Public and Private Banks */}
          <motion.section variants={pageVariants}>
            <SectionHeader Icon={Landmark}>Secured Bank Loans: The Lowest Rates for Scaled MSMEs</SectionHeader>
            <Paragraph>
              For established startups or MSMEs with assets (machinery, property) or substantial annual turnover (up to ₹25 Cr), traditional commercial banks like **SBI, HDFC Bank, ICICI Bank, and Axis Bank** offer the lowest interest rates. These are generally **Term Loans** (for fixed assets) or **Working Capital** facilities (Cash Credit/Overdraft).
            </Paragraph>
            <SubHeader>Key Bank Products & Schemes:</SubHeader>
            <motion.ul variants={pageVariants} className="space-y-2">
              <BulletPoint>
                **PSB Loans in 59 Minutes:** This portal offers quick in-principle approval for MSME loans up to ₹5 Crore, bridging the speed gap between public and private lenders.
              </BulletPoint>
              <BulletPoint>
                **CGTMSE (Credit Guarantee Fund Trust for Micro and Small Enterprises):** This scheme provides a **collateral-free guarantee** to the lender for loans up to ₹2 Crore, making it easier to get an unsecured loan from a bank.
              </BulletPoint>
              <BulletPoint>
                **Stand-Up India:** Exclusive term loans (₹10 Lakh to ₹1 Crore) for SC/ST individuals and women entrepreneurs.
              </BulletPoint>
            </motion.ul>
            <KeyTakeaway>
              Public Sector Banks (like SBI) start rates lower (around 8.50% p.a.) but require a strong vintage (3+ years operational). Private Banks offer speed and digital processes but usually at a slightly higher starting rate (around 11% p.a.).
            </KeyTakeaway>
          </motion.section>

          <hr className="border-indigo-700" />

          {/* Section 5: NBFC/Fintech Unsecured Loans */}
          <motion.section variants={pageVariants}>
            <SectionHeader Icon={Bolt}>NBFC & Fintech Loans: The Need for Speed</SectionHeader>
            <Paragraph>
              When a startup needs capital **fast**—to fulfill a large order or cover an immediate working capital gap—Non-Banking Financial Companies (NBFCs) and Digital Lenders (Fintechs) are the go-to. They offer minimal documentation and loan disbursals in as little as **24-72 hours**.
            </Paragraph>
            <SubHeader>Fintech Advantages & Trade-offs:</SubHeader>
            <motion.ul variants={pageVariants} className="space-y-2">
              <BulletPoint>
                **Speed & Flexibility:** NBFCs like **Bajaj Finance, Tata Capital, and Lendingkart** prioritize cash flow analysis over strict vintage and collateral.
              </BulletPoint>
              <BulletPoint>
                **Higher Cost:** This convenience comes at a higher rate. Unsecured NBFC business loans can have interest rates ranging from **14% p.a. upwards**.
              </BulletPoint>
              <BulletPoint>
                **Invoice Discounting/Factoring:** Many fintech platforms specialize in unlocking working capital by providing immediate finance against your confirmed sales invoices or purchase orders via platforms like TReDS.
              </BulletPoint>
            </motion.ul>
            <Paragraph>
              Use NBFCs strategically: for short-term, high-impact needs, or when you cannot meet the stringent eligibility of a traditional bank.
            </Paragraph>
          </motion.section>

          <hr className="border-indigo-700" />
          
          {/* Section 6: The 2026 Eligibility Blueprint */}
          <motion.section variants={pageVariants}>
            <SectionHeader Icon={CheckSquare}>The 2026 Eligibility Blueprint: What Lenders Are Checking Now</SectionHeader>
            <Paragraph>
              Regardless of the lender type, three non-negotiable criteria dictate your loan rate and approval in 2026.
            </Paragraph>
            <SubHeader>1. Business Vintage & Turnover:</SubHeader>
            <BulletPoint>
              **Bank Standard:** Most banks require a minimum **3-year vintage** and annual turnover of at least ₹10 Lakhs.
            </BulletPoint>
            <BulletPoint>
              **Fintech Standard:** Many NBFCs may consider businesses with just **6-12 months** of operational history, provided cash flow is strong.
            </BulletPoint>
            <SubHeader>2. Credit Score (CIBIL/FIT Rank):</SubHeader>
            <BulletPoint>
              A personal and business **CIBIL Score of 750+** remains the gold standard for securing the lowest bank rates.
            </BulletPoint>
            <BulletPoint>
              Lenders are increasingly using the **FIT Rank** (Financial Information and Technology Rank, launched by SIDBI/CIBIL) for MSMEs, which assesses a business’s entire digital footprint, including GST compliance and banking habits.
            </BulletPoint>
            <SubHeader>3. Documentation (The Digital-First Mandate):</SubHeader>
            <BulletPoint>
              **Must-Haves:** PAN Card, Aadhaar Card, Certificate of Incorporation/Partnership Deed, last **6 months bank statements**, and last two years' Income Tax Returns (ITR).
            </BulletPoint>
            <BulletPoint>
              **Project Report:** For loans over ₹10 Lakhs, a detailed project report (DPR) outlining business projections and marketing strategy is crucial.
            </BulletPoint>
          </motion.section>

          <hr className="border-indigo-700" />

          {/* Section 7: Final Negotiation & Application Tactics */}
          <motion.section variants={pageVariants}>
            <SectionHeader Icon={Feather}>Negotiation & Application Tactics: Lowering Your Cost of Capital</SectionHeader>
            <Paragraph>
              Once you meet the eligibility criteria, the final step is ensuring you get the best deal. Treat the loan application process like a negotiation, not a simple form submission.
            </Paragraph>
            <SubHeader>Key Tactics:</SubHeader>
            <motion.ul variants={pageVariants} className="space-y-2">
              <BulletPoint>
                **Compare PSBs and Private Banks:** Use the rate difference between a government bank (low rate, slow approval) and a private bank (higher rate, fast approval) as leverage during negotiation.
              </BulletPoint>
              <BulletPoint>
                **Always Apply for CGTMSE Coverage:** Even if a bank doesn't mention it, insist on getting your unsecured loan proposal covered under **CGTMSE** to dramatically reduce the lender's risk and potentially secure a lower rate.
              </BulletPoint>
              <BulletPoint>
                **Limit Soft Inquiries:** Check your eligibility using a **single soft inquiry** (which does not affect your CIBIL) across multiple digital platforms. Use the resulting offers to negotiate with your primary bank.
              </BulletPoint>
              <BulletPoint>
                **Focus on Repayment:** Propose a slightly shorter tenure than the maximum available. Shorter tenure means lower risk for the lender, which is the strongest argument for a rate reduction.
              </BulletPoint>
            </motion.ul>
          </motion.section>

          <hr className="border-indigo-700" />


          {/* Call to Action Section (Replicating the original CTA structure) */}
          <motion.section 
            className="bg-indigo-800/60 p-8 rounded-xl text-center shadow-2xl mt-12"
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
              <span>Implement the Strategy: Get Your Startup Loan Blueprint</span>
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Use our proprietary tool to instantly match your startup's vintage, turnover, and funding requirement against all major Government Schemes (Mudra, SISFS) and Top Lender criteria, providing you with a tailored funding strategy in minutes.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => alert("Personalized Startup Loan Blueprint Initiated!")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Launch My Free Funding Blueprint
              </button>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
}
