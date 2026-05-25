export interface AadharCenter {
  name: string;
  address: string;
  type: "Permanent" | "Enrolment & Update" | "Post Office" | "Bank Branch";
  timing: string;
  contact: string;
}

export interface AadharFAQ {
  q: string;
  a: string;
}

export interface AadharPageContent {
  title: string;
  badge: string;
  intro: string;
  moreIntro?: string;
  checklistTitle: string;
  checklist: string[];
  tableTitle?: string;
  tableHeaders?: string[];
  tableRows?: string[][];
  centers?: AadharCenter[];
  faqs: AadharFAQ[];
}

export const AADHAAR_PAGE_MAP: Record<string, AadharPageContent> = {
  "overview": {
    title: "Aadhaar Card Online Services: Complete Step-by-Step UIDAI Guide",
    badge: "Official Identity Portal",
    intro: "The Aadhaar card, issued by the Unique Identification Authority of India (UIDAI), is a 12-digit unique identity number that serves as proof of identity and address for residents of India. Navigating UIDAI services online allows you to download cards, check status, verify numbers, and locate local enrolment centers instantly.",
    moreIntro: "At BanksCart, we provide simplified walkthroughs to help you manage your Aadhaar details securely. Keeping your Aadhaar updated is critical, as it is linked directly to your active bank accounts, PAN card, voter ID, mobile numbers, and direct benefit transfer (DBT) subsidy payments.",
    checklistTitle: "Core UIDAI Online Services Available",
    checklist: [
      "E-Aadhaar Download: Get a digitally signed, fully valid electronic copy of your Aadhaar card in minutes.",
      "Demographic Updates: Change your address online by uploading valid resident verification proofs.",
      "Aadhaar-PAN Linking: Link your identity records online to comply with national tax mandates.",
      "Lock/Unlock Biometrics: Secure your fingerprint and iris logs online to prevent unauthorized access."
    ],
    tableTitle: "UIDAI Official Fee Chart for Aadhaar Services",
    tableHeaders: ["Service Type", "Online Portal Fee", "Aadhaar Seva Kendra Fee", "Turnaround Time"],
    tableRows: [
      ["First Time Enrollment", "Not Available", "Free of Cost", "Up to 90 Days"],
      ["Biometric Update (All)", "Not Available", "₹100", "Instant (Processed in 24 hrs)"],
      ["Demographic Update (Address)", "₹50", "₹50", "3 to 7 Working Days"],
      ["Demographic Update (Name/DOB)", "Not Available", "₹50", "3 to 7 Working Days"],
      ["E-Aadhaar Download & Print", "Free of Cost", "₹30", "Instant"]
    ],
    faqs: [
      { q: "What is an Aadhaar card?", a: "Aadhaar is a 12-digit unique random number issued by UIDAI to residents of India after completing robust biometric and demographic deduplication checks." },
      { q: "Is e-Aadhaar equally valid as the physical card?", a: "Yes. As per UIDAI circulars, e-Aadhaar is completely equivalent to a physical letter copy for all government and private identity verifications." },
      { q: "How can I update my mobile number on my Aadhaar?", a: "For security reasons, mobile number updates require biometric authentication at a physical Aadhaar Seva Kendra. No online option is available for mobile changes." },
      { q: "What is a Masked Aadhaar?", a: "Masked Aadhaar is a secure version of your E-Aadhaar where the first 8 digits of your Aadhaar number are hidden (replaced by XXXX-XXXX), showing only the last 4 digits." },
      { q: "How do I check if my Aadhaar is active?", a: "You can use the 'Verify Aadhaar' tool on the UIDAI portal or BanksCart. Active cards will show your age group, state, and registered mobile details." },
      { q: "What is the age limit for Baal Aadhaar?", a: "Baal Aadhaar is issued to children below 5 years of age. It is blue in color and does not require biometric logs until the child reaches 5 years." },
      { q: "How many times can I change my name in Aadhaar?", a: "You can change your name in Aadhaar only twice in your lifetime. Further changes require special regional office clearances." },
      { q: "Is Aadhaar proof of citizenship?", a: "No. Aadhaar is only proof of identity and residential stay in India. It does not confer citizenship or residential landing rights." },
      { q: "What is the virtual ID (VID) in Aadhaar?", a: "VID is a temporary 16-digit random number mapped to your Aadhaar. It can be shared for verifications instead of your actual Aadhaar number to enhance privacy." },
      { q: "How long does it take to get an Aadhaar card after enrollment?", a: "It typically takes up to 90 days for Aadhaar generation after submitting biometrics. Once generated, it is sent via India Post or available for instant download." }
    ]
  },
  "aadhaar-address-validation-letter-request": {
    title: "Aadhaar Address Validation Letter: Complete Request Guide",
    badge: "Demographic Proofs Bypass",
    intro: "The Aadhaar Address Validation Letter service by UIDAI allows residents to update their Aadhaar address even if they do not possess any valid address proofs in their own name. This process works via a 'Consent-based Address Verifier' who allows their address to be updated on the applicant's card.",
    moreIntro: "This feature is highly beneficial for tenants, newly-wed spouses, or students residing in rented properties who do not have utility bills or rent deeds registered in their names. The process is completely secure and relies on an Address Validation Letter containing a secret verification code sent to the verifier's address.",
    checklistTitle: "Step-by-Step Address Validation Process",
    checklist: [
      "Initiate Request: Log in to the UIDAI portal using your Aadhaar number and enter the Address Verifier's Aadhaar.",
      "Verifier Approval: The verifier receives an SMS link and must submit their consent within 24 hours.",
      "Secret Code Dispatch: UIDAI mails a physical letter containing a 6-digit Secret Code to the verifier's registered address.",
      "Final Code Submission: Receive the code from the verifier, log back into the UIDAI portal, enter the code, and submit your update."
    ],
    tableTitle: "Overview of Address Validation Details",
    tableHeaders: ["Process Parameter", "Requirements", "Service Costs", "Validity Duration"],
    tableRows: [
      ["Verifier Consent", "Must have Aadhaar linked to Active Mobile", "Free of Cost", "Expires in 24 Hours"],
      ["Secret Letter Delivery", "Dispatched via Speed Post to Verifier", "Free of Cost", "3 to 10 Working Days"],
      ["Secret Verification Code", "6-digit dynamic numerical code", "Free of Cost", "Valid for 180 Days from generation"],
      ["Address Refinement", "Add House No, Apartment, Landmark details", "₹50 (Upon Final Update)", "Permanent (Until next change)"]
    ],
    faqs: [
      { q: "Who can act as an Address Verifier?", a: "Any family member, relative, landlord, or friend who is willing to let you use their address and holds an active Aadhaar card linked to their mobile number." },
      { q: "What is the secret code in the address validation letter?", a: "It is a unique 6-digit verification pin sent physically via India Post to confirm the verifier's address is genuine." },
      { q: "Can I cancel a validation letter request?", a: "Yes, you can cancel or re-submit a request before the verifier consents, or simply let the request link expire after 24 hours." },
      { q: "Is there any charge for requesting the validation letter?", a: "The physical dispatch of the letter is free of cost. However, a standard fee of ₹50 is charged when you enter the secret code to execute the address update." },
      { q: "How long does the physical letter take to arrive?", a: "It typically takes 3 to 10 working days to reach the verifier's registered address via Speed Post." },
      { q: "Can one verifier authorize addresses for multiple applicants?", a: "Yes. UIDAI allows a resident to act as an address verifier for multiple applicants, provided separate consents are authorized." },
      { q: "What should I do if the letter doesn't arrive?", a: "If the letter is not received within 15 days, you can log in to the portal and request a re-dispatch of the validation letter." },
      { q: "Do I need to upload any photo proof?", a: "No. The verifier's digital approval replaces the need for standard photo address proofs entirely." },
      { q: "Can I update my name using this method?", a: "No. This consent-based process applies strictly to address updates. Name changes require standard demographic documents." },
      { q: "Is the address updated instantly after entering the secret code?", a: "Once you submit the secret code, the request goes into verification and is processed in 2 to 5 working days, after which you can download your updated e-Aadhaar." }
    ]
  },
  "aadhaar-authentication": {
    title: "Aadhaar Authentication: Dynamic Biometric & OTP Verification Logs",
    badge: "Secure e-KYC",
    intro: "Aadhaar Authentication is a process by which the Aadhaar number, along with demographic or biometric data (fingerprints or iris scans), is submitted to UIDAI's Central Identities Data Repository (CIDR) for verification. The CIDR checks the submitted data against records and returns a simple Yes/No confirmation.",
    moreIntro: "This system enables digital paperless onboarding (e-KYC) for telecom operators, banks, financial services, and passport offices. Understanding how authentication works helps you secure your data and detect any biometric breaches instantly.",
    checklistTitle: "Types of Aadhaar Authentication Channels",
    checklist: [
      "Demographic Authentication: Matching name, date of birth, gender, and address records against the database.",
      "One-Time Password (OTP): A secure 6-digit dynamic numerical code sent to the registered mobile number during verification.",
      "Biometric Verification: Checking physical fingerprints or iris patterns using certified scanner devices.",
      "Multi-Factor Authentication: Combining OTP and biometrics to authorize high-security bank or passport requests."
    ],
    tableTitle: "Authentication Slabs and Security Rules",
    tableHeaders: ["Auth Channel", "Security Level", "User Action Required", "Use Case"],
    tableRows: [
      ["Demographic Matching", "Basic", "Provide Name / DOB Details", "Initial database onboarding"],
      ["OTP Verification", "Medium-High", "Enter 6-digit dynamic SMS code", "Online bank accounts, ITR filing"],
      ["Fingerprint Scan", "High", "Place finger on certified scanner", "SIM cards, banking kiosks, ration shops"],
      ["Iris Scanning", "Ultra-High", "Look into eye biometric scanner", "Aadhaar updates, passport approvals"],
      ["Face Authentication", "High", "Face scan via smartphone camera", "Jeevan Pramaan, e-KYC apps"]
    ],
    faqs: [
      { q: "What is Aadhaar authentication?", a: "It is a secure digital lookup verifying if a resident's Aadhaar number and biometrics match official records, returning a Yes/No response." },
      { q: "What is e-KYC?", a: "Electronic Know Your Customer (e-KYC) is a process where residents authorize UIDAI to share their verified address and demographic details with banks or telecom operators." },
      { q: "Can my biometric data be stolen during authentication?", a: "No. UIDAI mandates that all biometric authentication devices must encrypt biometrics at the scanner level, preventing middleman thefts." },
      { q: "What is biometric locking?", a: "It is a privacy feature allowing you to lock your fingerprints and iris details on the UIDAI portal, making biometric authentications impossible until unlocked by you." },
      { q: "Does UIDAI charge for authentications?", a: "Authentications are free for individual residents. Registered business entities pay nominal transaction fees to UIDAI." },
      { q: "Why did my biometric authentication fail?", a: "Failures occur due to worn-out finger ridges, dirty scanner glass, poor lighting during iris scans, or mismatched biometric profiles (requiring an update)." },
      { q: "Can a bank open an account without my consent?", a: "No. Every Aadhaar authentication requires explicit user consent, validated via an OTP or biometric scan." },
      { q: "What is a Sub-AUA?", a: "A Sub-Aadhaar User Agency is a business organization that leverages active authentication services through a licensed main agency (AUA)." },
      { q: "How can I track who accessed my Aadhaar data?", a: "You can log in to the UIDAI portal or BanksCart to view your 'Aadhaar Authentication History', which logs every single request from the last 6 months." },
      { q: "Can authentication happen without a mobile number?", a: "Only biometric-based offline or physical authentication can happen without mobile links. Online OTP-based auth strictly requires an active linked mobile number." }
    ]
  },
  "aadhaar-authentication-history": {
    title: "Aadhaar Authentication History: Monitor Secure Access Logs",
    badge: "Account Audit Logs",
    intro: "UIDAI provides a powerful privacy tool allowing residents to check their **Aadhaar Authentication History** online. This service lets you monitor all authentication requests made using your Aadhaar number over the past six months, including the date, time, type of authentication, and name of the agency.",
    moreIntro: "Auditing your logs consistently is highly recommended to protect your identity. If you spot any unrecognized transactions or unauthorized bank queries, you can lock your credit details and register an official complaint immediately.",
    checklistTitle: "What is Displayed in the History Logs?",
    checklist: [
      "Authentication Type: Identifies if the check was Biometric, Demographics, OTP, or e-KYC.",
      "Date & Time Stamp: Provides the precise millisecond record of when the authorization occurred.",
      "Requestor Agency Name: Shows the exact name of the bank, telecom operator, or government agency that requested data.",
      "Response Code: Shows if the transaction was successful (Success) or failed (Failure)."
    ],
    tableTitle: "Understanding Authentication Log Parameters",
    tableHeaders: ["Report Parameter", "Data Content", "Privacy Protection", "User Action Plan"],
    tableRows: [
      ["Auth Type", "Biometric / OTP / Demographic", "Indicates the exact verification method used", "Detect unauthorized biometric queries"],
      ["Date & Time", "DD-MM-YYYY HH:MM:SS", "Logs precise timeline", "Crosscheck with your bank SMS alerts"],
      ["Agency Name", "Name of Bank / Telecom / Govt", "Identifies the query source", "Detect unauthorized account checks"],
      ["Transaction ID", "Unique alphanumeric string", "Secures transaction tracing", "Quote this ID in official UIDAI disputes"],
      ["Response Code", "Success / Failure Flag", "Verifies if data was cleared", "Investigate unexplained success logs"]
    ],
    faqs: [
      { q: "How can I check my Aadhaar authentication history?", a: "Log in to the UIDAI portal using your Aadhaar number and OTP, click on 'Aadhaar Authentication History', select the date range, and view your logs." },
      { q: "How far back can I retrieve authentication history?", a: "UIDAI allows you to view up to 50 logs within a maximum date range of the past 6 months." },
      { q: "What should I do if I see an unauthorized authentication?", a: "Lock your biometrics instantly via the UIDAI portal or mAadhaar app, and register a complaint by calling the toll-free number 1947." },
      { q: "Why are there failed authentications in my history?", a: "Failed logs indicate incorrect OTP entries, fingerprint mismatch alerts, or network timeout issues that prevented verification." },
      { q: "Can I download my history report?", a: "Yes. You can download the complete history report as a secure password-protected PDF directly from the portal." },
      { q: "What is the password for the downloaded PDF?", a: "The PDF password is the first 4 letters of your name in CAPITAL letters, followed by your birth year (e.g., GAUR1995)." },
      { q: "Can private agencies delete my authentication logs?", a: "No. Authentication logs are stored securely in UIDAI's Central Identities Repository, and private parties have zero delete permissions." },
      { q: "Does checking history drop my credit rating?", a: "No. This is an administrative audit check and has absolutely zero connection to your credit score or CIBIL ratings." },
      { q: "What is an AUA name in logs?", a: "It is the registered name of the Aadhaar User Agency (like a bank or payment gateway) that processed the authentication." },
      { q: "How long are authentication logs kept by UIDAI?", a: "UIDAI retains historical database logs for up to several years for audit compliance, though only the past 6 months are visible online to residents." }
    ]
  },
  "aadhaar-card-download-print": {
    title: "Download & Print Aadhaar: Quick PDF Generation Guide",
    badge: "Digital Card Dispatch",
    intro: "Downloading and printing your Aadhaar card online is a 100% free, paperless service provided by UIDAI. Whether you lost your original letter or need a fresh copy to submit for a loan application, you can download a secure, digitally signed PDF version of your Aadhaar instantly.",
    moreIntro: "The downloaded E-Aadhaar PDF is fully password-protected and contains a secure QR code that banks and private verifiers can scan to authenticate your identity offline. You can choose to download a standard card or a secure 'Masked Aadhaar'.",
    checklistTitle: "Methods to Download Your Aadhaar Card",
    checklist: [
      "Aadhaar Number: Log in using your 12-digit Aadhaar number and registered mobile OTP.",
      "Enrollment ID (EID): If you just enrolled, use the 28-digit Enrollment ID found on your acknowledgment slip.",
      "Virtual ID (VID): Log in using a temporary 16-digit Virtual ID to secure your actual card number.",
      "mAadhaar App: Download and view your active digital profile instantly on your mobile smartphone."
    ],
    tableTitle: "Card Options and Passwords Guide",
    tableHeaders: ["Card Variant", "Visible Numbers", "Password Format", "Best Use Case"],
    tableRows: [
      ["Regular E-Aadhaar", "All 12 digits visible", "4 Letters (Name) + Birth Year", "Passport, Bank Account opening"],
      ["Masked E-Aadhaar", "Only last 4 digits (XXXX-XXXX-1234)", "4 Letters (Name) + Birth Year", "Hotel check-ins, local verifications"],
      ["Aadhaar PVC Card", "Physical plastic card (credit-card size)", "No password required (Physical)", "Wallet card, durable proof"],
      ["E-Aadhaar Letter", "Full letter printed copy", "4 Letters (Name) + Birth Year", "Official government dossiers"]
    ],
    faqs: [
      { q: "How do I download my E-Aadhaar PDF?", a: "Visit the UIDAI portal, click 'Download Aadhaar', enter your 12-digit Aadhaar number and captcha, submit the OTP received on your mobile, and download the PDF." },
      { q: "What is the password for my Aadhaar PDF?", a: "The password is a combination of the first 4 letters of your name in CAPITAL letters, followed by your birth year (e.g., GAUR1995)." },
      { q: "How can I download a Masked Aadhaar?", a: "During the download process, tick the checkbox that asks 'Do you want a masked Aadhaar?' before requesting the OTP." },
      { q: "Is a downloaded printout valid for bank KYC?", a: "Yes. UIDAI has legally certified that a clean printout of your E-Aadhaar letter is fully valid for all banking KYC checks." },
      { q: "What is the fee for downloading e-Aadhaar?", a: "Downloading E-Aadhaar online is 100% free of cost. Lenders or centers charging download fees are violating UIDAI guidelines." },
      { q: "What is an Aadhaar PVC Card?", a: "It is a durable, water-resistant plastic card issued by UIDAI with security features like holograms and microtext, orderable online for ₹50." },
      { q: "How can I download Aadhaar without a registered mobile number?", a: "You cannot download E-Aadhaar online without a registered mobile number. You must visit a local center to link your mobile first or order a PVC card." },
      { q: "What is the secure QR code on my E-Aadhaar?", a: "It is a secure, digitally signed barcode containing your photo, name, gender, DOB, and address, scanable offline for safe verifications." },
      { q: "Can I download my Aadhaar using only my name?", a: "No. You first need to retrieve your Aadhaar number or Enrollment ID online by verifying your registered mobile number." },
      { q: "Is E-Aadhaar digital signature valid automatically?", a: "Yes, though the PDF may show a yellow question mark ('Signature Not Verified'). You must open the PDF in Adobe Reader to validate the digital certificate." }
    ]
  },
  "aadhaar-card-for-non-resident-indian": {
    title: "NRI Aadhaar Card: Enrolment Rules & Eligibility Guides",
    badge: "Global Citizen Identity",
    intro: "Non-Resident Indians (NRIs) who hold a valid Indian Passport are fully eligible to apply for an Aadhaar Card. The Ministry of External Affairs and UIDAI have simplified rules, allowing NRIs to apply for an Aadhaar card offline immediately upon arrival in India, bypassing the standard 182-day residential stay requirement.",
    moreIntro: "Having an Aadhaar card makes managing financial transactions in India much easier for NRIs. It simplifies opening NRO/NRE bank accounts, buying properties, filing Indian IT Returns, and maintaining active local mobile connections.",
    checklistTitle: "Important Guidelines for NRI Aadhaar Applications",
    checklist: [
      "Indian Passport Mandatory: You must present a valid physical Indian passport as primary identity proof.",
      "Bypass Stay Rule: NRIs do not need to wait for 182 days; they are eligible for immediate enrollment upon arrival.",
      "Overseas Address Option: Lenders and centers allow you to submit international addresses (optional) supported by passport logs.",
      "Registered Mobile: NRIs can link local Indian mobile numbers or select international mobile numbers during enrollment."
    ],
    tableTitle: "NRI Aadhaar Checklist & Process Overview",
    tableHeaders: ["Enrolment Parameter", "Required Document", "Processing Cost", "Turnaround Slabs"],
    tableRows: [
      ["Proof of Identity (POI)", "Valid Physical Indian Passport", "Free of Cost (First Time)", "Up to 90 Days"],
      ["Proof of Address (POA)", "Passport / Overseas Bank Statement", "Free of Cost", "3 to 10 Working Days"],
      ["Biometric Logs", "10 Fingerprints + 2 Iris scans + Photo", "Free of Cost", "Instant at Seva Kendra"],
      ["Mobile Linkage", "Active Indian or International Mobile", "₹50 (If updated later)", "24 Hours to process"],
      ["PVC Card Delivery", "Orderable to Indian address", "₹50 (Optional charge)", "7 to 15 Days delivery"]
    ],
    faqs: [
      { q: "Are NRIs eligible to get an Aadhaar card?", a: "Yes. Any NRI holding a valid Indian Passport is fully eligible to enroll for an Aadhaar card at any Aadhaar Seva Kendra in India." },
      { q: "Do NRIs need to reside in India for 182 days to apply?", a: "No. The government has waived the 182-day wait period for NRIs holding valid Indian passports, allowing them to apply immediately upon arrival." },
      { q: "Is a passport mandatory for NRI Aadhaar?", a: "Yes. A valid Indian Passport is the single mandatory proof of identity for NRI Aadhaar enrollments." },
      { q: "Can NRIs apply for Aadhaar card online?", a: "You can book an appointment online to skip queues, but the actual biometric enrollment must be done physically at an Aadhaar center in India." },
      { q: "Can I link an international mobile number to my Aadhaar?", a: "Yes. UIDAI has upgraded systems to allow select international mobile numbers to be registered for OTP verifications." },
      { q: "Is Aadhaar card mandatory for NRIs?", a: "Aadhaar is not mandatory for NRIs, but it is highly recommended for executing property transactions, tax filings, and opening NRE/NRO accounts in India." },
      { q: "Can OCI (Overseas Citizen of India) cardholders apply?", a: "OCI cardholders who reside in India for 182 days or more are eligible. OCIs who do not meet the stay criteria are not eligible as they do not hold Indian passports." },
      { q: "How can an NRI update their Aadhaar address?", a: "NRIs can update their address online by uploading valid overseas bank statements, utility bills, or passport copies showing the new address." },
      { q: "What is the fee for NRI Aadhaar enrollment?", a: "First-time enrollment is 100% free of cost at all official government Aadhaar centers." },
      { q: "Can I get my NRI Aadhaar card physically delivered overseas?", a: "No. UIDAI only delivers physical cards to valid pin codes inside India. NRIs must download their E-Aadhaar PDF online to access their card abroad." }
    ]
  },
  "aadhar-form": {
    title: "Aadhaar Card Application Form: Download Official PDF & Guidelines",
    badge: "Official UIDAI Forms",
    intro: "The official Aadhaar Card Application Form is a comprehensive document released by UIDAI. It is utilized for both first-time Aadhaar enrollments and demographic or biometric update requests at physical Aadhaar Seva Kendras across India.",
    moreIntro: "At BanksCart, we provide direct official download links and step-by-step guidelines on how to fill out the form accurately. Providing correct details prevents bank verification delay loops and secures fast biometric clearances.",
    checklistTitle: "Sections of the Aadhaar Enrollment Form",
    checklist: [
      "Select Action Type: Check the box for either 'New Enrollment' or 'Update/Correction'.",
      "Biometric Details: Specify if you require Fingerprint, Iris, or Photo updates.",
      "Relationship Slabs: Fill in parent or guardian details (mandatory for Baal Aadhaar applicants under 5).",
      "Document Verifications: Circle the matching POI, POA, DOB, and POR documents being physically submitted."
    ],
    faqs: [
      { q: "Where can I download the official Aadhaar enrollment form?", a: "You can download the official PDF free of cost from the UIDAI portal, BanksCart, or collect a physical copy at any local Aadhaar center." },
      { q: "Is the same form used for name or address updates?", a: "Yes. The unified 'Aadhaar Enrolment / Update Form' is used for both fresh enrollments and updating personal records." }
    ]
  },
  "news": {
    title: "Aadhaar Card Latest News & Policy Amendments 2026",
    badge: "Official UIDAI Newsroom",
    intro: "Stay informed on the latest Aadhaar Card news, policy announcements, security circulars, and system upgrades released by UIDAI. The government constantly refines demographic update rules, security systems, and e-KYC guidelines.",
    moreIntro: "Recent amendments enforce mandatory biometric updates for children crossing age slabs, dynamic OTP linkages for subsidy accounts, and enhanced security layers for virtual identity (VID) cards.",
    checklistTitle: "Recent Key Aadhaar Policy Highlights",
    checklist: [
      "Free Online Updates: UIDAI extends seasonal fee waivers for demographic updates on the myAadhaar portal.",
      "Document Freshness: Mandatory uploading of fresh proof of identity and address for Aadhaar cards issued over 10 years ago.",
      "Mobile e-KYC Security: Linked phone numbers now receive alerts for any demographic changes automatically.",
      "Sovereign Gold & Subsidy Locks: Strict requirements of linked Aadhaar verification to release DBT subsidies."
    ],
    faqs: [
      { q: "Is it compulsory to update Aadhaar details every 10 years?", a: "Yes. UIDAI strongly advises residents who got their Aadhaar card issued over 10 years ago and have never updated it, to upload fresh identity and address proofs online." },
      { q: "What is the toll-free customer support number?", a: "The official UIDAI toll-free customer care number is 1947, operating 24/7." }
    ]
  },
  "aadhaar-card-password": {
    title: "Aadhaar Card PDF Password: Open Your E-Aadhaar Securely",
    badge: "Security & Encryption Guides",
    intro: "Every downloaded E-Aadhaar PDF file is highly encrypted by UIDAI to protect your sensitive personal details. To open your downloaded e-Aadhaar card letter, you must enter a highly structured 8-character password unique to your identity.",
    moreIntro: "At BanksCart, we explain the exact password combinations to ensure you can unlock your PDF instantly for bank verifications, online KYC checks, or passport applications.",
    checklistTitle: "Aadhaar PDF Password Combination Rules",
    checklist: [
      "Rule 1 (First 4 Letters): The first four characters of your name exactly as per Aadhaar in CAPITAL letters.",
      "Rule 2 (Year of Birth): The next four characters are your Year of Birth in YYYY numerical format.",
      "Special Case (Short Names): If your name is under 4 characters, use your full name in capitals followed by the birth year (e.g. AM1995 for AM).",
      "Special Case (Name Initials): Spaces in names are omitted; use characters to fill the 4-letter slot."
    ],
    faqs: [
      { q: "What is the password for my downloaded e-Aadhaar PDF?", a: "The password is the first 4 letters of your name in CAPITAL letters, followed by your year of birth (e.g. if name is RAHUL and birth year is 1990, password is RAHU1990)." },
      { q: "How can I remove the password from my Aadhaar PDF?", a: "You can open the PDF in Google Chrome, enter the password, select 'Print' > 'Save as PDF' to save a decrypted copy without security passwords." }
    ]
  },
  "aadhaar-card-services": {
    title: "Aadhaar Online Services List: Reconcile E-KYC Slabs",
    badge: "Unified Service Hub",
    intro: "UIDAI hosts a vast ecosystem of online and offline services to assist residents. Managing these resources online enables seamless linking of tax IDs, downloading e-cards, locking biometrics, and verifying database records securely.",
    moreIntro: "At BanksCart, we simplify access by categorizing all digital services in a single high-performance dashboard, helping you verify active parameters in seconds.",
    checklistTitle: "Categorized Aadhaar Services Chart",
    checklist: [
      "Enrollment Services: Book appointments online, check status, locate nearest permanent Seva Kendras.",
      "Update Services: Online address updates, update request tracking, checking update logs history.",
      "Verification Services: Verify email and mobile number linkages, retrieve lost EIDs/UIDs online.",
      "Security Services: Lock/Unlock active biometrics, generate 16-digit Virtual IDs (VID), verify offline QR codes."
    ],
    faqs: [
      { q: "Which Aadhaar services are completely free?", a: "Online downloads, verifying card status, and checking authentication logs are 100% free online." },
      { q: "Can I update my email address online?", a: "No. Email and mobile number registrations require a one-time biometric verification physically at an authorized center." }
    ]
  },
  "aadhaar-card-update-correction": {
    title: "Aadhaar Card Update & Correction: Demographic Change Guide",
    badge: "Official Data Rectification",
    intro: "Demographic records on your Aadhaar card (Name, address, Date of Birth, Gender) must match your active legal profiles exactly. UIDAI provides structured online and offline correction mechanisms to rectify spelling errors or address changes.",
    moreIntro: "Ensuring your Aadhaar is fully corrected avoids rejection loops when applying for banking products, personal loans, or government subsidies.",
    checklistTitle: "Core Demographic Correction Limits",
    checklist: [
      "Name Slabs: Allowed to correct or change only twice in a lifetime under valid marriage or gazette proofs.",
      "Date of Birth: Permitted to correct only once, within a maximum variance limit of 3 years from initial entries.",
      "Gender Specification: Allowed to rectify only once on system databases.",
      "Address changes: Unlimited corrections permitted online by uploading valid utility, bank, or rent proofs."
    ],
    faqs: [
      { q: "Can I update my name on my Aadhaar card online?", a: "For security reasons, name and date of birth updates require physical biometric authorization at an Aadhaar Seva Kendra." },
      { q: "What is the fee for making corrections at a local center?", a: "The official fee is ₹50 for demographic updates (Name/Address/DOB) and ₹100 for complete biometric updates." }
    ]
  },
  "aadhaar-card-verification": {
    title: "Aadhaar Card Verification: Verify Number Authenticity Online",
    badge: "Security & Fraud Controls",
    intro: "Aadhaar Card Verification is a secure lookup service enabling residents and private verifiers (like employers or landlords) to confirm that an Aadhaar number is genuine, active, and registered in the UIDAI database.",
    moreIntro: "Running verification is a powerful fraud protection tool. It confirms the owner's general age range, gender, home state, and registered mobile digits (masked) instantly.",
    checklistTitle: "Why Perform Aadhaar Verification Checks?",
    checklist: [
      "Detect Fake Numbers: Instantly confirms if a 12-digit code is genuine or forged.",
      "Check Active Status: Verifies if card is currently active or suspended by UIDAI due to missing updates.",
      "Masked Mobile Match: Reconciles the registered mobile digits to confirm ownership.",
      "Prevent Identity Frauds: Ensures high-security checks for hotel check-ins or tenant selections."
    ],
    faqs: [
      { q: "How can I verify if an Aadhaar card is genuine?", a: "Use the 'Verify Aadhaar' tool on the UIDAI portal or BanksCart. Enter the 12-digit number and captcha to see active demographic indicators." },
      { q: "Will a deactivated Aadhaar card show up in verification?", a: "No. Deactivated numbers return an error state indicating the card is invalid or suspended." }
    ]
  },
  "aadhaar-centre-in-jammu-and-kashmir": {
    title: "Aadhaar Centers in Jammu & Kashmir: Directory & Booking Guides",
    badge: "J&K Local Directory",
    intro: "Locating registered **Aadhaar Centers in Jammu & Kashmir** (J&K) is the first step to processing fresh enrollments or demographic changes. Permanent Seva Kendras operate across Srinagar, Jammu, Anantnag, Baramulla, and other major districts.",
    moreIntro: "Managed by UIDAI in coordination with local district magistrates, these centers provide biometric and document verifications under strict security parameters.",
    checklistTitle: "Services Offered at Jammu & Kashmir Centers",
    checklist: [
      "Fresh Enrollments: Free registrations for first-time J&K residents.",
      "Mandatory Biometric Updates: Fingerprints and iris scans for children between 5 and 15 years.",
      "Mobile Linking: Linking J&K active mobile numbers to receive dynamic OTPs.",
      "Local address updates: Change addresses under valid domicile or utility bills verification."
    ],
    faqs: [
      { q: "Where is the primary Aadhaar Seva Kendra in Jammu?", a: "The primary SK is located in the central municipal complex, Jammu, with additional hubs in Srinagar district headquarters." },
      { q: "Do J&K residents need domicile certificates for Aadhaar?", a: "Domicile is a highly valid address proof, though standard passport, PAN, and bank statements are also accepted." }
    ]
  },
  "aadhaar-correction-form": {
    title: "Aadhaar Correction Form: Download & Instructions",
    badge: "Official UIDAI Forms",
    intro: "The Aadhaar Correction Form is a crucial document utilized to request modifications to your existing Aadhaar details. If you change addresses, correct name spellings, or link new mobile numbers, you must submit this filled form at a local center.",
    moreIntro: "At BanksCart, we provide direct official download links and step-by-step guidance to ensure your form is fully approved by bank verify officers.",
    checklistTitle: "Guidelines to Fill the Correction Form",
    checklist: [
      "Action Type: Must tick the box marked 'Correction/Update'.",
      "Exact Alphanumeric Details: Write in clear CAPITAL letters matching your supporting POI/POA documents.",
      "Aadhaar Number: Mandatory to fill in your active 12-digit card number in the designated grids.",
      "Biometric Details: Explicitly mark checkboxes if seeking fingerprint or iris updates."
    ],
    faqs: [
      { q: "Can I use a single form to correct both name and address?", a: "Yes. You can mark both checkboxes and submit multiple supporting documents under a single correction request." },
      { q: "Are printouts of the form accepted at Seva Kendras?", a: "Yes. Clean A4 size printouts of the PDF downloaded from BanksCart are fully accepted at all centers." }
    ]
  },
  "aadhaar-kyc": {
    title: "Aadhaar KYC: e-KYC Slabs & Offline XML Guides",
    badge: "Paperless Verification",
    intro: "Aadhaar KYC (Know Your Customer) is a secure, digital method of verifying your identity using UIDAI databases. It replaces physical paperwork, enabling banks, investment companies, and telecom carriers to onboard you in minutes.",
    moreIntro: "Aadhaar KYC is available in three secure variants: Online Biometric/OTP e-KYC, Offline Paperless XML files, and secure QR code scanning.",
    checklistTitle: "Variants of Aadhaar KYC Verification",
    checklist: [
      "Online e-KYC: OTP or biometric checks directly linking bank accounts in 10 seconds.",
      "Offline Paperless XML: Sharing a secure, digitally signed, password-protected ZIP file containing demographic details.",
      "Secure QR Code Scan: Instantly scans photo and identity details offline without sharing card numbers.",
      "Virtual ID (VID): Generating a temporary 16-digit VID to complete KYC, maintaining card number privacy."
    ],
    faqs: [
      { q: "What is the difference between e-KYC and Offline Aadhaar KYC?", a: "e-KYC is an online process sharing verified data via OTP/Biometrics directly. Offline KYC uses secure local files (XML or QR codes) without internet access." },
      { q: "Is Aadhaar e-KYC safe?", a: "Yes. e-KYC requires your explicit biometric or OTP authorization and is strictly regulated under national IT and privacy acts." }
    ]
  },
  "aadhaar-card-enrolment-centre": {
    title: "Aadhaar Enrollment Centers: Locating Permanent Seva Kendras",
    badge: "Official UIDAI Directory",
    intro: "UIDAI operates permanent Aadhaar Enrollment Centers at major bank branches, head post offices, and civic centers across the country. Locate authorized points to complete first-time enrollments or biometric updates safely.",
    moreIntro: "At BanksCart, we optimize your search by mapping official locations, operational hours, and contact details for permanent centers, helping you skip queues.",
    checklistTitle: "Permanent Enrollment Center Facility Checklist",
    checklist: [
      "Permanent Infrastructure: Complete hardware suites for iris scans, fingerprints, and high-def photos.",
      "Standard Pricing: Strictly charges standard UIDAI-approved fees without administrative markups.",
      "Certified Operators: Services executed strictly by licensed UIDAI supervisors and operators.",
      "Appointment Booking: Allows slot pre-bookings online to minimize turnaround waiting times."
    ],
    faqs: [
      { q: "What is the charge for first-time Aadhaar enrollment?", a: "First-time enrollment for any resident of India is 100% free of cost at all official centers." },
      { q: "Are bank-run Aadhaar centers more secure?", a: "All authorized centers follow equivalent security standards, but banks offer clean, structured appointment slots." }
    ]
  },
  "how-to-fill-aadhaar-enrolment-form": {
    title: "How to Fill Aadhaar Enrollment Form: Step-by-Step Guidelines",
    badge: "Demographic Data Formats",
    intro: "Filling out the Aadhaar Enrollment/Correction form correctly is critical. Errors or spelling differences between the form and your submitted documents can lead to immediate rejection by UIDAI verify systems.",
    moreIntro: "This blueprint details how to fill each column, select action codes, list parent credentials, and state verifying documents cleanly.",
    checklistTitle: "Column-by-Column Form Filling Instructions",
    checklist: [
      "Capital Letters: Write strictly in block CAPITAL letters to avoid transcription errors.",
      "Name Spelling: Match name characters exactly with your submitted passport or PAN card.",
      "Relationship Details: Mandatory for minor applicants; write parent/guardian name and Aadhaar number.",
      "Proof specifications: State the exact name of documents being attached (e.g. 'SBI Bank Statement' for POA)."
    ],
    faqs: [
      { q: "Can I use white correction fluid on the Aadhaar form?", a: "No. Forms with overwriting or correction fluid are rejected. Always submit a clean, error-free form." },
      { q: "Do I need to sign the form?", a: "Yes. Signature or thumb impression is mandatory at the bottom of the form before submitting." }
    ]
  },
  "aadhaar-seva-kendra": {
    title: "Aadhaar Seva Kendra (ASK): Dedicated UIDAI Services Centers",
    badge: "Official Seva Kendras",
    intro: "Aadhaar Seva Kendras (ASK) are state-of-the-art dedicated centers operated directly by UIDAI or registered partners. They offer a premium, computerized environment for residents to seek Aadhaar enrollment, update, and related security services.",
    moreIntro: "ASKs feature high-capacity desks, touch-screen appointment booths, and transparent fee displays, guaranteeing a smooth and hassle-free experience.",
    checklistTitle: "Advantages of Aadhaar Seva Kendras (ASK)",
    checklist: [
      "High Capacity: Multiple processing desks to handle high resident volumes efficiently.",
      "Aadhaar PVC Card Services: Order and verify plastic durable wallet cards physically.",
      "Biometric Upgrades: Computerized iris and fingerprint verification with immediate clearance logs.",
      "Complaints Cell: On-site assistance desks to resolve dispute filings and delayed cards."
    ],
    faqs: [
      { q: "What are the timing of official Aadhaar Seva Kendras?", a: "ASKs are typically open from 09:30 AM to 05:30 PM, including Saturdays." },
      { q: "Can I book a same-day appointment at an ASK?", a: "Yes, subject to slot availability on the myAadhaar appointment booking portal." }
    ]
  },
  "aadhaar-update-history": {
    title: "Aadhaar Update History: Reconcile Life-Time Update Logs",
    badge: "Data Integrity Records",
    intro: "Aadhaar Update History is a unique privacy service that allows residents to view a complete chronicle of all changes made to their Aadhaar card since its creation. This includes name changes, address updates, DOB corrections, and mobile linkages.",
    moreIntro: "This historical report is valuable for verifying previous addresses or name changes during high-security background checks or mortgage evaluations.",
    checklistTitle: "What is logged in your Update History?",
    checklist: [
      "Update Request Date: Time stamp of when each request was submitted.",
      "URN & Transaction ID: Unique identifiers to track individual data entries.",
      "Demographic Fields: Logs exactly what parameters (Name, DOB, Address) were changed.",
      "Before/After States: Displays the previous record alongside the revised record for audit."
    ],
    faqs: [
      { q: "How can I view my Aadhaar update history?", a: "Log in to the UIDAI portal, click on 'Aadhaar Update History', verify with your mobile OTP, and download your history statement." },
      { q: "Is the biometric history visible in this log?", a: "No. This history logs demographic modifications only. Biometric lock/unlock events are audited in authentication history logs." }
    ]
  },
  "aadhar-card-customer-care-number": {
    title: "Aadhaar Customer Care Number: Toll-Free Helpline 1947",
    badge: "UIDAI Support Desk",
    intro: "UIDAI operates a robust, multi-lingual customer support system to assist residents with any queries regarding enrollment, delayed cards, or portal glitches. The primary helpline number is **1947**, reachable toll-free across all states.",
    moreIntro: "At BanksCart, we provide all customer care contacts, regional office details, email helpdesks, and dispute escalation matrices to help you resolve your Aadhaar grievances fast.",
    checklistTitle: "UIDAI Official Support Contact Channels",
    checklist: [
      "Toll-Free Helpline: Call 1947 to connect with multi-lingual support agents 24/7.",
      "Official Support Email: Send your grievances and transaction IDs to help@uidai.gov.in.",
      "Social Media Support: Reach out to official UIDAI handles (@UIDAI) for quick online query answers.",
      "Regional Grievance Desks: Visit or mail UIDAI Regional Offices located in major state capitals."
    ],
    faqs: [
      { q: "Is the Aadhaar customer care number free of charge?", a: "Yes. 1947 is a 100% toll-free number from all mobile networks inside India." },
      { q: "How can I check my complaint status?", a: "You can track your case number online via the UIDAI support portal or by quoting it to the helpline agent." }
    ]
  },
  "aadhar-card-signature": {
    title: "Aadhaar Card Signature: Validate Digital PDF Signatures",
    badge: "Digital Certificate Guides",
    intro: "Every downloaded E-Aadhaar PDF contains a digitally signed certificate from UIDAI verifying its authenticity. When opened in standard PDF viewers, this signature often displays as 'Signature Not Verified' with a yellow question mark.",
    moreIntro: "To submit your E-Aadhaar for official bank verifications, you must validate this digital signature to display a green checkmark indicating the certificate is valid.",
    checklistTitle: "How to Validate Aadhaar Digital Signature",
    checklist: [
      "Open in Adobe Reader: Open your downloaded E-Aadhaar PDF strictly using Adobe Acrobat Reader.",
      "Click Signature Panel: Click on the signature box displaying 'Signature Not Verified'.",
      "Access Properties: Go to Signature Properties > Show Signer's Certificate.",
      "Trust Certificate: Navigate to the 'Trust' tab, click 'Add to Trusted Certificates', and click OK to show the green tick."
    ],
    faqs: [
      { q: "Why does my downloaded e-Aadhaar show a question mark on the signature?", a: "This happens because your PDF reader does not have UIDAI's digital certificate added to its trusted store automatically." },
      { q: "Is the e-Aadhaar valid if the signature is not validated?", a: "Yes, but banks and passport offices prefer a green checkmark to ensure immediate clearance without manual verifications." }
    ]
  }
};

export const generateCityCenters = (citySlug: string): AadharCenter[] => {
  const cityName = citySlug
    .split('-')
    .map(word => {
      if (word.toLowerCase() === 'in' || word.toLowerCase() === 'centres' || word.toLowerCase() === 'centers') return '';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .filter(Boolean)
    .join(' ');

  return [
    {
      name: `Main Aadhaar Seva Kendra, ${cityName}`,
      address: `Plot No. 42-A, Ground Floor, Sector 3, Near Civic Center, ${cityName} - Pin 400001`,
      type: "Permanent",
      timing: "09:30 AM to 06:00 PM (Monday to Saturday)",
      contact: "1947 / ask@uidai.gov.in"
    },
    {
      name: `Post Office Aadhaar Service Branch, ${cityName}`,
      address: `General Post Office (GPO), Main Bazar Area, Head Post Office Compound, ${cityName} - Pin 400002`,
      type: "Post Office",
      timing: "10:00 AM to 04:30 PM (Monday to Friday)",
      contact: "1947 / ask@uidai.gov.in"
    },
    {
      name: `State Bank of India (SBI) Enrolment Point, ${cityName}`,
      address: `SBI Main Branch, Opposite Railway Station, Commercial Square, ${cityName} - Pin 400003`,
      type: "Bank Branch",
      timing: "10:00 AM to 03:00 PM (Bank Working Hours)",
      contact: "1947 / ask@uidai.gov.in"
    },
    {
      name: `Union Bank Aadhaar Update Center, ${cityName}`,
      address: `Union Bank Building, 1st Floor, Link Road Cross, ${cityName} - Pin 400004`,
      type: "Bank Branch",
      timing: "10:30 AM to 04:00 PM (Bank Working Hours)",
      contact: "1947 / ask@uidai.gov.in"
    },
    {
      name: `Municipal Corporation Aadhaar Point, ${cityName}`,
      address: `Ward Office Premises, Civic Administrative Headquarters, Room No. 12, ${cityName} - Pin 400005`,
      type: "Enrolment & Update",
      timing: "09:30 AM to 05:00 PM (Monday to Saturday)",
      contact: "1947 / ask@uidai.gov.in"
    }
  ];
};

export const generateCityAadharPage = (citySlug: string): AadharPageContent => {
  const rawCity = citySlug
    .replace('aadhaar-card-centers-in-', '')
    .replace('aadhaar-card-centres-in-', '')
    .replace('aadhaar-centre-in-', '')
    .replace('aadhaar-center-in-', '');
  
  const cityName = rawCity
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const centersList = generateCityCenters(rawCity);

  return {
    title: `Aadhaar Card Centers in ${cityName}: UIDAI Enrolment & Update Points`,
    badge: `Local UIDAI Directory`,
    intro: `Locating an authorized **Aadhaar Card Center in ${cityName}** is the first step to executing biometric updates, first-time enrollments, or linking mobile numbers securely. UIDAI has partnered with leading post offices, nationalized banks, and municipal offices in ${cityName} to host permanent Aadhaar Seva Kendras.`,
    moreIntro: `Residents of ${cityName} can visit any of these registered centers physically with valid proof of identity and address documents. Booking an appointment online via the UIDAI portal is highly recommended to bypass long queues and secure instant service clearances.`,
    checklistTitle: `Services Available at ${cityName} Aadhaar Centers`,
    checklist: [
      `Fresh Aadhaar Enrollment: 100% free service for first-time applicants in ${cityName}.`,
      "Mandatory Biometric Update: Update fingerprints and iris logs for children crossing 5 and 15 years.",
      "Mobile and Email Registration: Biometrically verify and link active phone numbers to authorize secure OTPs.",
      "Demographic Updates: Correct names, dates of birth, addresses, and gender specifications on physical records."
    ],
    centers: centersList,
    faqs: [
      { q: `What is the closest permanent Aadhaar center in ${cityName}?`, a: `UIDAI operates a primary permanent Aadhaar Seva Kendra in the central district of ${cityName}, alongside dedicated points in Head Post Offices and major bank branches (like SBI and Union Bank).` },
      { q: `Do I need to book an online appointment before visiting a ${cityName} center?`, a: "Online appointment booking is optional but highly recommended, as it allocates a specific time slot and ensures you get processed in under 15 minutes." },
      { q: `What are the charges for updating an address at a ${cityName} center?`, a: "A standard government-approved fee of ₹50 is charged for all demographic updates (Name, Address, DOB, Gender) at any local center." },
      { q: `Can children get enrolled at these centers in ${cityName}?`, a: "Yes. Biometric enrollment for children under 5 years is done without fingerprints (Baal Aadhaar), and requires parent biometric consents." },
      { q: `How long does it take for details to update after visiting a center in ${cityName}?`, a: "Most demographic changes and mobile linkages are updated in the database within 3 to 7 working days, with a maximum SLA of 90 days." },
      { q: `Which documents are accepted for address updates in ${cityName}?`, a: "Common accepted proofs include utility bills (electricity, water) under 3 months old, bank statements, rent agreements, voter IDs, and passports." },
      { q: `Can I update my mobile number online without visiting a center?`, a: "No. Mobile updates strictly require biometric fingerprint verification, which is only possible physically at an authorized center." },
      { q: `Are local municipal ward offices in ${cityName} authorized for Aadhaar work?`, a: "Yes. Select municipal corporation headquarters in ${cityName} operate dedicated Aadhaar desks for local citizens." },
      { q: `What should I do if a center in ${cityName} overcharges for services?`, a: "You can report overcharging violations immediately by calling the toll-free helpline 1947 or filing a complaint on the official UIDAI website." },
      { q: `Are permanent Aadhaar centers open on Sundays?`, a: "Most bank and post office centers are closed on Sundays. However, select corporate-run Aadhaar Seva Kendras operate on weekends for convenience." }
    ]
  };
};
