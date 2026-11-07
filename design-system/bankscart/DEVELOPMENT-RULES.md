# BanksCart – Master Development & Compliance Rules

> **Applicability:** All developers, AI agents, and automated build pipelines operating on `bankscart-loan-platform`.

---

## 1. Design & UX Standards

1. **Master Design System Compliance:**
   - All visual elements must adhere strictly to `design-system/bankscart/MASTER.md`.
   - **Primary Palette:** Deep Slate Navy (`#0F172A`), Trust Blue (`#1E3A8A`), Gold CTA (`#A16207` / `#D97706` / `#F59E0B`), Emerald Success (`#059669`).
   - **Backgrounds:** Clean `#F8FAFC` (Slate-50) for pages; pure `#FFFFFF` for elevated cards. Avoid purple or indigo neon gradients.
   - **Container Layout:** Standard outer container must always be:
     ```html
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     ```
   - **Typography:** IBM Plex Sans (`font-sans`) with strict hierarchy. All monetary values, rates, and EMIs must specify `tabular-nums font-mono`.

2. **Breadcrumb Standards:**
   - Every internal product, calculator, and legal page must include `<Breadcrumb path={["Home", ...]} />` at the top of the container.

3. **Form & Slider Alignment Standards:**
   - Sliders must have their labels on the left and direct editable input badges on the right.
   - Never stack redundant full-width input boxes underneath range sliders.

---

## 2. Coding & Architectural Restrictions

1. **Maintain Integrity of Existing Integrations:**
   - **Firebase:** Preserve `src/config/firebase.ts`, Auth listeners, and Firestore collection models (`applications`, `users`, `consultations`).
   - **Supabase:** Preserve `@supabase/supabase-js` client configuration in `src/services/` or `src/config/`.
   - **Sanity CMS:** Preserve blog query pipelines in `next-sanity` / `@portabletext/react`.
   - **Razorpay:** Keep payment initiation handlers isolated; test only with test key IDs (`rzp_test_*`).

2. **Route and SEO Preservation:**
   - Never rename or delete active routes in `src/App.tsx`.
   - All pages must maintain Helmet metadata, canonical links, OpenGraph tags, and Schema.org JSON-LD.
   - Segmented sitemap generation (`npm run sitemap`) and static prerendering (`npm run static-pages`) must build with 0 errors.

3. **Atomic Changes:**
   - Keep file modifications scoped strictly to the task at hand. Do not modify unrelated pages or refactor shared global utilities without prior architectural review.

---

## 3. Financial Truth & Regulatory Compliance

1. **Zero Fabrication Policy:**
   - Never fabricate interest rates, processing fees, or lender partnerships.
   - Rates must reflect current Indian banking benchmarks (e.g., Home Loans from 8.35% p.a., Personal Loans from 10.25% p.a., Gold Loans up to RBI 75% LTV).
   - Never claim "100% Guaranteed Approval" without credit checks; use compliant language ("Subject to lender eligibility and CIBIL score").

2. **No Dummy Production Data:**
   - All calculators and forms must execute real mathematical compounding or lead persistence.

---

## 4. Security, Privacy & Fintech Data Protection

1. **PII Masking & Privacy:**
   - **PAN:** Format must be validated (`[A-Z]{5}[0-9]{4}[A-Z]{1}`). In logs and preview UIs, mask middle characters: `ABCDE****F`.
   - **Aadhaar:** Never store or log 12-digit Aadhaar numbers in plaintext. Display only last 4 digits (`XXXX-XXXX-1234`).
   - **Bank Account / IFSC:** Validate IFSC codes against RBI database format (`^[A-Z]{4}0[A-Z0-9]{6}$`).

2. **Secrets & Environment Variables:**
   - Never hardcode API keys, Firebase service keys, or database credentials.
   - All secrets must reside in `.env` / `.env.local` which are explicitly excluded in `.gitignore`.

3. **Document Upload Security:**
   - Restrict uploads to approved MIME types: `application/pdf`, `image/jpeg`, `image/png`.
   - Maximum upload size: 5MB per document.
   - Files stored in Firebase Storage or S3 must use authenticated, non-public storage rules.

---

## 5. Safe Git Initialization Guidelines

> [!NOTE]
> The current working directory is not initialized as a Git repository. To safely initialize version control without risking unintended commits, follow these exact steps:

1. **Verify `.gitignore` First:**
   Ensure `node_modules/`, `dist/`, `.env`, `.env.local`, `.gemini/`, and `.DS_Store` are present in `.gitignore`.
2. **Initialize Repository:**
   ```bash
   git init
   git branch -M main
   ```
3. **Stage Configuration & Source Files:**
   ```bash
   git add package.json package-lock.json tsconfig*.json vite.config.ts eslint.config.js index.html src/ public/ design-system/ AGENTS.md GEMINI.md
   ```
4. **Create Initial Baseline Commit (Only With User Approval):**
   ```bash
   git commit -m "chore: baseline BanksCart fintech platform with design system and test suite"
   ```
5. **Rules on Autonomous Operations:**
   - Never run `git push`, `git reset --hard`, or remote deployments without explicit user consent.
