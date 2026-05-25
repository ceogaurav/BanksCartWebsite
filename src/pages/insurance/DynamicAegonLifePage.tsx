import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { HelpCircle, ChevronDown, Check, Star, ShieldAlert, Sparkles, BookOpen, AlertCircle, Info, Landmark, Percent, Award, ShieldCheck, ArrowRight, Play, MessageSquare, TrendingUp, CreditCard, Heart, Shield, Lock } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';
import { AEGON_LIFE_PAGE_MAP, AegonPageContent } from '../../data/aegonLifePageData';

interface EditorialArticle {
  title: string;
  content: string[];
}

const getAegonDetailedArticles = (slug: string): EditorialArticle[] => {
  switch (slug) {
    case 'aegon-life-child-plans':
      return [
        {
          title: "Securing Higher Education & Career Milestones in India",
          content: [
            "With double-digit inflation in higher education (averaging 10% to 12% annually), professional courses such as engineering, medicine, and business administration are set to cost upwards of ₹25 Lakhs to ₹50 Lakhs by the next decade. Standard savings accounts or fixed deposits struggle to match this inflation, often yielding negative real returns after tax. This is where Aegon Life Child Plans act as a premium compounding engine, designed specifically to lock in stable, high-fidelity yields.",
            "By investing regular premiums early in your child's lifecycle, the plan builds a substantial, tax-free wealth corpus. More than a simple savings tool, it acts as an ironclad protection shield, ensuring that even in the ultimate absence of the earning parent, the child's academic aspirations, wedding dreams, and career launches remain fully and reliably financed on schedule."
          ]
        },
        {
          title: "How the Premium Waiver Benefit Guarantees Academic Continuity",
          content: [
            "The defining feature of the Aegon Child Plan is the built-in Premium Waiver Benefit (PWB). In standard savings instruments, if the primary investor passes away, the investments stop, and the maturity goal is disrupted. Under the Aegon framework, if the premium-paying parent meets with an untimely demise during the policy term, the policy undergoes a dynamic shift.",
            "First, the immediate sum assured (life cover) is paid out to the family to manage short-term liabilities. Second, all future outstanding premium payments are completely waived and paid by Aegon Life itself. The policy continues to compound exactly as scheduled, and when maturity is reached, the child receives the full guaranteed wealth corpus to pay for college fees or business setups, keeping the parent's dreams completely alive."
          ]
        },
        {
          title: "Compounding Growth via Equity and Debt Portfolio Slabs",
          content: [
            "Aegon Life Child Plans offer flexible investment asset allocation. Policyholders can choose to allocate premiums across a diverse spectrum of funds, from aggressive bluechip equity funds to stable sovereign debt instruments. This active capital management protects yields as maturity approaches by shifting allocations from high-volatility equities to safe income bonds.",
            "This self-managing dynamic prevents sudden stock market drops from wiping out years of accumulated child savings close to their college admission years, providing a structured, bulletproof strategy for long-term retail investors."
          ]
        },
        {
          title: "Maximizing Tax Offsets under Section 80C and 10(10D)",
          content: [
            "Beyond absolute safety, child plans are exceptionally tax-efficient. Under Section 80C of the Income Tax Act, all annualized premium deposits qualify for 100% tax deductions of up to ₹1.5 Lakhs. More importantly, under Section 10(10D), the entire maturity amount and accumulated loyalty additions are 100% tax-free at withdrawal.",
            "This double-tax exemption (EEE) translates to significantly higher net yields compared to taxable fixed income schemes, making child plans the premier choice for taxpayers in the high 30% slabs."
          ]
        }
      ];
    case 'aegon-life-customer-care':
      return [
        {
          title: "24/7 Digital Helplines & Prompt Support Protocols",
          content: [
            "Aegon Life operates a modern, multi-channel support desk designed to deliver prompt assistance. Salaried policyholders, NRIs, and claimants can connect via digital channels, including central toll-free lines, self-service WhatsApp support chatbots, and dedicated grievance email portals. This digital-first framework ensures that queries regarding policy status, premium due dates, and tax-saving certificates are resolved under 24 hours.",
            "For overseas clients, Aegon provides a dedicated NRI helpdesk to facilitate international wire transfers, update residency statuses, and coordinate foreign bank mandates seamlessly without requiring physical visits to branch offices."
          ]
        },
        {
          title: "How to Register an Online Claim: A Nominee's Guide",
          content: [
            "Filing a death claim is structured to be simple and stress-free for the nominee. In an emergency, the claimant can register the claim online through the Aegon claim portal or by sending an email to claims@aegonlife.com. The process requires submitting the completed claim form, the original policy pack, the municipal death certificate, the claimant's active bank account KYC (PAN and cancelled cheque), and medical reports in case of critical illness.",
            "Once documents are digitally uploaded, Aegon's specialized claim desk conducts immediate background checks. Approved payouts are credited directly to the nominee's bank account via secure electronic transfers, maintaining an exceptional claims processing timeline."
          ]
        },
        {
          title: "Escalation Matrix and Ombudsman Grievance Resolution",
          content: [
            "Aegon Life enforces a transparent Level-by-Level grievance escalation matrix. If a customer is unsatisfied with the support desk resolution, they can escalate the complaint to the Manager of Customer Support, followed by the Chief Grievance Redressal Officer (GRO).",
            "In rare cases where disputes remain unresolved after 30 days, policyholders have direct recourse to the IRDAI Insurance Ombudsman. This independent regulatory framework guarantees complete consumer protection and safe dispute resolutions under official guidelines."
          ]
        }
      ];
    case 'life-easy-protect-insurance-plan':
      return [
        {
          title: "Sovereign Family Security for First-Time Salaried Buyers",
          content: [
            "The Easy Protect Insurance Plan is designed strictly to cater to the protection requirements of young salaried individuals and first-time insurance buyers. During early career stages, entry-level salaries make premium affordability a critical factor. Easy Protect solves this by delivering high-value pure term life coverage for exceptionally cheap daily premiums.",
            "This allows young professionals to secure a robust financial safety shield for their families, ensuring outstanding college loans, retail debts, and parental support liabilities remain fully insulated without draining active cash reserves."
          ]
        },
        {
          title: "Simplifying Underwriting via Digital Health Declarations",
          content: [
            "Traditional term insurance often involves complex underwriting, including tedious physical medical checkups, diagnostic tests, and prolonged documentation loops. Easy Protect bypasses these hurdles through a digitized underwriting system.",
            "Healthy applicants under 40 years can declare their medical history, non-smoking status, and occupation via a simple digital questionnaire. Immediate approvals are granted for sum assured options up to ₹50 Lakhs, making term protection instant."
          ]
        },
        {
          title: "Locking in Low Premiums Early: The Compounding Advantage",
          content: [
            "Premium rates in term insurance are directly linked to age and physical health status. Every year of delay in purchasing term insurance increases the base premium rate by 8% to 10%. By locking in an Easy Protect term plan at age 25, you secure an exceptionally cheap premium that remains completely fixed for the entire policy tenure.",
            "This early action saves thousands in cumulative premiums over a 30-year term, making it the most cost-effective decision for young investors."
          ]
        }
      ];
    case 'future-protect-insurance-plan':
      return [
        {
          title: "Comprehensive High-Ticket Term Cover for Long-Term Debts",
          content: [
            "The Aegon Life Future Protect Plan is a pure term life insurance policy designed to shield families against long-term liabilities like home loans, vehicle financing, and children's higher education. The death of a primary earner can leave a family exposed to immediate debt recovery actions by commercial banks.",
            "Future Protect mitigates this risk by delivering a substantial sum assured (e.g. ₹1 Crore and above) that is paid out as a tax-free lump-sum to the nominee, ensuring the family home remains secure and daily lifestyle levels are fully maintained."
          ]
        },
        {
          title: "Terminal Illness Accelerated Payout Mechanics",
          content: [
            "Future Protect includes a built-in accelerated payout benefit for terminal illnesses. If the policyholder is diagnosed with a critical illness with a medical prognosis of less than 6 months to live, the plan immediately releases up to 50% of the sum assured.",
            "This advance payout provides vital cash to fund experimental treatments, cover palliative care outgos, and manage family finances during a difficult period, acting as a crucial secondary shield during healthcare emergencies."
          ]
        },
        {
          title: "Tax Concessions & Accidental Rider Enhancements",
          content: [
            "All premium payments for Future Protect qualify for 100% tax exemptions of up to ₹1.5 Lakhs under Section 80C of the Income Tax Act. The ultimate maturity payouts received by nominees are 100% tax-free under Section 10(10D).",
            "Policyholders can also enhance their base cover by adding critical illness and accidental death riders. These riders provide additional payout benefits, securing complete financial safety."
          ]
        }
      ];
    case 'future-protect-plus-insurance-plan':
      return [
        {
          title: "Return of Premium: 100% Risk Coverage at Zero Net Cost",
          content: [
            "For retail investors hesitant to pay premiums for pure term insurance due to zero survival benefits, the Future Protect Plus Plan offers a Return of Premium (ROP) framework. If the policyholder survives the entire policy term, Aegon Life returns 100% of the base premiums.",
            "This makes the entire life protection completely free of net cost over the policy term. You secure complete peace of mind during your active working years and receive a substantial tax-free cash refund upon policy vesting."
          ]
        },
        {
          title: "Comparing Pure Term Plans vs Return of Premium Slabs",
          content: [
            "While pure term plans offer the lowest premium per rupee of sum assured, they do not pay out on survival. ROP plans carry slightly higher premiums but guarantee maturity refunds.",
            "Financial advisors recommend ROP plans for disciplined savers who want to combine absolute protection with a structured wealth backstop at retirement, making it a highly balanced addition to a portfolio."
          ]
        },
        {
          title: "Double Death Benefits: Accidental Payout Multipliers",
          content: [
            "Future Protect Plus offers comprehensive coverage by combining high-value term cover with built-in accidental death benefit riders. If the policyholder passes away due to an accident, the nominee receives up to double the base sum assured.",
            "This multiplier payout is designed to cover the sudden and high expenses associated with accidental deaths, helping the family manage outstanding debts and maintain financial stability."
          ]
        }
      ];
    case 'aegon-life-guaranteed-growth-insurance-plan':
      return [
        {
          title: "Predictable Compounding Insulated from Market Drops",
          content: [
            "The Guaranteed Growth Plan is a structured savings endowment plan designed to deliver guaranteed payouts completely insulated from volatile stock market movements. This non-linked policy compounds your money at fixed rates set on the day of contract signing.",
            "This makes it the perfect investment vehicle for conservative savers who want to achieve specific financial goals, such as building a child's marriage fund or booking a retirement home, with absolute predictability."
          ]
        },
        {
          title: "How Loyalty Additions & Guaranteed Additions Compound",
          content: [
            "To reward long-term investors, the plan credits guaranteed additions and loyalty additions to the policy fund at regular intervals. These additions accumulate over the policy term and are paid out alongside the sum assured upon maturity.",
            "This structured growth significantly outperforms standard savings instruments and provides a reliable wealth backstop that grows steadily year after year, backed by the strong capital reserves of Aegon Life."
          ]
        },
        {
          title: "Structuring Monthly Annuities vs Lump-Sum Maturity",
          content: [
            "The plan offers flexible payout options at maturity. Policyholders can choose to receive their compiled wealth as a single tax-free lump-sum payout or convert it into structured monthly annuities.",
            "This flexibility allows investors to align payouts with their personal cash flow requirements, whether they need immediate funds for capital expenses or a steady monthly stream to supplement post-retirement incomes."
          ]
        }
      ];
    case 'aegon-life-iguarantee-insurance':
      return [
        {
          title: "Secure Pocket Savings: Achieve Medium-Term Goals Safely",
          content: [
            "The iGuarantee Insurance Plan is an online-exclusive savings plan designed to help retail investors fund medium-term goals, such as purchasing a vehicle, funding a vacation, or paying home downpayments. The plan features a short 6-year premium term, making it accessible.",
            "By regularizing moderate monthly or annual savings for strictly 6 years, investors build a substantial cash reserve that compounds safely over a 12-year term, delivering highly predictable maturity values."
          ]
        },
        {
          title: "100% Guaranteed Maturity Returns Set at Booking",
          content: [
            "Under the iGuarantee framework, there are no variables or market risks. The exact cash value you will receive on the maturity date is clearly calculated and printed on the policy document at the time of purchase.",
            "This absolute predictability protects your savings from market crashes, ensuring that your medium-term goals remain fully funded on schedule regardless of macroeconomic shifts."
          ]
        },
        {
          title: "Tax-Free Compounding Outperforming Bank FDs",
          content: [
            "While bank fixed deposits are secure, the interest earned is fully taxable under your income tax slab, reducing net returns. Aegon's iGuarantee maturity payouts are 100% tax-free under Section 10(10D).",
            "This double tax shield (tax-deductible premiums under Section 80C and tax-free maturities) makes iGuarantee a highly efficient choice for taxpayers seeking high-yield, risk-free compounding options."
          ]
        }
      ];
    case 'imaximize-insurance-plan':
      return [
        {
          title: "High-Yield ULIP Compounding with Zero Allocation Fees",
          content: [
            "The iMaximize Insurance Plan is a unit-linked insurance product (ULIP) that combines market-linked growth with family life protection. Unlike traditional ULIPs that charge high premium allocation fees, iMaximize features zero allocation charges.",
            "This means 100% of your paid premiums are instantly converted into active NAV units, maximizing the compounding effect from day one and delivering significantly higher long-term market yields."
          ]
        },
        {
          title: "Dynamic Asset Switching Across 6 High-Performing Funds",
          content: [
            "Policyholders can manage their investments by shifting capital across 6 diverse funds, from high-equity growth funds to conservative sovereign debt funds. Aegon offers unlimited fund switches 100% free of charge.",
            "This allows smart investors to actively manage their portfolios, locking in equity market gains during rallies and shifting capital into safe debt instruments during market drops to shield their compiled wealth."
          ]
        },
        {
          title: "Inbuilt Accidental Death Payouts & Family Cover",
          content: [
            "iMaximize provides robust term life coverage alongside market investments. In the event of an accidental death, the plan pays out an additional sum assured (up to 200% of the base sum) to the nominee.",
            "This double payout shield secures nominee safety, helping them clear outstanding liabilities and maintain their standard of living, while the investment units continue compounding."
          ]
        }
      ];
    case 'imaximize-single-premium-insurance-plan':
      return [
        {
          title: "Lump-Sum Market Compounding with Single Deposit Slabs",
          content: [
            "The iMaximize Single Premium Plan is a unit-linked insurance product designed for investors with idle capital reserves. By depositing a single lump-sum premium (starting at ₹1 Lakh), you secure comprehensive life cover and a high-yield compounding portfolio.",
            "This eliminates the need to manage annual premium calendars while giving you full exposure to Indian equity and corporate debt markets, making it a highly efficient alternative to taxable mutual funds."
          ]
        },
        {
          title: "Tactical Asset Swaps: Shielding Your Capital Tax-Free",
          content: [
            "Under direct mutual fund investments, shifting money from equity to debt triggers immediate capital gains taxes. Under Aegon's Single Premium ULIP, switching assets between equity and bond funds is 100% tax-free.",
            "This allows you to lock in stock market profits and secure capital gains without triggering tax liabilities, offering unparalleled tax efficiency for high-net-worth retail investors."
          ]
        },
        {
          title: "Sovereign Death Shield for Single Premium Portfolios",
          content: [
            "To qualify for tax-free maturity benefits under Section 10(10D), the plan provides a life cover sum assured of at least 10 times the single premium deposit. If the investor passes away during the term, the nominee receives the higher of the sum assured or the fund value.",
            "This dual guarantee protects your family, ensuring they are fully insulated against debt liabilities while your lump-sum capital compounds dynamically in premium equity markets."
          ]
        }
      ];
    case 'pension-plans':
      return [
        {
          title: "Securing Lifelong Pension Annuities for Post-Career Dignity",
          content: [
            "Pension and Retirement Plans are critical financial vehicles designed to build a secure wealth backstop for your post-career life. As life expectancy increases and healthcare inflation rises, relying strictly on standard savings accounts often leads to early capital depletion.",
            "Aegon's pension plans solve this by compounding your savings during your working years and converting the accumulated corpus into guaranteed monthly, quarterly, or annual annuity payouts for life, ensuring absolute income security."
          ]
        },
        {
          title: "Section 80CCC Tax Benefits & Tax-Free Corpus Withdrawals",
          content: [
            "All premium deposits qualify for tax exemptions under Section 80CCC (up to ₹1.5 Lakhs annually). Upon reaching retirement age (vesting), investors can withdraw up to 60% of the accumulated retirement corpus completely tax-free.",
            "The remaining 40% is converted into regular annuity payouts. This tax-deferred compounding cycle significantly increases net maturity reserves compared to taxable fixed-income options."
          ]
        },
        {
          title: "Dynamic De-risking: Shielding Retirement Wealth",
          content: [
            "To protect your pension corpus close to your retirement date, the plan features an automatic de-risking asset allocator. The system automatically shifts capital from high-yield equity funds to low-risk sovereign debt funds as you age.",
            "This de-risking cycle protects your retirement savings from sudden stock market corrections, ensuring you lock in maximum compounding gains and enter your post-career life with complete financial peace of mind."
          ]
        }
      ];
    case 'rising-star-insurance-plan':
      return [
        {
          title: "Aegon Rising Star Scholar: Child Education Investment ULIP",
          content: [
            "The Rising Star Insurance Plan is a solution-oriented unit-linked policy designed strictly to fund higher education and career starts for children. Education costs in India are rising at 10% to 12% p.a., outperforming standard bank deposits.",
            "Rising Star solves this by compounding regular premiums dynamically in growth equity funds early in your child's life, compiling a substantial tax-free maturity corpus that aligns with college entry milestones."
          ]
        },
        {
          title: "How the Double Death Benefit & Premium Waiver Shield Works",
          content: [
            "If the parent passes away during the policy term, the nominee receives an immediate lump-sum sum assured to handle short-term liabilities. Aegon Life then waives all future outstanding premiums and funds the policy on behalf of the parent.",
            "The child also receives regular annual cash assistance to cover immediate school fees, while the main policy compounds exactly as scheduled, delivering the full maturity amount at year 18 to pay for college."
          ]
        },
        {
          title: "Equity Allocation & Active Fund Swaps to Counter Inflation",
          content: [
            "To beat rising academic costs, parents can allocate premiums across a diverse spectrum of aggressive equity funds. The plan allows unlimited free fund switches, letting you actively manage the child's portfolio.",
            "As the college admission date nears, you can switch assets from volatile equities to stable income bonds, locking in all accumulated gains and securing absolute payout safety."
          ]
        }
      ];
    case 'term-insurance-plans':
      return [
        {
          title: "Best Term Insurance Plans in India: The Ultimate Buyer's Guide",
          content: [
            "Pure term insurance is the most transparent and cost-effective family protection tool available. Unlike endowment policies that bundle savings with life cover, term plans focus strictly on high-value life protection, offering substantial sum assured coverages for exceptionally low premiums.",
            "This makes it the perfect vehicle to protect your family's future, ensuring outstanding home mortgages, car loans, and daily lifestyle outgos are fully covered if the primary breadwinner passes away."
          ]
        },
        {
          title: "Analyzing Solvency Ratios & Claim Settlement Metrics",
          content: [
            "Before purchasing a term plan, buyers should check the insurer's Solvency Ratio (regulatory minimum is 1.50) and Claim Settlement Ratio (CSR). Insurers with a high solvency ratio have strong capital reserves to honor claims.",
            "Prioritizing companies with an audited CSR exceeding 98% and a fast claim settlement timeline guarantees that nominee payouts are processed seamlessly and securely without unnecessary delays in emergencies."
          ]
        },
        {
          title: "Enhancing Base Cover with Critical Illness & Disability Riders",
          content: [
            "Policyholders can customize their protection by adding riders. A Critical Illness rider provides a lump-sum payout upon diagnosis of listed critical conditions, helping cover premium treatments and outpatient expenses.",
            "Disability and Accidental Death riders provide premium waivers and payout multipliers, securing complete financial safety under a single integrated policy."
          ]
        }
      ];
    default:
      return [];
  }
};

const DynamicAegonLifePage: React.FC = () => {
  const { subPath } = useParams<{ subPath: string }>();
  const location = useLocation();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Resolve current slug from parameters or location pathnames (for flat routes)
  let currentSlug = subPath || 'aegon-life-child-plans';
  
  if (location.pathname.includes('aegon-life-child-plans')) {
    currentSlug = 'aegon-life-child-plans';
  } else if (location.pathname.includes('aegon-life-customer-care')) {
    currentSlug = 'aegon-life-customer-care';
  } else if (location.pathname.includes('life-easy-protect-insurance-plan')) {
    currentSlug = 'life-easy-protect-insurance-plan';
  } else if (location.pathname.includes('future-protect-insurance-plan')) {
    currentSlug = 'future-protect-insurance-plan';
  } else if (location.pathname.includes('future-protect-plus-insurance-plan')) {
    currentSlug = 'future-protect-plus-insurance-plan';
  } else if (location.pathname.includes('aegon-life-guaranteed-growth-insurance-plan')) {
    currentSlug = 'aegon-life-guaranteed-growth-insurance-plan';
  } else if (location.pathname.includes('aegon-life-iguarantee-insurance')) {
    currentSlug = 'aegon-life-iguarantee-insurance';
  } else if (location.pathname.includes('imaximize-insurance-plan')) {
    currentSlug = 'imaximize-insurance-plan';
  } else if (location.pathname.includes('imaximize-single-premium-insurance-plan')) {
    currentSlug = 'imaximize-single-premium-insurance-plan';
  } else if (location.pathname.includes('rising-star-insurance-plan')) {
    currentSlug = 'rising-star-insurance-plan';
  } else if (location.pathname.includes('pension-plans')) {
    currentSlug = 'pension-plans';
  } else if (location.pathname.includes('term-insurance-plans')) {
    currentSlug = 'term-insurance-plans';
  }

  const pageContent = AEGON_LIFE_PAGE_MAP[currentSlug] || AEGON_LIFE_PAGE_MAP['aegon-life-child-plans'];
  const detailedArticles = getAegonDetailedArticles(currentSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveFaq(null);
  }, [subPath, location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section with Aegon Deep Red/Orange Gradient */}
        <div className="bg-gradient-to-r from-red-900 via-rose-950 to-slate-900 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <span className="text-[180px] font-black leading-none select-none">AEGON</span>
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              {pageContent.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-6 tracking-tight leading-tight">
              {pageContent.title}
            </h1>
            <p className="text-rose-100 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl font-medium font-sans">
              {pageContent.intro}
            </p>
          </div>
        </div>

        {/* 2-Column responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Rich Articles, Tables */}
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
                      <span className="w-1.5 h-6 bg-rose-700 rounded-full"></span>
                      {art.title}
                    </h3>
                    {art.content.map((p, pIdx) => (
                      <p key={pIdx} className="text-slate-600 text-sm leading-relaxed font-sans font-medium text-justify">
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
                <span className="w-1.5 h-6 bg-rose-700 rounded-full"></span>
                {pageContent.highlightsTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {pageContent.highlights.map((feat, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-xl p-4 hover:border-rose-100 hover:bg-rose-50/10 transition-colors">
                    <h4 className="font-bold text-slate-800 text-sm mb-2">{feat.label}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{feat.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison table */}
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
                            <Landmark className="w-4 h-4 text-rose-750 flex-shrink-0" />
                            {row[0]}
                          </td>
                          <td className="p-3 font-semibold text-rose-750">{row[1]}</td>
                          <td className="p-3 text-slate-500">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Interactive Simulation Dashboard */}
            <div className="bg-gradient-to-br from-rose-950 to-slate-950 rounded-3xl text-white p-6 sm:p-8 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Aegon Life Digital Security Systems
              </h3>
              <p className="text-xs text-rose-200 mb-6 font-sans">Simulate active life coverages and guaranteed wealth payouts online</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Premium Waiver</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans font-medium">Child policy remains fully active in demise events</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Lock className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Guaranteed Growth</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans font-medium">Stable wealth compounding insulated from market drops</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">iMaximize ULIP</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans font-medium">Zero allocation fees translate to higher compounding NAVs</p>
                </div>
              </div>
            </div>

            {/* FAQs Accordion Block */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-rose-700" />
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
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-rose-700' : ''}`} />
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

export default DynamicAegonLifePage;
