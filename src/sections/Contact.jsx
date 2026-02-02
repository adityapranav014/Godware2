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
          title="Bulk & Corporate Orders"
          subtitle="Send us your requirements for custom and on-demand solutions."
          align="center"
          titleClassName="text-white font-machina text-3xl sm:text-[2.75rem] md:text-[3.25rem] leading-snug"
          subtitleClassName="text-white/70 font-manrope text-base sm:text-lg max-w-3xl mx-auto"
        />

        <div className="relative rounded-[36px] border border-white/10 bg-black/60 p-4 sm:p-6 shadow-[0_40px_90px_rgba(0,0,0,0.55)]">
          <div className="relative space-y-6">

            <div className="rounded-[32px] border border-white/10 bg-white/5 p-5 sm:p-6">
              <div className="relative space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4 ">
                  <div>
                    <h3 className="text-xl font-bold font-machina">Start the conversation</h3>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs text-white/80">
                    <Sparkles size={14} />
                    <span>3-hour reply</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-5 sm:p-6">
                <ContactInfo />
              </div>
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-5 sm:p-6">
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
