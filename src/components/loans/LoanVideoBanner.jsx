import React from "react";

const LoanVideoBanner = () => (
  <section className="w-full max-w-5xl mx-auto mt-8 rounded-2xl overflow-hidden shadow-xl">
    <video
      className="w-full h-64 object-cover"
      autoPlay
      loop
      muted
      playsInline
      poster="https://cdn.shriramfinance.in/sfl-kalam/files/2024-03/home.svg"
      aria-label="Home Loan promotional video"
    >
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </section>
);

export default LoanVideoBanner;
