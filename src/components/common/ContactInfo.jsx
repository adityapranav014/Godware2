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
    <div className="space-y-6 sm:space-y-8">

      {/* Business Hours */}
      <div className="bg-dark-900 border border-dark-700 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 text-white">
        <h3 className="text-lg font-bold mb-4 sm:mb-6 font-display text-white">Business Hours</h3>
        <div className="space-y-3 md:space-y-4 text-sm text-dark-400 font-sans">
          <p className="flex flex-col xs:flex-row xs:justify-between gap-1">
            <span>Monday - Friday</span>
            <span className="font-semibold md:font-bold text-white">9:00 AM - 8:00 PM</span>
          </p>
          <p className="flex flex-col xs:flex-row xs:justify-between gap-1">
            <span>Saturday</span>
            <span className="font-semibold md:font-bold text-white">10:00 AM - 6:00 PM</span>
          </p>
          <p className="flex flex-col xs:flex-row xs:justify-between gap-1">
            <span>Sunday</span>
            <span className="font-semibold md:font-bold text-white">Closed</span>
          </p>
        </div>
      </div>

      {/* Reach Us Card */}
      <div className="bg-dark-900 border border-dark-700 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 text-white">
        <h3 className="text-lg font-bold mb-4 sm:mb-6 font-display text-white">Reach Us</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              icon: Phone,
              label: "Call",
              href: `tel:${CONTACT_INFO.phone.replace(/\s|-/g, "")}`,
            },
            {
              icon: MessageCircle,
              label: "WhatsApp",
              href: `https://wa.me/${CONTACT_INFO.whatsappNumber}`,
            },
            {
              icon: Instagram,
              label: "Instagram",
              href: SOCIAL_LINKS.instagram,
            },
            {
              icon: Mail,
              label: "Email",
              href: `mailto:${CONTACT_INFO.email}`,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center justify-center aspect-square rounded-xl border border-dark-700 bg-dark-800 text-white hover:border-gold-500/30 hover:bg-dark-700 transition-all duration-200 active:scale-95"
                aria-label={item.label}
              >
                <Icon size={20} className="mb-2 md:w-6 md:h-6 text-dark-400 group-hover:text-gold-500 transition-colors" strokeWidth={2} />
                <span className="text-xs md:text-[9px] font-medium text-dark-400 group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
