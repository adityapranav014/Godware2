import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../components/layout/Section";
import { EASE, DURATION, isMobile, getResponsiveDuration } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

const CTASection = ({ onShopClick }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
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

    // Subtitle entrance
    tl.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DURATION.medium,
        ease: EASE.power,
      },
      '-=0.4'
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
      className="relative overflow-hidden bg-dark-900"
    >
      {/* Background Image - Subtle */}
      <div className="absolute inset-0 cta-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-900/60 to-dark-900/70" />

      {/* Content - Mobile First */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
        <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-display uppercase leading-tight font-bold text-white" style={{ perspective: '1000px' }}>
          Ignite Your Potential.
          <br className="hidden sm:block" />
          <span className="block sm:inline"> Revolutionize Every Workout</span>
        </h2>

        <p ref={subtitleRef} className="text-dark-400 sm:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
          Experience gear that transforms discipline into dominance, shop now and feel the difference.
        </p>

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
                         bg-gold-500/95 backdrop-blur-sm
                         hover:bg-gold-500 active:bg-gold-600
                         text-black font-bold 
                         text-base sm:text-lg md:text-lg lg:text-lg
                         rounded-xl sm:rounded-xl md:rounded-xl lg:rounded-xl
                         transition-all duration-300
                         shadow-[0_8px_32px_rgba(0,0,0,0.4),0_2px_8px_rgba(201,139,58,0.3)]
                         hover:shadow-[0_20px_60px_rgba(201,139,58,0.6),0_8px_16px_rgba(0,0,0,0.5)]
                         active:scale-[0.98]
                         border border-gold-500/20
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
      </div>
    </Section>
  );
};

export default CTASection;
