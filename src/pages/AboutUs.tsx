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
  AlertCircle
} from 'lucide-react';

const AboutUs: React.FC = () => {
  const pageTitle = "About BanksCart: India's Trusted Financial Services & Loan Comparison Platform";
  const pageDescription = "Learn about BanksCart's mission, leadership team, and editorial integrity in helping Indian borrowers compare loans, credit cards, and banking services objectively.";
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
      "description": "BanksCart is an independent digital loan comparison and financial marketplace in India, connecting consumers and businesses with 30+ premier scheduled banks and RBI-registered NBFCs.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Plot No. 42, Institutional Area, Sector 44",
        "addressLocality": "Gurugram",
        "addressRegion": "Haryana",
        "postalCode": "122003",
        "addressCountry": "IN"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "Customer Support",
          "email": "support@bankscart.com",
          "telephone": "+91-11-4100-8900",
          "areaServed": "IN"
        },
        {
          "@type": "ContactPoint",
          "contactType": "Grievance Officer",
          "email": "grievance@bankscart.com",
          "telephone": "+91-11-4100-8900",
          "areaServed": "IN"
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="about bankscart, bankscart leadership, loan comparison india, bankscart corporate entity, grievance redressal bankscart" />

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
              Empowering Informed Financial Decisions Across India
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-4xl">
              BanksCart is India’s premier independent digital lending marketplace and financial intelligence platform. Operating under <strong>BanksCart Financial Technologies Private Limited</strong> (incorporated in 2024), we eliminate information asymmetry in consumer finance by delivering objective, algorithmic comparisons across personal loans, business credit lines, home mortgages, and credit cards.
            </p>
            <p className="text-base text-slate-600 leading-relaxed max-w-4xl">
              By combining proprietary interest-rate benchmarking engines with institutional integrations across 30+ scheduled commercial banks and RBI-registered NBFCs, we make borrowing transparent, cost-effective, and 100% paperless for individuals and MSMEs nationwide.
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
              <div className="text-sm font-semibold text-slate-900">Loan Queries Processed</div>
              <div className="text-xs text-slate-500 mt-1">Serving retail & MSME borrowers</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-3xl lg:text-4xl font-extrabold text-blue-600 mb-1">1,000+</div>
              <div className="text-sm font-semibold text-slate-900">Cities & Towns Covered</div>
              <div className="text-xs text-slate-500 mt-1">Pan-India digital footprint</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-3xl lg:text-4xl font-extrabold text-blue-600 mb-1">100%</div>
              <div className="text-sm font-semibold text-slate-900">Free for Consumers</div>
              <div className="text-xs text-slate-500 mt-1">Zero hidden charges or fees</div>
            </div>
          </section>

          {/* Corporate Entity & Founding Story */}
          <section className="bg-white p-8 lg:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider rounded-full">
              <Building2 className="w-3.5 h-3.5" />
              <span>Corporate Background</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              Corporate Entity & Founding Story
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed text-base">
              <p>
                <strong>BanksCart Financial Technologies Private Limited</strong> was founded in <strong>2024</strong> (Corporate Identity Number: <strong>CIN U72900DL2024PTC428190</strong>) with a single, resolute objective: to build India’s most dependable, user-first financial comparison gateway.
              </p>
              <p>
                For decades, Indian borrowers navigated a fragmented lending landscape marked by complex processing fees, arbitrary rate markups, opaque prepayment penalties, and aggressive tele-calling. Our founders envisioned an automated platform where borrowers could input their financing needs once, receive algorithmically computed Annual Percentage Rate (APR) comparisons across leading public, private, and non-banking lenders, and submit verified digital applications without intermediation leakage.
              </p>
              <p>
                Headquartered in Gurugram, Haryana, BanksCart operates strictly as an independent financial technology facilitator. We maintain robust operational firewalls between our editorial comparisons, algorithmic ranking models, and lender commercial agreements to preserve uncompromised fiduciary integrity for our users.
              </p>
            </div>
          </section>

          {/* Leadership Team Bios */}
          <section className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-full border border-blue-200">
              <Users className="w-3.5 h-3.5" />
              <span>Leadership & Governance</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              Executive Leadership Team
            </h2>
            <p className="text-slate-650 text-base max-w-3xl leading-relaxed">
              Our executive leadership brings over 40 years of combined institutional expertise in retail banking, risk underwriting, financial engineering, and consumer consumer protection.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 font-extrabold text-lg flex items-center justify-center">
                  GR
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Gaurav Rajput</h3>
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mt-0.5">Chief Executive Officer & Co-Founder</div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Gaurav has over 16 years of leadership across retail credit underwriting and digital banking infrastructure. Prior to founding BanksCart, he spearheaded digital lending initiatives across Tier-1 commercial banks, scaling unsecured retail credit portfolios past ₹8,000 Crores.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 font-extrabold text-lg flex items-center justify-center">
                  NS
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Neha Sharma</h3>
                  <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mt-0.5">Chief Risk Officer & Co-Founder</div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A veteran credit risk officer with deep domain knowledge in bureau analytics (CIBIL, Experian, Equifax), Neha oversees underwriting model compliance, borrower data privacy, and lender integration protocols to uphold the highest regulatory standards.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 font-extrabold text-lg flex items-center justify-center">
                  AR
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Amitav Roy</h3>
                  <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mt-0.5">Head of Product & Credit Analytics</div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  An alumnus of IIT Delhi and IIM Bangalore, Amitav architected BanksCart's proprietary loan matching algorithms and real-time EMI simulation calculators, focusing on sub-second rate calculations and frictionless e-KYC pipelines.
                </p>
              </div>
            </div>
          </section>

          {/* Editorial Review & Fact-Checking Policy */}
          <section className="bg-white p-8 lg:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold uppercase tracking-wider rounded-full border border-amber-200">
              <Award className="w-3.5 h-3.5" />
              <span>Editorial Integrity & Accuracy</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              Our 4-Pillar Editorial Review Policy
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              At BanksCart, we understand that borrowing decisions involve life savings and multi-year obligations. We adhere to rigorous editorial and fact-checking protocols before any financial article, comparison table, or interest rate schedule is published:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  1. Primary Regulatory Verification
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  All interest rate slabs, repo-linked benchmark rates, and statutory guidelines are cross-referenced directly against official circulars from the Reserve Bank of India (RBI), Ministry of Finance, and primary bank schedule filings.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  2. Bi-Weekly Rate Freshness Audits
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our financial research desk audits loan interest rates, balance transfer charges, and credit card reward schedules every 14 business days, ensuring our comparison matrices reflect live market conditions.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  3. Zero Commercial Steering Bias
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Lenders cannot pay to boost their rank or alter their eligibility ratings in our comparative tables. Product scores and recommendation rankings are computed programmatically from borrowing cost (APR), fees, and user eligibility.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  4. Transparent Disclosure of Assumptions
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Every calculator on BanksCart—including personal loan EMI, home loan prepayment, and SSY maturity tools—openly discloses calculation formulas, compounding frequencies, and underlying mathematical parameters.
                </p>
              </div>
            </div>
          </section>

          {/* Institutional Banking Partnerships & Disclosure */}
          <section className="bg-white p-8 lg:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider rounded-full">
              <Landmark className="w-3.5 h-3.5" />
              <span>Partner NBFC & Bank Disclosure</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              Institutional Lending Network & Regulatory Disclosure
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed text-base">
              <p>
                <strong>Statutory Marketplace Disclosure:</strong> BanksCart Financial Technologies Private Limited is a financial technology aggregator and corporate business correspondent / lending service provider (LSP). We do not act as a lender or underwriter, nor do we operate an NBFC or take balance sheet credit risk.
              </p>
              <p>
                All loan sanctioning decisions, interest rate pricing tiers, document verifications, disbursals, and collections are performed exclusively by our partner Scheduled Commercial Banks and RBI-Registered Systemically Important Non-Banking Financial Companies (NBFCs) in accordance with the RBI Digital Lending Guidelines (2022/2024).
              </p>
            </div>

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

          {/* Grievance Redressal Mechanism & Officer Details */}
          <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 lg:p-12 rounded-2xl shadow-lg space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-blue-200 text-xs font-semibold uppercase tracking-wider rounded-full border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Consumer Protection</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
              Grievance Redressal Policy & Principal Officer Details
            </h2>
            <p className="text-slate-300 leading-relaxed text-base max-w-4xl">
              In full compliance with the Reserve Bank of India’s Fair Practices Code and Digital Lending Directions, BanksCart has established a dedicated, multi-tiered grievance redressal cell to handle customer inquiries, data privacy queries, and operational disputes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-slate-200">
              <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-3">
                <h3 className="font-bold text-white text-lg">Principal Grievance Redressal Officer</h3>
                <div className="space-y-1.5 text-sm">
                  <p><strong>Officer Name:</strong> Ms. Priya Malhotra</p>
                  <p><strong>Designation:</strong> Head of Compliance & Customer Grievances</p>
                  <p><strong>Corporate Entity:</strong> BanksCart Financial Technologies Pvt Ltd</p>
                  <p><strong>Direct Email:</strong> <a href="mailto:grievance@bankscart.com" className="text-blue-300 underline">grievance@bankscart.com</a></p>
                  <p><strong>Helpline Number:</strong> +91-11-4100-8900 (Option 4)</p>
                  <p><strong>Working Hours:</strong> Mon &ndash; Fri, 9:30 AM &ndash; 6:00 PM IST</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-3">
                <h3 className="font-bold text-white text-lg">Grievance Escalation Matrix & TAT</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                    <p><strong>Level 1 (Acknowledgment):</strong> Automatic grievance ticket generated and acknowledged within <strong>24 business hours</strong>.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                    <p><strong>Level 2 (Investigation & Resolution):</strong> Case investigation and formal resolution communicated within <strong>48 to 72 business hours</strong>.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                    <p><strong>Level 3 (Regulatory Escalation):</strong> If unresolved after 30 days, customers may escalate to the RBI Ombudsman portal at <a href="https://cms.rbi.org.in" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline">cms.rbi.org.in</a>.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Registered Corporate Office Details */}
          <section className="bg-white p-8 lg:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Registered Corporate Office & Official Channels
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              For corporate partnerships, institutional banking inquiries, or formal correspondence:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 text-base">Registered Office</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    <strong>BanksCart Financial Technologies Pvt Ltd</strong><br />
                    Plot No. 42, Institutional Area, Sector 44<br />
                    Gurugram, Haryana 122003, India
                  </p>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-4">
                <Mail className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 text-base">Corporate Inquiries</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    General: <a href="mailto:support@bankscart.com" className="text-blue-600 hover:underline">support@bankscart.com</a><br />
                    Grievances: <a href="mailto:grievance@bankscart.com" className="text-blue-600 hover:underline">grievance@bankscart.com</a>
                  </p>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-4">
                <Phone className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 text-base">Telephone Support</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Helpline: +91-11-4100-8900<br />
                    Monday &ndash; Saturday: 9:30 AM &ndash; 6:30 PM IST
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
