import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HelpCircle, ChevronDown, Check, Star, ShieldAlert, Sparkles, BookOpen, AlertCircle, Info, Landmark, Percent, Award, ShieldCheck, ArrowRight, Play, MessageSquare, TrendingUp, CreditCard } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';

interface BusinessFAQ {
  q: string;
  a: string;
}

interface BusinessLenderRow {
  lender: string;
  rate: string;
  fees: string;
  turnaround: string;
}

interface BusinessPageContent {
  title: string;
  badge: string;
  intro: string;
  moreIntro?: string;
  highlightsTitle: string;
  highlights: { label: string; text: string }[];
  lendersTitle: string;
  lenders: BusinessLenderRow[];
  checklistTitle: string;
  checklist: string[];
  faqs: BusinessFAQ[];
}

const BUSINESS_LOAN_MAP: Record<string, BusinessPageContent> = {
  "5-lakh-business-loan": {
    title: "5 Lakh Business Loan: Collateral-Free MSME Capital",
    badge: "Micro Enterprise Growth",
    intro: "A ₹5 Lakh Business Loan is a highly accessible working capital loan tailored for micro, small, and medium enterprises (MSMEs). Being collateral-free, this credit facility helps local merchants, retail shop owners, and digital service providers meet small equipment purchases, clear supplier invoices, or manage seasonal inventory peaks.",
    moreIntro: "At BanksCart, we compare major lenders and registered NBFCs to match your business with the cheapest EMI products. With minimal paperwork and fully digital approvals, you can secure up to ₹5 Lakhs backed by leading SIDBI schemes and government guarantees in under 24 hours.",
    highlightsTitle: "Key Highlights of ₹5 Lakh Business Loans",
    highlights: [
      { label: "Zero Asset Collateral", text: "No property, gold, or inventory pledge required for eligible MSMEs." },
      { label: "Rapid Disbursal Slabs", text: "Approval is fast-tracked online and funds are cleared in 24 to 48 hours." },
      { label: "Flexible EMI Tenure", text: "Repay comfortably over extended periods ranging from 12 to 36 months." }
    ],
    lendersTitle: "Compare Top ₹5 Lakh Business Loan Lenders",
    lenders: [
      { lender: "HDFC Bank (SmartBusiness)", rate: "15.00% - 19.50% p.a.", fees: "Up to 1.50%", turnaround: "24 Hours" },
      { lender: "ICICI Bank (MSME Quick)", rate: "15.50% - 21.00% p.a.", fees: "Flat ₹5,000", turnaround: "24 Hours" },
      { lender: "Tata Capital Business", rate: "16.00% - 24.00% p.a.", fees: "Up to 2.00%", turnaround: "48 Hours" },
      { lender: "Fullerton India", rate: "16.50% - 26.00% p.a.", fees: "Up to 2.50%", turnaround: "48 Hours" }
    ],
    checklistTitle: "Mandatory Document Checklist for Fast Approvals",
    checklist: [
      "Keep KYC Ready: Submit your Aadhaar card and business PAN card.",
      "Link Bank Statements: Keep past 6 months' primary business current account statement PDF ready.",
      "Submit Registration Proofs: Provide GST registration certificates, MSME Udyam details, or local trade licenses.",
      "Audited Finances (Optional): Keep past year's IT Returns ready to secure cheaper interest brackets."
    ],
    faqs: [
      { q: "What is the minimum turnover required for a ₹5 Lakh business loan?", a: "Most lenders look for an annual turnover of at least ₹10 Lakhs to ₹15 Lakhs for digital processing." },
      { q: "What is the minimum CIBIL score required?", a: "Lenders prefer a business owner CIBIL score of 680 and above. However, specialized micro-finance NBFCs approve loans for scores down to 600 with proof of stable sales." },
      { q: "Can I get this loan under government schemes?", a: "Yes. Loans up to ₹5 Lakhs are eligible for backing under the 'Pradhan Mantri MUDRA Yojana' (PMMY) - Kishore category, offering waived collateral requirements." },
      { q: "How long does it take for money to get disbursed?", a: "Digital credit platforms disburse approved funds within 24 to 48 hours after e-sign contract execution." },
      { q: "Are there foreclosure charges?", a: "Yes, standard foreclosure fees range from 2% to 4% of the outstanding balance. Some lenders allow free prepayment after 6 EMIs." },
      { q: "Do I need to submit a business project report?", a: "No. For loans under ₹5 Lakhs, traditional project reports are not required; lenders evaluate credit eligibility using bank statements." },
      { q: "Is joint applicant mandatory?", a: "No, but adding a co-applicant with a pristine CIBIL rating helps mitigate risk margins, leading to lower interest rates." },
      { q: "What is the processing fee?", a: "It is a one-time administrative fee (typically 1.5% to 2.5%) deducted by the bank from your approved loan principal." },
      { q: "Can new startup businesses apply?", a: "Lenders prefer businesses operating for at least 1 to 2 years. However, new startups can apply under specialized government credit guarantee trusts (CGTMSE)." },
      { q: "How are EMIs deducted?", a: "EMIs are automatically deducted monthly via secure e-NACH standing instructions set up on your primary current account." }
    ]
  },
  "10-lakh-business-loan": {
    title: "10 Lakh Business Loan: Compare MSME Working Capital Rates",
    badge: "Scale Up Capital",
    intro: "A ₹10 Lakh Business Loan is an essential scaling tool designed for small to medium enterprises. This collateral-free credit facility provides substantial capital to upgrade machinery, expand warehouse capacities, purchase bulk inventory, or fund payroll expansions.",
    moreIntro: "At BanksCart, we optimize your application flow by matching your credentials across prime national banks. By leveraging Udyam registrations and solid credit trails, we help you lock in competitive base rates, minimal processing drag, and convenient repayment tenures.",
    highlightsTitle: "Highlights of ₹10 Lakh Unsecured Capital",
    highlights: [
      { label: "High Credit Limit", text: "Secure up to ₹10 Lakhs without pledging commercial real estate or machinery." },
      { label: "Extended Tenures", text: "Repay comfortably over tenure slots ranging from 12 to 60 months." },
      { label: "CGTMSE Scheme Backing", text: "Eligible for sovereign guarantee backing, lowering default risks." }
    ],
    lendersTitle: "Compare Leading ₹10 Lakh Business Loan Rates 2026",
    lenders: [
      { lender: "State Bank of India (SBI)", rate: "12.50% - 15.75% p.a.", fees: "Nil to 1.00%", turnaround: "3 to 5 Days" },
      { lender: "HDFC Bank (Enterprise)", rate: "14.50% - 18.00% p.a.", fees: "Up to 1.50%", turnaround: "2 Days" },
      { lender: "ICICI Bank (MSME Growth)", rate: "14.75% - 19.00% p.a.", fees: "Flat ₹8,000", turnaround: "2 Days" },
      { lender: "Axis Bank (Quick Capital)", rate: "15.00% - 20.00% p.a.", fees: "Up to 2.00%", turnaround: "3 Days" }
    ],
    checklistTitle: "Required Documents checklist for High-Ticket Funding",
    checklist: [
      "Past 12 Months' Bank Statement: Submit PDFs of your active business current accounts.",
      "GST Return Records: Provide past 12 months' GST GSTR-3B filings.",
      "Income Tax returns (ITR): Past 2 years' ITR along with audited balance sheets.",
      "Udyam Registration Certificate: Provide your valid MSME certificate to unlock government interest concessions."
    ],
    faqs: [
      { q: "What is the interest rate for a ₹10 Lakh business loan?", a: "Unsecured business loan interest rates range between 12.50% and 21.00% p.a., determined by your credit score and company stability." },
      { q: "Is collateral compulsory for ₹10 Lakhs?", a: "No. Lenders offer 100% unsecured business loans up to ₹50 Lakhs. No gold, property, or equipment pledge is required." },
      { q: "What is the minimum CIBIL score required for ₹10 Lakhs?", a: "Banks strictly look for a CIBIL score of 700 and above. Digital lenders approve loans for scores above 650 with additional sales guarantees." },
      { q: "Can I get this under the MUDRA scheme?", a: "Yes. Loans of ₹10 Lakhs are eligible under the 'Tarun' category of Pradhan Mantri MUDRA Yojana." },
      { q: "Can the loan amount be repaid early?", a: "Yes. Foreclosure is allowed after a lock-in period (usually 12 months) with charges ranging from 2% to 4%." },
      { q: "What is a CGTMSE guarantee?", a: "It is a government credit guarantee scheme that acts as a collateral substitute, backing default risks for eligible MSMEs." },
      { q: "Is business vintage important?", a: "Yes. Lenders require a minimum active business vintage of 2 to 3 years in the same line of work." },
      { q: "Will delay in GST filing impact my loan?", a: "Yes. Consistently delayed tax filings indicate cash flow instability, increasing bank risk levels." },
      { q: "What are the common reasons for loan rejection?", a: "Common triggers include low credit scores, poor cash flows, high debt-to-income ratios, or missing tax certificates." },
      { q: "Can I apply online?", a: "Yes. The entire application, document upload, and contract e-sign are completed digitally via BanksCart." }
    ]
  },
  "business-expansion-loans": {
    title: "Business Expansion Loans: Strategic Finance for Scaling",
    badge: "Enterprise Acceleration",
    intro: "Business Expansion Loans are dedicated high-value credit lines tailored to finance major growth milestones. Whether opening new franchise outlets, acquiring competitor assets, upgrading high-tech plants, or executing bulk international purchases, expansion financing provides the leverage required to scale your business.",
    moreIntro: "Unlike basic working capital loans which cover short-term operational deficits, expansion loans feature larger principal amounts, customized repayment tenure plans, and competitive interest brackets linked directly to corporate performance metrics.",
    highlightsTitle: "Core Expansion Financing Pillars",
    highlights: [
      { label: "High Loan Quantities", text: "Secure up to ₹1 Crore in unsecured capital or higher based on asset collaterals." },
      { label: "Dynamic Term Slabs", text: "Repay comfortably over structured long-term tenures extending up to 7 years." },
      { label: "Interest Rate Reductions", text: "Large corporate expansions qualify for optimized baseline rate markups." }
    ],
    lendersTitle: "Top Enterprise Expansion Loan Programs",
    lenders: [
      { lender: "HDFC Enterprise Loans", rate: "13.50% - 17.50% p.a.", fees: "Up to 1.00%", turnaround: "3 to 5 Days" },
      { lender: "SBI Asset Expansion", rate: "11.75% - 14.50% p.a.", fees: "Up to 1.00%", turnaround: "7 to 10 Days" },
      { lender: "ICICI Business Term", rate: "13.99% - 18.00% p.a.", fees: "Up to 1.50%", turnaround: "3 to 5 Days" },
      { lender: "Axis Corporate Lending", rate: "14.00% - 18.50% p.a.", fees: "Up to 1.50%", turnaround: "5 Days" }
    ],
    checklistTitle: "Essential Pre-requisites for Expansion Approvals",
    checklist: [
      "Prepare Growth Project Plan: Submit a detailed business plan outlining the expected ROI from the expansion.",
      "Audited Accounts: Provide audited balance sheets and P&L accounts for the past 3 fiscal years.",
      "GST & Sales logs: Past 2 years' dynamic sales ledgers showing consistent growth patterns.",
      "Corporate Registrations: Provide board resolutions, partnership deeds, or MOA details."
    ],
    faqs: [
      { q: "What is a Business Expansion Loan?", a: "A specialized long-term business loan designed specifically to fund growth initiatives like branch rollouts or machinery upgrades." },
      { q: "What is the maximum loan limit?", a: "Unsecured expansion loans are capped at ₹50 Lakhs to ₹1 Crore. Secured options backing properties or machinery extend up to ₹10 Crores." },
      { q: "Is a detailed project report mandatory?", a: "Yes. For high-ticket expansion requests, banks strictly require a project report outlining financial feasibility and payback structures." },
      { q: "What are the eligibility criteria?", a: "Applicants must show profitable operations for at least 3 years, a CIBIL score above 720, and annual sales exceeding ₹50 Lakhs." },
      { q: "Are interest rates on term loans reducing?", a: "Yes. All term loans leverage a Reducing Balance calculation, saving money compared to flat rates." },
      { q: "Can I use expansion funds to pay off old debts?", a: "No. Expansion loans are monitored closely and funds must be utilized strictly for the designated scaling project." },
      { q: "What are the available tenure options?", a: "Tenure options range from 3 years to 7 years, allowing low EMI structures for capital intensive projects." },
      { q: "Does the bank verify business sites?", a: "Yes. Lenders conduct physical site verifications and asset evaluations before clearing final disbursements." },
      { q: "What is the advantage of secured term loans?", a: "Securing the loan with commercial real estate drops interest rates by 2% to 4% p.a. compared to unsecured loans." },
      { q: "Can I get a holiday period/moratorium?", a: "Yes. For greenfield asset expansions, select banks offer a 3 to 6-month EMI holiday period during installation cycles." }
    ]
  },
  "courier-business-plan": {
    title: "Courier Business Plan Guide: Dynamic Operations & Funding Slabs",
    badge: "Logistics Blueprint",
    intro: "Starting a dynamic courier and logistics business in India is a highly lucrative venture. Driven by the rapid boom in e-commerce, the demand for fast, last-mile parcel delivery is at an all-time high. This blueprint outlines the operations parameters, franchise models, capital structures, and dynamic loan plans required to succeed.",
    moreIntro: "A professional Courier Business Plan is essential to secure bank financing. Banks evaluate your franchise partnerships (like DTDC, Blue Dart, or Delhivery), local vehicle fleet size, office infrastructure setups, and projected delivery volumes to approve commercial loans.",
    highlightsTitle: "Logistics Investment & Setup Slabs",
    highlights: [
      { label: "Franchise Deposit", text: "Secure dynamic franchise contracts with top national networks for deposits between ₹50,000 and ₹2 Lakhs." },
      { label: "Vehicle Fleet Purchase", text: "Finance commercial delivery cargo vans or two-wheelers through low-rate vehicle loans." },
      { label: "Delivery Software Setup", text: "Deploy automated parcel tracking, barcode scanners, and inventory management suites." }
    ],
    lendersTitle: "Top Business Loans for Logistics & Franchises",
    lenders: [
      { lender: "ICICI Bank (Logistics Plus)", rate: "14.50% - 18.50% p.a.", fees: "Up to 1.50%", turnaround: "48 Hours" },
      { lender: "HDFC Commercial Vehicle", rate: "9.50% - 12.00% p.a.", fees: "Up to 1.00%", turnaround: "3 Days" },
      { lender: "SBI MSME Franchise Loan", rate: "12.00% - 15.00% p.a.", fees: "Nil to 1.00%", turnaround: "7 Days" },
      { lender: "Tata Capital Equipment", rate: "15.00% - 22.00% p.a.", fees: "Up to 2.00%", turnaround: "48 Hours" }
    ],
    checklistTitle: "Core Operations Setup Checklist",
    checklist: [
      "Select Franchise Model: Choose between a local retail booking hub or a high-volume delivery center.",
      "Register Business Entity: Form a Partnership, LLP, or OPC, and obtain your business PAN card.",
      "Acquire Trade Licenses: Apply for Shop & Establishment licenses and GST registrations.",
      "Draft Financial Plan: Outline initial security deposits, warehouse rent, fleet EMI, and payroll costs."
    ],
    faqs: [
      { q: "How much investment is needed to start a courier business?", a: "Setting up a local booking franchise requires ₹1.5 Lakhs to ₹3 Lakhs. Large-scale delivery hubs require investments from ₹5 Lakhs to ₹15 Lakhs." },
      { q: "Can I get a loan to buy courier vehicles?", a: "Yes. Lenders offer dedicated commercial vehicle loans covering up to 90% to 100% of the on-road price for delivery vans." },
      { q: "Which are the best courier franchises to partner with?", a: "Leading choices in India include DTDC, Blue Dart, Professional Couriers, Delhivery, and DHL." },
      { q: "What is the profit margin in a logistics business?", a: "Franchisees earn 20% to 35% commission on booking volumes and dynamic fixed rates per package delivered." },
      { q: "Do I need a GST registration immediately?", a: "Yes. GST registration is compulsory for inter-state service providers and logistics businesses." },
      { q: "What security is required for a commercial loan?", a: "MUDRA loans up to ₹10 Lakhs are completely collateral-free. Larger fleet term loans are secured against the purchased vehicles." },
      { q: "How does logistics technology help?", a: "Automated tracking software reduces package losses, tracks delivery agent timelines, and improves client conversions." },
      { q: "What is the average tenure for logistics loans?", a: "Vehicle loans range from 3 to 7 years; working capital business term loans are typically 1 to 3 years." },
      { q: "Is insurance compulsory for courier startups?", a: "Yes. Marine and transit insurance is critical to protect your business against parcel damages or vehicle thefts." },
      { q: "How do I apply for a MUDRA loan for courier services?", a: "Prepare your business plan, estimate vehicle quotes, obtain your Udyam certificate, and submit the Mudra form online via BanksCart." }
    ]
  }
};

interface EditorialArticle {
  title: string;
  content: string[];
}

const getBusinessLoanDetailedArticles = (slug: string): EditorialArticle[] => {
  const formatSlug = (s: string) => s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const readableName = formatSlug(slug);

  return [
    {
      title: `MSME Scale and Growth: Leveraged Unsecured Funding under ${readableName}`,
      content: [
        `Maintaining optimal working capital levels and scaling active business capacity is a primary operational requirement for micro, small, and medium enterprises (MSMEs). Under the broader category of **${readableName}**, registered business entities can secure high-fidelity commercial loans completely collateral-free. Traditional banking channels historically demanded physical asset pledges (like commercial property deeds, factory assets, or gold reserves) before clearing business credit lines, leaving young firms capital-starved.`,
        `Modern commercial banking systems and registered NBFCs bypass these physical bottlenecks by leveraging cash-flow based credit evaluations. By comparing commercial loan products side-by-side on BanksCart, SME owners can evaluate reducing interest rate slabs (starting from competitive margins), upfront processing fees, and convenient tenure plans to match their dynamic sales patterns.`
      ]
    },
    {
      title: `Term Loans vs Cash Credits: Choosing the Optimal ${readableName} Mechanism`,
      content: [
        `Selecting the correct commercial credit model under **${readableName}** is vital to ensure long-term treasury health. Business owners must distinguish between structured Term Loans and revolving Cash Credit (CC) or Overdraft limits. A term loan provides a lump-sum payout to purchase manufacturing equipment, office assets, or expand infrastructure, which is then repaid under scheduled monthly EMIs.`,
        `Conversely, a Cash Credit account allows businesses to draw funds up to a approved overdraft limit based on active inventory levels and book debts. CC interest is computed strictly on the used amount, making it the perfect vehicle to handle seasonal inventory spikes or bridge short-term cash deficits from debtors.`
      ]
    },
    {
      title: `CGTMSE Guarantee and Mudra Scheme Slabs: Sovereign Collateral Substitutes`,
      content: [
        `To encourage retail micro-enterprise lending, the Government of India has introduced several sovereign credit guarantee schemes that act as collateral substitutes under the **${readableName}** catalog. The CGTMSE (Credit Guarantee Fund Trust for Micro and Small Enterprises) backs default risks for unsecured loans up to ₹50 Lakhs, providing essential lender confidence.`,
        `Additionally, first-generation entrepreneurs can tap into the Pradhan Mantri MUDRA Yojana, offering tailored credit tiers under Shishu (up to ₹50,000), Kishore (₹50,001 to ₹5 Lakhs), and Tarun (₹5 Lakhs to ₹10 Lakhs) categories to scale courier networks, retail hubs, and digital startup firms safely.`
      ]
    },
    {
      title: `Securing Low-Rate Clearances: Bank Statements & GST Audit Guidelines`,
      content: [
        `To lock in the cheapest interest rates and fast approvals for **${readableName}**, organizing a clean financial package is essential. Lenders audit your primary business current account bank statements for the past 6 to 12 months, checking for consistent cash balances and looking for unpaid direct debits or cheque bounces.`,
        `Providing valid GST filings (GSTR-3B) and active Udyam MSME certificates directly proves sales stability, reducing bank credit risk margins and speeding up e-sign payouts under 48 hours.`
      ]
    }
  ];
};

const DynamicBusinessLoanPage: React.FC = () => {
  const { subPath } = useParams<{ subPath: string }>();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Fallback dynamic generator to handle any sub-path dynamically
  const generateFallbackContent = (slug: string): BusinessPageContent => {
    const readableTitle = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      title: `${readableTitle}: Compare Collateral-Free Enterprise Loans`,
      badge: "SME Credit Solutions",
      intro: `A **${readableTitle}** is a highly optimized business finance product designed to assist growing enterprises with immediate working capital, machinery financing, or operational liquidity under competitive terms.`,
      moreIntro: "At BanksCart, we work closely with nationalized banks and NBFC partners to streamline your commercial application process. By auditing your business vintage and credit parameters, we secure the cheapest rates and minimal paperwork requirements.",
      highlightsTitle: "Highlights of Unsecured Business Credit",
      highlights: [
        { label: "No Collateral Required", text: "Secure active financing without pledging valuable commercial real estate or home assets." },
        { label: "Flexible Tenure Slabs", text: "Choose customizable repayment slabs extending comfortably from 12 to 60 months." },
        { label: "Rapid Processing Slabs", text: "Benefit from digitized database underwriting with turnaround limits under 48 hours." }
      ],
      lendersTitle: "Compare Top Commercial Lenders",
      lenders: [
        { lender: "HDFC Bank (Commercial)", rate: "14.50% - 19.00% p.a.", fees: "Up to 1.50%", turnaround: "24-48 Hours" },
        { lender: "SBI MSME Loans", rate: "12.00% - 15.50% p.a.", fees: "Nil to 1.00%", turnaround: "3-5 Days" },
        { lender: "ICICI Bank (MSME)", rate: "14.75% - 20.00% p.a.", fees: "Flat ₹7,500", turnaround: "24 Hours" },
        { lender: "Axis Quick SME", rate: "15.00% - 21.00% p.a.", fees: "Up to 2.00%", turnaround: "48 Hours" }
      ],
      checklistTitle: "Mandatory Document Checklist",
      checklist: [
        "Aadhaar & Business PAN Card: Crucial for identity and credit bureau evaluation.",
        "Primary Business Bank statement: Submit PDFs of past 6 months' dynamic current account transactions.",
        "Sales Records: Keep past 12 months' dynamic GST returns (GSTR-3B) ready.",
        "MSME Registration: Provide your Udyam Certificate to qualify for special corporate concessions."
      ],
      faqs: [
        { q: `What is a ${readableTitle}?`, a: `It is a dedicated commercial credit product designed to fund working capital requirements, equipment upgrades, or general business expansion.` },
        { q: "What is the minimum CIBIL score required for approval?", a: "Lenders look for a score of 680 and above. Higher scores unlock lower base interest rate bands." },
        { q: "Do I need to submit physical assets as collateral?", a: "No. Unsecured commercial term loans are issued 100% collateral-free." },
        { q: "How long does it take for funds to clear?", a: "Digital approvals clear in 24 to 48 hours after your digital agreement is signed via Aadhaar OTP." }
      ]
    };
  };

  const currentSlug = subPath || 'overview';
  const pageContent = BUSINESS_LOAN_MAP[currentSlug] || generateFallbackContent(currentSlug);
  const detailedArticles = getBusinessLoanDetailedArticles(currentSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveFaq(null);
  }, [subPath]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Banner section */}
        <div className="bg-gradient-to-r from-blue-800 via-indigo-900 to-blue-900 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <span className="text-[180px] font-black leading-none select-none">GROWTH</span>
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              {pageContent.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-6 tracking-tight leading-tight">
              {pageContent.title}
            </h1>
            <p className="text-blue-100 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl font-medium font-sans">
              {pageContent.intro}
            </p>
          </div>
        </div>

        {/* 2-Column responsive split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Rich Articles, Comparison Tables */}
          <div className="lg:col-span-7 space-y-10 text-slate-700">
            
            {/* More Intro details */}
            {pageContent.moreIntro && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                <p className="text-sm text-slate-650 leading-relaxed font-sans font-medium">
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
                      <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
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
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                {pageContent.highlightsTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {pageContent.highlights.map((feat, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-xl p-4 hover:border-blue-100 hover:bg-blue-50/10 transition-colors">
                    <h4 className="font-bold text-slate-800 text-sm mb-2">{feat.label}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{feat.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison table */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">{pageContent.lendersTitle}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="p-3 font-semibold text-slate-700">Lender Bank / NBFC</th>
                      <th className="p-3 font-semibold text-slate-700">Interest Slabs (p.a.)</th>
                      <th className="p-3 font-semibold text-slate-700">Processing Fees</th>
                      <th className="p-3 font-semibold text-slate-700">Approval TAT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageContent.lenders.map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="p-3 font-bold text-slate-800 flex items-center gap-2">
                          <Landmark className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          {row.lender}
                        </td>
                        <td className="p-3 font-semibold text-blue-600">{row.rate}</td>
                        <td className="p-3 text-slate-500">{row.fees}</td>
                        <td className="p-3 text-slate-500">{row.turnaround}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Step checklist details */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6">{pageContent.checklistTitle}</h3>
              <div className="space-y-4">
                {pageContent.checklist.map((tip, idx) => (
                  <div key={idx} className="flex gap-4 items-start pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                    <div className="w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-semibold">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro-Innovations panel */}
            <div className="bg-gradient-to-br from-blue-950 to-indigo-950 rounded-3xl text-white p-6 sm:p-8 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                SME Technology Integrations
              </h3>
              <p className="text-xs text-blue-200 mb-6 font-sans">Leverage automated e-KYC databases for immediate business approvals</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Udyam Verification</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans">Direct database matching checks of your MSME tags.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Percent className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">GST Profiling</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans">Automated validation of sales profiles to lower interest markups.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Play className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Tenure Simulators</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans">Simulate working cash flows to select low EMI periods.</p>
                </div>
              </div>
            </div>

            {/* FAQs Accordion Block */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
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
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-blue-600' : ''}`} />
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

export default DynamicBusinessLoanPage;
