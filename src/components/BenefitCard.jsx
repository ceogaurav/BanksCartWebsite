import React from "react";

const BenefitCard = ({ icon, title, subtitle, className = "" }) => (
  <div className={`bg-white rounded-2xl p-6 flex flex-col items-center shadow hover:shadow-xl transition group ${className}`}>
    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{icon}</div>
    <div className="text-lg font-semibold mb-1 text-center">{title}</div>
    <div className="text-sm text-gray-500 text-center">{subtitle}</div>
  </div>
);

export default BenefitCard;
