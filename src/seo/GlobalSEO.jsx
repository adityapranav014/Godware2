import { Helmet } from 'react-helmet';

const GlobalSEO = () => {
  const siteTitle = 'GOD WEAR | Premium Gym & Athleisure Compression Wear';
  const siteDescription = 'High-performance compression t-shirts designed for athletes. 4-way stretch, muscle support, moisture control, and premium quality. Free shipping and 30-day returns.';
  const siteUrl = 'https://godwear.co.in';
  const siteImage = 'https://godwear.co.in/images/hero-1.webp';

  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'WebSite',
    name: 'GOD WEAR',
    url: siteUrl,
    description: siteDescription,
    image: siteImage,
    potentialAction: {
      '@type': 'BuyAction',
      target: siteUrl
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content="compression shirt, gym wear, athletic wear, moisture wicking, muscle support" />

      {/* Search Engine Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="GOD WEAR" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="GOD WEAR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />

      {/* Additional Meta Tags */}
      <meta name="language" content="English" />
      <meta name="theme-color" content="#000000" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default GlobalSEO;
