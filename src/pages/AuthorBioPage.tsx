import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ShieldCheck,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  ExternalLink,
  CheckCircle2,
  FileText,
  ArrowRight,
  UserCheck,
  Mail
} from 'lucide-react';
import { AUTHORS_DATA, DEFAULT_AUTHOR, AuthorProfile } from '../data/authorsData';

export const AuthorBioPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const author: AuthorProfile = (slug && AUTHORS_DATA[slug]) ? AUTHORS_DATA[slug] : DEFAULT_AUTHOR;

  const pageTitle = `${author.name}, ${author.credentials.split('•')[0].trim()} - Financial Author Bio | BanksCart`;
  const pageDescription = `${author.shortBio} View verified degrees, professional certifications (ICAI, CFA, CFP), and banking research credentials on BanksCart.`;
  const canonicalUrl = `https://www.bankscart.com/author/${author.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": author.name,
      "jobTitle": author.role,
      "worksFor": {
        "@type": "Organization",
        "name": "BanksCart",
        "url": "https://www.bankscart.com"
      },
      "description": author.shortBio,
      "sameAs": [author.linkedin],
      "alumniOf": author.education.map(edu => ({
        "@type": "EducationalOrganization",
        "name": edu
      })),
      "hasCredential": author.certifications.map(cert => ({
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Professional Certification",
        "name": cert
      }))
    }
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><span>/</span></li>
              <li><Link to="/blog" className="hover:text-blue-600 transition-colors">Editorial Team</Link></li>
              <li><span>/</span></li>
              <li className="text-slate-800 font-medium" aria-current="page">{author.name}</li>
            </ol>
          </nav>

          {/* Profile Header Hero Card */}
          <section className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex items-center justify-center font-bold text-3xl shadow-md">
                  {author.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow" title="Verified Financial Expert">
                  <CheckCircle2 className="w-5 h-5" />
                </span>
              </div>

              <div className="space-y-2 flex-grow">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-200">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Financial Author & Reviewer</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {author.name}
                </h1>
                <p className="text-base text-blue-700 font-semibold">
                  {author.role}
                </p>
                <p className="text-sm text-slate-600 font-medium">
                  {author.credentials}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto">
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0A66C2] text-white rounded-lg text-sm font-semibold hover:bg-[#084e96] transition-colors shadow-sm"
                >
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  to="/editorial-policy"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors border border-slate-300"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Editorial Standards</span>
                </Link>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-center">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-2xl font-bold text-slate-900">{author.experienceYears}+</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Years Experience</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-2xl font-bold text-blue-600">{author.articlesCount}+</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Articles Authored</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-2xl font-bold text-emerald-600">{author.reviewsCount}+</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Audits & Reviews</div>
              </div>
            </div>
          </section>

          {/* Biography & Academic Background */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 space-y-6">
              {/* Full Bio */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <span>Professional Background & Biography</span>
                </h2>
                <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                  {author.fullBio.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Core Areas of Financial Expertise */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <span>Areas of Financial Expertise</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {author.areasOfExpertise.map((area, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Editorial Ethics Pledge */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <span>Editorial Independence & Ethics Pledge</span>
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  "As a financial contributor to BanksCart, I pledge that all loan calculations, interest comparisons, and bank product assessments are generated with complete objectivity. My evaluations are never influenced by affiliate partnerships, lender commissions, or commercial relationships. Every published rate is cross-verified against official scheduled commercial bank schedules and Reserve Bank of India circulars."
                </p>
                <p className="text-xs font-bold text-slate-800">
                  — {author.name}, {author.role}
                </p>
              </div>
            </div>

            {/* Sidebar: Education & Certifications */}
            <div className="md:col-span-4 space-y-6">
              {/* Professional Certifications */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Licenses & Certifications</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  {author.certifications.map((cert, idx) => (
                    <li key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-mono leading-relaxed">
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Degrees & Education */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>Academic Degrees</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {author.education.map((edu, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links to Featured Guides */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  <span>Featured Guides</span>
                </h3>
                <ul className="space-y-2 text-xs">
                  <li>
                    <Link to="/blogs/What-Is-Cibil-Score" className="text-blue-600 hover:underline font-medium block">
                      The Ultimate Guide to CIBIL Score &rarr;
                    </Link>
                  </li>
                  <li>
                    <Link to="/loans/personal/overview" className="text-blue-600 hover:underline font-medium block">
                      Personal Loan Comparison 2026 &rarr;
                    </Link>
                  </li>
                  <li>
                    <Link to="/loans/home" className="text-blue-600 hover:underline font-medium block">
                      Home Loan Rates & PMAY Guide &rarr;
                    </Link>
                  </li>
                  <li>
                    <Link to="/cards" className="text-blue-600 hover:underline font-medium block">
                      Best Credit Cards in India &rarr;
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Non-Lender Regulatory Disclosure Note */}
          <section className="bg-slate-100 rounded-xl p-5 border border-slate-300 text-xs text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-800 block mb-1">Financial Services Notice:</span>
            BanksCart is an independent digital loan and credit comparison marketplace. BanksCart is not a licensed bank, NBFC, or credit institution, and does not lend money directly. All loan approvals, interest rates, disbursal terms, and credit decisions are made exclusively at the discretion of RBI-regulated banks and NBFC partners. We do not charge borrowers upfront processing fees for loan matching.
          </section>
        </main>
      </div>
    </>
  );
};

export default AuthorBioPage;
