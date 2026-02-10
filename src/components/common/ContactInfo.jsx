/**
 * ContactInfo component
 * Displays contact information with depth-layered cards
 */

import { Mail, Phone, Instagram, MessageCircle, Clock, MapPin } from 'lucide-react';
import { CONTACT_INFO, SOCIAL_LINKS } from '../../constants';

const ContactInfo = () => {
  return (
    <div className="space-y-5 sm:space-y-6">

      {/* Business Hours — Recessed (inset shadow = "pushed into" the surface) */}
      <div
        className="rounded-xl p-4 sm:p-5"
        style={{
          background: 'linear-gradient(180deg, #111115 0%, #131317 100%)',
          boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.03)',
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Clock size={18} className="text-gold-500/70" />
          <h3 className="text-sm font-bold uppercase tracking-wider font-display text-white/80">Business Hours</h3>
        </div>
        <div className="space-y-2.5 text-sm text-dark-400 font-sans">
          <p className="flex justify-between gap-2">
            <span>Monday – Friday</span>
            <span className="font-semibold text-white/90">9 AM – 8 PM</span>
          </p>
          <div className="border-t border-white/5" />
          <p className="flex justify-between gap-2">
            <span>Saturday</span>
            <span className="font-semibold text-white/90">10 AM – 6 PM</span>
          </p>
          <div className="border-t border-white/5" />
          <p className="flex justify-between gap-2">
            <span>Sunday</span>
            <span className="font-semibold text-dark-500">Closed</span>
          </p>
        </div>
      </div>

      {/* Reach Us — Elevated icon buttons (Level 2 shadow) */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider font-display text-white/80 mb-4">Reach Us</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {[
            { icon: Phone, label: "Call", href: `tel:${CONTACT_INFO.phone.replace(/\s|-/g, "")}` },
            { icon: MessageCircle, label: "WhatsApp", href: `https://wa.me/${CONTACT_INFO.whatsappNumber}` },
            { icon: Instagram, label: "Instagram", href: SOCIAL_LINKS.instagram },
            { icon: Mail, label: "Email", href: `mailto:${CONTACT_INFO.email}` },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center justify-center aspect-square rounded-xl text-white transition-all duration-200 active:scale-95 hover:scale-[1.03]"
                style={{
                  background: 'linear-gradient(180deg, #1f1f26 0%, #18181d 100%)',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  borderLeft: '1px solid rgba(255,255,255,0.04)',
                  borderRight: '1px solid rgba(255,255,255,0.04)',
                  borderBottom: '1px solid rgba(0,0,0,0.4)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 4px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.25)',
                }}
                aria-label={item.label}
              >
                <Icon size={20} className="mb-2 text-dark-400 group-hover:text-gold-500 transition-colors duration-200" strokeWidth={1.8} />
                <span className="text-[11px] font-medium text-dark-400 group-hover:text-white transition-colors duration-200">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Location — Small recessed bar */}
      <div
        className="flex items-center gap-2.5 rounded-lg px-4 py-3 text-xs text-dark-400 font-sans"
        style={{
          background: 'linear-gradient(180deg, #111115 0%, #131317 100%)',
          boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.03)',
        }}
      >
        <MapPin size={14} className="text-gold-500/50 shrink-0" />
        <span>{CONTACT_INFO.address}</span>
      </div>
    </div>
  );
};

export default ContactInfo;
