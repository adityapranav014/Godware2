import { useEffect, useRef, useState } from "react";
import { Menu, X, Instagram, MessageCircle, Mail, Phone } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS, CONTACT_INFO } from "../../constants";
import { useMobileMenu } from "../../hooks";
import { gsap } from "gsap";
import { EASE, isMobile, getResponsiveDuration } from "../../utils/animations";

const Navbar = ({ activeSection, onNavClick }) => {
  const { isMobileMenuOpen, openMenu, closeMenu } = useMobileMenu();
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const navLinksRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Initial entrance animation - Mobile optimized
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mobile = isMobile();
      const tl = gsap.timeline({
        defaults: { ease: EASE.circ },
        delay: 0.1
      });

      // Navbar slides down with premium blur effect
      tl.fromTo(
        navRef.current,
        {
          y: -100,
          opacity: 0,
          filter: mobile ? 'blur(5px)' : 'blur(10px)',
          willChange: 'transform, opacity, filter',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: getResponsiveDuration('slow'),
          ease: EASE.expo,
          clearProps: 'willChange',
        }
      );

      // Logo scales in with bounce
      tl.fromTo(
        logoRef.current,
        {
          scale: 0.85,
          opacity: 0,
          willChange: 'transform, opacity',
        },
        {
          scale: 1,
          opacity: 1,
          duration: getResponsiveDuration('medium'),
          ease: EASE.backGentle,
          clearProps: 'willChange',
        },
        '-=0.45'
      );

      // Mobile menu button appears after logo
      if (menuButtonRef.current) {
        tl.fromTo(
          menuButtonRef.current,
          {
            scale: 0.85,
            opacity: 0,
            willChange: 'transform, opacity',
          },
          {
            scale: 1,
            opacity: 1,
            duration: getResponsiveDuration('medium'),
            ease: EASE.backGentle,
            clearProps: 'willChange',
          },
          '-=0.3'
        );
      }

      // Nav links stagger in (desktop only)
      const links = navLinksRef.current.filter(Boolean);
      if (links.length > 0 && !mobile) {
        tl.fromTo(
          links,
          {
            y: -15,
            opacity: 0,
            willChange: 'transform, opacity',
          },
          {
            y: 0,
            opacity: 1,
            duration: getResponsiveDuration('fast'),
            stagger: 0.06,
            ease: EASE.circ,
            clearProps: 'willChange',
          },
          '-=0.35'
        );
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

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

  // Hide/show animation - Smoother on mobile
  // Hide/show animation - Fluid and premium
  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: isVisible ? 0 : -100,
        autoAlpha: isVisible ? 1 : 0, // handles opacity + visibility
        duration: 0.6,
        ease: isVisible ? "power3.out" : "power3.in",
      });
    }
  }, [isVisible]);

  // Mobile menu animations - Premium and smooth
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    const ctx = gsap.context(() => {
      if (isMobileMenuOpen) {
        const tl = gsap.timeline();

        // 1. Overlay Entrance - "Heavy Curtain" feel
        tl.fromTo(
          mobileMenuRef.current,
          {
            clipPath: "inset(0 0 100% 0)",
          },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1,
            ease: "expo.inOut", // More dramatic start/end
          }
        );

        // 2. Links Stagger (Large Text)
        const links = mobileMenuRef.current.querySelectorAll('.mobile-nav-link');
        tl.fromTo(
          links,
          {
            y: 50, // Reduced from 100 for tighter feel
            opacity: 0,
            skewY: 5, // Modern skew effect
          },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.5" // Start earlier
        );

        // 3. Footer/Socials Stagger
        const bottomContent = mobileMenuRef.current.querySelectorAll('.mobile-menu-footer');
        tl.fromTo(
          bottomContent,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.6"
        );

      } else if (mobileMenuRef.current) {
        // Exit Animation
        gsap.to(mobileMenuRef.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.8,
          ease: "expo.inOut",
        });
      }
    }, mobileMenuRef);

    return () => ctx.revert();
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        ref={navRef}
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${hasScrolled || isMobileMenuOpen
          ? 'bg-black/60 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-2'
          : 'bg-transparent py-4 sm:py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-2 sm:py-0 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">

            {/* Logo */}
            <button
              ref={logoRef}
              onClick={() => onNavClick("Home")}
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
                alt="Logo"
                className="h-8 sm:h-10 object-contain group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.8)] transition-all duration-300"
              />
              <div className="text-xl sm:text-2xl font-display bg-gold tracking-tight bg-clip-text text-transparent group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">
                GOD WEAR <sup className="text-xs">®</sup>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {NAV_LINKS.map((link, index) => (
                <button
                  key={link.name}
                  ref={(el) => (navLinksRef.current[index] = el)}
                  onClick={() => onNavClick(link.name)}
                  className={`nav-link relative px-4 lg:px-6 py-2.5 font-medium text-sm transition-all duration-300 cursor-pointer ${activeSection === link.name
                    ? "text-gold-500"
                    : "text-white hover:text-gold-400"
                    }`}
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
                </button>
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
                <button
                  key={link.name}
                  onClick={() => {
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
                </button>
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
