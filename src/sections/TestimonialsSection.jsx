import { useRef, useEffect } from "react";
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
    text: "The fit and durability are unreal. After heavy sessions, the compression tee still holds its shape perfectly.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Vikram Singh",
    role: "CrossFit Athlete",
    text: "Finally, a compression shirt that handles high-intensity intervals without riding up or losing tension.",
    image: "https://randomuser.me/api/portraits/men/44.jpg"
  },
  {
    name: "Rohan Gupta",
    role: "Marathon Runner",
    text: "Breathable and light. The compression reduces muscle fatigue significantly during my long training blocks.",
    image: "https://randomuser.me/api/portraits/men/68.jpg"
  },
  {
    name: "Arjun Malik",
    role: "Bodybuilder",
    text: "The stitching and cut are premium. This compression gear makes my physique look sharp in and out of the gym.",
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    name: "Karan Mehta",
    role: "Functional Athlete",
    text: "This compression T-shirt locks my torso in place without restricting movement—ideal for stabilizing heavy lifts.",
    image: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    name: "Aditya Roy",
    role: "Fast Bowler (Cricket)",
    text: "Bowling long spells in heat demands sweat control. This gear keeps my shoulders loose and recovery fast.",
    image: "https://randomuser.me/api/portraits/men/15.jpg"
  },
  {
    name: "Aniket Rao",
    role: "Triathlete",
    text: "The moisture-wicking on this compression top is top-tier. Keeps me dry and supported mile after mile.",
    image: "https://randomuser.me/api/portraits/men/11.jpg"
  },
  {
    name: "Kunal Pandya",
    role: "Batsman (Cricket)",
    text: "Running between wickets feels effortless. The shirt moves with my body during drives and pulls.",
    image: "https://randomuser.me/api/portraits/men/33.jpg"
  },
  {
    name: "Devansh Patel",
    role: "HIIT Specialist",
    text: "Hugs the right places so my form stays locked during plyometric drills. Best compression layer I've owned.",
    image: "https://randomuser.me/api/portraits/men/76.jpg"
  },
  {
    name: "Ishaan Kishan",
    role: "Football Winger",
    text: "Under my jersey, this base layer is essential. Keeps my core engaged during sprints and tackles.",
    image: "https://randomuser.me/api/portraits/men/41.jpg"
  },
  {
    name: "Nikhil Kapoor",
    role: "Circuit Racer",
    text: "I wear this under my race suit. The compressive feel keeps my muscles warm and responsive on track days.",
    image: "https://randomuser.me/api/portraits/men/54.jpg"
  },
  {
    name: "Sandeep Narwal",
    role: "Kabaddi Defender",
    text: "Grip and durability are key. This fabric survives the mat burns and holds me tight during raids.",
    image: "https://randomuser.me/api/portraits/men/62.jpg"
  },
  {
    name: "Samar Verma",
    role: "Weightlifting Coach",
    text: "My clients ask about this gear constantly. It stays locked in for every snatch and provides excellent core support.",
    image: "https://randomuser.me/api/portraits/men/88.jpg"
  },
  {
    name: "Rohan Bopanna",
    role: "Tennis Player",
    text: "Serve motion feels unrestricted. The compression helps with arm fatigue deep in the third set.",
    image: "https://randomuser.me/api/portraits/men/36.jpg"
  },
  {
    name: "Aryan Desai",
    role: "Fitness Model",
    text: "Perfect for shoots. It never creases, and the compression accentuates muscle definition like nothing else.",
    image: "https://randomuser.me/api/portraits/men/29.jpg"
  },
  {
    name: "Vijender Singh",
    role: "Pro Boxer",
    text: "Sparring puts gear to the test. This shirt stays intact and protects my skin during clinches.",
    image: "https://randomuser.me/api/portraits/men/58.jpg"
  },
  {
    name: "Himanshu Dixit",
    role: "Trail Runner",
    text: "Heat and humidity are no match; the tee moves with me while supporting my midsection on uneven terrain.",
    image: "https://randomuser.me/api/portraits/men/66.jpg"
  },
  {
    name: "Neeraj Chopra",
    role: "Javelin Thrower",
    text: "Explosive power needs stability. This compression top supports my rotation perfectly during throws.",
    image: "https://randomuser.me/api/portraits/men/71.jpg"
  },
  {
    name: "Kabir Seth",
    role: "Powerlifter",
    text: "Compression panels feel like a second skin. The tightness gives me that extra confidence under the heavy bar.",
    image: "https://randomuser.me/api/portraits/men/90.jpg"
  },
  {
    name: "Sushil Kumar",
    role: "Wrestler",
    text: "Grappling requires freedom of movement. This shirt shows off the gains and supports the grind.",
    image: "https://randomuser.me/api/portraits/men/14.jpg"
  },
  {
    name: "Manish Pandey",
    role: "Cyclist",
    text: "Aerodynamics matter. This fits perfectly under my kit and wicks sweat on long rides.",
    image: "https://randomuser.me/api/portraits/men/25.jpg"
  }
];

const useInfiniteScroll = (ref, speed = 1) => {
  const animationRef = useRef(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const scroll = () => {
      if (!isPaused.current) {
        if (element.scrollLeft >= element.scrollWidth / 2) {
          element.scrollLeft = 0;
        } else {
          element.scrollLeft += speed;
        }
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    const pause = () => { isPaused.current = true; };
    const resume = () => { isPaused.current = false; };

    element.addEventListener('mouseenter', pause);
    element.addEventListener('mouseleave', resume);
    element.addEventListener('touchstart', pause, { passive: true });
    element.addEventListener('touchend', resume, { passive: true });

    return () => {
      cancelAnimationFrame(animationRef.current);
      element.removeEventListener('mouseenter', pause);
      element.removeEventListener('mouseleave', resume);
      element.removeEventListener('touchstart', pause);
      element.removeEventListener('touchend', resume);
    };
  }, [ref, speed]);
};

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headerRef = useRef(null);
  const marqueeRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

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

    // Marquee entrance (container fade in)
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
  }, { scope: sectionRef });

  useInfiniteScroll(row1Ref, 0.8);
  useInfiniteScroll(row2Ref, 0.9);

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

        {/* Testimonials - Auto Scroll + Manual Swipe */}
        <div ref={marqueeRef} className="relative overflow-hidden testimonial-mask">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[5%] sm:w-[10%] bg-gradient-to-r from-dark-900 via-dark-900/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[5%] sm:w-[10%] bg-gradient-to-l from-dark-900 via-dark-900/80 to-transparent z-10" />

          {/* First Row */}
          <div className="mb-4 sm:mb-6">
            <div
              ref={row1Ref}
              className="flex gap-4 sm:gap-6 px-4 pb-4 overflow-x-auto scrollbar-hide touch-pan-x"
            >
              {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((item, index) => (
                <div key={`${item.name}-${index}`} className="flex-shrink-0 bg-dark-800 border border-dark-700 rounded-xl sm:rounded-2xl md:rounded-2xl p-5 sm:p-6 md:p-8 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[32vw] hover:border-gold-500/30 transition-all duration-300 select-none testimonial-card">
                  {/* Header */}
                  <div className="flex items-center gap-3 sm:gap-4 pb-4 md:pb-5 mb-4 md:mb-5 border-b border-dark-700">
                    <div className="h-11 w-11 sm:h-12 sm:w-12 md:h-12 md:w-12 rounded-full overflow-hidden ring-2 ring-dark-700 shrink-0">
                      <img
                        className="h-full w-full object-cover"
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        src={item.image}
                        draggable="false"
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

          {/* Second Row */}
          <div>
            <div
              ref={row2Ref}
              className="flex gap-4 sm:gap-6 px-4 pb-4 overflow-x-auto scrollbar-hide touch-pan-x"
            >
              {[...testimonials].reverse().concat([...testimonials].reverse(), [...testimonials].reverse(), [...testimonials].reverse()).map((item, index) => (
                <div key={`${item.role}-${index}`} className="flex-shrink-0 bg-dark-800 border border-dark-700 rounded-xl sm:rounded-2xl md:rounded-2xl p-5 sm:p-6 md:p-8 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[32vw] hover:border-gold-500/30 transition-all duration-300 select-none">
                  <div className="flex items-center gap-3 sm:gap-4 pb-4 md:pb-5 mb-4 md:mb-5 border-b border-dark-700">
                    <div className="h-11 w-11 sm:h-12 sm:w-12 md:h-12 md:w-12 rounded-full overflow-hidden ring-2 ring-dark-700 shrink-0">
                      <img
                        className="h-full w-full object-cover"
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        src={item.image}
                        draggable="false"
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
