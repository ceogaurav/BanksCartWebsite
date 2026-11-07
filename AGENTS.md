# BanksCart – AI Agent Project Guidelines & Master Rules

These rules govern all AI assistance, automated workflows, and engineering tasks within the BanksCart codebase (`bankscart-loan-platform`).

---

## 1. Permanent Core Development Rules

1. **Follow the Approved BanksCart Design System:**
   - Adhere strictly to `design-system/bankscart/MASTER.md`.
   - Palette: Deep Slate (`#0F172A`), Trust Blue (`#1E3A8A`), Gold CTA (`#A16207` / `#D97706` / `#F59E0B`), Emerald Success (`#059669`), Clean Background (`#F8FAFC`).
   - Typography: IBM Plex Sans / system font with high contrast and readable scales.
   - Container layout: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. Tabular numbers (`tabular-nums font-mono`) for all financial data.

2. **Use UI/UX Pro Max for Design Decisions:**
   - Consult `.agents/skills/ui-ux-pro-max/` for fintech ergonomics, mobile responsive layouts, comparison tables, and accessible touch targets.

3. **Use GSD for Large Features & Phased Development:**
   - Utilize GSD Core workflows (`.agents/skills/gsd-*`) for codebase onboarding, spec-driven milestone planning, task decomposition, and execution tracking.

4. **Use Small, Independently Verifiable Tasks (The Ralph Pattern):**
   - Implement features one small user story at a time. Each story must have unambiguous acceptance criteria, automated tests, and clear verification steps before moving to the next.

5. **Preserve Existing Integrations & Backend Services:**
   - Never break or delete existing API clients, Firebase Auth/Firestore, Supabase client, Sanity CMS, Razorpay, or Deepvue KYC integrations.

6. **Preserve Authentication, Database Behavior & Business Logic:**
   - Maintain user sessions, CIBIL eligibility algorithms, and state management intact across all updates.

7. **Preserve All Existing URLs, Redirects & SEO Metadata:**
   - Preserve routes in `src/App.tsx`, breadcrumbs, canonical links, OpenGraph tags, and Schema.org JSON-LD data. Never delete existing sitemap routes.

8. **Never Fabricate Financial Claims:**
   - Never invent or hardcode misleading interest rates, fake lender partnerships, artificial reviews, or unsubstantiated approval guarantees.

9. **Never Use Dummy Data in Production Functionality:**
   - Form submissions, calculator engines, and user application flows must connect to real validation logic and proper backend persistence.

10. **Validate Forms and Protect Customer Data:**
    - Strictly sanitize and validate all inputs (PAN, Aadhaar, Phone, Email, Income) on both client and server boundaries. Follow Indian Data Protection (DPDP Act) guidelines.

11. **Never Expose Secrets or Personal Financial Information:**
    - Never commit, log, or leak API keys, Firebase service account keys, passwords, or customer PII.

12. **Never Run Live Financial Transactions During Testing:**
    - Always use mock providers or test mode credentials (e.g., Razorpay test keys). Never trigger real payment gateway charges.

13. **Never Deploy, Commit, or Push Without Explicit Approval:**
    - All code changes remain strictly in local workspace until explicitly approved by the user.

14. **Test All Affected Pages After Shared Component Changes:**
    - Run `npm test` (Vitest unit tests) and `npx tsc --noEmit` after editing shared components (e.g., `Header`, `Footer`, `Breadcrumb`, `ApplyButton`).

15. **Do Not Modify Unrelated Pages:**
    - Keep diffs tightly scoped to the specific pages or features assigned in the active phase.

16. **Document Important Technical Decisions:**
    - Record architectural decisions, schema modifications, and phase progress in `design-system/bankscart/`.

---

## 2. Multi-Tool Workflow Orchestration

- **Design Intelligence:** `.agents/skills/ui-ux-pro-max/`
- **Execution & Milestones:** `.agents/skills/gsd-*` (GSD Core)
- **Iterative Task Slicing:** Ralph PRD pattern (`scripts/ralph/`)
- **Automated Quality Checks:** Vitest (`npm test`), ESLint (`npm run lint`), Playwright (`npm run test:e2e`).
