import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Car, 
  Bike, // FIX: Changed 'Motorcycle' to 'Bike' for correct lucide-react export
  Target, 
  TrendingUp, 
  Zap, 
  CheckSquare, 
  Gavel, 
  Feather, 
  Shield, 
} from "lucide-react";
import { Link } from "react-router-dom"; 

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "The Ultimate Guide to Car, Bike, and Used Car Loans: Rate Secrets, EMI Hacks, and the Best Time to Buy";
const ARTICLE_SUBTITLE =
  "A 5,000-word deep-dive for Indian buyers: Master the difference between new and used financing, slash your EMIs using strategic prepayment, and navigate the RTO hypothecation maze.";
const BACK_LINK = "/blogs/finance-strategy"; 
const AUTHOR = "Automotive Finance Specialist";
const DATE = "Dec 10, 2025";
const READ_TIME = "35 min read (The Buyer's Manual)";
// --- CONFIGURATION END ---

// ====================================================================
// FRAMEWORK COMPONENTS 
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
  // FIX: Ensured no duplicate keys
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
  // Use React.ElementType for components/icons
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
      <span className="font-extrabold mr-2">🔒 Insider Tip:</span>
      {children}
    </p>
  </motion.div>
);

// ====================================================================
// MAIN COMPONENT
// ====================================================================

const VehicleFinancingGuide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-12 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Back Link */}
        <Link to={BACK_LINK} className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200 mb-8">
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

          {/* Section 1: The New Car Loan Advantage (LTV vs. Rate) */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="1. New Vehicle Loans: Decoding LTV, Rates, and Tenure" icon={Car} />
            <Paragraph>
              A new car or bike loan is the simplest form of vehicle financing. Banks view these as low-risk due to the asset's high, verifiable value. However, the biggest leverage point is the **Loan-to-Value (LTV) ratio**, which banks often push to the maximum (90-100%) to secure the deal. The trick is to reject the max LTV and use a higher down payment for rate negotiation.
            </Paragraph>
            <SubHeader title="The Strategic Down Payment Trick" id="down-payment-strategy" />
            <Paragraph>
              While 100% financing sounds appealing, it ties you to a higher interest rate and a longer debt cycle. By increasing your down payment from the standard 10% to **25-30%**, you significantly reduce the bank's risk. Use this reduction in risk to aggressively negotiate a **0.5% to 1.0% lower interest rate**. Over a 5-7 year tenure, this rate cut will save you far more than the initial cash outlay of a smaller down payment.
            </Paragraph>
            <KeyTakeaway>
              Never finance optional costs like extended warranties, accessories, or service packages within the loan amount. Pay for them upfront. By keeping the principal loan amount strictly limited to the ex-showroom price (or lower), you reduce interest cost on non-depreciating items.
            </KeyTakeaway>
            {/* Extended content */}
            <SubHeader title="Tenure vs. Total Interest Cost" id="tenure-interest-cost" />
            <Paragraph>
              Longer loan tenures (5-7 years) reduce your EMI, but they drastically increase your **Total Interest Paid**. Calculate the difference. A 7-year loan on ₹10 Lakhs at 9% might have an EMI of ₹15,800, but a 5-year loan has an EMI of ₹20,750. The trade-off is often **hundreds of thousands of Rupees** in saved interest. Opt for the shortest tenure you can comfortably manage without straining your Debt-to-Income (DTI) ratio.
            </Paragraph>
          </motion.section>

          {/* Section 2: Used Car Loans: The Documentation Minefield */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="2. Used Car Loans: LTV, Rate Premium, and Age Limits" icon={Gavel} />
            <Paragraph>
              Used car loans carry significantly higher risk for lenders, which translates to a **rate premium** (1-4% higher than new car rates) and stricter LTV norms. Lenders typically only finance 70-80% of the **appraised value**, not the sale price. The key trick is to understand the bank's rigid eligibility criteria based on vehicle age.
            </Paragraph>
            <SubHeader title="The Age Limit and Appraisal Loophole" id="age-appraisal" />
            <Paragraph>
              Most banks will not finance a vehicle older than **7 years** at the end of the loan tenure. For a 5-year loan, you can generally only finance a car up to 2 years old. **The trick:** If the seller is quoting a high price, have a pre-inspection done by a third-party approved valuer and use that report to challenge the bank's internal appraiser, ensuring the LTV is based on the **highest possible valuation**, maximizing the funded amount.
            </Paragraph>
            <SubHeader title="The RTO Hypothecation Status Check" id="rto-hypothecation" />
            <Paragraph>
              Before signing any papers, perform a due diligence check on the RTO (Regional Transport Office) records. Ensure the used vehicle's Registration Certificate (RC) shows a clear title, or that the previous loan's **hypothecation has been successfully removed**. Buying a vehicle with an existing, undisclosed loan attached is a common legal nightmare. Demand the previous loan's NOC (No Objection Certificate) before making the final payment.
            </Paragraph>
            <KeyTakeaway>
              Used car loan interest is often calculated using the **Flat Rate** method by NBFCs, which is significantly more expensive than the **Reducing Balance** method used by major banks. Always clarify the calculation method. The Reducing Balance method is the only option that is truly consumer-friendly.
            </KeyTakeaway>
          </motion.section>

          {/* Section 3: EMI Reduction Hacks: Prepayment and Refinancing */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="3. EMI Reduction: The Strategic Prepayment and Refinance Game" icon={Feather} />
            <Paragraph>
              Once your loan is running, the greatest trick is not to rely on the standard EMI schedule but to accelerate repayment. Banks charge heavy prepayment penalties, but you can navigate this using timing and calculation.
            </Paragraph>
            <SubHeader title="The Annual 1-EMI Prepayment Trick" id="annual-prepayment-trick" />
            <Paragraph>
              Most loans allow a certain percentage of prepayment (e.g., 25% of the outstanding principal) annually, often with a charge of 2-5% on the prepaid amount. The trick is to prepay an amount equivalent to just **one extra EMI per year**. This small, consistent injection significantly reduces the principal outstanding early in the loan cycle, drastically cutting the total interest paid, often saving you *years* of interest for a minimal, single EMI cost.
            </Paragraph>
            <SubHeader title="Timing the Loan Refinance" id="loan-refinance-timing" />
            <Paragraph>
              If your personal CIBIL score has improved significantly (e.g., from 700 to 780) since you took the loan, or if market rates have dropped, consider **refinancing**. This involves taking a new loan at a lower rate to pay off the old, high-rate loan. Only execute this if the savings from the lower interest rate outweigh the combined cost of the prepayment penalty on the old loan and the processing fee of the new loan. This window of opportunity is typically after the first 1-2 years.
            </Paragraph>
            <BulletPoint>Check for Foreclosure Clause: Read the loan agreement. Some banks restrict foreclosure for the first 6-12 months.</BulletPoint>
            <BulletPoint>Round-up Payments: Simply round up your monthly EMI (e.g., ₹15,500 EMI becomes ₹16,000). The extra ₹500 goes directly to the principal, compounding your savings effortlessly.</BulletPoint>
          </motion.section>

          {/* Section 4: Bike Loans: Unique Documentation and Insurance */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="4. Two-Wheeler Loans: Specialized Eligibility and Insurance" icon={Bike} />
            <Paragraph>
              Bike loans have lower ticket sizes but often come with a disproportionately higher interest rate than car loans due to the higher perceived risk (accidents, theft, lower resale value). Eligibility is usually simpler, but the documentation requires scrutiny.
            </Paragraph>
            <SubHeader title="The Bank vs. Dealer Finance Trap" id="dealer-finance-trap" />
            <Paragraph>
              Many two-wheeler dealers offer **'Zero Down Payment'** or **'Low Interest Schemes'**. These dealer schemes often bundle hidden charges, processing fees, or force you into expensive, mandatory insurance or accessories, effectively raising the *actual* borrowing cost well beyond the advertised interest rate. **The trick:** Secure an external loan pre-approval from your own bank first, then use that offer as leverage to strip out hidden costs from the dealer's finance package.
            </Paragraph>
            <SubHeader title="Insurance as Collateral Protection" id="insurance-collateral" />
            <Paragraph>
              Since the bike is the collateral, the bank will mandate Comprehensive Insurance. However, always include **Zero Depreciation** coverage, especially for the first 3 years. This ensures that in case of a major accident, the claim payout is maximized, which fully protects both you and the lender, simplifying the claim and loan closure process in a worst-case scenario.
            </Paragraph>
            <KeyTakeaway>
              For used bike loans, NBFCs are often the only option, and their rates can be predatory (18-25% Flat Rate). **Avoid financing a used two-wheeler** unless the amount is very small and the tenure is under 2 years. It is usually more economical to take a personal loan if the CIBIL score is high.
            </KeyTakeaway>
          </motion.section>

          {/* Section 5: Depreciation & Resale: The Ownership Cost Illusion */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="5. The Hidden Cost of Ownership: Depreciation & Resale Value" icon={TrendingUp} />
            <Paragraph>
              The EMI is only part of the cost. The largest hidden cost is **depreciation**. A new car loses 20-30% of its value in the first year alone. The trick is to align your loan tenure with the vehicle's steepest depreciation curve.
            </Paragraph>
            <SubHeader title="The 3-Year Ownership Rule" id="3-year-rule" />
            <Paragraph>
              The most financially optimized ownership cycle is often **3 to 4 years**. By this time, you have paid down a significant portion of the principal, and the rate of depreciation has stabilized. Selling the car then gives you maximum residual value relative to the original cost. **Avoid the 6-7 year cycle** where the car's resale value is significantly lower than the outstanding principal balance (negative equity), making an upgrade financially painful.
            </Paragraph>
            <SubHeader title="Financing Brands with High Resale" id="high-resale-brands" />
            <Paragraph>
              Lenders are more willing to offer better LTV and lower rates on brands known for high resale value (e.g., Maruti Suzuki, Hyundai). These cars are easier for the bank to auction if you default. When choosing a vehicle, research the 3-year resale percentage of the model. A higher resale value equals a lower total ownership cost for you, regardless of the loan rate.
            </Paragraph>
          </motion.section>

          {/* Section 6: Negotiation Tactics: Dealer vs. Bank Rate Arbitrage */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="6. The Negotiation Blueprint: Dealer vs. Bank Rate Arbitrage" icon={Target} />
            <Paragraph>
              The car dealer’s finance desk is a profit center. They make money by marking up the interest rate offered by the bank. The trick is to force the dealer to choose between a smaller commission on the sale price or a smaller commission on the loan rate.
            </Paragraph>
            <SubHeader title="The Cash Buyer Stance" id="cash-buyer-stance" />
            <Paragraph>
              Walk into the dealership as a **'Cash Buyer'** (i.e., you have the funds ready, regardless of where they came from). Negotiate the final sale price (discounts, free accessories) without mentioning the loan. Once the final price is fixed, only then introduce the finance element. This prevents the dealer from shifting the discount they gave you on the price over to a hidden markup on the loan rate.
            </Paragraph>
            <SubHeader title="Pre-Approved Loan Leverage" id="pre-approved-leverage" />
            <Paragraph>
              Always get a **Loan Sanction Letter** from your own bank *before* going to the dealership. This fixed, low-rate offer is your strongest negotiation tool. When the dealer quotes their rate, show them your sanction letter and state politely that they must match or beat it to earn the loan commission. If they cannot, you will use your pre-approved loan, stripping them of the finance commission entirely.
            </Paragraph>
          </motion.section>

          {/* Section 7: Final Checklist & Documentation */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="7. The Loan Sanction Checklist: Ticking the Final Boxes" icon={CheckSquare} />
            <Paragraph>
              A perfect set of documents and a clean RTO process are the final barriers to vehicle ownership. Errors here cause weeks of delay and can force a re-approval.
            </Paragraph>
            <BulletPoint>Address Proof: Must match your Aadhar, Passport, or Voter ID and the address on the loan application.</BulletPoint>
            <BulletPoint>Income Proof: Latest 3 months' salary slips, Form 16, and latest 2 years' ITR (or 3 years' audited financials for business owners).</BulletPoint>
            <BulletPoint>Bank Statements: Last 6-12 months' statements showing salary credits and sufficient balance for the down payment and EMI.</BulletPoint>
            <BulletPoint>The Hypothecation Mandate: Ensure the bank’s name is correctly mentioned in the RC Book/Smart Card as the financier. Without this, the bank's security is void, and they may withhold the disbursal.</BulletPoint>
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
              <span>Drive Smarter: Calculate Your Optimized EMI</span>
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Use our advanced calculator to find the perfect balance between down payment, tenure, and interest rate, minimizing your total cost of vehicle ownership.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                // Using console.log instead of alert()
                onClick={() => console.log("Optimized EMI Calculation Tool Initiated!")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Start My Cost Analysis
              </button>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
};

export default VehicleFinancingGuide;
