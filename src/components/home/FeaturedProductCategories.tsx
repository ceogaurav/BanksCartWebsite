import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Banknote,
  Briefcase,
  Home as HomeIcon,
  CreditCard,
  Gauge,
  ArrowRight,
  CheckCircle2,
  TrendingDown
} from 'lucide-react';

interface FeaturedProductCategoriesProps {
  openApplyModal?: (loanType?: string) => void;
  openEligibilityModal?: (loanType?: string) => void;
  openCibilModal?: () => void;
}

export default function FeaturedProductCategories({
  openApplyModal,
  openEligibilityModal,
  openCibilModal
}: FeaturedProductCategoriesProps) {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'personal-loan',
      title: 'Personal Loans',
      icon: Banknote,
      rateHighlight: 'From 10.49% p.a.',
      maxLimit: 'Up to ₹40 Lakhs',
      tenure: '12 to 60 Months',
      features: [
        'Instant paperless disbursal',
        'Minimal KYC documentation',
        'Zero collateral required'
      ],
      primaryAction: () => openEligibilityModal ? openEligibilityModal('Personal Loan') : navigate('/loans/personal-loan'),
      primaryLabel: 'Check Eligibility',
      secondaryAction: () => navigate('/loans/personal-loan'),
      badge: 'Popular',
      badgeColor: 'bg-blue-50 text-blue-900 border-blue-200',
    },
    {
      id: 'business-loan',
      title: 'Business Loans',
      icon: Briefcase,
      rateHighlight: 'From 11.20% p.a.',
      maxLimit: 'Up to ₹1 Crore',
      tenure: '12 to 60 Months',
      features: [
        'Collateral-free MSME options',
        'Flexible working capital lines',
        'Turnover-based underwriting'
      ],
      primaryAction: () => openEligibilityModal ? openEligibilityModal('Business Loan') : navigate('/loans/business-loan'),
      primaryLabel: 'Check Eligibility',
      secondaryAction: () => navigate('/loans/business-loan'),
      badge: 'MSME Fast Track',
      badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    },
    {
      id: 'home-loan',
      title: 'Home Loans',
      icon: HomeIcon,
      rateHighlight: 'From 8.35% p.a.',
      maxLimit: 'Up to ₹10 Crores',
      tenure: 'Up to 30 Years',
      features: [
        'Lowest reducing balance APR',
        'Balance transfer savings',
        'Maximum tax benefits (80C & 24b)'
      ],
      primaryAction: () => openEligibilityModal ? openEligibilityModal('Home Loan') : navigate('/loans/home-loan'),
      primaryLabel: 'Check Eligibility',
      secondaryAction: () => navigate('/loans/home-loan'),
      badge: 'Lowest Rates',
      badgeColor: 'bg-amber-50 text-amber-900 border-amber-200',
    },
    {
      id: 'credit-cards',
      title: 'Credit Cards',
      icon: CreditCard,
      rateHighlight: 'Lifetime Free Options',
      maxLimit: '50+ Partner Cards',
      tenure: 'Up to 50 Days Interest-Free',
      features: [
        'Up to 5% unlimited cashback',
        'Complimentary lounge access',
        'Instant digital virtual cards'
      ],
      primaryAction: () => navigate('/cards/credit'),
      primaryLabel: 'Compare Cards',
      secondaryAction: () => navigate('/cards/credit'),
      badge: 'Rewards',
      badgeColor: 'bg-purple-50 text-purple-900 border-purple-200',
    },
    {
      id: 'credit-score',
      title: 'Credit Score & Report',
      icon: Gauge,
      rateHighlight: '100% Free CIBIL Report',
      maxLimit: 'Bureau Score 300 – 900',
      tenure: 'Monthly Free Refresh',
      features: [
        'Zero impact on credit score',
        'Personalized score health tips',
        'Detect disputes & errors early'
      ],
      primaryAction: () => openCibilModal ? openCibilModal() : navigate('/credit-score'),
      primaryLabel: 'Check Free Score',
      secondaryAction: () => navigate('/credit-score'),
      badge: 'Free Service',
      badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white font-ibm border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            <span>Primary Financial Products</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Explore Core Borrowing &amp; Credit Solutions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Institutional loan products and card lines matched precisely to your credit profile and financial goals.
          </p>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md hover:border-slate-300 hover:bg-white transition-all duration-200 group"
              >
                <div>
                  {/* Top Row: Icon & Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-slate-900 shadow-2xs group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${cat.badgeColor}`}>
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 mb-1 leading-snug">
                    {cat.title}
                  </h3>

                  {/* Highlight Metric */}
                  <div className="text-xs font-bold text-emerald-700 mb-1">
                    {cat.rateHighlight}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mb-4">
                    {cat.maxLimit}
                  </div>

                  {/* Bullet features */}
                  <ul className="space-y-2 text-xs text-slate-600 mb-6 pt-3 border-t border-slate-200/70">
                    {cat.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Primary Button */}
                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                  <button
                    type="button"
                    onClick={cat.primaryAction}
                    className="w-full py-2.5 px-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <span>{cat.primaryLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={cat.secondaryAction}
                    className="w-full py-1.5 text-center text-[11px] font-semibold text-slate-600 hover:text-slate-900 block"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
