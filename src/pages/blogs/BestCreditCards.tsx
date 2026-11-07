import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  CreditCard,
  CheckCircle2,
  Percent,
  Clock,
  ShieldCheck,
  TrendingUp,
  Gift,
  Plane,
  Sparkles,
  HelpCircle,
  Building
} from 'lucide-react';

export default function BestCreditCards() {
  const canonicalUrl = "https://www.bankscart.com/blog/Best-Credit-Cards";
  const articleTitle = "15 Best Credit Cards in India (2026): Cashback, Travel & Lifetime Free Compared";
  const articleDesc = "Complete 2026 review of India's top 15 credit cards: compare HDFC Millennia, SBI Cashback, Amazon Pay ICICI, Axis Atlas, and Tata Neu Infinity for maximum reward returns.";

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "headline": articleTitle,
    "description": articleDesc,
    "image": "https://www.bankscart.com/assets/images/bankscart-logo.png",
    "author": {
      "@type": "Person",
      "name": "Neha Verma",
      "jobTitle": "Senior Personal Finance Specialist",
      "url": "https://www.bankscart.com/author/neha-verma"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BanksCart",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.bankscart.com/assets/images/bankscart-logo.png"
      }
    },
    "datePublished": "2026-01-10T09:00:00+05:30",
    "dateModified": "2026-11-06T10:00:00+05:30"
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
        "name": "Blog",
        "item": "https://www.bankscart.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Best Credit Cards 2026",
        "item": canonicalUrl
      }
    ]
  };

  const topCards = [
    {
      name: "SBI Cashback Credit Card",
      annualFee: "₹999 + GST (Waived on ₹2L spend)",
      rewardRate: "5% Direct Cashback on Online Spends",
      loungeAccess: "No domestic lounge",
      bestFor: "All Online Shopping (Amazon, Flipkart, Myntra, Swiggy, Zomato)"
    },
    {
      name: "Amazon Pay ICICI Card",
      annualFee: "₹0 (Lifetime Free)",
      rewardRate: "5% for Prime, 3% for Non-Prime on Amazon",
      loungeAccess: "No domestic lounge",
      bestFor: "Lifetime Free Simplicity & Amazon Shoppers"
    },
    {
      name: "HDFC Millennia Credit Card",
      annualFee: "₹1,000 + GST (Waived on ₹1L spend)",
      rewardRate: "5% Cashback on 10 Key Merchant Partners",
      loungeAccess: "1 complimentary domestic lounge/quarter",
      bestFor: "Daily Lifestyle & Weekend Dining"
    },
    {
      name: "Axis Bank Atlas Credit Card",
      annualFee: "₹5,000 + GST",
      rewardRate: "Up to 5 EDGE Miles per ₹100 on Flight/Hotels",
      loungeAccess: "8 to 18 domestic + international lounge visits",
      bestFor: "Frequent Business & Leisure Travelers"
    },
    {
      name: "Tata Neu Infinity HDFC Card",
      annualFee: "₹1,499 + GST (Waived on ₹3L spend)",
      rewardRate: "10% NeuCoins on Tata Neu Ecosystem & 1.5% UPI",
      loungeAccess: "2 complimentary domestic lounges/quarter",
      bestFor: "UPI Payments & Tata Ecosystem Shoppers"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pt-20 sm:pt-24 pb-16">
      <Helmet>
        <title>{`${articleTitle} | BanksCart`}</title>
        <meta name="description" content={articleDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(blogPostingSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Breadcrumb path={["Home", "Blog", "Best Credit Cards 2026"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Credit Cards Master Review
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">15 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            15 Best Credit Cards in India (2026): Cashback, Travel & Lifetime Free Compared
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From direct cashback credit cards saving you ₹20,000+ per year to premium travel cards unlocking airport lounges and airline air-miles, here is an analytical breakdown of India's top credit cards for 2026.
          </p>

          <AuthorByline authorSlug="neha-verma" />
        </header>

        {/* Section 1: Comparison Table */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-700" />
            1. 2026 Top Credit Cards Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="p-3 font-bold">Credit Card</th>
                  <th className="p-3 font-bold">Annual Fee</th>
                  <th className="p-3 font-bold">Core Reward Rate</th>
                  <th className="p-3 font-bold">Lounge Access</th>
                  <th className="p-3 font-bold">Ideal User Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
                {topCards.map((c, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{c.name}</td>
                    <td className="p-3 tabular-nums font-mono text-xs">{c.annualFee}</td>
                    <td className="p-3 font-medium text-emerald-700">{c.rewardRate}</td>
                    <td className="p-3 text-xs">{c.loungeAccess}</td>
                    <td className="p-3 text-xs text-slate-600">{c.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: How to Pick the Right Card */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-600" />
            2. How to Choose the Perfect Credit Card
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">Direct Cashback</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Choose cashback cards if you spend heavily on groceries, utility bills, food delivery, and ecommerce and prefer statement credit over complicated reward catalogs.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">Travel & Miles</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Choose cards like Axis Atlas or HDFC Regalia Gold if you fly 4+ times a year, stay at partner hotels, and value airport lounge access and low forex markup fees.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">RuPay UPI Cards</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Choose RuPay cards if you do frequent daily QR code scans at local merchants, enabling you to earn cashback points directly on everyday UPI transactions.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Pre-Approved Card Offers
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Find the Best Credit Card for Your Spends
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Compare annual fees, lounge quotas, reward redemption rates, and check 100% pre-approved card offers with zero paperwork.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/cards/credit/overview"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Compare Credit Cards Now &rarr;
            </Link>
            <Link
              to="/blog/best-lifetime-free-credit-cards"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Explore Lifetime Free Cards
            </Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Card Issuer Disclosure</span>
          </div>
          <p>
            Card terms, milestone reward calculations, joining fees, and lounge access conditions are updated in accordance with recent issuer devaluation circulars as of November 2026. BanksCart operates solely as an independent digital credit marketplace.
          </p>
        </div>
      </article>
    </div>
  );
}
