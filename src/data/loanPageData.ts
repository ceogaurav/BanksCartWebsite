export interface LoanFAQ {
  q: string;
  a: string;
}

export interface LoanRepaymentRow {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
}

export interface LoanPageContent {
  title: string;
  badge: string;
  intro: string;
  moreIntro?: string;
  keyFeaturesTitle: string;
  keyFeatures: { label: string; text: string }[];
  repaymentDetailsTitle: string;
  repaymentHeaders: string[];
  repaymentDetails: LoanRepaymentRow[];
  boostTipsTitle: string;
  boostTips: string[];
  faqs: LoanFAQ[];
}

export const LOAN_PAGE_MAP: Record<string, LoanPageContent> = {
  "overview": {
    title: "Personal Loan Online: Compare & Apply Instantly",
    badge: "Flexible Retail Credit",
    intro: "A Personal Loan is a highly versatile, unsecured credit facility designed to help you meet various immediate financial needs. Whether you are planning a dream wedding, funding higher education, managing emergency medical bills, or consolidating high-interest credit card debt, a personal loan provides funds without requiring gold, property, or vehicle collateral.",
    moreIntro: "At BanksCart, we bring you pre-approved personal loan offers from India's leading banks and Non-Banking Financial Companies (NBFCs). By analyzing your credit score and monthly salary, we match you with lenders offering the lowest interest rates, zero foreclosure charges, and paperless processing cycles.",
    keyFeaturesTitle: "Key Benefits of Applying for a Personal Loan",
    keyFeatures: [
      { label: "Unsecured Nature", text: "No collateral, assets, or co-signers required for eligible salaried borrowers." },
      { label: "Flexible Tenures", text: "Repay comfortably over flexible terms ranging from 12 to 72 months." },
      { label: "Disbursement Speed", text: "Get funds credited directly into your bank account within minutes of digital verification." }
    ],
    repaymentDetailsTitle: "Compare Top Personal Loan Providers in India",
    repaymentHeaders: ["Lender Bank", "Interest Rates (p.a.)", "Processing Fees", "Maximum Tenure"],
    repaymentDetails: [
      { col1: "State Bank of India (SBI)", col2: "11.15% - 15.00%", col3: "Up to 1.00%", col4: "Up to 72 Months" },
      { col1: "HDFC Bank", col2: "10.50% - 21.00%", col3: "Up to 1.50%", col4: "Up to 60 Months" },
      { col1: "ICICI Bank", col2: "10.75% - 19.00%", col3: "Up to 2.00%", col4: "Up to 60 Months" },
      { col1: "Axis Bank", col2: "10.49% - 22.00%", col3: "Flat ₹999 to 2%", col4: "Up to 60 Months" }
    ],
    boostTipsTitle: "Important Checklist before Submitting a Personal Loan Request",
    boostTips: [
      "Check your credit score: Ensure your CIBIL rating is above 720 to qualify for lowest rate slabs.",
      "Calculate your Debt-to-Income (DTI) ratio: Keep monthly EMIs below 45% of your take-home pay.",
      "Gather employment proofs: Keep past 3 months' salary slips and 6 months' bank statements ready."
    ],
    faqs: [
      { q: "What is the minimum CIBIL score required for a personal loan?", a: "Most Tier-1 banks prefer a CIBIL score of 720 or above. However, some NBFCs approve loans for scores between 600 and 700 at higher interest rates." },
      { q: "Can I close my personal loan early?", a: "Yes, most banks allow foreclosure or part-prepayments after a lock-in period of 6 to 12 months. Prepayment charges typically range from 2% to 5% of the outstanding principal." },
      { q: "How long does it take for loan disbursement?", a: "Pre-approved digital personal loans are disbursed instantly (within minutes). Standard physical applications take between 2 to 5 business days." },
      { q: "Are co-applicants required for unsecured loans?", a: "No. Co-applicants are optional but recommended if your credit score is average or your salary is low, as it helps divide risk metrics." },
      { q: "Do banks verify my employment history?", a: "Yes, banks require salary slips and company listings to confirm service stability and predict default probabilities." },
      { q: "Can self-employed professionals get personal loans?", a: "Yes. Lenders verify self-employed profiles using past 2-3 years' IT Returns, business registration proofs, and audited balance sheets." },
      { q: "What is a processing fee?", a: "A processing fee is a one-time administrative charge deducted by banks from your approved loan amount before final disbursement." },
      { q: "Can I get a personal loan if I have a low salary?", a: "Yes, though the maximum loan amount will be lower. Most banks require a minimum net monthly salary of ₹15,000 to ₹25,000." },
      { q: "Will a personal loan help my CIBIL score?", a: "Yes. Paying your EMIs consistently on time builds a positive payment history, directly boosting your CIBIL rating over the long run." },
      { q: "Is there any end-use restriction on personal loan funds?", a: "No. Unlike home or auto loans, you can use personal loan funds for any legitimate purpose, including weddings, medical expenses, travel, or home repair." }
    ]
  },
  "pre-approved": {
    title: "Pre-Approved Personal Loan: Instant 10-Second Approvals",
    badge: "Invited Borrowers",
    intro: "Pre-Approved Personal Loans are highly customized, fast-track credit offers extended by banks to select customers based on their historical account behaviors, consistent savings tracks, and excellent CIBIL ratings. If you receive an invite, you can bypass traditional bank applications entirely.",
    moreIntro: "Since the bank has already validated your financial health, these loans require zero documentation, zero branch visits, and are processed instantly. Disbursements occur online in under 10 seconds via mobile banking applications or NetBanking portals.",
    keyFeaturesTitle: "Perks of Pre-Approved Credit Lines",
    keyFeatures: [
      { label: "Instant Payout", text: "Funds are credited directly to your savings account in under 10 seconds." },
      { label: "Paperless Verification", text: "Zero physical salary slips, income proofs, or address validations required." },
      { label: "Bargain Leverage", text: "Invite-only loans come pre-packaged with lowest base interest rates and waived processing fees." }
    ],
    repaymentDetailsTitle: "Top Lenders for Invite-Only Credit",
    repaymentHeaders: ["Lender Bank", "Interest Range (p.a.)", "Processing Turnaround", "Paperwork Required"],
    repaymentDetails: [
      { col1: "HDFC Bank", col2: "10.50% - 14.50%", col3: "Instant (10 Seconds)", col4: "Zero Documents" },
      { col1: "ICICI Bank", col2: "10.75% - 15.00%", col3: "Instant (10 Seconds)", col4: "Zero Documents" },
      { col1: "State Bank of India (SBI)", col2: "11.15% - 13.50%", col3: "Under 5 Minutes", col4: "Zero Documents" },
      { col1: "Kotak Mahindra Bank", col2: "10.99% - 16.00%", col3: "Instant (10 Seconds)", col4: "Zero Documents" }
    ],
    boostTipsTitle: "How to Qualify for Pre-Approved Offers",
    boostTips: [
      "Maintain a pre-existing relationship: Keep a high average balance in your savings bank account.",
      "Keep CIBIL score pristine: A rating above 760 with zero delays is the primary trigger for pre-approvals.",
      "Channel your payroll: Route your monthly salary transactions through a single main bank account."
    ],
    faqs: [
      { q: "Is a pre-approved personal loan guaranteed to get disbursed?", a: "Usually yes, but final approval is subject to confirmation that your credit profile has not dropped since the initial invite." },
      { q: "Does checking a pre-approved loan impact my CIBIL score?", a: "No. Checking pre-approved offers generates only soft inquiries, which have no impact on your credit rating." },
      { q: "Are interest rates on pre-approved loans lower?", a: "Yes. Since banks actively invite you based on low default risks, they offer competitive base rates." },
      { q: "How long is a pre-approved offer valid?", a: "Most invites are valid for 30 to 90 days, after which they expire or are recalculated based on your latest credit profile." },
      { q: "Can I request a higher loan amount than the pre-approved limit?", a: "Yes, but you will have to undergo standard underwriting, including manual document submissions and credit checks." },
      { q: "Are pre-approved loans available for non-customers?", a: "Occasionally. Lenders extend offers to non-customers based on bureau databases showing excellent credit histories." },
      { q: "What is the maximum limit for pre-approved loans?", a: "Limits vary based on your income profile, ranging from ₹50,000 up to ₹15 Lakhs." },
      { q: "Can I choose my own tenure?", a: "Yes. You can select any term within the bank's allowable range, typically 12 to 60 months." },
      { q: "Are there any foreclosure charges?", a: "Yes, standard foreclosure fees of 2% to 4% apply, unless the bank waives them as a special invite benefit." },
      { q: "How is the money disbursed?", a: "The loan amount is credited electronically to your savings account instantly after digital OTP verification." }
    ]
  },
  "interest-rates": {
    title: "Personal Loan Interest Rates: Compare Current Rates 2026",
    badge: "Rate Tracker",
    intro: "Understanding **Personal Loan Interest Rates** is the single most important step in borrowing. Since personal loans are unsecured, interest rates can vary wildly between 10.49% p.a. and 36.00% p.a. based on your risk profile. Even a 1% rate difference can save you thousands of rupees in EMIs over the tenure.",
    moreIntro: "Interest rates can be structured as 'Fixed Rates' (staying constant throughout the tenure) or 'Floating Rates' (shifting based on RBI repo adjustments). Lenders determine your rate markup based on four pillars: CIBIL Score, Monthly Salary, Employer Classification, and pre-existing bank relationships.",
    keyFeaturesTitle: "Factors Determining Your Final Interest Rate Markup",
    keyFeatures: [
      { label: "CIBIL Score Slabs", text: "Scores above 750 secure the lowest baseline interest rates." },
      { label: "Income Slabs", text: "Higher salaries indicate high repayment capacities, lowering risk margins." },
      { label: "Employer Tier List", text: "Working for Tier-1 corporate giants yields special interest discounts." }
    ],
    repaymentDetailsTitle: "Compare Latest Interest Rates & Charges Across Banks",
    repaymentHeaders: ["Lender Bank", "Interest Rates (Floating)", "Processing Fee Slab", "Foreclosure Terms"],
    repaymentDetails: [
      { col1: "Axis Bank", col2: "10.49% - 22.00%", col3: "Up to 2.00%", col4: "Allowed after 12 EMIs" },
      { col1: "HDFC Bank", col2: "10.50% - 21.00%", col3: "Up to 1.50%", col4: "Nil after 36 EMIs" },
      { col1: "ICICI Bank", col2: "10.75% - 19.00%", col3: "Up to 2.00%", col4: "2% to 4% charge" },
      { col1: "State Bank of India (SBI)", col2: "11.15% - 15.00%", col3: "1.00% minimum", col4: "Nil charges" }
    ],
    boostTipsTitle: "Tips to Secure the Lowest Personal Loan Interest Rates",
    boostTips: [
      "Maintain CIBIL above 750: Lenders link lowest interest bands directly to excellent credit tiers.",
      "Consolidate outstanding debts: Lower DTI ratios reduce borrower risk, leading to better rate offers.",
      "Apply during seasonal festivals: Banks frequently offer promotional processing fee waivers and rate discounts."
    ],
    faqs: [
      { q: "What is the difference between Flat Rate and Reducing Rate?", a: "Flat rates calculate interest on the entire original principal. Reducing rates calculate interest on the outstanding balance, making reducing rate loans significantly cheaper." },
      { q: "Do personal loan rates change during the tenure?", a: "Fixed-rate loans stay constant. Floating-rate loans linked to RBI repos can fluctuate during the loan term." },
      { q: "Can I negotiate personal loan interest rates?", a: "Yes. If your credit score is above 780 and you have a stable salary, you can negotiate rate margins with the bank manager." },
      { q: "Which bank currently offers the lowest personal loan interest rate?", a: "Axis Bank and HDFC Bank currently offer competitive base rates starting from 10.49% p.a. for prime borrowers." },
      { q: "How much does a bad credit score increase interest rates?", a: "A poor credit score can increase interest rates by 4% to 10% compared to prime rates, or lead to rejection." },
      { q: "Are self-employed professionals charged higher interest rates?", a: "Yes, usually 1% to 3% higher due to income fluctuations compared to salaried individuals." },
      { q: "Does SBI offer cheaper personal loans?", a: "Yes, SBI offers highly competitive rates starting from 11.15% p.a. for government salaried employees." },
      { q: "Is a processing fee added to the interest rate?", a: "No. The processing fee is a one-time upfront deduction; interest is charged on the outstanding loan balance." },
      { q: "Will debt consolidation reduce my overall interest outgo?", a: "Yes, by consolidating multiple high-interest credit card debts into a single, lower-rate personal loan." },
      { q: "What are foreclosure charges?", a: "Charges levied by lenders (typically 2% to 4%) if you pay off the remaining loan balance in full before the tenure ends." }
    ]
  },
  "mobile-app": {
    title: "Instant Personal Loan Apps: 100% Digital Lending",
    badge: "Digital Micro-Lending",
    intro: "Instant Personal Loan Apps have transformed the retail credit space in India. Catering to urgent cash needs, these mobile applications leverage advanced AI algorithms and credit bureau integrations to offer seamless, paperless micro-loans ranging from ₹5,000 to ₹5,000,000.",
    moreIntro: "Unlike traditional banking which requires manual document verifications, digital loan apps allow you to complete KYC, link bank statements, and sign agreements entirely online. Disbursements are completed directly to your bank account within minutes.",
    keyFeaturesTitle: "Key Advantages of Digital Loan Apps",
    keyFeatures: [
      { label: "100% Digital Process", text: "No printouts, physical signatures, or branch visits required." },
      { label: "High Accessibility", text: "Micro-loans approved for average credit scores or lower monthly salary brackets." },
      { label: "Flexible Tenure Options", text: "Short-term repayment options from 3 months up to 36 months." }
    ],
    repaymentDetailsTitle: "Top Digital Loan App Platforms in India",
    repaymentHeaders: ["Lending App", "Loan Bracket", "Interest Slab (p.a.)", "Average Processing Time"],
    repaymentDetails: [
      { col1: "MoneyWide", col2: "₹10,000 - ₹5,00,000", col3: "15.00% - 32.00%", col4: "Under 10 Minutes" },
      { col1: "KreditBee", col2: "₹1,000 - ₹4,00,000", col3: "18.00% - 29.95%", col4: "Under 15 Minutes" },
      { col1: "PaySense", col2: "₹5,000 - ₹5,00,000", col3: "16.80% - 27.60%", col4: "Under 2 Hours" },
      { col1: "mPokket (Students)", col2: "₹500 - ₹30,000", col3: "24.00% - 36.00%", col4: "Instant (5 Minutes)" }
    ],
    boostTipsTitle: "Safety Checklist When Using Loan Apps",
    boostTips: [
      "Verify RBI NBFC Registration: Ensure the app is partnered with a licensed NBFC or bank.",
      "Check app permission requests: Avoid apps demanding unnecessary access to contacts, photos, or location logs.",
      "Audit total borrowing costs: Factor in upfront processing fees and convenience charges before accepting."
    ],
    faqs: [
      { q: "Are mobile loan apps legal in India?", a: "Yes, provided they are partnered with RBI-registered NBFCs or banks. Avoid unauthorized apps not listed with licensed entities." },
      { q: "Can I get a loan from an app if I have a low CIBIL score?", a: "Yes. Many digital apps utilize alternative underwriting data (like utility bills, cash flow) to approve loans for lower score brackets." },
      { q: "How fast is the loan amount credited?", a: "In most cases, funds are credited directly to your linked bank account within 10 to 30 minutes of approval." },
      { q: "What documents are required for digital app loans?", a: "You only need your Aadhaar card, PAN card, and past 3 months' bank statement PDF." },
      { q: "Are interest rates on apps higher than banks?", a: "Yes. Due to the high risk of paperless lending, apps charge higher interest rates, ranging from 15% to 36% p.a." },
      { q: "Do these apps report defaults to CIBIL?", a: "Yes. Licensed apps report all active histories, payments, and defaults to major credit bureaus monthly." },
      { q: "Can college students get app loans?", a: "Yes, specialized student loan apps like mPokket offer pocket-money loans starting from ₹500 without income proofs." },
      { q: "What is e-NACH/e-Mandate?", a: "An electronic auto-debit instruction configured via netbanking or debit cards to automate monthly EMI repayments." },
      { q: "Is there a prepayment charge on app loans?", a: "Usually yes, ranging from 2% to 4% of the outstanding balance. Some apps allow free foreclosure." },
      { q: "How do I spot fake or illegal loan apps?", a: "Illegal apps are not listed on Google Play Store, do not declare partner NBFCs, demand upfront payments, and enforce short 7-day tenures." }
    ]
  },
  "low-cibil-score": {
    title: "Personal Loan for Low CIBIL Score: Approval Guides",
    badge: "Credit Rebuilding",
    intro: "Securing a personal loan with a low CIBIL score (below 650) is challenging but not impossible. Since personal loans are unsecured, lenders assess credit scores as a primary risk filter. However, specialized NBFCs and digital micro-lending apps offer tailored low-CIBIL loans for eligible borrowers.",
    moreIntro: "If your score took a hit due to previous payment defaults or late flags, you can qualify by adding co-applicants, demonstrating low DTI ratios, or leveraging your salary account relationship with your primary bank.",
    keyFeaturesTitle: "Eligibility Boosters for Low CIBIL Applicants",
    keyFeatures: [
      { label: "Co-Applicant Leverage", text: "Applying with a close family member who has an excellent CIBIL rating guarantees approvals." },
      { label: "Debt-to-Income (DTI)", text: "Keeping your active debt obligations extremely low increases lender confidence." },
      { label: "Salary Account Advantage", text: "Your salary bank is more likely to approve loans based on consistent monthly payroll inflows." }
    ],
    repaymentDetailsTitle: "Lenders Offering Low CIBIL Approvals",
    repaymentHeaders: ["Lender Bank / NBFC", "Minimum CIBIL Needed", "Expected Interest (p.a.)", "Required Monthly Salary"],
    repaymentDetails: [
      { col1: "Cashe", col2: "580", col3: "18.00% - 33.00%", col4: "₹15,000" },
      { col1: "Tata Capital", col2: "650", col3: "14.50% - 24.00%", col4: "₹20,000" },
      { col1: "Fullerton India", col2: "620", col3: "15.00% - 26.00%", col4: "₹25,000" },
      { col1: "Peer-to-Peer Apps", col2: "550", col3: "18.00% - 36.00%", col4: "₹18,000" }
    ],
    boostTipsTitle: "Actionable Steps to Rebuild Your Credit Score",
    boostTips: [
      "Check your credit report for errors: File disputes for incorrect payment delays to boost your score instantly.",
      "Clear all active defaults: Settle outstanding debts to obtain a 'No Dues Certificate' (NOC).",
      "Get a secured credit card: Open a Fixed Deposit backed credit card to build a fresh repayment log."
    ],
    faqs: [
      { q: "Can I get a personal loan with a CIBIL score of 500?", a: "Traditional banks will reject your application. Your only options are high-interest micro-lending apps, gold loans, or applying with a co-borrower." },
      { q: "Are interest rates higher for low CIBIL loans?", a: "Yes. Due to high credit risks, interest rates range between 18% and 36% p.a." },
      { q: "How does a co-applicant help?", a: "A co-applicant with excellent credit guarantees the loan repayment, reducing lender risk margins." },
      { q: "Will a low CIBIL loan help improve my score?", a: "Yes. Paying your EMIs consistently on time builds a positive payment history, directly boosting your CIBIL rating." },
      { q: "What is an NOC certificate?", a: "A No Objection Certificate issued by lenders confirming that a loan account has been paid off in full and closed." },
      { q: "Should I apply with multiple lenders to increase approval chances?", a: "No. Every application triggers a hard inquiry, which drops your credit rating further. Apply with one matching lender at a time." },
      { q: "Can salary bank accounts approve low-score loans?", a: "Yes. Lenders show high leniency to salary account holders who route payrolls through them." },
      { q: "Are peer-to-peer (P2P) lending apps safe?", a: "Yes, provided they are licensed by the RBI. P2P platforms connect borrowers directly with individual investors." },
      { q: "What is the maximum loan amount for low CIBIL applicants?", a: "Amounts vary based on your income profile, usually capped between ₹10,000 and ₹2 Lakhs." },
      { q: "What is a 'Soft Inquiry'?", a: "A personal credit check that does not impact your credit rating, unlike hard inquiries conducted by banks." }
    ]
  },
  "balance-transfer": {
    title: "Personal Loan Balance Transfer: Reduce Your Interest",
    badge: "Debt Refinancing",
    intro: "A **Personal Loan Balance Transfer** is an effective financial strategy that allows you to transfer your outstanding loan balance from your current lender to a new bank offering a lower interest rate, better terms, and processing benefits.",
    moreIntro: "By refinancing your outstanding debt at a lower rate, you can significantly reduce your monthly EMIs, lower your total interest outgo, and consolidate debt under a single lender.",
    keyFeaturesTitle: "Benefits of Debt Balance Transfers",
    keyFeatures: [
      { label: "Lower Interest Outgo", text: "Refinancing at a lower interest rate directly saves thousands on monthly EMIs." },
      { label: "Top-Up Loan Options", text: "Secure additional loan amounts at the same low interest rate as the balance transfer." },
      { label: "Tenure Customization", text: "Increase or decrease your repayment terms based on your current cash flows." }
    ],
    repaymentDetailsTitle: "Top Banks for Personal Loan Balance Transfers",
    repaymentHeaders: ["Lender Bank", "Interest Rates (p.a.)", "Transfer Processing Fees", "Allowable Slabs"],
    repaymentDetails: [
      { col1: "HDFC Bank", col2: "10.50% - 13.99%", col3: "Flat ₹999 to 1%", col4: "Above ₹1 Lakh" },
      { col1: "ICICI Bank", col2: "10.75% - 14.50%", col3: "Up to 1.50%", col4: "Above ₹50,000" },
      { col1: "State Bank of India (SBI)", col2: "11.15% - 13.00%", col3: "Nil processing fee", col4: "Above ₹1 Lakh" },
      { col1: "Axis Bank", col2: "10.49% - 15.00%", col3: "Flat ₹999", col4: "Above ₹1 Lakh" }
    ],
    boostTipsTitle: "Checklist before Opting for a Balance Transfer",
    boostTips: [
      "Calculate total transfer costs: Factor in new processing fees and current foreclosure charges to ensure savings are positive.",
      "Check eligibility requirements: Most banks require a clean repayment track of at least 6 to 12 EMIs with your current lender.",
      "Maintain a strong CIBIL score: A credit rating above 750 is crucial to secure the lowest balance transfer rates."
    ],
    faqs: [
      { q: "What is a balance transfer?", a: "Transferring an active loan outstanding balance from your current bank to a new bank offering lower interest rates." },
      { q: "Are there foreclosure charges on my current loan?", a: "Yes, current lenders levy foreclosure charges of 2% to 4% on the outstanding principal, unless it's a floating rate loan." },
      { q: "What is a Top-Up loan?", a: "An additional loan amount offered by the new bank over your existing transferred loan principal at competitive rates." },
      { q: "How many EMIs must be cleared before transferring?", a: "Most banks require a minimum of 6 to 12 consecutive on-time EMI repayments with your current lender." },
      { q: "Is a processing fee charged on balance transfers?", a: "Yes, the new bank charges a one-time processing fee ranging from flat ₹999 up to 1% of the loan amount." },
      { q: "Will a balance transfer drop my CIBIL score?", a: "No. While the credit search triggers a hard inquiry, consolidating and paying off your old debt has a long-term positive impact." },
      { q: "How much can I save on EMIs?", a: "Savings depend on the interest rate difference and outstanding tenure. Even a 2% rate drop can save thousands annually." },
      { q: "Can I transfer multiple loans to a single bank?", a: "Yes, you can consolidate multiple active high-interest retail loans into a single balance transfer account." },
      { q: "What documents are required?", a: "You need KYC documents, past 3 months' salary slips, 6 months' bank statements, and the current loan foreclosure statement." },
      { q: "Does SBI accept balance transfers?", a: "Yes, SBI offers highly competitive balance transfer rates starting from 11.15% p.a. with minimal administrative fees." }
    ]
  },
  "loan-on-credit-card": {
    title: "Loan on Credit Card: Instant Pre-Approved Credit",
    badge: "Revolving Debt Leverage",
    intro: "A **Loan on Credit Card** is a pre-approved, instant cash loan extended by card issuers to select cardholders based on their card limits, consistent transaction patterns, and excellent repayment histories.",
    moreIntro: "Unlike standard personal loans which require fresh document validations, a loan on a credit card bypasses traditional underwriting entirely. The loan amount can be approved against your card's credit limit (blocking a portion) or as an additional over-limit offer.",
    keyFeaturesTitle: "Perks of Card-Linked Loans",
    keyFeatures: [
      { label: "Instant Payout", text: "Approved funds are credited directly to your savings bank account in under 10 seconds." },
      { label: "Zero Documentation", text: "No salary slips, address validations, or physical bank checks required." },
      { label: "Flexible Repayment", text: "Convert purchases or credit totals into easy EMIs ranging from 6 to 48 months." }
    ],
    repaymentDetailsTitle: "Top Card-Linked Loan Issuers in India",
    repaymentHeaders: ["Lender Bank", "Interest Ranges (p.a.)", "Disbursement TAT", "Collateral Required"],
    repaymentDetails: [
      { col1: "HDFC Bank (Insta Loan)", col2: "11.50% - 15.00%", col3: "Instant (10 Seconds)", col4: "Zero Collateral" },
      { col1: "ICICI Bank (Instant EMI)", col2: "12.00% - 16.00%", col3: "Instant (10 Seconds)", col4: "Zero Collateral" },
      { col1: "SBI Card (Easy Money)", col2: "12.50% - 17.50%", col3: "Instant (10 Seconds)", col4: "Zero Collateral" },
      { col1: "Axis Bank (Insta EMI)", col2: "11.99% - 15.50%", col3: "Instant (10 Seconds)", col4: "Zero Collateral" }
    ],
    boostTipsTitle: "Important Checklist for Card-Linked Borrowers",
    boostTips: [
      "Check blocked credit limits: Loans against card limits will block equivalent credit balances, reducing your available limit.",
      "Check processing fee charges: Banks levy an administrative fee ranging from flat ₹199 to ₹999.",
      "Pay dues in full: Avoid missing EMIs, as card default rates are extremely high (up to 42% p.a.)."
    ],
    faqs: [
      { q: "What is a loan on a credit card?", a: "An instant personal loan offered by your card issuer based on your card's credit limit and usage history." },
      { q: "Does it block my card's credit limit?", a: "If the loan is 'against the limit', yes. If it is an 'over-limit' or pre-approved additional offer, your standard limit remains unaffected." },
      { q: "Are interest rates on card loans higher?", a: "They are usually competitive (11% to 18% p.a.), which is lower than credit card rollover interest rates (up to 42% p.a.)." },
      { q: "How fast is the loan disbursed?", a: "Disbursement is instant and funds are credited directly to your savings bank account in seconds." },
      { q: "Are there foreclosure charges?", a: "Yes, standard foreclosure fees of 1% to 3% apply if you pay off the remaining balance early." },
      { q: "Does this affect my CIBIL score?", a: "Paying EMIs consistently on time builds a positive payment history, helping improve your score." },
      { q: "Is a processing fee charged?", a: "Yes, banks charge a one-time administrative fee of flat ₹199 to ₹999 on approval." },
      { q: "Can I convert single large card purchases into EMIs?", a: "Yes. Most banks allow you to convert transactions above ₹2,500 into easy monthly EMIs directly via their mobile app." },
      { q: "What happens if I default on my EMIs?", a: "Defaulting triggers high late payment fees and interest rates (up to 42% p.a.) on the outstanding balance, severely dropping your CIBIL score." },
      { q: "How do I apply?", a: "You can apply instantly via your bank's mobile app, NetBanking portal, or customer service." }
    ]
  }
};
