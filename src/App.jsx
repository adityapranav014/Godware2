import { useRef, lazy, Suspense } from "react";
import ReactLenis from "lenis/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Badge from "./components/ui/Badge";

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

      <Suspense fallback={
        <div className="min-h-[50vh] flex items-center justify-center bg-black">
          <Badge>Loading...</Badge>
        </div>
      }>
        <ComparisonSection />
        <TestimonialsSection />

        <div id="Shop" ref={categorySectionRef} data-section="Shop">
          <CategorySection />
        </div>

        <div id="About" ref={aboutSectionRef} data-section="About">
          <AboutUsSection />
        </div>

        <CTASection onShopClick={handleShopClick} />

        <div id="Contact" ref={contactSectionRef} data-section="Contact">
          <Contact />
        </div>
      </Suspense>
      <Footer onNavClick={scrollToSection} />
      <Analytics />
      <SpeedInsights />
    </ReactLenis >
  );
};

export default App;
