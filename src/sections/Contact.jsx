import Section from '../components/layout/Section';
import SectionHeader from '../components/layout/SectionHeader';
import { ContactForm, ContactInfo } from '../components/common';

const Contact = () => {
  return (
    <Section background="dark" padding="large" className="relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl space-y-10 px-4 sm:px-6">
        <div className="flex justify-center">
          <span className="accent-pill uppercase tracking-widest text-white/70">Contact</span>
        </div>

        <SectionHeader
          title="Let’s Build Something Legendary"
          subtitle="Share your plans, questions, or concierge requests and our team will respond within 3 hours."
          align="center"
          titleClassName="text-white font-machina text-[2.75rem] sm:text-[3.5rem] md:text-[4.25rem] leading-tight"
          subtitleClassName="text-white/70 font-manrope text-base sm:text-lg max-w-3xl mx-auto"
        />

        <div className="relative rounded-[40px] border border-white/10 bg-black/60 p-4 sm:p-6 shadow-[0_40px_90px_rgba(0,0,0,0.55)]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-10 -left-8 h-48 w-48 rounded-full bg-[#F97316]/40 blur-3xl" />
            <div className="absolute -bottom-12 -right-6 h-64 w-64 rounded-full bg-[#22D3EE]/30 blur-3xl" />
          </div>
          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 sm:p-8 shadow-[0_24px_50px_rgba(255,255,255,0.08)]">
                <ContactInfo />
            </div>
            <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-black/70 via-black/30 to-transparent p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
