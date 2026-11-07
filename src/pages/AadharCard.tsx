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
  Unlock,
  RefreshCw,
  Clock,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Info,
  BadgeCheck,
  Landmark,
  Compass,
  FileCheck2,
  UserCheck,
  AlertTriangle,
  QrCode,
  FileText
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

// Official UIDAI & Income Tax e-Filing Endpoints
const INCOME_TAX_LINK_STATUS_URL = 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/link-aadhaar-status';
const INCOME_TAX_LINK_AADHAAR_URL = 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar';
const UIDAI_DOWNLOAD_URL = 'https://myaadhaar.uidai.gov.in/genricDownloadAadhaar';
const UIDAI_ORDER_PVC_URL = 'https://myaadhaar.uidai.gov.in/genricPVC';
const UIDAI_CHECK_STATUS_URL = 'https://myaadhaar.uidai.gov.in/check-aadhaar-status';
const UIDAI_LOCK_BIOMETRICS_URL = 'https://myaadhaar.uidai.gov.in/lock-unlock-biometrics';
const UIDAI_VERIFY_CONTACT_URL = 'https://myaadhaar.uidai.gov.in/verify-email-mobile';
const UIDAI_LOCATE_CENTRE_URL = 'https://appointments.uidai.gov.in/easearch.aspx';

// Verhoeff algorithm multiplication table d
const VERHOEFF_D = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
];

// Verhoeff algorithm permutation table p
const VERHOEFF_P = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
];

/**
 * Validates 12-digit Aadhaar using the official UIDAI Verhoeff Checksum Algorithm
 */
function validateVerhoeffChecksum(numStr: string): boolean {
  let c = 0;
  const invertedArray = numStr.split('').map(Number).reverse();
  for (let i = 0; i < invertedArray.length; i++) {
    c = VERHOEFF_D[c][VERHOEFF_P[i % 8][invertedArray[i]]];
  }
  return c === 0;
}

export default function AadharCard() {
  // Tabs: 'link-status' | 'uidai-services' | 'password-helper' | 'exemption-guide'
  const [activeTab, setActiveTab] = useState<'link-status' | 'uidai-services' | 'password-helper' | 'exemption-guide'>('link-status');

  // Input states for Linkage Validator
  const [panInput, setPanInput] = useState('');
  const [aadhaarInput, setAadhaarInput] = useState('');
  const [copiedLinkInfo, setCopiedLinkInfo] = useState(false);

  // e-Aadhaar Password Generator states
  const [passName, setPassName] = useState('');
  const [passYear, setPassYear] = useState('');
  const [copiedPass, setCopiedPass] = useState(false);

  // Format Aadhaar in 4-4-4 clusters: "XXXX XXXX XXXX"
  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 12);
    const parts = [];
    for (let i = 0; i < raw.length; i += 4) {
      parts.push(raw.slice(i, i + 4));
    }
    setAadhaarInput(parts.join(' '));
  };

  // Format PAN in uppercase 10-char
  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    setPanInput(clean);
  };

  // Real-time Aadhaar validation
  const aadhaarValidation = useMemo(() => {
    const clean = aadhaarInput.replace(/\s/g, '');
    if (clean.length === 0) return null;
    if (clean.length < 12) {
      return { isValid: false, message: `Enter all 12 digits (${clean.length}/12 entered).` };
    }
    if (/^[01]/.test(clean)) {
      return { isValid: false, message: 'Invalid Aadhaar: UIDAI numbers never begin with 0 or 1.' };
    }
    const isChecksumValid = validateVerhoeffChecksum(clean);
    if (!isChecksumValid) {
      return { isValid: false, message: 'Invalid Aadhaar Checksum. Please verify against your physical Aadhaar card.' };
    }
    return { isValid: true, message: 'Valid Aadhaar: Verhoeff mathematical checksum passed!' };
  }, [aadhaarInput]);

  // Real-time PAN validation
  const panValidation = useMemo(() => {
    const clean = panInput.trim();
    if (clean.length === 0) return null;
    if (clean.length < 10) {
      return { isValid: false, message: `Enter all 10 characters (${clean.length}/10 entered).` };
    }
    const panRegex = /^[A-Z]{3}[ABCFGHLJPT][A-Z][0-9]{4}[A-Z]$/;
    if (!panRegex.test(clean)) {
      return { isValid: false, message: 'Invalid PAN format. Must be 5 letters, 4 digits, 1 letter.' };
    }
    const entityChar = clean.charAt(3);
    const entityNames: Record<string, string> = {
      P: 'Individual (Person)',
      C: 'Company',
      H: 'Hindu Undivided Family (HUF)',
      F: 'Partnership Firm / LLP',
      A: 'Association of Persons (AOP)',
      T: 'Trust',
      B: 'Body of Individuals (BOI)'
    };
    return {
      isValid: true,
      entity: entityNames[entityChar] || 'Registered Entity',
      message: `Valid Indian PAN for ${entityNames[entityChar] || 'Entity'}.`
    };
  }, [panInput]);

  // Copy details helper
  const copyCredentials = () => {
    const cleanAadhaar = aadhaarInput.replace(/\s/g, '');
    const text = `PAN: ${panInput} | Aadhaar: ${cleanAadhaar}`;
    navigator.clipboard.writeText(text);
    setCopiedLinkInfo(true);
    setTimeout(() => setCopiedLinkInfo(false), 2200);
  };

  // e-Aadhaar PDF Password calculation
  const generatedPassword = useMemo(() => {
    const cleanName = passName.replace(/[^A-Za-z]/g, '').slice(0, 4).toUpperCase();
    const cleanYear = passYear.replace(/\D/g, '').slice(0, 4);
    if (cleanName.length === 4 && cleanYear.length === 4) {
      return `${cleanName}${cleanYear}`;
    }
    return null;
  }, [passName, passYear]);

  // Copy password helper
  const copyPassword = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword);
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2200);
    }
  };

  // Schema.org Structured Data
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'GovernmentService',
        name: 'Aadhaar-PAN Linking & UIDAI Identity Management',
        provider: {
          '@type': 'GovernmentOrganization',
          name: 'Income Tax Department & UIDAI'
        },
        serviceType: 'Statutory Identity Verification & Linking',
        description:
          'Official guidance and direct validation toolkit for linking 12-digit Aadhaar with 10-character Permanent Account Number (PAN) under Section 139AA of the Income Tax Act.'
      },
      {
        '@type': 'HowTo',
        name: 'How to Check Aadhaar-PAN Link Status and Link Online',
        description: 'Step-by-step verified guide to check link status and pay Section 234H late fees on the Income Tax e-Filing portal.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Check Link Status',
            text: 'Visit the official Income Tax e-Filing portal and enter your 10-character PAN and 12-digit Aadhaar number.'
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Pay Late Fee under Section 234H',
            text: 'If unlinked, pay the mandatory ₹1,000 fee via e-Pay Tax using Challan ITNS 280 under Major Head 0021 and Minor Head 500.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Submit Linking Request',
            text: 'After challan payment reflects (within 48 hours), submit the Aadhaar-PAN link request with OTP validation.'
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
            name: 'Aadhaar-PAN Link Status',
            item: 'https://www.bankscart.com/resources/aadhar-pan'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What happens if my PAN is not linked to Aadhaar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Under Section 139AA of the Income Tax Act, an unlinked PAN becomes inoperative. You face a flat 20% TDS/TCS deduction rate, blocked income tax refunds, inability to open demat/trading accounts, and rejection of loan and credit card applications.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the late fee to link Aadhaar with PAN in 2026?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The statutory late fee is ₹1,000 under Section 234H of the Income Tax Act, payable online via e-Pay Tax using Challan ITNS 280 (Major Head 0021, Minor Head 500).'
            }
          },
          {
            '@type': 'Question',
            name: 'Who is exempt from mandatory Aadhaar-PAN linking?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Exempt categories include: (1) Residents of Assam, Jammu & Kashmir, and Meghalaya; (2) Non-Resident Indians (NRIs); (3) Individuals aged 80 years or older; and (4) Non-citizens of India.'
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Helmet>
        <title>Aadhaar-PAN Link Status & UIDAI Identity Management Hub (2026) | BanksCart</title>
        <meta
          name="description"
          content="Check official Aadhaar-PAN link status, verify 12-digit Aadhaar Verhoeff checksum, resolve inoperative PAN penalties under Section 234H, and access official UIDAI portals instantly."
        />
        <link rel="canonical" href="https://www.bankscart.com/resources/aadhar-pan" />
        <meta property="og:title" content="Aadhaar-PAN Link Status & UIDAI Services - BanksCart" />
        <meta
          property="og:description"
          content="Instant validation of Aadhaar & PAN credentials, Section 234H penalty guide, and direct links to Income Tax e-Filing and UIDAI."
        />
        <meta property="og:url" content="https://www.bankscart.com/resources/aadhar-pan" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Resources', path: '/resources' },
            { label: 'Aadhaar-PAN Link Status' }
          ]}
        />

        {/* Executive Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4">
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
              Statutory Mandate (Section 139AA) • Official Income Tax & UIDAI Portals
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Aadhaar-PAN Linking & Identity Hub
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              Verify your 12-digit Aadhaar Verhoeff checksum and 10-character PAN format in real-time,
              access the official Income Tax e-Filing link status portal, and resolve inoperative PAN consequences under Section 234H.
            </p>

            {/* Statutory Notice Strip */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs bg-amber-500/15 border border-amber-400/30 rounded-xl p-3 text-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Compliance Alert:</strong> Unlinked PAN cards remain strictly <em>INOPERATIVE</em> under Section 139AA, triggering 20% TDS deductions and frozen demat/banking limits.
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Feature Tabs */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-200 bg-slate-50/70 p-2 gap-2 overflow-x-auto">
            {[
              { id: 'link-status', label: 'Aadhaar-PAN Linkage Validator', icon: FileCheck2 },
              { id: 'uidai-services', label: 'Official UIDAI Gateways', icon: ShieldCheck },
              { id: 'password-helper', label: 'e-Aadhaar PDF Password Tool', icon: Lock },
              { id: 'exemption-guide', label: 'Section 139AA Exemptions', icon: UserCheck }
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
            {/* Tab 1: Linkage Validator & Status Guide */}
            {activeTab === 'link-status' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Instant Pre-Verification & Official Link Status Check
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Enter your credentials to verify format compliance and mathematical checksums before proceeding to the Income Tax Department e-Filing portal.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column: Input Form with Real Validation */}
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Permanent Account Number (PAN) *
                      </label>
                      <input
                        type="text"
                        maxLength={10}
                        value={panInput}
                        onChange={handlePanChange}
                        placeholder="e.g. ABCDE1234F"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl font-mono text-base font-bold text-slate-900 uppercase tracking-widest focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder:font-sans placeholder:normal-case placeholder:tracking-normal placeholder:font-normal placeholder:text-slate-400"
                      />
                      {panValidation && (
                        <div
                          className={`mt-2 text-xs flex items-center gap-1.5 font-medium ${
                            panValidation.isValid ? 'text-emerald-700' : 'text-rose-600'
                          }`}
                        >
                          {panValidation.isValid ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                          )}
                          <span>{panValidation.message}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        12-Digit Aadhaar Number *
                      </label>
                      <input
                        type="text"
                        maxLength={14}
                        value={aadhaarInput}
                        onChange={handleAadhaarChange}
                        placeholder="e.g. 2345 6789 1238"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl font-mono text-base font-bold text-slate-900 tracking-widest focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder:font-sans placeholder:tracking-normal placeholder:font-normal placeholder:text-slate-400"
                      />
                      {aadhaarValidation && (
                        <div
                          className={`mt-2 text-xs flex items-center gap-1.5 font-medium ${
                            aadhaarValidation.isValid ? 'text-emerald-700' : 'text-rose-600'
                          }`}
                        >
                          {aadhaarValidation.isValid ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                          )}
                          <span>{aadhaarValidation.message}</span>
                        </div>
                      )}
                    </div>

                    {/* Pre-Verification Summary Card */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Pre-Check Validation Status
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">PAN Structure:</span>
                        <span
                          className={`font-semibold ${
                            panValidation?.isValid ? 'text-emerald-700' : 'text-slate-400'
                          }`}
                        >
                          {panValidation?.isValid ? 'Verified Alphanumeric' : 'Pending (10 Chars)'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Aadhaar Verhoeff Checksum:</span>
                        <span
                          className={`font-semibold ${
                            aadhaarValidation?.isValid ? 'text-emerald-700' : 'text-slate-400'
                          }`}
                        >
                          {aadhaarValidation?.isValid ? 'Mathematically Valid' : 'Pending (12 Digits)'}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={copyCredentials}
                          disabled={!panInput && !aadhaarInput}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-all disabled:opacity-50"
                        >
                          {copiedLinkInfo ? (
                            <>
                              <Check className="w-4 h-4 text-emerald-600" />
                              Credentials Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy Credentials
                            </>
                          )}
                        </button>
                      </div>

                      <a
                        href={INCOME_TAX_LINK_STATUS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-blue-900 hover:bg-blue-800 shadow-md transition-all text-sm group"
                      >
                        <span>Check Link Status on Official Income Tax Portal</span>
                        <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>

                      <a
                        href={INCOME_TAX_LINK_AADHAAR_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-900 bg-amber-500 hover:bg-amber-400 shadow-md transition-all text-sm group"
                      >
                        <span>Link Aadhaar with PAN Now (e-Filing)</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed text-center">
                      BanksCart does not store your raw Aadhaar or PAN. You will be redirected securely to the Income Tax Department (eportal.incometax.gov.in) to complete statutory verification.
                    </p>
                  </div>

                  {/* Right Column: Step-by-Step Execution Guide */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                        <Clock className="w-5 h-5 text-blue-600" />
                        4-Step Aadhaar-PAN Linking Procedure
                      </h3>
                      <ol className="space-y-4 text-sm text-slate-600">
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            1
                          </span>
                          <div>
                            <strong className="text-slate-900 block">Check Existing Status</strong>
                            Visit the e-Filing link status portal. If already linked, no further action is required.
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            2
                          </span>
                          <div>
                            <strong className="text-slate-900 block">Pay ₹1,000 Fee under Section 234H</strong>
                            If unlinked, pay the mandatory penalty via e-Pay Tax using Challan ITNS 280 under <em>Major Head 0021 (Income Tax Other Than Companies)</em> and <em>Minor Head 500 (Other Receipts)</em>.
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            3
                          </span>
                          <div>
                            <strong className="text-slate-900 block">Submit Link Request</strong>
                            After payment reflects (typically within 24 to 48 hours), reopen the 'Link Aadhaar' page and submit the OTP authentication request.
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            4
                          </span>
                          <div>
                            <strong className="text-slate-900 block">Re-activation Window</strong>
                            Once successfully linked, an inoperative PAN becomes fully operational within 30 days of the request submission date.
                          </div>
                        </li>
                      </ol>
                    </div>

                    {/* Severe Inoperative PAN Consequences */}
                    <div className="bg-rose-50/70 rounded-2xl border border-rose-200 p-6">
                      <h4 className="text-sm font-bold text-rose-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        Consequences of an Inoperative PAN
                      </h4>
                      <ul className="space-y-1.5 text-xs text-rose-800">
                        <li>• Flat 20% higher TDS/TCS deduction rate under Section 206AA & 206CC.</li>
                        <li>• Pending income tax refunds are frozen; no interest is payable for inoperative duration.</li>
                        <li>• Blocked stock market trading, mutual fund SIP allocations, and crypto accounts.</li>
                        <li>• High-value banking transactions and personal loan approvals will be halted.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Official UIDAI Direct Action Gateways */}
            {activeTab === 'uidai-services' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Official UIDAI Resident Portals & Services
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Direct certified gateways to download electronic Aadhaar, order physical PVC cards, lock biometric sensors, and verify contact records.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Download e-Aadhaar',
                      desc: 'Download a password-protected electronic copy of your Aadhaar card signed digitally by UIDAI.',
                      url: UIDAI_DOWNLOAD_URL,
                      cta: 'Download e-Aadhaar',
                      badge: 'Free of Cost',
                      icon: Download
                    },
                    {
                      title: 'Order Aadhaar PVC Card',
                      desc: 'Get an all-weather, durable pocket-sized PVC card with holographic security and micro-text.',
                      url: UIDAI_ORDER_PVC_URL,
                      cta: 'Order PVC Card (₹50)',
                      badge: 'Official ₹50 Fee',
                      icon: CreditCard
                    },
                    {
                      title: 'Lock / Unlock Biometrics',
                      desc: 'Protect against unauthorized biometric fraud by locking fingerprint and iris scanners.',
                      url: UIDAI_LOCK_BIOMETRICS_URL,
                      cta: 'Manage Biometric Lock',
                      badge: 'Security Recommended',
                      icon: Lock
                    },
                    {
                      title: 'Check Update / Enrolment Status',
                      desc: 'Track the real-time status of your 14-digit Enrolment ID (EID) or Update Request Number (URN).',
                      url: UIDAI_CHECK_STATUS_URL,
                      cta: 'Check Status',
                      badge: 'Real-Time Track',
                      icon: RefreshCw
                    },
                    {
                      title: 'Verify Mobile & Email ID',
                      desc: 'Confirm which mobile number and email address are linked to your official 12-digit UIDAI record.',
                      url: UIDAI_VERIFY_CONTACT_URL,
                      cta: 'Verify Contact Info',
                      badge: 'OTP Verified',
                      icon: CheckCircle2
                    },
                    {
                      title: 'Locate Aadhaar Seva Kendra',
                      desc: 'Find the nearest authorized government bank branch, post office, or ASK for biometric updates.',
                      url: UIDAI_LOCATE_CENTRE_URL,
                      cta: 'Find Nearest Centre',
                      badge: 'All-India Directory',
                      icon: Compass
                    }
                  ].map((service, idx) => {
                    const Icon = service.icon;
                    return (
                      <div
                        key={idx}
                        className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                              {service.badge}
                            </span>
                          </div>
                          <h3 className="font-bold text-slate-900 text-base mb-1.5">{service.title}</h3>
                          <p className="text-xs text-slate-600 leading-relaxed mb-4">{service.desc}</p>
                        </div>

                        <a
                          href={service.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-blue-900 text-white text-xs font-bold transition-all"
                        >
                          <span>{service.cta}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 3: e-Aadhaar PDF Password Generator */}
            {activeTab === 'password-helper' && (
              <div className="space-y-8 max-w-3xl">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    e-Aadhaar PDF Password Helper
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Every downloaded e-Aadhaar PDF is protected by an 8-character password combination mandated by UIDAI:
                    <strong> First 4 letters of your Name in CAPITAL letters + 4-digit Year of Birth (YYYY)</strong>.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        First Name (as printed on Aadhaar)
                      </label>
                      <input
                        type="text"
                        value={passName}
                        onChange={(e) => setPassName(e.target.value)}
                        placeholder="e.g. SURESH"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 uppercase focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Year of Birth (YYYY)
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        value={passYear}
                        onChange={(e) => setPassYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="e.g. 1990"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl font-mono text-base font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Calculated Result Banner */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase font-bold text-amber-300 tracking-wider">
                        Calculated PDF Password
                      </div>
                      <div className="text-3xl font-mono font-black text-white mt-1 tracking-widest">
                        {generatedPassword || '____ ____'}
                      </div>
                      <p className="text-xs text-slate-300 mt-1">
                        Case-sensitive uppercase letters required to open the official PDF.
                      </p>
                    </div>

                    <button
                      onClick={copyPassword}
                      disabled={!generatedPassword}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shrink-0 disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {copiedPass ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-950" />
                          Password Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Password
                        </>
                      )}
                    </button>
                  </div>

                  {/* Examples Table */}
                  <div className="rounded-xl border border-slate-200 overflow-hidden bg-white text-xs">
                    <div className="bg-slate-100 font-bold p-3 text-slate-700 border-b border-slate-200">
                      Standard UIDAI Password Examples:
                    </div>
                    <div className="divide-y divide-slate-100">
                      <div className="p-3 flex justify-between">
                        <span>Name: <strong>Suresh Sharma</strong> | DOB: 1990</span>
                        <span className="font-mono font-bold text-blue-900">SURE1990</span>
                      </div>
                      <div className="p-3 flex justify-between">
                        <span>Name: <strong>P. Kumar</strong> | DOB: 1985</span>
                        <span className="font-mono font-bold text-blue-900">PKUM1985</span>
                      </div>
                      <div className="p-3 flex justify-between">
                        <span>Name: <strong>Ria Roy</strong> | DOB: 2002</span>
                        <span className="font-mono font-bold text-blue-900">RIAR2002</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Section 139AA Exemptions Guide */}
            {activeTab === 'exemption-guide' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Statutory Exemptions from Mandatory Aadhaar-PAN Linking
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Under notifications issued by the Central Board of Direct Taxes (CBDT), certain categories of individuals are exempt from Section 139AA linking mandates.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      category: 'Residents of Specific States',
                      rule: 'Individuals residing in the States of Assam, Jammu & Kashmir, and Meghalaya.',
                      detail: 'Aadhaar coverage was rolled out progressively in these regions; residents are legally exempted from mandatory linking unless they choose to link voluntarily.',
                      exempt: true
                    },
                    {
                      category: 'Non-Resident Indians (NRIs)',
                      rule: 'A Non-Resident Indian as classified under Section 6 of the Income Tax Act, 1961.',
                      detail: 'NRIs without an Aadhaar card can continue operating their NRO/NRE banking facilities and file tax returns by submitting NRI status declaration on the e-Filing portal.',
                      exempt: true
                    },
                    {
                      category: 'Super Senior Citizens',
                      rule: 'Individuals who are of the age of 80 years or more at any time during the previous year.',
                      detail: 'Senior citizens aged 80+ are exempt from Section 234H penalties and their PAN will not be deemed inoperative due to lack of Aadhaar linking.',
                      exempt: true
                    },
                    {
                      category: 'Non-Citizens of India',
                      rule: 'Individuals who are not citizens of the Republic of India.',
                      detail: 'Foreign nationals, expatriates working in India with PAN, and overseas investors holding business PANs are exempt from quoting an Aadhaar number.',
                      exempt: true
                    }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          Exempt Category
                        </span>
                        <span className="text-xs text-slate-400 font-medium">CBDT Mandate</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">{item.category}</h3>
                      <p className="text-xs font-semibold text-blue-900">{item.rule}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Banking, KYC & Loan Verification CTA Card */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              BanksCart Credit & Banking Readiness
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Need Instant Loan Verification or Credit Card Approval?
            </h3>
            <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
              An active, operational PAN and valid Aadhaar are required by RBI-regulated lenders (SBI, HDFC, ICICI, Axis) for Video-KYC and digital loan sanctioning. Check your free CIBIL score and pre-approved personal loans on BanksCart.
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
              Aadhaar-PAN Linking & Identity Verification FAQ
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Everything you need to know regarding penalty payments, inoperative PAN status, and demographic correction protocols.
            </p>
          </div>

          <div className="divide-y divide-slate-200">
            {[
              {
                q: 'What is the penalty for linking Aadhaar with PAN after the deadline?',
                a: 'Under Section 234H of the Income Tax Act, 1961, individuals linking their Aadhaar with PAN must pay a mandatory fee of ₹1,000 via the e-Pay Tax facility using Challan ITNS 280 under Major Head 0021 (Income Tax Other than Companies) and Minor Head 500 (Other Receipts).'
              },
              {
                q: 'How long does it take for an inoperative PAN to become operative after linking?',
                a: 'Once the linking request is submitted on the Income Tax e-Filing portal after successful payment of the ₹1,000 late fee, the PAN card is reactivated and becomes operative within 30 days from the date of the request.'
              },
              {
                q: 'What should I do if my Name or Date of Birth does not match between Aadhaar and PAN?',
                a: 'Aadhaar and PAN details must match identically (Name, Gender, and Date of Birth). If there is a demographic mismatch, you must first update your details on either the UIDAI portal (for Aadhaar) or the Protean/UTIITSL portal (for PAN) before submitting the link request on the e-Filing portal.'
              },
              {
                q: 'Can I file my Income Tax Return (ITR) if my PAN is inoperative?',
                a: 'An inoperative PAN blocks the processing of pending tax refunds and prevents interest calculation under Section 244A. Additionally, any TDS/TCS credited to your account will be deducted at higher rates (flat 20%).'
              },
              {
                q: 'Is Biometric Locking safe for Aadhaar?',
                a: 'Yes. Locking your biometrics via the official myAadhaar portal is one of the highest security safeguards recommended by cybersecurity experts. It prevents anyone from fraudulently performing biometric authentication using your credentials. You can temporarily unlock biometrics via mobile OTP whenever visiting a bank for KYC.'
              },
              {
                q: 'What is a Masked Aadhaar and where is it accepted?',
                a: 'A Masked Aadhaar conceals the first 8 digits of your Aadhaar number, displaying only the last 4 digits (e.g. XXXX XXXX 1234). As per UIDAI guidelines, Masked Aadhaar is legally valid for all identity verifications, hotel check-ins, airport entry, and private sector onboarding, preserving privacy.'
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
