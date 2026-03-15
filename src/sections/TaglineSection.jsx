import { Truck, Gem, ShieldCheck, Users, Droplet, RotateCcw, Flame, Wind, Zap } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "../components/Marquee";
import Section from "../components/layout/Section";
import { taglineItemsData } from '../assets/data';

gsap.registerPlugin(ScrollTrigger);

// Icon map for tagline items
const iconMap = {
  Truck,
  Gem,
  ShieldCheck,
  Users,
  Droplet,
  RotateCcw,
  Flame,
  Wind,
  Zap
};

// Create items array with actual icon components
const items = taglineItemsData.map(item => ({
  ...item,
  icon: iconMap[item.iconName]
}));

const TaglineSection = () => {
  const sectionRef = useRef(null);
  const marqueeContainerRef = useRef(null);

  // Velocity-based skew effect on scroll
  useGSAP(() => {
    if (!marqueeContainerRef.current) return;

    let lastScroll = 0;
    let skew = 0;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        const targetSkew = Math.max(-3, Math.min(3, velocity / 300));
        skew += (targetSkew - skew) * 0.1;

        gsap.set(marqueeContainerRef.current, {
          skewX: skew,
          force3D: true,
        });
      },
    });

    // Reset skew when scroll stops
    const resetSkew = () => {
      gsap.to(marqueeContainerRef.current, {
        skewX: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    };

    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(resetSkew, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // SVG icon line-draw for the first pass of marquee icons when section enters view
    const allSvgs = marqueeContainerRef.current.querySelectorAll('svg');
    // Slice to only animate first `items.length` icons to avoid duplicate work in infinite scroll
    const firstPassSvgs = Array.from(allSvgs).slice(0, items.length);
    const allPaths = firstPassSvgs.flatMap(svg =>
      [...svg.querySelectorAll('path, line, circle, polyline, polygon, rect')]
    );
    if (allPaths.length) {
      allPaths.forEach(path => {
        const length = path.getTotalLength ? path.getTotalLength() : 60;
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });
      gsap.to(allPaths, {
        strokeDashoffset: 0,
        duration: 0.9,
        stagger: 0.04,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, { scope: sectionRef });

  return (
    <Section
      background="dark"
      padding="none"
      className="bg-dark-950 overflow-hidden"
      containerClassName="w-full max-w-full"
      sectionRef={sectionRef}
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div ref={marqueeContainerRef} style={{ willChange: 'transform' }}>
        <Marquee items={items} className="text-white bg-dark-950/80" iconClassName="text-black" />
      </div>
    </Section>
  );
};

export default TaglineSection;
