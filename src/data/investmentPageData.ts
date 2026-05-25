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
  "bonds/overview": {
    title: "Apply for High-Yield Bonds Online: Fixed Returns",
    badge: "Fixed Income Assets",
    intro: "Bonds are debt instruments issued by corporations, municipal organizations, or government entities to raise capital. When you buy a bond, you are lending capital to the issuer in exchange for regular fixed interest payouts (coupon payments) and the return of the face value upon bond maturity. Bonds represent a lower-risk investment category designed to secure stable, predictable cash flows.",
    moreIntro: "At BanksCart, we compare highly rated corporate bonds, sovereign gold bonds, and tax-free public issues. Check eligibility, evaluate coupon rates up to 11% p.a., and invest digitally to safeguard your wealth.",
    keyFeaturesTitle: "Key Advantages of Investing in Bonds",
    keyFeatures: [
      { label: "Guaranteed Payouts", text: "Receive predictable, pre-determined interest payments semi-annually or annually." },
      { label: "Capital Protection", text: "Sovereign and AAA-rated bonds guarantee the return of principal at maturity." },
      { label: "Portfolio Stability", text: "Buffer your investment portfolio against stock market volatility and inflation." }
    ],
    recommendTitle: "Compare Top Rated Bonds in India 2026",
    recommendHeaders: ["Recommended Bond", "Issuing Entity", "Coupon Yield (p.a.)", "Lock-in Period"],
    recommendDetails: [
      { name: "Sovereign Gold Bonds (SGB)", bank: "Reserve Bank of India (RBI)", returns: "2.50% + Gold Growth", lockIn: "8 Years (Exit at 5th)" },
      { name: "NHAI Tax-Free Bonds", bank: "National Highways Authority", returns: "5.50% (Tax-Free)", lockIn: "10 to 15 Years" },
      { name: "L&T Finance Corp NCD", bank: "L&T Finance Group", returns: "8.90% to 9.25%", lockIn: "36 to 60 Months" },
      { name: "NABARD Capital Gain Bonds", bank: "NABARD", returns: "5.25% (Sec 54EC)", lockIn: "5 Years" }
    ],
    checklistTitle: "Important Checklist before Investing in Bonds",
    checklist: [
      "Check credit ratings: Prioritize AAA or AA+ rated bonds to minimize default risks.",
      "Understand tax treatments: High-tax bracket investors should seek tax-free municipal issues.",
      "Evaluate liquidity: Confirm whether the bond is traded on secondary stock exchanges for early exits."
    ],
    faqs: [
      { q: "What is a bond coupon rate?", a: "The coupon rate is the annual interest rate paid by the bond issuer to the investor, calculated on the face value of the bond." },
      { q: "Are bonds completely safe?", a: "Sovereign bonds backed by the Government of India are 100% risk-free. Corporate bonds carry minor credit risks, which are indicated by rating agencies (like CRISIL, ICRA)." },
      { q: "What are tax-free bonds?", a: "Bonds issued by government undertakings (like NHAI, REC) where the interest earned is completely exempt from income tax under Sec 10(15)." },
      { q: "Can I sell my bonds before maturity?", a: "Yes. Dematerialized bonds listed on NSE or BSE can be sold in the secondary market, subject to trading volume and market prices." },
      { q: "What is yield to maturity (YTM)?", a: "YTM is the total return anticipated on a bond if it is held until it reaches its maturity date, factoring in coupon payments and price changes." },
      { q: "What is a face value vs market price?", a: "Face value is the price at which the bond is issued and redeemed. Market price is the trading price on exchanges, which fluctuates based on interest rate shifts." },
      { q: "What are Sovereign Gold Bonds?", a: "Sovereign Gold Bonds are government securities denominated in grams of gold. They offer a fixed interest of 2.5% p.a. plus absolute gold price appreciation." },
      { q: "What happens if a bond defaults?", a: "In rare default events, corporate assets are liquidated. Secured bondholders have higher claims on assets than unsecured lenders and equity investors." },
      { q: "What is the minimum investment in bonds?", a: "Most public bond issues start with a minimum investment of ₹10,000. SGBs start with a minimum purchase of 1 gram of gold." },
      { q: "How are bond interest payouts taxed?", a: "Interest from taxable bonds is added to your total income and taxed according to your tax slab rates." }
    ]
  },
  "fd/rates": {
    title: "Latest Bank Fixed Deposit (FD) Interest Rates 2026",
    badge: "Guaranteed Savings",
    intro: "A Fixed Deposit (FD) is a secure financial savings instrument offered by banks and non-banking financial companies (NBFCs) where you deposit a lump sum amount for a fixed tenure at a locked-in rate of interest. FDs guarantee absolute capital safety and regular interest earnings, making them the default choice for conservative wealth creators.",
    moreIntro: "Compare fixed deposit interest rates across India's top public, private, and small finance banks at BanksCart. Senior citizens qualify for up to 0.75% additional interest rates, pushing total returns past 8.50% p.a.",
    keyFeaturesTitle: "Perks of Investing in Bank FDs",
    keyFeatures: [
      { label: "Assured Returns", text: "FD interest rates are locked at the time of booking and remain unaffected by market downturns." },
      { label: "Deposit Insurance", text: "All bank deposits up to ₹5 Lakhs are 100% insured by the government via DICGC." },
      { label: "Liquidity Access", text: "Avail instant loans or overdraft lines up to 90% of your pledged FD value instantly." }
    ],
    recommendTitle: "Highest Fixed Deposit Interest Rates 2026",
    recommendHeaders: ["Bank / Issuer", "General Rate (p.a.)", "Senior Citizen Rate (p.a.)", "Best Tenure Option"],
    recommendDetails: [
      { name: "HDFC Bank", bank: "HDFC Bank", returns: "7.25% to 7.40%", lockIn: "7.75% to 7.90%" },
      { name: "SBI Card Prime", bank: "State Bank of India", returns: "7.00% to 7.10%", lockIn: "7.50% to 7.60%" },
      { name: "Unity Small Finance Bank", bank: "Unity SFB", returns: "8.50% to 9.00%", lockIn: "9.00% to 9.50%" },
      { name: "Bajaj Finance FD", bank: "Bajaj Finserv", returns: "8.05% to 8.20%", lockIn: "8.35% to 8.50%" }
    ],
    checklistTitle: "FD Booking Checklist",
    checklist: [
      "Compare Small Finance Banks: SFBs offer 1-2% higher rates than traditional commercial banks under identical government safety nets.",
      "Submit Form 15G/15H: Provide forms to the bank to prevent automatic 10% TDS deductions on interest exceeding ₹40,000.",
      "Choose Cumulative payout: Cumulative FDs compound interest quarterly to maximize maturity yields."
    ],
    faqs: [
      { q: "What is the maximum limit insured under DICGC?", a: "The Deposit Insurance and Credit Guarantee Corporation (DICGC) guarantees deposits (principal + interest) up to ₹5 Lakhs per bank account." },
      { q: "What is a Tax-Saving Fixed Deposit?", a: "A 5-year locked fixed deposit that qualifies for income tax deductions up to ₹1.5 Lakhs under Section 80C." },
      { q: "Can I break my FD before maturity?", a: "Yes. Most banks permit premature withdrawals, but charge a minor penalty of 0.50% to 1.00% on the applicable interest rate." },
      { q: "What is Form 15G/15H?", a: "Self-declaration forms submitted to banks by individuals (15G) or senior citizens (15H) to prevent TDS when their annual taxable income is below exemption limits." },
      { q: "How is FD interest taxed?", a: "FD interest is taxable under 'Income from Other Sources' and is subject to TDS if the total interest exceeds ₹40,000 (₹50,000 for senior citizens) in a financial year." },
      { q: "What is a cumulative vs non-cumulative FD?", a: "Cumulative FDs reinvest interest quarterly to pay a lump sum at maturity. Non-cumulative FDs pay interest out monthly, quarterly, or half-yearly." },
      { q: "Can I get a credit card against a fixed deposit?", a: "Yes. Secured credit cards are instantly approved against FDs starting from ₹10,000 with a credit limit up to 90% of the FD value." },
      { q: "What is the difference between FD and RD?", a: "Fixed Deposits require a single lump sum deposit, whereas Recurring Deposits (RD) require fixed monthly contributions over the selected tenure." },
      { q: "Do corporate FDs offer higher returns?", a: "Yes, NBFC corporate FDs offer 1-2% higher interest rates than commercial banks but carry slightly higher credit risks." },
      { q: "How does inflation affect my FD returns?", a: "If your FD returns 7% p.a. and inflation is 5%, your real inflation-adjusted return is 2% p.a. before taxes." }
    ]
  },
  "mutual-funds/overview": {
    title: "Invest in Direct Mutual Funds Online: Zero Commission",
    badge: "Market Assets",
    intro: "A Mutual Fund is a professionally managed investment trust that pools capital from thousands of retail investors to purchase a diversified portfolio of stocks, corporate bonds, government securities, or gold. Mutual funds enable retail investors to access expert fund management, spread investment risks, and compound wealth over long-term holding horizons.",
    moreIntro: "Compare direct mutual funds at BanksCart. Set up instant SIPs starting from just ₹100, bypass intermediary fees completely, and choose from high-performing equity, debt, and balanced portfolios.",
    keyFeaturesTitle: "Core Strengths of Mutual Funds",
    keyFeatures: [
      { label: "Expert Management", text: "Portfolios are actively tracked and rebalanced daily by professional Fund Managers." },
      { label: "Diversification", text: "Spread minor capital across dozens of market leaders, cushioning against single-company failures." },
      { label: "SIP Automation", text: "Configure automated monthly standing instructions to buy fund units continuously." }
    ],
    recommendTitle: "High-Performing Equity Mutual Funds 2026",
    recommendHeaders: ["Recommended Fund Name", "Fund Category", "3-Year Annual Return", "Expense Ratio"],
    recommendDetails: [
      { name: "Quant Active Direct Plan", bank: "Multi Cap Equity", returns: "24.50% p.a.", lockIn: "0.75%" },
      { name: "Parag Parikh Flexi Cap", bank: "Flexi Cap Equity", returns: "21.20% p.a.", lockIn: "0.60%" },
      { name: "SBI Contra Direct Fund", bank: "Contra Equity", returns: "22.80% p.a.", lockIn: "0.68%" },
      { name: "Mirae Asset Large Cap", bank: "Large Cap Equity", returns: "16.50% p.a.", lockIn: "0.55%" }
    ],
    checklistTitle: "Mutual Funds Checklist",
    checklist: [
      "Prefer Direct Plans over Regular: Direct plans bypass distributor commission payouts, boosting your returns by 1% to 1.5% annually.",
      "Check the Expense Ratio: Lower expense ratios indicate higher efficiency and leave more money compounding in your account.",
      "Match Horizon with Fund type: Short-term needs (under 2 years) belong in debt funds. Long-term goals (5+ years) belong in equity schemes."
    ],
    faqs: [
      { q: "What is an SIP?", a: "A Systematic Investment Plan (SIP) allows you to invest a fixed amount of money in a mutual fund regularly (monthly, weekly) rather than a lump sum." },
      { q: "What is Net Asset Value (NAV)?", a: "NAV represents the market value per unit of a mutual fund scheme, calculated by dividing the total net assets by the number of active units." },
      { q: "What is the difference between Direct and Regular plans?", a: "Direct plans are bought directly from the AMC with zero commissions, while Regular plans include a yearly commission paid to agents/brokers." },
      { q: "Are mutual funds safe?", a: "Mutual funds are subject to market risks. However, they are strictly regulated by SEBI to prevent fraud, and risks are mitigated through diversification." },
      { q: "What is an ELSS Mutual Fund?", a: "Equity Linked Savings Scheme (ELSS) is a tax-saving mutual fund with a 3-year lock-in period, qualifying for deductions under Section 80C." },
      { q: "How are mutual fund gains taxed?", a: "Equity fund gains held for over 1 year are Long Term Capital Gains (LTCG), taxed at 12.5% on profits exceeding ₹1.25 Lakh. Gains under 1 year are Short Term Capital Gains (STCG), taxed at 20%." },
      { q: "What is an exit load?", a: "A fee charged by AMCs if you redeem your mutual fund units within a specific timeframe (typically 1% if redeemed within 1 year)." },
      { q: "What are Large, Mid, and Small Cap funds?", a: "Large Cap funds invest in top 100 companies (stable, lower risk). Mid Cap funds invest in companies ranked 101-250. Small Cap funds invest in companies ranked 251+ (high growth potential, high volatility)." },
      { q: "Can I stop my SIP anytime?", a: "Yes, you can pause, stop, or modify your SIP amount anytime online without any bank penalties." },
      { q: "What is SWP?", a: "A Systematic Withdrawal Plan (SWP) allows you to withdraw a fixed sum of money from your mutual fund portfolio regularly, creating a monthly source of pension-like income." }
    ]
  }
};
