import React from "react";
import { Link } from "react-router-dom";

const DEFAULT_ROUTE_MAP = {
  Home: "/",
  Loans: "/loans",
  "Personal Loan": "/loans/personal",
  "Personal Loan Overview": "/loans/personal/overview",
  "Home Loan": "/loans/home",
  "Business Loan": "/loans/business",
  "Credit Cards": "/cards",
  "EMI Calculator": "/personal-loan-emi-calculator",
};

const Breadcrumb = ({ path }) => {
  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-100 py-3 px-4 md:px-12 text-sm text-gray-500" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto">
        <ol className="list-reset flex flex-wrap items-center gap-1.5">
          {path.map((item, idx) => {
            const isLast = idx === path.length - 1;
            const label = typeof item === "string" ? item : item.label;
            const href = typeof item === "string" ? DEFAULT_ROUTE_MAP[item] : item.href;

            return (
              <li key={label} className="flex items-center">
                {idx > 0 && (
                  <svg className="w-4 h-4 mx-1.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {isLast ? (
                  <span className="font-semibold text-gray-800" aria-current="page">
                    {label}
                  </span>
                ) : href ? (
                  <Link
                    to={href}
                    className="hover:text-blue-600 transition-colors duration-150"
                  >
                    {label}
                  </Link>
                ) : (
                  <span className="text-gray-600">{label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
