import { Instagram, Phone, Mail, MapPin, MessageCircle, Heart, Code, ExternalLink, Sparkles } from 'lucide-react';
import { filterButtonsData } from '../assets/data';
import { APP_CONFIG, CONTACT_INFO, SOCIAL_LINKS } from '../constants';

const Footer = ({ onNavClick, onCategorySelect }) => {
    const currentYear = new Date().getFullYear();
    const companyLinks = [
        { label: 'Home', section: 'Home' },
        { label: 'Shop', section: 'Shop' },
        { label: 'About Us', section: 'About' },
        { label: 'Contact', section: 'Contact' }
    ];

    return (
        <footer className="bg-black text-white">
            <div className="max-w-7xl mx-auto px-4 xl:px-0 py-16 space-y-12">

                {/* Top CTA */}
                <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-accent/80 via-[#ff8b4b]/90 to-[#ff5151] p-8 text-center shadow-[0_40px_90px_rgba(0,0,0,0.55)]">
                    <p className="text-xs tracking-[0.6em] uppercase text-white/70 mb-2">Priority Access</p>
                    <h3 className="text-4xl md:text-5xl font-machina uppercase text-white mb-4">Own the drop before anyone else</h3>
                    <p className="text-white/80 max-w-2xl mx-auto mb-6">
                        Be first to grab performance pieces, live fittings, and concierge styling that keeps your training relentless.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => onCategorySelect && onCategorySelect('All')}
                            className="px-8 py-3 rounded-full bg-white text-black font-semibold uppercase text-xs tracking-[0.3em] shadow-lg hover:opacity-90 transition-opacity"
                        >
                            Shop the Drop
                        </button>
                        <button
                            onClick={() => onNavClick && onNavClick('Contact')}
                            className="px-8 py-3 rounded-full border border-white/60 text-white font-semibold uppercase text-xs tracking-[0.3em] transition hover:bg-white/10"
                        >
                            Book a Concierge Call
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid gap-10 lg:grid-cols-3">

                    {/* Brand & Contact */}
                    <div className="space-y-6">
                        <button
                            onClick={() => onNavClick && onNavClick('Home')}
                            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}images/logo.webp`}
                                alt="GOD WEAR"
                                className="h-10 w-auto object-contain"
                            />
                            <span className="text-2xl impact tracking-tight text-white">GOD WEAR<sup className="text-sm">®</sup></span>
                        </button>
                        <p className="text-white/80 leading-relaxed font-medium">
                            {APP_CONFIG.tagline} — {APP_CONFIG.description}
                        </p>
                        <div className="space-y-3 text-sm text-white/80">
                            <a
                                href={`mailto:${CONTACT_INFO.email}`}
                                className="flex items-center gap-3 group transition hover:text-accent"
                            >
                                <Mail className="text-white/60 group-hover:text-white" size={16} />
                                <span>{CONTACT_INFO.email}</span>
                            </a>
                            <a
                                href={`tel:${CONTACT_INFO.phone.replace(/\s|-/g, '')}`}
                                className="flex items-center gap-3 group transition hover:text-accent"
                            >
                                <Phone className="text-white/60 group-hover:text-white" size={16} />
                                <span>{CONTACT_INFO.phone}</span>
                            </a>
                            <div className="flex items-center gap-3 text-white/50">
                                <MapPin className="text-accent" size={16} />
                                <span>Made with pride in India</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <a
                                href={SOCIAL_LINKS.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-2xl bg-white/10 border border-white/10 text-white transition hover:border-accent"
                                aria-label="Instagram"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-2xl bg-white/10 border border-white/10 text-white transition hover:border-accent"
                                aria-label="WhatsApp"
                            >
                                <MessageCircle size={18} />
                            </a>
                            <a
                                href={`mailto:${CONTACT_INFO.email}`}
                                className="p-3 rounded-2xl bg-white/10 border border-white/10 text-white transition hover:border-accent"
                                aria-label="Email"
                            >
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div className="space-y-5">
                        <h3 className="text-sm uppercase tracking-[0.4em] text-white/70">Shop</h3>
                        <p className="text-white/60 text-sm">
                            Filters engineered for every form of training.
                        </p>
                        <div className="space-y-3">
                            {filterButtonsData.map((category) => (
                                <button
                                    key={category.name}
                                    onClick={() => onCategorySelect && onCategorySelect(category.name)}
                                    className="w-full flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-left text-sm font-manrope hover:border-accent hover:text-accent transition"
                                >
                                    <span>{category.name}</span>
                                    <span className="text-xs uppercase tracking-[0.3em] text-white/60">{category.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Company & Support */}
                    <div className="space-y-5">
                        <h3 className="text-sm uppercase tracking-[0.4em] text-white/70">Company</h3>
                        <div className="grid gap-3 text-sm font-medium">
                            {companyLinks.map((link) => (
                                <button
                                    key={link.label}
                                    onClick={() => onNavClick && onNavClick(link.section)}
                                    className="text-white/70 hover:text-white transition text-left"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                        <p className="text-white/60 text-sm">Concierge-grade service, same-day replies.</p>
                        <button
                            onClick={() => onNavClick && onNavClick('Contact')}
                            className="px-5 py-3 rounded-2xl border border-white/30 uppercase tracking-[0.3em] text-xs text-white/70 hover:border-accent hover:text-accent transition"
                        >
                            Talk to Support
                        </button>
                    </div>
                </div>

                {/* Bottom Credits */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
                        <p>© {currentYear} GOD WEAR. All rights reserved.</p>
                        <p className="flex items-center gap-2">
                            Made with
                            <Heart size={14} className="text-red-500 fill-red-500" />
                            in India
                        </p>
                        <a
                            href={APP_CONFIG.developer.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-white/70 hover:text-accent transition"
                        >
                            <Sparkles size={14} />
                            Crafted by {APP_CONFIG.developer.name}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
