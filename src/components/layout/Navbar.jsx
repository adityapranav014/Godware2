import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../../constants";
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

      // Show navbar when at top of page
      if (currentScrollY < 10) {
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
  }, [lastScrollY]);

  // Hide/show animation - Smoother on mobile
  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
        duration: getResponsiveDuration('fast'),
        ease: isVisible ? EASE.circ : EASE.power,
      });
    }
  }, [isVisible]);

  // Mobile menu animations - Premium and smooth
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    const ctx = gsap.context(() => {
      if (isMobileMenuOpen) {
        const tl = gsap.timeline();

        // Backdrop fade in with scale
        tl.fromTo(
          mobileMenuRef.current,
          {
            opacity: 0,
            scale: 1.05,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: getResponsiveDuration('normal'),
            ease: EASE.circ,
          }
        );

        // Menu items premium stagger entrance
        const menuItems = mobileMenuRef.current.querySelectorAll('.mobile-nav-item');
        tl.fromTo(
          menuItems,
          {
            x: -50,
            opacity: 0,
            scale: 0.95,
            rotateY: -15,
            willChange: 'transform, opacity',
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: getResponsiveDuration('medium'),
            stagger: 0.06,
            ease: EASE.backGentle,
            clearProps: 'willChange',
          },
          '-=0.15'
        );
      } else if (mobileMenuRef.current) {
        // Smooth exit animation
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          scale: 0.98,
          filter: 'blur(5px)',
          duration: getResponsiveDuration('fast'),
          ease: EASE.power,
        });
      }
    }, mobileMenuRef);

    return () => ctx.revert();
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        ref={navRef}
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${hasScrolled
          ? 'bg-base'
          : 'bg-transparent'
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
              onClick={openMenu}
              className="md:hidden p-2.5 rounded-full text-white hover:text-gold-500 hover:bg-white/10 active:scale-95 transition-all duration-200"
              aria-label="Open menu"
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
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {
        isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="fixed inset-0 z-[60] md:hidden bg-base"
          >
            <div className="flex flex-col h-dvh">
              {/* Close button */}
              <div className="flex justify-end p-6">
                <button
                  onClick={closeMenu}
                  className="p-3 rounded-full text-white hover:text-gold-500 hover:bg-white/10 active:scale-95 transition-all duration-200"
                  aria-label="Close menu"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex-1 flex flex-col justify-center px-6 gap-3">
                {NAV_LINKS.map((link, index) => (
                  <button
                    key={link.name}
                    onClick={() => {
                      onNavClick(link.name);
                      closeMenu();
                    }}
                    className={`mobile-nav-item relative w-full text-left py-5 px-6 rounded-2xl text-2xl font-semibold transition-all duration-300 hover:bg-white/5 active:scale-98 ${activeSection === link.name
                      ? "text-gold-500 bg-gold-500/10"
                      : "text-white/90"
                      }`}
                    style={{ perspective: '1000px' }}
                  >
                    <span className="block transform transition-transform duration-300">
                      {link.name}
                    </span>
                    {activeSection === link.name && (
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Navbar;
