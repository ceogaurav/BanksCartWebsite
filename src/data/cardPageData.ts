export interface CardFAQ {
  q: string;
  a: string;
}

export interface CardRecommendRow {
  name: string;
  bank: string;
  fees: string;
  benefit: string;
}

export interface CardPageContent {
  title: string;
  badge: string;
  intro: string;
  moreIntro?: string;
  keyFeaturesTitle: string;
  keyFeatures: { label: string; text: string }[];
  recommendTitle: string;
  recommendHeaders: string[];
  recommendDetails: CardRecommendRow[];
  checklistTitle: string;
  checklist: string[];
  faqs: CardFAQ[];
}

export const CARD_PAGE_MAP: Record<string, CardPageContent> = {
  "overview": {
    title: "Apply for Credit Card Online: Compare Top Cards",
    badge: "Premium Payment Cards",
    intro: "A Credit Card is a powerful financial tool that gives you access to a revolving line of credit extended by the card issuer. It enables you to make secure purchases online and offline, earn valuable reward points or cashbacks, and build an exceptional CIBIL score. When managed responsibly, credit cards offer unmatched payment convenience and savings.",
    moreIntro: "At BanksCart, we compare and analyze credit cards from India's top issuers (such as HDFC, ICICI, SBI, and Axis). Whether you are looking for lifetime free cards, fuel discounts, airport lounge access, or high cashback percentages, we help you check eligibility and apply 100% digitally in minutes.",
    keyFeaturesTitle: "Key Advantages of Owning a Credit Card",
    keyFeatures: [
      { label: "Interest-Free Period", text: "Enjoy up to 45 to 50 days of interest-free credit on your card purchases." },
      { label: "High Reward Slabs", text: "Earn cashback, air miles, or reward points on every transaction you execute." },
      { label: "CIBIL Score builder", text: "Clear your monthly card statements in full before the due date to boost credit ratings." }
    ],
    recommendTitle: "Compare Top Credit Cards in India 2026",
    recommendHeaders: ["Recommended Card", "Issuing Bank", "Annual Fee", "Key Highlight Benefit"],
    recommendDetails: [
      { name: "HDFC Regalia Gold", bank: "HDFC Bank", fees: "₹2,500 + GST", benefit: "Complimentary Club Vistara & Lounge access" },
      { name: "ICICI Amazon Pay", bank: "ICICI Bank", fees: "Lifetime Free", benefit: "Flat 5% cashback on Amazon Prime purchases" },
      { name: "SBI Card ELITE", bank: "State Bank of India", fees: "₹4,999 + GST", benefit: "Free movie tickets & luxury travel vouchers" },
      { name: "Axis Ace Card", bank: "Axis Bank", fees: "₹499 + GST", benefit: "Flat 2% cashback on all offline transactions" }
    ],
    checklistTitle: "Important Checklist before Applying for a Credit Card",
    checklist: [
      "Verify your credit score: Lenders prefer a CIBIL rating of 700+ for standard card approvals.",
      "Check the fee structure: Always compare Joining fees, Annual charges, and renewal waivers.",
      "Understand grace periods: Ensure you clear full dues monthly to avoid high interest rollovers."
    ],
    faqs: [
      { q: "What is the minimum CIBIL score required for a credit card?", a: "Most banks require a CIBIL score of 700 or above for credit card approval. However, secured cards are approved at zero credit history." },
      { q: "What is an annual fee waiver?", a: "Many banks waive your card's annual fee if you spend a specific milestone amount (e.g., ₹1 Lakh) during the card year." },
      { q: "Does rolling over card balances hurt my score?", a: "Yes. Paying only the Minimum Amount Due triggers high interest charges (up to 42% p.a.) and indicates high credit dependency, dropping scores." },
      { q: "What is a 'Lifetime Free' credit card?", a: "A card that has zero joining fees and zero annual/renewal charges for the lifetime of the cardholder." },
      { q: "How long does digital card dispatch take?", a: "Virtual credit cards are generated instantly on approval. Physical cards are delivered to your registered address in 3 to 7 business days." },
      { q: "Can I withdraw cash using my credit card?", a: "Yes, but it is highly discouraged. Cash advances attract high cash withdrawal fees and interest charges from day one." },
      { q: "What is the billing cycle?", a: "A monthly cycle of 30 days during which your transactions are logged. A card statement is generated at the end of this cycle." },
      { q: "What is the Credit Utilization Ratio (CUR)?", a: "The ratio of limit spent. Experts recommend keeping card spendings strictly below 30% of your maximum limits." },
      { q: "Can college students get credit cards?", a: "Yes, college students can apply for secured credit cards against a small Fixed Deposit starting from ₹10,000 without income proofs." },
      { q: "What is a chargeback?", a: "A dispute raised by cardholders against unauthorized transactions or merchant failures, refunding the money." }
    ]
  },
  "lifetime-free": {
    title: "Lifetime Free Credit Cards: Compare Zero Fee Cards",
    badge: "Zero Maintenance",
    intro: "A **Lifetime Free (LTF) Credit Card** is a highly popular card segment that charges absolutely zero joining fees and zero annual/renewal fees forever. These cards are perfect for beginners, low-frequency spenders, and anyone looking to build a credit score without monthly outgoes.",
    moreIntro: "LTF credit cards enable you to enjoy standard rewards, secure cashbacks, and tap into online merchant discounts without the burden of meeting annual spending milestones to secure fee waivers.",
    keyFeaturesTitle: "Perks of Lifetime Free Cards",
    keyFeatures: [
      { label: "Absolute Zero Fees", text: "No recurring joining or annual charges ever billed to your card account." },
      { label: "Credit Score Builder", text: "Perfect tool to build or repair your CIBIL rating at absolutely zero cost." },
      { label: "Merchant Discounts", text: "Qualify for top e-commerce sales, instant cashbacks, and dining discounts." }
    ],
    recommendTitle: "Top Recommended Lifetime Free Cards 2026",
    recommendHeaders: ["Recommended Card", "Issuing Bank", "Joining Fee", "Best Benefit Feature"],
    recommendDetails: [
      { name: "ICICI Amazon Pay Card", bank: "ICICI Bank", fees: "Nil (Lifetime Free)", benefit: "Flat 5% cashback on Amazon Prime purchases" },
      { name: "IDFC First Select", bank: "IDFC First Bank", fees: "Nil (Lifetime Free)", benefit: "Free movie tickets & railway lounge access" },
      { name: "HSBC Visa Platinum", bank: "HSBC Bank", fees: "Nil (Lifetime Free)", benefit: "10% cashback on dining & grocery spending" },
      { name: "Axis Neo Card", bank: "Axis Bank", fees: "Nil (Lifetime Free)", benefit: "Discounts on Zomato, BookMyShow & Paytm" }
    ],
    checklistTitle: "Important Checklist for Zero-Fee Borrowers",
    checklist: [
      "Check hidden fees: Factor in interest charges on unpaid dues, cash advance fees, and late payment charges.",
      "Check reward expirations: Ensure reward points do not expire after a set period.",
      "Activate card within 30 days: RBI rules require new cards to be activated within 30 days to prevent automatic closure."
    ],
    faqs: [
      { q: "Are there really zero annual fees?", a: "Yes. Lifetime free cards charge absolutely zero joining or annual renewal fees, with no spending thresholds required." },
      { q: "Do lifetime free cards offer reward points?", a: "Yes, though reward rates are generally standard compared to premium fee-paying cards." },
      { q: "Can I get lounge access on a lifetime free card?", a: "Yes! Cards like the IDFC First Select offer complimentary domestic airport lounge access." },
      { q: "Will my CIBIL score improve with an LTF card?", a: "Yes. Consistently paying your statement dues in full monthly builds excellent repayment histories, boosting scores." },
      { q: "What is the interest rate on unpaid LTF card balances?", a: "Standard card interest rates of 36% to 42% p.a. apply if you carry over or delay outstanding balances." },
      { q: "Can I get a top-up loan on an LTF card?", a: "Yes. Banks extend pre-approved personal loans to eligible cardholders based on card repayment behaviors." },
      { q: "How do banks make money on free cards?", a: "Banks earn through merchant transaction fees, late payment charges, EMI conversion interests, and cash advances." },
      { q: "Is a minimum salary required to apply?", a: "Yes, typically a minimum monthly salary of ₹15,000 to ₹25,000 is required for salaried professionals." },
      { q: "Can a self-employed professional apply?", a: "Yes, by submitting past 1-2 years' IT Returns showing stable income brackets." },
      { q: "Can I upgrade my free card to a premium card later?", a: "Yes. Based on consistent high spendings and on-time payments, banks will invite you to upgrade to premium reward tiers." }
    ]
  }
};
export type CardPageContentMap = Record<string, CardPageContent>;
