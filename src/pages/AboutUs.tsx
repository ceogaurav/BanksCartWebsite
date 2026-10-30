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
  Phone
} from 'lucide-react';

const AboutUs: React.FC = () => {
  const pageTitle = "About BanksCart: Our Mission, Leadership & Lending Partners";
  const pageDescription = "Learn about BanksCart's mission, leadership team, and institutional partnerships with 30+ top Indian banks. Empowering borrowers with transparent loan comparisons.";
  const canonicalUrl = "https://www.bankscart.com/about";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About BanksCart",
    "description": pageDescription,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "Organization",
      "name": "BanksCart",
      "url": "https://www.bankscart.com",
      "logo": "https://www.bankscart.com/favicon-32x32.png",
      "description": "BanksCart is an independent digital loan comparison and financial marketplace in India, connecting consumers and businesses with 30+ top banks and NBFCs.",
      "sameAs": [
        "https://twitter.com/bankscart",
        "https://facebook.com/bankscart"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "email": "support@bankscart.com",
        "areaServed": "IN"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="about bankscart, bankscart mission, loan comparison company, bankscart partners, financial marketplace india" />

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

      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><span>/</span></li>
              <li className="text-slate-800 font-medium" aria-current="page">About Us</li>
            </ol>
          </nav>

          {/* Hero Header */}
          <section className="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-full border border-blue-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About BanksCart</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Empowering India’s Borrowers with Transparent Financial Choices
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-4xl">
              BanksCart is one of India’s fastest-growing independent digital lending marketplaces. We simplify complex retail finance by giving consumers and small businesses direct, unbiased comparisons across personal loans, home mortgages, business loans, and credit cards.
            </p>
            <p className="text-base text-slate-600 leading-relaxed max-w-4xl">
              By combining proprietary rate-matching algorithms with deep integrations across 30+ premier scheduled commercial banks and RBI-regulated NBFCs, we eliminate hidden costs, empower borrower choices, and make credit access fast, transparent, and completely paperless.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/loans"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow"
              >
                Explore Loan Options
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                to="/credit-score"
                className="inline-flex items-center justify-center px-6 py-3 bg-slate-100 text-slate-800 font-medium rounded-lg hover:bg-slate-200 transition-colors border border-slate-300"
              >
                Free Credit Score Check
              </Link>
            </div>
          </section>

          {/* Trust Metrics Bar */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-3xl lg:text-4xl font-extrabold text-blue-600 mb-1">30+</div>
              <div className="text-sm font-semibold text-slate-900">Partner Banks & NBFCs</div>
              <div className="text-xs text-slate-500 mt-1">Tier-1 institutional lenders</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-3xl lg:text-4xl font-extrabold text-blue-600 mb-1">₹5,000 Cr+</div>
              <div className="text-sm font-semibold text-slate-900">Loan Applications Facilitated</div>
              <div className="text-xs text-slate-500 mt-1">Empowering retail borrowers</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-3xl lg:text-4xl font-extrabold text-blue-600 mb-1">1,000+</div>
              <div className="text-sm font-semibold text-slate-900">Cities & Towns Covered</div>
              <div className="text-xs text-slate-500 mt-1">Pan-India credit accessibility</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-3xl lg:text-4xl font-extrabold text-blue-600 mb-1">100%</div>
              <div className="text-sm font-semibold text-slate-900">Free for Consumers</div>
              <div className="text-xs text-slate-500 mt-1">Zero fees or charges to compare</div>
            </div>
          </section>

          {/* Company History & Founding Story */}
          <section className="bg-white p-8 lg:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider rounded-full">
              <Building2 className="w-3.5 h-3.5" />
              <span>Our Story</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              Why We Built BanksCart: Eliminating Information Asymmetry in Banking
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed text-base">
              <p>
                In India’s retail financial sector, borrowing money has historically been an opaque, time-consuming process. Retail customers and small business owners frequently faced fragmented interest rate slabs, complex processing fee schedules, arbitrary pre-closure charges, and aggressive mis-selling by unverified intermediaries.
              </p>
              <p>
                BanksCart was founded to address this exact information asymmetry. We envisioned a single, modern digital platform where any borrower—regardless of their geographical location or income tier—could easily compare verified interest rates, calculate true annual borrowing costs (APR), and apply for credit directly with institutional lenders under fully transparent terms.
              </p>
              <p>
                Over the years, BanksCart has expanded beyond simple rate listings into a comprehensive financial ecosystem. Today, our platform offers an automated personal loan comparison engine, interactive EMI calculators, credit bureau health tools, Aadhaar identity validation directories, and extensive educational resources that help millions of Indians make confident financial decisions every month.
              </p>
            </div>
          </section>

          {/* Core Values & Pillars */}
          <section className="space-y-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              Our Core Guiding Principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Unbiased Lending Comparisons</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We maintain strict editorial and operational independence. We never artificially boost or promote specific lenders; recommendations are calculated purely on eligibility criteria, interest rates, and total borrowing costs.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Zero Cost to Consumers</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  All loan comparison tools, EMI repayment calculators, eligibility checkers, and educational financial guides on BanksCart are 100% free for applicants. We never charge users any application fees.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Bank-Grade Data Security</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Your financial privacy is sacred. We utilize 256-bit SSL encryption, adhere to RBI data localization mandates, and comply with the Digital Personal Data Protection Act (DPDPA). We never sell your personal information.
                </p>
              </div>
            </div>
          </section>

          {/* Institutional Banking Partnerships */}
          <section className="bg-white p-8 lg:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider rounded-full">
              <Landmark className="w-3.5 h-3.5" />
              <span>Lending Network</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              Our Institutional Partnerships Across India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              BanksCart partners with India’s leading scheduled commercial banks and Reserve Bank of India (RBI) registered Non-Banking Financial Companies (NBFCs). Through these institutional relationships, our users gain access to special concessional rate slabs, waived processing fees, and expedited digital approvals:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-2">
              {[
                { name: "State Bank of India", type: "Public Sector Bank" },
                { name: "HDFC Bank", type: "Private Sector Bank" },
                { name: "ICICI Bank", type: "Private Sector Bank" },
                { name: "Axis Bank", type: "Private Sector Bank" },
                { name: "Kotak Mahindra Bank", type: "Private Sector Bank" },
                { name: "Bank of Baroda", type: "Public Sector Bank" },
                { name: "Punjab National Bank", type: "Public Sector Bank" },
                { name: "Bajaj Finserv", type: "Systemically Important NBFC" },
                { name: "Tata Capital", type: "RBI-Regulated NBFC" },
                { name: "Aditya Birla Capital", type: "Diversified NBFC" },
                { name: "IndusInd Bank", type: "Private Sector Bank" },
                { name: "Federal Bank", type: "Scheduled Commercial Bank" }
              ].map((partner, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center flex flex-col justify-center items-center">
                  <div className="font-semibold text-slate-900 text-sm">{partner.name}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{partner.type}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Editorial & Financial Accuracy Standards */}
          <section className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-8 lg:p-12 rounded-2xl shadow-md space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-blue-200 text-xs font-semibold uppercase tracking-wider rounded-full border border-white/20">
              <Award className="w-3.5 h-3.5" />
              <span>Editorial Integrity</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
              Committed to Financial Accuracy & Compliance
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed text-base">
              <p>
                Every interest rate chart, loan comparison table, and financial guidance article published on BanksCart undergoes rigorous review by our team of credit analysts and financial editors. We continuously monitor RBI monetary policy announcements, repo rate resets, and lender schedule revisions to ensure our users receive factual, updated figures.
              </p>
              <p>
                We do not promise loan approval or offer arbitrary rate guarantees. All credit decisions, interest rate pricing, processing charges, and loan sanctions remain at the sole discretion of our partner lending institutions based on applicant risk underwriting, credit bureau scores, and repayment capacity.
              </p>
            </div>
          </section>

          {/* Corporate Office & Contact Details */}
          <section className="bg-white p-8 lg:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Corporate Office & Contact Channels
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Have questions regarding loan applications, partner listings, or feedback? Get in touch with our team:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 text-base">Corporate Office</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    BanksCart Financial Services<br />
                    New Delhi, India
                  </p>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-4">
                <Mail className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 text-base">Email Support</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    <a href="mailto:support@bankscart.com" className="text-blue-600 hover:underline">support@bankscart.com</a><br />
                    General & Corporate inquiries
                  </p>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-4">
                <Phone className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 text-base">Customer Assistance</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Monday to Saturday<br />
                    9:30 AM to 6:30 PM IST
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default AboutUs;
