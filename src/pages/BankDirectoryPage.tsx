import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Search, 
  ExternalLink, 
  ArrowRight, 
  Phone, 
  ShieldCheck, 
  TrendingUp, 
  Star, 
  Percent, 
  ChevronDown, 
  CheckCircle2, 
  FileText,
  Landmark,
  MapPin,
  Filter
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { banks, BankInfo } from '../data/banks';

interface BankDirectoryPageProps {
  openEligibilityModal?: (loanType?: string) => void;
}

const BankDirectoryPage: React.FC<BankDirectoryPageProps> = ({ openEligibilityModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'homeLoan' | 'personalLoan' | 'fd' | 'branches'>('rating');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const categories = ['All', 'Public Sector (PSU)', 'Private Sector', 'Small Finance Bank', 'Leading NBFC/HFC'];

  // Filtered & Sorted Banks
  const filteredBanks = useMemo(() => {
    return banks
      .filter((b) => {
        const matchesSearch = 
          b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.headquarters.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.ifscPrefix.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'All' || b.type === selectedType;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'branches') return b.branches - a.branches;
        if (sortBy === 'homeLoan') {
          const aHome = a.loanRates.find(r => r.type === 'home')?.minRate || 99;
          const bHome = b.loanRates.find(r => r.type === 'home')?.minRate || 99;
          return aHome - bHome;
        }
        if (sortBy === 'personalLoan') {
          const aPersonal = a.loanRates.find(r => r.type === 'personal')?.minRate || 99;
          const bPersonal = b.loanRates.find(r => r.type === 'personal')?.minRate || 99;
          return aPersonal - bPersonal;
        }
        if (sortBy === 'fd') {
          const aFd = a.fdSlabs[a.fdSlabs.length - 1]?.regularRate || 0;
          const bFd = b.fdSlabs[b.fdSlabs.length - 1]?.regularRate || 0;
          return bFd - aFd;
        }
        return 0;
      });
  }, [searchTerm, selectedType, sortBy]);

  const faqs = [
    {
      q: "What is the difference between Public Sector Banks (PSUs) and Private Sector Banks?",
      a: "Public Sector Banks (such as SBI, PNB, Canara Bank, and Bank of Baroda) are institutions where the Government of India holds a majority stake (>51%). They offer high statutory trust, government scheme channels, and sovereign stability. Private Sector Banks (like HDFC Bank, ICICI Bank, and Axis Bank) are publicly traded corporations governed by private shareholders, typically offering faster digital turnaround times, advanced mobile apps, and premium reward programs."
    },
    {
      q: "Are deposits in all Indian banks insured by the Government?",
      a: "Yes. Under the Deposit Insurance and Credit Guarantee Corporation (DICGC) Act, 1961, all registered commercial banks, small finance banks, and co-operative banks are insured up to ₹5,00,000 (₹5 Lakhs) per depositor across principal and interest across all accounts held in the same bank."
    },
    {
      q: "Which bank offers the lowest home loan interest rate in India?",
      a: "As of 2026, leading public sector banks like State Bank of India (SBI) and Union Bank of India offer external benchmark (EBLR) linked home loans starting from 8.35% p.a. for borrowers with CIBIL credit scores of 750 or higher."
    },
    {
      q: "What is an EBLR or RLLR benchmark?",
      a: "External Benchmark Lending Rate (EBLR) or Repo-Linked Lending Rate (RLLR) is an RBI-mandated mechanism where floating retail loan rates (such as home and auto loans) are tied directly to the RBI Repo Rate. When the RBI adjusts repo rates, commercial banks are legally mandated to pass on interest revisions to borrowers."
    },
    {
      q: "Can I apply for loans across multiple banks simultaneously through BanksCart?",
      a: "Yes. BanksCart allows you to compare verified interest schedules, processing charges, and eligibility criteria across all 20+ banks and submit a single pre-screened application without initiating multiple hard inquiries on your CIBIL profile."
    }
  ];

  const canonicalUrl = "https://bankscart.com/banks";
  const pageTitle = "All-India Commercial Banks Directory (2026): Interest Rates, Branches & Contact | BanksCart";
  const pageDescription = "Explore the complete directory of Indian commercial banks, public sector PSUs, private lenders, and small finance banks. Compare latest Home Loan, Personal Loan, FD, and Savings rates with contact details and IFSC prefixes.";

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        "url": canonicalUrl,
        "name": pageTitle,
        "description": pageDescription,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://bankscart.com/#website",
          "name": "BanksCart",
          "url": "https://bankscart.com"
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
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
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
        <Breadcrumb path={["Home", "Banks Directory"]} />

        {/* Hero Section: Institutional Trust Navy / Deep Slate */}
        <section className="bg-gradient-to-r from-slate-900 via-[#1E3A8A] to-slate-900 rounded-2xl text-white p-6 sm:p-10 shadow-lg border border-slate-800 relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-400/30 rounded-full px-3.5 py-1 text-xs font-semibold text-blue-200 uppercase tracking-wider">
              <Landmark className="w-3.5 h-3.5 text-blue-400" />
              RBI Regulated Banking Ecosystem (2026)
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              All-India Commercial Banks Directory
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Compare verified interest rates, branch networks, toll-free helplines, and fixed deposit yields across India's leading Public Sector PSUs, Private Banks, Small Finance Banks, and premier NBFCs.
            </p>

            {/* Quick Metrics */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1 rounded-md border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 22+ Major Indian Banks
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1 rounded-md border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> DICGC ₹5 Lakh Insurance Cover
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1 rounded-md border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% RBI & EBLR Compliant
              </span>
            </div>
          </div>
        </section>

        {/* Live Filter & Search Control Panel */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search bank name, city, or IFSC prefix..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-colors"
              />
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end text-xs font-bold text-slate-700">
              <span>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1E3A8A]"
              >
                <option value="rating">Highest Customer Rating</option>
                <option value="homeLoan">Lowest Home Loan Rate</option>
                <option value="personalLoan">Lowest Personal Loan Rate</option>
                <option value="fd">Highest FD Interest Rate</option>
                <option value="branches">Largest Branch Network</option>
              </select>
            </div>
          </div>

          {/* Sector Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedType(cat)}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  selectedType === cat
                    ? 'bg-[#1E3A8A] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Bank Directory Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredBanks.map((b) => {
            const homeLoan = b.loanRates.find(r => r.type === 'home');
            const personalLoan = b.loanRates.find(r => r.type === 'personal');
            const peakFd = b.fdSlabs.length > 0 ? b.fdSlabs[b.fdSlabs.length - 1] : null;

            return (
              <div 
                key={b.id} 
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-blue-50 text-blue-800 border border-blue-200/60 mb-1.5">
                        {b.type}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {b.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">{b.tagline}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden relative">
                      <img 
                        src={b.logo} 
                        alt={`${b.name} logo`} 
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
                      <div className="hidden w-full h-full rounded-lg bg-slate-900 text-white font-black text-xs items-center justify-center">
                        {b.logoText}
                      </div>
                    </div>
                  </div>

                  {/* Core Metrics Strip */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Home Loan</span>
                      <span className="text-xs font-bold font-mono text-emerald-700 tabular-nums">
                        {homeLoan ? `${homeLoan.minRate}%` : 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Personal Loan</span>
                      <span className="text-xs font-bold font-mono text-blue-900 tabular-nums">
                        {personalLoan ? `${personalLoan.minRate}%` : 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Peak FD</span>
                      <span className="text-xs font-bold font-mono text-amber-700 tabular-nums">
                        {peakFd ? `${peakFd.regularRate}%` : 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Quick Metadata */}
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> HQ:
                      </span>
                      <span className="font-semibold text-slate-800">{b.headquarters}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" /> Branches:
                      </span>
                      <span className="font-mono font-semibold text-slate-800 tabular-nums">{b.branches.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" /> Helpline:
                      </span>
                      <span className="font-mono font-semibold text-slate-800">{b.tollFree.split(' ')[0]}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Savings Rate:</span>
                      <span className="font-semibold text-emerald-700">{b.savingsRate}</span>
                    </div>
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                  <Link
                    to={`/bank-details/${b.id}`}
                    className="flex-1 py-2.5 px-3 bg-[#1E3A8A] hover:bg-blue-900 text-white rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Profile & Rates</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <button
                    onClick={() => openEligibilityModal && openEligibilityModal('home')}
                    className="py-2.5 px-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 rounded-xl text-xs font-bold transition-colors"
                  >
                    Check Eligibility
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Guidance Section */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
              How BanksCart Evaluates & Compares Indian Banks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              In India, retail borrowers and savers must evaluate banking institutions across multiple parameters regulated by the Reserve Bank of India (RBI). At BanksCart, we audit institutions on:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#1E3A8A] flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm">EBLR & MCLR Transparency</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                We track the exact external repo spread and reset cycles to ensure borrowers secure true reducing balance calculations without hidden markups.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#1E3A8A] flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Statutory Deposit Protection</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Every commercial and small finance bank listed on our platform operates under DICGC deposit insurance, safeguarding up to ₹5 Lakhs per account.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#1E3A8A] flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Speed of Disbursal & Foreclosure</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Per RBI mandates, floating rate individual loans attract 0% foreclosure and prepayment charges, allowing borrowers to refinance friction-free.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
              All-India Banking Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Clear answers regarding RBI loan benchmark rates, DICGC insurance, and bank evaluations.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-sm sm:text-base font-bold text-slate-900 hover:text-[#1E3A8A] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-[#1E3A8A]' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pr-6">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default BankDirectoryPage;
