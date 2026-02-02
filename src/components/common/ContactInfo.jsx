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

      {/* Business Hours */}
      <div className="bg-subtle rounded-3xl p-8 border border-stroke">
        <h3 className="text-xl font-bold mb-4 text-ink font-machina">Business Hours</h3>
        <div className="space-y-2 text-muted font-manrope">
          <p className="flex flex-col sm:flex-row sm:justify-between">
            <span>Monday - Friday</span>
            <span className="font-semibold">9:00 AM - 8:00 PM</span>
          </p>
          <p className="flex flex-col sm:flex-row sm:justify-between">
            <span>Saturday</span>
            <span className="font-semibold">10:00 AM - 6:00 PM</span>
          </p>
          <p className="flex flex-col sm:flex-row sm:justify-between">
            <span>Sunday</span>
            <span className="font-semibold">Closed</span>
          </p>
        </div>
      </div>

      {/* Reach Us Card */}
      <div className="bg-black rounded-3xl p-8 text-white border border-stroke">
        <h3 className="text-xl font-bold mb-6 font-machina">Reach Us</h3>
        <div className="flex flex-wrap gap-4">
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
                className="group relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white hover:border-accent hover:bg-white/10 transition"
                aria-label={item.label}
              >
                <Icon size={20} />
                <span className="pointer-events-none absolute -bottom-6 left-1/2 w-max -translate-x-1/2 rounded-full bg-black/70 px-2 py-1 text-[10px] uppercase tracking-[0.4em] text-white opacity-0 transition duration-300 group-hover:opacity-100">
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
