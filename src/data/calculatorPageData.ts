export interface CalculatorFAQ {
  q: string;
  a: string;
}

export interface CalculatorPageContent {
  title: string;
  badge: string;
  intro: string;
  pLabel: string; // Principal slider label
  pMin: number;
  pMax: number;
  pDefault: number;
  pStep: number;
  rLabel: string; // Rate slider label
  rMin: number;
  rMax: number;
  rDefault: number;
  rStep: number;
  tLabel: string; // Tenure slider label
  tMin: number;
  tMax: number;
  tDefault: number;
  tStep: number;
  formulaText: string;
  faqs: CalculatorFAQ[];
}

export const CALCULATOR_PAGE_MAP: Record<string, CalculatorPageContent> = {
  "investment/fixed-deposit": {
    title: "Fixed Deposit (FD) Calculator: Assured Maturity Yields",
    badge: "Compounding Engine",
    intro: "A Fixed Deposit (FD) Calculator is an interactive mathematical tool that enables you to compute the exact maturity value and interest earnings accrued on your fixed deposits. Plan your risk-free financial investments by simulating interest compounds across public, private, and small finance bank brackets.",
    pLabel: "Lump Sum Deposit (₹)",
    pMin: 5000,
    pMax: 5000000,
    pDefault: 100000,
    pStep: 5000,
    rLabel: "Rate of Interest (% p.a.)",
    rMin: 3.5,
    rMax: 12,
    rDefault: 7.25,
    rStep: 0.05,
    tLabel: "Tenure (Years)",
    tMin: 1,
    tMax: 15,
    tDefault: 5,
    tStep: 1,
    formulaText: "A = P * (1 + r / n)^(n * t)",
    faqs: [
      { q: "How is FD compounding interest calculated?", a: "FD calculators use the compounding formula: A = P(1 + r/n)^(n*t), where A is maturity, P is principal, r is coupon rate, n is compounding frequency (quarterly by default, n=4), and t is tenure." },
      { q: "Is the calculator yield exact?", a: "Yes, it matches standard banking compounding models. Slight variances can occur based on leap years or exact calendar day fractions." },
      { q: "How does compounding frequency affect my FD yield?", a: "Higher compounding frequency increases maturity yields. Quarterly compounding yields slightly more than half-yearly or annual payouts." },
      { q: "Can I use this for Senior Citizen accounts?", a: "Yes, simply adjust the Interest Rate slider up by 0.50% to 0.75% to simulate senior citizen rate concessions." },
      { q: "Does this factor in TDS deductions?", a: "No. The calculator displays gross returns. Banks deduct 10% TDS automatically if total interest exceeds ₹40,000 yearly (unless Form 15G/15H is submitted)." },
      { q: "What is a cumulative fixed deposit?", a: "A cumulative deposit compounding interest quarterly and paying the accumulated principal plus total interest only at maturity." },
      { q: "How does inflation affect my FD returns?", a: "If your FD returns 7% gross and inflation is 5%, your real inflation-adjusted net purchasing power grows by 2% annually." },
      { q: "Can I calculate monthly interest payouts?", a: "Yes, by choosing a non-cumulative FD. Interest is paid out directly into your savings account, and principal is repaid at maturity." },
      { q: "What happens to the rate if I break my FD early?", a: "Banks generally deduct a minor penalty of 0.50% to 1.00% from the applicable interest rate for premature withdrawals." },
      { q: "What is the deposit insurance limit?", a: "All bank deposits (FDs, savings, RDs) are 100% insured up to ₹5 Lakhs per bank per depositor by the government-backed DICGC." }
    ]
  },
  "investment/sip": {
    title: "Systematic Investment Plan (SIP) Calculator",
    badge: "Wealth Compounding",
    intro: "An SIP Calculator is a sophisticated online wealth projection tool designed to estimate the future valuation of your regular monthly mutual fund investments. Plan your financial goals, evaluate historical compounding indices, and automate SIPs digitally.",
    pLabel: "Monthly SIP Investment (₹)",
    pMin: 500,
    pMax: 100000,
    pDefault: 5000,
    pStep: 500,
    rLabel: "Expected Annual Return (% p.a.)",
    rMin: 5,
    rMax: 30,
    rDefault: 12,
    rStep: 0.5,
    tLabel: "Tenure (Years)",
    tMin: 1,
    tMax: 30,
    tDefault: 10,
    tStep: 1,
    formulaText: "M = P * [((1 + i)^n - 1) / i] * (1 + i)",
    faqs: [
      { q: "What is the mathematical SIP formula?", a: "SIP calculators use the future value of an annuity formula: M = P * [((1 + i)^n - 1) / i] * (1 + i), where P is the periodic investment, i is monthly interest (r / 12 / 100), and n is the total number of months (years * 12)." },
      { q: "Are mutual fund SIP returns guaranteed?", a: "No, mutual fund investments are subject to market risks. SIP calculators display projected yields based on historical benchmarks (like 12% or 15% p.a.)." },
      { q: "What is Rupee Cost Averaging?", a: "A market compounding feature where your fixed monthly SIP buys more fund units when prices are low and fewer units when prices are high, lowering average purchase costs." },
      { q: "Should I choose Direct or Regular plans?", a: "Direct plans bypass distributor commissions, saving up to 1.5% in expense ratios yearly, compounding into significantly larger wealth pools." },
      { q: "How are equity mutual fund returns taxed?", a: "Long Term Capital Gains (LTCG) on equity holdings held over 12 months are taxed at 12.5% on profits exceeding ₹1.25 Lakh. Short-term gains are taxed at 20%." },
      { q: "What is an exit load?", a: "A redemption fee (typically 1.00%) levied by AMCs if you withdraw mutual fund units within 365 days of purchase." },
      { q: "Can I increase my SIP amount later?", a: "Yes. Many AMCs offer 'Top-Up SIPs' where your monthly contribution automatically increases by a set percentage or amount annually." },
      { q: "What is the minimum SIP amount?", a: "Most mutual fund schemes allow you to start dynamic monthly SIPs starting from as low as ₹100 or ₹500." },
      { q: "Can I stop my active SIP anytime?", a: "Yes. You can pause, modify, or completely stop your SIP online anytime without any penalties or lock-ins." },
      { q: "What happens if my bank account lacks sufficient balance on the SIP date?", a: "The AMC skips that month's purchase. No penalties are charged by the fund house, though your bank may charge auto-debit failure fees." }
    ]
  },
  "loan/personal-loan-emi": {
    title: "Personal Loan EMI Calculator: Instant Repayment Estimates",
    badge: "Credit planning",
    intro: "A Personal Loan EMI Calculator is a real-time interest computational tool that allows you to calculate the monthly equated installments (EMIs), interest component outgo, and total amortization schedule for your unsecured loans instantly.",
    pLabel: "Loan Amount (₹)",
    pMin: 10000,
    pMax: 4000000,
    pDefault: 500000,
    pStep: 10000,
    rLabel: "Rate of Interest (% p.a.)",
    rMin: 9.5,
    rMax: 24,
    rDefault: 11.5,
    rStep: 0.1,
    tLabel: "Tenure (Years)",
    tMin: 1,
    tMax: 7,
    tDefault: 5,
    tStep: 1,
    formulaText: "EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1]",
    faqs: [
      { q: "How is a personal loan EMI calculated?", a: "EMIs are calculated using the reducing balance formula: EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1], where P is the loan principal, r is the monthly interest rate (annual rate / 12 / 100), and n is tenure in months." },
      { q: "Does the EMI include processing charges?", a: "No. The calculator computes the exact principal and interest amortization. Processing fees (typically 1% to 3%) are deducted upfront from the disbursed amount." },
      { q: "What is a reducing balance method?", a: "A method where interest is computed only on the outstanding principal balance monthly rather than the initial loan amount, saving massive interest costs." },
      { q: "How does my credit score affect my personal loan interest rate?", a: "Borrowers with a CIBIL score above 750 secure prime interest rates (under 11% p.a.). Lower credit scores trigger higher interest rates (up to 24% p.a.) or approval rejections." },
      { q: "What is FOIR?", a: "Fixed Income to Debt Ratio. Banks prefer that your total active monthly loan EMIs do not exceed 45% to 50% of your net monthly salary." },
      { q: "Can I pre-close a personal loan early?", a: "Yes, most banks allow foreclosure after clearing 1 to 12 EMIs, subject to minor foreclosure charges ranging from 2% to 5% of the outstanding principal." },
      { q: "What is a part-prepayment?", a: "Paying a lump sum towards your outstanding principal to reduce either your future monthly EMI amount or the remaining tenure." },
      { q: "Is a personal loan interest rate fixed or floating?", a: "Unsecured personal loans are almost exclusively issued at fixed interest rates, keeping your monthly EMIs completely constant." },
      { q: "What happens if I delay an EMI payment?", a: "Delaying EMIs triggers late fees (typically 2% of the EMI), severely drops your CIBIL score, and logs negative payment histories on credit reports." },
      { q: "Can a self-employed professional apply?", a: "Yes, by submitting past 2 years' IT Returns showing stable business profits alongside bank statements." }
    ]
  }
};
