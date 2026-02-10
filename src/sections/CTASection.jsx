import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Truck, CreditCard, RotateCcw, Users } from "lucide-react";
import Section from "../components/layout/Section";
import { EASE, DURATION, isMobile, getResponsiveDuration } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

const CTASection = ({ onShopClick }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

    // Dramatic section entrance
    tl.fromTo(
      sectionRef.current,
      {
        opacity: 0,
        scale: 0.95,
        filter: 'blur(15px)',
      },
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: DURATION.slow,
        ease: EASE.expo,
      }
    );

    // Title entrance with impact
    tl.fromTo(
      titleRef.current,
      {
        y: 60,
        opacity: 0,
        scale: 0.9,
        rotateX: -20,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration: DURATION.slow,
        ease: EASE.back,
      },
      '-=0.5'
    );

    // Button entrance with anticipation
    tl.fromTo(
      buttonRef.current,
      {
        opacity: 0,
        y: 40,
        scale: 0.88,
        filter: 'blur(8px)',
        rotateX: -8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        rotateX: 0,
        duration: DURATION.slow,
        ease: EASE.backSoft,
      },
      '-=0.3'
    );
  }, { scope: sectionRef });

  return (
    <Section
      sectionRef={sectionRef}
      background="dark"
      padding="large"
      className="relative overflow-hidden bg-dark-950 noise-overlay"
    >
      {/* Background Image - Subtle */}
      <div className="absolute inset-0 cta-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-900/60 to-dark-900/70" />

      {/* Content - Mobile First */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
        {/* Urgency Badge */}
        <div className="mb-4 sm:mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-red-500/10 border border-red-500/20 text-red-400 glow-gold-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Limited Time — 69% Off Sale
          </span>
        </div>

        <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-display uppercase leading-tight font-bold animated-gradient-text" style={{ perspective: '1000px' }}>
          Ignite Your Potential.
          <br className="hidden sm:block" />
          <span className="block sm:inline"> Revolutionize Every Workout</span>
        </h2>

        {/* Social Proof Counter */}
        <div className="flex items-center justify-center gap-2 text-sm text-white/60 font-sans">
          <Users size={16} className="text-gold-500" />
          <span>Join <strong className="text-white">10,000+</strong> athletes who chose GOD WEAR</span>
        </div>

        {/* CTA Button - Same as Hero Section */}
        <div className="pt-4">
          <div ref={buttonRef} className="relative">
            {/* Button glow effect container */}
            <div className="absolute inset-0 blur-xl opacity-60 bg-gold-500/30 rounded-2xl scale-105 transition-opacity duration-300 pointer-events-none" />

            <button
              onClick={onShopClick}
              className="group relative w-full sm:w-auto min-w-[280px] sm:min-w-[300px] md:min-w-[320px] lg:min-w-[320px] max-w-[90vw] sm:max-w-[360px] 
                         px-8 sm:px-10 md:px-11 lg:px-12 
                         py-4 sm:py-[1.0rem] md:py-[1.125rem] lg:py-[1.125rem]
                         depth-btn-gold
                         text-black font-bold 
                         text-base sm:text-lg md:text-lg lg:text-lg
                         rounded-xl sm:rounded-xl md:rounded-xl lg:rounded-xl
                         active:scale-[0.98]
                         overflow-hidden
                         focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:ring-offset-2 focus:ring-offset-black/50"
              aria-label="Shop Now - Browse our premium gym wear collection"
              onMouseEnter={(e) => {
                if (!isMobile()) {
                  gsap.to(e.currentTarget, {
                    y: -4,
                    scale: 1.02,
                    duration: getResponsiveDuration('fast'),
                    ease: EASE.backGentle,
                  });
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile()) {
                  gsap.to(e.currentTarget, {
                    y: 0,
                    scale: 1,
                    duration: getResponsiveDuration('fast'),
                    ease: EASE.circ,
                  });
                }
              }}
            >
              {/* Animated gradient overlay - Shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

              {/* Corner accents for premium feel */}
              <span className="absolute top-0 left-0 w-2 h-2 bg-white/40 rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-white/40 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Button content */}
              <span className="relative flex items-center justify-center gap-2.5 sm:gap-3 font-sans tracking-wide">
                <span className="relative">
                  Shop Now
                  {/* Text underline animation on hover */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black/40 group-hover:w-full transition-all duration-300" />
                </span>

                {/* Animated arrow icon */}
                <svg
                  className="w-5 h-5 sm:w-[1.375rem] sm:h-[1.375rem] md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1.5 group-active:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Trust Icons Row */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-2">
          {[
            { icon: Truck, text: "Free Shipping" },
            { icon: CreditCard, text: "COD Available" },
            { icon: RotateCcw, text: "Easy Returns" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="flex items-center gap-1.5 text-xs text-dark-400 font-sans">
                <Icon size={14} className="text-gold-500/60" strokeWidth={2} />
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
