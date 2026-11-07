import React, { useState, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  Percent,
  Calculator,
  TrendingUp,
  Clock,
  Hourglass,
  PiggyBank,
  ShieldAlert,
  Sparkles,
  Info,
  ChevronDown,
  CheckCircle,
  Scale,
  Search,
  Landmark,
  ArrowRight,
  ShieldCheck,
  Zap,
  AlertTriangle,
  ReceiptText,
  Calendar,
  Layers,
  HelpCircle
} from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ApplyButton from '../../components/common/ApplyButton';
import Breadcrumb from '../../components/Breadcrumb';

ChartJS.register(ArcElement, Tooltip, Legend);

// --- Number & Currency Formatting Helpers ---
const formatCurrency = (value: number | string): string => {
  if (typeof value === 'string') {
    value = parseFloat(value.replace(/,/g, ''));
  }
  if (!isFinite(value) || isNaN(value) || value === null) {
    return '₹ 0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatNumberWithCommas = (value: number | string): string => {
  if (typeof value === 'number') {
    if (!isFinite(value) || isNaN(value)) return '0';
    return value.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }
  const clean = value.replace(/\D/g, '');
  if (!clean) return '0';
  return Number(clean).toLocaleString('en-IN', { maximumFractionDigits: 0 });
};

const formatMonths = (totalMonths: number): string => {
  if (totalMonths === Infinity || totalMonths > 600) return 'Never (Payment too low)';
  if (totalMonths <= 0) return '0 Months';
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (years === 0) return `${months} ${months === 1 ? 'Month' : 'Months'}`;
  if (months === 0) return `${years} ${years === 1 ? 'Year' : 'Years'}`;
  return `${years} ${years === 1 ? 'Yr' : 'Yrs'}, ${months} ${months === 1 ? 'Mo' : 'Mos'}`;
};

// --- Financial Calculation Engines ---

interface PayoffScheduleRow {
  month: number;
  year: number;
  openingBalance: number;
  payment: number;
  principal: number;
  interest: number;
  closingBalance: number;
}

interface PayoffResult {
  months: number;
  totalInterest: number;
  totalPaid: number;
  schedule: PayoffScheduleRow[];
  isPayoffPossible: boolean;
}

// Fixed Monthly Payment Payoff Engine
const calculateFixedPayoff = (
  balance: number,
  annualRate: number,
  monthlyPayment: number
): PayoffResult => {
  if (balance <= 0) {
    return { months: 0, totalInterest: 0, totalPaid: 0, schedule: [], isPayoffPossible: true };
  }

  const monthlyRate = annualRate / 100 / 12;
  const initialMonthlyInterest = balance * monthlyRate;

  // If monthly payment doesn't even cover the interest on the initial balance, debt will never payoff
  if (monthlyPayment <= initialMonthlyInterest || monthlyPayment <= 0) {
    return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity, schedule: [], isPayoffPossible: false };
  }

  let remainingBalance = balance;
  let totalPaymentsMade = 0;
  let totalInterestPaid = 0;
  let month = 0;
  const schedule: PayoffScheduleRow[] = [];
  const maxMonths = 600; // 50 years cap

  while (remainingBalance > 0.01 && month < maxMonths) {
    month++;
    const opening = remainingBalance;
    const interestThisMonth = remainingBalance * monthlyRate;
    let principalPaid = monthlyPayment - interestThisMonth;
    let actualPayment = monthlyPayment;

    if (principalPaid >= remainingBalance) {
      principalPaid = remainingBalance;
      actualPayment = remainingBalance + interestThisMonth;
      remainingBalance = 0;
    } else {
      remainingBalance -= principalPaid;
    }

    totalPaymentsMade += actualPayment;
    totalInterestPaid += interestThisMonth;

    schedule.push({
      month,
      year: Math.ceil(month / 12),
      openingBalance: Math.round(opening),
      payment: Math.round(actualPayment),
      principal: Math.round(principalPaid),
      interest: Math.round(interestThisMonth),
      closingBalance: Math.max(0, Math.round(remainingBalance)),
    });

    if (remainingBalance <= 0) break;
  }

  return {
    months: month,
    totalInterest: Math.round(totalInterestPaid),
    totalPaid: Math.round(totalPaymentsMade),
    schedule,
    isPayoffPossible: remainingBalance <= 0.01,
  };
};

// Indian Credit Card Minimum Payment (MAD) Trap Simulation
// Typical Indian Bank Formula: MAD = 5% of balance OR (Interest + 1% principal), min ₹500
const calculateMinimumPaymentTrap = (
  balance: number,
  annualRate: number
): { months: number; totalInterest: number; totalPaid: number } => {
  if (balance <= 0) return { months: 0, totalInterest: 0, totalPaid: 0 };

  const monthlyRate = annualRate / 100 / 12;
  let remaining = balance;
  let totalPaid = 0;
  let totalInterest = 0;
  let months = 0;
  const maxMonths = 360; // 30-year simulation cap

  while (remaining > 50 && months < maxMonths) {
    months++;
    const interest = remaining * monthlyRate;
    totalInterest += interest;

    // Minimum amount due: 5% of balance, or interest + 1% principal, with a ₹500 floor
    const fivePercent = remaining * 0.05;
    const interestPlusOne = interest + remaining * 0.01;
    let minDue = Math.max(500, Math.max(fivePercent, interestPlusOne));

    if (minDue >= remaining + interest) {
      minDue = remaining + interest;
      totalPaid += minDue;
      remaining = 0;
      break;
    }

    const principalCovered = Math.max(0, minDue - interest);
    remaining -= principalCovered;
    totalPaid += minDue;
  }

  return {
    months: remaining <= 50 ? months : Infinity,
    totalInterest: Math.round(totalInterest),
    totalPaid: Math.round(totalPaid),
  };
};

// --- Animations ---
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// --- FAQ Item Component ---
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-200 hover:border-slate-300">
      <button
        className="flex justify-between items-center w-full p-5 text-left focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <HelpCircle className="w-5 h-5 text-[#1E3A8A] flex-shrink-0" />
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">{question}</h3>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="px-5 pb-5 pt-1"
          >
            <div
              className="text-slate-600 leading-relaxed text-sm sm:text-base border-t border-slate-100 pt-3"
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Component ---
interface CreditCardPayoffCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
  openEligibilityModal?: (loanType?: string) => void;
}

const CreditCardPayoffCalculatorPage: React.FC<CreditCardPayoffCalculatorPageProps> = ({
  openApplyModal,
  openEligibilityModal,
}) => {
  // Calculator States with Safe Clamping
  const [balance, setBalance] = useState<number>(150000);
  const [apr, setApr] = useState<number>(36.0); // Standard Indian Credit Card APR (3.0% / month)
  const [monthlyPayment, setMonthlyPayment] = useState<number>(6000);
  const [extraPayment, setExtraPayment] = useState<number>(2000);
  const [scheduleView, setScheduleView] = useState<'first12' | 'yearly'>('first12');
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  // Safe Input Handler Builders to make NaN impossible
  const handleBalanceSlider = (val: number) => {
    setBalance(Math.max(5000, Math.min(2500000, val)));
  };

  const handleBalanceText = (raw: string) => {
    const clean = raw.replace(/\D/g, '');
    const num = clean ? parseInt(clean, 10) : 0;
    setBalance(num);
  };

  const handleBalanceBlur = () => {
    setBalance((prev) => Math.max(5000, Math.min(2500000, isNaN(prev) ? 150000 : prev)));
  };

  const handleAprSlider = (val: number) => {
    setApr(Math.max(9.0, Math.min(54.0, val)));
  };

  const handleAprText = (raw: string) => {
    const num = parseFloat(raw);
    setApr(isNaN(num) ? 0 : num);
  };

  const handleAprBlur = () => {
    setApr((prev) => Math.max(9.0, Math.min(54.0, isNaN(prev) ? 36.0 : prev)));
  };

  const handlePaymentSlider = (val: number) => {
    setMonthlyPayment(Math.max(500, Math.min(250000, val)));
  };

  const handlePaymentText = (raw: string) => {
    const clean = raw.replace(/\D/g, '');
    const num = clean ? parseInt(clean, 10) : 0;
    setMonthlyPayment(num);
  };

  const handlePaymentBlur = () => {
    setMonthlyPayment((prev) => Math.max(500, Math.min(250000, isNaN(prev) ? 6000 : prev)));
  };

  const handleExtraSlider = (val: number) => {
    setExtraPayment(Math.max(0, Math.min(100000, val)));
  };

  const handleExtraText = (raw: string) => {
    const clean = raw.replace(/\D/g, '');
    const num = clean ? parseInt(clean, 10) : 0;
    setExtraPayment(num);
  };

  const handleExtraBlur = () => {
    setExtraPayment((prev) => Math.max(0, Math.min(100000, isNaN(prev) ? 0 : prev)));
  };

  // Monthly interest threshold: payment must exceed this to reduce principal
  const monthlyInterestFloor = useMemo(() => {
    return Math.round(balance * (apr / 100 / 12));
  }, [balance, apr]);

  // Minimum Amount Due (MAD) in India: 5% of balance
  const minimumAmountDue = useMemo(() => {
    return Math.max(500, Math.round(balance * 0.05));
  }, [balance]);

  // Run Calculations
  const calculations = useMemo(() => {
    const planned = calculateFixedPayoff(balance, apr, monthlyPayment);
    const accelerated = calculateFixedPayoff(balance, apr, monthlyPayment + extraPayment);
    const minTrap = calculateMinimumPaymentTrap(balance, apr);

    const interestSaved =
      planned.isPayoffPossible && accelerated.isPayoffPossible
        ? Math.max(0, planned.totalInterest - accelerated.totalInterest)
        : 0;

    const timeSavedMonths =
      planned.isPayoffPossible && accelerated.isPayoffPossible
        ? Math.max(0, planned.months - accelerated.months)
        : 0;

    // Estimate personal loan consolidation alternative (12% p.a., 24 months tenure)
    const plMonthlyRate = 12 / 100 / 12;
    const plTenure = 24;
    const plEmi = Math.round(
      (balance * plMonthlyRate * Math.pow(1 + plMonthlyRate, plTenure)) /
        (Math.pow(1 + plMonthlyRate, plTenure) - 1)
    );
    const plTotalInterest = Math.max(0, plEmi * plTenure - balance);
    const plSavings = planned.isPayoffPossible ? Math.max(0, planned.totalInterest - plTotalInterest) : 0;

    // Yearly grouped schedule for the accelerated plan
    const yearlySchedule: { year: number; principalPaid: number; interestPaid: number; closingBalance: number }[] = [];
    const activeSchedule = accelerated.schedule.length > 0 ? accelerated.schedule : planned.schedule;

    if (activeSchedule.length > 0) {
      let currentYear = 1;
      let yPrincipal = 0;
      let yInterest = 0;
      let lastClosing = 0;

      activeSchedule.forEach((row, idx) => {
        yPrincipal += row.principal;
        yInterest += row.interest;
        lastClosing = row.closingBalance;

        if (row.year !== currentYear || idx === activeSchedule.length - 1) {
          yearlySchedule.push({
            year: currentYear,
            principalPaid: yPrincipal,
            interestPaid: yInterest,
            closingBalance: lastClosing,
          });
          currentYear = row.year;
          yPrincipal = 0;
          yInterest = 0;
        }
      });
    }

    return {
      planned,
      accelerated,
      minTrap,
      interestSaved,
      timeSavedMonths,
      plEmi,
      plTotalInterest,
      plSavings,
      yearlySchedule,
    };
  }, [balance, apr, monthlyPayment, extraPayment]);

  // Doughnut Chart Data: Principal vs Interest Paid (Planned vs Accelerated)
  const chartData = useMemo(() => {
    const isAcc = extraPayment > 0;
    const interest = isAcc ? calculations.accelerated.totalInterest : calculations.planned.totalInterest;
    return {
      labels: ['Principal Borrowed', 'Interest Paid to Bank'],
      datasets: [
        {
          data: [balance, isFinite(interest) ? interest : 0],
          backgroundColor: ['#1E3A8A', '#D97706'], // Trust Blue & Gold CTA
          hoverBackgroundColor: ['#0F172A', '#A16207'],
          borderWidth: 2,
          borderColor: '#FFFFFF',
        },
      ],
    };
  }, [balance, extraPayment, calculations]);

  // Informational Data
  const faqs = [
    {
      question: 'What is a Credit Card Payoff Calculator?',
      answer:
        'A Credit Card Payoff Calculator estimates how many months it will take to eliminate your credit card debt and computes the total interest you will pay under different repayment strategies. It helps you avoid the high-interest compound debt trap by modeling extra monthly contributions and loan consolidation.',
    },
    {
      question: 'Why is paying only the Minimum Amount Due (MAD) dangerous?',
      answer:
        'In India, the Minimum Amount Due is usually just 5% of the total balance or interest + 1% principal. When you pay only the minimum, almost 80% to 90% of your money goes towards finance charges rather than reducing the principal. It can take <strong>15 to 25+ years</strong> to pay off a ₹1.5 Lakh balance, costing you more than <strong>200% of your original debt</strong> in interest alone!',
    },
    {
      question: 'What Annual Percentage Rate (APR) do Indian banks charge on credit cards?',
      answer:
        'Most credit card issuers in India (including HDFC Bank, SBI Card, ICICI Bank, and Axis Bank) charge finance fees between <strong>3.0% to 3.75% per month</strong>, translating to an effective APR of <strong>36% to 45% p.a.</strong> Premium cards may start at 24% p.a., while late fees or cash advances can push APRs above 49% p.a.',
    },
    {
      question: 'How do extra payments accelerate debt freedom?',
      answer:
        'Every rupee paid above your regular monthly commitment goes directly towards reducing your outstanding principal. Because credit card interest compounds daily on your revolving balance, reducing the principal immediately lowers daily finance charges, creating a compounding savings effect.',
    },
    {
      question: 'Debt Avalanche vs Debt Snowball: Which strategy is better for credit cards?',
      answer:
        '<strong>Debt Avalanche</strong> targets the credit card with the highest APR first while making minimum payments on other accounts. This mathematically saves the most money in interest. <strong>Debt Snowball</strong> pays off the smallest balance first for psychological momentum. For high-interest credit cards (36%+ APR), the Debt Avalanche is mathematically superior.',
    },
    {
      question: 'Should I consolidate my credit card debt into a Personal Loan?',
      answer:
        'Yes! If your credit score is 700+, you can typically qualify for an unsecured Personal Loan at <strong>10.5% to 14% p.a.</strong> Replacing a 36%-42% credit card APR with a 12% fixed personal loan can cut your interest burden by over <strong>60%</strong> and give you a disciplined 24 to 36-month repayment roadmap.',
    },
  ];

  const debtEliminationTips = [
    {
      icon: <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
      title: 'Always Exceed the Minimum Due',
      desc: 'Paying even ₹1,500 extra every billing cycle slashes years off your payoff timeline and saves thousands in finance fees.',
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-[#1E3A8A] flex-shrink-0" />,
      title: 'Use the Debt Avalanche Strategy',
      desc: 'Rank all your credit cards by interest rate and aggressively pay down the highest APR card first.',
    },
    {
      icon: <PiggyBank className="w-5 h-5 text-amber-600 flex-shrink-0" />,
      title: 'Halt New Card Swipes',
      desc: 'While repaying revolving debt, switch everyday expenses to UPI or debit cards to avoid losing your 45-day interest-free grace period.',
    },
    {
      icon: <Zap className="w-5 h-5 text-purple-600 flex-shrink-0" />,
      title: 'Consolidate High-APR Cards',
      desc: 'Transfer high-rate balances or take an institutional personal loan at 11%-13% to lock in affordable fixed EMIs.',
    },
  ];

  const whyChooseBanksCart = [
    {
      icon: <Scale className="w-8 h-8 text-[#1E3A8A]" />,
      title: 'Unbiased Multi-Bank Comparison',
      desc: 'Compare balance transfer rates and debt consolidation loans across 30+ RBI-approved banks.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
      title: 'Zero Hidden Fees & Transparent APR',
      desc: 'No artificial claims. We reflect genuine Indian banking charges, processing fees, and GST rules.',
    },
    {
      icon: <Search className="w-8 h-8 text-amber-600" />,
      title: 'Instant Soft CIBIL Eligibility',
      desc: 'Check your loan consolidation eligibility without damaging your CIBIL score.',
    },
    {
      icon: <Landmark className="w-8 h-8 text-blue-700" />,
      title: 'RBI Regulated Lending Partners',
      desc: 'Direct tie-ups with leading institutional lenders ensuring bank-grade 256-bit data security.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* SEO Helmet Metadata */}
      <Helmet>
        <title>Credit Card Payoff Calculator 2026: Plan Debt-Free Payoff Strategy | BanksCart</title>
        <meta
          name="description"
          content="Calculate your credit card payoff timeline, avoid the minimum payment trap, and see how much interest you save with accelerated payments. Powered by BanksCart."
        />
        <meta
          name="keywords"
          content="credit card payoff calculator india, credit card debt payoff, credit card minimum payment trap, credit card interest calculator, debt consolidation personal loan"
        />
        <link rel="canonical" href="https://www.bankscart.com/credit-card-payoff-calculator" />

        {/* OpenGraph */}
        <meta property="og:title" content="Credit Card Payoff Calculator 2026 | BanksCart" />
        <meta
          property="og:description"
          content="Discover how fast you can become debt-free. Calculate payoff time, interest savings, and compare minimum payment vs fixed monthly strategies."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bankscart.com/credit-card-payoff-calculator" />
        <meta property="og:site_name" content="BanksCart" />
        <meta property="og:image" content="https://www.bankscart.com/images/og-credit-card-payoff.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Credit Card Payoff Calculator 2026 | BanksCart" />
        <meta
          name="twitter:description"
          content="Simulate credit card payoff timelines and escape the minimum payment trap with BanksCart's free financial calculator."
        />

        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.bankscart.com/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Calculators',
                item: 'https://www.bankscart.com/calculators',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Credit Card Payoff Calculator',
                item: 'https://www.bankscart.com/credit-card-payoff-calculator',
              },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'BanksCart Credit Card Payoff Calculator',
            url: 'https://www.bankscart.com/credit-card-payoff-calculator',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires JavaScript',
            description:
              'Interactive financial tool to calculate credit card payoff timelines, interest savings from extra payments, and debt consolidation loan comparisons in India.',
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer.replace(/<[^>]+>/g, ''),
              },
            })),
          })}
        </script>
      </Helmet>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Calculators', path: '/calculators' },
              { label: 'Credit Card Payoff Calculator' },
            ]}
          />
        </div>

        {/* Hero Section */}
        <motion.div
          className="bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#0F172A] text-white p-6 sm:p-10 rounded-2xl shadow-xl border border-slate-800 mb-8 text-center sm:text-left"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-3">
                <Sparkles className="w-3.5 h-3.5" /> 2026 Financial Strategy Engine
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Conquer Credit Card Debt with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                  Precision Repayment.
                </span>
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
                Determine your exact debt-free date, escape the costly 5% minimum payment trap, and quantify how
                much money accelerated payments will save you in compounding interest.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              {openApplyModal && (
                <ApplyButton
                  loanType="Personal Loan"
                  openApplyModal={openApplyModal}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all text-sm text-center"
                >
                  Consolidate Debt at 10.5%
                </ApplyButton>
              )}
              {openEligibilityModal && (
                <button
                  type="button"
                  onClick={() => openEligibilityModal('Credit Card')}
                  className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold px-6 py-3 rounded-xl transition-all text-sm"
                >
                  Check Balance Transfer Cards
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Warning if payment is lower than monthly interest */}
        {!calculations.planned.isPayoffPossible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-50 border-l-4 border-red-600 rounded-r-xl flex items-start gap-3 shadow-sm"
          >
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-base font-bold text-red-900">Warning: Monthly Payment Is Insufficient</h2>
              <p className="text-sm text-red-700 mt-1">
                Your planned payment of{' '}
                <span className="font-mono tabular-nums font-bold">{formatCurrency(monthlyPayment)}</span> is lower
                than or equal to the monthly interest accrued ({formatCurrency(monthlyInterestFloor)}). At this rate,
                your debt will grow forever. Increase your monthly payment to at least{' '}
                <span className="font-mono tabular-nums font-bold">{formatCurrency(monthlyInterestFloor + 500)}</span>.
              </p>
            </div>
          </motion.div>
        )}

        {/* Interactive Calculator Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Left Column: Dual Synchronized Controls (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-7">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-50 text-[#1E3A8A] rounded-lg">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Your Credit Card Parameters</h2>
                  <p className="text-xs text-slate-500">Fine-tune your debt variables with synchronized sliders</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#1E3A8A] bg-blue-50 px-2.5 py-1 rounded-full">
                Indian Banks
              </span>
            </div>

            {/* Input 1: Credit Card Balance */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label htmlFor="balance-slider" className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-slate-400" /> Outstanding Credit Card Balance
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">₹</span>
                  <input
                    id="balance-text"
                    type="text"
                    inputMode="numeric"
                    value={formatNumberWithCommas(balance)}
                    onChange={(e) => handleBalanceText(e.target.value)}
                    onBlur={handleBalanceBlur}
                    className="w-36 text-right font-mono tabular-nums font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg pl-7 pr-3 py-1.5 focus:bg-white focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] text-sm shadow-inner transition-all"
                  />
                </div>
              </div>
              <input
                id="balance-slider"
                type="range"
                min="10000"
                max="1000000"
                step="5000"
                value={Math.max(10000, Math.min(1000000, balance))}
                onChange={(e) => handleBalanceSlider(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
              />
              {/* Preset Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[50000, 100000, 150000, 250000, 500000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setBalance(preset)}
                    className={`text-xs px-2.5 py-1 rounded-md font-mono tabular-nums border transition-all ${
                      balance === preset
                        ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {formatCurrency(preset)}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Annual Interest Rate (APR) */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <label htmlFor="apr-slider" className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <Percent className="w-4 h-4 text-slate-400" /> Annual Interest Rate (APR)
                </label>
                <div className="relative">
                  <input
                    id="apr-text"
                    type="number"
                    step="0.5"
                    min="9"
                    max="54"
                    value={apr}
                    onChange={(e) => handleAprText(e.target.value)}
                    onBlur={handleAprBlur}
                    className="w-28 text-right font-mono tabular-nums font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg pl-3 pr-7 py-1.5 focus:bg-white focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] text-sm shadow-inner transition-all"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">%</span>
                </div>
              </div>
              <input
                id="apr-slider"
                type="range"
                min="9"
                max="54"
                step="0.5"
                value={apr}
                onChange={(e) => handleAprSlider(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
              />
              {/* Preset APR Chips representing real Indian banks */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { label: '24% (Low Tier)', rate: 24.0 },
                  { label: '36% (Standard / 3% mo)', rate: 36.0 },
                  { label: '42% (HDFC/SBI 3.5% mo)', rate: 42.0 },
                  { label: '48% (Late Tier)', rate: 48.0 },
                ].map((item) => (
                  <button
                    key={item.rate}
                    type="button"
                    onClick={() => setApr(item.rate)}
                    className={`text-xs px-2.5 py-1 rounded-md border font-medium transition-all ${
                      apr === item.rate
                        ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 3: Planned Monthly Payment */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <div>
                  <label htmlFor="payment-slider" className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" /> Planned Fixed Monthly Payment
                  </label>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Min required to beat monthly interest: {formatCurrency(monthlyInterestFloor + 100)}
                  </p>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">₹</span>
                  <input
                    id="payment-text"
                    type="text"
                    inputMode="numeric"
                    value={formatNumberWithCommas(monthlyPayment)}
                    onChange={(e) => handlePaymentText(e.target.value)}
                    onBlur={handlePaymentBlur}
                    className="w-36 text-right font-mono tabular-nums font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg pl-7 pr-3 py-1.5 focus:bg-white focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] text-sm shadow-inner transition-all"
                  />
                </div>
              </div>
              <input
                id="payment-slider"
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={Math.max(1000, Math.min(50000, monthlyPayment))}
                onChange={(e) => handlePaymentSlider(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
              />
              <div className="flex flex-wrap gap-2 pt-1 items-center">
                <button
                  type="button"
                  onClick={() => setMonthlyPayment(minimumAmountDue)}
                  className="text-xs px-2.5 py-1 rounded-md border border-amber-300 bg-amber-50 text-amber-800 font-medium hover:bg-amber-100"
                >
                  Set to 5% Min Due ({formatCurrency(minimumAmountDue)})
                </button>
                {[5000, 8000, 10000, 15000, 20000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setMonthlyPayment(preset)}
                    className={`text-xs px-2.5 py-1 rounded-md font-mono tabular-nums border transition-all ${
                      monthlyPayment === preset
                        ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {formatCurrency(preset)}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 4: Additional Monthly Payment (Accelerated Strategy) */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <div>
                  <label htmlFor="extra-slider" className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500" /> Additional Extra Payment / Month
                  </label>
                  <p className="text-xs text-emerald-600 font-medium mt-0.5">
                    Directly reduces principal & multiplies compounding savings
                  </p>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">₹</span>
                  <input
                    id="extra-text"
                    type="text"
                    inputMode="numeric"
                    value={formatNumberWithCommas(extraPayment)}
                    onChange={(e) => handleExtraText(e.target.value)}
                    onBlur={handleExtraBlur}
                    className="w-36 text-right font-mono tabular-nums font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg pl-7 pr-3 py-1.5 focus:bg-white focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] text-sm shadow-inner transition-all"
                  />
                </div>
              </div>
              <input
                id="extra-slider"
                type="range"
                min="0"
                max="25000"
                step="500"
                value={Math.max(0, Math.min(25000, extraPayment))}
                onChange={(e) => handleExtraSlider(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <div className="flex flex-wrap gap-2 pt-1">
                {[0, 1000, 2000, 3000, 5000, 10000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setExtraPayment(preset)}
                    className={`text-xs px-2.5 py-1 rounded-md font-mono tabular-nums border transition-all ${
                      extraPayment === preset
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset === 0 ? 'None (₹0)' : `+${formatCurrency(preset)}`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Executive Results & Visual Breakdown (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0F172A] text-white rounded-2xl shadow-xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                  <Hourglass className="w-4 h-4" /> Payoff Projection
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Total Monthly Outflow: {formatCurrency(monthlyPayment + extraPayment)}
                </span>
              </div>

              {/* Debt Free Highlight */}
              <div className="mb-6">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Time to Debt Freedom</p>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums mt-1">
                  {extraPayment > 0
                    ? formatMonths(calculations.accelerated.months)
                    : formatMonths(calculations.planned.months)}
                </div>
                {extraPayment > 0 && calculations.timeSavedMonths > 0 && (
                  <p className="text-xs text-emerald-400 font-medium mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Saves {calculations.timeSavedMonths} months vs planned payment!
                  </p>
                )}
              </div>

              {/* Interactive Doughnut Chart */}
              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 mb-6 flex items-center justify-between">
                <div className="w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0">
                  <Doughnut
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      plugins: {
                        legend: { display: false },
                        tooltip: {
                          callbacks: {
                            label: (ctx) => ` ${ctx.label}: ${formatCurrency(ctx.raw as number)}`,
                          },
                        },
                      },
                      cutout: '68%',
                    }}
                  />
                </div>
                <div className="space-y-3 pl-4 flex-1 text-xs">
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A] inline-block" />
                      Principal Borrowed
                    </div>
                    <div className="font-mono tabular-nums font-bold text-white text-sm mt-0.5">
                      {formatCurrency(balance)}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D97706] inline-block" />
                      Total Interest Accrued
                    </div>
                    <div className="font-mono tabular-nums font-bold text-amber-300 text-sm mt-0.5">
                      {formatCurrency(
                        extraPayment > 0
                          ? calculations.accelerated.totalInterest
                          : calculations.planned.totalInterest
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Executive Metrics Grid */}
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-400">Total Out-of-Pocket Cost:</span>
                  <span className="font-mono tabular-nums font-bold text-white">
                    {formatCurrency(
                      extraPayment > 0
                        ? calculations.accelerated.totalPaid
                        : calculations.planned.totalPaid
                    )}
                  </span>
                </div>
                {extraPayment > 0 && calculations.interestSaved > 0 && (
                  <div className="flex justify-between items-center py-2.5 px-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                    <span className="font-semibold flex items-center gap-1.5">
                      <PiggyBank className="w-4 h-4 text-emerald-400" /> Total Interest Saved:
                    </span>
                    <span className="font-mono tabular-nums font-extrabold text-base text-emerald-400">
                      {formatCurrency(calculations.interestSaved)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              {openApplyModal ? (
                <ApplyButton
                  loanType="Debt Consolidation Loan"
                  openApplyModal={openApplyModal}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all text-sm text-center block"
                >
                  Explore Consolidation Loan
                </ApplyButton>
              ) : (
                <button
                  type="button"
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all text-sm"
                >
                  Explore Consolidation Loan
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Visual Comparison: The Minimum Payment Trap vs Your Strategy */}
        <motion.div
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A] block mb-1">
              Side-By-Side Strategy Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              The Minimum Payment Trap vs. Your Accelerated Roadmap
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              See what happens if you stay in the credit card minimum payment cycle versus adopting disciplined fixed
              or accelerated monthly repayments.
            </p>
          </div>

          {/* 3 Strategy Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card 1: The Minimum Payment Trap */}
            <div className="rounded-xl border-2 border-red-200 bg-red-50/50 p-5 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-bl-lg">
                The Debt Trap
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2 text-red-900 font-bold text-base">
                  <ShieldAlert className="w-5 h-5 text-red-600" /> Minimum Payment (5%)
                </div>
                <p className="text-xs text-red-700 mb-4 leading-relaxed">
                  Only paying 5% of monthly balance (starts at {formatCurrency(minimumAmountDue)}/mo and decays).
                </p>
                <div className="space-y-3 font-mono tabular-nums text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 text-xs block">Estimated Duration:</span>
                    <span className="text-base font-bold text-red-900">
                      {calculations.minTrap.months === Infinity ? '30+ Years' : formatMonths(calculations.minTrap.months)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Total Interest Paid:</span>
                    <span className="text-base font-bold text-red-700">
                      {formatCurrency(calculations.minTrap.totalInterest)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Total Outflow:</span>
                    <span className="text-sm font-semibold text-slate-800">
                      {formatCurrency(calculations.minTrap.totalPaid)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-red-200 text-xs text-red-800 font-medium">
                ⚠️ You pay {Math.round((calculations.minTrap.totalInterest / balance) * 100)}% extra in pure interest!
              </div>
            </div>

            {/* Card 2: Your Planned Payment */}
            <div className="rounded-xl border-2 border-slate-200 bg-slate-50/70 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-base">
                  <Clock className="w-5 h-5 text-[#1E3A8A]" /> Planned Fixed Payment
                </div>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  Disciplined fixed payment of {formatCurrency(monthlyPayment)} every single month.
                </p>
                <div className="space-y-3 font-mono tabular-nums text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 text-xs block">Estimated Duration:</span>
                    <span className="text-base font-bold text-slate-900">
                      {formatMonths(calculations.planned.months)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Total Interest Paid:</span>
                    <span className="text-base font-bold text-amber-700">
                      {formatCurrency(calculations.planned.totalInterest)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Total Outflow:</span>
                    <span className="text-sm font-semibold text-slate-800">
                      {formatCurrency(calculations.planned.totalPaid)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-700 font-medium">
                Saves {formatCurrency(Math.max(0, calculations.minTrap.totalInterest - calculations.planned.totalInterest))} vs the Minimum Trap
              </div>
            </div>

            {/* Card 3: Accelerated Payment */}
            <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50/50 p-5 flex flex-col justify-between relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-bl-lg">
                Recommended
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2 text-emerald-950 font-bold text-base">
                  <Zap className="w-5 h-5 text-emerald-600" /> Accelerated (+{formatCurrency(extraPayment)})
                </div>
                <p className="text-xs text-emerald-800 mb-4 leading-relaxed">
                  Total payment of {formatCurrency(monthlyPayment + extraPayment)}/mo focused on principal reduction.
                </p>
                <div className="space-y-3 font-mono tabular-nums text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 text-xs block">Estimated Duration:</span>
                    <span className="text-base font-bold text-emerald-900">
                      {formatMonths(calculations.accelerated.months)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Total Interest Paid:</span>
                    <span className="text-base font-bold text-emerald-700">
                      {formatCurrency(calculations.accelerated.totalInterest)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Total Outflow:</span>
                    <span className="text-sm font-semibold text-slate-800">
                      {formatCurrency(calculations.accelerated.totalPaid)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-200 text-xs text-emerald-800 font-semibold">
                🏆 Saves {formatCurrency(calculations.interestSaved)} more in interest & finishes{' '}
                {calculations.timeSavedMonths} months sooner!
              </div>
            </div>
          </div>

          {/* Visual Payoff Timeline Bars */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#1E3A8A]" /> Visual Payoff Timeline Comparison
            </h3>

            {/* Minimum Trap Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-600">
                <span className="font-medium text-red-800">Minimum Payment (5%)</span>
                <span className="font-mono tabular-nums font-bold text-red-800">
                  {calculations.minTrap.months === Infinity ? '360+ Mos (30 Yrs)' : `${calculations.minTrap.months} Months`}
                </span>
              </div>
              <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full rounded-full w-full" />
              </div>
            </div>

            {/* Planned Payment Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-600">
                <span className="font-medium text-slate-800">Planned Payment ({formatCurrency(monthlyPayment)}/mo)</span>
                <span className="font-mono tabular-nums font-bold text-slate-900">
                  {calculations.planned.months} Months
                </span>
              </div>
              <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-[#1E3A8A] h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.max(10, (calculations.planned.months / (calculations.minTrap.months || 240)) * 100))}%`,
                  }}
                />
              </div>
            </div>

            {/* Accelerated Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-600">
                <span className="font-medium text-emerald-800">
                  Accelerated ({formatCurrency(monthlyPayment + extraPayment)}/mo)
                </span>
                <span className="font-mono tabular-nums font-bold text-emerald-800">
                  {calculations.accelerated.months} Months
                </span>
              </div>
              <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.max(8, (calculations.accelerated.months / (calculations.minTrap.months || 240)) * 100))}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Debt Consolidation Alternative Banner */}
        <motion.div
          className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 mb-10 shadow-lg border border-blue-800"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <span className="inline-block text-xs uppercase tracking-wider font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                Smart Financial Arbitrage
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Replace {apr}% Card APR with a 12% Personal Loan
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Consolidating this {formatCurrency(balance)} debt into a 24-month bank personal loan at 12% p.a. gives you
                a fixed EMI of approximately{' '}
                <span className="font-mono tabular-nums font-bold text-amber-300">{formatCurrency(calculations.plEmi)}/mo</span>,
                capping total interest at only {formatCurrency(calculations.plTotalInterest)}.
              </p>
              {calculations.plSavings > 0 && (
                <div className="pt-2 text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" /> Potential Interest Savings:{' '}
                  <span className="font-mono tabular-nums font-extrabold text-white text-base">
                    {formatCurrency(calculations.plSavings)}
                  </span>
                </div>
              )}
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              {openApplyModal && (
                <ApplyButton
                  loanType="Personal Loan"
                  openApplyModal={openApplyModal}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all text-sm text-center"
                >
                  Apply for Debt Consolidation
                </ApplyButton>
              )}
              {openEligibilityModal && (
                <button
                  type="button"
                  onClick={() => openEligibilityModal('Personal Loan')}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold py-3 px-6 rounded-xl transition-all text-sm text-center"
                >
                  Check Pre-Approved Rates
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Interactive Amortization Table */}
        <motion.div
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-10 overflow-hidden"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A] block mb-1">
                Detailed Payment Schedule
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Repayment Schedule &amp; Principal Depletion
              </h2>
            </div>
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-1 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setScheduleView('first12')}
                className={`text-xs px-3 py-1.5 rounded-md font-semibold transition-all ${
                  scheduleView === 'first12'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                First 12 Months
              </button>
              <button
                type="button"
                onClick={() => setScheduleView('yearly')}
                className={`text-xs px-3 py-1.5 rounded-md font-semibold transition-all ${
                  scheduleView === 'yearly'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Yearly Summary
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {scheduleView === 'first12' ? (
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono tabular-nums">
                <thead>
                  <tr className="bg-slate-50 border-y border-slate-200 text-slate-600 font-sans font-semibold">
                    <th className="py-3 px-3">Month</th>
                    <th className="py-3 px-3">Opening Balance</th>
                    <th className="py-3 px-3">Payment</th>
                    <th className="py-3 px-3 text-emerald-700">Principal</th>
                    <th className="py-3 px-3 text-amber-700">Interest</th>
                    <th className="py-3 px-3">Closing Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(calculations.accelerated.schedule.length > 0
                    ? calculations.accelerated.schedule
                    : calculations.planned.schedule
                  )
                    .slice(0, 12)
                    .map((row) => (
                      <tr key={row.month} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3 font-sans font-medium text-slate-800">Month {row.month}</td>
                        <td className="py-2.5 px-3 text-slate-600">{formatCurrency(row.openingBalance)}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{formatCurrency(row.payment)}</td>
                        <td className="py-2.5 px-3 text-emerald-700 font-medium">{formatCurrency(row.principal)}</td>
                        <td className="py-2.5 px-3 text-amber-700 font-medium">{formatCurrency(row.interest)}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{formatCurrency(row.closingBalance)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono tabular-nums">
                <thead>
                  <tr className="bg-slate-50 border-y border-slate-200 text-slate-600 font-sans font-semibold">
                    <th className="py-3 px-3">Year</th>
                    <th className="py-3 px-3 text-emerald-700">Principal Paid</th>
                    <th className="py-3 px-3 text-amber-700">Interest Paid</th>
                    <th className="py-3 px-3">Year-End Closing Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {calculations.yearlySchedule.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-sans font-medium text-slate-800">Year {row.year}</td>
                      <td className="py-3 px-3 text-emerald-700 font-semibold">{formatCurrency(row.principalPaid)}</td>
                      <td className="py-3 px-3 text-amber-700 font-semibold">{formatCurrency(row.interestPaid)}</td>
                      <td className="py-3 px-3 font-bold text-slate-900">{formatCurrency(row.closingBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>

        {/* Educational Section & Debt Strategies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Card 1: Expert Strategies */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-600" /> 4 Rules for Eliminating Credit Card Debt Fast
            </h2>
            <div className="space-y-4">
              {debtEliminationTips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  {tip.icon}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{tip.title}</h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Understanding Compounding Card Debt in India */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ReceiptText className="w-6 h-6 text-[#1E3A8A]" /> How Credit Card Interest Compounds in India
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  Credit cards operate on the <strong>Average Daily Balance (ADB)</strong> method. If you do not clear
                  100% of your total statement balance by the due date, you completely forfeit your interest-free grace
                  period.
                </p>
                <p>
                  Finance charges start accruing <em>from the very date of each transaction</em>, compounding on a daily
                  basis until full settlement. Additionally, the Indian tax code levies a mandatory{' '}
                  <strong>18% GST on all credit card finance charges</strong>, further escalating the real out-of-pocket cost.
                </p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <span className="text-xs font-bold text-[#1E3A8A] block">Did You Know?</span>
              <p className="text-xs text-slate-700 mt-1">
                A 3.5% monthly card charge equates to <strong>42% APR</strong>. With 18% GST included, your effective
                annual cost of capital reaches nearly <strong>49.56% p.a.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic FAQ Section */}
        <motion.div
          className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A] block mb-1">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Credit Card Debt &amp; Repayment FAQs
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Clear answers to the most common questions regarding credit card APRs, payoff strategies, and loan consolidation.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQIndex === index}
                onClick={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
              />
            ))}
          </div>
        </motion.div>

        {/* Why Choose BanksCart Section */}
        <div className="mb-12">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why Borrowers Trust BanksCart for Debt Solutions
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Empowering Indian retail borrowers with algorithmic financial tools and transparent bank partnerships.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseBanksCart.map((reason, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
              >
                <div className="mb-4 p-3 bg-slate-50 rounded-xl">{reason.icon}</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{reason.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final High-Conversion CTA Banner */}
        <motion.div
          className="bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#0F172A] text-white rounded-2xl p-8 sm:p-12 text-center shadow-xl border border-slate-800"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
            Ready to Break Free from 36%+ Credit Card Interest?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Consolidate your multiple credit card balances into a single low-interest personal loan or compare 0% balance
            transfer offers from top Indian banks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {openApplyModal && (
              <ApplyButton
                loanType="Debt Consolidation"
                openApplyModal={openApplyModal}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all text-base w-full sm:w-auto"
              >
                Apply for Debt Consolidation
              </ApplyButton>
            )}
            {openEligibilityModal && (
              <button
                type="button"
                onClick={() => openEligibilityModal('Personal Loan')}
                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold py-3.5 px-8 rounded-xl transition-all text-base w-full sm:w-auto"
              >
                Check Free CIBIL Eligibility
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreditCardPayoffCalculatorPage;
