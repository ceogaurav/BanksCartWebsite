import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Target, // Used for Prequalification/Budget
  Shield, // Used for Inspection/Due Diligence
  Car, // Used for Vehicle Selection
  DollarSign, // Used for Negotiation/Pricing
  FileText, // Used for Documentation/Finalization
  Users, // Used for Dealer vs Private Seller
  Feather, // Used for Negotiation Tactics
  Gavel, // Used for Title & Insurance
  Zap, // Used for CTA
} from "lucide-react";
import { Link } from "react-router-dom"; 

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "How to Buy a Used Car With a Loan: The Complete Buyer’s Guide";
const ARTICLE_SUBTITLE =
  "Navigate the complex world of pre-owned auto financing: from securing the best interest rate via pre-approval to mastering the pre-purchase inspection and avoiding dealer markups.";
const BACK_LINK = "/blogs/automotive-finance"; 
const AUTHOR = "The Auto Finance Expert";
const DATE = "Oct 25, 2025";
const READ_TIME = "28 min read (The Buyer's Manual)"; 
// --- CONFIGURATION END ---

// ====================================================================
// FRAMEWORK COMPONENTS (Replicating the modular structure)
// NOTE: These components are reused directly from the previous file 
// to ensure consistent styling and animation behavior.
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
interface SectionHeaderProps {
  title: string;
  icon: React.ElementType;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon: Icon }) => (
  <motion.div 
    className="flex items-center space-x-4 mb-6 pt-4 border-t border-gray-200/50"
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
    <FileText className="w-5 h-5 mt-1 mr-3 text-green-500 flex-shrink-0" />
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
      <span className="font-extrabold mr-2">🔒 Insider Tip:</span>
      {children}
    </p>
  </motion.div>
);

// ====================================================================
// MAIN COMPONENT (NEW CONTENT)
// ====================================================================

const UsedCarLoanGuide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-12 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Back Link */}
        <Link to={BACK_LINK} className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to all Automotive Finance Guides
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

          {/* Section 1: Pre-Approval: The Non-Negotiable First Step */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="1. Master Pre-Approval: Why Shopping for the Loan Comes First" icon={Target} />
            <Paragraph>
              The biggest mistake a used car buyer makes is falling in love with a vehicle before securing financing. When you walk into a dealership without a pre-approval, you lose your strongest negotiation tool. The dealer controls both the price of the car *and* the rate of the loan, maximizing their profit on both ends.
            </Paragraph>
            <SubHeader title="The Golden Rule: Separate the Car Price from the Loan Rate" id="separate-car-loan" />
            <Paragraph>
              A **pre-approval** from your personal bank, credit union, or an online lender makes you a **cash buyer** in the eyes of the dealer. You know the maximum amount you can spend, the exact monthly payment, and the interest rate. This forces the negotiation to focus solely on the car's price, not the complex financing terms.
            </Paragraph>
            <KeyTakeaway>
              Obtain pre-approvals from at least **three different lenders** within a 14-45 day window. This counts as a single hard inquiry on your credit report (rate shopping) but gives you crucial leverage to negotiate the dealer's finance offer, which is often inflated.
            </KeyTakeaway>
            <SubHeader title="Used Car Loan Requirements vs. New" id="used-car-loan-requirements" />
            <Paragraph>
              Used car loans typically have higher interest rates than new car loans because the collateral (the car) is depreciating faster and is a higher risk. Lenders also have restrictions on the vehicle's age and mileage. Most banks will not finance vehicles older than **7-10 years** or with mileage over **1,20,000 km / 75,000 miles**. Know your lender's limits before you start browsing.
            </Paragraph>
          </motion.section>

          {/* Section 2: Budgeting for the True Cost of Ownership */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="2. The Real Cost: Budgeting Beyond the Monthly EMI" icon={DollarSign} />
            <Paragraph>
              Your monthly EMI is only one component of the total cost. Used cars carry the added financial burden of maintenance, which you must factor into your monthly budget. Ignoring this can lead to loan default or crippling unexpected repair bills.
            </Paragraph>
            <SubHeader title="The 20/4/10 Rule for Used Cars" id="20-4-10-rule" />
            <Paragraph>
              Adopt a conservative financing model for used cars:
              <ul className="list-disc ml-6 mt-3 space-y-2">
                <BulletPoint> **20% Down Payment:** The more equity you have initially, the less risk and interest you pay over the term.</BulletPoint>
                <BulletPoint> **4 Year Maximum Loan Term:** Keep the loan term short to pay less interest. Longer terms mean you risk owing more than the car is worth (being 'underwater').</BulletPoint>
                <BulletPoint> **10% Rule:** Total vehicle expenses (EMI, insurance, fuel, maintenance/repairs) should not exceed 10% of your gross monthly income.</BulletPoint>
              </ul>
            </Paragraph>
            <SubHeader title="The Hidden Costs of Used Car Financing" id="hidden-costs" />
            <Paragraph>
              When calculating the final loan amount, remember to include all non-negotiable costs:
              <ul className="list-disc ml-6 mt-3 space-y-2">
                <BulletPoint> **Sales Tax and Registration Fees.**</BulletPoint>
                <BulletPoint> **Mandatory Insurance:** Lenders require comprehensive coverage until the loan is paid off, as they hold the lien.</BulletPoint>
                <BulletPoint> **Dealer Documentation Fee:** Often non-negotiable, but varies wildly. Research your local average to spot an excessive fee.</BulletPoint>
              </ul>
            </Paragraph>
          </motion.section>

          {/* Section 3: Vehicle Selection & Due Diligence (The Data Dive) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="3. Vetting the Vehicle: Data, Inspection, and the Paper Trail" icon={Car} />
            <Paragraph>
              Unlike a new car, every used car is unique due to its service history. Your lender will require due diligence before approving the specific collateral (the car). This section is the most critical for protecting your investment.
            </Paragraph>
            <SubHeader title="The Vehicle History Report (VHR)" id="vhr-report" />
            <Paragraph>
              A VHR (like CarFax or a local equivalent) is non-negotiable. It provides a detailed look at the car's title history, mileage consistency, accident reports, and service records. **Never trust a seller who refuses to provide or let you obtain a VHR.** Look for a clean title, no signs of major structural damage, and consistent maintenance records.
            </Paragraph>
            <SubHeader title="Mandatory Pre-Purchase Inspection (PPI)" id="ppi-inspection" />
            <Paragraph>
              Once you have an eye on a specific car, inform the seller you require a **Pre-Purchase Inspection (PPI)** by an independent mechanic of *your* choice. This is the ultimate defensive maneuver. The mechanic will check the engine, transmission, frame, and electronics for latent or hidden defects that a test drive won't reveal. If the seller objects to a PPI, walk away immediately—it signals they are hiding something. 
            </Paragraph>
            <KeyTakeaway>
              Before the PPI, check your loan terms. Some lenders require the car to pass a basic inspection or require a professional appraisal to ensure the loan amount doesn't exceed the vehicle's fair market value (LTV). If the car fails, your loan pre-approval may not apply to that specific vehicle.
            </KeyTakeaway>
          </motion.section>

          {/* Section 4: Negotiating with Cash Power (Dealer vs. Private) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="4. Negotiation Blueprint: Using Pre-Approval as Your Weapon" icon={Feather} />
            <Paragraph>
              Since you have your pre-approval letter, you negotiate with the financial strength of a cash buyer. The dealer knows you can walk out and buy the car elsewhere immediately.
            </Paragraph>
            <SubHeader title="Negotiating the Dealer Price (The Back-End Products)" id="dealer-negotiation" />
            <Paragraph>
              Dealers make much of their profit on **back-end products** sold in the finance office: extended warranties, rust-proofing, gap insurance, etc. Politely but firmly decline these add-ons. You can typically get better-priced, third-party extended warranties and your lender usually offers competitive gap insurance. If you finance these into your loan, you pay interest on them, significantly inflating the final cost.
            </Paragraph>
            <SubHeader title="The Private Seller Scenario" id="private-seller-scenario" />
            <Paragraph>
              Buying from a private seller requires more caution, but eliminates dealer markups. The process is: 1. Agree on the price. 2. Get the PPI done. 3. Have your lender draft a check/bank transfer directly to the seller for the loan amount. 4. You pay the remaining down payment to the seller. 5. **Crucially**, you must get the title signed over to you and immediately file the lien with the RTO/DMV in the lender's name. The lender must be listed as the lienholder.
            </Paragraph>
          </motion.section>

          {/* Section 5: The Final Steps: Documentation and Liens */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="5. Finalizing the Loan: Title, Insurance, and Documentation" icon={FileText} />
            <Paragraph>
              The moment the money changes hands, the paperwork shifts from shopping to legal finalization. Errors here can cause major headaches down the road.
            </Paragraph>
            <SubHeader title="The Title and Lien Filing" id="title-lien-filing" />
            <Paragraph>
              When a car is bought with a loan, the lender holds a **lien** on the vehicle. This means the car is collateral, and you do not fully own it until the loan is paid off. The bank's name will be listed as the lienholder on the vehicle's **Certificate of Title** (Registration Certificate in India). The dealer or the buyer (in a private sale) must ensure the RTO/DMV paperwork correctly lists the lender as the legal owner until the debt is cleared.
            </Paragraph>
            <SubHeader title="Securing Comprehensive Insurance" id="comprehensive-insurance" />
            <Paragraph>
              Your lender requires you to carry **comprehensive and collision insurance** coverage, often with a low deductible (e.g., $500 or lower), for the entire duration of the loan. This protects their collateral. You must have proof of this insurance before the lender will disburse the funds. Failure to maintain adequate coverage is a violation of the loan contract.
            </Paragraph>
            <BulletPoint>Ensure the loan agreement matches the pre-approval letter exactly (Rate, Term, Principal Amount).</BulletPoint>
            <BulletPoint>Get copies of all signed documents: Bill of Sale, Loan Agreement, Odometer Disclosure, and Title Application.</BulletPoint>
            <BulletPoint>Confirm that the seller/dealer has provided the full service history and owner's manual.</BulletPoint>
          </motion.section>

          {/* Section 6: Post-Purchase Risk Management */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="6. Long-Term Strategy: Managing the Loan and the Asset" icon={Shield} />
            <Paragraph>
              Once the transaction is complete, focus shifts to prudent loan management and maintaining the asset to protect the loan's collateral value.
            </Paragraph>
            <SubHeader title="Avoid Being 'Underwater' (Negative Equity)" id="negative-equity" />
            <Paragraph>
              Negative equity occurs when you owe more on the loan than the car is currently worth. Used cars depreciate quickly. To minimize this risk: make a large down payment, choose a shorter loan term (4 years max), and make extra principal payments whenever possible. Being underwater makes selling the car difficult, as you'd have to pay the lender the difference.
            </Paragraph>
            <SubHeader title="The Right to Sell Insurance (GAP)" id="gap-insurance" />
            <Paragraph>
              **GAP (Guaranteed Asset Protection) insurance** is often worth considering for used car loans, as depreciation is fast. If your car is totaled or stolen, your standard auto insurance pays only the current market value, which may be less than your outstanding loan balance. GAP insurance covers this 'gap' between the insurance payout and your remaining loan debt.
            </Paragraph>
            <KeyTakeaway>
              Set up auto-pay for your monthly EMI immediately. A single missed or late payment on an auto loan is severely damaging to your credit score and can trigger default clauses in your loan agreement.
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
              <span>Initiate Your Used Car Loan Prequalification</span>
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Start the process today by comparing pre-approved rates from multiple lenders, giving you the power to negotiate the best price on your next used vehicle.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => alert("Used Car Loan Prequalification Initiated!")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Compare Loan Rates Now
              </button>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
};

export default UsedCarLoanGuide;
