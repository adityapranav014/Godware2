import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Truck, CreditCard, RotateCcw, Users } from "lucide-react";
import Section from "../components/layout/Section";
import TextReveal from "../components/ui/TextReveal";
import { EASE, DURATION, isMobile, getResponsiveDuration, ripple, buttonHoverIn, buttonHoverOut, svgIconDraw } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

const CTASection = ({ onShopClick }) => {
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);
  const ctaBtnRef = useRef(null);
  const badgeWrapRef = useRef(null);
  const socialProofRef = useRef(null);
  const trustRef = useRef(null);

  // Click: ripple expansion + call parent handler
  const handleCtaClick = useCallback((e) => {
    if (ctaBtnRef.current) ripple(ctaBtnRef.current, e);
    onShopClick?.();
  }, [onShopClick]);

  // Hover: full GSAP anticipation timeline (anticipation squeeze → lift)
  const handleCtaEnter = useCallback(() => {
    buttonHoverIn(ctaBtnRef.current);
    if (ctaBtnRef.current) {
      ctaBtnRef.current.querySelectorAll('svg').forEach(svg => svgIconDraw(svg, 0.5));
    }
  }, []);
  const handleCtaLeave = useCallback(() => buttonHoverOut(ctaBtnRef.current), []);
  const handleCtaDown = useCallback(() => {
    if (!isMobile() && ctaBtnRef.current) gsap.to(ctaBtnRef.current, { scale: 0.96, duration: 0.08, ease: 'power3.in', overwrite: true });
  }, []);
  const handleCtaUp = useCallback(() => {
    if (!isMobile() && ctaBtnRef.current) gsap.to(ctaBtnRef.current, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.45)', overwrite: true });
  }, []);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Scroll-scrubbed section scale entrance (0.88 → 1.0)
    gsap.fromTo(
      sectionRef.current,
      {
        scale: 0.88,
        borderRadius: '32px',
        filter: 'blur(10px)',
      },
      {
        scale: 1,
        borderRadius: '0px',
        filter: 'blur(0px)',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          end: 'top 40%',
          scrub: 1.5,
        }
      }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
        once: true,
      }
    });

    // Urgency badge entrance
    tl.fromTo(
      badgeWrapRef.current,
      {
        opacity: 0,
        y: -20,
        scale: 0.9,
        filter: 'blur(6px)',
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: DURATION.medium,
        ease: EASE.back,
      }
    );

    // Social proof entrance
    tl.fromTo(
      socialProofRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: DURATION.normal,
        ease: EASE.circ,
      },
      '-=0.2'
    );

    // Button entrance with anticipation
    tl.fromTo(
      buttonRef.current,
      {
        opacity: 0,
        y: 40,
        scale: 0.88,
        filter: 'blur(8px)',
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: DURATION.slow,
        ease: EASE.backSoft,
      },
      '-=0.2'
    );

    // Trust icons stagger
    if (trustRef.current) {
      const trustItems = trustRef.current.children;

      // Pre-hide all icon strokes so they draw INTO the timeline as items fade in
      const allTrustPaths = Array.from(trustItems).flatMap(item => {
        const svg = item.querySelector('svg');
        if (!svg) return [];
        const paths = [...svg.querySelectorAll('path, line, circle, polyline, polygon, rect')];
        paths.forEach(path => {
          const len = path.getTotalLength ? path.getTotalLength() : 60;
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        });
        return paths;
      });

      tl.fromTo(
        trustItems,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: DURATION.normal,
          stagger: 0.08,
          ease: EASE.circ,
        },
        '-=0.3'
      );

      // Draw icons inside the timeline — fires 0.15s after items start fading in, guaranteed visible
      if (allTrustPaths.length) {
        tl.to(allTrustPaths, {
          strokeDashoffset: 0,
          duration: 1.0,
          stagger: 0.06,
          ease: 'power2.inOut',
        }, '<0.15');
      }
    }

  }, { scope: sectionRef });

  return (
    <Section
      sectionRef={sectionRef}
      background="dark"
      padding="large"
      className="relative overflow-hidden bg-dark-950 noise-overlay"
    >
      {/* Background Image */}
      <div data-speed="0.82" className="absolute inset-0 cta-bg" />
      <div className="absolute inset-0 cta-overlay-gradient" />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6 sm:px-12 text-center">

        {/* Section tag + urgency pill */}
        <div ref={badgeWrapRef} className="mb-8 sm:mb-10 flex flex-col items-center gap-4">
          <span className="section-tag">Limited Offer</span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-red-500/12 border border-red-500/25 text-red-400"
            style={{ backdropFilter: 'blur(8px)' }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
            </span>
            69% Off Sale — Limited Time
          </span>
        </div>

        {/* Headline — MASSIVE editorial scale */}
        <TextReveal
          as="h2"
          variant="stagger3D"
          splitBy="words"
          trigger="top 75%"
          stagger={0.07}
          duration={1.0}
          className="text-section-xl font-display uppercase leading-none font-bold animated-gradient-text perspective-text mb-6 sm:mb-8"
        >
          Ignite Your Potential
        </TextReveal>

        {/* Social Proof */}
        <div ref={socialProofRef} className="flex items-center justify-center gap-2 text-sm text-white/70 font-sans mb-8 sm:mb-10" style={{ opacity: 0 }}>
          <Users size={14} className="text-gold-500" />
          <span>Join <strong className="text-white/90">10,000+</strong> athletes who chose GOD WEAR</span>
        </div>

        {/* CTA Button */}
        <div ref={buttonRef} className="relative flex justify-center" style={{ opacity: 0 }}>
          <div className="absolute inset-0 blur-xl opacity-60 bg-gold-500/30 rounded-2xl scale-105 pointer-events-none" />
          <button
            ref={ctaBtnRef}
            onClick={handleCtaClick}
            onMouseEnter={handleCtaEnter}
            onMouseLeave={handleCtaLeave}
            onMouseDown={handleCtaDown}
            onMouseUp={handleCtaUp}
            data-magnetic
            className="group relative w-full sm:w-auto sm:min-w-72 max-w-[90vw]
                       px-10 sm:px-12 py-4 sm:py-4.5
                       depth-btn-gold font-bold
                       text-base sm:text-lg
                       active:scale-[0.98] overflow-hidden
                       focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:ring-offset-2 focus:ring-offset-black/50"
            style={{ color: 'var(--color-dark-900)' }}
            aria-label="Shop Now - Browse our premium compression t-shirts"
          >
            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            <span className="relative flex items-center justify-center gap-3 font-sans tracking-wide">
              Shop Now
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>

        {/* Trust row */}
        <div ref={trustRef} className="flex flex-wrap justify-center gap-5 sm:gap-8 mt-8 sm:mt-10">
          {[
            { icon: Truck, text: "Free Shipping" },
            { icon: CreditCard, text: "COD Available" },
            { icon: RotateCcw, text: "Easy Returns" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="flex items-center gap-1.5 text-xs text-white/30 font-sans uppercase tracking-wider">
                <Icon size={13} className="text-gold-500/50" strokeWidth={2} />
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default CTASection;
