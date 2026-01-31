import { ArrowDown, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const targetAudiences = [
  "Gym Enthusiasts",
  "Bodybuilders",
  "Athletes",
  "Crossfit",
  "Cricket",
  "Cycling",
  "Running",
  "Football",
];

const HeroSection = ({ onShopClick, onAboutClick }) => {
  const sectionRef = useRef(null);
  const taglineRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const exploreButtonRef = useRef(null);
  const bottomButtonsRef = useRef([]);
  const floatRef = useRef([]);
  const audienceRef = useRef(null);
  const [audienceIndex, setAudienceIndex] = useState(0);
  const madeForRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
        },
        (context) => {
          const masterTL = gsap.timeline({ defaults: { ease: "power3.out" } });

          if (taglineRef.current) {
            gsap.set(taglineRef.current, { y: 20, opacity: 0 });
            masterTL.fromTo(
              taglineRef.current,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.4 },
              0.2
            );
          }

          if (headingRef.current) {
            const split = new SplitType(headingRef.current, {
              types: "words,chars",
              tagName: "span",
            });
            gsap.set(headingRef.current, { perspective: 1000 });
            split.chars.forEach(
              (char) => (char.style.fontFamily = "impact01, sans-serif")
            );
            masterTL.fromTo(
              split.chars,
              { y: 70, opacity: 0, rotationX: -90 },
              {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 0.8,
                stagger: { amount: 0.4, from: "start" },
              },
              0.8
            );
          }

          masterTL.fromTo(
            descriptionRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 0.9, duration: 0.5 },
            2.2
          );

          if (madeForRef.current) {
            gsap.set(madeForRef.current, { y: 30, opacity: 0 });
            masterTL.fromTo(
              madeForRef.current,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
              2.7
            );
          }

          masterTL.fromTo(
            bottomButtonsRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 },
            3.2
          );

          if (exploreButtonRef.current) {
            masterTL.fromTo(
              exploreButtonRef.current,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5 },
              3.6
            );
          }

          const floats = floatRef.current.filter(Boolean);
          if (floats.length) {
            gsap.set(floats, { y: 20, opacity: 0 });
            masterTL.fromTo(
              floats,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, stagger: 0.2 },
              3.4
            );
          }
        }
      );
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (!audienceRef.current) return;
      gsap.to(audienceRef.current, {
        scaleX: 0,
        opacity: 0,
        duration: 0.45,
        ease: "power3.in",
        transformOrigin: "center center",
        onComplete: () => {
          setAudienceIndex((prevIndex) => (prevIndex + 1) % targetAudiences.length);
        }
      });
    }, 3200);
    return () => {
      clearInterval(interval);
      gsap.killTweensOf(audienceRef.current);
    };
  }, []);

  useEffect(() => {
    if (!audienceRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        audienceRef.current,
        { scaleX: 0, opacity: 0, filter: "blur(1px)" },
        {
          scaleX: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.65,
          ease: "power3.out",
          transformOrigin: "center center"
        }
      );
    }, audienceRef);
    return () => {
      ctx.revert();
      gsap.killTweensOf(audienceRef.current);
    };
  }, [audienceIndex]);

  return (
    <div className="bg-ink text-white min-h-[100dvh] overflow-hidden">
      <section
        ref={sectionRef}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12 md:py-16 flex flex-col items-center justify-center min-h-[100dvh] gap-8"
      >
        <h4
          ref={taglineRef}
          className="uppercase text-accent md:text-2xl text-center font-manrope tracking-[0.5em]"
        >
          GODWEAR: Built for relentless sessions
        </h4>
        <div className="flex flex-col items-center justify-center gap-10 w-full">
          <div className="flex flex-col items-center justify-center gap-6 w-full">
            <div className="font-machina text-[2.7rem] md:text-[5rem] lg:text-[4.7rem] tracking-tight md:leading-[5rem] text-center">
              <h1 ref={headingRef} className="capitalize">
                Gear up with
                <span className="relative mx-2 inline-flex items-center">
                  <span className="relative z-10 px-2 font-machina pt-[0.05rem] text-white/90 bg-[#E8602E21] border border-[#E8602E]">
                    GODWEAR
                    <span className="absolute -left-2 -top-2 h-1 w-1 bg-white" />
                    <span className="absolute -right-2 -top-2 h-1 w-1 bg-white" />
                    <span className="absolute -left-2 -bottom-2 h-1 w-1 bg-white" />
                    <span className="absolute -right-2 -bottom-2 h-1 w-1 bg-white" />
                  </span>
                </span>
                engineered athlete wear.
              </h1>
            </div>
            <p
              ref={descriptionRef}
              className="text-lg md:text-[1.8rem] text-center font-manrope text-white/70 w-full lg:w-[70%]"
            >
              Intelligent dry-fit wicks sweat, graduated compression speeds
              recovery, antimicrobial mesh keeps it fresh, and flat-lock seams
              stay smooth under every grind.
            </p>
            <div ref={madeForRef} className="text-center space-y-3">
              <p className="text-[0.6rem] md:text-[0.68rem] uppercase tracking-[0.6em] text-white/50">
                MADE FOR
              </p>
              <span
                ref={audienceRef}
                key={audienceIndex}
                aria-live="polite"
                className="accent-pill relative inline-flex items-center gap-2 rounded-full bg-[#0c0c0f] border border-white/15 px-6 py-3 text-[0.7rem] md:text-[0.78rem] tracking-[0.4em] font-semibold uppercase text-white/70 shadow-[0_12px_30px_rgba(0,0,0,0.45)] transition-all duration-700 ease-out"
              >
                {targetAudiences[audienceIndex]}
                <span className="corner-dot corner-dot-tl absolute -left-3 -top-2 h-2 w-2 rounded-full bg-white" />
                <span className="corner-dot corner-dot-tr absolute -right-3 -top-2 h-2 w-2 rounded-full bg-white" />
                <span className="corner-dot corner-dot-bl absolute -left-3 -bottom-2 h-2 w-2 rounded-full bg-white" />
                <span className="corner-dot corner-dot-br absolute -right-3 -bottom-2 h-2 w-2 rounded-full bg-white" />
              </span>
            </div>
            <div className="flex justify-center w-full">
              <button
                ref={exploreButtonRef}
                onClick={onShopClick}
                className="cta-gradient group text-white text-xl py-3 px-10 rounded-2xl border border-transparent backdrop-blur-md shadow-[0_15px_40px_rgba(255,202,6,0.35)] transition duration-300 hover:-translate-y-0.5"
              >
                <div className="relative overflow-hidden w-max flex gap-1 font-manrope font-medium">
                  <div className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    Shop Now <span>→</span>
                  </div>
                  <div className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                    Shop Now <span>→</span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <div className="w-full lg:w-[90%] border border-white/20 bg-black/50 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.55)] backdrop-blur-[20px] relative overflow-hidden">
              <video
                className="w-full rounded-2xl object-cover min-h-[30vh] lg:min-h-[38vh]"
                src="https://videos.pexels.com/video-files/4945154/4945154-uhd_2732_1440_24fps.mp4"
                autoPlay
                loop
                playsInline
                muted
                preload="auto"
              />
              {[
                {
                  text: "Build your career",
                  img: "https://dfdx9u0psdezh.cloudfront.net/home/hero/e610ce8beaa7a2b72c73dd68.webp",
                  top: "20%",
                  right: "-2rem",
                },
                {
                  text: "We understand you",
                  img: "https://dfdx9u0psdezh.cloudfront.net/home/hero/57b6a3ee65a9c27fc2ee29c6.webp",
                  top: "55%",
                  right: "-3rem",
                },
              ].map((item, index) => (
                <div
                  key={item.text}
                  ref={(el) => (floatRef.current[index] = el)}
                  className="absolute flex flex-col items-center justify-center gap-1 rounded-tr-3xl rounded-bl-3xl border border-white/20 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white"
                  style={{
                    top: item.top,
                    right: item.right,
                    animation: "float 3s ease-in-out infinite",
                  }}
                >
                  <img
                    className="h-28 w-28 rounded-2xl object-cover"
                    src={item.img}
                    alt={item.text}
                    loading="lazy"
                  />
                  <span className="text-xs uppercase tracking-[0.4em] text-white/80">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
