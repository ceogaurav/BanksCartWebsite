import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Smartphone, // Main theme: App
  Zap, // Speed/Instant
  Shield, // Safety/RBI Compliance
  TrendingUp, // Interest Rates
  Wallet, // Loan Amount
  CheckCircle, // Eligibility
  Gavel, // Regulation
  Star, // Review/Rating
} from "lucide-react";
import { Link } from "react-router-dom";

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "Best Personal Loan Apps in India 2026 – Interest Rates, Eligibility & Reviews";
const ARTICLE_SUBTITLE =
  "The definitive guide to RBI-compliant digital lenders: Analyzing interest rates, understanding the new 50% LTI cap, and ensuring instant, safe disbursal.";
const BACK_LINK = "/blogs/finance-strategy"; // Placeholder link, change as needed
const AUTHOR = "Digital Finance Expert";
const DATE = "Nov 19, 2025";
const READ_TIME = "18 min read (The App Guide)";
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
      type: "spring",
      stiffness: 70,
      damping: 20,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Reusable Components
interface SectionHeaderProps {
  title: string;
  icon: React.ElementType;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon: Icon }) => (
  <motion.h2
    className="text-4xl lg:text-5xl font-extrabold text-white mb-6 pt-10 border-b-2 border-indigo-700 pb-3 flex items-center space-x-4 drop-shadow-md"
    variants={itemVariants}
  >
    <Icon className="w-8 h-8 text-yellow-400" />
    <span>{title}</span>
  </motion.h2>
);

interface SubHeaderProps {
  title: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({ title }) => (
  <motion.h3
    className="text-2xl md:text-3xl font-bold text-indigo-300 mt-8 mb-4 leading-snug"
    variants={itemVariants}
  >
    {title}
  </motion.h3>
);

interface ParagraphProps {
  children: React.ReactNode;
}

const Paragraph: React.FC<ParagraphProps> = ({ children }) => (
  <motion.p
    className="text-lg text-blue-100 mb-6 leading-relaxed"
    variants={itemVariants}
  >
    {children}
  </motion.p>
);

interface KeyTakeawayProps {
  children: React.ReactNode;
}

const KeyTakeaway: React.FC<KeyTakeawayProps> = ({ children }) => (
  <motion.div
    className="bg-yellow-900 bg-opacity-30 border-l-4 border-yellow-400 p-4 pl-6 mb-6 rounded-lg shadow-inner flex items-start space-x-4"
    variants={itemVariants}
  >
    <Zap className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
    <p className="text-yellow-100 font-medium leading-relaxed">
      <strong className="text-yellow-400">Key Takeaway:</strong> {children}
    </p>
  </motion.div>
);

interface BulletPointProps {
  children: React.ReactNode;
}

const BulletPoint: React.FC<BulletPointProps> = ({ children }) => (
  <motion.li
    className="text-lg text-blue-100 flex items-start space-x-3 mb-3 leading-relaxed"
    variants={itemVariants}
  >
    <CheckCircle className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
    <span>{children}</span>
  </motion.li>
);

// Custom component for App review
interface AppCardProps {
  name: string;
  icon: React.ElementType;
  rate: string;
  amount: string;
  tenure: string;
  eligibility: string;
  rating: number;
}

const AppCard: React.FC<AppCardProps> = ({ name, icon: Icon, rate, amount, tenure, eligibility, rating }) => (
  <motion.div
    className="bg-indigo-900 bg-opacity-50 border border-indigo-700 p-6 rounded-xl shadow-2xl hover:shadow-indigo-500/50 transition duration-300 ease-in-out transform hover:-translate-y-1"
    variants={itemVariants}
  >
    <div className="flex items-center justify-between mb-4 border-b border-indigo-700 pb-3">
      <h3 className="text-2xl font-bold text-yellow-400 flex items-center space-x-3">
        <Icon className="w-7 h-7" />
        <span>{name}</span>
      </h3>
      <div className="flex items-center text-lg font-semibold text-yellow-300">
        <Star className="w-5 h-5 mr-1 fill-yellow-300" />
        {rating.toFixed(1)} / 5.0
      </div>
    </div>

    <ul className="space-y-3">
      <BulletPoint><strong className="text-indigo-300 flex items-center space-x-2"><TrendingUp className="w-4 h-4" /> Interest Rate (APR):</strong> {rate}</BulletPoint>
      <BulletPoint><strong className="text-indigo-300 flex items-center space-x-2"><Wallet className="w-4 h-4" /> Loan Amount Range:</strong> {amount}</BulletPoint>
      <BulletPoint><strong className="text-indigo-300 flex items-center space-x-2"><CheckCircle className="w-4 h-4" /> Maximum Tenure:</strong> {tenure}</BulletPoint>
      <BulletPoint><strong className="text-indigo-300 flex items-center space-x-2"><CheckCircle className="w-4 h-4" /> Primary Eligibility:</strong> {eligibility}</BulletPoint>
    </ul>
  </motion.div>
);

// ====================================================================
// BLOG PAGE CONTENT
// ====================================================================

const BestPersonalLoanApps: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="bg-indigo-900 bg-opacity-70 backdrop-blur-sm shadow-xl">
        <motion.article
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          initial="hidden"
          animate="visible"
          variants={pageVariants}
        >
          {/* HEADER SECTION */}
          <header className="mb-12">
            <motion.div variants={itemVariants}>
              <Link to={BACK_LINK} className="text-indigo-400 hover:text-indigo-300 transition duration-200 flex items-center space-x-2 mb-4">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Finance Strategy</span>
              </Link>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-6xl font-extrabold text-yellow-400 mb-4 leading-tight drop-shadow-lg"
              variants={itemVariants}
            >
              {ARTICLE_TITLE}
            </motion.h1>
            <motion.p
              className="text-xl text-indigo-300 mb-6 leading-relaxed"
              variants={itemVariants}
            >
              {ARTICLE_SUBTITLE}
            </motion.p>
            <motion.div
              className="text-sm text-gray-400 flex flex-wrap space-x-4"
              variants={itemVariants}
            >
              <span>By: <strong className="text-white">{AUTHOR}</strong></span>
              <span>•</span>
              <span>Published: <strong className="text-white">{DATE}</strong></span>
              <span>•</span>
              <span><strong className="text-white">{READ_TIME}</strong></span>
            </motion.div>
          </header>

          <div className="h-0.5 bg-indigo-700 mb-12" />

          {/* SECTION 1: Introduction & The Shift to Digital Lending */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="The Digital Lending Ecosystem in 2026" icon={Smartphone} />
            <Paragraph>
              The Indian personal loan market has fully transitioned to a **digital-first, app-based model**. In 2026, the key differentiator is no longer just speed, but **transparency and regulatory compliance**. With stricter RBI guidelines focusing on borrower protection, selecting an app is now a two-part decision: **speed** and **safety**.
            </Paragraph>
            <Paragraph>
              Apps act as intermediaries or direct lenders (NBFCs/Banks) offering unsecured loans with instant approval mechanisms driven by advanced AI underwriting. This has dramatically reduced disbursal times from days to mere minutes.
            </Paragraph>
            <KeyTakeaway>
              The latest RBI mandates, including the new co-lending rules and the <strong className="text-yellow-400">50% Loan-to-Income (LTI) ratio cap</strong>, mean that apps offering pre-approved, customized offers are generally safer and more likely to result in quick disbursal.
            </KeyTakeaway>
          </motion.section>

          <div className="h-0.5 bg-indigo-700 my-10" />

          {/* SECTION 2: Top 5 Personal Loan Apps for 2026 */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="The 5 Best Apps for Instant Personal Loans" icon={Zap} />
            <Paragraph>
              Based on interest rates, maximum loan amount, speed of disbursal, and adherence to the latest 2026 RBI guidelines, here are the top five personal loan apps dominating the market.
            </Paragraph>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <AppCard
                name="Navi"
                icon={Smartphone}
                rate="9.90% p.a. onwards"
                amount="₹10,000 to ₹20 Lakh"
                tenure="Up to 7 years (84 months)"
                eligibility="Salaried & Self-employed (fully digital)"
                rating={4.7}
              />
              <AppCard
                name="Fibe (Formerly EarlySalary)"
                icon={Zap}
                rate="18.00% p.a. onwards"
                amount="₹5,000 to ₹5 Lakh"
                tenure="Up to 3 years (36 months)"
                eligibility="Salaried Professionals (focus on instant salary advance)"
                rating={4.5}
              />
              <AppCard
                name="MoneyView"
                icon={Wallet}
                rate="14.00% p.a. onwards"
                amount="₹5,000 to ₹10 Lakh"
                tenure="Up to 5 years (60 months)"
                eligibility="Flexible credit model (lower CIBIL accepted)"
                rating={4.8}
              />
              <AppCard
                name="KreditBee"
                icon={CheckCircle}
                rate="12.00% to 29.95% p.a."
                amount="₹1,000 to ₹5 Lakh"
                tenure="Up to 3 years (36 months)"
                eligibility="New-to-credit/Short-term micro-loans"
                rating={4.4}
              />
              <AppCard
                name="Bajaj Finserv"
                icon={TrendingUp}
                rate="10.00% p.a. onwards"
                amount="Up to ₹40 Lakh"
                tenure="Up to 8 years (96 months)"
                eligibility="Existing customers & high-income salaried"
                rating={4.6}
              />
            </div>
            <Paragraph className="mt-8">
              <strong className="text-yellow-400">Note:</strong> Interest rates are subject to your CIBIL score, income, and the lender's internal policy. The lower rates are typically reserved for applicants with a score of 750+.
            </Paragraph>
          </motion.section>

          <div className="h-0.5 bg-indigo-700 my-10" />

          {/* SECTION 3: Understanding Interest Rates and Fees */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="Decoding Interest Rates & The True Cost of Borrowing" icon={TrendingUp} />
            <SubHeader title="The Difference Between Simple Interest and APR" />
            <Paragraph>
              Many apps advertise a low monthly interest rate (e.g., 1.5% p.m.), but you must look at the **Annual Percentage Rate (APR)**. The APR is the true cost, including all processing fees and other charges, expressed as an annual rate.
            </Paragraph>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <BulletPoint><strong className="text-indigo-300">Interest Rate:</strong> The base charge for borrowing the money, usually on a reducing balance method.</BulletPoint>
              <BulletPoint><strong className="text-indigo-300">Processing Fee:</strong> A one-time charge (typically 1% to 4% of the loan amount + GST) deducted upfront from the disbursed amount.</BulletPoint>
              <BulletPoint><strong className="text-indigo-300">APR:</strong> The comprehensive, all-inclusive rate. The RBI mandates that the APR must be clearly disclosed in the Key Fact Statement (KFS).</BulletPoint>
            </ul>
            <KeyTakeaway>
              Always demand the **Key Fact Statement (KFS)** before finalizing the loan. If an app doesn't readily provide a transparent KFS detailing the APR, processing fee, and penalty charges, consider it a major red flag.
            </KeyTakeaway>
          </motion.section>

          <div className="h-0.5 bg-indigo-700 my-10" />

          {/* SECTION 4: Eligibility Criteria Post-RBI 2026 Reforms */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="The New Eligibility Reality: RBI's 50% LTI Cap" icon={CheckCircle} />
            <Paragraph>
              In 2026, the Reserve Bank of India (RBI) has sharpened the focus on consumer protection by strongly encouraging a **Loan-to-Income (LTI) ratio cap, typically set at 50%**. This rule is the single most important eligibility factor now.
            </Paragraph>
            <SubHeader title="What the 50% LTI Cap Means for You" />
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <BulletPoint>
                <strong className="text-indigo-300">Calculation:</strong> Your total monthly EMI obligations (existing loans + the new loan's EMI) cannot exceed 50% of your net monthly income.
              </BulletPoint>
              <BulletPoint>
                <strong className="text-indigo-300">Stricter Vetting:</strong> Lenders are now conducting more detailed verification of *all* existing debt obligations (credit card EMIs, existing loans, etc.) before approval.
              </BulletPoint>
              <BulletPoint>
                <strong className="text-indigo-300">Proactive Measure:</strong> If your LTI is already above 40%, you will face significantly higher interest rates or outright rejection, even with a high CIBIL score.
              </BulletPoint>
            </ul>
            <KeyTakeaway>
              Before applying, use an online EMI calculator to ensure your <strong className="text-yellow-400">new total EMI load remains below 45% of your net monthly salary</strong>. This significantly improves approval chances and rate negotiation power.
            </KeyTakeaway>
          </motion.section>

          <div className="h-0.5 bg-indigo-700 my-10" />

          {/* SECTION 5: RBI Compliance and Safety (Mandatory Check) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="Safety First: Ensuring RBI Registration & Compliance" icon={Shield} />
            <Paragraph>
              The most critical step is verifying the app's legitimacy. All legitimate loan apps must be owned by or partner with a **Reserve Bank of India (RBI) registered Non-Banking Financial Company (NBFC)** or a bank.
            </Paragraph>
            <SubHeader title="The Impact of the 2026 Co-Lending Rules" />
            <Paragraph>
              New co-lending rules, effective from January 1, 2026, mandate greater transparency in partnerships between banks and FinTech NBFCs.
            </Paragraph>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <BulletPoint>
                <strong className="text-indigo-300">Single Point of Contact:</strong> The app must clearly name the bank/NBFC partner and specify a single point of contact for grievance redressal.
              </BulletPoint>
              <BulletPoint>
                <strong className="text-indigo-300">Risk Sharing:</strong> Both the originating partner (the app's NBFC) and the co-lender (bank) must retain at least 10% of the loan risk, ensuring 'skin in the game' and safer lending practices.
              </BulletPoint>
              <BulletPoint>
                <strong className="text-indigo-300">Data Protection:</strong> The RBI’s Digital Lending Directions strictly govern data collection, mandating that the app can only access data relevant to the loan (e.g., location is generally only for KYC, not continuous monitoring).
              </BulletPoint>
            </ul>
            <KeyTakeaway>
              Check the app's 'About' section or website for the name of the associated RBI-registered NBFC/Bank. If this information is missing or unclear, **DO NOT proceed** with the application.
            </KeyTakeaway>
          </motion.section>

          <div className="h-0.5 bg-indigo-700 my-10" />

          {/* SECTION 6: How to Choose the Right App */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="Your Checklist: Selecting the Perfect App for Your Need" icon={Gavel} />
            <Paragraph>
              Choosing an app depends entirely on your specific financial situation and borrowing profile. Use this checklist before downloading and applying.
            </Paragraph>

            <SubHeader title="Match Your Profile to the Right Lender" />
            <ul className="list-none space-y-4 mb-6">
              <BulletPoint>
                <strong className="text-yellow-400">For Large Loans (₹10L+):</strong> Focus on **Bajaj Finserv** or **Navi** which offer higher limits and longer tenures (60+ months). These generally require a higher CIBIL (750+) and a stable salaried income.
              </BulletPoint>
              <BulletPoint>
                <strong className="text-yellow-400">For Quick Emergencies (₹5K–₹1L):</strong> Use **Fibe** or **KreditBee**. They specialize in small-ticket, instant disbursals, making them ideal for salary advances or immediate expenses.
              </BulletPoint>
              <BulletPoint>
                <strong className="text-yellow-400">For Lower CIBIL (650–749):</strong> **MoneyView** often uses its own proprietary credit model, which can be more lenient than traditional banks, providing a pathway to improve your score.
              </BulletPoint>
            </ul>
            <Paragraph>
              Always conduct a **soft inquiry** first—many apps (or marketplaces like BanksCart) offer this to show you pre-approved rates without impacting your credit score.
            </Paragraph>
          </motion.section>

          {/* FINAL CALL TO ACTION (Using console.log() instead of alert()) */}
          <motion.section
            className="bg-indigo-700 p-8 rounded-xl mt-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg flex items-center justify-center space-x-3"
              variants={itemVariants}
            >
              <Zap className="w-8 h-8 text-yellow-300" />
              <span>Find Your Best Loan App: Get a Personalized Match</span>
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Use our AI-driven tool to instantly compare offers from the top 30+ RBI-registered lenders, considering your LTI ratio and CIBIL score. Get your best rate in under 3 minutes, securely and without affecting your credit history.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => console.log("Personalized Loan App Match Initiated!")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Start My Instant Loan App Comparison
              </button>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
};

// FIX: Added the mandatory default export for the component.
export default BestPersonalLoanApps;
