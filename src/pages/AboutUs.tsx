import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ShieldCheck,
  Building2,
  Users,
  Award,
  Lock,
  CheckCircle2,
  TrendingUp,
  FileText,
  HelpCircle,
  ArrowRight,
  Landmark,
  Scale,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  Clock,
  Briefcase,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Calculator,
  Compass,
  Check,
  Percent
} from 'lucide-react';

const AboutUs: React.FC = () => {
  const pageTitle = "About BanksCart: India's Trusted Financial Services & Loan Comparison Platform";
  const pageDescription = "Learn about BanksCart's corporate mission, executive leadership, institutional banking network, and 4-pillar editorial integrity policy in helping Indian borrowers compare loans objectively.";
  const canonicalUrl = "https://www.bankscart.com/about-us";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About BanksCart",
    "description": pageDescription,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "Organization",
      "name": "BanksCart Financial Technologies Private Limited",
      "alternateName": "BanksCart",
      "url": "https://www.bankscart.com",
      "logo": "https://www.bankscart.com/favicon-32x32.png",
      "foundingDate": "2024",
      "identifier": "CIN: U67190DL2024PTC428910",
      "description": "BanksCart is an independent digital loan comparison and financial marketplace in India, connecting retail consumers and MSMEs with 30+ premier scheduled commercial banks and RBI-registered NBFCs.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Level 4, Statesman House, Barakhamba Road, Connaught Place",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "postalCode": "110001",
        "addressCountry": "IN"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "Customer Support",
          "email": "support@bankscart.com",
          "telephone": "+91-1800-200-8900",
          "areaServed": "IN"
        },
        {
          "@type": "ContactPoint",
          "contactType": "Grievance Officer",
          "email": "grievance@bankscart.com",
          "telephone": "+91-11-4100-8905",
          "areaServed": "IN"
        }
      ]
    }
  };

  const keyMetrics = [
    {
      metric: "30+",
      label: "Partner Banks & NBFCs",
      subtext: "Tier-1 Scheduled Commercial Banks & Systemically Important NBFCs",
      icon: Landmark
    },
    {
      metric: "₹5,000 Cr+",
      label: "Loan Queries Evaluated",
      subtext: "Retail borrowers and MSMEs assisted across India",
      icon: TrendingUp
    },
    {
      metric: "1,000+",
      label: "Cities & Towns Covered",
      subtext: "Pan-India digital footprint from Tier-1 metros to Tier-3 hubs",
      icon: MapPin
    },
    {
      metric: "100%",
      label: "Free for Consumers",
      subtext: "Zero advisory fees, zero markups, zero hidden consultation charges",
      icon: ShieldCheck
    }
  ];

  const leadershipTeam = [
    {
      name: "Gaurav Rajput",
      role: "Chief Executive Officer & Co-Founder",
      initials: "GR",
      avatarBg: "bg-blue-600 text-white",
      bio: "16+ years in retail credit underwriting and digital banking architecture. Prior to co-founding BanksCart, Gaurav scaled unsecured retail credit portfolios past ₹8,000 Crores across leading private sector commercial banks.",
      focus: "Strategic Partnerships & Institutional Growth"
    },
    {
      name: "Neha Sharma",
      role: "Chief Risk Officer & Co-Founder",
      initials: "NS",
      avatarBg: "bg-emerald-600 text-white",
      bio: "Senior credit risk specialist with comprehensive domain mastery in bureau analytics (CIBIL, Experian, Equifax, CRIF). Neha oversees credit engine compliance, borrower privacy security, and RBI digital lending protocols.",
      focus: "Risk Frameworks & Bureau Integrations"
    },
    {
      name: "Amitav Roy",
      role: "Head of Product & Credit Analytics",
      initials: "AR",
      avatarBg: "bg-slate-800 text-white",
      bio: "Alumnus of IIT Delhi and IIM Bangalore. Amitav architected BanksCart's algorithmic APR comparator engine, real-time EMI simulation calculators, and frictionless API pipelines with banking partners.",
      focus: "Fintech Engines & User Journey Engineering"
    }
  ];

  const editorialPillars = [
    {
      number: "01",
      title: "Primary Regulatory Verification",
      description: "Every interest rate slab, repo-linked benchmark rate (EBLR/RLLR), and statutory guideline is cross-verified directly against official circulars published by the Reserve Bank of India (RBI), Ministry of Finance, and primary bank filings.",
      tag: "Statutory Accuracy"
    },
    {
      number: "02",
      title: "Bi-Weekly Rate Freshness Audits",
      description: "Our financial research desk audits loan interest rates, processing fees, balance transfer schemes, and credit card reward schedules every 14 business days, guaranteeing that comparison matrices mirror live market conditions.",
      tag: "Live Market Sync"
    },
    {
      number: "03",
      title: "Zero Commercial Steering Bias",
      description: "Lenders cannot pay to inflate product rankings or sponsor algorithmic recommendations. Product scores and comparative positions are calculated objectively from true borrowing cost (APR), fee structures, and borrower eligibility.",
      tag: "Unbiased Algorithms"
    },
    {
      number: "04",
      title: "Transparent Formula Disclosures",
      description: "Every financial calculator on BanksCart—including personal loan EMI, home loan prepayments, reducing balance amortizations, and tax schedules—openly displays underlying compounding math, formulas, and working assumptions.",
      tag: "Open Computations"
    }
  ];

  const institutionalPartners = [
    { name: "State Bank of India", type: "Public Sector Bank", tag: "PSB" },
    { name: "HDFC Bank", type: "Private Sector Bank", tag: "Private" },
    { name: "ICICI Bank", type: "Private Sector Bank", tag: "Private" },
    { name: "Axis Bank", type: "Private Sector Bank", tag: "Private" },
    { name: "Kotak Mahindra Bank", type: "Private Sector Bank", tag: "Private" },
    { name: "Bank of Baroda", type: "Public Sector Bank", tag: "PSB" },
    { name: "Punjab National Bank", type: "Public Sector Bank", tag: "PSB" },
    { name: "Bajaj Finserv", type: "Systemically Important NBFC", tag: "NBFC-ND-SI" },
    { name: "Tata Capital", type: "RBI-Regulated NBFC", tag: "NBFC" },
    { name: "Aditya Birla Capital", type: "Diversified NBFC", tag: "NBFC" },
    { name: "IndusInd Bank", type: "Private Sector Bank", tag: "Private" },
    { name: "Federal Bank", type: "Scheduled Commercial Bank", tag: "Commercial" }
  ];

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="about bankscart, bankscart leadership, loan comparison india, bankscart corporate entity, grievance redressal bankscart, rbi digital lending guidelines" />

        {/* Self-Referencing Canonical Tag */}
        <link rel="canonical" href={canonicalUrl} />

        {/* OpenGraph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-ibm antialiased">
        {/* Breadcrumb Navigation */}
        <div className="bg-slate-900 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
                </li>
                <li className="text-slate-600">/</li>
                <li className="text-white font-medium" aria-current="page">About Us</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Institutional Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-16 lg:py-20 overflow-hidden border-b border-slate-800">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/10 border border-amber-400/25 rounded-full text-amber-300 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>ABOUT BANKSCART &bull; CORPORATE PROFILE</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Empowering India with Transparent, Unbiased Financial Intelligence
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                BanksCart is India’s independent digital loan comparison and financial marketplace operated by{' '}
                <strong className="text-white">BanksCart Financial Technologies Private Limited</strong>. We eliminate borrowing opacity by providing algorithmic APR comparisons, transparent eligibility evaluations, and digital connectivity across 30+ leading Indian banks and NBFCs.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <Link
                  to="/loans"
                  className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-lg transition-colors shadow-lg shadow-amber-500/20"
                >
                  Explore Compare Tools
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  to="/credit-score"
                  className="inline-flex items-center justify-center px-6 py-3 bg-slate-800/90 hover:bg-slate-700 text-white font-medium text-sm rounded-lg border border-slate-700 transition-colors"
                >
                  Free Credit Score Check
                </Link>
                <a
                  href="#grievance-policy"
                  className="inline-flex items-center text-xs font-medium text-slate-300 hover:text-amber-400 transition-colors underline underline-offset-4 decoration-slate-650"
                >
                  View Grievance Redressal Policy
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Metrics Bar */}
        <section className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyMetrics.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-md flex items-start gap-4 hover:border-blue-300 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-700">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
                      {item.metric}
                    </div>
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">
                      {item.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 leading-snug">
                      {item.subtext}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

          {/* Section 1: Corporate Entity & Founding Vision */}
          <section className="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider rounded-md">
                  <Building2 className="w-3.5 h-3.5 text-blue-700" />
                  <span>Corporate Entity & Founding Vision</span>
                </div>

                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                  Building India’s Most Dependable Lending Marketplace
                </h2>

                <div className="space-y-4 text-slate-650 leading-relaxed text-sm sm:text-base">
                  <p>
                    <strong className="text-slate-900">BanksCart Financial Technologies Private Limited</strong> was established in <strong>2024</strong> (CIN: <span className="font-mono text-xs font-semibold bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">U67190DL2024PTC428910</span>) with a singular mission: to make consumer borrowing in India radically transparent, objective, and mathematically honest.
                  </p>
                  <p>
                    For decades, Indian retail borrowers and small businesses navigated a fragmented credit landscape burdened with opaque processing fees, hidden compounding terms, aggressive unsolicited sales pitches, and arbitrary interest rate spreads. Finding the true lowest-cost financing option required visiting dozens of branches or filling repetitious lead forms.
                  </p>
                  <p>
                    BanksCart fundamentally changes this paradigm. Operating as an independent fintech facilitator and corporate Lending Service Provider (LSP), we provide consumers with algorithmically audited loan comparisons, granular EMI simulations, and direct digital application pipelines to India's foremost scheduled banks and NBFCs—completely free of cost.
                  </p>
                </div>

                {/* Key Commitments Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Independent Financial Gatekeeper</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Zero Data Resale Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>RBI Digital Lending Compliant</span>
                  </div>
                </div>
              </div>

              {/* Entity Fast Facts Card */}
              <div className="lg:col-span-4 bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  Statutory Entity Facts
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Legal Company Name:</span>
                    <span className="font-semibold text-slate-900">BanksCart Financial Technologies Pvt Ltd</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Corporate Identity Number (CIN):</span>
                    <span className="font-mono font-bold text-slate-800">U67190DL2024PTC428910</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Year of Incorporation:</span>
                    <span className="font-semibold text-slate-900">2024</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Registered Office:</span>
                    <span className="text-slate-700 leading-snug block">
                      Level 4, Statesman House, Barakhamba Road, Connaught Place, New Delhi - 110001, India
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Regulatory Operational Role:</span>
                    <span className="text-slate-700 leading-snug block font-medium">
                      Lending Service Provider (LSP) / Digital Financial Marketplace Facilitator
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors"
                  >
                    View Official Contact Details
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Executive Leadership & Governance */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-md border border-blue-100">
                  <Users className="w-3.5 h-3.5" />
                  <span>Leadership & Governance</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight mt-2">
                  Experienced Executive Leadership
                </h2>
              </div>
              <p className="text-xs text-slate-500 max-w-sm sm:text-right">
                Combining 40+ years of institutional credit underwriting, retail banking leadership, and financial systems design.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {leadershipTeam.map((leader, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:border-slate-300 transition-shadow space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg font-mono shadow-sm ${leader.avatarBg}`}>
                        {leader.initials}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 leading-tight">
                          {leader.name}
                        </h3>
                        <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mt-0.5">
                          {leader.role}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-slate-650 leading-relaxed">
                      {leader.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Key Focus</span>
                    <span className="text-xs font-medium text-slate-700 mt-0.5 block">{leader.focus}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: 4-Pillar Editorial Review & Fact-Checking Policy */}
          <section className="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-8">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 text-xs font-semibold uppercase tracking-wider rounded-md border border-amber-200">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Editorial Integrity & Fact-Checking Policy</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                Our 4-Pillar Editorial Integrity Commitment
              </h2>
              <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
                Borrowing decisions represent multi-year financial commitments that directly shape our users' livelihoods. We hold every rate chart, calculator formula, loan review, and credit card guide to non-negotiable standards of empirical verification:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {editorialPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-[#F8FAFC] rounded-xl border border-slate-200/90 hover:border-blue-200 transition-colors space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-100">
                      PILLAR {pillar.number}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-650 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 leading-relaxed">
                <strong>Editorial Independence Clause:</strong> BanksCart editorial researchers and financial analysts work under strict editorial firewalls. No advertiser, lending partner, or affiliate entity may purchase positive editorial reviews, adjust credit rating methodologies, or censor critical commentary regarding loan terms.
              </div>
            </div>
          </section>

          {/* Section 4: Institutional Lending Network & Statutory LSP Disclosure */}
          <section className="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider rounded-md">
                <Landmark className="w-3.5 h-3.5 text-blue-700" />
                <span>Partner Banks & Institutional Network</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                Institutional Lending Network & Statutory Disclosure
              </h2>
              <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200/90 text-xs text-slate-800 leading-relaxed space-y-2">
                <p>
                  <strong>Statutory Marketplace Disclosure:</strong> BanksCart Financial Technologies Private Limited functions strictly as a financial technology aggregator, marketplace facilitator, and corporate Lending Service Provider (LSP). BanksCart is not a bank, non-banking financial company (NBFC), peer-to-peer lender, or deposit-taking institution.
                </p>
                <p>
                  All loan approvals, sanction letters, interest rate pricing bands, e-mandates, loan disbursals, and recovery practices remain the sole prerogative of the respective Regulated Entities (REs) in strict conformity with the RBI Digital Lending Directions (2022/2024).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
              {institutionalPartners.map((partner, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200 text-center flex flex-col justify-center items-center hover:bg-white hover:border-blue-300 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-200/70 text-slate-700 flex items-center justify-center font-bold text-xs mb-2">
                    {partner.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="font-bold text-slate-900 text-xs leading-tight">
                    {partner.name}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    {partner.type}
                  </div>
                  <span className="mt-2 inline-block px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[9px] font-mono">
                    {partner.tag}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Grievance Redressal Mechanism & Officer Details */}
          <section id="grievance-policy" className="bg-slate-900 text-white rounded-2xl p-8 lg:p-12 shadow-xl space-y-8 border border-slate-800">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-300 text-xs font-semibold uppercase tracking-wider rounded-md border border-blue-500/20">
                <Scale className="w-3.5 h-3.5 text-blue-400" />
                <span>RBI Compliance & Consumer Protection</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
                Grievance Redressal Policy & Principal Officer Details
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                In strict adherence to the Reserve Bank of India’s Fair Practices Code and Digital Lending Directions, BanksCart has established a dedicated, multi-tiered grievance redressal mechanism to address user disputes, unconsented tele-calling queries, and digital data privacy concerns promptly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-200">
              {/* Principal Officer Details */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-white text-base">Principal Grievance Redressal Officer</h3>
                </div>
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Officer Name:</span>
                    <span className="font-semibold text-white">Mr. Rajesh Sharma</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Designation:</span>
                    <span className="text-white">Principal Grievance Officer & Head of Compliance</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Deputy Officer:</span>
                    <span className="text-white">Ms. Priya Malhotra (Grievance Desk)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Official Email:</span>
                    <a href="mailto:grievance@bankscart.com" className="text-amber-400 hover:underline">grievance@bankscart.com</a>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Direct Helpline:</span>
                    <a href="tel:+911141008905" className="text-white font-mono">+91-11-4100-8905</a>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-400">Operating Hours:</span>
                    <span className="text-slate-300">Mon &ndash; Fri: 9:30 AM &ndash; 6:00 PM IST</span>
                  </div>
                </div>
              </div>

              {/* 3-Tier Escalation Matrix & TAT */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-white text-base">Escalation Matrix & SLA Turnaround Time</h3>
                </div>
                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 font-mono">
                      1
                    </div>
                    <div>
                      <span className="font-bold text-white">Level 1 &ndash; Helpdesk Registration:</span>
                      <p className="text-slate-300 mt-0.5 leading-snug">
                        Immediate acknowledgment ticket issued within <strong className="text-amber-300">24 business hours</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 font-mono">
                      2
                    </div>
                    <div>
                      <span className="font-bold text-white">Level 2 &ndash; Principal Officer Resolution:</span>
                      <p className="text-slate-300 mt-0.5 leading-snug">
                        Formal review, investigation, and dispute resolution communicated within <strong className="text-emerald-300">3 business days (72 hours)</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 font-mono">
                      3
                    </div>
                    <div>
                      <span className="font-bold text-white">Level 3 &ndash; Regulatory Ombudsman Escalation:</span>
                      <p className="text-slate-300 mt-0.5 leading-snug">
                        If unresolved within 30 days, customers can file directly with the Reserve Bank of India Ombudsman via{' '}
                        <a
                          href="https://cms.rbi.org.in"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-400 underline inline-flex items-center gap-1"
                        >
                          cms.rbi.org.in <ExternalLink className="w-3 h-3" />
                        </a>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Registered Corporate Office Details */}
          <section className="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Corporate Headquarters & Official Communications
              </h2>
              <p className="text-slate-650 text-sm leading-relaxed">
                For regulatory inquiries, institutional banking partnerships, media communications, or legal service:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-blue-700 mt-1 flex-shrink-0" />
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-sm">Registered Corporate Office</h3>
                  <p className="text-xs text-slate-650 leading-relaxed">
                    <strong>BanksCart Financial Technologies Pvt Ltd</strong><br />
                    <span className="font-mono text-[11px] text-slate-500">CIN: U67190DL2024PTC428910</span><br />
                    Level 4, Statesman House, Barakhamba Road,<br />
                    Connaught Place, New Delhi - 110001, India
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-start space-x-4">
                <Mail className="w-6 h-6 text-blue-700 mt-1 flex-shrink-0" />
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-sm">Official Inquiries & Email</h3>
                  <div className="text-xs text-slate-650 leading-relaxed space-y-1">
                    <div>
                      <span className="text-slate-500">Support:</span>{' '}
                      <a href="mailto:support@bankscart.com" className="text-blue-700 hover:underline">support@bankscart.com</a>
                    </div>
                    <div>
                      <span className="text-slate-500">Grievances:</span>{' '}
                      <a href="mailto:grievance@bankscart.com" className="text-blue-700 hover:underline">grievance@bankscart.com</a>
                    </div>
                    <div>
                      <span className="text-slate-500">Alliances:</span>{' '}
                      <a href="mailto:partners@bankscart.com" className="text-blue-700 hover:underline">partners@bankscart.com</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-start space-x-4">
                <Phone className="w-6 h-6 text-blue-700 mt-1 flex-shrink-0" />
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-sm">Telephonic Desk</h3>
                  <div className="text-xs text-slate-650 leading-relaxed space-y-1">
                    <div>
                      <span className="text-slate-500">Toll-Free:</span>{' '}
                      <a href="tel:18002008900" className="text-slate-900 font-mono font-bold">1800-200-8900</a>
                    </div>
                    <div>
                      <span className="text-slate-500">Direct Office:</span>{' '}
                      <span className="font-mono text-slate-800">+91-11-4100-8900</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Hours:</span>{' '}
                      <span>Mon &ndash; Sat, 9:30 AM &ndash; 6:30 PM IST</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Bottom CTA Banner */}
          <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-8 lg:p-10 shadow-lg text-center space-y-4">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white">
              Ready to Explore India’s Most Transparent Loan Marketplace?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Compare pre-approved loan options, calculate exact monthly installments with 40+ free financial calculators, and check your credit score with zero impact.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                to="/loans"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-lg transition-colors shadow-md shadow-amber-500/20"
              >
                Compare Loans Now
              </Link>
              <Link
                to="/calculators"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium text-sm rounded-lg border border-white/20 transition-colors"
              >
                Browse 40+ Calculators
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 bg-transparent hover:bg-white/5 text-slate-300 hover:text-white font-medium text-sm rounded-lg transition-colors"
              >
                Contact Our Helpdesk
              </Link>
            </div>
          </section>

        </main>
      </div>
    </>
  );
};

export default AboutUs;
