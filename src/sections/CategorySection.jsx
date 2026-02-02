import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Activity, Droplets, ShieldCheck } from "lucide-react";
import Section from "../components/layout/Section";
import SectionHeader from "../components/layout/SectionHeader";
import { productData } from "../assets/data";
import { Video } from '@imagekit/react';


gsap.registerPlugin(ScrollTrigger);

const featureHighlights = [
  {
    title: "Breathable Mesh",
    copy: "Airflow panels keep your core temperature balanced during every rep.",
    icon: Activity,
    accent: "from-[#22d3ee] to-[#0b3d5b]"
  },
  {
    title: "Compression Support",
    copy: "Precision cuts lock you in so fatigue stays low and focus stays high.",
    icon: ShieldCheck,
    accent: "from-[#f97316] to-[#7c2d12]"
  },
  {
    title: "Sweat-Ready Fabric",
    copy: "Quick-dry yarns stay light, breathable, and odor-free even after brutal sessions.",
    icon: Droplets,
    accent: "from-[#e8602e] to-[#311f0d]"
  }
];

const CategorySection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const featuresRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      headerRef.current,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%"
        }
      }
    );

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".product-card");
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%"
          }
        }
      );
    }

    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 85%"
          }
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <Section background="dark" padding="large" className="text-white" sectionRef={sectionRef}>
      <div className="space-y-12">
        <div className="flex justify-center">
          <span className="accent-pill uppercase tracking-[0.4em] text-white/70">
            Shop
            <span className="corner-dot corner-dot-tl" />
            <span className="corner-dot corner-dot-tr" />
            <span className="corner-dot corner-dot-bl" />
            <span className="corner-dot corner-dot-br" />
          </span>
        </div>
        <div ref={headerRef}>
          <SectionHeader
            title="Compression T-Shirts"
            subtitle="Engineered for athletes who train with intent—sculpted fit, steady support, and fearless style."
            align="center"
            titleClassName="text-white font-machina"
            subtitleClassName="text-white/70 font-manrope"
          />
        </div>

        <div ref={gridRef} className="grid gap-8 md:grid-cols-2">
          {productData.map((product, index) => (
            <a
              key={`${product.description}-${index}`}
              href={product.flipkartLink}
              target="_blank"
              rel="noopener noreferrer"
              className="product-card group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-slate-950/80 to-black shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_35px_80px_rgba(0,0,0,0.7)]"
            >
              <div className="absolute inset-0">
                <div
                  className={`absolute inset-0  bg-cover bg-top transition duration-700`}>
                  <Video
                    urlEndpoint="https://ik.imagekit.io/fr3yiiin6"
                    src={product.bgUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black/90" />
              </div>
              <div className="relative z-10 flex min-h-[680px] flex-col gap-6 p-6">
                <div className="mt-auto space-y-4">
                  <div className="flex flex-wrap items-end gap-3">
                    <span className="text-3xl font-semibold text-gold">
                      {product.priceAfterDiscount}
                    </span>
                    <span className="text-sm line-through text-white/60">{product.price}</span>
                    <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">
                      {product.discount}
                    </span>
                  </div>
                  <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/50">
                    Buy from Flipkart
                  </p>
                  <div className="w-full border-t border-white/10 pt-3">
                    <span className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] font-semibold text-white transition duration-300 group-hover:border-gold group-hover:bg-gold/90 group-hover:text-slate-950">
                      View product
                      <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div ref={featuresRef} className="grid gap-6 lg:grid-cols-3">
          {featureHighlights.map((feature) => (
            <div
              key={feature.title}
              className="testimonial-card rounded-3xl not-even:h-full lg:col-span-1 p-6 sm:p-8 "
            >
              <div className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-r ${feature.accent} p-3`}>
                <feature.icon size={22} aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white font-manrope">
                {feature.title}
              </h3>
              <p className="mt-3 text-white/80 text-lg leading-relaxed font-manrope">
                {feature.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default CategorySection;
