import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { HelpCircle, ChevronDown, Check, Star, ShieldAlert, Sparkles, BookOpen, AlertCircle, Info, Landmark, Percent, Award, ShieldCheck, ArrowRight, Play, MessageSquare, TrendingUp, CreditCard, Heart, Activity } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';
import { ADITYA_BIRLA_PAGE_MAP, AdityaPageContent } from '../../data/adityaBirlaPageData';

interface EditorialArticle {
  title: string;
  content: string[];
}

const getAdityaDetailedArticles = (slug: string): EditorialArticle[] => {
  switch (slug) {
    case 'overview':
      return [
        {
          title: "Aditya Birla Capital: The Pinnacle of Indian Non-Banking Finance",
          content: [
            "Aditya Birla Capital is a leading systemic financial services conglomerate in India, operating across mutual funds, life insurance, commercial lending, housing finance, and wellness solutions. Under direct regulation by the Reserve Bank of India (RBI) and SEBI, the group manages over ₹3.5 Lakh Crores in assets under management (AUM). Their digital-first credit underwriting delivers high-fidelity capital, helping millions of retail customers and small enterprises achieve financial objectives.",
            "By partnering with BanksCart, the company offers a completely transparent digital platform to compare retail loan offerings, track pension fund accumulations, and build robust capital protection shields with minimum transaction overheads."
          ]
        },
        {
          title: "Integrated Wealth, Credit, and Protection Frameworks",
          content: [
            "Modern capital management requires a balanced combination of growth and protection. Aditya Birla's unified portal simplifies this by integrating direct mutual fund SIPs and lump-sum investments with high-value life protection plans and low-cost credit lines.",
            "This integrated framework allows policyholders to compound wealth while maintaining solid life covers, protecting family liabilities from sudden market corrections seamlessly."
          ]
        }
      ];
    case 'business-loan':
      return [
        {
          title: "Fueling Commercial Scale: Collateral-Free MSME Credit Slabs",
          content: [
            "For small and medium enterprises (MSMEs), securing immediate, collateral-free credit is critical to expand capacity, purchase raw materials, or cover seasonal working capital spikes. Aditya Birla Business Loans address this need by offering up to ₹50 Lakhs in unsecured commercial credit.",
            "By utilizing modern cash-flow based digital underwriting, banks bypass traditional physical asset collateral requirements. SME owners can secure approval confirmations online under 48 hours, keeping business operations fully active."
          ]
        },
        {
          title: "Flexible Working Capital Solutions: Cash Credits and Term Loans",
          content: [
            "Different businesses carry distinct cash flow cycles. A seasonal retailer might require a flexible Cash Credit (CC) overdraft limit, whereas a manufacturing startup may need a structured Term Loan to purchase automated equipment.",
            "Aditya Birla structures customized commercial loan offerings, helping business owners select optimal repayment tenure options ranging from 12 to 60 months with convenient reducing interest slabs."
          ]
        }
      ];
    case 'business-loan-interest-rate':
      return [
        {
          title: "Navigating Factors Influencing Commercial Baseline Lending Rates",
          content: [
            "Commercial interest rates are influenced by multiple variables, including the business's vintage, annual turnover logs, credit bureau history (CRIF/CIBIL), and operational cash flows. Aditya Birla Business Loan rates start at competitive floating margins.",
            "At BanksCart, we outline the exact rate matrices side-by-side. By presenting both floating and fixed interest options, we help business owners make informed, cost-effective choices that lower their daily financing costs."
          ]
        },
        {
          title: "Reducing Balance Models vs Fixed Flat Commercial Yields",
          content: [
            "Unsecured business loans can carry complex interest calculations. It is vital to understand the difference between reducing balance interest rates and flat rates. Reducing models compute interest strictly on the remaining outstanding principal, saving thousands in cumulative interest.",
            "We detail these calculation methods, ensuring your commercial loans are transparent and carry the lowest possible total borrowing cost."
          ]
        }
      ];
    case 'empower-pension-sp-plan':
      return [
        {
          title: "ABSLI Empower Pension Single Premium: Lump-Sum Retirement Funding",
          content: [
            "The Empower Pension Single Premium (SP) Plan is a unit-linked solution-oriented retirement plan designed for investors seeking to lock in stable retirement benefits with a single one-time deposit.",
            "By investing a lump-sum, you eliminate the need to manage periodic premium due dates, allowing your capital to compound dynamically in high-yield market funds and build a substantial retirement backstop."
          ]
        },
        {
          title: "Tax Concessions & Retirement Capital Compounding under NPS Slabs",
          content: [
            "Single premium pension plans are highly tax-efficient. All premium deposits qualify for tax exemptions under Section 80C. Upon vesting, policyholders can withdraw up to 60% of the compiled pension fund completely tax-free.",
            "The remaining 40% is converted into regular annuity payouts, offering deferred tax advantages that significantly increase your net retirement wealth compared to taxable fixed-income options."
          ]
        }
      ];
    case 'absli-empower-pension-plan':
      return [
        {
          title: "Cultivating Disciplined Savings for Long-Term Post-Career Peace",
          content: [
            "The ABSLI Empower Pension Plan is a regular premium unit-linked retirement pension plan designed to cultivate periodic, disciplined savings habits during your active working years.",
            "By regularizing moderate monthly or annual savings, investors build a substantial pension fund that compounds safely in expert-managed portfolios, ensuring complete post-career financial security."
          ]
        },
        {
          title: "Loyalty Additions, Compounding Additions, and Lifetime Annuity Slabs",
          content: [
            "To reward long-term retirement planning, Aditya Birla credits guaranteed additions and loyalty additions to the pension fund at regular intervals. These additions accumulate over the policy term, boosting returns.",
            "Upon reaching retirement age, the accumulated corpus is converted into structured monthly annuities, providing a reliable regular income that helps retirees manage post-career outgos seamlessly."
          ]
        }
      ];
    case 'absli-wealth-max-plan':
      return [
        {
          title: "ABSLI Wealth Max Single ULIP: Elite Single Premium Compounding",
          content: [
            "The Wealth Max Plan is an online-exclusive single premium unit-linked life savings insurance plan designed for high-net-worth investors seeking high-yield capital compounding alongside family protection.",
            "By depositing a single lump-sum premium (starting at ₹1 Lakh), you secure comprehensive life cover and a dynamic compounding portfolio managed by expert asset allocators, outperforming taxable mutual funds."
          ]
        },
        {
          title: "Zero Allocation Fees: Maximum Asset Compounding in Growth Equities",
          content: [
            "Unlike traditional ULIPs that impose high upfront premium allocation fees, the Wealth Max Plan features zero allocation charges. 100% of your single premium deposit is converted directly into active NAV units.",
            "This maximizes the market-linked compounding effect from day one, helping your capital compound dynamically in premium equity and bond markets with complete tax insulation under Section 10(10D)."
          ]
        }
      ];
    case 'wealth-secure-plan':
      return [
        {
          title: "Wealth Secure Regular ULIP: Dynamic Life Cover + Asset Allocations",
          content: [
            "The Wealth Secure Plan is a regular premium unit-linked life savings insurance product that combines equity market exposures with complete family term life protection.",
            "Policyholders enjoy direct access to 6 diverse growth funds, allowing them to actively manage their asset allocations based on personal risk appetite and long-term financial objectives."
          ]
        },
        {
          title: "Safe Vesting Switches: Protecting Accumulated Compounding Yields",
          content: [
            "To protect your accumulated wealth close to the policy maturity date, the plan features a dynamic de-risking asset allocator. The system automatically shifts capital from equities to stable sovereign bond funds.",
            "This de-risking system protects your savings from sudden stock market drops, ensuring you lock in all accumulated compounding gains and receive a secure, tax-free lump-sum at maturity."
          ]
        }
      ];
    case 'protector-plus':
      return [
        {
          title: "ABSLI Protector Plus: Pure Term Life Protection at Affordable Rates",
          content: [
            "The Protector Plus Plan is a pure term life insurance policy designed strictly to shield families against long-term liabilities like home loans, vehicle financing, and lifestyle support expenses.",
            "By focusing strictly on high-value life cover, the plan delivers massive sum assured protections for exceptionally cheap daily premiums, ensuring outstanding liabilities are fully insulated if the primary breadwinner passes away."
          ]
        },
        {
          title: "Terminal Illness Payouts and Section 80C Tax Shields for Families",
          content: [
            "The plan includes accelerated payouts for terminal illnesses, releasing up to 50% of the sum assured immediately upon diagnosis to cover specialized treatments and support the family.",
            "All premium payments qualify for 100% tax exemptions of up to ₹1.5 Lakhs under Section 80C of the Income Tax Act, and the ultimate nominee payouts are 100% tax-free under Section 10(10D), offering high tax efficiency."
          ]
        }
      ];
    case 'aditya-birla-activ-health':
      return [
        {
          title: "Wellness Incentives: Earn Up to 100% Cash Back on Premium Payments",
          content: [
            "The Activ Health plan is a premium wellness-linked health insurance cover that rewards healthy habits. By tracking daily steps and regularizing physical tracking online, policyholders earn active health points.",
            "These points compile directly into a dynamic premium waiver ledger, allowing policyholders to claim up to 100% cash returns on renewal premiums while maintaining comprehensive health cover."
          ]
        },
        {
          title: "Cashless Hospitalizations across 10,000+ Premium Network Centers",
          content: [
            "In a healthcare emergency, the plan provides immediate, collateral-free cashless pre-authorizations across a premium network of 10,000+ top-tier hospitals, ensuring direct medical support under 60 minutes.",
            "OPD covers, diagnostic checkup reimbursements, and pharmacy drug bills are also cashless, providing complete medical security for employee families seamlessly."
          ]
        }
      ];
    case 'grievance-redressal-escalation-matrix':
      return [
        {
          title: "Level-by-Level Resolution Desks: Transparent Grievance Escalate Matrix",
          content: [
            "Aditya Birla Capital enforces a highly transparent, Level-by-Level grievance escalation matrix. If a customer is unsatisfied with the support desk resolution, they can escalate the query directly to the Customer Support Manager.",
            "This structured dispute resolution protocol ensures that policy status issues, premium due dates, and tax-saving certificates are resolved under 24 hours with absolute accountability."
          ]
        },
        {
          title: "Escalation to Regional GRO and IRDAI Ombudsman Support Desks",
          content: [
            "If disputes remain unresolved after Level-1 checks, policyholders can escalate to the regional Grievance Redressal Officer (GRO) or file complaints directly with the independent IRDAI Insurance Ombudsman.",
            "This regulatory framework guarantees complete consumer protection and safe dispute resolutions, ensuring zero compromise on policyholder rights in any emergency."
          ]
        }
      ];
    case 'personal-loan-documents-required':
      return [
        {
          title: "Personal Loan Eligibility: Complete Checklist of KYC & Income Proofs",
          content: [
            "Unsecured personal loans bypass traditional physical collateral requirements, meaning lenders evaluate applications strictly based on identity and income stability. Having a clean document pack is critical for immediate approvals.",
            "Salaried individuals must submit active KYC (PAN and Aadhaar), salary slips for the past 3 months, Form 16, and bank statements for the past 6 months showing salary credits, ensuring a rapid onboarding process."
          ]
        },
        {
          title: "Preventing Application Rejection: Crucial Bank Statement Audit Rules",
          content: [
            "Before applying, make sure your bank statements show zero cheque bounces or unpaid direct debits. Even a minor unpaid fee can lower your CIBIL rating and trigger an immediate application rejection.",
            "At BanksCart, we simplify document prep. By organizing clean bank statements and salary proofs, you secure the lowest possible interest rates and rapid approvals online."
          ]
        }
      ];
    case 'home-loan-interest-rates':
      return [
        {
          title: "Floating Interest Slabs: Salaried vs Self-Employed Housing Finance",
          content: [
            "Aditya Birla Home Loan interest rates start at competitive floating margins. Floating rates follow RBI repo movements, allowing home buyers to benefit from downward interest rate cycles.",
            "Private NBFCs customize rate slabs for salaried professionals and self-employed merchants, accepting flexible income documentations to help self-employed cash earners secure maximum home financing."
          ]
        },
        {
          title: "How CIBIL Scores Shift Base Lending Margins in Mortgages",
          content: [
            "Lenders evaluate your CIBIL bureau rating to determine home loan interest rates. A high score of 750+ secures the cheapest baseline interest margins, saving lakhs in cumulative interest over a 30-year term.",
            "We detail this score correlation, helping you build your credit profile and negotiate for lower monthly EMIs and optimal mortgage parameters before applying."
          ]
        }
      ];
    case 'home-loan':
      return [
        {
          title: "Purchasing Flat, Constructing Home, or Expanding Properties Safely",
          content: [
            "Aditya Birla Housing Finance offers easy loans to purchase apartments, construct residential homes, or expand existing rural properties. Offering competitive yields, the group focuses on rapid digital credit clearances.",
            "By compiling site valuations and legal property checks dynamically, the company authorizes maximum loan-to-value limits, ensuring your dream home purchase is fully funded."
          ]
        },
        {
          title: "Sovereign PMAY Subsidies and Maximum LTV Mortgages up to 30 Years",
          content: [
            "Eligible first-time home buyers can secure interest subventions and sovereign grants under the Pradhan Mantri Awas Yojana (PMAY). Repay comfortably over flexible mortgage tenure options up to 30 years.",
            "This structured support reduces monthly EMI burdens, helping middle-income families build their assets without experiencing tight cash constraints."
          ]
        }
      ];
    case 'loan-against-property':
      return [
        {
          title: "Loan Against Property (LAP): Leverage High-Value Property Equity",
          content: [
            "A Loan Against Property (LAP) is a secured credit line that allows you to borrow up to 70% of the market value of your residential or commercial property. This secured structure is significantly cheaper than personal loans.",
            "By pledging property deeds as collateral, borrowers secure high-value funding (up to ₹10 Crores) at low interest rates, making it the perfect choice to fund capital-intensive commercial expansions or medical emergencies."
          ]
        },
        {
          title: "End-Use Flexibility: Funding Business Expansion or Personal Expenses",
          content: [
            "Unlike traditional home loans, LAP funds carry 100% end-use flexibility. Borrowers can utilize the approved capital to expand business capacity, purchase raw materials, pay for children's global higher education, or consolidate expensive debts.",
            "With flexible repayment tenures extending up to 15 years, LAP offers balanced, manageable EMI structures that prevent monthly working capital strains."
          ]
        }
      ];
    case 'personal-loan':
      return [
        {
          title: "Aditya Birla Personal Loan: Instant Unsecured Digital Credit Slabs",
          content: [
            "Create immediate liquidity to cover emergency outgos by securing an Aditya Birla Personal Loan. This unsecured personal credit line provides up to ₹50 Lakhs completely collateral-free, without requiring physical assets as security.",
            "By utilizing a fully digital onboarding process, the bank conducts immediate credit evaluations, disbursing the approved cash to your active bank account in under 24 hours."
          ]
        },
        {
          title: "Reducing Balance EMI Schedules and Zero Collateral Approvals",
          content: [
            "Unsecured personal credit utilizes reducing balance interest calculations, meaning interest is charged strictly on the remaining outstanding principal. This saves thousands compared to flat rate models.",
            "Borrowers can select flexible repayment tenures ranging from 12 to 60 months, helping them balance their monthly cash flows and manage EMIs comfortably."
          ]
        }
      ];
    case 'personal-loan-emi-calculator':
      return [
        {
          title: "Simulating EMIs and Compiling Reducing Interest Amortization Sheets",
          content: [
            "Before committing to long-term personal credit, it is vital to estimate your future EMIs. The Personal Loan EMI Calculator allows you to simulate monthly payments under different principal and interest rate inputs instantly.",
            "The system compiles a detailed amortization schedule, outlining exactly how much of your monthly EMI goes toward paying the principal vs the interest component throughout the loan tenure."
          ]
        },
        {
          title: "Optimizing Loan Tenure: Balance Daily Cash Flows vs Total Interest Costs",
          content: [
            "A longer tenure reduces your monthly EMI, making it easy to manage cash flows, but increases the total cumulative interest paid. A shorter tenure increases the monthly EMI but saves significantly on interest charges.",
            "By utilizing this interactive simulator, you can select the perfect tenure balance that keeps your monthly EMIs comfortable while minimizing the overall payable interest."
          ]
        }
      ];
    default:
      return [];
  }
};

const DynamicAdityaBirlaPage: React.FC = () => {
  const { subPath } = useParams<{ subPath: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  let currentSlug = subPath || 'overview';
  
  // Resolve flat routes mapping
  if (location.pathname.includes('empower-pension-sp-plan')) {
    currentSlug = 'empower-pension-sp-plan';
  } else if (location.pathname.includes('absli-empower-pension-plan')) {
    currentSlug = 'absli-empower-pension-plan';
  } else if (location.pathname.includes('absli-wealth-max-plan')) {
    currentSlug = 'absli-wealth-max-plan';
  } else if (location.pathname.includes('wealth-secure-plan')) {
    currentSlug = 'wealth-secure-plan';
  } else if (location.pathname.includes('protector-plus')) {
    currentSlug = 'protector-plus';
  } else if (location.pathname.includes('aditya-birla-activ-health')) {
    currentSlug = 'aditya-birla-activ-health';
  }

  const pageContent = ADITYA_BIRLA_PAGE_MAP[currentSlug] || ADITYA_BIRLA_PAGE_MAP['overview'];
  const detailedArticles = getAdityaDetailedArticles(currentSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveFaq(null);
  }, [subPath, location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section with Burgundy and Gold Premium Design */}
        <div className="bg-gradient-to-r from-red-950 via-red-900 to-amber-950 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <span className="text-[180px] font-black leading-none select-none">ADITYA</span>
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              {pageContent.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-6 tracking-tight leading-tight">
              {pageContent.title}
            </h1>
            <p className="text-amber-100 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl font-medium font-sans">
              {pageContent.intro}
            </p>
          </div>
        </div>

        {/* 2-Column responsive split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Rich Articles, Comparison Tables */}
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
                      <span className="w-1.5 h-6 bg-red-800 rounded-full"></span>
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
                <span className="w-1.5 h-6 bg-red-800 rounded-full"></span>
                {pageContent.highlightsTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {pageContent.highlights.map((feat, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-xl p-4 hover:border-amber-100 hover:bg-amber-50/10 transition-colors">
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
                            <Landmark className="w-4 h-4 text-red-800 flex-shrink-0" />
                            {row[0]}
                          </td>
                          <td className="p-3 font-semibold text-red-800">{row[1]}</td>
                          <td className="p-3 text-slate-500">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Interactive Simulation Dashboard */}
            <div className="bg-gradient-to-br from-red-950 to-slate-950 rounded-3xl text-white p-6 sm:p-8 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Aditya Birla Strategic Investment Simulator
              </h3>
              <p className="text-xs text-amber-200 mb-6 font-sans">Leverage professional wealth optimization algorithms online</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">HealthReturns™</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans font-medium">Up to 100% Cash Returns for active steps</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Activity className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Fund Compounding</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans font-medium">Auto asset switching prevents market drops</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Pensions Yields</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans font-medium">Lump-sum single payments compound fast</p>
                </div>
              </div>
            </div>

            {/* FAQs Accordion Block */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-red-850" />
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
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-red-850' : ''}`} />
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

export default DynamicAdityaBirlaPage;
