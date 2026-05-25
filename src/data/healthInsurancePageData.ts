export interface HealthFeature {
  label: string;
  text: string;
}

export interface HealthFAQ {
  q: string;
  a: string;
}

export interface HealthPageContent {
  title: string;
  badge: string;
  intro: string;
  moreIntro?: string;
  highlightsTitle: string;
  highlights: HealthFeature[];
  ratesTitle?: string;
  ratesHeaders?: string[];
  ratesRows?: string[][];
  faqs: HealthFAQ[];
}

export const HEALTH_INSURANCE_PAGE_MAP: Record<string, HealthPageContent> = {
  "group-active-health": {
    title: "ABSLI Group Active Health: Corporate Employee Wellness Plans",
    badge: "Corporate Health Cover",
    intro: "The Group Active Health Plan is a premium corporate employee healthcare program designed to protect company teams. Unlike standard corporate policies, this wellness-driven plan integrates active lifestyle monitoring, rewarding employees with premium reductions and diagnostic health credits.",
    moreIntro: "At BanksCart, we detail corporate benefits, pre-existing disease wait waivers, and cashless hospitalization matrices to help corporate HR departments select the best team coverage policies.",
    highlightsTitle: "Highlights of Group Active Health",
    highlights: [
      { label: "Wellness Rewards", text: "Allows employees to earn monthly health credits by completing daily active walking targets." },
      { label: "Day 1 OPD Coverage", text: "Includes coverage for local doctor consultations, diagnostics checks, and pharmacy bills." },
      { label: "Pre-existing Disease Waiver", text: "Corporate employee groups bypass standard 3-year waiting slots for chronic diseases." }
    ],
    faqs: [
      { q: "What is the minimum group size required?", a: "ABSLI offers Group Active Health policies for corporate teams starting at a minimum size of 7 to 10 employees." }
    ]
  },
  "group-activ-secure": {
    title: "ABSLI Group Activ Secure: Corporate Critical Illness & Accident Cover",
    badge: "Corporate Benefits",
    intro: "Secure your corporate workforce against major health emergencies with the **ABSLI Group Activ Secure** policy. This specialized supplementary rider plan provides lump-sum payouts upon diagnosis of critical illnesses or accidental disabilities, providing vital cash backing to employee families.",
    moreIntro: "At BanksCart, we explain lump-sum payout matrices. Adding Group Activ Secure provides absolute financial security alongside standard corporate policies.",
    highlightsTitle: "Highlights of Group Activ Secure",
    highlights: [
      { label: "Lump-Sum Cash Payout", text: "Provides 100% of the sum assured in a single cash payout upon critical illness diagnosis." },
      { label: "Disability Security", text: "Includes comprehensive coverage for permanent total or partial accidental disabilities." },
      { label: "Child Education Benefit", text: "Special additional lump-sum offsets to fund children's academic fees upon main breadwinner demise." }
    ],
    faqs: [
      { q: "Which critical illnesses are covered?", a: "Standard policies cover up to 36 major critical conditions including cancer, stroke, kidney failure, and bypass surgeries." }
    ]
  },
  "group-health-insurance": {
    title: "Group Health Insurance: Custom Corporate Team Medical Plans",
    badge: "Corporate Medical",
    intro: "Group Health Insurance is a crucial employee benefits program hosted by modern corporate organizations. Offering cashless hospitalizations for employees and their families, these group plans shield teams from sudden healthcare costs while boosting retention.",
    moreIntro: "At BanksCart, we compare corporate medical plans, cashless hospital coverage grids, and maternity rider slabs to help you structure optimized corporate benefits.",
    highlightsTitle: "Highlights of Group Health Cover",
    highlights: [
      { label: "Cashless Hospitalizations", text: "Direct corporate cashless clearance at over 12,000+ top hospitals nationwide." },
      { label: "Maternity & Newborn Cover", text: "Includes dedicated maternity care and immediate newborn hospital coverage from Day 1." },
      { label: "No Medical Checkups", text: "Corporate employees bypass initial physical health checkup tests to secure cards." }
    ],
    faqs: [
      { q: "Is tax exemption available on corporate group insurance premiums?", a: "Yes. Corporate entities claim 100% premium payments as business expenses under Section 37 of the Income Tax Act." }
    ]
  },
  "health-insurance-asthma": {
    title: "Asthma Health Insurance Cover: Chronic Management Guidelines",
    badge: "Chronic Disease Cover",
    intro: "Living with chronic respiratory conditions requires consistent medical care. **Asthma Health Insurance** plans are specialized policies designed to cover recurring diagnostic tests, emergency nebulization charges, doctor consultation fees, and pharmacy bills.",
    moreIntro: "At BanksCart, we explain pre-existing disease (PED) declarations. Selecting plans with Day 1 Chronic Disease management ensures immediate coverage for inhalers and emergency ward outgos.",
    highlightsTitle: "Highlights of Asthma Medical Cover",
    highlights: [
      { label: "PED Declaration", text: "Allows honest disclosure of asthma details at booking to ensure valid claim clearances." },
      { label: "Inhaler & OPD Coverage", text: "Covers recurring outpatient department (OPD) fees for specialist pulmonologists." },
      { label: "Emergency Nebulization", text: "Guarantees 100% cashless emergency room approvals during acute asthma attacks." }
    ],
    faqs: [
      { q: "Will my asthma policy be rejected if I declare PED?", a: "No. Modern wellness-driven insurance plans accept asthma PEDs with a minor premium markup, eliminating any risk of future claim rejections." }
    ]
  },
  "health-insurance-diabetes": {
    title: "Diabetes Health Insurance Plans: Secure Cashless Disease Cover",
    badge: "Diabetes Cover",
    intro: "Diabetes mellitus is one of the most common chronic conditions in India. Dedicated **Diabetes Health Insurance** policies are custom-designed to provide Day 1 medical coverage for insulin outgos, kidney health monitoring, retinal checkups, and standard hospitalizations.",
    moreIntro: "At BanksCart, we simplify diabetic coverages. We help you choose active policies that waive standard 36-month waiting periods, safeguarding your wealth against diabetic complications.",
    highlightsTitle: "Highlights of Diabetes Health Plans",
    highlights: [
      { label: "Day 1 Cashless Cover", text: "Bypasses standard pre-existing disease waiting horizons to cover diabetic conditions immediately." },
      { label: "Insulin & Diagnostic Check", text: "Provides regular OPD offsets for HbA1c tests, diabetic foot checkups, and insulin purchases." },
      { label: "Complications Protection", text: "Guarantees full cashless backup for secondary complications like nephropathy or cardiac conditions." }
    ],
    faqs: [
      { q: "Is physical medical checkup mandatory before booking?", a: "Select plans for applicants over 45 require simple pre-policy checkups, while wellness-centric digital plans bypass checks under basic online declarations." }
    ]
  },
  "health-insurance-high-blood-pressure": {
    title: "Hypertension Health Insurance: Cashless High Blood Pressure Cover",
    badge: "Cardiac Security",
    intro: "Hypertension or High Blood Pressure is a vital pre-existing condition that requires systematic management to prevent cardiac emergencies. Specialized **Hypertension Health Insurance** plans cover daily medication costs, cardiologist consultations, and immediate emergency room admissions.",
    moreIntro: "At BanksCart, we compare cardiac-friendly policies. Declaring hypertension honestly secures complete cashless approvals at premium network hospitals.",
    highlightsTitle: "Highlights of Hypertension Medical Cover",
    highlights: [
      { label: "Cardiologist OPD Cover", text: "Provides dedicated OPD limits to consult specialist cardiologists periodically." },
      { label: "Emergency Room (ER) Payouts", text: "Instant cashless clearance for ER admissions due to sudden pressure peaks." },
      { label: "No Claims Bonus (NCB)", text: "Earn up to 50% bonus additions to your sum assured annually for maintaining stable pressure logs." }
    ],
    faqs: [
      { q: "How long is the standard waiting period for hypertension?", a: "Standard general health policies carry a 2 to 4-year waiting period for pre-existing hypertension. However, specialized chronic plans offer immediate Day 1 coverages." }
    ]
  },
  "health-insurance-high-cholesterol": {
    title: "Cholesterol Health Insurance: Vascular and Cardiac Coverages",
    badge: "Vascular Cover",
    intro: "Manage hyperlipidemia and cardiovascular risks with specialized **High Cholesterol Health Insurance**. Designed to address high lipid profiles, these plans provide full diagnostic coverage for lipid profile tests, expert consultations, and vascular care hospitalizations.",
    moreIntro: "At BanksCart, we optimize vascular coverages. Declaring high cholesterol details protects you from sudden cardiac and stroke hospitalization out-of-pocket bills.",
    highlightsTitle: "Highlights of High Cholesterol Cover",
    highlights: [
      { label: "Vascular & Blockage Shield", text: "Covers dynamic angiography and bypass operations cashlessly." },
      { label: "Lipid Profile OPD", text: "Periodic diagnostic lipid profile checkups are covered 100% free of cost." },
      { label: "Vitamins & Diet Support", text: "Includes wellness consults with professional nutritionists to lower lipid metrics." }
    ],
    faqs: [
      { q: "Does high cholesterol increase my insurance premium?", a: "A minor premium loading (10% to 15%) may be added to cover the cardiac risk margins, which ensures lifetime coverage security." }
    ]
  },
  "login-and-registration-process": {
    title: "Aditya Birla Capital Health Portal: Login & Registration Guides",
    badge: "Portal Guides",
    intro: "Access your digital healthcare credentials, download tax-saving certificates, and submit claims online via the **Aditya Birla Capital Health Portal**. Registering your policy online enables seamless tracking of wellness steps and instant cash redemption points.",
    moreIntro: "At BanksCart, we provide step-by-step guidelines on how to log in, register fresh policies, track step metrics, and download cash claim receipts on your smartphone.",
    highlightsTitle: "Digital Portal Capabilities",
    highlights: [
      { label: "Immediate Login", text: "Log in securely using your registered mobile number, email, or policy number via OTP." },
      { label: "Download Tax Receipts", text: "Instantly download Section 8D tax-saving certificates for financial filings." },
      { label: "Redeem Step Points", text: "Track your physical activity steps and convert points to redeem premium waivers or OPD cash." }
    ],
    faqs: [
      { q: "How do I register my fresh health policy online?", a: "Visit the official portal, click 'Register Now', enter your 8-digit policy number, Date of Birth, and mobile number, and complete OTP verification to setup credentials." }
    ]
  }
};
