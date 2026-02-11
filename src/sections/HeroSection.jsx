import { useEffect, useRef } from 'react';
import { Video } from '@imagekit/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE, DURATION, isMobile, getResponsiveDuration } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ onShopClick }) => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const videoContainerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mobile = isMobile();

      // Master timeline with refined pacing
      const masterTl = gsap.timeline({
        defaults: { ease: EASE.circ },
        delay: 0.2
      });

      // Video reveal - premium cinematic entrance (mobile optimized)
      masterTl.fromTo(
        videoContainerRef.current,
        {
          opacity: 0,
          scale: mobile ? 1.08 : 1.12,
          filter: mobile ? 'blur(15px) brightness(0.6)' : 'blur(30px) brightness(0.5)',
          willChange: 'transform, opacity, filter',
        },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px) brightness(1)',
          duration: mobile ? DURATION.cinematic : DURATION.epic,
          ease: EASE.expo,
          clearProps: 'willChange',
        }
      );

      // Text entrance with depth (mobile optimized)
      masterTl.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: mobile ? 50 : 80,
          scale: 0.92,
          rotateX: mobile ? 10 : 20,
          filter: mobile ? 'blur(6px)' : 'blur(10px)',
          willChange: 'transform, opacity, filter',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: getResponsiveDuration('slow'),
          ease: EASE.expo,
          clearProps: 'willChange',
        },
        mobile ? '-=1.2' : '-=1.8'
      );

      // Button entrance - premium slide with depth
      masterTl.fromTo(
        buttonRef.current,
        {
          willChange: 'transform, opacity, filter',
          opacity: 0,
          y: mobile ? 50 : 80,
          scale: 0.88,
          filter: mobile ? 'blur(8px)' : 'blur(12px)',
          rotateX: mobile ? -8 : -15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          rotateX: 0,
          duration: getResponsiveDuration('slow'),
          ease: EASE.backSoft,
          clearProps: 'willChange',
        },
        '-=0.7'
      );

      // Scroll indicator fade in
      if (scrollIndicatorRef.current) {
        masterTl.fromTo(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            y: -15,
          },
          {
            opacity: 1,
            y: 0,
            duration: getResponsiveDuration('medium'),
            ease: EASE.circ,
          },
          '-=0.4'
        );
      }

      // ===== SCROLL ANIMATIONS - Mobile Optimized =====

      // Parallax effect on video - responsive and smooth
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: mobile ? 2 : 1.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const scale = 1 + (progress * (mobile ? 0.08 : 0.15));
          const opacity = Math.max(0, 1 - (progress * 1.3));
          const blur = progress * (mobile ? 8 : 15);
          const brightness = Math.max(0.5, 1 - progress * 0.35);

          gsap.to(videoContainerRef.current, {
            scale: scale,
            opacity: opacity,
            filter: `blur(${blur}px) brightness(${brightness})`,
            duration: 0,
          });
        }
      });

      // Text reveal and zoom on scroll - silky smooth
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: mobile ? 2 : 1.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const opacity = Math.max(0, 1 - (progress * 1.6));
          const y = progress * (mobile ? 80 : 150);
          const scale = Math.max(0.85, 1 - (progress * 0.15));
          const blur = progress * (mobile ? 8 : 12);

          gsap.to(textRef.current, {
            opacity: opacity,
            y: -y,
            scale: scale,
            filter: `blur(${blur}px)`,
            duration: 0,
          });
        }
      });

      // Button scroll animation - premium smooth
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: mobile ? 2 : 1.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const opacity = Math.max(0, 1 - (progress * 1.9));
          const y = progress * (mobile ? 70 : 120);
          const scale = Math.max(0.75, 1 - (progress * 0.25));
          const blur = progress * (mobile ? 6 : 8);

          // Animate entire button container including glow
          gsap.to(buttonRef.current, {
            opacity: opacity,
            y: -y,
            scale: scale,
            filter: `blur(${blur}px)`,
            duration: 0,
          });
        }
      });

      // Scroll indicator fade out early
      if (scrollIndicatorRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: '15% top',
          scrub: true,
          onUpdate: (self) => {
            gsap.to(scrollIndicatorRef.current, {
              opacity: Math.max(0, 1 - (self.progress * 2.5)),
              y: self.progress * 20,
              duration: 0,
            });
          }
        });
      }

      // Overlay darkness increases on scroll
      const overlayElement = heroRef.current.querySelector('.hero-overlay');
      if (overlayElement) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            const opacity = 0.6 + (self.progress * 0.3);
            gsap.to(overlayElement, {
              opacity: opacity,
              duration: 0,
            });
          }
        });
      }

      // Responsive ScrollTrigger refresh
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative bg-black text-white min-h-dvh overflow-hidden">
      {/* Full-screen Video Background */}
      <div ref={videoContainerRef} className="absolute inset-0 w-full h-full">
        <Video
          urlEndpoint="https://ik.imagekit.io/fr3yiiin6"
          src="/video/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 transition-opacity duration-300" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-dvh px-6 sm:px-8 lg:px-12">
        {/* Hero Text on Video */}
        <h1
          ref={textRef}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-display text-center leading-tight tracking-tight mb-8 sm:mb-12 md:mb-16 max-w-[90vw] sm:max-w-none mix-blend-overlay text-white/90"
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d'
          }}
        >
          Your Second Layer of Skin
        </h1>

        {/* Shop Now Button - Professional Video Overlay CTA */}
        <div ref={buttonRef} className="relative mix-blend-overlay">
          {/* Button glow effect container - Changed to white for seamless integration */}
          <div className="absolute inset-0 blur-2xl opacity-40 bg-white/20 rounded-2xl scale-110 transition-opacity duration-300 pointer-events-none" />

          <button
            onClick={onShopClick}
            className="group relative w-full sm:w-auto min-w-[280px] sm:min-w-[300px] md:min-w-[320px] lg:min-w-[320px] max-w-[90vw] sm:max-w-[360px] 
                       px-8 sm:px-10 md:px-11 lg:px-12 
                       py-4 sm:py-[1.0rem] md:py-[1.125rem] lg:py-[1.125rem]
                       depth-btn backdrop-blur-md
                       text-white font-bold 
                       text-base sm:text-lg md:text-lg lg:text-lg
                       rounded-xl sm:rounded-xl md:rounded-xl lg:rounded-xl
                       overflow-hidden
                       focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/50"
            aria-label="Shop Now - Browse our premium gym wear collection"
            onMouseEnter={(e) => {
              if (!isMobile()) {
                gsap.to(e.currentTarget, {
                  y: -2,
                  scale: 1.01,
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
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

            {/* Corner accents for premium feel */}
            <span className="absolute top-0 left-0 w-2 h-2 bg-white/60 rounded-br-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-white/60 rounded-tl-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Button content */}
            <span className="relative flex items-center justify-center gap-2.5 sm:gap-3 font-sans tracking-wide">
              <span className="relative">
                Shop Now
                {/* Text underline animation on hover */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/60 group-hover:w-full transition-all duration-300" />
              </span>

              {/* Animated arrow icon */}
              <svg
                className="w-5 h-5 sm:w-[1.375rem] sm:h-[1.375rem] md:w-6 md:h-6 animate-arrow-right"
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

        {/* Scroll Indicator */}
        <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2 animate-pulse">
            <div className="w-1.5 h-3 bg-gold-500 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </div >
  );
};

export default HeroSection;
