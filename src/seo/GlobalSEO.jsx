import { Helmet } from 'react-helmet-async';

/**
 * GlobalSEO — runtime-only SEO overrides via react-helmet.
 *
 * index.html is the SINGLE SOURCE OF TRUTH for all static meta tags:
 *   <title>, <meta description>, <meta keywords>, <meta robots>,
 *   <link canonical>, <link alternate hreflang>, all OG / Twitter tags,
 *   all JSON-LD structured data, <meta author>, <meta theme-color>.
 *
 * This component exists solely for future per-page overrides
 * when inner pages are added. Currently empty to avoid duplicates.
 */
const GlobalSEO = () => {
  return (
    <Helmet>
      {/* All SEO tags live in index.html to prevent duplicate tag issues.
          Add per-page title/description overrides here when inner pages are added. */}
    </Helmet>
  );
};

export default GlobalSEO;
