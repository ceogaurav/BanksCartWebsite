export interface RechargePlan {
  id: string;
  price: number;
  validity: string;
  data: string;
  calls: string;
  sms: string;
  perks: string;
  category: 'Popular' | '5G Unlimited' | 'Data Add-on' | 'Long Term' | 'Talktime';
  description: string;
}

export interface RechargeBiller {
  id: string;
  name: string;
  code?: string;
  state?: string;
  popular?: boolean;
}

export interface RechargeFAQ {
  q: string;
  a: string;
}

export interface EditorialArticle {
  title: string;
  paragraphs: string[];
}

export interface RechargePageContent {
  key: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  intro: string;
  numLabel: string;
  numPlaceholder: string;
  numHint: string;
  numType?: 'tel' | 'text';
  operators: string[];
  billers?: RechargeBiller[];
  states?: string[];
  plans?: RechargePlan[];
  quickAmounts: number[];
  checklistTitle: string;
  checklist: string[];
  faqs: RechargeFAQ[];
  editorialArticles: EditorialArticle[];
}

export const INDIAN_TELECOM_CIRCLES = [
  "Delhi NCR",
  "Mumbai",
  "Maharashtra & Goa",
  "Karnataka",
  "Tamil Nadu & Chennai",
  "Andhra Pradesh & Telangana",
  "Gujarat",
  "Uttar Pradesh (East)",
  "Uttar Pradesh (West) & Uttarakhand",
  "Punjab",
  "Rajasthan",
  "West Bengal",
  "Kolkata",
  "Kerala",
  "Bihar & Jharkhand",
  "Madhya Pradesh & Chhattisgarh",
  "Odisha",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Assam",
  "North East"
];

export const MOBILE_PREPAID_PLANS: Record<string, RechargePlan[]> = {
  "Reliance Jio Prepaid": [
    {
      id: "jio-299",
      price: 299,
      validity: "28 Days",
      data: "1.5 GB/day",
      calls: "Unlimited",
      sms: "100/day",
      perks: "Unlimited True 5G Data, JioCinema, JioTV",
      category: "Popular",
      description: "Best seller everyday unlimited plan with high-speed 5G connectivity."
    },
    {
      id: "jio-349",
      price: 349,
      validity: "28 Days",
      data: "2.0 GB/day",
      calls: "Unlimited",
      sms: "100/day",
      perks: "Hero 5G Data + JioTV & Cloud Suite",
      category: "5G Unlimited",
      description: "Heavy data daily allowance with unrestricted 5G network speeds."
    },
    {
      id: "jio-859",
      price: 859,
      validity: "84 Days",
      data: "2.0 GB/day",
      calls: "Unlimited",
      sms: "100/day",
      perks: "Unlimited True 5G, JioCinema, JioTV",
      category: "Long Term",
      description: "Quarterly value pack ensuring uninterrupted high-speed connectivity."
    },
    {
      id: "jio-29",
      price: 29,
      validity: "Active Base",
      data: "2 GB High-Speed",
      calls: "NA",
      sms: "NA",
      perks: "Instant Data Booster",
      category: "Data Add-on",
      description: "Emergency high-speed data topup when daily limits expire."
    },
    {
      id: "jio-65",
      price: 65,
      validity: "Active Base",
      data: "4 GB High-Speed",
      calls: "NA",
      sms: "NA",
      perks: "Data Add-on",
      category: "Data Add-on",
      description: "Add-on pack for uninterrupted streaming and online gaming."
    },
    {
      id: "jio-3599",
      price: 3599,
      validity: "365 Days",
      data: "2.5 GB/day",
      calls: "Unlimited",
      sms: "100/day",
      perks: "Unlimited 5G, 1-Year Disney+ Hotstar Mobile, JioCinema",
      category: "Long Term",
      description: "Annual flagship pack with bundled premium entertainment and 365 days coverage."
    },
    {
      id: "jio-100",
      price: 100,
      validity: "Unlimited",
      data: "NA",
      calls: "₹81.75 Talktime",
      sms: "Standard",
      perks: "Full Talktime Value",
      category: "Talktime",
      description: "Pure monetary talktime balance for non-bundle calling and SMS."
    }
  ],
  "Bharti Airtel Prepaid": [
    {
      id: "airtel-299",
      price: 299,
      validity: "28 Days",
      data: "1.5 GB/day",
      calls: "Unlimited",
      sms: "100/day",
      perks: "Unlimited 5G Data, Wynk Music, Apollo 24|7 Circle",
      category: "Popular",
      description: "Essential monthly pack with seamless unlimited calling and data."
    },
    {
      id: "airtel-399",
      price: 399,
      validity: "28 Days",
      data: "3.0 GB/day",
      calls: "Unlimited",
      sms: "100/day",
      perks: "Unlimited 5G, Airtel Xstream Play, Wynk Free",
      category: "5G Unlimited",
      description: "High-density streaming pack with 3GB daily data and 5G speeds."
    },
    {
      id: "airtel-859",
      price: 859,
      validity: "84 Days",
      data: "1.5 GB/day",
      calls: "Unlimited",
      sms: "100/day",
      perks: "Unlimited 5G Data, Apollo 24|7 Circle, Wynk Music",
      category: "Long Term",
      description: "Most popular 3-month truly unlimited pack across all circles."
    },
    {
      id: "airtel-22",
      price: 22,
      validity: "1 Day",
      data: "1 GB High-Speed",
      calls: "NA",
      sms: "NA",
      perks: "1-Day Data Booster",
      category: "Data Add-on",
      description: "Instant 24-hour data booster for critical connectivity requirements."
    },
    {
      id: "airtel-77",
      price: 77,
      validity: "Active Base",
      data: "5 GB High-Speed",
      calls: "NA",
      sms: "NA",
      perks: "Data Add-on",
      category: "Data Add-on",
      description: "Multi-gigabyte data booster pack valid until base pack expiry."
    },
    {
      id: "airtel-3599",
      price: 3599,
      validity: "365 Days",
      data: "2.0 GB/day",
      calls: "Unlimited",
      sms: "100/day",
      perks: "Unlimited 5G, Wynk Music, Apollo 24|7",
      category: "Long Term",
      description: "Full year 365-day uninterrupted coverage with zero monthly top-up friction."
    }
  ],
  "Vodafone Idea (Vi) Prepaid": [
    {
      id: "vi-299",
      price: 299,
      validity: "28 Days",
      data: "1.5 GB/day",
      calls: "Unlimited",
      sms: "100/day",
      perks: "Binge All Night (12 AM-6 AM Free), Weekend Data Rollover",
      category: "Popular",
      description: "Signature Vi Hero unlimited plan with night streaming perks."
    },
    {
      id: "vi-719",
      price: 719,
      validity: "84 Days",
      data: "1.5 GB/day",
      calls: "Unlimited",
      sms: "100/day",
      perks: "Binge All Night, Weekend Rollover, Data Delights",
      category: "Long Term",
      description: "84-day quarterly comfort pack with smart unused data rollover."
    },
    {
      id: "vi-49",
      price: 49,
      validity: "Active Base",
      data: "20 GB High-Speed (1 Day)",
      calls: "NA",
      sms: "NA",
      perks: "Unlimited Cricket/Movie Data",
      category: "Data Add-on",
      description: "Special one-day high capacity bulk data booster."
    }
  ],
  "BSNL Prepaid": [
    {
      id: "bsnl-199",
      price: 199,
      validity: "30 Days",
      data: "2.0 GB/day",
      calls: "Unlimited Any-net",
      sms: "100/day",
      perks: "Full 30-Day Calendar Month Validity",
      category: "Popular",
      description: "High value government PSU pack with true 30-day billing cycle."
    },
    {
      id: "bsnl-499",
      price: 499,
      validity: "90 Days",
      data: "2.0 GB/day",
      calls: "Unlimited",
      sms: "100/day",
      perks: "90 Days Long Horizon Value",
      category: "Long Term",
      description: "Economic 3-month connectivity pack with 2GB daily data."
    },
    {
      id: "bsnl-1999",
      price: 1999,
      validity: "365 Days",
      data: "600 GB Bulk Data",
      calls: "Unlimited",
      sms: "100/day",
      perks: "Annual Non-Throttled Data Bucket",
      category: "Long Term",
      description: "Annual coverage with bulk non-daily quota data flexibility."
    }
  ]
};

export const ELECTRICITY_BILLERS: RechargeBiller[] = [
  // Karnataka
  { id: "bescom", name: "BESCOM - Bangalore Electricity Supply", state: "Karnataka", popular: true },
  { id: "hescom", name: "HESCOM - Hubli Electricity Supply", state: "Karnataka" },
  { id: "gescom", name: "GESCOM - Gulbarga Electricity Supply", state: "Karnataka" },
  { id: "mescom", name: "MESCOM - Mangalore Electricity Supply", state: "Karnataka" },
  { id: "chescom", name: "CHESCOM - Chamundeshwari Electricity", state: "Karnataka" },
  
  // Maharashtra
  { id: "msedcl", name: "MSEDCL - Mahavitaran Maharashtra", state: "Maharashtra", popular: true },
  { id: "tatapower-mum", name: "Tata Power - Mumbai Distribution", state: "Maharashtra", popular: true },
  { id: "adani-mum", name: "Adani Electricity Mumbai Limited", state: "Maharashtra", popular: true },
  { id: "best-mum", name: "BEST Undertaking - Mumbai", state: "Maharashtra" },
  
  // Delhi NCR
  { id: "bses-rajdhani", name: "BSES Rajdhani Power Limited", state: "Delhi", popular: true },
  { id: "bses-yamuna", name: "BSES Yamuna Power Limited", state: "Delhi", popular: true },
  { id: "tatapower-ddl", name: "Tata Power DDL (North Delhi)", state: "Delhi", popular: true },
  { id: "ndmc-power", name: "New Delhi Municipal Council (NDMC)", state: "Delhi" },

  // Uttar Pradesh
  { id: "uppcl-urban", name: "UPPCL - Urban Power Corporation", state: "Uttar Pradesh", popular: true },
  { id: "uppcl-rural", name: "UPPCL - Rural Power Corporation", state: "Uttar Pradesh" },
  { id: "torrent-agra", name: "Torrent Power - Agra", state: "Uttar Pradesh" },
  { id: "noida-power", name: "Noida Power Company Limited (NPCL)", state: "Uttar Pradesh" },

  // Tamil Nadu
  { id: "tangedco", name: "TANGEDCO - Tamil Nadu Generation & Distribution", state: "Tamil Nadu", popular: true },

  // West Bengal
  { id: "cesc-kolkata", name: "CESC Limited - Kolkata & Howrah", state: "West Bengal", popular: true },
  { id: "wbsedcl", name: "WBSEDCL - West Bengal State Electricity", state: "West Bengal" },

  // Gujarat
  { id: "dgvcl", name: "DGVCL - Dakshin Gujarat Vij Company", state: "Gujarat" },
  { id: "mgvcl", name: "MGVCL - Madhya Gujarat Vij Company", state: "Gujarat" },
  { id: "pgvcl", name: "PGVCL - Paschim Gujarat Vij Company", state: "Gujarat" },
  { id: "ugvcl", name: "UGVCL - Uttar Gujarat Vij Company", state: "Gujarat" },
  { id: "torrent-ahmedabad", name: "Torrent Power - Ahmedabad & Gandhinagar", state: "Gujarat", popular: true },
  { id: "torrent-surat", name: "Torrent Power - Surat", state: "Gujarat" },

  // Punjab & Haryana
  { id: "pspcl", name: "PSPCL - Punjab State Power Corporation", state: "Punjab", popular: true },
  { id: "uhbvn", name: "UHBVN - Uttar Haryana Bijli Vitran", state: "Haryana" },
  { id: "dhbvn", name: "DHBVN - Dakshin Haryana Bijli Vitran", state: "Haryana" },

  // Rajasthan
  { id: "jvvnl", name: "JVVNL - Jaipur Vidyut Vitran Nigam", state: "Rajasthan", popular: true },
  { id: "avvnl", name: "AVVNL - Ajmer Vidyut Vitran Nigam", state: "Rajasthan" },
  { id: "jdvvnl", name: "JdVVNL - Jodhpur Vidyut Vitran Nigam", state: "Rajasthan" },

  // Telangana & Andhra Pradesh
  { id: "tsspdcl", name: "TSSPDCL - Southern Power Telangana", state: "Telangana", popular: true },
  { id: "tsnpdcl", name: "TSNPDCL - Northern Power Telangana", state: "Telangana" },
  { id: "apspdcl", name: "APSPDCL - Southern Power Andhra Pradesh", state: "Andhra Pradesh" },
  { id: "apepdcl", name: "APEPDCL - Eastern Power Andhra Pradesh", state: "Andhra Pradesh" },

  // Kerala
  { id: "kseb", name: "KSEB - Kerala State Electricity Board", state: "Kerala", popular: true },

  // Bihar
  { id: "nbpdcl", name: "NBPDCL - North Bihar Power Distribution", state: "Bihar" },
  { id: "sbpdcl", name: "SBPDCL - South Bihar Power Distribution", state: "Bihar" },

  // Madhya Pradesh
  { id: "mp-poorv", name: "MPPKVVCL - Jabalpur (Poorv)", state: "Madhya Pradesh" },
  { id: "mp-madhya", name: "MPMKVVCL - Bhopal (Madhya)", state: "Madhya Pradesh" },
  { id: "mp-paschim", name: "MPPKVVCL - Indore (Paschim)", state: "Madhya Pradesh" }
];

export const FASTAG_BANKS: RechargeBiller[] = [
  { id: "idfc-fastag", name: "IDFC FIRST Bank FASTag", popular: true },
  { id: "icici-fastag", name: "ICICI Bank FASTag", popular: true },
  { id: "sbi-fastag", name: "State Bank of India (SBI) FASTag", popular: true },
  { id: "axis-fastag", name: "Axis Bank FASTag", popular: true },
  { id: "hdfc-fastag", name: "HDFC Bank FASTag", popular: true },
  { id: "kotak-fastag", name: "Kotak Mahindra Bank FASTag", popular: true },
  { id: "airtel-fastag", name: "Airtel Payments Bank FASTag" },
  { id: "bob-fastag", name: "Bank of Baroda FASTag" },
  { id: "indusind-fastag", name: "IndusInd Bank FASTag" },
  { id: "canara-fastag", name: "Canara Bank FASTag" },
  { id: "union-fastag", name: "Union Bank of India FASTag" },
  { id: "federal-fastag", name: "Federal Bank FASTag" }
];

export const DTH_OPERATORS: RechargeBiller[] = [
  { id: "tata-play", name: "Tata Play (Tata Sky)", popular: true },
  { id: "airtel-dth", name: "Airtel Digital TV", popular: true },
  { id: "dish-tv", name: "Dish TV India", popular: true },
  { id: "sun-direct", name: "Sun Direct", popular: true },
  { id: "videocon-d2h", name: "d2h (Videocon)", popular: true }
];

export const LPG_PROVIDERS: RechargeBiller[] = [
  { id: "indane", name: "Indane Gas (Indian Oil Corporation)", popular: true },
  { id: "hp-gas", name: "HP Gas (Hindustan Petroleum)", popular: true },
  { id: "bharat-gas", name: "Bharat Gas (Bharat Petroleum)", popular: true },
  { id: "igl", name: "Indraprastha Gas Limited (IGL) - Piped Gas", popular: true },
  { id: "mgl", name: "Mahanagar Gas Limited (MGL) - Piped Gas", popular: true },
  { id: "adani-gas", name: "Adani Total Gas - Piped Natural Gas" },
  { id: "gujarat-gas", name: "Gujarat Gas Limited - PNG" }
];

export const LOAN_EMI_LENDERS: RechargeBiller[] = [
  { id: "bajaj-finance", name: "Bajaj Finance Limited", popular: true },
  { id: "hdfc-loan", name: "HDFC Bank Retail Loans", popular: true },
  { id: "sbi-loan", name: "State Bank of India (SBI) EMI", popular: true },
  { id: "icici-loan", name: "ICICI Bank Loan Repayment", popular: true },
  { id: "muthoot-finance", name: "Muthoot Finance Gold Loan", popular: true },
  { id: "tata-capital", name: "Tata Capital Financial Services", popular: true },
  { id: "lt-finance", name: "L&T Finance Holdings", popular: true },
  { id: "aditya-birla-finance", name: "Aditya Birla Finance Limited", popular: true },
  { id: "mahindra-finance", name: "Mahindra & Mahindra Financial Services" },
  { id: "chola-finance", name: "Cholamandalam Investment & Finance" },
  { id: "hero-fincorp", name: "Hero FinCorp Limited" },
  { id: "iifl-finance", name: "IIFL Finance Limited" },
  { id: "smfg-india", name: "SMFG India Credit (Fullerton India)" },
  { id: "piramal-finance", name: "Piramal Capital & Housing Finance" },
  { id: "home-credit", name: "Home Credit India" }
];

export const INSURANCE_COMPANIES: RechargeBiller[] = [
  { id: "lic", name: "Life Insurance Corporation of India (LIC)", popular: true },
  { id: "hdfc-life", name: "HDFC Life Insurance", popular: true },
  { id: "icici-pru-life", name: "ICICI Prudential Life Insurance", popular: true },
  { id: "sbi-life", name: "SBI Life Insurance", popular: true },
  { id: "max-life", name: "Max Life Insurance", popular: true },
  { id: "tata-aia", name: "Tata AIA Life Insurance", popular: true },
  { id: "bajaj-allianz-life", name: "Bajaj Allianz Life Insurance" },
  { id: "star-health", name: "Star Health & Allied Insurance", popular: true },
  { id: "care-health", name: "Care Health Insurance (Religare)" },
  { id: "aditya-birla-health", name: "Aditya Birla Health Insurance" }
];

export const BROADBAND_OPERATORS: RechargeBiller[] = [
  { id: "airtel-fiber", name: "Airtel Xstream Fiber", popular: true },
  { id: "jio-fiber", name: "JioFiber Broadband", popular: true },
  { id: "act-fibernet", name: "ACT Fibernet", popular: true },
  { id: "bsnl-fiber", name: "BSNL Bharat Fiber", popular: true },
  { id: "tata-play-fiber", name: "Tata Play Fiber" },
  { id: "hathway", name: "Hathway Broadband" },
  { id: "excitel", name: "Excitel Broadband" }
];

export const WATER_BOARDS: RechargeBiller[] = [
  { id: "delhi-jal-board", name: "Delhi Jal Board (DJB)", state: "Delhi", popular: true },
  { id: "bwssb-bangalore", name: "Bangalore Water Supply (BWSSB)", state: "Karnataka", popular: true },
  { id: "mcgm-mumbai", name: "Municipal Corp of Greater Mumbai (MCGM)", state: "Maharashtra", popular: true },
  { id: "hmwssb-hyderabad", name: "Hyderabad Metro Water (HMWSSB)", state: "Telangana", popular: true },
  { id: "cmwssb-chennai", name: "Chennai Metro Water (CMWSSB)", state: "Tamil Nadu", popular: true },
  { id: "phd-punjab", name: "Department of Water Supply Punjab", state: "Punjab" }
];

export const RECHARGE_PAGE_MAP: Record<string, RechargePageContent> = {
  "overview": {
    key: "overview",
    title: "All-India BBPS Online Recharge & Bill Payment Directory",
    metaTitle: "Online Recharge & Bill Payment Services: Mobile, DTH, Electricity & FASTag | BanksCart",
    metaDescription: "Settle all your utility bills and recharges online in seconds. Official BBPS payment channel for Mobile Prepaid, Electricity, FASTag, DTH, LPG Cylinder, and Loan EMIs with zero convenience fees.",
    badge: "Official BBPS Utility Portal",
    intro: "Centralize your monthly household and commercial bill clearances through India's unified Bharat Bill Payment System (BBPS) at BanksCart. Experience zero convenience fees, instant digital clearance receipts, and 256-bit bank-grade encryption across 20,000+ national billers.",
    numLabel: "Mobile / Consumer / Account Number",
    numPlaceholder: "Enter connection identifier",
    numHint: "Select a service category above to access targeted bill fetching.",
    operators: ["Prepaid Mobile", "Electricity Boards", "FASTag Toll", "DTH Satellite", "LPG Cylinder", "Loan EMIs", "Life Insurance"],
    quickAmounts: [299, 500, 1000, 2000, 5000],
    checklistTitle: "Why Clear Bills Through BanksCart BBPS?",
    checklist: [
      "Zero Convenience Surcharge: Pay the exact statutory bill amount with 0% extra gateway commission.",
      "Instant Clearance Ledger: Direct integration with NPCI BBPS guarantees immediate status confirmation and official Biller Reference IDs.",
      "Automated Refund SLA: In the rare event of a network glitch, bank-deducted funds return to source accounts automatically within 48 business hours per RBI mandates."
    ],
    faqs: [
      {
        q: "What is the Bharat Bill Payment System (BBPS)?",
        a: "BBPS is an RBI-conceptualized integrated bill payment ecosystem driven by the National Payments Corporation of India (NPCI). It connects banks, billers, and consumers under a single interoperable roof, ensuring standard consumer protection, instant receipt generation, and dispute resolution."
      },
      {
        q: "Does BanksCart levy any hidden convenience or payment gateway charges?",
        a: "No. Unlike third-party apps that charge ₹1 to ₹3 as convenience fees or platform handling charges, BanksCart provides 100% free BBPS bill payment and recharge services."
      },
      {
        q: "How fast do utility bills reflect on official government power and water board websites?",
        a: "Payments are acknowledged on the central BBPS network immediately. Depending on the state utility board's batch clearing cycles, records reflect on their regional portals within 2 to 24 hours."
      },
      {
        q: "What proof of payment do I receive?",
        a: "Every successful payment generates a verifiable digital BBPS receipt with a unique 12-to-16 digit NPCI Transaction ID, date-timestamp, and biller authorization code that holds legal validity in all dispute audits."
      }
    ],
    editorialArticles: [
      {
        title: "The Architecture of Unified Utility Settlements under NPCI Bharat BillPay",
        paragraphs: [
          "In modern Indian digital banking, the fragmentation of utility bills across regional municipal boards historically forced consumers to manage dozens of disparate portal logins. The introduction of the Bharat Bill Payment System (BBPS) transformed this landscape into a unified clearinghouse. Powered by the National Payments Corporation of India (NPCI), BBPS functions as an interoperable bridge between Customer Operating Units (COU) and Biller Operating Units (BOU).",
          "When you initiate a bill clearance or recharge on BanksCart, your account parameters are queried directly against the authorized central switch. This real-time ping verifies active balances, validates against billing cycles, and prevents accidental overpayments or duplicate submissions. Once authorized via UPI or net banking, clearance confirmation is instant, and legal payment settlement is finalized per Reserve Bank of India standards."
        ]
      },
      {
        title: "Tax Deductions & Input Tax Credit (ITC) on Commercial Utility Payments",
        paragraphs: [
          "For sole proprietorships, registered MSMEs, and commercial establishments, utility expenses—including commercial electricity connections, corporate mobile postpaid lines, and high-speed enterprise broadband—represent legitimate business operational expenditures (OPEX). Under the Indian Income Tax Act, 1961, these costs are 100% deductible against gross revenues, lowering your annual taxable business income.",
          "Furthermore, businesses registered under the Goods and Services Tax (GST) can claim Input Tax Credit (ITC) on the 18% GST charged on telecom and corporate utility statements. Ensuring you pay via an integrated BBPS portal that archives compliant tax receipts with valid Biller GSTIN credentials guarantees seamless reconciliation during annual GST-9 filings and tax audits."
        ]
      }
    ]
  },

  "mobile": {
    key: "mobile",
    title: "Instant Prepaid Mobile Recharge Online: Best Offers & 5G Plans",
    metaTitle: "Prepaid Mobile Recharge Online: Jio, Airtel, Vi, BSNL Plans & Offers | BanksCart",
    metaDescription: "Recharge your prepaid mobile number online instantly at BanksCart. Compare top plans, unlimited 5G packs, and talktime vouchers for Jio, Airtel, Vi, and BSNL with 0% convenience fees.",
    badge: "Instant Mobile Clearance",
    intro: "Recharge any Indian prepaid mobile connection in seconds. Compare active unlimited calling packs, 5G true data bundles, and talktime topups across Reliance Jio, Bharti Airtel, Vodafone Idea (Vi), and BSNL with instant SMS confirmation.",
    numLabel: "10-Digit Mobile Number",
    numPlaceholder: "Enter 10-digit mobile number (e.g. 9876543210)",
    numHint: "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.",
    numType: "tel",
    operators: ["Reliance Jio Prepaid", "Bharti Airtel Prepaid", "Vodafone Idea (Vi) Prepaid", "BSNL Prepaid"],
    quickAmounts: [299, 349, 719, 859, 2999],
    checklistTitle: "Mobile Recharge Quick Guide",
    checklist: [
      "Select your operator and circle: Double-check your telecom circle to access region-specific tariff perks.",
      "Browse live packs: Filter between Unlimited 5G, Data Add-ons, and Annual Savers to maximize cost efficiency.",
      "Instant Talktime Credit: Payment triggers automated telecom API fulfillment with confirmation SMS delivered in under 15 seconds."
    ],
    faqs: [
      {
        q: "How fast is my mobile recharge credited?",
        a: "Mobile prepaid recharges are processed in real-time. You will receive an official confirmation SMS directly from Jio, Airtel, Vi, or BSNL within 10 to 30 seconds."
      },
      {
        q: "Can I recharge my postpaid connection on this page?",
        a: "No, this portal is specifically engineered for prepaid connections. To settle monthly postpaid billing cycles, select the 'Mobile Postpaid' category from the switcher above."
      },
      {
        q: "What should I do if the money is debited but the recharge fails?",
        a: "Under RBI and NPCI settlement guidelines, any failed transaction undergoes automated reconciliation. The debited amount is returned to your original payment source (bank account or UPI wallet) within 24 to 48 business hours."
      },
      {
        q: "Do you charge extra convenience fees on mobile recharges?",
        a: "BanksCart charges zero platform fees or convenience surcharges. You pay only the exact MRP printed on the operator's official tariff card."
      }
    ],
    editorialArticles: [
      {
        title: "Maximizing Value: Understanding 5G Unlimited vs Traditional Data Slabs",
        paragraphs: [
          "With the rapid nationwide rollout of Standalone (SA) and Non-Standalone (NSA) 5G networks across India, mobile data consumption patterns have fundamentally shifted. Leading operators like Reliance Jio and Bharti Airtel bundle unrestricted True 5G data with eligible prepaid plans typically starting from the ₹299 or ₹349 tier. Cardholders and smartphone users should verify their handset 5G band compatibility (n28, n78 bands) to leverage unthrottled high-speed downloads without exhausting daily 1.5GB/2GB 4G quotas.",
          "When selecting a plan, consider your monthly usage curve. While daily quota plans suit regular commuters, opting for an 84-day quarterly pack (such as the popular ₹859 slab) or a 365-day annual pack lowers your effective monthly connectivity cost by nearly 25% while protecting against mid-year telecom tariff revisions."
        ]
      }
    ]
  },

  "postpaid": {
    key: "postpaid",
    title: "Pay Mobile Postpaid Bills Online: Instant Clearance & Zero Fee",
    metaTitle: "Pay Mobile Postpaid Bills Online: Airtel, Jio, Vi Instant BBPS Settlement | BanksCart",
    metaDescription: "Pay your monthly postpaid mobile statement securely online. Fetch bill outstanding, verify consumer names, and settle dues across Airtel, Jio, and Vi with 0% extra fees.",
    badge: "Postpaid BBPS Settlement",
    intro: "Settle your monthly postpaid mobile bills with zero convenience surcharges. Fetch your active statement outstanding in real time, review line-item breakdowns, and avoid connection suspensions.",
    numLabel: "10-Digit Postpaid Mobile Number",
    numPlaceholder: "Enter 10-digit postpaid number",
    numHint: "Ensure the connection is an active postpaid billing account.",
    numType: "tel",
    operators: ["Bharti Airtel Postpaid", "Reliance Jio Postpaid Plus", "Vodafone Idea (Vi) Postpaid", "BSNL Postpaid"],
    quickAmounts: [499, 799, 999, 1499, 2999],
    checklistTitle: "Postpaid Clearance Checklist",
    checklist: [
      "Fetch Verified Bill: Enter your 10-digit number to query current cycle charges, billing dates, and unpaid balances.",
      "Check Advance Payments: You can choose to pay the exact outstanding or add an advance credit buffer.",
      "Instant Statement Credit: Avoid late payment penalties and protect your CIBIL score from negative utility default tags."
    ],
    faqs: [
      {
        q: "How do I check my postpaid billing cycle and due date?",
        a: "Simply input your 10-digit postpaid number and click 'Fetch Bill'. Our BBPS connection queries the operator's billing switch and displays the exact due date, consumer name, and cycle period."
      },
      {
        q: "Does delaying a postpaid bill hurt my credit score?",
        a: "Yes. Major telecom providers report serious postpaid defaults exceeding 90 days to credit bureaus like TransUnion CIBIL and Experian, which can depress your credit score."
      }
    ],
    editorialArticles: [
      {
        title: "Postpaid Corporate Connections and GST Invoicing Compliance",
        paragraphs: [
          "Postpaid mobile connections are widely preferred by salaried executives and corporate business accounts because of unlimited roaming and pooled data allowances. Paying through BanksCart ensures your monthly payment receipt captures the registered Biller GSTIN, allowing finance departments to easily file quarterly tax offsets."
        ]
      }
    ]
  },

  "electricity": {
    key: "electricity",
    title: "Pay Electricity Bill Online: All State Power Distribution Boards",
    metaTitle: "Pay Electricity Bill Online: All State Power Boards BBPS | BanksCart",
    metaDescription: "Pay your monthly electricity bills online securely at BanksCart. We support all major state power boards (BESCOM, Tata Power, MSEDCL, UPPCL, BSES, Torrent) with instant bill fetching and 0% extra fees.",
    badge: "National Electricity BBPS",
    intro: "Clear your domestic or commercial electricity bills across 35+ state power boards nationwide. Fetch verified meter readings, consumer account numbers (CA), and due dates directly from the official utility board server.",
    numLabel: "Consumer Account Number (CA / K-Number)",
    numPlaceholder: "Enter CA Number / Consumer ID",
    numHint: "Printed on the top-right header of your physical electricity bill statement.",
    numType: "text",
    operators: [
      "BESCOM (Bangalore, Karnataka)",
      "MSEDCL (Mahavitaran, Maharashtra)",
      "BSES Rajdhani (Delhi NCR)",
      "BSES Yamuna (Delhi NCR)",
      "Tata Power DDL (Delhi)",
      "Tata Power (Mumbai)",
      "Adani Electricity (Mumbai)",
      "UPPCL Urban (Uttar Pradesh)",
      "UPPCL Rural (Uttar Pradesh)",
      "TANGEDCO (Tamil Nadu)",
      "CESC Limited (Kolkata)",
      "PSPCL (Punjab)",
      "Torrent Power (Gujarat/Agra)",
      "TSSPDCL (Telangana)"
    ],
    billers: ELECTRICITY_BILLERS,
    states: [
      "Karnataka",
      "Maharashtra",
      "Delhi",
      "Uttar Pradesh",
      "Tamil Nadu",
      "West Bengal",
      "Gujarat",
      "Punjab",
      "Haryana",
      "Rajasthan",
      "Telangana",
      "Andhra Pradesh",
      "Kerala",
      "Bihar",
      "Madhya Pradesh"
    ],
    quickAmounts: [500, 1200, 2500, 4500, 8000],
    checklistTitle: "Electricity Payment Guidelines",
    checklist: [
      "Locate Consumer Account (CA) Code: Input the exact alphanumeric or numeric identifier from your monthly electricity slip.",
      "Verify Consumer Name: Confirm the fetched account name matches the registered premises owner or tenant.",
      "Avoid Disconnection Notices: Settle your bill at least 24 hours prior to the final disconnection threshold date."
    ],
    faqs: [
      {
        q: "Where do I locate my Consumer Account (CA) number?",
        a: "Your Consumer Account (CA) or K-Number is prominently displayed at the top or top-right of your official monthly electricity bill, next to the meter serial code."
      },
      {
        q: "Can I pay an electricity bill after the due date?",
        a: "Yes. The BBPS portal allows payment of overdue electricity bills with applicable statutory late payment surcharges automatically included in the fetched total."
      },
      {
        q: "What if the portal says 'No Outstanding Bill'?",
        a: "This indicates that you have already cleared your previous statement, or your regional power board has not yet generated the active billing ledger for the current month."
      }
    ],
    editorialArticles: [
      {
        title: "Decoding Electricity Tariffs: Fixed Charges, Energy Charges, and Fuel Surcharges",
        paragraphs: [
          "An Indian domestic electricity bill consists of multiple calculated components regulated by State Electricity Regulatory Commissions (SERCs). Understanding these charges helps homeowners audit their energy outlays:",
          "1. Fixed Charges: A monthly baseline levy assessed per kilowatt (kW) of sanctioned connected load, regardless of actual energy consumed.\n2. Energy Charges (Telescopic Slabs): Billed per kilowatt-hour (kWh or unit). Most state boards implement tiered pricing where the first 100 units carry subsidized rates, while usage above 300 units enters premium commercial-tier tariffs.\n3. Fuel Surcharge Adjustment (FSA / FAC): A variable monthly adjustment factoring in state power generation fuel and coal procurement cost fluctuations.",
          "By tracking your monthly BBPS clearance receipts on BanksCart, you can monitor seasonal consumption variations and optimize household electricity usage."
        ]
      }
    ]
  },

  "dth": {
    key: "dth",
    title: "Instant DTH Recharge Online: Tata Play, Airtel DTH, Dish TV, Sun",
    metaTitle: "DTH Recharge Online: Tata Play, Airtel DTH, Dish TV, Sun Direct | BanksCart",
    metaDescription: "Recharge your DTH satellite connection online instantly. Browse popular TV channel packs and HD bouquets for Tata Play, Airtel Digital TV, Dish TV, and Sun Direct with 0% extra fees.",
    badge: "Instant Satellite TV",
    intro: "Keep your home entertainment active 24/7 with instant DTH recharge. View subscriber card balances, browse curated channel packs, and recharge any smart card in under 30 seconds.",
    numLabel: "Subscriber ID / Smart Card / VC Number",
    numPlaceholder: "Enter 10 or 11-digit Smart Card Number",
    numHint: "Press the 'Home' or 'Menu' button on your remote control to display your Subscriber ID on screen.",
    numType: "text",
    operators: ["Tata Play (Tata Sky)", "Airtel Digital TV", "Dish TV India", "Sun Direct", "d2h (Videocon)"],
    billers: DTH_OPERATORS,
    quickAmounts: [250, 360, 450, 600, 1200],
    checklistTitle: "DTH Satellite Recharge Steps",
    checklist: [
      "Find Subscriber / VC Number: Press 'Menu' or 'Home' on your remote to view your 10/11-digit ID.",
      "Turn Setup Box On: Keep your set-top box powered on during recharge to ensure the activation signal clears immediately.",
      "Select Curated TV Packs: Browse sports, kids, movie, or regional packs to recharge the exact monthly bouquet."
    ],
    faqs: [
      {
        q: "Why should my set-top box remain switched on during recharge?",
        a: "Direct-to-Home (DTH) satellites broadcast an over-the-air activation signal upon payment. Leaving your set-top box turned on ensures the signal is caught immediately without needing manual refresh calls."
      },
      {
        q: "What should I do if channels do not unblock after payment?",
        a: "Give a missed call to your operator's designated 'Heavy Refresh' toll-free helpline from your registered mobile number, and the satellite signal will re-verify within 5 minutes."
      }
    ],
    editorialArticles: [
      {
        title: "TRAI New Tariff Order (NTO 3.0) and Channel Ala-Carte Rights",
        paragraphs: [
          "Under the Telecom Regulatory Authority of India (TRAI) NTO guidelines, television viewers possess total autonomy over their subscribed channel bouquets. You pay a standardized Network Capacity Fee (NCF) alongside only the specific ala-carte channels or broadcaster bouquets you actively watch, avoiding unnecessary fees for unviewed programming."
        ]
      }
    ]
  },

  "fastag": {
    key: "fastag",
    title: "Instant FASTag Recharge Online: All National Issuing Banks",
    metaTitle: "Instant FASTag Recharge Online: All Issuing Banks NETC | BanksCart",
    metaDescription: "Recharge your vehicle FASTag online in seconds. Instant toll clearance across IDFC FIRST, ICICI, SBI, Axis, and HDFC FASTag with 0% convenience fees.",
    badge: "National NETC FASTag",
    intro: "Recharge your vehicle's RFID FASTag wallet online to ensure frictionless clearance across all National Highway toll plazas. Settle payments for any bank-issued tag in seconds.",
    numLabel: "Vehicle Registration Number",
    numPlaceholder: "Enter Vehicle Number (e.g. DL01AB1234, MH12DE5678)",
    numHint: "Enter vehicle number without spaces or special characters.",
    numType: "text",
    operators: [
      "IDFC FIRST Bank FASTag",
      "ICICI Bank FASTag",
      "State Bank of India (SBI) FASTag",
      "Axis Bank FASTag",
      "HDFC Bank FASTag",
      "Kotak Mahindra Bank FASTag",
      "Airtel Payments Bank FASTag",
      "Bank of Baroda FASTag",
      "IndusInd Bank FASTag"
    ],
    billers: FASTAG_BANKS,
    quickAmounts: [500, 1000, 1500, 2000, 5000],
    checklistTitle: "FASTag Toll Highway Guidelines",
    checklist: [
      "Input Vehicle License Plate: Enter your official RTO registration code accurately without hyphens or spaces.",
      "Select Tag Issuing Bank: Ensure you choose the exact bank printed on your physical windshield RFID sticker.",
      "Maintain Minimum Threshold: NHAI toll plazas automatically blacklist tags with balances below ₹150, attracting double toll cash fines."
    ],
    faqs: [
      {
        q: "How fast is my FASTag balance updated after recharge?",
        a: "NETC FASTag balances reflect on the central NPCI highway clearinghouse within 2 to 5 minutes of payment."
      },
      {
        q: "What happens if I enter an NHAI toll plaza with a low or negative balance?",
        a: "Under NHAI rules, passing through an electronic FASTag lane with a blacklisted or negative balance obligates the motorist to pay double the normal toll tariff in cash."
      }
    ],
    editorialArticles: [
      {
        title: "The National Electronic Toll Collection (NETC) Protocol and Windshield Tagging",
        paragraphs: [
          "Managed by the National Payments Corporation of India (NPCI) under the direction of the Ministry of Road Transport and Highways (MoRTH), FASTag utilizes passive Radio Frequency Identification (RFID) technology.",
          "When approaching a toll plaza, overhead RFID scanners detect the encrypted tag identifier affixed to your windscreen and deduct the toll tariff from your bank-linked prepaid wallet in under 3 seconds, eliminating highway congestion."
        ]
      }
    ]
  },

  "lpg": {
    key: "lpg",
    title: "LPG Gas Cylinder Booking & Piped Natural Gas (PNG) Bill Payment",
    metaTitle: "LPG Cylinder Booking & Gas Bill Payment Online: Indane, HP, Bharat Gas | BanksCart",
    metaDescription: "Book your LPG cylinder refill or pay piped natural gas (PNG) bills online. Instant booking confirmation for Indane, HP Gas, Bharat Gas, and IGL with 0% extra fees.",
    badge: "National LPG & PNG Booking",
    intro: "Book your 14.2kg domestic LPG cylinder refill or settle your monthly piped natural gas (PNG) statement online. Direct linkages with Indane, HP Gas, Bharat Gas, IGL, and MGL.",
    numLabel: "Registered Mobile Number / 17-Digit LPG ID",
    numPlaceholder: "Enter 10-digit mobile or 17-digit LPG ID",
    numHint: "Located on the first page of your domestic LPG blue book or distributor booking receipt.",
    numType: "text",
    operators: [
      "Indane Gas (Indian Oil)",
      "HP Gas (Hindustan Petroleum)",
      "Bharat Gas (Bharat Petroleum)",
      "Indraprastha Gas Limited (IGL) - Piped Gas",
      "Mahanagar Gas Limited (MGL) - Piped Gas",
      "Adani Total Gas Limited - PNG"
    ],
    billers: LPG_PROVIDERS,
    quickAmounts: [803, 829, 1000, 1500, 2500],
    checklistTitle: "LPG Cylinder Booking Procedure",
    checklist: [
      "Input 17-Digit LPG ID or Mobile: Match the mobile number registered with your local cooking gas distributor.",
      "Verify Statutory Cylinder Price: Pay the government-subsidized retail selling price with 0% extra booking charges.",
      "Track Delivery Token: Once confirmed, you will receive an official Cash Memo Booking Reference via SMS for door-to-door OTP delivery."
    ],
    faqs: [
      {
        q: "What is Delivery Authentication Code (DAC) for LPG?",
        a: "DAC is a secure 4-digit OTP sent to your registered mobile upon cylinder dispatch. You must share this code with the delivery executive to receive your refill."
      },
      {
        q: "How does government DBTL (PAHAL) subsidy work?",
        a: "Upon successful delivery verification, applicable government subsidies are credited directly to your Aadhaar-linked primary bank account within 24 to 72 hours."
      }
    ],
    editorialArticles: [
      {
        title: "PAHAL Direct Benefit Transfer for LPG and Cylinder Safety Norms",
        paragraphs: [
          "Under the Ministry of Petroleum and Natural Gas PAHAL (DBTL) framework, consumers purchase domestic LPG cylinders at non-subsidized market rates, and the central subsidy differential is credited electronically into their Aadhaar-mapped bank accounts.",
          "Always inspect the cylinder seal and tare weight stamping before accepting home delivery, and ensure the delivery executive verifies the DAC security token."
        ]
      }
    ]
  },

  "loan-emi": {
    key: "loan-emi",
    title: "Pay Loan EMI Online: Multi-Bank BBPS Repayment & CIBIL Protection",
    metaTitle: "Pay Loan EMI Online: Multi-Bank BBPS Repayment & CIBIL Protection | BanksCart",
    metaDescription: "Pay active personal loan, home loan, and vehicle loan EMIs online securely. Settle repayments across 25+ top banks and NBFCs (Bajaj Finance, HDFC, SBI, ICICI, Muthoot) to protect your CIBIL score.",
    badge: "Official BBPS Loan Repayment",
    intro: "Clear your active retail loans and commercial financing EMIs online. Connect directly with over 25 leading Indian banks, NBFCs, and housing finance companies to prevent auto-debit bounce penalties and maintain a flawless CIBIL credit profile.",
    numLabel: "Loan Account Number (LAN)",
    numPlaceholder: "Enter active Loan Account Number",
    numHint: "Printed on your loan sanction letter, welcome kit, or monthly bank amortization schedule.",
    numType: "text",
    operators: [
      "Bajaj Finance Limited",
      "HDFC Bank Loan Repayment",
      "State Bank of India (SBI) EMI",
      "ICICI Bank Loan Services",
      "Muthoot Finance Gold Loan",
      "Tata Capital Financial Services",
      "L&T Finance Holdings",
      "Aditya Birla Finance Limited",
      "Mahindra Finance"
    ],
    billers: LOAN_EMI_LENDERS,
    quickAmounts: [2500, 5000, 10000, 15000, 25000],
    checklistTitle: "Loan EMI Repayment Instructions",
    checklist: [
      "Verify Loan Account Number (LAN): Input the exact loan identifier assigned by your lending institution.",
      "Clear Prior to NACH Presentation: If your primary bank balance is insufficient, pay here 24 hours before your ECS/NACH clearance date to avoid bank bounce penalties.",
      "Preserve CIBIL Track Record: On-time EMI clearance constitutes 30% of your CIBIL score calculation, ensuring you qualify for low interest rates on future credit."
    ],
    faqs: [
      {
        q: "Does paying my loan EMI on BanksCart prevent bank ECS bounce charges?",
        a: "Yes. Settle your outstanding installment at least 24 hours prior to your lender's NACH presentation date to ensure the loan ledger updates in advance."
      },
      {
        q: "How long does it take for the lender to update my loan ledger?",
        a: "Lenders operating on the BBPS switch acknowledge payments instantly and update amortization schedules within 24 to 48 working hours."
      },
      {
        q: "Can I execute a full loan foreclosure or pre-payment on this portal?",
        a: "This portal processes regular monthly installments and overdue EMIs. For complete loan closures and retrieving collateral deeds, you must visit your lender's nearest physical branch."
      }
    ],
    editorialArticles: [
      {
        title: "The Financial Cost of an EMI Bounce: Penalties, ECS Fees, and CIBIL Impact",
        paragraphs: [
          "Missing or delaying a scheduled monthly loan installment triggers severe financial and legal repercussions under Indian banking regulations:",
          "1. Bank ECS/NACH Inward Bounce Charges: Your primary bank levies an automated dishonor charge ranging between ₹350 and ₹750 + GST for insufficient funds.\n2. Lender Penal Interest: The issuing NBFC or bank assesses penal interest ranging from 2% to 3% per month on the overdue installment until clearance.\n3. Credit Bureau Depletion: Any repayment delayed past 30 days is recorded as 'DPD' (Days Past Due) on your TransUnion CIBIL and Experian reports, dropping your score by 40 to 70 points and restricting access to future credit cards or mortgages.",
          "Using BanksCart's instant BBPS loan clearance engine lets borrowers clear dues in seconds, bypassing failed automated mandates and shielding credit reputations."
        ]
      }
    ]
  },

  "insurance": {
    key: "insurance",
    title: "Pay Insurance Premium Online: LIC, Life & Health Policies",
    metaTitle: "Pay Insurance Premium Online: LIC, HDFC Life, SBI Life BBPS | BanksCart",
    metaDescription: "Pay your life and health insurance renewal premiums online securely. Settle LIC of India, HDFC Life, and SBI Life premiums with 0% extra fees and instant 80C/80D tax receipts.",
    badge: "IRDAI Regulated Clearance",
    intro: "Keep your life insurance cover, health protection, and family endowment plans active. Pay renewal premiums for LIC of India, HDFC Life, ICICI Prudential, and leading health insurers with instant digital premium receipts for tax deductions.",
    numLabel: "Insurance Policy Number",
    numPlaceholder: "Enter Policy Number",
    numHint: "Printed on your original policy bond document or annual premium renewal notice.",
    numType: "text",
    operators: [
      "Life Insurance Corporation of India (LIC)",
      "HDFC Life Insurance",
      "ICICI Prudential Life Insurance",
      "SBI Life Insurance",
      "Max Life Insurance",
      "Tata AIA Life Insurance",
      "Star Health & Allied Insurance"
    ],
    billers: INSURANCE_COMPANIES,
    quickAmounts: [2500, 5000, 10000, 20000, 50000],
    checklistTitle: "Insurance Premium Payment Steps",
    checklist: [
      "Input Valid Policy Number: Enter the digits exactly as printed on your LIC or private insurer bond document.",
      "Check Grace Period Deadlines: Premium payments within the statutory 30-day grace period keep your risk cover fully active.",
      "Instant Section 80C/80D Tax Receipt: Download your official stamped premium payment certificate for income tax deductions."
    ],
    faqs: [
      {
        q: "What happens if I pay during the 30-day grace period?",
        a: "Under IRDAI regulations, all life insurance policies enjoy a 30-day grace period for annual/quarterly modes. Your death cover and rider benefits remain 100% active during this timeframe."
      },
      {
        q: "Can I use the BanksCart digital receipt for Income Tax deductions?",
        a: "Yes. Our BBPS receipt contains the policy number, insurer's IRDAI registration code, GST breakdown, and date timestamp, serving as valid audit documentation under Section 80C and Section 80D."
      }
    ],
    editorialArticles: [
      {
        title: "IRDAI Grace Periods and Policy Lapse Repercussions",
        paragraphs: [
          "Life insurance policies are designed as long-term risk mitigators. If a renewal premium is missed beyond the statutory 30-day grace period, the policy lapses, terminating risk coverage and potentially requiring medical re-examinations or revival penalties. Paying renewals via BanksCart's instant BBPS channel ensures timely clearance and uninterrupted family protection."
        ]
      }
    ]
  },

  "broadband": {
    key: "broadband",
    title: "Pay Broadband & Fiber Landline Bill Online: High-Speed Internet",
    metaTitle: "Pay Broadband & Fiber Landline Bill Online: Airtel, Jio, ACT | BanksCart",
    metaDescription: "Pay your monthly fiber broadband and landline bills online securely. Settle statements for Airtel Xstream Fiber, JioFiber, and ACT Fibernet with 0% extra fees.",
    badge: "High-Speed Fiber BBPS",
    intro: "Settle your monthly home and commercial fiber optic broadband bills with zero convenience fees. Connect directly with Airtel Xstream, JioFiber, ACT Fibernet, and BSNL Bharat Fiber.",
    numLabel: "Broadband Account ID / Landline STD Number",
    numPlaceholder: "Enter Account ID / Telephone Number",
    numHint: "Located on your monthly fiber invoice or telecom account app.",
    numType: "text",
    operators: ["Airtel Xstream Fiber", "JioFiber Broadband", "ACT Fibernet", "BSNL Bharat Fiber", "Tata Play Fiber"],
    billers: BROADBAND_OPERATORS,
    quickAmounts: [499, 799, 999, 1499, 2499],
    checklistTitle: "Broadband Bill Clearance Guide",
    checklist: [
      "Fetch Exact Billing Dues: Input your subscriber account ID to view active month charges and FUP data reset dates.",
      "Avoid Service Disconnects: Clear invoices on or before the due date to ensure continuous work-from-home broadband uptime.",
      "Download GST Compliant Invoices: Perfect for remote professionals and businesses claiming internet expense reimbursements."
    ],
    faqs: [
      {
        q: "How fast is my internet reconnected if it was suspended for non-payment?",
        a: "Once your bill is cleared through BBPS, the ISP's automated RADIUS authentication switch restores broadband connectivity within 15 to 30 minutes."
      }
    ],
    editorialArticles: [
      {
        title: "Work-From-Home Broadband Tax Allowances for Salaried Professionals",
        paragraphs: [
          "Under Indian tax guidelines and corporate HR policies, salaried remote workers can claim official tax-free reimbursements for home fiber internet expenses when backed by compliant BBPS invoices showing account holder details."
        ]
      }
    ]
  },

  "water": {
    key: "water",
    title: "Pay Municipal Water Bill Online: City Water Supply Boards",
    metaTitle: "Pay Municipal Water Bills Online: DJB, BWSSB, MCGM Water Boards | BanksCart",
    metaDescription: "Pay your municipal water and sewerage bills online securely. Settle statements for Delhi Jal Board (DJB), Bangalore Water Board (BWSSB), and MCGM with 0% extra fees.",
    badge: "Municipal Water BBPS",
    intro: "Clear your municipal water supply and sewerage utility statements across India's metropolitan cities. Direct BBPS clearing for Delhi Jal Board, Bangalore BWSSB, and MCGM Mumbai.",
    numLabel: "Consumer K-Number / RR Number",
    numPlaceholder: "Enter Water Board Connection Number",
    numHint: "Printed on your monthly municipal water card or meter reading slip.",
    numType: "text",
    operators: [
      "Delhi Jal Board (DJB)",
      "Bangalore Water Supply & Sewerage Board (BWSSB)",
      "Municipal Corporation of Greater Mumbai (MCGM)",
      "Hyderabad Metro Water (HMWSSB)",
      "Chennai Metro Water (CMWSSB)"
    ],
    billers: WATER_BOARDS,
    quickAmounts: [200, 450, 750, 1200, 2500],
    checklistTitle: "Municipal Water Payment Instructions",
    checklist: [
      "Select Municipal Board: Choose your specific metropolitan water supply and sewerage corporation.",
      "Fetch Meter Account: Verify consumer name and volumetric water consumption charges.",
      "Save Water Clearance Receipts: Essential for municipal property tax audits and municipal clearances."
    ],
    faqs: [
      {
        q: "Where do I find my Delhi Jal Board (DJB) K-Number?",
        a: "Your 10-digit K-Number is printed in bold at the top-center of your DJB water bill, starting with digits that correspond to your municipal water zone."
      }
    ],
    editorialArticles: [
      {
        title: "Understanding Municipal Volumetric Water Tariffs and Sewerage Cess",
        paragraphs: [
          "Municipal water utilities assess dual charges consisting of tiered volumetric consumption tariffs (liters per month) plus a statutory sewerage maintenance cess (typically 20% to 30% of water consumption charges). Paying through BBPS ensures accurate reconciliation."
        ]
      }
    ]
  }
};
