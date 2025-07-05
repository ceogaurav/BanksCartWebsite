import React, { useState } from 'react';

const testimonials = [
  {
    name: 'Rajesh & Sunita Sharma, Mumbai',
    photo: '👴👵', // Placeholder emoji, replace with image if available
    quote: 'BanksCart FDs give me steady monthly income. The 7.5% rate beats all other banks!',
    details: '₹50 Lakhs invested • ₹31,250 monthly income',
    type: 'Retiree Success',
    city: 'Mumbai',
    stars: 5,
  },
  {
    name: 'Priya Patel, Bangalore',
    photo: '👩‍💼',
    quote: 'Started with ₹25,000 and now have ₹5 Lakhs. The digital process is so convenient!',
    details: '3 years journey • Systematic FD investments',
    type: 'Young Professional',
    city: 'Bangalore',
    stars: 5,
  },
  {
    name: 'Vikram Singh, Delhi',
    photo: '👨‍💼',
    quote: 'Used my FD as collateral for business loan. Dual benefit of safety and liquidity!',
    details: '₹20 Lakhs FD • ₹18 Lakhs loan approved',
    type: 'Business Owner',
    city: 'Delhi',
    stars: 5,
  },
  // Add more testimonials as needed
];

const CustomerTestimonials: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="fd-testimonials" className="w-full bg-[#F0F9FF] py-16 px-2 md:px-0 flex flex-col items-center">
      <div className="max-w-4xl w-full flex flex-col gap-8 animate-fadeInUp">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E40AF] mb-2 font-inter">Join 5 Million+ Happy Investors</h2>
        </div>
        <div className="relative w-full flex flex-col items-center">
          <div className="w-full overflow-hidden rounded-2xl shadow-xl bg-white">
            <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${active * 100}%)` }}>
              {testimonials.map((t, idx) => (
                <div key={t.name} className="min-w-full flex flex-col md:flex-row items-center gap-8 p-8">
                  <div className="text-7xl md:text-8xl animate-float">{t.photo}</div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex gap-2 items-center mb-2">
                      {[...Array(t.stars)].map((_, i) => <span key={i} className="text-yellow-400 text-2xl animate-bounce">★</span>)}
                      <span className="ml-2 text-sm text-gray-500">{t.type} • {t.city}</span>
                    </div>
                    <blockquote className="text-xl md:text-2xl font-semibold text-[#1E40AF] mb-2">“{t.quote}”</blockquote>
                    <div className="text-base text-gray-600 font-poppins">{t.details}</div>
                    <div className="text-sm text-[#059669] font-bold mt-2">{t.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Carousel Controls */}
          <div className="flex gap-2 mt-6 justify-center">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full ${active === idx ? 'bg-[#059669]' : 'bg-gray-300'} transition-all`}
                onClick={() => setActive(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
