import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Star, Truck, Shield, RotateCcw, ShoppingBag } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import Section from "../components/layout/Section";
import TextReveal from "../components/ui/TextReveal";
import { productData } from "../assets/data";
import { Video } from '@imagekit/react';
import { EASE, DURATION, isMobile, getResponsiveDuration, getResponsiveStagger, svgIconDraw } from '../utils/animations';


gsap.registerPlugin(ScrollTrigger, Flip);


const CategorySection = () => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const gridRef = useRef(null);
  const trustBadgesRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const mobile = isMobile();
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: mobile ? "top 85%" : "top 75%",
        once: true,
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

    // Cards stagger entrance - premium perspective reveal
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".product-card");
      tl.fromTo(
        cards,
        {
          y: mobile ? 50 : 80,
          opacity: 0,
          scale: 0.93,
          rotateX: mobile ? -8 : -15,
          willChange: 'transform, opacity',
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: getResponsiveDuration('slow'),
          stagger: getResponsiveStagger('medium'),
          ease: EASE.backGentle,
          clearProps: 'willChange',
        },
        '-=0.2'
      );

      // Card hover animations with 3D perspective tilt - desktop only
      if (!mobile) {
        cards.forEach((card) => {
          const video = card.querySelector('video');
          const videoContainer = card.querySelector('.video-bg-container');
          const ctaBtn = card.querySelector('.buy-btn-container');

          // Initialize Flip state for video expansion
          gsap.set(ctaBtn, { y: 20, opacity: 0 });

          card.addEventListener('mouseenter', () => {
            // Use Flip for seamless layout expansion (Agency effect)
            const state = Flip.getState(videoContainer);

            videoContainer.classList.add('video-expanded');

            Flip.from(state, {
              duration: 0.6,
              ease: "premium",
              scale: true,
            });

            gsap.to(ctaBtn, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(1.4)",
              delay: 0.1
            });

            // SVG icon line-draw on all icons inside the buy button
            ctaBtn.querySelectorAll('svg').forEach(svg => svgIconDraw(svg, 0.55));
          });

          card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            gsap.to(card, {
              rotateX,
              rotateY,
              scale: 1.02,
              duration: 0.4,
              ease: 'power2.out',
              transformPerspective: 1000,
            });

            // Video parallax inside card
            if (video) {
              const moveX = ((x - centerX) / centerX) * -4;
              const moveY = ((y - centerY) / centerY) * -4;
              gsap.to(video, {
                x: moveX,
                y: moveY,
                scale: 1.05,
                duration: 0.6,
                ease: 'power2.out',
              });
            }
          });

          card.addEventListener('mouseleave', () => {
            const state = Flip.getState(videoContainer);
            videoContainer.classList.remove('video-expanded');

            Flip.from(state, {
              duration: 0.6,
              ease: "premium",
              scale: true,
            });

            gsap.to(ctaBtn, {
              y: 20,
              opacity: 0,
              duration: 0.4,
              ease: "power2.in",
            });

            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              duration: 0.6,
              ease: 'premium',
            });
            if (video) {
              gsap.to(video, {
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: 'premium',
              });
            }
          });
        });
      }
    }
    // Trust badges icon line-draw — triggers on all devices when badges enter view
    // Matches exactly the ComparisonSection pattern (always-visible icon container)
    if (trustBadgesRef.current) {
      const badgeItems = trustBadgesRef.current.querySelectorAll('svg');
      badgeItems.forEach(svgEl => {
        const paths = [...svgEl.querySelectorAll('path, line, circle, polyline, polygon, rect')];
        if (!paths.length) return;
        paths.forEach(path => {
          const length = path.getTotalLength ? path.getTotalLength() : 60;
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        });
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 1.2,
          stagger: 0.05,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: trustBadgesRef.current,
            start: 'top 90%',
            once: true,
          },
        });
      });
    }

  }, { scope: sectionRef });

  return (
    <Section background="dark" padding="large" className="bg-dark-950 text-white section-gradient-warm noise-overlay" sectionRef={sectionRef}>
      <div className="space-y-8 sm:space-y-10 md:space-y-12">

        {/* Badge */}
        <div ref={badgeRef} className="flex flex-col gap-4">
          <span className="section-tag">Shop</span>
          <div className="section-header-row">
            <TextReveal as="h2" variant="slideUp" splitBy="words" trigger="top 80%" stagger={0.06} duration={0.9}
              className="text-section-xl font-display uppercase font-bold leading-none text-white">
              Compression{' '}<br className="hidden sm:block" />T-Shirts
            </TextReveal>
            <p className="text-white/60 font-sans text-sm leading-relaxed pb-1">
              Your second layer of skin — 4-way stretch, muscle support, and moisture control for peak performance.
            </p>
          </div>
          <div className="accent-rule-long mt-2" />
        </div>

        {/* Product Grid - 3D Perspective Cards */}
        <div ref={gridRef} className="grid gap-4 sm:gap-6 md:grid-cols-2 max-w-6xl mx-auto perspective-1200">
          {productData.map((product, index) => (
            <a
              key={`${product.description}-${index}`}
              href={product.flipkartLink}
              target="_blank"
              rel="noopener noreferrer"
              className="product-card group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-dark-800 transition-all duration-300 active:scale-[0.98]"
              style={{
                border: '1px solid var(--color-dark-700)',
                borderTopColor: 'rgba(255,255,255,0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 4px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.4)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Product Video Background */}
              <div className="video-bg-container absolute top-0 left-0 right-0 h-full [&.video-expanded]:h-[70%] transition-[height] duration-0 bg-dark-900 overflow-hidden"
                style={{ transformOrigin: "top center" }}>
                <div className="absolute inset-0 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  <Video
                    urlEndpoint="https://ik.imagekit.io/fr3yiiin6"
                    src={product.bgUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                    className="w-full h-full object-cover"
                    aria-hidden="true"
                  />
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-dark-900/60 via-dark-900/40 to-dark-900/95 group-hover:opacity-0 transition-opacity duration-500" />
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

              {/* Content */}
              <div className="relative z-10 flex flex-col min-h-105 sm:min-h-125 md:min-h-145 lg:min-h-160 p-5 sm:p-6 md:p-8" style={{ transform: 'translateZ(20px)' }}>
                <div className="flex-1" />

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

                  {/* Pricing — editorial typographic treatment */}
                  <div className="flex flex-wrap items-end gap-2 sm:gap-3">
                    <span className="price-hero">
                      {product.priceAfterDiscount}
                    </span>
                    <div className="flex flex-col pb-1 gap-0.5">
                      <span className="text-xs line-through text-white/30 font-sans">{product.price}</span>
                      <span className="text-[10px] uppercase tracking-wider text-gold-500/80 font-medium font-sans">{product.discount}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="buy-btn-container pt-3 sm:pt-4 border-t border-dark-700">
                    <span className="flex items-center justify-center gap-2.5 w-full py-3 sm:py-4 px-6 rounded-xl text-white text-sm font-semibold uppercase tracking-wider depth-btn-gold group-hover:text-dark-900 transition-colors duration-300">
                      <ShoppingBag size={16} className="sm:w-5 sm:h-5 shrink-0 stroke-2" />
                      Buy on Flipkart
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div ref={trustBadgesRef} className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
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
