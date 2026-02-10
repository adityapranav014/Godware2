import { useRef, lazy, Suspense } from "react";
import ReactLenis from "lenis/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Badge from "./components/ui/Badge";
import StatsBar from "./components/ui/StatsBar";

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

// Custom hooks
import { useScrollSpy, useScrollToSection } from "./hooks";

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin);

const App = () => {
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

  // Handler: Shop Now button clicks
  const handleShopClick = () => {
    scrollToSection("Shop");
  };

  return (
    <ReactLenis root className="relative w-full min-h-screen overflow-x-hidden">

      <Navbar
        activeSection={activeSection}
        onNavClick={scrollToSection}
      />

      <div id="Home" ref={heroSectionRef} data-section="Home">
        <HeroSection onShopClick={handleShopClick} />
        <TaglineSection />
      </div>

      {/* Trust Stats Bar */}
      <StatsBar />

      <Suspense fallback={
        <div className="min-h-[50vh] flex items-center justify-center bg-black">
          <Badge>Loading...</Badge>
        </div>
      }>
        {/* Gold divider */}
        <div className="section-divider" />

        <ComparisonSection />

        <div className="section-divider-subtle" />

        <TestimonialsSection />

        <div className="section-divider" />

        <div id="Shop" ref={categorySectionRef} data-section="Shop">
          <CategorySection />
        </div>

        <div className="section-divider-subtle" />

        <div id="About" ref={aboutSectionRef} data-section="About">
          <AboutUsSection />
        </div>

        <div className="section-divider" />

        <CTASection onShopClick={handleShopClick} />

        <div className="section-divider-subtle" />

        <div id="Contact" ref={contactSectionRef} data-section="Contact">
          <Contact />
        </div>
      </Suspense>

      {/* Back to Top */}
      <div className="flex justify-center bg-dark-800 border-t border-white/5 py-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider text-dark-300 bg-white/5 border border-white/10 hover:border-gold-500/40 hover:text-gold-400 hover:bg-gold-500/5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,139,58,0.1)]"
          aria-label="Back to Top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-0.5 transition-transform"><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>
          Back to Top
        </button>
      </div>

      <Footer onNavClick={scrollToSection} />
      <Analytics />
      <SpeedInsights />
    </ReactLenis >
  );
};

export default App;
