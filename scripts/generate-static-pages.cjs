const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');
const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
const directoryLinksPath = path.resolve(__dirname, '../src/data/financialDirectoryLinks.json');
const loanDataPath = path.resolve(__dirname, '../src/data/loanPageData.json');

if (!fs.existsSync(templatePath)) {
  console.log('dist/index.html not found. Run "vite build" first.');
  process.exit(0);
}

const templateHtml = fs.readFileSync(templatePath, 'utf8');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const directoryLinks = JSON.parse(fs.readFileSync(directoryLinksPath, 'utf8'));
const loanPageData = JSON.parse(fs.readFileSync(loanDataPath, 'utf8'));

// Extract URLs from sitemap
const urlRegex = /<loc>https:\/\/www\.bankscart\.com([^<]*)<\/loc>/g;
const urls = [];
let match;
while ((match = urlRegex.exec(sitemapContent)) !== null) {
  urls.push(match[1] || '/');
}

// Subpaths for Personal Loans with distinct value propositions
const PERSONAL_LOAN_SUBPATHS = {
  'overview': {
    title: "Personal Loans in India: Compare Interest Rates, Eligibility & EMIs | BanksCart",
    description: "Compare personal loans from 30+ top banks and NBFCs in India. Check eligibility, lowest interest rates starting from 10.50%, EMI calculations, and apply online."
  },
  'pre-approved': {
    title: "Pre-Approved Personal Loans: 10-Second Disbursal & Zero Documents | BanksCart",
    description: "Access instant pre-approved personal loans with 10-second bank account disbursal, zero collateral, and zero physical documentation."
  },
  'interest-rates': {
    title: "Personal Loan Interest Rates 2026: Compare All Bank Rates | BanksCart",
    description: "Compare the latest personal loan interest rates, processing fees, and special concessions across SBI, HDFC, ICICI, Axis, and leading NBFCs."
  },
  'mobile-app': {
    title: "Best Instant Personal Loan Apps in India: Quick Disbursals | BanksCart",
    description: "Discover top-rated RBI-registered loan apps for fast digital credit. Enjoy instant biometric verification, paperless approval, and rapid cash disbursal."
  },
  'low-cibil-score': {
    title: "Personal Loan for Low CIBIL Score: Instant Approval Options | BanksCart",
    description: "Need funds with a low credit score? Explore tailored personal loan options for CIBIL scores below 650 with flexible tenures and guarantor options."
  },
  'balance-transfer': {
    title: "Personal Loan Balance Transfer: Lowest Interest Rate & Save EMI | BanksCart",
    description: "Switch your existing high-interest personal loan to a lower-rate bank. Save substantially on monthly EMIs and unlock top-up loan facilities."
  },
  'loan-on-credit-card': {
    title: "Instant Loan on Credit Card: Pre-Approved Cash & Low EMI | BanksCart",
    description: "Convert your credit card limit into quick cash. Enjoy pre-approved instant disbursals, zero paperwork, and convenient monthly installment plans."
  },
  '5-lakh': {
    title: "₹5 Lakh Personal Loan: Check EMI, Eligibility & Apply Online | BanksCart",
    description: "Apply for a ₹5 Lakh personal loan with flexible tenures up to 5 years. Calculate monthly EMI, compare lender rates, and get instant approval."
  },
  '10-lakh': {
    title: "₹10 Lakh Personal Loan: Interest Rates, EMIs & Apply Online | BanksCart",
    description: "Secure a ₹10 Lakh personal loan for medical emergencies, home renovation, or debt consolidation. Compare top lenders and calculate repayment schedules."
  },
  '20-lakh': {
    title: "₹20 Lakh Personal Loan: Compare Low Interest Rates & EMIs | BanksCart",
    description: "Get high-value personal loans up to ₹20 Lakhs with attractive interest rates, flexible repayment tenures, and minimal documentation."
  },
  '30-lakh': {
    title: "₹30 Lakh Personal Loan: High-Value Instant Loan Eligibility | BanksCart",
    description: "Check eligibility for a high-limit ₹30 Lakh personal loan. Compare premium banking rates, fast-track processing, and flexible tenure options."
  },
  '40-lakh': {
    title: "₹40 Lakh Personal Loan: Low Interest Rates & Fast Disbursal | BanksCart",
    description: "Access up to ₹40 Lakhs in unsecured financing for high-capital personal requirements. Fast approval and competitive monthly EMIs."
  },
  '50-lakh': {
    title: "₹50 Lakh Personal Loan: Jumbo Unsecured Capital & Low EMI | BanksCart",
    description: "Jumbo personal loans up to ₹50 Lakhs for high-income professionals and entrepreneurs with premium terms and dedicated relationship managers."
  },
  'salaried-employees': {
    title: "Personal Loan for Salaried Employees: Instant Approvals & Low Rates | BanksCart",
    description: "Special personal loan schemes for salaried professionals in corporate, government, and private sectors with lowest interest rates and paperless processing."
  },
  'self-employed': {
    title: "Personal Loan for Self-Employed: No ITR & Quick Disbursal | BanksCart",
    description: "Tailored personal financing for self-employed individuals, professionals, and traders with flexible income proof requirements and fast disbursals."
  },
  'senior-citizens': {
    title: "Personal Loan for Senior Citizens: Low Interest Pension Loans | BanksCart",
    description: "Specialized pension personal loans for retired central/state government and defense pensioners with low interest rates and extended tenures."
  },
  'students': {
    title: "Education & Student Personal Loans: Zero Collateral & Low Rates | BanksCart",
    description: "Affordable student loans for tuition fees, certification courses, and laptop financing with low interest rates and flexible repayment schedules."
  },
  'doctors': {
    title: "Special Personal Loan for Doctors: Instant High-Limit Capital | BanksCart",
    description: "Exclusive customized loans for medical doctors, dentists, and healthcare professionals with pre-approved limits up to ₹50 Lakhs and zero collateral."
  },
  'women': {
    title: "Personal Loan for Women: Special Concessional Rates & Low EMIs | BanksCart",
    description: "Empowering women borrowers with discounted interest rates, reduced processing fees, and flexible repayment terms for personal and professional goals."
  },
  'medical-loan': {
    title: "Emergency Medical Loan: Instant Disbursal for Healthcare | BanksCart",
    description: "Fast-track emergency personal loans to cover hospital bills, surgeries, and specialized medical treatments with rapid 2-hour approval."
  },
  'travel-loan': {
    title: "Personal Loan for Travel & Vacation: Quick Easy EMIs | BanksCart",
    description: "Finance domestic and international vacations with convenient holiday travel loans. Enjoy instant approvals and pocket-friendly EMIs."
  },
  'debt-consolidation': {
    title: "Debt Consolidation Loan: Merge Debts into One Single Low EMI | BanksCart",
    description: "Combine multiple credit card dues and high-cost debts into one single monthly installment with a lower interest rate and stress-free repayment."
  },
  'wedding-loan': {
    title: "Marriage & Wedding Loan: Plan Dream Weddings with Easy EMIs | BanksCart",
    description: "Fund dream weddings, jewelry, catering, and venue costs with flexible marriage personal loans offering competitive rates and easy EMIs."
  },
  'overdraft-loan': {
    title: "Personal Overdraft Loan: Pay Interest Only on Withdrawn Amount | BanksCart",
    description: "Flexible overdraft credit line. Withdraw money whenever required and pay interest only on the utilized amount with zero prepayment penalties."
  },
  'flexi-loan': {
    title: "Flexi Personal Loan: Withdraw & Prepay Anytime at Zero Extra Fee | BanksCart",
    description: "Flexi personal loans offering on-demand withdrawals and part-prepayments with zero extra charges to manage uneven cash flows seamlessly."
  },
  'short-term-loan': {
    title: "Short-Term Personal Loan: Fast Cash Disbursals in 24 Hours | BanksCart",
    description: "Short-term unsecured financing for immediate cash requirements with tenures from 3 to 12 months and quick 24-hour bank disbursal."
  },
  'term-loan': {
    title: "Fixed Term Personal Loan: Structured Monthly EMIs & Tenure | BanksCart",
    description: "Traditional term personal loans with fixed interest rates and predictable monthly EMI schedules for disciplined long-term repayment."
  }
};

// Subpaths for Credit Cards with distinct value propositions
const CREDIT_CARD_SUBPATHS = {
  'overview': {
    title: "Credit Cards in India: Compare Rewards, Cashback & Benefits | BanksCart",
    description: "Compare 100+ credit cards across top banks in India. Evaluate reward points, cashback offers, airport lounge access, and find your perfect card."
  },
  'best-cards': {
    title: "Best Credit Cards in India 2026: Top 10 Cards Ranked | BanksCart",
    description: "Top 10 best credit cards in India ranked by reward rates, airport lounge visits, dining benefits, and milestone perks for all spend categories."
  },
  'best-forex-cards': {
    title: "Best Forex Credit Cards: Zero Markup & Low Currency Fees | BanksCart",
    description: "Save on currency conversion charges during international travel with top zero-forex markup credit cards and international prepaid travel cards."
  },
  'cibil-score': {
    title: "Credit Card Eligibility by CIBIL Score: Apply Online | BanksCart",
    description: "Understand the minimum CIBIL score needed for credit card approvals and discover cards you qualify for based on your credit profile."
  },
  'eligibility': {
    title: "Credit Card Eligibility Calculator: Check Free Approval | BanksCart",
    description: "Check your credit card approval chances instantly without impacting your credit score. Compare personalized card recommendations."
  },
  'compare': {
    title: "Compare Top Credit Cards Side-by-Side: Rewards & Fees | BanksCart",
    description: "Side-by-side comparison of annual fees, joining benefits, reward multipliers, and fuel surcharge waivers across premier credit cards."
  },
  'rupay': {
    title: "Best RuPay Credit Cards: UPI Payment & Cashback Rewards | BanksCart",
    description: "Link RuPay credit cards to UPI for merchant QR payments and earn reward points on day-to-day tea, grocery, and fuel transactions."
  },
  'secured': {
    title: "Secured Credit Cards: Build CIBIL Score Against Fixed Deposit | BanksCart",
    description: "Rebuild your credit history with 100% guaranteed approval secured credit cards backed by bank fixed deposits with zero income proof."
  },
  'lifetime-free': {
    title: "Best Lifetime Free Credit Cards: Zero Annual Fee Forever | BanksCart",
    description: "Enjoy premium credit card perks with zero joining and annual fees for life. Compare top lifetime-free credit cards in India."
  },
  'rewards': {
    title: "Best Reward Points Credit Cards: High Multipliers & Perks | BanksCart",
    description: "Accelerate your reward earnings on shopping, dining, and utility bills. Redeem points for flights, luxury hotels, and vouchers."
  },
  'cashback': {
    title: "Best Cashback Credit Cards: Up to 5% Cashback on Spends | BanksCart",
    description: "Get direct statement cashback on online shopping at Amazon, Flipkart, Swiggy, and Zomato with top-ranked cashback credit cards."
  },
  'lounge-access': {
    title: "Best Airport Lounge Access Credit Cards: Complimentary Visits | BanksCart",
    description: "Travel in comfort with free domestic and international airport lounge access, priority check-in, and complimentary refreshments."
  },
  'virtual': {
    title: "Instant Virtual Credit Cards: Digital Activation in 5 Minutes | BanksCart",
    description: "Get instant digital credit card numbers for immediate online shopping, subscriptions, and bill payments with zero physical waiting."
  },
  'fuel': {
    title: "Best Fuel Surcharge Waiver Credit Cards: Save on Petrol & Diesel | BanksCart",
    description: "Cut down everyday fuel costs with 1% fuel surcharge waivers and bonus reward points at IndianOil, HPCL, and BPCL fuel pumps."
  },
  'travel': {
    title: "Best Travel Credit Cards: Air Miles, Free Flights & Lounge Access | BanksCart",
    description: "Maximize travel perks with complimentary airline tickets, air miles conversions, international travel insurance, and hotel room upgrades."
  },
  'international': {
    title: "International Credit Cards: Global Acceptance & Travel Insurance | BanksCart",
    description: "Globally accepted credit cards with multi-currency billing, overseas medical insurance cover, and emergency concierge assistance."
  },
  'zero-forex': {
    title: "Zero Forex Markup Credit Cards: Save 3.5% on Overseas Spends | BanksCart",
    description: "Eliminate foreign exchange fees on overseas transactions and online foreign currency websites with zero-forex credit cards."
  }
};

// Subpaths for Bonds with distinct value propositions
const BONDS_SUBPATHS = {
  'overview': {
    title: "Bonds in India: High-Yield Fixed Income Investment Guide | BanksCart",
    description: "Complete guide to bond investing in India. Compare government securities, corporate bonds, tax-free bonds, and regular coupon yields."
  },
  'corporate': {
    title: "Corporate Bonds: High Yields, AAA Ratings & Regular Payouts | BanksCart",
    description: "Earn stable yields up to 11% p.a. by investing in top AAA/AA+ rated corporate bonds with periodic monthly or quarterly coupon payouts."
  },
  'government': {
    title: "Government Bonds & G-Secs: 100% Sovereign Safety & Fixed Returns | BanksCart",
    description: "Secure 100% principal safety backed by the Government of India. Invest in long-term G-Secs and Treasury Bills with zero default risk."
  },
  'tax-free': {
    title: "Tax-Free Bonds: 100% Tax Exemption on Interest Returns | BanksCart",
    description: "Earn tax-free annual interest returns with government-backed infrastructure bonds under Section 10(15)(iv)(h) with zero TDS."
  },
  'floating-rate': {
    title: "Floating Rate Savings Bonds (FRSB): Inflation-Linked High Returns | BanksCart",
    description: "RBI floating rate bonds offering interest rates linked to NSC rates with semi-annual payouts, ideal for conservative retirement income."
  },
  'capital-gain': {
    title: "54EC Capital Gain Bonds: Save Capital Gains Tax on Property Sale | BanksCart",
    description: "Exempt 100% long-term capital gains tax on property sales under Section 54EC with REC, PFC, and NHAI capital gain bonds."
  },
  'zero-coupon': {
    title: "Zero-Coupon Deep Discount Bonds: Capital Growth & Returns | BanksCart",
    description: "Invest at a deep discount to face value and receive full maturity value without reinvestment risk. Ideal for long-term goal planning."
  },
  'how-to-invest': {
    title: "How to Buy Bonds Online in India: Step-by-Step Investor Guide | BanksCart",
    description: "Step-by-step walkthrough on investing in primary and secondary bond markets via RBI Retail Direct, NSE goBID, and online platforms."
  },
  'sovereign-gold': {
    title: "Sovereign Gold Bonds (SGB): 2.5% Annual Interest + Gold Appreciation | BanksCart",
    description: "Invest in paper gold with an additional 2.5% fixed annual interest payout, zero making charges, and 100% tax exemption on maturity gains."
  }
};

// Static SEO Map for core hubs
const STATIC_SEO_MAP = {
  "/about": {
    title: "About BanksCart: Our Mission, Leadership & Lending Partners",
    description: "Learn about BanksCart's mission, leadership team, and institutional partnerships with 30+ top Indian banks. Empowering borrowers with transparent loan comparisons."
  },
  "/about-us": {
    title: "About BanksCart: Our Mission, Leadership & Lending Partners",
    description: "Learn about BanksCart's mission, leadership team, and institutional partnerships with 30+ top Indian banks. Empowering borrowers with transparent loan comparisons."
  },
  "/": {
    title: "BanksCart: Compare Loan Interest Rates, Credit Cards & Apply Online",
    description: "Compare and apply for personal loans, home loans, business loans, and credit cards from top Indian banks at BanksCart. Get instant eligibility and best interest rates."
  },
  "/loans": {
    title: "Compare Bank Loans in India: Personal, Home, Car & Business Loans | BanksCart",
    description: "Compare loan interest rates from top Indian banks. Find the lowest EMIs for personal, home, car, and business loans with instant eligibility check."
  },
  "/cards": {
    title: "Compare & Apply for Best Credit & Debit Cards Online | BanksCart",
    description: "Explore top credit and debit cards in India. Compare rewards, cashback, travel lounge access, and lifetime free options."
  },
  "/blog": {
    title: "BanksCart Financial Blog & News: Expert Guides, Loan Tips & Analysis",
    description: "Explore comprehensive guides on banking, credit cards, loans, investments, and personal finance strategies."
  },
  "/blog": {
    title: "BanksCart Financial Blog & News: Expert Guides, Loan Tips & Analysis",
    description: "Read the latest finance articles, loan comparison guides, credit score tips, banking reviews, and investment insights on BanksCart."
  },
  "/credit-cards": {
    title: "Apply for Best Credit Cards in India: Cashbacks & Rewards | BanksCart",
    description: "Compare rewards, cashback, and travel benefits on premium credit cards. Quick digital application and approval."
  },
  "/credit-score": {
    title: "Check Free Credit Score Online: CIBIL Score & Analysis | BanksCart",
    description: "Check your credit score online for free. Get detailed analysis of your credit report, active loans, and actionable tips to boost your score."
  },
  "/cibil-credit-report": {
    title: "Get Free CIBIL Credit Report & Score Online | BanksCart",
    description: "Check your CIBIL score & download complete credit report online for free. Get detailed analysis on payment histories, active loans and score trends."
  },
  "/aadhar-card": {
    title: "Aadhaar Card Services: UIDAI Portal, Updates & Download Online | BanksCart",
    description: "Complete official UIDAI guide to dynamic identity services. Check enrolment status, download e-Aadhaar, and update address online."
  },
  "/pages-directory": {
    title: "All Financial Services Directories: 1000+ Active Portals | BanksCart",
    description: "Access over 1000+ active financial portals, verified loan rates tables, Aadhaar services guides, scheduled banking, and corporate health directories online."
  },
  "/financial-directory": {
    title: "All Financial Services Directories: 1000+ Active Portals | BanksCart",
    description: "Access over 1000+ active financial portals, verified loan rates tables, Aadhaar services guides, scheduled banking, and corporate health directories online."
  },
  "/loans/home": {
    title: "Home Loans in India: Apply Online at Lowest Interest Rates | BanksCart",
    description: "Compare home loan interest rates from top banks like SBI, HDFC, ICICI, and Axis. Check eligibility, calculate EMI, and apply online with zero processing fees."
  },
  "/loans/personal": {
    title: "Personal Loans in India: Compare Interest Rates, Eligibility & EMIs | BanksCart",
    description: "Compare personal loans from 30+ top banks and NBFCs in India. Check eligibility, lowest interest rates starting from 10.50%, EMI calculations, and apply online."
  },
  "/loans/personal/overview": {
    title: "Personal Loans in India: Compare Interest Rates, Eligibility & EMIs | BanksCart",
    description: "Comprehensive personal loan comparison across top Indian lenders. Compare interest rates, processing fees, documentation, and calculate repayments instantly."
  },
  "/loans/business": {
    title: "Collateral-Free Business Loans: Compare Rates & Apply Online | BanksCart",
    description: "Get unsecured MSME and business loans up to ₹75 Lakhs from top banks and NBFCs. Compare interest rates, check eligibility, and apply with fast disbursal."
  },
  "/loans/car": {
    title: "New Car Loans in India: Compare Low Interest Rates & Apply | BanksCart",
    description: "Finance your new car with up to 100% on-road funding. Compare car loan interest rates from leading banks and calculate your monthly EMI instantly."
  },
  "/loans/used-car": {
    title: "Used Car Loans in India: Low Interest Rates & Quick Approvals | BanksCart",
    description: "Finance a pre-owned car with quick approvals and flexible repayment tenures up to 7 years. Check rates, required documents, and apply online."
  },
  "/loans/two-wheeler": {
    title: "Two Wheeler & Bike Loans: Instant Approval & Low EMI | BanksCart",
    description: "Get quick bike financing for scooters and premium motorcycles. Compare two-wheeler loan rates, calculate monthly EMIs, and apply online."
  },
  "/loans/education": {
    title: "Education Loans for Studies in India & Abroad: Apply Online | BanksCart",
    description: "Fund higher education in India and top foreign universities. Compare student loan interest rates, tax benefits under Section 80E, and apply online."
  }
};

function formatSlug(slug) {
  if (!slug) return '';
  return slug
    .split('-')
    .filter(Boolean)
    .map(w => {
      const lower = w.toLowerCase();
      if (['in', 'of', 'for', 'and', 'to', 'on', 'at', 'vs', 'by', 'the', 'with'].includes(lower)) return lower;
      if (['fd', 'rd', 'emi', 'sip', 'nps', 'pan', 'gst', 'ppf', 'epf', 'cibil', 'kyc', 'uidai', 'sbi', 'hdfc', 'icici', 'axis', 'pnb', 'bob', 'dbs', 'csb', 'rbi', 'llp', 'roc', 'mca', 'msme', 'din', 'atm', 'tat', 'itr', 'hra', 'da', 'npci', 'upi', 'neft', 'rtgs', 'imps', 'ltv'].includes(lower)) {
        return lower.toUpperCase();
      }
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');
}

function resolveSEO(pathname) {
  const cleanPath = pathname.replace(/\/$/, '') || '/';

  if (STATIC_SEO_MAP[cleanPath]) {
    return STATIC_SEO_MAP[cleanPath];
  }

  // Explicit High-Priority targets cited by user
  if (cleanPath.includes('company-registration-in-delhi')) {
    return {
      title: "Company Registration in Delhi - Apply Online | BanksCart",
      description: "Incorporate your private limited or LLP venture in Delhi with ROC approvals, DIN allocation, and fast-track MCA filing."
    };
  }
  if (cleanPath.includes('company-registration-in-chennai')) {
    return {
      title: "Company Registration in Chennai - Apply Online | BanksCart",
      description: "Fast-track corporate registration, DIN allocations, and MCA filing in Chennai with end-to-end legal support."
    };
  }
  if (cleanPath.includes('company-registration-in-bangalore')) {
    return {
      title: "Company Registration in Bangalore - Apply Online | BanksCart",
      description: "Incorporate high-growth startups and tech enterprises in Bengaluru under Karnataka ROC with complete digital compliance."
    };
  }
  if (cleanPath.includes('copyright-registration')) {
    return {
      title: "Copyright Registration Online - Protect Literary, Artistic & Software IP | BanksCart",
      description: "Protect literary, artistic, and digital software intellectual property under Indian Copyright Office protocols."
    };
  }
  if (cleanPath.includes('credit-rectification')) {
    return {
      title: "Credit Rectification Service - Dispute Errors & Boost CIBIL Score | BanksCart",
      description: "Dispute credit report anomalies, remove wrongful overdue tags, and boost your CIBIL score with expert credit rectification guidance."
    };
  }

  // Personal Loan subpaths
  if (cleanPath.startsWith('/loans/personal/')) {
    const sub = cleanPath.replace('/loans/personal/', '');
    if (PERSONAL_LOAN_SUBPATHS[sub]) {
      return PERSONAL_LOAN_SUBPATHS[sub];
    }
  }

  // Credit Card subpaths
  if (cleanPath.startsWith('/cards/credit/')) {
    const sub = cleanPath.replace('/cards/credit/', '');
    if (CREDIT_CARD_SUBPATHS[sub]) {
      return CREDIT_CARD_SUBPATHS[sub];
    }
  }

  // Bonds subpaths
  if (cleanPath.startsWith('/investment/bonds/')) {
    const sub = cleanPath.replace('/investment/bonds/', '');
    if (BONDS_SUBPATHS[sub]) {
      return BONDS_SUBPATHS[sub];
    }
  }

  // Directory links dictionary (1000 pages)
  if (directoryLinks[cleanPath]) {
    const entry = directoryLinks[cleanPath];
    const titleName = entry.name;
    let title = '';
    if (titleName.toLowerCase().includes('registration')) {
      title = `${titleName} - Apply Online | BanksCart`;
    } else if (titleName.toLowerCase().includes('calculator')) {
      title = `${titleName}: Free Online Financial Planning Tool | BanksCart`;
    } else if (titleName.toLowerCase().includes('rectification') || titleName.toLowerCase().includes('service')) {
      title = `${titleName} - Online Guide & Support | BanksCart`;
    } else if (titleName.toLowerCase().includes('portal') || titleName.toLowerCase().includes('hub')) {
      title = `${titleName} - Official Online Guide | BanksCart`;
    } else if (titleName.toLowerCase().includes('card') || titleName.toLowerCase().includes('loan')) {
      title = `${titleName} - Features, Eligibility & Apply Online | BanksCart`;
    } else {
      title = `${titleName} - Online Guide & Updates | BanksCart`;
    }
    return {
      title,
      description: `${entry.desc} Check verified information and apply online with BanksCart.`
    };
  }

  // Multi-segment fallback
  const parts = cleanPath.split('/').filter(Boolean);
  if (parts.length >= 3) {
    const parent = formatSlug(parts[0]);
    const mid = formatSlug(parts[1]);
    const leaf = formatSlug(parts[2]);
    return {
      title: `${leaf} (${mid}): ${parent} Guide & Apply Online | BanksCart`,
      description: `Complete guide on ${leaf} for ${mid} under ${parent}. Compare features, interest rates, and apply online on BanksCart.`
    };
  } else if (parts.length === 2) {
    const parent = formatSlug(parts[0]);
    const leaf = formatSlug(parts[1]);
    return {
      title: `${leaf}: ${parent} Details & Apply Online | BanksCart`,
      description: `Complete guide and details on ${leaf} under ${parent}. Check requirements, compare rates, and apply online on BanksCart.`
    };
  } else if (parts.length === 1) {
    const slug = formatSlug(parts[0]);
    return {
      title: `${slug} - Details, Eligibility & Online Services | BanksCart`,
      description: `Explore comprehensive information on ${slug} at BanksCart. Check verified terms and apply online.`
    };
  }

  return {
    title: "BanksCart: Financial Services, Loans & Credit Cards Online",
    description: "Compare and apply for personal loans, home loans, credit cards, and banking services online at BanksCart."
  };
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generates rich semantic HTML for any route to eliminate the 0-word empty client-side shell.
 * Bots, search spiders, and initial HTTP requests receive a fully populated DOM.
 */
function generatePreRenderedBody(cleanPath, meta) {
  const title = escapeHtml(meta.title);
  const desc = escapeHtml(meta.description);

  // 1. Personal Loan Sub-Pages (Render from loanPageData)
  if (cleanPath.startsWith('/loans/personal')) {
    const sub = cleanPath.replace('/loans/personal/', '').replace('/loans/personal', '') || 'overview';
    const data = loanPageData[sub] || loanPageData['overview'];
    if (data) {
      const pTitle = escapeHtml(data.title || title);
      const pIntro = escapeHtml(data.intro || desc);
      const pMoreIntro = escapeHtml(data.moreIntro || '');
      const features = data.keyFeatures || [];
      const headers = data.repaymentHeaders || [];
      const rows = data.repaymentDetails || [];
      const tips = data.boostTips || [];
      const faqs = data.faqs || [];

      return `
      <div class="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
        <header class="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
          <div class="max-w-7xl mx-auto flex items-center justify-between">
            <a href="/" class="text-2xl font-bold tracking-tight text-blue-900">BanksCart</a>
            <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
              <a href="/loans" class="hover:text-blue-600 transition-colors">Loans</a>
              <a href="/cards" class="hover:text-blue-600 transition-colors">Credit Cards</a>
              <a href="/calculators" class="hover:text-blue-600 transition-colors">Calculators</a>
              <a href="/credit-score" class="hover:text-blue-600 transition-colors">Credit Score</a>
              <a href="/blog" class="hover:text-blue-600 transition-colors">Financial Guides</a>
            </nav>
          </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          <nav aria-label="Breadcrumb" class="text-sm text-slate-500">
            <ol class="flex items-center space-x-2">
              <li><a href="/" class="hover:text-blue-600">Home</a></li>
              <li><span>/</span></li>
              <li><a href="/loans" class="hover:text-blue-600">Loans</a></li>
              <li><span>/</span></li>
              <li><a href="/loans/personal" class="hover:text-blue-600">Personal Loan</a></li>
              <li><span>/</span></li>
              <li class="text-slate-800 font-medium" aria-current="page">${pTitle}</li>
            </ol>
          </nav>

          <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
            <span class="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-full border border-blue-200">${escapeHtml(data.badge || 'Verified Loan Comparison')}</span>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">${pTitle}</h1>
            <p class="text-lg text-slate-600 leading-relaxed max-w-4xl">${pIntro}</p>
            ${pMoreIntro ? `<p class="text-base text-slate-600 leading-relaxed max-w-4xl">${pMoreIntro}</p>` : ''}
            <div class="pt-4 flex flex-wrap gap-4">
              <a href="/personal-loan-emi-calculator" class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow">Calculate Loan EMI</a>
              <a href="/credit-score" class="inline-flex items-center justify-center px-6 py-3 bg-slate-100 text-slate-800 font-medium rounded-lg hover:bg-slate-200 transition-colors border border-slate-300">Check Credit Score</a>
            </div>
          </section>

          ${features.length > 0 ? `
          <section class="space-y-6">
            <h2 class="text-2xl font-bold text-slate-900 tracking-tight">${escapeHtml(data.keyFeaturesTitle || 'Key Loan Features & Benefits')}</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              ${features.map(f => `
              <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 class="text-lg font-semibold text-slate-900 mb-2">${escapeHtml(f.label)}</h3>
                <p class="text-slate-600 text-sm leading-relaxed">${escapeHtml(f.text)}</p>
              </div>
              `).join('')}
            </div>
          </section>` : ''}

          ${rows.length > 0 ? `
          <section class="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 class="text-2xl font-bold text-slate-900 tracking-tight">${escapeHtml(data.repaymentDetailsTitle || 'Lender Comparison & Rate Breakdown')}</h2>
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    ${headers.map(h => `<th class="py-3 px-4">${escapeHtml(h)}</th>`).join('')}
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
                  ${rows.map(r => `
                  <tr class="hover:bg-slate-50/50 transition-colors">
                    <td class="py-3 px-4 font-medium text-slate-900">${escapeHtml(r.col1)}</td>
                    <td class="py-3 px-4 text-blue-700 font-semibold">${escapeHtml(r.col2)}</td>
                    <td class="py-3 px-4">${escapeHtml(r.col3)}</td>
                    <td class="py-3 px-4">${escapeHtml(r.col4)}</td>
                  </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </section>` : ''}

          ${tips.length > 0 ? `
          <section class="space-y-6 bg-blue-50/50 p-8 rounded-2xl border border-blue-100">
            <h2 class="text-2xl font-bold text-slate-900 tracking-tight">${escapeHtml(data.boostTipsTitle || 'Important Checklist Before Applying')}</h2>
            <ul class="space-y-3">
              ${tips.map(tip => `
              <li class="flex items-start text-slate-700 text-sm leading-relaxed">
                <span class="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0"></span>
                <span>${escapeHtml(tip)}</span>
              </li>
              `).join('')}
            </ul>
          </section>` : ''}

          ${faqs.length > 0 ? `
          <section class="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            <div class="divide-y divide-slate-200">
              ${faqs.map(faq => `
              <article class="py-4">
                <h3 class="text-base font-semibold text-slate-900">${escapeHtml(faq.q)}</h3>
                <p class="mt-2 text-sm text-slate-600 leading-relaxed">${escapeHtml(faq.a)}</p>
              </article>
              `).join('')}
            </div>
          </section>` : ''}
        </main>
        ${renderFooter()}
      </div>
      `;
    }
  }

    // 1b. About Us Dedicated Pre-rendering
  if (cleanPath === '/about' || cleanPath === '/about-us') {
    return `
    <div class="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <header class="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" class="text-2xl font-bold tracking-tight text-blue-900">BanksCart</a>
          <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <a href="/loans" class="hover:text-blue-600 transition-colors">Loans</a>
            <a href="/cards" class="hover:text-blue-600 transition-colors">Credit Cards</a>
            <a href="/calculators" class="hover:text-blue-600 transition-colors">Calculators</a>
            <a href="/credit-score" class="hover:text-blue-600 transition-colors">Credit Score</a>
            <a href="/blog" class="hover:text-blue-600 transition-colors">Financial Guides</a>
          </nav>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <nav aria-label="Breadcrumb" class="text-sm text-slate-500">
          <ol class="flex items-center space-x-2">
            <li><a href="/" class="hover:text-blue-600">Home</a></li>
            <li><span>/</span></li>
            <li class="text-slate-800 font-medium" aria-current="page">About Us</li>
          </ol>
        </nav>

        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
          <span class="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-full border border-blue-200">About BanksCart</span>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">Empowering India’s Borrowers with Transparent Financial Choices</h1>
          <p class="text-lg text-slate-600 leading-relaxed max-w-4xl">BanksCart is India’s premier independent loan comparison and financial marketplace. We partner with over 30 leading scheduled commercial banks and RBI-registered NBFCs to bring total transparency, zero hidden charges, and market-competitive loan products to everyday borrowers and growing businesses.</p>
          <p class="text-base text-slate-600 leading-relaxed max-w-4xl">From personal loans and home mortgages to collateral-free MSME credit and high-reward credit cards, BanksCart provides data-driven financial tools, algorithmic eligibility checks, and real-time interest comparisons—completely free for consumers.</p>
          <div class="pt-4 flex flex-wrap gap-4">
            <a href="/loans/personal/overview" class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow">Compare Personal Loans</a>
            <a href="/credit-score" class="inline-flex items-center justify-center px-6 py-3 bg-slate-100 text-slate-800 font-medium rounded-lg hover:bg-slate-200 transition-colors border border-slate-300">Free Credit Score Check</a>
          </div>
        </section>

        <section class="space-y-6">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Our Core Mission & Values</h2>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">100% Unbiased Transparency</h3>
              <p class="text-slate-600 text-sm leading-relaxed">We present loan offers with complete disclosure of interest rates, processing fees, APRs, and prepayment clauses without hidden markups.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Borrower-Centric Advice</h3>
              <p class="text-slate-600 text-sm leading-relaxed">Our algorithmic recommendation engine matches applicants to lenders based on genuine qualification criteria to protect credit scores.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Bank-Grade Security</h3>
              <p class="text-slate-600 text-sm leading-relaxed">256-bit encryption and strict adherence to RBI digital lending guidelines safeguard all applicant data and financial privacy.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">PAN-India Accessibility</h3>
              <p class="text-slate-600 text-sm leading-relaxed">Serving borrowers across 1,000+ Tier-1, Tier-2, and Tier-3 cities with rapid digital application workflows and instant eligibility calculations.</p>
            </div>
          </div>
        </section>

        <section class="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Institutional Lending Partners</h2>
          <p class="text-slate-600 text-sm">We aggregate verified loan offers and credit card products from India's most respected banking institutions:</p>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-slate-800">State Bank of India</div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-slate-800">HDFC Bank</div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-slate-800">ICICI Bank</div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-slate-800">Axis Bank</div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-slate-800">Kotak Mahindra Bank</div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-slate-800">Punjab National Bank</div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-slate-800">Bank of Baroda</div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-slate-800">Bajaj Finserv</div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-slate-800">Tata Capital</div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-slate-800">Aditya Birla Capital</div>
          </div>
        </section>

        <section class="space-y-6 bg-slate-900 text-white p-8 rounded-2xl shadow-sm">
          <h2 class="text-2xl font-bold tracking-tight">Our Trust Milestones</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div class="text-3xl font-extrabold text-blue-400">₹5,000 Cr+</div>
              <div class="text-sm text-slate-300 mt-1">Loan Inquiries Facilitated</div>
            </div>
            <div>
              <div class="text-3xl font-extrabold text-blue-400">30+</div>
              <div class="text-sm text-slate-300 mt-1">Partner Lenders</div>
            </div>
            <div>
              <div class="text-3xl font-extrabold text-blue-400">1,000+</div>
              <div class="text-sm text-slate-300 mt-1">Cities & Towns Covered</div>
            </div>
            <div>
              <div class="text-3xl font-extrabold text-blue-400">99.2%</div>
              <div class="text-sm text-slate-300 mt-1">Customer Satisfaction</div>
            </div>
          </div>
        </section>

        <section class="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Regulatory Compliance & Editorial Standards</h2>
          <p class="text-slate-600 text-sm leading-relaxed">BanksCart operates strictly within the framework of digital lending guidelines issued by the Reserve Bank of India (RBI). As an aggregator and comparison platform, we do not charge borrowers any advance fees for loan comparisons or eligibility inquiries. All interest rates, loan amounts, tenures, processing fees, and documentation mandates displayed on our platform are verified regularly against official bank schedules and lending terms.</p>
          <div class="pt-4 flex flex-wrap gap-4 text-xs text-slate-500">
            <span>Corporate Address: BanksCart Financial Technologies, New Delhi, India</span>
            <span>&bull;</span>
            <span>Contact: support@bankscart.com</span>
          </div>
        </section>
      </main>
      ${renderFooter()}
    </div>
    `;
  }

    // 1c. Blog Hub Dedicated Pre-rendering (/blog)
  if (cleanPath === '/blog') {
    return `
    <div class="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <header class="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" class="text-2xl font-bold tracking-tight text-blue-900">BanksCart</a>
          <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <a href="/loans" class="hover:text-blue-600 transition-colors">Loans</a>
            <a href="/cards" class="hover:text-blue-600 transition-colors">Credit Cards</a>
            <a href="/calculators" class="hover:text-blue-600 transition-colors">Calculators</a>
            <a href="/credit-score" class="hover:text-blue-600 transition-colors">Credit Score</a>
            <a href="/blog" class="text-blue-600 font-semibold transition-colors">Financial Guides</a>
          </nav>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <nav aria-label="Breadcrumb" class="text-sm text-slate-500">
          <ol class="flex items-center space-x-2">
            <li><a href="/" class="hover:text-blue-600">Home</a></li>
            <li><span>/</span></li>
            <li class="text-slate-800 font-medium" aria-current="page">Blog & Financial Guides</li>
          </ol>
        </nav>

        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6 text-center">
          <span class="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-full border border-blue-200">Expert Financial Insights</span>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">BanksCart Financial Blog & News</h1>
          <p class="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">Master your personal finances with verified guides on loans, credit cards, investment strategies, credit scores, and regulatory updates in India.</p>
        </section>

        <section class="space-y-6">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight text-center">Popular Categories</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Banking Guides</h3>
              <p class="text-slate-600 text-sm">Step-by-step walk-throughs for savings accounts, deposits, and banking rules.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Loan & EMI Tips</h3>
              <p class="text-slate-600 text-sm">Actionable advice to lower interest burdens and speed up loan approvals.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Credit Card Insights</h3>
              <p class="text-slate-600 text-sm">Max out rewards points, cashback categories, and airport lounge perks.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Investment Strategies</h3>
              <p class="text-slate-600 text-sm">Long-term wealth building with Mutual Funds, FDs, PPF, and Gold Bonds.</p>
            </div>
          </div>
        </section>

        <section class="space-y-6">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Featured Financial Articles</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <span class="text-xs font-semibold text-blue-600 uppercase">Credit Rating</span>
              <h3 class="text-lg font-bold text-slate-900"><a href="/blogs/what-is-cibil-score" class="hover:text-blue-600">The Ultimate Guide to CIBIL Score Mastery</a></h3>
              <p class="text-sm text-slate-600">Learn how your credit score is calculated and actionable steps to reach a 750+ score fast.</p>
              <a href="/blogs/what-is-cibil-score" class="text-sm font-medium text-blue-600 hover:text-blue-700 inline-block">Read Article &rarr;</a>
            </article>

            <article class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <span class="text-xs font-semibold text-blue-600 uppercase">Cards</span>
              <h3 class="text-lg font-bold text-slate-900"><a href="/blogs/Best-Credit-Cards" class="hover:text-blue-600">Best Credit Cards in India Ranked</a></h3>
              <p class="text-sm text-slate-600">Compare top rewards cards, cashback benefits, fuel waivers, and airport lounge access.</p>
              <a href="/blogs/Best-Credit-Cards" class="text-sm font-medium text-blue-600 hover:text-blue-700 inline-block">Read Article &rarr;</a>
            </article>

            <article class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <span class="text-xs font-semibold text-blue-600 uppercase">Business Finance</span>
              <h3 class="text-lg font-bold text-slate-900"><a href="/blogs/Business-Loan-Guide" class="hover:text-blue-600">The Ultimate Business Loan Guide</a></h3>
              <p class="text-sm text-slate-600">Everything entrepreneurs need to know about MSME credit, CGTMSE schemes, and collateral-free funding.</p>
              <a href="/blogs/Business-Loan-Guide" class="text-sm font-medium text-blue-600 hover:text-blue-700 inline-block">Read Article &rarr;</a>
            </article>

            <article class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <span class="text-xs font-semibold text-blue-600 uppercase">Fixed Income</span>
              <h3 class="text-lg font-bold text-slate-900"><a href="/blogs/Fixed-Deposit-Guide" class="hover:text-blue-600">Fixed Deposit (FD) Complete Blueprint</a></h3>
              <p class="text-sm text-slate-600">Compare latest bank FD interest rates, cumulative options, and senior citizen returns.</p>
              <a href="/blogs/Fixed-Deposit-Guide" class="text-sm font-medium text-blue-600 hover:text-blue-700 inline-block">Read Article &rarr;</a>
            </article>

            <article class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <span class="text-xs font-semibold text-blue-600 uppercase">Government Schemes</span>
              <h3 class="text-lg font-bold text-slate-900"><a href="/blogs/Sukanya-Samriddhi-Yojana-Guide" class="hover:text-blue-600">Sukanya Samriddhi Yojana (SSY) Rules</a></h3>
              <p class="text-sm text-slate-600">Complete guide to EEE tax exemption, 8.2% government interest, and girl child savings.</p>
              <a href="/blogs/Sukanya-Samriddhi-Yojana-Guide" class="text-sm font-medium text-blue-600 hover:text-blue-700 inline-block">Read Article &rarr;</a>
            </article>

            <article class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <span class="text-xs font-semibold text-blue-600 uppercase">Mortgage & Loans</span>
              <h3 class="text-lg font-bold text-slate-900"><a href="/blogs/Home-Loan-Guide" class="hover:text-blue-600">Step-by-Step Home Loan Approval Blueprint</a></h3>
              <p class="text-sm text-slate-600">Navigate property legal verification, interest rate options, and Section 24 tax benefits.</p>
              <a href="/blogs/Home-Loan-Guide" class="text-sm font-medium text-blue-600 hover:text-blue-700 inline-block">Read Article &rarr;</a>
            </article>
          </div>
        </section>
      </main>
      ${renderFooter()}
    </div>
    `;
  }

  // 2. Directory Services (Company registration, Aadhaar, Credit Rectification, etc.)
  if (directoryLinks[cleanPath]) {
    const entry = directoryLinks[cleanPath];
    const name = escapeHtml(entry.name);
    const category = escapeHtml(entry.category);

    return `
    <div class="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <header class="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" class="text-2xl font-bold tracking-tight text-blue-900">BanksCart</a>
          <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <a href="/loans" class="hover:text-blue-600 transition-colors">Loans</a>
            <a href="/cards" class="hover:text-blue-600 transition-colors">Credit Cards</a>
            <a href="/calculators" class="hover:text-blue-600 transition-colors">Calculators</a>
            <a href="/credit-score" class="hover:text-blue-600 transition-colors">Credit Score</a>
            <a href="/blog" class="hover:text-blue-600 transition-colors">Financial Guides</a>
          </nav>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <nav aria-label="Breadcrumb" class="text-sm text-slate-500">
          <ol class="flex items-center space-x-2">
            <li><a href="/" class="hover:text-blue-600">Home</a></li>
            <li><span>/</span></li>
            <li><a href="/financial-directory" class="hover:text-blue-600">Directory</a></li>
            <li><span>/</span></li>
            <li><span class="text-slate-600">${category}</span></li>
            <li><span>/</span></li>
            <li class="text-slate-800 font-medium" aria-current="page">${name}</li>
          </ol>
        </nav>

        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
          <span class="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider rounded-full border border-indigo-200">${category}</span>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">${name}</h1>
          <p class="text-lg text-slate-600 leading-relaxed max-w-4xl">${desc}</p>
          <p class="text-base text-slate-600 leading-relaxed max-w-4xl">Explore official guidelines, statutory documentation, application deadlines, and procedural workflows for ${name} on BanksCart. Our centralized banking platform connects applicants with verified information, institutional processing benchmarks, and direct compliance support.</p>
          <div class="pt-4 flex flex-wrap gap-4">
            <a href="/eligibility" class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow">Check Eligibility Online</a>
            <a href="/calculators" class="inline-flex items-center justify-center px-6 py-3 bg-slate-100 text-slate-800 font-medium rounded-lg hover:bg-slate-200 transition-colors border border-slate-300">Financial Planning Tools</a>
          </div>
        </section>

        <section class="space-y-6">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Key Parameters & Procedural Standards</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Statutory Compliance</h3>
              <p class="text-slate-600 text-sm leading-relaxed">Ensure full alignment with regulatory standards, official registrar filings, and verified documentation protocols for seamless processing.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Turnaround Timelines</h3>
              <p class="text-slate-600 text-sm leading-relaxed">Standard digital verification and initial review cycles typically execute within 24 to 72 business hours upon complete dossier submission.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Document Readiness</h3>
              <p class="text-slate-600 text-sm leading-relaxed">Keep verified identity proofs, registered address credentials, PAN records, and applicable financial records ready to prevent application rejection.</p>
            </div>
          </div>
        </section>

        <section class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Step-by-Step Overview & Guidelines for ${name}</h2>
          <p class="text-slate-700 text-base leading-relaxed">Navigating ${name} requires a systematic approach to meet official regulatory and banking mandates. Whether submitting fresh documentation, requesting corrections, or verifying statutory credentials, applicants must verify all identity markers and financial particulars beforehand.</p>
          <div class="space-y-4">
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h3 class="font-semibold text-slate-900 text-base">1. Pre-Application Verification</h3>
              <p class="text-sm text-slate-600 mt-1">Review all eligibility guidelines, prerequisites, and identification documents to ensure full compliance before filing.</p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h3 class="font-semibold text-slate-900 text-base">2. Secure Digital Submission</h3>
              <p class="text-sm text-slate-600 mt-1">Complete digital application forms accurately, avoiding spelling discrepancies between PAN, Aadhaar, and banking records.</p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h3 class="font-semibold text-slate-900 text-base">3. Tracking & Institutional Acknowledgment</h3>
              <p class="text-sm text-slate-600 mt-1">Receive official application reference numbers or service request tokens to monitor progress through verified tracking dashboards.</p>
            </div>
          </div>
        </section>

        <section class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions: ${name}</h2>
          <div class="divide-y divide-slate-200">
            <article class="py-4">
              <h3 class="text-base font-semibold text-slate-900">What are the primary prerequisites for ${name}?</h3>
              <p class="mt-2 text-sm text-slate-600 leading-relaxed">Applicants must hold valid government-issued photo identity proofs (such as PAN or Aadhaar), active contact numbers, and relevant supporting documents specific to this service.</p>
            </article>
            <article class="py-4">
              <h3 class="text-base font-semibold text-slate-900">How can I track the progress of my request?</h3>
              <p class="mt-2 text-sm text-slate-600 leading-relaxed">You can monitor application milestones online using your unique reference acknowledgment number via the official tracking portal or BanksCart status checker.</p>
            </article>
            <article class="py-4">
              <h3 class="text-base font-semibold text-slate-900">Are there statutory or administrative charges applicable?</h3>
              <p class="mt-2 text-sm text-slate-600 leading-relaxed">Standard government or banking fees vary based on the specific transaction category, tenure, or processing speed requested. Verify official fee schedules before payment.</p>
            </article>
          </div>
        </section>
      </main>
      ${renderFooter()}
    </div>
    `;
  }

  // 3. General Landing & Hub Pages (Homepage, /loans, /cards, /blogs, etc.)
  const formattedCategory = formatSlug(cleanPath.split('/')[1] || 'Banking');
  return `
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
    <header class="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" class="text-2xl font-bold tracking-tight text-blue-900">BanksCart</a>
        <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
          <a href="/loans" class="hover:text-blue-600 transition-colors">Loans</a>
          <a href="/cards" class="hover:text-blue-600 transition-colors">Credit Cards</a>
          <a href="/calculators" class="hover:text-blue-600 transition-colors">Calculators</a>
          <a href="/credit-score" class="hover:text-blue-600 transition-colors">Credit Score</a>
          <a href="/blog" class="hover:text-blue-600 transition-colors">Financial Guides</a>
        </nav>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <nav aria-label="Breadcrumb" class="text-sm text-slate-500">
        <ol class="flex items-center space-x-2">
          <li><a href="/" class="hover:text-blue-600">Home</a></li>
          ${cleanPath !== '/' ? `<li><span>/</span></li><li class="text-slate-800 font-medium" aria-current="page">${title}</li>` : ''}
        </ol>
      </nav>

      <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
        <span class="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-full border border-blue-200">${formattedCategory}</span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">${title}</h1>
        <p class="text-lg text-slate-600 leading-relaxed max-w-4xl">${desc}</p>
        <p class="text-base text-slate-600 leading-relaxed max-w-4xl">Compare options side-by-side from India's leading banks and financial institutions on BanksCart. Get instant interest rate quotes, evaluate tenure options, and check eligibility criteria with transparent terms and paperless digital processes.</p>
        <div class="pt-4 flex flex-wrap gap-4">
          <a href="/loans" class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow">Compare Loans</a>
          <a href="/cards" class="inline-flex items-center justify-center px-6 py-3 bg-slate-100 text-slate-800 font-medium rounded-lg hover:bg-slate-200 transition-colors border border-slate-300">Explore Credit Cards</a>
        </div>
      </section>

      <section class="space-y-6">
        <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Key Features & Services</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 class="text-lg font-semibold text-slate-900 mb-2">Verified Comparisons</h3>
            <p class="text-slate-600 text-sm leading-relaxed">Access up-to-date interest rate benchmarks, annual charges, processing fees, and eligibility thresholds across 30+ top Indian lenders.</p>
          </div>
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 class="text-lg font-semibold text-slate-900 mb-2">Instant Eligibility Check</h3>
            <p class="text-slate-600 text-sm leading-relaxed">Verify your approval chances in 2 minutes without affecting your official CIBIL credit score using our free eligibility calculators.</p>
          </div>
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 class="text-lg font-semibold text-slate-900 mb-2">Digital & Paperless</h3>
            <p class="text-slate-600 text-sm leading-relaxed">Experience hassle-free digital application pathways with fast document verification, e-KYC support, and rapid turnaround times.</p>
          </div>
        </div>
      </section>

      <section class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
        <div class="divide-y divide-slate-200">
          <article class="py-4">
            <h3 class="text-base font-semibold text-slate-900">How does BanksCart help me compare financial products?</h3>
            <p class="mt-2 text-sm text-slate-600 leading-relaxed">BanksCart provides unbiased, side-by-side comparisons of interest rates, fees, loan tenures, and reward points from top banks and NBFCs in India, allowing you to choose the most cost-effective solution.</p>
          </article>
          <article class="py-4">
            <h3 class="text-base font-semibold text-slate-900">Does checking loan options on BanksCart hurt my credit score?</h3>
            <p class="mt-2 text-sm text-slate-600 leading-relaxed">No. Initial eligibility assessments and calculator comparisons execute as soft inquiries that have zero impact on your CIBIL rating.</p>
          </article>
          <article class="py-4">
            <h3 class="text-base font-semibold text-slate-900">Are BanksCart comparison services free for users?</h3>
            <p class="mt-2 text-sm text-slate-600 leading-relaxed">Yes, all loan comparisons, eligibility tools, EMI calculators, and credit score checks on BanksCart are 100% free with no hidden charges.</p>
          </article>
        </div>
      </section>
    </main>
    ${renderFooter()}
  </div>
  `;
}

function renderFooter() {
  return `
  <footer class="bg-slate-900 text-slate-400 py-12 px-6 mt-16 border-t border-slate-800">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
      <div>
        <span class="text-xl font-bold text-white">BanksCart</span>
        <p class="mt-3 text-slate-400 text-xs leading-relaxed">BanksCart provides independent digital comparisons, banking tools, and verified financial service directories for Indian consumers and businesses.</p>
      </div>
      <div>
        <h4 class="font-semibold text-white mb-3">Popular Portals</h4>
        <ul class="space-y-2 text-xs">
          <li><a href="/loans/personal" class="hover:text-white">Personal Loans</a></li>
          <li><a href="/loans/home" class="hover:text-white">Home Loans</a></li>
          <li><a href="/cards/credit" class="hover:text-white">Credit Cards</a></li>
          <li><a href="/credit-score" class="hover:text-white">Credit Score</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold text-white mb-3">Calculators</h4>
        <ul class="space-y-2 text-xs">
          <li><a href="/personal-loan-emi-calculator" class="hover:text-white">Personal Loan EMI</a></li>
          <li><a href="/home-loan-emi-calculator" class="hover:text-white">Home Loan EMI</a></li>
          <li><a href="/income-tax-calculator" class="hover:text-white">Tax Calculator</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold text-white mb-3">Company</h4>
        <ul class="space-y-2 text-xs">
          <li><a href="/about" class="hover:text-white">About Us</a></li>
          <li><a href="/privacy-policy" class="hover:text-white">Privacy Policy</a></li>
          <li><a href="/terms-of-use" class="hover:text-white">Terms of Use</a></li>
          <li><a href="/sitemap" class="hover:text-white">Sitemap</a></li>
        </ul>
      </div>
    </div>
    <div class="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-800 text-xs text-slate-500 text-center">
      &copy; ${new Date().getFullYear()} BanksCart. All rights reserved.
    </div>
  </footer>
  `;
}

console.log(`Pre-rendering semantic HTML and tailored SEO meta tags for ${urls.length} sitemap URLs into dist/...`);

let pagesGenerated = 0;

for (const urlPath of urls) {
  const cleanPath = urlPath === '/' ? '' : urlPath.replace(/\/$/, '');
  const meta = resolveSEO(cleanPath || '/');
  let canonicalUrl = `https://www.bankscart.com${cleanPath}`;
  if (cleanPath === '/about-us') {
    canonicalUrl = 'https://www.bankscart.com/about';
  } else if (cleanPath === '/blogs' || cleanPath === '/blogs-overview-page') {
    canonicalUrl = 'https://www.bankscart.com/blog';
  }

  // 301 Redirect Pages for legacy /blogs and /blogs-overview-page
  if (cleanPath === '/blogs' || cleanPath === '/blogs-overview-page') {
    const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=/blog">
  <link rel="canonical" href="https://www.bankscart.com/blog" />
  <title>BanksCart Financial Blog &amp; News: Expert Guides, Loan Tips &amp; Analysis</title>
  <script>window.location.replace('/blog');</script>
</head>
<body>
  <p>Moved Permanently. Redirecting to <a href="/blog">https://www.bankscart.com/blog</a>...</p>
</body>
</html>`;
    const targetDir = path.join(distDir, cleanPath.replace(/^\//, ''));
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(path.join(targetDir, 'index.html'), redirectHtml, 'utf8');
    pagesGenerated++;
    continue;
  }

  // Generate semantic pre-rendered body content
  const prerenderedBody = generatePreRenderedBody(cleanPath || '/', meta);

  // Tailor HTML
  let pageHtml = templateHtml;

  // Replace Title
  pageHtml = pageHtml.replace(
    /<title>.*?<\/title>/i,
    `<title>${escapeHtml(meta.title)}</title>`
  );

  // Replace Description & Inject Canonical / OG Tags
  const metaTags = `
    <meta name="description" content="${escapeHtml(meta.description)}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://www.bankscart.com/favicon-32x32.png" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
    <meta name="twitter:image" content="https://www.bankscart.com/favicon-32x32.png" />`;

  // Replace or inject description
  if (pageHtml.includes('name="description"')) {
    pageHtml = pageHtml.replace(/<meta[^>]*name="description"[^>]*>/i, metaTags.trim());
  } else {
    pageHtml = pageHtml.replace('</head>', `${metaTags}\n  </head>`);
  }

  // Pre-render semantic body inside <div id="root"></div>
  pageHtml = pageHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${prerenderedBody}</div>`
  );

  if (!cleanPath) {
    // Root index.html
    fs.writeFileSync(templatePath, pageHtml, 'utf8');
    pagesGenerated++;
  } else {
    const targetDir = path.join(distDir, cleanPath.replace(/^\//, ''));
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    const targetFile = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetFile, pageHtml, 'utf8');
    pagesGenerated++;
  }
}


// Explicit generation of legacy redirect pages (guarantees dist/blogs and dist/blogs-overview-page exist even when excluded from sitemap.xml)
const legacyRedirects = [
  { path: '/blogs', target: '/blog' },
  { path: '/blogs-overview-page', target: '/blog' }
];

for (const redir of legacyRedirects) {
  const targetDir = path.join(distDir, redir.path.replace(/^\//, ''));
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=${redir.target}">
  <link rel="canonical" href="https://www.bankscart.com${redir.target}" />
  <title>BanksCart Financial Blog &amp; News: Expert Guides, Loan Tips &amp; Analysis</title>
  <script>window.location.replace('${redir.target}');</script>
</head>
<body>
  <p>Moved Permanently. Redirecting to <a href="${redir.target}">https://www.bankscart.com${redir.target}</a>...</p>
</body>
</html>`;
  fs.writeFileSync(path.join(targetDir, 'index.html'), redirectHtml, 'utf8');
}

console.log(`Successfully pre-rendered ${pagesGenerated} static HTML pages in dist/ with rich semantic HTML (eliminating 0-word empty client shells).`);
