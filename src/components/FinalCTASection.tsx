import React from 'react';

// Define the CSS styles for the animation.
// In a real application, these would typically be in a separate CSS file
// or managed by a styling solution like PostCSS with Tailwind.
const styles = `
  @keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  /* Optional: Add a custom font if 'font-poppins' is not globally defined */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap');
  .font-poppins {
    font-family: 'Poppins', sans-serif;
  }
`;

const FinalCTASection: React.FC = () => (
  <>
    {/* Inject the styles directly into the component for demonstration.
        In a production environment, consider external CSS files or CSS-in-JS. */}
    <style>{styles}</style>

    <section id="fd-final-cta" className="w-full py-16 px-2 md:px-0 flex flex-col items-center bg-gradient-to-tr from-[#1E40AF] via-[#059669] to-[#D97706] relative overflow-hidden">
      {/* Floating elements (visual only) */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-[#F0F9FF] to-[#10B981] rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-[#F59E0B] to-[#1E40AF] rounded-full blur-2xl animate-float" />
      </div>

      {/* Main content of the CTA section */}
      <div className="relative z-10 max-w-3xl w-full flex flex-col items-center gap-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center drop-shadow-lg">Start Your Wealth Journey Today</h2>
        <p className="text-xl md:text-2xl text-white/90 text-center font-medium">Join millions who trust BanksCart for secure, high-return investments</p>

        {/* Feature highlights */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-2">
          <span className="bg-white/20 rounded-full px-5 py-2 text-lg font-semibold border border-white/30 text-white">Open FD in 5 minutes</span>
          <span className="bg-white/20 rounded-full px-5 py-2 text-lg font-semibold border border-white/30 text-white">Start with just ₹10,000</span>
          <span className="bg-white/20 rounded-full px-5 py-2 text-lg font-semibold border border-white/30 text-white">Earn up to 7.75% p.a.</span>
        </div>

        {/* Call to action buttons */}
        <div className="flex flex-col md:flex-row gap-6 mt-6 justify-center">
          <button className="bg-gradient-to-r from-[#059669] to-[#10B981] text-white font-poppins text-2xl px-10 py-5 rounded-2xl font-black shadow-xl hover:scale-110 transition-all border-2 border-white/30">Calculate & Invest Now</button>
          <button className="bg-white text-[#1E40AF] font-poppins text-xl px-8 py-4 rounded-2xl font-bold shadow-lg border-2 border-[#1E40AF] hover:bg-blue-50 hover:scale-105 transition">Talk to Expert</button>
          <button className="bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white font-poppins text-xl px-8 py-4 rounded-2xl font-bold shadow-lg border-2 border-[#F59E0B] hover:scale-105 transition">Download App</button>
        </div>

        {/* Contact information links */}
        <div className="flex flex-col md:flex-row gap-6 mt-8 items-center justify-center">
          <a href="tel:1800-XXX-XXXX" className="text-white text-lg font-bold underline hover:text-[#F59E0B] transition">📞 1800-XXX-XXXX</a>
          <a href="https://wa.me/911800XXXXXX" className="text-white text-lg font-bold underline hover:text-[#10B981] transition">💬 WhatsApp</a>
          <a href="mailto:fd@bankscart.com" className="text-white text-lg font-bold underline hover:text-[#1E40AF] transition">✉️ fd@bankscart.com</a>
        </div>
      </div>
    </section>
  </>
);

export default FinalCTASection;
