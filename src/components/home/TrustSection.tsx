import React from 'react';
import { ShieldCheck, Lock, Building, CheckCircle2, Award, FileText } from 'lucide-react';

export default function TrustSection() {
  const partnerBanks = [
    { name: 'State Bank of India', code: 'SBI', logo: '/logos/sbi.png', type: 'Public Sector Bank' },
    { name: 'HDFC Bank', code: 'HDFC', logo: '/logos/hdfc.png', type: 'Private Sector Bank' },
    { name: 'ICICI Bank', code: 'ICICI', logo: '/logos/icici.png', type: 'Private Sector Bank' },
    { name: 'Axis Bank', code: 'AXIS', logo: '/logos/axis.png', type: 'Private Sector Bank' },
    { name: 'Tata Capital', code: 'TATA', logo: '/logos/tata.png', type: 'RBI-Registered NBFC' },
  ];

  const securityPillars = [
    {
      icon: Lock,
      title: '256-Bit SSL Encryption',
      description: 'All applicant data and financial documents are transmitted using TLS 1.3 bank-grade cryptographic protocols.',
    },
    {
      icon: ShieldCheck,
      title: 'RBI Digital Lending Guidelines',
      description: 'We operate in strict compliance with the Reserve Bank of India’s digital lending norms and fair practices codes.',
    },
    {
      icon: Award,
      title: 'Direct Scheduled Bank Integrations',
      description: 'Direct institutional tie-ups ensure real-time rate validation and authentic loan sanctions.',
    },
    {
      icon: FileText,
      title: 'Strict No-Spam Policy',
      description: 'Your contact credentials are never shared with unsolicited telemarketing agents or third-party call centers.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white font-ibm border-b border-slate-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Institutional Governance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Security, Compliance &amp; Banking Network
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            BanksCart operates under established Indian regulatory standards, safeguarding borrower confidentiality at every interaction.
          </p>
        </div>

        {/* Security Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {securityPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-slate-800/80 rounded-xl border border-slate-700/80 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-slate-700/60 border border-slate-600 flex items-center justify-center text-emerald-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Partner Institution Logos */}
        <div className="bg-slate-800/50 rounded-2xl border border-slate-800 p-8 text-center">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
            Authorized Banking &amp; Institutional Lending Network
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-90">
            {partnerBanks.map((bank) => (
              <div key={bank.name} className="flex items-center gap-3 bg-slate-900/60 px-4 py-2.5 rounded-lg border border-slate-700/60">
                <img
                  src={bank.logo}
                  alt={bank.name}
                  width="28"
                  height="28"
                  className="w-7 h-7 object-contain bg-white rounded p-0.5"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-200">{bank.name}</div>
                  <div className="text-[10px] text-slate-400">{bank.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
