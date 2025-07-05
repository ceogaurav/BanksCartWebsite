import React from "react";

const author = {
  name: "Amit Sharma",
  designation: "Senior Finance Writer",
  linkedin: "https://linkedin.com/in/amitsharma",
  photo: "/images/avatar1.jpg",
  bio: "10+ years in personal finance content. Passionate about simplifying loans for everyone.",
};
const reviewer = {
  name: "Priya Mehra",
  designation: "Certified Credit Counselor",
  linkedin: "https://linkedin.com/in/priyamehra",
  photo: "/images/avatar3.jpg",
  bio: "Reviewed by a credit expert with 12 years of experience in banking and lending.",
};

const AuthorReviewerSection = () => (
  <section className="my-12 bg-gradient-to-br from-blue-50 via-white to-teal-50 rounded-2xl shadow-xl border border-blue-100 p-6 md:p-12">
    <h2 className="text-3xl font-extrabold mb-6 text-gray-900 text-center tracking-tight drop-shadow-sm">
      What is a Personal Loan?
    </h2>
    <p className="mb-10 text-gray-700 text-lg max-w-3xl mx-auto text-center leading-relaxed">
      A personal loan is an unsecured loan offered by banks and NBFCs to meet your financial needs—be it medical emergencies, weddings, travel, or home renovation. With minimal documentation, quick approval, and flexible repayment options, personal loans are a popular choice for individuals seeking instant funds without collateral.
    </p>
    <div className="flex flex-col md:flex-row gap-10 justify-center items-stretch">
      {/* Author */}
      <div className="relative flex flex-col md:flex-row items-center gap-4 bg-white rounded-2xl shadow-lg border border-teal-200 p-6 flex-1 animate-fadeIn" style={{ animationDelay: '0ms', animationFillMode: 'backwards' }}>
        <span className="absolute -top-3 left-4 bg-gradient-to-r from-teal-400 to-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Author</span>
        <img src={author.photo} alt={author.name} className="w-20 h-20 rounded-full object-cover border-4 border-teal-400 shadow-md" />
        <div className="flex-1 text-center md:text-left">
          <div className="font-bold text-lg text-gray-800">{author.name}</div>
          <div className="text-sm text-gray-500 mb-1">{author.designation}</div>
          <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline text-xs font-semibold">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
            LinkedIn
          </a>
          <div className="italic text-gray-600 text-xs mt-2">“{author.bio}”</div>
        </div>
      </div>
      {/* Reviewer */}
      <div className="relative flex flex-col md:flex-row items-center gap-4 bg-white rounded-2xl shadow-lg border border-blue-200 p-6 flex-1 animate-fadeIn" style={{ animationDelay: '120ms', animationFillMode: 'backwards' }}>
        <span className="absolute -top-3 left-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Reviewed By</span>
        <img src={reviewer.photo} alt={reviewer.name} className="w-20 h-20 rounded-full object-cover border-4 border-blue-400 shadow-md" />
        <div className="flex-1 text-center md:text-left">
          <div className="font-bold text-lg text-gray-800">{reviewer.name}</div>
          <div className="text-sm text-gray-500 mb-1">{reviewer.designation}</div>
          <a href={reviewer.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline text-xs font-semibold">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
            LinkedIn
          </a>
          <div className="italic text-gray-600 text-xs mt-2">“{reviewer.bio}”</div>
        </div>
      </div>
    </div>
    <style>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: none; }
      }
      .animate-fadeIn {
        animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1) both;
      }
    `}</style>
  </section>
);

export default AuthorReviewerSection;
