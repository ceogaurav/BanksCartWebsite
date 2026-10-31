import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Building2, Shield, FileCheck, MapPin, Award, CheckCircle2, ChevronRight, Scale, Briefcase, Sparkles, ArrowRight } from 'lucide-react';

interface CompanyRegistrationHubProps {
  openApplyModal?: (service: string) => void;
}

export default function CompanyRegistrationHub({ openApplyModal }: CompanyRegistrationHubProps) {
  const canonicalUrl = "https://www.bankscart.com/company-registration";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Company Registration & Intellectual Property Filing Services",
    "serviceType": "Legal & Corporate Business Incorporation",
    "provider": {
      "@type": "Organization",
      "name": "BanksCart",
      "url": "https://www.bankscart.com/"
    },
    "description": "End-to-end online company registration in India. Fast-track Private Limited, LLP, OPC incorporation across Delhi, Chennai, Bangalore, and copyright protection.",
    "areaServed": "IN"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.bankscart.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Company Registration",
        "item": canonicalUrl
      }
    ]
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-800 antialiased">
      <Helmet>
        <title>Company Registration in India: Pvt Ltd, LLP, OPC &amp; Copyright Filing | BanksCart</title>
        <meta name="description" content="Online company registration services in India. Register Private Limited, LLP, and OPC startups in Delhi, Chennai, and file copyright protection with BanksCart." />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-xs text-slate-500 mb-6 space-x-2">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Company Registration Hub</span>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl space-y-4">
          <span className="inline-block px-3 py-1 bg-white/10 text-teal-300 text-xs font-bold uppercase tracking-wider rounded-full border border-white/20">
            Ministry of Corporate Affairs (MCA) Fast-Track Portal
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Company Registration &amp; IP Protection in India
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Incorporate your business with complete legal, regulatory, and tax compliance. Access digital DSC, DIN allotments, SPICe+ MCA filing, MSME Udyam registration, and copyright IP filings.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => openApplyModal && openApplyModal('Company Registration')}
              className="px-6 py-3 bg-teal-400 hover:bg-teal-300 text-slate-900 font-extrabold rounded-xl shadow text-xs transition-colors cursor-pointer"
            >
              Start Online Registration &rarr;
            </button>
            <a
              href="#silo-cluster"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 text-xs transition-colors"
            >
              Explore Regional Hubs
            </a>
          </div>
        </section>

        {/* SILO CLUSTER SECTION: Top-Priority Internal Linking Destinations */}
        <section id="silo-cluster" className="mb-12">
          <div className="mb-6">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Incorporation &amp; IP Silo</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Specialized Regional Incorporation &amp; Copyright Hubs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Direct access to our high-intent business formation centers across tier-1 industrial corridors:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Delhi Regional Hub */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4 font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Company Registration in Delhi</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Register your Private Limited or LLP startup across NCR (Delhi, Gurgaon, Noida). Complete MCA clearance, ROC NCT filing, and priority startup business loan matching.
                </p>
                <ul className="text-xs text-slate-500 space-y-1.5 mb-4">
                  <li>• ROC NCT of Delhi &amp; Haryana</li>
                  <li>• SPICe+ filing within 3 to 5 days</li>
                  <li>• Startup India Seed Fund access</li>
                </ul>
              </div>
              <Link
                to="/business-loan/company-registration-in-delhi"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 pt-3 border-t border-slate-100 group"
              >
                Explore Delhi Company Registration <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 2. Chennai Regional Hub */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4 font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Company Registration in Chennai</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Fast-track incorporation for manufacturing, software, and export businesses in Chennai, Tamil Nadu. ROC Chennai coordination and low-interest MSME loan assistance.
                </p>
                <ul className="text-xs text-slate-500 space-y-1.5 mb-4">
                  <li>• ROC Tamil Nadu (Chennai Hub)</li>
                  <li>• Guidance for SIPCOT / MEPZ entities</li>
                  <li>• Working capital credit clearances</li>
                </ul>
              </div>
              <Link
                to="/business-loan/company-registration-in-chennai"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 pt-3 border-t border-slate-100 group"
              >
                Explore Chennai Company Registration <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 3. Copyright & IP Filing */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4 font-bold">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Copyright Registration Services</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Safeguard your software code, literary content, brand designs, artistic assets, and mobile app algorithms with official registration under the Indian Copyright Act, 1957.
                </p>
                <ul className="text-xs text-slate-500 space-y-1.5 mb-4">
                  <li>• Copyright Office of India filing</li>
                  <li>• Form XIV online preparation</li>
                  <li>• 60-year statutory legal monopoly</li>
                </ul>
              </div>
              <Link
                to="/company-registration/copyright-registration"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-800 pt-3 border-t border-slate-100 group"
              >
                Explore Copyright Registration <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Incorporation Steps */}
        <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-slate-900">4-Step MCA Digital Registration Workflow</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-extrabold text-blue-600 uppercase block mb-1">Step 1</span>
              <h4 className="font-bold text-sm text-slate-800 mb-1">DSC &amp; Name Approval</h4>
              <p className="text-xs text-slate-600">Obtain Class-3 Digital Signatures and reserve company name via RUN / SPICe+ Part A.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-extrabold text-blue-600 uppercase block mb-1">Step 2</span>
              <h4 className="font-bold text-sm text-slate-800 mb-1">MoA &amp; AoA Drafting</h4>
              <p className="text-xs text-slate-600">Draft electronic Memorandum and Articles of Association customized for your business object.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-extrabold text-blue-600 uppercase block mb-1">Step 3</span>
              <h4 className="font-bold text-sm text-slate-800 mb-1">SPICe+ MCA Submission</h4>
              <p className="text-xs text-slate-600">Integrated filing for PAN, TAN, EPFO, ESIC, Professional Tax, and bank account opening.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-extrabold text-blue-600 uppercase block mb-1">Step 4</span>
              <h4 className="font-bold text-sm text-slate-800 mb-1">Certificate of Incorporation</h4>
              <p className="text-xs text-slate-600">Receive your CIN and Certificate of Incorporation from the Registrar of Companies (ROC).</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
