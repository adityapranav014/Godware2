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
        <h2 className="text-4xl sm:text-5xl lg:text-6xl impact uppercase font-machina">
          Ignite Your Potential. Revolutionize Every Workout
        </h2>

        <p className="text-white/70 text-lg max-w-2xl mx-auto font-manrope">
          Elevate with precision-engineered gear to crush barriers and dominate. Elite athletes trust it for faster gains and zero compromises. Transform now – shop and claim your edge.
        </p>
        <button
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
    </Section>
  );
};

export default CTASection;
