import { useRef } from "react";
import ReactLenis from "lenis/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Analytics } from "@vercel/analytics/react";

// Layout components
import { Navbar, Footer } from "./components/layout";

// Section components
import HeroSection from "./sections/HeroSection";
import TaglineSection from "./sections/TaglineSection";
import CategorySection from "./sections/CategorySection";
import AboutUsSection from "./sections/AboutUsSection";
import Contact from "./sections/Contact";
import ComparisonSection from "./sections/ComparisonSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import CTASection from "./sections/CTASection";

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

      <div ref={heroSectionRef} data-section="Home">
        <HeroSection onShopClick={handleShopClick} />
        <TaglineSection />
      </div>

      <ComparisonSection />
      <TestimonialsSection />

      <div ref={categorySectionRef} data-section="Shop">
        <CategorySection />
      </div>

      <div ref={aboutSectionRef} data-section="About">
        <AboutUsSection />
      </div>

      <CTASection onShopClick={handleShopClick} />

      <div ref={contactSectionRef} data-section="Contact">
        <Contact />
      </div>
      <Footer onNavClick={scrollToSection} />
      <Analytics />
    </ReactLenis >
  );
};

export default App;
