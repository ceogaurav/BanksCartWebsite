# BanksCart — Master Design System (Source of Truth)

> **LOGIC & RETRIEVAL:** When designing or building a specific page or component, first check `design-system/bankscart/pages/[page-name].md`.
> If that file exists, its page-specific rules **override** this Master file.
> If not, strictly adhere to the rules below.

---

**Project:** BanksCart (https://www.bankscart.com/)  
**Industry:** Indian Fintech, Multi-Bank Loan Comparison & Financial Services Marketplace  
**Target Offerings:** Personal Loans, Business Loans, Home Loans, Credit Cards, Credit Score Check, Loan Comparison Matrix, EMI Calculators, Financial Dashboards, Eligibility Forms  
**Target Market:** Indian Retail & MSME Borrowers, Credit Seekers, Prime & Subprime Applicants  
**Currency & Localization:** Indian Rupee (`₹`), Lakhs (`L`) & Crores (`Cr`), English (en-IN)  
**Implementation Stack:** React, Tailwind CSS, Lucide Icons, Chart.js, GSAP / Framer Motion  
**Design Dials (UI UX Pro Max):** Variance 5/10 (Balanced / Modern) | Motion 3/10 (Subtle) | Density 6/10 (Standard / Financial Dense)  

---

## 1. Visual Identity & Design Direction

- **Core Aesthetic Style:** `Minimalism & Swiss Style` + `Data-Dense Financial Dashboard`
- **Design Philosophy:** Utilitarian clarity, high institutional trust, instant legibility of complex rates/terms, friction-free loan comparison, and conversion-optimized application funnels.
- **Landing Pattern:** `Trust & Authority + Conversion`
  - *Structure:* Credibility Hook & Search / EMI Bar > Partner Banks Social Proof (SBI, HDFC, ICICI, Axis, Kotak, etc.) > Solution Comparison Matrix > Transparent Value Props > Interactive Calculators > Step-by-Step Application CTA.
- **Key Emotional Anchors:** Security (RBI compliance / 256-bit SSL), Transparency (Zero hidden charges, clear APR), Reliability (Instant paperless approval cues).

---

## 2. Color Palette & Token Architecture

The color strategy uses deep institutional **Trust Navy / Slate** as the foundational anchor, paired with **Premium Gold / Bronze** for high-priority conversion CTAs and **Emerald Green** for positive financial approvals and credit scores.

### Semantic Color Tokens

| Token Role | Hex Code | CSS Variable | Tailwind Utility | Purpose & Application |
|:---|:---|:---|:---|:---|
| **Primary** | `#0F172A` | `--color-primary` | `bg-slate-900` / `text-slate-900` | Header, high-contrast headings, primary brand surfaces |
| **On Primary** | `#FFFFFF` | `--color-on-primary` | `text-white` | Text and icons on primary surfaces |
| **Secondary (Trust Navy)** | `#1E3A8A` | `--color-secondary` | `bg-blue-900` / `text-blue-900` | Navigation bars, badges, table headers, trust elements |
| **On Secondary** | `#FFFFFF` | `--color-on-secondary` | `text-white` | Text on secondary elements |
| **Accent / CTA (Gold)** | `#A16207` | `--color-accent` | `bg-amber-700` / `hover:bg-amber-800` | "Apply Now", "Check Eligibility", high-conversion buttons |
| **On Accent / CTA** | `#FFFFFF` | `--color-on-accent` | `text-white` | Button label text (contrast ratio > 4.5:1) |
| **Success / Approval** | `#059669` | `--color-success` | `bg-emerald-600` / `text-emerald-700` | Credit score "Excellent", "Approved", lowest interest badge |
| **Warning / Notice** | `#D97706` | `--color-warning` | `bg-amber-600` / `text-amber-700` | "Documents Pending", "Fair Credit Score", limited-time offers |
| **Destructive / Error** | `#DC2626` | `--color-destructive` | `bg-red-600` / `text-red-600` | Form validation errors, rejection notices, high APR warnings |
| **Background (Light)** | `#F8FAFC` | `--color-background` | `bg-slate-50` | Primary app & page backdrop |
| **Card Surface** | `#FFFFFF` | `--color-card` | `bg-white` | Loan cards, comparison tiles, calculator panels |
| **Card Foreground** | `#020617` | `--color-card-foreground` | `text-slate-950` | Body text, card titles, table text |
| **Muted Surface** | `#E8ECF1` | `--color-muted` | `bg-slate-100` | Input backgrounds, slider tracks, subtle card headers |
| **Muted Foreground** | `#475569` | `--color-muted-foreground` | `text-slate-600` | Supporting helper text, disclaimers, metadata labels |
| **Border / Divider** | `#E2E8F0` | `--color-border` | `border-slate-200` | Card borders, comparison table row dividers |
| **Focus Ring** | `#0F172A` | `--color-ring` | `ring-slate-900` | Accessible focus outline |

---

## 3. Typography & Numerical Data Formatting

### Font Pairing
- **Primary Font Family:** `IBM Plex Sans`, sans-serif
  - Conveys institutional reliability, technical precision, and high readability in dense financial grids.
  - Distinct glyph shapes prevent number confusion (e.g., `0` vs `O`, `1` vs `l`).
- **Google Fonts Import:**
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  ```
- **Tailwind Configuration:**
  ```javascript
  // tailwind.config.js
  module.exports = {
    theme: {
      extend: {
        fontFamily: {
          sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
          mono: ['"IBM Plex Mono"', 'monospace'],
        }
      }
    }
  }
  ```

### Typography Scale & Hierarchy

| Level | Size | Weight | Line Height | Tracking | Usage in BanksCart |
|:---|:---|:---|:---|:---|:---|
| **Display 1** | `48px` / `3rem` | 700 (Bold) | `1.15` | `-0.02em` | Homepage Hero Title, Credit Score Highlight |
| **H1** | `36px` / `2.25rem` | 700 (Bold) | `1.2` | `-0.015em` | Main Category Pages (e.g. "Compare Personal Loans") |
| **H2** | `28px` / `1.75rem` | 600 (SemiBold) | `1.25` | `-0.01em` | Section Titles, Calculator Headings |
| **H3** | `22px` / `1.375rem` | 600 (SemiBold) | `1.3` | `0` | Loan Card Titles, Bank Names, Feature Headers |
| **Body Large** | `18px` / `1.125rem` | 400/500 | `1.5` | `0` | Lead paragraphs, Hero subheadings |
| **Body Regular** | `16px` / `1rem` | 400 (Regular) | `1.5` | `0` | Primary content, form input text, table cell values |
| **Body Small** | `14px` / `0.875rem` | 500 (Medium) | `1.4` | `0` | Form labels, feature lists, button labels |
| **Caption / Legal**| `12px` / `0.75rem` | 400/500 | `1.35` | `+0.01em`| Disclaimers, *T&C Apply, APR footnotes |

### Financial & Indian Number Formatting Standard
- Always use the Indian Numbering System: `₹ Lakhs` and `₹ Crores` (not Millions/Billions).
- Tabular lining numbers (`font-variant-numeric: tabular-nums` or Tailwind `tabular-nums`) must be used on all interest rates, loan amounts, and EMI calculators to prevent jumping numbers during updates.
- Formatters:
  ```typescript
  // Rupee currency formatter for Lakhs & Crores
  export const formatIndianCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  // Output: ₹1,50,000 | ₹25,00,000 | ₹1,50,00,000
  ```

---

## 4. Spacing, Elevation & Visual Density

- **Visual Density Dial:** `6/10 (Standard / Financial Data Density)`
  - Compact padding inside comparison cards and tables to allow comparison of 4–6 loan plans simultaneously without excessive scrolling.
  - Generous breathing room in heroes, value proposition headers, and credit education guides.

| Token | Pixels / Rem | Standard Application in BanksCart |
|:---|:---|:---|
| `--space-xs` | `4px` / `0.25rem` | Badge padding, icon-to-label spacing |
| `--space-sm` | `8px` / `0.5rem` | Form field inner spacing, chip gap, rating stars gap |
| `--space-md` | `16px` / `1rem` | Card padding on mobile, table cell vertical padding |
| `--space-lg` | `24px` / `1.5rem` | Card padding on desktop, modal header margin |
| `--space-xl` | `32px` / `2rem` | Grid gap between comparison cards, calculator side-by-side gap |
| `--space-2xl`| `48px` / `3rem` | Section padding (mobile) |
| `--space-3xl`| `64px` / `4rem` | Section padding (desktop), hero vertical padding |

### Elevation & Shadows
- Use crisp, subtle shadows rather than fuzzy ambient glows:
  - `shadow-sm`: `0 1px 2px 0 rgb(15 23 42 / 0.05)` — Input borders, neutral badges
  - `shadow-md`: `0 4px 6px -1px rgb(15 23 42 / 0.08), 0 2px 4px -2px rgb(15 23 42 / 0.05)` — Bank loan cards, dropdowns
  - `shadow-lg`: `0 10px 15px -3px rgb(15 23 42 / 0.1)` — Sticky comparison drawer, active calculator slider popover
  - `shadow-xl`: `0 20px 25px -5px rgb(15 23 42 / 0.12)` — Application modal dialogues

---

## 5. Component Specifications & Rules

### A. Buttons & CTAs
1. **Primary Conversion Action ("Apply Now", "Check Eligibility"):**
   - Background: `--color-accent` (`#A16207` - Premium Gold)
   - Hover: `#854D0E`
   - Active: `#713F12`
   - Height: Minimum `48px` on mobile/desktop (`h-12`)
   - Text: `font-semibold text-white tracking-wide`
   - Corner radius: `rounded-lg` (8px)
   - Visual: Include trailing arrow icon (`ArrowRight` from Lucide) with `group-hover:translate-x-1 transition-transform`.
2. **Secondary Bank Action ("View Details", "Compare Rates"):**
   - Border: `2px solid #0F172A`
   - Background: `transparent` (hover `bg-slate-100`)
   - Text: `#0F172A`
3. **Tertiary / Quick Action ("Download EMI Schedule"):**
   - Text link with underline transition and icon (`Download` or `FileText`).

### B. Loan & Credit Card Comparison Cards
- **Container Structure:**
  - White background (`bg-white`), 1px border (`border-slate-200`), rounded `rounded-xl`.
  - Hover state: `hover:border-slate-400 hover:shadow-lg transition-all duration-200`.
- **Card Hierarchy:**
  1. **Top Bar:** Partner Bank Logo (e.g. HDFC Bank, SBI) + Loan Product Name + "Featured" or "Lowest Interest" tag.
  2. **Key Metric Columns (3-Column Layout):**
     - Column 1: **Interest Rate** (e.g. `10.49% p.a.` — H3 SemiBold `#0F172A`).
     - Column 2: **Max Loan Amount** (e.g. `Up to ₹40 Lakhs`).
     - Column 3: **Tenure Range** (e.g. `12 to 60 Months`).
  3. **Secondary Attributes:** Processing Fee (e.g., `0.5% + GST`), Disbursal Speed (e.g., `Instant Disbursal / 24 Hours`).
  4. **Action Bar:** "Apply Instantly" Primary Button + "Add to Compare" Checkbox toggle.

### C. Financial Form Controls & EMI Sliders
1. **Form Fields:**
   - Always visible floating or top-aligned labels (`text-sm font-medium text-slate-700`).
   - Prefix/Suffix adornments for financial inputs: `₹` currency icon on the left, `Months`/`Years` or `%` on the right.
   - Height: `h-12` (48px) with `px-4`.
   - Focus ring: `focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10`.
2. **Accessible Error Summary:**
   - When a loan application form fails validation, render an error summary block at the top with `role="alert"` and `tabIndex={-1}`, and programmatically transfer focus to it.
   - List each failed field as a clickable link that jumps directly to the invalid input.
3. **Dual-Input Financial Sliders (EMI & Loan Amount):**
   - Track: `h-2 bg-slate-200 rounded-full`.
   - Filled Progress: `bg-slate-900 rounded-full`.
   - Thumb: `w-6 h-6 bg-white border-2 border-slate-900 shadow-md cursor-pointer hover:scale-110 active:scale-95 transition-transform`.
   - Associated numeric text box synchronized bi-directionally with the slider.

### D. Navigation Architecture
- **Global Institutional Header:**
  - Top Trust Ribbon: "RBI Registered NBFC / Bank Lending Partners | 256-bit SSL Bank-Grade Security | ISO Certified".
  - Main Bar: BanksCart Logo + Main Categories (Personal Loans, Home Loans, Business Loans, Credit Cards, Calculators) + "Free Credit Score" badge button.
- **Mobile Navigation:**
  - Drawer menu with clear visual categories.
  - Sticky bottom mobile conversion bar: Displays current selected loan summary + instant "Apply Now" button fixed at the bottom with safe area insets (`pb-safe`).

### E. Financial Charts & Visualizations

| Chart Type | Purpose in BanksCart | Library & Technique | Recommended Color Coding |
|:---|:---|:---|:---|
| **Semi-Circle Radial Gauge** | Credit Score Meter (300 to 900) | SVG / Chart.js Doughnut | 300-599: Red (`#DC2626`)<br>600-724: Amber (`#D97706`)<br>725-799: Blue (`#2563EB`)<br>800-900: Emerald (`#059669`) |
| **Donut Chart** | EMI Breakdown (Principal vs Total Interest) | Chart.js (`react-chartjs-2`) | Principal Amount: `#0F172A`<br>Total Interest: `#F59E0B` (Gold) |
| **Stacked Bar Chart** | Yearly Loan Amortization Schedule | Chart.js Bar Chart | Yearly Principal: `#1E3A8A`<br>Yearly Interest: `#E2E8F0` |
| **Feature Radar / Matrix** | Multi-Bank Credit Card Perks Comparison | Chart.js Radar Chart | 2–3 banks compared max, distinct hues with 20% opacity fill |

### F. Multi-Bank Comparison Table
- **Header:** Sticky top on scroll (`sticky top-0 bg-white z-10`).
- **First Column:** Sticky left containing Bank Logo and Plan Title (`sticky left-0 bg-white shadow-[2px_0_4px_-1px_rgba(0,0,0,0.05)]`).
- **Feature Rows:** Alternating background (`odd:bg-white even:bg-slate-50/50`).
- **Action Row:** Bottom row with sticky "Select & Proceed" CTA buttons.
- **Mobile Viewport Behavior:** Automatically fold table rows into vertically stacked comparison cards below `768px`.

---

## 6. Motion & Interaction Standards

- **Motion Intensity:** `3/10 (Subtle & Performant)`
- **Core GSAP Scroll & Reveal Standard:**
  ```javascript
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Applied to loan card grids and calculator panels
  export const initCardReveal = (element: HTMLElement) => {
    // Respect user motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    gsap.from(element, {
      opacity: 0,
      y: 12,
      duration: 0.35,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    });
  };
  ```
- **Number Counter Animation:** Use `react-countup` with `duration={1.2}` and easing for EMI amount updates upon user slider drag.
- **Transitions:** Standard `150ms` to `200ms` cubic bezier on hovers and focus states (`transition-all duration-200 ease-in-out`).

---

## 7. Accessibility Standards (WCAG 2.1 AA)

1. **Text Contrast:**
   - Body copy (`#020617` on `#FFFFFF` / `#F8FAFC`): Contrast ratio `18.5:1` (Exceeds AAA requirement).
   - Muted secondary copy (`#475569` on `#FFFFFF`): Contrast ratio `6.8:1` (Exceeds AA 4.5:1).
   - Primary CTA (`#A16207` on `#FFFFFF`): Contrast ratio `5.1:1` (Compliant with AA).
2. **Keyboard Navigation:**
   - All sliders, checkboxes, buttons, and table rows must be fully operable via Tab, Space, Enter, and Arrow keys.
   - Visible outline on `:focus-visible`: `outline: 2px solid #0F172A; outline-offset: 2px;`.
3. **Screen Reader Live Regions:**
   - Real-time loan calculations (EMI amount, total interest) must update screen reader users with `aria-live="polite"` so calculations are announced without interrupting active navigation.
4. **Icons:**
   - Informative icons must have `aria-label` or visible text.
   - Decorative icons must have `aria-hidden="true"`.

---

## 8. Anti-Patterns & Prohibited Practices

- ❌ **NO AI Pink/Purple Gradients:** Strictly avoid playful "crypto/Web3" violet gradients on institutional loan pages; adhere to Navy, Slate, and Gold.
- ❌ **NO Ambiguous or Hidden Charges:** Never display interest rates without stating whether they are flat or reducing (`p.a. on reducing balance`).
- ❌ **NO Emojis as UI Icons:** Use SVG icons exclusively (`lucide-react`).
- ❌ **NO Layout Shifts on Hover:** Avoid `scale(1.05)` that pushes neighboring cards or triggers scrollbars. Use `translateY(-2px)` and shadow elevation.
- ❌ **NO Missing Mobile Touch Targets:** Every interactive button, chip, and link must satisfy minimum `44px × 44px` physical touch target dimensions.
- ❌ **NO Inaccessible Tables:** Do not require horizontal swipe without visible indicator arrows and sticky headers.

---

## 9. Implementation Checklist for New Pages

When developing any page or component for BanksCart:
- [ ] Read `design-system/bankscart/MASTER.md` tokens and guidelines.
- [ ] Verify font is set to `IBM Plex Sans` with tabular figures for numbers.
- [ ] Format all amounts in Indian currency format (`₹`, Lakhs, Crores).
- [ ] Ensure all bank comparison cards use the 3-column metric layout.
- [ ] Validate minimum 4.5:1 text contrast for all labels and badges.
- [ ] Test mobile viewports at `375px`, `768px`, and desktop at `1024px`, `1440px`.
- [ ] Verify keyboard tab order across forms and interactive sliders.
- [ ] Check `prefers-reduced-motion` compliance.
