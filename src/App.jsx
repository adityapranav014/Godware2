import { useRef, lazy, Suspense, useState, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import GlobalSEO from "./seo/GlobalSEO";
import StatsBar from "./components/ui/StatsBar";

// Premium UI Components
import CustomCursor from "./components/ui/CustomCursor";
import ScrollProgress from "./components/ui/ScrollProgress";
import Preloader from "./components/ui/Preloader";
import ScrollVelocityText from "./components/ui/ScrollVelocityText";
import FloatingParticles from "./components/ui/FloatingParticles";
import AmbientBlobs from "./components/ui/AmbientBlobs";

// Layout components
import { Navbar, Footer } from "./components/layout";

// Section components - Eager load Hero & Tagline (Above fold)
import HeroSection from "./sections/HeroSection";
import TaglineSection from "./sections/TaglineSection";

// Lazy load other sections (Below fold)
const CategorySection = lazy(() => import("./sections/CategorySection"));
const AboutUsSection = lazy(() => import("./sections/AboutUsSection"));
const Contact = lazy(() => import("./sections/Contact"));
const ComparisonSection = lazy(() => import("./sections/ComparisonSection"));
const TestimonialsSection = lazy(() => import("./sections/TestimonialsSection"));
const CTASection = lazy(() => import("./sections/CTASection"));
const SEOHomepageCopy = lazy(() => import("./sections/SEOHomepageCopy"));

// Custom hooks
import { useScrollSpy, useScrollToSection } from "./hooks";

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin, ScrollSmoother, InertiaPlugin);

const App = () => {
  // Preloader state
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const handlePreloaderComplete = useCallback(() => setPreloaderComplete(true), []);

  // Section refs for scroll navigation
  const heroSectionRef = useRef(null);
  const categorySectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  // Section mapping for navigation
  const sectionRefs = {
    Home: heroSectionRef,
    Shop: categorySectionRef,
    About: aboutSectionRef,
    Contact: contactSectionRef
  };

  // Custom hooks
  const activeSection = useScrollSpy(sectionRefs);
  const scrollToSection = useScrollToSection(sectionRefs);

  // Initialize ScrollSmoother
  useLayoutEffect(() => {
    let smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5, // Heavy, premium feel
      effects: true,
      normalizeScroll: true, // Prevents mobile bar jumping
      ignoreMobileResize: true,
    });

    return () => {
      if (smoother) smoother.kill();
    };
  }, []);

  // Handler: Shop Now button clicks
  const handleShopClick = () => {
    scrollToSection("Shop");
  };

  return (
    <>
      {/* Cinematic Preloader */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Premium Custom Cursor (desktop only) */}
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      <GlobalSEO />

      <Navbar
        activeSection={activeSection}
        onNavClick={scrollToSection}
        preloaderComplete={preloaderComplete}
      />

      <div id="smooth-wrapper" className="relative w-full min-h-screen overflow-x-hidden">
        <div id="smooth-content">
          <div id="Home" ref={heroSectionRef} data-section="Home">
            <HeroSection onShopClick={handleShopClick} preloaderComplete={preloaderComplete} />
            <TaglineSection />
          </div>

          {/* Trust Stats Bar */}
          <StatsBar />

          <Suspense fallback={<div className="min-h-screen bg-dark-950" />}>
            {/* Gold divider */}
            <div className="section-divider" />

            <div id="comparison" data-section="Comparison" className="relative">
              <AmbientBlobs variant="gold" />
              <FloatingParticles count={20} color="gold" />
              <ComparisonSection />
            </div>

            {/* Scroll Velocity Brand Text Divider */}
            <ScrollVelocityText text="GOD WEAR" repeat={6} baseSpeed={0.4} className="bg-dark-950 border-y border-white/3" />

            <div id="testimonials" data-section="Testimonials">
              <TestimonialsSection />
            </div>

            <div id="Shop" ref={categorySectionRef} data-section="Shop" className="relative">
              <AmbientBlobs variant="warm" />
              <CategorySection />
            </div>

            {/* Scroll Velocity Brand Text Divider */}
            <ScrollVelocityText text="PERFORMANCE REDEFINED" repeat={4} baseSpeed={0.3} className="bg-dark-950 border-y border-white/3" />

            <div id="About" ref={aboutSectionRef} data-section="About">
              <AboutUsSection />
            </div>

            <div className="section-divider" />

            <div id="cta" data-section="CTA" className="relative">
              <AmbientBlobs variant="warm" />
              <FloatingParticles count={25} color="gold" />
              <CTASection onShopClick={handleShopClick} />
            </div>

            <div className="section-divider-subtle" />

            <div id="Contact" ref={contactSectionRef} data-section="Contact" className="relative">
              <AmbientBlobs variant="subtle" />
              <Contact />
            </div>

            {/* SEO crawlable text — keyword-rich, 300+ words, below fold */}
            <div className="section-divider-subtle" />
            <SEOHomepageCopy />

          </Suspense>



          <Footer onNavClick={scrollToSection} />
          <Analytics />
          <SpeedInsights />
        </div>
      </div>
    </>
  );
};

export default App;
