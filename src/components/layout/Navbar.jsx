import { useEffect, useState } from "react";
import { Menu, X, Instagram, MessageCircle } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS, CONTACT_INFO } from "../../constants";
import { useMobileMenu, useNavbarAnimations } from "../../hooks";
import { gsap } from "gsap";
import { EASE, isMobile, getResponsiveDuration } from "../../utils/animations";

const Navbar = ({ activeSection, onNavClick }) => {
  const { isMobileMenuOpen, openMenu, closeMenu } = useMobileMenu();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Use custom animation hook
  const {
    navRef,
    logoRef,
    navLinksRef,
    mobileMenuRef,
    menuButtonRef
  } = useNavbarAnimations(isMobileMenuOpen, isVisible);

  // Scroll behavior
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state for backdrop blur
      setHasScrolled(currentScrollY > 20);

      // Show navbar when at top of page or when mobile menu is open
      if (currentScrollY < 10 || isMobileMenuOpen) {
        setIsVisible(true);
      }
      // Hide on scroll down, show on scroll up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar, { passive: true });

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY, isMobileMenuOpen]);

  return (
    <>
      <header
        ref={navRef}
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${hasScrolled || isMobileMenuOpen
          ? 'bg-dark-850/90 backdrop-blur-xl border-b border-dark-700 py-2'
          : 'bg-transparent py-4 sm:py-6'
          }`}
        style={hasScrolled || isMobileMenuOpen ? {
          borderTopColor: 'rgba(255,255,255,0.06)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.4)'
        } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 py-2 sm:py-0 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">

            {/* Logo */}
            <a
              href="#Home"
              ref={logoRef}
              onClick={(e) => {
                e.preventDefault();
                onNavClick("Home");
              }}
              className="flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-105 active:scale-95 group"
              onMouseEnter={(e) => {
                if (!isMobile()) {
                  gsap.to(e.currentTarget, {
                    scale: 1.05,
                    duration: getResponsiveDuration('fast'),
                    ease: EASE.backGentle,
                  });
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile()) {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    duration: getResponsiveDuration('fast'),
                    ease: EASE.circ,
                  });
                }
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/logo.webp`}
                alt="GOD WEAR Premium Gym Wear Logo"
                className="h-8 sm:h-10 object-contain group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.8)] transition-all duration-300"
              />
              <div className="text-xl sm:text-2xl font-display bg-gold tracking-tight bg-clip-text text-transparent group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">
                GOD WEAR <sup className="text-xs">®</sup>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {NAV_LINKS.map((link, index) => (
                <a
                  key={link.name}
                  href={`#${link.name}`}
                  ref={(el) => (navLinksRef.current[index] = el)}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick(link.name);
                  }}
                  className={`nav-link relative px-4 lg:px-6 py-2.5 font-medium text-sm transition-all duration-300 cursor-pointer rounded-lg ${activeSection === link.name
                    ? "text-gold-500 bg-dark-750/50"
                    : "text-white hover:text-gold-400 hover:bg-dark-750/40"
                    }`}
                  style={{ transition: 'all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)' }}
                  onMouseEnter={(e) => {
                    if (activeSection !== link.name) {
                      gsap.to(e.currentTarget, {
                        scale: 1.03,
                        y: -2,
                        duration: getResponsiveDuration('fast'),
                        ease: EASE.backGentle,
                      });
                    }
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1,
                      y: 0,
                      duration: getResponsiveDuration('fast'),
                      ease: EASE.circ,
                    });
                  }}
                >
                  {link.name}
                  {activeSection === link.name && (
                    <span className="absolute inset-0 -z-10 animate-pulse" />
                  )}
                  <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              onClick={() => isMobileMenuOpen ? closeMenu() : openMenu()}
              className="md:hidden p-2.5 rounded-full text-white hover:text-gold-500 hover:bg-white/10 active:scale-95 transition-all duration-200"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              onMouseEnter={(e) => {
                if (!isMobile()) {
                  gsap.to(e.currentTarget, {
                    scale: 1.08,
                    rotation: 90,
                    duration: getResponsiveDuration('fast'),
                    ease: EASE.backGentle,
                  });
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile()) {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    rotation: 0,
                    duration: getResponsiveDuration('fast'),
                    ease: EASE.circ,
                  });
                }
              }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {
        isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="fixed top-14 sm:top-16 md:top-20 bottom-0 left-0 right-0 z-[49] md:hidden bg-black/95 backdrop-blur-xl text-white flex flex-col border-t border-white/10"
            style={{ clipPath: "inset(0 0 100% 0)" }} // Initial state for animation
          >

            {/* Main Navigation Links */}
            <nav className="flex-1 flex flex-col justify-center items-center px-8 gap-6 overflow-y-auto">
              {NAV_LINKS.map((link, index) => (
                <a
                  key={link.name}
                  href={`#${link.name}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick(link.name);
                    closeMenu();
                  }}
                  className={`mobile-nav-link text-center text-[3.5rem] leading-none font-display font-medium tracking-tight transition-all duration-300 group ${activeSection === link.name
                    ? "text-gold-500"
                    : "text-white/40 hover:text-white"
                    }`}
                >
                  <span className="inline-block group-hover:skew-x-6 transition-transform duration-300">
                    {link.name}
                  </span>
                </a>
              ))}
            </nav>

            {/* Footer Information */}
            <div className="px-8 pb-10 pt-6 border-t border-white/10 grid grid-cols-2 gap-8">
              {/* Socials */}
              <div className="mobile-menu-footer flex flex-col gap-4">
                <span className="text-xs uppercase tracking-[0.2em] text-gold-500">
                  Follow Us
                </span>
                <div className="flex gap-4 text-white/60">
                  <a href={SOCIAL_LINKS.instagram} className="hover:text-gold-500 transition-colors">
                    <Instagram size={24} strokeWidth={1.5} />
                  </a>
                  <a href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`} className="hover:text-gold-500 transition-colors">
                    <MessageCircle size={24} strokeWidth={1.5} />
                  </a>
                </div>
              </div>

              {/* Contact */}
              <div className="mobile-menu-footer flex flex-col gap-4">
                <span className="text-xs uppercase tracking-[0.2em] text-gold-500">
                  Contact
                </span>
                <div className="flex flex-col gap-2 text-sm text-white/60 font-sans">
                  <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-white transition-colors">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Navbar;
