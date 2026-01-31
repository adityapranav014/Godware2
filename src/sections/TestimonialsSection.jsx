import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../components/layout/Section";
import SectionHeader from "../components/layout/SectionHeader";

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
  }
];

const TestimonialsSection = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%"
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <Section background="dark" padding="large" sectionRef={sectionRef} className="text-white" containerClassName="w-full max-w-full">
      <div className="space-y-10">
        <div className="flex justify-center">
          <span className="accent-pill uppercase tracking-[0.4em] text-white/70">
            Voices
            <span className="corner-dot corner-dot-tl" />
            <span className="corner-dot corner-dot-tr" />
            <span className="corner-dot corner-dot-bl" />
            <span className="corner-dot corner-dot-br" />
          </span>
        </div>
        <SectionHeader
          title="Athletes Speak"
          subtitle="Real feedback from daily riders who train with God Wear."
          align="center"
          titleClassName="text-white font-machina"
          subtitleClassName="text-white/70 font-manrope"
        />

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-ink to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-ink to-transparent" />

          <div className="overflow-hidden">
            <div className="marquee-left gap-6 px-6 py-4">
              {testimonials.concat(testimonials).map((item, index) => (
                <div key={`${item.name}-${index}`} className="testimonial-card w-[85vw] md:w-[45vw] lg:w-[30vw] p-6 shrink-0">
                  <div className="flex items-center gap-4 border-b border-white/20 pb-4 mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-white/10">
                      <img
                        className="h-full w-full object-cover"
                        alt={item.name}
                        loading="eager"
                        decoding="async"
                        src={item.image}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white font-manrope">{item.name}</h3>
                      <p className="text-sm text-white/50 font-manrope">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed font-manrope">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="marquee-right gap-6 px-6 py-4">
              {testimonials.concat(testimonials).map((item, index) => (
                <div key={`${item.role}-${index}`} className="testimonial-card w-[85vw] md:w-[45vw] lg:w-[30vw] p-6 shrink-0">
                  <div className="flex items-center gap-4 border-b border-white/20 pb-4 mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-white/10">
                      <img
                        className="h-full w-full object-cover"
                        alt={item.name}
                        loading="eager"
                        decoding="async"
                        src={item.image}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white font-manrope">{item.name}</h3>
                      <p className="text-sm text-white/50 font-manrope">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed font-manrope">{item.text}</p>
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
