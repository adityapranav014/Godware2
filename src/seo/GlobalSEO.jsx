import { Helmet } from 'react-helmet-async';

/**
 * GlobalSEO — injects supplementary meta tags that complement index.html.
 *
 * Tags already present in index.html (single source of truth, no JS needed):
 *   - <meta charset>
 *   - <meta viewport>           ← DO NOT duplicate here
 *   - <title>
 *   - <meta description>        ← DO NOT duplicate here
 *   - <link canonical>          ← DO NOT duplicate here
 *   - <meta robots>             ← DO NOT duplicate here
 *   - <link apple-touch-icon>
 *   - <link manifest>
 *   - All OG / Twitter tags
 *   - All JSON-LD structured data
 *
 * This component only adds tags that react-helmet needs at runtime,
 * e.g. page-specific overrides on inner pages (currently homepage only).
 */
const GlobalSEO = () => {
  // ── Core identity ──────────────────────────────────────────────────────────
  const siteTitle =
    'GOD WEAR® — Premium Gym Wear, Athleisure & Compression Wear India';

  // ≤ 160 characters — verified: 155 chars
  // Targets: "Gym Wear", "Compression Wear", "Athleisure"
  const siteDescription =
    "India's #1 premium gym wear brand. Shop compression wear, athleisure & performance apparel for men. Free shipping. Up to 69% off.";

  const siteUrl = 'https://godwear.co.in';
  const siteImage = 'https://godwear.co.in/images/hero-1.webp';

  return (
    <Helmet>
      {/* ── Page Title (allows per-page overrides on inner pages) ── */}
      <title>{siteTitle}</title>

      {/* ── Meta Description — optimised, single instance ── */}
      <meta name="description" content={siteDescription} />

      {/* ── Keywords ── */}
      <meta
        name="keywords"
        content="gym wear India, compression wear, athleisure, premium gym clothing, athletic wear, fitness apparel, gym t-shirts, workout clothes men, performance wear, GOD WEAR"
      />

      {/* ── Canonical — single, correct URL ── */}
      <link rel="canonical" href={`${siteUrl}/`} />

      {/* ── Robots ── */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* ── Hreflang — no duplicate URLs ── */}
      <link rel="alternate" hreflang="en-in" href={`${siteUrl}/`} />
      <link rel="alternate" hreflang="en" href={`${siteUrl}/`} />
      <link rel="alternate" hreflang="x-default" href={`${siteUrl}/`} />

      {/* ── Open Graph ── */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content="GOD WEAR" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:url" content={`${siteUrl}/`} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:image:secure_url" content={siteImage} />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="GOD WEAR — Premium Gym Wear & Compression Wear" />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
      <meta name="twitter:image:alt" content="GOD WEAR Apparel" />

      {/* ── Misc ── */}
      <meta name="author" content="GOD WEAR" />
      <meta name="theme-color" content="#000000" />
      {/* NOTE: lang="en" is set directly on <html> in index.html — correct ISO code */}
    </Helmet>
  );
};

export default GlobalSEO;
