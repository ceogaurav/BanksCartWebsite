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

async function generateSitemap() {
    console.log('Fetching posts for sitemap...');
    try {
        const query = `*[_type == "post"] { "slug": slug.current, publishedAt }`;
        const posts = await client.fetch(query);

        const baseUrl = 'https://bankscart.com';

        // Core pages - add more as needed
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
            '/credit-cards'
        ];

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

        // Add static pages
        staticPages.forEach(page => {
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
        console.log(`Sitemap generated with ${posts.length} posts at public/sitemap.xml`);

    } catch (error) {
        console.error('Error generating sitemap:', error);
        process.exit(1);
    }
}

generateSitemap();
