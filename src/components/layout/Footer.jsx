import {
  Instagram,
  ExternalLink,
  Code,
  Phone,
  Mail,
  Heart,
  MessageCircle,
  Sparkles,
  ArrowUp,
  ShieldCheck,
} from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { APP_CONFIG, CONTACT_INFO, NAV_LINKS, SOCIAL_LINKS } from "../../constants";
import { Logo } from "../ui";
import { EASE, DURATION, STAGGER } from "../../utils/animations";

gsap.registerPlugin(ScrollTrigger);

const Footer = ({ onNavClick }) => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const socialLinksRef = useRef([]);

  useGSAP(() => {
    if (!footerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 85%",
      }
    });

    // Footer sections stagger in
    const sections = footerRef.current.querySelectorAll('.footer-section');
    tl.fromTo(
      sections,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DURATION.medium,
        stagger: STAGGER.normal,
        ease: EASE.power,
      }
    );

    // Social link hover effects
    socialLinksRef.current.forEach((link, index) => {
      if (!link) return;

      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          scale: 1.15,
          rotate: 5,
          duration: DURATION.fast,
          ease: EASE.back,
        });
      });

      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          scale: 1,
          rotate: 0,
          duration: DURATION.fast,
          ease: EASE.power,
        });
      });
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="relative z-10 bg-dark-800 text-white overflow-x-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-8"
      style={{
        borderTop: '1px solid var(--color-dark-700)',
        borderTopColor: 'rgba(255,255,255,0.06)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 -4px 16px rgba(0,0,0,0.3)'
      }}>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12 sm:space-y-16">

        {/* Brand Section */}
        <div className="footer-section flex flex-col lg:flex-row gap-8 lg:gap-10">
          <div className="flex-1 space-y-4 sm:space-y-6">
            <Logo onClick={() => onNavClick("Home")} size="small" />
            <p className="text-dark-400 leading-relaxed max-w-xl text-sm">
              Premium fitness and lifestyle brand for those who train with
              discipline and live with confidence, built with powerful
              compression, bold design, and lasting comfort.
            </p>
          </div>
        </div>

        {/* Link Grid - Mobile: Stack, Desktop: Grid */}
        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-3">

          {/* Connect */}
          <div className="footer-section space-y-4 sm:space-y-5 md:space-y-6">
            <p className="text-xs uppercase tracking-widest text-dark-400 font-semibold">
              Connect
            </p>
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
              <a
                ref={(el) => (socialLinksRef.current[0] = el)}
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-3 rounded-lg depth-card text-dark-400 hover:text-gold-500 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={18} strokeWidth={2} />
              </a>
              <a
                ref={(el) => (socialLinksRef.current[1] = el)}
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-3 rounded-lg depth-card text-dark-400 hover:text-gold-500 transition-all duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} strokeWidth={2} />
              </a>
              <a
                ref={(el) => (socialLinksRef.current[2] = el)}
                href={`mailto:${CONTACT_INFO.email}`}
                className="p-2 md:p-3 rounded-lg depth-card text-dark-400 hover:text-gold-500 transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={18} strokeWidth={2} />
              </a>
              <a
                ref={(el) => (socialLinksRef.current[3] = el)}
                href={`tel:${CONTACT_INFO.phone.replace(/\s|-/g, '')}`}
                className="p-2 md:p-3 rounded-lg depth-card text-dark-400 hover:text-gold-500 transition-all duration-200"
                aria-label="Phone"
              >
                <Phone size={18} strokeWidth={2} />
              </a>
            </div>
            <div className="space-y-1 md:space-y-2 text-sm text-dark-400">
              <p>{CONTACT_INFO.email}</p>
              <p>{CONTACT_INFO.phone}</p>
            </div>
          </div>

          {/* Shop */}
          <div className="footer-section space-y-4 sm:space-y-5 md:space-y-6">
            <p className="text-xs uppercase tracking-widest text-dark-400 font-semibold">
              Shop
            </p>
            <button
              onClick={() => onNavClick && onNavClick("Shop")}
              className="flex items-center gap-2.5 md:gap-3 text-dark-400 text-sm hover:text-gold-500 transition-colors duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-dark-400" />
              Compression T-Shirts
            </button>
          </div>

          {/* Company */}
          <div className="footer-section space-y-4 sm:space-y-5 md:space-y-6">
            <p className="text-xs uppercase tracking-widest text-dark-400 font-semibold">
              Company
            </p>
            <ul className="space-y-3 md:space-y-4 text-dark-400 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavClick && onNavClick(link.name)}
                    className="flex items-center gap-2.5 md:gap-3 hover:text-gold-500 transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-dark-400" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-dark-700 pt-8 md:pt-10 lg:pt-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8 text-xs text-dark-400">
            <p>© {currentYear} GOD WEAR. All rights reserved.</p>

            {/* Payment/Security Badges */}
            <div className="flex items-center gap-3 text-[10px] sm:text-xs text-dark-500 font-sans">
              <div className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-green-500/60" />
                <span>Secure Checkout</span>
              </div>
              <span className="text-dark-600">•</span>
              <span>COD</span>
              <span className="text-dark-600">•</span>
              <span>UPI</span>
              <span className="text-dark-600">•</span>
              <span>Card</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <Heart size={14} className="text-red-500" fill="currentColor" />
              Crafted in India with love.
            </div>

            {/* Developer Card */}
            <a
              href={APP_CONFIG.developer.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 depth-glow rounded-xl w-fit"
            >
              <div className="p-2 bg-gold-500/10 border border-gold-500/20 rounded-lg group-hover:bg-gold-500/20 transition-all duration-300">
                <Code size={15} className="text-gold-500" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px]  text-dark-400 uppercase tracking-wide">
                  Crafted by
                </span>
                <span className="text-sm font-bold text-white group-hover:text-gold-500 transition-colors">
                  {APP_CONFIG.developer.name}
                </span>
              </div>
              <ExternalLink
                size={13}
                className="text-dark-400 group-hover:text-gold-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
