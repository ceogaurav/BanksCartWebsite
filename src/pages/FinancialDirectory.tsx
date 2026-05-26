import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, BookOpen, ChevronRight, Landmark, CreditCard, ShieldCheck, TrendingUp, Calculator, FileText, ArrowUpRight, AlertCircle, HeartPulse } from 'lucide-react';

interface DirectoryLink {
  name: string;
  href: string;
  desc: string;
  badge?: string;
}

interface DirectoryCategory {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  colorClass: string;
  accentClass: string;
  links: DirectoryLink[];
}

const FinancialDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories: DirectoryCategory[] = [
    {
      id: "aadhar",
      title: "Aadhaar Card Services Hub",
      desc: "UIDAI registrations, status tracking, biometric security, and local Seva Kendras directories.",
      icon: <ShieldCheck className="w-5 h-5" />,
      colorClass: "from-slate-800 via-indigo-900 to-slate-900 text-indigo-400 border-indigo-500/20",
      accentClass: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      links: [
        { name: "Aadhaar Portal Overview", href: "/aadhar-card", desc: "Complete official UIDAI guide to dynamic identity services." },
        { name: "Address Validation Request", href: "/aadhar-card/aadhaar-address-validation-letter-request", desc: "Update your Aadhaar address online without traditional physical proof." },
        { name: "Authentication Logs Guide", href: "/aadhar-card/aadhaar-authentication", desc: "Biometric e-KYC structures and direct database queries overview." },
        { name: "Authentication History", href: "/aadhar-card/aadhaar-authentication-history", desc: "Audit past six months' verification logs and block credit leaks." },
        { name: "Download & Print Aadhaar", href: "/aadhar-card/aadhaar-card-download-print", desc: "Generate secure password-protected e-Aadhaar PDFs instantly." },
        { name: "NRI Aadhaar Card Guide", href: "/aadhar-card/aadhaar-card-for-non-resident-indian", desc: "Enrolment eligibility rules and overseas passport mapping guides." },
        { name: "Official Application Form", href: "/aadhar-card/aadhar-form", desc: "Direct official download links for physical center updates." },
        { name: "Latest Policy News Room", href: "/aadhar-card/news", desc: "UIDAI amendments, free updates windows, and biometric age slabs." },
        { name: "PDF Password Unlock Guide", href: "/aadhar-card/aadhaar-card-password", desc: "Unlocking downloaded e-Aadhaar files under name and birth year combinations." },
        { name: "All Online Services List", href: "/aadhar-card/aadhaar-card-services", desc: "Comprehensive categorized catalog of official digital portals." },
        { name: "Demographic Corrections", href: "/aadhar-card/aadhaar-card-update-correction", desc: "Changing name spellings, dates of birth, and genders physically." },
        { name: "Aadhaar Card Verification", href: "/aadhar-card/aadhaar-card-verification", desc: "Verify card authenticity, home states, and active mobile digits." },
        { name: "J&K Aadhaar Centers", href: "/aadhar-card/aadhaar-centre-in-jammu-and-kashmir", desc: "Municipal and post-office directory for Jammu & Kashmir." },
        { name: "Correction Form Blueprint", href: "/aadhar-card/aadhaar-correction-form", desc: "Step-by-step instructions to fill out correction sheets cleanly." },
        { name: "Paperless e-KYC & XML", href: "/aadhar-card/aadhaar-kyc", desc: "Generate offline XML files and secure QR codes for bank KYC." },
        { name: "Permanent Centers Guide", href: "/aadhar-card/aadhaar-card-enrolment-centre", desc: "Locate permanent bank-run and post-office update desks." },
        { name: "How to Fill Enrolment Form", href: "/aadhar-card/how-to-fill-aadhaar-enrolment-form", desc: "Prevent transcription rejects by using block capital rules." },
        { name: "Dedicated Seva Kendras (ASK)", href: "/aadhar-card/aadhaar-seva-kendra", desc: "Dedicated high-capacity computerized UIDAI-run corporate hubs." },
        { name: "Aadhaar Update History", href: "/aadhar-card/aadhaar-update-history", desc: "Auditing previous lifetime demographic revisions online." },
        { name: "Helpline Directories (1947)", href: "/aadhar-card/aadhar-card-customer-care-number", desc: "Regional support helpdesks, central emails, and RBI ombudsman links." },
        { name: "Digital Signature Validator", href: "/aadhar-card/aadhar-card-signature", desc: "Validating Adobe green checkmarks for official dossiers." },
        { name: "Kolkata Aadhaar Centers", href: "/aadhar-card/aadhar-card-centers-in-kolkata", desc: "UIDAI registered update points in Kolkata municipal wards." },
        { name: "Chennai Aadhaar Centers", href: "/aadhar-card/aadhaar-card-centers-in-chennai", desc: "Locker and update offices directory in Chennai." },
        { name: "Gurgaon Aadhaar Centers", href: "/aadhar-card/aadhaar-card-centers-in-gurgaon", desc: "Corporate-run update kiosks in Gurgaon city." },
        { name: "Guwahati Aadhaar Centers", href: "/aadhar-card/aadhaar-card-centers-in-guwahati", desc: "District and municipal Seva desks in Guwahati." },
        { name: "Noida Aadhaar Centers", href: "/aadhar-card/aadhar-card-centers-in-noida", desc: "Post office and bank branches update points in Noida." },
        { name: "Aadhaar Card for Children", href: "/aadhar-card/aadhar-card-for-children", desc: "UIDAI blue Baal Aadhaar enrolment rules, age slabs, and documents." }
      ]
    },
    {
      id: "banking",
      title: "Scheduled & Private Banking Portals",
      desc: "Abhyudaya Co-Operative, Adani Finance portals, savings accounts, net banking, and branch timings.",
      icon: <Landmark className="w-5 h-5" />,
      colorClass: "from-emerald-950 via-teal-900 to-slate-950 text-emerald-400 border-emerald-500/20",
      accentClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      links: [
        { name: "Abhyudaya Bank Profile", href: "/abhyudaya-co-operative-bank", desc: "Complete multi-state Scheduled Co-operative banking profile." },
        { name: "Abhyudaya 24/7 Helpline", href: "/abhyudaya-co-operative-bank/customer-care", desc: "Toll-free board lines and hotlisting contact cards." },
        { name: "Education Loans Hub", href: "/abhyudaya-co-operative-bank/education-loan", desc: "Studies in India and abroad funding programs with post-study moratoriums." },
        { name: "High-Yield Fixed Deposits", href: "/abhyudaya-co-operative-bank/fixed-deposits", desc: "Book cumulative and non-cumulative deposits up to 7.25% p.a." },
        { name: "Grievance Redressal Matrix", href: "/abhyudaya-co-operative-bank/grievance-redressal-escalation-matrix", desc: "Level-by-level escalation to regional heads and RBI Ombudsman." },
        { name: "Personal Loans Desk", href: "/abhyudaya-co-operative-bank/personal-loan", desc: "Unsecured reducing balance multi-purpose credit lines up to ₹15 Lakhs." },
        { name: "Savings Accounts Tiers", href: "/abhyudaya-co-operative-bank/savings-account", desc: "High-yield digital accounts, MAB guidelines, and free RuPay cards." },
        { name: "Business & MSME Loans", href: "/abhyudaya-co-operative-bank/business-loan", desc: "Working capital Cash Credits and collateral-free Mudra backing." },
        { name: "Home Loans Mortgage", href: "/abhyudaya-co-operative-bank/home-loan", desc: "Floating housing finance up to 30 years with LTV up to 90%." },
        { name: "Mortgage Support Desk", href: "/abhyudaya-co-operative-bank/home-loan-customer-care", desc: "Interest certificates downloads and balance transfer queries." },
        { name: "Net Banking Security Guide", href: "/banking/abhyudaya-bank-net-banking", desc: "Access accounts, reset passwords, and transfer NEFT/IMPS securely." },
        { name: "Branch Working Hours", href: "/banking/abhyudaya-bank-timings", desc: "Opening schedules, cash transaction slots, and rotational lunch breaks." },
        { name: "Adani Capital SME Loans", href: "/business-loan/adani-capital", desc: "Unsecured micro retail capital and agro vehicle finance." },
        { name: "Adani Housing Finance", href: "/home-loan/adani-housing-finance", desc: "Affordable housing mortgages and flexible self-employed evaluation." },
        { name: "Accounts Payable (AP)", href: "/banking/accounts-payable", desc: "Complete corporate accounting and treasury cash flow guidelines." },
        { name: "Account to Account Money Transfer", href: "/money-transfer/account-to-account-money-transfer", desc: "Reconcile processing times and limits across IMPS, NEFT, and RTGS." },
        { name: "Apparel Export Promotion Council", href: "/promotion-councils/apparel-export-promotion-council-aepc", desc: "National textile export promotions, subventions, and exporter guide slabs." },
        { name: "Agarbatti Manufacturing Mudra", href: "/business-loan/agarbatti-making-business", desc: "Start micro Agarbatti trading with collateral-free Mudra credit up to ₹10 Lakhs." },
        { name: "Agriculture Crop Loan Guide", href: "/personal-loan/agriculture-loan", desc: "Subsidized farm cultivation credits and Kisan Credit Card (KCC) limits." },
        { name: "Agri-Business Startup Finance", href: "/business-loan/agriculture-business-plan", desc: "Detailed business blueprints for securing NABARD priority sector grants." },
        { name: "Agriculture Gold Loan Subsidies", href: "/gold-loan/agriculture", desc: "Pledge gold ornaments to receive rapid cultivation cash at flat 7.00% p.a." },
        { name: "Agri Crop Interest Rates Table", href: "/personal-loan/agriculture-loan-interest-rates", desc: "Compare prompt repayment subventions across public and private banks." },
        // Allahabad bank subpages
        { name: "Allahabad Bank Profile", href: "/allahabad-bank", desc: "Access official financial details, merger updates, and retail accounts for Allahabad Bank." },
        { name: "Allahabad Bank Account Number Format", href: "/banking/allahabad-bank-account-number", desc: "Detailed specs on Allahabad Bank retail and corporate account structures." },
        { name: "Allahabad Bank Balance Enquiry", href: "/banking/allahabad-bank-balance-enquiry-number", desc: "Give a missed call or send an SMS to check your Allahabad account balance instantly." },
        { name: "Allahabad Bank Car Loan Rates", href: "/allahabad-bank/car-loan", desc: "Secure affordable car loans under reducing interest rate slabs." },
        { name: "Allahabad Bank Card Bill Payment", href: "/allahabad-bank/credit-card-bill-payment", desc: "Pay your credit card outstanding statement balance securely online." },
        { name: "Allahabad Bank Customer Support", href: "/allahabad-bank/customer-care", desc: "Toll-free helplines, board lines, lost card hotlisting, and Nodal Officers." },
        { name: "Allahabad Bank Education Loans", href: "/allahabad-bank/education-loan", desc: "Fund higher education in India or abroad with post-study moratoriums." },
        { name: "Allahabad Bank Fixed Deposits", href: "/allahabad-bank/fixed-deposits", desc: "Book cumulative and non-cumulative deposits up to 7.30% p.a." },
        { name: "Allahabad Bank Gold Loans Desk", href: "/allahabad-bank/gold-loan", desc: "Pledge gold ornaments to receive immediate credit with minimal paperwork." },
        { name: "Allahabad Bank Kisan Credit Card", href: "/allahabad-bank/kisan-credit-card", desc: "Subsidized priority sector cultivation crop credits for farmers." },
        { name: "Allahabad Bank Mudra MSME Credits", href: "/allahabad-bank/mudra-loan", desc: "Collateral-free government-backed MSME business loans up to ₹10 Lakhs." },
        { name: "Allahabad Bank NEFT Form Download", href: "/banking/allahabad-bank-neft-form", desc: "Official PDF forms and transaction guides for branch money transfers." },
        { name: "Allahabad Bank NetBanking Setup", href: "/banking/allahabad-bank-net-banking-registration", desc: "Step-by-step self-registration guide for retail net banking portals." },
        { name: "Allahabad Bank Net Banking Login", href: "/banking/allahabad-bank-netbanking", desc: "Access accounts securely 24/7, reset passwords, and manage funds online." },
        { name: "Allahabad Bank Passbook Printing", href: "/banking/allahabad-bank-passbook", desc: "Automatic passbook printing kiosks, transaction statements, and e-Passbooks." },
        { name: "Allahabad Bank Application Status", href: "/allahabad-bank/status", desc: "Track pending retail credit applications and document verifications online." },
        { name: "Allahabad Bank RTGS Form Download", href: "/banking/allahabad-bank-rtgs-form", desc: "Secure high-value domestic payment forms and transfer limits." },
        { name: "Allahabad Bank Working Hours", href: "/banking/allahabad-bank-timings", desc: "Verified branch operational times, locker slots, and lunch breaks." },
        { name: "Allahabad Bank Corporate Banking", href: "/banking/allahabad-corporate-net-banking", desc: "Treasury management, high-limit transactions, and multi-user setups." },
        { name: "Allahabad Bank Savings Account", href: "/savings-account/allahabad-bank-normal-savings-account", desc: "Traditional savings accounts, interest margins, and free RuPay cards." },
        // Andhra bank subpages
        { name: "Andhra Bank Profile", href: "/andhra-bank", desc: "Access official financial details, merger updates, and retail accounts for Andhra Bank." },
        { name: "Andhra Bank Account Digit specs", href: "/banking/andhra-bank-account-number", desc: "Locate account formats and IFSC designations post-merger." },
        { name: "Andhra Bank Balance Enquiry", href: "/banking/andhra-bank-balance-enquiry", desc: "Instant missed call helplines to check Andhra Bank statement details." },
        { name: "Andhra Bank Business Loans", href: "/andhra-bank/business-loan", desc: "SME finance, cash credits, and machinery loans with easy approvals." },
        { name: "Andhra Bank Car Loan Rates", href: "/andhra-bank/car-loan", desc: "Finance new or used vehicles with long tenures and low EMIs." },
        { name: "Andhra Bank Classic Card Tiers", href: "/andhra-bank/classic-credit-card", desc: "Low-fee premium classic credit cards with robust domestic rewards." },
        { name: "Andhra Bank Credit Cards Hub", href: "/andhra-bank/credit-card", desc: "Compare classic, gold, and platinum cards from Andhra Bank." },
        { name: "Andhra Bank Card Helpline", href: "/andhra-bank/credit-card-customer-care-number", desc: "Dedicated card blocking lines and grievance resolution matrices." },
        { name: "Andhra Bank Card Bill Payment", href: "/andhra-bank/credit-card-bill-payment", desc: "Pay credit card statement outstanding balances securely online." },
        // Other banking subpages
        { name: "Savings Account Comparison", href: "/savings-account/all-banks", desc: "Compare savings account interest rates and balance slabs across all major Indian banks." },
        { name: "Airtel Money Wallet App Guide", href: "/airtel-money-wallet-app", desc: "Wallet spending limits, video-KYC upgrades, and utility cashbacks." },
        { name: "Andhra Credit Card Payment Desk", href: "/andhra-bank/credit-card-payment-bill-desk", desc: "Pay your Andhra Bank credit card bills online via BillDesk securely." },
        { name: "Andhra Card Reward Points", href: "/andhra-bank/credit-card-reward-points", desc: "Redeem accumulated Andhra Bank credit card reward points on the catalog." },
        { name: "Andhra Bank Customer Care", href: "/andhra-bank/customer-care", desc: "Escalate card billing, retail balance queries, and disputes to toll-free boards." },
        { name: "Andhra DD Issuance Charges", href: "/banking/andhra-bank-dd-charges", desc: "Review Demand Draft fee slabs, cancellations, and revalidation rules." },
        { name: "Andhra High-Yield FDs", href: "/andhra-bank/fixed-deposits", desc: "Book cumulative fixed deposits up to 7.75% p.a. under DICGC security." },
        { name: "Andhra Bank Gold Loans", href: "/andhra-bank/gold-loan", desc: "Pledge gold jewelry to secure instant agricultural or personal funding." },
        { name: "Andhra Bank Home Loans", href: "/andhra-bank/home-loan", desc: "Floating rate housing mortgages with tenures extending up to 30 years." },
        { name: "Andhra IMPS Transfer Charges", href: "/banking/andhra-bank-imps-charges", desc: "Track digital transaction fees and processing limits for IMPS." },
        { name: "Andhra Kisan Credit Card", href: "/andhra-bank/kisan-credit-card", desc: "Subsidized seasonal crop cultivation credits at flat 4% p.a." },
        { name: "Andhra Bank Mudra Credits", href: "/andhra-bank/mudra-loan", desc: "Collateral-free commercial loans up to ₹10 Lakhs under sovereign cover." },
        { name: "Andhra NEFT Transfer Charges", href: "/banking/andhra-bank-neft-charges", desc: "Review RBI online transaction limits and branch NEFT charges." },
        { name: "Andhra Bank NEFT PDF Form", href: "/banking/andhra-bank-neft-form", desc: "Download physical branch transaction challans for NEFT transfers." },
        { name: "Andhra NetBanking Login Desk", href: "/banking/andhra-bank-net-banking-login", desc: "Access retail and corporate online banking securely using dynamic OTPs." },
        { name: "Andhra NetBanking Registration", href: "/banking/andhra-bank-netbanking", desc: "Step-by-step registration instructions to activate digital banking online." },
        { name: "Andhra Pensioner Personal Loan", href: "/andhra-bank/pension-loan", desc: "Concessional credit lines for retired state and central government employees." },
        { name: "Andhra Loan Application Status", href: "/andhra-bank/status", desc: "Track pending retail credit applications and property verifications." },
        { name: "Andhra Platinum Credit Card", href: "/andhra-bank/andhra-bank-platinum-credit-card", desc: "Verify rewards, dining deals, and annual fee waivers on Platinum cards." },
        { name: "Andhra Bank RTGS PDF Form", href: "/banking/andhra-bank-rtgs-form", desc: "Download high-value domestic transfer challan slips for branches." },
        { name: "Andhra Signature Credit Card", href: "/andhra-bank/signature-credit-card", desc: "HNW cards offering premium airport lounge access and golf rounds." },
        { name: "Andhra Account e-Statements", href: "/banking/andhra-bank-statement", desc: "Download monthly bank ledger lists, e-passbooks, and account audits." },
        { name: "Andhra Bank Branch Timings", href: "/banking/andhra-bank-timings", desc: "Check post-merger branch hours, teller schedules, and locker timings." },
        { name: "Open Digital Bank Account", href: "/banking/apply-for-bank-account-online", desc: "Open high-yield savings accounts online instantly via video KYC." },
        { name: "Axis ASAP Video KYC Digital Account", href: "/banking/axis-asap-digital-account-video-kyc", desc: "Complete guide to open Axis ASAP digital savings account instantly via video KYC." },
        { name: "Axis Bank Account Number Format", href: "/banking/axis-bank-account-number", desc: "Understand digits specs and post-merger formats of Axis bank accounts." },
        { name: "Axis Bank Balance Enquiry Missed Call", href: "/banking/axis-bank-balance-enquiry", desc: "Give a missed call or send an SMS to check your Axis account balance instantly." },
        { name: "Axis Bank Corporate Net Banking", href: "/banking/axis-bank-corporate-net-banking", desc: "Advanced corporate treasury, multi-user authorizations and payment gateways." },
        { name: "Axis Bank DD Issuance Charges", href: "/banking/axis-bank-dd-charges", desc: "Demand Draft fee slabs, cancellation terms and revalidation limits." },
        { name: "Axis Bank Branch Holidays Calendar", href: "/banking/axis-bank-holidays", desc: "Annual state-wise operational closures list under Negotiable Instruments Act." },
        { name: "Axis Bank IMPS Slabs & Limits", href: "/banking/axis-bank-imps-charges", desc: "Real-time Immediate Payment Service transaction fees and daily caps." },
        { name: "Axis Bank Mini Statement SMS", href: "/banking/axis-bank-mini-statement", desc: "Fast SMS formats and missed call numbers to audit past 5 transactions." },
        { name: "Axis MMID Mobile Payment Routing", href: "/banking/mmid-axis-bank", desc: "Generate Mobile Money Identifier codes online for direct bank routing." },
        { name: "Axis Bank Mobile App Security", href: "/banking/axis-bank-mobile-banking", desc: "Configure secure biometrics, transaction locks, and transfers inside mobile suite." },
        { name: "Axis Bank NEFT physical form download", href: "/banking/axis-bank-neft-form", desc: "Challan slips and branch transaction checklists for NEFT payments." },
        { name: "Axis Bank NEFT Transaction Charges", href: "/banking/axis-bank-neft-charges", desc: "Review processing charges, limits, and settlement windows for NEFT." },
        { name: "Axis Bank Net Banking Portal Login", href: "/banking/axis-bank-net-banking", desc: "Self-register retail net banking securely to manage assets 24/7." },
        { name: "Axis Bank RTGS Form PDF Download", href: "/banking/axis-bank-rtgs-form", desc: "Physical transaction forms for offline high-value gross settlements." },
        { name: "Axis Bank Account Statement", href: "/banking/axis-bank-statement", desc: "Download annual tax certificates, interest sheets, and monthly ledger records." },
        { name: "Axis Bank Branch Timings", href: "/banking/axis-bank-timings", desc: "Operational hours, lunch breaks, and locker accessibility schedules." },
        { name: "Axis Bank UPI App Portal", href: "/upi/axis-bank-upi-app", desc: "Configure BHIM Axis Pay app, link multiple accounts, and scan QR payments." },
        { name: "Axis Bank UPI Limits & QR scanner", href: "/upi/axis-upi", desc: "Real-time peer-to-peer transfers using secure UPI IDs and scan protocols." },
        { name: "Bandhan Bank Balance Check", href: "/banking/bandhan-bank-balance-enquiry", desc: "Missed call and SMS formats to instantly verify Bandhan savings balance." },
        { name: "Bandhan Bank Net Banking New User", href: "/banking/bandhan-bank-net-banking-new-user", desc: "Step-by-step digital activation guide for first-time retail banking clients." },
        { name: "Bank Account Number Formats in India", href: "/banking/bank-account-number", desc: "Comprehensive structural specs of retail account digits across all major Indian banks." },
        { name: "National Bank Holidays Master Calendar", href: "/banking/bank-holidays", desc: "Consolidated list of central gazetted closures, Sundays, and Saturday limits." },
        { name: "Bank Holidays Lok Sabha Elections", href: "/banking/bank-holidays-lok-sabha-elections-2019", desc: "Audit municipal voting closures and state election holiday lists." },
        { name: "AP Bank Holidays Calendar", href: "/banking/bank-holidays-andhra-pradesh-2022", desc: "Regional gazetted holidays and Saturdays off in Andhra Pradesh state." },
        { name: "Bank Holidays April 2019", href: "/banking/bank-holidays-april-2019", desc: "Monthly operational closures list including Good Friday and Ram Navami." },
        { name: "Bank Holidays April 2020", href: "/banking/bank-holidays-april-2020", desc: "Verified holiday calendars for retail branch planning." },
        { name: "Bank Holidays April 2022", href: "/banking/bank-holidays-april-2022", desc: "Central bank schedules and state festivals list for April." },
        { name: "Arunachal Bank Holidays", href: "/banking/bank-holidays-arunachal-pradesh", desc: "State gazetted holidays and weekend closures list in Arunachal Pradesh." },
        { name: "Assam Bank Holidays Calendar", href: "/banking/bank-holidays-assam", desc: "Bihu festivals and regional state holidays calendar in Assam." },
        { name: "Assam Bank Holidays 2019", href: "/banking/bank-holidays-assam-2019", desc: "Historical state-level holiday records and festival closures." },
        { name: "Bank Holidays August 2020", href: "/banking/bank-holidays-august-2020", desc: "Independence Day and Raksha Bandhan bank closures." },
        { name: "Bank Holidays August 2019", href: "/banking/bank-holidays-august-2019", desc: "Regional calendars, Janmashtami and corporate clearing schedules." },
        { name: "Bengaluru Bank Holidays", href: "/banking/bank-holidays-bengaluru", desc: "Locker and branch operational holidays in Bengaluru municipal zones." },
        { name: "Bihar Bank Holidays Calendar", href: "/banking/bank-holidays-bihar-2022", desc: "Chhath Puja and regional state holidays checklist in Bihar." },
        { name: "Chennai Bank Holidays Hub", href: "/banking/bank-holidays-chennai", desc: "Pongal and Tamil Nadu state closures directory in Chennai." },
        { name: "Bank Holidays December 2019", href: "/banking/bank-holidays-december-2019", desc: "Christmas and winter calendar closures across retail zones." },
        { name: "Bank Holidays December 2020", href: "/banking/bank-holidays-december-2020", desc: "Year-end bank accounting and central holiday shutdowns." },
        { name: "Bank Holidays February 2020", href: "/banking/bank-holidays-february-2020", desc: "Maha Shivratri closures and second Saturday holiday lists." },
        { name: "Gujarat Bank Holidays Calendar", href: "/banking/bank-holidays-in-gujarat", desc: "Navratri and state-specific merchant closures list in Gujarat." },
        { name: "Haryana Bank Holidays", href: "/banking/bank-holidays-haryana", desc: "Regional Haryana state government gazetted bank holidays calendar." },
        { name: "Hyderabad Bank Holidays", href: "/banking/bank-holidays-hyderabad", desc: "Locker and clearing branch shutdowns in Hyderabad city." },
        { name: "Bank Holidays January 2020", href: "/banking/bank-holidays-january-2020", desc: "Republic Day and Makar Sankranti monthly closures list." },
        { name: "Jharkhand Bank Holidays Calendar", href: "/banking/bank-holidays-jharkhand", desc: "State tribal festivals and central bank closures list in Jharkhand." },
        { name: "Bank Holidays July 2020", href: "/banking/bank-holidays-july-2020", desc: "Mid-year corporate ledger balances and state festivals." },
        { name: "Bank Holidays July 2019", href: "/banking/bank-holidays-july-2019", desc: "Standard weekly schedules and clearing batches details." },
        { name: "Bank Holidays June 2020", href: "/banking/bank-holidays-june-2020", desc: "Second and fourth Saturday bank closures calendar for June." },
        { name: "Bank Holidays June 2019", href: "/banking/bank-holidays-june-2019", desc: "Historical transactional data and holiday clearing updates." },
        { name: "Karnataka Bank Holidays", href: "/banking/bank-holidays-karnataka", desc: "State government gazetted bank holidays list in Karnataka." },
        { name: "Kerala Bank Holidays 2019", href: "/banking/bank-holidays-kerala-2019", desc: "Onam and state-level festival closures records in Kerala." },
        { name: "Kerala Bank Holidays Calendar", href: "/banking/bank-holidays-kerala", desc: "Comprehensive state holiday directories and Saturday caps in Kerala." },
        { name: "Maharashtra Bank Holidays", href: "/banking/bank-holidays-maharashtra", desc: "Ganesh Chaturthi and state-specific corporate shutdowns in Maharashtra." },
        { name: "Manipur Bank Holidays Calendar", href: "/banking/bank-holidays-manipur", desc: "Eastern regional state closures and Saturday schedules in Manipur." },
        { name: "Bank Holidays March 2019", href: "/banking/bank-holidays-march-2019", desc: "Holi closures and financial year closing audits list." },
        { name: "Bank Holidays March 2020", href: "/banking/bank-holidays-march-2020", desc: "Monthly bank holidays list and year-end closing files." },
        { name: "Bank Holidays May 2019", href: "/banking/bank-holidays-may-2019", desc: "Labour Day and regional central bank closures list." },
        { name: "Bank Holidays May 2020", href: "/banking/bank-holidays-may-2020", desc: "Summer festival calendars and Saturday operations schedules." },
        { name: "Meghalaya Bank Holidays", href: "/banking/bank-holidays-meghalaya", desc: "State gazetted bank holidays calendar and locker hours in Meghalaya." },
        { name: "Mizoram Bank Holidays Calendar", href: "/banking/bank-holidays-mizoram", desc: "Eastern state festival closures and bank holiday charts in Mizoram." },
        { name: "Nagaland Bank Holidays", href: "/banking/bank-holidays-nagaland", desc: "Hornbill festival and local state closures directory in Nagaland." },
        { name: "North Eastern States Holidays", href: "/banking/bank-holidays-north-eastern-states", desc: "Consolidated holiday lists for Mizoram, Nagaland, and Meghalaya." },
        { name: "Bank Holidays November 2019", href: "/banking/bank-holidays-november-2019", desc: "Diwali closures and Guru Nanak Jayanti monthly schedules." },
        { name: "Bank Holidays November 2020", href: "/banking/bank-holidays-november-2020", desc: "Autumn festival bank holiday closures list for November." },
        { name: "Bank Holidays October 2019", href: "/banking/bank-holidays-october-2019", desc: "Dussehra closures and Gandhi Jayanti bank holiday files." },
        { name: "Bank Holidays October 2020", href: "/banking/bank-holidays-october-2020", desc: "National festival shutdowns and Saturday schedules." },
        { name: "Odisha Bank Holidays Calendar", href: "/banking/bank-holidays-odisha", desc: "Rath Yatra and state-specific bank closures list in Odisha." },
        { name: "Punjab Bank Holidays", href: "/banking/bank-holidays-punjab", desc: "Baisakhi and state government gazetted holiday lists in Punjab." },
        { name: "Bank Holidays September 2020", href: "/banking/bank-holidays-september-2020", desc: "Onam and monthly bank holiday schedules for September." },
        { name: "Bank Holidays September 2019", href: "/banking/bank-holidays-september-2019", desc: "Regional state festivals and weekly Saturday bank caps." },
        { name: "Tamil Nadu Bank Holidays", href: "/banking/bank-holidays-tamil-nadu", desc: "Pongal and state government bank holiday lists in Tamil Nadu." },
        { name: "Telangana Bank Holidays Calendar", href: "/banking/bank-holidays-telangana", desc: "Bonalu and state-specific bank closures list in Telangana." },
        { name: "Tripura Bank Holidays", href: "/banking/bank-holidays-tripura", desc: "Durga Puja and state government gazetted closures in Tripura." },
        { name: "Uttar Pradesh Bank Holidays", href: "/banking/bank-holidays-uttar-pradesh", desc: "UP state government bank holiday schedules and branch hours." },
        { name: "Uttarakhand Bank Holidays", href: "/banking/bank-holidays-uttarakhand", desc: "Uttarakhand state gazetted bank holidays list and locker slots." },
        { name: "West Bengal Bank Holidays", href: "/banking/bank-holidays-west-bengal", desc: "Durga Puja and state government closures calendar in West Bengal." },
        { name: "Saturdays Off Calendar 2019", href: "/banking/bank-holidays-saturday-2019", desc: "Complete list of 2nd and 4th Saturday bank closures in 2019." },
        { name: "Saturdays Off Calendar 2020", href: "/banking/bank-holidays-saturday-2020", desc: "Complete list of 2nd and 4th Saturday bank closures in 2020." },
        { name: "Bank of Baroda Profile Overview", href: "/bank-of-baroda", desc: "Sovereign public sector giant financial data, operations, and savings." },
        { name: "Bank of Baroda Account Numbers", href: "/banking/bank-of-baroda-account-number", desc: "Understand Bob retail digits formats and IFSC post-merger mappings." },
        { name: "Bank of Baroda Balance Check Number", href: "/banking/bank-of-baroda-account-balance-check", desc: "Instant missed call and SMS numbers to audit Bob savings ledger." },
        { name: "Bank of Baroda Customer Care Helplines", href: "/bank-of-baroda/customer-care", desc: "24/7 toll-free support boards, credit card hotlines and regional heads." },
        { name: "Bank of Baroda Debit Cards Catalog", href: "/bank-of-baroda/debit-card", desc: "Rupay, Visa, and Mastercard debit tiers, ATM limits and cashbacks." },
        { name: "Bank of Baroda Demat Services", href: "/bank-of-baroda/demat-account", desc: "3-in-1 retail investment account, trading options and stock brokers." },
        { name: "Bank of Baroda EaseMyTrip Debit Card", href: "/bank-of-baroda/easemytrip-debit-card", desc: "Co-branded travel debit card offering flight rebates and lounge benefits." },
        { name: "Bank of Baroda Grievance Escalation Matrix", href: "/bank-of-baroda/grievance-redressal-escalation-matrix", desc: "Raise billing disputes to nodal officers and RBI integrated ombudsman." },
        { name: "Bank of Baroda Branch Holidays List", href: "/banking/bank-of-baroda-holidays", desc: "Annual state-level holiday closures calendar for Bank of Baroda." },
        { name: "Bank of Baroda Mini Statement SMS", href: "/banking/bank-of-baroda-mini-statement", desc: "Settle past 5 transaction logs dynamically via missed call IVR." },
        { name: "Bank of Baroda Mobile Banking App", href: "/banking/bank-of-baroda-mobile-banking", desc: "Configure bob World app securely to pay bills and invest capital." },
        { name: "Bank of Baroda NetBanking Portal Registration", href: "/banking/bank-of-baroda-netbanking", desc: "Manage balances, transfer NEFT/IMPS and book FDs securely 24/7." },
        { name: "Bank of Baroda Branch Timings", href: "/banking/bank-of-baroda-timings", desc: "Operational hours, teller counters shifts, and locker schedules." },
        { name: "Bank of India Corporate Profile", href: "/bank-of-india", desc: "Public sector banking giant retail lending, credit and deposits." },
        { name: "Bank of India Account Number Specs", href: "/banking/bank-of-india-account-number", desc: "Format parameters and post-merger IFSC code mapping for BOI." },
        { name: "Bank of India Balance Check IVR", href: "/banking/bank-of-india-account-balance-check", desc: "Toll-free missed call system to instantly audit BOI ledger sheets." },
        { name: "Bank of India Account Statement SMS", href: "/banking/bank-of-india-account-statement", desc: "Email registers, monthly ledger updates and SMS banking formats." },
        { name: "Bank of India Customer Care Desk", href: "/bank-of-india/customer-care", desc: "24/7 toll-free support boards, block lost debit cards, and emails." },
        { name: "Bank of India Debit Cards Range", href: "/bank-of-india/debit-card", desc: "Classic, gold, and platinum debit tiers, ATM rules and dining deals." },
        { name: "Bank of India Grievance Redressal Matrix", href: "/bank-of-india/grievance-redressal-escalation-matrix", desc: "Nodal officer escalations and RBI banking ombudsman dispute portals." }
      ]
    },
    {
      id: "loans-cibil",
      title: "Loans & CIBIL Bureau Insights",
      desc: "Free CIBIL checks, PAN validation guides, high-ticket personal credit lines, and eligibility builders.",
      icon: <TrendingUp className="w-5 h-5" />,
      colorClass: "from-blue-900 via-indigo-950 to-slate-950 text-blue-400 border-blue-500/20",
      accentClass: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      links: [
        { name: "Check Free Credit Score", href: "/credit-score", desc: "Check credit scores across all 4 bureaus online with monthly updates." },
        { name: "Free CIBIL Report Portal", href: "/cibil-credit-report", desc: "Detailed credit audit log checking payment defaults." },
        { name: "CIBIL Check by PAN Card", href: "/cibil/how-to-check-cibil-score-by-pan-card", desc: "Skip security questions by using secure PAN database matches." },
        { name: "SBI CIBIL Score Metrics", href: "/cibil-report/cibil-score-sbi-loans", desc: "Uncover mandatory score tiers to secure cheapest SBI mortgages." },
        { name: "7 Steps to Improve CIBIL", href: "/credit-report/ways-to-improve-your-cibil-score", desc: "Practical credit repair blueprints to boost rating to 750+." },
        { name: "Personal Loan CIBIL Rules", href: "/credit-score/cibil-score-for-personal-loan", desc: "How score drops shift loan yields and boost reject probabilities." },
        { name: "Resolve CIBIL Dispute logs", href: "/cibil/how-to-resolve-cibil-dispute", desc: "Rectify wrong bureau records and clear duplicate account tags." },
        { name: "Personal Loans Overview", href: "/loans/personal", desc: "Compare best personal loans from 40+ banks entirely online." },
        { name: "Aadhaar Card Loan", href: "/personal-loan/aadhar-card-loan", desc: "Unsecured personal credits processed using biometric e-KYC profiles." },
        { name: "₹1 Crore Personal Loan", href: "/personal-loan/1-crore-personal-loan-plamt", desc: "Premium ultra-high-ticket credit lines for high-salary profiles." },
        { name: "₹30 Lakh Personal Loan", href: "/personal-loan/30-lakh-personal-loan-plamt", desc: "High-value unsecured credit comparing HDFC, ICICI, and SBI." },
        { name: "Pre-approved Loan Secrets", href: "/6-key-insights-know-pre-approved-personal-loans", desc: "Master instant pre-approved digital releases and prevent traps." },
        { name: "Low-Salary Home Loans", href: "/blogs/Low-Salary-Home-Loan-Guide", desc: "Co-borrower additions and state subsidies for low salary brackets." },
        { name: "Collateral-Free MSME Credit", href: "/blogs/MSME-Loan-Without-Collateral", desc: "Sovereign CGTMSE guarantees and Udyam paper concessions." },
        { name: "Startup Loan Blueprint", href: "/blogs/Startup-Loan-Blueprint", desc: "Secure initial debt financing for new ventures." },
        { name: "Aditya Birla Marriage Loan", href: "/personal-loan/aditya-birla-finance-limited-marriage-loan", desc: "Instant wedding funding up to ₹15 Lakhs under reducing interest rates." },
        { name: "Aditya Birla Securities Overdraft", href: "/loan-against-securities/mutual-funds/aditya-birla-finance", desc: "Secure instant overdraft limits by pledging mutual funds and shares." },
        { name: "Aditya Birla Personal Loan", href: "/aditya-birla/personal-loan", desc: "Flexible unsecured personal credit lines up to ₹50 Lakhs processed digitally." },
        { name: "Personal Loan Documents Check", href: "/aditya-birla/personal-loan-documents-required", desc: "Complete checklists of KYC, income, and bank statement proofs." },
        { name: "Aditya Birla Personal Loan EMI", href: "/aditya-birla/personal-loan-emi-calculator", desc: "Simulate EMI amounts and compile reducing interest amortizations." },
        { name: "Aditya Birla Foreclosure Policy", href: "/personal-loan/aditya-birla-finance-limited-personal-loan-foreclosure-charges", desc: "Track lock-in periods, pre-payment slabs, and interest saving rules." },
        { name: "Aditya Birla Home Loan mortgage", href: "/aditya-birla/home-loan", desc: "Housing mortgages with flexible LTV up to 90% and tenure up to 30 years." },
        { name: "Aditya Birla Home Loan Interest", href: "/aditya-birla/home-loan-interest-rates", desc: "Track floating interest matrices for salaried and self-employed applicants." },
        { name: "Loan Against Property (LAP)", href: "/aditya-birla/loan-against-property", desc: "High-value commercial and residential mortgage credits up to ₹10 Crores." },
        { name: "Ambit Business Loans Portal", href: "/business-loan/ambit", desc: "Expedited digital clearances for commercial SME credits and cash flows." },
        { name: "ATUFS Textile Credit Scheme", href: "/business-loan/amended-technology-upgradation-fund-scheme-atufs", desc: "Sovereign textile machine upgrade capital and interest equalizer guides." },
        { name: "Andhra PL EMI Calculator", href: "/personal-loan/andhra-bank-personal-loan-emi-calculator", desc: "Simulate monthly reducing balance personal loan payouts and amortizations." },
        { name: "Andhra Loan Pre-closure Fees", href: "/personal-loan/andhra-bank-personal-loan-pre-closure-charges", desc: "Verify prepayment lock-in terms and foreclosure penalties." },
        { name: "Annapurna Micro Escalation", href: "/annapurna-microfinance/grievance-redressal-escalation-matrix", desc: "Track microfinance complaint resolution pipelines and Nodal Officers." },
        { name: "Annapurna Microfinance Hub", href: "/annapurna-microfinance", desc: "Access rural development loans, self-help groups, and agricultural credits." },
        { name: "AP IGRS Encumbrance Search", href: "/home-loan/igrs-andhra-pradesh-encumbrance-certificate", desc: "Search property encumbrances and title deeds on Andhra Pradesh's IGRS portal." },
        { name: "Gujarat AnyROR Land Records", href: "/home-loan/anyror-anywhere-gujarat-land-records", desc: "Download official 7/12 ROR property records online in Gujarat." },
        { name: "Rajasthan Jamabandi Land Records", href: "/home-loan/apna-khata-rajasthan-land-records", desc: "Access property ownership titles on Rajasthan's Apna Khata portal." },
        { name: "Aptus Housing Finance Care", href: "/home-loan/aptus-housing-finance-home-loan-customer-care", desc: "Secure housing interest certificates, statements, and support numbers." },
        { name: "Aptus Affordable Home Mortgages", href: "/home-loan/aptus-housing-finance", desc: "Finance low-cost residential acquisitions and home construction limits." },
        { name: "₹5 Lakh Personal Credit Line", href: "/personal-loan/5-lakh", desc: "Compare low-interest ₹5 Lakh unsecured personal loan slabs online." },
        { name: "Axis Credit Card Loan Desk", href: "/personal-loan/axis-bank-credit-card-loan", desc: "Access pre-approved instant cash loans on your active Axis credit card limit." },
        { name: "Axis Bank Gold Loans", href: "/axis-bank/gold-loan", desc: "Pledge physical gold to secure instant low-interest farm or personal capital." },
        { name: "Axis Bank Gold Loan Interest Rates", href: "/axis-bank/gold-loan-interest-rate", desc: "Review current per-gram gold valuation margins and interest rates." },
        { name: "Axis Bank Home Loan Portfolio", href: "/axis-bank/home-loan", desc: "EBLR floating rate housing mortgages up to 30 years and 90% LTV." },
        { name: "Axis Bank Home Loan Balance Transfer", href: "/axis-bank/home-loan-balance-transfer", desc: "Migrate existing high-interest housing loans with zero processing fees." },
        { name: "Axis Bank Home Loan Eligibility", href: "/axis-bank/home-loan-eligibility", desc: "Minimum salary criteria, age caps, and credit score brackets for mortgages." },
        { name: "Axis Bank Home Loan EMI Calculator", href: "/axis-bank/home-loan/emi-calculator", desc: "Simulate mortgage payouts and compile complete reducing balances logs." },
        { name: "Axis Bank Home Loan Interest Slabs", href: "/axis-bank/home-loan-interest-rates", desc: "Track current Repo-Linked Lending Rate (RLLR) home loan matrices." },
        { name: "Axis Bank Home Loan Statement PDF", href: "/axis-bank/home-loan-statement", desc: "Download home loan interest certificates online for tax exemptions." },
        { name: "Axis Bank Home Loan Application Status", href: "/axis-bank/home-loan-status", desc: "Track pending mortgage reviews, properties technical verification, and approvals." },
        { name: "Axis Bank Kisan Credit Card (KCC)", href: "/axis-bank/kisan-credit-card", desc: "Subsidized farm crop credit lines at flat 4% p.a. prompt repayment." },
        { name: "Axis Bank Loan Against Fixed Deposits", href: "/axis-bank/loan-against-fixed-deposits", desc: "Avail instant cash credit or overdraft up to 90% of FD value." },
        { name: "Axis Bank Loan Against Property (LAP)", href: "/axis-bank/loan-against-property", desc: "Unleash commercial or residential real estate value up to ₹5 Crores." },
        { name: "Axis Bank Personal Loan", href: "/axis-bank/personal-loan", desc: "Unsecured retail credit up to ₹40 Lakhs with paperless 10-min approvals." },
        { name: "Axis Bank Personal Loan Care Cell", href: "/axis-bank/personal-loan-customer-care-number", desc: "Dedicated retail loan dispute boards, statement updates and escalations." },
        { name: "Axis Bank Personal Loan Documents Checklist", href: "/axis-bank/personal-loan/documents-required", desc: "Audit structural checklists of income, KYC, and employment records." },
        { name: "Axis Bank Personal Loan Eligibility Check", href: "/personal-loan/axis-bank-personal-loan-eligibility", desc: "CIBIL ratings thresholds and minimum monthly salary standards." },
        { name: "Axis Bank Personal Loan EMI Calculator", href: "/axis-bank/personal-loan-emi-calculator", desc: "Generate dynamic monthly personal loan EMIs and amortization tables." },
        { name: "Axis Bank Personal Loan Interest Rates", href: "/personal-loan/axis-bank-personal-loan-interest-rates", desc: "Review seasonal personal loan interest rate slabs and margins." },
        { name: "Axis Bank Personal Loan Preclosure", href: "/axis-bank/personal-loan/preclosure-charges", desc: "Lock-in periods, prepayment penalties, and foreclosing margins." },
        { name: "Axis Bank Personal Loan Statement", href: "/axis-bank/personal-loan-statement", desc: "Retrieve active loan account ledgers, tax certificates and dues." },
        { name: "Axis Bank Personal Loan Application Status", href: "/axis-bank/personal-loan-status", desc: "Track pending unsecured retail loan checks and document updates." },
        { name: "Axis Bank Top-up Home Loan", href: "/axis-bank/top-up-home-loan", desc: "Secure additional cheap mortgage top-up funds for renovations." },
        { name: "Axis Bank vs HDFC Home Loan Compare", href: "/home-loan/axis-bank-vs-hdfc-home-loan", desc: "Detailed side-by-side comparison of RLLR interest rates and fees." },
        { name: "Ayefin Business Loans Profile", href: "/ayefin/business-loan", desc: "Aye Finance unsecured micro-enterprise funding and capital." },
        { name: "Ayefin SME Credit Hub", href: "/ayefin", desc: "Explore customized commercial loans for small traders and shops." },
        { name: "Bad Credit Score Habits", href: "/credit-score/bad-practices-that-lead-to-bad-credit-score", desc: "Identify key payment delays, high utilization, and inquiries that damage CIBIL." },
        { name: "Bajaj Finserv Marriage Loan", href: "/personal-loan/bajaj-finserv-marriage-loan", desc: "Instant wedding funding up to ₹25 Lakhs with rapid digital releases." },
        { name: "Bajaj Finserv Personal Loan Eligibility", href: "/bajaj-finserv/personal-loan-eligibility", desc: "Understand income brackets and CIBIL score checks for Bajaj loans." },
        { name: "Bajaj Finserv Instant Personal Loan", href: "/personal-loan/bajaj-finserv-instant-personal-loan", desc: "Unsecured personal credits disbursed in under 20 minutes." },
        { name: "Bajaj Finserv Personal Loan Portfolio", href: "/bajaj-finserv/personal-loan", desc: "Compare Bajaj personal loan interest rates, limits, and flexible terms." },
        { name: "Bajaj Finserv Personal Loan EMI Tool", href: "/bajaj-finserv/personal-loan-emi-calculator", desc: "Simulate monthly personal loan EMI and principal/interest splits." },
        { name: "Bajaj Finserv Personal Loan Interest Rates", href: "/bajaj-finserv/personal-loan-interest-rate", desc: "Track current retail unsecured credit rate slabs for Bajaj." },
        { name: "Bajaj Finserv Home Loan Care", href: "/bajaj-finserv/home-loan-customer-care", desc: "Retrieve mortgage interest certificates, statements, and help desks." },
        { name: "Bajaj Finserv Home Loan Balance Transfer", href: "/bajaj-finserv/home-loan-balance-transfer", desc: "Migrate existing high-yield home loans to Bajaj for lower EMIs." },
        { name: "Bajaj Finserv Home Loan Portfolio", href: "/bajaj-finserv/home-loan", desc: "Mortgages up to ₹5 Crores with LTV up to 80% and long tenures." },
        { name: "Bajaj Finserv Loan Against Property", href: "/bajaj-finserv/loan-against-property", desc: "Unlock commercial or residential real estate value up to ₹10 Crores." },
        { name: "Bakery Business Plan Mudra", href: "/business-loan/bakery-business-plan", desc: "Complete commercial blueprint to secure Mudra capital for bakery setups." },
        { name: "Bandhan Bank Personal Loan Profile", href: "/bandhan-bank/personal-loan", desc: "Universal bank unsecured personal credit lines up to ₹15 Lakhs." },
        { name: "Bandhan Bank Home Loan mortgage", href: "/bandhan-bank/home-loan", desc: "Floating rate housing loans up to 30 years and 90% LTV." },
        { name: "Bandhan Bank Business Loans", href: "/bandhan-bank/business-loan", desc: "SME capital, Cash Credit overdrafts, and priority sector rural loans." },
        { name: "Bandhan Bank Loan Against Property", href: "/bandhan-bank/loan-against-property", desc: "Secure affordable credit by pledging real estate assets." },
        { name: "Bank of Baroda Personal Loans Desk", href: "/bank-of-baroda/personal-loan", desc: "Unsecured personal loans up to ₹20 Lakhs processed with low fees." },
        { name: "Bank of Baroda Home Loans mortgage", href: "/bank-of-baroda/home-loan", desc: "Floating rate housing finance linked to Baroda EBLR base rates." },
        { name: "Bank of Baroda Business Loans", href: "/bank-of-baroda/business-loan", desc: "Commercial MSME capital, Cash Credits, and machinery finance." },
        { name: "Bank of Baroda Gold Loans Desk", href: "/bank-of-baroda/gold-loan", desc: "Pledge gold jewelry to receive immediate capital with low interest." },
        { name: "Bank of India Home Loans Portfolio", href: "/bank-of-india/home-loan", desc: "EBLR linked housing credit up to 30 years and 90% LTV." },
        { name: "Bank of India Business Loans", href: "/bank-of-india/business-loan", desc: "SME capital, priority sector agricultural credits and cash credits." },
        { name: "Bank of India Gold Loans Desk", href: "/bank-of-india/gold-loan", desc: "Pledge physical gold to secure instant low-interest farm or personal cash." }
      ]
    },
    {
      id: "wealth-insurance",
      title: "Wealth, Investments & Pension Portals",
      desc: "Aditya Birla Sun Life wealth boosters, pension annuities, term insurance, and sectoral mutual funds.",
      icon: <BookOpen className="w-5 h-5" />,
      colorClass: "from-amber-950 via-red-950 to-slate-950 text-amber-400 border-amber-500/20",
      accentClass: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      links: [
        { name: "Aditya Birla Capital Overview", href: "/aditya-birla", desc: "Corporate NBFC profile mapping credit and insurance systems." },
        { name: "Aditya Birla SME Loans", href: "/aditya-birla/business-loan", desc: "Collateral-free commercial term credit up to ₹50 Lakhs." },
        { name: "Aditya Birla SME Loan Rates", href: "/aditya-birla/business-loan-interest-rate", desc: "Detailed factors influencing commercial baseline interest margins." },
        { name: "Empower Pension Single Premium", href: "/aditya-birla-sun-life-pension-plans/empower-pension-sp-plan", desc: "Deposit lump-sum single premium in high-yield market funds." },
        { name: "Empower Pension Regular Plan", href: "/aditya-birla-sun-life-pension-plans/absli-empower-pension-plan", desc: "Cultivate periodic regular savings habits to secure retirement." },
        { name: "ABSLI Wealth Max Single ULIP", href: "/absli-wealth-max-plan", desc: "Combine wealth generation with high-fidelity life cover in one premium." },
        { name: "Wealth Secure Regular ULIP", href: "/wealth-secure-plan", desc: "Dynamic assets allocator protects yields as policy maturity nears." },
        { name: "Protector Plus Term Cover", href: "/protector-plus", desc: "Highly affordable pure term protection shielding family liabilities." },
        { name: "Activ Health Wellness Shield", href: "/aditya-birla-activ-health", desc: "Earn up to 100% premium cash return through active lifestyle steps." },
        { name: "ABSL PSU Equity Mutual Fund", href: "/mutual-funds/aditya-birla-amc-launches-aditya-birla-sun-life-psu-equity-fund", desc: "High-yield open-ended sectoral mutual fund investing in gov giants." },
        { name: "Fixed Deposits Portal", href: "/investment/fixed-deposit", desc: "Guaranteed locked-in yields comparing top commercial banks." },
        { name: "Mutual Funds Portal", href: "/investment/mutual-funds", desc: "SIP & lump-sum direct mutual funds from leading asset managers." },
        { name: "ABSL Flexi Cap Fund Growth", href: "/mutual-funds/aditya-birla-sun-life-flexi-cap-fund-regular-plan-growth", desc: "Open-ended equity fund investing dynamically across all market caps." },
        { name: "ABSL Nifty Next 50 ETF NFO", href: "/mutual-funds/aditya-birla-sun-life-mf-launches-nfo-nifty-next-50-etf", desc: "Low-cost index exchange-traded fund tracking high-potential bluechips." },
        { name: "ABSL Midcap Fund Growth", href: "/mutual-funds/aditya-birla-sun-life-midcap-fund-regular-plan-growth", desc: "Focuses on high-yield mid-sized enterprise compounding over 5+ years." },
        { name: "ABSL Multi Cap Fund Growth", href: "/mutual-funds/aditya-birla-sun-life-multi-cap-fund-regular-plan-growth", desc: "Mandated 25% distribution across large, mid, and small cap sectors." },
        { name: "ABSL Bal Bhavishya Yojna NFO", href: "/mutual-funds/aditya-birla-sun-life-mutual-fund-announces-bal-bhavishya-yojna-nfo", desc: "Solution-oriented child savings plan with a 5-year lock-in period." },
        { name: "Birla Sun Life Mutual Fund Hub", href: "/mutual-funds/birla-sun-life-mutual-fund", desc: "Comprehensive portal listing direct SIP and lump-sum investment schemes." },
        { name: "ABSL PSU Equity Regular Growth", href: "/mutual-funds/aditya-birla-sun-life-psu-equity-fund-regular-plan-growth", desc: "Government sector monopolies fund offering solid high-dividend yields." },
        { name: "ABSL Small Cap Fund Growth", href: "/mutual-funds/aditya-birla-sun-life-small-cap-fund-regular-plan-growth", desc: "Aggressive small enterprise portfolio capturing economic expansions." },
        { name: "ABSL Pension Fund (NPS)", href: "/saving-schemes/aditya-birla-sun-life-pension-fund", desc: "Low-cost National Pension System fund manager under Section 80CCD." },
        { name: "ABSL Sun Life Pension Portal", href: "/aditya-birla-sun-life-pension-plans", desc: "Retirement annuity plans offering guaranteed regular income payouts." },
        { name: "Value Research Fund Ratings", href: "/mutual-funds/value-research-mutual-fund-rating", desc: "Analyze historical ratings, risk matrices, and asset allocation tiers." },
        { name: "Alternative Investment Fund Guide", href: "/mutual-funds/alternative-investment-fund", desc: "High-value hedge funds, infrastructure funds, and venture assets guide." },
        { name: "Atal Pension Yojana (APY)", href: "/saving-schemes/atal-pension-yojana", desc: "Guaranteed monthly micro pension schemes for unorganized sectors." },
        { name: "Axis Bank SIP Wealth Plans", href: "/mutual-funds/axis-bank-sip-plan", desc: "Automate monthly mutual fund direct SIP plans via Axis bank accounts." },
        { name: "Axis Consumption Fund Growth", href: "/mutual-funds/axis-consumption-fund-regular-plan-growth", desc: "Sectoral mutual fund capturing growth of Indian consumer markets." },
        { name: "Axis Flexi Cap Fund Growth", href: "/mutual-funds/axis-flexi-cap-fund-regular-plan-growth", desc: "Open-ended equity fund investing dynamically across all market caps." },
        { name: "Axis Large Cap Fund Growth", href: "/mutual-funds/axis-large-cap-fund-regular-plan-growth", desc: "Stable equity portfolio investing in India's top 100 bluechip giants." },
        { name: "Axis Mid Cap Fund Growth", href: "/mutual-funds/axis-mid-cap-fund-regular-plan-growth", desc: "Focuses on high-yield mid-sized enterprise compounding over 5+ years." },
        { name: "Axis Seasons Debt Fund of Funds", href: "/mutual-funds/axis-mutual-fund-amc-launches-axis-seasons-debt-fund-of-funds", desc: "Asset allocation debt fund of funds adjusting dynamically to interest cycles." },
        { name: "Axis Overnight Fund NFO", href: "/mutual-funds/axis-overnight-fund-nfo", desc: "Highly secure extremely short-term debt fund for corporate cash reserves." },
        { name: "Axis Mutual Fund Catalog", href: "/mutual-funds/axis-mutual-fund", desc: "Bespoke direct SIP and lump-sum investment schemes." },
        { name: "Axis Small Cap Fund Growth", href: "/mutual-funds/axis-small-cap-fund-regular-plan-growth", desc: "Aggressive small enterprise portfolio capturing rapid economic expansions." },
        { name: "Axis Ultra Short Term Fund Subscription", href: "/mutual-funds/axis-ultra-short-term-fund-opens-subscription", desc: "Liquid debt plan suitable for short-term parking of operational funds." },
        { name: "Axis Value Fund Regular Growth", href: "/mutual-funds/axis-value-fund-regular-plan-growth", desc: "Value-investing equity mutual fund capturing undervalued commercial giants." },
        { name: "Bandhan Nifty Alpha 50 Index Fund", href: "/mutual-funds/bandhan-nifty-alpha-50-index-fund-regular-plan-growth", desc: "Low-cost index fund tracking high-momentum market leaders." },
        { name: "Bandhan Small Cap Fund Growth", href: "/mutual-funds/bandhan-small-cap-fund-regular-plan-growth", desc: "Focuses on rapid wealth compounding by investing in micro businesses." },
        { name: "Axis Bank Recurring Deposit", href: "/axis-bank/recurring-deposit", desc: "Book monthly small savings recurring deposits with high interest." },
        { name: "Axis Bank Tax Saving FD Rates", href: "/fixed-deposit/axis-bank-tax-saving-fixed-deposit", desc: "Secure Section 80C deductions by booking locked 5-year FDs." }
      ]
    },
    {
      id: "cards-tax",
      title: "Premium Cards & Taxation Portals",
      desc: "Adani co-branded airport lounge cards, family add-on limits, GST council logs, and Aaykar Setu app.",
      icon: <CreditCard className="w-5 h-5" />,
      colorClass: "from-indigo-950 via-purple-950 to-slate-950 text-indigo-400 border-indigo-500/20",
      accentClass: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      links: [
        { name: "Adani One ICICI Travel Card", href: "/icici-bank/adani-one-credit-cards", desc: "Earn massive flight reward multipliers and airport duty-free cashbacks." },
        { name: "Adani One Signature Travel Card", href: "/icici-bank/adani-one-signature-credit-card", desc: "HNW signature card offering unlimited luxury airport lounge access." },
        { name: "Aditya Birla AU Credit Card", href: "/au-small-finance-bank/aditya-birla-finance-au-credit-cards", desc: "Fuel rewards and lifestyle milestones co-branded with AU bank." },
        { name: "Add-On Credit Cards Guide", href: "/credit-card/add-on-card", desc: "Extend primary credit limit and card privileges to family free." },
        { name: "Credit Cards Finder Utility", href: "/credit-card-finder", desc: "Search and filter cards by spending categories and rewards." },
        { name: "37th GST Council Resolutions", href: "/tax/37th-gst-council-meeting", desc: "Hotel tariff rate cuts, diamond work reliefs, and exporter limits." },
        { name: "38th GST Council Resolutions", href: "/tax/38th-gst-council-meeting", desc: "Unified 28% lottery tax votes, long-term lease waivers, and late GSTR-1 cuts." },
        { name: "Aaykar Setu Mobile App", href: "/tax/aaykar-setu-income-tax-mobile-app", desc: "Official income tax app detail guides, TRP locator, and live chat desks." },
        { name: "Income Tax Portal Guide", href: "/resources/income-tax", desc: "Regime analysis, Form 16 guidelines, and filing timelines." },
        { name: "PPF Account Schemes", href: "/resources/ppf", desc: "Public Provident Fund interest rates compounding and EEE tax benefits." },
        { name: "Aditya Birla SBI Credit Cards", href: "/sbi-bank/adtiya-birla-sbi-cards", desc: "Earn double rewards on daily shopping co-branded with SBI." },
        { name: "Aditya Birla SBI Card Select", href: "/sbi-bank/aditya-birla-sbi-card-select", desc: "Elite lifestyle card offering Priority Pass lounge entries and welcome vouchers." },
        { name: "Advance Tax Guidelines", href: "/tax/advance-tax", desc: "Direct tax calendars, quarterly percentages, and delay penalties." },
        { name: "Pros & Cons of Credit Cards", href: "/credit-card/advantages-and-disadvantages-of-credit-card", desc: "Master interest-free cycles, credit utilization limits, and score building." },
        { name: "Air India SBI Platinum Card", href: "/sbi-bank/air-india-sbi-platinum-credit-cards", desc: "Compare Air India SBI Platinum welcome miles and travel multipliers." },
        { name: "Air India SBI Signature Card", href: "/sbi-bank/air-india-sbi-signature-credit-cards", desc: "HNW signature card offering Centurion lounges and premium miles." },
        { name: "Airtel Axis Credit Card Guide", href: "/axis-bank/airtel-axis-bank-credit-card", desc: "Get flat 25% cashback on utility payments and 10% on Swiggy/Zomato." },
        { name: "Amex Escalation Matrix", href: "/amex-bank/grievance-redressal-escalation-matrix", desc: "Raise billing disputes and grievances to the Nodal Officer in Gurgaon." },
        { name: "Amex Application Status Tracker", href: "/credit-card/amex-credit-card-application-status", desc: "Track your pending Amex credit card approval and dispatch online." },
        { name: "Amex Card Bill Payment Avenues", href: "/amex-bank/credit-card-bill-payment", desc: "Settle your Amex card statement online via UPI or secure e-mandates." },
        { name: "Amex Eligibility Criteria Check", href: "/amex-bank/credit-card-eligibility", desc: "Verify score, age, and minimum salary criteria for Amex credit cards." },
        { name: "Amex PIN Generation Tutorial", href: "/amex-bank/credit-card-pin-generation", desc: "Generate secure 4-digit transaction PINs online or via mobile app." },
        { name: "Amex Membership Rewards Details", href: "/amex-bank/credit-card-reward-points", desc: "Redeem points for flight bookings, hotels, and the Gold Collection." },
        { name: "Amex Membership Rewards Card", href: "/amex-bank/membership-rewards-credit-card", desc: "Get 1,000 monthly bonus points for routine monthly card transactions." },
        { name: "Amex SmartEarn Credit Card", href: "/amex-bank/smartearn-credit-card", desc: "Massive 10X points multiplier on e-commerce partners for millennials." },
        { name: "Amex Card Products Catalog", href: "/amex-bank/credit-card", desc: "Compare charge cards, travel cards, and shopping rewards from Amex." },
        { name: "Amex Easy EMI Conversion Slabs", href: "/amex-bank/credit-card-emi", desc: "Convert single swipes above ₹2,500 into low-interest monthly installments." },
        { name: "Amex Cashback & Lifestyle Offers", href: "/amex-bank/credit-card-offers", desc: "Activate curated shopping and dining discounts inside your Amex account." },
        { name: "Amex General Customer Helpline", href: "/amex-bank/customer-care", desc: "Toll-free helplines, card hotlisting, and digital support desks." },
        { name: "Amex Gold Charge Card Guide", href: "/amex-bank/american-express-gold-credit-card", desc: "Charge card with no pre-set limits and high rewards multiplier." },
        { name: "Amex Platinum Metal Card specs", href: "/amex-bank/american-express-platinum-card", desc: "Centurion lounge access, elite hotel statuses & Taj vouchers." },
        { name: "Amex Platinum Reserve Card", href: "/amex-bank/american-express-platinum-reserve-credit-cards", desc: "Luxury lifestyle card offering golf rounds and wellness benefits." },
        { name: "Amex Platinum Travel Card", href: "/amex-bank/american-express-platinum-travel-credit-cards", desc: "Milestone-based travel rewards offering free hotel vouchers." },
        { name: "Amex Bank Profile Overview", href: "/amex-bank", desc: "Detailed summary of American Express cards, net banking, and supports." },
        { name: "Amex Bank Gift Card in India", href: "/credit-card/amex-bank-gift-card-in-india", desc: "Prepaid luxury gift cards with secure offline transaction protections." },
        { name: "Federal Amplifi Fi Card", href: "/federal-bank/amplifi-fi-federal-credit-card", desc: "Co-branded credit card offering zero forex markups and unlimited Fi-coins." },
        { name: "Ajio Credit Card Offers", href: "/credit-card/ajio-credit-card-offers", desc: "Verify e-commerce shopping brand deals and instant cashbacks." },
        { name: "Income Tax Login Portal", href: "/tax/income-tax-login", desc: "E-filing login instructions, ITR verifications, and refund tracking." },
        { name: "Salary Allowance Guidelines", href: "/salary/allowances", desc: "7th Pay Commission allowance lists, dear allowances, and exemptions." },
        { name: "PAN Card AO Code Locator", href: "/pan-card/ao-code-pan", desc: "Find your PAN card AO Code using Area Code, AO Type, Range and Ward." },
        { name: "APEDA Export Promotion Hub", href: "/promotion-councils/apeda", desc: "Agricultural & Processed Food Products Export Development Authority guides." },
        { name: "Apollo SBI Card Select Elite", href: "/sbi-bank/apollo-sbi-card-select", desc: "Co-branded health cards with premium diagnostics and health multipliers." },
        { name: "Apollo SBI Co-branded Card", href: "/sbi-bank/apollo-sbi-credit-card", desc: "Earn healthcare reward multipliers at Apollo hospital networks." },
        { name: "AP Professional Tax Slabs", href: "/tax/appt-professional-tax-andhra-pradesh", desc: "Verify monthly professional tax deductions and filing deadlines in AP." },
        { name: "Axis Bank Gift Card in India", href: "/credit-card/axis-bank-gift-card-in-india", desc: "Prepaid luxury corporate and personal gift cards with secure PINs." },
        { name: "Axis Bank Horizon Credit Card", href: "/axis-bank/horizon-credit-card", desc: "Premium travel card offering high miles multipliers and lounge entry." },
        { name: "Axis Bank Insta Easy Credit Card", href: "/axis-bank/axis-bank-insta-easy-credit-cards", desc: "Secured credit card issued instantly against fixed deposits with zero documents." },
        { name: "Axis Bank My Zone Credit Card", href: "/axis-bank/axis-bank-my-zone-credit-cards", desc: "Popular card offering free SonyLIV, Paytm movie BOGO, and dining deals." },
        { name: "Axis Bank My Zone Easy Card", href: "/axis-bank/my-zone-easy-credit-card", desc: "Subsidized My Zone card variant offering robust domestic rewards." },
        { name: "Axis Bank Neo Credit Card", href: "/axis-bank/axis-bank-neo-credit-cards", desc: "E-commerce shopping card offering flat 10% Zomato and Blinkit discounts." },
        { name: "Axis Bank Pride Platinum Card", href: "/axis-bank/axis-bank-pride-platinum-credit-cards", desc: "Exclusive credit card for defense and public sector personnel." },
        { name: "Axis Bank Pride Signature Card", href: "/axis-bank/axis-bank-pride-signature-credit-cards", desc: "Premium co-branded card offering luxury lounge entries and fuel waivers." },
        { name: "Axis Bank Primus Credit Card", href: "/axis-bank/primus-credit-card", desc: "Ultra-HNW invite-only luxury metal card offering bespoke concierge services." },
        { name: "Axis Bank Privilege Credit Card", href: "/axis-bank/privilege-credit-card", desc: "Earn double rewards on multi-brand shopping and annual milestones." },
        { name: "Axis Bank Privilege Easy Card", href: "/axis-bank/privilege-easy-credit-card", desc: "Subsidized Privilege card variant issued with lower minimum income limits." },
        { name: "Axis Bank Purchase Credit Card", href: "/axis-bank/purchase-credit-card", desc: "Corporate retail procurement card with customized transaction windows." },
        { name: "Axis Purchase Control Virtual Card", href: "/axis-bank/purchase-control-virtual-credit-card", desc: "Highly secure disposable corporate virtual cards to prevent e-commerce frauds." },
        { name: "Axis Bank Reserve Credit Card", href: "/credit-card/axis-bank-reserve-credit-card", desc: "HNW luxury card offering unlimited ITC hotel dining and airport transfers." },
        { name: "Axis Bank Rewards Credit Card", href: "/axis-bank/rewards-credit-card", desc: "Earn accelerated points on departmental store swipes and groceries." },
        { name: "Axis Bank Rupay Credit Cards", href: "/axis-bank/axis-bank-rupay-credit-cards", desc: "Link Rupay cards directly to UPI apps for scan-and-pay transactions." },
        { name: "Axis Bank Select Credit Card", href: "/axis-bank/select-credit-card", desc: "Elite card offering complimentary Amazon Prime and BookMyShow discounts." },
        { name: "Axis Shoppers Stop Credit Card", href: "/axis-bank/axis-shoppers-stop-credit-card", desc: "Co-branded retail card offering instant discounts at Shoppers Stop outlets." },
        { name: "Axis Signature Card (Lifestyle)", href: "/axis-bank/axis-bank-signature-credit-cards-with-lifestyle-benefits", desc: "Complimentary dining discount and health checkup benefits." },
        { name: "Axis Signature Card (Travel)", href: "/axis-bank/axis-bank-signature-credit-cards-with-travel-benefits", desc: "Premium travel credit card offering lounge access and air miles." },
        { name: "Axis Supermoney Rupay Card", href: "/axis-bank/axis-supermoney-rupay-credit-card", desc: "Co-branded card offering cashbacks on daily UPI scanning swipes." },
        { name: "Axis Bank Virtual Credit Card", href: "/axis-bank/axis-bank-virtual-credit-card", desc: "Instant paperless virtual credit cards for secure web checkouts." },
        { name: "Axis Bank Vistara Credit Card", href: "/axis-bank/vistara-credit-card", desc: "Co-branded airline card offering free economy ticket vouchers." },
        { name: "Axis Bank Vistara Infinite Card", href: "/axis-bank/axis-bank-vistara-infinite-credit-card", desc: "Complimentary Club Vistara Gold class and business class tickets." },
        { name: "Axis Magnus Credit Card", href: "/axis-bank/magnus-credit-card", desc: "Highly popular credit card offering premium travel rewards multipliers." },
        { name: "Axis Magnus Burgundy Credit Card", href: "/axis-bank/magnus-burgundy-credit-card", desc: "Exclusive luxury card for Burgundy Private account clients." },
        { name: "Axis Olympus Credit Card", href: "/axis-bank/olympus-credit-card", desc: "HNW credit card offering luxury travel miles transfer programs." },
        { name: "Axis Vistara Signature Card", href: "/axis-bank/axis-bank-vistara-signature-credit-card", desc: "Co-branded travel card offering free premium economy ticket vouchers." },
        { name: "BOBCARD Credit Card IFSC Code", href: "/bobcard/credit-card-ifsc-code", desc: "Verify active IFSC codes to make credit card bill payments via NEFT." },
        { name: "Bajaj Finserv Insta EMI Card", href: "/bajaj-finserv/bajaj-finserv-insta-emi-card", desc: "Pre-approved digital card to purchase consumer durables under No-Cost EMIs." },
        { name: "Bandhan Bank SC Credit Cards", href: "/bandhan-bank/bandhan-bank-standard-chartered-credit-cards", desc: "Co-branded credit cards offering retail rewards and cashbacks." },
        { name: "Bank of Baroda Gift Card", href: "/credit-card/bank-of-baroda-gift-card-in-india", desc: "Prepaid Bob gift cards with secure offline transaction PINs." },
        { name: "Bank of Baroda Kisan Credit Card", href: "/credit-card/bank-of-baroda-kisan-credit-card", desc: "Priority sector seasonal crop credit lines for agriculturalists." },
        { name: "Bank of India Kisan Credit Card", href: "/bank-of-india/kisan-credit-card", desc: "BOI priority sector subsidized seasonal crop credits." }
      ]
    },
    {
      id: "tools",
      title: "EMI Calculators & Financial Tools",
      desc: "Simulate and calculate your home, personal, and car loan payments with detailed amortizations.",
      icon: <Calculator className="w-5 h-5" />,
      colorClass: "from-slate-800 via-slate-900 to-zinc-950 text-slate-400 border-slate-500/20",
      accentClass: "bg-slate-500/10 text-slate-400 border-slate-500/30",
      links: [
        { name: "Personal Loan EMI Calculator", href: "/personal-loan-emi-calculator", desc: "Compute monthly personal loan EMI and amortization tables instantly." },
        { name: "Home Loan EMI Calculator", href: "/home-loan-emi-calculator", desc: "Check long-term housing mortgage payments and interest splits." },
        { name: "Car Loan EMI Calculator", href: "/car-loan-emi-calculator", desc: "Simulate vehicle purchase EMI payouts and downpayment options." },
        { name: "Income Tax Calculator 2026", href: "/income-tax-calculator", desc: "Instantly compare tax structures under Old vs New regimes." },
        { name: "Comprehensive Mortgage Calculator", href: "/MortgageCalculatorPage", desc: "Advanced property evaluation tool including taxes and insurance." },
        { name: "National IFSC Finder", href: "/resources/ifsc-finder", desc: "Search active RBI IFSC and MICR codes for all banks instantly." },
        { name: "Live Gold Rates Checker", href: "/resources/gold-rates", desc: "Track 22K and 24K market gold rates across major cities in India." },
        { name: "National Pincodes Directory", href: "/resources/pincodes", desc: "Verify city zip codes and localized postal courier coverages." },
        { name: "Airtel Prepaid Mobile Recharge", href: "/prepaid-mobile-recharge/airtel", desc: "Secure prepaid recharge gateway for unlimited plans and data packs." },
        { name: "Airtel Postpaid Bill Settle", href: "/mobile-postpaid-bill-payment/airtel", desc: "Clear monthly Airtel postpaid bills securely via BBPS networks." },
        { name: "HDFC Term Insurance Premium Calculator", href: "/life-insurance/term-insurance/hdfc-term-insurance-premium-calculator", desc: "Calculate sum assured payouts and term premiums under tax waivers." },
        { name: "Personal Loan Amortization Calculator", href: "/personal-loan/amortization-calculator", desc: "Compute detailed monthly payment plans and principal/interest splits." },
        { name: "Loan Amortization Schedule Planner", href: "/personal-loan/amortization-schedule", desc: "Generate complete year-by-year reducing balance loan logs." }
      ]
    },
    {
      id: "life-health-insurance",
      title: "Life & Health Protection Insurance",
      desc: "Aegon term plans, iMaximize ULIP savings, group cashless policies, and chronic disease heart & diabetic covers.",
      icon: <HeartPulse className="w-5 h-5" />,
      colorClass: "from-rose-950 via-slate-900 to-zinc-950 text-rose-450 border-rose-500/20",
      accentClass: "bg-rose-500/10 text-rose-400 border-rose-500/30",
      links: [
        { name: "Group Active Health Shield", href: "/group-active-health", desc: "Corporate cashless health covers up to 100% premium return rewards." },
        { name: "Group Activ Secure Shield", href: "/group-activ-secure", desc: "Fixed personal accident and critical illness payouts for corporate staffs." },
        { name: "Group Health Policy Guide", href: "/group-health-insurance", desc: "Customizable company health insurance including immediate pre-existing covers." },
        { name: "Asthma Medical Cover", href: "/health-insurance-asthma", desc: "Specialized cashless policies with zero waiting cycles for chronic asthma." },
        { name: "Diabetes Cashless Care", href: "/health-insurance-diabetes", desc: "Dedicated diabetic insurance protecting outpatient glucose monitoring costs." },
        { name: "High Blood Pressure Protection", href: "/health-insurance-high-blood-pressure", desc: "Shield cardiovascular diagnostic outgos and regular medicine bills." },
        { name: "High Cholesterol Health Cover", href: "/health-insurance-high-cholesterol", desc: "Cashless hospitalization shields covering lipid and heart therapies." },
        { name: "Insurance Login & Tracking", href: "/login-and-registration-process", desc: "Customer digital claims desk, cashless approvals, and certificate downloads." },
        { name: "Aegon Life Child Plans", href: "/aegon-life-child-plans", desc: "Double benefit child security plans covering academic milestones." },
        { name: "Aegon Support Helplines", href: "/aegon-life-customer-care", desc: "Toll-free desks, NRI helpdesks, and nominee death claims registers." },
        { name: "Aegon Life Easy Protect", href: "/life-easy-protect-insurance-plan", desc: "Highly affordable pure term protection designed for young earners." },
        { name: "Aegon Future Protect Term", href: "/future-protect-insurance-plan", desc: "Sizable sum assured payouts protecting family debts at cheap rates." },
        { name: "Aegon Future Protect Plus", href: "/future-protect-plus-insurance-plan", desc: "Pure life insurance shield offering 100% return of paid premiums." },
        { name: "Aegon Guaranteed Growth Saver", href: "/aegon-life-guaranteed-growth-insurance-plan", desc: "Non-linked savings endowment compounding tax-free maturities." },
        { name: "Aegon Life iGuarantee Plan", href: "/aegon-life-iguarantee-insurance", desc: "High-compounding annual growth returns guaranteed under lock-in terms." },
        { name: "Aegon iMaximize ULIP Regular", href: "/imaximize-insurance-plan", desc: "Invest regular premiums dynamically across market funds with zero allocation fees." },
        { name: "Aegon iMaximize Single ULIP", href: "/imaximize-single-premium-insurance-plan", desc: "Deposit single lump-sum in high-equity funds with instant life cover." },
        { name: "Aegon Retirement Pension Plans", href: "/pension-plans", desc: "Annuity programs guaranteeing post-retirement monthly cash payouts." },
        { name: "Aegon Rising Star Scholar", href: "/rising-star-insurance-plan", desc: "Child scholar investment ULIP offering premium waiver benefits." },
        { name: "Aegon Term Cover Catalog", href: "/term-insurance-plans", desc: "Pure term covers shielding home loans and lifestyle liabilities." },
        { name: "Annual Multi-Trip Travel Cover", href: "/travel-insurance/annual-multi-trip-travel-insurance", desc: "Secure unlimited cashless global medical shields for frequent travelers." },
        { name: "Guaranteed Annuity Pension Plans", href: "/life-insurance/annuity-plans", desc: "Access high-yield regular income annuity plans under Section 80C." },
        { name: "Apollo Hospitals Cashless Care", href: "/health-insurance/apollo-hospitals", desc: " cash-free medical diagnostics and corporate policies at Apollo hospitals." },
        { name: "Cashless Premium Calculator", href: "/premium-calculator", desc: "Compare medical cashless policies, age slabs, and stays deductibles." },
        { name: "Optima Restore Health Shield", href: "/optima-restore-plan", desc: "HDFC Ergo Optima Restore policy with 100% instant sum assured restores." },
        { name: "Bajaj Allianz Extra Care Plus", href: "/bajaj-allianz-extra-care-plus-policy", desc: "Super top-up health insurance plan offering high cashless deductibles limits." },
        { name: "Bajaj Allianz Tax Gain Health Plan", href: "/bajaj-allianz-tax-gain-health-insurance-plan", desc: "Maximize Section 80D tax deductions while securing medical cashless cover." },
        { name: "Bajaj Allianz Global Personal Guard", href: "/global-personal-guard-policy", desc: "Worldwide personal accident coverage shielding family liabilities." },
        { name: "Bajaj Allianz Silver Health Policy", href: "/silver-health-plan-senior-citizens", desc: "Specialized cashless health insurance cover for senior citizens." },
        { name: "Bajaj Allianz Women Critical Illness", href: "/women-specific-critical-illness-insurance", desc: "Dedicated cancer and critical illness shield for female policyholders." },
        { name: "Bajaj Allianz Term Plans Range", href: "/term-plans-3", desc: "Highly affordable pure life insurance term shields." },
        { name: "Baggage Insurance Policy", href: "/commercial-insurance/baggage-insurance", desc: "Commercial transit covers and domestic/international luggage shields." }
      ]
    }
  ];

  // Search filtering logic
  const filteredCategories = categories.map(cat => {
    const filteredLinks = cat.links.filter(link => 
      link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.href.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...cat, links: filteredLinks };
  }).filter(cat => cat.links.length > 0);

  const getActiveCategories = () => {
    if (activeTab === 'all') return filteredCategories;
    return filteredCategories.filter(cat => cat.id === activeTab);
  };

  const totalPagesCount = categories.reduce((acc, cat) => acc + cat.links.length, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 font-sans relative overflow-hidden">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none"></div>

      {/* Decorative Radial Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Premium Dashboard Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider animate-pulse">
            <Sparkles className="w-4 h-4" />
            Interactive Control Hub
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Financial Directories
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-medium max-w-2xl mx-auto">
            Access over <span className="text-indigo-400 font-bold">{totalPagesCount}</span> highly detailed, content-rich financial portals. Navigate dynamically through verified loan parameters, interest slabs, and e-KYC databases.
          </p>
        </div>

        {/* Search and Category Tab Filters */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 mb-12 shadow-2xl space-y-6">
          
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search through all registered financial services and indices instantly (e.g. 'Abhyudaya', 'Mudra', 'PAN')..."
              className="w-full pl-12 pr-6 py-4 bg-slate-950/70 border border-slate-800 focus:border-indigo-500/50 rounded-2xl outline-none text-slate-200 text-sm font-semibold tracking-wide shadow-inner focus:ring-2 focus:ring-indigo-500/15 transition-all"
            />
            {searchQuery && (
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-indigo-500/15 text-indigo-450 border border-indigo-500/30 rounded-lg px-2 py-0.5 text-[10px] font-bold">
                Matches Found: {getActiveCategories().reduce((acc, cat) => acc + cat.links.length, 0)}
              </span>
            )}
          </div>

          {/* Quick tab filters */}
          <div className="flex flex-wrap gap-2 border-t border-slate-800/60 pt-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'all' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              All Categories ({totalPagesCount})
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === cat.id ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat.icon}
                {cat.title.split(' ')[0]} ({cat.links.length})
              </button>
            ))}
          </div>

        </div>

        {/* Dynamic Categorized Links Grid */}
        <div className="space-y-12">
          {getActiveCategories().map((cat) => (
            <div key={cat.id} className="bg-slate-900/20 backdrop-blur-sm border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Category banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-850 pb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-xl ${cat.accentClass} border`}>
                      {cat.icon}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">{cat.title}</h2>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm font-medium">{cat.desc}</p>
                </div>
                <span className="self-start sm:self-center px-4 py-1.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800 text-xs font-bold tracking-wider uppercase">
                  Active Pages: {cat.links.length}
                </span>
              </div>

              {/* Links list grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="group flex flex-col justify-between p-5 bg-slate-950/40 hover:bg-slate-950/80 border border-slate-900 hover:border-indigo-500/20 rounded-2xl hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-[80px] h-[80px] bg-indigo-500/5 rounded-bl-full transform translate-x-4 -translate-y-4 group-hover:scale-150 transition-transform duration-300"></div>
                    <div className="space-y-2 relative z-10">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-white group-hover:text-indigo-400 text-sm sm:text-base leading-snug tracking-tight transition-colors">
                          {link.name}
                        </h4>
                        <ArrowUpRight className="w-4 h-4 text-slate-650 group-hover:text-indigo-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed font-sans font-medium line-clamp-2">
                        {link.desc}
                      </p>
                    </div>
                    <div className="pt-4 mt-auto flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-600 relative z-10 border-t border-slate-900/50">
                      <span className="font-mono text-slate-500 break-all">{link.href}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 transform group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          ))}

          {getActiveCategories().length === 0 && (
            <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
              <div className="w-12 h-12 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">No Registered Pages Match Your Search Query</h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Try searching for broader terms like 'Aadhaar', 'FD', 'Pension', 'Abhyudaya', 'Credit Card', or check your spelling.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Clear Search & Filters
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default FinancialDirectory;
