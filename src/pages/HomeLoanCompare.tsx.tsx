import React, { useState } from "react";
import { homeLoanProducts } from "../data/homeLoanProducts";
import { personalLoanProducts } from "../data/personalLoanProducts";
import { businessLoanProducts } from "../data/businessLoanProducts";
import { motion, AnimatePresence } from "framer-motion";

const maxBanks = 4;
const minBanks = 2;

const loanTypes = [
  { key: "home", label: "\uD83C\uDFE0 Home Loan" },
  { key: "personal", label: "\uD83D\uDCB3 Personal Loan" },
  { key: "business", label: "\uD83C\uDFE2 Business Loan" },
];

const fieldsMap: Record<string, any[]> = {
  home: [
    { key: "interestRate", label: "Interest Rate", tooltip: "Annual interest rate range" },
    { key: "loanTenure", label: "Loan Tenure", tooltip: "Maximum loan tenure allowed" },
    { key: "ltv", label: "LTV", tooltip: "Loan-to-Value ratio (max % of property value)" },
    { key: "maxLoanAmount", label: "Max Loan Amount", tooltip: "Maximum loan amount available" },
    { key: "ageRange", label: "Eligibility – Age", tooltip: "Eligible age range for applicants" },
    { key: "processingFee", label: "Processing Fee", tooltip: "Processing fee charged by the bank" },
  ],
  personal: [
    { key: "interestRate", label: "Interest Rate", tooltip: "Annual interest rate range" },
    { key: "loanTenure", label: "Loan Tenure", tooltip: "Maximum loan tenure allowed" },
    { key: "maxLoanAmount", label: "Max Loan Amount", tooltip: "Maximum loan amount available" },
    { key: "ageRange", label: "Eligibility – Age", tooltip: "Eligible age range for applicants" },
    { key: "processingFee", label: "Processing Fee", tooltip: "Processing fee charged by the bank" },
  ],
  business: [
    { key: "interestRate", label: "Interest Rate", tooltip: "Annual interest rate range" },
    { key: "loanTenure", label: "Loan Tenure", tooltip: "Maximum loan tenure allowed" },
    { key: "maxLoanAmount", label: "Max Loan Amount", tooltip: "Maximum loan amount available" },
    { key: "turnoverReq", label: "Turnover Requirement", tooltip: "Minimum business turnover required" },
    { key: "processingFee", label: "Processing Fee", tooltip: "Processing fee charged by the bank" },
  ],
};

function areAllEqual(arr: string[]) {
  return arr.length > 1 && arr.every((v) => v === arr[0]);
}

const HomeLoanCompare: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("home");
  const [selected, setSelected] = useState<(string | null)[]>([null, null]);
  const [showCompare, setShowCompare] = useState(false);

  // Choose products based on selectedType
  const products =
    selectedType === "home"
      ? homeLoanProducts
      : selectedType === "personal"
      ? personalLoanProducts
      : businessLoanProducts;
  const fields = fieldsMap[selectedType];

  const handleSelect = (idx: number, value: string) => {
    const updated = [...selected];
    updated[idx] = value;
    setSelected(updated);
  };

  const addBank = () => {
    if (selected.length < maxBanks) setSelected([...selected, null]);
  };
  const removeBank = (idx: number) => {
    if (selected.length > minBanks) setSelected(selected.filter((_, i) => i !== idx));
  };
  const reset = () => {
    setShowCompare(false);
    setSelected([null, null]);
  };

  const canCompare = selected.filter(Boolean).length >= minBanks;
  const selectedProducts = selected.map((id) => products.find((p) => p.id === id));

  // For highlighting identical values
  const getFieldHighlight = (key: string) => {
    const values = selectedProducts.map((p) => (p ? (p[key as keyof typeof p] as string) : ""));
    return areAllEqual(values) ? "text-green-600 font-semibold" : "";
  };

  // Reset selected banks when switching loan type
  React.useEffect(() => {
    setSelected([null, null]);
    setShowCompare(false);
  }, [selectedType]);

  return (
    <div className="max-w-5xl mx-auto py-8 px-2">
      <div className="flex justify-center mb-8 gap-2">
        {loanTypes.map((type) => (
          <button
            key={type.key}
            className={`px-4 py-2 rounded-lg font-semibold transition-all shadow backdrop-blur border border-gray-200 bg-white/60 hover:bg-white/80 text-gray-700 text-base md:text-lg ${
              selectedType === type.key ? "bg-white/90 border-primary-500 text-primary-700 scale-105" : ""
            }`}
            onClick={() => setSelectedType(type.key)}
          >
            {type.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedType + showCompare}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            {loanTypes.find((t) => t.key === selectedType)?.label} Comparison
          </h2>
          {!showCompare && (
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
              {selected.map((id, idx) => (
                <div key={idx} className="bg-white/70 backdrop-blur rounded-lg shadow p-4 flex-1 min-w-[220px] flex flex-col items-center border border-gray-100 hover:shadow-lg transition-all">
                  <div className="mb-4">
                    {id ? (
                      <img src={products.find((p) => p.id === id)?.logo} alt="Bank Logo" className="h-10" />
                    ) : (
                      <div className="h-10 w-24 bg-gray-100 rounded" />
                    )}
                  </div>
                  <select
                    className="w-full border rounded px-2 py-2 mb-2"
                    value={id || ""}
                    onChange={(e) => handleSelect(idx, e.target.value)}
                  >
                    <option value="">Select Bank</option>
                    {products
                      .filter((p) => !selected.includes(p.id) || p.id === id)
                      .map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                  </select>
                  {selected.length > minBanks && (
                    <button
                      className="text-xs text-red-500 mt-2 underline"
                      onClick={() => removeBank(idx)}
                      aria-label="Remove this bank"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {selected.length < maxBanks && (
                <button
                  className="bg-gray-100/70 border border-gray-300 rounded-lg px-6 py-4 text-gray-500 hover:bg-gray-200 flex flex-col items-center justify-center min-w-[220px]"
                  onClick={addBank}
                  aria-label="Add another bank"
                >
                  + Add Bank
                </button>
              )}
            </div>
          )}
          {!showCompare && (
            <div className="flex flex-col items-center mb-8">
              <button
                className={`bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow transition-all ${
                  canCompare ? "hover:bg-green-700" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!canCompare}
                onClick={() => setShowCompare(true)}
              >
                Compare Now
              </button>
            </div>
          )}
          {showCompare && (
            <div className="bg-white/80 backdrop-blur rounded-lg shadow p-6">
              <div className="flex flex-wrap justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Comparison</h3>
                <div className="flex gap-2">
                  <button
                    className="bg-gray-100 border border-gray-300 rounded px-4 py-2 text-gray-700 hover:bg-gray-200"
                    onClick={reset}
                  >
                    Edit Banks
                  </button>
                  <button
                    className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
                    onClick={() => alert('Get Offers (demo)')}
                  >
                    Get Offers
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border-t">
                  <thead>
                    <tr>
                      <th className="w-40 text-left py-2 pr-4"></th>
                      {selectedProducts.map((p, idx) => (
                        <th key={idx} className="text-center py-2 px-4">
                          {p && (
                            <div className="flex flex-col items-center">
                              <img src={p.logo} alt={p.name} className="h-8 mb-1" />
                              <span className="font-semibold text-sm">{p.name}</span>
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((field) => (
                      <tr key={field.key}>
                        <td className="py-2 pr-4 font-medium text-gray-700 flex items-center gap-1">
                          {field.label}
                          <span className="text-gray-400 cursor-pointer" title={field.tooltip}>?</span>
                        </td>
                        {selectedProducts.map((p, idx) => (
                          <td
                            key={idx}
                            className={`text-center py-2 px-4 ${p ? getFieldHighlight(field.key) : ""}`}
                          >
                            {p ? (p[field.key as keyof typeof p] as string) : "-"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HomeLoanCompare;
