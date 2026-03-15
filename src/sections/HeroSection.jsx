import { useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { Video } from '@imagekit/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE, DURATION, isMobile, getResponsiveDuration, ripple, buttonHoverIn, buttonHoverOut, hapticImpact } from '../utils/animations';
import { uiConfigData } from '../assets/data';
import { CSS_CLASSES } from '../constants/config';
import TextReveal from '../components/ui/TextReveal';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ onShopClick, preloaderComplete }) => {
  const heroRef = useRef(null);
  const eyebrowRef = useRef(null);
  const buttonRef = useRef(null);
  const heroBtnRef = useRef(null);
  const videoContainerRef = useRef(null);

  // GSAP anticipation hover — not CSS, uses 2-phase timeline
  // Phase 1: micro-squeeze (anticipation) | Phase 2: lift + scale (action)
  const handleBtnEnter = useCallback(() => buttonHoverIn(heroBtnRef.current), []);
  const handleBtnLeave = useCallback(() => buttonHoverOut(heroBtnRef.current), []);

  // Click: ripple + scroll to shop
  const handleBtnClick = useCallback((e) => {
    if (heroBtnRef.current) ripple(heroBtnRef.current, e, 'rgba(0,0,0,0.15)');
    hapticImpact('light');
    onShopClick?.();
  }, [onShopClick]);
  const scrollIndicatorRef = useRef(null);
  const subtitleRef = useRef(null);

  // Hide animated elements before first paint so nothing flashes visible
  // under the preloader overlay. useLayoutEffect fires synchronously before browser paint.
  useLayoutEffect(() => {
    gsap.set(
      [videoContainerRef.current, buttonRef.current, scrollIndicatorRef.current].filter(Boolean),
      { opacity: 0 }
    );
  }, []);

  // Only run entrance animations once the preloader has exited.
  // This creates a clean hand-off: preloader curtain rises while hero bursts in.
  useEffect(() => {
    if (!preloaderComplete) return;

    const ctx = gsap.context(() => {
      const mobile = isMobile();

      // Master timeline — no delay needed, preloader already handled the timing
      const masterTl = gsap.timeline({
        defaults: { ease: EASE.circ },
      });

      // Video reveal - premium cinematic entrance (mobile optimized)
      masterTl.fromTo(
        videoContainerRef.current,
        {
          opacity: 0,
          scale: mobile ? 1.08 : 1.15,
          filter: mobile ? 'blur(15px) brightness(0.6)' : 'blur(40px) brightness(0.4)',
          willChange: 'transform, opacity, filter',
        },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px) brightness(1)',
          duration: mobile ? DURATION.cinematic : 2.5,
          ease: EASE.expo,
          clearProps: 'willChange',
        }
      );

      // Eyebrow line + text entrance
      masterTl.fromTo(
        eyebrowRef.current,
        {
          opacity: 0,
          x: -30,
          filter: 'blur(8px)',
          willChange: 'transform, opacity, filter',
        },
        {
          opacity: 0.8,
          x: 0,
          filter: 'blur(0px)',
          duration: getResponsiveDuration('medium'),
          ease: 'power4.out',
          clearProps: 'willChange',
        },
        mobile ? 1.0 : 1.6
      );

      // Button entrance FIRST — this is the PARENT div containing the subtitle.
      // Must reveal the parent before animating the child, otherwise child
      // animation plays while parent is at opacity:0 (invisible).
      masterTl.fromTo(
        buttonRef.current,
        {
          willChange: 'transform, opacity',
          opacity: 0,
          y: mobile ? 20 : 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: getResponsiveDuration('normal'),
          ease: "power3.out",
          clearProps: 'willChange',
        },
        "-=0.3"
      );

      // Subtitle secondary polish — blur-in INSIDE the now-visible parent.
      if (subtitleRef.current) {
        masterTl.fromTo(
          subtitleRef.current,
          {
            y: 12,
            filter: 'blur(5px)',
          },
          {
            y: 0,
            filter: 'blur(0px)',
            duration: getResponsiveDuration('normal'),
            ease: 'power3.out',
          },
          '-=0.45'
        );
      }

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
          "-=0.4"
        );
      }

      // ===== SCROLL ANIMATIONS - Multi-layer Parallax Depth =====

      // Layer 1: Background video — slowest (parallax depth)
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: mobile ? 2 : 1.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const scale = 1 + (progress * (mobile ? 0.08 : 0.2));
          const opacity = Math.max(0, 1 - (progress * 1.3));
          const blur = progress * (mobile ? 8 : 18);
          const brightness = Math.max(0.4, 1 - progress * 0.4);
          const y = progress * (mobile ? 40 : 80); // parallax shift

          gsap.set(videoContainerRef.current, {
            scale: scale,
            opacity: opacity,
            filter: `blur(${blur}px) brightness(${brightness})`,
            y: y,
          });
        }
      });

      // Layer 2: Text — moves faster than video for depth
      const textElements = heroRef.current?.querySelector('.hero-text-container');
      if (textElements) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: mobile ? 2 : 1.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const opacity = Math.max(0, 1 - (progress * 1.6));
            const y = progress * (mobile ? 100 : 180);
            const scale = Math.max(0.85, 1 - (progress * 0.15));
            const blur = progress * (mobile ? 8 : 12);

            gsap.set(textElements, {
              opacity: opacity,
              y: -y,
              scale: scale,
              filter: `blur(${blur}px)`,
            });
          }
        });
      }

      // Layer 3: Button — moves fastest for parallax depth
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: mobile ? 2 : 1.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const opacity = Math.max(0, 1 - (progress * 2.0));
          const y = progress * (mobile ? 80 : 140);
          const scale = Math.max(0.75, 1 - (progress * 0.25));
          const blur = progress * (mobile ? 6 : 10);

          gsap.set(buttonRef.current, {
            opacity: opacity,
            y: -y,
            scale: scale,
            filter: `blur(${blur}px)`,
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
            gsap.set(scrollIndicatorRef.current, {
              opacity: Math.max(0, 1 - (self.progress * 2.5)),
              y: self.progress * 20,
            });
          }
        });
      }

      // Overlay darkness increases slightly on scroll (starts at full opacity so gradient is always effective)
      const overlayElement = heroRef.current.querySelector('.hero-overlay');
      if (overlayElement) {
        // Pin the overlay at opacity 1 initially, allow subtle darkening on scroll
        gsap.set(overlayElement, { opacity: 1 });
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            const opacity = 1.0 + (self.progress * 0.0); // stays at 1
            gsap.set(overlayElement, {
              opacity: opacity,
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
  }, [preloaderComplete]);

  return (
    <div ref={heroRef} className="relative bg-black text-white overflow-hidden" style={{ height: 'calc(100dvh - 72px)', minHeight: '600px' }}>
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
          aria-hidden="true"
        />
        {/* Cinematic dark overlay for text readability (Radial Gradient) */}
        <div className="hero-overlay absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.04) 25%, rgba(0,0,0,0.52) 65%, rgba(0,0,0,0.93) 100%)' }}
        />
      </div>

      {/* ── Corner Metadata ── */}
      <div
        ref={eyebrowRef}
        className="absolute top-0 left-0 right-0 z-20 flex justify-between items-start"
        style={{ paddingTop: '6.5rem', paddingInline: 'clamp(1.5rem, 5vw, 3rem)', opacity: 0 }}
      >
        <div className="flex items-center gap-3">
          <span className="accent-rule" />
          <span className="editorial-label-gold">Your second layer of skin</span>
        </div>
        <span className="editorial-pill hidden sm:inline-flex">
          <span role="img" aria-label="India flag" style={{ fontSize: '0.85em', lineHeight: 1 }}>🇮🇳</span>
          {' '}Made in India
        </span>
      </div>

      {/* ── Main Content — Bottom Anchored ── */}
      <div className="relative z-10 flex flex-col justify-end h-full pb-10 sm:pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 xl:px-8">

          {/* MASSIVE Editorial Heading */}
          <div className="hero-text-container mb-6 sm:mb-8">
            <TextReveal
              as="h1"
              variant="slideUp"
              splitBy="words"
              trigger="top 95%"
              stagger={0.08}
              duration={1.0}
              delay={1.8}
              className="text-hero font-display leading-none tracking-tight uppercase perspective-text"
              style={{
                color: 'rgba(255,255,255,0.78)',
                mixBlendMode: 'overlay',
                textShadow: '0 2px 0 rgba(0,0,0,0.12)',
              }}
            >
              {uiConfigData.hero.mainHeading}
            </TextReveal>
          </div>

          {/* Thin rule separator */}
          <div className="hero-bottom-rule" />

          {/* Bottom Bar */}
          <div
            ref={buttonRef}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8"
            style={{ opacity: 0 }}
          >
            <div className="max-w-xs sm:max-w-sm">
              <p
                ref={subtitleRef}
                className={CSS_CLASSES.heroSubtitle}
              >
                Engineered for those who demand more. The perfect balance of restriction and release.
              </p>
              <button
                ref={heroBtnRef}
                onClick={handleBtnClick}
                onMouseEnter={handleBtnEnter}
                onMouseLeave={handleBtnLeave}
                data-magnetic
                className="group inline-flex items-center justify-center gap-3 text-sm py-3 px-8 sm:py-3.5 sm:px-10 bg-white text-black uppercase tracking-[0.15em] font-medium overflow-hidden relative active:scale-[0.98] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)]"
                aria-label="Shop Now - Browse our premium compression t-shirts"
              >
                <span>{uiConfigData.hero.ctaButton}</span>
                <span className="text-base transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </button>
            </div>
            <div className="flex items-end gap-8 sm:gap-10 sm:pb-0.5">
              {[
                { val: '10K+', label: 'Athletes' },
                { val: '4.5★', label: 'Rated' },
                { val: '69%', label: 'Off Today' },
              ].map((s) => (
                <div key={s.label} className="text-right">
                  <p className={CSS_CLASSES.heroStatValue}>{s.val}</p>
                  <p className={CSS_CLASSES.heroStatLabel}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Vertical SCROLL indicator ── */}
      <div ref={scrollIndicatorRef} className="absolute right-5 sm:right-8 bottom-16 z-20">
        <div className="writing-vert flex items-center gap-2.5">
          <span className="text-[8px] uppercase tracking-[0.5em] text-white/20 font-sans">Scroll</span>
          <div className="w-px bg-white/15 scroll-indicator-draw" style={{ height: '44px' }} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
