export interface AdityaFeature {
  label: string;
  text: string;
}

export interface AdityaFAQ {
  q: string;
  a: string;
}

export interface AdityaPageContent {
  title: string;
  badge: string;
  intro: string;
  moreIntro?: string;
  highlightsTitle: string;
  highlights: AdityaFeature[];
  ratesTitle?: string;
  ratesHeaders?: string[];
  ratesRows?: string[][];
  faqs: AdityaFAQ[];
}

export const ADITYA_BIRLA_PAGE_MAP: Record<string, AdityaPageContent> = {
  "overview": {
    title: "Aditya Birla Capital: Premium Wealth, Loans & Insurance Portals",
    badge: "Official Corporate Hub",
    intro: "Aditya Birla Capital is the unified financial services holding company of the Aditya Birla Group. Managing massive credit assets, high-yield pension schemes, health insurance frameworks, and wealth preservation portfolios, it is one of the most trusted non-banking financial conglomerates in India.",
    moreIntro: "At BanksCart, we compile official Aditya Birla product sheets and interest tables to help you secure the cheapest term loans, premium health plans, and wealth compounding solutions under fully digitized documentation workflows.",
    highlightsTitle: "Core Services of Aditya Birla Capital",
    highlights: [
      { label: "High-Ticket Loans", text: "Secure collateral-free SME business loans and personal liquidity up to ₹50 Lakhs online." },
      { label: "Tax-Shielded Pensions", text: "Lock in capital inside secure retirement plans with Section 80C exemptions and lifetime annuities." },
      { label: "Premium Health Shield", text: "Secure family healthcare with 100% health-return bonus awards under active lifestyle monitoring." }
    ],
    ratesTitle: "Key Financial Offerings Comparison",
    ratesHeaders: ["Product Category", "Key Interest / Benefits Offered", "Min Entry / Repayment Terms"],
    ratesRows: [
      ["Business Loan Capital", "Starting at 13.50% p.a.", "Tenures up to 60 months, zero asset collateral"],
      ["Empower Pension Plan", "High market-linked equity yields", "Tax exemptions up to ₹1.5 L under Sec 80C"],
      ["Wealth Max Plan (ULIP)", "Capital compounding + Life Cover", "Flexible single or periodic premium slots"],
      ["Activ Health Insurance", "Up to 100% Health Return bonus", "Day 1 chronic disease support, cashless hospitals"],
      ["Aditya Birla AU Credit Card", "Premium travel & fuel savings", "Dual rewards with AU Small Finance Bank"]
    ],
    faqs: [
      { q: "Is Aditya Birla Capital a bank?", a: "No. Aditya Birla Capital is a systemic Non-Banking Financial Company (NBFC) registered with the RBI, offering loans, mutual funds, insurance, and pension plans." },
      { q: "How can I check my Aditya Birla loan status?", a: "You can track your active loans online via the Aditya Birla Capital digital portal or log in to the BanksCart dashboard using your phone OTP." }
    ]
  },
  "business-loan": {
    title: "Aditya Birla Business Loan: Competitive Unsecured SME Credit Slabs",
    badge: "MSME Acceleration",
    intro: "Empower your business milestones with an Aditya Birla Finance Business Loan. Tailored specifically for small and medium enterprises, this collateral-free credit facility offers high-ticket capital to purchase raw materials, clear inventory pipelines, or balance seasonal cash deficits.",
    moreIntro: "At BanksCart, we optimize your application flow by comparing Aditya Birla's corporate interest margins. With zero asset requirements, minimal documentation parameters, and turnaround limits under 48 hours, scaling is made easy.",
    highlightsTitle: "Highlights of Aditya Birla Business Loans",
    highlights: [
      { label: "High Unsecured Limit", text: "Secure up to ₹50 Lakhs in working capital without submitting property or factory asset collateral." },
      { label: "Extended Tenures", text: "Repay comfortably over structured repayment tenure slots ranging from 12 to 60 months." },
      { label: "concession on base rates", text: "GST-compliant MSMEs and Udyam tag holders qualify for special interest rate waivers." }
    ],
    ratesTitle: "Business Loan Interest & Fee Slabs",
    ratesHeaders: ["Business Vintage Category", "Interest Rates (p.a.)", "Processing Fee Slab", "Repayment Horizon"],
    ratesRows: [
      ["Established MSME (Vintage > 3 yrs)", "13.00% - 15.50% p.a.", "0.99% - 1.50%", "12 to 60 Months"],
      ["Standard Retailers (Vintage > 2 yrs)", "14.00% - 18.00% p.a.", "1.50% - 2.00%", "12 to 48 Months"],
      ["Professional Firms (Doctors/CAs)", "12.50% - 14.50% p.a.", "Flat ₹9,999", "12 to 60 Months"]
    ],
    faqs: [
      { q: "What are the eligibility criteria for an Aditya Birla business loan?", a: "Applicants must show an operating business vintage of at least 2 to 3 years, annual turnovers exceeding ₹15 Lakhs, and a personal CIBIL score of 680+." },
      { q: "What is the processing turnaround time (TAT)?", a: "Unsecured MSME applications are fast-tracked digitally, with final approvals and disbursals cleared in 24 to 48 hours." }
    ]
  },
  "business-loan-interest-rate": {
    title: "Aditya Birla Business Loan Interest Rates: Compare Baseline Slabs",
    badge: "Rates Comparison",
    intro: "Secure the cheapest borrowing costs by analyzing the full grid of **Aditya Birla Business Loan Interest Rates**. The company utilizes advanced credit risk assessment algorithms to structure pricing, offering competitive margins linked directly to business performance.",
    moreIntro: "At BanksCart, we provide real-time updates on active baseline rates, processing percentages, foreclosure schedules, and hidden administrative charges, saving you money.",
    highlightsTitle: "Key Factors Influencing Interest Slabs",
    highlights: [
      { label: "Pristine Credit Rating", text: "Maintain a business CIBIL score of 720+ to qualify for lowest double-digit base rates." },
      { label: "Stable GST Returns", text: "Submitting GSTR-3B records proving cash flow consistency reduces corporate risk premiums." },
      { label: "Sector Priority", text: "Manufacturing and priority sectors qualify for additional concessions under sovereign guarantee programs." }
    ],
    faqs: [
      { q: "What is the baseline interest rate for Aditya Birla business loans?", a: "Rates typically start at 13.00% p.a. for premium professional categories and extend up to 21.00% p.a. based on risk parameters." },
      { q: "Are foreclosure charges applicable?", a: "Yes. Early pre-payment or foreclosure attracts a fee of 2% to 4% on the outstanding principal after 6 active EMIs." }
    ]
  },
  "empower-pension-sp-plan": {
    title: "ABSLI Empower Pension SP Plan: High-Yield Single Premium Annuities",
    badge: "Retirement Planners",
    intro: "The Aditya Birla Sun Life Insurance (ABSLI) **Empower Pension SP Plan** is a non-participating, single premium unit-linked pension plan. This high-yield plan enables retirees to secure their life goals by depositing a single lump-sum premium that compounds dynamically in diverse equity and debt market funds.",
    moreIntro: "At BanksCart, we outline compounding schedules and annuity payout models. By investing early, you secure tax-shielded capital reserves alongside guaranteed lifelong pension annuities.",
    highlightsTitle: "Highlights of Empower Pension SP Plan",
    highlights: [
      { label: "Single Premium (SP)", text: "Deposit a single lump-sum premium (minimum ₹1 Lakh) and let it compound without the hassle of annual payouts." },
      { label: "Market-Linked Growth", text: "Choose from customized asset configurations including high-yield equity, balanced hybrid, or debt portfolios." },
      { label: "Tax Insulation Slabs", text: "Enjoy unmatched tax exemptions up to ₹1.5 Lakhs on premiums under Section 80C, with 100% tax-free maturity annuity slabs." }
    ],
    faqs: [
      { q: "What is the minimum entry age for the ABSLI Empower Pension SP Plan?", a: "The minimum entry age is 25 years, and the maximum entry age is capped at 70 years." },
      { q: "Can I withdraw cash in emergencies?", a: "The plan has a statutory 5-year lock-in period. After 5 years, partial withdrawals are permitted for specific events like critical healthcare or child education." }
    ]
  },
  "absli-empower-pension-plan": {
    title: "ABSLI Empower Pension Plan: Structured Compounding Retirement Plan",
    badge: "Wealth Protection",
    intro: "The ABSLI **Empower Pension Plan** is a unit-linked regular premium pension plan designed to cultivate periodic savings habits. By depositing weekly, monthly, or annual premiums, you compile a massive retirement corpus to fund post-career security.",
    moreIntro: "At BanksCart, we explain dynamic investment funds choices and maturity annuity calculations to ensure you retire with absolute peace of mind.",
    highlightsTitle: "Highlights of ABSLI Regular Pension Plans",
    highlights: [
      { label: "Flexible Premium Slabs", text: "Choose to pay regular premiums annually, semi-annually, quarterly, or monthly to fit cash flows." },
      { label: "Guaranteed Additions", text: "Earn loyalty additions and wealth boosters credited to your fund value at regular policy intervals." },
      { label: "Annuity Versatility", text: "On vesting, withdraw up to 60% of the compiled corpus tax-free, and convert the remaining 40% into lifelong pensions." }
    ],
    faqs: [
      { q: "What is the vesting age range?", a: "The vesting (retirement) age ranges from 35 years up to a maximum of 80 years." },
      { q: "What happens in the event of policyholder's demise?", a: "The nominee receives the higher of the compiled Fund Value or 105% of total premiums paid as a secure death benefit." }
    ]
  },
  "absli-wealth-max-plan": {
    title: "ABSLI Wealth Max Plan: Premium High-Yield Single Premium ULIP",
    badge: "ULIP Portfolio",
    intro: "The **ABSLI Wealth Max Plan** is a single premium, unit-linked life insurance plan (ULIP) that combines wealth generation with high-fidelity life cover. By paying a one-time premium, you gain immediate exposure to high-performing capital markets backed by expert fund audits.",
    moreIntro: "At BanksCart, we compare asset allocation options. By balancing dynamic equity and sovereign bonds, you secure double benefits of capital insulation and tax exemption.",
    highlightsTitle: "Highlights of ABSLI Wealth Max",
    highlights: [
      { label: "One-Time Payment", text: "Single premium payment (starting at ₹1 Lakh) powers a policy coverage extending up to 10 to 20 years." },
      { label: "Self-Managed Portfolio", text: "Switch dynamically between 11 diverse investment funds (ranging from bluechip equity to debt) 100% free of cost." },
      { label: "Loyalty Boosters", text: "Receive massive percentage add-ons credited directly to your active units after year 10." }
    ],
    faqs: [
      { q: "Is the switching fee applicable between equity and debt funds?", a: "No. ABSLI Wealth Max allows unlimited free switches online to help you lock in profits when markets shift." },
      { q: "What is the tax implication on maturity?", a: "Maturity proceeds are completely tax-exempt under Section 10(10D), provided the single premium does not exceed 10% of the sum assured." }
    ]
  },
  "wealth-secure-plan": {
    title: "ABSLI Wealth Secure Plan: Dynamic Regular Premium Wealth ULIP",
    badge: "Wealth Compounder",
    intro: "The **ABSLI Wealth Secure Plan** is a premium unit-linked life insurance product custom-designed to address long-term family security goals. By regularizing investment payments, you balance market risks and compile a highly resilient wealth shield.",
    moreIntro: "At BanksCart, we explain systematic investment strategies like 'Automated Asset Allocation' that automatically secure your funds as policy maturity nears.",
    highlightsTitle: "Highlights of Wealth Secure ULIP",
    highlights: [
      { label: "Premium Holiday option", text: "Permits premium payment waivers or flexible adjustments after year 5 under valid cash constraints." },
      { label: "Automatic Allocation Shield", text: "Automatically shifts capital from equity to debt as maturity nears to protect compiled returns." },
      { label: "Dynamic Riders Addons", text: "Attach accidental death or critical illness riders to secure complete family protection." }
    ],
    faqs: [
      { q: "What is the lock-in period for ABSLI Wealth Secure?", a: "Like all IRDAI-registered ULIPs, the Wealth Secure plan carries a mandatory 5-year lock-in period." },
      { q: "Can I check my current NAV online?", a: "Yes. You can track real-time NAV unit prices, investment values, and switch assets 24/7 on the BanksCart digital dashboard." }
    ]
  },
  "protector-plus": {
    title: "ABSLI Protector Plus Plan: Premium High-Cover Term Insurance",
    badge: "Family Security Shield",
    intro: "Protect your family's future with the **ABSLI Protector Plus Plan**, a comprehensive pure term life insurance plan. Providing substantial death benefit coverage at highly affordable premium brackets, this plan secures your outstanding bank liabilities, home loans, and children's education.",
    moreIntro: "At BanksCart, we simplify insurance comparisons. By selecting appropriate sum assured structures, payment options, and riders, we ensure your family stands financially insulated.",
    highlightsTitle: "Highlights of ABSLI Protector Plus",
    highlights: [
      { label: "Drastic Life Coverage", text: "Secure comprehensive sum assured brackets extending from ₹50 Lakhs up to no upper limit at cheap premiums." },
      { label: "Liability Shield", text: "Prevents banks or mortgage lenders from claiming family assets by clearing outstanding home loans." },
      { label: "Inbuilt Terminal Illness", text: "Accelerated payouts of up to 50% of the sum assured upon diagnosis of life-threatening terminal conditions." }
    ],
    faqs: [
      { q: "Does the plan offer return of premium?", a: "No. Protector Plus is a pure term protection plan without maturity payouts. It prioritizes maximum sum assured coverages at lowest possible costs." },
      { q: "Are premiums paid exempt under income tax?", a: "Yes. All periodic premium payments are 100% tax-exempt up to ₹1.5 Lakhs annually under Section 80C." }
    ]
  },
  "aditya-birla-activ-health": {
    title: "Aditya Birla Activ Health: Premium Health return Wellness Shield",
    badge: "Health Protection",
    intro: "The **Aditya Birla Activ Health** plan is a revolutionary health insurance product designed to reward active healthy lifestyles. Unlike standard plans, this shield offers cash incentives, Chronic Management support, and up to 100% Health Return bonus awards.",
    moreIntro: "At BanksCart, we detail cashless network hospitals, family floater configurations, and wellness incentives. By staying active (verified via smartphone apps), you cut premium costs by half.",
    highlightsTitle: "Highlights of Activ Health Premium Plan",
    highlights: [
      { label: "100% HealthReturns™", text: "Earn up to 100% of your paid premium back as usable cash rewards by logging active daily steps." },
      { label: "Chronic Management Program", text: "Enjoy Day 1 medical coverage and diagnostic checkups for diabetes, hypertension, and asthma." },
      { label: "Cashless Network Grids", text: "Access over 10,000+ top cashless hospitals across India with instant digitised approvals." }
    ],
    faqs: [
      { q: "How do I earn HealthReturns cash incentives?", a: "Download the Activ Health app, track your daily physical steps (e.g. 10,000 steps/day), complete monthly health checks, and earn points redeemable for OPD bills or premium cuts." },
      { q: "Is there any waiting period for pre-existing diseases?", a: "Standard pre-existing diseases carry a 3-year waiting period. However, under the Chronic Management plan, chronic conditions are covered from Day 1." }
    ]
  },
  "grievance-redressal-escalation-matrix": {
    title: "Aditya Birla Finance Grievance Redressal: Escalation Matrices",
    badge: "Nodal Grievances",
    intro: "Aditya Birla Finance Limited (ABFL) is committed to delivering a transparent, fair, and professional lending experience. If you encounter service delays, debit errors, or incorrect bureau entries, the company offers a robust Grievance Redressal and Escalation Matrix.",
    moreIntro: "At BanksCart, we simplify customer rights. We detail Level-1 branch desks, Level-2 customer service heads, Level-3 Principal Nodal Officers, and direct links to the RBI Integrated Ombudsman to resolve disputes fast.",
    highlightsTitle: "Escalation Matrix Levels",
    highlights: [
      { label: "Level 1: Branch / Support", text: "Log your complaint online or call the customer care line to register a ticket." },
      { label: "Level 2: Grievance Redressal", text: "Escalate unresolved Level-1 queries to the Grievance Redressal Officer." },
      { label: "Level 3: Nodal Desk", text: "Submit unresolved disputes directly to the Principal Nodal Officer at central offices." }
    ],
    ratesTitle: "Escalation Desk Contact Info",
    ratesHeaders: ["Department Stage", "Officer Name / Contact Address", "Resolution Turnaround SLA"],
    ratesRows: [
      ["Level 1 (General Support)", "Email: care.finance@adityabirlacapital.com | Phone: 1800-270-7000", "7 Working Days"],
      ["Level 2 (Redressal Head)", "Grievance Officer, ABFL, corporate offices, Mumbai", "7 Working Days"],
      ["Level 3 (Principal Nodal)", "Nodal Officer: principalnodalofficer.abfl@adityabirlacapital.com", "7 Working Days"],
      ["Level 4 (Ombudsman)", "RBI Integrated Ombudsman Scheme: https://cms.rbi.org.in", "30 Days Maximum"]
    ],
    faqs: [
      { q: "How long does Aditya Birla Finance take to resolve complaints?", a: "Most retail complaints are resolved in 3 to 7 working days. If unresolved within 30 days, the user can file an appeal with the RBI Ombudsman." }
    ]
  },
  "personal-loan-documents-required": {
    title: "Aditya Birla Personal Loan Documents Required Checklist",
    badge: "Application Checklist",
    intro: "Prepare your application dossier accurately before applying for an Aditya Birla Finance Personal Loan. Having the correct identity, address, and income proofs ready prevents processing delay loops and secures fast digital base-rate clearances.",
    moreIntro: "At BanksCart, we outline the exact documents required for both salaried and self-employed professionals to ensure 100% successful digital onboarding.",
    highlightsTitle: "Mandatory Document Checklist",
    highlights: [
      { label: "Proof of Identity (POI)", text: "Aadhaar Card, PAN Card, Passport, or Voter ID copy." },
      { label: "Proof of Address (POA)", text: "Utility bills, active rent agreement, bank statement, or Aadhaar." },
      { label: "Income Credentials", text: "Past 3 months' salary slips, 2 years' Form 16, and past 6 months' bank statements." }
    ],
    faqs: [
      { q: "Do I need physical document submissions?", a: "No. The entire onboarding can be completed online via secure document upload portals and Aadhaar e-KYC." }
    ]
  },
  "home-loan-interest-rates": {
    title: "Aditya Birla Home Loan Interest Rates: Compare baseline Slabs",
    badge: "Mortgages Comparison",
    intro: "Secure the cheapest borrowing costs by comparing the full baseline spectrum of **Aditya Birla Home Loan Interest Rates**. The company offers highly competitive floating rate brackets linked directly to commercial lending benchmark indicators.",
    moreIntro: "At BanksCart, we simplify mortgages. We provide real-time updates on active baseline floating rates, processing percentages, and LTV parameters.",
    highlightsTitle: "Home Loan Rate Highlights",
    highlights: [
      { label: "Cheapest Floating Rates", text: "Starting as low as 8.95% p.a. for premium salaried borrowers with excellent credit ratings." },
      { label: "Extended Tenures", text: "Repay comfortably over structured repayment tenures extending up to 30 years." },
      { label: "Balance Transfer Concessions", text: "Switch high-interest home loans from other banks to Aditya Birla to drop EMIs." }
    ],
    faqs: [
      { q: "What is the processing fee on home loans?", a: "The processing fee ranges between 0.50% and 1.50% of the loan amount, with special seasonal flat waivers." }
    ]
  },
  "home-loan": {
    title: "Aditya Birla Home Loan: Low-Interest Housing Mortgages Online",
    badge: "Housing Finance",
    intro: "Step into your dream home with an Aditya Birla Housing Finance Home Loan. Offering flexible credit limits, high loan-to-value LTV backing, and extended tenures, the company supports purchasing fresh flats, constructing homes, or renovating existing properties.",
    moreIntro: "At BanksCart, we optimize your mortgage structure. We compare home loans side-by-side to ensure your property acquisition is simple.",
    highlightsTitle: "Why Choose Aditya Birla Home Loans?",
    highlights: [
      { label: "LTV up to 90%", text: "Secure housing finance covering up to 80% to 90% of the property value." },
      { label: "Simplified Property check", text: "Fast-track technical and legal checks of properties under pre-approved project panels." },
      { label: "Sovereign Subsidies", text: "Fully aligned with government interest subsidy schemes for first-time buyers." }
    ],
    faqs: [
      { q: "What is the maximum home loan tenure available?", a: "Aditya Birla Housing Finance offers tenures up to 30 years for salaried individuals." }
    ]
  },
  "loan-against-property": {
    title: "Aditya Birla Loan Against Property: Unlock Cash from Real Estate",
    badge: "Secured Funding",
    intro: "Unlock the hidden monetary value of your residential, commercial, or industrial real estate with an Aditya Birla Loan Against Property (LAP). This high-value secured loan provides substantial capital to expand business empires, fund children's foreign educations, or manage high-ticket personal requirements.",
    moreIntro: "At BanksCart, we outline property valuation parameters and competitive mortgage base rates. With reducing calculations and flexible tenures, you secure cash without losing asset ownership.",
    highlightsTitle: "Highlights of Loan Against Property (LAP)",
    highlights: [
      { label: "High Funding Limits", text: "Secure funding up to ₹10 Crores based on property market valuations." },
      { label: "Lower Interest Slabs", text: "LAP rates are significantly cheaper than personal loans, starting at 9.50% p.a." },
      { label: "Dynamic Asset Usage", text: "Accepts commercial plots, residential self-occupied homes, or rented warehouses as collaterals." }
    ],
    faqs: [
      { q: "What is the maximum LTV (Loan-to-Value) for LAP?", a: "Lenders typically offer up to 60% to 75% of the market value of residential properties and up to 50% for commercial properties." }
    ]
  },
  "personal-loan": {
    title: "Aditya Birla Personal Loan: Instant Collateral-Free Cash Online",
    badge: "Instant Liquidity",
    intro: "An Aditya Birla Finance Personal Loan is an unsecured multi-purpose credit facility designed to help retail customers manage immediate cash requirements. Whether consolidating high-interest debts, funding medical expenses, remodeling homes, or upgrading vehicles, you can access fast capital with competitive interest rates.",
    moreIntro: "At BanksCart, we optimize your personal application. We compare baseline interest rates to ensure your monthly EMIs are comfortable.",
    highlightsTitle: "Highlights of Unsecured Personal Loans",
    highlights: [
      { label: "High Unsecured Limits", text: "Access personal loans up to ₹15 Lakhs without submitting physical assets as security." },
      { label: "Digitized Disbursals", text: "Fast-track applications online with digital KYC and clearings under 24 hours." },
      { label: "Convenient Tenure Slabs", text: "Repay comfortably over tenure grids extending from 12 to 86 months." }
    ],
    faqs: [
      { q: "What is the minimum CIBIL score required for a personal loan?", a: "Aditya Birla Finance prefers a CIBIL rating of 680 and above for fast, digital approvals." }
    ]
  },
  "personal-loan-emi-calculator": {
    title: "Aditya Birla Personal Loan EMI Calculator: Estimate Payments",
    badge: "Financial Calculators",
    intro: "Plan your borrowing accurately using the interactive **Aditya Birla Personal Loan EMI Calculator**. This free online tool helps you estimate monthly EMI payments, total interest payable, and view complete amortization schedules instantly.",
    moreIntro: "At BanksCart, we simplify financial math. Adjust the principal, interest percentage, and tenure sliders below to select the most comfortable repayment budget.",
    highlightsTitle: "Benefits of the EMI Calculator",
    highlights: [
      { label: "Instant Math Results", text: "See immediate updates to your monthly EMI and interest totals on slider changes." },
      { label: "Compare Tenure Options", text: "Simulate tenures from 1 to 5 years to find the perfect balance between low EMI and interest." },
      { label: "Transparent Fee Checks", text: "Accounts for processing administrative fees to display true borrowing totals." }
    ],
    faqs: [
      { q: "How is the personal loan EMI calculated?", a: "EMI is calculated using a monthly reducing balance formula: E = P * r * (1+r)^n / ((1+r)^n - 1)." }
    ]
  }
};
