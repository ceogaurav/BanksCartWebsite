import Head from "next/head";
import React from "react";

export default function BlogMeta({ title, description, url, image, datePublished, author, tags = [] }: any) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "image": image ? [image] : undefined,
    "datePublished": datePublished,
    "author": {
      "@type": "Organization",
      "name": author || "Bankscart"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bankscart",
      "logo": { "@type": "ImageObject", "url": "/logo.png" }
    },
    "description": description
  };

  return (
    <Head>
      <title>{title} | Bankscart</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} | Bankscart`} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
      <meta name="twitter:site" content="@bankscart" />
      <link rel="canonical" href={url} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Head>
  );
}
