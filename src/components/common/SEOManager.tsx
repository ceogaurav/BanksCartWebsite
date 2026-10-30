import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getSEOMetadata } from '../../data/seoRegistry';

export default function SEOManager() {
  const { pathname } = useLocation();

  // Resolve tailored metadata from centralized registry
  const meta = getSEOMetadata(pathname);
  let canonicalPath = pathname === '/' ? '' : pathname.replace(/\/$/, '');
  if (canonicalPath === '/blogs' || canonicalPath === '/blogs-overview-page') {
    canonicalPath = '/blog';
  }
  if (canonicalPath === '/about-us') {
    canonicalPath = '/about';
  }
  const currentUrl = `https://www.bankscart.com${canonicalPath}`;

  // Generate dynamic JSON-LD Schema
  const jsonLd = React.useMemo(() => {
    // A. Financial products and calculators
    if (pathname.startsWith('/loans/') || pathname.startsWith('/cards/') || pathname.startsWith('/ssy-calculator') || pathname.includes('calculator')) {
      return {
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": meta.title,
        "description": meta.description,
        "url": currentUrl,
        "provider": {
          "@type": "Organization",
          "name": "BanksCart",
          "url": "https://www.bankscart.com"
        }
      };
    }

    // B. Static blog articles
    if (pathname.startsWith('/blogs/')) {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `What is discussed in this guide about ${meta.title}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": meta.description
            }
          }
        ]
      };
    }

    // C. Organization Schema for homepage
    if (pathname === '/') {
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "BanksCart",
        "url": "https://www.bankscart.com",
        "logo": "https://www.bankscart.com/favicon-32x32.png",
        "description": meta.description,
        "sameAs": [
          "https://twitter.com/bankscart",
          "https://facebook.com/bankscart"
        ]
      };
    }

    return null;
  }, [pathname, meta, currentUrl]);

  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}

      {/* OpenGraph (Facebook/LinkedIn) */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.bankscart.com/favicon-32x32.png" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content="https://www.bankscart.com/favicon-32x32.png" />

      {/* Canonical Link */}
      <link rel="canonical" href={currentUrl} />

      {/* Dynamic JSON-LD Structured Data Schema */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
