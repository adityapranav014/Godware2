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
    <footer className="relative bg-black text-white overflow-hidden pt-32 pb-8">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 space-y-20">
        {/* Front hero */}
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-6">
            <Logo onClick={() => onNavClick("Home")} size="small" />
            <p className="text-white/60 leading-relaxed max-w-xl text-sm">
              Premium fitness and lifestyle brand for those who train with
              discipline and live with confidence, built with powerful
              compression, bold design, and lasting comfort.
            </p>
          </div>
        </div>

        {/* Link grid */}
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">

          {/* Connect */}
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-6">
              Connect
            </p>
            <div className="flex items-center gap-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s|-/g, '')}`}
                className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200"
                aria-label="Phone"
              >
                <Phone size={18} />
              </a>
            </div>
            <div className="space-y-1.5 text-sm text-white/40 font-light">
              <p>{CONTACT_INFO.email}</p>
              <p>{CONTACT_INFO.phone}</p>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-6">
              Shop
            </p>
            <button
              onClick={() => onNavClick && onNavClick("Shop")}
              className="flex items-center gap-2.5 text-white/50 text-sm transition-colors duration-200 hover:text-white"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              Compression T-Shirts
            </button>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-6">
              Company
            </p>
            <ul className="space-y-3 text-white/50 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavClick && onNavClick(link.name)}
                    className="flex items-center gap-2.5 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer base */}
        <div className="border-t border-white/10 pt-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-xs text-white/40">
            <p>© {currentYear} GOD WEAR. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Heart size={14} className="text-red-500" />
              Crafted with intention.
            </div>

            <div className="relative group">
              {/* Glow Effect on Hover */}
              <div
                className="absolute -inset-1 bg-linear-to-r from-gold via-amber-500 to-gold rounded-xl opacity-0 
                                group-hover:opacity-20 blur-md transition-all duration-500"
              ></div>

              {/* Button */}
              <a
                href={APP_CONFIG.developer.website}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center gap-3 px-4 py-3 bg-white/5 backdrop-blur-sm rounded-2xl 
                                    border border-white/10 hover:border-gold/40 transition-all duration-300 cursor-pointer
                                    hover:shadow-lg hover:shadow-gold/5 group-hover:bg-zinc-800 w-fit"
              >
                {/* Sparkle Icon - Top Right */}
                <Sparkles
                  size={10}
                  className="text-gold opacity-0 group-hover:opacity-100 
                                        transition-opacity duration-300 absolute -top-1.5 -right-1.5"
                />

                {/* Code Icon with Gradient Background */}
                <div
                  className="p-2 bg-linear-to-br from-gold to-amber-600 rounded-lg
                                    group-hover:scale-105 transition-transform duration-300 shadow-md shadow-gold/20"
                >
                  <Code size={15} className="text-white" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] text-zinc-500 group-hover:text-zinc-400 transition-colors uppercase tracking-wide">
                    Crafted by
                  </span>
                  <span className="text-sm font-bold text-white group-hover:text-gold transition-colors">
                    {APP_CONFIG.developer.name}
                  </span>
                </div>

                {/* External Link Arrow */}
                <ExternalLink
                  size={13}
                  className="text-zinc-600 group-hover:text-gold group-hover:translate-x-0.5 
                                        group-hover:-translate-y-0.5 transition-all duration-300 ml-1"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
