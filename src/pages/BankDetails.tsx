import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  TrendingUp, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight, 
  ShieldCheck, 
  Percent, 
  Calculator, 
  Landmark, 
  Clock, 
  ChevronDown,
  Globe,
  Lock,
  Search
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { banks, getBankById, BankInfo } from '../data/banks';

interface BankDetailsProps {
  openEligibilityModal?: (loanType?: string) => void;
}

const BankDetails: React.FC<BankDetailsProps> = ({ openEligibilityModal }) => {
  const { bankId } = useParams<{ bankId: string }>();
  const bank: BankInfo | undefined = getBankById(bankId || '');

  // Live Loan EMI Amortization calculator state pre-filled with bank rate
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(5);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  if (!bank) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center font-sans pt-24 pb-16 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mx-auto font-bold text-xl">
            !
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Bank Profile Not Found</h1>
          <p className="text-sm text-slate-600">
            We couldn't locate a financial institution profile matching <code className="font-mono font-semibold text-slate-800">"{bankId}"</code>.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link 
              to="/banks" 
              className="w-full py-2.5 px-4 bg-[#1E3A8A] text-white rounded-xl text-xs font-bold hover:bg-blue-900 transition-colors"
            >
              Browse All-India Banks Directory
            </Link>
            <Link 
              to="/loan-rates" 
              className="w-full py-2.5 px-4 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors"
            >
              Compare Live Loan Rates
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Pre-configured rate for EMI calculation
  const benchmarkRate = bank.loanRates[0]?.minRate || 8.50;
  const monthlyRate = (benchmarkRate / 12) / 100;
  const totalMonths = loanTenureYears * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
  const totalPayable = emi * totalMonths;
  const totalInterest = totalPayable - loanAmount;

  // Other banks for cross-crawling
  const otherBanks = banks.filter(b => b.id !== bank.id).slice(0, 6);

  // Dynamic FAQs
  const bankFaqs = [
    {
      q: `What is the current home loan interest rate offered by ${bank.name}?`,
      a: `${bank.name} offers home loan interest rates starting from ${bank.loanRates.find(r => r.type === 'home')?.minRate || 8.50}% p.a. linked to the RBI external repo rate benchmark. Final rate quotes depend on your CIBIL score (750+ preferred), loan amount, and property valuation.`
    },
    {
      q: `How can I contact ${bank.name} customer care for loan inquiries?`,
      a: `You can reach the official ${bank.name} customer care helpline at ${bank.tollFree} or ${bank.customerCare}. For official email inquiries, write to ${bank.email}.`
    },
    {
      q: `What are the fixed deposit (FD) interest rates at ${bank.name}?`,
      a: `${bank.name} offers fixed deposit rates ranging up to ${bank.fdSlabs[bank.fdSlabs.length - 1]?.regularRate || 7.00}% p.a. for general depositors and up to ${bank.fdSlabs[bank.fdSlabs.length - 1]?.seniorRate || 7.50}% p.a. for senior citizens (providing a 0.50% to 0.75% senior premium).`
    },
    {
      q: `Are deposits in ${bank.name} insured by the Government?`,
      a: `Yes. All customer deposits with ${bank.name} are covered under the Deposit Insurance and Credit Guarantee Corporation (DICGC) Act, insuring up to ₹5,00,000 (₹5 Lakhs) per depositor across savings, current, and term deposits.`
    },
    {
      q: `Where can I find IFSC codes for ${bank.name} branches?`,
      a: `All branches of ${bank.name} carry an 11-character Indian Financial System Code starting with the '${bank.ifscPrefix}' prefix. You can search verified branch IFSC and MICR codes using the BanksCart IFSC Finder.`
    }
  ];

  const canonicalUrl = `https://bankscart.com/bank-details/${bank.id}`;
  const pageTitle = `${bank.name}: Latest Loan Interest Rates, FD Slabs, Customer Care & IFSC | BanksCart`;
  const pageDescription = `Compare ${bank.name} latest Home Loan (${bank.loanRates.find(r => r.type === 'home')?.minRate}% onwards), Personal Loan, Car Loan, and FD rates (up to ${bank.fdSlabs[bank.fdSlabs.length - 1]?.regularRate}%). Check branch network, 24x7 toll-free helpline, and net banking details.`;

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BankOrCreditUnion",
        "@id": canonicalUrl,
        "name": bank.name,
        "alternateName": bank.shortName,
        "url": bank.website,
        "telephone": bank.tollFree,
        "email": bank.email,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": bank.headquarters.split(',')[0],
          "addressCountry": "IN"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": bank.rating.toString(),
          "bestRating": "5",
          "ratingCount": "1250"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://bankscart.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Banks Directory",
            "item": "https://bankscart.com/banks"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": bank.name,
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": bankFaqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pt-20 sm:pt-24 pb-16 antialiased text-slate-800">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(schemaJsonLd)}
        </script>
      </Helmet>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb path={["Home", "Banks Directory", bank.name]} />

        {/* Hero Section: Institutional Trust Navy / Deep Slate */}
        <section className="bg-gradient-to-r from-slate-900 via-[#1E3A8A] to-slate-900 rounded-2xl text-white p-6 sm:p-10 shadow-lg border border-slate-800 relative overflow-hidden">
          <div className="max-w-4xl space-y-4 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-blue-500/20 border border-blue-400/40 rounded-full px-3.5 py-1 text-xs font-semibold text-blue-200 uppercase tracking-wider">
                <Landmark className="w-3.5 h-3.5 text-blue-400" />
                {bank.type}
              </span>
              <span className="inline-flex items-center gap-1 bg-emerald-500/20 border border-emerald-400/40 rounded-full px-3 py-1 text-xs font-semibold text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5" /> DICGC Insured
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                  {bank.name}
                </h1>
                <p className="text-amber-300 font-medium text-sm sm:text-base mt-1">
                  "{bank.tagline}"
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white p-2 border border-white/30 shadow-md flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                <img 
                  src={bank.logo} 
                  alt={`${bank.name} logo`} 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                <div className="hidden w-full h-full rounded-xl bg-slate-900 text-white font-black text-sm items-center justify-center">
                  {bank.logoText}
                </div>
              </div>
            </div>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-3xl font-normal">
              {bank.overview}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
                <span className="text-[11px] text-slate-400 block font-medium">Headquarters</span>
                <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block truncate">
                  {bank.headquarters}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
                <span className="text-[11px] text-slate-400 block font-medium">Branch Network</span>
                <span className="text-xs sm:text-sm font-bold font-mono text-emerald-400 mt-0.5 block tabular-nums">
                  {bank.branches.toLocaleString()} Branches
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
                <span className="text-[11px] text-slate-400 block font-medium">Savings Rate</span>
                <span className="text-xs sm:text-sm font-bold font-mono text-amber-300 mt-0.5 block tabular-nums">
                  {bank.savingsRate}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
                <span className="text-[11px] text-slate-400 block font-medium">Customer Rating</span>
                <div className="flex items-center justify-center gap-1 mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs sm:text-sm font-bold text-white">{bank.rating}/5</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Two-Column Structured Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Main Column (8 cols): Rates & Slabs */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Loan Interest Rates Matrix */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-[#1E3A8A] rounded-full"></span>
                    {bank.name} Current Loan Interest Rates (2026)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Verified lending rates across retail and commercial financing categories.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> RBI Verified
                </span>
              </div>

              {/* Loan Rates Cards List */}
              <div className="space-y-4">
                {bank.loanRates.map((slab, idx) => (
                  <div 
                    key={idx}
                    className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200/60 inline-block mb-1">
                          {slab.type.toUpperCase()} LOAN
                        </span>
                        <h3 className="text-base font-bold text-slate-900">
                          {slab.name}
                        </h3>
                        <span className="text-xs text-slate-500">Benchmark: {slab.benchmark}</span>
                      </div>

                      <div className="sm:text-right">
                        <span className="text-xs text-slate-400 block font-medium">Interest Rate</span>
                        <div className="text-xl font-bold font-mono text-[#1E3A8A] tabular-nums">
                          {slab.minRate}% - {slab.maxRate}%
                        </div>
                      </div>
                    </div>

                    {/* Slab Details Strip */}
                    <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-lg text-xs text-slate-600">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Processing Fee</span>
                        <span className="font-semibold text-slate-800">{slab.processingFee}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Max Limit</span>
                        <span className="font-semibold text-slate-800">{slab.maxAmount}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Max Tenure</span>
                        <span className="font-semibold text-slate-800">{slab.tenure}</span>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-1">
                      <Link 
                        to={`/${slab.type}-loan-emi-calculator`}
                        className="text-xs font-bold text-[#1E3A8A] hover:underline flex items-center gap-1"
                      >
                        <Calculator className="w-3.5 h-3.5" /> Calculate Monthly EMI
                      </Link>

                      <button
                        onClick={() => openEligibilityModal && openEligibilityModal(slab.type)}
                        className="py-1.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition-colors"
                      >
                        Check Eligibility
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Fixed Deposit (FD) Slabs Matrix */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-[#1E3A8A] rounded-full"></span>
                  {bank.name} Fixed Deposit (FD) Rates (2026)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Senior citizens enjoy an additional interest yield premium of 0.50% to 0.75% across all tenure slabs.
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
                      <th className="p-3.5 font-bold">Tenure Bracket</th>
                      <th className="p-3.5 font-bold">Regular Depositors (p.a.)</th>
                      <th className="p-3.5 font-bold">Senior Citizens (p.a.)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bank.fdSlabs.map((slab, i) => (
                      <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3.5 font-semibold text-slate-900">{slab.tenure}</td>
                        <td className="p-3.5 font-mono font-bold text-slate-800 tabular-nums">
                          {slab.regularRate.toFixed(2)}%
                        </td>
                        <td className="p-3.5 font-mono font-bold text-emerald-700 tabular-nums">
                          {slab.seniorRate.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200/60 text-xs text-blue-900 flex items-center justify-between">
                <span>Want to project returns on your term deposit?</span>
                <Link 
                  to="/calculators/fixed-deposit-calculator"
                  className="font-bold text-[#1E3A8A] hover:underline flex items-center gap-1"
                >
                  FD Return Calculator <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* 3. Interactive Loan EMI Simulator Pre-filled for Bank */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#1E3A8A]" />
                  Simulate Monthly EMI with {bank.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Based on benchmark rate of {benchmarkRate}% p.a.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Loan Amount</span>
                    <span className="font-mono text-[#1E3A8A]">₹{loanAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="50000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-[#1E3A8A]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>₹1 Lakh</span>
                    <span>₹1 Crore</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Tenure (Years)</span>
                    <span className="font-mono text-[#1E3A8A]">{loanTenureYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={loanTenureYears}
                    onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                    className="w-full accent-[#1E3A8A]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>1 Year</span>
                    <span>30 Years</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 p-4 bg-slate-900 rounded-xl text-white text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block">Monthly EMI</span>
                  <span className="text-base sm:text-lg font-bold font-mono text-amber-400 tabular-nums">
                    ₹{emi.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Total Interest</span>
                  <span className="text-base sm:text-lg font-bold font-mono text-slate-200 tabular-nums">
                    ₹{totalInterest.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Total Payable</span>
                  <span className="text-base sm:text-lg font-bold font-mono text-emerald-400 tabular-nums">
                    ₹{totalPayable.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Key Bank Features */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Key Highlights & Customer Benefits of {bank.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bank.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. FAQs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
              <h3 className="text-lg font-bold text-slate-900">
                {bank.name} Frequently Asked Questions
              </h3>
              <div className="divide-y divide-slate-100">
                {bankFaqs.map((f, i) => (
                  <div key={i} className="py-3.5">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-900 hover:text-[#1E3A8A] transition-colors"
                    >
                      <span>{f.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === i ? 'rotate-180 text-[#1E3A8A]' : ''}`} />
                    </button>
                    {activeFaq === i && (
                      <div className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed pr-6">
                        {f.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Official Contact & Digital Gateways */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#1E3A8A]" />
                Official Helplines & Portals
              </h3>

              <div className="space-y-3 text-xs divide-y divide-slate-100">
                <div className="pt-2 first:pt-0">
                  <span className="text-slate-400 block font-medium">Toll-Free Customer Care:</span>
                  <span className="font-mono font-bold text-slate-900 text-sm mt-0.5 block">{bank.tollFree}</span>
                </div>
                <div className="pt-2">
                  <span className="text-slate-400 block font-medium">Support Hotline:</span>
                  <span className="font-mono font-bold text-slate-800">{bank.customerCare}</span>
                </div>
                <div className="pt-2">
                  <span className="text-slate-400 block font-medium">Customer Support Email:</span>
                  <a href={`mailto:${bank.email}`} className="font-mono text-[#1E3A8A] hover:underline font-semibold block truncate">
                    {bank.email}
                  </a>
                </div>
                <div className="pt-2">
                  <span className="text-slate-400 block font-medium">Corporate Headquarters:</span>
                  <span className="text-slate-700 font-semibold">{bank.headquarters}</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <a
                  href={bank.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5" /> Visit Official Website
                </a>

                {bank.netBankingUrl && (
                  <a
                    href={bank.netBankingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-blue-50 hover:bg-blue-100 text-[#1E3A8A] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-blue-200/60"
                  >
                    <Lock className="w-3.5 h-3.5" /> NetBanking Login Portal
                  </a>
                )}
              </div>
            </div>

            {/* IFSC Code Shortcut for this Bank */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#1E3A8A] font-bold text-sm">
                <Search className="w-4 h-4 text-blue-600" />
                Find {bank.shortName} IFSC Codes
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Need IFSC and MICR codes for {bank.name} branches across any Indian city? Look up verified RBI codes instantly:
              </p>
              <div className="p-3 bg-white rounded-xl border border-blue-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">IFSC Code Prefix:</span>
                  <span className="font-mono font-bold text-slate-900">{bank.ifscPrefix}XXXXXXX</span>
                </div>
                <Link
                  to="/resources/ifsc"
                  className="px-3 py-1.5 bg-[#1E3A8A] text-white rounded-lg text-xs font-bold hover:bg-blue-900 transition-colors"
                >
                  Lookup IFSC
                </Link>
              </div>
            </div>

            {/* Eligibility Quick Check */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">
                Apply for {bank.name} Loans
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Check your eligibility without triggering multiple hard inquiries on your credit bureau profile.
              </p>
              <button
                onClick={() => openEligibilityModal && openEligibilityModal('home')}
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-xl text-xs transition-colors shadow-sm"
              >
                Check Loan Eligibility Now
              </button>
            </div>

            {/* Cross-Link Other Top Indian Banks */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Compare Other Banks
                </h3>
                <Link to="/banks" className="text-[11px] font-bold text-[#1E3A8A] hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-2">
                {otherBanks.map((ob) => (
                  <Link
                    key={ob.id}
                    to={`/bank-details/${ob.id}`}
                    className="p-2.5 rounded-xl border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50 transition-colors flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 p-0.5 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                        <img 
                          src={ob.logo} 
                          alt={`${ob.name} logo`} 
                          className="w-full h-full object-contain"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            if (target.nextElementSibling) {
                              (target.nextElementSibling as HTMLElement).style.display = 'flex';
                            }
                          }}
                        />
                        <div className="hidden w-full h-full rounded bg-slate-900 text-white font-bold text-[9px] items-center justify-center">
                          {ob.logoText}
                        </div>
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block truncate max-w-[150px]">{ob.name}</span>
                        <span className="text-[10px] text-slate-400">{ob.type}</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-[#1E3A8A] text-[11px]">
                      {ob.loanRates[0]?.minRate}%
                    </span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default BankDetails;
