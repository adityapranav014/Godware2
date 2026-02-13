import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Star, Truck, Shield, RotateCcw, ShoppingBag } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../components/layout/Section";
import SectionHeader from "../components/layout/SectionHeader";
import Badge from "../components/ui/Badge";
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
    <Section background="dark" padding="large" className="bg-dark-950 text-white section-gradient-warm noise-overlay" sectionRef={sectionRef}>
      <div className="space-y-8 sm:space-y-10 md:space-y-12">

        {/* Badge */}
        <div ref={badgeRef}>
          <Badge>Shop</Badge>
        </div>

        {/* Header */}
        <div ref={headerRef}>
          <SectionHeader
            title="Compression T-Shirts"
            subtitle="Your second layer of skin, 4 way stretch, muscle support, and moisture control for peak performance."
            align="center"
            titleClassName="text-white font-display text-2xl sm:text-3xl md:text-xl lg:text-2xl xl:text-3xl font-bold"
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
              className="product-card group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-dark-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                border: '1px solid var(--color-dark-700)',
                borderTopColor: 'rgba(255,255,255,0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 4px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.4)'
              }}
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

              {/* Badge Overlay */}
              {product.badge && (
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-md ${product.badge === 'BESTSELLER'
                    ? 'bg-gold-500/90 text-dark-900'
                    : 'bg-red-500/90 text-white'
                    }`}>
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Content - Mobile Optimized */}
              <div className="relative z-10 flex flex-col min-h-[420px] sm:min-h-[500px] md:min-h-[580px] lg:min-h-[640px] p-5 sm:p-6 md:p-8">
                {/* Spacer - Pushes content to bottom */}
                <div className="flex-1" />

                {/* Product Info */}
                <div className="space-y-3 sm:space-y-4">

                  {/* Product Name */}
                  <h3 className="text-lg sm:text-xl font-bold text-white font-display tracking-tight">
                    {product.description}
                  </h3>

                  {/* Star Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={13}
                            className={i < Math.floor(product.rating) ? "star-gold" : "text-dark-600"}
                            fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                            strokeWidth={1.5}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-dark-400 font-sans">
                        {product.rating} ({product.reviewCount}+ reviews)
                      </span>
                    </div>
                  )}

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

                  {/* CTA Button - Thumb-friendly */}
                  <div className="pt-3 sm:pt-4 border-t border-dark-700">
                    <span className="flex items-center justify-center gap-2.5 w-full py-3 sm:py-4 px-6 rounded-xl text-white text-sm font-semibold uppercase tracking-wider depth-btn-gold group-hover:text-dark-900 transition-colors duration-300">
                      {/* Shopping Bag Icon */}
                      <ShoppingBag size={16} className="sm:w-5 sm:h-5 flex-shrink-0 stroke-[2]" />
                      Buy on Flipkart
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
          {[
            { icon: Truck, text: "Free Shipping" },
            { icon: Shield, text: "Quality Guaranteed" },
            { icon: RotateCcw, text: "Easy Returns" },
          ].map((badge) => {
            const BadgeIcon = badge.icon;
            return (
              <div key={badge.text} className="trust-badge">
                <BadgeIcon size={14} className="text-gold-500" strokeWidth={2} />
                <span>{badge.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default CategorySection;
