import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  IndianRupee, 
  Calculator, 
  TrendingUp, 
  CreditCard, 
  Calendar, 
  ShieldCheck, 
  Zap, 
} from "lucide-react";
import { Link } from "react-router-dom"; 

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "Car Loan Interest Rates 2025 + The Ultimate EMI Calculator Guide";
const ARTICLE_SUBTITLE =
  "Navigating the Auto Finance Landscape: A 2025 outlook on the lowest rates in India, critical factors determining your eligibility, and decoding the EMI amortization schedule.";
const BACK_LINK = "/blogs/finance-strategy"; 
const AUTHOR = "Insider Banking Analyst";
const DATE = "Nov 19, 2025";
const READ_TIME = "20 min read (Financial Engineering)"; 
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
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const ArticleHeader = ({ title, subtitle, author, date, readTime }: { title: string, subtitle: string, author: string, date: string, readTime: string }) => (
  <header className="mb-12 text-center">
    {/* Assuming Link is available (e.g., react-router-dom) */}
    <Link to={BACK_LINK} className="text-blue-300 hover:text-blue-100 transition duration-300 inline-flex items-center mb-4">
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Finance Strategy
    </Link>
    <motion.h1 
      className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {title}
    </motion.h1>
    <motion.p 
      className="text-xl text-blue-200 mb-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {subtitle}
    </motion.p>
    <motion.div 
      className="text-sm text-blue-400 flex justify-center space-x-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <span>By **{author}**</span>
      <span>•</span>
      <span>{date}</span>
      <span>•</span>
      <span>{readTime}</span>
    </motion.div>
  </header>
);

const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <motion.h2
    className="text-3xl sm:text-4xl font-extrabold text-yellow-400 mb-6 mt-12 border-b border-indigo-700 pb-3 flex items-center space-x-3"
    variants={itemVariants}
  >
    <Icon className="w-7 h-7 text-indigo-400" />
    <span>{title}</span>
  </motion.h2>
);

const SubHeader = ({ title }: { title: string }) => (
  <motion.h3
    className="text-2xl font-bold text-white mt-8 mb-4"
    variants={itemVariants}
  >
    {title}
  </motion.h3>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <motion.p
    className="text-lg text-blue-100 mb-5 leading-relaxed"
    variants={itemVariants}
  >
    {children}
  </motion.p>
);

const KeyTakeaway = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="bg-indigo-800/40 border-l-4 border-yellow-400 p-4 mb-6 shadow-xl rounded-lg"
    variants={itemVariants}
  >
    <p className="font-semibold text-yellow-300 flex items-start">
      <Zap className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
      <span className="text-lg text-white">**Key Takeaway:** {children}</span>
    </p>
  </motion.div>
);

const BulletPoint = ({ children }: { children: React.ReactNode }) => (
  <motion.li 
    className="text-lg text-blue-100 mb-3 ml-5 list-disc"
    variants={itemVariants}
  >
    {children}
  </motion.li>
);

// ====================================================================
// MAIN PAGE COMPONENT
// ====================================================================

const CarLoanInterestRatesPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <motion.article 
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={pageVariants}
        >
          
          {/* ARTICLE HEADER */}
          <ArticleHeader 
            title={ARTICLE_TITLE}
            subtitle={ARTICLE_SUBTITLE}
            author={AUTHOR}
            date={DATE}
            readTime={READ_TIME}
          />
          
          <Paragraph>
            For many, buying a car is the second biggest financial decision after purchasing a home. In 2025, the Indian auto loan market continues to be highly competitive, but the complexity of interest rates and the sheer volume of loan offers can make decision-making stressful.
          </Paragraph>
          <Paragraph>
            This insider guide breaks down the **2025 Car Loan Interest Rate Outlook**, shows you how to strategically secure the **lowest possible rate**, and provides a deep dive into the **EMI calculation formula** and the essential **Amortization Schedule** used by banks. Understanding these mechanics is the ultimate trick to financial empowerment.
          </Paragraph>

          {/* ---------------------------------------------------------------- */}
          {/* SECTION 1: 2025 INTEREST RATE OUTLOOK & MARKET SNAPSHOT */}
          {/* ---------------------------------------------------------------- */}

          <motion.section 
            variants={pageVariants}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader icon={TrendingUp} title="The 2025 Auto Loan Rate Outlook: Where the Market Stands" />

            <Paragraph>
              The Reserve Bank of India's (RBI) monetary policy decisions are the primary driver of car loan rates. As of late 2025, while major central bank rates have maintained relative stability, competition among Public Sector Banks (PSBs) and Private Banks has kept the entry-level rates highly attractive.
            </Paragraph>
            <KeyTakeaway>
              The lowest current new car loan rates from top PSBs are starting from **7.60% p.a. to 7.80% p.a. onwards** for top-tier credit profiles. Private banks generally start slightly higher but offer faster processing.
            </KeyTakeaway>

            <SubHeader title="Rate Range Comparison (New Car Loans - Indicative)" />
            {/* FIX APPLIED HERE: Changed div to motion.div and corrected the closing tag from </motion.table> to </table> */}
            <motion.div className="overflow-x-auto mb-6" variants={itemVariants}>
              <table className="min-w-full bg-indigo-900/50 rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-indigo-700/70 text-sm">
                    <th className="px-4 py-3 text-left text-white">Lender Type</th>
                    <th className="px-4 py-3 text-left text-white">Indicative Rate Range (p.a.)</th>
                    <th className="px-4 py-3 text-left text-white">Common Processing Fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-indigo-700">
                    <td className="px-4 py-3 text-blue-200 font-medium">Public Sector Banks (SBI, UBI, PNB, Canara)</td>
                    <td className="px-4 py-3 text-yellow-300">**7.60% to 9.70%**</td>
                    <td className="px-4 py-3 text-blue-200">Often Nil or Low (Rs. 1,000 - Rs. 5,000)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-blue-200 font-medium">Private Banks (HDFC, ICICI, Axis)</td>
                    <td className="px-4 py-3 text-yellow-300">**8.50% to 11.50%**</td>
                    <td className="px-4 py-3 text-blue-200">0.50% to 1.00% of Loan Amount</td>
                  </tr>
                  <tr className="bg-indigo-900/20">
                    <td className="px-4 py-3 text-blue-200 font-medium">Non-Banking Finance Companies (NBFCs)</td>
                    <td className="px-4 py-3 text-yellow-300">**10.00% to 14.00%**</td>
                    <td className="px-4 py-3 text-blue-200">Higher, varies widely</td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
          </motion.section>

          {/* ---------------------------------------------------------------- */}
          {/* SECTION 2: NEW VS. USED & FIXED VS. FLOATING RATES */}
          {/* ---------------------------------------------------------------- */}

          <motion.section 
            variants={pageVariants}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader icon={IndianRupee} title="New Car vs. Used Car Rates: The Hidden Cost of Depreciation" />

            <Paragraph>
              A key differential in rate offerings is the type of vehicle being financed. Banks perceive **Used Car Loans** as significantly riskier because the vehicle’s collateral value depreciates faster and its maintenance history is unknown.
            </Paragraph>

            <SubHeader title="The Used Car Premium" />
            <Paragraph>
              Expect used car loan interest rates to be **3% to 5% higher** than new car rates. For example, if a new car rate starts at 7.60% p.a., a used car loan for the same borrower might start at **11.25% p.a.** and go up to 18% based on the car's age and model.
            </Paragraph>

            <SubHeader title="Fixed vs. Floating Interest Rate: Which is Right?" />
            <ul className="space-y-3">
              <BulletPoint>
                **Fixed Rate:** The interest rate remains constant for the entire loan tenure. This provides **predictable EMIs** and is ideal if you anticipate market rates may rise. Most car loans in India are offered on a fixed-rate basis for stability.
              </BulletPoint>
              <BulletPoint>
                **Floating Rate:** The rate fluctuates based on a benchmark (like MCLR or RLLR). While the starting rate might be marginally lower, your EMI will change. This option is typically less common for standard car loans but may be offered by some lenders.
              </BulletPoint>
            </ul>
          </motion.section>

          {/* ---------------------------------------------------------------- */}
          {/* SECTION 3: 5 CRITICAL FACTORS THAT DETERMINE *YOUR* RATE */}
          {/* ---------------------------------------------------------------- */}

          <motion.section 
            variants={pageVariants}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader icon={CreditCard} title="Decoding Your Rate: 5 Factors Banks Score You On" />
            <Paragraph>
              No two borrowers receive the exact same rate. Your final rate is determined by an internal risk assessment where lenders weigh several crucial factors. Mastering these is essential to negotiating the best deal.
            </Paragraph>

            <SubHeader title="1. Credit Score (The Non-Negotiable)" />
            <Paragraph>
              A **CIBIL Score of 750 or above** is the gateway to the lowest bracket of rates. Scores of 800+ often qualify for special concessions. Lenders see a high score as proof of repayment discipline, directly translating to a lower risk premium and thus, a lower rate.
            </Paragraph>

            <SubHeader title="2. Loan Tenure (The Interest Multiplier)" />
            <Paragraph>
              Shorter tenures (**3 to 5 years**) often attract a better interest rate than the maximum tenure (usually 7 years). While a longer tenure reduces your EMI, it significantly increases the total interest paid over the life of the loan.
            </Paragraph>

            <SubHeader title="3. Down Payment (Reducing the Risk Burden)" />
            <Paragraph>
              Banks typically finance 80% to 90% of the ex-showroom price. Paying a higher down payment (e.g., 20% instead of 10%) reduces the principal amount borrowed, lowering the bank's risk exposure. This proactive step gives you leverage to demand a better rate.
            </Paragraph>

            <SubHeader title="4. Debt-to-Income Ratio (DTI/FOIR)" />
            <Paragraph>
              Your Fixed Obligation to Income Ratio (**FOIR**) should ideally be **under 40%**. This ratio measures your total monthly debt payments (including the proposed car EMI) against your net monthly income. A low DTI signals a high capacity to manage new debt, which banks reward with better terms.
            </Paragraph>

            <SubHeader title="5. Existing Banking Relationship" />
            <Paragraph>
              Never ignore your current bank. If you hold a long-term savings or salary account, an existing home loan, or a history of fixed deposits, your bank may offer a **"Loyalty Rate"**—a small, guaranteed concession (e.g., 0.25% to 0.50% lower than the rack rate).
            </Paragraph>
          </motion.section>

          {/* ---------------------------------------------------------------- */}
          {/* SECTION 4: THE EMI CALCULATOR DECODED (THE FORMULA) */}
          {/* ---------------------------------------------------------------- */}

          <motion.section 
            variants={pageVariants}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader icon={Calculator} title="The EMI Calculator Guide: Understanding the Math" />
            <Paragraph>
              The Equated Monthly Installment (**EMI**) is the fixed payment you make to the lender on a specified date each month. It comprises two parts: the **Principal** repayment and the **Interest** component. The calculation is based on a reducing balance method.
            </Paragraph>

            <SubHeader title="The Universal EMI Formula" />
            <Paragraph>
              While online calculators make it easy, knowing the formula empowers you to verify your loan offers.
            </Paragraph>
            
            <motion.div variants={itemVariants} className="bg-gray-800/70 p-6 rounded-lg my-6 overflow-x-auto shadow-inner">
              <pre className="text-yellow-400 font-mono text-sm sm:text-lg whitespace-pre-wrap">
                <code>
                  EMI = P \times R \times (1 + R)^N / [(1 + R)^N - 1]
                </code>
              </pre>
            </motion.div>
            
            

            <SubHeader title="Defining the Variables" />
            <ul className="space-y-3">
              <BulletPoint>
                **P (Principal):** The original loan amount sanctioned.
              </BulletPoint>
              <BulletPoint>
                **N (Tenure):** The number of monthly installments (e.g., 5 years = 60 months).
              </BulletPoint>
              <BulletPoint>
                **R (Monthly Interest Rate):** Calculated as (Annual Interest Rate / 12 / 100).
                <p className="text-sm text-blue-300 italic mt-1 ml-4">
                  *Example: If the annual rate is 9.6% p.a., then R = 9.6 / 12 / 100 = 0.008.*
                </p>
              </BulletPoint>
            </ul>
          </motion.section>

          {/* ---------------------------------------------------------------- */}
          {/* SECTION 5: THE AMORTIZATION SCHEDULE */}
          {/* ---------------------------------------------------------------- */}

          <motion.section 
            variants={pageVariants}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader icon={Calendar} title="Mastering the Amortization Schedule" />
            <Paragraph>
              The Amortization Schedule is the hidden map of your loan. It's a complete table showing how every single EMI payment is split between **Principal** and **Interest** over the entire tenure. This is critical for prepayment planning.
            </Paragraph>

            <SubHeader title="Interest Front-Loading: The Reality" />
            <Paragraph>
              In the early months (and years) of your car loan, the largest portion of your EMI goes towards paying the **Interest**. As the loan matures, the principal component gradually increases, and the interest component decreases.
            </Paragraph>
            <KeyTakeaway>
              Because of interest front-loading, any prepayment or foreclosure is most financially effective **in the first two years** of the loan. This is when the maximum amount of interest is yet to be charged.
            </KeyTakeaway>

            <SubHeader title="Visualising the Split" />
            <Paragraph>
              
              The schedule visually demonstrates the reducing balance method. Each payment reduces the remaining principal, meaning the next month's interest is calculated on a smaller outstanding amount.
            </Paragraph>
          </motion.section>

          {/* ---------------------------------------------------------------- */}
          {/* SECTION 6: THE SMART BORROWER CHECKLIST */}
          {/* ---------------------------------------------------------------- */}

          <motion.section 
            variants={pageVariants}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader icon={ShieldCheck} title="The Smart Borrower's Checklist: Securing the Best Deal" />
            <Paragraph>
              Armed with the rate outlook and the EMI knowledge, here are the steps to ensure you secure a rate at the lower end of the spectrum and minimize total cost.
            </Paragraph>

            <SubHeader title="1. Time Your Application Strategically" />
            <ul className="space-y-3">
              <BulletPoint>
                **Festival Waivers:** Many banks, especially PSBs, offer **100% processing fee waivers** during festive periods (e.g., Diwali, New Year) or at the end of financial quarters. This can save you thousands upfront.
              </BulletPoint>
              <BulletPoint>
                **Fiscal Year Ends:** Rates can sometimes soften in the last month of the fiscal year (March) as banks push to meet lending targets.
              </BulletPoint>
            </ul>
            
            <SubHeader title="2. Negotiate Processing Fees, Not Just the Rate" />
            <Paragraph>
              While it's difficult to negotiate the base interest rate, you have leverage on fees. Use a competitor’s low processing fee offer (e.g., SBI or UCO Bank's Nil fee) to ask your preferred lender to match or waive theirs.
            </Paragraph>

            <SubHeader title="3. Calculate the True Total Cost" />
            <Paragraph>
              Don't just look at the EMI. A full comparison must include: **Total Interest Paid + Processing Fees + Documentation Charges**. A loan with a marginally higher EMI but zero processing fees and a shorter tenure often results in a lower total payout.
            </Paragraph>

            <KeyTakeaway>
              Use the **20/4/10 Rule** as a financial guideline: Aim for a **20% Down Payment**, finance for no more than **4 Years**, and keep the total monthly EMI under **10% of your net monthly income**.
            </KeyTakeaway>
          </motion.section>

          {/* ---------------------------------------------------------------- */}
          {/* FINAL CALL TO ACTION (Replicating the original structure) */}
          {/* ---------------------------------------------------------------- */}
          <motion.section 
            className="bg-indigo-700/60 p-10 rounded-xl mt-16 text-center shadow-2xl transform hover:scale-[1.01] transition duration-500"
            variants={pageVariants}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg flex items-center justify-center space-x-3"
              variants={itemVariants}
            >
              <Zap className="w-8 h-8 text-yellow-300" />
              <span>Implement the Strategy: Get Your Personalized Rate Comparison</span>
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Don't settle for the first rate. Use our quick comparison tool to see the best Car Loan rates (Fixed & Floating) across top banks, personalized to your credit profile, in under 3 minutes.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                // Replaced alert() with a console log or custom message box logic if required in a real app
                onClick={() => console.log("Personalized Car Loan Rate Comparison Initiated!")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Find My Best Car Loan Rate Now
              </button>
            </motion.div>
          </motion.section>

        </motion.article>

      </div>
    </div>
  );
};

export default CarLoanInterestRatesPage;
