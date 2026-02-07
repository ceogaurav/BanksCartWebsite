import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Target, // Used for Market Scope & Audience
  Shield, // Used for Regulatory Safety & RBI Partnership
  Activity, // Used for Feature-Rich Banking (The Big Players)
  TrendingDown, // Used for Market Challenges / Differentiators
  Briefcase, // Used for SME & Business Banking
  Users, // Used for Niche & Community Neobanks
  Feather, // Used for User Experience (UX) Focus
  CheckSquare, // Used for Security & Compliance
  Gavel, // Used for Future Regulation & The 2026 Outlook
  Zap, // Used for CTA
} from "lucide-react";
import { Link } from "react-router-dom"; 

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "Top Digital Banks & Neobanks in India (2026 Review)";
const ARTICLE_SUBTITLE =
  "A comprehensive deep dive into the best digital-first platforms, their mandatory RBI partnerships, the rise of specialized SME banking, and what the '2026 Digital Banking Bill' means for your money.";
const BACK_LINK = "/blogs/fintech-analysis"; // Placeholder link
const AUTHOR = "Digital Finance Strategist";
const DATE = "Nov 19, 2025";
const READ_TIME = "20 min read (Future of Finance)"; 
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

// Reusable components for consistency
const SectionHeader: React.FC<{ title: string, icon: React.ReactNode }> = ({ title, icon }) => (
  <motion.h2
    className="text-2xl sm:text-3xl font-extrabold text-white mt-12 mb-6 border-b-2 border-indigo-400/50 pb-2 flex items-center space-x-3"
    variants={itemVariants}
  >
    <span className="text-indigo-400">{icon}</span>
    <span>{title}</span>
  </motion.h2>
);

const SubHeader: React.FC<{ title: string }> = ({ title }) => (
  <motion.h3
    className="text-xl sm:text-2xl font-semibold text-indigo-200 mt-8 mb-4"
    variants={itemVariants}
  >
    {title}
  </motion.h3>
);

const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.p
    className="text-base sm:text-lg text-blue-100 mb-4 leading-relaxed"
    variants={itemVariants}
  >
    {children}
  </motion.p>
);

const KeyTakeaway: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    className="bg-indigo-700/50 border-l-4 border-yellow-400 p-4 my-6 shadow-xl rounded-md"
    variants={itemVariants}
  >
    <p className="font-semibold text-yellow-300 flex items-start">
      <Zap className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
      <span>Key Takeaway: {children}</span>
    </p>
  </motion.div>
);

const BulletPoint: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.li
    className="text-base sm:text-lg text-blue-100 mb-3 flex items-start space-x-3"
    variants={itemVariants}
  >
    <CheckSquare className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
    <span>{children}</span>
  </motion.li>
);

// ====================================================================
// MAIN PAGE COMPONENT (Using the new content)
// ====================================================================

const DigitalBanksPage: React.FC = () => {
  // Utility for icons
  const iconStyle = "w-6 h-6";

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <motion.article
          initial="hidden"
          animate="visible"
          variants={pageVariants}
        >

          {/* === HEADER SECTION === */}
          <motion.header variants={itemVariants} className="mb-10 border-b border-indigo-500/30 pb-6">
            <Link to={BACK_LINK} className="text-indigo-400 hover:text-indigo-300 flex items-center mb-4 transition-colors duration-200">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Finance Strategy Hub
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white drop-shadow-md">
              {ARTICLE_TITLE}
            </h1>
            <p className="text-xl sm:text-2xl text-indigo-300 mt-3 font-light">
              {ARTICLE_SUBTITLE}
            </p>
            <div className="flex text-sm text-gray-400 mt-4 space-x-4">
              <span>By: {AUTHOR}</span>
              <span>|</span>
              <span>Published: {DATE}</span>
              <span>|</span>
              <span>{READ_TIME}</span>
            </div>
          </motion.header>
          
          {/* === SECTION 1: THE 2026 SHIFT: WHY NEOBANKS ARE THE NEW NORM === */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader title="The 2026 Shift: Why Neobanks are the New Norm" icon={<Target className={iconStyle} />} />
            
            <Paragraph>
              The Indian financial ecosystem is undergoing a tectonic shift, driven by UPI, Aadhaar, and soaring smartphone penetration. By 2026, the neobanking market is not just emerging; it’s expected to be a **multi-billion dollar sector**, fueled by a tech-savvy population demanding better UX and hyper-personalization. Traditional banking's inertia has created a vacuum, and digital challengers are filling it at a breathtaking pace.
            </Paragraph>
            
            <KeyTakeaway>
              Market projections indicate that the Indian neobanking user base will multiply tenfold between 2021 and 2027, with revenue growth reaching a staggering CAGR of over **58%** through the decade.
            </KeyTakeaway>
          </motion.section>

          {/* === SECTION 2: REGULATORY SAFETY & RBI PARTNERSHIP (THE INDIAN MODEL) === */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader title="Understanding the Regulatory Framework: Partnership is Key" icon={<Shield className={iconStyle} />} />
            
            <Paragraph>
              Unlike global markets, India's Reserve Bank of India (RBI) has not yet issued a full, independent digital-only banking license. This creates a unique, **partnership-first** model: all funds you hold with a neobank are legally held in a zero-balance or regular savings account with an RBI-licensed partner bank (e.g., Federal Bank, SBM Bank).
            </Paragraph>
            
            <SubHeader title="RBI Compliance and Your Safety" />
            <Paragraph>
              This co-branding arrangement provides a dual layer of security, combining fintech innovation with institutional trust. Deposits are protected under the **DICGC scheme** up to ₹5 Lakh, exactly like a traditional bank account. The focus in 2026 has shifted heavily to compliance and security standards, including mandatory migration to the new `.bank.in` domain for licensed banks.
            </Paragraph>
            
            <ul className="list-disc ml-6 mt-4">
              <BulletPoint>Your money is **not** held by the neobank itself but by the partner bank, ensuring safety and deposit insurance.</BulletPoint>
              <BulletPoint>Neobanks succeed by offering a superior **frontend (the app)** while relying on the partner bank's **backend (the license and infrastructure)**.</BulletPoint>
            </ul>
          </motion.section>

          {/* === SECTION 3: THE BIG THREE FOR INDIVIDUAL BANKING (Fi, Jupiter, NiyoX) === */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader title="The Active Battleground: Top Individual Neobanks" icon={<Activity className={iconStyle} />} />
            
            <Paragraph>
              The fight for the tech-savvy individual's primary account is intensely competitive. These three players dominate the segment by mastering the trifecta of zero-fees, superior UI, and integrated financial tools.
            </Paragraph>
            
            <SubHeader title="1. Jupiter: The Gamified Savings Engine" />
            <Paragraph>
              Jupiter (partnering with Federal Bank) is built for Gen Z and Millennials. Its success lies in turning saving into a game. Features like **‘Pots’** (automated goal-based savings) and the consistent **1% reward points** on UPI and debit card spends make it the preferred daily transaction account.
            </Paragraph>

            <SubHeader title="2. Fi Money: The Salaried Professional’s Tool" />
            <Paragraph>
              Fi Money (also partnered with Federal Bank) targets professionals with its intelligent money management features. It uses AI-driven insights to analyze spending, categorize expenses automatically, and offers a straightforward, minimalist interface focused on saving and tracking progress against financial goals via **‘Fi Jars’**.
            </Paragraph>
            
            <SubHeader title="3. NiyoX & Niyo Global: The Global Challenger" />
            <Paragraph>
              Niyo (partnering with various banks including SBM and Equitas) has carved out a distinct niche by mastering global finance. Its **Niyo Global** product with **Zero-Forex Markup** remains an essential for international travelers, students, and global professionals, solving a pain point ignored by legacy banks.
            </Paragraph>
          </motion.section>

          {/* === SECTION 4: DIFFERENTIATORS & NICHE STRATEGIES === */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader title="Beyond the Savings Account: Niche and Differentiated Banking" icon={<TrendingDown className={iconStyle} />} />
            
            <Paragraph>
              As the market matures, neobanks are moving beyond simple savings accounts to target highly specific demographic segments where traditional banks underperform. This specialization is a major 2026 growth driver.
            </Paragraph>
            
            <ul className="list-disc ml-6 mt-4">
              <BulletPoint>
                **Mahila Money:** Focused exclusively on **women entrepreneurs**, providing collateral-free loans and a financial community to support micro-business growth.
              </BulletPoint>
              <BulletPoint>
                **FamPay & Akudo:** Targeting the **teenager/pre-banking** segment with prepaid cards and parental control features, effectively acquiring the next generation of customers.
              </BulletPoint>
              <BulletPoint>
                **High-Interest Savings:** Many neobanks, leveraging partnerships with small finance banks, offer higher interest rates on savings (up to 7% p.a.) compared to the 3-4% offered by incumbents.
              </BulletPoint>
            </ul>
          </motion.section>

          {/* === SECTION 5: THE RISE OF SME & BUSINESS NEOBANKS === */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader title="The Core Engine: SME & Business Neobanking Dominance" icon={<Briefcase className={iconStyle} />} />
            
            <Paragraph>
              The largest revenue segment in Indian neobanking continues to be the **Business Account** category, providing digital tools for SMEs, freelancers, and startups. Traditional corporate banking is slow, bureaucratic, and ill-equipped for real-time needs—a gap perfectly filled by players like RazorpayX and Open.
            </Paragraph>
            
            <SubHeader title="Automated Compliance & Payouts" />
            <Paragraph>
              Neobanks in this space provide sophisticated platforms that go beyond transactions, integrating directly with business operations.
            </Paragraph>
            
            <ul className="list-disc ml-6 mt-4">
              <BulletPoint>
                **RazorpayX:** Specializes in automated payroll, vendor payouts, tax compliance, and smart dashboards to manage cash flow.
              </BulletPoint>
              <BulletPoint>
                **Open:** Focuses on business current accounts, expense management, and invoicing tools, often integrating with accounting software.
              </BulletPoint>
              <BulletPoint>
                **Seamless Credit:** Leveraging business data, these platforms offer faster, pre-approved credit lines and working capital loans with minimal paperwork.
              </BulletPoint>
            </ul>
          </motion.section>

          {/* === SECTION 6: THE UX AND UI DUST-UP === */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader title="The Feather-Light Factor: Superior User Experience (UX)" icon={<Feather className={iconStyle} />} />
            
            <Paragraph>
              The most significant, yet often overlooked, advantage of neobanks is their dedication to design. They were built mobile-first, not retrofitted from clunky legacy systems. This focus delivers a fluid, delightful, and highly personalized experience.
            </Paragraph>
            
            <KeyTakeaway>
              Neobanks excel in **hyper-personalization**—using AI to analyze spending in real-time and provide actionable, context-specific financial advice, something traditional banks struggle to replicate.
            </KeyTakeaway>
            
            <SubHeader title="Zero Friction Onboarding" />
            <Paragraph>
              Opening an account takes minutes via Video-KYC and digital verification, contrasting sharply with the multi-day, paper-heavy process of incumbent banks. This friction-less onboarding is critical for winning over the digital-native user.
            </Paragraph>
          </motion.section>
          
          {/* === SECTION 7: SECURITY AND COMPLIANCE CHECKLIST === */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader title="Security and Compliance Checklist (The 2026 Mandate)" icon={<CheckSquare className={iconStyle} />} />
            
            <Paragraph>
              Trust is the currency of banking. In 2026, security is non-negotiable. While neobanks rely on their partner banks for underlying infrastructure, they must adhere to stringent digital security protocols.
            </Paragraph>
            
            <ul className="list-disc ml-6 mt-4">
              <BulletPoint>
                **256-bit Encryption:** Industry-standard protocol for securing data transmission, ensuring transactions are safe.
              </BulletPoint>
              <BulletPoint>
                **Biometric and MFA:** Mandatory multi-factor authentication (MFA) and biometric logins (fingerprint/face ID) for all critical operations.
              </BulletPoint>
              <BulletPoint>
                **Secure Domain Migration:** The RBI-mandated migration of partner banks to the `.bank.in` domain helps users verify the authenticity of banking websites, reducing phishing attacks.
              </BulletPoint>
            </ul>
          </motion.section>

          {/* === SECTION 8: THE GAVEL: THE FUTURE OUTLOOK (2026-2030) === */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader title="The Future Outlook: AI, Embedded Finance, and the Full License" icon={<Gavel className={iconStyle} />} />
            
            <Paragraph>
              The period from 2026 to 2030 will be defined by two trends: the deepening integration of **Artificial Intelligence (AI)** for wealth management and the eventual discussion of a **full Digital Banking License** by the RBI. The current partnership model, while safe, restricts the full potential of neobanks (e.g., in offering proprietary lending products).
            </Paragraph>
            
            <SubHeader title="The Rise of Embedded Finance" />
            <Paragraph>
              We are witnessing finance being embedded into non-bank platforms. Your shopping app, your HR software, or your travel portal will seamlessly offer financial services (payments, credit, insurance) powered by neobank APIs. This shift to **"Invisible Banking"** will change how we interact with money.
            </Paragraph>
            
            <KeyTakeaway>
              The ultimate success factor for digital banks in 2026 is moving from being a transactional service provider to becoming a **complete financial ecosystem manager** that predicts and fulfills customer needs.
            </KeyTakeaway>
          </motion.section>

          {/* === CTA SECTION === */}
          <motion.section
            className="text-center mt-16 bg-indigo-800/60 p-10 rounded-xl shadow-2xl backdrop-blur-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg flex items-center justify-center space-x-3"
              variants={itemVariants}
            >
              <Zap className="w-8 h-8 text-yellow-300" />
              <span>Ready to Switch? Find Your Perfect Digital Bank</span>
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Don't settle for legacy banking. Discover which neobank best aligns with your financial lifestyle—whether you're a salaried professional, a global traveler, or a business owner.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => alert("Digital Bank Comparison Tool Launched!")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Compare Top Digital Banks Now
              </button>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
};

export default DigitalBanksPage;
