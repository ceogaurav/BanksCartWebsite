import React from "react";

const sections = [
  { id: "hero", label: "Overview" },
  { id: "steps", label: "How It Works" },
  { id: "features", label: "Features" },
  { id: "apply", label: "Apply" },
  { id: "calculators", label: "Calculators" },
  { id: "products", label: "Products" },
  { id: "faqs", label: "FAQs" },
];

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const HomeLoanStickyNav = ({ activeSection }) => (
  <nav className="sticky top-4 z-40 bg-white/80 backdrop-blur rounded-xl shadow flex justify-center gap-2 py-2 px-4 mb-8 mt-2" aria-label="Section Navigation">
    {sections.map((s) => (
      <button
        key={s.id}
        onClick={() => scrollToSection(s.id)}
        className={`text-primary-700 font-semibold px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${activeSection === s.id ? "bg-primary-600 text-white shadow" : "hover:bg-primary-50"}`}
        aria-label={`Jump to ${s.label}`}
        aria-current={activeSection === s.id ? "section" : undefined}
      >
        {s.label}
      </button>
    ))}
  </nav>
);

export default HomeLoanStickyNav;
