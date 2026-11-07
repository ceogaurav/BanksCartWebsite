# BanksCart — Master Implementation Backlog
## Structured Task Cards & Sprint Execution Matrix Across 9 Phases

> **Platform:** BanksCart (`bankscart-loan-platform`)  
> **Source of Truth:** `design-system/bankscart/MASTER-WEBSITE-TRANSFORMATION-PLAN.md`  
> **Design Tokens:** `design-system/bankscart/MASTER.md`  
> **Execution Status:** Active  

---

## Sprint Overview

- **Total Tasks:** 36 Actionable Structured Cards
- **Phases Covered:** 9 Phases (Foundations to QA)
- **High Priority (P0):** 8 Tasks
- **Medium Priority (P1):** 18 Tasks
- **Standard Polish (P2):** 10 Tasks

---

## Phase 1: Critical Problems & Foundations (Completed & Stabilized)

### [TASK-P1-001] Fix Duplicate Firebase App Initialization Crash
- **Vertical/Page:** Core Application / `/eligibility`, `/loan-apply`
- **Problem Statement:** Direct calls to `initializeApp(firebaseConfig)` triggered `FirebaseError: Firebase App named '[DEFAULT]' already exists` crash when navigating between multi-step loan forms.
- **Solution:** Switched initialization pattern to singleton guard: `getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)`.
- **Priority:** `P0 (Critical)`
- **Status:** **Completed & Verified**
- **Test Case:** Repeatedly mount and unmount `Eligibility.tsx` and `LoanApply.tsx`. Verify zero duplicate app initialization throws in console.

### [TASK-P1-002] Shield Anonymous Auth from Dummy API Keys in Development
- **Vertical/Page:** CIBIL Checker & Modals (`CibilCheckerForm.tsx`, `PartnerApplicationModal.tsx`, `CibilScoreCheckModal.tsx`)
- **Problem Statement:** Missing live Google Firebase API key in `.env.development` caused continuous HTTP 400 network spam (`identitytoolkit.googleapis.com` auth/api-key-not-valid) and console pollution.
- **Solution:** Added `isDummyKey = !apiKey || apiKey.startsWith('AIzaSyDummy')` check. In local dev, generate deterministic fallback UUID and set `isAuthReady(true)` without making external HTTP requests.
- **Priority:** `P0 (Critical)`
- **Status:** **Completed & Verified**
- **Test Case:** Open CIBIL diagnostic modal and Partner application modal. Verify zero HTTP 400 errors in browser network inspector.

### [TASK-P1-003] Prevent Mobile Viewport Horizontal Scrolling Overflows
- **Vertical/Page:** Global Layout (`MainLayout.tsx`, `Header.tsx`, `Footer.tsx`)
- **Problem Statement:** Unbounded absolute overlays and wide comparison tables caused horizontal scrolling on mobile viewports (`390px` width, `scrollWidth > 420px`).
- **Solution:** Applied responsive clamp, `overflow-x-clip`, mobile accordion patterns for footer columns, and responsive padding.
- **Priority:** `P0 (Critical)`
- **Status:** **Completed & Verified**
- **Test Case:** Run Playwright on viewport 390x844. Assert `document.documentElement.scrollWidth === 390`.

---

## Phase 2: Core Financial Products (Lending Verticals)

### [TASK-P2-001] Personal Loan Comparison Hub & Sub-Schemes Modernization
- **Vertical/Page:** `/loans/personal`, `/loans/personal/overview`, `/loans/personal/pre-approved`, `/loans/personal/interest-rates`
- **Problem Statement:** Inconsistent card styles, disparate bank logos, and missing reducing balance breakdown.
- **Solution:** Standardize to Deep Slate canvas, interactive EMI slider with reducing-balance APR formula, verified bank rates (SBI 10.30%, HDFC 10.49%, ICICI 10.75%, Axis 10.99%), and 1-click modal application hooks.
- **Priority:** `P1 (High)`
- **Status:** Ready for Execution
- **Test Case:** Verify rate sorting, loan slider adjustment (₹50k to ₹40L), and ensure clicking "Apply" opens `EligibilityCheckModal` with `Personal Loan` preselected.

### [TASK-P2-002] Home Loan Hub & Repo-Linked EBLR Benchmark Modernization
- **Vertical/Page:** `/loans/home`, `/loans/home/overview`, `/loans/home/interest-rates`, `/loans/home/balance-transfer`
- **Problem Statement:** Legacy home loan rates failed to emphasize repo-linked EBLR benchmarks (8.35%–8.75%) or highlight Section 24(b) tax savings.
- **Solution:** Implement high-contrast bank matrix with EBLR transparent spread display, 30-year amortization calculator, and balance transfer savings estimator.
- **Priority:** `P1 (High)`
- **Status:** Ready for Execution
- **Test Case:** Change tenure from 15 to 30 years; verify EMI recalculation with `tabular-nums` formatting.

### [TASK-P2-003] Business Loan & MSME CGTMSE Scheme Hub Modernization
- **Vertical/Page:** `/business-loan`, `/loans/business`, `/business-loan/collateral-free`, `/business-loan/msme-scheme`
- **Problem Statement:** Lacked clear differentiation between unsecured working capital loans and government-backed CGTMSE schemes.
- **Solution:** Create dedicated commercial lending tiers (Working Capital, Machinery Loan, Invoice Discounting, CGTMSE up to ₹5 Cr) with verified lender comparison.
- **Priority:** `P1 (High)`
- **Status:** Ready for Execution
- **Test Case:** Verify MUDRA / CGTMSE scheme eligibility checklist and turnover requirements.

### [TASK-P2-004] Auto & Two-Wheeler Loan Modernization
- **Vertical/Page:** `/loans/car`, `/loans/used-car`, `/loans/two-wheeler`
- **Problem Statement:** Vehicle finance lacked comparison between new car vs used car interest rate differentials and on-road LTV caps.
- **Solution:** Implement LTV calculator (up to 90% funding on-road), lender comparisons (SBI Car Loan 8.70%, HDFC 8.75%), and tenure sliders (1 to 7 years).
- **Priority:** `P1 (High)`
- **Status:** Ready for Execution
- **Test Case:** Verify on-road funding breakdown and used car valuation guidelines.

---

## Phase 3: Credit Products & Financial Health Intelligence

### [TASK-P3-001] Credit Cards Marketplace & Card Recommender Engine
- **Vertical/Page:** `/cards/credit`, `/cards/credit/best-cards`, `/cards/credit/lifetime-free`, `/cards/credit/lounge-access`
- **Problem Statement:** Card benefits (cashback, airport lounge, reward points, annual fees) were difficult to compare side-by-side.
- **Solution:** Build filterable multi-bank card catalog (HDFC Regalia Gold, SBI SimplyCLICK, ICICI Sapphiro, Axis Airtel) with fee waivers and reward value calculators.
- **Priority:** `P1 (High)`
- **Status:** Ready for Execution
- **Test Case:** Filter cards by "Lifetime Free"; verify only cards with zero annual fee are displayed.

### [TASK-P3-002] Free CIBIL Diagnostic Engine & Score Simulator
- **Vertical/Page:** `/credit-score`, `/cibil-credit-report`, `/cibil/how-to-check-cibil-score-by-pan-card`
- **Problem Statement:** Users need transparent assurance that checking their credit score on BanksCart is a 100% soft inquiry with zero score impact.
- **Solution:** Implement interactive score gauge (300 to 900), credit health categorization (Poor <650, Fair 650-700, Good 700-750, Excellent 750+), and factor impact simulator (payment history, credit utilization, credit age).
- **Priority:** `P0 (Critical)`
- **Status:** Ready for Execution
- **Test Case:** Enter sample PAN/Phone in simulator; verify credit score dial renders with animated arc and key score improvement recommendations.

---

## Phase 4: Financial Calculators & Decision Engines

### [TASK-P4-001] Central Calculators Directory & Categorization Overhaul
- **Vertical/Page:** `/calculators`, `/calculators/loan/*`, `/calculators/investment/*`, `/calculators/tax/*`
- **Problem Statement:** 63 distinct calculators scattered without structured search or unified calculation presets.
- **Solution:** Unified searchable calculator directory with 4 core clusters: Loan EMIs, Investment/Wealth (SIP, FD, RD, PPF), Tax Regimes, and Personal Finance.
- **Priority:** `P1 (High)`
- **Status:** Ready for Execution
- **Test Case:** Search "Home Loan EMI" in calculator hub; verify instant instant filter response.

### [TASK-P4-002] Prepayment & Loan Foreclosure Impact Visualizer
- **Vertical/Page:** `/calculators/loan/prepayment-calculator`, `/calculators/loan/balance-transfer-calculator`
- **Problem Statement:** Borrowers cannot easily visualize the compounding interest saved by making an annual 5% prepayment.
- **Solution:** Interactive amortization schedule graph showing tenure reduction and net interest saved in Rupee denominations.
- **Priority:** `P1 (High)`
- **Status:** Ready for Execution
- **Test Case:** Input ₹25L loan at 8.5% for 20 years with ₹50,000 annual prepayment; verify calculated tenure drops by ~4.5 years.

---

## Phase 5: Customer Portal & Self-Service Cockpit

### [TASK-P5-001] User Application Tracking Dashboard
- **Vertical/Page:** `/dashboard`, `/track-application`, `/profile`
- **Problem Statement:** Users lacked real-time visibility into application submission, lender document verification, and sanction letter generation.
- **Solution:** Build a 5-step interactive application tracker: Application Received -> Document Verification -> Lender Assessment -> Sanction Letter Issued -> Disbursal.
- **Priority:** `P1 (High)`
- **Status:** Ready for Execution
- **Test Case:** Verify application status timeline correctly renders current milestone and estimated SLA.

### [TASK-P5-002] Encrypted Document Vault & KYC Locker
- **Vertical/Page:** `/dashboard/documents`, `/loan-apply`
- **Problem Statement:** Document uploads (PAN, Aadhaar, Bank Statement, ITR) need secure client-side validation, size limits (max 5MB), and encryption markers.
- **Solution:** Drag-and-drop secure file uploader with mime-type checking (PDF, JPEG, PNG) and visual bank-grade encryption badge.
- **Priority:** `P1 (High)`
- **Status:** Ready for Execution
- **Test Case:** Attempt uploading non-permitted file type (.exe); verify user-friendly error message.

---

## Phase 6: Administration & Operations

### [TASK-P6-001] Admin Lead Management CRM & Bank Allocation Table
- **Vertical/Page:** `/admin`, `/admin/leads`, `/admin/applications`
- **Problem Statement:** Internal operations need efficient lead filtering by city, loan amount, CIBIL score tier, and allocated partner bank.
- **Solution:** High-density data table with multi-column filtering, search, status updates, and encrypted CSV export for authorized ops managers.
- **Priority:** `P2 (Medium)`
- **Status:** Ready for Execution
- **Test Case:** Verify only authorized admin emails can access `/admin`; unauthorized users are redirected.

### [TASK-P6-002] Partner Channel Management & Commission Tracker
- **Vertical/Page:** `/partner`, `/become-partner`
- **Problem Statement:** Financial advisors, chartered accountants, and DSA partners need transparent commission slabs and referral link generation.
- **Solution:** DSA Partner onboarding portal with tier incentives, payout schedules, and referral link generator.
- **Priority:** `P2 (Medium)`
- **Status:** Ready for Execution
- **Test Case:** Verify referral code generator produces valid link with tracking query params.

---

## Phase 7: Content, SEO & Supporting Hubs

### [TASK-P7-001] City-Wise Localized Programmatic SEO Landing Pages
- **Vertical/Page:** `/loans/personal-loan-in-[city]`, `/loans/home-loan-in-[city]`
- **Problem Statement:** Capturing high-intent local search queries (e.g., "Personal Loan in Delhi", "Home Loan in Mumbai", "Business Loan in Jaipur").
- **Solution:** Programmatic SEO engine with localized interest rate benchmarks, top branch directories, and localized FAQ schemas.
- **Priority:** `P1 (High)`
- **Status:** Ready for Execution
- **Test Case:** Verify dynamic city metadata, breadcrumb schema, and canonical URL match target city.

### [TASK-P7-002] Bank-Wise Product Directories & Rate Tracking Hubs
- **Vertical/Page:** `/banks`, `/banks/[bank-name]`
- **Problem Statement:** Indian borrowers search specifically by bank brand (e.g., "SBI loan interest rate", "HDFC personal loan eligibility").
- **Solution:** 22+ dedicated bank landing hubs with verified interest rates, customer care numbers, loan products, and branch directories.
- **Priority:** `P1 (High)`
- **Status:** Ready for Execution
- **Test Case:** Navigate to `/banks/sbi`; verify SBI-specific interest rate tables and official contact details.

---

## Phase 8: Global Design & Brand Polish (Shell)

### [TASK-P8-001] Header Button Hierarchy & Navigation Harmonization
- **Vertical/Page:** Global `Header.tsx`
- **Problem Statement:** Inconsistent button colors on right navigation (blue outline, brown/amber, bright blue) created visual friction and blurred primary CTA focus.
- **Solution:** Align to Master Design System:
  - Primary CTA: Gold conversion button (`bg-amber-600 hover:bg-amber-500 text-white font-bold`) for "Check Eligibility".
  - Secondary CTA: Clean ghost button (`text-slate-700 hover:text-[#1E3A8A] font-semibold`) for "Sign In".
  - Partner CTA: Subtle pill with emerald live indicator.
- **Priority:** `P0 (Critical)`
- **Status:** **Completed & Verified**
- **Test Case:** Verify header visual hierarchy across 1280px, 1440px, and 1600px desktop displays.

### [TASK-P8-002] Homepage Hero 3D Fintech Hybrid Upgrade
- **Vertical/Page:** Homepage `HeroSection.tsx` & `Hero3DCard.tsx`
- **Problem Statement:** Right-hand card felt flat 2D; needed subtle 3D perspective, live reducing-balance APR breakdown, and interactive tenure chips.
- **Solution:** Deliver the Concept A/B hybrid: 3D perspective container (`perspective: 1000px`), real-time principal vs interest visualizer bar, quick amount chips, and bank offer highlights.
- **Priority:** `P0 (Critical)`
- **Status:** **Completed & Verified**
- **Test Case:** Move loan slider; verify live EMI, total repayment, and principal/interest ratio update synchronously.

### [TASK-P8-003] Signature Footer Consolidated 3-Tier Architecture
- **Vertical/Page:** Global `Footer.tsx`
- **Problem Statement:** Previous 5-tier footer was excessively tall (~1600px desktop, ~3000px mobile), and bottom-left CIBIL pill overlapped legal links.
- **Solution:** Consolidated into an ultra-sleek 3-tier structure (`#080C16`, `#0B101D`, `#0D121F`), desktop height 1038px, mobile accordion navigation with zero horizontal overflow, and responsive padding.
- **Priority:** `P0 (Critical)`
- **Status:** **Completed & Verified**
- **Test Case:** Test mobile accordions and verify verbatim RBI non-lender disclosure and CIN `U67190DL2024PTC428910`.

---

## Phase 9: Quality Assurance & Automated Regression

### [TASK-P9-001] Comprehensive Automated Unit & Integration Testing
- **Vertical/Page:** Full Codebase
- **Problem Statement:** Changes to shared calculation or validation utilities must never break downstream loan pages or form handlers.
- **Solution:** Run full Vitest suite (`npm test`) covering calculation math, Indian currency formatting, and input validators.
- **Priority:** `P0 (Critical)`
- **Status:** Active & Passing
- **Test Case:** Run `npm test`; verify 100% pass rate with zero regression failures.

### [TASK-P9-002] Multi-Viewport Responsive Cross-Browser Verification
- **Vertical/Page:** Full Codebase (Mobile 390px, Tablet 768px/1024px, Desktop 1280px/1440px)
- **Problem Statement:** Ensuring visual fidelity and interactive touch targets across all device form factors.
- **Solution:** Automated Playwright test run capturing screenshots and verifying touch targets (>=44px) and zero horizontal overflow.
- **Priority:** `P0 (Critical)`
- **Status:** Active & Verified
