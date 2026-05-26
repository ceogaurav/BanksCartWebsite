import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Sanity Client (Must match src/lib/sanity.ts)
// NOTE: Ensure your Project ID is set here!
const client = createClient({
    projectId: 'l23a5gbu', // Replace with your project ID
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-05-03',
});

// Helper to extract pages dynamically from FinancialDirectory.tsx to prevent duplication
// and guarantee all newly created dynamic/static routes are fully captured in the sitemap.
function extractDirectoryPages() {
    try {
        const filePath = path.resolve(__dirname, '../src/pages/FinancialDirectory.tsx');
        if (!fs.existsSync(filePath)) {
            console.log('FinancialDirectory.tsx not found, skipping dynamic page extraction.');
            return [];
        }
        const content = fs.readFileSync(filePath, 'utf8');
        // Match href: "/some-path" or href: '/some-path'
        const hrefRegex = /href:\s*["']([^"']+)["']/g;
        const pages = [];
        let match;
        while ((match = hrefRegex.exec(content)) !== null) {
            const page = match[1];
            if (page.startsWith('/') && !pages.includes(page)) {
                pages.push(page);
            }
        }
        console.log(`Extracted ${pages.length} unique pages dynamically from FinancialDirectory.tsx`);
        return pages;
    } catch (e) {
        console.error('Error extracting directory pages:', e);
        return [];
    }
}

async function generateSitemap() {
    console.log('Fetching posts for sitemap...');
    try {
        const query = `*[_type == "post"] { "slug": slug.current, publishedAt }`;
        const posts = await client.fetch(query);

        const baseUrl = 'https://bankscart.com';

        // Core and legacy static pages
        const staticPages = [
            '',
            '/loans',
            '/cards',
            '/investment',
            '/insurance',
            '/calculators',
            '/ssy-calculator',
            '/blogs/Sukanya-Samriddhi-Yojana-Guide',
            '/resources/loan-rates',
            '/eligibility',
            '/resources/ifsc-finder',
            '/status',
            '/pan-card',
            '/resources/aadhar-pan',
            '/MortgageCalculatorPage',
            '/personal-loan-emi-calculator',
            '/home-loan-emi-calculator',
            '/car-loan-emi-calculator',
            '/income-tax-calculator',
            '/plot-construction-loan',
            '/home-loan-compare',
            '/loans/home',
            '/loans/personal',
            '/loans/business',
            '/loans/car',
            '/loans/used-car',
            '/loans/two-wheeler',
            '/loans/education',
            // Personal Loan Catalog Sub-Paths
            '/loans/personal/overview',
            '/loans/personal/pre-approved',
            '/loans/personal/interest-rates',
            '/loans/personal/mobile-app',
            '/loans/personal/low-cibil-score',
            '/loans/personal/balance-transfer',
            '/loans/personal/loan-on-credit-card',
            '/loans/personal/5-lakh',
            '/loans/personal/10-lakh',
            '/loans/personal/20-lakh',
            '/loans/personal/30-lakh',
            '/loans/personal/40-lakh',
            '/loans/personal/50-lakh',
            '/loans/personal/salaried-employees',
            '/loans/personal/self-employed',
            '/loans/personal/senior-citizens',
            '/loans/personal/students',
            '/loans/personal/doctors',
            '/loans/personal/women',
            '/loans/personal/medical-loan',
            '/loans/personal/travel-loan',
            '/loans/personal/debt-consolidation',
            '/loans/personal/wedding-loan',
            '/loans/personal/overdraft-loan',
            '/loans/personal/flexi-loan',
            '/loans/personal/short-term-loan',
            '/loans/personal/term-loan',
            // Credit Card Catalog Sub-Paths
            '/cards/credit/overview',
            '/cards/credit/best-cards',
            '/cards/credit/best-forex-cards',
            '/cards/credit/cibil-score',
            '/cards/credit/eligibility',
            '/cards/credit/compare',
            '/cards/credit/rupay',
            '/cards/credit/secured',
            '/cards/credit/lifetime-free',
            '/cards/credit/rewards',
            '/cards/credit/cashback',
            '/cards/credit/lounge-access',
            '/cards/credit/virtual',
            '/cards/credit/fuel',
            '/cards/credit/travel',
            '/cards/credit/international',
            '/cards/credit/zero-forex',
            // Bonds Catalog Sub-Paths
            '/investment/bonds/overview',
            '/investment/bonds/corporate',
            '/investment/bonds/government',
            '/investment/bonds/tax-free',
            '/investment/bonds/floating-rate',
            '/investment/bonds/capital-gain',
            '/investment/bonds/zero-coupon',
            '/investment/bonds/how-to-invest',
            '/investment/bonds/sovereign-gold',
            // Fixed Deposit Catalog Sub-Paths
            '/investment/fd/rates',
            '/investment/fd/senior-citizen',
            '/investment/fd/loan-against-fd',
            '/investment/fd/fd-vs-mf',
            '/investment/fd/fd-vs-rd',
            '/investment/fd/post-office-rates',
            '/investment/fd/recurring-deposit',
            // Mutual Funds Catalog Sub-Paths
            '/investment/mutual-funds/overview',
            '/investment/mutual-funds/large-cap',
            '/investment/mutual-funds/mid-cap',
            '/investment/mutual-funds/small-cap',
            '/investment/mutual-funds/elss',
            '/investment/mutual-funds/investment',
            '/investment/mutual-funds/swp',
            '/investment/mutual-funds/flexi-cap',
            '/investment/mutual-funds/liquid',
            '/investment/fixed-deposit',
            '/investment/mutual-funds',
            '/investment/more-plans',
            '/cards/credit',
            '/cards/debit',
            '/credit-score',
            '/expert-advice',
            '/insurance/health',
            '/insurance/car',
            '/insurance/term-life',
            '/resources/gold-rates',
            '/resources/pincodes',
            '/become-partner',
            '/resources/ppf',
            '/resources/income-tax',
            '/loan-apply',
            '/blog',
            '/blogs-overview-page',
            '/blogs',
            // Bank Specific Landing Pages
            '/bank-details/sbi',
            '/bank-details/hdfc',
            '/bank-details/icici',
            '/bank-details/axis',
            '/bank-details/kotak',
            '/bank-details/pnb',
            // Static banking blogs
            '/blogs/what-is-cibil-score',
            '/blogs/Best-Credit-Cards',
            '/blogs/Business-Loan-Guide',
            '/blogs/Fixed-Deposit-Guide',
            '/blogs/Home-Loan-Guide',
            '/blogs/Investment-Plans-Guide',
            '/blogs/Loan-Eligibility-Tricks',
            '/blogs/Secured-Unsecured-Guide',
            '/blogs/Gold-Vs-Personal-Loan',
            '/blogs/Health-Insurance-Blog',
            '/blogs/Car-Loan-Interest-Rates',
            '/blogs/Card-Showdown',
            '/blogs/Tax-Saving-Guide',
            '/blogs/EMI-Explained',
            '/blogs/Loan-Mistakes-To-Avoid',
            '/blogs/Rising-Interest-Rates',
            '/blogs/Digital-Banks',
            '/blogs/Wealth-Building-Strategies',
            '/blogs/Best-Personal-Loan-Apps',
            '/blogs/Loan-Vs-Card-Loan',
            '/blogs/No-CIBIL-Loan-Tricks',
            '/blogs/Personal-Loan-Rates',
            '/blogs/Loan-Eligibility-Trick',
            '/blogs/Personal-Loan-Balance-Transfer',
            '/blogs/Home-Loan-Comparison',
            '/blogs/Low-Salary-Home-Loan-Guide',
            '/blogs/Home-Loan-Mistakes',
            '/blogs/PMAY',
            '/blogs/Rent-Vs-Buy-2026',
            '/blogs/Startup-Loan-Blueprint',
            '/blogs/MSME-Loan-Without-Collateral',
            '/blogs/Business-Loan-Eligibility',
            '/blogs/Vehicle-Financing-Guide',
            '/blogs/Car-Loan-Rates-2026',
            '/blogs/Used-Car-Loan-Guide',
            '/blogs/Bike-Loan-Eligibility',
            '/blogs/Car-Loan-100-Percent-Finance',
            // Calculators
            // Dynamic Calculators Catalog
            '/calculators/investment/fixed-deposit',
            '/calculators/investment/gst',
            '/calculators/investment/mutual-fund',
            '/calculators/investment/nps',
            '/calculators/investment/post-office-fd',
            '/calculators/investment/sip',
            '/calculators/loan/personal-loan-emi',
            '/calculators/loan/home-loan-emi',
            '/calculators/loan/business-loan-emi',
            '/calculators/loan/loan-against-property-emi',
            '/calculators/loan/gold-loan-emi',
            '/calculators/loan/term-loan-emi',
            '/calculators/loan/tractor-loan-emi',
            '/calculators/loan/mudra-loan-emi',
            '/calculators/eligibility/personal-loan-eligibility',
            '/calculators/eligibility/home-loan-eligibility',
            '/calculators/prepayment/home-loan-prepayment',
            '/calculators/prepayment/personal-loan-prepayment',
            // Recharge & Bills Catalog
            '/recharge/mobile',
            '/recharge/postpaid',
            '/recharge/electricity',
            '/recharge/dth',
            '/recharge/fastag',
            '/recharge/lpg',
            '/recharge/loan-emi',
            '/recharge/insurance',
            '/recharge/overview',
            '/car-loan-calculator',
            '/student-loan-calculator',
            '/payday-loan-calculator',
            '/compound-interest-calculator',
            '/investment-growth-calculator',
            '/retirement-calculator',
            '/roth-vs-trad-calculator',
            '/stock-calculator',
            '/capital-gains-calculator',
            '/sales-tax-calculator',
            '/payroll-tax-calculator',
            '/break-even-calculator',
            '/npv-calculator',
            '/irr-calculator',
            '/cash-flow-calculator',
            '/depreciation-calculator',
            '/budget-calculator',
            '/expense-calculator',
            '/debt-payoff-calculator',
            '/savings-goal-calculator',
            '/emergency-fund-calculator',
            '/balance-transfer-calculator',
            '/credit-card-interest-calculator',
            '/credit-card-payoff-calculator',
            '/foreign-exchange-rate-calculator',
            '/currency-converter',
            '/college-savings-calculator',
            '/home-affordability-calculator',
            '/rent-vs-buy-calculator',
            '/property-tax-calculator',
            '/caprate-calculator',
            '/inflation-calculator',
            '/amortization-calculator',
            '/annuity-calculator',
            '/pension-calculator',
            '/social-security-calculator',
            // Legal
            '/credit-report-terms',
            '/terms-of-use',
            '/privacy-policy',
            '/investor-relations',
            '/disclaimer',
            '/intellectual-policy',
            '/sitemap',
            '/credit-cards',
            '/credit-card-finder',
            // CIBIL Landing Pages
            '/cibil-credit-report',
            '/cibil/how-to-check-cibil-score-by-pan-card',
            '/cibil-report/cibil-score-sbi-loans',
            '/credit-report/ways-to-improve-your-cibil-score',
            '/credit-score/cibil-score-for-personal-loan',
            '/cibil/how-to-resolve-cibil-dispute',

            // --- 60+ New Mapped Routes ---
            // SBI Air India cards
            '/sbi-bank/air-india-sbi-platinum-credit-cards',
            '/sbi-bank/air-india-sbi-signature-credit-cards',
            // Airtel prepaid/postpaid recharges & wallet
            '/prepaid-mobile-recharge/airtel',
            '/mobile-postpaid-bill-payment/airtel',
            '/axis-bank/airtel-axis-bank-credit-card',
            '/airtel-money-wallet-app',
            // Ajio, Income tax, all-banks savings, HDFC term, value research MF, allowances, alternative funds
            '/credit-card/ajio-credit-card-offers',
            '/tax/income-tax-login',
            '/savings-account/all-banks',
            '/life-insurance/term-insurance/hdfc-term-insurance-premium-calculator',
            '/mutual-funds/value-research-mutual-fund-rating',
            '/salary/allowances',
            '/mutual-funds/alternative-investment-fund',
            '/business-loan/ambit',
            '/business-loan/amended-technology-upgradation-fund-scheme-atufs',
            // Amex cards
            '/amex-bank',
            '/amex-bank/grievance-redressal-escalation-matrix',
            '/credit-card/amex-credit-card-application-status',
            '/amex-bank/credit-card-bill-payment',
            '/amex-bank/credit-card-eligibility',
            '/amex-bank/credit-card-pin-generation',
            '/amex-bank/credit-card-reward-points',
            '/amex-bank/membership-rewards-credit-card',
            '/amex-bank/smartearn-credit-card',
            '/amex-bank/credit-card',
            '/amex-bank/credit-card-emi',
            '/amex-bank/credit-card-offers',
            '/amex-bank/customer-care',
            '/amex-bank/american-express-gold-credit-card',
            '/amex-bank/american-express-platinum-card',
            '/amex-bank/american-express-platinum-reserve-credit-cards',
            '/amex-bank/american-express-platinum-travel-credit-cards',
            '/credit-card/amex-bank-gift-card-in-india',
            // Amortizations, Federal Fi, Andhra Bank, Allahabad Bank directories
            '/personal-loan/amortization-calculator',
            '/personal-loan/amortization-schedule',
            '/federal-bank/amplifi-fi-federal-credit-card',
            // Allahabad Bank
            '/allahabad-bank',
            '/banking/allahabad-bank-account-number',
            '/banking/allahabad-bank-balance-enquiry-number',
            '/allahabad-bank/car-loan',
            '/allahabad-bank/credit-card-bill-payment',
            '/allahabad-bank/customer-care',
            '/allahabad-bank/education-loan',
            '/allahabad-bank/fixed-deposits',
            '/allahabad-bank/gold-loan',
            '/allahabad-bank/kisan-credit-card',
            '/allahabad-bank/mudra-loan',
            '/banking/allahabad-bank-neft-form',
            '/banking/allahabad-bank-net-banking-registration',
            '/banking/allahabad-bank-netbanking',
            '/savings-account/allahabad-bank-normal-savings-account',
            '/banking/allahabad-bank-passbook',
            '/allahabad-bank/status',
            '/banking/allahabad-bank-rtgs-form',
            '/banking/allahabad-bank-timings',
            '/banking/allahabad-corporate-net-banking',
            // Andhra Bank
            '/andhra-bank',
            '/banking/andhra-bank-account-number',
            '/banking/andhra-bank-balance-enquiry',
            '/andhra-bank/business-loan',
            '/andhra-bank/car-loan',
            '/andhra-bank/classic-credit-card',
            '/andhra-bank/credit-card',
            '/andhra-bank/credit-card-customer-care-number',
            '/andhra-bank/credit-card-bill-payment',
            // Abhyudaya Bank
            '/abhyudaya-co-operative-bank',
            '/abhyudaya-co-operative-bank/customer-care',
            '/abhyudaya-co-operative-bank/education-loan',
            '/abhyudaya-co-operative-bank/fixed-deposits',
            '/abhyudaya-co-operative-bank/grievance-redressal-escalation-matrix',
            '/abhyudaya-co-operative-bank/personal-loan',
            '/abhyudaya-co-operative-bank/savings-account',
            '/abhyudaya-co-operative-bank/business-loan',
            '/abhyudaya-co-operative-bank/home-loan',
            '/abhyudaya-co-operative-bank/home-loan-customer-care',
            '/banking/abhyudaya-bank-net-banking',
            '/banking/abhyudaya-bank-timings',
            // Aditya Birla
            '/aditya-birla',
            '/aditya-birla/business-loan',
            '/aditya-birla/business-loan-interest-rate',
            '/aditya-birla-sun-life-pension-plans/empower-pension-sp-plan',
            '/aditya-birla-sun-life-pension-plans/absli-empower-pension-plan',
            '/absli-wealth-max-plan',
            '/wealth-secure-plan',
            '/protector-plus',
            '/aditya-birla-activ-health',
            '/mutual-funds/aditya-birla-amc-launches-aditya-birla-sun-life-psu-equity-fund',
            '/mutual-funds/aditya-birla-sun-life-flexi-cap-fund-regular-plan-growth',
            '/mutual-funds/aditya-birla-sun-life-mf-launches-nfo-nifty-next-50-etf',
            '/mutual-funds/aditya-birla-sun-life-midcap-fund-regular-plan-growth',
            '/mutual-funds/aditya-birla-sun-life-multi-cap-fund-regular-plan-growth',
            '/mutual-funds/aditya-birla-sun-life-mutual-fund-announces-bal-bhavishya-yojna-nfo',
            '/mutual-funds/birla-sun-life-mutual-fund',
            '/mutual-funds/aditya-birla-sun-life-psu-equity-fund-regular-plan-growth',
            '/mutual-funds/aditya-birla-sun-life-small-cap-fund-regular-plan-growth',
            '/saving-schemes/aditya-birla-sun-life-pension-fund',
            '/aditya-birla-sun-life-pension-plans',
            '/icici-bank/adani-one-credit-cards',
            '/icici-bank/adani-one-signature-credit-card',
            '/au-small-finance-bank/aditya-birla-finance-au-credit-cards',
            '/credit-card/add-on-card',
            '/tax/37th-gst-council-meeting',
            '/tax/38th-gst-council-meeting',
            '/tax/aaykar-setu-income-tax-mobile-app',
            '/sbi-bank/adtiya-birla-sbi-cards',
            '/sbi-bank/aditya-birla-sbi-card-select',
            '/tax/advance-tax',
            '/credit-card/advantages-and-disadvantages-of-credit-card',
            '/personal-loan/aditya-birla-finance-limited-marriage-loan',
            '/loan-against-securities/mutual-funds/aditya-birla-finance',
            '/aditya-birla/personal-loan',
            '/aditya-birla/personal-loan-documents-required',
            '/aditya-birla/personal-loan-emi-calculator',
            '/personal-loan/aditya-birla-finance-limited-personal-loan-foreclosure-charges',
            '/aditya-birla/home-loan',
            '/aditya-birla/home-loan-interest-rates',
            '/aditya-birla/loan-against-property',
            '/group-active-health',
            '/group-activ-secure',
            '/group-health-insurance',
            '/health-insurance-asthma',
            '/health-insurance-diabetes',
            '/health-insurance-high-blood-pressure',
            '/health-insurance-high-cholesterol',
            '/login-and-registration-process',
            '/aegon-life-child-plans',
            '/aegon-life-customer-care',
            '/life-easy-protect-insurance-plan',
            '/future-protect-insurance-plan',
            '/future-protect-plus-insurance-plan',
            '/aegon-life-guaranteed-growth-insurance-plan',
            '/aegon-life-iguarantee-insurance',
            '/imaximize-insurance-plan',
            '/imaximize-single-premium-insurance-plan',
            '/pension-plans',
            '/rising-star-insurance-plan',
            '/term-insurance-plans',
            '/pages-directory',
            '/financial-directory'
        ];

        // Extract dynamically defined pages in the directories component to keep sitemap fully synchronised
        const directoryPages = extractDirectoryPages();

        // Merge both hardcoded list and dynamically extracted list, ensuring 100% deduplication
        const allPages = Array.from(new Set([...staticPages, ...directoryPages]));

        console.log(`Unified sitemap target has ${allPages.length} unique pages`);

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

        // Add static pages
        allPages.forEach(page => {
            sitemap += `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;
        });

        // Add dynamic blog posts
        posts.forEach(post => {
            if (post.slug) {
                sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.publishedAt || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
            }
        });

        sitemap += `\n</urlset>`;

        const publicDir = path.resolve(__dirname, '../public');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir);
        }

        fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
        console.log(`Sitemap generated with ${posts.length} dynamic posts at public/sitemap.xml`);
        console.log(`Total URLs registered in sitemap: ${allPages.length + posts.length}`);

    } catch (error) {
        console.error('Error generating sitemap:', error);
        process.exit(1);
    }
}

generateSitemap();
