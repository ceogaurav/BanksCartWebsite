import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { HelpCircle, ChevronDown, Check, Star, ShieldAlert, Sparkles, BookOpen, AlertCircle, Info, Landmark, Percent, Award, ShieldCheck, ArrowRight, Play, MessageSquare, TrendingUp, CreditCard, Clock, Phone, MapPin } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';
import { ABHYUDAYA_PAGE_MAP, AbhyudayaPageContent } from '../../data/abhyudayaPageData';

const DynamicAbhyudayaBankPage: React.FC = () => {
  const { subPath } = useParams<{ subPath: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Map flat routes like /banking/abhyudaya-bank-net-banking to 'net-banking'
  let currentSlug = subPath || 'overview';
  if (location.pathname.includes('net-banking')) {
    currentSlug = 'net-banking';
  } else if (location.pathname.includes('timings')) {
    currentSlug = 'timings';
  }

  const pageContent = ABHYUDAYA_PAGE_MAP[currentSlug] || ABHYUDAYA_PAGE_MAP['overview'];

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveFaq(null);
  }, [subPath, location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section with Co-operative Emerald Theme */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <span className="text-[180px] font-black leading-none select-none">ABHYUDAYA</span>
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              {pageContent.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-6 tracking-tight leading-tight">
              {pageContent.title}
            </h1>
            <p className="text-emerald-100 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl font-medium font-sans">
              {pageContent.intro}
            </p>
          </div>
        </div>

        {/* 2-Column responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Rich Articles, Comparison Tables */}
          <div className="lg:col-span-7 space-y-10 text-slate-700">
            
            {/* More Intro details */}
            {pageContent.moreIntro && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {pageContent.moreIntro}
                </p>
              </div>
            )}

            {/* Core Highlights highlights */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
                {pageContent.highlightsTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {pageContent.highlights.map((feat, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-xl p-4 hover:border-emerald-100 hover:bg-emerald-50/10 transition-colors">
                    <h4 className="font-bold text-slate-800 text-sm mb-2">{feat.label}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{feat.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison table */}
            {pageContent.ratesRows && pageContent.ratesHeaders && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4">{pageContent.ratesTitle}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        {pageContent.ratesHeaders.map((header, idx) => (
                          <th key={idx} className="p-3 font-semibold text-slate-700">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pageContent.ratesRows.map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50">
                          <td className="p-3 font-bold text-slate-800 flex items-center gap-2">
                            <Landmark className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            {row[0]}
                          </td>
                          <td className="p-3 font-semibold text-emerald-600">{row[1]}</td>
                          <td className="p-3 text-slate-500">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Step checklist details */}
            {pageContent.checklist && pageContent.checklistTitle && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6">{pageContent.checklistTitle}</h3>
                <div className="space-y-4">
                  {pageContent.checklist.map((tip, idx) => (
                    <div key={idx} className="flex gap-4 items-start pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                      <div className="w-6 h-6 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-semibold">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Simulation Panel */}
            <div className="bg-gradient-to-br from-emerald-950 to-slate-950 rounded-3xl text-white p-6 sm:p-8 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                Abhyudaya Online Interest Yield Checker
              </h3>
              <p className="text-xs text-emerald-200 mb-6 font-sans">Simulate fixed deposits and savings compounding instantly</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Regular Savings</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans">3.50% p.a.<br />Daily Balance Yields</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Percent className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Short-Term FD</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans">6.25% p.a.<br />180 Days Lock-in</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Play className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Long-Term FD</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans">7.25% p.a.<br />Senior Citizen Bonus</p>
                </div>
              </div>
            </div>

            {/* FAQs Accordion Block */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {pageContent.faqs.map((faq, index) => (
                  <div key={index} className="border border-slate-100 rounded-xl overflow-hidden transition-colors">
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="w-full flex justify-between items-center p-4 bg-slate-50/50 hover:bg-slate-50 text-left font-bold text-slate-700 text-sm outline-none transition-colors"
                    >
                      {faq.q}
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-emerald-600' : ''}`} />
                    </button>
                    {activeFaq === index && (
                      <div className="p-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100 bg-white leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Cibil lead form */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <CibilCheckerForm sourcePage={`${pageContent.title} Portal`} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default DynamicAbhyudayaBankPage;
