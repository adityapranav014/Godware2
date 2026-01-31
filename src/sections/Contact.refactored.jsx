/**
 * Refactored Contact section using new structure
 * Uses ContactForm and ContactInfo components
 */

import { Section, SectionHeader } from "../components/layout";
import { ContactInfo } from "../components/common";

const Contact = () => {
  return (
    <Section background="white" padding="large">
      <SectionHeader 
        title="Get in Touch"
        subtitle="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Contact Information - Left Side */}
        <div className="lg:col-span-2">
          <ContactInfo />
        </div>

        {/* Contact Form has been removed; show fallback message */}
        <div className="lg:col-span-3">
          <div className="rounded-lg border border-gray-200 p-6">
            <p className="mb-2">The contact form has been removed. Please email us at <a href="mailto:hello@godware.com" className="underline">hello@godware.com</a> and we'll get back to you.</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
