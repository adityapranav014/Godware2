/**
 * ContactInfo component
 * Displays contact information cards with links
 */

import { Mail, Phone, Instagram, MapPin, MessageCircle } from 'lucide-react';
import { CONTACT_INFO, SOCIAL_LINKS } from '../../constants';

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: MessageCircle,
      label: 'WhatsApp Business',
      value: CONTACT_INFO.whatsappPhone,
      href: `https://wa.me/${CONTACT_INFO.whatsappNumber}`,
      external: true
    },
    {
      icon: Phone,
      label: 'Call Us',
      value: CONTACT_INFO.phone,
      href: `tel:${CONTACT_INFO.phone.replace(/\s|-/g, '')}`,
      external: false
    },
    {
      icon: Mail,
      label: 'Email',
      value: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`,
      external: false
    },
    {
      icon: MapPin,
      label: 'Location',
      value: CONTACT_INFO.address,
      href: null,
      external: false
    }
  ];

  return (
    <div className="space-y-8">
      {/* Primary Contact Card */}
      <div className="bg-gradient-to-br from-[#E8602E] via-[#8C2F12] to-[#1F0B05] rounded-3xl p-8 text-white shadow-[0_24px_60px_rgba(232,96,46,0.18)]">
        <h3 className="text-2xl font-bold mb-6 font-machina">Contact Information</h3>
        <div className="space-y-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            const Component = method.href ? 'a' : 'div';
            const props = method.href ? {
              href: method.href,
              ...(method.external && { target: '_blank', rel: 'noopener noreferrer' })
            } : {};

            return (
              <Component
                key={index}
                {...props}
                className={`flex items-start gap-4 ${method.href ? 'group hover:translate-x-2 transition-transform duration-300 cursor-pointer' : ''}`}
              >
                <div className={`p-3 bg-white/20 rounded-xl backdrop-blur-sm ${method.href ? 'group-hover:bg-white/30' : ''} transition-colors`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-sm opacity-90 mb-1 font-manrope">{method.label}</p>
                  <p className="text-lg font-semibold font-manrope">{method.value}</p>
                </div>
              </Component>
            );
          })}
        </div>
      </div>

      {/* Social Media Card */}
      <div className="bg-ink rounded-3xl p-8 text-white">
        <h3 className="text-xl font-bold mb-6 font-machina">Follow Us</h3>
        <div className="flex gap-4">
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer backdrop-blur-sm"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer backdrop-blur-sm"
            aria-label="Facebook"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer backdrop-blur-sm"
            aria-label="Twitter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </a>
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-surface rounded-3xl p-8 border border-stroke">
        <h3 className="text-xl font-bold mb-4 text-ink font-machina">Business Hours</h3>
        <div className="space-y-2 text-muted font-manrope">
          <p className="flex justify-between">
            <span>Monday - Friday</span>
            <span className="font-semibold">9:00 AM - 8:00 PM</span>
          </p>
          <p className="flex justify-between">
            <span>Saturday</span>
            <span className="font-semibold">10:00 AM - 6:00 PM</span>
          </p>
          <p className="flex justify-between">
            <span>Sunday</span>
            <span className="font-semibold">Closed</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
