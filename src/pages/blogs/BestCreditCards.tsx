import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Gift, IndianRupee, Zap, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom"; 

// --- CONFIGURATION START ---
const ARTICLE_TITLE = "Best Credit Cards in India 2025: Rewards, Cashback, Fees & Features";
const ARTICLE_SUBTITLE =
  "Your ultimate guide to selecting the top credit card tailored to your lifestyle—from maximum cashback to premium travel benefits and low-interest options. Maximize your financial potential.";
const BACK_LINK = "/blogs/banking-guides"; 
const AUTHOR = "Advanced Financial Analytics Team";
const DATE = "Dec 10, 2025";
const READ_TIME = "30 min read";
// --- CONFIGURATION END ---

// Framer Motion variants (Reused for consistent, smooth interaction)
const pageVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 14,
    },
  },
};

// Reusable components
const SectionHeader: React.FC<{ title: string; icon: React.ElementType }> = ({ title, icon: Icon }) => (
  <motion.h2
    className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-12 mb-6 pt-4 border-t-2 border-green-100 flex items-center"
    variants={itemVariants}
  >
    <Icon className="w-8 h-8 mr-3 text-green-700" />
    {title}
  </motion.h2>
);

const SubHeader: React.FC<{ title: string }> = ({ title }) => (
  <motion.h3
    className="text-2xl font-bold text-gray-800 mt-8 mb-4 border-l-4 border-teal-400 pl-3"
    variants={itemVariants}
  >
    {title}
  </motion.h3>
);

const BulletPoint: React.FC<{ text: string; strong?: boolean }> = ({ text, strong = false }) => (
  <motion.li
    className="flex items-start mb-2 text-gray-700 leading-relaxed"
    variants={itemVariants}
  >
    <Zap className="w-5 h-5 mr-3 mt-1 text-yellow-500 flex-shrink-0" />
    <span>{strong ? <strong>{text}</strong> : text}</span>
  </motion.li>
);

// --- MAIN COMPONENT ---
const BestCreditCardsPage: React.FC = () => (
  <motion.div
    className="min-h-screen bg-gradient-to-br from-white/60 to-green-50/80 py-12 px-4 md:px-12 font-inter"
    variants={pageVariants}
    initial="hidden"
    animate="visible"
  >
    <div className="max-w-5xl mx-auto">
      {/* Back Link */}
      <motion.div variants={itemVariants} className="mb-8">
        <Link
          to={BACK_LINK}
          className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Expert Banking Guides
        </Link>
      </motion.div>

      {/* Article Header (SEO H1) */}
      <motion.header variants={itemVariants} className="mb-10 pb-6 border-b border-green-300">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-4 drop-shadow-sm bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-700 leading-tight">
          {ARTICLE_TITLE}
        </h1>
        <p className="text-xl text-gray-700 leading-relaxed italic mt-4">
          {ARTICLE_SUBTITLE}
        </p>
        <div className="flex text-sm text-gray-500 mt-6 space-x-6">
          <span>By <strong>{AUTHOR}</strong></span>
          <span>•</span>
          <span>{DATE}</span>
          <span>•</span>
          <span>{READ_TIME}</span>
        </div>
      </motion.header>

      {/* Article Content */}
      <article className="text-gray-800 leading-relaxed space-y-8">
        
        <motion.p variants={itemVariants} className="text-xl font-semibold p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
          A credit card is more than just a payment tool—it's a financial instrument that, when used correctly, can unlock substantial savings, premium travel experiences, and exclusive privileges. For 2025, the market is competitive. We cut through the noise to help you find the card that perfectly matches your spending profile, maximizing your **Rewards** and **Cashback**.
        </motion.p>
        
        {/* SECTION 1: Foundations of Card Selection */}
        <SectionHeader title="1. The Foundation: Matching Cards to Your Spending Profile" icon={CreditCard} />
        
        <SubHeader title="1.1. Key Metrics Beyond Interest Rate" />
        <motion.p variants={itemVariants}>
          When choosing a credit card, look beyond the Annual Percentage Rate (APR). The true value lies in the **Net Value Proposition (NVP)**—the total monetary value of rewards, cashback, and perks minus the annual fee and potential costs.
        </motion.p>
        <ul className="list-none space-y-3">
          <BulletPoint text="<strong>Reward Rate:</strong> The percentage return on spend, including accelerated points/miles on specific categories (e.g., dining, travel)." />
          <BulletPoint text="<strong>Redemption Value:</strong> How much one reward point is worth, especially when redeemed for flights or hotel bookings (often $1 = ₹0.50 to ₹1.00)." />
          <BulletPoint text="<strong>Waiver Criteria:</strong> The spending threshold required to get the annual fee waived. Crucial for calculating the card's actual cost." />
        </ul>

        <SubHeader title="1.2. Identifying Your Primary Spending Category" />
        <motion.p variants={itemVariants}>
          The best card is the one that rewards your highest spending area the most.
        </motion.p>
        <motion.div variants={itemVariants} className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
            <thead className="bg-teal-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Profile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Primary Need</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Optimal Card Type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <motion.tr variants={itemVariants}><td className="px-6 py-4"><strong>Frequent Traveler</strong></td><td className="px-6 py-4">Lounge access, Airline Miles, Forex Markup</td><td className="px-6 py-4">Premium Travel Cards (e.g., HDFC Infinia)</td></motion.tr>
              <motion.tr variants={itemVariants}><td className="px-6 py-4"><strong>Online Shopper</strong></td><td className="px-6 py-4">High discounts on Amazon/Flipkart, Instant Cashback</td><td className="px-6 py-4">Co-branded or dedicated Cashback Cards</td></motion.tr>
              <motion.tr variants={itemVariants}><td className="px-6 py-4"><strong>Budget Conscious</strong></td><td className="px-6 py-4">Zero joining/annual fee, simple flat cashback</td><td className="px-6 py-4">Lifetime Free (LTF) Cards or Entry-Level Cashback Cards</td></motion.tr>
            </tbody>
          </table>
        </motion.div>

        {/* SECTION 2: Top Card Categories for 2025 */}
        <SectionHeader title="2. The Best Credit Cards in India (Category-Wise)" icon={Gift} />

        <SubHeader title="2.1. Maximum Cashback Card (The Spend-and-Save King)" />
        <motion.p variants={itemVariants}>
          The focus here is simplicity and immediate savings. These cards offer a high, flat percentage return on all or select online spends, automatically credited to the statement.
        </motion.p>
        <motion.div variants={itemVariants} className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
          <strong>Recommended Card: Axis Bank ACE Credit Card</strong>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>5% Cashback on Utility Bills (highest in the segment).</li>
            <li>4% Cashback on Zomato, Swiggy, and Ola.</li>
            <li>1.5% Unlimited Cashback on all other spends.</li>
          </ul>
        </motion.div>

        <SubHeader title="2.2. Premium Travel Card (For the High-Net-Worth Jetsetter)" />
        <motion.p variants={itemVariants}>
          These cards justify high annual fees (₹10,000+) through unmatched luxury perks, including unlimited international lounge access, low Forex markup, and high-value conversion rates for flight miles.
        </motion.p>
        <motion.div variants={itemVariants} className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
          <strong>Recommended Card: HDFC Bank Diners Club Black / Infinia</strong>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>5X Reward Points on travel, dining, and shopping.</li>
            <li>Unlimited International & Domestic Lounge Access for primary and add-on users.</li>
            <li>Low Forex Markup (~2%) and complimentary golf rounds.</li>
          </ul>
        </motion.div>
        
        <SubHeader title="2.3. Fuel & Auto Spending Card (Daily Commute Savings)" />
        <motion.p variants={itemVariants}>
          Essential for car owners. These cards offer significant savings on fuel surcharge waivers and often come with discounts on maintenance or partner auto services.
        </motion.p>
        <motion.div variants={itemVariants} className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
          <strong>Recommended Card: IndianOil HDFC Bank Credit Card</strong>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>5% Cashback/Rewards on fuel spends at IndianOil outlets.</li>
            <li>Full 1% fuel surcharge waiver up to ₹250 per month.</li>
          </ul>
        </motion.div>


        {/* SECTION 3: Fees and Hidden Costs */}
        <SectionHeader title="3. The Cost of Credit: Understanding Fees and Charges" icon={IndianRupee} />

        <SubHeader title="3.1. Foreign Currency Markup Fee (The International Trap)" />
        <motion.p variants={itemVariants}>
          This fee is added by the bank on every international transaction (physical or online). Standard cards charge 3.5% to 4%. A premium travel card often charges only **1.5% to 2%**, leading to massive savings if you frequently transact in currencies other than the ₹.
        </motion.p>

        <SubHeader title="3.2. Revolving Interest Charges (The Biggest Mistake)" />
        <motion.p variants={itemVariants}>
          If you don't pay your bill in full, the bank levies interest, typically ranging from **3.5% to 3.99% per month** (compounding to 42% to 48% APR!). The rewards earned are instantly nullified.
        </motion.p>
        <motion.blockquote variants={itemVariants} className="p-3 bg-red-50 border-l-4 border-red-500 font-semibold text-red-700">
            <strong>Golden Rule:</strong> Never revolve credit. The interest charge will always exceed the value of any reward or cashback you could possibly earn.
        </motion.blockquote>

        <SubHeader title="3.3. Annual Fee vs. Spend-Based Waiver" />
        <motion.p variants={itemVariants}>
          The annual fee is negligible if there is a realistic waiver criterion.
        </motion.p>
        <ul className="list-none space-y-3">
          <BulletPoint text="If the card fee is ₹2,500 and the waiver spend is ₹3,00,000, ensure your natural yearly spend exceeds ₹3 Lakhs." />
          <BulletPoint text="If you can't meet the waiver, opt for a **Lifetime Free (LTF)** card, even if the reward rate is slightly lower. Consistency is key." />
        </ul>

        {/* SECTION 4: Essential Features and Security */}
        <SectionHeader title="4. Modern Features, Security, and Credit Health" icon={Shield} />

        <SubHeader title="4.1. The Importance of Digital Features" />
        <motion.p variants={itemVariants}>
          Modern cards must offer seamless integration with digital wallets and strong security controls:
        </motion.p>
        <ul className="list-none space-y-3">
          <BulletPoint text="<strong>Instant Card Blocking/Unblocking:</strong> Ability to control card use via mobile app." />
          <BulletPoint text="<strong>Transaction Limits:</strong> Setting separate daily limits for E-commerce, ATM, and POS transactions." />
          <BulletPoint text="<strong>Contactless Payment (NFC):</strong> Mandatory for quick, small-value payments up to ₹5,000." />
        </ul>

        <SubHeader title="4.2. Credit Card and CIBIL Score Relationship" />
        <motion.p variants={itemVariants}>
          Credit cards are the most common way to build or destroy your credit score.
        </motion.p>
        <ul className="list-none space-y-3">
          <BulletPoint text="<strong>Positive Impact:</strong> Paying bills in full and on time every month." />
          <BulletPoint text="<strong>Negative Impact:</strong> High Credit Utilization Ratio (CUR > 30%) and late payments." />
          <BulletPoint text="<strong>Never close your oldest card:</strong> It drastically reduces your credit history age, negatively impacting your CIBIL score." />
        </ul>


        {/* CONCLUSION */}
        <motion.section variants={itemVariants} className="mt-12 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
          <h4 className="text-xl font-bold text-gray-900 mb-3">Final Verdict: Choose Your Financial Partner</h4>
          <p>
            The ideal credit card for 2025 in India is a strategic financial partner. Stop chasing flashy reward rates alone. Instead, quantify your annual spending and choose the card whose rewards, cashback, and fee structure (especially the waiver) yield the highest **Net Value** for your unique lifestyle. Use it responsibly by paying your dues in full, and it will be an engine for both savings and strong credit health.
          </p>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="text-center mt-16 p-8 bg-gradient-to-r from-green-600 to-teal-700 rounded-2xl shadow-xl"
          variants={pageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Find Your Perfect Card Instantly
          </motion.h2>
          <motion.p
            className="text-lg text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Use our 2-minute card selector tool to get personalized recommendations based on your spending profile.
          </motion.p>
          <motion.div variants={itemVariants}>
            <button
              onClick={() => alert("Card Selector Tool Launched!")}
              className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
            >
              Start Free Selection
            </button>
          </motion.div>
        </motion.section>

      </article>
    </div>
  </motion.div>
);

export default BestCreditCardsPage;
