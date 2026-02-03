import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CircleCheck, CircleX } from "lucide-react";
import Section from "../components/layout/Section";
import SectionHeader from "../components/layout/SectionHeader";
import { EASE, DURATION, STAGGER } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

const godWearPoints = [
  "Engineered fit with compression-grade structure",
  "Premium fabric blends for heat and sweat control",
  "Athlete-tested patterns and performance cuts",
  "Durable stitching for heavy training cycles",
  "Direct performance support community"
];

const othersPoints = [
  "Basic fits with generic sizing",
  "Average fabrics with weak sweat control",
  "Off-the-shelf silhouettes",
  "Lower durability under high intensity",
  "No athlete-led feedback loop"
];

const ComparisonSection = () => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headerRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const leftItemsRef = useRef([]);
  const rightItemsRef = useRef([]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
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

    // Header entrance
    tl.fromTo(
      headerRef.current,
      { y: 40, opacity: 0, filter: 'blur(8px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: DURATION.medium,
        ease: EASE.power,
      },
      '-=0.3'
    );

    // Cards split reveal
    tl.fromTo(
      leftCardRef.current,
      { y: 40, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: DURATION.slow,
        ease: EASE.expo,
      },
      '-=0.2'
    );

    tl.fromTo(
      rightCardRef.current,
      { y: 40, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: DURATION.slow,
        ease: EASE.expo,
      },
      '<'
    );

    // Stagger list items
    const leftItems = leftItemsRef.current.filter(Boolean);
    const rightItems = rightItemsRef.current.filter(Boolean);

    if (leftItems.length > 0) {
      tl.fromTo(
        leftItems,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DURATION.normal,
          stagger: STAGGER.fast,
          ease: EASE.power,
        },
        '-=0.6'
      );
    }

    if (rightItems.length > 0) {
      tl.fromTo(
        rightItems,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DURATION.normal,
          stagger: STAGGER.fast,
          ease: EASE.power,
        },
        '<+=0.1'
      );
    }

    // Card hover effects
    const addHoverEffect = (card) => {
      if (!card) return;
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.02,
          y: -5,
          duration: DURATION.fast,
          ease: EASE.power,
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: DURATION.fast,
          ease: EASE.power,
        });
      });
    };

    addHoverEffect(leftCardRef.current);
    addHoverEffect(rightCardRef.current);
  }, { scope: sectionRef });

  return (
    <Section background="dark" padding="large" sectionRef={sectionRef} className="bg-dark-900 text-white">
      <div className="space-y-8 sm:space-y-10 md:space-y-12">
        
        {/* Badge - Mobile Optimized */}
        <div ref={badgeRef} className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs sm:text-sm uppercase tracking-widest font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Built Different
          </span>
        </div>

        {/* Section Header */}
        <div ref={headerRef}>
          <SectionHeader
            title="Why God Wear"
            subtitle="Because performance demands more than ordinary—it demands precision, power, and purpose."
            align="center"
            titleClassName="text-white font-display text-2xl sm:text-3xl md:text-xl lg:text-2xl xl:text-3xl font-bold"
            subtitleClassName="text-dark-400 md:text-white/80 font-sans text-sm sm:text-base md:text-base"
          />
        </div>

        {/* Comparison Cards - Mobile: Stack, Desktop: Side-by-side */}
        <div className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-10 md:grid-cols-2 max-w-6xl mx-auto px-4 lg:px-8">
          
          {/* God Wear - Highlighted Card */}
          <div ref={leftCardRef} className="order-1 rounded-2xl sm:rounded-3xl border-2 border-gold-500/30 bg-gradient-to-br from-dark-800 to-dark-900 p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl shadow-gold-500/10 transition-shadow duration-300 hover:shadow-gold-500/20" style={{ perspective: '1000px' }}>
            <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8 md:mb-10 pb-4 sm:pb-6 md:pb-8 border-b border-gold-500/20">
              <span className="font-display text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl uppercase text-gold-500 tracking-tight font-bold">
                God Wear
              </span>
            </div>
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {godWearPoints.map((item, index) => (
                <div key={item}>
                  <div
                    ref={(el) => (leftItemsRef.current[index] = el)}
                    className="flex items-start gap-3 sm:gap-4 font-sans group"
                  >
                    <CircleCheck className="text-success shrink-0 mt-0.5 sm:mt-1 w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" strokeWidth={2} />
                    <p className="text-base sm:text-lg md:text-base text-white leading-relaxed">{item}</p>
                  </div>
                  {index !== godWearPoints.length - 1 && (
                    <div className="h-px bg-gradient-to-r from-transparent via-dark-700 to-transparent my-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Others - Subdued Card */}
          <div ref={rightCardRef} className="order-2 rounded-2xl sm:rounded-3xl border border-dark-700 bg-dark-800/50 p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl transition-shadow duration-300 hover:shadow-2xl" style={{ perspective: '1000px' }}>
            <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8 md:mb-10 pb-4 sm:pb-6 md:pb-8 border-b border-dark-700">
              <span className="font-display text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl uppercase text-dark-400 tracking-tight font-bold">
                Others
              </span>
            </div>
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {othersPoints.map((item, index) => (
                <div key={item}>
                  <div
                    ref={(el) => (rightItemsRef.current[index] = el)}
                    className="flex items-start gap-3 sm:gap-4 font-sans"
                  >
                    <CircleX className="text-energy-500/70 shrink-0 mt-0.5 sm:mt-1 w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" strokeWidth={2} />
                    <p className="text-base sm:text-lg md:text-base text-dark-400 md:text-white/60 leading-relaxed">{item}</p>
                  </div>
                  {index !== othersPoints.length - 1 && (
                    <div className="h-px bg-gradient-to-r from-transparent via-dark-700 to-transparent my-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ComparisonSection;
