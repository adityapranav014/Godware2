import Section from '../components/layout/Section';
import SectionHeader from '../components/layout/SectionHeader';
import { ContactForm, ContactInfo } from '../components/common';

const Contact = () => {
  return (
    <Section background="dark" padding="large" className="relative overflow-hidden">
      <div className="relative mx-auto max-w-5xl space-y-8 px-4 sm:px-6">
        <div className="flex justify-center">
          <span className="accent-pill uppercase tracking-widest text-white/70">Contact</span>
        </div>

        <SectionHeader
          title="Share your support, bulk, or corporate order needs"
          subtitle="Send us your requirements for custom and on-demand solutions; we reply within three hours."
          align="center"
          titleClassName="text-white font-machina text-3xl sm:text-[2.75rem] md:text-[3.25rem] leading-snug"
          subtitleClassName="text-white/70 font-manrope text-base sm:text-lg max-w-3xl mx-auto"
        />

        <div className="relative rounded-[36px] border border-white/10 bg-black/60 p-4 sm:p-6 shadow-[0_40px_90px_rgba(0,0,0,0.55)]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-10 -left-8 h-48 w-48 rounded-full bg-[#F97316]/40 blur-3xl" />
            <div className="absolute -bottom-12 -right-6 h-64 w-64 rounded-full bg-[#22D3EE]/30 blur-3xl" />
          </div>
          <div className="relative space-y-6">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-white font-semibold text-lg sm:text-xl">Need support, bulk, or corporate ordering?</p>
              <p className="text-white/80 text-sm leading-relaxed max-w-[40rem]">
                Share your volumes, timeline, and special requirements, and we will craft a custom on-demand solution that
                keeps your team moving without compromising lead time.
              </p>
              <div className="grid gap-3 text-xs sm:text-sm text-white/70 sm:grid-cols-3 mt-4">
                <p className="font-semibold text-amber-400">Concierge briefing</p>
                <p className="font-semibold text-amber-400">Bulk & corporate ready</p>
                <p className="font-semibold text-amber-400">Flexible delivery</p>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-5 sm:p-6 shadow-[0_24px_50px_rgba(255,255,255,0.08)]">
                <ContactInfo />
              </div>
              <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-black/70 via-black/30 to-transparent p-5 sm:p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
