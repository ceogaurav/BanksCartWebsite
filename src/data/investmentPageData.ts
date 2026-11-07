export interface InvestmentFAQ {
  q: string;
  a: string;
}

export interface InvestmentRecommendRow {
  name: string;
  issuer: string;
  returns: string;
  lockIn: string;
}

export interface InvestmentPageContent {
  title: string;
  badge: string;
  intro: string;
  moreIntro?: string;
  keyFeaturesTitle: string;
  keyFeatures: { label: string; text: string }[];
  recommendTitle: string;
  recommendHeaders: string[];
  recommendDetails: InvestmentRecommendRow[];
  checklistTitle: string;
  checklist: string[];
  faqs: InvestmentFAQ[];
}

export const INVESTMENT_PAGE_MAP: Record<string, InvestmentPageContent> = {
  // ==================== BONDS ====================
  "bonds/overview": {
    title: "Apply for High-Yield Bonds Online: Fixed Returns (2026)",
    badge: "Fixed Income Assets",
    intro: "Bonds are formal debt instruments issued by corporations, municipal bodies, and the Government of India to raise capital. When you buy a bond, you lend money to the issuing entity in exchange for fixed, predictable coupon payouts and complete return of your principal at maturity.",
    moreIntro: "Compare top-rated corporate bonds, sovereign gold bonds, and tax-free public issues on BanksCart. Evaluate coupon yields up to 11.5% p.a., check credit ratings, and invest digitally through SEBI and RBI regulated platforms.",
    keyFeaturesTitle: "Key Advantages of Investing in Bonds",
    keyFeatures: [
      { label: "Guaranteed Payouts", text: "Receive predictable, pre-determined interest payments semi-annually or annually." },
      { label: "Capital Protection", text: "Sovereign and AAA-rated bonds guarantee the return of principal at maturity." },
      { label: "Portfolio Stability", text: "Buffer your investment portfolio against stock market volatility and inflation." }
    ],
    recommendTitle: "Compare Top Rated Bonds in India 2026",
    recommendHeaders: ["Bond Name & Series", "Issuing Entity", "Coupon Yield (p.a.)", "Lock-in Period"],
    recommendDetails: [
      { name: "Sovereign Gold Bonds (SGB)", issuer: "Reserve Bank of India (RBI)", returns: "2.50% + Gold Appreciation", lockIn: "8 Years (Exit at 5th)" },
      { name: "NHAI Tax-Free Bonds", issuer: "National Highways Authority", returns: "5.50% (100% Tax-Free)", lockIn: "10 to 15 Years" },
      { name: "L&T Finance Secured NCD", issuer: "L&T Finance Holdings (AAA)", returns: "8.90% to 9.25%", lockIn: "36 to 60 Months" },
      { name: "NABARD Capital Gain Bonds", issuer: "NABARD (Sovereign Backed)", returns: "5.25% (Sec 54EC Benefit)", lockIn: "5 Years Mandatory" }
    ],
    checklistTitle: "Investor Checklist Before Buying Bonds",
    checklist: [
      "Check credit ratings: Prioritize AAA or AA+ rated bonds from CRISIL, ICRA, or CARE to minimize default risks.",
      "Understand tax treatment: High-tax bracket investors should seek tax-free municipal and PSU bond issues.",
      "Evaluate secondary liquidity: Confirm whether the bond is actively traded on NSE or BSE for early exits."
    ],
    faqs: [
      { q: "What is a bond coupon rate?", a: "The coupon rate is the annual interest rate paid by the bond issuer to the investor, calculated on the face value of the bond." },
      { q: "Are bonds completely safe?", a: "Sovereign bonds backed by the Government of India are 100% default-free. Corporate bonds carry minor credit risks indicated by rating agencies." },
      { q: "What are tax-free bonds?", a: "Bonds issued by government undertakings (like NHAI, REC, PFC) where the interest earned is completely exempt from income tax under Section 10(15)." },
      { q: "Can I sell my bonds before maturity?", a: "Yes. Dematerialized bonds listed on NSE or BSE can be sold in the secondary market, subject to trading volume and market prices." },
      { q: "What is Yield to Maturity (YTM)?", a: "YTM is the total annualized rate of return anticipated on a bond if held until maturity, factoring in all coupon payouts and purchase price differentials." }
    ]
  },

  "bonds/government": {
    title: "Government Bonds & G-Secs: 2026 Yields, RBI Direct & Complete Guide",
    badge: "Sovereign Fixed Income",
    intro: "Government Securities (G-Secs), Treasury Bills (T-Bills), and State Development Loans (SDLs) are debt instruments issued directly by the Reserve Bank of India on behalf of the Government of India. They carry absolute sovereign safety with zero credit default risk.",
    moreIntro: "Through the RBI Retail Direct initiative, individual Indian investors can directly buy Government of India dated securities, 91-day T-Bills, and 10-year benchmark bonds online without intermediaries or brokerage commissions.",
    keyFeaturesTitle: "Why Invest in Government Bonds & G-Secs?",
    keyFeatures: [
      { label: "Zero Default Risk", text: "Backed by the sovereign guarantee of the Government of India, making them the safest asset in the nation." },
      { label: "RBI Retail Direct", text: "Direct online investment portal created by RBI allowing retail investors to buy G-Secs with zero brokerage." },
      { label: "Semi-Annual Coupons", text: "Receive timely interest payouts directly into your linked bank account every 6 months." }
    ],
    recommendTitle: "Key Indian Government Securities & Indicative Yields 2026",
    recommendHeaders: ["Government Security Type", "Issuing Authority", "Current Yield / Rate", "Tenure Horizons"],
    recommendDetails: [
      { name: "10-Year Benchmark G-Sec", issuer: "Government of India (RBI)", returns: "7.05% - 7.15% p.a.", lockIn: "10 Years (Liquid on Exchange)" },
      { name: "91-Day / 364-Day T-Bills", issuer: "Ministry of Finance", returns: "6.80% - 6.95% p.a.", lockIn: "91 to 364 Days" },
      { name: "State Development Loans (SDLs)", issuer: "State Governments", returns: "7.35% - 7.50% p.a.", lockIn: "5 to 15 Years" },
      { name: "Floating Rate Savings Bonds (FRSB)", issuer: "RBI on behalf of GoI", returns: "8.05% p.a. (NSC + 0.35%)", lockIn: "7 Years" }
    ],
    checklistTitle: "How to Invest in G-Secs via RBI Retail Direct",
    checklist: [
      "Open a Retail Direct Gilt Account (RDG) with RBI using your PAN, Aadhaar, and bank account details.",
      "Participate in primary auctions conducted weekly by the RBI through non-competitive bidding.",
      "Hold securities until maturity to eliminate secondary market interest rate price volatility."
    ],
    faqs: [
      { q: "What are Government Securities (G-Secs)?", a: "G-Secs are debt instruments issued by the Central Government to fund public infrastructure and fiscal requirements. They offer guaranteed semi-annual interest and principal repayment." },
      { q: "Is investing in G-Secs 100% safe?", a: "Yes. G-Secs carry sovereign guarantee from the Government of India, meaning there is zero risk of principal or interest default." },
      { q: "How are Treasury Bills (T-Bills) different from G-Secs?", a: "T-Bills are short-term money market instruments with tenures of 91, 182, or 364 days issued at a discount, whereas G-Secs are long-term bonds paying semi-annual coupon interest." },
      { q: "How is interest from Government Bonds taxed?", a: "Interest from regular G-Secs is fully taxable under 'Income from Other Sources' according to your personal income tax slab." },
      { q: "What is the minimum investment in Government Bonds?", a: "The minimum investment in Government dated securities and T-Bills through RBI Retail Direct is ₹10,000." }
    ]
  },

  "bonds/corporate": {
    title: "Corporate Bonds & Non-Convertible Debentures (NCDs) 2026",
    badge: "High-Yield Debt",
    intro: "Corporate Bonds and Non-Convertible Debentures (NCDs) are debt securities issued by private and public companies to fund expansion. They offer 1.5% to 3.0% higher annual yields than traditional bank fixed deposits.",
    moreIntro: "Compare CRISIL AAA and AA+ rated corporate NCDs on BanksCart. Enjoy monthly, quarterly, or cumulative interest payout options with transparent credit risk assessments.",
    keyFeaturesTitle: "Benefits of Corporate Bonds",
    keyFeatures: [
      { label: "Superior Yields", text: "Earn up to 9.50% to 11.00% annual interest from India's highest-rated corporate houses." },
      { label: "Flexible Payouts", text: "Select from monthly, quarterly, annual, or cumulative compounding interest modes." },
      { label: "Demat Holding", text: "Stored safely in your existing NSDL/CDSL demat account with secondary exchange liquidity." }
    ],
    recommendTitle: "Top Rated Corporate NCDs in India",
    recommendHeaders: ["Issuer & Issue Series", "Credit Rating", "Coupon Yield (p.a.)", "Tenure Horizon"],
    recommendDetails: [
      { name: "HDFC Bank Corporate Bond", issuer: "CRISIL AAA", returns: "7.85% - 8.10%", lockIn: "3 to 5 Years" },
      { name: "Bajaj Finance Secured NCD", issuer: "CRISIL AAA / ICRA AAA", returns: "8.25% - 8.65%", lockIn: "24 to 60 Months" },
      { name: "Tata Capital Financial NCD", issuer: "CRISIL AAA", returns: "8.40% - 8.85%", lockIn: "36 to 60 Months" },
      { name: "Mahindra Finance Secured Bond", issuer: "CARE AAA", returns: "8.35% - 8.70%", lockIn: "3 to 7 Years" }
    ],
    checklistTitle: "Corporate Bond Due Diligence Checklist",
    checklist: [
      "Check credit ratings: Never invest in corporate bonds rated below AA without expert professional guidance.",
      "Verify whether the NCD is secured: Secured NCDs have first charge on company assets in event of distress.",
      "Check liquidity on NSE/BSE: Ensure adequate trading volumes exist if you plan to exit before maturity."
    ],
    faqs: [
      { q: "What are Non-Convertible Debentures (NCDs)?", a: "NCDs are fixed-income corporate debt instruments that cannot be converted into equity shares. They offer higher interest rates in exchange for long-term capital lock-in." },
      { q: "What is the difference between Secured and Unsecured NCDs?", a: "Secured NCDs are backed by the issuer company's physical or financial assets. In case of liquidation, secured bondholders are paid first before unsecured lenders." },
      { q: "How are corporate bond returns taxed?", a: "Interest from listed corporate bonds is added to your income and taxed at your applicable income tax slab rates." }
    ]
  },

  "bonds/tax-free": {
    title: "Tax-Free Bonds in India: Section 10(15) 100% Tax-Exempt Yields",
    badge: "Tax Optimization",
    intro: "Tax-Free Bonds are long-term debt securities issued by government-backed infrastructure undertakings like NHAI, REC, PFC, and IRFC. All interest earned is 100% exempt from income tax under Section 10(15)(iv)(h) of the Income Tax Act.",
    moreIntro: "For individuals in the 30% and 39% income tax brackets, a 5.50% tax-free bond delivers an effective pre-tax equivalent yield of over 8.25%, with zero credit risk and sovereign stability.",
    keyFeaturesTitle: "Why Invest in Tax-Free Bonds?",
    keyFeatures: [
      { label: "100% Tax Exemption", text: "Zero income tax on interest payouts; no TDS deducted by the issuer." },
      { label: "High Effective Yield", text: "Beats standard bank FDs on a post-tax basis for taxpayers in higher income tax slabs." },
      { label: "Sovereign PSU Backing", text: "Issued exclusively by government public sector enterprises with AAA credit ratings." }
    ],
    recommendTitle: "Popular Secondary Market Tax-Free Bonds",
    recommendHeaders: ["PSU Issuer", "Original Issue Coupon", "Effective Pre-Tax Yield (30% Slab)", "Maturity Period"],
    recommendDetails: [
      { name: "NHAI Tax-Free Bond Series", issuer: "Govt of India Undertaking", returns: "5.45% - 5.65% (Tax-Free)", lockIn: "Maturity 2031 - 2036" },
      { name: "REC Limited Tax-Free Bonds", issuer: "Maharatna PSU", returns: "5.50% - 5.75% (Tax-Free)", lockIn: "Maturity 2032 - 2037" },
      { name: "PFC Tax-Free Bond Tranche", issuer: "Power Finance Corp", returns: "5.40% - 5.60% (Tax-Free)", lockIn: "Maturity 2030 - 2035" },
      { name: "IRFC Railway Tax-Free Bonds", issuer: "Indian Railway Finance Corp", returns: "5.35% - 5.55% (Tax-Free)", lockIn: "Maturity 2031 - 2035" }
    ],
    checklistTitle: "Tax-Free Bond Investment Checklist",
    checklist: [
      "Buy via Demat on secondary markets: New primary issues are rarely launched; buy existing bonds listed on NSE/BSE.",
      "Compare Yield to Maturity (YTM): Focus on current market purchase price and YTM rather than the original face value coupon.",
      "Account for Capital Gains: While interest is 100% tax-free, capital gains on secondary sale before maturity are taxable."
    ],
    faqs: [
      { q: "Is interest from tax-free bonds completely exempt from tax?", a: "Yes. Under Section 10(15) of the Income Tax Act, the annual interest earned from notified government tax-free bonds is 100% tax-free." },
      { q: "Is TDS deducted on tax-free bonds?", a: "No. Since interest is exempt from income tax, issuers deduct zero TDS on annual payouts." },
      { q: "How can I buy tax-free bonds today?", a: "You can purchase existing listed tax-free bonds through your regular stock trading and demat account on the NSE or BSE." }
    ]
  },

  "bonds/sovereign-gold": {
    title: "Sovereign Gold Bonds (SGB): 2.5% p.a. + Tax-Free Capital Gains",
    badge: "Gold Assets",
    intro: "Sovereign Gold Bonds (SGBs) are government securities denominated in grams of gold issued by the Reserve Bank of India. They offer a guaranteed 2.50% annual interest payout on top of gold price appreciation, with 100% tax-free capital gains at maturity.",
    moreIntro: "Eliminate making charges, purity concerns, and storage locker fees. SGBs represent the most cost-efficient and tax-advantaged vehicle to hold gold in India.",
    keyFeaturesTitle: "Unmatched Advantages of SGBs",
    keyFeatures: [
      { label: "2.5% Annual Interest", text: "Receive 2.50% p.a. fixed interest credited semi-annually into your bank account." },
      { label: "Zero Making Charges", text: "Buy pure 999 gold value without retail jeweler markups or GST on physical gold." },
      { label: "100% Tax-Free Maturity", text: "Capital gains on SGB redemption upon 8-year maturity are completely exempt from tax." }
    ],
    recommendTitle: "Sovereign Gold Bond Key Parameters",
    recommendHeaders: ["Parameter", "Official RBI Specification", "Investor Benefit"],
    recommendDetails: [
      { name: "Annual Interest Coupon", issuer: "2.50% p.a. (Simple Interest)", returns: "Paid Semi-annually", lockIn: "Regular Cashflow" },
      { name: "Tenure & Exit Window", issuer: "8 Years Total Tenure", returns: "Early exit permitted from 5th year", lockIn: "Liquid on NSE/BSE" },
      { name: "Capital Gains Taxation", issuer: "Exempt under Section 47(viic)", returns: "0% Tax on RBI Redemption", lockIn: "Max Tax Savings" },
      { name: "Loan Collateral Utility", issuer: "Accepted by Banks as Collateral", returns: "Up to 85% Loan-to-Value", lockIn: "Instant Liquidity" }
    ],
    checklistTitle: "SGB Investment Rules",
    checklist: [
      "Eligibility: Indian resident individuals, HUFs, trusts, and charitable institutions can invest.",
      "Limits: Minimum 1 gram; maximum 4 kg per fiscal year for individual investors.",
      "Hold to maturity: Hold until the 8-year maturity window to claim 100% capital gains tax exemption."
    ],
    faqs: [
      { q: "What are Sovereign Gold Bonds?", a: "SGBs are government-backed securities denominated in grams of gold issued by the RBI, serving as a superior alternative to holding physical gold." },
      { q: "Is the capital gain on SGB tax-free?", a: "Yes. Capital gains tax arising on redemption of SGB to an individual upon 8-year maturity is completely exempt from tax." },
      { q: "How is the 2.5% interest taxed?", a: "The 2.5% annual interest is added to your total income and taxed according to your income tax slab rate." }
    ]
  },

  "bonds/zero-coupon": {
    title: "Zero Coupon Bonds: Deep Discount Bonds & Yields Guide (2026)",
    badge: "Discount Debt",
    intro: "Zero-Coupon Bonds (ZCBs) do not pay periodic coupon interest during their lifecycle. Instead, they are issued at a deep discount to face value and redeemed at full face value upon maturity, generating returns purely from capital appreciation.",
    moreIntro: "Eliminate reinvestment risk completely. Because zero-coupon bonds derive returns from capital gains rather than annual interest, they offer exceptional compounding efficiency for long-term financial milestones.",
    keyFeaturesTitle: "Why Invest in Zero Coupon Bonds?",
    keyFeatures: [
      { label: "Zero Reinvestment Risk", text: "All returns compound automatically at the locked-in yield without requiring coupon reinvestment." },
      { label: "Deep Discount Price", text: "Purchase bonds at a fraction of their eventual maturity face value." },
      { label: "Tax-Efficient LTCG", text: "Long-term capital gains on listed bonds are taxed at concessional rates of 12.5%." }
    ],
    recommendTitle: "Zero Coupon Bond Comparison & Yield Matrices",
    recommendHeaders: ["Issuer & Entity", "Discount Booking Price", "Face Value at Maturity", "Implied YTM Yield"],
    recommendDetails: [
      { name: "NABARD Zero Coupon Bond", issuer: "National Agriculture Bank", returns: "7.15% - 7.35% YTM", lockIn: "10 Years Maturity" },
      { name: "REC Deep Discount Series", issuer: "Rural Electrification Corp", returns: "7.20% - 7.45% YTM", lockIn: "15 Years Maturity" },
      { name: "SIDBI Infrastructure ZCB", issuer: "SIDBI Bank", returns: "7.30% - 7.50% YTM", lockIn: "7 Years Maturity" },
      { name: "NHAI STRIPS Tranche", issuer: "National Highways Authority", returns: "7.10% - 7.30% YTM", lockIn: "5 to 10 Years" }
    ],
    checklistTitle: "Zero Coupon Bond Due Diligence",
    checklist: [
      "Calculate Yield to Maturity (YTM) to compare side-by-side against standard fixed deposits.",
      "Ensure the issue is listed on NSE/BSE to qualify for favorable 12.5% long-term capital gains tax rates.",
      "Match the maturity date with specific life goals like children's higher education or retirement corpus."
    ],
    faqs: [
      { q: "What is a Zero Coupon Bond?", a: "A bond that pays no periodic interest. It is sold at a discounted price below face value and redeemed at full face value on maturity." },
      { q: "How do investors make money on Zero Coupon Bonds?", a: "The return is the difference between the discounted purchase price and the full face value received at maturity." },
      { q: "What is the tax treatment of Zero Coupon Bonds?", a: "Returns are treated as capital gains. Long-term capital gains on listed zero-coupon bonds held over 12 months are taxed at 12.5%." }
    ]
  },

  "bonds/tax-free-bonds": {
    title: "Tax-Free Bonds in India: Section 10(15) 100% Tax-Exempt Yields",
    badge: "Tax Optimization",
    intro: "Tax-Free Bonds are long-term debt securities issued by government-backed infrastructure undertakings like NHAI, REC, PFC, and IRFC. All interest earned is 100% exempt from income tax under Section 10(15)(iv)(h) of the Income Tax Act.",
    moreIntro: "For individuals in the 30% and 39% income tax brackets, a 5.50% tax-free bond delivers an effective pre-tax equivalent yield of over 8.25%, with zero credit risk and sovereign stability.",
    keyFeaturesTitle: "Why Invest in Tax-Free Bonds?",
    keyFeatures: [
      { label: "100% Tax Exemption", text: "Zero income tax on interest payouts; no TDS deducted by the issuer." },
      { label: "High Effective Yield", text: "Beats standard bank FDs on a post-tax basis for taxpayers in higher income tax slabs." },
      { label: "Sovereign PSU Backing", text: "Issued exclusively by government public sector enterprises with AAA credit ratings." }
    ],
    recommendTitle: "Popular Secondary Market Tax-Free Bonds",
    recommendHeaders: ["PSU Issuer", "Original Issue Coupon", "Effective Pre-Tax Yield (30% Slab)", "Maturity Period"],
    recommendDetails: [
      { name: "NHAI Tax-Free Bond Series", issuer: "Govt of India Undertaking", returns: "5.45% - 5.65% (Tax-Free)", lockIn: "Maturity 2031 - 2036" },
      { name: "REC Limited Tax-Free Bonds", issuer: "Maharatna PSU", returns: "5.50% - 5.75% (Tax-Free)", lockIn: "Maturity 2032 - 2037" },
      { name: "PFC Tax-Free Bond Tranche", issuer: "Power Finance Corp", returns: "5.40% - 5.60% (Tax-Free)", lockIn: "Maturity 2030 - 2035" },
      { name: "IRFC Railway Tax-Free Bonds", issuer: "Indian Railway Finance Corp", returns: "5.35% - 5.55% (Tax-Free)", lockIn: "Maturity 2031 - 2035" }
    ],
    checklistTitle: "Tax-Free Bond Investment Checklist",
    checklist: [
      "Buy via Demat on secondary markets: New primary issues are rarely launched; buy existing bonds listed on NSE/BSE.",
      "Compare Yield to Maturity (YTM): Focus on current market purchase price and YTM rather than the original face value coupon.",
      "Account for Capital Gains: While interest is 100% tax-free, capital gains on secondary sale before maturity are taxable."
    ],
    faqs: [
      { q: "Is interest from tax-free bonds completely exempt from tax?", a: "Yes. Under Section 10(15) of the Income Tax Act, the annual interest earned from notified government tax-free bonds is 100% tax-free." },
      { q: "Is TDS deducted on tax-free bonds?", a: "No. Since interest is exempt from income tax, issuers deduct zero TDS on annual payouts." },
      { q: "How can I buy tax-free bonds today?", a: "You can purchase existing listed tax-free bonds through your regular stock trading and demat account on the NSE or BSE." }
    ]
  },

  // ==================== FIXED DEPOSITS ====================
  "fd/rates": {
    title: "Latest Bank Fixed Deposit (FD) Interest Rates 2026",
    badge: "Guaranteed Savings",
    intro: "A Fixed Deposit (FD) is a secure financial savings instrument offered by banks and NBFCs where you deposit a lump sum amount for a fixed tenure at a locked-in rate of interest. FDs guarantee absolute capital safety and regular interest earnings, making them the default choice for conservative wealth creators.",
    moreIntro: "Compare fixed deposit interest rates across India's top public, private, and small finance banks at BanksCart. Senior citizens qualify for up to 0.75% additional interest rates, pushing total returns past 8.50% p.a.",
    keyFeaturesTitle: "Perks of Investing in Bank FDs",
    keyFeatures: [
      { label: "Assured Returns", text: "FD interest rates are locked at the time of booking and remain unaffected by market downturns." },
      { label: "DICGC Deposit Insurance", text: "All bank deposits up to ₹5 Lakhs are 100% insured by the Government of India via DICGC." },
      { label: "Liquidity Access", text: "Avail instant loans or overdraft lines up to 90% of your pledged FD value instantly." }
    ],
    recommendTitle: "Highest Fixed Deposit Interest Rates 2026",
    recommendHeaders: ["Bank / Issuer", "General Rate (p.a.)", "Senior Citizen Rate (p.a.)", "Best Tenure Option"],
    recommendDetails: [
      { name: "HDFC Bank FD", issuer: "HDFC Bank Ltd", returns: "7.25% - 7.40%", lockIn: "18 to 35 Months" },
      { name: "State Bank of India (SBI) FD", issuer: "State Bank of India", returns: "7.00% - 7.10%", lockIn: "2 to 3 Years (Amrit Kalash)" },
      { name: "Unity Small Finance Bank", issuer: "Unity SFB", returns: "8.50% - 9.00%", lockIn: "1001 Days" },
      { name: "Bajaj Finance Corporate FD", issuer: "Bajaj Finserv (CRISIL AAA)", returns: "8.05% - 8.35%", lockIn: "24 to 36 Months" }
    ],
    checklistTitle: "FD Booking Checklist",
    checklist: [
      "Compare Small Finance Banks: SFBs offer 1-2% higher rates than traditional commercial banks under identical DICGC safety nets.",
      "Submit Form 15G/15H: Provide forms to the bank to prevent automatic 10% TDS deductions on interest exceeding ₹40,000.",
      "Choose Cumulative payout: Cumulative FDs compound interest quarterly to maximize maturity yields."
    ],
    faqs: [
      { q: "What is the maximum limit insured under DICGC?", a: "The Deposit Insurance and Credit Guarantee Corporation (DICGC) guarantees deposits (principal + interest) up to ₹5 Lakhs per bank account." },
      { q: "What is a Tax-Saving Fixed Deposit?", a: "A 5-year locked fixed deposit that qualifies for income tax deductions up to ₹1.5 Lakhs under Section 80C." },
      { q: "Can I break my FD before maturity?", a: "Yes. Most banks permit premature withdrawals, but charge a minor penalty of 0.50% to 1.00% on the applicable interest rate." },
      { q: "What is Form 15G/15H?", a: "Self-declaration forms submitted to banks by individuals (15G) or senior citizens (15H) to prevent TDS when their annual taxable income is below exemption limits." },
      { q: "How is FD interest taxed?", a: "FD interest is taxable under 'Income from Other Sources' and is subject to TDS if the total interest exceeds ₹40,000 (₹50,000 for senior citizens) in a financial year." }
    ]
  },

  "fd/senior-citizen": {
    title: "Senior Citizen Fixed Deposit Rates 2026: Up to 9.50% Returns",
    badge: "Senior Citizen Wealth",
    intro: "Senior Citizen Fixed Deposits offer special preferential interest rate markups (typically 0.50% to 0.75% above standard card rates) for Indian citizens aged 60 years and above. They provide dependable, guaranteed monthly or quarterly pension-style income.",
    moreIntro: "Under Section 80TTB, senior citizens enjoy tax exemptions on interest income up to ₹50,000 annually, alongside higher TDS threshold limits and special super senior citizen slabs (80+ years).",
    keyFeaturesTitle: "Exclusive Benefits for Senior Citizens",
    keyFeatures: [
      { label: "Additional Yield Markup", text: "Earn +0.50% to +0.75% extra interest across all tenures; up to 9.50% in SFBs." },
      { label: "Section 80TTB Benefit", text: "Deduct up to ₹50,000 of deposit interest income from your annual taxable income." },
      { label: "Monthly Pension Option", text: "Select non-cumulative monthly interest payouts directly deposited into your savings account." }
    ],
    recommendTitle: "Best Senior Citizen FD Rates in India",
    recommendHeaders: ["Bank / Lending Institution", "Senior Citizen Rate (p.a.)", "General Public Rate", "Recommended Tenure"],
    recommendDetails: [
      { name: "Unity Small Finance Bank", issuer: "Unity SFB", returns: "9.50% p.a.", lockIn: "1001 Days" },
      { name: "Suryoday Small Finance Bank", issuer: "Suryoday SFB", returns: "9.10% p.a.", lockIn: "25 Months" },
      { name: "State Bank of India (WeCare)", issuer: "SBI", returns: "7.50% - 7.60% p.a.", lockIn: "5 to 10 Years" },
      { name: "HDFC Senior Care Deposit", issuer: "HDFC Bank", returns: "7.75% - 7.90% p.a.", lockIn: "35 to 55 Months" }
    ],
    checklistTitle: "Senior Citizen FD Documentation",
    checklist: [
      "Submit Age Proof: Provide PAN, Passport, or Voter ID verifying completion of 60 years.",
      "Submit Form 15H: Provide at the start of every financial year to avoid TDS deductions.",
      "Nomination: Always register a nominee to ensure seamless transfer of funds without legal delays."
    ],
    faqs: [
      { q: "Who qualifies as a Senior Citizen for FD rates?", a: "Any resident Indian individual who has attained the age of 60 years at the time of booking the fixed deposit." },
      { q: "What is Section 80TTB?", a: "Section 80TTB allows senior citizens to claim deductions of up to ₹50,000 on interest income earned from bank and post office deposits." },
      { q: "Can a senior citizen submit Form 15H?", a: "Yes. Form 15H can be submitted if the final calculated tax on total estimated income is zero." }
    ]
  },

  "fd/loan-against-fd": {
    title: "Loan Against Fixed Deposit (OD Against FD): Low Interest Instant Credit",
    badge: "Secured Credit Line",
    intro: "A Loan Against Fixed Deposit (also known as an Overdraft against FD) allows deposit holders to borrow funds against their pledged FD without breaking the deposit or losing accrued interest.",
    moreIntro: "Interest rates on FD loans are set at just 1.0% to 2.0% above the underlying deposit rate. You only pay interest on the exact amount utilized and for the exact number of days borrowed.",
    keyFeaturesTitle: "Key Advantages of Loans Against FD",
    keyFeatures: [
      { label: "Lowest Interest Rates", text: "Charged at just 1% to 2% over your FD interest rate; significantly cheaper than personal loans." },
      { label: "No CIBIL Scrutiny", text: "100% secured against your deposit; approved instantly without salary slips or credit checks." },
      { label: "Continuous Compounding", text: "Your underlying FD continues to earn full compounding interest during the loan tenure." }
    ],
    recommendTitle: "Loan Against FD Terms by Major Banks",
    recommendHeaders: ["Bank", "Max Sanction Limit", "Interest Markup over FD", "Processing Charges"],
    recommendDetails: [
      { name: "State Bank of India (SBI)", issuer: "Up to 90% of FD Value", returns: "FD Rate + 1.00%", lockIn: "Zero Processing Fee" },
      { name: "HDFC Bank Overdraft", issuer: "Up to 90% of FD Value", returns: "FD Rate + 1.25%", lockIn: "Nil Charges" },
      { name: "ICICI Bank FD Loan", issuer: "Up to 90% of FD Value", returns: "FD Rate + 1.00%", lockIn: "Instant via iMobile" },
      { name: "Axis Bank Credit Line", issuer: "Up to 85% of FD Value", returns: "FD Rate + 1.50%", lockIn: "Zero Prepayment Penalty" }
    ],
    checklistTitle: "When to Choose an Overdraft Against FD",
    checklist: [
      "Short-term liquidity needs (1 to 6 months) to avoid breaking long-term locked FDs.",
      "Borrowers with low or no CIBIL scores seeking instant paperless emergency funding.",
      "Repay at your own pace without fixed EMI constraints or prepayment penalties."
    ],
    faqs: [
      { q: "What is the maximum loan amount against a Fixed Deposit?", a: "Most banks sanction up to 85% to 90% of the principal and accrued interest value of the pledged deposit." },
      { q: "Does taking a loan stop my FD interest earnings?", a: "No. Your fixed deposit continues to earn its contracted interest rate throughout the loan period." },
      { q: "What happens if I fail to repay the loan against FD?", a: "If the loan remains unpaid upon FD maturity, the bank simply adjusts the outstanding debt against the maturity proceeds and credits the remaining balance to your account." }
    ]
  },

  // ==================== MUTUAL FUNDS ====================
  "mutual-funds/overview": {
    title: "Invest in Direct Mutual Funds Online: Zero Commission (2026)",
    badge: "Market Assets",
    intro: "A Mutual Fund is a professionally managed investment trust that pools capital from retail investors to purchase a diversified portfolio of equities, debt instruments, government bonds, or gold. Mutual funds enable retail savers to access professional fund management and compound wealth efficiently.",
    moreIntro: "Compare direct mutual funds at BanksCart. Set up automated monthly SIPs starting from ₹100, bypass intermediary distributor commissions completely, and choose from high-performing equity, debt, and balanced portfolios.",
    keyFeaturesTitle: "Core Strengths of Mutual Funds",
    keyFeatures: [
      { label: "Expert Management", text: "Portfolios are actively tracked and rebalanced by certified professional Fund Managers." },
      { label: "Broad Diversification", text: "Spread minor capital across dozens of market leaders, cushioning against single-company failures." },
      { label: "SIP Automation", text: "Configure automated monthly standing instructions to buy fund units continuously." }
    ],
    recommendTitle: "High-Performing Equity Mutual Funds 2026",
    recommendHeaders: ["Fund Name & AMC", "Category", "3-Year Annual Return", "Expense Ratio"],
    recommendDetails: [
      { name: "Parag Parikh Flexi Cap Direct", issuer: "PPFAS Mutual Fund", returns: "21.20% p.a.", lockIn: "0.60% (Direct Plan)" },
      { name: "Quant Active Direct Plan", issuer: "Quant Mutual Fund", returns: "24.50% p.a.", lockIn: "0.75% (Direct Plan)" },
      { name: "SBI Contra Direct Fund", issuer: "SBI Mutual Fund", returns: "22.80% p.a.", lockIn: "0.68% (Direct Plan)" },
      { name: "Mirae Asset Large Cap Direct", issuer: "Mirae Asset AMC", returns: "16.50% p.a.", lockIn: "0.55% (Direct Plan)" }
    ],
    checklistTitle: "Mutual Funds Checklist",
    checklist: [
      "Prefer Direct Plans over Regular: Direct plans bypass broker commissions, adding 1% to 1.5% extra returns yearly.",
      "Check Expense Ratios: Lower expense ratios leave more compounding capital in your investment account.",
      "Match Horizon with Fund Type: Short-term needs belong in debt/liquid funds; long-term goals belong in equity schemes."
    ],
    faqs: [
      { q: "What is an SIP?", a: "A Systematic Investment Plan (SIP) allows you to invest a fixed amount of money in a mutual fund regularly rather than a lump sum." },
      { q: "What is Net Asset Value (NAV)?", a: "NAV represents the market value per unit of a mutual fund scheme, calculated by dividing the total net assets by the active unit count." },
      { q: "What is the difference between Direct and Regular plans?", a: "Direct plans are bought directly from the AMC with zero commissions, while Regular plans include a yearly commission paid to brokers." },
      { q: "How are mutual fund gains taxed?", a: "Equity fund gains held for over 1 year are Long Term Capital Gains (LTCG), taxed at 12.5% on profits exceeding ₹1.25 Lakh. Gains under 1 year are STCG, taxed at 20%." }
    ]
  },

  "mutual-funds/large-cap": {
    title: "Top Large Cap Mutual Funds 2026: Bluechip Stability & Returns",
    badge: "Bluechip Equity",
    intro: "Large Cap Mutual Funds invest at least 80% of their total assets in India's top 100 established companies by market capitalization (such as Reliance, TCS, HDFC Bank, Infosys, and ICICI Bank). They offer steady, dependable capital growth with lowest volatility among equity asset classes.",
    moreIntro: "Compare top-performing large cap mutual funds on BanksCart. Ideal for first-time equity investors seeking long-term compounding over a 3 to 5-year investment horizon.",
    keyFeaturesTitle: "Why Choose Large Cap Funds?",
    keyFeatures: [
      { label: "Bluechip Security", text: "Invests in market leaders with proven balance sheets, monopolistic advantages, and high corporate governance." },
      { label: "Lower Drawdowns", text: "Resists bear market corrections significantly better than mid-cap or small-cap funds." },
      { label: "Inflation-Beating Growth", text: "Historically delivers 12% to 15% annualized returns, comfortably outpacing bank fixed deposits." }
    ],
    recommendTitle: "Best Performing Large Cap Direct Funds",
    recommendHeaders: ["Fund Scheme", "Fund House (AMC)", "5-Year CAGR Return", "AUM (Assets)"],
    recommendDetails: [
      { name: "Nippon India Large Cap Direct", issuer: "Nippon India Mutual Fund", returns: "17.40% p.a.", lockIn: "₹32,000+ Crores" },
      { name: "ICICI Prudential Bluechip Direct", issuer: "ICICI Prudential AMC", returns: "16.80% p.a.", lockIn: "₹55,000+ Crores" },
      { name: "HDFC Top 100 Direct Fund", issuer: "HDFC Mutual Fund", returns: "16.20% p.a.", lockIn: "₹34,000+ Crores" },
      { name: "Mirae Asset Large Cap Direct", issuer: "Mirae Asset AMC", returns: "15.90% p.a.", lockIn: "₹38,000+ Crores" }
    ],
    checklistTitle: "Large Cap Investor Checklist",
    checklist: [
      "Horizon: Maintain a minimum 3 to 5-year holding horizon to ride out short-term stock market cycles.",
      "SIP vs Lump Sum: Set up automated monthly SIPs to benefit from rupee cost averaging during market dips.",
      "Index Alternatives: Consider Nifty 50 Index funds if you want ultra-low expense ratios below 0.15%."
    ],
    faqs: [
      { q: "What defines a Large Cap Mutual Fund in India?", a: "Under SEBI classification, large-cap funds must invest at least 80% of their total assets in the top 100 companies by market capitalization." },
      { q: "Are Large Cap funds safer than Mid Cap funds?", a: "Yes. Large-cap companies are established market leaders with solid balance sheets, making them far more resilient during economic slowdowns." }
    ]
  },

  "mutual-funds/elss": {
    title: "Best ELSS Tax Saving Mutual Funds: Section 80C Exemption (2026)",
    badge: "Tax-Saving Equity",
    intro: "Equity Linked Savings Schemes (ELSS) are diversified equity mutual funds that qualify for tax deductions of up to ₹1.5 Lakhs annually under Section 80C of the Income Tax Act. They feature the shortest lock-in period (just 3 years) among all Section 80C options.",
    moreIntro: "Save up to ₹46,800 in annual taxes while compounding wealth in high-growth Indian equities. Compare top direct ELSS funds on BanksCart with zero distributor commission overheads.",
    keyFeaturesTitle: "Why ELSS Outperforms PPF & Tax FDs",
    keyFeatures: [
      { label: "Shortest 3-Year Lock-in", text: "PPF locks capital for 15 years and Tax FDs for 5 years; ELSS unlocks full liquidity in just 3 years." },
      { label: "Superior Wealth Creation", text: "Compounded equity returns of 14% to 18% historically outperform fixed 7.1% PPF returns." },
      { label: "SIP Tax Deduction", text: "Every monthly SIP installment qualifies for Section 80C deduction in the respective financial year." }
    ],
    recommendTitle: "Top Rated ELSS Tax Saving Funds",
    recommendHeaders: ["ELSS Fund Scheme", "Fund House (AMC)", "3-Year Annualized Return", "Expense Ratio"],
    recommendDetails: [
      { name: "Quant ELSS Tax Saver Direct", issuer: "Quant Mutual Fund", returns: "28.40% p.a.", lockIn: "0.76% (3-Yr Lock)" },
      { name: "Mirae Asset ELSS Tax Saver", issuer: "Mirae Asset AMC", returns: "18.20% p.a.", lockIn: "0.62% (3-Yr Lock)" },
      { name: "Parag Parikh ELSS Tax Saver", issuer: "PPFAS Mutual Fund", returns: "19.50% p.a.", lockIn: "0.65% (3-Yr Lock)" },
      { name: "SBI Long Term Equity Direct", issuer: "SBI Mutual Fund", returns: "21.60% p.a.", lockIn: "0.95% (3-Yr Lock)" }
    ],
    checklistTitle: "ELSS Investment Rules",
    checklist: [
      "Old Tax Regime: ELSS deductions under Section 80C apply under the Old Tax Regime.",
      "Lock-in Calculation: For SIPs, each monthly installment has its own independent 3-year lock-in cycle.",
      "LTCG Taxation: Gains above ₹1.25 Lakh per financial year are subject to 12.5% LTCG tax upon redemption."
    ],
    faqs: [
      { q: "How much tax can I save with ELSS?", a: "You can invest up to ₹1.5 Lakhs in ELSS under Section 80C to reduce your taxable income, saving up to ₹46,800 annually for taxpayers in the 30% slab." },
      { q: "Can I withdraw money from ELSS before 3 years?", a: "No. Under statutory government guidelines, ELSS funds have a mandatory 3-year lock-in from the date of each purchase." }
    ]
  },

  "bonds/floating-rate": {
    title: "RBI Floating Rate Savings Bonds (FRSB): 8.05% Sovereign Yield (2026)",
    badge: "Sovereign Savings Bonds",
    intro: "Floating Rate Savings Bonds (Taxable) 2020(T) are government-backed debt instruments issued by the Reserve Bank of India on behalf of the Government of India. The coupon rate is pegged to the National Savings Certificate (NSC) rate + 35 basis points, ensuring your interest yield automatically scales with inflation benchmarks.",
    moreIntro: "With 100% sovereign safety of principal and periodic interest payouts every 6 months, RBI Floating Rate Savings Bonds offer one of the safest high-yielding fixed income avenues for conservative investors and senior citizens seeking predictable cash flows.",
    keyFeaturesTitle: "Key Highlights of RBI Floating Rate Bonds",
    keyFeatures: [
      { label: "100% Sovereign Safety", text: "Issued by the Government of India with zero credit risk and unconditional guarantee of principal and interest." },
      { label: "Inflation-Linked Coupon", text: "Coupon rate resets semi-annually on January 1 and July 1, guaranteed at 35 bps above the prevailing NSC rate." },
      { label: "Regular Semi-Annual Payouts", text: "Interest is directly credited to your registered bank account on July 1 and January 1 every calendar year." },
      { label: "Accessible Minimum Ticket", text: "Start investing with as low as ₹1,000 with no maximum investment ceiling." }
    ],
    recommendTitle: "Floating Rate Bonds vs Alternative Fixed Income",
    recommendHeaders: ["Instrument", "Current Yield / Rate", "Tenure / Lock-in", "Sovereign Guarantee"],
    recommendDetails: [
      { name: "RBI Floating Rate Bond (FRSB)", issuer: "Reserve Bank of India", returns: "8.05% p.a. (semi-annual)", lockIn: "7 Years (Senior Premature Exit)" },
      { name: "Post Office NSC (5-Year)", issuer: "Department of Posts", returns: "7.70% p.a. (compounded)", lockIn: "5 Years" },
      { name: "Senior Citizen Savings Scheme (SCSS)", issuer: "Government of India", returns: "8.20% p.a. (quarterly)", lockIn: "5 Years" },
      { name: "Bank Fixed Deposit (1-3 Year)", issuer: "Leading Commercial Banks", returns: "7.00% - 7.50% p.a.", lockIn: "DICGC up to ₹5 Lakhs" }
    ],
    checklistTitle: "Investor Eligibility & Rules",
    checklist: [
      "Eligibility: Resident Indian individuals and Hindu Undivided Families (HUFs) can invest. NRIs are not eligible.",
      "Lock-in Tenure: Mandatory 7-year lock-in period. Premature redemption is permitted for senior citizens aged 60+ after 4 to 6 years.",
      "Taxation: Interest received is fully taxable as per your individual income tax slab. TDS is deducted if interest exceeds ₹10,000."
    ],
    faqs: [
      { q: "Can RBI Floating Rate Bonds be traded on stock exchanges?", a: "No. These bonds are non-transferable, non-negotiable, and cannot be pledged as collateral for bank loans." },
      { q: "How often does the interest rate change?", a: "The coupon rate resets semi-annually every 6 months on January 1st and July 1st, reflecting the Government's prevailing NSC rate plus 0.35%." }
    ]
  },

  "bonds/capital-gain": {
    title: "Section 54EC Capital Gain Bonds: 100% Exemption on Property Sale LTCG (2026)",
    badge: "Section 54EC Tax Exemption",
    intro: "Section 54EC Bonds, popularly known as Capital Gain Bonds, provide 100% tax exemption on Long-Term Capital Gains (LTCG) arising from the sale of immovable real estate (land or residential/commercial buildings). Specified institutional issuers include REC, PFC, NHAI, and IRFC.",
    moreIntro: "Avoid paying hefty capital gains taxes by investing your net capital gains into government-specified infrastructure bonds within 6 months of your property sale. Enjoy safe annual coupon earnings while securing full tax relief under statutory income tax provisions.",
    keyFeaturesTitle: "Section 54EC Benefits & Tax Saving Mechanics",
    keyFeatures: [
      { label: "100% LTCG Tax Exemption", text: "Completely exempts capital gains tax under Section 54EC of the Income Tax Act up to ₹50 Lakhs per financial year." },
      { label: "AAA-Rated Sovereign Issuers", text: "Issued exclusively by REC Limited, PFC, NHAI, and IRFC with highest domestic credit ratings." },
      { label: "Guaranteed 5.25% Annual Coupon", text: "Earn steady, predictable annual interest payouts directly credited to your savings account." },
      { label: "Zero Market Volatility", text: "Fixed maturity value with no exposure to equity or secondary market price fluctuations." }
    ],
    recommendTitle: "Approved 54EC Issuers & Specifications",
    recommendHeaders: ["Issuer Entity", "Credit Rating", "Coupon Rate (p.a.)", "Tenure / Lock-in"],
    recommendDetails: [
      { name: "REC Limited 54EC Capital Gain", issuer: "Rural Electrification Corp", returns: "5.25% p.a.", lockIn: "5 Years (Mandatory)" },
      { name: "PFC 54EC Capital Gain Bonds", issuer: "Power Finance Corporation", returns: "5.25% p.a.", lockIn: "5 Years (Mandatory)" },
      { name: "NHAI 54EC Capital Gain Bonds", issuer: "National Highways Authority", returns: "5.25% p.a.", lockIn: "5 Years (Mandatory)" },
      { name: "IRFC 54EC Infrastructure Bonds", issuer: "Indian Railway Finance Corp", returns: "5.25% p.a.", lockIn: "5 Years (Mandatory)" }
    ],
    checklistTitle: "Mandatory 54EC Compliance Guidelines",
    checklist: [
      "Six-Month Deadline: Investment must be executed within strictly 6 months from the date of transfer/sale of the property.",
      "Maximum Investment Cap: Maximum limit of ₹50 Lakhs per taxpayer across all 54EC bonds in a single financial year.",
      "Lock-in Period: 5-year lock-in period from the date of allotment. No premature withdrawal or loan lien permitted."
    ],
    faqs: [
      { q: "Can I invest capital gains from shares or gold in 54EC bonds?", a: "No. Section 54EC exemption applies exclusively to capital gains arising from the transfer of long-term immovable property (land, house, or commercial building)." },
      { q: "Is the interest earned on 54EC bonds taxable?", a: "Yes. While the capital invested is exempt from capital gains tax, the 5.25% annual interest earned is taxable according to your income tax slab." }
    ]
  },

  "bonds/how-to-invest": {
    title: "How to Invest in Bonds in India: RBI Retail Direct, Demat & SEBI OBPPs (2026)",
    badge: "Complete Bond Investor Guide",
    intro: "Learn the complete, end-to-end roadmap for investing in Indian bonds and fixed income instruments. From opening a zero-fee RBI Retail Direct account for sovereign debt to accessing corporate bonds on SEBI-regulated Online Bond Platform Providers (OBPPs), this definitive guide covers every channel.",
    moreIntro: "Individual retail investors can now buy Central Government Securities (G-Secs), Treasury Bills (T-Bills), State Development Loans (SDLs), Sovereign Gold Bonds (SGBs), and AAA-rated corporate debentures with complete digital transparency and low minimum investment tickets.",
    keyFeaturesTitle: "Primary Channels to Buy Bonds in India",
    keyFeatures: [
      { label: "RBI Retail Direct Portal", text: "Zero account opening and zero maintenance fees. Direct primary and secondary market bidding for G-Secs, T-Bills, and SGBs." },
      { label: "SEBI Registered OBPPs", text: "Curated online platforms (e.g., Wint Wealth, GoldenPi) for high-yield corporate bonds with transparent credit reports." },
      { label: "Demat & Stock Exchanges", text: "Trade listed non-convertible debentures (NCDs) and PSU bonds directly through your NSE/BSE stock broker." },
      { label: "Public NCD IPOs", text: "Apply for fresh primary market corporate bond issues via UPI ASBA through your regular banking net banking portal." }
    ],
    recommendTitle: "Bond Investment Channels Compared",
    recommendHeaders: ["Platform / Route", "Assets Available", "Account / Platform Fee", "Minimum Ticket"],
    recommendDetails: [
      { name: "RBI Retail Direct", issuer: "Reserve Bank of India", returns: "G-Secs, T-Bills, SDL, SGB", lockIn: "₹10,000 (G-Secs) / Zero Fees" },
      { name: "SEBI Regulated OBPP", issuer: "Curated Bond Fintechs", returns: "AAA/AA+ Corporate Bonds", lockIn: "₹10,000 to ₹1 Lakh / Transparent" },
      { name: "Stock Exchange (NSE/BSE)", issuer: "Brokerage Accounts", returns: "Secondary Market Listed NCDs", lockIn: "₹1,000 to ₹10,000 / Standard Brokerage" },
      { name: "Primary Public NCD Issue", issuer: "Bank UPI ASBA Gateway", returns: "Corporate & NBFC Debentures", lockIn: "₹10,000 / Zero Processing Fee" }
    ],
    checklistTitle: "Actionable Steps to Start Bond Investing",
    checklist: [
      "KYC Documentation: Ensure your PAN, Aadhaar, and active bank account are KYC-verified with mobile OTP integration.",
      "Account Selection: Open an RBI Retail Direct account for zero-risk sovereign debt, or use your existing Demat account for corporate NCDs.",
      "Credit Rating Check: Strictly prioritize AAA and AA+ rated corporate instruments to protect principal capital from default risks."
    ],
    faqs: [
      { q: "Is a Demat account mandatory for RBI Retail Direct?", a: "No. RBI maintains your sovereign securities directly in a specialized Retail Direct Gilt (RDG) account with the central bank at zero annual maintenance cost." },
      { q: "How are bond returns taxed in India?", a: "Coupon interest is added to your total income and taxed at your regular slab rates. Capital gains from listed bonds sold on stock exchanges after 12 months are taxed at 12.5% LTCG without indexation." }
    ]
  },

  "fd/fd-vs-mf": {
    title: "Fixed Deposit vs Mutual Funds: Guaranteed Returns vs Market Growth (2026)",
    badge: "Investment Comparison",
    intro: "Choosing between Bank Fixed Deposits (FDs) and Mutual Funds is a fundamental financial planning decision. Fixed deposits offer guaranteed capital safety and fixed interest yields, while mutual funds offer market-linked wealth compounding designed to beat long-term inflation.",
    moreIntro: "Compare risk parameters, historical returns, tax implications, and liquidity rules side-by-side to construct an optimized asset allocation portfolio that balances immediate peace of mind with long-term wealth compounding.",
    keyFeaturesTitle: "Head-to-Head Comparison: FD vs Mutual Funds",
    keyFeatures: [
      { label: "Guaranteed Safety vs Market Risk", text: "FDs are insured up to ₹5 Lakhs by DICGC with zero principal volatility; mutual funds fluctuate with underlying market valuations." },
      { label: "Yield & Inflation Protection", text: "Bank FDs yield 7.00% to 7.50% p.a., often trailing real inflation; equity mutual funds historically deliver 12% to 15% long-term CAGR." },
      { label: "Tax Treatment Efficiency", text: "FD interest is taxed every financial year at your full slab rate. Mutual fund capital gains are only taxed upon redemption at favorable LTCG rates." },
      { label: "Liquidity & Premature Exit", text: "FD premature withdrawals incur a 0.5% to 1.0% interest penalty; open-ended mutual funds can be redeemed anytime at prevailing NAV." }
    ],
    recommendTitle: "Parameter Comparison Matrix",
    recommendHeaders: ["Parameter", "Bank Fixed Deposit", "Debt Mutual Funds", "Equity Mutual Funds"],
    recommendDetails: [
      { name: "Expected Returns", issuer: "Fixed & Guaranteed", returns: "7.00% - 7.50% p.a.", lockIn: "12.00% - 15.00% CAGR" },
      { name: "Risk Level", issuer: "Zero (DICGC Insured)", returns: "Low to Moderate", lockIn: "Moderate to High" },
      { name: "Tax on Returns", issuer: "Taxed Yearly at Slab Rate", returns: "Taxed at Slab Rate on Exit", lockIn: "12.5% LTCG (>₹1.25L Gains)" },
      { name: "Ideal Time Horizon", issuer: "1 to 3 Years", returns: "1 to 3 Years", lockIn: "5 to 10+ Years" }
    ],
    checklistTitle: "How to Allocate Your Capital",
    checklist: [
      "Emergency Fund: Park 6 months of living expenses strictly in Bank Fixed Deposits or Liquid Funds for instant capital protection.",
      "Short-Term Goals (< 3 Years): Prioritize fixed deposits to avoid market volatility when you need capital soon.",
      "Long-Term Goals (> 5 Years): Allocate through monthly SIPs into diversified Equity Mutual Funds to compound inflation-beating wealth."
    ],
    faqs: [
      { q: "Can mutual funds lose money?", a: "In the short term, equity mutual fund values fluctuate and can experience temporary paper losses. Over long horizons of 5 to 7+ years, diversified funds have historically delivered positive inflation-beating gains." },
      { q: "Which is better for senior citizens, FD or Mutual Funds?", a: "Senior citizens typically prioritize Fixed Deposits and Senior Citizen Savings Schemes for guaranteed regular income, while keeping a small portion in conservative hybrid or balanced advantage funds to beat inflation." }
    ]
  },

  "fd/fd-vs-rd": {
    title: "Fixed Deposit (FD) vs Recurring Deposit (RD): Lump Sum vs Monthly Savings",
    badge: "Term Deposit Comparison",
    intro: "Understand the core operational and financial differences between Fixed Deposits (FDs) and Recurring Deposits (RDs). Both instruments offer guaranteed, risk-free returns backed by DICGC statutory insurance, but cater to distinct cash flow situations.",
    moreIntro: "A Fixed Deposit requires an upfront lump-sum deposit earning compounded interest over the entire tenure, whereas a Recurring Deposit enables salaried individuals to build wealth incrementally through disciplined monthly installments.",
    keyFeaturesTitle: "FD vs RD Core Differences",
    keyFeatures: [
      { label: "Investment Mode", text: "FD requires a single lump sum deposit; RD requires fixed monthly contributions deducted automatically." },
      { label: "Interest Compounding", text: "In an FD, the entire sum earns quarterly compounding interest from day one. In an RD, each monthly installment earns interest for its remaining tenure." },
      { label: "Ideal User Profile", text: "FD is ideal for retirees or individuals with windfall cash; RD is ideal for salaried earners building emergency savings." },
      { label: "Identical Bank Interest Rates", text: "Both FDs and RDs offered by the same commercial bank generally carry identical interest rate slabs for matching tenures." }
    ],
    recommendTitle: "Feature Comparison Table",
    recommendHeaders: ["Feature", "Fixed Deposit (FD)", "Recurring Deposit (RD)"],
    recommendDetails: [
      { name: "Deposit Frequency", issuer: "One-Time Lump Sum", returns: "Monthly Fixed Installment", lockIn: "Both DICGC Insured" },
      { name: "Minimum Investment", issuer: "₹1,000 to ₹10,000", returns: "₹500 to ₹1,000 / month", lockIn: "No Maximum Limit" },
      { name: "Tenure Range", issuer: "7 Days to 10 Years", returns: "6 Months to 10 Years", lockIn: "Premature Exit Penalties Apply" },
      { name: "Loan Against Deposit", issuer: "Up to 90% - 95% of Value", returns: "Up to 90% of Accumulated Balance", lockIn: "At +1% to +2% over FD Rate" }
    ],
    checklistTitle: "Decision Checklist: Should You Choose FD or RD?",
    checklist: [
      "Select FD if: You have idle lump sum capital from a bonus, property sale, or retirement maturity seeking locked-in high interest.",
      "Select RD if: You receive a regular monthly salary and wish to automate monthly savings without market risks.",
      "Senior Citizens: Both products qualify for senior citizen rate premiums (+0.50% p.a.) across all public and private banks."
    ],
    faqs: [
      { q: "Do FDs earn more interest than RDs for the same total amount?", a: "Yes. In an FD, the full amount compounds from day one. In an RD, your later monthly installments earn interest for only the remaining months of the tenure." },
      { q: "Is TDS applicable on Recurring Deposits?", a: "Yes. Under Section 194A, TDS is deducted on RD interest if total interest from the bank exceeds ₹40,000 per financial year (₹50,000 for senior citizens)." }
    ]
  },

  "fd/post-office-rates": {
    title: "Post Office Fixed Deposit (POTD) Interest Rates: 1 to 5 Years (2026)",
    badge: "Government Small Savings",
    intro: "Post Office Time Deposit (POTD) accounts are sovereign savings instruments operated by the Department of Posts under the Ministry of Finance, Government of India. They offer 100% government-guaranteed capital safety, predictable quarterly compounding interest, and attractive Section 80C tax benefits.",
    moreIntro: "Compare current post office term deposit rates across 1, 2, 3, and 5-year tenures. Unlike commercial banks where deposits are insured only up to ₹5 Lakhs by DICGC, Post Office Time Deposits are backed by the full sovereign faith and credit of the Government of India.",
    keyFeaturesTitle: "Key Advantages of Post Office Time Deposits",
    keyFeatures: [
      { label: "100% Sovereign Guarantee", text: "Entire principal and interest guaranteed by the Central Government with zero default risk." },
      { label: "Competitive Fixed Yields", text: "Offers up to 7.50% p.a. on 5-year deposits with quarterly compounding paid out annually." },
      { label: "Section 80C Tax Deduction", text: "The 5-year Post Office Time Deposit qualifies for tax deduction of up to ₹1.5 Lakhs under Section 80C." },
      { label: "Pan-India Accessibility", text: "Can be opened at any of India's 1.5 Lakh+ post office branches with simple physical or digital IPPB transfers." }
    ],
    recommendTitle: "Post Office Time Deposit (POTD) Rate Slabs",
    recommendHeaders: ["Deposit Tenure", "Current Interest Rate (p.a.)", "Compounding Frequency", "Section 80C Tax Benefit"],
    recommendDetails: [
      { name: "1-Year Time Deposit (POTD)", issuer: "India Post (MoF)", returns: "6.90% p.a.", lockIn: "Quarterly Compounded / No 80C" },
      { name: "2-Year Time Deposit (POTD)", issuer: "India Post (MoF)", returns: "7.00% p.a.", lockIn: "Quarterly Compounded / No 80C" },
      { name: "3-Year Time Deposit (POTD)", issuer: "India Post (MoF)", returns: "7.10% p.a.", lockIn: "Quarterly Compounded / No 80C" },
      { name: "5-Year Time Deposit (POTD)", issuer: "India Post (MoF)", returns: "7.50% p.a.", lockIn: "Quarterly Compounded / Eligible for 80C" }
    ],
    checklistTitle: "Post Office Account Rules",
    checklist: [
      "Minimum Investment: Start with as little as ₹1,000, with deposits allowed in multiples of ₹100. No upper maximum ceiling.",
      "Interest Payment: Compounded quarterly and paid out annually into your linked Post Office Savings Account.",
      "Premature Withdrawal: Permitted after 6 months. Withdrawals between 6-12 months earn simple Post Office Savings Account rate (4.0%)."
    ],
    faqs: [
      { q: "Is TDS deducted on Post Office Time Deposits?", a: "Post office branches do not deduct TDS at source; however, the interest earned is fully taxable and must be reported under 'Income from Other Sources' in your annual ITR." },
      { q: "Can I transfer my Post Office FD from one city to another?", a: "Yes. Post office deposit accounts can be transferred free of charge to any computerized post office across India." }
    ]
  },

  "fd/recurring-deposit": {
    title: "Bank Recurring Deposit (RD) Interest Rates: Top Banks Compared (2026)",
    badge: "Monthly Savings Plan",
    intro: "A Recurring Deposit (RD) is one of the most accessible and disciplined savings tools in India. Salaried individuals and small business owners can invest a fixed sum every month (starting as low as ₹500) to build a substantial guaranteed corpus with quarterly compounding bank interest.",
    moreIntro: "Compare recurring deposit interest rates across top public and private commercial banks. Enjoy high returns up to 7.75% p.a., senior citizen bonuses, and complete flexibility in choosing tenures ranging from 6 months up to 10 years.",
    keyFeaturesTitle: "Why Build Wealth with Bank Recurring Deposits?",
    keyFeatures: [
      { label: "Automated Monthly Discipline", text: "Set up auto-debit standing instructions from your salary account so savings happen before discretionary expenses." },
      { label: "Quarterly Compounded Interest", text: "Interest compounds every quarter, accelerating wealth accumulation over extended savings tenures." },
      { label: "Instant Liquidity via Loan", text: "Avail an instant loan or overdraft against your RD balance of up to 90% without breaking the deposit." },
      { label: "Zero Market Exposure", text: "Guaranteed maturity proceeds protected under RBI guidelines and DICGC insurance up to ₹5 Lakhs." }
    ],
    recommendTitle: "Current Bank RD Interest Rates (1 to 5 Years)",
    recommendHeaders: ["Bank Name", "General Public Rate", "Senior Citizen Rate", "Minimum Monthly Deposit"],
    recommendDetails: [
      { name: "State Bank of India (SBI) RD", issuer: "SBI", returns: "6.80% - 7.00% p.a.", lockIn: "7.30% - 7.50% p.a. (₹100 min)" },
      { name: "HDFC Bank Recurring Deposit", issuer: "HDFC Bank", returns: "7.00% - 7.25% p.a.", lockIn: "7.50% - 7.75% p.a. (₹1,000 min)" },
      { name: "ICICI Bank Recurring Deposit", issuer: "ICICI Bank", returns: "6.90% - 7.20% p.a.", lockIn: "7.40% - 7.70% p.a. (₹500 min)" },
      { name: "Small Finance Banks (Unity/Utkarsh)", issuer: "SFBs (RBI Regulated)", returns: "7.50% - 8.25% p.a.", lockIn: "8.00% - 8.75% p.a. (₹500 min)" }
    ],
    checklistTitle: "RD Account Setup Checklist",
    checklist: [
      "Select Optimal Tenure: Pick a tenure (12 to 36 months) that aligns with short-term financial goals like vacation, insurance premiums, or festive expenses.",
      "Keep Account Funded: Ensure sufficient balance on your monthly auto-debit date to avoid nominal bank penalty charges (typically ₹1.50 per ₹100).",
      "Nomination: Always register a nominee during online account opening to ensure seamless succession without paperwork."
    ],
    faqs: [
      { q: "What happens if I miss an RD installment?", a: "Banks allow a grace period. If an installment is missed, the bank levies a small nominal penalty (₹1 to ₹2 per ₹100 of installment) payable at maturity." },
      { q: "Can I change the monthly RD amount after opening the account?", a: "No. The monthly installment amount chosen at account inception remains fixed throughout the tenure." }
    ]
  },

  "mutual-funds/mid-cap": {
    title: "Best Mid Cap Mutual Funds: High-Alpha Indian Equities (2026)",
    badge: "High Growth Equity",
    intro: "Mid Cap Mutual Funds invest predominantly in mid-sized Indian companies ranked 101st to 250th by market capitalization under SEBI guidelines. These agile, emerging industry leaders possess faster growth trajectories than mature large-caps, delivering superior long-term wealth compounding.",
    moreIntro: "Compare top-performing direct mid-cap funds on BanksCart. With 5-year CAGR returns historically exceeding 18% to 22%, mid-cap funds are the growth engine of wealth creation for investors with a minimum 5 to 7-year investment horizon.",
    keyFeaturesTitle: "Why Mid Cap Funds Outperform Long-Term",
    keyFeatures: [
      { label: "High Growth Trajectory", text: "Mid-sized enterprises expand revenue and market share rapidly, often transforming into tomorrow's blue-chip large caps." },
      { label: "Superior Alpha Generation", text: "Active fund managers generate significant excess returns (alpha) through bottom-up stock selection in under-researched mid-cap sectors." },
      { label: "Strict SEBI Mandate", text: "Funds must invest at least 65% of their total assets in mid-cap companies, ensuring pure-play growth exposure." },
      { label: "Power of Compounding", text: "Automating monthly SIPs in mid-cap funds captures market volatility through aggressive rupee cost averaging." }
    ],
    recommendTitle: "Top Ranked Mid Cap Direct Mutual Funds",
    recommendHeaders: ["Fund Scheme", "Fund House (AMC)", "5-Year CAGR Return", "Expense Ratio (Direct)"],
    recommendDetails: [
      { name: "HDFC Mid-Cap Opportunities Direct", issuer: "HDFC Mutual Fund", returns: "24.60% p.a.", lockIn: "0.78% (₹60,000+ Cr AUM)" },
      { name: "Motilal Oswal Midcap Direct Fund", issuer: "Motilal Oswal AMC", returns: "28.90% p.a.", lockIn: "0.64% (₹15,000+ Cr AUM)" },
      { name: "Nippon India Growth Direct Fund", issuer: "Nippon India AMC", returns: "25.20% p.a.", lockIn: "0.82% (₹30,000+ Cr AUM)" },
      { name: "Kotak Emerging Equity Direct", issuer: "Kotak Mahindra AMC", returns: "23.40% p.a.", lockIn: "0.71% (₹45,000+ Cr AUM)" }
    ],
    checklistTitle: "Mid Cap Investor Checklist",
    checklist: [
      "Investment Horizon: Maintain a strict 5 to 7-year time frame to comfortably navigate interim market volatility cycles.",
      "SIP Route Preferred: Stagger investments via monthly SIPs rather than lump sums to mitigate high-valuation entry risks.",
      "Portfolio Weight: Financial planners typically recommend allocating 20% to 35% of an equity portfolio into quality mid-cap funds."
    ],
    faqs: [
      { q: "What is the difference between Large Cap and Mid Cap funds?", a: "Large-cap funds invest in the top 100 established companies offering steady stability, while mid-cap funds invest in companies ranked 101-250 offering higher growth potential with higher short-term price swings." },
      { q: "How are mid-cap mutual fund returns taxed?", a: "LTCG (held over 12 months) is taxed at 12.5% on annual capital gains exceeding ₹1.25 Lakh. STCG (held under 12 months) is taxed at 20%." }
    ]
  },

  "mutual-funds/small-cap": {
    title: "Best Small Cap Mutual Funds: Maximum Long-Term Alpha & Growth (2026)",
    badge: "High Growth Alpha",
    intro: "Small Cap Mutual Funds invest in high-potential Indian enterprises ranked 251st and beyond by market capitalization. These smaller, nimble businesses offer explosive multi-bagger upside as they innovate, scale operations, and expand market share across India's growing economy.",
    moreIntro: "Unlock maximum long-term capital compounding. While small caps experience higher short-term cyclical swings, top direct funds have historically compounded at 22% to 30% annualized over 7 to 10-year holding periods.",
    keyFeaturesTitle: "High-Alpha Small Cap Characteristics",
    keyFeatures: [
      { label: "Explosive Growth Potential", text: "Small enterprises can double or triple earnings in rapid expansion cycles, producing market-leading alpha." },
      { label: "Under-Researched Opportunities", text: "Institutional analysts rarely cover micro-caps, enabling skilled fund managers to uncover deeply undervalued market gems." },
      { label: "SEBI 65% Small Cap Mandate", text: "Mandated to maintain at least 65% equity allocation strictly in small-cap companies at all times." },
      { label: "Disciplined SIP Wealth Creation", text: "SIP installments during market corrections accumulate units cheaply, driving exponential wealth compounding on market rebounds." }
    ],
    recommendTitle: "Top Rated Small Cap Direct Mutual Funds",
    recommendHeaders: ["Small Cap Scheme", "Fund House (AMC)", "5-Year CAGR Return", "AUM (Assets)"],
    recommendDetails: [
      { name: "Nippon India Small Cap Direct", issuer: "Nippon India AMC", returns: "31.20% p.a.", lockIn: "₹55,000+ Crores" },
      { name: "Quant Small Cap Direct Fund", issuer: "Quant Mutual Fund", returns: "34.50% p.a.", lockIn: "₹22,000+ Crores" },
      { name: "SBI Small Cap Direct Plan", issuer: "SBI Mutual Fund", returns: "24.80% p.a.", lockIn: "₹28,000+ Crores" },
      { name: "Axis Small Cap Direct Fund", issuer: "Axis Mutual Fund", returns: "23.90% p.a.", lockIn: "₹20,000+ Crores" }
    ],
    checklistTitle: "Golden Rules for Small Cap Investors",
    checklist: [
      "Minimum 7+ Year Horizon: Small caps can stay subdued during bear cycles; patience over full 7+ year market cycles is essential.",
      "Limit Portfolio Exposure: Cap small-cap allocation to 10% to 20% of your overall equity portfolio to balance volatility.",
      "Automate Monthly SIPs: Volatility is an advantage for disciplined SIP investors through aggressive rupee cost averaging."
    ],
    faqs: [
      { q: "Is investing in Small Cap mutual funds risky?", a: "Yes, small-cap stocks are more volatile than large caps during market downturns. However, when held for 7 years or longer through diversified mutual funds, downside risk decreases substantially while upside alpha remains superior." },
      { q: "Can I invest a lump sum in small-cap funds?", a: "Many large small-cap funds restrict lump-sum inflows during peak market valuations to protect existing investors. Monthly SIPs remain the safest and most effective method to invest in small caps." }
    ]
  },

  "mutual-funds/investment": {
    title: "Guide to Direct Mutual Fund Investment: Zero Commission Direct Plans (2026)",
    badge: "Direct Mutual Funds Guide",
    intro: "Learn how to invest in Direct Mutual Funds online in India with 0% distributor commission fees. Investing in Direct plans rather than Regular plans bypasses middleman commissions, keeping an extra 1.0% to 1.5% compounded inside your portfolio every single year.",
    moreIntro: "Over a 20-year investment horizon, that seemingly small 1% difference compounds into 25% to 30% more overall wealth in your pocket. Compare direct fund options, KYC procedures, and seamless digital onboarding on BanksCart.",
    keyFeaturesTitle: "Direct vs Regular Mutual Funds: The Real Cost",
    keyFeatures: [
      { label: "Zero Middleman Commissions", text: "Direct plans have lower Expense Ratios (TER) because AMCs pay zero trail commissions to distributors or brokers." },
      { label: "Higher Compounded Returns", text: "Every rupee saved in management expenses remains invested, earning compounding returns year after year." },
      { label: "100% Paperless Digital KYC", text: "Complete your CKYC online in under 5 minutes using your Aadhaar-linked mobile OTP and PAN card." },
      { label: "Direct AMC Ownership", text: "Units are registered directly in your name with SEBI-regulated Registrar & Transfer Agents (CAMS and KFintech)." }
    ],
    recommendTitle: "Compounding Impact: Direct vs Regular Plan (₹10,000 Monthly SIP)",
    recommendHeaders: ["Investment Horizon", "Regular Plan Corpus (12%)", "Direct Plan Corpus (13.5%)", "Extra Wealth via Direct"],
    recommendDetails: [
      { name: "10 Years", issuer: "₹12 Lakhs Invested", returns: "₹23.23 Lakhs", lockIn: "+₹2.45 Lakhs More" },
      { name: "15 Years", issuer: "₹18 Lakhs Invested", returns: "₹50.45 Lakhs", lockIn: "+₹9.12 Lakhs More" },
      { name: "20 Years", issuer: "₹24 Lakhs Invested", returns: "₹99.91 Lakhs", lockIn: "+₹28.40 Lakhs More" },
      { name: "25 Years", issuer: "₹30 Lakhs Invested", returns: "₹1.89 Crores", lockIn: "+₹72.50 Lakhs More" }
    ],
    checklistTitle: "How to Begin Direct Investing",
    checklist: [
      "Check KYC Status: Verify that your PAN is registered on the CVL-KRA / CKYC portal.",
      "Select Scheme: Choose direct growth plans (avoid dividend payout options to maximize compounding).",
      "Set Up e-Mandate: Authorize automated monthly SIP deductions via NPCI e-NACH through net banking or UPI."
    ],
    faqs: [
      { q: "How do I identify if my fund is Direct or Regular?", a: "Check the scheme name on your statement. Direct schemes explicitly include the word 'Direct' (e.g., 'HDFC Top 100 Fund - Direct Plan - Growth'). Regular plans omit 'Direct' and carry higher expense ratios." },
      { q: "Can I switch existing Regular funds to Direct plans?", a: "Yes. You can initiate a switch request from regular to direct plans anytime. Note that switching is treated as a redemption for tax purposes, so check capital gains tax rules before switching." }
    ]
  },

  "mutual-funds/swp": {
    title: "Systematic Withdrawal Plan (SWP): Tax-Efficient Monthly Income (2026)",
    badge: "Retirement & Cash Flow Planning",
    intro: "A Systematic Withdrawal Plan (SWP) allows mutual fund investors to withdraw a pre-determined fixed amount on a specified date every month from their accumulated mutual fund portfolio. It transforms your mutual fund investments into a highly customizable, tax-efficient regular monthly pension.",
    moreIntro: "Unlike traditional fixed deposit interest or annuity pensions that are taxed at your highest personal income tax bracket, SWP redemptions are treated as capital redemptions where only the capital gain portion is taxed at low LTCG rates, maximizing your net in-hand cash flow.",
    keyFeaturesTitle: "Strategic Advantages of SWP for Regular Cash Flows",
    keyFeatures: [
      { label: "Superior Post-Tax Cash Flow", text: "Only the gain component in each monthly payout is taxable; the principal component returns completely tax-free." },
      { label: "Portfolio Stays Invested", text: "Your remaining mutual fund units continue compounding in the market, protecting capital from inflation erosion." },
      { label: "Complete Amount & Date Flexibility", text: "Increase, decrease, pause, or terminate your monthly withdrawal amount anytime with zero exit penalties." },
      { label: "Ideal for Post-Retirement Income", text: "Create an inflation-adjusted monthly salary to fund household expenses during retirement." }
    ],
    recommendTitle: "Tax Comparison: ₹50,000 Monthly Payout (FD vs SWP)",
    recommendHeaders: ["Feature / Metric", "Bank Fixed Deposit Interest", "Mutual Fund SWP (Equity/Hybrid)"],
    recommendDetails: [
      { name: "Annual Cash Flow", issuer: "₹6.00 Lakhs / Year", returns: "₹6.00 Lakhs / Year", lockIn: "Identical Monthly Cash Flow" },
      { name: "Tax Treatment", issuer: "100% Taxable at Slab Rate (30%)", returns: "Only Capital Gain Component Taxed", lockIn: "Huge Tax Savings" },
      { name: "Annual Tax Liability", issuer: "₹1,87,200 (at 30% slab)", returns: "Approx ₹20,000 - ₹35,000", lockIn: "Save ₹1.5+ Lakh in Taxes" },
      { name: "Principal Growth", issuer: "Fixed (Eroded by Inflation)", returns: "Remains Invested for Long-Term Growth", lockIn: "Preserves Capital" }
    ],
    checklistTitle: "SWP Implementation Strategy",
    checklist: [
      "Select Fund Category: Conservative Hybrid Funds, Equity Savings Funds, or Balanced Advantage Funds are ideal for SWPs due to steady volatility cushions.",
      "Conservative Withdrawal Rate: Restrict your annual withdrawal to 6% - 7% of your corpus to ensure capital longevity for 25+ years.",
      "Buffer Fund: Keep 12 months of withdrawal requirements in a Liquid Fund to avoid redeeming equity units during market downturns."
    ],
    faqs: [
      { q: "Is TDS deducted on SWP withdrawals?", a: "No TDS is deducted on mutual fund redemptions for resident Indian investors. You calculate and pay capital gains tax in your annual ITR." },
      { q: "What happens if market values drop during an SWP?", a: "If fund NAVs drop, more units are redeemed to deliver your fixed rupee amount. Keeping a 1-year liquid buffer protects against selling units at market lows." }
    ]
  },

  "mutual-funds/flexi-cap": {
    title: "Best Flexi Cap Mutual Funds: Dynamic Large, Mid & Small Cap Equity (2026)",
    badge: "All-Weather Equity Portfolio",
    intro: "Flexi Cap Mutual Funds offer complete investment freedom to fund managers to invest dynamically across Large Cap, Mid Cap, and Small Cap Indian stocks without any rigid market cap restrictions. Under SEBI guidelines, flexi-cap funds must maintain a minimum 65% total equity allocation at all times.",
    moreIntro: "Experience true all-weather portfolio diversification. Fund managers capitalize on attractive valuations by shifting capital into defensive large-caps during frothy markets and rotating into agile mid/small-caps during economic recoveries.",
    keyFeaturesTitle: "Why Flexi Cap Funds are the Ideal Core Portfolio",
    keyFeatures: [
      { label: "Unrestricted Market Cap Flexibility", text: "Managers pivot capital seamlessly across large, mid, and small companies to capture best-in-class risk-adjusted returns." },
      { label: "All-Weather Resiliency", text: "Built-in diversification protects downside risk during market crashes while participating fully in broad economic bull runs." },
      { label: "Taxed as Pure Equity", text: "Maintains 65%+ equity allocation, qualifying for 12.5% Long-Term Capital Gains tax treatment." },
      { label: "Single-Fund Convenience", text: "Perfect standalone fund for beginners and core wealth builders seeking hassle-free diversification." }
    ],
    recommendTitle: "Top Performing Flexi Cap Direct Funds",
    recommendHeaders: ["Flexi Cap Scheme", "Fund House (AMC)", "5-Year CAGR Return", "AUM (Assets)"],
    recommendDetails: [
      { name: "Parag Parikh Flexi Cap Direct", issuer: "PPFAS Mutual Fund", returns: "21.80% p.a.", lockIn: "₹70,000+ Crores" },
      { name: "HDFC Flexi Cap Direct Plan", issuer: "HDFC Mutual Fund", returns: "23.40% p.a.", lockIn: "₹58,000+ Crores" },
      { name: "JM Flexicap Direct Fund", issuer: "JM Financial AMC", returns: "26.10% p.a.", lockIn: "₹3,500+ Crores" },
      { name: "Kotak Flexicap Direct Scheme", issuer: "Kotak Mahindra AMC", returns: "18.90% p.a.", lockIn: "₹48,000+ Crores" }
    ],
    checklistTitle: "Flexi Cap Selection Criteria",
    checklist: [
      "Fund House Track Record: Check AMC performance across complete 10-year market cycles spanning both bull and bear runs.",
      "Portfolio Overlap: If holding multiple funds, verify that your flexi-cap fund does not hold identical top-10 stocks as your large-cap fund.",
      "Investment Horizon: Recommended holding horizon of 5+ years via automated monthly SIPs."
    ],
    faqs: [
      { q: "What is the difference between Multi Cap and Flexi Cap funds?", a: "Multi Cap funds are legally mandated by SEBI to invest at least 25% each in large, mid, and small-caps at all times. Flexi Cap funds have no minimum cap restrictions, giving the manager complete flexibility to adapt to market conditions." },
      { q: "Can beginners invest in Flexi Cap funds?", a: "Yes. Flexi cap funds are universally regarded as one of the best first funds for new equity investors due to their built-in diversification." }
    ]
  },

  "mutual-funds/liquid": {
    title: "Best Liquid Funds: Safe Emergency Parking with Instant Redemptions (2026)",
    badge: "Cash & Emergency Management",
    intro: "Liquid Mutual Funds invest in ultra-short-term money market instruments, treasury bills, and commercial paper with maturities of up to 91 days. They offer the lowest interest rate risk and credit risk among all mutual fund categories, making them the premier alternative to traditional bank savings accounts.",
    moreIntro: "Earn 6.75% to 7.25% annualized yields on your idle cash while retaining instant liquidity. With instant redemption features delivering up to ₹50,000 into your bank account within seconds, liquid funds are the gold standard for parking emergency funds.",
    keyFeaturesTitle: "Liquid Fund Advantages Over Savings Accounts",
    keyFeatures: [
      { label: "Higher Yields on Idle Cash", text: "Earn competitive yields (6.75% - 7.25% p.a.) compared to standard 2.70% - 3.50% bank savings account rates." },
      { label: "Instant Access (Insta-Redemption)", text: "Withdraw up to ₹50,000 or 90% of your folio value instantly 24/7/365 via IMPS directly into your savings account." },
      { label: "Ultra-Low Volatility", text: "Invests strictly in sovereign and AAA-rated debt papers maturing within 91 days, minimizing mark-to-market risks." },
      { label: "Zero Exit Load After 7 Days", text: "Graded exit load applies only during the first 6 days. Full liquidity with zero exit penalties from day 7 onwards." }
    ],
    recommendTitle: "Top Rated Liquid Direct Mutual Funds",
    recommendHeaders: ["Liquid Scheme", "Fund House (AMC)", "Current 1-Year Yield", "AUM (Assets)"],
    recommendDetails: [
      { name: "ICICI Prudential Liquid Direct", issuer: "ICICI Prudential AMC", returns: "7.15% p.a.", lockIn: "₹45,000+ Crores" },
      { name: "Aditya Birla Sun Life Liquid Direct", issuer: "ABSL Mutual Fund", returns: "7.12% p.a.", lockIn: "₹38,000+ Crores" },
      { name: "HDFC Liquid Direct Fund", issuer: "HDFC Mutual Fund", returns: "7.08% p.a.", lockIn: "₹52,000+ Crores" },
      { name: "Nippon India Liquid Direct Plan", issuer: "Nippon India AMC", returns: "7.10% p.a.", lockIn: "₹32,000+ Crores" }
    ],
    checklistTitle: "Liquid Fund Best Practices",
    checklist: [
      "Emergency Corpus: Allocate 3 to 6 months of essential household expenses into high-quality liquid funds.",
      "7-Day Holding Rule: Keep money invested for at least 7 days to completely avoid graded exit load charges.",
      "STP Launchpad: Use liquid funds as the parking vehicle to run Systematic Transfer Plans (STP) into equity mutual funds during market dips."
    ],
    faqs: [
      { q: "How fast do I get money from a Liquid Fund?", a: "Standard redemptions are credited to your bank account on the next business day (T+1). Instant redemption facilities allow you to withdraw up to ₹50,000 within seconds, 24 hours a day." },
      { q: "How are liquid fund returns taxed in India?", a: "Since April 1, 2023, gains from debt mutual funds (including liquid funds) are added to your annual income and taxed at your applicable income tax slab rate." }
    ]
  }
};
