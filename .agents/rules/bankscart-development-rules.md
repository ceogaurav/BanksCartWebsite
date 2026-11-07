# BanksCart Development Rules

Reference: `AGENTS.md` and `design-system/bankscart/DEVELOPMENT-RULES.md`.

## Mandatory Rules Summary
1. Design: Deep Slate (`#0F172A`), Trust Blue (`#1E3A8A`), Gold CTA (`#A16207`), Emerald (`#059669`), `max-w-7xl` layout, IBM Plex Sans typography.
2. Tools: UI/UX Pro Max for design; GSD Core for specs/milestones; Ralph-style PRDs for atomic user stories.
3. Quality: Must pass `npx tsc --noEmit` and `npm test` before considering any task complete.
4. Security: Zero exposure of PAN, Aadhaar, secrets, or customer PII.
5. Scope: Touch only the requested pages. No unauthorized commits, pushes, or deployments.
