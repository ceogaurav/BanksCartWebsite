import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  HeartPulse,     // Used for Core Coverage
  HandCoins,      // Used for Premiums & Affordability
  Users,          // Used for Plan Types (Floater)
  Scale,          // Used for IRDAI Regulations & Transparency
  Receipt,        // Used for Claim Settlement Ratio
  ShieldCheck,    // Used for Best-in-Class Plans
  LifeBuoy,       // Used for Riders & Add-ons
  Stethoscope,    // Used for Health & Wellness Benefits
  BookOpen,       // Used for The Final Checklist
  Zap,            // Used for CTA
} from "lucide-react";
import { Link } from "react-router-dom"; 

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "Best Health Insurance Plans in India 2025: Coverage, Premiums & Benefits";
const ARTICLE_SUBTITLE =
  "The essential 2025 guide for Indian families: Decoding IRDAI's new rules, the 3 must-have plans, tax benefits, and securing unlimited cover restoration.";
const BACK_LINK = "/blogs/finance-strategy"; 
const AUTHOR = "The Financial Strategist";
const DATE = "Nov 19, 2025";
const READ_TIME = "18 min read";
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
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const SectionHeader: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
  <motion.h2
    className="text-3xl md:text-4xl font-extrabold text-indigo-700 mt-12 mb-6 border-b-4 border-yellow-400/80 pb-3 flex items-center space-x-3"
    variants={itemVariants}
  >
    {icon}
    <span>{title}</span>
  </motion.h2>
);

const SubHeader: React.FC<{ title: string }> = ({ title }) => (
  <motion.h3
    className="text-2xl font-bold text-indigo-600 mt-8 mb-4 border-l-4 border-indigo-600 pl-3"
    variants={itemVariants}
  >
    {title}
  </motion.h3>
);

const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.p className="text-lg text-gray-700 mb-4 leading-relaxed" variants={itemVariants}>
    {children}
  </motion.p>
);

const BulletPoint: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.li
    className="text-base text-gray-600 mb-3 ml-5 list-disc"
    variants={itemVariants}
  >
    {children}
  </motion.li>
);

const KeyTakeaway: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <motion.div
    className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6 shadow-md"
    variants={itemVariants}
  >
    <p className="font-extrabold text-indigo-800 flex items-center space-x-2">
      <Stethoscope className="w-5 h-5 text-yellow-500" />
      <span>{title}</span>
    </p>
    <p className="text-sm text-gray-600 mt-2">{children}</p>
  </motion.div>
);

// ====================================================================
// MAIN PAGE COMPONENT
// ====================================================================

const HealthInsuranceBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.article
          initial="hidden"
          animate="visible"
          variants={pageVariants}
        >
          {/* HEADER SECTION */}
          <motion.header
            className="text-center mb-12 bg-white p-8 rounded-lg shadow-xl"
            variants={itemVariants}
          >
            <Link to={BACK_LINK} className="text-indigo-600 hover:text-indigo-800 transition duration-150 flex items-center justify-center text-sm mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Finance Strategy
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              {ARTICLE_TITLE}
            </h1>
            <p className="text-xl text-indigo-600 font-medium mb-6">
              {ARTICLE_SUBTITLE}
            </p>
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <span>By {AUTHOR}</span>
              <span>|</span>
              <span>{DATE}</span>
              <span>|</span>
              <span>{READ_TIME}</span>
            </div>
          </motion.header>

          {/* INTRODUCTION */}
          <motion.section variants={itemVariants}>
            <Paragraph>
              In 2025, health insurance is no longer a luxury but a fundamental necessity for every Indian family. With healthcare inflation consistently outpacing general inflation and the average cost of critical care soaring, relying solely on savings is financially dangerous. This definitive guide breaks down the complex landscape of health plans, detailing the best options, key coverage mandates, and how new **IRDAI regulations** have made policies more user-friendly and inclusive than ever before.
            </Paragraph>
            <Paragraph>
              Our focus is on finding plans that offer **Restoration of Sum Insured**, **no room rent caps**, and a **high Claim Settlement Ratio (CSR)**, ensuring you get maximum protection without hidden expenses.
            </Paragraph>
          </motion.section>

          {/* ==================================================================== */}
          {/* SECTION 1: THE 2025 IRDAI GAME CHANGERS */}
          {/* ==================================================================== */}
          <motion.section whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <SectionHeader
              title="IRDAI 2025: New Rules That Guarantee Better Coverage"
              icon={<Scale className="w-6 h-6 text-indigo-600" />}
            />

            <Paragraph>
              The Insurance Regulatory and Development Authority of India (IRDAI) has introduced significant reforms aimed at increasing accessibility and consumer protection. These changes fundamentally alter how you should evaluate and purchase a policy today:
            </Paragraph>
            
            <SubHeader title="1. No Upper Age Limit for New Policies" />
            <BulletPoint>
              Insurers must now offer at least one health insurance product to every applicant, **regardless of age**. This is a massive win for **senior citizens** who previously faced high premiums or outright denial.
            </BulletPoint>

            <SubHeader title="2. Reduced Waiting Period for Pre-Existing Diseases (PED)" />
            <BulletPoint>
              The maximum waiting period for coverage of Pre-Existing Diseases (like Diabetes or Hypertension) has been reduced from four years to **three years (36 months)**. This means faster access to coverage for chronic conditions.
            </BulletPoint>
            
            <SubHeader title="3. Full Coverage for AYUSH Treatments" />
            <BulletPoint>
              **AYUSH** (Ayurveda, Yoga, Unani, Siddha, Homoeopathy) treatments are now mandatorily covered by all plans, and crucialy, **up to the full Sum Insured** with no sub-limits.
            </BulletPoint>

            <KeyTakeaway title="The Moratorium Advantage" >
              The moratorium period, after which an insurer cannot reject a claim based on non-disclosure, has been reduced from eight years to just **five years**. This significantly enhances policyholders' confidence.
            </KeyTakeaway>
          </motion.section>

          {/* ==================================================================== */}
          {/* SECTION 2: BEST-IN-CLASS PLANS FOR 2025 */}
          {/* ==================================================================== */}
          <motion.section whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <SectionHeader
              title="Top 3 Health Plans & Their Game-Changing Benefits"
              icon={<ShieldCheck className="w-6 h-6 text-indigo-600" />}
            />

            <Paragraph>
              The market is saturated, but three plans consistently stand out for their features, claim performance, and modern benefits.
            </Paragraph>

            <SubHeader title="1. HDFC Ergo Optima Secure (The Features King)" />
            <BulletPoint>
              **Secure Benefit:** Instant doubling of the Sum Insured (e.g., a ₹10 Lakh policy becomes ₹20 Lakh cover immediately upon purchase).
            </BulletPoint>
            <BulletPoint>
              **Protect Benefit:** Covers **Non-Medical Expenses (Consumables)** like gloves, masks, and PPE, which often lead to large deductions in other plans.
            </BulletPoint>

            <SubHeader title="2. Care Supreme (The Affordable Powerhouse)" />
            <BulletPoint>
              Known for its high coverage at a relatively competitive premium.
            </BulletPoint>
            <BulletPoint>
              Offers an **Inflation Shield** add-on, automatically increasing your sum insured every year to counter rising medical costs.
            </BulletPoint>

            <SubHeader title="3. Niva Bupa Reassure 2.0 (Unlimited Restoration)" />
            <BulletPoint>
              Offers **Unlimited Automatic Restore** of the base Sum Insured for unrelated illnesses, ensuring your cover never truly depletes.
            </BulletPoint>
            <BulletPoint>
              **Lock The Age:** Your premium for subsequent renewals remains locked based on your entry age until you make your first claim.
            </BulletPoint>

            <Paragraph>
              
            </Paragraph>
          </motion.section>

          {/* ==================================================================== */}
          {/* SECTION 3: DECODING CRITICAL COVERAGE CLAUSES */}
          {/* ==================================================================== */}
          <motion.section whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <SectionHeader
              title="The 3 Clauses That Define a Great Policy (Beyond the Price)"
              icon={<HeartPulse className="w-6 h-6 text-indigo-600" />}
            />

            <SubHeader title="1. Room Rent Capping: The Hidden Cost" />
            <Paragraph>
              Many older or cheaper policies impose a limit on the room rent (e.g., 1% of Sum Insured or Semi-Private Room). If you choose a more expensive room, all associated charges (doctor visits, ICU, operation theater fees) are **proportionately deducted**. Always choose a plan with **No Room Rent Limit** or one that allows **'Any Room'**.
            </Paragraph>

            <SubHeader title="2. Co-Payment vs. Deductible" />
            <BulletPoint>
              **Co-Payment:** A fixed percentage of the claim amount (e.g., 10%) that you must pay. Common in senior citizen policies. Avoid policies with mandatory co-pay for non-senior citizens.
            </BulletPoint>
            <BulletPoint>
              **Deductible:** A fixed, pre-agreed amount you pay out-of-pocket before the insurer steps in. Essential for **Super Top-Up Plans**, which are great for increasing coverage without high premiums.
            </BulletPoint>

            <SubHeader title="3. Unlimited Restoration Benefit" />
            <Paragraph>
              This is perhaps the most important feature for families. If a family member uses up the entire Sum Insured in one year (e.g., ₹10 lakhs), the restoration feature **re-fills** the ₹10 lakhs for use later in the same policy year. Opt for plans that offer this benefit for **unrelated illnesses and unlimited times**.
            </Paragraph>
          </motion.section>

          {/* ==================================================================== */}
          {/* SECTION 4: TYPES OF PLANS & WHO NEEDS THEM */}
          {/* ==================================================================== */}
          <motion.section whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <SectionHeader
              title="Individual, Floater, and Senior Plans: The Right Fit"
              icon={<Users className="w-6 h-6 text-indigo-600" />}
            />

            <SubHeader title="Family Floater Plans" />
            <BulletPoint>
              **Coverage:** A single Sum Insured shared by all members (e.g., a family of 4 shares ₹15 Lakhs).
            </BulletPoint>
            <BulletPoint>
              **Best For:** Young families where the risk of multiple claims in a year is low. It is generally **more cost-effective** than buying separate individual plans.
            </BulletPoint>

            <SubHeader title="Individual Plans" />
            <BulletPoint>
              **Coverage:** Each member has their own dedicated Sum Insured (e.g., 4 members, each with ₹10 Lakhs).
            </BulletPoint>
            <BulletPoint>
              **Best For:** Families with a **senior member** or one member with a high-risk medical history. This prevents one person's claim from depleting the cover for everyone else.
            </BulletPoint>
            
            <SubHeader title="Senior Citizen Plans (60+)" />
            <BulletPoint>
              **Features:** Often have higher premiums and mandatory co-pay, but the 2025 IRDAI rules cap the annual premium increase at **10%**, offering stability.
            </BulletPoint>
            <BulletPoint>
              **Must-Have:** Look for features like **Home Health Care (HHC)** and short or waived pre-policy medical check-ups.
            </BulletPoint>
            
          </motion.section>
          
          {/* ==================================================================== */}
          {/* SECTION 5: THE PREMIUM PUZZLE & TAX BENEFITS */}
          {/* ==================================================================== */}
          <motion.section whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <SectionHeader
              title="Premiums & Your Tax Shield (Section 80D)"
              icon={<HandCoins className="w-6 h-6 text-indigo-600" />}
            />
            
            <Paragraph>
              Premiums are determined by three main factors: **Age** (the oldest member in a floater), **Sum Insured**, and **Location** (Tier-1 cities often have higher rates). However, the premium is also your biggest tax-saving tool.
            </Paragraph>
            
            <SubHeader title="Section 80D Tax Deduction Limits (FY 2025-26)" />
            <ul className="space-y-3 mb-6">
                <BulletPoint>
                    **Self, Spouse, and Dependent Children:** Up to **₹25,000** deduction per year.
                </BulletPoint>
                <BulletPoint>
                    **Self (under 60) AND Parents (under 60):** Total deduction of up to **₹50,000** (₹25,000 for self/family + ₹25,000 for parents).
                </BulletPoint>
                <BulletPoint>
                    **Self (under 60) AND Parents (Senior Citizens, 60+):** Total deduction of up to **₹75,000** (₹25,000 for self/family + **₹50,000** for senior parents).
                </BulletPoint>
            </ul>
            
            <KeyTakeaway title="Wellness Benefits for Premium Discounts" >
              Many modern plans, like Aditya Birla Activ Fit, offer **wellness rewards** (discounts, vouchers) for tracking steps and fitness goals, effectively reducing your net premium cost.
            </KeyTakeaway>
          </motion.section>


          {/* ==================================================================== */}
          {/* SECTION 6: THE CLAIM SETTLEMENT RATIO (CSR) TRUTH */}
          <motion.section whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <SectionHeader
              title="Beyond the CSR Headline: What Really Matters in a Claim"
              icon={<Receipt className="w-6 h-6 text-indigo-600" />}
            />

            <SubHeader title="The Nuance of Claim Settlement Ratio" />
            <Paragraph>
              A high CSR (above 95%) is good, indicating the insurer settles most claims. However, the IRDAI has flagged that CSR sometimes includes **partially settled claims**. A better metric is the **Incurred Claim Ratio (ICR)**, which shows the ratio of claims paid out versus premiums collected.
            </Paragraph>
            <KeyTakeaway title="Cashless Claim TAT (Turnaround Time)" >
              The fastest claim processing is essential. Look for insurers who guarantee **Final Authorization of Cashless Discharge within 3 hours** of the hospital submitting the request (a key IRDAI recommendation). Niva Bupa and Star Health often lead in this metric.
            </KeyTakeaway>
            
            <SubHeader title="The Cashless vs. Reimbursement Choice" />
            <BulletPoint>
              **Cashless:** Preferred method. Treatment is done at a **Network Hospital**, and the insurer pays the hospital directly. Requires pre-authorization.
            </BulletPoint>
            <BulletPoint>
              **Reimbursement:** You pay the hospital bill first, then submit documents to the insurer for later payment. This is necessary for non-network hospitals but is slower and requires immediate out-of-pocket funds.
            </BulletPoint>
          </motion.section>

          {/* ==================================================================== */}
          {/* SECTION 7: ESSENTIAL RIDERS & ADD-ONS */}
          {/* ==================================================================== */}
          <motion.section whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <SectionHeader
              title="Enhancing Your Protection: Riders and Add-ons"
              icon={<LifeBuoy className="w-6 h-6 text-indigo-600" />}
            />

            <SubHeader title="1. Critical Illness Rider/Add-on" />
            <Paragraph>
              This is a benefit policy, not an indemnity one. Upon diagnosis of a severe illness (like cancer, stroke, or kidney failure), it pays out a **lump-sum amount** regardless of hospitalization costs. This lump sum can cover income loss, rehabilitation, or debt repayment.
            </Paragraph>

            <SubHeader title="2. Consumables Cover" />
            <Paragraph>
              As mentioned with HDFC Ergo's Protect Benefit, this add-on covers the cost of non-medical items (gloves, bandages, syringes). Without this cover, these expenses can account for **10-15% of your total hospital bill** and are usually deducted. Highly recommended.
            </Paragraph>

            <SubHeader title="3. OPD Cover" />
            <Paragraph>
              **Out-Patient Department** expenses (doctor consultations, diagnostic tests, dental care) are typically excluded. OPD riders cover these day-to-day medical costs. While it increases the premium, it can be valuable for managing chronic conditions.
            </Paragraph>
          </motion.section>
          
          {/* ==================================================================== */}
          {/* SECTION 8: THE FINAL CHECKLIST & PORTABILITY */}
          {/* ==================================================================== */}
          <motion.section whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <SectionHeader
              title="The Policy Purchase Checklist (Don't Miss This)"
              icon={<BookOpen className="w-6 h-6 text-indigo-600" />}
            />

            <SubHeader title="The 5-Point Vetting Process" />
            <ul className="space-y-3 mb-6">
                <BulletPoint>
                    **Network Hospital Count:** Ensure your preferred hospitals in your city are on the **cashless network**. A wider network guarantees easier access to care.
                </BulletPoint>
                <BulletPoint>
                    **Sub-Limits & Exclusions:** Read the list of diseases/procedures (e.g., cosmetic surgery, dental treatments) that are permanently excluded. Check for sub-limits on cataract or joint replacement.
                </BulletPoint>
                <BulletPoint>
                    **Free Look Period:** All policies must offer a **30-day Free Look Period** from the date of policy document receipt, allowing you to cancel and get a full refund if you find the terms unsatisfactory.
                </BulletPoint>
                <BulletPoint>
                    **Health Insurance Portability:** Ensure the insurer allows for easy portability. This lets you switch insurers without losing the benefit of the **waiting periods** you have already completed.
                </BulletPoint>
                <BulletPoint>
                    **Disclose Everything:** Always be 100% honest about your medical history and lifestyle habits. Non-disclosure is the **single biggest reason for claim rejection**.
                </BulletPoint>
            </ul>
          </motion.section>

          {/* ==================================================================== */}
          {/* CALL TO ACTION (CTA) SECTION */}
          {/* ==================================================================== */}
          <motion.section
            className="mt-16 bg-indigo-600/90 p-10 rounded-xl text-center shadow-2xl"
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
              <span>Secure Your Family: Get a Personalized Comparison</span>
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Don't buy a policy based on the premium alone. Use our tool to compare the **Optima Secure**, **Care Supreme**, and **Reassure 2.0** features side-by-side, tailored to your family's age and medical history.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => alert("Personalized Health Plan Comparison Initiated!")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Compare Top 2025 Health Plans Now
              </button>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
};

export default HealthInsuranceBlog;
