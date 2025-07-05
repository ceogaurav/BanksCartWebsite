import React from "react";

const WhatLookingCard = ({ icon, title, subtitle, bg, illustration, onClick }) => (
  <div
    className={`rounded-2xl p-6 flex flex-col items-center justify-center shadow hover:shadow-xl transition cursor-pointer ${bg}`}
    onClick={onClick}
  >
    {illustration ? (
      <img src={illustration} alt={title} className="w-20 h-20 mb-2" />
    ) : (
      <div className="text-4xl mb-2">{icon}</div>
    )}
    <div className="text-lg font-semibold mb-1 text-center">{title}</div>
    <div className="text-sm text-gray-500 text-center">{subtitle}</div>
  </div>
);

export default WhatLookingCard;
