import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  XOctagon, // Used for the main icon - Caution/Mistake
  EyeOff, // Used for Hidden Costs
  Scale, // Used for DTI/FOIR Miscalculation
  BarChart, // Used for Income Documentation
  Wallet, // Used for Down Payment Mistakes
  Timer, // Used for Hard Inquiry Timing
  Users, // Used for Co-applicant/Relationship Mistakes
  FileText, // Used for Documentation Errors
  ShieldOff, // Used for Insurance/Protection
  AlertTriangle, // Used for Repayment/Tenure Mismatch
  Target, // Used for CTA
} from "lucide-react";
// NOTE: Assuming Link is imported from react-router-dom, which is available in the user's environment.
import { Link } from "react-router-dom"; 

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "Top 10 Mistakes to Avoid When Applying for a Home Loan";
const ARTICLE_SUBTITLE =
  "The Essential Pre-Application Checklist: How Indian Borrowers Can Navigate Documentation Errors, DTI Traps, and Hidden Costs to Secure the Lowest Interest Rate.";
const BACK_LINK = "/blogs/finance-strategy"; 
const AUTHOR = "Real Estate Finance Strategist";
const DATE = "Dec 5, 2025";
const READ_TIME = "28 min read (The Risk Mitigation Guide)"; 
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
const SectionHeader = ({ title, icon: Icon }) => (
  <motion.div 
    className="flex items-center space-x-4 mb-6 pt-4 border-t border-gray-200/50"
    variants={itemVariants}
  >
    <Icon className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0" />
    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
      {title}
    </h2>
  </motion.div>
);

// Component for Sub Headers
const SubHeader = ({ title, id }) => (
  <motion.h3 
    id={id}
    className="text-2xl font-bold mt-10 mb-4 text-red-700 dark:text-red-300"
    variants={itemVariants}
  >
    {title}
  </motion.h3>
);

// Component for Standard Paragraphs (with motion)
const Paragraph = ({ children }) => (
  <motion.p 
    className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
    variants={itemVariants}
  >
    {children}
  </motion.p>
);

// Component for Bullet Points (Using XOctagon for emphasis on mistakes)
const BulletPoint = ({ children }) => (
  <motion.li 
    className="flex items-start mb-3 text-lg text-gray-700 dark:text-gray-300"
    variants={itemVariants}
  >
    <XOctagon className="w-5 h-5 mt-1 mr-3 text-red-500 flex-shrink-0" />
    <span>{children}</span>
  </motion.li>
);

// Component for Key Takeaways/Tips (Renamed to 'Mistake Alert')
const MistakeAlert = ({ children }) => (
  <motion.div
    className="mt-6 mb-6 p-5 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg shadow-md"
    variants={itemVariants}
  >
    <p className="font-semibold text-red-800 dark:text-red-200">
      <span className="font-extrabold mr-2">🚨 MISTAKE ALERT:</span>
      {children}
    </p>
  </motion.div>
);

// ====================================================================
// MAIN COMPONENT
// ====================================================================

const HomeLoanMistakes = () => {
  // Custom modal/message box function instead of alert()
  const handlePreCheck = () => {
    const messageBox = document.getElementById('message-box');
    const messageText = document.getElementById('message-text');
    
    if (messageBox && messageText) {
      messageText.textContent = "Personalized Home Loan Pre-Approval Initiated! (This would typically navigate to a separate form or open a modal in a real app.)";
      messageBox.classList.remove('hidden');
      setTimeout(() => {
        messageBox.classList.add('hidden');
      }, 4000);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-12 pb-20 font-inter">
      
      {/* Custom Message Box for Alert replacement */}
      <div id="message-box" className="hidden fixed top-5 right-5 z-50 p-4 bg-green-500 text-white rounded-lg shadow-xl transition-all duration-300 transform scale-100">
          <p id="message-text" className="font-semibold"></p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Back Link */}
        {/* Note: In a live environment, the Link component would require 'react-router-dom' to be fully functional. */}
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-500 dark:from-red-400 dark:to-pink-300">
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

          {/* Section 1: Ignoring Your Credit Profile */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="1. Ignoring or Not Fixing Your CIBIL Score and Report" icon={XOctagon} />
            <Paragraph>
              The biggest mistake is applying for a home loan without first pulling and scrutinizing your own credit report. Banks use your **CIBIL score** (and report) to determine not just approval, but also your **Risk-Based Pricing (RBP)**. A single error or oversight can cost you lakhs in excess interest over a 20-year tenure. [Image of CIBIL score graph with 750+ highlighted]
            </Paragraph>
            <SubHeader title="The Cost of a Low Score" id="cost-low-score" />
            <Paragraph>
              A score of **750+** qualifies you for the prime lending rate. Dropping even 20 points below that threshold can push you into a higher interest bracket (e.g., 0.25% higher). On a ₹50 Lakh loan for 20 years, a 0.25% difference is approximately ₹1.5 Lakh in extra interest paid. Never apply before your score is optimized.
            </Paragraph>
            <MistakeAlert>
              **Mistake to Avoid:** Applying immediately after clearing old debt or settling a dispute. Always wait **45-60 days** for the credit bureau to update the CIBIL report and generate a new, optimized score before initiating a **hard inquiry**.
            </MistakeAlert>
            <SubHeader title="The Active Debt Trap" id="active-debt-trap" />
            <Paragraph>
              Check that all credit cards or personal loans you paid off are marked as 'Closed' or 'Settled - Zero Balance' on your report. An old, active account with a zero balance still increases the bank's perceived risk, as you have available, unused credit that could potentially be drawn down after the home loan is sanctioned.
            </Paragraph>
          </motion.section>

          {/* Section 2: Miscalculating the DTI/FOIR */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="2. Misjudging Your Debt-to-Income (DTI) or FOIR" icon={Scale} />
            <Paragraph>
              Lenders use the **Fixed Obligation to Income Ratio (FOIR)** to gauge your repayment capacity. Most borrowers only count existing EMIs. The mistake is forgetting to factor in the **proposed home loan EMI** and other hidden commitments.
            </Paragraph>
            <SubHeader title="The Invisible DTI Killers" id="invisible-dti-killers" />
            <Paragraph>
              The bank calculates your DTI by dividing your total monthly obligations (existing EMIs + proposed EMI) by your Net Monthly Income (NMI). Common omissions that destroy your FOIR:
              <ul className="list-disc ml-6 mt-3 space-y-2">
                <BulletPoint>Credit Card Outstanding: Banks typically calculate **5% of your total limit** or outstanding balance as a monthly obligation, even if you pay the full amount on time.</BulletPoint>
                <BulletPoint>Guaranteed Loans: If you have co-signed or guaranteed another person's loan, the entire EMI is counted against your DTI.</BulletPoint>
                <BulletPoint>Unreported Income: Relying on bonuses, overtime, or variable income that cannot be consistently documented over 24 months is a DTI risk.</BulletPoint>
              </ul>
            </Paragraph>
            <Paragraph>
              For prime eligibility, your FOIR (including the new home loan EMI) should ideally be under **40%**. Anything above 50% guarantees a rejection or a mandated reduction in loan amount.
            </Paragraph>
          </motion.section>

          {/* Section 3: Incomplete/Inconsistent Documentation */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="3. Providing Inconsistent Income and Bank Statements" icon={BarChart} />
            <Paragraph>
              Inconsistencies signal risk and fraud potential. Banks require documents that tell a unified story across three primary data points: **Income Tax Returns (ITR)**, **Bank Statements**, and **Salary Slips/Form 16**.
            </Paragraph>
            <SubHeader title="The Bank Statement-ITR Mismatch" id="statement-itr-mismatch" />
            <Paragraph>
              A classic self-employed mistake is showing high income in the ITR but showing low average monthly balances (AMB) or frequent bounced cheques in bank statements. Conversely, a salaried individual whose ITR and Form 16 show one income, but whose bank statements show large, undocumented, irregular cash deposits, will raise red flags. The bank assumes your lowest reported, verified income is your actual capacity.
            </Paragraph>
            <MistakeAlert>
              **Mistake to Avoid:** Making large, unexplained cash deposits (especially ₹50,000+) into your bank account in the 6 months leading up to the application. All funds should be routed through traceable, legitimate channels to avoid scrutiny by the underwriting team.
            </MistakeAlert>
          </motion.section>

          {/* Section 4: Underestimating Down Payment Costs */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="4. Mistaking LTV for the Total Cash Required" icon={Wallet} />
            <Paragraph>
              **Loan-to-Value (LTV)** is the percentage of the property's market value the bank will finance (usually 75%-90%). The common mistake is assuming the down payment (the remaining 10%-25%) is the only cash needed upfront. 
            </Paragraph>
            <SubHeader title="The Hidden Cash Outflow" id="hidden-cash-outflow" />
            <Paragraph>
              You must budget for the down payment PLUS:
              <ul className="list-disc ml-6 mt-3 space-y-2">
                <BulletPoint>Stamp Duty & Registration: Varies by state but can be **5% to 7%** of the property value, paid upfront.</BulletPoint>
                <BulletPoint>Processing Fees: Typically 0.5% to 1.5% of the loan amount (though negotiable).</BulletPoint>
                <BulletPoint>Legal and Technical Verification Fees: The cost of the bank's lawyers and engineers to verify the property title and structure.</BulletPoint>
                <BulletPoint>GST/Maintenance Deposits: For under-construction properties.</BulletPoint>
              </ul>
            </Paragraph>
            <Paragraph>
              A ₹1 Crore flat might require ₹25 Lakh as a down payment (25% LTV), but the actual cash required upfront could easily be **₹32-35 Lakh** after all statutory and bank charges. Failing to have this buffer is a deal-killer.
            </Paragraph>
          </motion.section>

          {/* Section 5: Applying to Multiple Banks at Once */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="5. Triggering Too Many Hard Inquiries in a Short Span" icon={Timer} />
            <Paragraph>
              A **Hard Inquiry** is a formal application check that lowers your CIBIL score. Applying to 4-5 banks simultaneously is a red flag indicating you are either desperate or have been rejected multiple times.
            </Paragraph>
            <SubHeader title="The 'Credit Hungry' Label" id="credit-hungry-label" />
            <Paragraph>
              Loan algorithms penalize borrowers who appear "credit-hungry." Multiple inquiries within 3-6 months can reduce your score by 15-30 points, which can be the difference between a prime rate (7.85%) and a sub-prime rate (8.10%).
            </Paragraph>
            <Paragraph>
              **The Fix:** Use only one Hard Inquiry for the best pre-qualified offer. If you must shop around, ensure all Hard Inquiries are clustered within a **14 to 45-day window** for the CIBIL scoring model to potentially count them as a single rate-shopping event.
            </Paragraph>
          </motion.section>

          {/* Section 6: Not Leveraging Co-Applicant Income */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="6. Not Using a High-Earning Co-Applicant Strategically" icon={Users} />
            <Paragraph>
              Many borrowers neglect to bring on a co-applicant (spouse, parent, etc.) to boost their eligibility, even when they could. This is a mistake, as a co-applicant significantly enhances the **Aggregate FOIR** and loan amount capacity.
            </Paragraph>
            <SubHeader title="The Spouse Advantage" id="spouse-advantage" />
            <Paragraph>
              The most powerful co-applicant is a working spouse. Not only does their income increase the maximum loan amount you can qualify for, but their addition also often qualifies you for a better interest rate, especially if they have a pristine CIBIL history. Furthermore, in India, including a female co-applicant can sometimes yield a minor interest rate concession (e.g., 0.05%) from public sector banks.
            </Paragraph>
          </motion.section>

          {/* Section 7: Applying After Switching Jobs */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="7. Applying Immediately After a Major Career/Job Change" icon={FileText} />
            <Paragraph>
              Stability is paramount. Banks are looking for a minimum of 2 years of work experience, with at least **6-12 months** in the current organization for salaried applicants. For self-employed, 3 years of audited financials are standard.
            </Paragraph>
            <MistakeAlert>
              **Mistake to Avoid:** Applying within the **probation period** (typically 3-6 months) of a new job. An unconfirmed, probationary employee is a high risk, and the application will likely be rejected outright or delayed until confirmation is received. Wait until you have at least one confirmed salary slip from the new employer.
            </MistakeAlert>
          </motion.section>

          {/* Section 8: Focusing Only on the Rate */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="8. Focusing Only on the Interest Rate and Ignoring Other Costs" icon={EyeOff} />
            <Paragraph>
              The quoted interest rate (e.g., 7.85%) is critical, but it's not the only factor determining the total cost. Focusing solely on a 0.05% rate difference and ignoring other costs is a costly mistake.
            </Paragraph>
            <SubHeader title="The APR vs. Nominal Rate" id="apr-vs-nominal-rate" />
            <Paragraph>
              The **Annual Percentage Rate (APR)** is the true cost of borrowing, as it factors in the processing fees, administrative costs, and the nominal interest rate. A bank offering a slightly lower nominal rate but charging a 1.5% processing fee might be more expensive than a bank offering a slightly higher rate but waiving the fee. Always compare the **APR**, not just the nominal rate. 
            </Paragraph>
          </motion.section>

          {/* Section 9: Skipping Loan Protection Insurance */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="9. Rejecting or Skipping the Mandatory Loan Protection/Term Insurance" icon={ShieldOff} />
            <Paragraph>
              While not a mistake that causes rejection, skipping **loan protection insurance** (often bundled or mandated by the bank) can be a catastrophic financial mistake for your family.
            </Paragraph>
            <SubHeader title="Risk to Family vs. Cost" id="risk-vs-cost" />
            <Paragraph>
              If the primary borrower passes away or becomes permanently disabled, this insurance repays the outstanding loan amount to the bank. Without it, the entire debt burden falls on the legal heirs, often forcing a distress sale of the house.
              <ul className="list-disc ml-6 mt-3 space-y-2">
                <BulletPoint>Be Smart: You can often buy a cheaper equivalent term insurance policy externally instead of accepting the bank’s bundled, often expensive, product.</BulletPoint>
                <BulletPoint>Do Not Skip: Ensure the policy covers the full loan amount and the full loan tenure, whether you buy it from the bank or an external insurer.</BulletPoint>
              </ul>
            </Paragraph>
          </motion.section>

          {/* Section 10: Mismatching Tenure to Life Goals */}
          <motion.section variants={itemVariants}>
            <SectionHeader title="10. Mismatching Loan Tenure and Expected Repayment" icon={AlertTriangle} />
            <Paragraph>
              Choosing the wrong loan tenure is a classic error. While a 30-year loan gives you the lowest EMI (highest eligibility), it results in the maximum interest paid. A 15-year loan saves interest but results in a higher EMI (lower eligibility).
            </Paragraph>
            <SubHeader title="The Optimal Tenure Sweet Spot" id="optimal-tenure" />
            <Paragraph>
              **The Fix:** Choose the longest possible tenure (e.g., 25-30 years) to maximize your eligibility and keep the EMI low. However, use the bank's **pre-payment clause** to pay extra principal every year. Since most Indian home loans allow zero pre-payment penalty after the first year, this strategy gives you the best of both worlds: low initial EMI/high eligibility, and the ability to reduce the tenure to your desired 15-20 years, saving massive interest.
            </Paragraph>
            <MistakeAlert>
              **Mistake to Avoid:** Choosing a shorter tenure solely to save interest if the resulting EMI stretches your monthly budget beyond 40% of your NMI. Prioritize cash flow safety over marginal interest savings.
            </MistakeAlert>
          </motion.section>


          {/* CTA Section */}
          <motion.section
            className="text-center mt-16 p-8 bg-gradient-to-r from-red-600 to-pink-700 rounded-2xl shadow-xl"
            variants={pageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg flex items-center justify-center space-x-3"
              variants={itemVariants}
            >
              <Target className="w-8 h-8 text-yellow-300" />
              <span>Fix Your Profile: Get Pre-Approved Now</span>
            </motion.h2>
            <motion.p
              className="text-lg text-pink-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Have you avoided the 10 critical mistakes? Use our expert tool to check your DTI, verify your CIBIL profile, and receive a secure, rate-optimized home loan pre-approval estimate in minutes.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={handlePreCheck}
                className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Start My Home Loan Pre-Check
              </button>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
};

export default HomeLoanMistakes;
