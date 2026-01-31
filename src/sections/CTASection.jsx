import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../components/layout/Section";

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
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
      className="relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/hero-3.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div className="absolute inset-0 bg-ink/80" />
      <div className="relative max-w-6xl mx-auto px-4 xl:px-0 text-center space-y-6">
        <div className="flex justify-center">
          <span className="accent-pill text-white/80 uppercase tracking-[0.4em]">
            Studio Accent
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl impact uppercase font-machina">
          Transform Your Training Journey
        </h2>
        <div className="inline-flex justify-center">
          <span className="accent-pill">
            God Wear
            <span className="corner-dot corner-dot-tl" />
            <span className="corner-dot corner-dot-tr" />
            <span className="corner-dot corner-dot-bl" />
            <span className="corner-dot corner-dot-br" />
          </span>
        </div>
        <p className="text-white/70 text-lg max-w-2xl mx-auto font-manrope">
          Build your edge with gear engineered for athletes who refuse average.
        </p>
        <button className="cta-gradient text-white px-10 py-3 sm:py-4 rounded-2xl text-xl font-semibold font-manrope outline-none">
          <div className="hover-swap">
            <span>Explore the Drop →</span>
            <span>Explore the Drop →</span>
          </div>
        </button>
      </div>
    </Section>
  );
};

export default CTASection;
