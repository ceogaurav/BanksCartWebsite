import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { HelpCircle, ChevronDown, Check, Star, ShieldAlert, Sparkles, BookOpen, AlertCircle, Info, Landmark, Percent, Award, ShieldCheck, ArrowRight, Play, MessageSquare, TrendingUp, CreditCard, Heart, Activity, Shield } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';
import { HEALTH_INSURANCE_PAGE_MAP, HealthPageContent } from '../../data/healthInsurancePageData';

interface EditorialArticle {
  title: string;
  content: string[];
}

const getHealthDetailedArticles = (slug: string): EditorialArticle[] => {
  switch (slug) {
    case 'group-active-health':
      return [
        {
          title: "Revolutionizing Corporate Employee Wellness with Cashless Coverage",
          content: [
            "Corporate healthcare is shifting from standard emergency hospitalization shields to proactive wellness management. Group Active Health is a premium employee wellness cover that blends cashless medical security with customized lifestyle improvement incentives. Managed digitally, the policy helps corporate workforces track their physical steps, unlock active health rewards, and bypass outpatient clinic costs.",
            "By offering immediate, collateral-free cashless pre-authorizations across a premium network of 10,000+ top-tier hospitals, the plan ensures that employee emergencies are resolved under 60 minutes without requiring upfront deposits or tedious reimbursement applications."
          ]
        },
        {
          title: "Earn Up to 100% Premium Returns (HealthReturns™) via Active Steps",
          content: [
            "The defining feature of Group Active Health is the innovative HealthReturns™ multiplier. Traditional health policies only payout upon hospitalization, meaning healthy employees receive no financial benefit. Aegon's wellness framework incentivizes healthy habits by tracking daily physical activities.",
            "By walking 10,000 steps daily or regularizing cardio tracking online, employees earn active wellness points. These points compile directly into a dynamic premium waiver ledger, allowing companies or individuals to claim up to 100% cash returns on renewal premiums."
          ]
        },
        {
          title: "Complete OPD Coverage & Seamless Digital Claims",
          content: [
            "Unlike standard medical policies that strictly require a 24-hour hospitalization stay, Group Active Health covers modern outpatient outgos. Policyholders enjoy direct cashless access to consultation desks, pulmonary diagnostic centers, and outpatient pharmacy networks.",
            "Nominees can easily manage, track, and settle claims through an integrated mobile portal, ensuring complete transparency and a stress-free process for salaried employees."
          ]
        }
      ];
    case 'group-activ-secure':
      return [
        {
          title: "Fixed Benefit Cash Shields: Accidental & Critical Illness Security",
          content: [
            "A standard health policy reimburses actual hospital bill totals, leaving families exposed to income loss during recuperation. Group Activ Secure addresses this risk by operating as a fixed-benefit critical cover. Upon a first positive diagnosis of a covered illness, the plan releases a 100% lump-sum sum assured.",
            "This lump-sum cash payout is paid directly to the policyholder, allowing them to clear home mortgages, fund overseas clinical trials, or hire private nursing care, maintaining complete livelihood security."
          ]
        },
        {
          title: "Securing Family Livelihoods Against High Critical Care Bills",
          content: [
            "A major illness can completely drain family savings due to high out-of-pocket expenses. Group Activ Secure shields your capital by covering major critical illnesses, including advanced cancers, strokes, and heart failures. The lump-sum payout helps replace lost salaries, ensuring family stability.",
            "With flexible limited premium payment terms, companies can easily on-board their teams, securing comprehensive protection at exceptionally affordable corporate rates."
          ]
        },
        {
          title: "Rapid Corporate On-boarding with Zero Medical Checks",
          content: [
            "On-boarding massive employee groups can be logistically challenging under traditional underwriting guidelines. Group Activ Secure resolves this by utilizing digitized health declarations and simplified group templates.",
            "Healthy employees under 45 years bypass complex physical checks, securing immediate accidental and critical protections, making group healthcare rollout fast and efficient."
          ]
        }
      ];
    case 'group-health-insurance':
      return [
        {
          title: "Customized Corporate Health Insurance Blueprints for Modern Teams",
          content: [
            "A high-quality corporate Group Health Insurance plan is a vital benefit for modern corporate teams. It provides comprehensive cashless medical security for employees, their spouses, dependent children, and parents under a single consolidated corporate master policy.",
            "This structured group safety shield significantly lowers premium rates compared to individual policies while delivering robust medical benefits that help companies attract and retain top-tier talent."
          ]
        },
        {
          title: "Immediate Cashless Payouts for Pre-Existing Conditions",
          content: [
            "Individual health insurance typically carries a mandatory 3 to 4-year waiting period before pre-existing conditions (such as diabetes, hypertension, or asthma) are covered. Aegon's corporate Group Health Insurance waives this waiting period completely.",
            "All pre-existing conditions are covered from day one of enrollment. This means employees can claim immediate cashless benefits for ongoing medical needs, providing invaluable support for chronic conditions."
          ]
        },
        {
          title: "Managing Maternity, Corporate Add-Ons, and OPD Outgos Safely",
          content: [
            "The plan offers comprehensive coverage by including built-in maternity benefits, newborn baby covers, and outpatient (OPD) diagnostic reimbursements. Policyholders can easily access network clinics for regular checkups, dental care, and prescription medicines.",
            "With simple claims processing and cashless pre-authorizations, employee families receive direct financial support during critical milestones like delivery and newborn vaccinations."
          ]
        }
      ];
    case 'health-insurance-asthma':
      return [
        {
          title: "Specialized Cashless Coverages for Chronic Respiratory Conditions",
          content: [
            "Chronic asthma requires regular medical management, including inhalers, specialist visits, and periodic pulmonary function tests. Standard health insurance policies often classify asthma as a pre-existing condition, excluding it from coverage or imposing waiting periods.",
            "Our specialized Asthma Health Cover is designed to address this gap by providing cashless coverage for both regular outpatient management and emergency hospitalizations, ensuring respiratory health remains fully protected."
          ]
        },
        {
          title: "Zero Waiting Periods: Bypassing Standard Chronic Waiting Slabs",
          content: [
            "The defining benefit of this specialized respiratory cover is the waiver of standard chronic waiting periods. Instead of waiting 3 to 4 years, policyholders can claim cashless benefits for asthma-related hospitalizations and treatments from day one.",
            "This immediate coverage provides vital financial support during sudden acute asthma attacks, covering intensive care stays, oxygen therapy, and specialized nebulization treatments without delay."
          ]
        },
        {
          title: "Cashless Medicine Desks & OPD Diagnostic Reimbursements",
          content: [
            "Beyond emergency care, the plan covers regular management outgos. Policyholders enjoy direct cashless benefits for specialist consultations, spirometry tests, and prescription inhaler purchases at network pharmacies.",
            "This outpatient support helps patients manage their symptoms effectively, reducing the risk of acute attacks and maintaining overall respiratory health with absolute financial peace of mind."
          ]
        }
      ];
    case 'health-insurance-diabetes':
      return [
        {
          title: "Day-1 Cashless Shields for Type 1 & Type 2 Diabetes",
          content: [
            "Diabetes requires continuous active management, including daily glucose monitoring, regular specialist consultations, and statin/insulin prescriptions. Traditional health plans often exclude diabetes-related complications or impose waiting periods.",
            "Aegon's specialized Diabetes Health Insurance is designed to provide comprehensive, cashless coverage from day one, helping diabetics manage their condition effectively and prevent long-term cardiovascular or renal complications."
          ]
        },
        {
          title: "Zero Waiting Slabs: Bypassing Standard Pre-Existing Wait Blocks",
          content: [
            "This policy eliminates the standard 36 to 48-month waiting periods for pre-existing conditions. Diabetics can claim cashless benefits for both outpatient checkups and emergency hospitalizations immediately upon policy commencement.",
            "This day-one cover is crucial to manage sudden diabetic ketoacidosis emergencies or advanced wound care treatments, providing essential financial security when it is needed most."
          ]
        },
        {
          title: "Outpatient Glucose Monitoring & Diabetes Management Systems",
          content: [
            "The plan supports active health tracking by covering continuous glucose monitoring (CGM) sensors and digital glucose trackers. Policyholders enjoy direct cashless access to specialized diabetes clinics and nutritionist desks.",
            "This outpatient wellness support helps patients maintain optimal HbA1c levels, reducing overall health risks and out-of-pocket medical outgos."
          ]
        }
      ];
    case 'health-insurance-high-blood-pressure':
      return [
        {
          title: "Cardiovascular Protection: Cashless Coverage for Hypertension",
          content: [
            "Hypertension is a chronic cardiovascular condition that requires regular diagnostic monitoring, lifestyle adjustments, and active prescription management. Traditional health insurance policies often impose waiting periods before covering hypertension complications.",
            "Aegon's specialized Hypertension Health Insurance provides comprehensive cashless coverage for regular diagnostic checkups, specialist consultations, and emergency cardiac care, protecting your heart health with absolute financial security."
          ]
        },
        {
          title: "Bypassing Pre-Existing Waits to Protect Heart Health Instantly",
          content: [
            "The plan waives the standard 3 to 4-year waiting periods for hypertension-related complications, providing cashless coverage from day one. This immediate cover is vital to manage sudden acute cardiac emergencies or stroke risks.",
            "Nominees can easily access top-tier cardiac care networks, securing immediate medical attention without requiring upfront cash deposits or tedious paperwork in emergencies."
          ]
        },
        {
          title: "Managing Outpatient BP Checks & Regular Medicine Bills Cashless",
          content: [
            "In addition to emergency care, the plan covers outpatient outgos. Policyholders enjoy direct cashless benefits for periodic lipid profiles, kidney function tests, and regular antihypertensive prescriptions at network pharmacies.",
            "This outpatient wellness support helps patients maintain stable blood pressure levels, preventing severe complications and reducing overall healthcare outgos."
          ]
        }
      ];
    case 'health-insurance-high-cholesterol':
      return [
        {
          title: "Cashless Lipid Coverages: Protecting Vascular & Heart Health",
          content: [
            "High cholesterol requires regular diagnostic tracking and lipid-lowering prescriptions to prevent vascular plaque buildup and cardiac complications. Standard health plans often exclude these outpatient outgos.",
            "Aegon's specialized Lipid Health Insurance provides comprehensive cashless coverage for periodic blood tests, cardiologist consults, and prescription statins at network pharmacies, protecting your cardiovascular health seamlessly."
          ]
        },
        {
          title: "Day-1 Cardiovascular Shields: Bypassing Pre-Existing Waiting Slabs",
          content: [
            "This specialized vascular cover waives standard chronic waiting periods, delivering cashless coverage from day one. Policyholders can claim immediate benefits for cardiac treatments and angioplasty surgeries if required.",
            "This immediate day-one cover is crucial to manage sudden vascular emergencies, ensuring access to top-tier surgical facilities without upfront out-of-pocket payments."
          ]
        },
        {
          title: "Managing Regular Lipid Profiles & Outpatient Statin Prescriptions",
          content: [
            "The plan supports long-term vascular health by covering regular lipid profile tests and statin prescriptions cashless. Outpatient wellness coaching helps patients adjust diets and manage cholesterol levels effectively.",
            "This structured medical support reduces overall health risks, helping patients avoid advanced complications and lower their long-term medical outgos."
          ]
        }
      ];
    case 'login-and-registration-process':
      return [
        {
          title: "Modern Digital Customer Desks: Streamlining Cashless Claims",
          content: [
            "Aegon Life operates a modern, digital customer support desk designed to deliver seamless cashless claims processing. Policyholders can easily log in to the central portal to track pending claims, update KYC details, and download active tax-saving certificates.",
            "This digital-first system eliminates the need for physical branch visits, allowing claimants to upload medical reports and coordinate cashless pre-authorizations in a few taps online, securing direct support fast."
          ]
        },
        {
          title: "Step-by-Step Claim Registration & Document Upload Desks",
          content: [
            "Filing a medical claim is designed to be stress-free for claimants. In an emergency, the policyholder can register the claim online or by emailing customer care. The nominee submits active KYC details, municipal death certificates (for life covers), and completed claim forms.",
            "Once documents are digitally verified, Aegon's claim desk releases the approved payouts directly via electronic bank transfers, maintaining a highly transparent and rapid claim settlement timeline."
          ]
        },
        {
          title: "Resolving Policy Queries: Level-by-Level Escalation Matrix",
          content: [
            "Aegon Life enforces a clear, level-by-level grievance escalation matrix. If a customer is unsatisfied with support desk resolutions, they can escalate queries to the Manager of Customer Support, followed by the Chief Grievance Officer.",
            "In rare cases where disputes remain unresolved after 30 days, customers have direct recourse to the IRDAI Insurance Ombudsman, guaranteeing complete consumer protection and safe dispute resolutions under official guidelines."
          ]
        }
      ];
    default:
      return [];
  }
};

const DynamicHealthInsurancePage: React.FC = () => {
  const { subPath } = useParams<{ subPath: string }>();
  const location = useLocation();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Resolve current slug from parameters or location pathnames (for flat routes)
  let currentSlug = subPath || 'group-health-insurance';
  
  if (location.pathname.includes('group-active-health')) {
    currentSlug = 'group-active-health';
  } else if (location.pathname.includes('group-activ-secure')) {
    currentSlug = 'group-activ-secure';
  } else if (location.pathname.includes('group-health-insurance')) {
    currentSlug = 'group-health-insurance';
  } else if (location.pathname.includes('health-insurance-asthma')) {
    currentSlug = 'health-insurance-asthma';
  } else if (location.pathname.includes('health-insurance-diabetes')) {
    currentSlug = 'health-insurance-diabetes';
  } else if (location.pathname.includes('health-insurance-high-blood-pressure')) {
    currentSlug = 'health-insurance-high-blood-pressure';
  } else if (location.pathname.includes('health-insurance-high-cholesterol')) {
    currentSlug = 'health-insurance-high-cholesterol';
  } else if (location.pathname.includes('login-and-registration-process')) {
    currentSlug = 'login-and-registration-process';
  }

  const pageContent = HEALTH_INSURANCE_PAGE_MAP[currentSlug] || HEALTH_INSURANCE_PAGE_MAP['group-health-insurance'];
  const detailedArticles = getHealthDetailedArticles(currentSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveFaq(null);
  }, [subPath, location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section with Medical Cyan and Emerald Gradient */}
        <div className="bg-gradient-to-r from-cyan-850 via-teal-900 to-slate-900 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <span className="text-[180px] font-black leading-none select-none">HEALTH</span>
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              {pageContent.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-6 tracking-tight leading-tight">
              {pageContent.title}
            </h1>
            <p className="text-cyan-100 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl font-medium font-sans">
              {pageContent.intro}
            </p>
          </div>
        </div>

        {/* 2-Column responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Detailed Resolutions and Rates Tables */}
          <div className="lg:col-span-7 space-y-10 text-slate-700">
            
            {/* More Intro if present */}
            {pageContent.moreIntro && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                <p className="text-sm text-slate-600 leading-relaxed font-sans font-medium">
                  {pageContent.moreIntro}
                </p>
              </div>
            )}
            {/* Detailed Editorial Sections - Rich Data like the Zero Coupon Bonds Sample */}
            {detailedArticles.length > 0 && (
              <div className="space-y-8">
                {detailedArticles.map((art, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="w-1.5 h-6 bg-cyan-600 rounded-full"></span>
                      {art.title}
                    </h3>
                    {art.content.map((p, pIdx) => (
                      <p key={pIdx} className="text-slate-650 text-sm leading-relaxed font-sans font-medium text-justify">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Core Highlights highlights */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-cyan-600 rounded-full"></span>
                {pageContent.highlightsTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {pageContent.highlights.map((feat, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-xl p-4 hover:border-cyan-100 hover:bg-cyan-50/10 transition-colors">
                    <h4 className="font-bold text-slate-800 text-sm mb-2">{feat.label}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{feat.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rates Table Block */}
            {pageContent.ratesRows && pageContent.ratesHeaders && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4">{pageContent.ratesTitle}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        {pageContent.ratesHeaders.map((header, idx) => (
                          <th key={idx} className="p-3 font-semibold text-slate-700">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pageContent.ratesRows.map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50">
                          <td className="p-3 font-bold text-slate-800 flex items-center gap-2">
                            <Landmark className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                            {row[0]}
                          </td>
                          <td className="p-3 font-semibold text-cyan-600">{row[1]}</td>
                          <td className="p-3 text-slate-500">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Interactive Simulation Dashboard */}
            <div className="bg-gradient-to-br from-cyan-950 to-slate-950 rounded-3xl text-white p-6 sm:p-8 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Active Health Wellness Dashboard
              </h3>
              <p className="text-xs text-cyan-200 mb-6 font-sans">Simulate active wellness steps and health return bonuses online</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Chronic Care</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans font-medium">Day 1 medical covers for diabetic/asthma needs</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Activity className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Active Tracker</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans font-medium">Convert physical walking steps to cash rewards</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Cashless Hospital</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans font-medium">10,000+ top hospitals with direct digital approvals</p>
                </div>
              </div>
            </div>

            {/* FAQs Accordion Block */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-cyan-600" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {pageContent.faqs.map((faq, index) => (
                  <div key={index} className="border border-slate-100 rounded-xl overflow-hidden transition-colors">
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="w-full flex justify-between items-center p-4 bg-slate-50/50 hover:bg-slate-50 text-left font-bold text-slate-700 text-sm outline-none transition-colors"
                    >
                      {faq.q}
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-cyan-600' : ''}`} />
                    </button>
                    {activeFaq === index && (
                      <div className="p-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100 bg-white leading-relaxed font-sans">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Cibil lead form */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <CibilCheckerForm sourcePage={`${pageContent.title} Portal`} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default DynamicHealthInsurancePage;
