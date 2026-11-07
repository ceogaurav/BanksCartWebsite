import React from "react";
import { FileCheck, ShieldCheck, CheckCircle2 } from "lucide-react";

const documents = [
  {
    category: "Proof of Identity",
    salaried: "PAN Card (Mandatory), Aadhaar Card, Passport, or Voter ID",
    selfEmployed: "PAN Card (Mandatory), Aadhaar Card, Passport, or Voter ID",
  },
  {
    category: "Proof of Residence",
    salaried: "Aadhaar Card, Recent Utility Bill (Electricity/Water), or Valid Rent Agreement",
    selfEmployed: "Aadhaar Card, Recent Utility Bill, or Registered Office Lease Agreement",
  },
  {
    category: "Proof of Income",
    salaried: "Last 3 months' salary slips & Form 16",
    selfEmployed: "ITR with computation of income for last 2 assessment years (CA certified)",
  },
  {
    category: "Banking Statements",
    salaried: "Latest 6 months' salary bank account statement (PDF / NetBanking / Account Aggregator)",
    selfEmployed: "Latest 6 to 12 months' primary current/savings bank statements",
  },
  {
    category: "Employment / Business Proof",
    salaried: "Current employee ID card & official corporate email verification",
    selfEmployed: "GST Registration Certificate, Shop & Establishment Certificate, or MSME Udyam",
  },
];

const DocumentsTable = () => (
  <section className="my-14 font-ibm">
    <div className="text-center max-w-3xl mx-auto mb-10">
      <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
        Checklist &amp; Verification
      </span>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
        Documents Required for Personal Loan Disbursal
      </h2>
      <p className="text-slate-600 text-sm sm:text-base mt-2">
        Keep digital copies of these KYC and income proofs ready for 100% paperless instant processing.
      </p>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold w-1/4">
                Document Category
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-amber-400 w-3/8">
                Salaried Applicants
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-blue-300 w-3/8">
                Self-Employed Professionals &amp; Traders
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {documents.map((d, i) => (
              <tr key={d.category} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{d.category}</span>
                </td>
                <td className="px-6 py-4 text-slate-800 text-xs sm:text-sm leading-relaxed">
                  {d.salaried}
                </td>
                <td className="px-6 py-4 text-slate-800 text-xs sm:text-sm leading-relaxed">
                  {d.selfEmployed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-emerald-50/60 border-t border-emerald-100 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
        <div className="text-xs text-emerald-900">
          <strong>Instant DigiLocker Verification:</strong> Applicants with an Aadhaar-linked mobile number can complete digital KYC instantly without uploading physical paper scans.
        </div>
      </div>
    </div>
  </section>
);

export default DocumentsTable;
