import React from "react";
import { motion } from "framer-motion";
// FIX: Splitting imports across multiple lines to resolve parser limits (Rollup error)
import { PenSquare, FileText, Lightbulb, Newspaper } from "lucide-react";
import { CreditCard, Banknote } from "lucide-react";
import { TrendingUp } from "lucide-react";

// --- Helper Components (Defined inside the single file) ---

// Simplified BlogCard component for rendering the individual post links
const BlogCard = ({ title, description, icon: Icon, to }) => (
  <motion.a
    href={to}
    className="block p-6 bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-2xl hover:border-blue-300 transition-all duration-300 ease-in-out transform hover:-translate-y-1 group"
  >
    <div className="flex items-start">
      <div className="p-3 bg-blue-500 rounded-lg text-white group-hover:bg-indigo-600 transition-colors">
        {Icon && <Icon size={24} />}
      </div>
      <div className="ml-4">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
          {title}
        </h3>
        <p className="mt-1 text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  </motion.a>
);

// --- Data Definitions ---

const blogCategories = [
  {
    title: "Banking Guides",
    description:
      "Step-by-step guides to help you choose the right banking products like accounts, cards, loans, and more.",
    icon: PenSquare,
    to: "#banking-guides",
  },
  {
    title: "Investment Tips",
    description:
      "Learn smart investment strategies, market insights, and long-term portfolio planning tips.",
    icon: Lightbulb,
    to: "#investment-tips",
  },
  {
    title: "Financial News",
    description:
      "Stay updated with the latest financial and fintech industry news curated for you.",
    icon: Newspaper,
    to: "#financial-news",
  },
  {
    title: "Product Comparisons",
    description:
      "Compare credit cards, loans, investment tools, and insurance products to make informed decisions.",
    icon: FileText,
    to: "#product-comparisons",
  },
];

const allBlogPosts = [
  // --- Existing Posts ---
  { path: "/blogs/what-is-cibil-score", title: "What Is Your CIBIL Score?", description: "Understand the factors that impact your credit score and why it's crucial for loan approvals.", icon: CreditCard },
  { path: "/blogs/Best-Credit-Cards", title: "Finding the Best Credit Cards", description: "A comprehensive guide to selecting the perfect credit card for your spending habits and rewards goals.", icon: CreditCard },
  { path: "/blogs/Business-Loan-Guide", title: "The Ultimate Business Loan Guide", description: "Everything you need to know about securing financing for your business, from types to eligibility.", icon: Banknote },
  { path: "/blogs/Fixed-Deposit-Guide", title: "Your Fixed Deposit Investment Guide", description: "Learn how Fixed Deposits work, compare interest rates, and maximize your savings securely.", icon: TrendingUp },
  { path: "/blogs/Home-Loan-Guide", title: "Navigating the Home Loan Process", description: "Step-by-step guidance on applying for a home loan, understanding EMIs, and choosing the best rates.", icon: Banknote },
  { path: "/blogs/Investment-Plans-Guide", title: "Essential Investment Plans Guide", description: "Explore various investment avenues like MFs, Stocks, and FDs to build a robust financial future.", icon: TrendingUp },
  { path: "/blogs/Loan-Eligibility-Tricks", title: "Tricks to Boost Your Loan Eligibility", description: "Practical tips and strategies to increase your chances of getting approved for personal and home loans.", icon: Lightbulb },
  { path: "/blogs/Secured-Unsecured-Guide", title: "Secured vs. Unsecured Loans Explained", description: "A clear breakdown of the differences between secured and unsecured loans, and which one is right for you.", icon: Banknote },
  { path: "/blogs/Gold-Vs-Personal-Loan", title: "Gold Loan Vs. Personal Loan: Which is Better?", description: "Compare the pros and cons of using gold as collateral versus taking out an unsecured personal loan.", icon: Banknote },
  { path: "/blogs/Health-Insurance-Blog", title: "The Complete Health Insurance Blog", description: "Understand policy terms, coverage types, and choose the ideal health insurance plan for your family.", icon: FileText },
  { path: "/blogs/Car-Loan-Interest-Rates", title: "Understanding Car Loan Interest Rates", description: "Find out how interest rates are calculated for car loans and tips to secure the lowest rate.", icon: Banknote },
  { path: "/blogs/Card-Showdown", title: "Credit Card Showdown: Top Comparisons", description: "In-depth comparisons of the top credit cards in various categories, including travel, cashback, and rewards.", icon: CreditCard },
  { path: "/blogs/Tax-Saving-Guide", title: "The Ultimate Tax-Saving Guide", description: "Strategies and tips to legally minimize your tax liability using popular investment schemes and deductions.", icon: FileText },
  { path: "/blogs/EMI-Explained", title: "EMI Explained: Calculations and Impact", description: "Demystifying Equated Monthly Installments (EMI) and learning how to plan your loan repayments effectively.", icon: Banknote },
  { path: "/blogs/Loan-Mistakes-To-Avoid", title: "Top Loan Mistakes to Avoid", description: "Learn about common borrowing errors that can hurt your credit score and financial stability.", icon: Newspaper },
  { path: "/blogs/Rising-Interest-Rates", title: "How to Handle Rising Interest Rates", description: "Expert advice on managing your existing loans and investments when central banks hike rates.", icon: TrendingUp },
  { path: "/blogs/Digital-Banks", title: "Exploring the World of Digital Banks", description: "A look into the benefits, security, and services offered by modern digital-only banking platforms.", icon: PenSquare },
  { path: "/blogs/Wealth-Building-Strategies", title: "Proven Wealth Building Strategies", description: "Long-term strategies, including budgeting, saving, and smart investing, to secure your financial independence.", icon: TrendingUp },

  // --- New Posts Added ---
  { path: "/blogs/Best-Personal-Loan-Apps", title: "Best Personal Loan Apps Reviewed", description: "A comparison of top-rated personal loan applications for quick and easy funding.", icon: Banknote },
  { path: "/blogs/Loan-Vs-Card-Loan", title: "Personal Loan vs. Credit Card Loan", description: "Compare interest rates, repayment tenure, and eligibility for both types of loans.", icon: CreditCard },
  { path: "/blogs/No-CIBIL-Loan-Tricks", title: "Loan Tricks: Getting a Loan with Low CIBIL", description: "Strategies and legal methods to secure financing even with a less-than-perfect credit score.", icon: Lightbulb },
  { path: "/blogs/Personal-Loan-Rates", title: "Latest Personal Loan Interest Rates", description: "Check out the current market rates and find out how to qualify for the best offers.", icon: Banknote },
  { path: "/blogs/Loan-Eligibility-Trick", title: "Quick Hacks for Loan Eligibility", description: "Actionable tips to instantly improve your profile before applying for a new loan.", icon: Lightbulb },
  { path: "/blogs/Personal-Loan-Balance-Transfer", title: "Personal Loan Balance Transfer Guide", description: "How to consolidate high-interest debts and save money through a balance transfer.", icon: Banknote },
  { path: "/blogs/Home-Loan-Comparison", title: "Home Loan Comparison Tool & Guide", description: "Compare features, interest rates, and processing fees of various bank home loans.", icon: Banknote },
  { path: "/blogs/Low-Salary-Home-Loan-Guide", title: "Home Loan Guide for Low-Salary Earners", description: "Strategies and schemes designed to help individuals with lower incomes secure housing finance.", icon: Banknote },
  { path: "/blogs/Home-Loan-Mistakes", title: "Top Home Loan Mistakes to Avoid", description: "Essential advice to prevent common errors that cost you thousands over the loan tenure.", icon: Banknote },
  { path: "/blogs/PMAY", title: "Pradhan Mantri Awas Yojana (PMAY) Explained", description: "Detailed eligibility, benefits, and application process for the PMAY housing scheme.", icon: Banknote },
  { path: "/blogs/Rent-Vs-Buy-2026", title: "Rent vs. Buy Debate: 2026 Financial Analysis", description: "A detailed financial model to help you decide whether renting or buying is better for your future.", icon: Banknote },
  { path: "/blogs/Startup-Loan-Blueprint", title: "Startup Loan Blueprint: Funding Your Idea", description: "A step-by-step guide to finding and securing capital for your new business venture.", icon: TrendingUp },
  { path: "/blogs/MSME-Loan-Without-Collateral", title: "MSME Loan Without Collateral Guide", description: "Explore government schemes and financial options for small businesses that don't require security.", icon: Banknote },
  { path: "/blogs/Business-Loan-Eligibility", title: "Mastering Business Loan Eligibility", description: "A checklist of all requirements and documents needed to qualify for a business loan.", icon: FileText },
  { path: "/blogs/Vehicle-Financing-Guide", title: "The Complete Vehicle Financing Guide", description: "Everything you need to know about two-wheeler and four-wheeler loan options and terms.", icon: Banknote },
  { path: "/blogs/Car-Loan-Rates-2026", title: "Car Loan Interest Rates Forecast 2026", description: "Analysis and prediction of car loan interest rate trends for the upcoming year.", icon: Banknote },
  { path: "/blogs/Used-Car-Loan-Guide", title: "Used Car Loan: Buying Smart Guide", description: "Tips on getting the best finance deal for pre-owned vehicles and avoiding pitfalls.", icon: Banknote },
  { path: "/blogs/Bike-Loan-Eligibility", title: "Bike Loan Eligibility & Approval Tips", description: "How to maximize your chances of getting approved for a two-wheeler loan quickly.", icon: Banknote },
  { path: "/blogs/Car-Loan-100-Percent-Finance", title: "100% Car Loan Financing Explained", description: "Understand the terms, benefits, and drawbacks of zero down-payment car loans.", icon: CreditCard },
];

// Framer Motion variants
const pageVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1,
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
      stiffness: 80,
      damping: 15,
    },
  },
};

const BlogsOverviewPage = () => {
  const [subscriptionMessage, setSubscriptionMessage] = React.useState("");

  const handleSubscribe = () => {
    setSubscriptionMessage("Thank you for subscribing! Check your inbox for your first finance insights.");
    setTimeout(() => setSubscriptionMessage(""), 4000); // Clear message after 4 seconds
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white/60 to-blue-50/80 py-12 px-4 md:px-12 font-inter"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 text-center drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700"
        variants={itemVariants}
      >
        Explore Expert Banking & Finance Blogs
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto text-center mb-12 leading-relaxed"
        variants={itemVariants}
      >
        Stay informed with high-quality blogs on banking, fintech, investments, and personal finance.
      </motion.p>

      {/* Blog Categories Section */}
      <motion.h2
        id="categories"
        className="text-3xl font-bold text-gray-800 mb-8 text-center"
        variants={itemVariants}
      >
        Popular Categories
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mb-16">
        {blogCategories.map((category) => (
          <motion.div key={category.title} variants={itemVariants} className="w-full">
            {/* Using BlogCard for category display for consistent styling */}
            <BlogCard {...category} />
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        {/* All Blog Posts Section */}
        <motion.h2
          id="all-blogs"
          className="text-3xl font-bold text-gray-800 mb-8 text-center pt-8 border-t border-gray-200"
          variants={itemVariants}
        >
          All Articles
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allBlogPosts.map((post) => (
            <motion.div key={post.path} variants={itemVariants}>
              <BlogCard
                title={post.title}
                description={post.description}
                icon={post.icon}
                to={post.path}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.section
        className="text-center mt-16 p-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl max-w-4xl mx-auto"
        variants={pageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
          variants={itemVariants}
        >
          Want Personalised Financial Insights?
        </motion.h2>
        <motion.p
          className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Subscribe to our newsletter for weekly finance tips, product comparisons, and investment ideas.
        </motion.p>
        <motion.div variants={itemVariants}>
          <button
            onClick={handleSubscribe}
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
          >
            Subscribe Now
          </button>
        </motion.div>
        {subscriptionMessage && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-white font-semibold"
          >
            {subscriptionMessage}
          </motion.p>
        )}
      </motion.section>
    </motion.div>
  );
};

export default BlogsOverviewPage;
