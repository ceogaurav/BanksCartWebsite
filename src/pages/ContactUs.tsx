import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
  AlertCircle
} from 'lucide-react';

const ContactUs: React.FC = () => {
  const pageTitle = "Contact Us - Customer Support, Helpdesk & Grievance Redressal | BanksCart";
  const pageDescription = "Contact BanksCart customer care, support desk, and grievance redressal officer. Get in touch for loan application assistance, banking partner inquiries, and customer feedback.";
  const canonicalUrl = "https://www.bankscart.com/contact";

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Personal Loan Inquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact BanksCart Support",
    "description": pageDescription,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "Organization",
      "name": "BanksCart",
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

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="contact bankscart, customer care bankscart, grievance officer bankscart, loan assistance helpline, support email bankscart" />

        {/* Self-Referencing Canonical Tag */}
        <link rel="canonical" href={canonicalUrl} />

        {/* OpenGraph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><span>/</span></li>
              <li className="text-slate-800 font-medium" aria-current="page">Contact Us</li>
            </ol>
          </nav>

          {/* Hero Header */}
          <section className="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-full border border-blue-200">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>We're Here to Help</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Get in Touch with BanksCart
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
              Have a question about personal loans, home mortgages, credit card applications, or interest rates? Our dedicated support team and financial advisors are ready to assist you.
            </p>
          </section>

          {/* Standardized Regulatory Disclosure Banner */}
          <section className="bg-blue-50/70 rounded-2xl p-6 border border-blue-200 text-xs text-slate-700 leading-relaxed space-y-2">
            <div className="flex items-center gap-2 font-bold text-blue-900 uppercase tracking-wider text-xs">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Independent Marketplace Disclosure & Non-Lender Status</span>
            </div>
            <p>
              BanksCart is an independent digital loan and credit comparison marketplace. BanksCart is not a licensed bank, NBFC, or credit institution, and does not lend money directly. All loan approvals, interest rates, disbursal terms, and credit decisions are made exclusively at the discretion of RBI-regulated banks and NBFC partners. We do not charge borrowers upfront processing fees for loan matching.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
              <span>Legal Entity: <strong>BanksCart Financial Technologies Pvt. Ltd.</strong></span>
              <span>•</span>
              <span>CIN: <strong className="font-mono">U67190DL2024PTC428910</strong></span>
              <span>•</span>
              <Link to="/editorial-policy" className="text-blue-600 font-semibold hover:underline">
                View Editorial & Fact-Checking Policy &rarr;
              </Link>
            </div>
          </section>

          {/* Contact Details & Channels Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Email Inquiries</h3>
              <p className="text-xs text-slate-500">Direct response within 24 working hours</p>
              <div className="space-y-1 pt-1 text-sm">
                <div>
                  <span className="text-slate-400 text-xs block">Customer Support:</span>
                  <a href="mailto:support@bankscart.com" className="text-blue-600 font-medium hover:underline">
                    support@bankscart.com
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Bank Partnerships:</span>
                  <a href="mailto:partners@bankscart.com" className="text-blue-600 font-medium hover:underline">
                    partners@bankscart.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Phone & Helpline</h3>
              <p className="text-xs text-slate-500">Mon - Sat: 9:30 AM to 6:30 PM IST</p>
              <div className="space-y-1 pt-1 text-sm">
                <div>
                  <span className="text-slate-400 text-xs block">Toll-Free Support:</span>
                  <a href="tel:18002008900" className="text-emerald-700 font-semibold hover:underline">
                    1800-200-8900
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Direct Desk:</span>
                  <a href="tel:+911141008900" className="text-slate-700 font-medium hover:underline">
                    +91 11 4100 8900
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Corporate Office</h3>
              <p className="text-xs text-slate-500">Registered Office in New Delhi</p>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                <strong>BanksCart Financial Technologies Pvt. Ltd.</strong><br />
                <span className="font-mono text-[11px] text-slate-500">CIN: U67190DL2024PTC428910</span><br />
                Statesman House, Barakhamba Road,<br />
                Connaught Place, New Delhi - 110001, India
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Operating Hours</h3>
              <p className="text-xs text-slate-500">Customer care availability</p>
              <div className="text-xs text-slate-600 space-y-1 pt-1">
                <p><span className="font-medium text-slate-700">Monday - Friday:</span> 9:30 AM – 6:30 PM</p>
                <p><span className="font-medium text-slate-700">Saturday:</span> 9:30 AM – 2:00 PM</p>
                <p><span className="font-medium text-slate-700">Sunday & Public Holidays:</span> Closed</p>
              </div>
            </div>
          </section>

          {/* Form & Redressal Split Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 lg:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-slate-900">Send Us a Message</h2>
                <p className="text-sm text-slate-500">
                  Fill in your details below and a loan specialist will contact you promptly.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-bold text-emerald-900">Message Received!</h3>
                  <p className="text-sm text-emerald-700 max-w-md mx-auto">
                    Thank you for reaching out to BanksCart. Our customer support team has received your inquiry and will respond within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ fullName: '', email: '', phone: '', subject: 'Personal Loan Inquiry', message: '' });
                    }}
                    className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rahul@example.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 9876543210"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 mb-1">
                        Inquiry Category *
                      </label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                      >
                        <option value="Personal Loan Inquiry">Personal Loan Inquiry</option>
                        <option value="Home Loan Inquiry">Home Loan Inquiry</option>
                        <option value="Business Loan Inquiry">Business Loan Inquiry</option>
                        <option value="Credit Card Comparison">Credit Card Comparison</option>
                        <option value="Credit Score & CIBIL Report">Credit Score & CIBIL Report</option>
                        <option value="Bank Partnership / DSA">Bank Partnership / DSA</option>
                        <option value="Other Feedback">Other Feedback / General Query</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe how we can help you..."
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow disabled:opacity-50 text-sm"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {submitting ? 'Submitting...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Grievance Redressal & Regulatory Escalation */}
            <div className="lg:col-span-5 bg-white p-8 lg:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-50 text-amber-800 text-xs font-semibold rounded-md border border-amber-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>RBI Compliance & Fair Practices</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">Grievance Redressal Mechanism</h2>
                <p className="text-xs text-slate-500">
                  In accordance with RBI digital lending guidelines, BanksCart is committed to fair practices and rapid grievance resolution.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Level 1: Customer Support Desk</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  For service requests or complaints regarding loan comparison, document upload, or credit score checks, write directly to <a href="mailto:support@bankscart.com" className="text-blue-600 font-medium">support@bankscart.com</a>. Resolution timeline: 24 to 48 hours.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Level 2: Principal Grievance Officer</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If your issue remains unresolved after 48 hours, you can escalate the matter directly to our designated Grievance Redressal Officer:
                </p>
                <div className="text-xs text-slate-700 space-y-1 pt-1 font-mono">
                  <p><span className="text-slate-400">Officer:</span> Mr. Rajesh Sharma</p>
                  <p><span className="text-slate-400">Designation:</span> Head of Compliance & Grievance</p>
                  <p><span className="text-slate-400">Email:</span> grievance@bankscart.com</p>
                  <p><span className="text-slate-400">Escalation TAT:</span> 3 business days</p>
                </div>
              </div>

              <div className="text-xs text-slate-500 space-y-1">
                <p className="font-semibold text-slate-700">Data Security Assurance:</p>
                <p>
                  BanksCart uses 256-bit SSL encryption. We never share your phone number or financial documents with unverified third parties.
                </p>
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="bg-white p-8 lg:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
              <p className="text-sm text-slate-500">Common questions about BanksCart support and advisory services</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-sm font-bold text-slate-900">Does BanksCart charge fees for loan applications?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  No. BanksCart services are completely free for all borrowers. We do not levy any consultation, platform, or processing fees. All standard loan processing fees are charged solely by your chosen lending bank.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-sm font-bold text-slate-900">How do I track my submitted loan application status?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You can track your application status via our <Link to="/status" className="text-blue-600 font-medium hover:underline">Application Tracker</Link> using your registered mobile number and Application ID, or email support@bankscart.com.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-sm font-bold text-slate-900">Can I request deletion of my credit score data?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Yes. Under our data privacy policy, you have the right to request deletion of your stored user records and credit profile at any time by sending an email from your registered address to support@bankscart.com.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-sm font-bold text-slate-900">How can banks or financial institutions partner with BanksCart?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Scheduled commercial banks, NBFCs, and fintech lenders can connect with our institutional alliances team via <Link to="/become-partner" className="text-blue-600 font-medium hover:underline">Partner Program</Link> or email partners@bankscart.com.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default ContactUs;
