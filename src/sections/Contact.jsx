import Section from '../components/layout/Section';
import SectionHeader from '../components/layout/SectionHeader';
import { ContactForm, ContactInfo } from '../components/common';
import { Sparkles } from 'lucide-react';

const Contact = () => {
  return (
    <Section padding="large" className="relative overflow-hidden bg-dark-900">
      <div className="relative mx-auto max-w-5xl space-y-8 sm:space-y-10 px-4 sm:px-6">
        
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs sm:text-sm uppercase tracking-widest font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Contact
          </span>
        </div>

        {/* Header */}
        <SectionHeader
          title="Bulk & Corporate Orders"
          subtitle="Send us your requirements for custom and on-demand solutions."
          align="center"
          titleClassName="text-white font-display text-3xl sm:text-4xl md:text-2xl lg:text-3xl xl:text-4xl font-bold"
          subtitleClassName="text-dark-400 md:text-white/80 font-sans text-sm sm:text-base md:text-base"
        />

        {/* Contact Container */}
        <div className="relative bg-dark-800 border border-dark-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
          <div className="relative space-y-4 sm:space-y-6">

            {/* Header Card */}
            <div className="bg-dark-900 border border-dark-700 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-sans text-white">Start the Conversation</h3>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-2 text-xs sm:text-sm text-gold-500 font-medium">
                  <Sparkles size={16} />
                  <span>3-hour reply</span>
                </div>
              </div>
            </div>

            {/* Form and Info Grid - Mobile: Stack, Desktop: Side-by-side */}
            <div className="grid gap-4 sm:gap-6 md:gap-8 lg:grid-cols-2">
              <div className="bg-dark-900 border border-dark-700 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
                <ContactInfo />
              </div>
              <div className="bg-dark-900 border border-dark-700 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
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
