import { useEffect, useRef } from 'react';
import { Video } from '@imagekit/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ onShopClick }) => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text into words and lines for advanced animation control
      const splitText = new SplitType(textRef.current, { 
        types: 'lines,words,chars',
        lineClass: 'line-split',
        wordClass: 'word-split'
      });

      // Set initial CSS for split elements
      gsap.set(splitText.lines, { overflow: 'hidden' });
      
      // Master timeline with refined pacing
      const masterTl = gsap.timeline({ 
        defaults: { ease: 'power4.out' }
      });

      // Video reveal - cinematic entrance with sophisticated blur
      masterTl.fromTo(
        videoContainerRef.current,
        { 
          opacity: 0, 
          scale: 1.08,
          filter: 'blur(20px) brightness(0.7)'
        },
        { 
          opacity: 1, 
          scale: 1, 
          filter: 'blur(0px) brightness(1)',
          duration: 2.5,
          ease: 'power3.inOut'
        }
      );

      // Premium word reveal with mask effect
      masterTl.fromTo(
        splitText.words,
        { 
          willChange: 'transform, opacity, filter',
          opacity: 0,
          yPercent: 120,
          rotateX: -15,
          scale: 0.9,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          yPercent: 0,
          rotateX: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.4,
          stagger: {
            each: 0.12,
            from: 'start',
            ease: 'power3.out'
          },
          ease: 'expo.out',
          clearProps: 'willChange'
        },
        '-=2'
      );

      // Character refinement - subtle depth animation
      masterTl.fromTo(
        splitText.chars,
        { 
          opacity: 0.6,
          letterSpacing: '0.1em'
        },
        {
          opacity: 1,
          letterSpacing: '0em',
          duration: 1,
          stagger: {
            each: 0.015,
            from: 'start'
          },
          ease: 'power2.out',
        },
        '-=1.2'
      );

      // Add premium glow effect that builds up
      masterTl.to(
        textRef.current,
        {
          textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(212, 175, 55, 0.2)',
          duration: 1.5,
          ease: 'power2.inOut',
        },
        '-=0.8'
      );

      // Button entrance - premium slide with depth
      masterTl.fromTo(
        buttonRef.current,
        { 
          willChange: 'transform, opacity, filter',
          opacity: 0, 
          y: 60,
          scale: 0.92,
          filter: 'blur(8px)',
          rotateX: -10
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          rotateX: 0,
          duration: 1.3,
          ease: 'expo.out',
          clearProps: 'willChange'
        },
        '-=0.8'
      );

      // Sophisticated infinite animations
      
      // Text breathing - very subtle scale with organic timing
      gsap.to(splitText.words, {
        scale: 1.015,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.15,
          repeat: -1,
          yoyo: true
        }
      });

      // Gentle floating with perspective
      gsap.to(textRef.current, {
        y: -8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Subtle glow pulse for premium feel
      gsap.to(textRef.current, {
        textShadow: '0 0 50px rgba(255, 255, 255, 0.4), 0 0 100px rgba(212, 175, 55, 0.3)',
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // ===== SCROLL ANIMATIONS =====
      
      // Parallax effect on video - different speeds for mobile vs desktop
      const isMobile = window.innerWidth < 768;
      
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const scale = 1 + (progress * (isMobile ? 0.1 : 0.15));
          const opacity = 1 - (progress * 0.8);
          
          gsap.to(videoContainerRef.current, {
            scale: scale,
            opacity: opacity,
            filter: `blur(${progress * (isMobile ? 8 : 15)}px) brightness(${1 - progress * 0.3})`,
            duration: 0.1,
          });
        }
      });

      // Text zoom out and fade on scroll
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const scale = 1 - (progress * 0.3);
          const opacity = 1 - (progress * 1.2);
          const y = progress * (isMobile ? 100 : 150);
          
          gsap.to(textRef.current, {
            scale: scale,
            opacity: opacity,
            y: -y,
            filter: `blur(${progress * (isMobile ? 4 : 8)}px)`,
            duration: 0.1,
          });
        }
      });

      // Button scroll animation
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const opacity = 1 - (progress * 1.5);
          const y = progress * (isMobile ? 80 : 120);
          const scale = 1 - (progress * 0.2);
          
          gsap.to(buttonRef.current, {
            opacity: opacity,
            y: -y,
            scale: scale,
            filter: `blur(${progress * 6}px)`,
            duration: 0.1,
          });
        }
      });

      // Overlay darkness increases on scroll for smooth transition
      const overlayElement = heroRef.current.querySelector('.hero-overlay');
      if (overlayElement) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(overlayElement, {
              opacity: 0.7 + (progress * 0.3),
              duration: 0.1,
            });
          }
        });
      }

      // Refresh ScrollTrigger on resize for responsiveness
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
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-display text-center leading-tight tracking-tight mb-8 sm:mb-12 md:mb-16 max-w-[90vw] sm:max-w-none"
          style={{ 
            perspective: '1200px',
            transformStyle: 'preserve-3d'
          }}
        >
          Your Second Layer of Skin
        </h1>

        {/* Shop Now Button */}
        <div ref={buttonRef}>
          <button
            onClick={onShopClick}
            className="group relative px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 bg-gold-500 hover:bg-gold-400 text-black text-base sm:text-lg md:text-xl font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gold-500/50 active:scale-95 overflow-hidden"
          >
            {/* Button shine effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <span className="relative flex items-center justify-center gap-2 sm:gap-3 font-sans">
              Shop Now
              <svg 
                className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-gold-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
