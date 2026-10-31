import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getSEOMetadata, formatSlug } from '../../data/seoRegistry';

export default function SEOManager() {
  const { pathname } = useLocation();

  // Resolve tailored metadata from centralized registry
  const meta = getSEOMetadata(pathname);
  let canonicalPath = pathname === '/' ? '' : pathname.replace(/\/$/, '');
  if (canonicalPath === '/blogs' || canonicalPath === '/blogs-overview-page') {
    canonicalPath = '/blog';
  }
  if (canonicalPath === '/about') {
    canonicalPath = '/about-us';
  }
  if (canonicalPath === '/contact-us') {
    canonicalPath = '/contact';
  }
  if (canonicalPath.startsWith('/blogs/')) {
    canonicalPath = canonicalPath.replace('/blogs/', '/blog/');
  }

  // Exact canonical URL format: root gets trailing slash, all subpages non-trailing slash
  const currentUrl = pathname === '/' ? 'https://www.bankscart.com/' : `https://www.bankscart.com${canonicalPath}`;

  // Generate dynamic JSON-LD Schema Graphs
  const jsonLdGraph = React.useMemo(() => {
    const schemas: any[] = [];

    // 1. Homepage Schemas: WebSite (with Sitelinks Searchbox), Organization, and FinancialService
    if (pathname === '/') {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.bankscart.com/#website",
        "name": "BanksCart",
        "url": "https://www.bankscart.com/",
        "description": meta.description,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.bankscart.com/financial-directory?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      });

      schemas.push({
        "@context": "https://schema.org",
        "@type": "FinancialService",
        "name": "BanksCart",
        "legalName": "BanksCart Financial Services",
        "url": "https://www.bankscart.com/",
        "logo": "https://www.bankscart.com/assets/images/bankscart-logo.png",
        "description": "BanksCart is an online financial comparison platform in India helping consumers compare and apply for personal loans, home loans, business loans, credit cards, and credit score improvement services.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Connaught Place",
          "addressLocality": "New Delhi",
          "addressRegion": "Delhi",
          "postalCode": "110001",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-11-XXXXXXXX",
          "contactType": "Customer Support",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi"]
        },
        "sameAs": [
          "https://www.facebook.com/bankscart",
          "https://twitter.com/bankscart",
          "https://www.linkedin.com/company/bankscart"
        ]
      });

      return schemas;
    }

    // 2. Subpage BreadcrumbList Schema
    const segments = canonicalPath.split('/').filter(Boolean);
    if (segments.length > 0) {
      const itemListElement = [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.bankscart.com/"
        }
      ];

      let runningPath = '';
      segments.forEach((seg, idx) => {
        runningPath += `/${seg}`;
        itemListElement.push({
          "@type": "ListItem",
          "position": idx + 2,
          "name": formatSlug(seg),
          "item": `https://www.bankscart.com${runningPath}`
        });
      });

      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": itemListElement
      });
    }

    // 3. Blog & Editorial Schemas (Validated BlogPosting Schema)
    if (pathname.startsWith('/blogs/') || pathname.startsWith('/blog/')) {
      const isSSY = canonicalPath.toLowerCase().includes('sukanya');
      const headline = isSSY
        ? "Sukanya Samriddhi Yojana (SSY) 2026: Interest Rate, Rules, Eligibility & Tax Benefits"
        : meta.title.replace(/\s*\|\s*BanksCart.*$/i, '');
      const description = isSSY
        ? "Complete guide on Sukanya Samriddhi Yojana (SSY) account opening, latest 8.2% interest rates, tenure calculation, and Section 80C tax exemption rules."
        : meta.description;
      const image = isSSY
        ? "https://www.bankscart.com/assets/images/ssy-guide-banner.jpg"
        : "https://www.bankscart.com/assets/images/bankscart-logo.png";
      const authorName = isSSY ? "Priya Sharma" : "Raghav Singhal";
      const authorRole = isSSY ? "Senior Financial Analyst" : "Lead Financial Analyst";
      const authorUrl = isSSY ? "https://www.bankscart.com/author/priya-sharma" : "https://www.bankscart.com/author/raghav-singhal";

      schemas.push({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": isSSY ? "https://www.bankscart.com/blog/sukanya-samriddhi-yojana-guide" : currentUrl
        },
        "headline": headline,
        "description": description,
        "image": image,
        "author": {
          "@type": "Person",
          "name": authorName,
          "jobTitle": authorRole,
          "url": authorUrl
        },
        "publisher": {
          "@type": "Organization",
          "name": "BanksCart",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.bankscart.com/assets/images/bankscart-logo.png"
          }
        },
        "datePublished": "2026-01-15T09:00:00+05:30",
        "dateModified": "2026-10-30T10:00:00+05:30"
      });

      return schemas;
    }

    // 4. Financial Products, Loan Hubs & Calculators
    if (
      pathname.startsWith('/loans') ||
      pathname.startsWith('/cards') ||
      pathname.startsWith('/investment') ||
      pathname.startsWith('/insurance') ||
      pathname.includes('calculator') ||
      pathname.startsWith('/credit-score') ||
      pathname.startsWith('/aadhar-card') ||
      pathname.startsWith('/pan-card')
    ) {
      schemas.push({
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
      });
      return schemas;
    }

    // 5. About Page
    if (canonicalPath === '/about' || canonicalPath === '/about-us') {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": meta.title,
        "description": meta.description,
        "url": currentUrl
      });
      return schemas;
    }

    // 6. Contact Page
    if (canonicalPath === '/contact') {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": meta.title,
        "description": meta.description,
        "url": currentUrl
      });
      return schemas;
    }

    // 7. Editorial Policy Page
    if (canonicalPath === '/editorial-policy') {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": meta.title,
        "description": meta.description,
        "url": currentUrl,
        "publisher": {
          "@type": "Organization",
          "name": "BanksCart",
          "url": "https://www.bankscart.com",
          "logo": "https://www.bankscart.com/favicon-32x32.png"
        }
      });
      return schemas;
    }

    // 8. Author Bio ProfilePage
    if (canonicalPath.startsWith('/author/')) {
      const slug = canonicalPath.replace('/author/', '');
      const name = formatSlug(slug);
      schemas.push({
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "mainEntity": {
          "@type": "Person",
          "name": name,
          "worksFor": {
            "@type": "Organization",
            "name": "BanksCart",
            "url": "https://www.bankscart.com"
          },
          "description": meta.description
        }
      });
      return schemas;
    }

    return schemas.length > 0 ? schemas : null;
  }, [pathname, meta, currentUrl, canonicalPath]);

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

      {/* Dynamic JSON-LD Structured Data Schemas */}
      {jsonLdGraph && jsonLdGraph.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
