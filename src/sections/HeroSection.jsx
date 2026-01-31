import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);


const HeroSection = ({ onShopClick, onAboutClick }) => {
  const sectionRef = useRef(null);
  const taglineRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const exploreButtonRef = useRef(null);
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


          if (exploreButtonRef.current) {
            masterTL.fromTo(
              exploreButtonRef.current,
              { opacity: 0 },
              { opacity: 1, duration: 0.5 },
              3.6
            );
          }

        }
      );
      return () => mm.revert();
    },
    { scope: sectionRef }
  );



  return (
    <div className="bg-ink text-white min-h-[100dvh] overflow-hidden relative">
      <section
        ref={sectionRef}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-12 md:pb-16 flex flex-col items-center justify-center min-h-[100dvh] gap-8 m-40"
        containerClassName="w-full max-w-full"
      >
        <h4
          ref={taglineRef}
          className="uppercase text-accent md:text-2xl text-center mb-2"
        >
          Second layer of skin
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
              Premium fitness and lifestyle brand for those who train with discipline and live with confidence, built with powerful compression, bold design, and lasting comfort.
            </p>

            <div className="flex justify-center w-full mt-4">
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

          <div className="flex flex-col items-center justify-center gap-4 w-full mt-52">
            <div className="w-full border border-white/20 bg-black/50 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.55)] backdrop-blur-[20px] relative overflow-hidden">
              <video
                className="w-full rounded-2xl object-cover min-h-[30vh] lg:min-h-[38vh]"
                src="https://videos.pexels.com/video-files/4945154/4945154-uhd_2732_1440_24fps.mp4"
                autoPlay
                loop
                playsInline
                muted
                preload="auto"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="absolute w-full -top-40 left-0 overflow-hidden">
        <img
          className="block md:hidden
    brightness-75 saturate-125 contrast-110
    scale-150
    h-[80vh] sm:h-[90vh] md:h-[165vh]
    object-center
  "
          alt="bg mobile"
          fetchpriority="high"
          src="https://dfdx9u0psdezh.cloudfront.net/common/Background_mobile.svg"
        />

        <img
          className="
    hidden md:block
    brightness-80 saturate-120 contrast-110
    scale-110
    h-[165vh]
    object-cover
    object-[60%_60%]
  "
          alt="bg desktop"
          fetchpriority="high"
          src="https://dfdx9u0psdezh.cloudfront.net/common/Background.svg"
        />

      </div>
    </div>
  );
};

export default HeroSection;
