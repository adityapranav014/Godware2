import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../components/layout/Section';
import { ContactForm, ContactInfo } from '../components/common';
import TextReveal from '../components/ui/TextReveal';
import { EASE, DURATION } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
    });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: DURATION.medium, ease: EASE.back }
    );

    // Pre-hide reach icon strokes before the panel fades in
    // (ContactInfo's ReachItem handles its own scroll-triggered draw
    //  — no icon animation code needed here)

    tl.fromTo(
      infoRef.current,
      { opacity: 0, x: -30, filter: 'blur(8px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: DURATION.slow, ease: EASE.power },
      '-=0.4'
    );

    tl.fromTo(
      formRef.current,
      { opacity: 0, x: 30, filter: 'blur(8px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: DURATION.slow, ease: EASE.power },
      '<'
    );

  }, { scope: sectionRef });

  return (
    <Section
      background="dark"
      padding="large"
      sectionRef={sectionRef}
      className="bg-dark-950 text-white noise-overlay relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-125 h-125 bg-gold-500/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 xl:px-0 space-y-12 sm:space-y-16">

        {/* Section header */}
        <div ref={badgeRef} className="flex flex-col gap-4">
          <span className="section-tag">Contact</span>
          <div className="section-header-row">
            <TextReveal
              as="h2"
              variant="stagger3D"
              splitBy="words"
              trigger="top 82%"
              stagger={0.06}
              duration={0.9}
              className="animated-gradient-text font-display text-section-lg font-bold leading-none uppercase"
            >
              Bulk &amp; Corporate Orders
            </TextReveal>
            <p className="section-body pb-1">
              Custom orders for teams, gyms, and corporates. Tell us what you need.
            </p>
          </div>
          <div className="accent-rule-long" />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 sm:gap-14 lg:gap-20 items-start">

          {/* Left — contact info */}
          <div ref={infoRef}>
            <ContactInfo />
          </div>

          {/* Vertical divider */}
          <div className="hidden lg:block absolute left-[40%] top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,139,58,0.15) 20%, rgba(201,139,58,0.15) 80%, transparent)' }}
          />

          {/* Right — form */}
          <div ref={formRef}>
            <ContactForm />
          </div>

        </div>
      </div>
    </Section>
  );
};

export default Contact;
