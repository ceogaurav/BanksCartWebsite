/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Prevents your site from being put in an iframe (Clickjacking protection)
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Prevents browser from guessing the file type (Security requirement)
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // Controls how much info is sent when linking to other sites
          },
          {
            key: 'Content-Security-Policy',
            // This is a "Starter" CSP. You may need to tweak this if you use external scripts (like Google Analytics or CIBIL APIs).
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https:;",
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload', // Forces HTTPS for 2 years
          }
        ],
      },
    ];
  },
};

module.exports = nextConfig;
