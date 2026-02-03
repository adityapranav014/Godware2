import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../components/layout/Section";

gsap.registerPlugin(ScrollTrigger);

const CTASection = ({ onShopClick }) => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%"
        }
      }
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
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/90 to-dark-900" />
      
      {/* Content - Mobile First */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
        <h2 className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-display uppercase leading-tight font-bold text-white">
          Ignite Your Potential.
          <br className="hidden sm:block" />
          <span className="block sm:inline"> Revolutionize Every Workout</span>
        </h2>

        <p className="text-dark-400 md:text-white/80 text-base sm:text-lg md:text-base max-w-2xl mx-auto font-sans leading-relaxed">
          Experience gear that transforms discipline into dominance—shop now and feel the difference.
        </p>
        
        {/* CTA Button - Thumb-friendly, Gold Primary */}
        <div className="pt-4">
          <button
            onClick={onShopClick}
            className="group w-full sm:w-auto min-w-[280px] sm:min-w-0 px-10 sm:px-12 lg:px-14 py-4 sm:py-5 lg:py-6 bg-gold-500 hover:bg-gold-600 active:bg-gold-700 text-dark-900 text-base sm:text-lg lg:text-lg font-bold rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gold-500/40 active:scale-100"
          >
            <span className="flex items-center justify-center gap-2 font-sans">
              Shop Now
              <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </Section>
  );
};

export default CTASection;
