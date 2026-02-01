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
          subtitle="Tested praise from dedicated athletes who trust God Wear compression tees every day."
          align="center"
          titleClassName="text-white font-machina"
          subtitleClassName="text-white/70 font-manrope"
        />

        <div
          className="relative overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)"
          }}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-ink via-transparent to-transparent opacity-80 blur-[30px]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[22%] bg-gradient-to-l from-ink via-transparent to-transparent opacity-80 blur-[30px]" />

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
