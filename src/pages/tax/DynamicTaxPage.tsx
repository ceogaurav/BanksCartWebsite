import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HelpCircle, ChevronDown, Check, Star, ShieldAlert, Sparkles, BookOpen, AlertCircle, Info, Landmark, Percent, Award, ShieldCheck, ArrowRight, Play, MessageSquare, TrendingUp, CreditCard } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';

interface TaxFAQ {
  q: string;
  a: string;
}

interface TaxHighlightsRow {
  sector: string;
  previousRate: string;
  revisedRate: string;
  implications: string;
}

interface TaxPageContent {
  title: string;
  badge: string;
  intro: string;
  moreIntro?: string;
  resolutionsTitle: string;
  resolutions: { label: string; text: string }[];
  ratesTableTitle?: string;
  ratesTableHeaders?: string[];
  ratesTableRows?: TaxHighlightsRow[];
  guidelinesTitle: string;
  guidelines: string[];
  faqs: TaxFAQ[];
}

const TAX_PAGE_MAP: Record<string, TaxPageContent> = {
  "37th-gst-council-meeting": {
    title: "37th GST Council Meeting: Key Decisions & Rate Updates",
    badge: "Official GST Council Updates",
    intro: "The 37th GST Council Meeting, chaired by Union Finance Minister Nirmala Sitharaman, was held on 20th September 2019 in Goa. The council introduced significant tax cuts on hotel accommodations, outdoor catering, job work of diamonds, and slide rates on select vehicle segments to stimulate domestic spending.",
    moreIntro: "At BanksCart, we parse official government circulars into simple, high-density guides. The resolutions passed during the 37th meeting provided major relief to hospitality and tourism sectors while strengthening online compliance guidelines for exporters.",
    resolutionsTitle: "Major Resolutions & Policy Decisions",
    resolutions: [
      { label: "Hospitality Relief", text: "Drastic drop in GST rates for hotel accommodation room tariffs, making luxury stays cheaper." },
      { label: "Jewelry Export Wave", text: "Exempted GST on diamond job works, boosting jewelry export segments globally." },
      { label: "Corporate Tax Cuts", text: "Aligned direct tax concessions with manufacturing entities to encourage investments." }
    ],
    ratesTableTitle: "Key GST Rate Changes Approved in 37th Meeting",
    ratesTableHeaders: ["Sector / Product Category", "Previous GST Rate", "Revised GST Rate", "Market Implications"],
    ratesTableRows: [
      { sector: "Hotel Rooms (Tariff ₹1001 to ₹7500)", previousRate: "18%", revisedRate: "12%", implications: "Direct savings for travelers, boosts tourism" },
      { sector: "Hotel Rooms (Tariff ₹7501 and above)", previousRate: "28%", revisedRate: "18%", implications: "Luxury accommodation costs significantly reduced" },
      { sector: "Outdoor Catering Services", previousRate: "18% (With ITC)", revisedRate: "5% (Without ITC)", implications: "Lowers catering prices, simplifies bookkeeping" },
      { sector: "Caffeinated Beverages", previousRate: "18%", revisedRate: "28% + 12% Cess", implications: "Prices hiked for energy drinks, carbonated sodas" },
      { sector: "Slide job work on Diamonds", previousRate: "5%", revisedRate: "1.5%", implications: "Boosts competitive margins for diamond polishers" }
    ],
    guidelinesTitle: "Key Directives for Taxpayers & Exporters",
    guidelines: [
      "New Return System: Trial run of unified simplified returns extended to ease transition loops.",
      "Integrated E-Way Bill Locks: Configured automatic locking of E-way bills for taxpayers defaulting in GSTR-3B filings for two consecutive months.",
      "Exemption on jewelry: Exempted integrated GST (IGST) on diamond imports for registered export houses.",
      "Refund Processing Slabs: Launched automated single-authority disbursement workflows to clear export refund backlogs."
    ],
    faqs: [
      { q: "Where and when was the 37th GST Council Meeting held?", a: "The meeting was physically held on September 20, 2019, in Goa, under the chairmanship of Union Finance Minister Nirmala Sitharaman." },
      { q: "What were the primary tax rate cuts for hotels?", a: "Tariffs between ₹1,001 and ₹7,500 were cut from 18% to 12%. Tariffs above ₹7,501 were cut from 28% to 18%." },
      { q: "Did the meeting change rates on catering services?", a: "Yes. Outdoor catering rates were slashed from 18% to 5% without input tax credit (ITC) benefits." },
      { q: "What was the decision on caffeinated soft drinks?", a: "Rates on caffeinated energy drinks were hiked from 18% to 28%, along with an additional 12% compensation cess." },
      { q: "How did the meeting help the diamond industry?", a: "GST on semi-precious and diamond job works was drastically reduced from 5% to 1.5% to boost export competitiveness." },
      { q: "What is the e-way bill locking rule introduced?", a: "Taxpayers who fail to file their GSTR-3B returns for two consecutive tax periods will have their e-way bill generation facility locked automatically." },
      { q: "Was there any change for the automobile sector?", a: "The council kept basic auto rates at 28%, but reduced compensation cess on passenger vehicles of specific engine configurations." },
      { q: "What was the decision on single-use plastics?", a: "The council deferred tax adjustments but discussed measures to align tax frameworks with national environmental campaigns." },
      { q: "How did the meeting simplify refund filings?", a: "Introduced a single-authority mechanism where central or state officers can sanction refund payouts, eliminating duplicate files." },
      { q: "Will delayed filings attract penalties under 37th guidelines?", a: "Yes, standard late fees apply, though waiver categories were introduced for select flooded districts." }
    ]
  },
  "38th-gst-council-meeting": {
    title: "38th GST Council Meeting: Unified Lottery Slabs & Compliance Updates",
    badge: "Official GST Council Updates",
    intro: "The 38th GST Council Meeting was held on 18th December 2019 in New Delhi. For the first time in GST history, the council held a voting process to decide on a unified tax rate slab for lotteries, settling on a flat 28% GST rate across all state-run and state-authorized lottery tickets.",
    moreIntro: "Chaired by Nirmala Sitharaman, the meeting introduced crucial compliance measures, including massive late fee waivers for GSTR-1 filing delays, exemptions on industrial land leases, and the formation of Grievance Redressal Committees at state levels.",
    resolutionsTitle: "Major Resolutions & Policy Decisions",
    resolutions: [
      { label: "Unified Lottery GST", text: "Established a single 28% GST rate for lotteries, resolving dynamic disputes between state-run and private authorized operations." },
      { label: "Industrial Land Boost", text: "Exempted GST on long-term leases of industrial plots to stimulate infrastructure and manufacturing set-ups." },
      { label: "Taxpayer Grievance cells", text: "Mandated structured state-level Grievance Redressal Committees consisting of both central and state tax officials." }
    ],
    ratesTableTitle: "Key GST Rate Changes Approved in 38th Meeting",
    ratesTableHeaders: ["Sector / Product Category", "Previous GST Rate", "Revised GST Rate", "Market Implications"],
    ratesTableRows: [
      { sector: "State-Run Lottery Tickets", previousRate: "12%", revisedRate: "28%", implications: "Unified rate slabs, increases ticket prices" },
      { sector: "State-Authorized (Private) Lottery", previousRate: "28%", revisedRate: "28%", implications: "Removes price disparities, establishes fair play" },
      { sector: "Woven/Non-Woven bags for packaging", previousRate: "12%", revisedRate: "18%", implications: "Hikes input costs for industrial packaging segments" },
      { sector: "Industrial Land Long-Term Lease (Govt Corp)", previousRate: "18%", revisedRate: "0% (Exempted)", implications: "Lowers setup costs for new manufacturing units" },
      { sector: "Fittings and components for containers", previousRate: "18%", revisedRate: "18%", implications: "Status quo maintained to avoid classification disputes" }
    ],
    guidelinesTitle: "Key Directives for Taxpayers & Delay Waivers",
    guidelines: [
      "Massive GSTR-1 Late Fee Waiver: Waived complete late fees for GSTR-1 filing delays between July 2017 and November 2019, provided they are cleared by January 2020.",
      "Input Tax Credit (ITC) Restrictions: Reduced provisional ITC claims from 20% down to 10% for invoices not uploaded by suppliers in GSTR-2A.",
      "Standard Operating Procedures (SOP): Issued dynamic checklists for tax officers to block fake credit pools and check tax evasion.",
      "Electronic Invoicing standard: Confirmed standard JSON formats for the upcoming national e-invoicing rollouts."
    ],
    faqs: [
      { q: "What was unique about the 38th GST Council Meeting?", a: "For the first time since GST's rollout, a voting process was conducted to resolve a dispute, settling a unified tax slab on lotteries." },
      { q: "What is the unified rate on lottery tickets?", a: "The council fixed a flat 28% GST rate on both state-run and state-authorized lotteries, effective from March 1, 2020." },
      { q: "What was the landmark decision for industrial land?", a: "Exempted GST on long-term leases (20 years or more) of industrial plots issued by state government corporations to promote industrial setups." },
      { q: "How did the meeting help GSTR-1 defaulters?", a: "A complete waiver of late fees was announced for non-filing of GSTR-1 from July 2017 to November 2019, if submitted by January 10, 2020." },
      { q: "What is the new rule for provisional Input Tax Credit (ITC)?", a: "Provisional ITC claims for mismatched invoices (not shown in GSTR-2A) were capped at 10% of the eligible credit, down from the previous 20% slab." },
      { q: "What is a Grievance Redressal Committee (GRC)?", a: "It is a joint state-level committee of central and state tax commissioners designed to resolve local taxpayer disputes and portal glitches." },
      { q: "Was there any change in tax rates for packaging bags?", a: "Yes. GST rates on all woven and non-woven bags (including polythene and plastic packaging) were standardized at 18%." },
      { q: "Did the meeting discuss GST rate hikes to boost revenues?", a: "While state revenues were discussed, the council decided against hiking basic slabs to prevent inflationary spikes." },
      { q: "What is the SOP for fake invoices?", a: "The council issued a Standard Operating Procedure enabling tax officers to biometrically verify and temporarily freeze suspicious input tax credit pools." },
      { q: "How can I check if my e-way bill is locked?", a: "You will receive an automated alert on the GST portal if your account is locked due to continuous non-filing of returns." }
    ]
  }
};

const DynamicTaxPage: React.FC = () => {
  const { subPath } = useParams<{ subPath: string }>();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Dynamic content fallback generator to ensure 100% coverage
  const generateFallbackContent = (slug: string): TaxPageContent => {
    const readableTitle = slug
      .split('-')
      .map(word => {
        if (word.toUpperCase() === 'GST') return 'GST';
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');

    return {
      title: `${readableTitle}: Comprehensive Tax & Regulatory Guides`,
      badge: "Taxation Portal",
      intro: `Understanding the **${readableTitle}** is critical to maintaining clean financial accounts and executing corporate compliances. Tax frameworks undergo regular amendments to align with trade projections and macroeconomic indices.`,
      moreIntro: "At BanksCart, we simplify complicated direct and indirect tax codes into clean, actionable, high-density guides. Keeping track of rate changes, exemption limits, and filing deadlines avoids penal drag and boosts credit ratings.",
      resolutionsTitle: "Core Policy Pillars & Guidelines",
      resolutions: [
        { label: "Simplifying Slabs", text: "Regular tax adjustments to establish competitive pricing structures for consumer goods." },
        { label: "Digitizing Audits", text: "Transitioning toward automated e-invoicing pipelines to optimize compliance costs." },
        { label: "Resolving Grievances", text: "Creating fast-track dispute redressal portals to protect honest taxpayers." }
      ],
      guidelinesTitle: "Taxpayer Compliance Checklist",
      guidelines: [
        "Audit Monthly Returns: Consistently file GSTR-1 and GSTR-3B monthly to avoid portal suspensions.",
        "Check ITC Eligibility: Proactively reconcile purchase ledgers with supplier entries in GSTR-2B.",
        "Generate E-Way Bills: Ensure all transportations exceeding ₹50,000 are backed by active e-way bills.",
        "Archive Audited balance: Retain past 8 fiscal years' accounts files to comply with tax audit acts."
      ],
      faqs: [
        { q: `What is the significance of the ${readableTitle}?`, a: "It represents a critical regulatory milestone refining national tax collection rules, filing timelines, and rates structures." },
        { q: "What is Input Tax Credit (ITC)?", a: "It is the mechanism allowing taxpayers to reduce the tax liability on sales by subtracting the GST already paid on raw business purchases." },
        { q: "What happens if I delay filing my returns?", a: "Delays trigger daily late fees (₹50/day for standard returns) and interest charges of 18% p.a. on the unpaid tax amount." }
      ]
    };
  };

  const currentSlug = subPath || 'overview';
  const pageContent = TAX_PAGE_MAP[currentSlug] || generateFallbackContent(currentSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveFaq(null);
  }, [subPath]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Banner section */}
        <div className="bg-gradient-to-r from-teal-800 via-indigo-900 to-slate-900 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <span className="text-[180px] font-black leading-none select-none">TAX</span>
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              {pageContent.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-6 tracking-tight leading-tight font-sans">
              {pageContent.title}
            </h1>
            <p className="text-slate-200 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl font-medium font-sans">
              {pageContent.intro}
            </p>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Detailed Resolutions and Rates Tables */}
          <div className="lg:col-span-7 space-y-10 text-slate-700">
            
            {/* More Intro if present */}
            {pageContent.moreIntro && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {pageContent.moreIntro}
                </p>
              </div>
            )}

            {/* Resolutions details */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-teal-600 rounded-full"></span>
                {pageContent.resolutionsTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {pageContent.resolutions.map((res, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-xl p-4 hover:border-teal-100 hover:bg-teal-50/10 transition-colors">
                    <h4 className="font-bold text-slate-800 text-sm mb-2">{res.label}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-sans">{res.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rates Table Block */}
            {pageContent.ratesTableRows && pageContent.ratesTableHeaders && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4">{pageContent.ratesTableTitle}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        {pageContent.ratesTableHeaders.map((header, idx) => (
                          <th key={idx} className="p-3 font-semibold text-slate-700">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pageContent.ratesTableRows.map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50">
                          <td className="p-3 font-bold text-slate-800 flex items-center gap-2">
                            <Percent className="w-4 h-4 text-teal-600 flex-shrink-0" />
                            {row.sector}
                          </td>
                          <td className="p-3 font-semibold text-red-600 line-through">{row.previousRate}</td>
                          <td className="p-3 font-bold text-teal-600">{row.revisedRate}</td>
                          <td className="p-3 text-slate-500 font-medium font-sans">{row.implications}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Guidelines Checklist block */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6">{pageContent.guidelinesTitle}</h3>
              <div className="space-y-4">
                {pageContent.guidelines.map((tip, idx) => (
                  <div key={idx} className="flex gap-4 items-start pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                    <div className="w-6 h-6 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-semibold font-sans">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance widgets info */}
            <div className="bg-gradient-to-br from-teal-950 to-indigo-950 rounded-3xl text-white p-6 sm:p-8 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Digitized Compliance Technologies
              </h3>
              <p className="text-xs text-teal-200 mb-6 font-sans">Direct database matching checks of your business filings</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">GSTR Reconciler</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans font-medium">Reconciles GSTR-2B automatically to prevent credit defaults.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Percent className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Regime Optimizer</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans font-medium">Instantly checks tax balances under both Old and New regimes.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Audit Preparedness</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans font-medium">Dynamic checklists verifying compliance buffers for audits.</p>
                </div>
              </div>
            </div>

            {/* FAQs Block */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-teal-600" />
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
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-teal-600' : ''}`} />
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

export default DynamicTaxPage;
