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
