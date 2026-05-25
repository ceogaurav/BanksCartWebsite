export interface RechargeFAQ {
  q: string;
  a: string;
}

export interface RechargePageContent {
  title: string;
  badge: string;
  intro: string;
  numLabel: string; // Consumer Number/Mobile Number label
  numPlaceholder: string;
  operators: string[];
  checklistTitle: string;
  checklist: string[];
  faqs: RechargeFAQ[];
}

export const RECHARGE_PAGE_MAP: Record<string, RechargePageContent> = {
  "mobile": {
    title: "Instant Mobile Prepaid Recharge Online: Best Offers",
    badge: "Prepaid Recharge",
    intro: "Recharge your prepaid mobile network instantly online at BanksCart. Compare the latest unlimited voice plans, data add-ons, and co-branded streaming tokens across top telecom operators including Jio, Airtel, Vi, and BSNL. Secure instant talktime and keep your phone active 24/7.",
    numLabel: "10-Digit Mobile Number",
    numPlaceholder: "Enter 10-digit prepaid number",
    operators: ["Reliance Jio Prepaid", "Bharti Airtel Prepaid", "Vodafone Idea (Vi) Prepaid", "BSNL Prepaid"],
    checklistTitle: "Steps to Recharge Mobile Online",
    checklist: [
      "Select prepaid operator: Enter your mobile number, and our system automatically identifies the operator and telecom circle.",
      "Browse best plans: Choose from smart list tabs including Hero Unlimited, Talktime, and Data Add-ons.",
      "Secure payments: Authorize your transaction using UPI, Credit/Debit cards, or Net Banking for instant talktime credit."
    ],
    faqs: [
      { q: "How long does mobile recharge credit take?", a: "Mobile prepaid recharges are processed instantly. You will receive an SMS confirmation from your operator within 10 to 30 seconds." },
      { q: "Can I recharge my postpaid number here?", a: "No, this is for prepaid accounts. For monthly bills, please navigate to the 'Mobile Postpaid' page." },
      { q: "What happens if I recharge an incorrect number?", a: "Prepaid recharges are real-time and irreversible. Please double-check the 10-digit number before authorizing UPI payments." },
      { q: "Do you charge extra processing fees?", a: "No. Recharges on BanksCart attract absolutely zero convenience fees. You pay only the exact operator plan cost." },
      { q: "How do I claim cashback or discounts?", a: "Applicable operator coupons and cashback tokens are automatically matched and applied at checkout." },
      { q: "Can I recharge international roaming plans?", a: "Yes, you can browse and select co-branded international roaming plans for Jio and Airtel." },
      { q: "Can I recharge BSNL prepaid cards online?", a: "Yes, BSNL prepaid plans, data boosters, and validity extensions are fully supported." },
      { q: "What should I do if my payment succeeds but recharge fails?", a: "In rare auto-debit failure events, your money is completely safe. The payment is automatically refunded to your original source account within 2 to 3 business days." },
      { q: "What is an automated recharge scheduler?", a: "An upcoming feature that automatically schedules recharges 24 hours before your active validity expires." },
      { q: "Can I save multiple mobile numbers in my profile?", a: "Yes, registered users can save multiple family mobile numbers in their profile dashboard for quick one-click recharges." }
    ]
  },
  "electricity": {
    title: "Pay Electricity Bill Online: Secure Utility Payments",
    badge: "Electricity Bill",
    intro: "Clear your monthly electricity bills online securely at BanksCart. We support all major state power boards and distribution entities across India (including BESCOM, Torrent Power, Tata Power, Adani Electricity, PSPCL, and UPPCL). Banish late payment penalties by automating your power statements.",
    numLabel: "Consumer Account Number (CA Number)",
    numPlaceholder: "Enter CA / Consumer number",
    operators: ["BESCOM (Bangalore)", "Tata Power (Delhi/Mumbai)", "Adani Electricity (Mumbai)", "Torrent Power", "UPPCL (Uttar Pradesh)", "PSPCL (Punjab)", "MSEDCL (Maharashtra)", "CESC (Kolkata)"],
    checklistTitle: "Electricity Payment Guidelines",
    checklist: [
      "Select power board: Choose your state's electricity distribution board from the operators dropdown list.",
      "Fetch bill details: Enter your unique CA/Consumer number to fetch your active monthly bill statement, consumer name, and due date.",
      "Validate payment: Confirm the bill details match your physical statement before proceeding with payment."
    ],
    faqs: [
      { q: "Where can I find my Consumer Account (CA) number?", a: "Your CA/Consumer number is printed at the top-right corner of your physical electricity bill statement." },
      { q: "How long does it take for the payment to update with the board?", a: "Payments are settled immediately. However, state power boards take 24 to 72 hours to update records on their official websites." },
      { q: "Can I pay after the bill due date?", a: "Yes, but late payment surcharges may be added to your bill according to your state board's guidelines." },
      { q: "Is the bill fetching system secure?", a: "Yes, we integrate with the official Bharat Bill Payment System (BBPS) to securely fetch and pay official government utility bills." },
      { q: "Can I make partial electricity bill payments?", a: "Most state power boards require full payment of monthly bills. Settle full totals to prevent auto-debit failures or power disconnects." },
      { q: "Do you support rural electricity boards?", a: "Yes, our BBPS linkages cover all national rural electricity subdivisions and municipal power networks." },
      { q: "How do I download my payment receipt?", a: "Upon payment success, a digital receipt is instantly generated. You can download the PDF from your email or profile dashboard." },
      { q: "What should I do if my CA number displays 'No Outstanding Bill'?", a: "This indicates that you have already cleared your statement or your state board has not uploaded the current month's bill yet." },
      { q: "Can I automate my monthly power bills?", a: "Yes, you can register your consumer details with your banking app or UPI auto-debit to clear statements automatically." },
      { q: "What happens if I execute a double payment?", a: "In rare double-payment events, the excess amount is automatically credited as an advance payment on your next month's power statement." }
    ]
  },
  "loan-emi": {
    title: "Pay Loan EMI Online: Secure Multi-Bank Repayment",
    badge: "Loan EMI Payment",
    intro: "Clear your active personal loan, home loan, or business loan EMIs online securely at BanksCart. Settle monthly repayments across India's top banks and NBFCs (including HDFC, ICICI, SBI, Axis, Bajaj Finance, L&T Finance, and Muthoot) to shield your CIBIL credit rating.",
    numLabel: "Loan Account Number (LAN)",
    numPlaceholder: "Enter active loan account number",
    operators: ["Bajaj Finance Ltd", "HDFC Bank Loan", "ICICI Bank Loan", "SBI Loan Repayment", "L&T Finance", "Muthoot Finance", "Aditya Birla Finance", "Tata Capital"],
    checklistTitle: "EMI Repayment Steps",
    checklist: [
      "Select lender: Choose your issuing bank or NBFC lender from our verified operators list.",
      "Fetch loan statement: Enter your Loan Account Number (LAN) to securely verify your active monthly EMI amount and account holder details.",
      "Maintain credit score: Settle your EMI 24-48 hours before the actual bank clearance date to ensure a clean track record on credit reports."
    ],
    faqs: [
      { q: "What is a Loan Account Number (LAN)?", a: "A LAN is a unique alphanumeric identifier assigned by your bank at the time of loan sanction, listed in your loan welcome letter or monthly statement." },
      { q: "Does paying EMI here clear my bank auto-debit obligation?", a: "Yes. If your account lacks balance or your bank NACH mandate fails, paying outstanding EMIs here directly updates your loan account." },
      { q: "How long does it take for the bank to credit the payment?", a: "Lenders typically take 24 to 48 working hours to reconcile and credit loan payments to your LAN." },
      { q: "Can I foreclosure my loan on this portal?", a: "No.Settle standard monthly EMIs or overdue payments here. For complete loan foreclosures, please visit your bank branch directly." },
      { q: "Does delaying EMI payments impact my credit score?", a: "Yes. Even a single delayed loan installment is reported to CIBIL and other credit bureaus, dropping your score severely." },
      { q: "Do you support peer-to-peer (P2P) lenders?", a: "Yes, our BBPS channels support top RBI-registered P2P lending platforms and digital credit apps." },
      { q: "Can I pay advance EMIs?", a: "Yes, specific lenders allow you to pay an extra month's EMI in advance as a buffer against auto-debit failure." },
      { q: "What happens if my payment fails after money is deducted?", a: "Failed transactions are tracked securely. The deducted amount is credited back to your source account automatically in 2 to 3 days." },
      { q: "How do I get my loan foreclosure certificate?", a: "After settling your final EMI, contact your lender directly to receive your No Objection Certificate (NOC) and loan closure statements." },
      { q: "Is there any extra commission charged on loan payments?", a: "No. BanksCart provides secure, 100% free BBPS loan payments with zero convenience fees." }
    ]
  }
};
