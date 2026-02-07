import React from "react";
import Link from "next/link";

export default function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  const prev = currentPage > 1 ? (currentPage === 2 ? `/blogs` : `/blogs/page/${currentPage - 1}`) : null;
  const next = currentPage < totalPages ? `/blogs/page/${currentPage + 1}` : null;

  return (
    <nav className="flex items-center justify-center gap-4 mt-8">
      {prev ? <Link href={prev}><a className="px-4 py-2 bg-white rounded-md shadow">← Prev</a></Link> : <span className="px-4 py-2 text-gray-400">← Prev</span>}
      <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
      {next ? <Link href={next}><a className="px-4 py-2 bg-white rounded-md shadow">Next →</a></Link> : <span className="px-4 py-2 text-gray-400">Next →</span>}
    </nav>
  );
}
