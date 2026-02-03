import {
  Instagram,
  ExternalLink,
  Code,
  Phone,
  Mail,
  Heart,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { APP_CONFIG, CONTACT_INFO, NAV_LINKS, SOCIAL_LINKS } from "../../constants";
import { Logo } from "../ui";

const Footer = ({ onNavClick }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-800 border-t border-dark-700 text-white overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-8">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12 sm:space-y-16">
        
        {/* Brand Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <div className="flex-1 space-y-4 sm:space-y-6">
            <Logo onClick={() => onNavClick("Home")} size="small" />
            <p className="text-dark-400 md:text-white/70 leading-relaxed max-w-xl text-sm sm:text-base md:text-base">
              Premium fitness and lifestyle brand for those who train with
              discipline and live with confidence, built with powerful
              compression, bold design, and lasting comfort.
            </p>
          </div>
        </div>

        {/* Link Grid - Mobile: Stack, Desktop: Grid */}
        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-3">

          {/* Connect */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <p className="text-xs md:text-sm lg:text-base uppercase tracking-widest text-dark-400 md:text-white/60 font-semibold md:font-bold">
              Connect
            </p>
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-3 rounded-lg md:rounded-xl bg-dark-900 border border-dark-700 text-dark-400 hover:text-gold-500 hover:border-gold-500/30 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={18} className="md:w-5 md:h-5 lg:w-6 lg:h-6" strokeWidth={2} />
              </a>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-3 rounded-lg md:rounded-xl bg-dark-900 border border-dark-700 text-dark-400 hover:text-gold-500 hover:border-gold-500/30 transition-all duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} className="md:w-5 md:h-5 lg:w-6 lg:h-6" strokeWidth={2} />
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="p-2 md:p-3 rounded-lg md:rounded-xl bg-dark-900 border border-dark-700 text-dark-400 hover:text-gold-500 hover:border-gold-500/30 transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={18} className="md:w-5 md:h-5 lg:w-6 lg:h-6" strokeWidth={2} />
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s|-/g, '')}`}
                className="p-2 md:p-3 rounded-lg md:rounded-xl bg-dark-900 border border-dark-700 text-dark-400 hover:text-gold-500 hover:border-gold-500/30 transition-all duration-200"
                aria-label="Phone"
              >
                <Phone size={18} className="md:w-5 md:h-5 lg:w-6 lg:h-6" strokeWidth={2} />
              </a>
            </div>
            <div className="space-y-1 md:space-y-2 text-sm md:text-base lg:text-lg text-dark-400 md:text-white/60 md:font-medium">
              <p>{CONTACT_INFO.email}</p>
              <p>{CONTACT_INFO.phone}</p>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <p className="text-xs md:text-sm lg:text-base uppercase tracking-widest text-dark-400 md:text-white/60 font-semibold md:font-bold">
              Shop
            </p>
            <button
              onClick={() => onNavClick && onNavClick("Shop")}
              className="flex items-center gap-2.5 md:gap-3 text-dark-400 text-sm md:text-base lg:text-lg hover:text-gold-500 transition-colors duration-200 md:font-medium"
            >
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-dark-400" />
              Compression T-Shirts
            </button>
          </div>

          {/* Company */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <p className="text-xs md:text-sm lg:text-base uppercase tracking-widest text-dark-400 md:text-white/60 font-semibold md:font-bold">
              Company
            </p>
            <ul className="space-y-3 md:space-y-4 text-dark-400 text-sm md:text-base lg:text-lg md:font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavClick && onNavClick(link.name)}
                    className="flex items-center gap-2.5 md:gap-3 hover:text-gold-500 transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-dark-400" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-dark-700 pt-8 md:pt-10 lg:pt-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8 text-xs md:text-sm lg:text-base text-dark-400 md:text-white/60 md:font-medium">
            <p>© {currentYear} GOD WEAR. All rights reserved.</p>
            <div className="flex items-center gap-2 md:gap-3">
              <Heart size={14} className="text-red-500 md:w-4 md:h-4 lg:w-5 lg:h-5" fill="currentColor" />
              Crafted with intention.
            </div>

            {/* Developer Card */}
            <a
              href={APP_CONFIG.developer.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 md:gap-4 px-4 md:px-5 lg:px-6 py-3 md:py-4 bg-dark-900 rounded-xl md:rounded-2xl border border-dark-700 hover:border-gold-500/30 transition-all duration-300 w-fit"
            >
              <div className="p-2 md:p-2.5 lg:p-3 bg-gold-500/10 border border-gold-500/20 rounded-lg md:rounded-xl group-hover:bg-gold-500/20 transition-all duration-300">
                <Code size={15} className="text-gold-500 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] md:text-xs lg:text-sm text-dark-400 md:text-white/50 uppercase tracking-wide">
                  Crafted by
                </span>
                <span className="text-sm md:text-base lg:text-lg font-bold md:font-extrabold text-white group-hover:text-gold-500 transition-colors">
                  {APP_CONFIG.developer.name}
                </span>
              </div>
              <ExternalLink
                size={13}
                className="text-dark-400 md:w-4 md:h-4 lg:w-5 lg:h-5 group-hover:text-gold-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
