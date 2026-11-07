import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const LoanCard = ({ title, description, icon: Icon, to }) => {
  const card = (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 w-80 min-h-[260px] group">
      <div>
        <div className="w-12 h-12 bg-blue-50 text-[#1E3A8A] rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
          {Icon && <Icon className="h-6 w-6" />}
        </div>
        <h3 className="text-lg font-bold mb-2 text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">{description}</p>
      </div>
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1E3A8A]">
        <span>Explore Loan</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} aria-label={title} className="focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] rounded-2xl block">
        {card}
      </Link>
    );
  }
  return card;
};

export default LoanCard;
