import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function submitIndexNow() {
    console.log('--- STARTING INDEXNOW SUBMISSION ---');
    try {
        const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
        if (!fs.existsSync(sitemapPath)) {
            console.error('sitemap.xml not found! Please run sitemap generation first.');
            return;
        }

        const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
        // Extract all <loc>...</loc> URLs
        const locRegex = /<loc>([^<]+)<\/loc>/g;
        const urls = [];
        let match;
        while ((match = locRegex.exec(sitemapContent)) !== null) {
            urls.push(match[1]);
        }

        console.log(`Extracted ${urls.length} URLs from sitemap.`);

        const key = 'f6a40a5e840a4309a4714b1bb0e9b921';
        const payload = {
            host: 'bankscart.com',
            key: key,
            keyLocation: `https://bankscart.com/${key}.txt`,
            urlList: urls
        };

        console.log('Sending submission payload to api.indexnow.org...');

        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log(`🎉 SUCCESS: IndexNow URLs submitted successfully! HTTP Status: ${response.status}`);
        } else {
            const body = await response.text();
            console.error(`❌ FAILED: IndexNow submission failed. HTTP Status: ${response.status}. Response: ${body}`);
        }
    } catch (error) {
        console.error('Error submitting to IndexNow:', error);
    }
}

submitIndexNow();
