import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Wifi, 
  Lock,
  Award
} from 'lucide-react';
import { formatCurrency } from '../../utils/calculations';

interface Hero3DCardProps {
  activeTab: 'loan' | 'homeloan' | 'cibil' | 'card';
  loanAmount: number;
  tenureYears: number;
  monthlyEMI: number;
  selectedCardCategory?: string;
}

export const Hero3DCard: React.FC<Hero3DCardProps> = ({
  activeTab,
  loanAmount,
  tenureYears,
  monthlyEMI,
  selectedCardCategory = 'cashback'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [lightX, setLightX] = useState<number>(50);
  const [lightY, setLightY] = useState<number>(50);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Normalizing coordinates relative to center (-1 to 1)
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    // Maximum 14 degrees rotation for elegant spatial balance
    setRotateX(-normY * 12);
    setRotateY(normX * 14);

    // Dynamic light reflection point (0% to 100%)
    setLightX(((e.clientX - rect.left) / rect.width) * 100);
    setLightY(((e.clientY - rect.top) / rect.height) * 100);
  }, [prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setLightX(50);
    setLightY(50);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  // Card themes based on selected product tab
  const getCardTheme = () => {
    switch (activeTab) {
      case 'homeloan':
        return {
          title: 'BANKS CART SOVEREIGN HOME',
          subtitle: 'Repo-Linked EBLR Sanction',
          cardTier: 'MORTGAGE PRIME',
          chipColor: 'bg-amber-300',
          accentColor: 'text-amber-400',
          rateTag: '8.35% p.a. Benchmark'
        };
      case 'cibil':
        return {
          title: 'BANKS CART BUREAU PRIME',
          subtitle: 'Official CIBIL Verified Access',
          cardTier: 'DIAGNOSTIC TITANIUM',
          chipColor: 'bg-emerald-300',
          accentColor: 'text-emerald-400',
          rateTag: 'Score 785 • Excellent'
        };
      case 'card':
        return {
          title: 'BANKS CART INFINITE REWARDS',
          subtitle: `${selectedCardCategory.toUpperCase()} ELITE`,
          cardTier: 'METALLIC BLACK',
          chipColor: 'bg-amber-400',
          accentColor: 'text-amber-300',
          rateTag: '5% Cashback & Airport Lounge'
        };
      case 'loan':
      default:
        return {
          title: 'BANKS CART PRIME CREDIT',
          subtitle: 'Multi-Bank Fast Disbursal',
          cardTier: 'TITANIUM SELECT',
          chipColor: 'bg-amber-400',
          accentColor: 'text-amber-300',
          rateTag: '10.49% p.a. Reducing'
        };
    }
  };

  const theme = getCardTheme();

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[460px] mx-auto select-none py-4 px-2"
      style={{ perspective: '1200px' }}
      aria-hidden="true"
    >
      {/* Dynamic 3D Card Shell */}
      <div
        className="relative w-full aspect-[1.586/1] rounded-2xl p-6 sm:p-7 text-white transition-all duration-300 ease-out shadow-2xl border border-white/15 overflow-hidden"
        style={{
          transform: prefersReducedMotion 
            ? 'none' 
            : `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovered ? 'scale3d(1.02, 1.02, 1.02)' : 'scale3d(1, 1, 1)'}`,
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 45%, #0B1120 100%)',
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(15, 23, 42, 0.7), 0 0 40px -10px rgba(30, 58, 138, 0.4)' 
            : '0 20px 40px -15px rgba(15, 23, 42, 0.5)'
        }}
      >
        {/* Subtle Circuit / Guilloche Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)`,
            backgroundSize: '16px 16px'
          }}
        />

        {/* Dynamic Specular Sheen (Moves with cursor) */}
        <div 
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.75 : 0.35,
            background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.08) 35%, transparent 65%)`
          }}
        />

        {/* Ambient Edge Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* TOP ROW: Brand Header, EMV Chip & Contactless */}
        <div className="relative z-10 flex items-start justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white flex items-center">
                Banks<span className="text-amber-400">Cart</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest font-semibold px-1.5 py-0.5 rounded bg-white/10 text-slate-300 border border-white/10">
                {theme.cardTier}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider font-mono uppercase">
              {theme.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Wifi className="w-5 h-5 text-slate-300/80 -rotate-90" />
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 opacity-90 flex items-center justify-center shadow-xs">
              <div className="w-4 h-4 rounded-full border border-amber-800/40" />
            </div>
          </div>
        </div>

        {/* MIDDLE: Realistic Gold EMV Microchip */}
        <div className="relative z-10 my-4 sm:my-5 flex items-center justify-between">
          <div className="w-12 h-9 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-0.5 shadow-md border border-amber-200/50 relative overflow-hidden">
            {/* Chip Circuit Grid Lines */}
            <div className="w-full h-full border border-amber-900/40 rounded flex flex-col justify-between p-0.5">
              <div className="h-0.5 w-full bg-amber-900/30" />
              <div className="flex justify-between h-3">
                <div className="w-3 border-r border-amber-900/30" />
                <div className="w-3 border-l border-amber-900/30" />
              </div>
              <div className="h-0.5 w-full bg-amber-900/30" />
            </div>
          </div>

          {/* Live Sanction Amount Display (Dynamic with Slider) */}
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium block">
              {activeTab === 'cibil' ? 'Target Credit Ceiling' : 'Estimated Pre-Approved Sanction'}
            </span>
            <span className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white tabular-nums">
              {formatCurrency(loanAmount)}
            </span>
          </div>
        </div>

        {/* BOTTOM ROW: Embossed Card Numbers & Verified Account Info */}
        <div className="relative z-10 pt-1 flex items-end justify-between">
          <div>
            <div className="font-mono text-xs sm:text-sm tracking-widest text-slate-300/90 font-medium mb-1">
              4129 •••• •••• 8890
            </div>
            <div className="flex items-center gap-4 text-[10px] text-slate-400 font-mono uppercase">
              <div>
                <span className="text-[8px] text-slate-500 block">CARDHOLDER</span>
                <span className="text-slate-200 font-semibold tracking-wider">VERIFIED APPLICANT</span>
              </div>
              <div>
                <span className="text-[8px] text-slate-500 block">VALID THRU</span>
                <span className="text-slate-200 font-semibold">11/29</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-semibold text-emerald-300">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Instant E-Mandate</span>
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING 3D COMPANION BADGE 1: Live CIBIL Bureau Badge */}
      <div 
        className="absolute -top-3 -right-2 sm:-right-4 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-2.5 sm:p-3 shadow-xl flex items-center gap-2.5 transition-transform duration-300"
        style={{
          transform: prefersReducedMotion 
            ? 'none' 
            : `translateZ(30px) rotateX(${rotateX * 0.7}deg) rotateY(${rotateY * 0.7}deg)`,
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4)'
        }}
      >
        <div className="w-9 h-9 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold font-mono text-white tabular-nums">785</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
              Excellent
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block font-medium">
            Soft Check • +24 Pts
          </span>
        </div>
      </div>

      {/* FLOATING 3D COMPANION BADGE 2: Real Monthly EMI Calculation */}
      <div 
        className="absolute -bottom-3 -left-2 sm:-left-4 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-2.5 sm:p-3 shadow-xl flex items-center gap-2.5 transition-transform duration-300"
        style={{
          transform: prefersReducedMotion 
            ? 'none' 
            : `translateZ(35px) rotateX(${rotateX * 0.8}deg) rotateY(${rotateY * 0.8}deg)`,
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4)'
        }}
      >
        <div className="w-9 h-9 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">
            Est. Monthly EMI ({tenureYears} Yrs)
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xs sm:text-sm font-bold font-mono text-emerald-400 tabular-nums">
              {formatCurrency(monthlyEMI)}
            </span>
            <span className="text-[10px] text-slate-400">/mo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero3DCard;
