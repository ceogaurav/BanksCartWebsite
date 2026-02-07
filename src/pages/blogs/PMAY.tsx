import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Target, // Used for Mission Focus
  Shield, // Used for Scheme Components
  Activity, // Used for Subsidy Structure
  TrendingDown, // Used for Financial Benefits
  Briefcase, // Used for Rural Component
  Users, // Used for Eligibility Criteria
  Feather, // Used for Application Process
  CheckSquare, // Used for Deadlines & Status
  Zap, // Used for CTA
} from "lucide-react";
import { Link } from "react-router-dom"; 

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "PMAY Subsidy 2026 – Eligibility, Benefits & Latest Updates";
const ARTICLE_SUBTITLE =
  "The Comprehensive Guide to Pradhan Mantri Awas Yojana: Understanding the CLSS expiry, PMAY-U 2.0, Rural Extensions to 2029, and the new Interest Subsidy Scheme (ISS).";
const BACK_LINK = "/blogs/home-loan-schemes"; 
const AUTHOR = "Housing Policy Analyst";
const DATE = "Nov 19, 2025";
const READ_TIME = "20 min read (Policy Deep Dive)";
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
      delay: 0.1,
      when: "beforeChildren",
      staggerChildren: 0.15,
      ease: "easeOut",
      duration: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

// Utility Components (Replicating the original structure)
const SectionHeader = ({ children, icon: Icon }) => (
  <motion.h2
    className="text-3xl sm:text-4xl font-extrabold text-white mb-6 drop-shadow-lg flex items-center space-x-3"
    variants={itemVariants}
  >
    {Icon && <Icon className="w-8 h-8 text-indigo-400" />}
    <span>{children}</span>
  </motion.h2>
);

const SubHeader = ({ children, icon: Icon }) => (
  <motion.h3
    className="text-2xl font-bold text-indigo-200 mt-8 mb-4 flex items-center space-x-2"
    variants={itemVariants}
  >
    {Icon && <Icon className="w-6 h-6 text-yellow-400" />}
    <span>{children}</span>
  </motion.h3>
);

const Paragraph = ({ children }) => (
  <motion.p
    className="text-lg text-gray-300 mb-4 leading-relaxed"
    variants={itemVariants}
  >
    {children}
  </motion.p>
);

const BulletPoint = ({ children }) => (
  <motion.li
    className="text-lg text-gray-300 mb-2 leading-relaxed flex items-start space-x-3"
    variants={itemVariants}
  >
    <span className="text-indigo-400 font-bold mt-1">✓</span>
    <span>{children}</span>
  </motion.li>
);

const KeyTakeaway = ({ children }) => (
  <motion.div
    className="bg-indigo-700 bg-opacity-30 border-l-4 border-yellow-400 p-4 sm:p-6 my-6 rounded-lg shadow-xl"
    variants={itemVariants}
  >
    <p className="font-semibold text-lg text-yellow-300 flex items-center space-x-3">
      <span className="text-2xl">💡</span>
      <span>{children}</span>
    </p>
  </motion.div>
);

// ====================================================================
// PMAY BLOG CONTENT
// ====================================================================

const PMAYPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        
        {/* Article Header */}
        <motion.header
          className="mb-12 border-b border-indigo-700 pb-6"
          initial="hidden"
          animate="visible"
          variants={pageVariants}
        >
          <motion.div variants={itemVariants} className="mb-4">
            <Link to={BACK_LINK} className="text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blogs</span>
            </Link>
          </motion.div>
          <motion.h1 
            className="text-5xl sm:text-6xl font-extrabold mb-3 leading-tight drop-shadow-md"
            variants={itemVariants}
          >
            {ARTICLE_TITLE}
          </motion.h1>
          <motion.p 
            className="text-xl text-indigo-300 mb-4 font-light"
            variants={itemVariants}
          >
            {ARTICLE_SUBTITLE}
          </motion.p>
          <motion.div 
            className="flex flex-wrap text-sm text-gray-400 space-x-4"
            variants={itemVariants}
          >
            <span>By {AUTHOR}</span>
            <span>|</span>
            <span>{DATE}</span>
            <span>|</span>
            <span>{READ_TIME}</span>
          </motion.div>
        </motion.header>

        {/* Article Body */}
        <motion.article
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={pageVariants}
        >

          {/* Section 1: Introduction to PMAY */}
          <motion.section variants={itemVariants} className="mb-10">
            <SectionHeader icon={Target}>The Mission: Housing for All by 2026</SectionHeader>
            <Paragraph>
              The Pradhan Mantri Awas Yojana (PMAY) is the flagship mission of the Government of India, launched with the ambitious goal of achieving "Housing for All" for eligible urban and rural poor. While the original goal was to complete housing by 2022, the mission remains dynamic, focusing heavily on completion of existing projects and launching new, targeted schemes as we look towards 2026.
            </Paragraph>
            <Paragraph>
              Understanding PMAY in 2026 requires moving past the original scheme verticals and focusing on the new deadlines, especially given the official closure of the popular Credit Linked Subsidy Scheme (CLSS).
            </Paragraph>
          </motion.section>

          {/* Section 2: PMAY's Two Pillars & The CLSS End Date */}
          <motion.section variants={itemVariants} className="mb-10">
            <SectionHeader icon={Shield}>PMAY: Urban (PMAY-U) vs. Gramin (PMAY-G)</SectionHeader>
            <Paragraph>
              The mission operates through two distinct components, each addressing the housing needs of specific demographics:
            </Paragraph>
            <SubHeader>PMAY-U (Urban) Verticals</SubHeader>
            <ul className="list-none pl-0">
              <BulletPoint>
                **In-Situ Slum Redevelopment (ISSR):** Rehousing slum dwellers using the land as a resource, often providing a grant of ₹1 lakh per house.
              </BulletPoint>
              <BulletPoint>
                **Affordable Housing in Partnership (AHP):** Financial assistance (up to ₹1.5 Lakh per EWS house) from the Centre for States/UTs to construct houses in partnership with the private sector.
              </BulletPoint>
              <BulletPoint>
                **Beneficiary-led Individual House Construction/Enhancement (BLC/BLCE):** Central assistance (₹1.5 Lakh) for individual eligible families to construct a new house or enhance an existing one.
              </BulletPoint>
              <BulletPoint>
                **Credit Linked Subsidy Scheme (CLSS):** The interest subsidy component, now officially closed for new sanctions.
              </BulletPoint>
            </ul>

            <SubHeader>PMAY-G (Gramin) Focus</SubHeader>
            <Paragraph>
              PMAY-G focuses on providing a minimum 25 sq. meter pucca house with basic amenities to all eligible houseless families and those living in *kutcha* (non-permanent) houses in rural areas. The assistance amount is provided directly to the beneficiary’s bank account.
            </Paragraph>
          </motion.section>

          {/* Section 3: The Critical Deadlines for 2026 and Beyond */}
          <motion.section variants={itemVariants} className="mb-10">
            <SectionHeader icon={CheckSquare}>2026 Deadline Check: CLSS and PMAY-U Completion</SectionHeader>
            <Paragraph>
              For home loan borrowers, the key takeaway is the status of the Credit Linked Subsidy Scheme (CLSS), which provided interest subvention:
            </Paragraph>
            <ul className="list-none pl-0">
              <BulletPoint>
                **CLSS for MIG (MIG-I & MIG-II):** Expired on **March 31, 2021.** No new loan sanctions are eligible for this subsidy.
              </BulletPoint>
              <BulletPoint>
                **CLSS for EWS & LIG:** Expired on **March 31, 2022.** No new loan sanctions are eligible for this subsidy.
              </BulletPoint>
            </ul>
            <KeyTakeaway>
              The PMAY-U Mission itself (for *completion* of sanctioned homes under ISSR, AHP, and BLC) has been extended until **December 31, 2025**. If your house was sanctioned before March 31, 2022, but is still incomplete, the government is committed to its completion.
            </KeyTakeaway>
          </motion.section>


          {/* Section 4: PMAY-U 2.0 and the New Interest Subsidy Scheme (ISS) */}
          <motion.section variants={itemVariants} className="mb-10">
            <SectionHeader icon={Activity}>The PMAY-U 2.0: New Interest Subsidy Scheme (ISS)</SectionHeader>
            <Paragraph>
              While the original CLSS is closed, the Ministry of Housing and Urban Affairs (MoHUA) has introduced the PMAY-U 2.0 framework, which includes a new Interest Subsidy Scheme (ISS) for select segments. This scheme is focused on home loans sanctioned on or after **September 1, 2024**.
            </Paragraph>

            <SubHeader>Key Provisions of the ISS (PMAY-U 2.0)</SubHeader>
            <ul className="list-none pl-0">
              <BulletPoint>
                **Target Segment:** Households with an annual income up to ₹9 Lakhs (EWS, LIG, and a modified MIG bracket).
              </BulletPoint>
              <BulletPoint>
                **Subsidy Rate:** Up to a **4.0%** interest subsidy on the first ₹8 lakh of the home loan.
              </BulletPoint>
              <BulletPoint>
                **Maximum Benefit:** A maximum interest subsidy of **₹1.80 Lakh** (paid in five-yearly installments via DBT).
              </BulletPoint>
              <BulletPoint>
                **Loan Cap:** Applicable for loans up to ₹25 Lakh with a property value up to ₹35 Lakh.
              </BulletPoint>
            </ul>
            <Paragraph>
              This revised subsidy mechanism aims to continue providing targeted relief to lower and middle-income groups in urban areas.
            </Paragraph>
          </motion.section>
          
          {/* Section 5: PMAY-Gramin (PMAY-G) Latest Update */}
          <motion.section variants={itemVariants} className="mb-10">
            <SectionHeader icon={Briefcase}>Focus on the Rural Mission: PMAY-G Extended to 2029</SectionHeader>
            <Paragraph>
              The rural component of the scheme, PMAY-Gramin (PMAY-G), has a separate and much longer timeline, reflecting the scale of the housing gap in rural India.
            </Paragraph>
            <SubHeader>PMAY-G Key Features and Extension</SubHeader>
            <ul className="list-none pl-0">
              <BulletPoint>
                **Target:** Houseless families and those living in dilapidated *kutcha* houses, identified via the Socio-Economic and Caste Census (SECC) data.
              </BulletPoint>
              <BulletPoint>
                **Assistance Amount:** Financial assistance for constructing a house of at least 25 sq. m. and an additional ₹12,000 for a toilet (via Swachh Bharat Mission).
              </BulletPoint>
              <BulletPoint>
                **New Deadline:** The PMAY-G mission period is now extended to **March 31, 2029**, ensuring continuous support for the rural poor.
              </BulletPoint>
            </ul>
          </motion.section>

          {/* Section 6: Detailed Eligibility & Exclusion Criteria */}
          <motion.section variants={itemVariants} className="mb-10">
            <SectionHeader icon={Users}>Mandatory Eligibility Criteria: Are You Eligible?</SectionHeader>
            <Paragraph>
              While the income brackets for the *subsidy* have changed or expired, the core eligibility rules remain strictly enforced across all components:
            </Paragraph>

            <SubHeader>1. The All-India Pucca House Rule</SubHeader>
            <BulletPoint>
              The beneficiary or any member of their family (including spouse and unmarried children) **must not own a pucca house** in their name in any part of India. This is the single most important rule.
            </BulletPoint>

            <SubHeader>2. Mandatory Woman Ownership (EWS/LIG)</SubHeader>
            <BulletPoint>
              For new acquisitions or construction under the EWS and LIG segments, ownership of the house is **mandatorily required to be in the name of the female head of the household** or in joint name.
            </BulletPoint>

            <SubHeader>3. Income Groups (Original CLSS Structure for Context)</SubHeader>
            <ul className="list-none pl-0">
              <BulletPoint>
                **EWS (Economically Weaker Section):** Annual Household Income up to **₹3 Lakh** (Max carpet area 30 sq. m.).
              </BulletPoint>
              <BulletPoint>
                **LIG (Low Income Group):** Annual Household Income between **₹3 Lakh to ₹6 Lakh** (Max carpet area 60 sq. m.).
              </BulletPoint>
              <BulletPoint>
                **MIG-I (Middle Income Group I):** Annual Household Income between **₹6 Lakh to ₹12 Lakh** (CLSS expired Mar 2021).
              </BulletPoint>
              <BulletPoint>
                **MIG-II (Middle Income Group II):** Annual Household Income between **₹12 Lakh to ₹18 Lakh** (CLSS expired Mar 2021).
              </BulletPoint>
            </ul>
          </motion.section>

          {/* Section 7: Application and Status Tracking */}
          <motion.section variants={itemVariants} className="mb-10">
            <SectionHeader icon={Feather}>The Application Process and CLAP Portal</SectionHeader>
            <Paragraph>
              For PMAY-U components, all applicants must go through an assessment process to determine their eligibility. The application is typically facilitated through their respective States/UTs or through the online portal.
            </Paragraph>

            <SubHeader>The CLSS Awas Portal (CLAP)</SubHeader>
            <Paragraph>
              The CLAP portal remains the single most important platform for beneficiaries of all PMAY-U schemes, especially for tracking the subsidy component.
            </Paragraph>
            <ul className="list-none pl-0">
              <BulletPoint>
                **Real-Time Tracking:** CLAP is a common platform where all stakeholders—MoHUA, Central Nodal Agencies (CNAs like NHB and HUDCO), Primary Lending Institutions (PLIs), and beneficiaries—are integrated.
              </BulletPoint>
              <BulletPoint>
                **Subsidy Status:** The portal allows applicants to **track their subsidy status** in real-time. This is critical for those whose loans were sanctioned *before* the CLSS expiry deadline.
              </BulletPoint>
            </ul>
            <KeyTakeaway>
              If you believe you are eligible for the new PMAY-U 2.0 ISS, you should register your demand through the Unified Web Portal or directly consult with a Primary Lending Institution (Bank/HFC) to ensure compliance with the latest guidelines.
            </KeyTakeaway>
          </motion.section>

          {/* Call to Action Section (Replicating the original CTA structure) */}
          <motion.section
            className="bg-indigo-800 bg-opacity-40 p-8 sm:p-12 rounded-xl text-center shadow-2xl mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg flex items-center justify-center space-x-3"
              variants={itemVariants}
            >
              <Zap className="w-8 h-8 text-yellow-300" />
              <span>Navigate the PMAY Subsidy Maze: Start Your Application</span>
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Ready to check your eligibility for the PMAY-U 2.0 Interest Subsidy Scheme (ISS) or track your existing CLSS benefit? Use the official government portal to proceed.
            </motion.p>
            <motion.div variants={itemVariants}>
              <a
                href="https://pmaymis.gov.in/PMAYMIS2_2024/PmayISS.aspx" // Directing to the ISS portal based on search
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Go to Official PMAY-U 2.0 Portal
              </a>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
};

export default PMAYPage;
