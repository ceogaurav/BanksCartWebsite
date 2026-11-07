# BanksCart – Tool & Infrastructure Inventory

> **Last Updated:** 2026-11-05  
> **Environment:** macOS | Node.js v22.23.4 | npm 10.9.9 | Python 3.9.6

---

## 1. Installed Tools & Frameworks

| Tool | Version | Installation Scope | Path / Config | Primary Responsibility |
| :--- | :--- | :--- | :--- | :--- |
| **GSD Core** | `v1.10.0` | Project-Local | `.agents/` (`skills/`, `agents/`, `hooks/`, `settings.json`, `mcp_config.json`) | Meta-prompting, spec-driven milestone planning, codebase exploration, pre-release verification |
| **UI/UX Pro Max** | Skill Pack | Project-Local | `.agents/skills/ui-ux-pro-max/` | Fintech UX patterns, mobile ergonomics, typography scales, conversion optimization |
| **Ralph Adapter** | Custom Adapter | Project-Local | `scripts/ralph/` (`prd.schema.json`, `ralph-runner.cjs`, `template.prd.json`) | PRD task decomposition, single-story execution slices, backpressure verification |
| **Vitest** | `v2.1.9` | Project devDependency | [`vitest.config.ts`](file:///Users/apple/Downloads/BANKSCART%20WEBSITE/vitest.config.ts), `tests/unit/` | High-speed unit tests for financial mathematics (reducing EMI, compounding, tax slabs) |
| **Playwright** | `v1.64.1` | Project devDependency | [`playwright.config.ts`](file:///Users/apple/Downloads/BANKSCART%20WEBSITE/playwright.config.ts), `tests/e2e/` | Headless browser testing for critical applicant journeys and responsive layouts |
| **axe-core** | `v4.14.0` | Project devDependency | `@axe-core/playwright`, `tests/e2e/` | Automated WCAG 2.1 AA accessibility audits |
| **ESLint** | `v9.9.1` | Project devDependency | `eslint.config.js` | JavaScript & TypeScript static code quality analysis |
| **TypeScript** | `v5.5.3` | Project devDependency | `tsconfig.json`, `tsconfig.app.json` | Static type checking and compiler verification |
| **Vite** | `v5.4.2` | Project devDependency | `vite.config.ts` | Development server and production bundling |

---

## 2. Command Reference Guide

### A. Testing & Quality Verification
```bash
# Run unit tests (Vitest)
npm test

# Run unit tests in interactive watch mode
npm run test:watch

# Run browser E2E & accessibility tests (Playwright)
npm run test:e2e

# Run TypeScript static type check
npx tsc --noEmit

# Run ESLint analysis
npm run lint

# Run complete production build with sitemaps & static prerendering
npm run build
```

---

### B. Ralph PRD Workflow Commands
```bash
# Check status of user stories in prd.json
node scripts/ralph/ralph-runner.cjs status

# View next pending user story and acceptance criteria
node scripts/ralph/ralph-runner.cjs next

# Run automated verification and sign off story as PASS
node scripts/ralph/ralph-runner.cjs verify
```

---

### C. GSD Core Skills & Slash Commands
*Available directly within Antigravity:*
- `/gsd-map-codebase` — Inspect codebase structure, identify routes, and trace imports.
- `/gsd-plan-phase` — Create specifications, requirements, and milestones before modifying code.
- `/gsd-discuss-phase` — Clarify user requirements and architectural decisions.
- `/gsd-execute-phase` — Execute planned phase tasks with progress tracking.
- `/gsd-verify-work` — Verify implementation against defined acceptance criteria.
- `/gsd-code-review` — Perform automated code review against project standards.
- `/gsd-add-tests` — Generate unit and integration test suites.

---

## 3. Verification Summary

- **GSD Core Installation:** Verified. Project-local `.agents/` configured with 71 skills, Antigravity hooks in `settings.json`, and `mcp_config.json`.
- **UI/UX Pro Max Preservation:** Verified. `.agents/skills/ui-ux-pro-max/` remains 100% intact (0 diff from pre-installation state).
- **Vitest Unit Test Engine:** Verified. Ran `npm test`, passed 4 test suites in 222ms.
- **TypeScript Typecheck:** Verified. `npx tsc --noEmit` exited with code 0 (zero errors).
- **Production Build:** Verified. `npm run build` completed in 4.02s with 1,250 sitemap URLs and 1,252 static HTML pages.
