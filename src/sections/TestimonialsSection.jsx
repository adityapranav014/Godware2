import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../components/layout/Section";
import SectionHeader from "../components/layout/SectionHeader";
import { EASE, DURATION, STAGGER } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Strength Coach",
    text: "The fit and durability are unreal. After heavy sessions, the fabric still feels fresh.",
    image: "https://dfdx9u0psdezh.cloudfront.net/testimonials/2a424c3f32e78e318bdc2234.webp"
  },
  {
    name: "Priya Mehta",
    role: "CrossFit Athlete",
    text: "Finally, gear that keeps up with high-intensity intervals without riding up.",
    image: "https://dfdx9u0psdezh.cloudfront.net/testimonials/7502fa1373cb33d9e1c94027.webp"
  },
  {
    name: "Sneha Verma",
    role: "Runner",
    text: "Breathable and light. The compression is just right for long training blocks.",
    image: "https://dfdx9u0psdezh.cloudfront.net/testimonials/982a7a31e14d7f3e908544fa.webp"
  },
  {
    name: "Arjun Malik",
    role: "Bodybuilder",
    text: "Stitching, cut, and feel are all premium. Looks sharp in and out of the gym.",
    image: "https://dfdx9u0psdezh.cloudfront.net/testimonials/3039dffc08ff5ef12227dd51.webp"
  },
  {
    name: "Karan Mehta",
    role: "Functional Athlete",
    text: "The compression T-shirt locks my torso without choking movement—ideal for long supersets and keeps the midsection warm through every rep.",
    image: "https://dfdx9u0psdezh.cloudfront.net/testimonials/2a424c3f32e78e318bdc2234.webp"
  },
  {
    name: "Aniket Rao",
    role: "Marathon Prep Athlete",
    text: "Runs stay sweat-free thanks to the targeted compression panels. I never look forward to post-run chafing, but this tee keeps me comfortable for miles.",
    image: "https://dfdx9u0psdezh.cloudfront.net/testimonials/2a424c3f32e78e318bdc2234.webp"
  },
  {
    name: "Devansh Patel",
    role: "Cross-Training Enthusiast",
    text: "The compression tee hugs the right places so my form stays locked during plyo drills, yet it's breathable enough for high cadence circuits.",
    image: "https://dfdx9u0psdezh.cloudfront.net/testimonials/2a424c3f32e78e318bdc2234.webp"
  },
  {
    name: "Nikhil Kapoor",
    role: "Circuit Racer",
    text: "I rotate this shirt between the gym and track. The compressive feel keeps my shoulders steady and doesn’t bunch under my race bibs.",
    image: "https://dfdx9u0psdezh.cloudfront.net/testimonials/2a424c3f32e78e318bdc2234.webp"
  },
  {
    name: "Samar Verma",
    role: "Weightlifting Coach",
    text: "Clients keep asking where I got my gear. It stays locked in for every snatch and still feels soft for cool-down stretches.",
    image: "https://dfdx9u0psdezh.cloudfront.net/testimonials/2a424c3f32e78e318bdc2234.webp"
  },
  {
    name: "Kavya Rao",
    role: "Fitness Model",
    text: "Layered under my shoot wardrobe, it never creases or wrinkles, and the compression gives me that sculpted look without stiffness.",
    image: "https://dfdx9u0psdezh.cloudfront.net/testimonials/2a424c3f32e78e318bdc2234.webp"
  },
  {
    name: "Himanshu Dixit",
    role: "Trail Runner",
    text: "Humidity and heat are no match; the tee moves with me yet supports my midsection, perfect for long, off-road days.",
    image: "https://dfdx9u0psdezh.cloudfront.net/testimonials/2a424c3f32e78e318bdc2234.webp"
  },
  {
    name: "Meera Iyer",
    role: "Strength Athlete",
    text: "Compression panels feel like a second skin, especially during partners’ workouts—the stretch keeps me confident while lifting heavy.",
    image: "https://dfdx9u0psdezh.cloudfront.net/testimonials/2a424c3f32e78e318bdc2234.webp"
  }
];

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headerRef = useRef(null);
  const marqueeRef = useRef(null);

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

    // Marquee entrance
    tl.fromTo(
      marqueeRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: DURATION.slow,
        ease: EASE.power,
      },
      '-=0.2'
    );

    // Card hover effects
    const cards = sectionRef.current.querySelectorAll('.testimonial-card');
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.03,
          y: -8,
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
    });
  }, { scope: sectionRef });

  return (
    <Section background="dark" padding="large" sectionRef={sectionRef} className="bg-dark-900 text-white" containerClassName="w-full max-w-full">
      <div className="space-y-8 sm:space-y-10 md:space-y-12">

        {/* Badge */}
        <div ref={badgeRef} className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs sm:text-sm uppercase tracking-widest font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Voices
          </span>
        </div>

        {/* Header */}
        <div ref={headerRef}>
          <SectionHeader
            title="Proven By Athletes"
            subtitle="Real voices. Real results. Hear from those who train relentlessly and trust God Wear."
            align="center"
            titleClassName="text-white font-display text-2xl sm:text-3xl md:text-xl lg:text-2xl xl:text-3xl font-bold"
            subtitleClassName="text-dark-400 md:text-white/80 font-sans text-sm sm:text-base md:text-base"
          />
        </div>

        {/* Testimonials Marquee - Mobile: Single Column Horizontal Scroll */}
        <div ref={marqueeRef} className="relative overflow-hidden testimonial-mask">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[10%] sm:w-[15%] bg-gradient-to-r from-dark-900 via-dark-900/50 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[10%] sm:w-[15%] bg-gradient-to-l from-dark-900 via-dark-900/50 to-transparent z-10" />

          {/* First Row */}
          <div className="overflow-hidden mb-4 sm:mb-6">
            <div className="marquee-left gap-4 sm:gap-6 px-4 sm:px-6 py-4">
              {testimonials.concat(testimonials).map((item, index) => (
                <div key={`${item.name}-${index}`} className="testimonial-card bg-dark-800 border border-dark-700 rounded-xl sm:rounded-2xl md:rounded-2xl p-5 sm:p-6 md:p-8 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[32vw] shrink-0 hover:border-gold-500/30 transition-all duration-300 cursor-default">
                  {/* Header */}
                  <div className="flex items-center gap-3 sm:gap-4 pb-4 md:pb-5 mb-4 md:mb-5 border-b border-dark-700">
                    <div className="h-11 w-11 sm:h-12 sm:w-12 md:h-12 md:w-12 rounded-full overflow-hidden ring-2 ring-dark-700 shrink-0">
                      <img
                        className="h-full w-full object-cover"
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        src={item.image}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="sm:text-lg md:text-lg font-semibold md:font-bold text-white font-sans truncate">{item.name}</h3>
                      <p className="text-xs sm:text-sm md:text-sm text-dark-400 font-sans truncate">{item.role}</p>
                    </div>
                  </div>
                  {/* Quote */}
                  <p className="text-sm text-white/90 leading-relaxed font-sans line-clamp-4">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - Reverse Direction */}
          <div className="overflow-hidden">
            <div className="marquee-right gap-4 sm:gap-6 px-4 sm:px-6 py-4">
              {testimonials.concat(testimonials).map((item, index) => (
                <div key={`${item.role}-${index}`} className="bg-dark-800 border border-dark-700 rounded-xl sm:rounded-2xl md:rounded-2xl p-5 sm:p-6 md:p-8 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[32vw] shrink-0 hover:border-gold-500/30 transition-all duration-300">
                  <div className="flex items-center gap-3 sm:gap-4 pb-4 md:pb-5 mb-4 md:mb-5 border-b border-dark-700">
                    <div className="h-11 w-11 sm:h-12 sm:w-12 md:h-12 md:w-12 rounded-full overflow-hidden ring-2 ring-dark-700 shrink-0">
                      <img
                        className="h-full w-full object-cover"
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        src={item.image}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="sm:text-lg md:text-lg font-semibold md:font-bold text-white font-sans truncate">{item.name}</h3>
                      <p className="text-xs sm:text-sm md:text-sm text-dark-400 font-sans truncate">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/90 leading-relaxed font-sans line-clamp-4">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default TestimonialsSection;
