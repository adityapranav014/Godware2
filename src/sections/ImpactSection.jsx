import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Section from "../components/layout/Section";
import SectionHeader from "../components/layout/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const impactItems = [
  {
    title: "Campus Takeover",
    copy: "Workshops that flood your gym with performance-driven momentum.",
    image: `${import.meta.env.BASE_URL}images/hero-1.webp`,
    tag: "Featured"
  },
  {
    title: "Elite Recovery",
    copy: "Recovery kits designed with pro athletes for consistent regeneration.",
    image: `${import.meta.env.BASE_URL}images/hero-2.webp`,
    tag: "Recovery"
  },
  {
    title: "Meet & Train",
    copy: "Immersive sessions with athletes who train beyond limits.",
    image: `${import.meta.env.BASE_URL}images/hero-3.webp`,
    tag: "Sessions"
  },
  {
    title: "Performance Drop",
    copy: "Limited drops engineered for uncompromising output.",
    image: `${import.meta.env.BASE_URL}images/hero-2.webp`,
    tag: "Drop"
  }
];

const ImpactSection = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
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
            Impact
            <span className="corner-dot corner-dot-tl" />
            <span className="corner-dot corner-dot-tr" />
            <span className="corner-dot corner-dot-bl" />
            <span className="corner-dot corner-dot-br" />
          </span>
        </div>
        <SectionHeader
          title="Built for Peak Output"
          subtitle="Training, recovery, and gear engineered to scale with your ambition."
          align="center"
          titleClassName="text-white font-machina"
          subtitleClassName="text-white/70 font-manrope"
        />

        <div className="overflow-x-auto overflow-y-clip">
          <div className="flex gap-6 px-2 md:px-6 snap-x snap-mandatory">
            <div className="w-14 shrink-0 hidden md:block" />
            {impactItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => (cardRefs.current[index] = el)}
                className="impact-card group relative snap-center shrink-0 w-[85%] sm:w-[60%] lg:w-[32%] aspect-[7/9] rounded-3xl overflow-hidden border border-white/20 bg-white/5 shadow-[0_25px_80px_rgba(0,0,0,0.55)]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/70 transition-all duration-500 opacity-0 group-hover:opacity-100" />

                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-all duration-500">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-[#FF6900] to-[#F54900] text-black px-4 py-1 text-xs uppercase tracking-[0.3em] font-semibold mb-3 font-manrope">
                    {item.tag}
                  </span>
                  <h3 className="text-3xl impact uppercase font-machina">{item.title}</h3>
                  <p className="text-white/90 mt-2 text-sm leading-relaxed font-manrope">{item.copy}</p>
                </div>

                <div className="absolute top-4 right-4 bg-ink/80 border border-white/30 rounded-full p-3 transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="text-white" />
                </div>
              </div>
            ))}
            <div className="w-14 shrink-0 hidden md:block" />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ImpactSection;
