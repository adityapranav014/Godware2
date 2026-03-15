import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Instagram, MessageCircle, Clock, MapPin, Send } from 'lucide-react';
import { CONTACT_INFO, SOCIAL_LINKS } from '../../constants';
import { contactInfoLabelsData } from '../../assets/data';
import { isMobile, svgIconDraw } from '../../utils/animations';

gsap.registerPlugin(ScrollTrigger);

/**
 * Self-contained reach item — mirrors ComparisonSection's FeatureCard pattern.
 * Each item owns its own ref and useGSAP so the icon draw fires reliably
 * at its own scroll position, independent of any parent timeline.
 */
const ReachItem = ({ icon: Icon, label, sub, href, index }) => {
  const itemRef = useRef(null);
  const iconWrapRef = useRef(null);

  useGSAP(() => {
    if (!iconWrapRef.current) return;
    const svgEl = iconWrapRef.current.querySelector('svg');
    if (!svgEl) return;

    const paths = svgEl.querySelectorAll('path, line, circle, polyline, polygon, rect');
    if (!paths.length) return;

    // Pre-hide strokes
    paths.forEach(path => {
      const len = path.getTotalLength ? path.getTotalLength() : 80;
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    });

    // Draw on scroll — each item triggers itself, stagger via index delay
    gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 1.0,
      stagger: 0.06,
      ease: 'power2.inOut',
      delay: index * 0.12,
      scrollTrigger: {
        trigger: itemRef.current,
        start: 'top 88%',
        once: true,
      },
    });
  }, { scope: itemRef });

  return (
    <a
      ref={itemRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-5 py-4 border-b border-white/6 hover:border-gold-500/25 transition-colors duration-200"
      onMouseEnter={(e) => {
        if (isMobile()) return;
        svgIconDraw(e.currentTarget.querySelector('svg'), 0.4);
        const arrow = e.currentTarget.querySelector('[data-arrow]');
        if (arrow) gsap.to(arrow, { x: 3, y: -3, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
      }}
      onMouseLeave={(e) => {
        if (isMobile()) return;
        const arrow = e.currentTarget.querySelector('[data-arrow]');
        if (arrow) gsap.to(arrow, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' });
      }}
    >
      <span
        ref={iconWrapRef}
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 border border-white/8 group-hover:border-gold-500/30 group-hover:bg-gold-500/5 transition-all duration-200"
        style={{ background: 'rgba(255,255,255,0.03)' }}
      >
        <Icon size={15} strokeWidth={1.5} className="text-white/40 group-hover:text-gold-500 transition-colors duration-200" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="editorial-label mb-0.5">{label}</p>
        <p className="section-body truncate group-hover:text-white transition-colors duration-200">{sub}</p>
      </div>
      <span data-arrow className="text-white/15 group-hover:text-gold-500/60 transition-colors duration-200 text-xs">↗</span>
    </a>
  );
};

const ContactInfo = () => {
  const reachItems = [
    { icon: Phone, label: 'Call', sub: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone.replace(/\s|-/g, '')}` },
    { icon: MessageCircle, label: 'WhatsApp', sub: CONTACT_INFO.whatsappPhone, href: `https://wa.me/${CONTACT_INFO.whatsappNumber}` },
    { icon: Instagram, label: 'Instagram', sub: SOCIAL_LINKS.instagramHandle, href: SOCIAL_LINKS.instagram },
    { icon: Mail, label: 'Email', sub: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  ];

  return (
    <div className="space-y-10">

      {/* Reach us */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-5">
          <Send size={11} strokeWidth={2} className="text-gold-500/80 shrink-0" />
          <span className="editorial-label-gold">Reach Us</span>
        </div>
        {reachItems.map(({ icon, label, sub, href }, index) => (
          <ReachItem key={label} icon={icon} label={label} sub={sub} href={href} index={index} />
        ))}
      </div>

      {/* Hours */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock size={11} strokeWidth={2} className="text-gold-500/80 shrink-0" />
          <span className="editorial-label-gold">Business Hours</span>
        </div>
        <div className="space-y-3">
          {contactInfoLabelsData.schedule.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="section-muted">{item.day}</span>
              <span className={`text-sm font-sans font-medium ${item.time === 'Closed' ? 'text-white/15' : 'text-white/80'}`}>
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-3">
        <MapPin size={13} strokeWidth={1.5} className="text-gold-500/50 shrink-0" />
        <span className="text-sm text-white/35 font-sans">{CONTACT_INFO.address}</span>
      </div>

    </div>
  );
};

export default ContactInfo;
