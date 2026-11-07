# BanksCart – Comprehensive Phased Implementation Plan

> **Source:** Synthesized from `design-system/bankscart/WEBSITE-ROADMAP.md`, platform codebase audit, and fintech security requirements.  
> **Status:** Roadmap Converted into Atomic User Stories for GSD & Ralph Execution.

---

## Overview of Implementation Phases

| Phase | Core Domain | Focus Areas | Status |
| :--- | :--- | :--- | :--- |
| **Phase 1** | Core Lending Products | Personal, Home, Business, Car Loans & Comparison Pages | ✅ Completed in Batches 1–4, 9 |
| **Phase 2** | Cards & Credit Intelligence | Credit Cards Hub, CIBIL Credit Score, Credit Advisory | ✅ Completed in Batches 3, 7 |
| **Phase 3** | Financial Calculators | 39 Calculators Suite, Width/Alignment, Income Tax | ✅ Completed in Batches 5, 9, 10 |
| **Phase 4** | Customer & Administration | User Profile, Application Tracking, Document Upload, Admin | ⏳ **READY FOR NEXT SPRINT** |
| **Phase 5** | Supporting & Utility Pages | Specialized Registration, Banking Hubs, Legal & Policy | 📋 Backlog |

---

## PHASE 4 – Customer & Administration (Immediate Next Priority)

### User Story 4.1: User Profile & KYC Upload Dashboard
- **Feature:** Customer Self-Service Profile, Application Tracking, and KYC Document Upload Pipeline.
- **Type:** Existing feature upgrade.
- **Relevant Source Files:**
  - `src/pages/Profile.tsx` (`/profile`)
  - `src/components/profile/ApplicationHistory.tsx`
  - `src/components/profile/CreditScoreTab.tsx`
  - `src/components/profile/EmploymentDetails.tsx`
  - `src/components/profile/DocumentsTab.tsx` (or equivalent)
- **User Story:**
  - *As an authenticated BanksCart applicant, I want a secure, centralized dashboard to view my loan application history, monitor my CIBIL score updates, and upload mandatory KYC documents (PAN, Aadhaar, salary slips, bank statements) so that my loan approval proceeds smoothly.*
- **Expected Behavior:**
  - 5-tab responsive navigation: Overview, Application History, Credit Bureau Status, Employment Profile, Document Vault.
  - Drag-and-drop file uploader with real-time size (max 5MB) and MIME type checking (`application/pdf`, `image/jpeg`, `image/png`).
  - Application progress tracker: Submitted → In Verification → Lender Review → Sanctioned → Disbursed.
- **Design Requirements:**
  - BanksCart Deep Slate (`#0F172A`) header card with user avatar and verification badge.
  - Trust Navy (`#1E3A8A`) active tab indicators; Gold CTA (`#A16207`) for "Upload New Document" and "Resume Application".
  - Standard `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` layout.
- **API & Backend Dependencies:**
  - Firebase Auth (`currentUser`), Firestore (`users/{uid}`, `applications`), Firebase Storage (`users/{uid}/documents/`).
- **Acceptance Criteria:**
  1. Profile page loads at `/profile` for logged-in users; redirects unauthenticated users to login modal with return path.
  2. Tab state switches seamlessly without URL reload or layout shift.
  3. Sensitive PII (PAN, Aadhaar) is masked in the UI display.
  4. Zero TypeScript errors (`npx tsc --noEmit`) and passing unit tests.
- **Automated Tests:**
  - Unit test in `tests/unit/profile.test.ts` for file validation helper (rejects `.exe`, files > 5MB).
  - Playwright test in `tests/e2e/profile.test.ts` for tab switching and breadcrumb presence.
- **Manual Verification:**
  - Verify tab switching on mobile (375px) and desktop (1280px). Check file upload error handling when submitting oversized file.
- **Rollback Consideration:**
  - Preserve `Profile.tsx.bak` before editing. Revert via git if Firebase auth listener breaks.

---

### User Story 4.2: Application Status Lookup Tracker
- **Feature:** Real-time loan & card application lookup with reference number and mobile OTP.
- **Type:** Existing feature upgrade / new interface refinement.
- **Relevant Source Files:**
  - `src/pages/Status.tsx` (`/status` or `/track-application`)
  - `src/components/modals/ApplicationStatusModal.tsx`
- **User Story:**
  - *As an applicant who applied for a loan without creating a permanent account, I want to enter my Application Reference Number (e.g., `BC-2026-XXXX`) and mobile number to see the live status of my application.*
- **Expected Behavior:**
  - Input form with Reference ID and Mobile Number.
  - Visual timeline step tracker with status descriptions and lender underwriting notes.
- **Design Requirements:**
  - Clean Slate card with vertical or horizontal responsive status stepper.
  - Status badges: Blue (Under Review), Amber (Documents Needed), Green (Approved), Red (Rejected).
- **API & Backend Dependencies:**
  - Firestore query `applications` collection by `referenceId` and `phone`.
- **Acceptance Criteria:**
  1. Accessible at `/status` with standard Breadcrumbs (`Home > Track Application`).
  2. Displays clear error message if reference ID is invalid or not found.
  3. Responsive layout conforming to `MASTER.md`.
- **Automated Tests:**
  - Unit test for reference number format validation (`BC-[0-9]{4}-[A-Z0-9]+`).
- **Manual Verification:**
  - Test query with sample reference ID; verify timeline renders properly on mobile.
- **Rollback Consideration:**
  - Self-contained page; revert single file if Firestore query structure differs.

---

### User Story 4.3: Admin Portal & Applications Review Workflow
- **Feature:** Internal loan application triage and review dashboard.
- **Type:** Existing internal feature upgrade.
- **Relevant Source Files:**
  - `src/pages/admin/AdminDashboardPage.tsx` (`/admin/dashboard`)
  - `src/pages/admin/AdminApplicationsPage.tsx` (`/admin/applications`)
  - `src/pages/admin/AdminUsersPage.tsx` (`/admin/users`)
  - `src/layouts/AdminLayout.tsx`
- **User Story:**
  - *As a BanksCart loan officer or admin, I want to filter loan applications by status, loan type, and date, review applicant documents, and update status codes (Approved, Docs Pending, Disbursed) to manage borrower pipelines.*
- **Expected Behavior:**
  - Protected admin route (requires admin claim or role in Firestore).
  - Data table with sorting, pagination, and multi-status filtering.
  - Quick action modal to update application notes.
- **Design Requirements:**
  - Professional Deep Slate enterprise sidebar with crisp metrics cards and tabular data.
- **API & Backend Dependencies:**
  - Firebase Auth admin claim verification, Firestore `applications` collection pagination.
- **Acceptance Criteria:**
  1. Strictly forbidden to standard borrowers (redirects to unauthorized or login).
  2. Paginated list loads efficiently without fetching all documents at once.
  3. Updating status writes audit log with timestamp and officer ID.
- **Automated Tests:**
  - Unit test verifying role check helper rejects regular borrower UID.
- **Manual Verification:**
  - Log in with test admin credentials; verify filter by "Home Loan" and status "In Verification".
- **Rollback Consideration:**
  - Admin changes do not affect public customer-facing routes.

---

## PHASE 5 – Supporting Pages & Financial Registrations

### User Story 5.1: Specialized Identity & Banking Hubs
- **Pages:**
  - `PanCard.tsx` (`/pan-card`)
  - `AadharCard.tsx` (`/aadhaar-card` / `/pan-aadhaar-link`)
  - `IFSCFinder.tsx` (`/ifsc-code`)
- **Status:** Existing pages requiring Master Design System harmonization (`max-w-7xl`, breadcrumbs, Deep Slate headers).

### User Story 5.2: Legal, Privacy & Compliance Suite
- **Pages:**
  - `PrivacyPolicyPage.tsx` (`/privacy-policy`)
  - `TermsAndConditionsPage.tsx` (`/terms-and-conditions`)
  - `DisclaimerPage.tsx` (`/disclaimer`)
  - `GrievanceRedressalPage.tsx` (`/grievance-redressal`)
- **Status:** Existing pages requiring Indian DPDP Act compliance notices, RBI ombudsman escalation matrix, and design system polish.
