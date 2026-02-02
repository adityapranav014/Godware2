import Section from '../components/layout/Section';
import SectionHeader from '../components/layout/SectionHeader';
import { ContactForm, ContactInfo } from '../components/common';
import { Sparkles } from 'lucide-react';

const Contact = () => {
  return (
    <Section background="dark" padding="large" className="relative overflow-hidden">
      <div className="relative mx-auto max-w-5xl space-y-8 px-4 sm:px-6">
        <div className="flex justify-center">
          <span className="accent-pill uppercase tracking-widest text-white/70">Contact</span>
        </div>

        <SectionHeader
          title="Need bulk, or corporate ordering?"
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
                  <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0f0f0f] via-[#080808] to-[#050505] p-6 shadow-[0_35px_80px_rgba(0,0,0,0.55)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-6 top-4 h-24 w-24 rounded-full bg-amber-500/30 blur-[80px]" />
          <div className="absolute -left-4 bottom-10 h-28 w-28 rounded-full bg-cyan-400/25 blur-[80px]" />
        </div>

        <div className="relative space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.5em] text-white/60 font-machina">Inquiry</p>
              <h3 className="text-2xl font-semibold text-white font-machina">Start the conversation</h3>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs text-white/80">
              <Sparkles size={14} />
              <span>3-hour reply</span>
            </div>
          </div>
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
