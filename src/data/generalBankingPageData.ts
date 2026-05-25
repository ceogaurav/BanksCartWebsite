export interface BankingFeature {
  label: string;
  text: string;
}

export interface BankingFAQ {
  q: string;
  a: string;
}

export interface BankingPageContent {
  title: string;
  badge: string;
  intro: string;
  moreIntro?: string;
  highlightsTitle: string;
  highlights: BankingFeature[];
  ratesTitle?: string;
  ratesHeaders?: string[];
  ratesRows?: string[][];
  faqs: BankingFAQ[];
}

export const GENERAL_BANKING_PAGE_MAP: Record<string, BankingPageContent> = {
  "adani-capital": {
    title: "Adani Capital Business Loan: Commercial Equipment & SME Finance",
    badge: "SME Working Capital",
    intro: "Adani Capital is a leading Non-Banking Financial Company (NBFC) dedicated to fueling the entrepreneurial aspirations of small-scale retailers, farmers, micro-corporates, and logistics operators. Offering competitive interest brackets and customized lending pipelines, the company focuses on delivering immediate retail credits.",
    moreIntro: "At BanksCart, we compare Adani Capital's commercial credit offerings to ensure you secure the lowest processing overheads and convenient reducing EMI slabs completely online.",
    highlightsTitle: "Why Choose Adani Capital?",
    highlights: [
      { label: "Micro Enterprise Focus", text: "Structured credit solutions tailored for small shop owners and micro manufacturing units." },
      { label: "Commercial Vehicle Slabs", text: "Finance commercial cargo vehicles, loaders, and tractors with minimal asset security." },
      { label: "Digital Underwriting", text: "Digitized background checks guarantee approval confirmations under 48 hours." }
    ],
    ratesTitle: "Adani Capital Lending Slabs",
    ratesHeaders: ["Loan Category", "Interest Rates (p.a.)", "Min Turnover Required", "Max Tenure"],
    ratesRows: [
      ["Micro Business Loan", "Starting at 14.50% p.a.", "₹10 Lakhs annually", "Up to 36 Months"],
      ["Commercial Vehicle Loan", "Starting at 10.50% p.a.", "Valid license + Domicile", "Up to 60 Months"],
      ["Farm Equipment Finance", "Starting at 11.00% p.a.", "Agricultural land logs", "Up to 48 Months"]
    ],
    faqs: [
      { q: "Is Adani Capital a licensed bank?", a: "No. Adani Capital operates as a systemic Non-Banking Financial Company (NBFC) registered with the Reserve Bank of India (RBI)." },
      { q: "What is the primary target group for Adani Capital?", a: "The company primarily focuses on providing credit to underserved micro-markets, local traders, farmers, and small transport operators." }
    ]
  },
  "adani-housing-finance": {
    title: "Adani Housing Finance: Affordable Mortgage & Home Loan Slabs",
    badge: "Affordable Housing",
    intro: "Adani Housing Finance is dedicated to making homeownership a reality for the retail customer segments. Focusing on affordable mortgage credit lines and customized property evaluations, the company provides easy loans for purchasing flats, constructing homes, or expanding rural properties.",
    moreIntro: "At BanksCart, we simplify housing loans. We compare Adani Housing Finance's reducing interest rates to ensure your home loans carry low EMIs and convenient long-term tenures.",
    highlightsTitle: "Adani Housing Finance Pillars",
    highlights: [
      { label: "Affordable Housing Slabs", text: "Loans custom-tailored for low and middle-income families under special interest concessional terms." },
      { label: "Technical Valuations", text: "In-house site engineers execute immediate property evaluations to authorize maximum loan-to-value limits." },
      { label: "Simplified KYC", text: "Uniquely accepts flexible income documentation pipelines for self-employed cash earners." }
    ],
    ratesTitle: "Home Loan Rate & Fee Structures",
    ratesHeaders: ["Property Category", "Interest Rate (p.a.)", "Processing Fee Slab", "Max Repayment Tenure"],
    ratesRows: [
      ["Home Purchase Loan", "Starting at 9.75% p.a. (Floating)", "Up to 1.50%", "Up to 25 Years"],
      ["Home Construction Loan", "Starting at 10.00% p.a.", "Up to 1.50%", "Up to 20 Years"],
      ["Home Extension / Renovation", "Starting at 10.50% p.a.", "Flat ₹10,000", "Up to 15 Years"]
    ],
    faqs: [
      { q: "Who is eligible to apply for Adani Housing Finance home loans?", a: "Salaried individuals earning ₹12,000/month or self-employed merchants with stable local trades are fully eligible to apply." },
      { q: "Are there pre-payment penalties?", a: "No. Under RBI mandates, there are zero pre-payment or foreclosure charges on floating interest rate home loans for individual borrowers." }
    ]
  },
  "adani-one-credit-cards": {
    title: "ICICI Bank Adani One Credit Cards: Premium Travel & Airport Rewards",
    badge: "Premium Credit Cards",
    intro: "The ICICI Bank Adani One Credit Card is a premium co-branded card designed specifically to elevate your travel, airport, and luxury lifestyle experiences. Offering substantial airport reward points, free lounge access, and exclusive duty-free vouchers, it is the ultimate wallet addition for frequent flyers.",
    moreIntro: "At BanksCart, we detail card benefits, annual charges, reward structures, and cashback slabs to help you maximize your savings on every flight check-in.",
    highlightsTitle: "Core Card Highlights",
    highlights: [
      { label: "Massive Welcoming Points", text: "Get up to 2,000 Adani One reward points upon card activation, redeemable on flights and hotels." },
      { label: "Airport Premium Services", text: "Enjoy free airport lounge access, valet parking, fast-track security clearances, and porter services." },
      { label: "Duty-Free Cashbacks", text: "Get up to 7% cashback on all spends executed on the Adani One ecosystem and duty-free retail hubs." }
    ],
    faqs: [
      { q: "What is the annual fee for the Adani One Credit Card?", a: "The card carries a standard annual fee of ₹1,499 + GST, which is completely waived if annual spends exceed ₹3 Lakhs." },
      { q: "Where can I redeem my Adani One reward points?", a: "Points are redeemable online for booking flights, hotels, duty-free shopping, airport parking, and cab services via the Adani One app." }
    ]
  },
  "adani-one-signature-credit-card": {
    title: "ICICI Bank Adani One Signature Credit Card: Ultra-Luxury Travel Privileges",
    badge: "Elite Credit Cards",
    intro: "Step into a world of elite luxury with the ICICI Bank Adani One Signature Credit Card. Custom-designed for high-net-worth individuals and corporate flyers, this signature card delivers unparalleled airport experiences, premium concierge desks, and elite multiplier reward programs.",
    moreIntro: "At BanksCart, we compare reward tier multipliers to help you exploit luxury lifestyle savings, free luxury lounge access, and dynamic hotel booking credits.",
    highlightsTitle: "Highlights of Adani One Signature Card",
    highlights: [
      { label: "Elite Welcome Gift", text: "Receive 5,000 premium Adani One reward points (worth ₹5,000) instantly upon card setup." },
      { label: "Unlimited Lounge Slabs", text: "Access premium domestic and international airport lounges free of cost throughout the year." },
      { label: "7% Reward Multiplier", text: "Earn unmatched 7% reward points on flights, utility bill payments, and premium duty-free purchases." }
    ],
    faqs: [
      { q: "What are the key benefits of the Adani One Signature Credit Card compared to the base card?", a: "The Signature Card offers double welcome points (5,000 vs 2,000), unlimited domestic lounge entries, international lounge access via Priority Pass, and premium porter services." },
      { q: "What is the annual fee for the Signature card?", a: "The signature annual fee is ₹5,000 + GST, which is fully waived if annual spends exceed ₹7 Lakhs." }
    ]
  },
  "add-on-card": {
    title: "Add-On Credit Cards: Extend Credit Limits & Privileges to Family",
    badge: "Credit Extension",
    intro: "An Add-On Credit Card is a supplementary credit card issued to immediate family members (spouses, parents, or siblings above 18 years) mapped directly to your primary credit card account. It allows your family to enjoy all credit benefits, while you manage payments under a single consolidated bill.",
    moreIntro: "At BanksCart, we explain add-on limits, reward accrual splits, and credit score impacts to help you manage family credit lines safely.",
    highlightsTitle: "Highlights of Add-On Cards",
    highlights: [
      { label: "Shared Credit Limits", text: "Add-on cards leverage the primary card's credit limit. You can specify maximum spending caps per user." },
      { label: "Consolidated Billing", text: "All family expenses are compiled in a single monthly statement, simplifying reward tracking and payments." },
      { label: "Free Shared Rewards", text: "All points earned on add-on purchases compile directly into the primary reward vault." }
    ],
    faqs: [
      { q: "Is there an extra charge for add-on cards?", a: "Most premium banks offer up to 3 to 5 add-on cards completely free of cost (Lifetime Free) for primary cardholders." },
      { q: "Does an add-on cardholder get a separate credit score?", a: "No. The primary cardholder remains solely liable for payments, and all transaction logs report only to the primary cardholder's CIBIL profile." }
    ]
  },
  "account-to-account-money-transfer": {
    title: "Account-to-Account Money Transfer: IMPS, NEFT & RTGS Guides",
    badge: "Payment Systems",
    intro: "Account-to-Account (A2A) Money Transfer represents the backbone of digitized financial transactions in India. Moving money directly between two bank accounts securely has been simplified via real-time payment channels regulated by the Reserve Bank of India.",
    moreIntro: "At BanksCart, we detail processing timelines, transaction fee structures, daily transaction limits, and security procedures to make your digital transfers hassle-free.",
    highlightsTitle: "Digital Money Transfer Channels",
    highlights: [
      { label: "IMPS (Immediate Payment)", text: "Execute instant funds transfers 24/7/365, capped at ₹5 Lakhs per day for immediate clearings." },
      { label: "NEFT (National Electronic)", text: "Transact large or small amounts cleared in half-hourly batches, operating 24/7/365 with zero RBI charges online." },
      { label: "RTGS (Real-Time Gross)", text: "Designed for high-value immediate clearings exceeding ₹2 Lakhs per transaction with sovereign safety." }
    ],
    ratesTitle: "Transfer Slabs & Limits Comparison",
    ratesHeaders: ["Channel Name", "Processing Speed", "Transaction Limits", "Average Transfer Cost"],
    ratesRows: [
      ["IMPS (Immediate Service)", "Instant (within 5 seconds)", "₹1 to ₹5 Lakhs daily", "Nominal (₹2.50 to ₹10)"],
      ["NEFT (Batch Service)", "Cleared in 30-min batches", "Zero minimum / No upper limit", "Free online (Branch: nominal fee)"],
      ["RTGS (Real-Time Large)", "Instant (Real-time settlement)", "Minimum ₹2 L / No maximum", "Free online (Branch: ₹20 to ₹45)"],
      ["UPI (Mobile Payments)", "Instant (Dynamic mobile scan)", "Maximum ₹1 L to ₹5 L daily", "100% Free of Cost"]
    ],
    faqs: [
      { q: "What is the difference between NEFT and IMPS?", a: "IMPS is instant and operates strictly up to ₹5 Lakhs. NEFT clears in half-hourly batches but has no maximum amount limits." },
      { q: "What should I do if money is debited but not credited to receiver?", a: "Under RBI guidelines, the bank must auto-reverse failed transfers to your account within 24 hours (for UPI/IMPS) or T+1 working day (NEFT)." }
    ]
  },
  "accounts-payable": {
    title: "Accounts Payable (AP): Complete Guide to Working Capital Slabs",
    badge: "Corporate Finance",
    intro: "Accounts Payable (AP) represents the critical short-term financial liabilities and supplier debts that a company owes to its creditors for goods or services purchased on credit. Optimizing Accounts Payable is vital to maintain corporate liquidity, maximize cash flows, and secure high corporate credit ratings.",
    moreIntro: "At BanksCart, we detail treasury management techniques, working capital overdraft cycles, and accounting compliance protocols to boost enterprise cash health.",
    highlightsTitle: "AP Management Core Pillars",
    highlights: [
      { label: "Working Capital Balance", text: "Delaying payments strategically without breaching terms keeps cash inside business accounts longer." },
      { label: "Early-Payment Discounts", text: "Exploit suppliers' discount offers (e.g. 2/10 Net 30) to drop procurement overheads." },
      { label: "Bureau Credit Trail", text: "Clearing outstanding invoices within terms builds solid commercial credit bureau trails (CRIF/CIBIL)." }
    ],
    faqs: [
      { q: "What is the difference between Accounts Payable and Accounts Receivable?", a: "Accounts Payable is money a business owes to suppliers (Liability). Accounts Receivable is money customers owe to the business (Asset)." },
      { q: "How does Accounts Payable impact cash flows?", a: "AP represents a cash outflow source. Increasing your Days Payable Outstanding (DPO) carefully improves your active working capital reserves." }
    ]
  },
  "aditya-birla-amc-launches-aditya-birla-sun-life-psu-equity-fund": {
    title: "ABSL PSU Equity Fund: High-Yield Public Sector Investments",
    badge: "Mutual Funds NFO",
    intro: "The Aditya Birla Sun Life AMC **PSU Equity Fund** is an open-ended equity mutual fund scheme investing predominantly in Public Sector Undertakings (PSUs). It aims to compound wealth by investing in dominant government-backed oil, power, defense, and banking giants.",
    moreIntro: "At BanksCart, we analyze fund managers' strategies, historical dividend payouts, expense ratios, and asset distributions to help you secure optimal sector-diversified wealth returns.",
    highlightsTitle: "PSU Equity Fund Core Strengths",
    highlights: [
      { label: "High Dividend Yields", text: "Govt companies consistently pay massive dividends, adding a solid safety layer to equity compounding." },
      { label: "Dominant Market Share", text: "PSU companies control crucial sectors (defense, mining, energy) with zero private competition risk." },
      { label: "Undervalued Slabs", text: "PSU indices trade at low P/E ratios, offering high-margin entry slots for investors." }
    ],
    faqs: [
      { q: "Who should invest in the ABSL PSU Equity Fund?", a: "This sectoral fund is suitable for long-term investors with a high risk appetite who seek to benefit from government infrastructure spends." },
      { q: "What is the tax implication on PSU mutual fund returns?", a: "Returns are treated as Equity Capital Gains. Short-term gains (held < 1 year) are taxed at 20%, while long-term gains (held > 1 year) are taxed at 12.5% on gains exceeding ₹1.25 Lakhs." }
    ]
  },
  "aaykar-setu-income-tax-mobile-app": {
    title: "Aaykar Setu Income Tax Mobile App: Pocket Tax Tools Guide",
    badge: "Official Tax App",
    intro: "Aaykar Setu is the official mobile application launched by the Income Tax Department of India. It provides a simplified digital mobile interface that helps residents calculate direct taxes, link Aadhaar with PAN cards, pay tax dues online, and access live chat support tools.",
    moreIntro: "At BanksCart, we outline setup steps and digital tool features to ensure your tax planning and TDS monitoring can be handled in a single tap on your smartphone.",
    highlightsTitle: "Features of Aaykar Setu Mobile App",
    highlights: [
      { label: "Interactive Tax Calculators", text: "Estimate your taxes instantly under both Old and New Tax Slabs in seconds on the go." },
      { label: "Direct Challan Payments", text: "Pay self-assessment or advance tax securely via mobile net banking or debit card pathways." },
      { label: "TRP Locator & Ask IT", text: "Locate authorized Tax Return Preparers near you and ask tax queries to live AI chat assistants." }
    ],
    faqs: [
      { q: "Is Aaykar Setu safe and official?", a: "Yes. Aaykar Setu is the official, secure mobile application released directly by the Central Board of Direct Taxes (CBDT), Government of India." },
      { q: "How can I download the app?", a: "The app is available completely free of charge on the Google Play Store for Android smartphones and Apple App Store for iOS devices." }
    ]
  }
};
