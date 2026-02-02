import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CircleCheck, CircleX } from "lucide-react";
import Section from "../components/layout/Section";
import SectionHeader from "../components/layout/SectionHeader";

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
  const leftItemsRef = useRef([]);
  const rightItemsRef = useRef([]);

  useGSAP(() => {
    const leftItems = leftItemsRef.current.filter(Boolean);
    const rightItems = rightItemsRef.current.filter(Boolean);

    gsap.fromTo(
      leftItems,
      { y: 18, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%"
        }
      }
    );

    gsap.fromTo(
      rightItems,
      { y: 18, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%"
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <Section background="dark" padding="large" sectionRef={sectionRef} className="text-white">
      <div className="space-y-10">
        <div className="flex justify-center">
          <span className="accent-pill uppercase tracking-[0.4em] text-white/70">
            Built Different
            <span className="corner-dot corner-dot-tl" />
            <span className="corner-dot corner-dot-tr" />
            <span className="corner-dot corner-dot-bl" />
            <span className="corner-dot corner-dot-br" />
          </span>
        </div>
        <SectionHeader
          title="Why God Wear"
          subtitle="Because performance demands more than ordinary it demands precision, power, and purpose."
          align="center"
          titleClassName="text-white font-machina"
          subtitleClassName="text-white/70 font-manrope"
        />

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#050505]/80 to-[#0a0a0a]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="impact text-3xl uppercase text-gold font-machina">God Wear</span>
            </div>
            <div className="space-y-5">
              {godWearPoints.map((item, index) => (
                <div key={item}>
                  <div
                    ref={(el) => (leftItemsRef.current[index] = el)}
                    className="flex items-start gap-3 font-manrope"
                  >
                    <CircleCheck className="text-[#38d16a] mt-1" />
                    <p className="text-lg text-white/85">{item}</p>
                  </div>
                  {index !== godWearPoints.length - 1 && (
                    <div className="radial-divider my-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/80 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="impact text-3xl uppercase text-white/80 font-machina">Others</span>
            </div>
            <div className="space-y-5">
              {othersPoints.map((item, index) => (
                <div key={item}>
                  <div
                    ref={(el) => (rightItemsRef.current[index] = el)}
                    className="flex items-start gap-3 font-manrope"
                  >
                    <CircleX className="text-accent mt-1" />
                    <p className="text-lg text-white/70">{item}</p>
                  </div>
                  {index !== othersPoints.length - 1 && (
                    <div className="radial-divider my-4" />
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
