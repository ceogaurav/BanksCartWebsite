import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  CreditCard,
  Download,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  Search,
  Lock,
  Clock,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Info,
  BadgeCheck,
  Landmark,
  FileCheck2,
  AlertTriangle,
  FileText,
  RefreshCw,
  Sparkles,
  Layers,
  Compass,
  Zap,
  Building,
  User,
  ShieldAlert
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

// Official Portals for PAN Services
const NSDL_APPLY_URL = 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html';
const UTIITSL_APPLY_URL = 'https://www.pan.utiitsl.com/PAN/';
const INSTANT_EPAN_URL = 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/instant-e-pan';
const NSDL_DOWNLOAD_EPAN_URL = 'https://www.onlineservices.nsdl.com/paam/requestAndDownloadEPAN.html';
const UTIITSL_DOWNLOAD_EPAN_URL = 'https://www.pan.utiitsl.com/PAN_ONLINE/ePANCard';
const NSDL_TRACK_STATUS_URL = 'https://tin.tin.nsdl.com/pantan/StatusTrack.html';
const UTIITSL_TRACK_STATUS_URL = 'https://www.trackpan.utiitsl.com/PANOnlineSearch.html';
const VERIFY_PAN_URL = 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/verifyYourPANToken';

// PAN Entity code mapping according to Income Tax Department rules
const PAN_ENTITY_MAP: Record<string, { label: string; desc: string }> = {
  P: { label: 'Individual (Person)', desc: 'Natural person / salaried or self-employed individual' },
  C: { label: 'Company (Body Corporate)', desc: 'Private limited, public limited, or foreign corporation' },
  H: { label: 'Hindu Undivided Family (HUF)', desc: 'Karta representing the Hindu Undivided Family' },
  F: { label: 'Partnership Firm / LLP', desc: 'Registered partnership firm or Limited Liability Partnership' },
  A: { label: 'Association of Persons (AOP)', desc: 'Group of persons uniting for a common revenue-generating objective' },
  T: { label: 'Trust', desc: 'Charitable, private, or religious trust entity' },
  B: { label: 'Body of Individuals (BOI)', desc: 'Group of individuals without formal partnership contract' },
  L: { label: 'Local Authority', desc: 'Municipal corporation, panchayat, or statutory committee' },
  J: { label: 'Artificial Juridical Person', desc: 'Statutory entities, universities, and deities' },
  G: { label: 'Government Agency', desc: 'Central or state government department or statutory agency' }
};

export default function PanCard() {
  // Tabs: 'decoder' | 'apply' | 'reprint' | 'correction' | 'track'
  const [activeTab, setActiveTab] = useState<'decoder' | 'apply' | 'reprint' | 'correction' | 'track'>('decoder');

  // Decoder inputs
  const [panQuery, setPanQuery] = useState('');
  const [surnameInput, setSurnameInput] = useState('');
  const [copiedDecoded, setCopiedDecoded] = useState(false);

  // e-PAN Password Helper
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');
  const [copiedDobPass, setCopiedDobPass] = useState(false);

  // Track status number
  const [trackNumber, setTrackNumber] = useState('');

  // Sanitize PAN input (max 10 uppercase alphanumeric)
  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    setPanQuery(clean);
  };

  // Decode PAN characters
  const decodedPan = useMemo(() => {
    const clean = panQuery.trim();
    if (clean.length === 0) return null;

    const chars1to3 = clean.slice(0, 3);
    const char4 = clean.charAt(3) || '';
    const char5 = clean.charAt(4) || '';
    const chars6to9 = clean.slice(5, 9);
    const char10 = clean.charAt(9) || '';

    const panRegex = /^[A-Z]{3}[ABCFGHLJPT][A-Z][0-9]{4}[A-Z]$/;
    const isValidFormat = panRegex.test(clean);

    const entityInfo = char4 ? PAN_ENTITY_MAP[char4] : undefined;

    let surnameMatch: boolean | null = null;
    if (surnameInput.trim().length > 0 && char5) {
      const firstLetter = surnameInput.trim().toUpperCase().charAt(0);
      surnameMatch = firstLetter === char5;
    }

    return {
      clean,
      chars1to3,
      char4,
      char5,
      chars6to9,
      char10,
      isValidFormat,
      entityInfo,
      surnameMatch
    };
  }, [panQuery, surnameInput]);

  // Copy decoded breakdown
  const copyDecodedSummary = () => {
    if (!decodedPan) return;
    const text = `PAN: ${decodedPan.clean} | Entity: ${decodedPan.entityInfo?.label || 'N/A'} | Status: ${decodedPan.isValidFormat ? 'Valid Structure' : 'Incomplete'}`;
    navigator.clipboard.writeText(text);
    setCopiedDecoded(true);
    setTimeout(() => setCopiedDecoded(false), 2200);
  };

  // e-PAN Password Calculation (DDMMYYYY)
  const calculatedEpanPass = useMemo(() => {
    const d = dobDay.padStart(2, '0').slice(-2);
    const m = dobMonth.padStart(2, '0').slice(-2);
    const y = dobYear.slice(0, 4);
    if (dobDay && dobMonth && y.length === 4) {
      return `${d}${m}${y}`;
    }
    return null;
  }, [dobDay, dobMonth, dobYear]);

  // Copy e-PAN Password
  const copyEpanPass = () => {
    if (calculatedEpanPass) {
      navigator.clipboard.writeText(calculatedEpanPass);
      setCopiedDobPass(true);
      setTimeout(() => setCopiedDobPass(false), 2200);
    }
  };

  // Schema.org Structured Data
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'GovernmentService',
        name: 'PAN Card Services & Instant Verification Directory',
        provider: {
          '@type': 'GovernmentOrganization',
          name: 'Income Tax Department of India'
        },
        serviceType: 'Taxpayer Identification & Verification',
        description:
          'Comprehensive official guide to 10-character Permanent Account Numbers (PAN), instant verification, Form 49A application, e-PAN download, and correction services.'
      },
      {
        '@type': 'HowTo',
        name: 'How to Apply for an Instant e-PAN or Physical PAN Card',
        description: 'Step-by-step verified guide for resident individuals to obtain an Instant e-PAN or physical plastic card via Protean (NSDL) and UTIITSL.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Choose Application Channel',
            text: 'Apply for a Free Instant e-PAN via Aadhaar OTP on the Income Tax e-Filing portal, or apply for a physical card on Protean (NSDL) / UTIITSL with ₹107 fee.'
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Fill Form 49A & Complete e-KYC',
            text: 'Provide demographic details matching Aadhaar, upload photograph and signature, or authenticate paperlessly using Aadhaar OTP.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Track Application & Receive Card',
            text: 'Use the 15-digit NSDL acknowledgement number or UTIITSL coupon number to track status. Download e-PAN within hours or receive physical plastic card within 7-10 business days.'
          }
        ]
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.bankscart.com/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Resources',
            item: 'https://www.bankscart.com/resources'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'PAN Card Services',
            item: 'https://www.bankscart.com/pan-card'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What do the 10 characters in a PAN card signify?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The first 3 characters are an alphabetic series (AAA to ZZZ). The 4th character indicates entity status (P for Individual, C for Company, H for HUF, F for Firm, T for Trust). The 5th character is the first letter of the cardholder\'s surname. Characters 6 to 9 are a sequential 4-digit number (0001-9999), and the 10th character is an alphabetic check digit.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the penalty for holding more than one PAN card?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Under Section 272B of the Income Tax Act, 1961, possessing more than one PAN card is illegal and attracts a statutory fine of ₹10,000. Any duplicate PAN must be surrendered immediately to the Income Tax Assessing Officer.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the default password for a downloaded e-PAN PDF?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The password to open an e-PAN PDF is your Date of Birth or Date of Incorporation in DDMMYYYY format without spaces or slashes (e.g., 01011990 for January 1, 1990).'
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Helmet>
        <title>PAN Card Services & Instant Verification Directory (2026) | BanksCart</title>
        <meta
          name="description"
          content="Decode 10-character PAN structure, verify entity classifications, check application status via Protean (NSDL) / UTIITSL, and apply or reprint physical PAN cards online."
        />
        <link rel="canonical" href="https://www.bankscart.com/pan-card" />
        <meta property="og:title" content="PAN Card Services & Instant Verification - BanksCart" />
        <meta
          property="og:description"
          content="Official PAN decoder, Form 49A guide, Instant e-PAN application, and Section 272B compliance rules."
        />
        <meta property="og:url" content="https://www.bankscart.com/pan-card" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Resources', path: '/resources' },
            { label: 'PAN Card Services' }
          ]}
        />

        {/* Executive Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4">
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
              Income Tax Department • Protean (NSDL) & UTIITSL Authorized Directory
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              PAN Card Services & Instant Verification
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              Inspect 10-character Permanent Account Number (PAN) structures, decode entity classifications,
              download e-PAN credentials, track NSDL/UTIITSL applications, and verify KYC readiness for banking products.
            </p>

            {/* Quick Sample PAN Chips */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="font-semibold text-amber-400 uppercase tracking-wider">Inspect Sample:</span>
              {[
                { label: 'Individual: ABCDE1234F', pan: 'ABCDE1234F' },
                { label: 'Company: AAACA1234M', pan: 'AAACA1234M' },
                { label: 'Trust: AAATA1234T', pan: 'AAATA1234T' },
                { label: 'Firm/LLP: AAAFA1234K', pan: 'AAAFA1234K' }
              ].map((sample) => (
                <button
                  key={sample.pan}
                  onClick={() => {
                    setPanQuery(sample.pan);
                    setActiveTab('decoder');
                  }}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    panQuery === sample.pan
                      ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                      : 'bg-white/10 text-slate-200 border-white/15 hover:bg-white/20'
                  }`}
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Feature Tabs */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-200 bg-slate-50/70 p-2 gap-2 overflow-x-auto">
            {[
              { id: 'decoder', label: '10-Char PAN Decoder & Validator', icon: Compass },
              { id: 'apply', label: 'Apply for New PAN (Form 49A / e-PAN)', icon: FileText },
              { id: 'reprint', label: 'Reprint & Download e-PAN', icon: Download },
              { id: 'correction', label: 'PAN Changes & Correction (Form CSF)', icon: Layers },
              { id: 'track', label: 'Track Application Status', icon: RefreshCw }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-10">
            {/* Tab 1: Live PAN Decoder & Validator */}
            {activeTab === 'decoder' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Interactive 10-Character PAN Structure Decoder
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Every character in an Indian PAN carries strict statutory meaning. Enter any PAN to inspect its entity classification, surname alignment, and regulatory format.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column: Interactive Inputs */}
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Enter 10-Character PAN *
                      </label>
                      <input
                        type="text"
                        maxLength={10}
                        value={panQuery}
                        onChange={handlePanChange}
                        placeholder="e.g. ABCDE1234F"
                        className="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl font-mono text-xl font-extrabold text-slate-900 uppercase tracking-widest focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder:font-sans placeholder:normal-case placeholder:tracking-normal placeholder:font-normal placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Optional: Cardholder Surname / Entity Name
                      </label>
                      <input
                        type="text"
                        value={surnameInput}
                        onChange={(e) => setSurnameInput(e.target.value)}
                        placeholder="e.g. Sharma (Tests 5th character 'S')"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                      <p className="text-[11px] text-slate-500 mt-1">
                        The 5th character of an individual's PAN must match the first letter of their surname / last name.
                      </p>
                    </div>

                    {/* Format Validation Banner */}
                    {decodedPan && (
                      <div
                        className={`p-4 rounded-xl border flex items-start gap-3 ${
                          decodedPan.isValidFormat
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                            : 'bg-amber-50 border-amber-200 text-amber-900'
                        }`}
                      >
                        {decodedPan.isValidFormat ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="font-bold text-sm">
                            {decodedPan.isValidFormat
                              ? 'Valid Indian PAN Alphanumeric Format'
                              : `Incomplete / Invalid Pattern (${decodedPan.clean.length}/10 chars)`}
                          </div>
                          <div className="text-xs mt-0.5 leading-relaxed">
                            {decodedPan.isValidFormat
                              ? `Character sequence matches the Income Tax Department pattern (5 uppercase letters, 4 digits, 1 check letter).`
                              : `Standard structure required: 3 letters series + 1 entity letter [ABCFGHLJPT] + 1 surname letter + 4 digits + 1 check letter.`}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Direct Actions */}
                    <div className="space-y-3 pt-2">
                      <button
                        onClick={copyDecodedSummary}
                        disabled={!decodedPan || !decodedPan.isValidFormat}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-all disabled:opacity-50"
                      >
                        {copiedDecoded ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-600" />
                            Decoded Summary Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy Decoded Summary
                          </>
                        )}
                      </button>

                      <a
                        href={VERIFY_PAN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-blue-900 hover:bg-blue-800 shadow-md transition-all text-sm group"
                      >
                        <span>Verify PAN on Income Tax e-Filing Portal</span>
                        <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Visual Character Breakdown */}
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-4 h-4 text-blue-600" />
                      Character-by-Character Architecture
                    </h3>

                    {decodedPan ? (
                      <div className="space-y-3">
                        {/* 1-3 Series */}
                        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-4">
                          <span className="font-mono font-black text-xl text-blue-900 px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 shrink-0">
                            {decodedPan.chars1to3 || '___'}
                          </span>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">
                              Characters 1–3: Alphabetic Series
                            </span>
                            <span className="text-xs text-slate-600 mt-0.5 block">
                              Running sequence from AAA to ZZZ assigned chronologically by the Income Tax Department.
                            </span>
                          </div>
                        </div>

                        {/* 4 Entity */}
                        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-4">
                          <span className="font-mono font-black text-xl text-purple-900 px-3 py-1 rounded-lg bg-purple-50 border border-purple-200 shrink-0">
                            {decodedPan.char4 || '_'}
                          </span>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">
                              Character 4: Entity Classification
                            </span>
                            <span className="text-xs font-semibold text-purple-700 mt-0.5 block">
                              {decodedPan.entityInfo
                                ? `${decodedPan.entityInfo.label} — ${decodedPan.entityInfo.desc}`
                                : 'Awaiting 4th character [P, C, H, F, A, T, B, L, J, G]'}
                            </span>
                          </div>
                        </div>

                        {/* 5 Surname */}
                        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-4">
                          <span className="font-mono font-black text-xl text-amber-900 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 shrink-0">
                            {decodedPan.char5 || '_'}
                          </span>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">
                              Character 5: Cardholder Surname / Entity Initial
                            </span>
                            <span className="text-xs text-slate-600 mt-0.5 block">
                              {decodedPan.char5
                                ? `First letter of cardholder's surname or entity legal name.`
                                : 'Awaiting 5th character'}
                            </span>
                            {decodedPan.surnameMatch !== null && (
                              <div
                                className={`text-xs mt-1.5 font-bold flex items-center gap-1 ${
                                  decodedPan.surnameMatch ? 'text-emerald-700' : 'text-rose-600'
                                }`}
                              >
                                {decodedPan.surnameMatch ? (
                                  <>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    Surname initial matches '{decodedPan.char5}'!
                                  </>
                                ) : (
                                  <>
                                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                                    Surname initial '{surnameInput.trim().toUpperCase().charAt(0)}' does not match 5th letter '{decodedPan.char5}'.
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* 6-9 Sequence */}
                        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-4">
                          <span className="font-mono font-black text-xl text-slate-900 px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 shrink-0">
                            {decodedPan.chars6to9 || '____'}
                          </span>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">
                              Characters 6–9: Sequential Numeric Suffix
                            </span>
                            <span className="text-xs text-slate-600 mt-0.5 block">
                              4-digit running number series from 0001 to 9999 for the active alphabet series.
                            </span>
                          </div>
                        </div>

                        {/* 10 Check Digit */}
                        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-4">
                          <span className="font-mono font-black text-xl text-emerald-900 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 shrink-0">
                            {decodedPan.char10 || '_'}
                          </span>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">
                              Character 10: Alphabetic Check Digit
                            </span>
                            <span className="text-xs text-slate-600 mt-0.5 block">
                              Computer-generated mathematical check character ensuring internal cryptographic validity.
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center text-slate-500 text-sm">
                        Enter any 10-character PAN on the left or select a sample above to view the live architectural breakdown.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Apply for New PAN */}
            {activeTab === 'apply' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Official Application Pathways for New PAN (Form 49A)
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Choose between a free 10-minute digital Instant e-PAN or a formal physical plastic laminated PAN card issued via Protean (NSDL) or UTIITSL.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Option 1: Instant e-PAN */}
                  <div className="p-6 rounded-2xl border-2 border-emerald-400 bg-emerald-50/30 shadow-md flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                          100% Free • Paperless
                        </span>
                        <Zap className="w-5 h-5 text-emerald-600" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">Instant e-PAN (Income Tax)</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Issued in digital PDF format within 10 minutes using your Aadhaar number and registered mobile OTP. Fully valid for all financial transactions.
                      </p>
                      <ul className="mt-4 space-y-1.5 text-xs text-slate-700">
                        <li>• Cost: <strong>₹0 (Completely Free)</strong></li>
                        <li>• Time: <strong>Under 10 minutes</strong></li>
                        <li>• Requirement: <strong>Aadhaar with linked mobile</strong></li>
                        <li>• Format: <strong>Digitally signed PDF</strong></li>
                      </ul>
                    </div>

                    <a
                      href={INSTANT_EPAN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center justify-center gap-1.5 w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-md"
                    >
                      <span>Apply for Free Instant e-PAN</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Option 2: Protean NSDL */}
                  <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                          Physical Plastic Card
                        </span>
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">Form 49A via Protean (NSDL)</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Official national repository issuing durable plastic laminated PAN cards delivered directly to your residential address.
                      </p>
                      <ul className="mt-4 space-y-1.5 text-xs text-slate-700">
                        <li>• Cost: <strong>₹107 (India) / ₹1,017 (Abroad)</strong></li>
                        <li>• Dispatch: <strong>7 to 10 business days</strong></li>
                        <li>• Modes: <strong>Paperless e-KYC or Scan & Upload</strong></li>
                        <li>• Includes: <strong>Physical card + digital e-PAN</strong></li>
                      </ul>
                    </div>

                    <a
                      href={NSDL_APPLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center justify-center gap-1.5 w-full py-3 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-md"
                    >
                      <span>Apply via Protean (NSDL)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Option 3: UTIITSL */}
                  <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-purple-400 hover:shadow-lg transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800">
                          Physical Plastic Card
                        </span>
                        <Building className="w-5 h-5 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">Form 49A via UTIITSL</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Authorized government portal offering seamless individual, HUF, firm, and corporate PAN issuance with PAN tracking coupons.
                      </p>
                      <ul className="mt-4 space-y-1.5 text-xs text-slate-700">
                        <li>• Cost: <strong>₹107 (India) / ₹1,017 (Abroad)</strong></li>
                        <li>• Dispatch: <strong>7 to 10 business days</strong></li>
                        <li>• Modes: <strong>Digital DSC or Aadhaar OTP</strong></li>
                        <li>• Includes: <strong>Physical card + digital e-PAN</strong></li>
                      </ul>
                    </div>

                    <a
                      href={UTIITSL_APPLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center justify-center gap-1.5 w-full py-3 px-4 rounded-xl bg-purple-900 hover:bg-purple-800 text-white text-xs font-bold transition-all shadow-md"
                    >
                      <span>Apply via UTIITSL</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Form 49A vs Form 49AA Notice */}
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 flex items-start gap-4">
                  <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-900 block mb-0.5">Which Form Do You Need?</strong>
                    Use <strong>Form 49A</strong> if you are an Indian citizen residing in India or an entity incorporated under Indian laws. Non-Resident Indians (NRIs) and foreign entities must use <strong>Form 49AA</strong>.
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Reprint & Download e-PAN */}
            {activeTab === 'reprint' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Reprint Physical PAN Card & Instant e-PAN Download
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    If your physical card is lost, damaged, or misplaced, you can request a duplicate plastic card for ₹50 or download a certified electronic PDF copy instantly.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column: Direct Gateways */}
                  <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 text-base">Download e-PAN via Protean (NSDL)</h3>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          NSDL Issued
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Free download if your PAN was issued or updated within the last 30 days. Otherwise, nominal charges of ₹8.26 apply.
                      </p>
                      <a
                        href={NSDL_DOWNLOAD_EPAN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all"
                      >
                        <span>Download NSDL e-PAN PDF</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 text-base">Download e-PAN via UTIITSL</h3>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                          UTIITSL Issued
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Input your 10-character PAN and Date of Birth to receive a download link via registered email and SMS.
                      </p>
                      <a
                        href={UTIITSL_DOWNLOAD_EPAN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-purple-900 hover:bg-purple-800 text-white text-xs font-bold transition-all"
                      >
                        <span>Download UTIITSL e-PAN PDF</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: e-PAN PDF Password Helper */}
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-5">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                        <Lock className="w-4 h-4 text-blue-600" />
                        e-PAN PDF Password Generator
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        All downloaded e-PAN PDFs are encrypted with your Date of Birth in <strong>DDMMYYYY</strong> format (no slashes, no hyphens).
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Day (DD)</label>
                        <input
                          type="text"
                          maxLength={2}
                          value={dobDay}
                          onChange={(e) => setDobDay(e.target.value.replace(/\D/g, ''))}
                          placeholder="e.g. 15"
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-center font-mono font-bold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Month (MM)</label>
                        <input
                          type="text"
                          maxLength={2}
                          value={dobMonth}
                          onChange={(e) => setDobMonth(e.target.value.replace(/\D/g, ''))}
                          placeholder="e.g. 08"
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-center font-mono font-bold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Year (YYYY)</label>
                        <input
                          type="text"
                          maxLength={4}
                          value={dobYear}
                          onChange={(e) => setDobYear(e.target.value.replace(/\D/g, ''))}
                          placeholder="e.g. 1995"
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-center font-mono font-bold text-sm"
                        />
                      </div>
                    </div>

                    {/* Calculated Password Display */}
                    <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                          PDF Unlock Password
                        </div>
                        <div className="text-2xl font-mono font-black tracking-widest mt-0.5">
                          {calculatedEpanPass || 'DDMMYYYY'}
                        </div>
                      </div>
                      <button
                        onClick={copyEpanPass}
                        disabled={!calculatedEpanPass}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all disabled:opacity-50 flex items-center gap-1"
                      >
                        {copiedDobPass ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-xs text-slate-500 leading-relaxed">
                      Example: If your date of birth is 15th August 1995, your password is <strong className="font-mono text-slate-800">15081995</strong>.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: PAN Changes & Corrections (Form CSF) */}
            {activeTab === 'correction' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    PAN Changes & Correction Application (Form CSF)
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Update or correct your Name, Father's Name, Date of Birth, Signature, or Address on your existing 10-character PAN without altering the PAN number itself.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Correction Types Checklist */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                    <h3 className="font-bold text-slate-900 text-base">Eligible Corrections</h3>
                    <div className="space-y-3 text-xs text-slate-600">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <strong className="text-slate-900 block">Name Correction / Post-Marriage Change</strong>
                        Requires Marriage Certificate, Gazette Notification, or Passport copy reflecting new surname.
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <strong className="text-slate-900 block">Date of Birth (DOB) Correction</strong>
                        Requires Municipal Birth Certificate, 10th Standard School Marksheet, or Passport.
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <strong className="text-slate-900 block">Father's Name & Signature Update</strong>
                        Requires signed declaration with supporting Aadhaar or Matriculation certificate.
                      </div>
                    </div>
                  </div>

                  {/* Process & Action */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base mb-2">Form CSF Submission Steps</h3>
                      <ol className="space-y-2 text-xs text-slate-700">
                        <li>1. Open the Protean (NSDL) PAN Application portal.</li>
                        <li>2. Select Application Type: <strong>'Changes or Correction in existing PAN Data / Reprint of PAN Card'</strong>.</li>
                        <li>3. Check the checkbox next to the specific field requiring amendment.</li>
                        <li>4. Complete Aadhaar e-KYC authentication and pay ₹107 fee.</li>
                        <li>5. Updated PAN card dispatches within 7–10 working days.</li>
                      </ol>
                    </div>

                    <a
                      href={NSDL_APPLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full py-3 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-md"
                    >
                      <span>Submit Form CSF on Protean (NSDL)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Track PAN Application Status */}
            {activeTab === 'track' && (
              <div className="space-y-8 max-w-3xl">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Track PAN Application Status (NSDL & UTIITSL)
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Track the live printing and dispatch status of your new PAN application or correction request using your 15-digit NSDL Acknowledgement number or UTIITSL Coupon number.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* NSDL Track */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        Protean NSDL
                      </span>
                      <Clock className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">15-Digit Acknowledgement</h3>
                      <p className="text-xs text-slate-600 mt-1">
                        Format: 15 numeric digits received via SMS and email confirmation upon form submission.
                      </p>
                    </div>
                    <a
                      href={NSDL_TRACK_STATUS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all"
                    >
                      <span>Track on Protean Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* UTIITSL Track */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                        UTIITSL
                      </span>
                      <Clock className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">9/10-Digit Coupon Number</h3>
                      <p className="text-xs text-slate-600 mt-1">
                        Format: Application Coupon number printed on top-right of your UTIITSL payment receipt.
                      </p>
                    </div>
                    <a
                      href={UTIITSL_TRACK_STATUS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-purple-900 hover:bg-purple-800 text-white text-xs font-bold transition-all"
                    >
                      <span>Track on UTIITSL Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 272B Legal Warning Strip */}
        <div className="rounded-3xl bg-gradient-to-r from-rose-900 via-red-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <ShieldAlert className="w-8 h-8 text-amber-400 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-white">
                Statutory Compliance: Section 272B Penalty Notice
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl leading-relaxed">
                Under Section 272B of the Income Tax Act, 1961, possessing more than one PAN card is strictly illegal and attracts a flat <strong>₹10,000 fine</strong>. If you inadvertently possess duplicate PAN cards, surrender the extra cards immediately to your Income Tax Assessing Officer.
              </p>
            </div>
          </div>
          <a
            href={VERIFY_PAN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-white text-rose-950 font-bold text-xs hover:bg-slate-100 transition-all shrink-0 shadow-md"
          >
            Verify PAN Validity
          </a>
        </div>

        {/* Financial & CIBIL Readiness Card */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
              <CreditCard className="w-4 h-4 text-blue-700" />
              BanksCart Credit Score & Loan Approvals
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Why Your PAN is the Master Key to Low Loan Rates
            </h3>
            <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
              Every retail personal loan, home loan, and credit card sanctioned across India is mapped to your 10-character PAN by TransUnion CIBIL and Experian. An accurate, operative PAN ensures instant algorithmic approvals and avoids 20% penalty TDS deductions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/eligibility"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-blue-900 hover:bg-blue-800 shadow-md transition-all text-sm active:scale-95"
            >
              Check Loan Eligibility
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Frequently Asked Questions (FAQ) Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Permanent Account Number (PAN) FAQ
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Everything you need to know about alphanumeric decoding, entity definitions, duplicate surrenders, and credit bureau mapping.
            </p>
          </div>

          <div className="divide-y divide-slate-200">
            {[
              {
                q: 'What do the 10 characters in an Indian PAN card mean?',
                a: 'The 10 characters are divided into 5 distinct components: (1) First 3 letters are an alphabetic sequence (AAA to ZZZ); (2) 4th letter indicates entity type (P for Individual, C for Company, H for HUF, F for Firm/LLP, T for Trust); (3) 5th letter is the first letter of the cardholder’s surname or entity legal name; (4) Characters 6 to 9 are a sequential 4-digit number (0001 to 9999); (5) The 10th character is an alphabetic check digit.'
              },
              {
                q: 'What is the fee to apply for a physical PAN card in India?',
                a: 'The official fee for a physical laminated PAN card dispatched to an address within India is ₹107 (including GST). For delivery outside India to a foreign address, the statutory fee is ₹1,017.'
              },
              {
                q: 'Is an Instant e-PAN legally equivalent to a physical plastic PAN card?',
                a: 'Yes. An Instant e-PAN generated digitally from the Income Tax e-Filing portal is digitally signed with an encrypted QR code and holds equal legal validity under Rule 114 of the Income Tax Rules, 1962. It is accepted for bank account opening, demat accounts, and loan sanctioning.'
              },
              {
                q: 'What is the password to open a downloaded e-PAN PDF?',
                a: 'The password to open any official e-PAN PDF is your Date of Birth (for individuals) or Date of Incorporation (for companies/firms) in DDMMYYYY format without spaces or symbols (e.g. 15081995 for 15th August 1995).'
              },
              {
                q: 'What is the penalty for holding two PAN cards in India?',
                a: 'Under Section 272B of the Income Tax Act, 1961, possessing more than one PAN is a punishable offense attracting a statutory fine of ₹10,000. You must surrender duplicate cards to the local Income Tax Assessing Officer immediately.'
              },
              {
                q: 'How does my PAN impact my credit score and loan eligibility?',
                a: 'In India, credit information companies (TransUnion CIBIL, Experian, Equifax, CRIF High Mark) use your PAN as the primary deduplication key. Every credit card swipe, EMI repayment, loan inquiry, and default is mapped to your PAN. Lenders pull your credit history via PAN to decide your interest rates.'
              }
            ].map((faq, fIdx) => (
              <details
                key={fIdx}
                className="group py-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-slate-900 hover:text-blue-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold">
                    {faq.q}
                  </h3>
                  <div className="shrink-0 rounded-full bg-slate-100 group-open:bg-blue-100 p-1.5 text-slate-600 group-open:text-blue-900 transition-colors">
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-open:rotate-180" />
                  </div>
                </summary>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed pr-6">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
