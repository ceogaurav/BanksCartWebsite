import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function submitIndexNow() {
    console.log('--- STARTING INDEXNOW SUBMISSION ---');
    
    // Check if running on Vercel to avoid race condition of IndexNow verifying before deployment is live
    if (process.env.VERCEL === '1' || process.env.VERCEL === 1) {
        console.log('⚠️ Running in Vercel build environment. Skipping IndexNow submission.');
        console.log('Please trigger submission manually using: npm run indexnow (once the deployment is live).');
        return;
    }

    try {
        const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
        if (!fs.existsSync(sitemapPath)) {
            console.error('sitemap.xml not found! Please run sitemap generation first.');
            return;
        }

        const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
        // Extract all <loc>...</loc> URLs
        const locRegex = /<loc>([^<]+)<\/loc>/g;
        const rawUrls = [];
        let match;
        while ((match = locRegex.exec(sitemapContent)) !== null) {
            rawUrls.push(match[1]);
        }

        console.log(`Extracted ${rawUrls.length} URLs from sitemap.`);
        if (rawUrls.length === 0) {
            console.warn('No URLs found to submit.');
            return;
        }

        const key = 'a7b9c6d3e8f2a1b4c7d0e3f6a9b2c5d8';

        // Prepare submissions for both apex (non-www) and www hosts
        const submissions = [
            {
                host: 'bankscart.com',
                keyLocation: `https://bankscart.com/${key}.txt`,
                urls: rawUrls.map(url => {
                    const mapped = url.replace('https://www.bankscart.com', 'https://bankscart.com');
                    return mapped;
                })
            },
            {
                host: 'www.bankscart.com',
                keyLocation: `https://www.bankscart.com/${key}.txt`,
                urls: rawUrls.map(url => {
                    const mapped = url.replace(/^https:\/\/bankscart\.com/, 'https://www.bankscart.com');
                    return mapped;
                })
            }
        ];

        for (const sub of submissions) {
            console.log(`\nSubmitting ${sub.urls.length} URLs for host: ${sub.host}...`);
            const payload = {
                host: sub.host,
                key: key,
                keyLocation: sub.keyLocation,
                urlList: sub.urls
            };

            const response = await fetch('https://api.indexnow.org/indexnow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log(`🎉 SUCCESS [${sub.host}]: IndexNow URLs submitted successfully! HTTP Status: ${response.status}`);
            } else {
                const body = await response.text();
                console.error(`❌ FAILED [${sub.host}]: IndexNow submission failed. HTTP Status: ${response.status}. Response: ${body}`);
            }
        }
    } catch (error) {
        console.error('Error submitting to IndexNow:', error);
    }
}

submitIndexNow();
