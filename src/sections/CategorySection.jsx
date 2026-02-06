import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../components/layout/Section";
import SectionHeader from "../components/layout/SectionHeader";
import { productData } from "../assets/data";
import { Video } from '@imagekit/react';
import { EASE, DURATION, STAGGER, isMobile, getResponsiveDuration, getResponsiveStagger } from '../utils/animations';


gsap.registerPlugin(ScrollTrigger);


const CategorySection = () => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const mobile = isMobile();
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: mobile ? "top 85%" : "top 75%",
        toggleActions: 'play none none reverse',
      }
    });

    // Badge entrance - smooth bounce
    tl.fromTo(
      badgeRef.current,
      {
        scale: 0.85,
        opacity: 0,
        y: -15,
        willChange: 'transform, opacity',
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: getResponsiveDuration('medium'),
        ease: EASE.backGentle,
        clearProps: 'willChange',
      }
    );

    // Header entrance - silky smooth
    tl.fromTo(
      headerRef.current,
      {
        y: mobile ? 30 : 40,
        opacity: 0,
        filter: mobile ? 'blur(5px)' : 'blur(8px)',
        willChange: 'transform, opacity, filter',
      },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: getResponsiveDuration('medium'),
        ease: EASE.circ,
        clearProps: 'willChange',
      },
      '-=0.25'
    );

    // Cards stagger entrance - premium feel
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".product-card");
      tl.fromTo(
        cards,
        {
          y: mobile ? 40 : 60,
          opacity: 0,
          scale: 0.96,
          rotateX: mobile ? -5 : -10,
          willChange: 'transform, opacity',
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: getResponsiveDuration('medium'),
          stagger: getResponsiveStagger('normal'),
          ease: EASE.backGentle,
          clearProps: 'willChange',
        },
        '-=0.15'
      );

      // Card hover animations - desktop only for better mobile performance
      if (!mobile) {
        cards.forEach((card) => {
          const video = card.querySelector('video');

          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.02,
              y: -6,
              duration: getResponsiveDuration('fast'),
              ease: EASE.circ,
            });
            if (video) {
              gsap.to(video, {
                scale: 1.08,
                duration: getResponsiveDuration('slower'),
                ease: EASE.circ,
              });
            }
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              duration: getResponsiveDuration('fast'),
              ease: EASE.circ,
            });
            if (video) {
              gsap.to(video, {
                scale: 1,
                duration: getResponsiveDuration('slower'),
                ease: EASE.circ,
              });
            }
          });
        });
      }
    }
  }, { scope: sectionRef });

  return (
    <Section background="dark" padding="large" className="bg-dark-900 text-white" sectionRef={sectionRef}>
      <div className="space-y-8 sm:space-y-10 md:space-y-12">

        {/* Badge */}
        <div ref={badgeRef} className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs sm:text-sm uppercase tracking-widest font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Shop
          </span>
        </div>

        {/* Header */}
        <div ref={headerRef}>
          <SectionHeader
            title="Compression T-Shirts"
            subtitle="Your second layer of skin—4-way stretch, muscle support, and moisture control for peak performance."
            align="center"
            titleClassName="text-white font-display text-2xl sm:text-3xl md:text-xl lg:text-2xl xl:text-3xl font-bold break-words"
            subtitleClassName="text-dark-400 md:text-white/80 font-sans text-sm sm:text-base md:text-base"
          />
        </div>

        {/* Product Grid - Mobile: Single Column, Desktop: 2 Columns */}
        <div ref={gridRef} className="grid gap-4 sm:gap-6 md:grid-cols-2 max-w-6xl mx-auto">
          {productData.map((product, index) => (
            <a
              key={`${product.description}-${index}`}
              href={product.flipkartLink}
              target="_blank"
              rel="noopener noreferrer"
              className="product-card group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-dark-700 bg-dark-800 hover:border-gold-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gold-500/10 active:scale-100"
            >
              {/* Product Video Background */}
              <div className="absolute inset-0 bg-dark-900">
                <div className="absolute inset-0 opacity-70 group-hover:opacity-80 transition-opacity duration-300">
                  <Video
                    urlEndpoint="https://ik.imagekit.io/fr3yiiin6"
                    src={product.bgUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Gradient Overlay - Ensures text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-dark-900/40 to-dark-900/95" />
              </div>

              {/* Content - Mobile Optimized */}
              <div className="relative z-10 flex flex-col min-h-[480px] sm:min-h-[560px] md:min-h-[640px] p-5 sm:p-6 md:p-8">
                {/* Spacer - Pushes content to bottom */}
                <div className="flex-1" />

                {/* Product Info */}
                <div className="space-y-3 sm:space-y-4">
                  {/* Pricing - Clear Hierarchy */}
                  <div className="flex flex-wrap items-end gap-2 sm:gap-3">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold-500">
                      {product.priceAfterDiscount}
                    </span>
                    <span className="text-sm line-through text-dark-400 mb-1">
                      {product.price}
                    </span>
                    <span className="text-xs sm:text-sm uppercase tracking-wider text-energy-500 font-semibold mb-1 px-2 py-0.5 bg-energy-500/10 rounded">
                      {product.discount}
                    </span>
                  </div>

                  {/* Flipkart Label */}
                  <p className="text-xs sm:text-sm uppercase tracking-wider text-dark-400 font-medium">
                    Buy from Flipkart
                  </p>

                  {/* CTA Button - Thumb-friendly */}
                  <div className="pt-3 sm:pt-4 border-t border-dark-700">
                    <span className="flex items-center justify-center gap-2 w-full py-3 sm:py-4 px-6 rounded-xl bg-dark-800 border border-dark-700 text-white text-sm font-semibold uppercase tracking-wider transition-all duration-300 group-hover:bg-gold-500 group-hover:text-dark-900 group-hover:border-gold-500">
                      View Product
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default CategorySection;
