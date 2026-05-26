import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { HelpCircle, ChevronDown, Check, Star, ShieldAlert, Sparkles, BookOpen, AlertCircle, Info, Landmark, Percent, Award, ShieldCheck, ArrowRight, Play, MessageSquare, TrendingUp, CreditCard, Clock, Phone, MapPin } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';
import { ABHYUDAYA_PAGE_MAP, AbhyudayaPageContent } from '../../data/abhyudayaPageData';
import { getNewPageDetailedContent } from '../../data/newPagesDetailedData';


interface EditorialArticle {
  title: string;
  content: string[];
}

const getAbhyudayaDetailedArticles = (slug: string): EditorialArticle[] => {
  const formatSlug = (s: string) => {
    return s
      .split('-')
      .map(word => {
        if (word.toUpperCase() === 'RBI') return 'RBI';
        if (word.toUpperCase() === 'DICGC') return 'DICGC';
        if (word.toUpperCase() === 'SLA') return 'SLA';
        if (word.toUpperCase() === 'IFSC') return 'IFSC';
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  };
  const readableName = formatSlug(slug);

  return [
    {
      title: `Regulatory Stature and Safety Frameworks of Scheduled Co-operative Institutions`,
      content: [
        `Under the statutory guidelines of the Reserve Bank of India (RBI), managing savings, deposits, or loans under the **${readableName}** framework represents a highly secure and compliant financial path. Abhyudaya Co-Operative Bank stands as one of India's premier scheduled multi-state cooperative banks. Established in 1964 and designated as an RBI Scheduled Bank in 1988, it operates with strict compliance under multi-state co-operative societies acts and federal banking laws.`,
        `A key security highlight is that all retail deposits (savings accounts, fixed deposits, and recurring deposits) are insured up to a maximum threshold of ₹5 Lakhs per depositor under the Deposit Insurance and Credit Guarantee Corporation (DICGC) scheme. This robust government-backed coverage ensures that your wealth remains completely insulated against macroeconomic fluctuations, matching the security standards of leading public and private sector banks.`
      ]
    },
    {
      title: `Digital Banking Infrastructures: Safe Domestic Clearing & Dispute Matrices`,
      content: [
        `Operational efficiency under **${readableName}** is driven by state-of-the-art digital architectures. The bank operates safe domestic clearing networks enabling 24/7 money transfers via IMPS, NEFT, and RTGS channels. Protected by multi-factor authentication, SSL/TLS 256-bit encryption keys, and dynamic transaction OTPs, online banking operations are shielded against unauthorized database queries or middleman frauds.`,
        `Furthermore, to guarantee complete resident protection, the bank implements a transparent, multi-level Grievance Redressal Escalation Matrix. If you face online transaction failures or service delays, you can escalate your concerns through designated nodal officers up to the central Principal Nodal Officer in Mumbai, or file direct appeals with the RBI Banking Ombudsman under a strict 30-day resolution SLA.`
      ]
    },
    {
      title: `Asset & Liability Optimization: High FD Yields and Low-Interest Borrowing Slabs`,
      content: [
        `From a personal wealth perspective, Abhyudaya Bank's structured financial products under the **${readableName}** ledger provide highly optimized yields and borrower advantages. Co-operative banking models consistently offer highly competitive fixed deposit yields (with senior citizen bonus rates stepping up by an additional 0.50% p.a.) compounding quarterly to maximize maturity gains.`,
        `Simultaneously, Abhyudaya's borrowing portals offer attractive low reducing interest rates on Personal, Business (MSME Mudra schemes up to ₹10 Lakhs collateral-free), and Home Loans. Salaried government personnel and established business owners qualify for expedited biometric verifications and special processing fee waivers. Settle your accounts with absolute confidence by comparing active rates on BanksCart's dashboards.`
      ]
    }
  ];
};

const generateBankFallbackContent = (slug: string, pathname: string): AbhyudayaPageContent => {
  const isAllahabad = pathname.includes('allahabad');
  const isAndhra = pathname.includes('andhra');
  
  const bankName = isAllahabad 
    ? "Allahabad Bank (merged with Indian Bank)" 
    : (isAndhra ? "Andhra Bank (merged with Union Bank of India)" : "Scheduled Commercial Bank");
  
  let pageTitle = `${bankName} Information Portal`;
  let pageIntro = `Access comprehensive digital resources, interest rate indices, and banking facilities for ${bankName}. Get instant access to online Net Banking registration, branch timings, and customer support.`;
  let badgeLabel = "Official Financial Guide";
  
  let highlights = [
    { label: "Direct Sovereign safety", text: `Insured up to ₹5 Lakhs by DICGC under Reserve Bank of India (RBI) mandates.` },
    { label: "Rapid Digital Payments", text: "Execute secure 24/7 transfers via IMPS, NEFT, and RTGS clearing pipelines." },
    { label: "Multi-Tier Nodal Ombudsman", text: "Robust customer dispute protection systems adhering to strict SLA resolutions." }
  ];
  
  let ratesTitle = `${bankName} Active Rate Benchmarks`;
  let ratesHeaders = ["Financial Parameter", "Retail Rates & Charges", "Terms & Details"];
  let ratesRows = [
    ["Savings Account Deposits", "3.00% - 4.00% p.a.", "Compounded quarterly, minimum balance waivers apply"],
    ["Fixed Deposit Slabs (1 Year)", "6.80% - 7.30% p.a.", "Additional 0.50% p.a. yield bonus for Senior Citizens"],
    ["Personal Loan Interest", "Starting at 10.40% p.a.", "Based on CIBIL score, tenures up to 84 months"],
    ["Home Loan Base Slabs", "Starting at 8.75% p.a.", "Floating external benchmark linked credit lines"],
    ["Business / Mudra Loans", "Starting at 11.50% p.a.", "100% collateral-free government support up to ₹10 Lakhs"]
  ];
  
  let checklistTitle = "Core Online Banking Guidelines";
  let checklist = [
    "Locate active IFSC codes: Post-merger, ensure you use the updated Indian Bank (for Allahabad) or Union Bank (for Andhra) IFSC digits.",
    "Verify transaction limits: Mobile banking and online wallets carry daily transaction limits capped at ₹1 Lakh to ₹5 Lakhs.",
    "Maintain balance slabs: Ensure your average quarterly balance satisfies branch MAB requirements to prevent penalty deductions."
  ];

  let faqs = [
    { q: `Has ${isAllahabad ? 'Allahabad Bank' : 'Andhra Bank'} been merged?`, a: `Yes. Under the government's consolidation directive, ${isAllahabad ? 'Allahabad Bank was merged into Indian Bank' : 'Andhra Bank was merged into Union Bank of India'} with effect from April 1, 2020. All branches, customers, and operations are now fully backed by the parent institution.` },
    { q: "Are old cheque books and passbooks still valid?", a: "No. Customers must obtain new cheque books, debit cards, and passbooks containing the updated IFSC codes and account structures from their parent bank branches." },
    { q: "Is checking branch details on BanksCart secure?", a: "Yes. Searching and comparing interest rates, forms, or branch timings on BanksCart is 100% secure and free of cost." }
  ];

  // Specific path overrides
  if (pathname.includes('timings')) {
    pageTitle = `${bankName} Branch Timings & Working Hours`;
    pageIntro = `Verify the active operational schedules, cash transaction timings, and locker room hours for ${bankName} branches nationwide. Plan your branch visits with verified weekly calendars.`;
    badgeLabel = "Branch timings";
    ratesTitle = "Branch Operational Calendar";
    ratesHeaders = ["Day / Slot Category", "Working Hours", "Locker Room access Slots"];
    ratesRows = [
      ["Standard Weekdays (Mon - Fri)", "10:00 AM - 4:00 PM", "10:00 AM - 4:00 PM (Uninterrupted)"],
      ["Lunch Time Break", "1:00 PM - 2:00 PM (Rotational shifts)", "Locker lobby remains accessible"],
      ["Rotational Saturdays (1st, 3rd, 5th)", "10:00 AM - 4:00 PM", "10:00 AM - 1:00 PM"],
      ["Sundays & Public Holidays", "Strictly Closed", "Not Accessible"]
    ];
    checklistTitle = "Guidelines for Branch Visitors";
    checklist = [
      "Avoid peak hours: Visit between 10:00 AM and 11:30 AM to bypass peak rush periods for immediate services.",
      "Carry original physical IDs: Aadhaar or PAN is mandatory for physical cash withdrawals exceeding ₹50,000.",
      "Check Saturday schedules: Ensure the Saturday of your visit is a working Saturday (2nd and 4th Saturdays are closed)."
    ];
    faqs = [
      { q: "Is the bank branch open during lunch hours?", a: "Yes. While employees take lunch between 1:00 PM and 2:00 PM, the bank operates rotational counter shifts to ensure customer service remains active." },
      { q: "Are locker rooms accessible on half-days?", a: "Locker rooms are accessible during working Saturday half-days until 1:00 PM. Lockers cannot be accessed on closed Saturdays or holidays." }
    ];
  } else if (pathname.includes('balance-enquiry') || pathname.includes('balance-enquiry-number')) {
    const balanceNum = isAllahabad ? "1800 5722 000" : "092230 08586";
    const missCallNum = isAllahabad ? "092241 50150" : "092230 08586";
    pageTitle = `${bankName} Balance Enquiry: Missed Call & SMS Helplines`;
    pageIntro = `Check your active account balance in seconds. ${bankName} provides safe missed call banking, SMS checkouts, and mobile banking utilities to audit your funds instantly without visiting branches.`;
    badgeLabel = "Balance Enquiry";
    ratesTitle = "Instant Balance Enquiry Channels";
    ratesHeaders = ["Channel Name", "Helpline Number", "SMS Syntax / Action Required"];
    ratesRows = [
      ["Missed Call Banking", missCallNum, "Give a missed call; system will auto-hang up and send SMS balance"],
      ["Toll-Free Phone Banking", balanceNum, "Call from registered mobile, select language, enter 4-digit PIN"],
      ["SMS balance Alert", isAllahabad ? "BAL <Account Num> to 9224150150" : "BAL <Account Num> to 9223008586", "Standard SMS charges apply"],
      ["WhatsApp Banking", isAllahabad ? "8447718000" : "9223008586", "Send 'Hi' to start encrypted secure chat session"]
    ];
    checklist = [
      "Register mobile number: Balance enquiry tools strictly require your mobile number to be linked to your account.",
      "Verify zero call costs: Missed call and WhatsApp banking channels are 100% free of charge.",
      "Security alert: The bank will never send SMS links asking for login passwords, debit card PINs, or UPI OTPs."
    ];
    faqs = [
      { q: "Why am I not receiving the balance SMS?", a: "Ensure your mobile number is registered with your bank account and you have active mobile reception. If recently merged, verify that your registration has migrated to the parent system." }
    ];
  } else if (pathname.includes('customer-care') || pathname.includes('customer-care-number')) {
    const careNum = isAllahabad ? "1800 180 2222" : "1800 22 22 44";
    pageTitle = `${bankName} Customer Care: Toll-Free Support Directories`;
    pageIntro = `Resolve bank account issues instantly. Reach out to verified customer care executives, block stolen debit cards, report unauthorized online transactions, or track complaints.`;
    badgeLabel = "Customer Care";
    ratesTitle = "Toll-Free Helplines Directory";
    ratesHeaders = ["Support Category", "Helpline Number", "Dedicated Support Email"];
    ratesRows = [
      ["General Banking Enquiries", careNum, isAllahabad ? "nodalofficer@indianbank.co.in" : "nodalofficer@unionbankofindia.bank"],
      ["24/7 Lost Card Hotlisting", isAllahabad ? "1800 425 00 000" : "1800 22 22 44", isAllahabad ? "carddivision@indianbank.co.in" : "carddivision@unionbankofindia.bank"],
      ["Digital Banking & NetBanking", isAllahabad ? "1800 180 2222" : "1800 22 22 44", "ebanking-support@parentbank.com"],
      ["Principal Nodal Ombudsman", isAllahabad ? "044-2813 4300" : "022-2289 2000", "ombudsman@parentbank.com"]
    ];
    faqs = [
      { q: "How long does it take to block a stolen debit card?", a: "Cards are hotlisted instantly. The automated IVR line or missed call blocking services disable card swipes immediately upon notification to prevent fraudulent charges." }
    ];
  } else if (pathname.includes('rtgs-form') || pathname.includes('neft-form')) {
    const formType = pathname.includes('rtgs-form') ? "RTGS Form" : "NEFT Form";
    pageTitle = `${bankName} ${formType}: PDF Download & Transaction Guides`;
    pageIntro = `Download the official physical bank branch challan form to execute secure, high-value domestic payments via RTGS or NEFT. Review the required details and zero online transaction fee structures.`;
    badgeLabel = formType;
    ratesTitle = "Transfer Limits & Slabs";
    ratesHeaders = ["Transfer Channel", "Minimum Limit", "Maximum Limit", "Average Processing Speed"];
    ratesRows = [
      ["NEFT (National Electronic)", "₹1 (No minimum)", "No upper limit (Branch limits apply)", "Batch clearing every 30 minutes"],
      ["RTGS (Real-Time Gross)", "₹2,00,000", "No upper limit", "Settled instantly in real-time gross logs"],
      ["Online NetBanking Transfer", "₹1", "Up to ₹10 Lakhs - ₹25 Lakhs daily", "Instant settlements via UPI / IMPS / NEFT"]
    ];
    checklist = [
      "Verify beneficiary details: Enter the exact beneficiary name, bank name, account number, and post-merger IFSC code.",
      "Check transaction charges: Online NEFT and RTGS are 100% free of charge under RBI guidelines. Branch transactions carry nominal processing fees.",
      "Match signatures: Physical forms submitted at branches require signatures matching the bank's active records."
    ];
  } else if (pathname.includes('car-loan') || pathname.includes('education-loan') || pathname.includes('gold-loan') || pathname.includes('kisan-credit-card') || pathname.includes('mudra-loan') || pathname.includes('fixed-deposits')) {
    let loanType = "Retail Credit Scheme";
    let loanRates = "Starting at 8.50% p.a.";
    if (pathname.includes('car-loan')) {
      loanType = "Car Loan (Vehicle Finance)";
      loanRates = "Starting at 8.75% p.a.";
    } else if (pathname.includes('education-loan')) {
      loanType = "Education Loan (Higher Studies)";
      loanRates = "Starting at 9.15% p.a.";
    } else if (pathname.includes('gold-loan')) {
      loanType = "Gold Loan (Secured Credit)";
      loanRates = "Starting at 7.50% p.a. (Subsidized)";
    } else if (pathname.includes('kisan-credit-card')) {
      loanType = "Kisan Credit Card (Crop Loan)";
      loanRates = "Starting at 4.00% p.a. (Subsidized)";
    } else if (pathname.includes('mudra-loan')) {
      loanType = "Mudra Loan (MSME Finance)";
      loanRates = "Starting at 9.99% p.a. (Collateral-Free)";
    } else if (pathname.includes('fixed-deposits')) {
      loanType = "High-Yield Fixed Deposit";
      loanRates = "Up to 7.25% p.a.";
    }

    pageTitle = `${bankName} ${loanType}: Rates, Eligibility & Apply`;
    pageIntro = `Grow your investments or secure affordable credit with ${bankName}'s specialized ${loanType}. Benefit from low reducing interest rates, flexible tenures, and paperless digital documentation features.`;
    badgeLabel = loanType;
    ratesTitle = `${loanType} Structured Slabs`;
    ratesHeaders = ["Lending Tier / Parameter", "Applicable Rates (p.a.)", "Key Highlights & Tenures"];
    ratesRows = [
      ["Standard Rate Bracket", loanRates, "Based on CIBIL score and stable income profiles"],
      ["Special Senior Citizen yield", pathname.includes('fixed-deposits') ? "Extra 0.50% p.a." : "N/A", "Applicable to Indian residents aged 60 and above"],
      ["Maximum Repayment Tenure", pathname.includes('fixed-deposits') ? "10 Years" : "Up to 84 Months", "Flexible tenures to match monthly cash flows"],
      ["Processing Fee Waiver", "Up to 100% waiver", "Available during seasonal promotional periods"]
    ];
  } else if (pathname.includes('account-number')) {
    pageTitle = `${bankName} Account Number: Formats & Digit Structures`;
    pageIntro = `Understand the numeric structure of your ${bankName} account number. Locate your active account digits on passbooks, checkbooks, or net banking portals easily.`;
    badgeLabel = "Account Structure";
    ratesTitle = "Numeric Formats Comparison";
    ratesHeaders = ["Account Category", "Account Number Format", "IFSC Prefix post-Merger"];
    ratesRows = [
      ["Allahabad Retail Savings", "11 Digits (e.g. 50400000000)", "IDIB000ALLA (Indian Bank)"],
      ["Andhra Bank Retail Savings", "15 Digits (e.g. 012340000000000)", "UBIN0501234 (Union Bank)"],
      ["Current Accounts (Corporate)", "11 to 15 Digits", "Standard mapped parent IFSC codes"],
      ["Joint / Minor Accounts", "Same standard digit lengths", "Linked to branch central ledger accounts"]
    ];
  } else if (pathname.includes('net-banking') || pathname.includes('netbanking')) {
    pageTitle = `${bankName} Net Banking: Registration, Login & Safety`;
    pageIntro = `Access your bank account securely 24/7. Register for retail or corporate net banking, reset passwords online, transfer funds, or lock transaction limits instantly.`;
    badgeLabel = "Net Banking";
    checklistTitle = "Self-Registration Steps Guide";
    checklist = [
      "Visit the secure parent bank retail login page (Indian Bank or Union Bank).",
      "Click on 'New User Registration' and input your Account Number and registered Mobile Number.",
      "Authenticate your session with the high-security OTP sent to your phone and set up your login password.",
      "Verify your details using your active ATM/Debit Card details to enable online transaction privileges immediately."
    ];
  } else if (pathname.includes('passbook')) {
    pageTitle = `${bankName} Passbook: Physical Printing & e-Passbook Guides`;
    pageIntro = `Track your transaction ledger history cleanly. Learn how to update physical passbooks at automated kiosk machines, download e-Passbook PDFs, or view statements on mobile apps.`;
    badgeLabel = "Passbook";
  }

  return {
    title: pageTitle,
    badge: badgeLabel,
    intro: pageIntro,
    highlightsTitle: `${bankName} Core Pillars`,
    highlights,
    ratesTitle,
    ratesHeaders,
    ratesRows,
    checklistTitle,
    checklist,
    faqs
  };
};

const DynamicAbhyudayaBankPage: React.FC = () => {
  const { subPath } = useParams<{ subPath: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Map flat routes like /banking/abhyudaya-bank-net-banking to 'net-banking'
  let currentSlug = subPath || 'overview';
  if (location.pathname.includes('net-banking')) {
    currentSlug = 'net-banking';
  } else if (location.pathname.includes('timings')) {
    currentSlug = 'timings';
  }

  const isCustomBank = location.pathname.includes('allahabad') || location.pathname.includes('andhra') || location.pathname.includes('banking/andhra');

  const newPageData = getNewPageDetailedContent(location.pathname);

  const pageContent = newPageData
    ? {
        title: newPageData.title,
        badge: newPageData.badge,
        intro: newPageData.intro,
        moreIntro: newPageData.moreIntro,
        highlightsTitle: newPageData.highlightsTitle,
        highlights: newPageData.highlights,
        ratesTitle: newPageData.ratesTitle,
        ratesHeaders: newPageData.ratesHeaders,
        ratesRows: newPageData.ratesRows,
        checklistTitle: newPageData.checklistTitle,
        checklist: newPageData.checklist,
        faqs: newPageData.faqs
      }
    : (isCustomBank || !ABHYUDAYA_PAGE_MAP[currentSlug]
        ? generateBankFallbackContent(currentSlug, location.pathname)
        : (ABHYUDAYA_PAGE_MAP[currentSlug] || ABHYUDAYA_PAGE_MAP['overview']));

  const getCustomDetailedArticles = (slug: string, content: AbhyudayaPageContent): EditorialArticle[] => {
    const bankName = content.title.split(':')[0] || "Scheduled Bank";
    return [
      {
        title: `Regulatory Framework, Capital Reserves, and Security Parameters of ${bankName}`,
        content: [
          `Operating under strict Reserve Bank of India (RBI) guidelines, **${bankName}** provides robust capital safety and regulatory compliance for retail and corporate depositors. Under the Banking Regulation Act, the bank adheres to tight capital adequacy ratios (CAR), maintaining healthy liquidity coverage to shield depositor wealth from credit risk waves.`,
          `Additionally, all retail deposit accounts (savings accounts, fixed deposits, and recurring deposits) are protected up to a maximum limit of ₹5 Lakhs per customer under the Deposit Insurance and Credit Guarantee Corporation (DICGC) scheme. This sovereign safety lock matches the security parameters of premier nationalized and private banks, offering peace of mind.`
        ]
      },
      {
        title: `Advanced Encrypted Digital Infrastructures & Fraud Protections`,
        content: [
          `Modern financial security requires robust digital defense protocols. Accessing digital services, processing IMPS/NEFT transfers, or registering for net banking under **${bankName}** is shielded by state-of-the-art security architectures, including SSL/TLS 256-bit encryption layers, tokenized database authorizations, and real-time transaction SMS notification systems.`,
          `The central bank and parent banks strictly enforce multi-factor authentication (MFA) and dynamic OTP verifications for all digital transactions. Furthermore, to protect consumers, the bank enforces secure e-mandates and transparent grievance resolution frameworks, ensuring any unauthorized digital payments are halted and reversed under RBI ombudsman safety rules.`
        ]
      },
      {
        title: `Asset and Liability Optimization: Low Interest Loans and High Yields`,
        content: [
          `Optimizing your financial balance sheet is simple by comparing **${bankName}** lending and investment offerings side-by-side on BanksCart. Lenders offer highly attractive reducing interest rates on Personal, Car, and Education Loans, with special interest waivers and subsidized slabs for farmers (Kisan Credit Cards) and micro enterprises (Mudra Loans).`,
          `Simultaneously, savings deposits and fixed deposit portfolios yield highly competitive compounding returns (with bonus rate slabs of +0.50% p.a. for senior citizens). Consistently updating your KYC details and maintaining a strong credit score (750+ CIBIL) ensures you qualify for the lowest rates and rapid, paperless processing entirely online.`
        ]
      }
    ];
  };

  const detailedArticles = newPageData?.detailedArticles
    ? newPageData.detailedArticles
    : (isCustomBank || !ABHYUDAYA_PAGE_MAP[currentSlug]
        ? getCustomDetailedArticles(currentSlug, pageContent)
        : getAbhyudayaDetailedArticles(currentSlug));

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveFaq(null);
  }, [subPath, location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section with Co-operative Emerald Theme */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <span className="text-[180px] font-black leading-none select-none">ABHYUDAYA</span>
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              {pageContent.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-6 tracking-tight leading-tight">
              {pageContent.title}
            </h1>
            <p className="text-emerald-100 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl font-medium font-sans">
              {pageContent.intro}
            </p>
          </div>
        </div>

        {/* 2-Column responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Rich Articles, Comparison Tables */}
          <div className="lg:col-span-7 space-y-10 text-slate-700">
            
            {/* More Intro details */}
            {pageContent.moreIntro && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                <p className="text-sm text-slate-650 leading-relaxed font-sans font-medium text-justify">
                  {pageContent.moreIntro}
                </p>
              </div>
            )}

            {/* Detailed Editorial Sections - Rich Data like the Zero Coupon Bonds Sample */}
            {detailedArticles.length > 0 && (
              <div className="space-y-8">
                {detailedArticles.map((art, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
                      {art.title}
                    </h3>
                    {art.content.map((p, pIdx) => (
                      <p key={pIdx} className="text-slate-600 text-sm leading-relaxed font-sans font-medium text-justify">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Core Highlights highlights */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
                {pageContent.highlightsTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {pageContent.highlights.map((feat, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-xl p-4 hover:border-emerald-100 hover:bg-emerald-50/10 transition-colors">
                    <h4 className="font-bold text-slate-800 text-sm mb-2">{feat.label}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{feat.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison table */}
            {pageContent.ratesRows && pageContent.ratesHeaders && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4">{pageContent.ratesTitle}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        {pageContent.ratesHeaders.map((header, idx) => (
                          <th key={idx} className="p-3 font-semibold text-slate-700">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pageContent.ratesRows.map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50">
                          <td className="p-3 font-bold text-slate-800 flex items-center gap-2">
                            <Landmark className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            {row[0]}
                          </td>
                          <td className="p-3 font-semibold text-emerald-600">{row[1]}</td>
                          <td className="p-3 text-slate-500">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Step checklist details */}
            {pageContent.checklist && pageContent.checklistTitle && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6">{pageContent.checklistTitle}</h3>
                <div className="space-y-4">
                  {pageContent.checklist.map((tip, idx) => (
                    <div key={idx} className="flex gap-4 items-start pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                      <div className="w-6 h-6 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-semibold">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Simulation Panel */}
            <div className="bg-gradient-to-br from-emerald-950 to-slate-950 rounded-3xl text-white p-6 sm:p-8 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                Abhyudaya Online Interest Yield Checker
              </h3>
              <p className="text-xs text-emerald-200 mb-6 font-sans">Simulate fixed deposits and savings compounding instantly</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Regular Savings</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans">3.50% p.a.<br />Daily Balance Yields</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Percent className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Short-Term FD</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans">6.25% p.a.<br />180 Days Lock-in</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Play className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Long-Term FD</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans">7.25% p.a.<br />Senior Citizen Bonus</p>
                </div>
              </div>
            </div>

            {/* FAQs Accordion Block */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {pageContent.faqs.map((faq, index) => (
                  <div key={index} className="border border-slate-100 rounded-xl overflow-hidden transition-colors">
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="w-full flex justify-between items-center p-4 bg-slate-50/50 hover:bg-slate-50 text-left font-bold text-slate-700 text-sm outline-none transition-colors"
                    >
                      {faq.q}
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-emerald-600' : ''}`} />
                    </button>
                    {activeFaq === index && (
                      <div className="p-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100 bg-white leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Cibil lead form */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <CibilCheckerForm sourcePage={`${pageContent.title} Portal`} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default DynamicAbhyudayaBankPage;
