import { Instagram, ExternalLink, Code, Phone, Mail, Heart, MessageCircle, Sparkles } from 'lucide-react';
import { APP_CONFIG, CONTACT_INFO, SOCIAL_LINKS } from '../../constants';
import { Logo } from '../ui';

const Footer = ({ onNavClick }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#030304] text-white overflow-hidden pt-24">

            {/* Radiant backdrop */}
            <div className="pointer-events-none absolute inset-0 opacity-60">
                <div className="absolute inset-y-8 left-10 w-72 h-72 rounded-full bg-[#e8603d] blur-3xl animate-pulse" />
                <div className="absolute -top-6 right-4 w-72 h-72 rounded-full bg-[#3c9ee5] blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pb-16 space-y-12">

                {/* Front hero */}
                <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl px-6 py-8 shadow-2xl shadow-white/10 backdrop-blur-2xl flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-4">
                        <Logo onClick={() => onNavClick('Home')} size="small" />
                        <p className="text-white/70 leading-relaxed max-w-2xl">
                            {APP_CONFIG.tagline} — {APP_CONFIG.description} Crafted for movement, tuned to performance, and finished in luxe details.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 justify-center">
                        <p className="text-sm uppercase text-white/60 tracking-widest">Need a bespoke touch?</p>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => onNavClick && onNavClick('Contact')}
                                className="px-6 py-3 rounded-full border border-white/30 bg-gradient-to-r from-gold to-amber-500 text-black font-semibold transition hover:scale-[1.02]"
                            >
                                Contact Us
                            </button>
                            <button
                                onClick={() => onNavClick && onNavClick('About')}
                                className="px-6 py-3 rounded-full border border-white/30 text-white font-semibold transition hover:bg-white/10"
                            >
                                About Us
                            </button>
                        </div>
                    </div>
                </div>

                {/* Link grid */}
                <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr_1fr]">
                    <div className="space-y-6">
                        <div className="text-sm uppercase tracking-[0.4em] text-white/60">Connect</div>
                        <p className="text-white/80 text-lg leading-relaxed">
                            The GOD WEAR studio is open. Whether you need support, bespoke sizing, or partnership, we are one ping away.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {[CONTACT_INFO.email, CONTACT_INFO.phone].map((item, index) => (
                                <div key={item} className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl">
                                    {index === 0 ? <Mail size={16} /> : <Phone size={16} />}
                                    <span className="text-sm text-white/80">{item}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <a
                                href={SOCIAL_LINKS.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/10 rounded-2xl transition hover:bg-white/20"
                                aria-label="Instagram"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/10 rounded-2xl transition hover:bg-green-500/40"
                                aria-label="WhatsApp"
                            >
                                <MessageCircle size={18} />
                            </a>
                            <a
                                href={`mailto:${CONTACT_INFO.email}`}
                                className="p-3 bg-white/10 rounded-2xl transition hover:bg-white/20"
                                aria-label="Email"
                            >
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm uppercase tracking-widest text-white/60 mb-4">Shop</p>
                        <button
                            onClick={() => onNavClick && onNavClick('Shop')}
                            className="flex items-center gap-2 text-white/70 text-sm transition hover:text-white"
                        >
                            <span className="w-2 h-2 rounded-full bg-white/40" />
                            Compression T-Shirts
                        </button>
                    </div>

                    <div>
                        <p className="text-sm uppercase tracking-widest text-white/60 mb-4">Company</p>
                        <ul className="space-y-3 text-white/70 text-sm">
                            {['About', 'Impact', 'Testimonials', 'Contact'].map((label) => (
                                <li key={label}>
                                    <button
                                        onClick={() => onNavClick && onNavClick(label)}
                                        className="flex items-center gap-2 hover:text-white transition"
                                    >
                                        <span className="w-2 h-2 rounded-full bg-white/40" />
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer base */}
                <div className="border-t border-white/10 pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-white/60">
                        <p>© {currentYear} GOD WEAR. All rights reserved.</p>
                        <div className="flex items-center gap-2">
                            <Heart size={16} className="text-red-500" />
                            Crafted with intention.
                        </div>
                        {/* <a
                            href={APP_CONFIG.developer.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-white/70 hover:text-white transition"
                        >
                            <Sparkles size={16} />
                            {APP_CONFIG.developer.name}
                        </a> */}

                        <div className="relative group">
                            {/* Glow Effect on Hover */}
                            <div className="absolute -inset-1 bg-linear-to-r from-gold via-amber-500 to-gold rounded-xl opacity-0 
                                group-hover:opacity-20 blur-md transition-all duration-500"></div>

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
                                <div className="p-2 bg-linear-to-br from-gold to-amber-600 rounded-lg
                                    group-hover:scale-105 transition-transform duration-300 shadow-md shadow-gold/20">
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

        </footer >
    );
};

export default Footer;
