import React from "react";

const Breadcrumb = ({ path }) => (
  <nav className="bg-white py-2 px-4 md:px-12 text-sm text-gray-500" aria-label="Breadcrumb">
    <ol className="list-reset flex">
      {path.map((item, idx) => (
        <li key={item} className="flex items-center">
          {idx > 0 && <span className="mx-2">&gt;</span>}
          <span className={idx === path.length - 1 ? "font-semibold text-gray-700" : "hover:underline cursor-pointer"}>{item}</span>
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumb;
