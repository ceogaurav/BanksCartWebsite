import React from "react";

const documents = [
  {
    category: "Proof of Identity",
    salaried: "Aadhaar Card, Passport, Voter ID, PAN Card",
    selfEmployed: "Aadhaar Card, Passport, Voter ID, PAN Card",
  },
  {
    category: "Proof of Residence",
    salaried: "Utility Bill, Rent Agreement, Passport",
    selfEmployed: "Utility Bill, Rent Agreement, Passport",
  },
  {
    category: "Proof of Income",
    salaried: "Last 3 months' Salary Slips, Bank Statement",
    selfEmployed: "ITR for last 2 years, Business Proof, Bank Statement",
  },
  {
    category: "Photograph",
    salaried: "Recent passport-size photo",
    selfEmployed: "Recent passport-size photo",
  },
  {
    category: "Other Documents",
    salaried: "Employee ID, Form 16 (if required)",
    selfEmployed: "GST Registration, Business Address Proof",
  },
];

const DocumentsTable = () => (
  <section className="my-16">
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-extrabold mb-2 text-blue-800 drop-shadow-lg tracking-tight">Documents Required</h2>
      <p className="mb-8 text-gray-600 text-lg max-w-2xl text-center">Ensure you have the following documents ready for a smooth and quick loan application process.</p>
    </div>
    <div className="overflow-x-auto rounded-xl shadow-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white">
      <table className="min-w-full divide-y divide-blue-200">
        <thead>
          <tr>
            <th className="px-8 py-4 bg-blue-600 text-left text-sm font-bold text-white uppercase tracking-wider rounded-tl-xl shadow-sm">Requirement</th>
            <th className="px-8 py-4 bg-blue-500 text-left text-sm font-bold text-white uppercase tracking-wider">Salaried Individuals</th>
            <th className="px-8 py-4 bg-blue-400 text-left text-sm font-bold text-white uppercase tracking-wider rounded-tr-xl shadow-sm">Self-employed Professionals</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((row, i) => (
            <tr
              key={row.category}
              className={
                `transition duration-200 hover:bg-blue-100/60 ${i % 2 === 0 ? "bg-white" : "bg-blue-50"}`
              }
            >
              <td className="px-8 py-5 text-blue-900 font-semibold border-b border-blue-100 w-1/4 align-top">
                <span className="inline-flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
                  {row.category}
                </span>
              </td>
              <td className="px-8 py-5 text-gray-700 border-b border-blue-100 w-1/3 align-top">
                <ul className="list-disc list-inside space-y-1">
                  {row.salaried.split(",").map((item, idx) => (
                    <li key={idx}>{item.trim()}</li>
                  ))}
                </ul>
              </td>
              <td className="px-8 py-5 text-gray-700 border-b border-blue-100 w-1/3 align-top">
                <ul className="list-disc list-inside space-y-1">
                  {row.selfEmployed.split(",").map((item, idx) => (
                    <li key={idx}>{item.trim()}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default DocumentsTable;
