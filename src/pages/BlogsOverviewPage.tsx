import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { 
  PenSquare, 
  FileText, 
  Lightbulb, 
  Newspaper, 
  CreditCard, 
  Banknote, 
  TrendingUp, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Clock, 
  ArrowRight, 
  Home as HomeIcon, 
  Car, 
  CheckCircle2, 
  Percent, 
  Shield, 
  BookOpen,
  SlidersHorizontal,
  Mail,
  UserCheck
} from "lucide-react";

interface BlogPostItem {
  path: string;
  title: string;
  description: string;
  category: "Personal Loans" | "Home Loans" | "Business Loans" | "Credit Cards" | "Investments & Tax" | "Vehicle Loans" | "Credit Score";
  readTime: string;
  author: string;
  icon: React.ElementType;
  isFeatured?: boolean;
}

const ALL_BLOG_POSTS: BlogPostItem[] = [
  // Curated Featured Guides
  { 
    path: "/blog/sbi-vs-hdfc-personal-loan", 
    title: "SBI vs HDFC Personal Loan 2026: Interest Rates, Eligibility & Full Comparison", 
    description: "Detailed side-by-side comparison between SBI and HDFC personal loans. Compare interest rates from 10.50%, processing fees, and repayment tenures.", 
    category: "Personal Loans", 
    readTime: "12 min read", 
    author: "Raghav Singhal, CA", 
    icon: Banknote,
    isFeatured: true 
  },
  { 
    path: "/blog/best-lifetime-free-credit-cards", 
    title: "Best Lifetime Free Credit Cards in India (2026): Zero Annual Fee & Top Rewards", 
    description: "Discover the best lifetime free credit cards in India with zero joining and annual fees. Compare Amazon Pay ICICI, IDFC FIRST, and HDFC LTF cards.", 
    category: "Credit Cards", 
    readTime: "10 min read", 
    author: "Neha Verma, CFP", 
    icon: CreditCard,
    isFeatured: true 
  },
  { 
    path: "/blog/what-is-cibil-score", 
    title: "The Ultimate 2026 Guide to CIBIL Score Mastery", 
    description: "Unlock the secrets of your 3-digit score. Learn how CIBIL calculation works, discover strategies to boost score above 750, and ensure easy loan approvals.", 
    category: "Credit Score", 
    readTime: "15 min read", 
    author: "Raghav Singhal, CA", 
    icon: Award,
    isFeatured: true 
  },

  // Personal Loan & Credit Apps
  { path: "/blog/Best-Personal-Loan-Apps", title: "Best Personal Loan Apps in India 2026 Reviewed", description: "Comprehensive analysis of top RBI-registered instant personal loan apps, interest rates, processing speeds, and NBFC partners.", category: "Personal Loans", readTime: "14 min read", author: "Priya Sharma", icon: Banknote },
  { path: "/blog/Loan-Vs-Card-Loan", title: "Personal Loan vs. Loan on Credit Card: Complete 2026 Comparison", description: "Compare interest margins, repayment tenure, credit utilization impact, and disbursal speeds to choose the best borrowing route.", category: "Personal Loans", readTime: "11 min read", author: "Raghav Singhal, CA", icon: CreditCard },
  { path: "/blog/Personal-Loan-Rates", title: "Latest Personal Loan Interest Rates 2026 Across Top 20 Banks", description: "Compare floating and fixed personal loan interest rates, processing charges, and pre-payment rules across public and private banks.", category: "Personal Loans", readTime: "12 min read", author: "Amit Khurana", icon: Percent },
  { path: "/blog/Personal-Loan-Balance-Transfer", title: "Personal Loan Balance Transfer Guide: Save on Interest", description: "How to consolidate high-interest debt into lower-margin personal loans and reduce monthly EMI burdens seamlessly.", category: "Personal Loans", readTime: "10 min read", author: "Raghav Singhal, CA", icon: TrendingUp },
  { path: "/blog/No-CIBIL-Loan-Tricks", title: "How to Secure Loans with Low or No CIBIL Score", description: "Legitimate strategies to secure personal credit lines when your credit score is below 650 or when you have a clean slate (NH).", category: "Personal Loans", readTime: "13 min read", author: "Priya Sharma", icon: Lightbulb },
  { path: "/blog/Loan-Eligibility-Tricks", title: "9 Hidden Tricks to Boost Your Loan Eligibility Fast", description: "Practical mathematical steps to optimize Fixed Obligation to Income Ratio (FOIR) and secure higher loan sanctions.", category: "Personal Loans", readTime: "11 min read", author: "Amit Khurana", icon: Lightbulb },
  { path: "/blog/Loan-Eligibility-Trick", title: "10 Smart Ways to Reduce Your Personal Loan EMI Burden", description: "Actionable tips to negotiate lower processing fees, extend tenure safely, and manage part-prepayments effectively.", category: "Personal Loans", readTime: "9 min read", author: "Raghav Singhal, CA", icon: Percent },
  { path: "/blog/Loan-Mistakes-To-Avoid", title: "Top 10 Costly Mistakes to Avoid When Taking a Loan", description: "Avoid common borrowing pitfalls, hidden pre-closure charges, and credit rating damages before signing agreement letters.", category: "Personal Loans", readTime: "12 min read", author: "Amit Khurana", icon: Shield },
  { path: "/blog/Secured-Unsecured-Guide", title: "Secured vs. Unsecured Loans: Complete Risk & Rate Breakdown", description: "Detailed comparative evaluation of collateral-backed loans versus clean unsecured retail debt facilities.", category: "Personal Loans", readTime: "16 min read", author: "Raghav Singhal, CA", icon: Banknote },
  { path: "/blog/Gold-Vs-Personal-Loan", title: "Gold Loan vs. Personal Loan: Which is Better in 2026?", description: "Evaluate LTV ratios, gold pledging terms, and interest outlays compared to standard unsecured personal loans.", category: "Personal Loans", readTime: "11 min read", author: "Priya Sharma", icon: Banknote },
  { path: "/blog/EMI-Explained", title: "What is EMI? Mathematical Calculations, Amortization & Impact", description: "Demystifying Equated Monthly Installment formulas, reducing balance versus flat rate calculations, and early tenure payoff strategies.", category: "Personal Loans", readTime: "10 min read", author: "Raghav Singhal, CA", icon: Percent },
  { path: "/blog/Rising-Interest-Rates", title: "Rising Interest Rates: How Repo Rate Hikes Impact Borrowers", description: "Learn how RBI monetary policy decisions and MCLR/EBLR resets alter your existing loan tenures and monthly cashflows.", category: "Personal Loans", readTime: "10 min read", author: "Amit Khurana", icon: TrendingUp },

  // Home Loans & Mortgages
  { path: "/blog/Home-Loan-Guide", title: "Home Loan Interest Rates 2026: Best Banks & Complete Guide", description: "Step-by-step guidance on applying for a home loan, understanding floating rates, sanction letters, and stamp duty financing.", category: "Home Loans", readTime: "18 min read", author: "Amit Khurana", icon: HomeIcon },
  { path: "/blog/Home-Loan-Comparison", title: "Home Loan Comparison 2026: SBI, HDFC, ICICI, Axis & PNB", description: "Evaluate home loan interest rate slabs, processing fee waivers, and top-up loan options across India's largest mortgage lenders.", category: "Home Loans", readTime: "15 min read", author: "Raghav Singhal, CA", icon: HomeIcon },
  { path: "/blog/Low-Salary-Home-Loan-Guide", title: "How to Get a Home Loan with a Low Salary in India (2026)", description: "Strategies for low-salary and informal income earners: co-borrower inclusion, extended 30-year tenures, and PMAY subsidies.", category: "Home Loans", readTime: "14 min read", author: "Amit Khurana", icon: HomeIcon },
  { path: "/blog/Home-Loan-Mistakes", title: "Top 10 Mistakes to Avoid When Applying for a Home Loan", description: "Navigate builder agreement pitfalls, down payment shortfall risks, and insurance bundling traps before loan disbursement.", category: "Home Loans", readTime: "13 min read", author: "Amit Khurana", icon: Shield },
  { path: "/blog/PMAY", title: "Pradhan Mantri Awas Yojana (PMAY-U 2.0) Eligibility & Subsidy", description: "Complete eligibility criteria, interest subsidy slabs, income brackets, and application steps under the revised PMAY scheme.", category: "Home Loans", readTime: "12 min read", author: "Priya Sharma", icon: HomeIcon },
  { path: "/blog/Rent-Vs-Buy-2026", title: "Rent vs. Buy Debate: 2026 Financial Model & Opportunity Cost", description: "A rigorous mathematical evaluation of buying property with a mortgage versus renting and investing the surplus in equity indices.", category: "Home Loans", readTime: "16 min read", author: "Raghav Singhal, CA", icon: HomeIcon },

  // Credit Cards
  { path: "/blog/Best-Credit-Cards", title: "15 Best Credit Cards in India (2026): Cashback & Travel Compared", description: "A comprehensive evaluation of India's best reward and cashback credit cards, lounge access criteria, and milestone fee waivers.", category: "Credit Cards", readTime: "16 min read", author: "Neha Verma, CFP", icon: CreditCard },
  { path: "/blog/Card-Showdown", title: "Debit Card vs. Credit Card: The Ultimate Financial Showdown", description: "Compare fraud protection mechanisms, interest-free credit cycles, chargeback rights, and reward compounding advantages.", category: "Credit Cards", readTime: "11 min read", author: "Neha Verma, CFP", icon: CreditCard },

  // Business & MSME Loans
  { path: "/blog/Business-Loan-Guide", title: "The Ultimate 2026 Guide to Business Loan Options for SMEs", description: "Comprehensive analysis of term loans, working capital limits, CGTMSE coverage, and digital NBFC credit lines for Indian businesses.", category: "Business Loans", readTime: "20 min read", author: "Raghav Singhal, CA", icon: Banknote },
  { path: "/blog/Startup-Loan-Blueprint", title: "Startup Loan Blueprint: Government Schemes & Angel Funding", description: "How early-stage Indian entrepreneurs can secure Mudra loans, Stand-Up India funding, and seed debt without pledging personal assets.", category: "Business Loans", readTime: "14 min read", author: "Raghav Singhal, CA", icon: Lightbulb },
  { path: "/blog/MSME-Loan-Without-Collateral", title: "MSME Loan Without Collateral: CGTMSE & Mudra Explained", description: "Explore collateral-free credit schemes backed by government credit guarantees for micro and small enterprises in India.", category: "Business Loans", readTime: "13 min read", author: "Amit Khurana", icon: Banknote },
  { path: "/blog/Business-Loan-Eligibility", title: "How to Improve Business Loan Eligibility Fast: 8 Key Steps", description: "Financial ratios, debt service coverage ratio (DSCR), and bank turnover metrics required to pass corporate credit underwriting.", category: "Business Loans", readTime: "12 min read", author: "Raghav Singhal, CA", icon: FileText },

  // Auto & Vehicle Loans
  { path: "/blog/Car-Loan-Interest-Rates", title: "Understanding Car Loan Interest Rates: Fixed vs. Floating", description: "How automobile lenders calculate financing charges, dealer kickbacks, advance EMIs, and effective annual percentage rates (APR).", category: "Vehicle Loans", readTime: "12 min read", author: "Amit Khurana", icon: Car },
  { path: "/blog/Car-Loan-Rates-2026", title: "Best Car Loan Interest Rates in India 2026: Top Bank Rankings", description: "Review latest car loan offers from SBI, HDFC, ICICI, Bank of Baroda, and Canara Bank with zero prepayment penalty options.", category: "Vehicle Loans", readTime: "11 min read", author: "Amit Khurana", icon: Car },
  { path: "/blog/Used-Car-Loan-Guide", title: "How to Buy a Used Car With a Loan: The Complete Smart Guide", description: "Master vehicle valuation parameters, RC transfer procedures, and interest rate margins for pre-owned car purchases.", category: "Vehicle Loans", readTime: "12 min read", author: "Priya Sharma", icon: Car },
  { path: "/blog/Bike-Loan-Eligibility", title: "Two-Wheeler & Bike Loan Eligibility: Instant Approval Tips", description: "Get approved for electric scooter or sports bike financing with minimal documentation and low down payment slabs.", category: "Vehicle Loans", readTime: "10 min read", author: "Priya Sharma", icon: Car },
  { path: "/blog/Car-Loan-100-Percent-Finance", title: "100% Car Loan On-Road Financing: Truth, Terms & Traps", description: "Detailed breakdown of zero down payment car financing schemes, including insurance and road tax inclusion clauses.", category: "Vehicle Loans", readTime: "11 min read", author: "Amit Khurana", icon: Car },
  { path: "/blog/Vehicle-Financing-Guide", title: "The Complete Vehicle Financing Guide: Four-Wheeler & Two-Wheeler", description: "Comprehensive manual on personal and commercial vehicle lending, hypothecation removal, and insurance bundling.", category: "Vehicle Loans", readTime: "13 min read", author: "Amit Khurana", icon: Car },

  // Investments, Banking & Tax
  { path: "/blog/Fixed-Deposit-Guide", title: "Fixed Deposit Interest Rates 2026: Best FD Plans in India", description: "Compare bank, NBFC, and small finance bank FD rates up to 9.10% p.a., DICGC insurance coverage, and tax saving 5-year FDs.", category: "Investments & Tax", readTime: "15 min read", author: "Raghav Singhal, CA", icon: TrendingUp },
  { path: "/blog/Investment-Plans-Guide", title: "Essential Investment Plans Guide: Mutual Funds, NPS & FDs", description: "A balanced asset allocation roadmap across index mutual funds, debt instruments, sovereign gold bonds, and national pension schemes.", category: "Investments & Tax", readTime: "17 min read", author: "Raghav Singhal, CA", icon: TrendingUp },
  { path: "/blog/Sukanya-Samriddhi-Yojana-Guide", title: "Sukanya Samriddhi Yojana (SSY) 2026: Rules, 8.2% Rate & EEE", description: "Comprehensive guide to opening and maximizing an SSY account for your girl child with triple tax exemption (EEE) benefits.", category: "Investments & Tax", readTime: "10 min read", author: "Priya Sharma", icon: Award },
  { path: "/blog/Tax-Saving-Guide", title: "Best Ways to Save Tax in India: Old vs. New Regime Analysis", description: "Maximize Section 80C, 80D, and NPS 80CCD(1B) deductions under the old regime, and evaluate new tax regime break-evens.", category: "Investments & Tax", readTime: "16 min read", author: "Raghav Singhal, CA", icon: FileText },
  { path: "/blog/Wealth-Building-Strategies", title: "How to Build Wealth in India: 10 Proven Financial Habits", description: "Compound interest dynamics, inflation hedging with equities, term life coverage, and debt-free living principles.", category: "Investments & Tax", readTime: "15 min read", author: "Raghav Singhal, CA", icon: TrendingUp },
  { path: "/blog/Digital-Banks", title: "Top Digital Banks & Neobanks in India (2026 In-Depth Review)", description: "A deep dive into zero-balance digital savings accounts, automated debit card round-ups, and RBI regulatory sandboxes.", category: "Investments & Tax", readTime: "12 min read", author: "Priya Sharma", icon: PenSquare },
  { path: "/blog/Health-Insurance-Blog", title: "Best Health Insurance Plans in India 2026: Coverage & Claims", description: "How to choose comprehensive family floater health plans, zero room rent limits, restore benefits, and Section 80D tax deductions.", category: "Investments & Tax", readTime: "14 min read", author: "Priya Sharma", icon: Shield }
];

const CATEGORIES = [
  "All Articles",
  "Personal Loans",
  "Home Loans",
  "Business Loans",
  "Credit Cards",
  "Investments & Tax",
  "Vehicle Loans",
  "Credit Score"
] as const;

interface BlogsOverviewPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const BlogsOverviewPage: React.FC<BlogsOverviewPageProps> = ({ openApplyModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Articles");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [subscriptionEmail, setSubscriptionEmail] = useState<string>("");
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return ALL_BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All Articles" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPosts = useMemo(() => {
    return ALL_BLOG_POSTS.filter((post) => post.isFeatured);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriptionEmail || !subscriptionEmail.includes("@")) return;
    setSubscriptionStatus("Thank you for subscribing! You will receive our weekly finance insights.");
    setSubscriptionEmail("");
    setTimeout(() => setSubscriptionStatus(null), 5000);
  };

  const blogCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "BanksCart Financial Blog & News: Expert Guides & Analysis",
    "description": "Read authoritative finance articles, loan comparison guides, credit score tips, banking reviews, and investment insights on BanksCart.",
    "url": "https://www.bankscart.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "BanksCart",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.bankscart.com/assets/images/bankscart-logo.png"
      }
    },
    "hasPart": ALL_BLOG_POSTS.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "url": `https://www.bankscart.com${post.path}`
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-20 sm:pt-24 pb-16">
      <Helmet>
        <title>BanksCart Financial Blog & Guides: Expert Loan Analysis, Cards & Tax Tips</title>
        <meta 
          name="description" 
          content="Explore 40+ expert financial guides on personal loans, home loans, business credit, CIBIL score algorithms, credit cards, and tax optimization on BanksCart." 
        />
        <link rel="canonical" href="https://www.bankscart.com/blog" />
        <meta property="og:title" content="BanksCart Financial Blog: Expert Loan Analysis & Guides" />
        <meta property="og:description" content="Explore 40+ expert financial guides on personal loans, home loans, credit cards, and tax planning." />
        <meta property="og:url" content="https://www.bankscart.com/blog" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(blogCollectionSchema)}
        </script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Breadcrumb path={["Home", "Financial Guides & Blog"]} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* HERO SECTION */}
        <section className="bg-slate-900 rounded-3xl text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute -right-8 -bottom-10 opacity-5 select-none pointer-events-none">
            <span className="text-[220px] font-black text-white leading-none">BLOG</span>
          </div>

          <div className="max-w-3xl relative z-10 space-y-5">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-3.5 py-1 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Verified Financial Intelligence Hub
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              BanksCart Financial Guides & <br />
              <span className="text-amber-400">Expert Market Analysis</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              Demystifying Indian retail banking, loan borrowing, credit bureau scoring, and wealth planning. Every article is written and rigorously reviewed by chartered accountants, certified financial planners, and ex-banking credit managers.
            </p>

            {/* Quick Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-mono tabular-nums">40+ In-Depth</div>
                  <div className="text-[11px] text-slate-400">Financial Guides</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Fact-Checked</div>
                  <div className="text-[11px] text-slate-400">By CAs & CFPs</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Award className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">RBI / IRDAI</div>
                  <div className="text-[11px] text-slate-400">Regulatory Focus</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-mono tabular-nums">2026 Updated</div>
                  <div className="text-[11px] text-slate-400">Latest Rates & Rules</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED EDITOR'S PICKS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Editor's Spotlight Guides
            </h2>
            <span className="text-xs text-slate-500 font-semibold">Recommended Reading</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => {
              const Icon = post.icon;
              return (
                <Link
                  key={post.path}
                  to={post.path}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">By {post.author}</span>
                    <span className="text-blue-700 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read Guide &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* SEARCH AND CATEGORY FILTER TABS */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles by topic, keyword (e.g. CIBIL, EMI, Home Loan)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Results count indicator */}
            <div className="text-xs text-slate-500 font-medium">
              Showing <strong className="text-slate-900 font-mono tabular-nums">{filteredPosts.length}</strong> of {ALL_BLOG_POSTS.length} Guides
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    isActive
                      ? "bg-blue-700 text-white border-blue-700 shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* ALL ARTICLES GRID (BALANCED 3-COLUMN LAYOUT) */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => {
              const Icon = post.icon;
              return (
                <Link
                  key={post.path}
                  to={post.path}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                          {post.category}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px]">By {post.author}</span>
                    <span className="text-blue-700 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-xs">
                      Read &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredPosts.length === 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <Search className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">No matching articles found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We couldn't find any financial guides matching "{searchQuery}". Try selecting another category or clear your search query.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Articles");
                }}
                className="mt-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-bold text-xs hover:bg-blue-100 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* NEWSLETTER & FINANCIAL ADVISORY CTA */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-slate-800">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block mb-1">
              Weekly Market Intelligence
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Stay Ahead of Interest Rate Changes & Credit Rules
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Join over 50,000 borrowers and savers receiving our weekly digest on repo rate trends, bank fee waivers, and tax saving strategies.
            </p>

            <form onSubmit={handleSubscribe} className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={subscriptionEmail}
                onChange={(e) => setSubscriptionEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg transition-all whitespace-nowrap"
              >
                Subscribe Free
              </button>
            </form>

            {subscriptionStatus && (
              <p className="text-xs text-emerald-400 font-semibold pt-2">
                {subscriptionStatus}
              </p>
            )}

            <div className="pt-4 flex items-center justify-center gap-6 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Zero Spam
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Unsubscribe Anytime
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                100% Free Insights
              </span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default BlogsOverviewPage;
