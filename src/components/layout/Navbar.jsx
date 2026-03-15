import { useEffect, useState, useRef } from "react";
import { Menu, X, Instagram, MessageCircle, Share2, Phone, House, ShoppingBag, Users, Mail } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS, CONTACT_INFO, EXTERNAL_LINKS } from "../../constants";
import { useMobileMenu, useNavbarAnimations } from "../../hooks";
import { gsap } from "gsap";
import { EASE, isMobile, getResponsiveDuration, svgIconDraw } from "../../utils/animations";

const NAV_ICON_MAP = { House, ShoppingBag, Users, Mail };

// Animate the active nav icon: scale bounce + line-draw
const animateActiveIcon = (el) => {
  if (!el) return;
  gsap.fromTo(el, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)', overwrite: true });
  svgIconDraw(el.querySelector('svg') || el, 0.5);
};

// Navbar height tokens — kept in one place so header & overlay always agree.
const NAV_H = "h-16 sm:h-20";
const MENU_TOP = "top-16 sm:top-20";

// How many px the user must scroll down before the navbar hides.
// Prevents accidental hides on micro-scrolls.
const HIDE_THRESHOLD = 80;

const Navbar = ({ activeSection, onNavClick, preloaderComplete = true }) => {
  const { isMobileMenuOpen, openMenu, closeMenu } = useMobileMenu();
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Refs to avoid stale closures in the scroll handler
  const lastScrollYRef = useRef(0);
  const scrollDeltaRef = useRef(0); // accumulated downward scroll since last direction change

  const activeIconsRef = useRef({});

  const { navRef, logoRef, navLinksRef, mobileMenuRef, menuButtonRef } =
    useNavbarAnimations(isMobileMenuOpen, isVisible, preloaderComplete);

  // Animate active icon whenever the active section changes (desktop only)
  useEffect(() => {
    if (isMobile()) return;
    const el = activeIconsRef.current[activeSection];
    if (el) animateActiveIcon(el);
  }, [activeSection]);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      setHasScrolled(currentScrollY > 20);

      // Always show at top or when mobile menu is open
      if (currentScrollY < 10 || isMobileMenuOpen) {
        scrollDeltaRef.current = 0;
        setIsVisible(true);
        return;
      }

      if (diff > 0) {
        // Scrolling DOWN — accumulate delta; only hide after threshold
        scrollDeltaRef.current += diff;
        if (scrollDeltaRef.current > HIDE_THRESHOLD) {
          setIsVisible(false);
        }
      } else {
        // Scrolling UP — reset accumulator and reveal instantly
        scrollDeltaRef.current = 0;
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [isMobileMenuOpen]);

  const scrolled = hasScrolled || isMobileMenuOpen;

  return (
    <>
      {/* ── Header bar ── */}
      <header
        ref={navRef}
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${NAV_H} flex items-center ${scrolled ? "bg-dark-950/95 backdrop-blur-xl" : "bg-transparent"
          }`}
        style={{
          ...(preloaderComplete ? {} : { opacity: 0, visibility: "hidden" }),
          ...(scrolled
            ? {
              borderBottom: "1px solid rgba(201,139,58,0.12)",
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.03), 0 8px 32px rgba(0,0,0,0.6)",
            }
            : {}),
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 xl:px-0 w-full">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <a
              href="#Home"
              ref={logoRef}
              onClick={(e) => { e.preventDefault(); onNavClick("Home"); }}
              className="flex items-center gap-2.5 group"
              data-magnetic
              onMouseEnter={(e) =>
                !isMobile() &&
                gsap.to(e.currentTarget, {
                  scale: 1.04,
                  duration: getResponsiveDuration("fast"),
                  ease: EASE.backGentle,
                })
              }
              onMouseLeave={(e) =>
                !isMobile() &&
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: getResponsiveDuration("fast"),
                  ease: EASE.circ,
                })
              }
            >
              <img
                src={`${import.meta.env.BASE_URL}images/logo.webp`}
                alt="GOD WEAR — Premium Compression T-Shirts"
                className="h-7 sm:h-9 object-contain"
                style={{ filter: "drop-shadow(0 0 10px rgba(201,139,58,0.2))" }}
              />
              <span className="font-display text-gold-500 tracking-[0.08em] text-sm uppercase leading-none">
                GOD WEAR
                <sup className="text-[9px] text-gold-500 ml-0.5 font-sans not-italic">
                  ®
                </sup>
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
              {NAV_LINKS.filter(link => link.name !== "Shop").map((link, index) => {
                const NavIcon = NAV_ICON_MAP[link.iconName];
                return (
                  <a
                    key={link.name}
                    href={`#${link.name}`}
                    ref={(el) => (navLinksRef.current[index] = el)}
                    onClick={(e) => { e.preventDefault(); onNavClick(link.name); }}
                    className={`relative px-3 lg:px-5 py-1.5 text-[0.68rem] tracking-[0.14em] uppercase font-sans font-medium transition-colors duration-300 cursor-pointer group/link ${activeSection === link.name
                      ? "text-white"
                      : "text-white/45 hover:text-white/90"
                      }`}
                    data-magnetic
                    onMouseEnter={(e) => {
                      if (activeSection !== link.name) {
                        gsap.to(e.currentTarget, { y: -2, duration: getResponsiveDuration("fast"), ease: EASE.backGentle });
                      }
                      svgIconDraw(e.currentTarget.querySelector('svg'), 0.45);
                    }}
                    onMouseLeave={(e) =>
                      gsap.to(e.currentTarget, {
                        y: 0,
                        duration: getResponsiveDuration("fast"),
                        ease: EASE.circ,
                      })
                    }
                  >
                    <span className="flex items-center gap-1.5">
                      {NavIcon && (
                        <span
                          ref={(el) => { activeIconsRef.current[link.name] = el; }}
                          className="shrink-0"
                          style={activeSection === link.name
                            ? { color: 'var(--gold-500)', filter: 'drop-shadow(0 0 5px rgba(201,139,58,0.7))' }
                            : {}}
                        >
                          <NavIcon
                            size={11}
                            strokeWidth={1.8}
                            className={activeSection === link.name
                              ? 'opacity-100'
                              : 'opacity-55 group-hover/link:opacity-100 transition-opacity duration-200'
                            }
                          />
                        </span>
                      )}
                      {link.name}
                    </span>
                    {/* Hover underline */}
                    <span className="absolute bottom-0 left-3 right-3 h-px bg-white/25 scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-center" />
                  </a>
                );
              })}

              {/* Shop Now CTA */}
              <a
                href="#Shop"
                onClick={(e) => { e.preventDefault(); onNavClick("Shop"); }}
                className="relative ml-3 lg:ml-5 px-4 lg:px-6 py-2 text-[0.65rem] tracking-[0.16em] uppercase font-medium font-sans text-black bg-white hover:bg-gold-200 active:scale-[0.97] transition-all duration-200 inline-flex items-center gap-1.5 cursor-pointer group/shop"
                onMouseEnter={(e) => svgIconDraw(e.currentTarget.querySelector('svg'), 0.4)}
              >
                <span
                  ref={(el) => { activeIconsRef.current['Shop'] = el; }}
                  className="shrink-0"
                  style={activeSection === 'Shop' ? { filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.4))' } : {}}
                >
                  <ShoppingBag size={11} strokeWidth={2} />
                </span>
                Shop Now
              </a>
            </nav>

            {/* Mobile hamburger */}
            <button
              ref={menuButtonRef}
              onClick={() => (isMobileMenuOpen ? closeMenu() : openMenu())}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className={`md:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 active:scale-90 ${scrolled
                ? "text-white hover:text-gold-500 hover:bg-white/10"
                : "text-white bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/20 hover:border-white/25"
                }`}
            >
              {isMobileMenuOpen ? (
                <X size={20} strokeWidth={1.5} />
              ) : (
                <Menu size={20} strokeWidth={1.5} />
              )}
            </button>

          </div>
        </div>

        {/* Gold accent line — visible only when scrolled */}
        {scrolled && (
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(201,139,58,0.2) 30%, rgba(201,139,58,0.2) 70%, transparent)",
            }}
          />
        )}
      </header>

      {/* ── Full-screen mobile menu ── */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className={`fixed ${MENU_TOP} bottom-0 left-0 right-0 z-40 md:hidden bg-dark-950/98 backdrop-blur-2xl text-white flex flex-col`}
          style={{
            clipPath: "inset(0 0 100% 0)",
            borderTop: "1px solid rgba(201,139,58,0.12)",
          }}
        >
          {/* Nav links — editorial numbered list */}
          <nav className="flex-1 flex flex-col justify-center px-8 sm:px-12 gap-1 overflow-y-auto">
            {NAV_LINKS.map((link, index) => {
              const MobileIcon = NAV_ICON_MAP[link.iconName];
              return (
                <a
                  key={link.name}
                  href={`#${link.name}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick(link.name);
                    closeMenu();
                  }}
                  className={`mobile-nav-link group flex items-center gap-5 py-4 border-b transition-colors duration-200 ${activeSection === link.name
                    ? "border-gold-500/30 text-white"
                    : "border-white/6 text-white/35 hover:text-white hover:border-white/15"
                    }`}
                  onMouseEnter={(e) => svgIconDraw(e.currentTarget.querySelector('svg[data-nav-icon]'), 0.5)}
                >
                  <span className="text-[0.6rem] tracking-[0.2em] text-gold-500/60 font-sans w-5 shrink-0 tabular-nums">
                    0{index + 1}
                  </span>
                  {MobileIcon && (
                    <MobileIcon
                      data-nav-icon
                      size={18}
                      strokeWidth={1.2}
                      className={`shrink-0 transition-all duration-300 ${activeSection === link.name
                        ? 'text-gold-500'
                        : 'text-white/20 group-hover:text-white/40'
                        }`}
                      style={activeSection === link.name
                        ? { filter: 'drop-shadow(0 0 6px rgba(201,139,58,0.7))' }
                        : {}}
                    />
                  )}
                  <span className="font-display text-[2.8rem] sm:text-[3.5rem] leading-none uppercase tracking-tight group-hover:tracking-[-0.02em] transition-all duration-300">
                    {link.name}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Footer strip */}
          <div
            className="px-8 sm:px-12 pb-10 pt-5 grid grid-cols-2 gap-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="mobile-menu-footer flex flex-col gap-3">
              <span className="text-[0.58rem] uppercase tracking-[0.22em] text-gold-500 font-sans flex items-center gap-1.5">
                <Share2 size={10} strokeWidth={2} />
                Follow
              </span>
              <div className="flex gap-4">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-gold-500 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} strokeWidth={1.5} />
                </a>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-gold-500 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={20} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            <div className="mobile-menu-footer flex flex-col gap-3">
              <span className="text-[0.58rem] uppercase tracking-[0.22em] text-gold-500 font-sans flex items-center gap-1.5">
                <Phone size={10} strokeWidth={2} />
                Contact
              </span>
              <div className="flex flex-col gap-1.5 font-sans">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-xs text-white/45 hover:text-white transition-colors truncate"
                >
                  {CONTACT_INFO.email}
                </a>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-xs text-white/45 hover:text-white transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
