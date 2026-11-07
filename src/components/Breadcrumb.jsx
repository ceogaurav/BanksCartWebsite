import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const DEFAULT_ROUTE_MAP = {
  Home: "/",
  Loans: "/loans",
  "Personal Loan": "/loans/personal-loan",
  "Personal Loan Overview": "/loans/personal/overview",
  "Home Loan": "/loans/home-loan",
  "Business Loan": "/loans/business-loan",
  "Car Loan": "/loans/car",
  "Used Car Loan": "/loans/used-car",
  "Two Wheeler Loan": "/loans/two-wheeler",
  "Education Loan": "/loans/education",
  "Gold Loan": "/loans/gold-loan",
  Cards: "/cards",
  "Credit Cards": "/cards/credit-cards",
  "Debit Cards": "/cards/debit-cards",
  Insurance: "/insurance",
  "Term Insurance": "/insurance/term-insurance",
  "Health Insurance": "/insurance/health-insurance",
  "Car Insurance": "/insurance/car-insurance",
  Investments: "/investment",
  "Fixed Deposit": "/investment/fixed-deposit",
  "Mutual Funds": "/investment/mutual-funds",
  "Investment Plans": "/investment/plans",
  Calculators: "/calculators",
  "EMI Calculator": "/personal-loan-emi-calculator",
  Blog: "/blog",
};

const Breadcrumb = ({ path, items }) => {
  // Gracefully accept either `path` or `items`, defaulting to empty array to prevent undefined.map errors
  const rawInput = path || items || [];

  // Normalize into standard array of { label, href }
  let list = [];
  if (Array.isArray(rawInput)) {
    list = rawInput
      .map((entry) => {
        if (!entry) return null;
        if (typeof entry === "string") {
          return {
            label: entry,
            href: DEFAULT_ROUTE_MAP[entry] || (entry.toLowerCase() === "home" ? "/" : undefined),
          };
        }
        if (typeof entry === "object") {
          const label = entry.label || entry.name || "";
          const href =
            entry.href ||
            entry.path ||
            DEFAULT_ROUTE_MAP[label] ||
            (label.toLowerCase() === "home" ? "/" : undefined);
          return { label, href };
        }
        return null;
      })
      .filter(Boolean);
  }

  // Prepend Home if not already the first entry
  if (list.length > 0 && list[0].label.toLowerCase() !== "home") {
    list.unshift({ label: "Home", href: "/" });
  }

  if (list.length === 0) {
    return null;
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list.map((item, idx) => {
      const rawHref = item.href;
      const href = rawHref
        ? rawHref.startsWith("http")
          ? rawHref
          : `https://www.bankscart.com${rawHref === "/" ? "/" : rawHref}`
        : `https://www.bankscart.com/`;

      return {
        "@type": "ListItem",
        position: idx + 1,
        name: item.label,
        item: href,
      };
    }),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <nav className="py-2.5 text-sm text-slate-500" aria-label="Breadcrumb">
        <ol className="list-reset flex flex-wrap items-center gap-1.5">
          {list.map((item, idx) => {
            const isLast = idx === list.length - 1;
            const label = item.label;
            const href = item.href;

            return (
              <li key={`${label}-${idx}`} className="flex items-center">
                {idx > 0 && (
                  <svg
                    className="w-3.5 h-3.5 mx-1.5 text-slate-400 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
                {isLast ? (
                  <span className="font-semibold text-slate-800" aria-current="page">
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
                  <span className="text-slate-600">{label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
