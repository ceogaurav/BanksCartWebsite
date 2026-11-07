import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  HelpCircle,
  Building2,
  Users,
  MessageSquare,
  FileText,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Search,
  ChevronDown,
  Lock,
  Headphones,
  Check
} from 'lucide-react';

export const ContactUs: React.FC = () => {
  const pageTitle = "Contact Us - Customer Support, Helpdesk & Grievance Redressal | BanksCart";
  const pageDescription = "Contact BanksCart customer care, support desk, and grievance redressal officer. Get in touch for loan application assistance, banking partner inquiries, and customer feedback.";
  const canonicalUrl = "https://www.bankscart.com/contact";

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Personal Loan Inquiry',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // FAQ State
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email address required';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = '10-digit Indian mobile number required';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errors.message = 'Please provide details with at least 10 characters';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  // Structured Data JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact BanksCart Support",
    "description": pageDescription,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "Organization",
      "name": "BanksCart Financial Technologies Private Limited",
      "url": "https://www.bankscart.com",
      "logo": "https://www.bankscart.com/favicon-32x32.png",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-11-4100-8900",
          "contactType": "Customer Support",
          "email": "support@bankscart.com",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi"]
        },
        {
          "@type": "ContactPoint",
          "contactType": "Grievance Officer",
          "email": "grievance@bankscart.com",
          "areaServed": "IN"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Level 4, Statesman House, Barakhamba Road, Connaught Place",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "postalCode": "110001",
        "addressCountry": "IN"
      }
    }
  };

  // Contact FAQs
  const faqs = [
    {
      q: "Does BanksCart charge fees for loan applications or customer support?",
      a: "No. BanksCart services are 100% free for all borrowers and consumers. We do not charge any consultation, advisory, or platform fees. Standard administrative loan processing charges are levied solely by your chosen lending bank or NBFC at the time of sanction."
    },
    {
      q: "How can I track the live status of my submitted loan application?",
      a: "You can track your application status via our digital tracker using your registered mobile number and Application Reference ID. Alternatively, you can email support@bankscart.com or call our toll-free desk at 1800-200-8900 with your reference number."
    },
    {
      q: "What is the turnaround time (TAT) for customer support inquiries?",
      a: "Online contact inquiries and emails received by our customer desk are acknowledged automatically within 1 hour and assigned to a financial specialist for resolution within 24 business hours. Complex grievance petitions are resolved within 48 to 72 business hours."
    },
    {
      q: "Can I request deletion of my credit score and personal data?",
      a: "Yes. In full compliance with India's Digital Personal Data Protection (DPDP) Act, 2023, you have the right to request deletion of your stored user records and credit profile at any time by emailing a formal request from your registered address to support@bankscart.com."
    },
    {
      q: "How can scheduled banks or NBFCs partner with BanksCart?",
      a: "Scheduled commercial banks, RBI-registered NBFCs, and fintech lending service providers (LSPs) can connect with our institutional alliances division by emailing partners@bankscart.com with corporate credentials."
    },
    {
      q: "How do I escalate an unresolved dispute to the Principal Grievance Officer?",
      a: "If a complaint submitted to Level 1 customer care remains unresolved after 48 hours, you can mark a formal escalation directly to our Principal Grievance Officer Mr. Rajesh Sharma at grievance@bankscart.com referencing your original ticket ID."
    }
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-ibm">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="contact bankscart, customer care bankscart, grievance officer bankscart, loan assistance helpline, support email bankscart" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb path={['Home', 'Contact Us']} />
        </div>
      </div>

      {/* ==================== HERO SECTION ==================== */}
      <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white pt-12 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 bg-[#1E3A8A]/60 border border-[#38BDF8]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#38BDF8] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              RBI Fair Practices Compliance • Dedicated Grievance Desk
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Get in Touch with <span className="text-[#38BDF8]">BanksCart Support</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Have questions regarding personal loans, home mortgages, credit card applications, or interest rates? Our dedicated support team and certified financial specialists are here to assist you.
            </p>
          </div>

          {/* Quick Contact Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
              <Headphones className="w-5 h-5 text-[#38BDF8] flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Toll-Free Helpline</p>
                <p className="text-[10px] text-slate-400">1800-200-8900</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">24h Response</p>
                <p className="text-[10px] text-slate-400">Guaranteed Support TAT</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Grievance Cell</p>
                <p className="text-[10px] text-slate-400">RBI Multi-Tier Redressal</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">256-Bit SSL</p>
                <p className="text-[10px] text-slate-400">Bank-Grade Privacy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 4 CONTACT CHANNELS GRID ==================== */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Email Channel */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Email Inquiries</h3>
              <p className="text-xs text-slate-500">Direct response within 24 business hours</p>
              <div className="space-y-1.5 pt-1 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px] block">Customer Support:</span>
                  <a href="mailto:support@bankscart.com" className="text-[#1E3A8A] font-bold hover:underline">
                    support@bankscart.com
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Bank Partnerships:</span>
                  <a href="mailto:partners@bankscart.com" className="text-[#1E3A8A] font-bold hover:underline">
                    partners@bankscart.com
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Channel */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Phone &amp; Helpline</h3>
              <p className="text-xs text-slate-500">Mon - Sat: 9:30 AM to 6:30 PM IST</p>
              <div className="space-y-1.5 pt-1 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px] block">Toll-Free Support:</span>
                  <a href="tel:18002008900" className="text-emerald-700 font-bold hover:underline">
                    1800-200-8900
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Direct Board Desk:</span>
                  <a href="tel:+911141008900" className="text-slate-700 font-bold hover:underline">
                    +91 11 4100 8900
                  </a>
                </div>
              </div>
            </div>

            {/* Corporate Office Channel */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Corporate Office</h3>
              <p className="text-xs text-slate-500">Registered Office in New Delhi</p>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                <strong>BanksCart Financial Technologies Pvt. Ltd.</strong><br />
                <span className="font-mono text-[10px] text-slate-500">CIN: U67190DL2024PTC428910</span><br />
                Level 4, Statesman House, Barakhamba Road,<br />
                Connaught Place, New Delhi - 110001, India
              </p>
            </div>

            {/* Operating Hours Channel */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Operating Hours</h3>
              <p className="text-xs text-slate-500">Support desk operational schedule</p>
              <div className="text-xs text-slate-600 space-y-1 pt-1">
                <p><span className="font-semibold text-slate-800">Monday &ndash; Friday:</span> 9:30 AM &ndash; 6:30 PM</p>
                <p><span className="font-semibold text-slate-800">Saturday:</span> 9:30 AM &ndash; 2:00 PM</p>
                <p><span className="font-semibold text-slate-800">Sunday &amp; Bank Holidays:</span> Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FORM & GRIEVANCE SPLIT SECTION ==================== */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Direct Advisory Desk
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                  Send a Message to Our Financial Advisory Team
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Submit your inquiry below and an authorized loan specialist will get in touch within 24 business hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-900">Inquiry Ticket Received!</h3>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to BanksCart. Our customer care desk has registered your inquiry (Ticket #BC-{Math.floor(100000 + Math.random() * 900000)}) and will respond via phone and email within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ fullName: '', email: '', phone: '', subject: 'Personal Loan Inquiry', message: '' });
                    }}
                    className="inline-block px-5 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors shadow"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none ${
                          formErrors.fullName ? 'border-rose-400 bg-rose-50' : 'border-slate-300 bg-white'
                        }`}
                      />
                      {formErrors.fullName && <p className="text-[11px] text-rose-600 mt-1">{formErrors.fullName}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rahul@example.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none ${
                          formErrors.email ? 'border-rose-400 bg-rose-50' : 'border-slate-300 bg-white'
                        }`}
                      />
                      {formErrors.email && <p className="text-[11px] text-rose-600 mt-1">{formErrors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                        placeholder="e.g. 9876543210"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none ${
                          formErrors.phone ? 'border-rose-400 bg-rose-50' : 'border-slate-300 bg-white'
                        }`}
                      />
                      {formErrors.phone && <p className="text-[11px] text-rose-600 mt-1">{formErrors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-bold text-slate-700 mb-1">
                        Inquiry Category *
                      </label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none bg-white"
                      >
                        <option value="Personal Loan Inquiry">Personal Loan Inquiry</option>
                        <option value="Home Loan Inquiry">Home Loan Inquiry</option>
                        <option value="Business Loan Inquiry">Business Loan Inquiry</option>
                        <option value="Education Loan Inquiry">Education Loan Inquiry</option>
                        <option value="Credit Card Inquiry">Credit Card Inquiry</option>
                        <option value="Credit Score &amp; CIBIL Dispute">Credit Score &amp; CIBIL Dispute</option>
                        <option value="Bank Partnership / DSA Program">Bank Partnership / DSA Program</option>
                        <option value="General Feedback">General Feedback &amp; Support</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your financial query or complaint in detail..."
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none ${
                        formErrors.message ? 'border-rose-400 bg-rose-50' : 'border-slate-300 bg-white'
                      }`}
                    />
                    {formErrors.message && <p className="text-[11px] text-rose-600 mt-1">{formErrors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3 bg-[#A16207] hover:bg-amber-800 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? 'Submitting Inquiry...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Grievance Redressal & Escalation */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A16207]" />
                  RBI Fair Practices Code
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">
                  Multi-Tier Grievance Redressal
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  In accordance with the Reserve Bank of India’s Digital Lending Guidelines, BanksCart maintains a formal escalation matrix for transparent dispute resolution.
                </p>
              </div>

              {/* Level 1 */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#0F172A]">Level 1: Customer Helpdesk</span>
                  <span className="text-[10px] font-bold text-[#1E3A8A] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                    24–48h TAT
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  For loan status inquiries, document upload verification, or platform feedback, write directly to{' '}
                  <a href="mailto:support@bankscart.com" className="text-[#1E3A8A] font-bold underline">
                    support@bankscart.com
                  </a>.
                </p>
              </div>

              {/* Level 2 */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#0F172A]">Level 2: Principal Grievance Officer</span>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                    3 Business Days TAT
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  If your issue remains unresolved after 48 hours, you can escalate directly to our designated Grievance Redressal Officer:
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1 font-mono text-[11px] text-slate-700">
                  <p><span className="text-slate-400">Officer:</span> Mr. Rajesh Sharma</p>
                  <p><span className="text-slate-400">Role:</span> Head of Compliance &amp; Grievance</p>
                  <p><span className="text-slate-400">Email:</span> grievance@bankscart.com</p>
                  <p><span className="text-slate-400">Phone:</span> +91 11 4100 8900 (Option 4)</p>
                </div>
              </div>

              {/* Level 3 */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#0F172A]">Level 3: RBI Ombudsman</span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Regulatory Portal
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  If your complaint remains unaddressed after 30 days, you can lodge an escalation with the RBI Ombudsman at{' '}
                  <a href="https://cms.rbi.org.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline inline-flex items-center gap-0.5">
                    cms.rbi.org.in <ExternalLink className="w-3 h-3" />
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FAQ ACCORDION SECTION ==================== */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              Support &amp; Advisory Help
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Frequently Asked Questions About BanksCart Support
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Answers regarding service charges, application tracking, partnership programs, and consumer data privacy.
            </p>

            <div className="mt-6 max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search support questions..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-sm text-[#0F172A] flex justify-between items-center gap-3 hover:bg-slate-100 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'transform rotate-180 text-[#1E3A8A]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-200 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== REGULATORY NON-LENDER DISCLOSURE ==================== */}
      <section className="py-12 bg-slate-100 text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-xs leading-relaxed space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Regulatory Disclosure &amp; Non-Lender Status</span>
            </div>
            <p>
              BanksCart is an independent digital loan and credit comparison marketplace. BanksCart is not a licensed bank, NBFC, or credit institution, and does not lend money directly. All loan approvals, interest rates, disbursal terms, and credit decisions are made exclusively at the discretion of RBI-regulated banks and NBFC partners. We do not charge borrowers upfront processing fees for loan matching.
            </p>
            <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
              <span>Legal Entity: <strong>BanksCart Financial Technologies Pvt. Ltd.</strong> • CIN: <strong className="font-mono">U67190DL2024PTC428910</strong></span>
              <Link to="/editorial-policy" className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
                Editorial &amp; Fact-Checking Standards <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
