import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../components/layout/Section';
import SectionHeader from '../components/layout/SectionHeader';
import { ContactForm, ContactInfo } from '../components/common';
import { Sparkles } from 'lucide-react';
import Badge from '../components/ui/Badge';
import { EASE, DURATION, STAGGER } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headerRef = useRef(null);
  const containerRef = useRef(null);

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
      { y: 40, opacity: 0, filter: 'blur(8px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: DURATION.medium,
        ease: EASE.power,
      },
      '-=0.3'
    );

    // Container entrance
    tl.fromTo(
      containerRef.current,
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: DURATION.slow,
        ease: EASE.power,
      },
      '-=0.2'
    );

    // Stagger inner elements
    const innerCards = containerRef.current.querySelectorAll('.contact-card');
    if (innerCards.length > 0) {
      tl.fromTo(
        innerCards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DURATION.medium,
          stagger: STAGGER.normal,
          ease: EASE.power,
        },
        '-=0.5'
      );
    }
  }, { scope: sectionRef });

  return (
    <Section background="dark" padding="large" sectionRef={sectionRef} className="bg-dark-950 text-white noise-overlay">
      <div className="relative mx-auto max-w-5xl space-y-8 sm:space-y-10 px-4 sm:px-6">

        {/* Badge */}
        <div ref={badgeRef}>
          <Badge>Contact</Badge>
        </div>

        {/* Header */}
        <div ref={headerRef}>
          <SectionHeader
            title="Bulk & Corporate Orders"
            subtitle="Send us your requirements for custom and on demand orders."
            align="center"
            titleClassName="animated-gradient-text font-display text-2xl sm:text-3xl md:text-xl lg:text-2xl xl:text-3xl font-bold"
            subtitleClassName="text-dark-400 md:text-white/60 font-sans text-sm sm:text-base md:text-base"
          />
        </div>

        {/* Contact Container — Layer 1 (Base level, darkest) */}
        <div
          ref={containerRef}
          className="relative rounded-2xl sm:rounded-3xl p-1.5 sm:p-2"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.01))',
          }}
        >
          {/* Inner container — Layer 2 (slightly elevated) */}
          <div
            className="relative rounded-[14px] sm:rounded-[22px] p-5 sm:p-6 md:p-8 lg:p-10"
            style={{
              background: 'linear-gradient(180deg, #1a1a1f 0%, #141418 100%)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.5), 0 12px 48px rgba(0,0,0,0.3)',
            }}
          >
            <div className="space-y-5 sm:space-y-6 md:space-y-8">

              {/* Header Card — Layer 3 (elevated) */}
              <div
                className="contact-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8"
                style={{
                  background: 'linear-gradient(180deg, #1e1e24 0%, #18181d 100%)',
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                  borderLeft: '1px solid rgba(255,255,255,0.04)',
                  borderRight: '1px solid rgba(255,255,255,0.04)',
                  borderBottom: '1px solid rgba(0,0,0,0.3)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 2px 8px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2)',
                }}
              >
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-display text-white tracking-tight">Start the Conversation</h3>
                  <p className="text-sm text-dark-400 font-sans mt-1">We&apos;d love to hear about how we can assist you today.</p>
                </div>
                <div
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm text-gold-500 font-medium"
                  style={{
                    background: 'linear-gradient(180deg, rgba(201,139,58,0.15) 0%, rgba(201,139,58,0.05) 100%)',
                    border: '1px solid rgba(201,139,58,0.2)',
                    boxShadow: 'inset 0 1px 0 rgba(201,139,58,0.1), 0 1px 3px rgba(0,0,0,0.3)',
                  }}
                >
                  <Sparkles size={14} />
                  <span>3-hour reply</span>
                </div>
              </div>

              {/* Form and Info Grid */}
              <div className="grid gap-5 sm:gap-6 md:gap-8 lg:grid-cols-2">

                {/* Contact Info Card — Layer 3 */}
                <div
                  className="contact-card rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8"
                  style={{
                    background: 'linear-gradient(180deg, #1c1c22 0%, #151519 100%)',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    borderLeft: '1px solid rgba(255,255,255,0.03)',
                    borderRight: '1px solid rgba(255,255,255,0.03)',
                    borderBottom: '1px solid rgba(0,0,0,0.3)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 2px 8px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2)',
                  }}
                >
                  <ContactInfo />
                </div>

                {/* Contact Form Card — Layer 3 */}
                <div
                  className="contact-card rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8"
                  style={{
                    background: 'linear-gradient(180deg, #1c1c22 0%, #151519 100%)',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    borderLeft: '1px solid rgba(255,255,255,0.03)',
                    borderRight: '1px solid rgba(255,255,255,0.03)',
                    borderBottom: '1px solid rgba(0,0,0,0.3)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 2px 8px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2)',
                  }}
                >
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
