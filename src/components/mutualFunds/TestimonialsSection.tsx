import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const testimonials = [
  {
    name: 'Anjali Sharma',
    initial: 'A',
    stars: 5,
    text: '"BanksCart made investing so easy! My portfolio has grown by 18% in just 2 years."',
    color: 'bg-blue-200',
  },
  {
    name: 'Rahul Mehta',
    initial: 'R',
    stars: 4,
    text: '"The research tools are top-notch. I feel confident in my investment choices."',
    color: 'bg-green-200',
  },
  {
    name: 'Priya Verma',
    initial: 'P',
    stars: 5,
    text: '"Excellent support and a beautiful dashboard. Highly recommended!"',
    color: 'bg-yellow-200',
  },
];

const TestimonialsSection: React.FC = () => {
  const statsRef = useRef<HTMLSpanElement[]>([]);
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
    // Animate counters
    const animateCount = (el: HTMLSpanElement | null, end: number) => {
      if (!el) return;
      let start = 0;
      const duration = 1200;
      const step = (timestamp: number, startTime: number) => {
        const progress = Math.min((timestamp - startTime) / duration, 1);
        el.textContent = `${(start + (end - start) * progress).toFixed(1)}%`;
        if (progress < 1) requestAnimationFrame((t) => step(t, startTime));
      };
      requestAnimationFrame((t) => step(t, t));
    };
    if (statsRef.current[0]) animateCount(statsRef.current[0], 18);
    if (statsRef.current[1]) animateCount(statsRef.current[1], 98.7);
  }, []);
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-900" data-aos="fade-up">Trusted by 5 Lakh+ Investors</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {testimonials.map((t, idx) => (
            <div
              key={t.name}
              className={`bg-white/80 rounded-2xl shadow-xl p-6 flex flex-col gap-4 glassmorphism w-full md:w-1/3 hover:scale-105 hover:shadow-2xl transition-transform duration-300`}
              data-aos="flip-left"
              data-aos-delay={idx * 200}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-blue-700 ${t.color}`}>{t.initial}</div>
                <div>
                  <span className="font-bold text-blue-800">{t.name}</span>
                  <div className="text-yellow-400">{'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}</div>
                </div>
              </div>
              <span className="text-gray-600">{t.text}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-8">
          <div className="flex flex-col items-center">
            <span ref={el => (statsRef.current[0] = el!)} className="text-3xl font-poppins font-bold animate-count">18%</span>
            <span className="text-base">Avg. Returns</span>
          </div>
          <div className="flex flex-col items-center">
            <span ref={el => (statsRef.current[1] = el!)} className="text-3xl font-poppins font-bold animate-count">98.7%</span>
            <span className="text-base">Customer Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
