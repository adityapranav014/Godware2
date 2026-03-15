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
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { APP_CONFIG, CONTACT_INFO, NAV_LINKS, SOCIAL_LINKS } from "../../constants";
import { footerContentData } from "../../assets/data";
import { Logo } from "../ui";
import { EASE, DURATION, STAGGER, isMobile, getResponsiveDuration, svgIconDraw } from "../../utils/animations";
import TextReveal from "../ui/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const Footer = ({ onNavClick }) => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const socialLinksRef = useRef([]);
  const devLinkRef = useRef(null);
  const decorLineRef = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll-aware back-to-top visibility — hidden on hero, visible after 400px
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0, autoKill: false },
      duration: 1.5,
      ease: 'power3.inOut',
    });
  };

  useGSAP(() => {
    if (!footerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 85%",
      }
    });

    if (decorLineRef.current) {
      tl.fromTo(decorLineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' });
    }

    const sections = footerRef.current.querySelectorAll('.footer-section');

    // Pre-hide social icon strokes before sections fade in
    const socialPaths = [];
    footerRef.current.querySelectorAll('.footer-section svg').forEach(svg => {
      const paths = [...svg.querySelectorAll('path, line, circle, polyline, polygon, rect')];
      paths.forEach(path => {
        const len = path.getTotalLength ? path.getTotalLength() : 60;
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      });
      socialPaths.push(...paths);
    });

    tl.fromTo(sections, { y: 40, opacity: 0, filter: 'blur(6px)' }, {
      y: 0, opacity: 1, filter: 'blur(0px)', duration: DURATION.medium, stagger: STAGGER.normal, ease: EASE.power,
    }, '-=0.6');

    // Dedicated ScrollTrigger for icon draw — delay lets sections fade in first.
    if (socialPaths.length) {
      gsap.to(socialPaths, {
        strokeDashoffset: 0,
        duration: 1.0,
        stagger: 0.06,
        ease: 'power2.inOut',
        delay: DURATION.medium * 0.8,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }

    const bottomBar = footerRef.current.querySelector('.footer-bottom');
    if (bottomBar) {
      tl.fromTo(bottomBar, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.circ }, '-=0.3');
    }

    const cleanupFns = [];
    socialLinksRef.current.forEach((link) => {
      if (!link) return;
      const onEnter = () => {
        gsap.to(link, { scale: 1.15, rotate: 5, duration: DURATION.fast, ease: EASE.back });
        const svgEl = link.querySelector('svg');
        if (svgEl) {
          const paths = svgEl.querySelectorAll('path, circle, line, polyline, rect');
          paths.forEach(path => {
            const length = path.getTotalLength ? path.getTotalLength() : 60;
            gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.inOut' });
          });
        }
      };
      const onLeave = () => { gsap.to(link, { scale: 1, rotate: 0, duration: DURATION.fast, ease: EASE.power }); };
      link.addEventListener('mouseenter', onEnter);
      link.addEventListener('mouseleave', onLeave);
      cleanupFns.push(() => { link.removeEventListener('mouseenter', onEnter); link.removeEventListener('mouseleave', onLeave); });
    });

    // Developer credit link — line-draw on Code + ExternalLink icons
    if (devLinkRef.current && !isMobile()) {
      const devLink = devLinkRef.current;
      const onDevEnter = () => {
        gsap.to(devLink, { y: -3, duration: 0.25, ease: 'power2.out', overwrite: true });
        devLink.querySelectorAll('svg').forEach(svg => {
          const paths = svg.querySelectorAll('path, circle, line, polyline, rect');
          paths.forEach(path => {
            const length = path.getTotalLength ? path.getTotalLength() : 60;
            gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.inOut', overwrite: 'auto' });
          });
        });
      };
      const onDevLeave = () => {
        gsap.to(devLink, { y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)', overwrite: true });
      };
      devLink.addEventListener('mouseenter', onDevEnter);
      devLink.addEventListener('mouseleave', onDevLeave);
      cleanupFns.push(() => { devLink.removeEventListener('mouseenter', onDevEnter); devLink.removeEventListener('mouseleave', onDevLeave); });
    }

    return () => { cleanupFns.forEach(fn => fn()); };
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="relative z-10 bg-dark-950 text-white overflow-x-hidden pt-10 sm:pt-14 md:pt-20 lg:pt-24 pb-8"
      style={{ borderTop: '1px solid var(--color-dark-700)', borderTopColor: 'rgba(255,255,255,0.06)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 -4px 16px rgba(0,0,0,0.3)' }}>

      <div ref={decorLineRef} className="absolute top-0 left-0 right-0" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201, 139, 58, 0.4), rgba(201, 139, 58, 0.6), rgba(201, 139, 58, 0.4), transparent)', transformOrigin: 'center', transform: 'scaleX(0)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12 sm:space-y-16">
        <div className="footer-section flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-10 pb-10 sm:pb-12 border-b border-white/4">
          <div className="space-y-4 sm:space-y-5">
            <Logo onClick={() => onNavClick("Home")} size="small" />
            {/* Brand statement — editorial, wide tracked */}
            <p className="section-body max-w-sm">{footerContentData.brandDescription}</p>
          </div>
          {/* Brand tagline — large tracked editorial text */}
          <p className="editorial-label text-right hidden lg:block" style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.12)' }}>
            SECOND LAYER<br />OF SKIN
          </p>
        </div>

        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-3">
          <div className="footer-section space-y-4 sm:space-y-5 md:space-y-6">
            <p className="editorial-label-gold">{footerContentData.sectionLabels.connect}</p>
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
              {[
                { ref: 0, href: SOCIAL_LINKS.instagram, icon: Instagram, label: 'Instagram' },
                { ref: 1, href: `https://wa.me/${CONTACT_INFO.whatsappNumber}`, icon: MessageCircle, label: 'WhatsApp' },
                { ref: 2, href: `mailto:${CONTACT_INFO.email}`, icon: Mail, label: 'Email' },
                { ref: 3, href: `tel:${CONTACT_INFO.phone.replace(/\s|-/g, '')}`, icon: Phone, label: 'Phone' },
              ].map(({ ref: refIdx, href, icon: Icon, label }) => (
                <a key={label} ref={(el) => (socialLinksRef.current[refIdx] = el)} href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-2 md:p-3 rounded-lg depth-card text-dark-400 hover:text-gold-500 transition-all duration-200" aria-label={label}>
                  <Icon size={20} strokeWidth={1.8} />
                </a>
              ))}
            </div>
            <div className="space-y-1.5">
              <p className="section-muted">{CONTACT_INFO.email}</p>
              <p className="section-muted">{CONTACT_INFO.phone}</p>
            </div>
          </div>

          <div className="footer-section space-y-4 sm:space-y-5 md:space-y-6">
            <p className="editorial-label-gold">{footerContentData.sectionLabels.shop}</p>
            <button onClick={() => onNavClick && onNavClick("Shop")} className="relative pb-0.5 section-muted hover:text-gold-500 transition-colors duration-300 text-left group/fl">
              {footerContentData.products.primaryLine}
              <span className="absolute bottom-0 left-0 right-0 h-px bg-gold-500/60 origin-left scale-x-0 group-hover/fl:scale-x-100 transition-transform duration-300 ease-out" />
            </button>
          </div>

          <div className="footer-section space-y-4 sm:space-y-5 md:space-y-6">
            <p className="editorial-label-gold">{footerContentData.sectionLabels.company}</p>
            <ul className="space-y-3 md:space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button onClick={() => onNavClick && onNavClick(link.name)} className="relative pb-0.5 section-muted hover:text-gold-500 transition-colors duration-300 text-left group/fl">
                    {link.name}
                    <span className="absolute bottom-0 left-0 right-0 h-px bg-gold-500/60 origin-left scale-x-0 group-hover/fl:scale-x-100 transition-transform duration-300 ease-out" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom pt-8 md:pt-10 lg:pt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
            <p className="section-muted">© {currentYear} {footerContentData.copyrightBrand}. {footerContentData.copyright}</p>
            <div className="flex items-center gap-3 text-[10px] sm:text-xs text-dark-500 font-sans">
              {footerContentData.paymentMethods.map((method, index) => (
                <div key={method.label} className="flex items-center gap-1">
                  {method.icon && <ShieldCheck size={12} className="text-green-500/60" />}
                  <span>{method.label}</span>
                  {index < footerContentData.paymentMethods.length - 1 && <span className="ml-3 text-dark-600">•</span>}
                </div>
              ))}
            </div>
            <a ref={devLinkRef} href={APP_CONFIG.developer.website} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-4 py-3 depth-glow rounded-xl w-fit">
              <div className="p-2 bg-gold-500/10 border border-gold-500/20 rounded-lg group-hover:bg-gold-500/20 transition-all duration-300">
                <Code size={15} className="text-gold-500" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-dark-400 uppercase tracking-wide">{footerContentData.craftedByLabel}</span>
                <span className="text-sm font-bold text-white group-hover:text-gold-500 transition-colors">{APP_CONFIG.developer.name}</span>
              </div>
              <ExternalLink size={13} className="text-dark-400 group-hover:text-gold-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Back to Top — only visible after scrolling past 400px */}
      <button
        onClick={scrollToTop}
        data-magnetic
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-dark-800/90 border border-white/10 text-white/50 hover:text-gold-500 hover:border-gold-500/30 hover:bg-dark-800 backdrop-blur-md shadow-lg hover:shadow-gold-500/10 group transition-all duration-500 ${showBackToTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Scroll to top"
        tabIndex={showBackToTop ? 0 : -1}
        onMouseEnter={(e) => { if (!isMobile()) { gsap.to(e.currentTarget, { y: -4, scale: 1.1, duration: getResponsiveDuration('fast'), ease: EASE.backGentle }); svgIconDraw(e.currentTarget.querySelector('svg'), 0.4); } }}
        onMouseLeave={(e) => { if (!isMobile()) { gsap.to(e.currentTarget, { y: 0, scale: 1, duration: getResponsiveDuration('fast'), ease: EASE.circ }); } }}
      >
        <ArrowUp size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={2.5} />
      </button>
    </footer>
  );
};

export default Footer;
