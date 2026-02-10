import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Scaling,
  Thermometer,
  Trophy,
  ShieldCheck,
  Users,
  Zap,
  Dumbbell
} from "lucide-react";
import Section from "../components/layout/Section";
import SectionHeader from "../components/layout/SectionHeader";
import Badge from "../components/ui/Badge";
import { EASE, DURATION, STAGGER } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

const featurePoints = [
  {
    title: "Engineered Fit",
    description: "Compression grade structure that adapts to your body's movement.",
    icon: Scaling,
    colSpan: "md:col-span-2",
  },
  {
    title: "Thermal Control",
    description: "Premium fabric blends optimize heat and sweat regulation.",
    icon: Thermometer,
    colSpan: "md:col-span-1",
  },
  {
    title: "Elite Durability",
    description: "Reinforced stitching designed for heavy training cycles.",
    icon: ShieldCheck,
    colSpan: "md:col-span-1",
  },
  {
    title: "Athlete Tested",
    description: "Patterns refined by pro athletes for peak performance.",
    icon: Trophy,
    colSpan: "md:col-span-2",
  },
  {
    title: "Performance Community",
    description: "Join a network of athletes dedicated to pushing limits.",
    icon: Users,
    colSpan: "md:col-span-1",
  },
  {
    title: "Impact Resistant",
    description: "Materials built to withstand high-intensity friction.",
    icon: Dumbbell,
    colSpan: "md:col-span-1",
  },
  {
    title: "Reactive Power",
    description: "Fabric that snaps back, enhancing your natural power output.",
    icon: Zap,
    colSpan: "md:col-span-1",
  }
];

const FeatureCard = ({ feature, index }) => {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${feature.colSpan} group relative overflow-hidden rounded-3xl p-8 depth-card`}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(201, 139, 58, 0.15), transparent 40%)`,
        }}
      />

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 flex flex-col h-full justify-between gap-6 pointer-events-none">

        {/* Icon Container */}
        <div className="relative w-14 h-14 rounded-2xl bg-dark-750 border border-dark-600 flex items-center justify-center group-hover:border-gold-500/30 group-hover:bg-gold-500/10 transition-colors duration-500"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.4)' }}>
          <feature.icon className="w-6 h-6 text-white group-hover:text-gold-500 transition-colors duration-500" strokeWidth={1.5} />
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3 tracking-tight group-hover:text-gold-500 transition-colors duration-300">
            {feature.title}
          </h3>
          <p className="text-white/60 leading-relaxed font-sans text-sm font-light tracking-wide">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
};


const ComparisonSection = () => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

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
      { y: 40, opacity: 0, filter: 'blur(10px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: DURATION.medium,
        ease: EASE.power,
      },
      '-=0.3'
    );

    // Grid Staggered Reveal
    if (gridRef.current) {
      tl.fromTo(
        gridRef.current.children,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: DURATION.slow,
          stagger: {
            amount: 0.6,
            grid: "auto",
            from: "start"
          },
          ease: EASE.expo,
        },
        '-=0.4'
      );
    }

  }, { scope: sectionRef });

  return (
    <Section background="dark" padding="large" sectionRef={sectionRef} className="relative bg-dark-950 text-white overflow-hidden noise-overlay section-gradient-warm">

      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 space-y-12 sm:space-y-16">

        {/* Badge */}
        <div ref={badgeRef}>
          <Badge>God Tier Engineering</Badge>
        </div>

        {/* Section Header */}
        <div ref={headerRef}>
          <SectionHeader
            title="Why God Wear"
            subtitle="Precision-engineered gear for those who refuse to settle for ordinary."
            align="center"
            titleClassName="animated-gradient-text font-display text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight"
            subtitleClassName="text-dark-400 md:text-white/60 max-w-xl font-sans mx-auto font-light leading-relaxed text-sm sm:text-base"
          />
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-7xl mx-auto">
          {featurePoints.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

      </div>
    </Section>
  );
};

export default ComparisonSection;
