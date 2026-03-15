import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Scaling,
  Thermometer,
  Trophy,
  ShieldCheck,
  Users,
  Zap,
  Dumbbell
} from "lucide-react";
import Section from "../components/layout/Section";
import TextReveal from "../components/ui/TextReveal";
import { EASE, DURATION, STAGGER, isMobile, getResponsiveDuration } from '../utils/animations';
import { comparisonFeaturesData } from '../assets/data';

gsap.registerPlugin(ScrollTrigger);

// Icon map for feature points
const iconMap = {
  Scaling,
  Thermometer,
  Trophy,
  ShieldCheck,
  Users,
  Zap,
  Dumbbell
};

// Create featurePoints array with actual icon components
const featurePoints = comparisonFeaturesData.map(feature => ({
  ...feature,
  icon: iconMap[feature.iconName]
}));

const FeatureCard = ({ feature, index }) => {
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const [hasMouse, setHasMouse] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  // Detect if the device has a fine pointer (mouse) — skip spotlight on touch devices
  useEffect(() => {
    const mql = window.matchMedia('(pointer: fine)');
    setHasMouse(mql.matches);
    const handler = (e) => setHasMouse(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // SVG icon line-draw + card entrance on scroll
  useGSAP(() => {
    if (!iconRef.current) return;
    const svgEl = iconRef.current.querySelector('svg');
    if (!svgEl) return;

    const paths = svgEl.querySelectorAll('path, line, circle, polyline, polygon, rect');
    paths.forEach(path => {
      const length = path.getTotalLength ? path.getTotalLength() : 100;
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 1.2,
      stagger: 0.05,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
        once: true,
      },
    });

    // Card self-animates — editorial reveal at its own scroll position
    // Agency principle: each element is individually choreographed, not batch-processed
    const mobile = isMobile();
    gsap.fromTo(
      cardRef.current,
      {
        y: mobile ? 30 : 55,
        opacity: 0,
        scale: 0.92,
        rotateX: mobile ? -6 : -12,
        willChange: 'transform, opacity',
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration: getResponsiveDuration('slow'),
        ease: EASE.expo,
        clearProps: 'willChange',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
          once: true,
        },
      }
    );
  }, { scope: cardRef });

  const handleMouseMove = (e) => {
    if (!hasMouse || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
    setOpacity(1);

    // 3D tilt based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.6)',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={hasMouse ? handleMouseMove : undefined}
      onMouseLeave={hasMouse ? handleMouseLeave : undefined}
      className={`${feature.colSpan} group relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 depth-card hover:border-gold-500/20 transition-colors duration-500`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Spotlight Effect — only rendered on mouse devices */}
      {hasMouse && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(201, 139, 58, 0.15), transparent 40%)`,
          }}
        />
      )}

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 flex flex-col h-full justify-between gap-6 pointer-events-none">

        {/* Icon Container with SVG line-draw */}
        <div
          ref={iconRef}
          className="relative w-14 h-14 rounded-2xl bg-dark-750 border border-dark-600 flex items-center justify-center group-hover:border-gold-500/30 group-hover:bg-gold-500/10 transition-colors duration-500"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.4)', transform: 'translateZ(20px)' }}>
          <feature.icon className="w-6 h-6 text-white group-hover:text-gold-500 transition-colors duration-500" strokeWidth={1.5} />
        </div>

        <div style={{ transform: 'translateZ(15px)' }}>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3 tracking-tight group-hover:text-gold-500 transition-colors duration-300">
            {feature.title}
          </h3>
          <p className="text-white/60 leading-relaxed font-sans text-sm font-light tracking-wide">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
};


const ComparisonSection = () => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      }
    });

    // Badge entrance
    tl.fromTo(
      badgeRef.current,
      { scale: 0.8, opacity: 0, y: -20 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: DURATION.medium,
        ease: EASE.back,
      }
    );

    // Note: individual FeatureCards self-animate via their own ScrollTriggers.
    // This is intentional: editorial choreography > batch stagger.
    // Each card reveals at its own scroll position, guiding the eye sequentially.

  }, { scope: sectionRef });

  return (
    <Section background="dark" padding="large" sectionRef={sectionRef} className="relative bg-dark-950 text-white overflow-hidden noise-overlay section-gradient-warm">

      {/* Background Ambience — data-speed creates native ScrollSmoother parallax.
          Blobs at different speeds create illusion of volumetric depth.
          Design principle: depth ≠ blur alone; it's objects moving at different rates. */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div data-speed="0.6" className="absolute top-[20%] left-[20%] w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] animate-pulse-glow" />
        <div data-speed="1.15" className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 space-y-12 sm:space-y-16">

        {/* ── Section Header — left-aligned editorial ── */}
        <div ref={badgeRef} className="flex flex-col gap-4">
          <span className="section-tag">Why God Wear</span>
          <div className="section-header-row">
            <TextReveal
              as="h2"
              variant="stagger3D"
              splitBy="words"
              trigger="top 80%"
              stagger={0.06}
              duration={0.9}
              className="animated-gradient-text font-display text-section-xl font-bold leading-none"
            >
              God Tier Engineering
            </TextReveal>
            <p className="text-white/60 font-sans text-sm leading-relaxed pb-1">
              Precision-engineered gear for those who refuse to settle for ordinary.
            </p>
          </div>
          <div className="accent-rule-long mt-2" />
        </div>

        {/* Bento Grid — each card self-animates at its own scroll position */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-7xl mx-auto perspective-1200">
          {featurePoints.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

      </div>
    </Section>
  );
};

export default ComparisonSection;
