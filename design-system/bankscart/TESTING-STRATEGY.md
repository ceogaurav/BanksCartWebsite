# BanksCart – Automated Testing & Quality Assurance Strategy

> **Goal:** Provide automated, repeatable testing across financial mathematics, responsive UI, accessibility (WCAG AA), and browser end-to-end user journeys.

---

## 1. Testing Pyramid Architecture

```
                    ┌─────────────────────────┐
                    │   Playwright E2E &      │
                    │   Axe-Core A11y Audits  │  (Critical User Journeys & WCAG AA)
                    ├─────────────────────────┤
                    │   Component & UI State  │  (React Testing Library)
                    ├─────────────────────────┤
                    │   Vitest Unit Tests     │  (EMI, Compound Interest, Tax Slabs, PII)
                    └─────────────────────────┘
```

---

## 2. Testing Levels & Tooling

### Level 1: Unit & Calculations Testing (Vitest)
- **Tool:** `vitest@^2.1.8`
- **Configuration:** [`vitest.config.ts`](file:///Users/apple/Downloads/BANKSCART%20WEBSITE/vitest.config.ts)
- **Directory:** `tests/unit/`
- **Execution Command:**
  ```bash
  npm test              # Run single pass
  npm run test:watch    # Interactive watch mode during development
  ```
- **Coverage Areas:**
  1. **Reducing Balance EMI:** Validates `P * r * (1+r)^n / ((1+r)^n - 1)` across loan tenures (1 to 30 years) and rates (8% to 24%).
  2. **Compound Interest & Future Value:** Quarterly, monthly, and annual compounding accuracy.
  3. **Tax Slabs Engine:** New Tax Regime (Section 115BAC with ₹75k standard deduction and 87A rebate) vs Old Tax Regime deductions (80C, 80D, 24b, NPS).
  4. **Currency Formatter:** Proper formatting with `₹` and Indian comma grouping (`10,00,000`).

---

### Level 2: End-to-End & Critical Journey Testing (Playwright)
- **Tool:** `@playwright/test`
- **Configuration:** [`playwright.config.ts`](file:///Users/apple/Downloads/BANKSCART%20WEBSITE/playwright.config.ts)
- **Directory:** `tests/e2e/`
- **Execution Command:**
  ```bash
  npm run test:e2e
  ```
- **Coverage Areas:**
  1. **Homepage Critical Path:** Navigation to Loan categories, eligibility check trigger, hero CTA.
  2. **Loan Application Modal:** Opening modal, selecting loan type, step progression, input validation.
  3. **Calculators Hub:** Navigation across 39 calculators, slider interaction, and real-time result updates.
  4. **Responsive Layout Verification:** Desktop (1280px), Tablet (768px), and Mobile (375px) without horizontal scroll.

---

### Level 3: Automated Accessibility Audits (axe-core)
- **Tool:** `@axe-core/playwright`
- **Standard:** WCAG 2.1 Level AA
- **Integration:** Runs directly inside Playwright test specs (`tests/e2e/accessibility.test.ts`).
- **Enforced Checks:**
  - Semantic HTML landmarks (`<main>`, `<nav>`, `<header>`, `<footer>`).
  - Form controls have associated labels (`htmlFor` matching input `id`).
  - Color contrast ratios (minimum 4.5:1 for body text, 3:1 for large text).
  - ARIA attributes on accordions, tabs, and modals (`aria-expanded`, `aria-label`).
  - Keyboard navigation and focus indicators.

---

### Level 4: SEO, Sitemaps & Performance (Lighthouse CI & Prerender Checks)
- **Tools:** Custom pre-render verification (`scripts/generate-static-pages.cjs`), Sitemap indexer (`scripts/generate-sitemap.js`), `@lhci/cli`.
- **Pre-Deploy Verification Commands:**
  ```bash
  npm run build           # Validates TypeScript, bundle, sitemap, and 1,252 static HTML pages
  npm run lint            # ESLint static analysis
  ```
- **Threshold Criteria:**
  - Zero TypeScript compile errors (`npx tsc --noEmit`).
  - Zero broken canonical URLs or empty meta tags.
  - Sitemaps must validate 1,250+ URLs across all 6 segmented sub-sitemaps.
  - Page weight: JavaScript bundles gzipped < 1.5MB.

---

## 3. Continuous Backpressure Gate in Ralph / GSD

Whenever an agent or developer implements a user story:
1. `npm test` must output: `Test Files 1 passed, Tests passed`.
2. `npx tsc --noEmit` must output: `Exited with code 0`.
3. If shared components or layout files are touched, run `npm run test:e2e`.
4. Only when all tests pass may the story be signed off as `passes: true`.
