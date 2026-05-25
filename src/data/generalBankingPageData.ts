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
  },
  "apparel-export-promotion-council-aepc": {
    title: "Apparel Export Promotion Council (AEPC): SME Export Guide Slabs",
    badge: "Export Promotion",
    intro: "The Apparel Export Promotion Council (AEPC) is the official national body for apparel exporters in India. Operating under the aegis of the Ministry of Textiles, AEPC plays a pivotal role in promoting Indian apparel exports globally, assisting small-scale textile manufacturers with export finance and international market linkages.",
    moreIntro: "At BanksCart, we detail textile export finance concessions, interest equalization schemes, and critical export documentation checklists to boost your global sales.",
    highlightsTitle: "Core AEPC Exporter Facilities",
    highlights: [
      { label: "Market Access Initiatives", text: "Direct financial assistance to participate in global trade exhibitions and buyer seller meets." },
      { label: "Textile Credit Schemes", text: "Access cheap export finance and interest subventions up to 3% to 5% p.a." },
      { label: "Skill & Training Centers", text: "On-site skill training programs operated by the Apparel Training and Design Centre (ATDC)." }
    ],
    faqs: [
      { q: "How does AEPC help Indian apparel startups?", a: "AEPC acts as an export facilitation bridge, providing exporters with direct access to foreign trade parameters, buyer registries, and export financial aids." }
    ]
  },
  "agarbatti-making-business": {
    title: "Agarbatti Making Business Plan: Operations & Mudra Loan Slabs",
    badge: "MSME Blueprints",
    intro: "Starting an Agarbatti (Incense Sticks) making business in India is a highly profitable micro-enterprise venture. Driven by persistent cultural demands, agarbatti manufacturing features small capital requirements, low machinery overheads, and high profit margins.",
    moreIntro: "At BanksCart, we detail raw material sourcing, automated machine costs, and Mudra collateral-free loan packages to help micro-merchants build successful setups.",
    highlightsTitle: "Agarbatti Investment Slabs",
    highlights: [
      { label: "Low Setup Capital", text: "Start a home-scale manual setup with deposits under ₹25,000 or full automation up to ₹2 Lakhs." },
      { label: "Collateral-Free Loans", text: "Secure 100% collateral-free capital under MUDRA Shishu and Kishore loan categories." },
      { label: "High Yield Return", text: "Micro-enterprises enjoy net operating profit margins ranging from 25% to 35% on wholesale distribution." }
    ],
    faqs: [
      { q: "Can I get a bank loan to buy agarbatti making machines?", a: "Yes. Lenders offer dedicated Mudra MSME machinery loans covering up to 85% to 90% of automated equipment costs." }
    ]
  },
  "agriculture-loan": {
    title: "Agriculture Loan: Compare Crop Loans & Farm Credit Slabs",
    badge: "Farm Credit",
    intro: "Agriculture Loans are specialized financial credit structures designed to meet the operating requirements of farmers, agrarian communities, and agri-business corporations. Whether purchasing seeds, fertilizers, high-tech tractors, installing solar pumps, or funding cold storage units, agri-loans offer highly subsidized interest rates.",
    moreIntro: "At BanksCart, we compile nationalized crop loan interest tables and sovereign subvention limits to help you secure the cheapest rural credit options.",
    highlightsTitle: "Agri Credit Core Highlights",
    highlights: [
      { label: "Kisan Credit Card (KCC)", text: "Access continuous crop loans up to ₹3 Lakhs at highly subsidized base rates as low as 4.00% p.a." },
      { label: "Farm Equipment Finance", text: "Purchase high-capacity tractors and harvesting machinery with flexible repayment terms." },
      { label: "Agri-Infrastructure Loans", text: "High-value funding backed by government credit guarantees to build warehouses and cold chain units." }
    ],
    faqs: [
      { q: "What is the interest rate on a Kisan Credit Card (KCC) loan?", a: "The baseline interest rate is 7.00% p.a. However, the government offers a 3% prompt repayment subvention, dropping the net interest rate to just 4.00% p.a." }
    ]
  },
  "agriculture-business-plan": {
    title: "Agri-Business Plan Guide: High-Yield Farming & Funding Slabs",
    badge: "Agri Business",
    intro: "Agri-Business encompasses the full commercial spectrum of farming, processing, crop storage, organic retail networks, and poultry management. A professional Agri-Business Plan is critical to secure bank financing under prime priority sector lending guidelines.",
    moreIntro: "At BanksCart, we explain dynamic startup layouts and specialized NABARD subsidy allocations to help agro-entrepreneurs secure low interest rates.",
    highlightsTitle: "Agri-Business Setup Parameters",
    highlights: [
      { label: "NABARD Subsidies", text: "Exploit capital investment subsidies up to 25% to 33.33% for eligible rural setups." },
      { label: "Priority Lending Access", text: "Banks prioritize agri-business credit lines, lowering credit approval barriers." },
      { label: "Modern Agro-Technology", text: "Finance smart hydroponics, drip irrigation systems, and automated greenhouse controls." }
    ],
    faqs: [
      { q: "What are the common agri-business opportunities in India?", a: "High-demand options include organic farming, dairy farming, cold storage setups, fertilizer dealerships, and food processing units." }
    ]
  },
  "agriculture-gold-loan": {
    title: "Agriculture Gold Loan: SUBSTANTIALLY Subsidized Farm Credit Slabs",
    badge: "Subsidized Gold Loans",
    intro: "An Agriculture Gold Loan is an exceptionally low-interest secured loan available to farmers by pledging gold ornaments. The Reserve Bank of India mandates heavily subsidized interest rates on gold loans utilized strictly for agricultural and cultivation activities, providing instant liquidity to bypass local moneylenders.",
    moreIntro: "At BanksCart, we outline the exact agricultural proofs needed to qualify for specialized farm gold loans to secure massive interest reductions.",
    highlightsTitle: "Why Choose Agriculture Gold Loans?",
    highlights: [
      { label: "Extremely Cheap Rates", text: "Subsidized interest rates start as low as 7.00% p.a. backed by priority sector directives." },
      { label: "Instant Cash Release", text: "Gold evaluation and cash release are fast-tracked physically in under 45 minutes." },
      { label: "Zero Income Proof", text: "Bypasses standard credit score and salary checks entirely; backed fully by gold value." }
    ],
    faqs: [
      { q: "What documents are required to prove agricultural status for gold loans?", a: "Farmers must submit Land Revenue logs (7/12 extract or Patta), crop cultivation proofs, or Kisan Credit Card (KCC) copies." }
    ]
  },
  "agriculture-loan-interest-rates": {
    title: "Agriculture Loan Interest Rates: Compare Subsidy Slabs",
    badge: "Agri Rates",
    intro: "Secure the cheapest agrarian borrowing conditions by comparing the complete catalog of **Agriculture Loan Interest Rates**. The central government, in coordination with state bodies and NABARD, heavily subsidizes farm credits, offering massive interest subventions.",
    moreIntro: "At BanksCart, we compile active crop loan rate tables, agricultural gold loan margins, and commercial machinery lending rates side-by-side.",
    highlightsTitle: "Key Agrarian Rate Highlights",
    highlights: [
      { label: "KCC Crop Subsidies", text: "Net effective interest capped at a low 4.00% p.a. upon prompt repayment records." },
      { label: "Subsidy on Infrastructure", text: "Enjoy up to 3% interest subventions for loans funded under the Agri Infrastructure Fund (AIF)." },
      { label: "reducing balance models", text: "Most agricultural loans utilize reducing calculations to minimize total payable interest." }
    ],
    faqs: [
      { q: "Do private banks also offer subsidized agri loans?", a: "Yes. All scheduled commercial banks (public and private) must allocate 18% of their net credit to agriculture under RBI priority sector lending guidelines." }
    ]
  },
  "aditya-birla-finance-limited-marriage-loan": {
    title: "Aditya Birla Marriage Loan: Instant Unsecured Wedding Credit Slabs",
    badge: "Wedding Finance",
    intro: "Create beautiful wedding memories without financial stress by securing an Aditya Birla Marriage Loan. This specialized unsecured personal credit line provides immediate capital to book premium venues, hire catering services, buy wedding attire, or finance dream honeymoon travels.",
    moreIntro: "At BanksCart, we optimize wedding loans. With reducing interest brackets and convenient repayment schedules, we help you manage wedding budgets beautifully.",
    highlightsTitle: "Highlights of Marriage Loans",
    highlights: [
      { label: "Unsecured Wedding Limits", text: "Secure up to ₹15 Lakhs completely collateral-free to cover wedding outgos." },
      { label: "Rapid Digital Clearance", text: "Onboarding is fully digital, with approved capital disbursed in under 24 hours." },
      { label: "Comfortable Tenure Slabs", text: "Repay comfortably over tenure choices extending from 12 to 60 months." }
    ],
    faqs: [
      { q: "Can my spouse apply as a co-borrower for a wedding loan?", a: "Yes. Adding a co-applicant with excellent credit records increases the approved loan amount and reduces base interest rate brackets." }
    ]
  },
  "aditya-birla-finance-securities": {
    title: "Aditya Birla Loan Against Securities: Liquidity from Investments",
    badge: "Securities Credit",
    intro: "Avail immediate cash backing while keeping your investments fully active with an Aditya Birla Loan Against Securities (LAS). This secured credit line allows you to pledge your mutual funds, equity shares, insurance policies, or bonds to secure instant overdraft limits without losing potential compounding growths.",
    moreIntro: "At BanksCart, we outline the list of approved shares, mutual funds loan-to-value limits, and interest rates calculated strictly on the utilized amount.",
    highlightsTitle: "Highlights of Loan Against Securities",
    highlights: [
      { label: "Keep Compounding Intact", text: "Pledge assets physically but continue to receive 100% of mutual fund dividends and stock splits." },
      { label: "Pay Only for Utilized", text: "Interest is charged strictly on the cash amount you withdraw, not the full approved limit." },
      { label: "Attractive Cheaper Rates", text: "Secured credit lines are significantly cheaper than personal loans, starting at 9.99% p.a." }
    ],
    faqs: [
      { q: "What is the maximum limit available for pledging mutual funds?", a: "You can secure overdraft limits up to 50% of the net asset value (NAV) for equity mutual funds and up to 80% for debt mutual funds." }
    ]
  },
  "aditya-birla-sbi-cards": {
    title: "Aditya Birla SBI Credit Cards: Premium Lifestyle & Fuel Savings",
    badge: "Co-Branded Cards",
    intro: "The Aditya Birla SBI Credit Card is a premium co-branded card designed to reward your daily lifestyle, fashion retail, and fuel spends. Mapped with double reward multipliers on Aditya Birla brands alongside robust SBI rewards, it is the ultimate shopping companion.",
    moreIntro: "At BanksCart, we compare reward tiers, welcome voucher values, and annual fee waiver schedules to help you maximize your credit benefits.",
    highlightsTitle: "Core Card Highlights",
    highlights: [
      { label: "Aditya Birla Brand Rewards", text: "Earn up to 10X reward points on all purchases executed across Aditya Birla lifestyle and fashion stores." },
      { label: "Complimentary Lounge Access", text: "Enjoy free domestic airport lounge entries every quarter." },
      { label: "Fuel Surcharge Waiver", text: "Get 1% fuel surcharge waiver across all fuel stations in India." }
    ],
    faqs: [
      { q: "What is the annual fee for the Aditya Birla SBI Credit Card?", a: "The annual fee is ₹499 + GST, which is completely waived if annual spends exceed ₹1 Lakh." }
    ]
  },
  "aditya-birla-sbi-card-select": {
    title: "Aditya Birla SBI Card Select: Elite Fashion & Travel Privileges",
    badge: "Elite Credit Cards",
    intro: "Step into elite luxury shopping and premium travel with the Aditya Birla SBI Card Select. Tailored for high-spenders, this co-branded credit card delivers massive welcome vouchers, elite reward multipliers on corporate brands, and complimentary travel lounge access.",
    moreIntro: "At BanksCart, we detail select card milestone rewards and annual fee offsets to help you leverage elite savings.",
    highlightsTitle: "Card Select Highlights",
    highlights: [
      { label: "Elite Welcome Gift", text: "Receive a welcome brand voucher worth ₹1,500 instantly upon card fee payment." },
      { label: "20X Spends Multiplier", text: "Earn unmatched 20X reward points on all purchases at Aditya Birla group outlets." },
      { label: "International Travel Lounge", text: "Includes a complimentary Priority Pass membership with international lounge entries." }
    ],
    faqs: [
      { q: "What is the annual fee for the Select card?", a: "The annual fee is ₹1,499 + GST, which is fully waived if annual spends exceed ₹2 Lakhs." }
    ]
  },
  "aditya-birla-finance-limited-personal-loan-foreclosure-charges": {
    title: "Aditya Birla Personal Loan Foreclosure Charges & Pre-Payment Slabs",
    badge: "Borrower Costs",
    intro: "Planning to prepay your outstanding personal debt early? Analyze the full grid of **Aditya Birla Personal Loan Foreclosure Charges**. The company structures pre-payment limits and foreclosure fees based on active repayment months.",
    moreIntro: "At BanksCart, we outline lock-in timelines, dynamic pre-payment slabs, and calculations to help you save on debt interest charges safely.",
    highlightsTitle: "Foreclosure Charge Highlights",
    highlights: [
      { label: "Lock-in Timeline", text: "Foreclosure is permitted strictly after 6 successful EMI payments." },
      { label: "Pre-payment Fee Slab", text: "Foreclosure fees typically range from 2.00% to 4.00% of the outstanding principal amount." },
      { label: "Part Pre-payment Options", text: "Permits part payments up to twice a year to drop principal balances, saving interest." }
    ],
    faqs: [
      { q: "Can I foreclosure my personal loan completely online?", a: "Yes. You can request loan closure, view outstanding balances, pay foreclosure charges, and download NOCs digitally via the customer portal." }
    ]
  },
  "aditya-birla-sun-life-flexi-cap-fund-regular-plan-growth": {
    title: "ABSL Flexi Cap Fund (Regular Growth): High-Yield Equity Investments",
    badge: "Mutual Funds",
    intro: "The Aditya Birla Sun Life **Flexi Cap Fund** (Regular Plan Growth) is a premium open-ended equity mutual fund scheme investing dynamically across large-cap, mid-cap, and small-cap segments. By deploying capital flexibly, the fund aims to capture high growth milestones across India's economic sectors.",
    moreIntro: "At BanksCart, we detail active asset allocations, fund managers' historical returns, and expense ratio brackets to help you structure optimized SIPs.",
    highlightsTitle: "Flexi Cap Fund Core Strengths",
    highlights: [
      { label: "Dynamic Sector Shift", text: "Adapts asset percentages dynamically to follow market opportunities, bypassing sectoral drops." },
      { label: "Robust Historical Yields", text: "Delivers strong annualized compounding returns exceeding 15.50% p.a. over a 5-year term." },
      { label: "Experienced Managers", text: "Managed by veteran fund managers with audited track records of beating benchmarks." }
    ],
    faqs: [
      { q: "What is the minimum SIP amount for ABSL Flexi Cap Fund?", a: "You can start investing with a minimum monthly SIP of ₹100 or a minimum lump-sum of ₹1,000." }
    ]
  },
  "aditya-birla-sun-life-mf-launches-nfo-nifty-next-50-etf": {
    title: "ABSL Nifty Next 50 ETF NFO: Low-Cost Index Investments",
    badge: "Mutual Funds NFO",
    intro: "The Aditya Birla Sun Life Mutual Fund **Nifty Next 50 ETF** is an open-ended exchange-traded index fund tracking the performance of the Nifty Next 50 Index. This low-cost fund provides investors with immediate exposure to top-tier potential bluechips poised to enter the main indices.",
    moreIntro: "At BanksCart, we detail expense ratios, tracking errors, and liquidity parameters to help you invest in low-cost index funds.",
    highlightsTitle: "ETF Key Strengths",
    highlights: [
      { label: "Exceptional Low Cost", text: "Features extremely low expense ratios (typically under 0.20% p.a.) compared to active funds." },
      { label: "Top-Tier Potential", text: "Captures the next 50 largest companies by market capitalization, offering high growth potential." },
      { label: "Real-Time Trading", text: "Listed on NSE and BSE; can be bought or sold easily in real-time during market hours via Demat." }
    ],
    faqs: [
      { q: "Do I need a Demat account to invest in this ETF?", a: "Yes. Investing in Exchange Traded Funds (ETFs) strictly requires an active Demat account with a registered stockbroker." }
    ]
  },
  "aditya-birla-sun-life-midcap-fund-regular-plan-growth": {
    title: "ABSL Midcap Fund (Regular Growth): Mid-Cap Wealth Compounding",
    badge: "Mutual Funds",
    intro: "The Aditya Birla Sun Life **Midcap Fund** (Regular Plan Growth) is a sectoral equity scheme investing predominantly in mid-sized Indian companies. Mid-cap companies offer an exceptional balance of rapid market expansion potential and stable corporate governance.",
    moreIntro: "At BanksCart, we outline fund expense percentages, historical dividend patterns, and asset allocations to support your long-term wealth compounding.",
    highlightsTitle: "Midcap Fund Strengths",
    highlights: [
      { label: "High Growth Potential", text: "Mid-cap companies capture market expansions, yielding higher returns than large-cap indices during growth waves." },
      { label: "Diversified Asset Base", text: "Spreads capital across 50+ mid-sized industry leaders to minimize concentration risks." },
      { label: "Audited Returns Trail", text: "Strong historical annualized compounding returns exceeding 16.20% p.a. over a 5-year term." }
    ],
    faqs: [
      { q: "What is the exit load on ABSL Midcap Fund?", a: "An exit load of 1.00% is charged if you redeem or switch your units within 365 days of allocation." }
    ]
  },
  "aditya-birla-sun-life-multi-cap-fund-regular-plan-growth": {
    title: "ABSL Multi Cap Fund (Regular Growth): Structured Slices Portfolio",
    badge: "Mutual Funds",
    intro: "The Aditya Birla Sun Life **Multi Cap Fund** (Regular Plan Growth) is a structured equity mutual fund scheme mandated to invest at least 25% of its capital across large-cap, 25% in mid-cap, and 25% in small-cap segments. This guarantees a balanced portfolio across all market capitalizations.",
    moreIntro: "At BanksCart, we detail portfolio configurations, historical compound yields, and expense ratios to help you build stable portfolios.",
    highlightsTitle: "Multi Cap Key Strengths",
    highlights: [
      { label: "Balanced Slabs mandate", text: "Strictly enforces 25% allocations across large, mid, and small cap sectors to ensure balance." },
      { label: "All-Weather Compounding", text: "Large-cap provides safety during drops, while small-mid caps deliver massive returns during rallies." },
      { label: "Tax-Shielded Swaps", text: "Fund managers execute stock swaps inside the fund 100% tax-free for investors." }
    ],
    faqs: [
      { q: "Who should invest in the ABSL Multi Cap Fund?", a: "This fund is ideal for long-term investors seeking a complete, single-portfolio equity solution across all market caps." }
    ]
  },
  "aditya-birla-sun-life-mutual-fund-announces-bal-bhavishya-yojna-nfo": {
    title: "ABSL Bal Bhavishya Yojna NFO: Children's Savings Fund",
    badge: "Mutual Funds NFO",
    intro: "The Aditya Birla Sun Life **Bal Bhavishya Yojna** is an open-ended solution-oriented children's savings scheme. This specialized NFO compiles long-term capital designed strictly to fund your child's higher education, global certifications, and career setups.",
    moreIntro: "At BanksCart, we detail the 5-year lock-in schedules and children's asset allocation rules to support your parenting goals.",
    highlightsTitle: "Bal Bhavishya Yojna Highlights",
    highlights: [
      { label: "Solution-Oriented Lock-in", text: "Features a mandatory 5-year lock-in period or until the child reaches 18, ensuring regular wealth compilation." },
      { label: "Parent Demise Security", text: "Option to add premium insurance waivers to secure maturity payments in parental emergencies." },
      { label: "Dual Investment Slabs", text: "Switch dynamically between aggressive equity allocations or conservative debt plans." }
    ],
    faqs: [
      { q: "Can a grandparent invest in this child fund?", a: "Yes. Grandparents, parents, or legal guardians can open accounts in the name of a minor child under 18 years." }
    ]
  },
  "birla-sun-life-mutual-fund": {
    title: "Aditya Birla Sun Life Mutual Fund: High-Yield Investment Portals",
    badge: "Mutual Funds Portal",
    intro: "Aditya Birla Sun Life Mutual Fund is one of India's premier and largest Asset Management Companies (AMCs). Managing over ₹3 Lakh Crores in assets under management (AUM), it offers a diverse portfolio of equity, hybrid, debt, index, and offshore funds.",
    moreIntro: "At BanksCart, we compile active fund ratings, historical yield sheets, and direct SIP checklists to help you grow your savings securely.",
    highlightsTitle: "Why Invest with ABSL Mutual Fund?",
    highlights: [
      { label: "Diverse Fund Catalog", text: "Choose from over 80+ high-performing equity, hybrid, gold, and corporate debt schemes." },
      { label: "Simplified Digital SIP", text: "Configure monthly auto-debit SIP mandates online in minutes via secure net banking." },
      { label: "Regulatory Safety", text: "Operates under strict SEBI guidelines with regular audits to shield investor interests." }
    ],
    faqs: [
      { q: "What is the difference between Direct and Regular plans?", a: "Direct plans are bought directly from the AMC and have lower expense ratios. Regular plans are bought via brokers and include advisor commissions, resulting in a slightly higher expense ratio." }
    ]
  },
  "aditya-birla-sun-life-pension-fund": {
    title: "ABSL Pension Fund: NPS Tier 1 & Tier 2 Annuities Portals",
    badge: "Retirement Annuities",
    intro: "The Aditya Birla Sun Life Pension Fund is an officially registered Pension Fund Manager (PFM) under the National Pension System (NPS). Managing retirement capital in highly audited equity, corporate debt, and government security funds, it compounds pension wealth securely.",
    moreIntro: "At BanksCart, we explain active NPS asset allocations, Section 80CCD tax exemptions, and lifetime annuity payouts to secure your post-career cash flows.",
    highlightsTitle: "NPS Pension Fund Highlights",
    highlights: [
      { label: "Section 80CCD Tax shield", text: "Claim an additional tax deduction up to ₹50,000 annually under Section 80CCD(1B), over and above 80C." },
      { label: "Exceptional Low Fees", text: "The lowest cost retirement tool in the world, with fund management fees capped under 0.09% p.a." },
      { label: "Dual Account Option", text: "Manage NPS Tier 1 (Locked retirement account) and Tier 2 (Flexible savings account) under one PRAN." }
    ],
    faqs: [
      { q: "What is the maximum equity exposure allowed under NPS?", a: "Under active choice, individuals can allocate up to 75% of their NPS Tier-1 savings in equity (Asset Class E) up to 50 years of age." }
    ]
  },
  "aditya-birla-sun-life-pension-plans": {
    title: "Aditya Birla Sun Life Pension Plans: Compare Retirement Slabs",
    badge: "Pension Portals",
    intro: "Secure your post-career life with Aditya Birla Sun Life Pension Plans. Offering unit-linked pension ULIPs, guaranteed annuity insurance plans, and immediate cash payouts, these retirement plans compound wealth securely.",
    moreIntro: "At BanksCart, we analyze ABSLI pension offerings to help you select customized annuity payouts matching your retirement goals.",
    highlightsTitle: "ABSLI Pension Slabs Highlights",
    highlights: [
      { label: "Guaranteed Additions", text: "Earn loyalty additions and wealth boosters credited to your pension fund value periodically." },
      { label: "Immediate Annuity Option", text: "Deposit a single lump-sum to start receiving monthly pension annuities from next month." },
      { label: "Tax Exemption Benefits", text: "Secure high premium exemptions under Section 80C and tax-free corpus withdrawals on vesting." }
    ],
    faqs: [
      { q: "Can I purchase immediate annuity using other bank deposits?", a: "Yes. You can pool savings from FDs or other investments to buy immediate ABSLI annuity plans." }
    ]
  },
  "aditya-birla-sun-life-psu-equity-fund-regular-plan-growth": {
    title: "ABSL PSU Equity Fund (Regular Growth): Government Assets Yields",
    badge: "Mutual Funds",
    intro: "The Aditya Birla Sun Life **PSU Equity Fund** (Regular Plan Growth) is a sectoral equity mutual fund scheme investing predominantly in government-backed corporations. Government Public Sector Undertakings (PSUs) dominate vital national sectors like oil, mining, power, defense, and banking.",
    moreIntro: "At BanksCart, we detail fund managers' strategies, historical dividend yields, and expense ratios to support sector-specific equity compounding.",
    highlightsTitle: "PSU Equity Fund Strengths",
    highlights: [
      { label: "High Dividend Yields", text: "Dominant public sector units pay massive dividends, adding stable compounding cash safety." },
      { label: "Monopoly Sectors", text: "Govt giants operate with near-monopoly positions in defense, mining, and railway logistics." },
      { label: "Attractive Valuation Slabs", text: "PSU indices trade at lower P/E ratios than private benchmarks, offering high-margin entry slots." }
    ],
    faqs: [
      { q: "What are the tax implications on capital gains for this fund?", a: "Gains are taxed as equity: 20% on short-term gains (<1 year) and 12.5% on long-term gains (>1 year) exceeding ₹1.25 Lakhs." }
    ]
  },
  "aditya-birla-sun-life-small-cap-fund-regular-plan-growth": {
    title: "ABSL Small Cap Fund (Regular Growth): Small-Cap Rallies Portfolio",
    badge: "Mutual Funds",
    intro: "The Aditya Birla Sun Life **Small Cap Fund** (Regular Plan Growth) is an aggressive equity mutual fund scheme investing predominantly in small-sized Indian enterprises. Small-cap companies have the potential to deliver massive multi-bagger returns during economic expansion cycles.",
    moreIntro: "At BanksCart, we outline small-cap risk limits, fund managers' historical returns, and expense ratios to support high-risk wealth compounding.",
    highlightsTitle: "Small Cap Fund Key Strengths",
    highlights: [
      { label: "Multi-Bagger Return Slabs", text: "Small-sized enterprises offer rapid growth curves, yielding high returns during market rallies." },
      { label: "Expert Active Filtering", text: "Fund managers perform deep corporate research to filter out weak companies and select stars." },
      { label: "Robust Historical Yields", text: "Strong historical annualized compounding returns exceeding 18.50% p.a. over a 5-year term." }
    ],
    faqs: [
      { q: "What is the risk profile of ABSL Small Cap Fund?", a: "This fund is classified as 'Very High Risk' under SEBI guidelines. It is suitable strictly for long-term investors with an investment horizon of 5+ years." }
    ]
  },
  "advance-tax": {
    title: "Advance Tax: Guidelines, Due Dates & Tax Payment Slabs",
    badge: "Tax Compliance",
    intro: "Advance Tax represents the system of paying direct income taxes in installments throughout the financial year, rather than as a single lump-sum during return filing. The Income Tax Act mandates advance tax payments for any individual or corporate taxpayer whose estimated tax liability exceeds ₹10,000.",
    moreIntro: "At BanksCart, we simplify direct tax regulations. We compile advance tax calendar dates, calculation percentages, and Section 234 interest penalty rules to ensure absolute compliance.",
    highlightsTitle: "Advance Tax Due Dates & Slabs",
    highlights: [
      { label: "Tax Liability Threshold", text: "Mandatory if estimated tax liability exceeds ₹10,000 annually (waived for senior citizens without business income)." },
      { label: "Installment Schedules", text: "Paid in four installments: 15% (June 15), 45% (Sep 15), 75% (Dec 15), and 100% (March 15)." },
      { label: "Interest Penalty Slabs", text: "Delay in payments triggers interest penalties of 1.00% per month under Section 234B and 234C." }
    ],
    faqs: [
      { q: "What happens if I fail to pay advance tax?", a: "Failing to pay or short-paying advance tax installments triggers an interest penalty of 1% per month on the unpaid tax amount under Section 234B and 234C." }
    ]
  },
  "advantages-and-disadvantages-of-credit-card": {
    title: "Pros & Cons of Credit Cards: Master Smart Spending Slabs",
    badge: "Credit Literacy",
    intro: "A credit card is a powerful financial tool that offers unmatched convenience, immediate liquidity, and attractive reward programs. However, if managed poorly, it can lead to high interest traps, debt accumulation, and a damaged CIBIL score. Understanding the complete pros and cons of credit cards is vital.",
    moreIntro: "At BanksCart, we explain annual interest rates, credit limit usage, reward accumulation, and late payment penalties to help you build stable credit.",
    highlightsTitle: "Core Pros & Cons Slabs",
    highlights: [
      { label: "Pros: Rewards & CIBIL", text: "Earn cashbacks, travel vouchers, and build an excellent credit history with on-time payments." },
      { label: "Cons: High Interest Rates", text: "Interest rates on revolving credit are extremely high, ranging from 36% to 48% p.a." },
      { label: "Pros: 45 Days Interest-Free", text: "Get up to 45 to 50 days of interest-free credit on all domestic retail spends." }
    ],
    faqs: [
      { q: "How can I avoid paying interest on my credit card?", a: "You must pay the full 'Total Amount Due' shown on your monthly statement on or before the due date. Paying only the 'Minimum Amount Due' triggers revolving interest charges." }
    ]
  }
};
