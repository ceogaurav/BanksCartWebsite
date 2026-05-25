import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Percent, Award, BookOpen, CreditCard, Landmark, CheckCircle, HelpCircle as HelpIcon } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';

const SbiCibilScorePage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is the absolute minimum CIBIL score required for an SBI Home Loan?",
      a: "State Bank of India (SBI) generally prefers a CIBIL score of 700 and above for Home Loan approvals. While loans can occasionally be approved for scores between 650 and 699, they attract higher interest rate markups and require higher co-applicant income guarantees."
    },
    {
      q: "Does SBI offer lower interest rates to people with scores above 750?",
      a: "Yes. SBI links its home loan interest rates directly to the applicant's CIBIL score. Applicants with credit scores of 750 to 900 get the lowest interest rates (SBI's base RLLR + zero markup), saving lakhs of rupees over the loan tenure compared to applicants with scores below 700."
    },
    {
      q: "Can I get an SBI Personal Loan with a CIBIL score of 650?",
      a: "SBI personal loans are highly structured. For salaried individuals, a minimum CIBIL score of 720 is ideal. If your score is 650, approval is difficult unless you have a salary account with SBI, a very low debt-to-income ratio, or are a government employee with stable service history."
    },
    {
      q: "How does SBI handle a 'No History' (NH) or '-1' CIBIL score?",
      a: "A CIBIL score of '-1' or 'NH' means you have no active or historical credit footprint. SBI does not reject these loans out of hand. Instead, they evaluate your financial profile using traditional banking histories, bank statement behaviors, and salary stabilities, standardizing the loan terms under basic slabs."
    },
    {
      q: "Does SBI check other bureaus besides TransUnion CIBIL?",
      a: "Yes. While SBI primarily pulls TransUnion CIBIL reports, they also query Experian or CRIF High Mark to double-check record consistencies. A substantial mismatch or default listed on any of the four bureaus will trigger loan rejection."
    },
    {
      q: "How much processing fee discount does SBI offer prime score borrowers?",
      a: "For borrowers with a CIBIL score of 750 or above, SBI frequently waives 50% to 100% of standard home loan processing charges during seasonal campaigns (such as festive loan offers)."
    },
    {
      q: "Can a settled card account block SBI personal loan approvals?",
      a: "Yes. SBI has very conservative retail lending policies. Any account marked as 'Settled', 'Written Off', or 'Post Write-Off Settled' indicates previous payment failures and will trigger immediate personal loan rejection, even if your current CIBIL score has rebounded to 700."
    },
    {
      q: "Will an outstanding credit card balance on another bank affect my SBI loan approval?",
      a: "Yes. When SBI checks your CIBIL report, they calculate your Debt-to-Income (DTI) ratio. If you have huge outstanding revolving balances (even if payments are made on time), SBI will classify you as a high-leverage borrower and may reduce your eligible loan amount."
    },
    {
      q: "Does a high CIBIL score reduce the down payment margin for SBI Home Loans?",
      a: "No. The down payment margin is strictly governed by RBI loan-to-value (LTV) rules based on the property agreement value (e.g., 10% to 20% down payment). However, a high CIBIL score ensures SBI approves the maximum allowable loan bracket under those LTV rules without hesitation."
    },
    {
      q: "Can I dispute my CIBIL score records directly through an SBI branch?",
      a: "No. Branch managers cannot edit your credit report. If your CIBIL report displays wrong loan info reported by SBI, you must request the branch manager to submit an internal correction ticket to SBI's credit operations desk, or file an online dispute directly on TransUnion CIBIL's portal."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-800 via-indigo-900 to-blue-950 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <span className="text-[200px] font-black leading-none select-none">SBI</span>
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              Bank Specific Policies
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-6 tracking-tight leading-tight">
              SBI CIBIL Score Requirements
            </h1>
            <p className="text-blue-100 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl">
              Discover how the State Bank of India leverages your CIBIL profile to determine interest rates, concessions, and product eligibility.
            </p>
          </div>
        </div>

        {/* 2-Column Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-10 text-slate-700">
            
            {/* Bank Intro */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-blue-700 rounded-full"></span>
                SBI Credit Policy: CIBIL Score Linkage
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                As India's largest public sector lender, the **State Bank of India (SBI)** has pioneer guidelines linking retail lending interest rates directly to an applicant's credit score. Under SBI's Risk-Focused Interest Rate structure, your CIBIL rating decides the exact percentage rate you pay on home, auto, and personal loans.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Rather than offering flat standard interest rates, SBI utilizes the Repo Linked Lending Rate (RLLR) as a baseline. They then apply markups based on the borrower's credit score tier. By maintaining a credit score above 750, you qualify as a prime borrower. This enables you to demand the lowest interest rates, waiver of administrative fees, and faster processing timelines.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Conversely, applicants with credit scores below 700 face higher markups. This can translate into home loan rates that are 0.40% to 0.80% higher. Over a standard 20-year home loan tenure, this minor variance results in additional interest expenditures totaling lakhs of rupees.
              </p>
            </div>

            {/* Matrix Table: SBI Loan Types vs CIBIL requirement */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-blue-700" />
                SBI Retail Loans: CIBIL Score Slabs & Pricing
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Here is a breakdown of SBI's retail loan requirements and typical preferred brackets:
              </p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="p-3 font-semibold text-slate-700">SBI Loan Product</th>
                      <th className="p-3 font-semibold text-slate-700">Minimum CIBIL Needed</th>
                      <th className="p-3 font-semibold text-slate-700">Preferred Bracket</th>
                      <th className="p-3 font-semibold text-slate-700">Interest Concession</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-slate-800">SBI Home Loan</td>
                      <td className="p-3 font-semibold text-slate-600">650</td>
                      <td className="p-3 text-emerald-600 font-bold">&gt;= 750</td>
                      <td className="p-3 text-slate-500">Up to 0.15% discount on base rates</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-slate-800">SBI Personal Loan</td>
                      <td className="p-3 font-semibold text-slate-600">720</td>
                      <td className="p-3 text-emerald-600 font-bold">&gt;= 780</td>
                      <td className="p-3 text-slate-500">Bypass administrative charges</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-slate-800">SBI Auto Loan</td>
                      <td className="p-3 font-semibold text-slate-600">700</td>
                      <td className="p-3 text-emerald-600 font-bold">&gt;= 750</td>
                      <td className="p-3 text-slate-500">100% financing on on-road price</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-slate-800">SBI Credit Cards</td>
                      <td className="p-3 font-semibold text-slate-600">700</td>
                      <td className="p-3 text-emerald-600 font-bold">&gt;= 740</td>
                      <td className="p-3 text-slate-500">Premium credit limit upgrades</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* In-depth: Home Loan Pricing slabs */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Percent className="w-5 h-5 text-blue-700" />
                SBI Home Loan Interest Markups Decoded
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                To understand how credit scores translate to home loan rates, check SBI's standard markup slabs linked to scores:
              </p>
              <div className="space-y-3.5 mt-4 text-xs sm:text-sm text-slate-600">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="font-semibold text-slate-800">CIBIL Score &gt;= 750:</span>
                  <span className="text-emerald-600 font-bold">Lowest Interest Slab (Base RLLR + 0% Markup)</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="font-semibold text-slate-800">CIBIL Score 700 - 749:</span>
                  <span className="text-slate-700">Standard Interest Slab (Base RLLR + 0.10% Markup)</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="font-semibold text-slate-800">CIBIL Score 650 - 699:</span>
                  <span className="text-amber-600">Premium Interest Slab (Base RLLR + 0.30% Markup)</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="font-semibold text-slate-800">CIBIL Score 550 - 649:</span>
                  <span className="text-rose-600 font-bold">Substandard Slab (Base RLLR + 0.50% to 0.80% Markup)</span>
                </div>
              </div>
            </div>

            {/* Perks for prime borrowers */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Perks of Having 750+ CIBIL Score for SBI Loans</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border border-slate-100 rounded-xl p-4 text-center hover:border-blue-100 transition-colors">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Percent className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">Interest Discounts</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Link directly to SBI's lowest interest slabs and save huge on monthly EMIs.
                  </p>
                </div>

                <div className="border border-slate-100 rounded-xl p-4 text-center hover:border-blue-100 transition-colors">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">Zero Processing Fees</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    SBI occasionally waives off absolute processing charges for prime score applicants.
                  </p>
                </div>

                <div className="border border-slate-100 rounded-xl p-4 text-center hover:border-blue-100 transition-colors">
                  <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">Simplified Docs</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Higher trust factors translate to fewer document validation requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* How SBI handles NH/-1 */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Borrowing from SBI as a Credit-First Applicant (NH / -1 Score)
              </h3>
              <p className="text-sm text-blue-700 leading-relaxed">
                If you have a blank credit history, SBI does not reject your loan application. For **Home Loans**, SBI places NH/-1 applicants in a standardized pricing bracket, usually equal to standard borrowers with credit scores of 700 to 749. For **Personal Loans**, they will require salary routing through an SBI savings account or corporate salary package agreements to offset risk.
              </p>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HelpIcon className="w-5 h-5 text-blue-800" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-slate-100 rounded-xl overflow-hidden transition-colors">
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="w-full flex justify-between items-center p-4 bg-slate-50/50 hover:bg-slate-50 text-left font-bold text-slate-700 text-sm outline-none transition-colors"
                    >
                      {faq.q}
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-blue-700' : ''}`} />
                    </button>
                    {activeFaq === index && (
                      <div className="p-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100 bg-white leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <CibilCheckerForm sourcePage="SBI CIBIL Score Landing Page" />
          </div>

        </div>

      </div>
    </div>
  );
};

export default SbiCibilScorePage;
