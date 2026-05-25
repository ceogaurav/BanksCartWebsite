export interface AegonFeature {
  label: string;
  text: string;
}

export interface AegonFAQ {
  q: string;
  a: string;
}

export interface AegonPageContent {
  title: string;
  badge: string;
  intro: string;
  moreIntro?: string;
  highlightsTitle: string;
  highlights: AegonFeature[];
  ratesTitle?: string;
  ratesHeaders?: string[];
  ratesRows?: string[][];
  faqs: AegonFAQ[];
}

export const AEGON_LIFE_PAGE_MAP: Record<string, AegonPageContent> = {
  "aegon-life-child-plans": {
    title: "Aegon Life Child Plans: Secure Your Child's Academic Milestones",
    badge: "Child Wealth Plans",
    intro: "Aegon Life Child Plans are dedicated high-yield wealth compounding policies custom-designed to fund your child's future academic degrees, international studies, and wedding milestones. Offering double benefits of regular compounding growth and immediate life cover, it is the perfect child security shield.",
    moreIntro: "At BanksCart, we explain premium waiver benefits and equity-hybrid wealth creation models. By investing early, you ensure your child's academic aspirations remain fully financed even in the event of parental demise.",
    highlightsTitle: "Child Plan Key Highlights",
    highlights: [
      { label: "Premium Waiver Benefit", text: "In the event of parental demise, all future premium payments are completely waived, and the policy remains fully active." },
      { label: "Maturity Payout Grids", text: "Receive structured cash payouts at critical milestones like 18th, 21st, and 24th birthdays to fund college fees." },
      { label: "Market-Linked Compounding", text: "Select customized exposures in bluechip equity and high-grade debt funds to beat inflation." }
    ],
    faqs: [
      { q: "What is the Premium Waiver Benefit in Aegon Child Plans?", a: "If the premium-paying parent passes away during the policy term, the bank waives all remaining future premiums. Aegon Life deposits the premiums on behalf of the parent, and the child receives the full guaranteed maturity amount on schedule." }
    ]
  },
  "aegon-life-customer-care": {
    title: "Aegon Life Customer Care: Support Helplines & Claim Desks",
    badge: "24/7 Support Desk",
    intro: "Aegon Life provides streamlined multi-channel support services to assist policyholders. Whether you need to download tax-saving certificates, track pending claim settlements, update nominees, or change bank mandates, the company offers specialized helplines.",
    moreIntro: "At BanksCart, we compile all active toll-free board lines, claim settlement helplines, WhatsApp support contacts, and official email boards to help you get direct support fast.",
    highlightsTitle: "Core Customer Care Channels",
    highlights: [
      { label: "Toll-Free Helpline", text: "Call the central helpline desk at 1800 209 9090 for immediate assistance." },
      { label: "Digital Help Email", text: "Send custom queries or digital claim documents to customer.care@aegonlife.com." },
      { label: "WhatsApp Support", text: "Track policy parameters and check active NAV unit prices instantly on WhatsApp support desks." }
    ],
    ratesTitle: "Aegon Support Numbers Directory",
    ratesHeaders: ["Service Department", "Active Support Number", "Dedicated Help Email"],
    ratesRows: [
      ["General Toll-Free support", "1800 209 9090", "customer.care@aegonlife.com"],
      ["Claim Settlement Desk", "1800 209 9090 (Ext: 2)", "claims@aegonlife.com"],
      ["NRI Dedicated Helpdesk", "+91-22-6118 0100", "nri.support@aegonlife.com"],
      ["WhatsApp Self-Service", "92210 11100", "customer.care@aegonlife.com"]
    ],
    faqs: [
      { q: "How do I register a death claim under Aegon Life?", a: "The nominee can file claims online via the Aegon Life portal or by mailing claims@aegonlife.com. Submit the claim form, original policy pack, death certificate, and nominee bank KYC details." }
    ]
  },
  "life-easy-protect-insurance-plan": {
    title: "Aegon Life Easy Protect Insurance: Affordable Term Cover",
    badge: "Affordable Protection",
    intro: "The **Aegon Life Easy Protect Insurance Plan** is a highly simplified, affordable term cover designed strictly for first-time buyers and young salaried individuals. Offering high-value life protection for exceptionally cheap monthly premium rates, it secures your family liabilities without draining cash.",
    moreIntro: "At BanksCart, we analyze premium rate cards and tax exemptions. With zero complex underwriting loops, you secure immediate life protection in a few taps online.",
    highlightsTitle: "Easy Protect Highlights",
    highlights: [
      { label: "Exceptionally Low Premium", text: "Secure comprehensive sum assured protections starting at premiums as low as ₹15 per day." },
      { label: "Zero Medical Checkup", text: "Salaried individuals under 40 years bypass physical checkups under basic digital questionnaires." },
      { label: "Secured Family Base", text: "Guarantees full sum assured cash payout to the nominee to clear family debts." }
    ],
    faqs: [
      { q: "What is the maximum sum assured available under Easy Protect?", a: "The plan is designed for budget protections, offering sum assured options ranging from ₹10 Lakhs up to ₹50 Lakhs." }
    ]
  },
  "future-protect-insurance-plan": {
    title: "Aegon Life Future Protect: Comprehensive Term Insurance Cover",
    badge: "Family Protection",
    intro: "Secure your family's future with the **Aegon Life Future Protect Plan**, a pure term life insurance policy. Providing substantial sum assured payouts at competitive rate structures, this policy acts as a financial shield to protect your home loans, children's studies, and lifestyle goals.",
    moreIntro: "At BanksCart, we simplify term insurance. By comparing Future Protect sum assured slabs, we ensure your family remains financially insulated from debt liabilities.",
    highlightsTitle: "Future Protect Key Pillars",
    highlights: [
      { label: "Substantial Sum Assured", text: "Secure coverages extending from ₹50 Lakhs up to no upper limit at highly affordable baseline rates." },
      { label: "Terminal Illness Payout", text: "Includes immediate accelerated payouts of up to 50% of the sum assured upon critical terminal illness checks." },
      { label: "Tax Exemption Slabs", text: "All regular premium payments qualify for 100% tax exemptions up to ₹1.5 Lakhs annually under Section 80C." }
    ],
    faqs: [
      { q: "Does the Future Protect plan offer a maturity payout?", a: "No. Future Protect is a pure protection term plan and does not offer survival or maturity benefits, prioritizing maximum family coverages at lowest costs." }
    ]
  },
  "future-protect-plus-insurance-plan": {
    title: "Aegon Life Future Protect Plus: Term Protection + Survival Payouts",
    badge: "Double Protection",
    intro: "The **Future Protect Plus Insurance Plan** is a premium protection policy designed to offer both complete term life protection and regular survival payout benefits. If the policyholder survives the policy term, Aegon Life returns up to 100% of all paid premiums, making your protection completely free of cost.",
    moreIntro: "At BanksCart, we compare survival benefits and premium return schedules. Secure complete family peace of mind and get all your cash back at maturity.",
    highlightsTitle: "Highlights of Future Protect Plus",
    highlights: [
      { label: "100% Return of Premium", text: "Get 100% of all paid base premiums physically returned as a lump-sum upon policy survival." },
      { label: "Double Death Shield", text: "Combines high pure-term sum assured coverages with additional accidental death benefit payouts." },
      { label: "Flexible Premium Horizons", text: "Choose to pay regular premiums annually or limit payments to a 5 or 10-year horizon." }
    ],
    faqs: [
      { q: "Are GST charges returned under the Return of Premium payout?", a: "No. Under IRDAI guidelines, only the base premiums are returned at maturity. GST and tax-rider charges are non-refundable." }
    ]
  },
  "aegon-life-guaranteed-growth-insurance-plan": {
    title: "Aegon Life Guaranteed Growth Plan: Secure Wealth Compounding",
    badge: "Guaranteed Wealth",
    intro: "The **Aegon Life Guaranteed Growth Plan** is a non-participating, individual life savings insurance plan. Offering guaranteed regular payouts and a massive maturity cash lump-sum completely insulated from volatile market drops, it is the safest savings tool to achieve stable financial objectives.",
    moreIntro: "At BanksCart, we outline compounding schedules and guaranteed additions. By regularizing investment deposits, you secure family futures with absolute predictability.",
    highlightsTitle: "Guaranteed Growth Highlights",
    highlights: [
      { label: "Guaranteed Cash Payouts", text: "Earn guaranteed annual payouts starting from year 10 up to policy maturity." },
      { label: "Loyalty Additions", text: "Special wealth additions are credited directly to your policy balance at regular intervals." },
      { label: "Secured Life Insurance", text: "Includes dedicated life insurance cover up to 11 times your annualized premium." }
    ],
    faqs: [
      { q: "What is the premium payment tenure option?", a: "You can select a limited premium payment term of 6, 8, 10, or 12 years with a policy coverage term extending up to 20 years." }
    ]
  },
  "aegon-life-iguarantee-insurance": {
    title: "Aegon Life iGuarantee Insurance: Secure Pocket Savings ULIP",
    badge: "Guaranteed Yields",
    intro: "The **Aegon Life iGuarantee Insurance Plan** is a specialized online-exclusive savings plan designed to deliver predictable, guaranteed payouts. Tailored strictly to fulfill short-term family savings goals like buying vehicles or holiday travel, it is the perfect zero-risk compounding tool.",
    moreIntro: "At BanksCart, we outline investment returns. By locking in a 6-year premium schedule, you secure guaranteed tax-free wealth payouts at year 12.",
    highlightsTitle: "iGuarantee Key Highlights",
    highlights: [
      { label: "Guaranteed Return Grids", text: "Lock in your maturity return values at booking; payouts are 100% guaranteed on contract execution." },
      { label: "Tax-Free Maturity Slabs", text: "Maturity proceed totals are completely exempt from income tax under Section 10(10D)." },
      { label: "Short Investment horizon", text: "Pay premiums for strictly 6 years to secure complete policy coverages up to 12 years." }
    ],
    faqs: [
      { q: "Is physical medical examination needed for iGuarantee?", a: "No. The plan features immediate digital booking online under basic demographic declarations." }
    ]
  },
  "imaximize-insurance-plan": {
    title: "Aegon Life iMaximize Insurance: High-Yield Regular ULIP Portfolio",
    badge: "ULIP Compounding",
    intro: "The **Aegon Life iMaximize Insurance Plan** is a premium unit-linked life savings insurance product (ULIP) that combines equity market exposures with family life cover. Paying regular premiums gives you dynamic access to high-performing investment funds managed by expert fund managers.",
    moreIntro: "At BanksCart, we compare ULIP portfolios. With zero allocation charges, 100% of your paid premiums compound directly in diverse equity and bond markets.",
    highlightsTitle: "iMaximize Key Highlights",
    highlights: [
      { label: "Zero Premium Allocation fees", text: "100% of your paid money is converted directly to active NAV units, boosting returns." },
      { label: "Self-Managed Assets Allocation", text: "Switch dynamically between 6 high-yield equity, balanced, and debt funds 100% free of cost." },
      { label: "Inbuilt Accidental Death Cover", text: "Provides double payouts of up to 200% of the sum assured in accidental emergencies." }
    ],
    faqs: [
      { q: "What is the lock-in period for iMaximize?", a: "Like all IRDAI-regulated ULIPs, iMaximize carries a mandatory 5-year lock-in period, after which partial withdrawals are permitted." }
    ]
  },
  "imaximize-single-premium-insurance-plan": {
    title: "iMaximize Single Premium ULIP: Lump-Sum Compounding Portfolio",
    badge: "ULIP Portfolio",
    intro: "The **Aegon Life iMaximize Single Premium Plan** is a lump-sum, unit-linked life insurance product. Designed specifically to compound idle capital reserves while maintaining high-cover family protection, it requires a one-time premium deposit.",
    moreIntro: "At BanksCart, we outline asset switching options. By depositing a single premium, you secure lifelong compounding yields with absolute tax insulation.",
    highlightsTitle: "Single Premium ULIP Highlights",
    highlights: [
      { label: "One-Time Lump-Sum", text: "Deposit a single premium (starting at ₹1 Lakh) and secure policy coverage extending up to 10 to 15 years." },
      { label: "Zero Allocation Slabs", text: "100% of your single deposit compiles directly into NAV units without upfront cuts." },
      { label: "Unlimited Free Switches", text: "Switch cash dynamically between equity and sovereign bond funds to secure profits when markets shift." }
    ],
    faqs: [
      { q: "Is maturity tax-exempt under Section 10(10D)?", a: "Yes. Payouts are 100% tax-exempt, provided the single premium does not exceed 10% of the sum assured." }
    ]
  },
  "pension-plans": {
    title: "Best Pension & Retirement Plans 2026: Compare Annuity Slabs",
    badge: "Retirement Planners",
    intro: "Plan your retirement life with secure **Pension & Retirement Plans**. Offering guaranteed annuity payouts, market-linked equity compounding, and Section 80C tax shields, these pension plans help you compile a massive retirement corpus to fund post-career security.",
    moreIntro: "At BanksCart, we compare prime pension plans, monthly annuity rates, and lump-sum withdrawal percentages to ensure your post-career life is comfortable.",
    highlightsTitle: "Pension Plan Core Pillars",
    highlights: [
      { label: "Guaranteed Lifelong Annuity", text: "Secure highly predictable monthly, quarterly, or annual pensions for life." },
      { label: "De-risking Asset Shield", text: "Automatically shifts capital from high-yield equity to stable debt as retirement age nears." },
      { label: "Double tax exemptions", text: "Premium payments are exempt under Section 80C, with 1/3rd of the maturity corpus withdrawable 100% tax-free." }
    ],
    faqs: [
      { q: "What is an Deferred Annuity vs Immediate Annuity?", a: "Immediate Annuity starts paying pensions immediately upon single premium deposit. Deferred Annuity allows your premiums to compound over years before starting payouts." }
    ]
  },
  "rising-star-insurance-plan": {
    title: "Aegon Life Rising Star Insurance: Children's Education Plan",
    badge: "Child Education Cover",
    intro: "Secure your child's collegiate dreams with the **Aegon Life Rising Star Insurance Plan**. This specialized unit-linked child education policy compounds wealth dynamically while securing the child's academic future through double death benefit protections.",
    moreIntro: "At BanksCart, we detail dynamic child funds. Rising Star ensures that your child receives structured financial assistance during critical college entry years.",
    highlightsTitle: "Rising Star Key Highlights",
    highlights: [
      { label: "Premium Waiver Shield", text: "In parent demise emergencies, future premiums are waived; Aegon continues payments to compile the maturity corpus." },
      { label: "Double Death Benefit", text: "Pays immediate lump-sum sum assured upon parent demise + compiles regular annual cash helps for the child." },
      { label: "Active Compounding Units", text: "High-yield investment funds compound cash dynamically to counter inflation in academic costs." }
    ],
    faqs: [
      { q: "What is the maturity age limit for children?", a: "The plan is structured to mature when the child reaches 18 to 25 years of age, aligning with higher education." }
    ]
  },
  "term-insurance-plans": {
    title: "Best Term Insurance Plans 2026: Compare Slabs & Helplines",
    badge: "Pure Protection",
    intro: "Protect your family's future with the **Best Term Insurance Plans in India**. pure term insurance is the most transparent and affordable protection tool, offering massive sum assured payouts at exceptionally low premium brackets to secure outstanding home loans and liabilities.",
    moreIntro: "At BanksCart, we compare leading term insurance quotes, claim settlement ratios (CSR), and premium return schedules online.",
    highlightsTitle: "Term Protection Core Highlights",
    highlights: [
      { label: "Drastic Coverage Slabs", text: "Secure coverages up to ₹1 Crore and above starting at premiums as low as ₹500 per month." },
      { label: "Claim Settlement Ratio (CSR)", text: "Prioritize insurance companies with audited CSR scores exceeding 98% to ensure safe payouts." },
      { label: "Critical Illness Riders", text: "Add comprehensive critical illness riders to receive immediate payouts upon heart or vascular diagnosis." }
    ],
    faqs: [
      { q: "What is the ideal sum assured for term insurance?", a: "Financial planners recommend a sum assured covering at least 10 to 15 times your active annual income." }
    ]
  }
};
